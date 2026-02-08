import pino from 'pino';
import { config } from '@/config';

export const logger = pino({
  level: config.logging.level,
  transport: config.logging.prettyPrint
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  base: {
    env: process.env.NODE_ENV,
  },
  serializers: {
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  redact: {
    paths: [],
    remove: false,
    censor: 'REDACTED',
  },
});

export const createContextLogger = (context: string) => logger.child({ context });
