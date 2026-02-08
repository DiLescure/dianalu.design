export class AIProviderError extends Error {
  constructor(
    message: string,
    public provider: string,
    public statusCode?: number,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}

export class AgentProcessingError extends Error {
  constructor(
    message: string,
    public agentId: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'AgentProcessingError';
  }
}

/**
 * Determine if error is retryable
 */
export const isRetryableError = (error: Error): boolean => {
  // Rate limit errors
  if (error.message.includes('rate limit') || error.message.includes('429')) {
    return true;
  }

  // Temporary service errors
  if (error.message.includes('503') || error.message.includes('502')) {
    return true;
  }

  // Timeout errors
  if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
    return true;
  }

  return false;
};

/**
 * Calculate retry delay with exponential backoff
 */
export const getRetryDelay = (attemptNumber: number): number => {
  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds

  const delay = Math.min(baseDelay * 2 ** attemptNumber, maxDelay);

  // Add jitter (±20%)
  const jitter = delay * 0.2 * (Math.random() - 0.5);

  return Math.floor(delay + jitter);
};

/**
 * Retry wrapper for async functions
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  context: string = 'operation',
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries && isRetryableError(lastError)) {
        const delay = getRetryDelay(attempt);
        console.warn(
          `[AI Errors] ${context} failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`,
          lastError.message,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }

  throw lastError!;
};
