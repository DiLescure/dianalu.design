/**
 * Metrics tracking for CMS operations
 * In production, these would be sent to a metrics aggregation system (Prometheus, StatsD, etc.)
 * For now, we use in-memory counters with structured logging
 */

interface MetricData {
  count: number;
  lastUpdated: number;
}

interface ProcessingTimeData {
  totalMs: number;
  count: number;
  avgMs: number;
  lastUpdated: number;
}

const metrics: Record<string, MetricData> = {};
const processingTimes: Record<string, ProcessingTimeData> = {
  agentProcessing: { totalMs: 0, count: 0, avgMs: 0, lastUpdated: Date.now() },
};

/**
 * Record a metric increment
 */
export const recordMetric = (metricName: string, increment: number = 1): void => {
  if (!metrics[metricName]) {
    metrics[metricName] = { count: 0, lastUpdated: Date.now() };
  }

  metrics[metricName].count += increment;
  metrics[metricName].lastUpdated = Date.now();
};

/**
 * Record processing time for operations
 */
export const recordProcessingTime = (
  durationMs: number,
  operation: string = 'agentProcessing',
): void => {
  if (!processingTimes[operation]) {
    processingTimes[operation] = { totalMs: 0, count: 0, avgMs: 0, lastUpdated: Date.now() };
  }

  const pt = processingTimes[operation];
  pt.totalMs += durationMs;
  pt.count += 1;
  pt.avgMs = pt.totalMs / pt.count;
  pt.lastUpdated = Date.now();
};

/**
 * Get all current metrics
 */
export const getMetrics = (): {
  counters: Record<string, MetricData>;
  processingTimes: Record<string, ProcessingTimeData>;
  timestamp: string;
} => {
  return {
    counters: { ...metrics },
    processingTimes: { ...processingTimes },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get a specific metric value
 */
export const getMetric = (metricName: string): number => {
  return metrics[metricName]?.count || 0;
};

/**
 * Reset all metrics (useful for testing)
 */
export const resetMetrics = (): void => {
  Object.keys(metrics).forEach((key) => {
    delete metrics[key];
  });
  Object.keys(processingTimes).forEach((key) => {
    delete processingTimes[key];
  });
  processingTimes.agentProcessing = { totalMs: 0, count: 0, avgMs: 0, lastUpdated: Date.now() };
};

/**
 * Get metrics summary for health checks
 */
export const getMetricsSummary = (): {
  agentRequests: { processed: number; failed: number; successRate: number };
  broadcasts: { sent: number; failed: number; successRate: number };
  averageProcessingTimeMs: number;
} => {
  const processed = getMetric('agentRequestsProcessed');
  const failed = getMetric('agentRequestsFailed');
  const broadcastsSent = getMetric('broadcastsSent');
  const broadcastsFailed = getMetric('broadcastsFailed');

  const agentSuccessRate = processed + failed > 0 ? (processed / (processed + failed)) * 100 : 0;

  const broadcastSuccessRate =
    broadcastsSent + broadcastsFailed > 0
      ? (broadcastsSent / (broadcastsSent + broadcastsFailed)) * 100
      : 0;

  return {
    agentRequests: {
      processed,
      failed,
      successRate: Math.round(agentSuccessRate * 100) / 100,
    },
    broadcasts: {
      sent: broadcastsSent,
      failed: broadcastsFailed,
      successRate: Math.round(broadcastSuccessRate * 100) / 100,
    },
    averageProcessingTimeMs: Math.round(processingTimes.agentProcessing?.avgMs || 0),
  };
};
