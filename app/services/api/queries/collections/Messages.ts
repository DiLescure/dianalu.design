import { gql } from '@urql/core';
import type { QueryDefinition } from '@/services/api/types';
import type { Collection } from '@/util/type-decorators/collection';

// CURRENT: Uses Collection type decorator from utils
// FUTURE: Define VirtualMessage type based on GraphQL schema after codegen

export type MessageListData = {
  Messages: Collection<{
    messageUid?: string | null;
    messageContent: {
      text: string;
      status?: string;
      error?: string;
    };
    senderUser?: {
      userUid: string;
      email: string;
    };
    senderAgent?: {
      agentUid: string;
      agentName: string;
    };
    originatorUser?: {
      userUid: string;
      email: string;
    };
    createdAt: string;
  }>;
};

/**
 * Query to list messages with pagination
 * Replaces ThreadMessageList query
 */
export const MessageList: QueryDefinition = {
  query: gql(`
    query GetMessages($threadUid: String!, $limit: Int, $source: String, $reverse: Boolean) {
      Messages(
        threadUid: $threadUid
        limit: $limit
        source: $source
        reverse: $reverse
      ) {
        docs {
          messageUid
          senderType
          messageContent {
            text
            status
            error
          }
          senderUser {
            userUid
            email
          }
          senderAgent {
            agentUid
            agentName
          }
          originatorUser {
            userUid
            email
          }
          createdAt
        }
        totalDocs
        limit
        totalPages
        page
        hasPrevPage
        hasNextPage
        prevPage
        nextPage
      }
    }
  `),
  defaultVariables: {
    source: 'auto',
    reverse: true, // Reverse for chronological display (oldest to newest)
  },
};
