// UPPERCASE are base constants
// camelCase are made by combining base constants

import { normalizeBaseUrl } from '@/util/normalize-base-url';

let env: NodeJS.ProcessEnv | ImportMetaEnv;

if (typeof process !== 'undefined') {
  env = process.env;
} else {
  env = import.meta.env;
}

export const AVAILABLE_LOCALES = ['en-US'];
export const DEFAULT_LOCALE = 'en-US';

const APP_PAYLOAD_PUBLIC_HOST = env.APP_PAYLOAD_PUBLIC_HOST || 'localhost';
const APP_PAYLOAD_PUBLIC_PORT = env.APP_PAYLOAD_PUBLIC_PORT || 5173;
const APP_PAYLOAD_API_PATH = env.APP_PAYLOAD_API_PATH || '/api';
const APP_PAYLOAD_ADMIN_PATH = env.APP_PAYLOAD_ADMIN_PATH || '/admin';
const APP_PAYLOAD_GRAPHQL_PATH = env.APP_PAYLOAD_GRAPHQL_PATH || '/graphql';

export const baseUrl = normalizeBaseUrl(`//${APP_PAYLOAD_PUBLIC_HOST}:${APP_PAYLOAD_PUBLIC_PORT}`);
export const apiUrl = `${baseUrl}${APP_PAYLOAD_API_PATH}`;
export const graphqlUrl = `${apiUrl}${APP_PAYLOAD_GRAPHQL_PATH}`;
export const adminUrl = `${baseUrl}${APP_PAYLOAD_ADMIN_PATH}`;
export const loginUrl = '/login/';
export const logoutUrl = `${adminUrl}/logout`;

export const COUNTDOWN_TICK_INTERVAL_TIME = 50;
export const TOAST_DISMISS_TIME = 5000;
export const TOAST_FALLBACK_INTERVAL_TIME = 1000;

export const GOBACK_URL_LOCAL_STORAGE_KEY = 'appGoBackUrl';
