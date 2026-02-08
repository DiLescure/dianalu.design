import type { Agent, AgentMessage, User, UserMessage } from '@/payload-types';
import type { CacheMessage } from '@/services/valkey/types';
// import { safeFieldId } from '@/utils/messages/helpers';
import type {
  VirtualAgentMessage,
  VirtualMessage,
  VirtualUserMessage,
} from '@/utils/virtual-messages/types';

/**
 * Transform UserMessage to VirtualUserMessage
 */
export const transformUserMessage = (message: UserMessage): VirtualUserMessage => {
  // Extract IDs and Uids
  // const senderUserId = safeFieldId(message.senderUser);
  const senderUserUid = message.senderUserUid;

  // Build virtual message
  const virtual: VirtualUserMessage = {
    id: message.id,
    messageUid: message.messageUid, // Include unique message identifier
    senderType: 'user',

    // Channel and thread
    channelUid: message.channelUid,
    threadUid: message.threadUid,

    // Content
    messageContent: message.messageContent as any,

    // Sender
    senderUserUid,

    // Recipient
    recipientType: message.recipientType as any,
    recipientUid: message.recipientUid || undefined,

    // Metadata
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    deletedAt: message.deletedAt || null, // Soft delete timestamp
  };

  // Add populated sender if available
  if (typeof message.senderUser === 'object' && message.senderUser) {
    const user = message.senderUser as User;
    virtual.senderUser = {
      id: user.id,
      userUid: user.userUid,
      email: user.email,
    };
  }

  return virtual;
};

/**
 * Transform AgentMessage to VirtualAgentMessage
 */
export const transformAgentMessage = (message: AgentMessage): VirtualAgentMessage => {
  // Extract IDs and Uids
  // const senderAgentId = safeFieldId(message.senderAgent);
  const senderAgentUid = message.senderAgentUid;
  // const originatorUserId = safeFieldId(message.originatorUser);
  const originatorUserUid = message.originatorUserUid;

  // Build virtual message
  const virtual: VirtualAgentMessage = {
    id: message.id,
    messageUid: message.messageUid, // Include unique message identifier
    senderType: 'agent',

    // Channel and thread
    channelUid: message.channelUid,
    threadUid: message.threadUid,

    // Content
    messageContent: message.messageContent as any,

    // Sender
    senderAgentUid,

    // Originator
    originatorUserUid,

    // Recipient
    recipientType: message.recipientType as any,
    recipientUid: message.recipientUid || undefined,

    // Metadata
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    deletedAt: message.deletedAt || null, // Soft delete timestamp
  };

  // Add populated sender if available
  if (typeof message.senderAgent === 'object' && message.senderAgent) {
    const agent = message.senderAgent as Agent;
    virtual.senderAgent = {
      id: agent.id,
      agentUid: agent.agentUid,
      agentName: agent.agentName,
    };
  }

  // Add populated originator if available
  if (typeof message.originatorUser === 'object' && message.originatorUser) {
    const user = message.originatorUser as User;
    virtual.originatorUser = {
      id: user.id,
      userUid: user.userUid,
      email: user.email,
    };
  }

  return virtual;
};

/**
 * Transform array of messages (mixed types)
 */
export const transformMessages = (
  userMessages: UserMessage[],
  agentMessages: AgentMessage[],
): VirtualMessage[] => {
  const virtualMessages: VirtualMessage[] = [
    ...userMessages.map(transformUserMessage),
    ...agentMessages.map(transformAgentMessage),
  ];

  // Sort by createdAt timestamp (newest to oldest - descending)
  virtualMessages.sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeB - timeA; // Descending order (newest first)
  });

  return virtualMessages;
};

/**
 * Transform cache messages to virtual format
 *
 * Note: Cache format (CacheMessage from @/services/valkey/types) includes:
 * - id (number)
 * - senderType, senderUid
 * - messageContent (JSON string)
 * - timestamp, channelUid, threadUid
 *
 * Cache does NOT include:
 * - messageUid (not stored in cache to save space)
 * - originatorUserUid (for agent messages)
 * - Populated relationships
 *
 * For full message details with messageUid and relationships, use database query.
 */
export const transformCacheMessages = (cacheMessages: CacheMessage[]): VirtualMessage[] => {
  return cacheMessages.map((msg) => {
    const base = {
      id: msg.id,
      messageUid: '', // Not available in cache - use database query if needed
      channelUid: msg.channelUid,
      threadUid: msg.threadUid,
      messageContent:
        typeof msg.messageContent === 'string'
          ? JSON.parse(msg.messageContent)
          : msg.messageContent,
      createdAt: new Date(msg.timestamp).toISOString(),
      updatedAt: new Date(msg.timestamp).toISOString(),
      deletedAt: null, // Cached messages are not deleted
      recipientType: 'broadcast' as const,
    };

    if (msg.senderType === 'user') {
      return {
        ...base,
        senderType: 'user' as const,
        senderUserUid: msg.senderUid,
      } as VirtualUserMessage;
    } else {
      return {
        ...base,
        senderType: 'agent' as const,
        senderAgentUid: msg.senderUid,
        originatorUserUid: '', // Not available in cache
      } as VirtualAgentMessage;
    }
  });
};
