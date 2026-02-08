import type { Agent, AgentMessage, UserMessage } from '@/payload-types';
import type { CacheMessage, ParsedCacheMessage } from '@/services/valkey/types';
import type { MessageWithType, UserMessageContent } from '@/utils/messages/types';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const formatUserMessageForCache = (
  message: MessageWithType,
  channelUid: string,
  threadUid: string,
): CacheMessage => {
  return {
    id: message.id,
    senderType: message.senderType,
    senderUid:
      (message.senderType === 'user'
        ? (message as unknown as UserMessage).senderUserUid
        : (message as unknown as AgentMessage).senderAgentUid) || 'unknown',
    messageContent: JSON.stringify(message.messageContent),
    timestamp: new Date(message.createdAt).getTime(),
    channelUid,
    threadUid,
  };
};

/**
 * Parse cached message with error handling
 * Returns null if JSON parsing fails (corrupted cache data)
 */
export const parseCacheMessage = (message: CacheMessage): ParsedCacheMessage | null => {
  try {
    return {
      ...message,
      messageContent: JSON.parse(message.messageContent),
    };
  } catch (error) {
    // Log but don't throw - allow AI processing to continue without this message
    console.error('[AI Formatting] Failed to parse cache message:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      messageId: message.id,
      senderType: message.senderType,
    });
    return null;
  }
};

/**
 * Format cached messages for AI provider
 * Note: agentUid is the Uid string (e.g., "6BrA8NDlEJ6913b7e69sfDla")
 * Note: Now filters out null values from failed parses
 */
export const formatMessagesForAI = (messages: (ParsedCacheMessage | null)[]): AIMessage[] => {
  return messages
    .filter((msg): msg is ParsedCacheMessage => msg !== null) // Filter out failed parses, type guard
    .map((msg) => {
      // Determine role based on message type and sender
      // msg.senderUid is the Uid string from the cached message
      const isAgentMessage = msg.senderType === 'agent';
      const role: AIMessage['role'] = isAgentMessage ? 'assistant' : 'user';

      // Extract text content (handle various content formats)
      const content = extractTextContent(msg.messageContent);

      return {
        role,
        content,
      };
    })
    .filter((msg) => msg.content.trim() !== '');
};

/**
 * Extract text content from message content object
 */
export const extractTextContent = (content: UserMessageContent): string => {
  if (typeof content === 'string') {
    return content;
  }

  if (content && typeof content === 'object') {
    // Try common content fields
    if (typeof content.text === 'string') return content.text;

    // Fallback to JSON string
    return JSON.stringify(content);
  }

  return String(content || '');
};

/**
 * Format agent system message with context
 */
export const formatSystemMessage = (agent: Agent, additionalContext?: string): string => {
  let systemMessage = agent.agentSystemMessage;

  if (additionalContext) {
    systemMessage += `\n\n${additionalContext}`;
  }

  return systemMessage;
};
