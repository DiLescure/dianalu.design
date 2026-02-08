import type { Payload } from 'payload';
import { config } from '@/config';
import type { Channel, Thread } from '@/payload-types';
import { uid } from '@/utils/uid';

/**
 * Creates a main thread for a channel
 * @param payload - The Payload instance
 * @param channel - The channel to create a thread for
 * @returns The created thread or null if creation fails
 */
export const createMainThread = async (
  payload: Payload,
  channel: Channel,
): Promise<Thread | null> => {
  try {
    console.log(`[Threads] Creating main thread for channel: ${channel.channelUid}`);

    // Generate unique thread ID
    const threadUid = uid.stamp(config.uid.length);

    // Create thread with channel relationship
    const thread = await payload.create({
      collection: 'threads',
      data: {
        threadUid,
        channel, // Use internal ID for relationship
        lockedAt: null,
        lockReason: null,
      },
    });

    console.log(
      `[Threads] Main thread created: ${thread.threadUid} for channel: ${channel.channelUid}`,
    );
    return thread as Thread;
  } catch (error) {
    console.error('[Threads] Error creating main thread:', error);
    return null;
  }
};

/**
 * Retrieves a thread by its associated channel ID
 * @param payload - The Payload instance
 * @param channelId - The internal channel ID (not channelId field)
 * @returns The thread or null if not found
 */
export const getThreadByChannelId = async (
  payload: Payload,
  channelId: string,
): Promise<Thread | null> => {
  try {
    const result = await payload.find({
      collection: 'threads',
      where: {
        channelId: {
          equals: channelId,
        },
        deleted: {
          equals: false,
        },
      },
      limit: 1,
    });

    return (result.docs[0] as Thread) || null;
  } catch (error) {
    console.error('[Threads] Error getting thread by channel ID:', error);
    return null;
  }
};

/**
 * Updates the lock status of a thread
 * @param payload - The Payload instance
 * @param threadUid - The threadUid field value (not internal ID)
 * @param locked - Whether to lock or unlock the thread
 * @param reason - Optional reason for locking
 * @returns The updated thread or null if update fails
 */
export const updateThreadLock = async (
  payload: Payload,
  threadUid: string,
  locked: boolean,
  reason?: string,
): Promise<Thread | null> => {
  try {
    const thread = await payload.find({
      collection: 'threads',
      where: {
        threadUid: {
          equals: threadUid,
        },
      },
      limit: 1,
    });

    if (!thread.docs[0]) {
      console.error(`[Threads] Thread not found: ${threadUid}`);
      return null;
    }

    const updated = await payload.update({
      collection: 'threads',
      id: thread.docs[0].id,
      data: {
        lockedAt: locked ? new Date().toISOString() : null,
        lockReason: locked ? reason || null : null,
      },
    });

    console.log(
      `[Threads] Thread ${threadUid} lock status updated: ${locked ? 'locked' : 'unlocked'}`,
    );
    return updated as Thread;
  } catch (error) {
    console.error('[Threads] Error updating thread lock:', error);
    return null;
  }
};

// Lock timeout constant (5 minutes)
const LOCK_TIMEOUT = 5 * 60 * 1000;

/**
 * Lock a thread for agent processing
 * @param payload - The Payload instance
 * @param threadUid - Thread Uid (e.g., "abc123") - NOT internal ID
 * @param reason - Lock reason (default: 'agentResponding')
 * @returns The locked thread or null if locking fails
 */
