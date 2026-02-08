import type { Payload } from 'payload';
import type { AgentMessage, UserMessage } from '@/payload-types';
import { getRecentMessages } from '@/services/valkey';
import { transformCacheMessages, transformMessages } from '@/utils/virtual-messages/transform';
import type {
  VirtualMessageCacheResponse,
  VirtualMessageQuery,
  VirtualMessageResponse,
} from '@/utils/virtual-messages/types';

/**
 * Query messages from cache (fast, recent only)
 */
export const queryMessagesFromCache = async (
  payload: Payload,
  query: VirtualMessageQuery,
): Promise<VirtualMessageCacheResponse> => {
  const { threadUid, channelUid } = query;

  if (!threadUid) {
    throw new Error('threadUid is required for cache query');
  }

  // Get recent messages from Valkey
  const cacheMessages = await getRecentMessages({
    payload,
    channelUid: channelUid || '',
    threadUid,
  });

  // Transform to virtual format
  const virtualMessages = transformCacheMessages(cacheMessages);

  // Apply senderType filter if specified
  let filtered = virtualMessages;
  if (query.senderType) {
    filtered = virtualMessages.filter((msg) => msg.senderType === query.senderType);
  }

  // Apply reverse if requested (useful for UI display order)
  if (query.reverse) {
    filtered = filtered.reverse();
  }

  return {
    docs: filtered,
    totalDocs: filtered.length,
    source: 'cache',
  };
};

/**
 * Query messages from database (full history with pagination)
 */
export const queryMessagesFromDatabase = async (
  payload: Payload,
  query: VirtualMessageQuery,
): Promise<VirtualMessageResponse> => {
  const {
    threadUid,
    channelUid,
    senderType,
    senderUserUid,
    senderAgentUid,
    includeDeleted = false,
    page = 1,
    limit = 50,
    sort = '-createdAt',
    reverse = false,
  } = query;

  if (!threadUid) {
    throw new Error('threadUid is required for database query');
  }

  // Build where clause for thread
  const baseWhere: any = {
    threadUid: { equals: threadUid },
  };

  // Filter out soft-deleted messages unless explicitly requested
  if (!includeDeleted) {
    baseWhere.deletedAt = { equals: null };
  }

  // Add channel filter if provided
  if (channelUid) {
    baseWhere.channelUid = { equals: channelUid };
  }

  // Debug logging
  payload.logger.debug(
    {
      threadUid,
      channelUid,
      includeDeleted,
      baseWhere: JSON.stringify(baseWhere),
    },
    '[Virtual Messages] Database query where clause',
  );

  // Query both collections (if not filtered by senderType)
  const shouldQueryUser = !senderType || senderType === 'user';
  const shouldQueryAgent = !senderType || senderType === 'agent';

  let userMessages: UserMessage[] = [];
  let agentMessages: AgentMessage[] = [];

  if (shouldQueryUser) {
    const userWhere = { ...baseWhere };
    if (senderUserUid) {
      userWhere.senderUserUid = { equals: senderUserUid };
    }

    const userResult = await payload.find({
      collection: 'userMessages',
      where: userWhere,
      limit: 1000, // Get more than needed for combined pagination
      sort,
      depth: 1, // Populate relationships
    });

    userMessages = userResult.docs as UserMessage[];
    payload.logger.debug(
      {
        count: userMessages.length,
        totalDocs: userResult.totalDocs,
        messageUids: userMessages.map((m) => m.messageUid),
      },
      '[Virtual Messages] UserMessages query result',
    );
  }

  if (shouldQueryAgent) {
    const agentWhere = { ...baseWhere };
    if (senderAgentUid) {
      agentWhere.senderAgentUid = { equals: senderAgentUid };
    }

    const agentResult = await payload.find({
      collection: 'agentMessages',
      where: agentWhere,
      limit: 1000, // Get more than needed for combined pagination
      sort,
      depth: 1, // Populate relationships
    });

    agentMessages = agentResult.docs as AgentMessage[];
    payload.logger.debug(
      {
        count: agentMessages.length,
        totalDocs: agentResult.totalDocs,
        messageUids: agentMessages.map((m) => m.messageUid),
      },
      '[Virtual Messages] AgentMessages query result',
    );
  }

  // Transform and combine
  const allMessages = transformMessages(userMessages, agentMessages);

  payload.logger.debug(
    {
      totalCount: allMessages.length,
      messageUids: allMessages.map((m) => m.messageUid),
    },
    '[Virtual Messages] Combined and sorted messages',
  );

  // Calculate pagination
  const totalDocs = allMessages.length;
  const totalPages = Math.ceil(totalDocs / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  let paginatedMessages = allMessages.slice(startIndex, endIndex);

  // Apply reverse if requested (useful for UI display order)
  if (reverse) {
    paginatedMessages = paginatedMessages.reverse();
  }

  // Build response following Payload conventions
  return {
    docs: paginatedMessages,
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter: startIndex + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
};

/**
 * Smart query that chooses best source
 */
export const queryMessages = async (
  payload: Payload,
  query: VirtualMessageQuery,
): Promise<VirtualMessageResponse | VirtualMessageCacheResponse> => {
  const { source = 'auto', limit = 50 } = query;

  // Auto mode: use cache for small recent queries, database otherwise
  if (source === 'auto') {
    // Use cache if requesting <= 10 messages and no pagination
    if (limit <= 10 && (!query.page || query.page === 1)) {
      try {
        return await queryMessagesFromCache(payload, query);
      } catch (error) {
        payload.logger.warn(
          error,
          '[Virtual Messages] Cache query failed, falling back to database',
        );
        // Fall through to database query
      }
    }
  }

  // Explicit cache source
  if (source === 'cache') {
    return await queryMessagesFromCache(payload, query);
  }

  // Database source (default)
  return await queryMessagesFromDatabase(payload, query);
};
