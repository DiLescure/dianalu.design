import { gql } from '@urql/core';
import type { MutationDefinition } from '@/services/api/types';

export const CreateUserMessage: MutationDefinition = {
  mutation: gql(`
    mutation CreateUserMessage($data: mutationUserMessageInput!) {
      createUserMessage(data: $data) {
        messageContent
        senderUser {
          userUid
        }
        createdAt
      }
    }
  `),
  defaultVariables: {},
};
