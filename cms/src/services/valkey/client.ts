'use server';
import { GlideClient, type GlideClientConfiguration } from '@valkey/valkey-glide';
import type { BasePayload } from 'payload';

const buildCmsValkeyConnectionOptions = (): GlideClientConfiguration => {
  return {
    addresses: [
      {
        host: process.env.PAYLOAD_VALKEY_HOST || 'localhost',
        port: Number.parseInt(process.env.PAYLOAD_VALKEY_PORT || '6379', 10),
      },
    ],
    clientName: 'cms-valkey-client',
    requestTimeout: 5000,
  };
};

// Initialize Valkey client
let cmsValkeyClientInstance: GlideClient | null = null;
let isInitializing = false;

const initializeCmsValkeyClient = async (payload: BasePayload): Promise<GlideClient> => {
  if (cmsValkeyClientInstance) {
    return cmsValkeyClientInstance;
  }

  if (isInitializing) {
    // Wait for the initialization to complete
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (cmsValkeyClientInstance) {
      return cmsValkeyClientInstance;
    }
  }

  isInitializing = true;

  try {
    const config = buildCmsValkeyConnectionOptions();
    payload.logger.info(
      `[CMS Valkey] Connecting to ${config.addresses[0].host}:${config.addresses[0].port}...`,
    );

    cmsValkeyClientInstance = await GlideClient.createClient(config);

    // Test connection
    await cmsValkeyClientInstance.ping();
    payload.logger.info('[CMS Valkey] Client initialized and connected successfully');

    return cmsValkeyClientInstance;
  } catch (error: any) {
    payload.logger.error('[CMS Valkey] Failed to initialize client:');
    payload.logger.error(error.message);
    payload.logger.error(error.stack);
    cmsValkeyClientInstance = null;
    throw error;
  } finally {
    isInitializing = false;
  }
};

// Export a function that returns the client
export const getCmsValkeyClient = async (payload: BasePayload): Promise<GlideClient> => {
  if (!cmsValkeyClientInstance) {
    return await initializeCmsValkeyClient(payload);
  }
  return cmsValkeyClientInstance;
};

// Helper function to check connection status
export const isCmsValkeyConnected = async (payload: BasePayload): Promise<boolean> => {
  try {
    const client = await getCmsValkeyClient(payload);
    await client.ping();
    return true;
  } catch (error) {
    payload.logger.error(error, '[CMS Valkey] Connection check failed');
    return false;
  }
};
