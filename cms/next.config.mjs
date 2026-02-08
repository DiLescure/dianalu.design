// biome-ignore assist/source/organizeImports: dotenv import must remain at the top
import dotenv from 'dotenv';
import { withPayload } from '@payloadcms/next/withPayload';

dotenv.config({path: '../.env'});

const serverExternalPackages = [
  '@valkey/valkey-glide',
  'pino',
  'socket.io-client',
  'nodemailer',
  'nodemailer-mailgun-transport',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  env: {
    NEXT_BRAND_COMPANY_NAME: process.env.BRAND_COMPANY_NAME || 'Clever Stack',
    NEXT_BRAND_EMAIL_FROM_NAME: process.env.BRAND_EMAIL_FROM_NAME || 'Clever Stack',
    NEXT_PUBLIC_PAYLOAD_PUBLIC_HOST: `${process.env.APP_PAYLOAD_PUBLIC_HOST || 'localhost'}`,
    NEXT_PUBLIC_PAYLOAD_PUBLIC_PORT: process.env.APP_PAYLOAD_PUBLIC_PORT || 3000,
    NEXT_PUBLIC_PAYLOAD_ADMIN_PATH: process.env.APP_PAYLOAD_ADMIN_PATH || '/admin',
    NEXT_PUBLIC_PAYLOAD_API_PATH: process.env.APP_PAYLOAD_API_PATH || '/api',
    NEXT_PUBLIC_PAYLOAD_GRAPHQL_PATH: process.env.APP_PAYLOAD_GRAPHQL_PATH || '/graphql',
    NEXT_MESSAGE_BROKER_SERVER_HOST: `${process.env.MESSAGE_BROKER_SERVER_HOST || 'localhost'}`,
    NEXT_MESSAGE_BROKER_SERVER_PORT: process.env.MESSAGE_BROKER_SERVER_PORT || 3001,
    NEXT_MESSAGE_BROKER_PATH: process.env.APP_MESSAGE_BROKER_PATH || '/message-broker',
    NEXT_PAYLOAD_EMAIL_TRANSPORT_OFF: process.env.PAYLOAD_EMAIL_TRANSPORT_OFF || 'false',
    PAYLOAD_GRAPHQL_PLAYGROUND_PATH: process.env.PAYLOAD_GRAPHQL_PLAYGROUND_PATH || '/graphql-playground',
    PAYLOAD_CORS_CONFIG: process.env.PAYLOAD_CORS_CONFIG || '*',
  },
  serverExternalPackages,
  webpack: (webpackConfig, { isServer, webpack }) => {
    if (isServer) {
      webpackConfig.externals = [
        ...webpackConfig.externals,
        ...serverExternalPackages,
      ];
    }

    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx', '.mdx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig;
  },
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
