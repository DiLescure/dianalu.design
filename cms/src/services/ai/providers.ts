import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import type { ProviderV3 } from '@ai-sdk/provider';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { LanguageModel } from 'ai';

export interface AIProvider {
  name: 'anthropic' | 'openai' | 'google' | 'openrouter';
  model: string;
  instance: ProviderV3;
}

/**
 * Get AI model instance based on model string
 */
export const getAIModel = ({
  provider,
  modelId,
  apiKey,
}: {
  provider: AIProvider['name'];
  modelId: string;
  apiKey: string;
}): LanguageModel => {
  switch (provider) {
    case 'anthropic': {
      const anthropic = createAnthropic({
        apiKey,
      });
      return anthropic(modelId || 'claude-haiku-4-5-20251001');
    }

    case 'openai': {
      const openai = createOpenAI({
        apiKey,
      });
      return openai(modelId || 'gpt-5-nano-2025-08-07');
    }

    case 'google': {
      const google = createGoogleGenerativeAI({
        apiKey,
      });
      return google(modelId || 'gemini-2.5-flash-lite');
    }

    case 'openrouter': {
      const openrouter = createOpenRouter({
        apiKey,
      });
      return openrouter(modelId || 'kwaipilot/kat-coder-pro:free');
    }

    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

/**
 * Get provider-specific configuration
 */
export const getProviderConfig = (provider: string) => {
  const configs = {
    anthropic: {
      temperature: 1.0,
    },
    openai: {
      maxTokens: 4096,
      temperature: 1.0,
      topP: 1.0,
    },
    google: {
      maxTokens: 8192,
      temperature: 1.0,
      topP: 0.95,
    },
  };

  return configs[provider as keyof typeof configs] || configs.anthropic;
};
