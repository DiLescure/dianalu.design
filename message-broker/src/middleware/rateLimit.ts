import { config } from '@/config';
import { getMessageBrokerValkeyClient } from '@/services/valkey/client';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const rateLimitLogger = logger.child({ context: 'rate-limit' });

/**
 * Check if socket has exceeded rate limit for a specific action
 */
export const checkRateLimit = async (
  socket: ExtendedSocket,
  action: string,
): Promise<{
  allowed: boolean;
  current?: number;
  limit?: number;
  error?: string;
}> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `rateLimit:${socket.id}:${action}`;

    // Get current count
    const currentData = await client.get(key);
    const currentStr = currentData ? currentData.toString() : null;
    const current = currentStr ? parseInt(currentStr, 10) : 0;

    const limit = config.rateLimit.maxRequestsPerWindow;
    const windowMs = config.rateLimit.windowMs;
    const windowSeconds = Math.ceil(windowMs / 1000);

    // Check if limit exceeded
    if (current >= limit) {
      rateLimitLogger.warn({ socketId: socket.id, action, current, limit }, 'Rate limit exceeded');

      return {
        allowed: false,
        current,
        limit,
        error: `Rate limit exceeded. Maximum ${limit} requests per ${windowSeconds} seconds.`,
      };
    }

    // Increment counter
    const newCount = current + 1;
    await client.set(key, newCount.toString());

    // Set expiry if this is the first request in the window
    if (current === 0) {
      await client.expire(key, windowSeconds);
    }

    rateLimitLogger.debug(
      { socketId: socket.id, action, count: newCount, limit },
      'Rate limit check passed',
    );

    return {
      allowed: true,
      current: newCount,
      limit,
    };
  } catch (error) {
    rateLimitLogger.error({ error, socketId: socket.id, action }, 'Error checking rate limit');

    // On error, allow the request (fail open)
    return {
      allowed: true,
      error: 'Rate limit check failed',
    };
  }
};

/**
 * Reset rate limit for a socket and action
 * Useful for testing or manual resets
 */
export const resetRateLimit = async (socketId: string, action: string): Promise<boolean> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `rateLimit:${socketId}:${action}`;

    await client.del([key]);

    rateLimitLogger.info({ socketId, action }, 'Rate limit reset');
    return true;
  } catch (error) {
    rateLimitLogger.error({ error, socketId, action }, 'Error resetting rate limit');
    return false;
  }
};
