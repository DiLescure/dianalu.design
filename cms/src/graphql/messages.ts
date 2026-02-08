import type { GraphQLFieldConfig } from 'graphql';
import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import type { PayloadRequest } from 'payload';
import { queryMessages, queryMessagesFromCache } from '@/services/virtual-messages/query';
import type { VirtualMessageQuery } from '@/utils/virtual-messages/types';
import {
  RecentMessagesResponseType,
  VirtualMessagesResponseType,
  VirtualMessageType,
} from './types';

/**
 * GraphQL query for Messages (with pagination)
 * Usage: query Messages($threadUid: String!, $page: Int, $limit: Int) { Messages(threadUid: $threadUid, page: $page, limit: $limit) { docs { ... } totalDocs } }
 */
export const messagesQuery: GraphQLFieldConfig<any, any> = {
  type: VirtualMessagesResponseType,
  args: {
    threadUid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Thread UID (required)',
    },
    channelUid: { type: GraphQLString },
    senderType: { type: GraphQLString },
    senderUserUid: { type: GraphQLString },
    senderAgentUid: { type: GraphQLString },
    includeDeleted: { type: GraphQLBoolean },
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    sort: { type: GraphQLString },
    reverse: { type: GraphQLBoolean },
    source: { type: GraphQLString },
  },
  resolve: async (_: any, args: any, context: { req: PayloadRequest }) => {
    const { payload } = context.req;

    // Build query from GraphQL args
    const query: VirtualMessageQuery = {
      threadUid: args.threadUid,
      channelUid: args.channelUid,
      senderType: args.senderType,
      senderUserUid: args.senderUserUid,
      senderAgentUid: args.senderAgentUid,
      includeDeleted: args.includeDeleted || false,
      page: args.page || 1,
      limit: args.limit || 50,
      sort: args.sort || '-createdAt',
      reverse: args.reverse || false,
      source: args.source || 'auto',
    };

    if (!query.threadUid) {
      throw new Error('threadUid is required');
    }

    payload.logger.info(
      {
        threadUid: query.threadUid,
        limit: query.limit,
        source: query.source,
        page: query.page,
      },
      '[GraphQL Messages] Query received:',
    );

    const result = await queryMessages(payload, query);

    payload.logger.info(
      {
        threadUid: query.threadUid,
        count: result.docs.length,
        totalDocs: result.totalDocs,
        source: 'source' in result ? result.source : 'database',
        messageUids: result.docs.map((m: any) => m.messageUid),
      },
      '[GraphQL Messages] Query result:',
    );

    return result;
  },
};

/**
 * GraphQL query for single Message by ID
 * Usage: query Message($id: Int!) { Message(id: $id) { id messageUid ... } }
 */
export const messageQuery: GraphQLFieldConfig<any, any> = {
  type: VirtualMessageType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Message ID',
    },
  },
  resolve: async (_: any, args: { id: number }, context: { req: PayloadRequest }) => {
    const { payload } = context.req;
    const { id } = args;

    // Try user messages first
    try {
      const userMessage = await payload.findByID({
        collection: 'userMessages',
        id,
        depth: 1,
      });

      if (userMessage) {
        const { transformUserMessage } = await import('@/utils/virtual-messages/transform');
        return transformUserMessage(userMessage as any);
      }
    } catch (_error) {
      // Not found, try agent messages
    }

    // Try agent messages
    try {
      const agentMessage = await payload.findByID({
        collection: 'agentMessages',
        id,
        depth: 1,
      });

      if (agentMessage) {
        const { transformAgentMessage } = await import('@/utils/virtual-messages/transform');
        return transformAgentMessage(agentMessage as any);
      }
    } catch (_error) {
      // Not found
    }

    throw new Error(`Message with ID ${id} not found`);
  },
};

/**
 * GraphQL query for recent messages from cache
 * Usage: query RecentMessages($threadUid: String!) { RecentMessages(threadUid: $threadUid) { docs { ... } totalDocs source } }
 */
export const recentMessagesQuery: GraphQLFieldConfig<any, any> = {
  type: RecentMessagesResponseType,
  args: {
    threadUid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Thread UID',
    },
    channelUid: { type: GraphQLString },
    senderType: { type: GraphQLString },
  },
  resolve: async (_: any, args: any, context: { req: PayloadRequest }) => {
    const { payload } = context.req;

    const query: VirtualMessageQuery = {
      threadUid: args.threadUid,
      channelUid: args.channelUid,
      senderType: args.senderType,
    };

    if (!query.threadUid) {
      throw new Error('threadUid is required');
    }

    return await queryMessagesFromCache(payload, query);
  },
};
