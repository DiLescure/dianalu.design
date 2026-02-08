import type { SocketMapping } from '../../types/valkey';
import { glideStringToString } from '../../utils/valkey';
import { getMessageBrokerValkeyClient } from './client';

/**
 * Socket Mapping Operations (Bidirectional)
 *
 * These functions maintain bidirectional mappings between:
 * - Socket IDs -> Channel/Thread pairs (for finding what a socket is subscribed to)
 * - Channel/Thread pairs -> Socket IDs (for finding who to broadcast to)
 */

/**
 * Store socket-to-channel mapping
 * Called when a socket subscribes to a channel/thread
 */
export const storeSocketMapping = async (
  socketId: string,
  channelUid: string,
  threadUid: string,
  ttlSeconds: number = 3600, // 1 hour
): Promise<void> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `socket:${socketId}`;

    // Get existing subscriptions for this socket
    const existingData = await client.get(key);
    const existingJson = glideStringToString(existingData);
    const existingMappings: SocketMapping[] = existingJson ? JSON.parse(existingJson) : [];

    // Check if already subscribed
    const alreadySubscribed = existingMappings.some(
      (m) => m.channelUid === channelUid && m.threadUid === threadUid,
    );

    if (!alreadySubscribed) {
      // Add new subscription
      const newMapping: SocketMapping = {
        socketId,
        channelUid,
        threadUid,
        subscribedAt: Date.now(),
      };

      existingMappings.push(newMapping);

      // Store back to Valkey
      const mappingsJson = JSON.stringify(existingMappings);
      await client.set(key, mappingsJson);
      await client.expire(key, ttlSeconds);

      console.log(
        `[Message Broker Valkey] Socket ${socketId} subscribed to ${channelUid}/${threadUid}`,
      );
    }
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to store socket mapping:', error);
    throw error;
  }
};

/**
 * Store channel-to-socket mapping (reverse mapping)
 * Allows efficient lookup of all sockets subscribed to a channel/thread
 */
export const storeChannelMapping = async (
  channelUid: string,
  threadUid: string,
  socketId: string,
  ttlSeconds: number = 3600, // 1 hour
): Promise<void> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `channel:${channelUid}:${threadUid}`;

    // Get existing sockets for this channel/thread
    const existingData = await client.get(key);
    const existingJson = glideStringToString(existingData);
    const existingSockets: string[] = existingJson ? JSON.parse(existingJson) : [];

    // Add socket if not already present
    if (!existingSockets.includes(socketId)) {
      existingSockets.push(socketId);

      // Store back to Valkey
      const socketsJson = JSON.stringify(existingSockets);
      await client.set(key, socketsJson);
      await client.expire(key, ttlSeconds);

      console.log(
        `[Message Broker Valkey] Added socket ${socketId} to channel ${channelUid}/${threadUid}`,
      );
    }
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to store channel mapping:', error);
    throw error;
  }
};

/**
 * Get channel/thread for a socket
 * Returns all channel/thread pairs that a socket is subscribed to
 */
export const getChannelForSocket = async (
  socketId: string,
): Promise<Array<{ channelUid: string; threadUid: string }> | null> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `socket:${socketId}`;

    const mappingsData = await client.get(key);
    const mappingsJson = glideStringToString(mappingsData);

    if (!mappingsJson) {
      return null;
    }

    const mappings = JSON.parse(mappingsJson) as SocketMapping[];
    return mappings.map((m) => ({ channelUid: m.channelUid, threadUid: m.threadUid }));
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to get channel for socket:', error);
    return null;
  }
};

/**
 * Get socket(s) for a channel/thread
 * Returns all socket IDs subscribed to a specific channel/thread
 */
export const getSocketsForChannel = async (
  channelUid: string,
  threadUid: string,
): Promise<string[]> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `channel:${channelUid}:${threadUid}`;

    const socketsData = await client.get(key);
    const socketsJson = glideStringToString(socketsData);

    if (!socketsJson) {
      return [];
    }

    const sockets = JSON.parse(socketsJson) as string[];
    return sockets;
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to get sockets for channel:', error);
    return [];
  }
};

