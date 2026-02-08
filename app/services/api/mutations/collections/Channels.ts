import { gql } from '@urql/core';
import type { MutationDefinition } from '@/services/api/types';

export const CreateChannel: MutationDefinition = {
  mutation: gql(`
    mutation CreateChannel($data: mutationChannelInput!) {
      createChannel(data: $data) {
        id
        channelUid
        channelName
      }
    }
  `),
  defaultVariables: {},
};

export const UpdateChannel: MutationDefinition = {
  mutation: gql(`
    mutation UpdateChannel($id: Int!, $data: mutationChannelUpdateInput!) {
      updateChannel(id: $id, data: $data) {
      id
        channelUid
        channelName
      }
    }
  `),
  defaultVariables: {},
};
