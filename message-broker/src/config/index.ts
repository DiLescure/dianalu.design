// biome-ignore assist/source/organizeImports: dotenv import must remain at the top
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    port: Number.parseInt(process.env.MESSAGE_BROKER_PORT || '3001', 10),
    host: process.env.MESSAGE_BROKER_HOST || '0.0.0.0',
    path: process.env.APP_MESSAGE_BROKER_PATH || '/socket.io/',
    corsOrigins: (process.env.MESSAGE_BROKER_CORS_ORIGINS || '*').split(','),
    whitelistedCmsIps: (process.env.MESSAGE_BROKER_CMS_IPS || '').split(','),
  },

  auth: {
    jwtSecret: process.env.PAYLOAD_SECRET || '',
  },

  threads: {
    maxSubscriptionsPerUser: 50,
    subscriptionTimeout: 1800,
  },

  messages: {
    maxAge: 5 * 60 * 1000, // 5 minutes
    futureErrorMargin: 5 * 1000, // 5 seconds into the future
  },

  rateLimit: {
    windowMs: 60000,
    maxRequestsPerWindow: 1000000,
  },

  logging: {
    level: process.env.MESSAGE_BROKER_LOG_LEVEL || 'debug',
    prettyPrint: process.env.NODE_ENV !== 'production',
  },

  uid: {
    length: 24,
  },

  valkey: {
    socketMappingTTL: 3600, // 1 hour in seconds (matches subscription timeout)
    channelMappingTTL: 3600, // 1 hour in seconds
  },
} as const;

export type Config = typeof config;
