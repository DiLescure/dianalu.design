'use server';
import type { GlideString } from '@valkey/valkey-glide';
import payload, { type BasePayload } from 'payload';
import { circuitBreakers } from '@/utils/resilience/circuit-breaker';
import { getCmsValkeyClient } from './client';
import type { AgentMessageData, CacheMessage } from './types';

/**
 * Helper to convert GlideString (string | Buffer) to string
 */
const glideStringToString = (value: GlideString | null): string | null => {
  if (value === null) return null;
  if (typeof value === 'string') return value;
  if (Buffer.isBuffer(value)) return value.toString('utf-8');
  // Handle Uint8Array case
  return Buffer.from(value).toString('utf-8');
};

/**
 * Wrapper for Valkey operations with circuit breaker and error handling
 */
const withValkeyErrorHandling = async <T>(
  payload: BasePayload,
  operation: () => Promise<T>,
  fallback: T,
  operationName: string,
  context?: Record<string, any>,
): Promise<T> => {
  try {
    return await circuitBreakers.valkey.execute(operation);
  } catch (error) {
    payload.logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        ...context, // Should contain Uid fields
      },
      `[CMS Valkey] ${operationName} failed`,
    );

    payload.logger.warn(
      { fallbackType: typeof fallback },
      `[CMS Valkey] Using fallback for ${operationName}`,
    );

    return fallback;
  }
};

/**
 * Message Caching Operations
 *
 * These functions maintain a cache of recent messages for each thread.
 * The cache is used to provide AI agents with conversation context.
 */

/**
 * Get recent messages for a thread
 * Returns the last N messages (configured in config) from the cache
 */
export const getRecentMessages = async ({
  payload,
  channelUid,
  threadUid,
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
}): Promise<CacheMessage[]> => {
  return withValkeyErrorHandling(
    payload,
    async () => {
      const client = await getCmsValkeyClient(payload);
      const key = `messages:${channelUid}:${threadUid}`;

      const messagesData = await client.get(key);
      const messagesJson = glideStringToString(messagesData);

      if (!messagesJson) {
        return [];
      }

      const messages = JSON.parse(messagesJson) as CacheMessage[];
      return messages;
    },
    [], // Fallback to empty array
    'getRecentMessages',
    { channelUid, threadUid },
  );
};

/**
 * Update recent messages cache
 * Adds a new message and maintains only the last N messages
 */
export const updateRecentMessages = async ({
  payload,
  channelUid,
  threadUid,
  newMessageList,
  ttlSeconds = 24 * 60 * 60, // 24 hours
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
  newMessageList: CacheMessage[];
  ttlSeconds: number;
}): Promise<void> => {
  return withValkeyErrorHandling(
    payload,
    async () => {
      const client = await getCmsValkeyClient(payload);
      const key = `messages:${channelUid}:${threadUid}`;

      // Store back to Valkey with TTL
      const messagesJson = JSON.stringify(newMessageList);
      await client.set(key, messagesJson);
      await client.expire(key, ttlSeconds);

      payload.logger.debug(
        `[CMS Valkey] Updated message cache for thread ${threadUid}, now contains ${newMessageList.length} messages`,
      );
    },
    undefined, // No fallback needed for void return
    'updateRecentMessages',
    { channelUid, threadUid, messageCount: newMessageList.length },
  );
};

/**
 * Clear message cache for a thread
 * Useful when a thread is deleted or needs to be reset
 */
export const clearThreadMessages = async ({
  payload,
  channelUid,
  threadUid,
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
}): Promise<void> => {
  try {
    const client = await getCmsValkeyClient(payload);
    const key = `messages:${channelUid}:${threadUid}`;

    await client.del([key]);
    payload.logger.debug(`[CMS Valkey] Cleared message cache for thread ${threadUid}`);
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to clear thread messages');
    throw error;
  }
};

/**
 * Agent Message Operations
 *
 * These functions manage agent message state during streaming responses.
 * Agent messages are stored temporarily while the AI is generating a response.
 */

/**
 * Store agent message state
 * Used when creating a new agent message that will be streamed
 */
export const storeAgentMessage = async ({
  payload,
  agentMessageId,
  messageData,
  ttlSeconds = 60 * 60, // 1 hour
}: {
  payload: BasePayload;
  agentMessageId: string;
  messageData: AgentMessageData;
  ttlSeconds: number;
}): Promise<void> => {
  try {
    const client = await getCmsValkeyClient(payload);
    const key = `agentMessage:${agentMessageId}`;

    const dataJson = JSON.stringify(messageData);
    await client.set(key, dataJson);
    await client.expire(key, ttlSeconds);

    payload.logger.debug(
      `[CMS Valkey] Stored agent message ${agentMessageId} with status ${messageData.status}`,
    );
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to store agent message');
    throw error;
  }
};

