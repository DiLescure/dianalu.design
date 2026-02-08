import { gql } from '@urql/core';
import type { QueryDefinition } from '@/services/api/types';

const meUser: QueryDefinition = {
  query: gql(`
    query {
      meUser {
        exp
      }
    }
  `),
  defaultVariables: {},
};

export default meUser;
