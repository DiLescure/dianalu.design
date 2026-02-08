export interface BroadcastMessage {
  channelUid: string;
  threadUid: string;
  senderType: 'user' | 'agent';
  senderUid: string;
  partial?: boolean;
  timestamp: number;
  messageContent: {
    text: string;
    status?: 'queued' | 'processing' | 'streaming' | 'complete' | 'error';
    error?: string;
  };
  id: number;
  recipientType: 'user' | 'agent' | 'broadcast';
  recipientUid?: string | null;
  updatedAt: string;
  createdAt: string;
  originatorUserUid?: string | null;
}

export interface ThreadStateUpdate {
  channelUid: string; // Uid for routing
  threadUid: string; // Uid for routing
  state: {
    lockedAt: string | null;
    lockReason: string | null;
  };
}

export interface BroadcastResult {
  success: boolean;
  recipientCount: number;
  errors?: string[];
}

export type BroadcastEvent =
  | { eventType: 'message'; data: BroadcastMessage }
  | { eventType: 'threadState'; data: ThreadStateUpdate };
