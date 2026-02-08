import { type ReactNode, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import { GOBACK_URL_LOCAL_STORAGE_KEY } from '@/config';
import { useApi } from '@/services/api';
import { useGlobalState } from '@/services/state';
import { createCommonErrorHandler, handleVisibilityChange } from '@/util';

import { SessionContext } from './index';

const clearGoBackUrl = () => {
  localStorage.removeItem(GOBACK_URL_LOCAL_STORAGE_KEY);
};

const _checkSessionExpiring = (exp: number) => {
  return exp - Math.floor(Date.now() * 0.001) < 60;
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pageContext = usePageContext();
  const { locale } = pageContext;

  const commonErrorHandler = createCommonErrorHandler(locale);

  const { storedAppState, updateStoredAppState } = useGlobalState();
  const graphqlClient = useApi()?.graphqlClient;

  let pingInterval: NodeJS.Timeout;

  const userUidToState = (userUid: string) => {
    console.log('userUidToState', { userUid, storedAppState });
    if ((!storedAppState.userUid && userUid) || (userUid && storedAppState.userUid !== userUid)) {
      updateStoredAppState({ userUid });
    }
  };

  const keepSessionAlive = async (exp: number) => {
    if (!_checkSessionExpiring(exp) || !graphqlClient) {
      return;
    }
    const data = await graphqlClient
      .mutation(
        `
        mutation {
          refreshTokenUser {
            exp
          }
        }
      `,
        {
          now: Date.now(),
        },
      )
      .toPromise()
      .then(({ error, data }) => {
        if (error) {
          return { error };
        }

        return data;
      });

    if (data.error) {
      return { error: commonErrorHandler(data.error) };
    }

    return data.refreshTokenUser?.exp;
  };

  const pingBackend = async () => {
    const data = await graphqlClient
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
        {
          now: Date.now(),
        },
      )
      .toPromise()
      .then(({ error, data }) => {
        if (error) {
          return { error };
        }

        return data;
      });

    if (data.error) {
      return { error: commonErrorHandler(data.error) };
    }

    const exp: number | null = data.meUser?.exp as number | null;
    const userUid = data.meUser?.user?.userUid;

    if (!exp || !userUid) {
      return {
        error: commonErrorHandler(
          {
            graphQLErrors: [
              {
                extensions: {
                  statusCode: 403,
                },
              },
            ],
          },
          true,
        ),
      };
    }

    // TODO: define "keep session alive" logic
    // biome-ignore lint/correctness/noConstantCondition: TODO
    if (true) {
      keepSessionAlive(exp);
    }

    return {
      userUid,
      exp,
    };
  };

  const registerPing = () => {
    if (!pingInterval && graphqlClient) {
      console.log('registerPing');
      pingBackend().then(({ userUid }) => {
        if (userUid) {
          clearGoBackUrl();
          userUidToState(userUid);
        }
      });

      pingInterval = setInterval(() => {
        pingBackend().then(({ userUid }) => {
          if (userUid) {
            clearGoBackUrl();
            userUidToState(userUid);
          }
        });
      }, 30000);

      document.addEventListener('visibilitychange', handleVisibilityChange(pingBackend), false);
    }
  };

  const checkSessionExpired = async () => {
    const data = await pingBackend();

    if (data.exp) {
      const result = _checkSessionExpiring(data.exp);
      return result;
    }

    return true;
  };

  useEffect(() => {
    registerPing();

    return () => {
      clearInterval(pingInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange(pingBackend), false);
    };
  }, []);

  return (
    <SessionContext value={{ keepSessionAlive, pingBackend, checkSessionExpired }}>
      {children}
    </SessionContext>
  );
};

export default SessionProvider;
