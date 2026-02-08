import type { AgentMessage, UserMessage } from '@/payload-types';

/**
 * User message in virtual collection
 * Extends UserMessage to maintain consistency as types evolve
 */
export interface VirtualUserMessage extends Omit<UserMessage, 'channel' | 'thread' | 'senderUser'> {
  senderType: 'user';

  // Keep original Uid fields from UserMessage
  // channelUid, threadUid, senderUserUid, recipientUid, messageContent, createdAt, updatedAt, deletedAt

  // Optional populated sender (when depth: 1)
  senderUser?: {
    id: number;
    userUid: string;
    email: string;
  };
}

/**
 * Agent message in virtual collection
 * Extends AgentMessage to maintain consistency as types evolve
 */
export interface VirtualAgentMessage
  extends Omit<AgentMessage, 'channel' | 'thread' | 'senderAgent' | 'originatorUser'> {
  senderType: 'agent';

  // Keep original Uid fields from AgentMessage
  // channelUid, threadUid, senderAgentUid, originatorUserUid, recipientUid, messageContent, createdAt, updatedAt, deletedAt

  // Optional populated sender and originator (when depth: 1)
  senderAgent?: {
    id: number;
    agentUid: string;
    agentName: string;
  };

  originatorUser?: {
    id: number;
    userUid: string;
    email: string;
  };
}

/**
 * Union type for all messages
 */
export type VirtualMessage = VirtualUserMessage | VirtualAgentMessage;

/**
 * Paginated response following Payload conventions
 */
export interface VirtualMessageResponse {
  docs: VirtualMessage[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Cache response (no pagination, just recent messages)
 */
export interface VirtualMessageCacheResponse {
  docs: VirtualMessage[];
  totalDocs: number;
  source: 'cache';
}

/**
 * Query parameters for virtual messages
 */
export interface VirtualMessageQuery {
  // Required filters
  threadUid: string;

  // Optional filters
  channelUid?: string;
  senderType?: 'user' | 'agent'; // Use existing convention
  senderUserUid?: string;
  senderAgentUid?: string;
  includeDeleted?: boolean; // Whether to include soft-deleted messages (default: false)

  // Pagination
  page?: number;
  limit?: number;

  // Sorting
  sort?: 'createdAt' | '-createdAt';

  // Reverse result order (applied after sort, useful for UI display)
  reverse?: boolean;

  // Source preference
  source?: 'cache' | 'database' | 'auto';
}
