import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import nodemailerMailgun from 'nodemailer-mailgun-transport';
import { buildConfig } from 'payload';
import { openapi, rapidoc, redoc, swaggerUI } from 'payload-oapi';
import pino from 'pino';
import pinoPretty from 'pino-pretty';
import sharp from 'sharp';
import { AgentMessages } from './collections/AgentMessages';
import { Agents } from './collections/Agents';
import { Channels } from './collections/Channels';
import { Media } from './collections/Media';
import { ModelDefinitions } from './collections/ModelDefinitions';
import { Threads } from './collections/Threads';
import { UserMessages } from './collections/UserMessages';
import { Users } from './collections/Users';
import { healthEndpoint } from './endpoints/health';
import { getMessage, getRecentMessages, listMessages } from './endpoints/messages';
import { metricsEndpoint } from './endpoints/metrics';
import DocsMockData from './globals/DocsMockData';
import { healthQuery } from './graphql/health';
import { messageQuery, messagesQuery, recentMessagesQuery } from './graphql/messages';
import { metricsQuery } from './graphql/metrics';
import { forceUnlockThreadMutation, threadLockStatusQuery } from './graphql/threads';
import { initMessageBrokerSocket } from './services/message-broker';
import { startLockCleanup } from './utils/threads/cleanup';

const level = process.env.PAYLOAD_LOG_LEVEL || 'info';

const prettyStream = pinoPretty({
  colorize: true,
  translateTime: 'SYS:standard',
  ignore: 'pid,hostname',
});

const logger = pino(
  {
    level,
  },
  prettyStream,
);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

let PAYLOAD_CORS_CONFIG: '*' | string[] = (process.env.PAYLOAD_CORS_CONFIG as '*') || '*';

if (PAYLOAD_CORS_CONFIG !== '*') {
  PAYLOAD_CORS_CONFIG = (PAYLOAD_CORS_CONFIG as string).split(',');
}

export default buildConfig({
  serverURL: `https://${process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_HOST}`,
  routes: {
    admin: process.env.NEXT_PUBLIC_PAYLOAD_ADMIN_PATH || '/admin',
    api: process.env.NEXT_PUBLIC_PAYLOAD_API_PATH || '/api',
    graphQL: process.env.NEXT_PUBLIC_PAYLOAD_GRAPHQL_PATH || '/graphql',
    graphQLPlayground: process.env.PAYLOAD_GRAPHQL_PLAYGROUND_PATH || '/graphql-playground',
  },
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: healthEndpoint,
    },
    {
      path: '/metrics',
      method: 'get',
      handler: metricsEndpoint,
    },
    // Virtual Messages collection endpoints
    {
      path: '/messages',
      method: 'get',
      handler: listMessages,
    },
    {
      path: '/messages/recent',
      method: 'get',
      handler: getRecentMessages,
    },
    {
      path: '/messages/:id',
      method: 'get',
      handler: getMessage,
    },
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // graphics: {
      //   Logo: '/components/Logo',
      // },
      afterLogin: ['/components/GoBackAction'],
      afterDashboard: ['/components/GoBackAction'],
    },
  },
  cors: {
    origins: PAYLOAD_CORS_CONFIG,
  },
  collections: [
    Users,
    Media,
    ModelDefinitions,
    Agents,
    Channels,
    Threads,
    UserMessages,
    AgentMessages,
  ],
  globals: [DocsMockData],
  editor: lexicalEditor(),
  email: nodemailerAdapter({
    defaultFromAddress: `postmaster@${process.env.PAYLOAD_MAILGUN_DOMAIN || ''}`,
    defaultFromName: process.env.NEXT_BRAND_EMAIL_FROM_NAME || 'Clever Stack',
    transportOptions: nodemailerMailgun({
      auth: {
        api_key: process.env.PAYLOAD_MAILGUN_API_KEY || '-',
        domain: process.env.PAYLOAD_MAILGUN_DOMAIN || '-',
      },
    }),
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
    queries: (_GraphQL) => {
      return {
        threadLockStatus: threadLockStatusQuery,
        health: healthQuery,
        metrics: metricsQuery,
        // Virtual Messages queries
        Messages: messagesQuery,
        Message: messageQuery,
        RecentMessages: recentMessagesQuery,
      };
    },
    mutations: (_GraphQL) => {
      return {
        forceUnlockThread: forceUnlockThreadMutation,
      };
    },
  },
  plugins: [
    openapi({ openapiVersion: '3.0', metadata: { title: 'REST API', version: '1.0.0' } }),
    swaggerUI({ docsUrl: process.env.PAYLOAD_SWAGGER_PATH || '/swagger' }),
    redoc({ docsUrl: process.env.PAYLOAD_REDOC_PATH || '/redoc' }),
    rapidoc({ docsUrl: process.env.PAYLOAD_RAPIDOC_PATH || '/rapidoc' }),
  ],
  onInit: async (payload) => {
    if (!process.env.SEED_SCRIPT) {
      // Initialize services in the background (non-blocking)
      // This prevents hanging if message broker is not ready
      setImmediate(async () => {
        // Initialize message broker connection
        try {
          payload.logger.info('[Payload Init] Starting message broker initialization...');
          await initMessageBrokerSocket();
          payload.logger.info('[Payload Init] Message broker initialized successfully');
        } catch (error) {
          payload.logger.error(error, '[Payload Init] Failed to initialize message broker');
        }
      });

      // Start thread lock cleanup job (synchronous, non-blocking)
      try {
        startLockCleanup();
        payload.logger.info('[Payload Init] Thread lock cleanup job started');
      } catch (error) {
        payload.logger.error(error, '[Payload Init] Failed to start lock cleanup job');
      }

      payload.logger.info('[Payload Init] Initialization complete (background tasks started)');
    }
  },
  logger,
});
