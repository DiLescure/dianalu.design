import { gql } from '@urql/core';
import type { QueryDefinition } from '@/services/api/types';

const DocsMockDatum: QueryDefinition = {
  query: gql(`
    query {
      DocsMockDatum {
        mockData
        createdAt
        updatedAt
      }
    }
  `),
  defaultVariables: {},
};

export default DocsMockDatum;
