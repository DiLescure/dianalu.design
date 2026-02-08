'use server';
import { type AgentRequest, processAgentRequest } from '.';

let agentRequestQueue: AgentRequest[] = [];
const MAX_QUEUE_SIZE = 100; // Prevent memory exhaustion

/**
 * Add an agent request to the processing queue
 * The queue is processed every second by the queue handler
 */
export const queueAgentRequest = async (agentRequest: AgentRequest): Promise<void> => {
  // Check queue size to prevent overflow
  if (agentRequestQueue.length >= MAX_QUEUE_SIZE) {
    console.error('[AI Queue] Queue is full, rejecting request:', {
      queueLength: agentRequestQueue.length,
      maxSize: MAX_QUEUE_SIZE,
      agentUid: agentRequest.agentUid,
      threadUid: agentRequest.threadUid,
    });

    // Record overflow metric
    try {
      const { recordMetric } = await import('@/utils/monitoring/metrics');
      recordMetric('agentRequestsFailed', 1);
    } catch (_metricsError) {
      console.debug('[AI Queue] Could not record overflow metric');
    }

    throw new Error('Agent request queue is full. Please try again later.');
  }

  console.log('[AI Queue] Queueing agent request:', {
    ...agentRequest,
    queueLength: agentRequestQueue.length + 1,
  });

  agentRequestQueue.push(agentRequest);
};

/**
 * Get the current queue length
 */
export const getQueueLength = async (): Promise<number> => {
  return agentRequestQueue.length;
};

/**
 * Get queue statistics
 */
export const getQueueStats = async (): Promise<{
  queueLength: number;
  maxQueueSize: number;
  utilizationPercent: number;
  isProcessing: boolean;
}> => {
  return {
    queueLength: agentRequestQueue.length,
    maxQueueSize: MAX_QUEUE_SIZE,
    utilizationPercent: (agentRequestQueue.length / MAX_QUEUE_SIZE) * 100,
    isProcessing: queueInProgress !== null,
  };
};

/**
 * Clear the entire queue (useful for testing or emergency cleanup)
 */
export const clearQueue = async (): Promise<void> => {
  const clearedCount = agentRequestQueue.length;
  agentRequestQueue = [];
  console.log('[AI Queue] Agent request queue cleared', { clearedCount });
};

let queueInProgress: null | number = null; // timestamp of when queue processing started

/**
 * Queue handler - processes all pending agent requests
 * Runs every second via setInterval
 */
const queueHandler = async (): Promise<void> => {
  const agentRequestQueueLength = agentRequestQueue.length;

  // Don't process if already processing or queue is empty
  if (queueInProgress || agentRequestQueueLength < 1) {
    return;
  }

  queueInProgress = Date.now();
  const startTime = Date.now();

  console.log('[AI Queue] Processing queue', {
    queueLength: agentRequestQueueLength,
    startTime,
  });

  try {
    // Process all requests in parallel with error handling for each
    const results = await Promise.all(
      agentRequestQueue.map((agentRequest) =>
        processAgentRequest(agentRequest).catch((error) => {
          console.error('[AI Queue] Error processing agent request:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            agentUid: agentRequest.agentUid,
            threadUid: agentRequest.threadUid,
            channelUid: agentRequest.channelUid,
          });
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }),
      ),
    );

    const successCount = results.filter((r) => r.success).length;
    const errorCount = results.filter((r) => !r.success).length;
    const processingTime = Date.now() - startTime;

    console.log('[AI Queue] Queue processing complete', {
      successCount,
      errorCount,
      totalProcessed: agentRequestQueueLength,
      processingTimeMs: processingTime,
    });

    // Record metrics (individual request metrics already recorded by processAgentRequest)
    try {
      // const { recordMetric } = await import('@/utils/monitoring/metrics');
      if (errorCount > 0) {
        console.warn('[AI Queue] Some requests failed', { errorCount, successCount });
      }
    } catch (_metricsError) {
      console.debug('[AI Queue] Could not record metrics');
    }

    // Remove processed items from queue
    agentRequestQueue.splice(0, agentRequestQueueLength);

    // Filter out any undefined values (defensive programming)
    agentRequestQueue = agentRequestQueue.filter((req) => req !== undefined);
  } catch (error) {
    console.error('[AI Queue] Error in queue handler:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      queueLength: agentRequestQueueLength,
    });

    // Record catastrophic queue failure
    try {
      const { recordMetric } = await import('@/utils/monitoring/metrics');
      recordMetric('agentRequestsFailed', agentRequestQueueLength);
    } catch (_metricsError) {
      console.debug('[AI Queue] Could not record error metric');
    }
  } finally {
    queueInProgress = null;
  }
};

// Process queue every second
const queueInterval = setInterval(queueHandler, 1000);

/**
 * Stop the queue handler (for cleanup on server shutdown)
 */
export const stopQueueHandler = async (): Promise<void> => {
  clearInterval(queueInterval);
  console.log('[AI Queue] Agent request queue handler stopped');
};