export const lockThread = async (
  payload: Payload,
  threadUid: string,
  reason: string = 'agentResponding',
): Promise<Thread | null> => {
  try {
    payload.logger.debug(`Locking thread ${threadUid} with reason: ${reason}`);

    // 1. Look up thread by Uid field
    const result = await payload.find({
      collection: 'threads',
      where: {
        threadUid: {
          equals: threadUid,
        },
      },
      limit: 1,
    });

    if (!result.docs[0]) {
      payload.logger.error(`Thread not found: ${threadUid}`);
      return null;
    }

    const currentThread = result.docs[0] as Thread;

    // Check if already locked
    if (currentThread.lockedAt) {
      const lockedTime = new Date(currentThread.lockedAt).getTime();
      const now = Date.now();
      const lockAge = now - lockedTime;

      if (lockAge < LOCK_TIMEOUT) {
        payload.logger.warn(
          `Thread ${threadUid} is already locked (${Math.floor(lockAge / 1000)}s ago)`,
        );
        return currentThread;
      } else {
        payload.logger.warn(
          `Thread ${threadUid} lock expired (${Math.floor(lockAge / 1000)}s old), acquiring new lock`,
        );
      }
    }

    // 2. Update using internal numeric ID
    const updated = await payload.update({
      collection: 'threads',
      id: currentThread.id,
      data: {
        lockedAt: new Date().toISOString(),
        lockReason: reason,
      },
    });

    payload.logger.debug(`Thread ${threadUid} locked successfully`);
    return updated as Thread;
  } catch (error) {
    payload.logger.error(error, 'Error locking thread');
    return null;
  }
};

/**
 * Unlock a thread
 * @param payload - The Payload instance
 * @param threadUid - Thread Uid (e.g., "abc123") - NOT internal ID
 * @returns The unlocked thread or null if unlocking fails
 */
export const unlockThread = async (payload: Payload, threadUid: string): Promise<Thread | null> => {
  try {
    payload.logger.debug(`Unlocking thread ${threadUid}`);

    // 1. Look up thread by Uid field
    const result = await payload.find({
      collection: 'threads',
      where: {
        threadUid: {
          equals: threadUid,
        },
      },
      limit: 1,
    });

    if (!result.docs[0]) {
      payload.logger.error(`Thread not found: ${threadUid}`);
      return null;
    }

    // 2. Update using internal numeric ID
    const updated = await payload.update({
      collection: 'threads',
      id: result.docs[0].id,
      data: {
        lockedAt: null,
        lockReason: null,
      },
    });

    payload.logger.debug(`Thread ${threadUid} unlocked successfully`);
    return updated as Thread;
  } catch (error) {
    payload.logger.error(error, 'Error unlocking thread');
    return null;
  }
};

/**
 * Check if thread is locked
 * @param payload - The Payload instance
 * @param threadUid - Thread Uid (e.g., "abc123") - NOT internal ID
 * @returns Lock status with details
 */
export const isThreadLocked = async (
  payload: Payload,
  threadUid: string,
): Promise<{
  locked: boolean;
  lockedAt?: string;
  lockReason?: string;
  lockAge?: number;
}> => {
  try {
    // 1. Look up thread by Uid field
    const result = await payload.find({
      collection: 'threads',
      where: {
        threadUid: {
          equals: threadUid,
        },
      },
      limit: 1,
    });

    if (!result.docs[0]) {
      return { locked: false };
    }

    const currentThread = result.docs[0] as Thread;

    if (!currentThread.lockedAt) {
      return { locked: false };
    }

    const lockedTime = new Date(currentThread.lockedAt).getTime();
    const now = Date.now();
    const lockAge = now - lockedTime;

    // Check if lock expired
    if (lockAge >= LOCK_TIMEOUT) {
      payload.logger.warn(`Thread ${threadUid} lock expired, auto-unlocking`);
      await unlockThread(payload, threadUid);
      return { locked: false };
    }

    return {
      locked: true,
      lockedAt: currentThread.lockedAt,
      lockReason: currentThread.lockReason || undefined,
      lockAge,
    };
  } catch (error) {
    payload.logger.error(error, 'Error checking thread lock:');
    return { locked: false };
  }
};

/**
 * Force unlock (for error recovery)
 * @param payload - The Payload instance
 * @param threadUid - Thread Uid (e.g., "abc123") - NOT internal ID
 * @returns True if unlock was successful
 */
export const forceUnlockThread = async (payload: Payload, threadUid: string): Promise<boolean> => {
  try {
    payload.logger.debug(`Force unlocking thread ${threadUid}`);
    const result = await unlockThread(payload, threadUid);
    return result !== null;
  } catch (error) {
    payload.logger.error(error, 'Error force unlocking thread');
    return false;
  }
};
