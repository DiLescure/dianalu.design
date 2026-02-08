import { logger } from '@/utils/logger';
import { CircuitBreaker } from './circuit-breaker-class';

const cbLogger = logger.child({ context: 'circuit-breaker' });

// Circuit breaker for message-broker Valkey operations
export const valkeyCircuitBreaker = new CircuitBreaker('MessageBroker-Valkey', {
  failureThreshold: 10,
  successThreshold: 2,
  timeout: 5000, // 5 seconds
});

// Circuit breaker for CMS GraphQL operations
export const cmsCircuitBreaker = new CircuitBreaker('MessageBroker-CMS', {
  failureThreshold: 5,
  successThreshold: 2,
  timeout: 10000, // 10 seconds
});

/**
 * Wrapper for Valkey operations with circuit breaker
 */
export const withValkeyCircuitBreaker = async <T>(
  operation: () => Promise<T>,
  fallback?: T,
): Promise<T> => {
  try {
    return await valkeyCircuitBreaker.execute(operation);
  } catch (error) {
    if (fallback !== undefined) {
      cbLogger.warn(
        {
          error: error instanceof Error ? error.message : 'Unknown error',
          fallbackType: typeof fallback,
        },
        'Valkey operation failed, using fallback',
      );
      return fallback;
    }
    throw error;
  }
};

/**
 * Wrapper for CMS operations with circuit breaker
 */
export const withCmsCircuitBreaker = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string,
  context: Record<string, any>,
): Promise<T> => {
  try {
    return await cmsCircuitBreaker.execute(operation);
  } catch (error) {
    cbLogger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        operation: operationName,
        ...context,
      },
      `CMS operation failed: ${operationName}`,
    );

    return fallback;
  }
};

/**
 * Retry operation with exponential backoff
 */
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 100,
): Promise<T> => {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Only retry on network errors, not on validation errors
      const shouldRetry =
        error instanceof Error &&
        (error.message.includes('ECONNREFUSED') ||
          error.message.includes('ETIMEDOUT') ||
          error.message.includes('ENOTFOUND'));

      if (!shouldRetry || attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff
      const delay = baseDelay * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));

      cbLogger.debug({ attempt: attempt + 1, maxRetries, delay }, 'Retrying operation');
    }
  }

  throw lastError;
};
