export interface BaseMessage {
  id: string;
  threadUid: string;
  userUid: string;
}

export interface Message extends BaseMessage {
  payload: unknown;
}

export interface MessageConfirmation extends BaseMessage {
  status: 'delivered' | 'failed';
  error?: string;
}

export interface ThreadSubscription {
  userUid: string;
  threadUid: string;
  socketId: string;
  timestamp: number;
}

export interface BrokerEvent {
  type: 'subscribe' | 'unsubscribe' | 'message' | 'confirmation';
  payload: Message | MessageConfirmation | ThreadSubscription;
}
