import { getAuthToken, isCmsClient } from '@/middleware/auth';
import { checkRateLimit } from '@/middleware/rateLimit';
import { checkSubscriptionLimit } from '@/middleware/subscriptionLimit';
import {
  addChannelParticipant,
  getUserFromUid,
  validateUserChannelAccess,
} from '@/services/cms/queries';
import { addSubscription } from '@/services/valkey';
import { registerChannelThread } from '@/services/valkey/cleanup';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const subscribeLogger = logger.child({ context: 'subscribe-handler' });

interface SubscribeData {
  channelUid: string;
  threadUid: string;
}

interface SubscribeResult {
  success: boolean;
  error?: string;
}

/**
 * Handle user subscription to a channel/thread
 */
export const handleUserSubscribe = async (
  socket: ExtendedSocket,
  data: SubscribeData,
): Promise<SubscribeResult> => {
  const userUid = socket.authResult.userUid;

  if (!userUid) {
    subscribeLogger.error({ socketId: socket.id }, 'User UID not found');
    return {
      success: false,
      error: 'User UID not found',
    };
  }

  subscribeLogger.info(
    { socketId: socket.id, userUid, channelUid: data.channelUid, threadUid: data.threadUid },
    'User subscribe request received',
  );

  try {
    // Validate input
    if (!data.channelUid || !data.threadUid) {
      subscribeLogger.warn({ socketId: socket.id, userUid }, 'Missing channelUid or threadUid');
      return {
        success: false,
        error: 'channelUid and threadUid are required',
      };
    }

    if (typeof data.channelUid !== 'string' || typeof data.threadUid !== 'string') {
      subscribeLogger.warn({ socketId: socket.id, userUid }, 'Invalid data types');
      return {
        success: false,
        error: 'channelId and threadId must be strings',
      };
    }

    // Check rate limit
    const rateLimitResult = await checkRateLimit(socket, 'subscribe');
    if (!rateLimitResult.allowed) {
      subscribeLogger.warn({ socketId: socket.id, userUid }, 'Rate limit exceeded for subscribe');
      return {
        success: false,
        error: rateLimitResult.error || 'Rate limit exceeded',
      };
    }

    // Check subscription limit
    const subLimitResult = await checkSubscriptionLimit(socket);
    if (!subLimitResult.allowed) {
      subscribeLogger.warn(
        { socketId: socket.id, userUid, current: subLimitResult.current },
        'Subscription limit exceeded',
      );
      return {
        success: false,
        error: subLimitResult.error || 'Too many subscriptions',
      };
    }

    // Get auth token for CMS requests
    const token = getAuthToken(socket);
    if (!token) {
      subscribeLogger.error({ socketId: socket.id, userUid }, 'No auth token available');
      return {
        success: false,
        error: 'Authentication token not found',
      };
    }

    const user = await getUserFromUid(userUid, token);
    if (!user) {
      subscribeLogger.error({ socketId: socket.id, userUid }, 'User not found');
      return {
        success: false,
        error: 'User not found',
      };
    }

    // Validate channel access
    const accessValidation = await validateUserChannelAccess(
      user.id,
      data.channelUid,
      data.threadUid,
      token,
    );

    if (!accessValidation.isValid) {
      subscribeLogger.warn(
        { socketId: socket.id, userUid, error: accessValidation.error },
        'Channel access validation failed',
      );
      return {
        success: false,
        error: accessValidation.error || 'Access denied',
      };
    }

    // Add user to channel participant list
    const participantAdded = await addChannelParticipant(data.channelUid, user.id, token);

    if (!participantAdded) {
      subscribeLogger.error(
        { socketId: socket.id, userUid, channelUid: data.channelUid },
        'Failed to add user to participant list',
      );
      // Continue anyway - this is not critical for subscription
    }

    // Store socket mappings in Valkey
    await addSubscription(socket.id, data.channelUid, data.threadUid);

    // Register channel/thread for cleanup tracking
    registerChannelThread(data.channelUid, data.threadUid);

    subscribeLogger.info(
      { socketId: socket.id, userUid, channelUid: data.channelUid, threadUid: data.threadUid },
      'User subscribed successfully',
    );

    return {
      success: true,
    };
  } catch (error) {
    subscribeLogger.error({ error, socketId: socket.id, userUid }, 'Error handling user subscribe');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
};

/**
 * Handle CMS subscription to a channel/thread
 */
export const handleCmsSubscribe = async (
  socket: ExtendedSocket,
  data: SubscribeData,
): Promise<SubscribeResult> => {
  subscribeLogger.info(
    { socketId: socket.id, channelUid: data.channelUid, threadUid: data.threadUid },
    'CMS subscribe request received',
  );

  try {
    // Validate CMS authentication
    if (!isCmsClient(socket)) {
      subscribeLogger.warn({ socketId: socket.id }, 'Invalid CMS client');
      return {
        success: false,
        error: 'Invalid CMS authentication',
      };
    }

    // Validate input
    if (!data.channelUid || !data.threadUid) {
      subscribeLogger.warn({ socketId: socket.id }, 'Missing channelUid or threadUid');
      return {
        success: false,
        error: 'channelUid and threadUid are required',
      };
    }

    if (typeof data.channelUid !== 'string' || typeof data.threadUid !== 'string') {
      subscribeLogger.warn({ socketId: socket.id }, 'Invalid data types');
      return {
        success: false,
        error: 'channelUid and threadUid must be strings',
      };
    }

    // Store socket mappings in Valkey (no participant list update for CMS)
    await addSubscription(socket.id, data.channelUid, data.threadUid);

    // Register channel/thread for cleanup tracking
    registerChannelThread(data.channelUid, data.threadUid);

    subscribeLogger.info(
      { socketId: socket.id, channelUid: data.channelUid, threadUid: data.threadUid },
      'CMS subscribed successfully',
    );

    return {
      success: true,
    };
  } catch (error) {
    subscribeLogger.error({ error, socketId: socket.id }, 'Error handling CMS subscribe');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
};
