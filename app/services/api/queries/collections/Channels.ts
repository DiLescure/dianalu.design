import { gql } from '@urql/core';
import type { Channel } from '@/gql/graphql';
import type { QueryDefinition } from '@/services/api/types';
import type { Collection } from '@/util/type-decorators/collection';

export type ChannelListData = {
  Channels: Collection<Partial<Channel>>;
};

export const ChannelList: QueryDefinition = {
  query: gql(`
    query ChannelList($limit: Int) {
      Channels(limit: $limit) {
        docs {
          id
          channelUid
          channelName
          createdAt
          updatedAt
          mainThread {
            threadUid
          }
          participantAgents {
            agentUid
            agentName
            agentModel {
              label
            }
          }
        }
      }
    }
  `),
  defaultVariables: {
    limit: 100,
  },
};
