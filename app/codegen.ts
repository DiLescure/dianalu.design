// biome-ignore assist/source/organizeImports: dotenv import must remain at the top
import dotenv from 'dotenv';

import { type CodegenConfig, generate } from '@graphql-codegen/cli';
import ky from 'ky';

dotenv.config({ path: '../.env', quiet: true });

const getApiUrl = async () => {
  let apiUrl = await import('./config').then(({ apiUrl }) => apiUrl);

  if (/:443/.test(apiUrl)) {
    apiUrl = apiUrl.replace(':443', '').replace(/^\/\//, 'https://');
  } else {
    apiUrl = apiUrl.replace(/^\/\//, 'http://');
  }

  return apiUrl;
};

const getGraphqlUrl = async () => {
  let graphqlUrl = await import('./config').then(({ graphqlUrl }) => graphqlUrl);

  if (/:443/.test(graphqlUrl)) {
    graphqlUrl = graphqlUrl.replace(':443', '').replace(/^\/\//, 'https://');
  } else {
    graphqlUrl = graphqlUrl.replace(/^\/\//, 'http://');
  }

  return graphqlUrl;
};

const getToken = async () => {
  const apiUrl = await getApiUrl();
  const loginUrl = `${apiUrl}/users/login`;

  const email = process.env.APP_CODEGEN_EMAIL;
  const password = process.env.APP_CODEGEN_PASSWORD;

  const response = await ky
    .post(loginUrl, {
      json: {
        email,
        password,
      },
    })
    .json<{ token: string }>();

  return response.token;
};

const main = async () => {
  const token = await getToken().catch((error) => {
    console.error(error.response?.data);
    process.exit(1);
  });

  const graphqlUrl = await getGraphqlUrl();

  const config: CodegenConfig = {
    schema: {
      [graphqlUrl]: {
        headers: {
          Cookie: `lng=en; payload-token=${token}`,
        },
      },
    },
    generates: {
      './gql/': {
        preset: 'client',
      },
      './gql/schema.graphql': {
        plugins: ['schema-ast'],
      },
    },
  };

  await generate(config, true);
};

main();
