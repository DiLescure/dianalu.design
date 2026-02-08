import type { PayloadHandler } from 'payload';
import { getMetrics, getMetricsSummary } from '@/utils/monitoring/metrics';

/**
 * Metrics endpoint
 * GET /api/metrics
 *
 * Returns operational metrics:
 * - Agent requests (processed, failed, success rate)
 * - Broadcasts (sent, failed, success rate)
 * - Average processing time
 * - All metric counters
 * - System uptime and memory usage
 *
 * Returns 200 with metrics data
 */
export const metricsEndpoint: PayloadHandler = async (_req) => {
  const allMetrics = getMetrics();
  const summary = getMetricsSummary();

  const metrics = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    summary,
    counters: allMetrics.counters,
    processingTimes: allMetrics.processingTimes,
  };

  return Response.json(metrics, { status: 200 });
};
