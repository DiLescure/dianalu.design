'use-client';

const PAYLOAD_PUBLIC_HOST = process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_HOST || 'localhost';
const PAYLOAD_PUBLIC_PORT =
  (process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_PORT &&
    Number.parseInt(process.env.NEXT_PUBLIC_PAYLOAD_PUBLIC_PORT, 10)) ||
  3000;
const PAYLOAD_API_PATH = process.env.NEXT_PUBLIC_PAYLOAD_API_PATH || '/api';
const PAYLOAD_EMAIL_TRANSPORT_OFF = process.env.NEXT_PAYLOAD_EMAIL_TRANSPORT_OFF === 'true';

export const config = {
  payloadApiUrl: `https://${PAYLOAD_PUBLIC_HOST}:${PAYLOAD_PUBLIC_PORT}${PAYLOAD_API_PATH}`,
  uid: {
    length: 24,
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
