import {
  GraphQLBoolean,
  type GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { Payload } from 'payload';
import { forceUnlockThread, isThreadLocked } from '@/utils/threads';

/**
 * ThreadLockStatus GraphQL Type
 */
const ThreadLockStatusType = new GraphQLObjectType({
  name: 'ThreadLockStatus',
  fields: {
    threadUid: { type: new GraphQLNonNull(GraphQLString) },
    isLocked: { type: new GraphQLNonNull(GraphQLBoolean) },
    lockedAt: { type: GraphQLString },
    lockReason: { type: GraphQLString },
  },
});

/**
 * ForceUnlockResult GraphQL Type
 */
const ForceUnlockResultType = new GraphQLObjectType({
  name: 'ForceUnlockResult',
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    message: { type: GraphQLString },
    error: { type: GraphQLString },
  },
});

/**
 * Query: threadLockStatus
 * Check the lock status of a thread
 */
export const threadLockStatusQuery: GraphQLFieldConfig<any, any> = {
  type: ThreadLockStatusType,
  args: {
    threadUid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The UID of the thread to check',
    },
  },
  resolve: async (_, args, context) => {
    const { threadUid } = args;
    const payload: Payload = context.req.payload;

    try {
      payload.logger.debug(`[GraphQL] Checking lock status for thread ${threadUid}`);

      const lockStatus = await isThreadLocked(payload, threadUid);

      return {
        threadUid,
        isLocked: lockStatus.locked,
        lockedAt: lockStatus.lockedAt || null,
        lockReason: lockStatus.lockReason || null,
      };
    } catch (error) {
      payload.logger.error(error, '[GraphQL] Error checking thread lock status');
      throw new Error('Failed to check thread lock status');
    }
  },
};

/**
 * Mutation: forceUnlockThread
 * Force unlock a thread
 */
export const forceUnlockThreadMutation: GraphQLFieldConfig<any, any> = {
  type: ForceUnlockResultType,
  args: {
    threadUid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The UID of the thread to unlock',
    },
  },
  resolve: async (_, args, context) => {
    const { threadUid } = args;
    const payload: Payload = context.req.payload;

    try {
      payload.logger.debug(`[GraphQL] Force unlocking thread ${threadUid}`);

      const result = await forceUnlockThread(payload, threadUid);

      if (result) {
        payload.logger.debug(`[GraphQL] Thread ${threadUid} unlocked successfully`);
        return {
          success: true,
          message: 'Thread unlocked successfully',
          error: null,
        };
      }

      payload.logger.warn(`[GraphQL] Failed to unlock thread ${threadUid}`);
      return {
        success: false,
        message: null,
        error: 'Failed to unlock thread',
      };
    } catch (error) {
      payload.logger.error(error, '[GraphQL] Error force unlocking thread');
      return {
        success: false,
        message: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
