import { logger } from '@/utils/logger';
import { cmsGraphqlClient } from './client';

const queryLogger = logger.child({ context: 'cms-queries' });

export interface Channel {
  id: string;
  channelUid: string;
  channelName: string;
  deletedAt: boolean;
  participantUsers: Array<{ id: number }>;
  blacklistedUsers: Array<{ id: number }>;
  mainThread: {
    id: string;
    threadUid: string;
  } | null;
}

export interface Thread {
  id: string;
  threadUid: string;
  channel: {
    id: string;
    channelUid: string;
  };
}

export interface User {
  id: number;
  userUid: string;
}

/**
 * Get channel by channelUid
 */
export const getChannel = async (channelUid: string, token: string): Promise<Channel | null> => {
  try {
    const result = await cmsGraphqlClient
      .query(
        `
      query GetChannel($channelUid: String!) {
        Channels(where: { channelUid: { equals: $channelUid } }) {
          docs {
            id
            channelUid
            channelName
            deletedAt
            participantUsers {
              id
            }
            blacklistedUsers {
              id
            }
            mainThread {
              id
              threadUid
            }
          }
        }
      }
      `,
        { channelUid },
        {
          fetchOptions: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `JWT ${token}`,
            },
          },
        },
      )
      .toPromise();

    if (result.error) {
      queryLogger.error({ error: result.error, channelUid }, 'Failed to get channel');
      return null;
    }

    const channel = result.data?.Channels?.docs?.[0];
    return channel || null;
  } catch (error) {
    queryLogger.error({ error, channelUid }, 'Error fetching channel');
    return null;
  }
};

/**
 * Get thread by threadUid
 */
export const getThread = async (threadUid: string, token: string): Promise<Thread | null> => {
  try {
    const result = await cmsGraphqlClient
      .query(
        `
      query GetThread($threadUid: String!) {
        Threads(where: { threadUid: { equals: $threadUid } }) {
          docs {
            id
            threadUid
            channel {
              id
              channelUid
            }
          }
        }
      }
      `,
        { threadUid },
        {
          fetchOptions: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `JWT ${token}`,
            },
          },
        },
      )
      .toPromise();

    if (result.error) {
      queryLogger.error({ error: result.error, threadUid }, 'Failed to get thread');
      return null;
    }

    const thread = result.data?.Threads?.docs?.[0];
    return thread || null;
  } catch (error) {
    queryLogger.error({ error, threadUid }, 'Error fetching thread');
    return null;
  }
};

/**
 * Check if user is blacklisted from channel
 */
export const isUserBlacklisted = async (
  channelUid: string,
  userId: number,
  token: string,
): Promise<boolean> => {
  try {
    const channel = await getChannel(channelUid, token);

    if (!channel) {
      queryLogger.warn({ channelUid, userId }, 'Channel not found for blacklist check');
      return false;
    }

    const isBlacklisted =
      channel.blacklistedUsers?.some((user: any) => user.userUid === userId) || false;

    if (isBlacklisted) {
      queryLogger.info({ channelUid, userId }, 'User is blacklisted from channel');
    }

    return isBlacklisted;
  } catch (error) {
    queryLogger.error({ error, channelUid, userId }, 'Error checking blacklist status');
    return false;
  }
};

/**
 * Validate user has access to channel/thread
 */
