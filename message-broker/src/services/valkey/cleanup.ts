import type { Server } from 'socket.io';
import { logger } from '@/utils/logger';

const cleanupLogger = logger.child({ context: 'socket-cleanup' });

const CLEANUP_INTERVAL = 60 * 1000; // Run every minute

// Track all active channel/thread pairs for cleanup
const activeChannelThreads = new Map<string, { channelUid: string; threadUid: string }>();

/**
 * Register a channel/thread pair for cleanup tracking
 * Called when a socket subscribes to a channel
 */
export const registerChannelThread = (channelUid: string, threadUid: string): void => {
  const key = `${channelUid}:${threadUid}`;
  activeChannelThreads.set(key, { channelUid, threadUid });
};

/**
 * Socket Cleanup Job
 *
 * Periodically checks all tracked channel/thread pairs and removes
 * stale socket entries (sockets that no longer exist in Socket.IO)
 *
 * This handles cases where:
 * - Socket disconnected without proper cleanup
 * - Server crashed before cleaning up mappings
 * - Network issues prevented cleanup
 */
export const startSocketCleanup = (io: Server) => {
  cleanupLogger.info('Starting socket cleanup job');

  const cleanup = async () => {
    try {
      if (activeChannelThreads.size === 0) {
        return;
      }

      cleanupLogger.debug(
        { channelThreadCount: activeChannelThreads.size },
        'Running socket cleanup',
      );

      let totalStaleRemoved = 0;
      let channelsProcessed = 0;

      // Import here to avoid circular dependency
      const { getSocketsForChannel, removeChannelMapping } = await import('./index');

      for (const [key, { channelUid, threadUid }] of activeChannelThreads.entries()) {
        try {
          // Get all sockets subscribed to this channel/thread
          const socketIds = await getSocketsForChannel(channelUid, threadUid);

          if (socketIds.length === 0) {
            // No sockets for this channel - remove from tracking
            activeChannelThreads.delete(key);
            continue;
          }

          let staleCount = 0;

          // Check each socket to see if it still exists in Socket.IO
          for (const socketId of socketIds) {
            const socketExists = io.sockets.sockets.has(socketId);

            if (!socketExists) {
              // Socket is stale - remove from cache
              try {
                await removeChannelMapping(channelUid, threadUid, socketId);
                staleCount++;
                totalStaleRemoved++;

                cleanupLogger.debug(
                  { socketId, channelUid, threadUid },
                  'Removed stale socket from channel mapping',
                );
              } catch (error) {
                cleanupLogger.error(
                  { error, socketId, channelUid, threadUid },
                  'Failed to remove stale socket',
                );
              }
            }
          }

          if (staleCount > 0) {
            cleanupLogger.info(
              { channelUid, threadUid, staleCount },
              'Cleaned up stale sockets from channel',
            );
          }

          channelsProcessed++;
        } catch (error) {
          cleanupLogger.error({ error, channelUid, threadUid }, 'Error processing channel mapping');
        }
      }

      if (totalStaleRemoved > 0) {
        cleanupLogger.info(
          { totalStaleRemoved, channelsProcessed, totalChannels: activeChannelThreads.size },
          'Socket cleanup completed',
        );
      }
    } catch (error) {
      cleanupLogger.error({ error }, 'Error in socket cleanup job');
    }
  };

  // Run immediately on startup
  cleanup();

  // Then run periodically
  const interval = setInterval(cleanup, CLEANUP_INTERVAL);

  cleanupLogger.info({ intervalMs: CLEANUP_INTERVAL }, 'Socket cleanup job scheduled');

  return () => {
    clearInterval(interval);
    cleanupLogger.info('Socket cleanup job stopped');
  };
};
