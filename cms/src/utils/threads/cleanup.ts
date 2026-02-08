import { getPayload } from 'payload';
import config from '@/payload.config';
import { forceUnlockThread } from './index';

const LOCK_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL = 60 * 1000; // Run every minute

export const startLockCleanup = () => {
  console.log('[Thread Cleanup] Starting thread lock cleanup job');

  const cleanup = async () => {
    try {
      const payload = await getPayload({ config });

      // Find all locked threads
      const lockedThreads = await payload.find({
        collection: 'threads',
        where: {
          lockedAt: {
            exists: true,
          },
        },
        limit: 100, // Process up to 100 at a time
      });

      const now = Date.now();
      let cleanedCount = 0;

      for (const thread of lockedThreads.docs) {
        if (!thread.lockedAt) continue;

        const lockedTime = new Date(thread.lockedAt).getTime();
        const lockAge = now - lockedTime;

        if (lockAge >= LOCK_TIMEOUT) {
          payload.logger.info(
            `[Thread Cleanup] Cleaning up expired lock on thread ${thread.threadUid} ` +
              `(age: ${Math.floor(lockAge / 1000)}s)`,
          );

          // Force unlock using Uid
          // Note: Unlock state broadcast is handled by Threads collection afterChange hook
          const success = await forceUnlockThread(payload, thread.threadUid);

          if (success) {
            cleanedCount++;
          }
        }
      }

      if (cleanedCount > 0) {
        payload.logger.info(`[Thread Cleanup] Cleaned up ${cleanedCount} expired thread locks`);
      }
    } catch (error) {
      console.error('[Thread Cleanup] Error in lock cleanup job:', error);
    }
  };

  // Run immediately
  cleanup();

  // Then run periodically
  const interval = setInterval(cleanup, CLEANUP_INTERVAL);

  return () => {
    clearInterval(interval);
    console.log('[Thread Cleanup] Thread lock cleanup job stopped');
  };
};
