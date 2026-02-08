export class MessageBrokerError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode = 500,
  ) {
    super(message);
    this.name = 'MessageBrokerError';
  }
}

export class AuthenticationError extends MessageBrokerError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends MessageBrokerError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends MessageBrokerError {
  constructor(message: string) {
    super(message, 'RATE_LIMIT_ERROR', 429);
    this.name = 'RateLimitError';
  }
}

export const errorCodes = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_CHANNEL: 'INVALID_CHANNEL',
  INVALID_THREAD: 'INVALID_THREAD',
  SUBSCRIPTION_LIMIT: 'SUBSCRIPTION_LIMIT',
  RATE_LIMIT: 'RATE_LIMIT',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
