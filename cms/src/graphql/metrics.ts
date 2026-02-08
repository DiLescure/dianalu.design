import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { PayloadRequest } from 'payload';
import { getMetricsSummary } from '@/utils/monitoring/metrics';

/**
 * GraphQL type for agent request metrics
 */
const AgentRequestMetricsType = new GraphQLObjectType({
  name: 'AgentRequestMetrics',
  fields: {
    processed: { type: new GraphQLNonNull(GraphQLInt) },
    failed: { type: new GraphQLNonNull(GraphQLInt) },
    successRate: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

/**
 * GraphQL type for broadcast metrics
 */
const BroadcastMetricsType = new GraphQLObjectType({
  name: 'BroadcastMetrics',
  fields: {
    sent: { type: new GraphQLNonNull(GraphQLInt) },
    failed: { type: new GraphQLNonNull(GraphQLInt) },
    successRate: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

/**
 * GraphQL type for metrics summary
 */
const MetricsSummaryType = new GraphQLObjectType({
  name: 'MetricsSummary',
  fields: {
    timestamp: { type: new GraphQLNonNull(GraphQLString) },
    agentRequests: { type: new GraphQLNonNull(AgentRequestMetricsType) },
    broadcasts: { type: new GraphQLNonNull(BroadcastMetricsType) },
    averageProcessingTimeMs: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

/**
 * GraphQL query for metrics
 * Usage: query { metrics { timestamp agentRequests { processed failed successRate } broadcasts { sent failed successRate } averageProcessingTimeMs } }
 */
export const metricsQuery = {
  type: MetricsSummaryType,
  resolve: async (_: any, __: any, _context: { req: PayloadRequest }) => {
    const summary = getMetricsSummary();

    return {
      timestamp: new Date().toISOString(),
      agentRequests: summary.agentRequests,
      broadcasts: summary.broadcasts,
      averageProcessingTimeMs: summary.averageProcessingTimeMs,
    };
  },
};
