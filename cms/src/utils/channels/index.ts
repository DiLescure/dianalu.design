import type { Payload } from 'payload';
import { config } from '@/config';
import type { Channel } from '@/payload-types';
import { uid } from '@/utils/uid';

/**
 * Creates a new channel
 * @param payload - The Payload instance
 * @param data - Channel creation data
 * @returns The created channel or null if creation fails
 */
export const createChannel = async (
  payload: Payload,
  data: {
    channelName: string;
    channelSlug?: string;
    participantUsers?: number[];
    participantAgents?: number[];
  },
): Promise<Channel | null> => {
  try {
    const channel = await payload.create({
      collection: 'channels',
      data: {
        channelUid: uid.stamp(config.uid.length),
        channelName: data.channelName,
        channelSlug:
          data.channelSlug ||
          data.channelName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
        participantUsers: data.participantUsers || [],
        participantAgents: data.participantAgents || [],
        blacklistedUsers: [],
        blacklistedAgents: [],
      },
    });

    payload.logger.debug(`[Channels Service] Channel created: ${channel.channelUid}`);
    return channel as Channel;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error creating channel');
    return null;
  }
};

/**
 * Retrieves a channel by its slug
 * @param payload - The Payload instance
 * @param slug - The channel slug
 * @returns The channel or null if not found
 */
export const getChannelBySlug = async (payload: Payload, slug: string): Promise<Channel | null> => {
  try {
    const result = await payload.find({
      collection: 'channels',
      where: {
        channelSlug: {
          equals: slug,
        },
        deletedAt: {
          equals: null,
        },
      },
      limit: 1,
    });

    return (result.docs[0] as Channel) || null;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error getting channel by slug');
    return null;
  }
};

/**
 * Retrieves a channel by its channelUid
 * @param payload - The Payload instance
 * @param channelUid - The channelUid field value
 * @returns The channel or null if not found
 */
export const getChannelById = async (
  payload: Payload,
  channelUid: string,
): Promise<Channel | null> => {
  try {
    const result = await payload.find({
      collection: 'channels',
      where: {
        channelUid: {
          equals: channelUid,
        },
        deletedAt: {
          equals: null,
        },
      },
      limit: 1,
    });

    return (result.docs[0] as Channel) || null;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error getting channel by ID');
    return null;
  }
};

/**
 * Adds a user to a channel's participant list
 * @param payload - The Payload instance
 * @param channelUid - The channelUid field value
 * @param userId - The user's internal ID
 * @returns True if successful, false otherwise
 */
export const addUserToChannel = async (
  payload: Payload,
  channelUid: string,
  userId: string,
): Promise<boolean> => {
  try {
    const channel = await getChannelById(payload, channelUid);
    if (!channel) {
      payload.logger.error(`[Channels Service] Channel not found: ${channelUid}`);
      return false;
    }

    // Get current participants (handle both populated and unpopulated relationships)
    const currentParticipants = Array.isArray(channel.participantUsers)
      ? channel.participantUsers.map((p: any) => (typeof p === 'string' ? p : p.id))
      : [];

    // Add user if not already in list
    if (!currentParticipants.includes(userId)) {
      await payload.update({
        collection: 'channels',
        id: channel.id,
        data: {
          participantUsers: [...currentParticipants, userId],
        },
      });
      payload.logger.debug(`[Channels Service] Added user ${userId} to channel ${channelUid}`);
    } else {
      payload.logger.debug(`[Channels Service] User ${userId} already in channel ${channelUid}`);
    }

    return true;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error adding user to channel');
    return false;
  }
};

/**
 * Removes a user from a channel's participant list
 * @param payload - The Payload instance
 * @param channelUid - The channelUid field value
 * @param userId - The user's internal ID
 * @returns True if successful, false otherwise
 */
export const removeUserFromChannel = async (
  payload: Payload,
  channelUid: string,
  userId: string,
): Promise<boolean> => {
  try {
    const channel = await getChannelById(payload, channelUid);
    if (!channel) {
      payload.logger.error(`[Channels Service] Channel not found: ${channelUid}`);
      return false;
    }

    const currentParticipants = Array.isArray(channel.participantUsers)
      ? channel.participantUsers.map((p: any) => (typeof p === 'string' ? p : p.id))
      : [];

    await payload.update({
      collection: 'channels',
      id: channel.id,
      data: {
        participantUsers: currentParticipants.filter((id) => id !== userId),
      },
    });

    payload.logger.debug(`[Channels Service] Removed user ${userId} from channel ${channelUid}`);
    return true;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error removing user from channel');
    return false;
  }
};

/**
 * Adds a user to a channel's blacklist
 * @param payload - The Payload instance
 * @param channelUid - The channelUid field value
 * @param userId - The user's internal ID
 * @returns True if successful, false otherwise
 */
export const blacklistUserFromChannel = async (
  payload: Payload,
  channelUid: string,
  userId: string,
): Promise<boolean> => {
  try {
    const channel = await getChannelById(payload, channelUid);
    if (!channel) {
      payload.logger.error(`[Channels Service] Channel not found: ${channelUid}`);
      return false;
    }

    const currentBlacklist = Array.isArray(channel.blacklistedUsers)
      ? channel.blacklistedUsers.map((p: any) => (typeof p === 'string' ? p : p.id))
      : [];

    if (!currentBlacklist.includes(userId)) {
      // Remove from participants if present
      const currentParticipants = Array.isArray(channel.participantUsers)
        ? channel.participantUsers.map((p: any) => (typeof p === 'string' ? p : p.id))
        : [];

      await payload.update({
        collection: 'channels',
        id: channel.id,
        data: {
          blacklistedUsers: [...currentBlacklist, userId],
          participantUsers: currentParticipants.filter((id) => id !== userId),
        },
      });
      payload.logger.debug(
        `[Channels Service] Blacklisted user ${userId} from channel ${channelUid}`,
      );
    } else {
      payload.logger.debug(
        `[Channels Service] User ${userId} already blacklisted from channel ${channelUid}`,
      );
    }

    return true;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error blacklisting user from channel');
    return false;
  }
};

/**
 * Removes a user from a channel's blacklist
 * @param payload - The Payload instance
 * @param channelUid - The channelUid field value
 * @param userId - The user's internal ID
 * @returns True if successful, false otherwise
 */
export const removeUserFromBlacklist = async (
  payload: Payload,
  channelUid: string,
  userId: string,
): Promise<boolean> => {
  try {
    const channel = await getChannelById(payload, channelUid);
    if (!channel) {
      payload.logger.error(`[Channels Service] Channel not found: ${channelUid}`);
      return false;
    }

    const currentBlacklist = Array.isArray(channel.blacklistedUsers)
      ? channel.blacklistedUsers.map((p: any) => (typeof p === 'string' ? p : p.id))
      : [];

    await payload.update({
      collection: 'channels',
      id: channel.id,
      data: {
        blacklistedUsers: currentBlacklist.filter((id) => id !== userId),
      },
    });

    payload.logger.debug(
      `[Channels Service] Removed user ${userId} from blacklist of channel ${channelUid}`,
    );
    return true;
  } catch (error) {
    payload.logger.error(error, '[Channels Service] Error removing user from blacklist');
    return false;
  }
};
