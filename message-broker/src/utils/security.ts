import { createHash, randomBytes } from 'node:crypto';
import { config } from '@/config';
import { logger } from './logger';

export const generateNonce = (): string => {
  return randomBytes(16).toString('hex');
};

export const hashMessage = (message: string, nonce: string): string => {
  const hash = createHash('sha256');
  hash.update(`${message}${nonce}${config.auth.jwtSecret}`);
  return hash.digest('hex');
};

export const validateMessageHash = (message: string, nonce: string, hash: string): boolean => {
  try {
    const calculatedHash = hashMessage(message, nonce);
    return calculatedHash === hash;
  } catch (error) {
    logger.error({ error }, 'Error validating message hash');
    return false;
  }
};

export const validateCmsIpAddress = (_ip: string): boolean => {
  // return config.server.whitelistedCmsIps.includes(ip);
  return true;
};
