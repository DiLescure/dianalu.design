import type { Socket } from 'socket.io';
import { validateCmsClient } from '@/services/auth/cms';
import { verifyUserToken } from '@/services/auth/jwt';
import type { ExtendedSocket } from '@/types/socket';
import { logger } from '@/utils/logger';

const authLogger = logger.child({ context: 'auth-middleware' });

/**
 * Authenticate socket connection based on client type
 * Returns authenticated socket or null on failure
 */
/**
 * Extract JWT token from cookies
 */
const getTokenFromCookies = (cookieHeader: string | undefined): string | null => {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');

  // Check for Payload CMS cookie (most common)
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'payload-token' && value) {
      return decodeURIComponent(value);
    }
  }

  return null;
};

export const authenticateSocket = async (socket: Socket): Promise<ExtendedSocket | null> => {
  try {
    const headers = socket.handshake.headers;
    const auth = socket.handshake.auth;

    // Get client type from auth (preferred) or fall back to header for backwards compatibility
    const clientType =
      auth?.clientType || (headers['message-broker-client-type'] as string | undefined);

    if (!clientType) {
      authLogger.warn(
        { socketId: socket.id, hasAuth: !!auth, hasAuthClientType: !!auth?.clientType },
        'Missing client type in auth or header',
      );
      return null;
    }

    // Try to get token from cookies first (for HTTP-only cookies)
    let token = getTokenFromCookies(headers.cookie);

    // Fall back to Authorization header if no cookie token found
    if (!token) {
      const authHeader = headers.authorization as string | undefined;

      if (authHeader) {
        // Extract token from authorization header
        // Supports both "Bearer <token>" and "JWT <token>" formats
        token = authHeader.replace(/^(Bearer|JWT)\s+/i, '').trim();
      }
    }

    if (!token) {
      authLogger.warn(
        {
          socketId: socket.id,
          clientType,
          hasCookie: !!headers.cookie,
          hasAuthHeader: !!headers.authorization,
        },
        'No token found in cookies or authorization header',
      );
      return null;
    }

    authLogger.debug(
      { socketId: socket.id, clientType, tokenLength: token.length },
      'Token extracted successfully',
    );

    // Authenticate based on client type
    if (clientType === 'user') {
      authLogger.debug({ socketId: socket.id }, 'Authenticating user client');

      const authResult = await verifyUserToken(token);

      if (!authResult.isValid || !authResult.userUid) {
        authLogger.warn(
          { socketId: socket.id, error: authResult.error },
          'User authentication failed',
        );
        return null;
      }

      // Attach auth result to socket
      const extendedSocket = socket as ExtendedSocket;
      extendedSocket.authResult = authResult;

      authLogger.info(
        { socketId: socket.id, userUid: authResult.userUid },
        'User authenticated successfully',
      );

      return extendedSocket;
    }

    if (clientType === 'cms') {
      authLogger.debug({ socketId: socket.id }, 'Authenticating CMS client');

      // Get IP address from socket
      const ipAddress = socket.handshake.address || socket.conn.remoteAddress || 'unknown';

      const authResult = await validateCmsClient(token, ipAddress);

      if (!authResult.isValid) {
        authLogger.warn(
          { socketId: socket.id, ipAddress, error: authResult.error },
          'CMS authentication failed',
        );
        return null;
      }

      // Attach auth result to socket
      const extendedSocket = socket as ExtendedSocket;
      extendedSocket.authResult = authResult;

      authLogger.info({ socketId: socket.id, ipAddress }, 'CMS client authenticated successfully');

      return extendedSocket;
    }

    authLogger.warn({ socketId: socket.id, clientType }, 'Unknown client type');
    return null;
  } catch (error) {
    authLogger.error({ error, socketId: socket.id }, 'Error during authentication');
    return null;
  }
};

/**
 * Helper to get user ID from authenticated socket
 */
export const getUserId = (socket: ExtendedSocket): string | null => {
  return socket.authResult?.userUid || null;
};

/**
 * Helper to check if socket is CMS client
 */
export const isCmsClient = (socket: ExtendedSocket): boolean => {
  return socket.authResult?.userUid === 'cms-server';
};

/**
 * Helper to get auth token from socket (for forwarding to CMS)
 */
export const getAuthToken = (socket: Socket): string | null => {
  // Try cookies first
  const tokenFromCookie = getTokenFromCookies(socket.handshake.headers.cookie);
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  // Fall back to authorization header
  const authHeader = socket.handshake.headers.authorization as string | undefined;

  if (!authHeader) {
    return null;
  }

  return authHeader.replace(/^(Bearer|JWT)\s+/i, '').trim();
};
