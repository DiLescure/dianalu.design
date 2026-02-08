export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  INTERNAL = 'INTERNAL_ERROR',
  AI_PROVIDER = 'AI_PROVIDER_ERROR',
  THREAD_LOCKED = 'THREAD_LOCKED',
}

export class AppError extends Error {
  constructor(
    message: string,
    public errorType: ErrorType,
    public statusCode: number = 500,
    public details?: any,
    public retryable: boolean = false,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Create standardized error response
 */
export const createErrorResponse = (error: Error | AppError, includeStack: boolean = false) => {
  if (error instanceof AppError) {
    return {
      error: {
        errorType: error.errorType || 'UNDEFINED',
        message: error.message,
        details: error.details,
        retryable: error.retryable,
        ...(includeStack && { stack: error.stack }),
      },
    };
  }

  return {
    error: {
      errorType: ErrorType.INTERNAL,
      message: error.message || 'An unexpected error occurred',
      retryable: false,
      ...(includeStack && { stack: error.stack }),
    },
  };
};

/**
 * Determine if error should be retried
 */
export const shouldRetry = (error: Error | AppError): boolean => {
  if (error instanceof AppError) {
    return error.retryable;
  }

  // Check for common retryable error patterns
  const message = error.message.toLowerCase();
  const retryablePatterns = [
    'timeout',
    'econnrefused',
    'econnreset',
    'etimedout',
    '503',
    '502',
    'rate limit',
  ];

  return retryablePatterns.some((pattern) => message.includes(pattern));
};
