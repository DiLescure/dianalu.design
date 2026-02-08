import { logger } from '@/utils/logger';

const metricsLogger = logger.child({ context: 'metrics' });

interface MetricData {
  count: number;
  lastUpdated: number;
}

const metrics: Record<string, MetricData> = {};

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
 * Get all current metrics
 */
export const getMetrics = (): Record<string, MetricData> => {
  return { ...metrics };
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
};

/**
 * Record broadcast statistics
 */
export const recordBroadcast = (
  channelUid: string,
  threadUid: string,
  success: boolean,
  recipientCount: number,
  type: 'message' | 'threadState' = 'message',
): void => {
  if (success) {
    if (type === 'message') {
      recordMetric('messagesbroadcasted', 1);
    } else if (type === 'threadState') {
      recordMetric('threadStatesBroadcasted', 1);
    }
    recordMetric('broadcastsSuccessful', 1);
  } else {
    recordMetric('broadcastsFailed', 1);
  }

  metricsLogger.debug(
    {
      channelUid,
      threadUid,
      type,
      success,
      recipientCount,
    },
    'Broadcast recorded',
  );
};

/**
 * Record subscription metrics
 */
export const recordSubscription = (
  channelUid: string,
  threadUid: string,
  success: boolean,
  clientType: 'user' | 'cms',
): void => {
  if (success) {
    recordMetric('subscriptionsSuccessful', 1);
    if (clientType === 'user') {
      recordMetric('userSubscriptions', 1);
    } else {
      recordMetric('cmsSubscriptions', 1);
    }
  } else {
    recordMetric('subscriptionsFailed', 1);
  }

  metricsLogger.debug(
    {
      channelUid,
      threadUid,
      success,
      clientType,
    },
    'Subscription recorded',
  );
};

/**
 * Record rate limit violation
 */
export const recordRateLimitViolation = (
  socketId: string,
  userUid: string,
  action: string,
): void => {
  recordMetric('rateLimitViolations', 1);

  metricsLogger.warn(
    {
      socketId,
      userUid,
      action,
      timestamp: new Date().toISOString(),
    },
    'Rate limit violation',
  );
};

/**
 * Record subscription limit violation
 */
export const recordSubscriptionLimitViolation = (
  socketId: string,
  userUid: string,
  currentCount: number,
): void => {
  recordMetric('subscriptionLimitViolations', 1);

  metricsLogger.warn(
    {
      socketId,
      userUid,
      currentCount,
      timestamp: new Date().toISOString(),
    },
    'Subscription limit violation',
  );
};

/**
 * Record Valkey operation
 */
export const recordValkeyOperation = (
  operation: string,
  success: boolean,
  durationMs: number,
): void => {
  if (success) {
    recordMetric('valkeyOperationsSuccessful', 1);
  } else {
    recordMetric('valkeyOperationsFailed', 1);
  }

  metricsLogger.debug(
    {
      operation,
      success,
      durationMs,
      timestamp: new Date().toISOString(),
    },
    'Valkey operation recorded',
  );
};
