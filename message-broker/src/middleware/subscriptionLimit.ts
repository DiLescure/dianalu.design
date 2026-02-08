import { config } from '@/config';
import { getSocketSubscriptions } from '@/services/valkey';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const subLimitLogger = logger.child({ context: 'subscription-limit' });

/**
 * Check if socket has exceeded subscription limit
 */
export const checkSubscriptionLimit = async (
  socket: ExtendedSocket,
): Promise<{
  allowed: boolean;
  current: number;
  limit: number;
  error?: string;
}> => {
  try {
    const subscriptions = await getSocketSubscriptions(socket.id);
    const current = subscriptions.length;
    const limit = config.threads.maxSubscriptionsPerUser;

    if (current >= limit) {
      subLimitLogger.warn(
        { socketId: socket.id, userId: socket.authResult?.userId, current, limit },
        'Subscription limit exceeded',
      );

      return {
        allowed: false,
        current,
        limit,
        error: `Subscription limit exceeded. Maximum ${limit} concurrent subscriptions allowed.`,
      };
    }

    subLimitLogger.debug(
      { socketId: socket.id, userId: socket.authResult?.userId, current, limit },
      'Subscription limit check passed',
    );

    return {
      allowed: true,
      current,
      limit,
    };
  } catch (error) {
    subLimitLogger.error({ error, socketId: socket.id }, 'Error checking subscription limit');

    // On error, allow the subscription (fail open)
    return {
      allowed: true,
      current: 0,
      limit: config.threads.maxSubscriptionsPerUser,
      error: 'Subscription limit check failed',
    };
  }
};

/**
 * Get current subscription count for a socket
 */
export const getSubscriptionCount = async (socketId: string): Promise<number> => {
  try {
    const subscriptions = await getSocketSubscriptions(socketId);
    return subscriptions.length;
  } catch (error) {
    subLimitLogger.error({ error, socketId }, 'Error getting subscription count');
    return 0;
  }
};
