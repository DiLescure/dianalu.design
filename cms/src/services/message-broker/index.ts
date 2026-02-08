'use server';
import crypto from 'node:crypto';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';
import { io, type Socket } from 'socket.io-client';
import { config } from '@/config';
// import { wait } from '@/utils/wait';
import type { BroadcastMessage } from '@/utils/messages/types';

let messageBrokerSocket: Socket;
const threadToChannelId: Record<string, string> = {};

const initIo = async () => {
  const payload = await getPayload({ config: payloadConfig });

  payload.logger.debug('[Message Broker] Initializing message broker socket');
  payload.logger.debug(config.messageBrokerUrl);

  const socket = io(config.messageBrokerUrl, {
    extraHeaders: {
      'message-broker-client-type': 'cms',
      authorization: `Bearer ${process.env.PAYLOAD_SECRET || ''}`,
    },
    // Add reconnection configuration
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    timeout: 5000,
  });

  return socket;
};

export const initMessageBrokerSocket = async () => {
  const payload = await getPayload({ config: payloadConfig });

  payload.logger.debug(
    `[Message Broker] initMessageBrokerSocket: Initializing message broker socket '${messageBrokerSocket?.id}'`,
  );

  if (messageBrokerSocket) {
    return;
  }

  messageBrokerSocket = await initIo();

  payload.logger.debug(
    `[Message Broker] initMessageBrokerSocket: Message broker socket '${messageBrokerSocket?.id}'`,
  );

  const CONNECTION_TIMEOUT = 10000; // 10 seconds timeout

  const promise = new Promise<void>((resolve, _reject) => {
    // Add timeout to prevent hanging indefinitely
    const timeout = setTimeout(() => {
      payload.logger.warn('[Message Broker] Connection timeout - continuing without confirmation');

      // Record timeout metric
      import('@/utils/monitoring/metrics')
        .then(({ recordMetric }) => {
          recordMetric('messageBrokerErrors', 1);
        })
        .catch(() => {});

      resolve();
    }, CONNECTION_TIMEOUT);

    messageBrokerSocket.on('connect_error', (error: any) => {
      payload.logger.error('[Message Broker] Connection error:');
      payload.logger.error(error.message);
      payload.logger.error(error.stack);

      // Record connection error metric
      import('@/utils/monitoring/metrics')
        .then(({ recordMetric }) => {
          recordMetric('messageBrokerErrors', 1);
        })
        .catch(() => {});

      clearTimeout(timeout);
      resolve();
    });

    // Add reconnection event handlers
    messageBrokerSocket.on('reconnect_attempt', (attemptNumber) => {
      payload.logger.info(`[Message Broker] Reconnection attempt: ${attemptNumber}`);
    });

    messageBrokerSocket.on('reconnect', (attemptNumber) => {
      payload.logger.info(`[Message Broker] Reconnected: ${attemptNumber}`);
    });

    messageBrokerSocket.on('reconnect_error', (error) => {
      payload.logger.error('[Message Broker] Reconnection error:');
      payload.logger.error(error instanceof Error ? error.message : 'Unknown error');
      if (error instanceof Error && error.stack) {
        payload.logger.error(error.stack);
      }
    });

    messageBrokerSocket.on('reconnect_failed', () => {
      payload.logger.error('[Message Broker] Reconnection failed after maximum attempts');

      // Record reconnection failure
      import('@/utils/monitoring/metrics')
        .then(({ recordMetric }) => {
          recordMetric('messageBrokerErrors', 1);
        })
        .catch(() => {});
    });

    messageBrokerSocket.on('connect', () => {
      if (messageBrokerSocket.recovered) {
        payload.logger.debug(
          `[Message Broker] initMessageBrokerSocket: Reconnected with ID '${messageBrokerSocket.id}'`,
        );

        return;
      }

      payload.logger.debug(
        `[Message Broker] initMessageBrokerSocket: Connected with ID '${messageBrokerSocket.id}'`,
      );

      messageBrokerSocket.on('disconnect', () => {
        payload.logger.debug('[Message Broker] initMessageBrokerSocket: Disconnected');
      });

      messageBrokerSocket.on('error', (error: any) => {
        payload.logger.error(`[Message Broker] initMessageBrokerSocket: Socket error:`);
        payload.logger.error(error.message);
        payload.logger.error(error.stack);
      });

      messageBrokerSocket.on('connectionConfirmation', (connectionConfirmation) => {
        payload.logger.debug(
          `[Message Broker] initMessageBrokerSocket: Connection confirmed: ${connectionConfirmation}`,
        );

        clearTimeout(timeout);
        resolve();
      });

      messageBrokerSocket.on('channelUpdated', ({ thread, channelId }) => {
        try {
          if (thread && channelId) {
            threadToChannelId[thread] = channelId;
            payload.logger.debug(
              `[Message Broker] initMessageBrokerSocket: Channel updated: ${thread} -> ${channelId}`,
            );
          }
        } catch (error: any) {
          payload.logger.error(
            `[Message Broker] initMessageBrokerSocket: Failed to handle channelUpdated:`,
          );
          payload.logger.error(error.message);
          payload.logger.error(error.stack);
        }
      });
    });
  });

  return promise;
};

export const getMessageBrokerSocket = async () => {
  await initMessageBrokerSocket();

  return messageBrokerSocket;
};

export const registerChannel = async (channelId: string, members: string[], ttlMs?: number) => {
  await initMessageBrokerSocket();
  const payload = await getPayload({ config: payloadConfig });

  payload.logger.debug(
    `[Message Broker] registerChannel: Registering channel '${channelId}' with members '${members.join(', ')}'`,
  );

  const nonce = crypto.randomBytes(16).toString('hex');
  const data = { channelId, members, ttlMs };
  const hash = crypto
    .createHash('sha256')
    .update(`${JSON.stringify(data)}${nonce}${process.env.PAYLOAD_SECRET || ''}`)
    .digest('hex');
  messageBrokerSocket.emit('registerChannel', { ...data, nonce, hash });
};