export const validateUserChannelAccess = async (
  userId: number,
  channelUid: string,
  threadUid: string,
  token: string,
): Promise<{
  isValid: boolean;
  isBlacklisted: boolean;
  channel: Channel | null;
  thread: Thread | null;
  error?: string;
}> => {
  try {
    // Get channel
    const channel = await getChannel(channelUid, token);

    if (!channel) {
      return {
        isValid: false,
        isBlacklisted: false,
        channel: null,
        thread: null,
        error: 'Channel not found',
      };
    }

    // Check if channel is deleted
    if (channel.deletedAt) {
      return {
        isValid: false,
        isBlacklisted: false,
        channel,
        thread: null,
        error: `Channel was deleted at ${channel.deletedAt}`,
      };
    }

    // Check if user is blacklisted
    const isBlacklisted =
      channel.blacklistedUsers?.some((user: any) => user.userUid === userId) || false;

    if (isBlacklisted) {
      return {
        isValid: false,
        isBlacklisted: true,
        channel,
        thread: null,
        error: 'User is blacklisted from this channel',
      };
    }

    // Get thread and verify it belongs to the channel
    const thread = await getThread(threadUid, token);

    if (!thread) {
      return {
        isValid: false,
        isBlacklisted: false,
        channel,
        thread: null,
        error: 'Thread not found',
      };
    }

    // Verify thread belongs to channel
    if (thread.channel.channelUid !== channelUid) {
      return {
        isValid: false,
        isBlacklisted: false,
        channel,
        thread,
        error: 'Thread does not belong to this channel',
      };
    }

    return {
      isValid: true,
      isBlacklisted: false,
      channel,
      thread,
    };
  } catch (error) {
    queryLogger.error({ error, userId, channelUid, threadUid }, 'Error validating channel access');
    return {
      isValid: false,
      isBlacklisted: false,
      channel: null,
      thread: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Add user to channel participant list
 */
export const addChannelParticipant = async (
  channelUid: string,
  userId: number,
  token: string,
): Promise<boolean> => {
  try {
    // First get the channel's internal ID
    const channel = await getChannel(channelUid, token);

    if (!channel) {
      queryLogger.error({ channelUid, userId }, 'Cannot add participant: channel not found');
      return false;
    }

    // Check if user is already a participant
    const isAlreadyParticipant = channel.participantUsers?.some((user) => user.id === userId);

    if (isAlreadyParticipant) {
      queryLogger.debug({ channelUid, userId }, 'User is already a participant');
      return true;
    }

    const result = await cmsGraphqlClient
      .mutation(
        `
      mutation AddParticipant($channelId: Int!, $participantUsers: [Int!]!) {
        updateChannel(
          id: $channelId
          data: {
            participantUsers: $participantUsers
          }
        ) {
          id
          participantUsers {
            id
          }
        }
      }
      `,
        {
          channelId: channel.id,
          participantUsers: [...(channel.participantUsers?.map((user) => user.id) || []), userId],
        },
        {
          fetchOptions: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `JWT ${token}`,
            },
          },
        },
      )
      .toPromise();

    if (result.error) {
      queryLogger.error({ error: result.error, channelUid, userId }, 'Failed to add participant');
      return false;
    }

    queryLogger.info({ channelUid, userId }, 'Successfully added user to channel participants');
    return true;
  } catch (error) {
    queryLogger.error({ error, channelUid, userId }, 'Error adding participant');
    return false;
  }
};

/**
 * Remove user from channel participant list
 */
export const removeChannelParticipant = async (
  channelUid: string,
  userId: number,
  token: string,
): Promise<boolean> => {
  try {
    // First get the channel's internal ID
    const channel = await getChannel(channelUid, token);

    if (!channel) {
      queryLogger.error({ channelUid, userId }, 'Cannot remove participant: channel not found');
      return false;
    }

    const result = await cmsGraphqlClient
      .mutation(
        `
      mutation RemoveParticipant($channelId: Int!, $participantUsers: [Int!]!) {
        updateChannel(
          id: $channelId
          data: {
            participantUsers: $participantUsers
          }
        ) {
          id
          participantUsers {
            id
          }
        }
      }
      `,
        {
          channelId: channel.id,
          participantUsers: (channel.participantUsers?.map((user) => user.id) || []).filter(
            (id) => id !== userId,
          ),
        },
        {
          fetchOptions: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `JWT ${token}`,
            },
          },
        },
      )
      .toPromise();

    if (result.error) {
      queryLogger.error(
        { error: result.error, channelUid, userId },
        'Failed to remove participant',
      );
      return false;
    }

    queryLogger.info({ channelUid, userId }, 'Successfully removed user from channel participants');
    return true;
  } catch (error) {
    queryLogger.error({ error, channelUid, userId }, 'Error removing participant');
    return false;
  }
};

export const getUserFromUid = async (userUid: string, token: string): Promise<User | null> => {
  try {
    const result = await cmsGraphqlClient
      .query(
        `
      query GetUser($userUid: String!) {
        Users(where: { userUid: { equals: $userUid } }) {
          docs {
            id
            userUid
          }
        }
      }
      `,
        { userUid },
        {
          fetchOptions: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `JWT ${token}`,
            },
          },
        },
      )
      .toPromise();

    if (result.error) {
      queryLogger.error({ error: result.error, userUid }, 'Failed to get user');
      return null;
    }

    const user = result.data?.Users?.docs?.[0];
    return user || null;
  } catch (error) {
    queryLogger.error({ error, userUid }, 'Error getting user');
    return null;
  }
};
