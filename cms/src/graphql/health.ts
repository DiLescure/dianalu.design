import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import type { PayloadRequest } from 'payload';
import { checkHealth } from '@/utils/health';

/**
 * GraphQL type for health check
 */
const HealthStatusType = new GraphQLObjectType({
  name: 'HealthStatus',
  fields: {
    status: { type: new GraphQLNonNull(GraphQLString) },
    timestamp: { type: new GraphQLNonNull(GraphQLString) },
    services: {
      type: new GraphQLObjectType({
        name: 'HealthServices',
        fields: {
          database: { type: new GraphQLNonNull(GraphQLString) },
          valkey: { type: new GraphQLNonNull(GraphQLString) },
          messageBroker: { type: new GraphQLNonNull(GraphQLString) },
        },
      }),
    },
  },
});

/**
 * GraphQL query for health check
 * Usage: query { health { status timestamp services { database valkey messageBroker } } }
 */
export const healthQuery = {
  type: HealthStatusType,
  resolve: async (_: any, __: any, context: { req: PayloadRequest }) => {
    const { req } = context;
    const { payload } = req;

    return await checkHealth(payload);
  },
};
