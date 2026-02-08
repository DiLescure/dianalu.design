interface BroadcastStats {
  totalBroadcasts: number;
  successfulBroadcasts: number;
  failedBroadcasts: number;
  totalRecipients: number;
  averageRecipients: number;
  lastBroadcast?: {
    channelUid: string; // Uses Uid for tracking
    threadUid: string; // Uses Uid for tracking
    recipientCount: number;
    timestamp: number;
  };
}

const stats: BroadcastStats = {
  totalBroadcasts: 0,
  successfulBroadcasts: 0,
  failedBroadcasts: 0,
  totalRecipients: 0,
  averageRecipients: 0,
};

export const recordBroadcast = (
  channelUid: string, // Uses Uid for tracking
  threadUid: string, // Uses Uid for tracking
  success: boolean,
  recipientCount: number,
): void => {
  stats.totalBroadcasts++;

  if (success) {
    stats.successfulBroadcasts++;
    stats.totalRecipients += recipientCount;
    stats.averageRecipients = stats.totalRecipients / stats.successfulBroadcasts;
  } else {
    stats.failedBroadcasts++;
  }

  stats.lastBroadcast = {
    channelUid,
    threadUid,
    recipientCount,
    timestamp: Date.now(),
  };
};

export const getStats = (): BroadcastStats => {
  return { ...stats };
};

export const resetStats = (): void => {
  stats.totalBroadcasts = 0;
  stats.successfulBroadcasts = 0;
  stats.failedBroadcasts = 0;
  stats.totalRecipients = 0;
  stats.averageRecipients = 0;
  delete stats.lastBroadcast;
};
