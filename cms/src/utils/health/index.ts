import type { Payload } from 'payload';

export interface HealthStatus {
  status: 'healthy' | 'degraded';
  timestamp: string;
  services: {
    database: string;
    valkey: string;
    messageBroker: string;
  };
}

/**
 * Check health status of all services
 * Shared logic for REST endpoint and GraphQL query
 */
export const checkHealth = async (payload: Payload): Promise<HealthStatus> => {
  const health: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      valkey: 'unknown',
      messageBroker: 'unknown',
    },
  };

  // Check database
  try {
    await payload.find({
      collection: 'users',
      limit: 1,
    });
    health.services.database = 'healthy';
  } catch (_error) {
    health.services.database = 'unhealthy';
    health.status = 'degraded';
  }

  // Check Valkey
  try {
    const { getCmsValkeyClient } = await import('@/services/valkey/client');
    const cmsValkeyClient = await getCmsValkeyClient(payload);
    await cmsValkeyClient.ping();
    health.services.valkey = 'healthy';
  } catch (_error) {
    health.services.valkey = 'unhealthy';
    health.status = 'degraded';
  }

  // Check message broker
  try {
    const { getMessageBrokerSocket } = await import('@/services/message-broker');
    const socket = await getMessageBrokerSocket();
    health.services.messageBroker = socket.connected ? 'healthy' : 'disconnected';
    if (!socket.connected) {
      health.status = 'degraded';
    }
  } catch (_error) {
    health.services.messageBroker = 'unhealthy';
    health.status = 'degraded';
  }

  return health;
};
