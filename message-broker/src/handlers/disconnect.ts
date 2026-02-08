import { getAuthToken, isCmsClient } from '@/middleware/auth';
import { getUserFromUid, removeChannelParticipant } from '@/services/cms/queries';
import { getSocketSubscriptions, removeSocketMappings } from '@/services/valkey';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const disconnectLogger = logger.child({ context: 'disconnect-handler' });

/**
 * Handle socket disconnection and cleanup
 */
export const handleDisconnect = async (socket: ExtendedSocket): Promise<void> => {
  const userUid = socket.authResult?.userUid;
  const isCms = isCmsClient(socket);

  disconnectLogger.info(
    { socketId: socket.id, userUid, isCms },
    'Client disconnected, starting cleanup',
  );

  try {
    // Get all subscriptions for this socket
    const subscriptions = await getSocketSubscriptions(socket.id);

    disconnectLogger.debug(
      { socketId: socket.id, subscriptionCount: subscriptions.length },
      'Found subscriptions to clean up',
    );

    // For user clients, remove from participant lists
    if (!isCms && userUid) {
      const token = getAuthToken(socket);

      if (token) {
        const user = await getUserFromUid(userUid, token);

        if (!user) {
          disconnectLogger.error({ socketId: socket.id, userUid }, 'User not found');
          return;
        }

        // Remove user from all channel participant lists
        for (const subscription of subscriptions) {
          try {
            const removed = await removeChannelParticipant(
              subscription.channelUid,
              user?.id,
              token,
            );

            if (removed) {
              disconnectLogger.debug(
                {
                  socketId: socket.id,
                  userUid,
                  channelUid: subscription.channelUid,
                },
                'Removed user from participant list',
              );
            } else {
              disconnectLogger.warn(
                {
                  socketId: socket.id,
                  userUid,
                  channelUid: subscription.channelUid,
                },
                'Failed to remove user from participant list',
              );
            }
          } catch (error) {
            disconnectLogger.error(
              {
                error,
                socketId: socket.id,
                userUid,
                channelUid: subscription.channelUid,
              },
              'Error removing user from participant list',
            );
            // Continue with cleanup even if this fails
          }
        }
      }
    }

    // Remove all socket mappings from Valkey
    await removeSocketMappings(socket.id);

    disconnectLogger.info(
      {
        socketId: socket.id,
        userUid,
        isCms,
        subscriptionCount: subscriptions.length,
      },
      'Client cleanup completed successfully',
    );
  } catch (error) {
    disconnectLogger.error(
      { error, socketId: socket.id, userUid },
      'Error during disconnect cleanup',
    );

    // Try to clean up Valkey mappings even if other steps failed
    try {
      await removeSocketMappings(socket.id);
      disconnectLogger.info(
        { socketId: socket.id },
        'Valkey mappings cleaned up despite earlier errors',
      );
    } catch (valkeyError) {
      disconnectLogger.error(
        { error: valkeyError, socketId: socket.id },
        'Failed to clean up Valkey mappings',
      );
    }
  }
};
