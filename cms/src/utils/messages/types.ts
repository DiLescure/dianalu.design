import type { AgentMessage, UserMessage } from '@/payload-types';

export interface UserMessageContent {
  text: string;
}

export type AgentMessageContentStatus =
  | 'queued'
  | 'processing'
  | 'streaming'
  | 'complete'
  | 'error';

export interface AgentMessageContent {
  text: string;
  status: AgentMessageContentStatus;
  error?: string;
}

export interface UserMessageWithContent extends Omit<UserMessage, 'messageContent'> {
  messageContent: UserMessageContent;
}

export interface AgentMessageWithContent extends Omit<AgentMessage, 'messageContent'> {
  messageContent: AgentMessageContent;
}

export type SenderType = 'user' | 'agent';

/**
 * Helper to get both user and agent messages in order
 */
export type MessageWithType = (UserMessageWithContent | AgentMessageWithContent) & {
  senderType: SenderType;
};

export interface BroadcastMessage
  extends Omit<
    AgentMessage,
    | 'id'
    | 'messageContent'
    | 'channel'
    | 'thread'
    | 'senderAgent'
    | 'senderAgentUid'
    | 'originatorUser'
  > {
  senderType: SenderType;
  senderUid: string;
  partial?: boolean;
  timestamp: number;
  messageContent: UserMessageContent | AgentMessageContent;
}
