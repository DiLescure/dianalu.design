import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

/**
 * Message Content type (for GraphQL)
 */
const MessageContentType = new GraphQLObjectType({
  name: 'VirtualMessageContent',
  fields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    error: { type: GraphQLString },
  },
});

/**
 * Populated User type (for GraphQL relationships)
 */
const VirtualUserType = new GraphQLObjectType({
  name: 'VirtualUser',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userUid: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

/**
 * Populated Agent type (for GraphQL relationships)
 */
const VirtualAgentType = new GraphQLObjectType({
  name: 'VirtualAgent',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    agentUid: { type: new GraphQLNonNull(GraphQLString) },
    agentName: { type: new GraphQLNonNull(GraphQLString) },
  },
});

/**
 * Virtual Message Response Type (for GraphQL)
 * Note: We're defining this as a custom type that Payload will merge with its schema
 */
export const VirtualMessageType = new GraphQLObjectType({
  name: 'VirtualMessage',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    messageUid: { type: GraphQLString },
    senderType: { type: new GraphQLNonNull(GraphQLString) },
    channelUid: { type: new GraphQLNonNull(GraphQLString) },
    threadUid: { type: new GraphQLNonNull(GraphQLString) },
    messageContent: { type: MessageContentType }, // Object with text, status, error
    recipientType: { type: new GraphQLNonNull(GraphQLString) },
    recipientUid: { type: GraphQLString },

    // Uid fields
    senderUserUid: { type: GraphQLString },
    senderAgentUid: { type: GraphQLString },
    originatorUserUid: { type: GraphQLString },

    // Populated relationships (when depth: 1)
    senderUser: { type: VirtualUserType },
    senderAgent: { type: VirtualAgentType },
    originatorUser: { type: VirtualUserType },

    // Metadata
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    deletedAt: { type: GraphQLString }, // Soft delete timestamp (nullable)
  },
});

export const VirtualMessagesResponseType = new GraphQLObjectType({
  name: 'VirtualMessagesResponse',
  fields: {
    docs: { type: new GraphQLList(VirtualMessageType) },
    totalDocs: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    totalPages: { type: GraphQLInt },
    page: { type: GraphQLInt },
    pagingCounter: { type: GraphQLInt },
    hasPrevPage: { type: GraphQLBoolean },
    hasNextPage: { type: GraphQLBoolean },
    prevPage: { type: GraphQLInt },
    nextPage: { type: GraphQLInt },
  },
});

export const RecentMessagesResponseType = new GraphQLObjectType({
  name: 'RecentMessagesResponse',
  fields: {
    docs: { type: new GraphQLList(VirtualMessageType) },
    totalDocs: { type: GraphQLInt },
    source: { type: GraphQLString },
  },
});
