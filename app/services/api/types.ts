import type { AnyVariables, TypedDocumentNode } from '@urql/core';

export interface QueryDefinition {
  query: TypedDocumentNode<any, AnyVariables>;
  defaultVariables: Record<string, any>;
}

export interface MutationDefinition {
  mutation: TypedDocumentNode<any, AnyVariables>;
  defaultVariables: Record<string, any>;
}
