import type { PayloadHandler } from 'payload';
import { config } from '@/config';
import { queryMessages, queryMessagesFromCache } from '@/services/virtual-messages/query';
import type { VirtualMessageQuery } from '@/utils/virtual-messages/types';

/**
 * GET /api/messages
 * List messages with pagination (follows Payload conventions)
 */
export const listMessages: PayloadHandler = async (req) => {
  const { payload } = req;

  try {
    // Parse query parameters from URL
    const url = new URL(req.url || '', config.payloadApiUrl);
    const searchParams = url.searchParams;

    const query: VirtualMessageQuery = {
      threadUid: searchParams.get('threadUid') || '',
      channelUid: searchParams.get('channelUid') || undefined,
      senderType: (searchParams.get('senderType') as 'user' | 'agent') || undefined,
      senderUserUid: searchParams.get('senderUserUid') || undefined,
      senderAgentUid: searchParams.get('senderAgentUid') || undefined,
      includeDeleted: searchParams.get('includeDeleted') === 'true',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50,
      sort: (searchParams.get('sort') as any) || '-createdAt',
      reverse: searchParams.get('reverse') === 'true',
      source: (searchParams.get('source') as 'cache' | 'database' | 'auto') || undefined,
    };

    // Validate required parameters
    if (!query.threadUid) {
      return Response.json({ errors: [{ message: 'threadUid is required' }] }, { status: 400 });
    }

    // Query messages
    const result = await queryMessages(payload, query);

    payload.logger.debug(
      {
        threadUid: query.threadUid,
        count: result.docs.length,
        source: 'source' in result ? result.source : 'database',
      },
      '[Virtual Messages] Listed messages',
    );

    // Return in Payload format
    return Response.json(result, { status: 200 });
  } catch (error) {
    payload.logger.error(error, '[Virtual Messages] Error listing messages');
    return Response.json(
      {
        errors: [
          {
            message: error instanceof Error ? error.message : 'Failed to list messages',
          },
        ],
      },
      { status: 500 },
    );
  }
};

/**
 * GET /api/messages/recent
 * Get recent messages from cache (fast path)
 */
export const getRecentMessages: PayloadHandler = async (req) => {
  const { payload } = req;

  try {
    // Parse query parameters from URL
    const url = new URL(req.url || '', config.payloadApiUrl);
    const searchParams = url.searchParams;

    const query: VirtualMessageQuery = {
      threadUid: searchParams.get('threadUid') || '',
      channelUid: searchParams.get('channelUid') || undefined,
      senderType: (searchParams.get('senderType') as 'user' | 'agent') || undefined,
      reverse: searchParams.get('reverse') === 'true',
    };

    if (!query.threadUid) {
      return Response.json({ errors: [{ message: 'threadUid is required' }] }, { status: 400 });
    }

    const result = await queryMessagesFromCache(payload, query);

    payload.logger.debug(
      {
        threadUid: query.threadUid,
        count: result.docs.length,
      },
      '[Virtual Messages] Retrieved recent messages from cache',
    );

    return Response.json(result, { status: 200 });
  } catch (error) {
    payload.logger.error(error, '[Virtual Messages] Error getting recent messages');

    return Response.json(
      {
        errors: [
          {
            message: error instanceof Error ? error.message : 'Failed to get recent messages',
          },
        ],
      },
      { status: 500 },
    );
  }
};

/**
 * GET /api/messages/:id
 * Get single message by ID (searches both collections)
 */
export const getMessage: PayloadHandler = async (req) => {
  const { payload } = req;

  try {
    // Extract ID from URL path
    const url = new URL(req.url || '', config.payloadApiUrl);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];

    const messageId = parseInt(id, 10);
    if (Number.isNaN(messageId)) {
      return Response.json({ errors: [{ message: 'Invalid message ID' }] }, { status: 400 });
    }

    // Try user messages first
    try {
      const userMessage = await payload.findByID({
        collection: 'userMessages',
        id: messageId,
        depth: 1,
      });

      if (userMessage) {
        const { transformUserMessage } = await import('@/utils/virtual-messages/transform');
        const virtual = transformUserMessage(userMessage as any);
        return Response.json(virtual, { status: 200 });
      }
    } catch (_error) {
      // Not found in user messages, try agent messages
    }

    // Try agent messages
    try {
      const agentMessage = await payload.findByID({
        collection: 'agentMessages',
        id: messageId,
        depth: 1,
      });

      if (agentMessage) {
        const { transformAgentMessage } = await import('@/utils/virtual-messages/transform');
        const virtual = transformAgentMessage(agentMessage as any);
        return Response.json(virtual, { status: 200 });
      }
    } catch (_error) {
      // Not found in either collection
    }

    // Message not found
    return Response.json(
      { errors: [{ message: `Message with ID ${id} not found` }] },
      { status: 404 },
    );
  } catch (error) {
    payload.logger.error(error, '[Virtual Messages] Error getting message:');
    return Response.json(
      {
        errors: [
          {
            message: error instanceof Error ? error.message : 'Failed to get message',
          },
        ],
      },
      { status: 500 },
    );
  }
};
