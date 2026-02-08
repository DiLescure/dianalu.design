import type { PayloadHandler } from 'payload';
import { checkHealth } from '@/utils/health';

/**
 * Health check endpoint
 * GET /api/health
 *
 * Returns health status of all services:
 * - Database connectivity
 * - Valkey connectivity
 * - Message broker connection
 *
 * Returns 200 if healthy, 503 if degraded
 */
export const healthEndpoint: PayloadHandler = async (req) => {
  const { payload } = req;
  const health = await checkHealth(payload);
  const statusCode = health.status === 'healthy' ? 200 : 503;

  return Response.json(health, { status: statusCode });
};
