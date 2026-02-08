import type { TokenValidationResult } from '@/types/auth';
import { logger } from '@/utils/logger';
import { cmsGraphqlClient } from '../cms/client';

const authLogger = logger.child({ context: 'jwt-auth' });

export const verifyUserToken = async (token: string): Promise<TokenValidationResult> => {
  authLogger.debug({ token }, 'Verifying token');

  try {
    const result = await cmsGraphqlClient
      .query(
        `
          query {
            meUser {
              user {
                userUid
              }
              exp
            }
          }
      `,
        {},
        {
          fetchOptions: {
            headers: {
              'Content-Type': 'application/json',
              authorization: `JWT ${token}`,
            },
          },
        },
      )
      .toPromise()
      .then(({ data, error }) => {
        console.log(
          { data: JSON.stringify(data, null, 2), error: JSON.stringify(error?.message, null, 2) },
          'Token verification response',
        );

        const { exp, user } = data.meUser;

        authLogger.debug({ exp, user }, 'Token verification result');

        if (!exp || !user) {
          return {
            isValid: false,
            error: 'Invalid token',
          };
        }

        const isValid = exp > Math.floor(Date.now() * 0.001) && user.userUid;

        return isValid
          ? {
              isValid,
              userUid: user.userUid,
            }
          : {
              isValid,
              error: 'Expired token',
            };
      })
      .catch((error) => {
        authLogger.error({ error }, 'Token verification failed');

        return {
          isValid: false,
          error: error instanceof Error ? error.message : 'Unknown error during token verification',
        };
      });

    return result;
  } catch (error) {
    authLogger.error({ error }, 'Token verification failed');

    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown error during token verification',
    };
  }
};