export const getChannelIdForThread = async (thread: string): Promise<string | undefined> => {
  if (threadToChannelId[thread]) return threadToChannelId[thread];
  await initMessageBrokerSocket();
  return new Promise<string | undefined>((resolve) => {
    try {
      messageBrokerSocket
        .timeout(1000)
        .emit(
          'getChannelForThread',
          thread,
          (err: any, res?: { channelId?: string; error?: string }) => {
            if (err) return resolve(undefined);
            resolve(res?.channelId);
          },
        );
    } catch {
      resolve(undefined);
    }
  });
};

/**
 * Broadcast messages to subscribers
 * Uses Uid fields for routing
 */
export const broadcastMessage = async (broadcastData: BroadcastMessage): Promise<boolean> => {
  const payload = await getPayload({ config: payloadConfig });

  const mbSocket = await getMessageBrokerSocket();

  // This destructure makes absolutely sure that we only pass
  // the fields that are needed to the message broker
  const {
    channelUid,
    threadUid,
    senderType,
    senderUid,
    partial,
    timestamp,
    messageContent,
    messageUid,
    recipientType,
    recipientUid,
    updatedAt,
    createdAt,
    originatorUserUid,
  } = broadcastData;

  return new Promise((resolve) => {
    try {
      mbSocket.timeout(5000).emit(
        'broadcast-message',
        {
          channelUid,
          threadUid,
          senderType,
          senderUid,
          partial,
          timestamp,
          messageContent,
          messageUid,
          recipientType,
          recipientUid,
          updatedAt,
          createdAt,
          originatorUserUid,
        },
        (error: any, response?: any) => {
          if (error) {
            payload.logger.error('[Message Broker] Broadcast timeout or error:');
            payload.logger.error(
              `channelUid: ${channelUid}, threadUid: ${threadUid}, messageUid: ${messageUid}`,
            );
            payload.logger.error(error.message);
            payload.logger.error(error.stack);

            // Record broadcast error metric
            import('@/utils/monitoring/metrics')
              .then(({ recordMetric }) => {
                recordMetric('broadcastsFailed', 1);
                recordMetric('messageBrokerErrors', 1);
              })
              .catch(() => {});

            resolve(false);
          } else {
            payload.logger.debug(
              `[Message Broker] Broadcast confirmation: success=${response?.success}, channelUid=${channelUid}, threadUid=${threadUid}, messageUid=${messageUid}`,
            );

            // Record successful broadcast metric
            if (response?.success) {
              import('@/utils/monitoring/metrics')
                .then(({ recordMetric }) => {
                  recordMetric('broadcastsSent', 1);
                })
                .catch(() => {});
            }

            resolve(response?.success || false);
          }
        },
      );
    } catch (error: any) {
      payload.logger.error('[Message Broker] Error broadcasting message:');
      payload.logger.error(
        `channelUid: ${channelUid}, threadUid: ${threadUid}, messageUid: ${messageUid}`,
      );
      payload.logger.error(error.message);
      payload.logger.error(error.stack);

      // Record broadcast error metric
      import('@/utils/monitoring/metrics')
        .then(({ recordMetric }) => {
          recordMetric('broadcastsFailed', 1);
          recordMetric('messageBrokerErrors', 1);
        })
        .catch(() => {});

      resolve(false);
    }
  });
};

/**
 * Broadcast thread state update
 * Uses Uid fields for routing
 */
export const broadcastThreadState = async (
  channelUid: string, // Uid for routing
  threadUid: string, // Uid for routing
  state: {
    lockedAt: string | null;
    lockReason: string | null;
  },
): Promise<boolean> => {
  const payload = await getPayload({ config: payloadConfig });

  const mbSocket = await getMessageBrokerSocket();

  return new Promise((resolve) => {
    try {
      mbSocket.timeout(5000).emit(
        'broadcast-thread-state',
        {
          channelUid,
          threadUid,
          state,
        },
        (error: any, response?: any) => {
          if (error) {
            payload.logger.error('[Message Broker] Thread state broadcast error:');
            payload.logger.error(`channelUid: ${channelUid}, threadUid: ${threadUid}`);
            payload.logger.error(error.message);
            payload.logger.error(error.stack);

            // Record broadcast error metric
            import('@/utils/monitoring/metrics')
              .then(({ recordMetric }) => {
                recordMetric('broadcastsFailed', 1);
                recordMetric('messageBrokerErrors', 1);
              })
              .catch(() => {});

            resolve(false);
          } else {
            payload.logger.debug(
              `[Message Broker] Thread state broadcast confirmation: success=${response?.success}, channelUid=${channelUid}, threadUid=${threadUid}`,
            );

            // Record successful broadcast metric
            if (response?.success) {
              import('@/utils/monitoring/metrics')
                .then(({ recordMetric }) => {
                  recordMetric('broadcastsSent', 1);
                })
                .catch(() => {});
            }

            resolve(response?.success || false);
          }
        },
      );
    } catch (error: any) {
      payload.logger.error('[Message Broker] Error broadcasting thread state:');
      payload.logger.error(`channelUid: ${channelUid}, threadUid: ${threadUid}`);
      payload.logger.error(error.message);
      payload.logger.error(error.stack);

      // Record broadcast error metric
      import('@/utils/monitoring/metrics')
        .then(({ recordMetric }) => {
          recordMetric('broadcastsFailed', 1);
          recordMetric('messageBrokerErrors', 1);
        })
        .catch(() => {});

      resolve(false);
    }
  });
};
