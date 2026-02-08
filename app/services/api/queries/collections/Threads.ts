import { gql } from '@urql/core';
import type { QueryDefinition } from '@/services/api/types';

export type ThreadLockStatusData = {
  threadLockStatus: {
    threadUid: string;
    isLocked: boolean;
    lockedAt: string | null;
    lockReason: string | null;
  };
};

export const ThreadLockStatus: QueryDefinition = {
  query: gql(`
    query ThreadLockStatus($threadUid: String!) {
      threadLockStatus(threadUid: $threadUid) {
        threadUid
        isLocked
        lockedAt
        lockReason
      }
    }
  `),
  defaultVariables: {},
};
