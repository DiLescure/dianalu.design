import { gql } from '@urql/core';
import type { QueryDefinition } from '@/services/api/types';

const HomePageContent: QueryDefinition = {
  query: gql(`
    query {
      HomePageContent {
        tagline
      }
    }
  `),
  defaultVariables: {},
};

export default HomePageContent;
