'use-client';

const PAYLOAD_PUBLIC_HOST = process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_HOST || 'localhost';
const PAYLOAD_PUBLIC_PORT =
  (process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_PORT &&
    Number.parseInt(process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_PORT, 10)) ||
  3000;
const PAYLOAD_API_PATH = process.env.NEXT_PUBLIC_PAYLOAD_API_PATH || '/api';
const PAYLOAD_EMAIL_TRANSPORT_OFF = process.env.NEXT_PAYLOAD_EMAIL_TRANSPORT_OFF === 'true';
const MESSAGE_BROKER_SERVER_HOST = process.env.NEXT_MESSAGE_BROKER_SERVER_HOST || 'localhost';
const MESSAGE_BROKER_SERVER_PORT = process.env.NEXT_MESSAGE_BROKER_SERVER_PORT || 3001;
// const MESSAGE_BROKER_PATH = process.env.NEXT_MESSAGE_BROKER_PATH || '/message-broker/';

export const config = {
  payloadApiUrl: `https://${PAYLOAD_PUBLIC_HOST}:${PAYLOAD_PUBLIC_PORT}${PAYLOAD_API_PATH}`,
  uid: {
    length: 24,
  },
  messageBrokerUrl: `http://${MESSAGE_BROKER_SERVER_HOST}:${MESSAGE_BROKER_SERVER_PORT}`,
  valkey: {
    messageCacheTTL: 24 * 60 * 60, // 24 hours in seconds
    agentMessageTTL: 60 * 60, // 1 hour in seconds
    recentMessageLimit: 5, // Number of recent messages to cache per thread
  },
  emailTransport: {
    off: PAYLOAD_EMAIL_TRANSPORT_OFF,
  },
};

export type Config = typeof config;

// export const localization = {
//   locales: [
//     {
//       label: 'English',
//       code: 'en-US',
//     },
//     {
//       label: 'Español',
//       code: 'es-ES',
//     },
//   ],
//   defaultLocale: 'en-US',
//   fallback: true,
// };
