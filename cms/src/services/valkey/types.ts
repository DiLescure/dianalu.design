import type { AgentMessageContentStatus, SenderType } from '@/utils/messages/types';

export interface AgentMessageData {
  id: string;
  agentId: string;
  channelId: string;
  threadId: string;
  messageContent: any;
  status: AgentMessageContentStatus;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CacheMessage {
  id: number; // Payload internal IDs are numbers, but we accept strings too
  senderType: SenderType;
  senderUid: string;
  messageContent: string; // JSON content
  timestamp: number;
  channelUid: string;
  threadUid: string;
}

export interface ParsedCacheMessage extends Omit<CacheMessage, 'messageContent'> {
  messageContent: {
    text: string;
    status?: AgentMessageData['status'];
  };
}
