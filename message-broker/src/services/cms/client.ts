import { createClient, fetchExchange } from '@urql/core';

const buildGraphQLUrl = () => {
  const host = process.env.PAYLOAD_SERVER_CLIENT_HOST;
  const port = process.env.PAYLOAD_SERVER_CLIENT_PORT;
  const path = `${process.env.APP_PAYLOAD_API_PATH}${process.env.APP_PAYLOAD_GRAPHQL_PATH}`;
  return `http://${host}:${port}${path}` || 'http://host.docker.internal:9091/api/graphql';
};

export const cmsGraphqlClient = createClient({
  url: buildGraphQLUrl(),
  exchanges: [fetchExchange],
  preferGetMethod: false,
});
