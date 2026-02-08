import {
  QueryClient,
  QueryClientProvider,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { Client, cacheExchange, fetchExchange } from '@urql/core';
import ky from 'ky';
import { createContext, type ReactNode, use } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import { apiUrl, graphqlUrl } from '@/config';
import { createCommonErrorHandler } from '@/util';
import { CreateChannel, UpdateChannel } from './mutations/collections/Channels';
import { CreateUserMessage } from './mutations/collections/Messages';
import { AgentList } from './queries/collections/Agents';
import { ChannelList } from './queries/collections/Channels';
import { MessageList } from './queries/collections/Messages';
import { ThreadLockStatus } from './queries/collections/Threads';
import DocsMockDatum from './queries/globals/DocsMockDatum';
import HomePageContent from './queries/globals/HomePageContent';
import meUser from './queries/globals/meUser';

export const graphqlClient = new Client({
  url: graphqlUrl,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: 'include',
  },
  preferGetMethod: false,
});

export const restApiClient = ky.extend({
  prefixUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    delay: (attemptCount) => 0.3 * 2 ** (attemptCount - 1) * 100,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
  },
});

interface GraphQLContextType {
  graphqlClient: Client;
}

const GraphQLContext = createContext<GraphQLContextType>({
  graphqlClient,
});

export const GraphQLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <GraphQLContext value={{ graphqlClient }}>{children}</GraphQLContext>;
};

/* ONLY USE INTERNALLY, graphqlClient is exposed via the ApiContext */
const useGraphQL = () => {
  const { graphqlClient } = use(GraphQLContext);
  return graphqlClient;
};

const queryDefinitions = {
  DocsMockDatum, // This is the name of the query in the GraphQL schema
  HomePageContent,
  meUser,
  ChannelList,
  MessageList,
  AgentList,
  ThreadLockStatus,
};
const mutationDefinitions = {
  CreateChannel,
  CreateUserMessage,
  UpdateChannel,
};

type AvailableQueries = keyof typeof queryDefinitions;
type AvailableMutations = keyof typeof mutationDefinitions;

const availableQueries = Object.keys(queryDefinitions) as AvailableQueries[];
const availableMutations = Object.keys(mutationDefinitions) as AvailableMutations[];

type ApiContextType = {
  queries: Record<
    AvailableQueries,
    <TQueryFnData, TError, TData>(
      variables?: Record<string, any>,
      options?: Partial<UseQueryOptions<TQueryFnData, TError, TData, QueryKey>>,
    ) => UseQueryOptions<TQueryFnData, TError, TData, QueryKey>
  >;
  mutations: Record<
    AvailableMutations,
    <TData, TError, TVariables, TContext = unknown>(
      variables?: TVariables,
      options?: Partial<UseMutationOptions<TData, TError, TVariables, TContext>>,
    ) => UseMutationOptions<TData, TError, TVariables, TContext>
  >;
  restApiClient: typeof restApiClient;
  graphqlClient: Client;
};

const queryClient = new QueryClient();

const ApiContext = createContext<ApiContextType>({
  queries: {},
  mutations: {},
  restApiClient,
  graphqlClient,
} as ApiContextType);

export const runQuery = async (
  {
    query,
    variables,
    commonErrorHandler,
  }: {
    query: keyof typeof queryDefinitions;
    variables?: Record<string, any>;
    runtimeVariables?: Record<string, any>;
    commonErrorHandler: (error: any) => Error;
  }
) => {
  console.log({graphqlUrl});
  return graphqlClient
    .query(queryDefinitions[query].query, {
      ...queryDefinitions[query].defaultVariables,
      ...variables,
    })
    .toPromise()
    .then(({ data, error }) => {
      if (data?.error || error) {
        throw commonErrorHandler(data?.error || error);
      }

      return data;
    });
};

export const runMutation = async <TVariables,>({
  mutation,
  variables,
  runtimeVariables,
  commonErrorHandler,
}: {
  mutation: keyof typeof mutationDefinitions;
  variables?: TVariables,
  runtimeVariables?: TVariables,
  commonErrorHandler: (error: any) => Error;
}) => {
  return graphqlClient
    .mutation(mutationDefinitions[mutation].mutation, {
      ...mutationDefinitions[mutation].defaultVariables,
      ...variables,
      ...runtimeVariables,
    })
    .toPromise()
    .then(({ data, error }) => {
      if (data?.error || error) {
        throw commonErrorHandler(data?.error || error);
      }

      return data;
    });
};

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pageContext = usePageContext();

  const { locale } = pageContext;

  const commonErrorHandler = createCommonErrorHandler(locale);

  const graphqlClient = useGraphQL();
  const queries = {} as ApiContextType['queries'];
  const mutations = {} as ApiContextType['mutations'];

  for (const query of availableQueries) {
    queries[query] = (variables?, options?) => {
      return {
        queryKey: [query] as unknown as QueryKey,
        queryFn: (runtimeVariables?: Record<string, any>) => {
          // console.log('queryDefinitions[query].query', queryDefinitions[query].query);

          return runQuery({
            query,
            variables,
            runtimeVariables,
            commonErrorHandler,
          });
        },
        ...options,
      };
    };
  }

  for (const mutation of availableMutations) {
    mutations[mutation] = <TData, TError, TVariables, TContext>(
      variables?: TVariables,
      options?: Partial<UseMutationOptions<TData, TError, TVariables, TContext>>,
    ) => {
      return {
        mutationKey: [mutation],
        mutationFn: (runtimeVariables?: TVariables) => {
          return runMutation({
            mutation,
            variables,
            runtimeVariables,
            commonErrorHandler,
          });
        },
        ...options,
      };
    };
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GraphQLProvider>
        <ApiContext value={{ queries, mutations, restApiClient, graphqlClient }}>
          {children}
        </ApiContext>
      </GraphQLProvider>
    </QueryClientProvider>
  );
};

export const useApi = () => {
  const context = use(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiProvider;
