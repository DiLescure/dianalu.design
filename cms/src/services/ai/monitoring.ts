interface ProcessingMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  agentId: string;
  channelId: string;
  threadId: string;
  status: 'processing' | 'success' | 'error';
  error?: string;
  messageLength?: number;
  streamingChunks?: number;
}

const processingMetrics: Map<string, ProcessingMetrics> = new Map();

export const startMetrics = (
  requestId: string,
  data: {
    agentId: string;
    channelId: string;
    threadId: string;
  },
): void => {
  processingMetrics.set(requestId, {
    ...data,
    startTime: Date.now(),
    status: 'processing',
    streamingChunks: 0,
  });
};

export const incrementChunks = (requestId: string): void => {
  const metrics = processingMetrics.get(requestId);
  if (metrics) {
    metrics.streamingChunks = (metrics.streamingChunks || 0) + 1;
  }
};

export const endMetrics = (
  requestId: string,
  data: {
    status: 'success' | 'error';
    error?: string;
    messageLength?: number;
  },
): void => {
  const metrics = processingMetrics.get(requestId);
  if (metrics) {
    metrics.endTime = Date.now();
    metrics.duration = metrics.endTime - metrics.startTime;
    metrics.status = data.status;
    metrics.error = data.error;
    metrics.messageLength = data.messageLength;

    console.log('[AI Monitoring] Agent processing metrics:', {
      requestId,
      ...metrics,
    });

    // Clean up old metrics (keep for 5 minutes)
    setTimeout(() => processingMetrics.delete(requestId), 5 * 60 * 1000);
  }
};

export const getMetrics = (requestId: string): ProcessingMetrics | undefined => {
  return processingMetrics.get(requestId);
};

export const getAllMetrics = (): ProcessingMetrics[] => {
  return Array.from(processingMetrics.values());
};
