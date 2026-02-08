'use server';
import type { BasePayload } from 'payload';
import { formatUserMessageForCache } from '@/services/ai/formatting';
import type { AgentMessageWithContent, MessageWithType, UserMessageWithContent } from './types';

/**
 * User Message Operations
 */

/**
 * Get recent user messages for a thread
 * @param payload - Payload instance
 * @param threadId - Thread internal ID
 * @param limit - Maximum number of messages to return (default: 50)
 * @returns Array of user messages
 */
export const getRecentUserMessages = async (
  payload: BasePayload,
  threadId: number,
  limit: number = 50,
): Promise<UserMessageWithContent[]> => {
  try {
    const result = await payload.find({
      collection: 'userMessages',
      where: {
        thread: {
          equals: threadId,
        },
        deletedAt: {
          equals: null,
        },
      },
      sort: '-createdAt',
      limit,
    });

    return result.docs as unknown as UserMessageWithContent[];
  } catch (error) {
    console.error('[Messages] Error getting recent user messages:', error);
    return [];
  }
};

/**
 * Get recent agent messages for a thread
 * @param payload - Payload instance
 * @param threadId - Thread internal ID
 * @param limit - Maximum number of messages to return (default: 50)
 * @returns Array of agent messages
 */
export const getRecentAgentMessages = async (
  payload: BasePayload,
  threadId: number,
  limit: number = 50,
): Promise<AgentMessageWithContent[]> => {
  try {
    const result = await payload.find({
      collection: 'agentMessages',
      where: {
        thread: {
          equals: threadId,
        },
        deletedAt: {
          equals: null,
        },
      },
      sort: '-createdAt',
      limit,
    });

    return result.docs as unknown as AgentMessageWithContent[];
  } catch (error) {
    console.error('[Messages] Error getting recent agent messages:', error);
    return [];
  }
};

/**
 * Update agent message content (used during streaming)
 * @param payload - Payload instance
 * @param messageId - Message internal ID
 * @param content - New content object
 * @returns Updated agent message or null on error
 */
export const updateAgentMessageContent = async (
  payload: BasePayload,
  messageId: number,
  content: any,
): Promise<AgentMessageWithContent | null> => {
  try {
    const message = await payload.update({
      collection: 'agentMessages',
      id: messageId,
      data: {
        messageContent: content,
      },
    });

    return message as unknown as AgentMessageWithContent;
  } catch (error) {
    console.error('[Messages] Error updating agent message content:', error);
    return null;
  }
};

/**
 * Get all messages (user and agent) for a thread, sorted by creation time
 * @param payload - Payload instance
 * @param threadId - Thread internal ID
 * @param limit - Maximum number of messages to return (default: 50)
 * @returns Array of messages with type indicator
 */
export const getAllMessagesForThread = async (
  payload: BasePayload,
  threadId: number,
  limit: number = 50,
): Promise<MessageWithType[]> => {
  try {
    const userMessages = await getRecentUserMessages(payload, threadId, limit);
    const agentMessages = await getRecentAgentMessages(payload, threadId, limit);

    // Combine and add type indicator
    const allMessages: MessageWithType[] = [
      ...userMessages.map((m) => ({ ...m, senderType: 'user' as const })),
      ...agentMessages.map((m) => ({ ...m, senderType: 'agent' as const })),
    ];

    // Sort by creation time (oldest to newest)
    allMessages.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeA - timeB;
    });

    // Return only the last N messages
    return allMessages.slice(-limit);
  } catch (error) {
    console.error('[Messages] Error getting all messages for thread:', error);
    return [];
  }
};

/**
 * Helper function to update message cache in Valkey
 * Gets the last 5 messages from database and stores them in Valkey
 */
export async function updateRecentMessagesCache({
  payload,
  channelUid,
  threadUid,
  threadId,
  newMessage,
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
  threadId: number;
  newMessage: UserMessageWithContent | AgentMessageWithContent;
}): Promise<void> {
  try {
    payload.logger.debug(`[UserMessages Hook] Updating message cache for thread ${threadUid}`);

    // Dynamic imports to prevent webpack from bundling server-only modules
    const { getAllMessagesForThread } = await import('@/utils/messages');
    const { updateRecentMessages } = await import('@/services/valkey');

    // Get recent messages from database (last 5)
    const dbMessageList = await getAllMessagesForThread(payload, threadId, 4);
    if (dbMessageList.length === 0) {
      payload.logger.warn(`[UserMessages Hook] No messages found for thread ${threadId}`);
      return;
    }

    const newMessageWithType: MessageWithType = {
      ...newMessage,
      senderType: (newMessage as UserMessageWithContent).senderUserUid ? 'user' : 'agent',
    };

    const newMessageList = [...dbMessageList, newMessageWithType].map((message) =>
      formatUserMessageForCache(message, channelUid, threadUid),
    );

    // Store in Valkey using the service function from Phase 1
    // This will add the message and maintain only the last 5
    await updateRecentMessages({
      payload,
      channelUid,
      threadUid,
      newMessageList,
      ttlSeconds: 24 * 60 * 60, // 24 hours
    });

    payload.logger.debug(
      `[UserMessages Hook] Updated message cache for thread ${threadId}: ${newMessageList.length} total messages`,
    );
  } catch (error) {
    payload.logger.error(error, '[UserMessages Hook] Error updating message cache');
    throw error;
  }
}

/**
 * Remove a soft-deleted message from the cache
 */
export async function removeMessageFromCache({
  payload,
  channelUid,
  threadUid,
  messageId,
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
  messageId: number;
}): Promise<void> {
  try {
    payload.logger.debug(
      `[Messages Cache] Removing deleted message ${messageId} from cache for thread ${threadUid}`,
    );

    // Dynamic imports to prevent webpack from bundling server-only modules
    const { getRecentMessages, updateRecentMessages } = await import('@/services/valkey');

    // Get current cached messages
    const cachedMessages = await getRecentMessages({ payload, channelUid, threadUid });

    if (cachedMessages.length === 0) {
      payload.logger.debug(`[Messages Cache] No cached messages to update for thread ${threadUid}`);
      return;
    }

    // Filter out the deleted message
    const filteredMessages = cachedMessages.filter((msg) => msg.id !== messageId);

    if (filteredMessages.length === cachedMessages.length) {
      payload.logger.debug(`[Messages Cache] Message ${messageId} not found in cache`);
      return;
    }

    // Update cache with filtered list
    await updateRecentMessages({
      payload,
      channelUid,
      threadUid,
      newMessageList: filteredMessages,
      ttlSeconds: 24 * 60 * 60, // 24 hours
    });

    payload.logger.debug(
      `[Messages Cache] Removed message ${messageId} from cache. Cache now has ${filteredMessages.length} messages`,
    );
  } catch (error) {
    payload.logger.error(error, '[Messages Cache] Error removing message from cache');
    throw error;
  }
}
