import { config } from '@/config';
import type { TokenValidationResult } from '@/types/auth';
import { logger } from '@/utils/logger';
import { validateCmsIpAddress } from '@/utils/security';

const cmsLogger = logger.child({ context: 'cms-auth' });

export const validateCmsClient = async (
  token: string,
  ipAddress: string,
): Promise<TokenValidationResult> => {
  if (!validateCmsIpAddress(ipAddress)) {
    cmsLogger.warn({ ipAddress }, 'CMS client connection attempt from unauthorized IP');

    return {
      isValid: false,
      error: 'Unauthorized IP address',
    };
  }

  if (token !== config.auth.jwtSecret) {
    cmsLogger.warn('CMS client connection attempt with invalid token');

    return {
      isValid: false,
      error: 'Invalid CMS authentication token',
    };
  }

  return {
    isValid: true,
    userUid: 'cms-server',
  };
};
