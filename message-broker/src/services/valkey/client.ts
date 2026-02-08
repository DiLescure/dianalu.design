// biome-ignore assist/source/organizeImports: dotenv import must remain at the top
import dotenv from 'dotenv';
import { GlideClient, type GlideClientConfiguration } from '@valkey/valkey-glide';

// Load environment variables
dotenv.config({ path: '../../.env' });

const buildMessageBrokerValkeyConnectionOptions = (): GlideClientConfiguration => {
  return {
    addresses: [
      {
        host: process.env.MESSAGE_BROKER_VALKEY_HOST || 'localhost',
        port: Number.parseInt(process.env.MESSAGE_BROKER_VALKEY_PORT || '6380', 10),
      },
    ],
    clientName: 'message-broker-valkey-client',
    requestTimeout: 5000,
  };
};

// Initialize Valkey client
let messageBrokerValkeyClientInstance: GlideClient | null = null;
let isInitializing = false;

const initializeMessageBrokerValkeyClient = async (): Promise<GlideClient> => {
  if (messageBrokerValkeyClientInstance) {
    return messageBrokerValkeyClientInstance;
  }

  if (isInitializing) {
    // Wait for the initialization to complete
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (messageBrokerValkeyClientInstance) {
      return messageBrokerValkeyClientInstance;
    }
  }

  isInitializing = true;

  try {
    const config = buildMessageBrokerValkeyConnectionOptions();
    console.log(
      `[Message Broker Valkey] Connecting to ${config.addresses[0].host}:${config.addresses[0].port}...`,
    );

    messageBrokerValkeyClientInstance = await GlideClient.createClient(config);

    // Test connection
    await messageBrokerValkeyClientInstance.ping();
    console.log('[Message Broker Valkey] Client initialized and connected successfully');

    return messageBrokerValkeyClientInstance;
  } catch (error) {
    console.error('[Message Broker Valkey] Failed to initialize client:', error);
    messageBrokerValkeyClientInstance = null;
    throw error;
  } finally {
    isInitializing = false;
  }
};

// Export a function that returns the client
export const getMessageBrokerValkeyClient = async (): Promise<GlideClient> => {
  if (!messageBrokerValkeyClientInstance) {
    return await initializeMessageBrokerValkeyClient();
  }
  return messageBrokerValkeyClientInstance;
};

// Helper function to check connection status
export const isMessageBrokerValkeyConnected = async (): Promise<boolean> => {
  try {
    const client = await getMessageBrokerValkeyClient();
    await client.ping();
    return true;
  } catch (error) {
    console.error('[Message Broker Valkey] Connection check failed:', error);
    return false;
  }
};

// Export for direct access (but prefer using getMessageBrokerValkeyClient)
export let messageBrokerValkeyClient: GlideClient | null = null;

// Initialize on module load
initializeMessageBrokerValkeyClient()
  .then((client) => {
    messageBrokerValkeyClient = client;
  })
  .catch((error) => {
    console.error('[Message Broker Valkey] Failed to initialize on module load:', error);
  });
