import type { Server } from 'socket.io';
import { recordBroadcast } from '@/services/monitoring/broadcasts';
import { getSocketsForChannel, removeChannelMapping } from '@/services/valkey';
import type { BroadcastMessage, BroadcastResult, ThreadStateUpdate } from '@/types/broadcast';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const broadcastLogger = logger.child({ context: 'broadcast' });

/**
 * Broadcast message to all clients subscribed to a channel/thread
 * Uses Uid fields for routing
 */
export const broadcastMessage = async (
  io: Server,
  message: BroadcastMessage,
  senderSocket: ExtendedSocket,
): Promise<BroadcastResult> => {
  const { channelUid, threadUid, id, senderType, senderUid, messageContent, timestamp, partial } =
    message;

  try {
    // Verify sender is authenticated as CMS
    // Note: CMS uses userUid for identification
    if (senderSocket.authResult.userUid !== 'cms-server') {
      broadcastLogger.warn(
        { senderId: senderSocket.authResult.userUid },
        'Non-CMS client attempted to broadcast',
      );
      return {
        success: false,
        recipientCount: 0,
        errors: ['Unauthorized: Only CMS can broadcast messages'],
      };
    }

    broadcastLogger.info(
      {
        channelUid,
        threadUid,
        messageId: id,
        senderType,
        senderUid,
        messageContent,
        timestamp,
        partial,
      },
      'Broadcasting message',
    );

    // Get all sockets subscribed to this channel/thread (uses Uid keys)
    const socketIds = await getSocketsForChannel(channelUid, threadUid);

    if (socketIds.length === 0) {
      broadcastLogger.debug({ channelUid, threadUid }, 'No subscribers found for channel/thread');
      return {
        success: true,
        recipientCount: 0,
      };
    }

    broadcastLogger.debug(
      { channelUid, threadUid, socketCount: socketIds.length },
      'Found subscribers',
    );

    // Broadcast to each socket
    const errors: string[] = [];
    let successCount = 0;

    for (const socketId of socketIds) {
      try {
        broadcastLogger.debug({ socketId }, '[Message Broker] broadcastMessage: getting socket');
        const socket = io.sockets.sockets.get(socketId);

        if (socket) {
          socket.emit('message', {
            ...message,
          });
          successCount++;
        } else {
          errors.push(`Socket ${socketId} not found`);
          broadcastLogger.warn(
            { socketId, channelUid, threadUid },
            'Socket not found for broadcast - removing from cache',
          );

          // Remove stale socket from channel mapping immediately
          try {
            await removeChannelMapping(channelUid, threadUid, socketId);
            broadcastLogger.debug(
              { socketId, channelUid, threadUid },
              'Removed stale socket from cache',
            );
          } catch (cleanupError) {
            broadcastLogger.error(
              { error: cleanupError, socketId },
              'Failed to remove stale socket from cache',
            );
          }
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Error broadcasting to ${socketId}: ${errorMsg}`);
        broadcastLogger.error({ error, socketId }, 'Error broadcasting to socket');
      }
    }

    broadcastLogger.info(
      {
        channelUid,
        threadUid,
        messageId: message.id,
        successCount,
        totalSockets: socketIds.length,
      },
      'Broadcast complete',
    );

    // Record broadcast statistics
    recordBroadcast(channelUid, threadUid, successCount > 0, successCount);

    return {
      success: successCount > 0,
      recipientCount: successCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    broadcastLogger.error({ error, channelUid, threadUid }, 'Broadcast failed');
    return {
      success: false,
      recipientCount: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
};

/**
 * Broadcast thread state update (for locking)
 * Uses Uid fields for routing
 */
export const broadcastThreadState = async (
  io: Server,
  data: ThreadStateUpdate,
  senderSocket: ExtendedSocket,
): Promise<BroadcastResult> => {
  const { channelUid, threadUid, state } = data;

  try {
    // Verify sender is CMS
    // Note: CMS uses userUid for identification
    if (senderSocket.authResult.userUid !== 'cms-server') {
      return {
        success: false,
        recipientCount: 0,
        errors: ['Unauthorized: Only CMS can broadcast thread state'],
      };
    }

    broadcastLogger.info({ channelUid, threadUid, state }, 'Broadcasting thread state update');

    // Get subscribers (uses Uid keys)
    const socketIds = await getSocketsForChannel(channelUid, threadUid);

    if (socketIds.length === 0) {
      return {
        success: true,
        recipientCount: 0,
      };
    }

    // Broadcast to each socket
    let successCount = 0;
    const errors: string[] = [];

    for (const socketId of socketIds) {
      try {
        const socket = io.sockets.sockets.get(socketId);

        if (socket) {
          socket.emit('threadState', {
            channelUid,
            threadUid,
            state,
          });
          successCount++;
        } else {
          errors.push(`Socket ${socketId} not found`);
          broadcastLogger.warn(
            { socketId, channelUid, threadUid },
            'Socket not found for thread state broadcast - removing from cache',
          );

          // Remove stale socket from channel mapping immediately
          try {
            await removeChannelMapping(channelUid, threadUid, socketId);
            broadcastLogger.debug(
              { socketId, channelUid, threadUid },
              'Removed stale socket from cache',
            );
          } catch (cleanupError) {
            broadcastLogger.error(
              { error: cleanupError, socketId },
              'Failed to remove stale socket from cache',
            );
          }
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Error broadcasting to ${socketId}: ${errorMsg}`);
        broadcastLogger.error({ error, socketId }, 'Error broadcasting thread state');
      }
    }

    broadcastLogger.info(
      { channelUid, threadUid, successCount },
      'Thread state broadcast complete',
    );

    return {
      success: successCount > 0,
      recipientCount: successCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    broadcastLogger.error({ error, channelUid, threadUid }, 'Thread state broadcast failed');
    return {
      success: false,
      recipientCount: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
};