/**
 * Remove socket mappings
 * Called when a socket disconnects - removes all subscriptions
 */
export const removeSocketMappings = async (socketId: string): Promise<void> => {
  try {
    const client = await getMessageBrokerValkeyClient();

    // Get all subscriptions for this socket
    const subscriptions = await getChannelForSocket(socketId);

    if (!subscriptions) {
      return;
    }

    // Remove socket from all channel mappings
    for (const { channelUid, threadUid } of subscriptions) {
      await removeChannelMapping(channelUid, threadUid, socketId);
    }

    // Remove socket mapping
    const socketKey = `socket:${socketId}`;
    await client.del([socketKey]);

    console.log(`[Message Broker Valkey] Removed all mappings for socket ${socketId}`);
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to remove socket mappings:', error);
    throw error;
  }
};

/**
 * Remove channel mapping
 * Removes a specific socket from a channel/thread subscription list
 */
export const removeChannelMapping = async (
  channelUid: string,
  threadUid: string,
  socketId: string,
): Promise<void> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    const key = `channel:${channelUid}:${threadUid}`;

    // Get existing sockets
    const socketsData = await client.get(key);
    const socketsJson = glideStringToString(socketsData);

    if (!socketsJson) {
      return;
    }

    const sockets = JSON.parse(socketsJson) as string[];

    // Remove the socket
    const updatedSockets = sockets.filter((s) => s !== socketId);

    if (updatedSockets.length === 0) {
      // No more sockets, delete the key
      await client.del([key]);
    } else {
      // Update with remaining sockets (keep same TTL)
      const updatedJson = JSON.stringify(updatedSockets);
      await client.set(key, updatedJson);
    }

    console.log(
      `[Message Broker Valkey] Removed socket ${socketId} from channel ${channelUid}/${threadUid}`,
    );
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to remove channel mapping:', error);
    throw error;
  }
};

/**
 * Subscription Management
 */

/**
 * Get all subscriptions for a socket
 * Returns all channel/thread pairs that a socket is subscribed to
 */
export const getSocketSubscriptions = async (
  socketId: string,
): Promise<Array<{ channelUid: string; threadUid: string }>> => {
  const subscriptions = await getChannelForSocket(socketId);
  return subscriptions || [];
};

/**
 * Add subscription
 * Convenience function that adds both socket->channel and channel->socket mappings
 */
export const addSubscription = async (
  socketId: string,
  channelUid: string,
  threadUid: string,
): Promise<void> => {
  try {
    // Add both mappings atomically
    await Promise.all([
      storeSocketMapping(socketId, channelUid, threadUid),
      storeChannelMapping(channelUid, threadUid, socketId),
    ]);

    console.log(
      `[Message Broker Valkey] Added subscription: socket ${socketId} -> channel ${channelUid}/${threadUid}`,
    );
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to add subscription:', error);
    throw error;
  }
};

/**
 * Remove subscription
 * Removes a socket from a specific channel/thread subscription
 */
export const removeSubscription = async (
  socketId: string,
  channelUid: string,
  threadUid: string,
): Promise<void> => {
  try {
    const client = await getMessageBrokerValkeyClient();

    // Remove from socket mapping
    const socketKey = `socket:${socketId}`;
    const mappingsData = await client.get(socketKey);
    const mappingsJson = glideStringToString(mappingsData);

    if (mappingsJson) {
      const mappings = JSON.parse(mappingsJson) as SocketMapping[];
      const updatedMappings = mappings.filter(
        (m) => !(m.channelUid === channelUid && m.threadUid === threadUid),
      );

      if (updatedMappings.length === 0) {
        await client.del([socketKey]);
      } else {
        const updatedJson = JSON.stringify(updatedMappings);
        await client.set(socketKey, updatedJson);
      }
    }

    // Remove from channel mapping
    await removeChannelMapping(channelUid, threadUid, socketId);

    console.log(
      `[Message Broker Valkey] Removed subscription: socket ${socketId} <- channel ${channelUid}/${threadUid}`,
    );
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to remove subscription:', error);
    throw error;
  }
};