/**
 * Get agent message state
 * Retrieves the current state of an agent message being streamed
 */
export const getAgentMessage = async ({
  payload,
  agentMessageId,
}: {
  payload: BasePayload;
  agentMessageId: string;
}): Promise<AgentMessageData | null> => {
  try {
    const client = await getCmsValkeyClient(payload);
    const key = `agentMessage:${agentMessageId}`;

    const dataValue = await client.get(key);
    const dataJson = glideStringToString(dataValue);

    if (!dataJson) {
      return null;
    }

    const messageData = JSON.parse(dataJson) as AgentMessageData;
    return messageData;
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to get agent message');
    return null;
  }
};

/**
 * Update agent message
 * Used to update the state during streaming (e.g., status changes, content updates)
 */
export const updateAgentMessage = async ({
  payload,
  agentMessageId,
  updates,
  ttlSeconds = 60 * 60, // 1 hour
}: {
  payload: BasePayload;
  agentMessageId: string;
  updates: Partial<AgentMessageData>;
  ttlSeconds: number;
}): Promise<void> => {
  try {
    const client = await getCmsValkeyClient(payload);
    const key = `agentMessage:${agentMessageId}`;

    // Get existing message data
    const existingData = await getAgentMessage({ payload, agentMessageId });

    if (!existingData) {
      throw new Error(`Agent message ${agentMessageId} not found in cache`);
    }

    // Merge updates
    const updatedData: AgentMessageData = {
      ...existingData,
      ...updates,
      updatedAt: Date.now(),
    };

    // Store back to Valkey
    const dataJson = JSON.stringify(updatedData);
    await client.set(key, dataJson);
    await client.expire(key, ttlSeconds);

    payload.logger.debug(
      `[CMS Valkey] Updated agent message ${agentMessageId} with status ${updatedData.status}`,
    );
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to update agent message');
    throw error;
  }
};

/**
 * Delete agent message
 * Used after an agent response is complete and persisted to the database
 */
export const deleteAgentMessage = async ({
  payload,
  agentMessageId,
}: {
  payload: BasePayload;
  agentMessageId: string;
}): Promise<void> => {
  try {
    const client = await getCmsValkeyClient(payload);
    const key = `agentMessage:${agentMessageId}`;

    await client.del([key]);
    payload.logger.debug(`[CMS Valkey] Deleted agent message ${agentMessageId}`);
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to delete agent message');
    throw error;
  }
};

/**
 * Batch Operations
 *
 * These functions provide additional utilities for working with message caches.
 */

/**
 * Set entire message array (for bulk updates)
 * Replaces the entire message cache for a thread
 */
export const setRecentMessages = async ({
  payload,
  channelUid,
  threadUid,
  messages,
  ttlSeconds = 24 * 60 * 60, // 24 hours
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
  messages: CacheMessage[];
  ttlSeconds: number;
}): Promise<void> => {
  try {
    const client = await getCmsValkeyClient(payload);
    const key = `messages:${channelUid}:${threadUid}`;
    const value = JSON.stringify(messages);

    await client.set(key, value);
    await client.expire(key, ttlSeconds);

    payload.logger.debug(`[CMS Valkey] Set ${messages.length} messages for thread ${threadUid}`);
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to set recent messages');
    throw error;
  }
};

/**
 * Get count of cached messages
 * Returns the number of messages currently cached for a thread
 */
export const getMessageCount = async ({
  payload,
  channelUid,
  threadUid,
}: {
  payload: BasePayload;
  channelUid: string;
  threadUid: string;
}): Promise<number> => {
  try {
    const messages = await getRecentMessages({ payload, channelUid, threadUid });
    return messages.length;
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to get message count:');
    return 0;
  }
};

/**
 * Clear all caches for a channel (useful for testing)
 * Removes all message caches for all threads in a channel
 *
 * Note: This is a simplified version for Phase 4.
 * In production, you would use SCAN for large datasets.
 */
export const clearChannelCache = async (channelUid: string): Promise<void> => {
  try {
    payload.logger.debug(`[CMS Valkey] Clearing caches for channel ${channelUid}`);

    // For now, this is a placeholder that logs the intent
    // In Phase 8, we'll implement proper key scanning
    // The Glide client uses different methods than standard Redis
    // For manual cleanup, use: valkey-cli --scan --pattern "messages:channelUid:*" | xargs valkey-cli del

    payload.logger.warn(
      '[CMS Valkey] clearChannelCache is a placeholder in Phase 4. Implement with proper scanning in Phase 8.',
    );
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Failed to clear channel cache:');
    throw error;
  }
};
