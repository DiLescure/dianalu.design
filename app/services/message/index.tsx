import { createContext, use } from 'react';

import type { Socket } from 'socket.io-client';

export interface ThreadLockBroadcast {
  channelUid: string;
  threadUid: string;
  state: {
    lockedAt: string | null;
    lockReason: string | null;
  };
}

export interface MessageContextType {
  connected: boolean;
  error: string | null;
  subscribe: (channelId: string, threadId: string) => void;
  unsubscribe: (channelId: string, threadId: string) => void;
  socketId: string | null;
  socket: Socket | null;
  threadLockBroadcast: ThreadLockBroadcast | null;
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = use(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within MessageProvider');
  }
  return context;
};
