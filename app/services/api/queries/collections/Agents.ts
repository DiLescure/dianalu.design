import { gql } from '@urql/core';
import type { Agent } from '@/gql/graphql';
import type { QueryDefinition } from '@/services/api/types';
import type { Collection } from '@/util/type-decorators/collection';

export const AgentList: QueryDefinition = {
  query: gql`
    query GetAgents {
      Agents(limit: 100) {
        docs {
          id
          agentUid
          agentName
          agentModel {
            label
            provider
            value
          }
          agentSystemMessage
        }
      }
    }
  `,
  defaultVariables: {},
};

export type AgentListData = {
  Agents: Collection<Agent>;
};
