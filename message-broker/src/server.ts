import http from 'node:http';
import express from 'express';
import { Server, type Socket } from 'socket.io';
import { config } from './config';
import { broadcastMessage, broadcastThreadState } from './handlers/broadcast';
import { handleDisconnect } from './handlers/disconnect';
import { handleCmsSubscribe, handleUserSubscribe } from './handlers/subscribe';
import { handleCmsUnsubscribe, handleUserUnsubscribe } from './handlers/unsubscribe';
// import type { ExtendedSocket } from './types/socket';
import { authenticateSocket } from './middleware/auth';
import { startSocketCleanup } from './services/valkey/cleanup';
import type { BroadcastMessage, ThreadStateUpdate } from './types/broadcast';
import { logger } from './utils/logger';

const serverLogger = logger.child({ context: 'server' });

const app = express();

// Add JSON middleware for Express
app.use(express.json());

const server = http.createServer(app);

// Will be set during initialization
let io: Server;

// Health check endpoint
app.get('/message-broker/health', async (_req, res) => {
  const health = {
    status: 'healthy' as 'healthy' | 'degraded',
    timestamp: new Date().toISOString(),
    services: {
      valkey: 'unknown' as string,
      socketIO: 'unknown' as string,
    },
    stats: {
      connectedClients: 0,
      uptime: process.uptime(),
    },
  };

  try {
    const { messageBrokerValkeyClient } = await import('./services/valkey/client');
    if (messageBrokerValkeyClient) {
      await messageBrokerValkeyClient.ping();
      health.services.valkey = 'healthy';
    } else {
      health.services.valkey = 'unavailable';
      health.status = 'degraded';
    }
  } catch (_error) {
    health.services.valkey = 'unhealthy';
    health.status = 'degraded';
  }

  // Socket.IO available after initialization
  if (io) {
    health.services.socketIO = 'healthy';
    health.stats.connectedClients = io.sockets.sockets.size;
  } else {
    health.services.socketIO = 'initializing';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

// Metrics endpoint
app.get('/message-broker/metrics', async (_req, res) => {
  const { getMetrics } = await import('./services/monitoring/metrics');
  const metrics = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    connections: {
      current: io ? io.sockets.sockets.size : 0,
    },
    memory: process.memoryUsage(),
    counters: getMetrics(),
  };

  res.status(200).json(metrics);
});

const main = async () => {
  // Validate Valkey connection before starting with retry logic
  const MAX_RETRIES = 10;
  const BASE_DELAY = 1000; // 1 second

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      serverLogger.info({ attempt, maxRetries: MAX_RETRIES }, 'Validating Valkey connection...');
      const { messageBrokerValkeyClient } = await import('./services/valkey/client');

      if (!messageBrokerValkeyClient) {
        throw new Error('Valkey client not initialized');
      }

      await messageBrokerValkeyClient.ping();
      serverLogger.info({ attempt }, 'Valkey connection verified');
      break; // Success - exit retry loop
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        // Final attempt failed
        serverLogger.error(
          {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            attempts: MAX_RETRIES,
          },
          'Failed to connect to Valkey after maximum retries - exiting',
        );
        process.exit(1);
      }

      // Calculate exponential backoff delay
      const delay = BASE_DELAY * 2 ** (attempt - 1);
      serverLogger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          attempt,
          maxRetries: MAX_RETRIES,
          nextRetryIn: delay,
        },
        'Valkey connection failed, retrying...',
      );

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  io = new Server(server, {
    // path: config.server.path,
    cors: {
      // origin: config.server.corsOrigins,
      origin: '*',
      credentials: true, // Allow credentials (cookies) to be sent
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true,
    },
  });

  // Start socket cleanup job
  const stopSocketCleanup = startSocketCleanup(io);
  serverLogger.info('Socket cleanup job started');

  io.on('connection', async (socket: Socket) => {
    if (socket.recovered) {
      serverLogger.info({ socketId: socket.id }, 'Client recovered');
      return;
    }

    if (!socket.id) {
      serverLogger.error('Client id not found');
      return;
    }

    try {
      serverLogger.debug({ socketId: socket.id }, 'Client connecting...');

      // Authenticate socket
      const authenticatedSocket = await authenticateSocket(socket);

      if (!authenticatedSocket) {
        serverLogger.warn({ socketId: socket.id }, 'Authentication failed');
        socket.emit('authenticationError', { error: 'Authentication failed' });
        socket.disconnect(true);
        return;
      }

      serverLogger.info(
        { socketId: socket.id, userUid: authenticatedSocket.authResult.userUid },
        'Client authenticated and connected',
      );

      // Subscribe-user handler
      authenticatedSocket.on(
        'subscribe-user',
        async (data: { channelUid: string; threadUid: string }) => {
          const { channelUid, threadUid } = data;

          try {
            const result = await handleUserSubscribe(authenticatedSocket, data);

            if (result.success) {
              authenticatedSocket.emit('subscriptionConfirmed', {
                channelUid,
                threadUid,
                timestamp: Date.now(),
              });
              serverLogger.debug(
                { socketId: authenticatedSocket.id, channelUid, threadUid },
                'User subscription confirmed',
              );
            } else {
              authenticatedSocket.emit('subscriptionError', {
                error: result.error,
                channelUid,
                threadUid,
              });
              serverLogger.warn(
                { socketId: authenticatedSocket.id, error: result.error },
                'User subscription failed',
              );
            }
          } catch (error) {
            serverLogger.error(
              {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                socketId: authenticatedSocket.id,
                channelUid,
                threadUid,
                handler: 'subscribe-user',
              },
              'Subscribe error',
            );
            authenticatedSocket.emit('subscriptionError', {
              error: 'Internal server error',
              channelUid,
              threadUid,
            });
          }
        },
      );

      // Subscribe-cms handler
      authenticatedSocket.on(
        'subscribe-cms',
        async (data: { channelUid: string; threadUid: string }) => {
          const { channelUid, threadUid } = data;

          try {
            const result = await handleCmsSubscribe(authenticatedSocket, data);

            if (result.success) {
              authenticatedSocket.emit('subscriptionConfirmed', {
                channelUid,
                threadUid,
                cms: true,
                timestamp: Date.now(),
              });
              serverLogger.debug(
                { socketId: authenticatedSocket.id, channelUid, threadUid },
                'CMS subscription confirmed',
              );
            } else {
              authenticatedSocket.emit('subscriptionError', {
                error: result.error,
                channelUid,
                threadUid,
              });
              serverLogger.warn(
                { socketId: authenticatedSocket.id, error: result.error },
                'CMS subscription failed',
              );
            }
          } catch (error) {
            serverLogger.error(
              {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                socketId: authenticatedSocket.id,
                channelUid,
                threadUid,
                handler: 'subscribe-cms',
              },
              'CMS subscribe error',
            );
            authenticatedSocket.emit('subscriptionError', {
              error: 'Internal server error',
              channelUid,
              threadUid,
            });
          }
        },
      );

      // Unsubscribe-user handler
      authenticatedSocket.on(
        'unsubscribe-user',
        async (data: { channelUid: string; threadUid: string }) => {
          const { channelUid, threadUid } = data;

          try {
            const result = await handleUserUnsubscribe(authenticatedSocket, data);

            if (result.success) {
              authenticatedSocket.emit('unsubscriptionConfirmed', {
                channelUid,
                threadUid,
                timestamp: Date.now(),
              });
              serverLogger.debug(
                { socketId: authenticatedSocket.id, channelUid, threadUid },
                'User unsubscription confirmed',
              );
            } else {
              authenticatedSocket.emit('unsubscriptionError', {
                error: result.error,
                channelUid,
                threadUid,
              });
            }
          } catch (error) {
            serverLogger.error(
              {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                socketId: authenticatedSocket.id,
                channelUid,
                threadUid,
                handler: 'unsubscribe-user',
              },
              'Unsubscribe error',
            );
            authenticatedSocket.emit('unsubscriptionError', {
              error: 'Internal server error',
              channelUid,
              threadUid,
            });
          }
        },
      );

      // Unsubscribe-cms handler
      authenticatedSocket.on(
        'unsubscribe-cms',
        async (data: { channelUid: string; threadUid: string }) => {
          const { channelUid, threadUid } = data;

          try {
            const result = await handleCmsUnsubscribe(authenticatedSocket, data);

            if (result.success) {
              authenticatedSocket.emit('unsubscriptionConfirmed', {
                channelUid,
                threadUid,
                cms: true,
                timestamp: Date.now(),
              });
              serverLogger.debug(
                { socketId: authenticatedSocket.id, channelUid, threadUid },
                'CMS unsubscription confirmed',
              );
            } else {
              authenticatedSocket.emit('unsubscriptionError', {
                error: result.error,
                channelUid,
                threadUid,
              });
            }
          } catch (error) {
            serverLogger.error(
              {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                socketId: authenticatedSocket.id,
                channelUid,
                threadUid,
                handler: 'unsubscribe-cms',
              },
              'CMS unsubscribe error',
            );
            authenticatedSocket.emit('unsubscriptionError', {
              error: 'Internal server error',
              channelUid,
              threadUid,
            });
          }
        },
      );

      // Broadcast message handler
      authenticatedSocket.on('broadcast-message', async (message: BroadcastMessage, callback) => {
        serverLogger.debug('[Message Broker] broadcast-message: Broadcast message received');
        serverLogger.debug(message);

        if (callback && typeof callback === 'function') {
          callback({
            success: true,
          });
        }

        try {
          const result = await broadcastMessage(io, message, authenticatedSocket);

          // Send confirmation back to CMS
          authenticatedSocket.emit('broadcastConfirmation', {
            messageId: message.id,
            success: result.success,
            recipientCount: result.recipientCount,
            errors: result.errors,
          });
        } catch (error) {
          serverLogger.error(
            {
              error: error instanceof Error ? error.message : 'Unknown error',
              stack: error instanceof Error ? error.stack : undefined,
              socketId: authenticatedSocket.id,
              messageId: message.id,
              channelUid: message.channelUid,
              threadUid: message.threadUid,
              handler: 'broadcast-message',
            },
            'Error handling broadcast-message',
          );
          authenticatedSocket.emit('broadcastError', {
            error: 'Failed to broadcast message',
            messageId: message.id,
          });
        }
      });

      // Broadcast thread state handler
      authenticatedSocket.on(
        'broadcast-thread-state',
        async (data: ThreadStateUpdate, callback) => {
          if (callback && typeof callback === 'function') {
            callback({
              success: true,
            });
          }

          try {
            const result = await broadcastThreadState(io, data, authenticatedSocket);

            authenticatedSocket.emit('broadcastConfirmation', {
              channelUid: data.channelUid,
              threadUid: data.threadUid,
              success: result.success,
              recipientCount: result.recipientCount,
              errors: result.errors,
            });
          } catch (error) {
            serverLogger.error(
              {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
                socketId: authenticatedSocket.id,
                channelUid: data.channelUid,
                threadUid: data.threadUid,
                handler: 'broadcast-thread-state',
              },
              'Error handling broadcast-thread-state',
            );
            authenticatedSocket.emit('broadcastError', {
              error: 'Failed to broadcast thread state',
              channelUid: data.channelUid,
              threadUid: data.threadUid,
            });
          }
        },
      );

      // Disconnect handler
      authenticatedSocket.on('disconnect', async () => {
        try {
          await handleDisconnect(authenticatedSocket);
          serverLogger.info(
            { socketId: authenticatedSocket.id },
            'Client disconnected and cleaned up',
          );
        } catch (error) {
          serverLogger.error(
            {
              error: error instanceof Error ? error.message : 'Unknown error',
              stack: error instanceof Error ? error.stack : undefined,
              socketId: authenticatedSocket.id,
              handler: 'disconnect',
            },
            'Error during disconnect cleanup',
          );
        }
      });

      // Send connection confirmation
      serverLogger.info({ socketId: authenticatedSocket.id }, 'Confirming client connection...');
      authenticatedSocket.emit('connectionConfirmation', {
        socketId: authenticatedSocket.id,
        userUid: authenticatedSocket.authResult.userUid,
      });
    } catch (error) {
      serverLogger.error(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          socketId: socket.id,
          handler: 'connection',
        },
        'Error handling client connection',
      );
      socket.disconnect(true);
    }
  });
  const start = async () => {
    try {
      server.listen(config.server.port, config.server.host);
      serverLogger.info(
        `Message broker running at ${config.server.host}:${config.server.port}${config.server.path}`,
      );
    } catch (error) {
      serverLogger.error({ error }, 'Failed to start server');
      process.exit(1);
    }
  };

  start();

  // Enhanced graceful shutdown with timeout
  const shutdown = () => {
    serverLogger.info('Shutting down gracefully...');

    // Stop accepting new connections
    server.close(() => {
      serverLogger.info('HTTP server closed');
    });

    // Stop cleanup job
    stopSocketCleanup();
    serverLogger.info('Socket cleanup job stopped');

    // Close Socket.IO with grace period
    io.close(() => {
      serverLogger.info('Socket.IO server closed');
    });

    // Force exit after timeout
    setTimeout(() => {
      serverLogger.warn('Graceful shutdown timeout - forcing exit');
      process.exit(1);
    }, 10000); // 10 second timeout
  };

  // Gracefully stop socket/server on SIGINT
  process.on('SIGINT', shutdown);

  // Also handle SIGTERM (common in containerized environments)
  process.on('SIGTERM', () => {
    serverLogger.info('Received SIGTERM signal');
    shutdown();
  });
};

main();
