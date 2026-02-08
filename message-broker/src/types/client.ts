import type { ThreadSubscription } from './message';

export interface ClientMetadata {
  userUid: string;
  clientType: 'user' | 'cms';
  token: string;
  threadSubscriptionList: ThreadSubscription[];
  lastActivity: number;
}

export interface ClientStore {
  [socketId: string]: ClientMetadata;
}
