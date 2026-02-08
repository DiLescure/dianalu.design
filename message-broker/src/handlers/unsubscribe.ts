import { getAuthToken, isCmsClient } from '@/middleware/auth';
import { getUserFromUid, removeChannelParticipant } from '@/services/cms/queries';
import { removeSubscription } from '@/services/valkey';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const unsubscribeLogger = logger.child({ context: 'unsubscribe-handler' });

interface UnsubscribeData {
  channelUid: string;
  threadUid: string;
}

interface UnsubscribeResult {
  success: boolean;
  error?: string;
}

/**
 * Handle user unsubscription from a channel/thread
 */
export const handleUserUnsubscribe = async (
  socket: ExtendedSocket,
  data: UnsubscribeData,
): Promise<UnsubscribeResult> => {
  const userUid = socket.authResult.userUid;

  if (!userUid) {
    unsubscribeLogger.error({ socketId: socket.id }, 'User UID not found');
    return {
      success: false,
      error: 'User UID not found',
    };
  }

  unsubscribeLogger.info(
    { socketId: socket.id, userUid, channelUid: data.channelUid, threadUid: data.threadUid },
    'User unsubscribe request received',
  );

  try {
    // Validate input
    if (!data.channelUid || !data.threadUid) {
      unsubscribeLogger.warn({ socketId: socket.id, userUid }, 'Missing channelUid or threadUid');
      return {
        success: false,
        error: 'channelUid and threadUid are required',
      };
    }

    if (typeof data.channelUid !== 'string' || typeof data.threadUid !== 'string') {
      unsubscribeLogger.warn({ socketId: socket.id, userUid }, 'Invalid data types');
      return {
        success: false,
        error: 'channelId and threadId must be strings',
      };
    }

    // Remove socket mappings from Valkey
    await removeSubscription(socket.id, data.channelUid, data.threadUid);

    // Get auth token for CMS requests
    const token = getAuthToken(socket);
    if (token && userUid) {
      const user = await getUserFromUid(userUid, token);
      if (!user) {
        unsubscribeLogger.error({ socketId: socket.id, userUid }, 'User not found');
        return {
          success: false,
          error: 'User not found',
        };
      }

      // Remove user from channel participant list
      const participantRemoved = await removeChannelParticipant(data.channelUid, user.id, token);

      if (!participantRemoved) {
        unsubscribeLogger.warn(
          { socketId: socket.id, userUid, channelUid: data.channelUid },
          'Failed to remove user from participant list',
        );
        // Continue anyway - subscription is removed from Valkey
      }
    }

    unsubscribeLogger.info(
      { socketId: socket.id, userUid, channelUid: data.channelUid, threadUid: data.threadUid },
      'User unsubscribed successfully',
    );

    return {
      success: true,
    };
  } catch (error) {
    unsubscribeLogger.error(
      { error, socketId: socket.id, userUid },
      'Error handling user unsubscribe',
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
};

/**
 * Handle CMS unsubscription from a channel/thread
 */
export const handleCmsUnsubscribe = async (
  socket: ExtendedSocket,
  data: UnsubscribeData,
): Promise<UnsubscribeResult> => {
  unsubscribeLogger.info(
    { socketId: socket.id, channelUid: data.channelUid, threadUid: data.threadUid },
    'CMS unsubscribe request received',
  );

  try {
    // Validate CMS authentication
    if (!isCmsClient(socket)) {
      unsubscribeLogger.warn({ socketId: socket.id }, 'Invalid CMS client');
      return {
        success: false,
        error: 'Invalid CMS authentication',
      };
    }

    // Validate input
    if (!data.channelUid || !data.threadUid) {
      unsubscribeLogger.warn({ socketId: socket.id }, 'Missing channelId or threadId');
      return {
        success: false,
        error: 'channelUid and threadUid are required',
      };
    }

    if (typeof data.channelUid !== 'string' || typeof data.threadUid !== 'string') {
      unsubscribeLogger.warn({ socketId: socket.id }, 'Invalid data types');
      return {
        success: false,
        error: 'channelUid and threadUid must be strings',
      };
    }

    // Remove socket mappings from Valkey (no participant list update for CMS)
    await removeSubscription(socket.id, data.channelUid, data.threadUid);

    unsubscribeLogger.info(
      { socketId: socket.id, channelUid: data.channelUid, threadUid: data.threadUid },
      'CMS unsubscribed successfully',
    );

    return {
      success: true,
    };
  } catch (error) {
    unsubscribeLogger.error({ error, socketId: socket.id }, 'Error handling CMS unsubscribe');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    };
  }
};
