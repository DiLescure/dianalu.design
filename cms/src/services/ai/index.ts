'use server';
import payloadConfig from '@payload-config';
import { generateText, streamText } from 'ai';
import { getPayload } from 'payload';
import type { AgentMessage, ModelDefinition, UserMessage } from '@/payload-types';
import { broadcastMessage } from '@/services/message-broker';
import { updateAgentMessageContent } from '@/utils/messages';
import type { BroadcastMessage, UserMessageWithContent } from '@/utils/messages/types';
import { lockThread, unlockThread } from '@/utils/threads';
import {
  formatMessagesForAI,
  formatSystemMessage,
  formatUserMessageForCache,
  parseCacheMessage,
} from './formatting';
import { type AIProvider, getAIModel } from './providers';

/**
 * Agent Request - Request to process a message for an AI agent
 */
export interface AgentRequest {
  // Internal numeric IDs (for database operations)
  agentId: number;
  agentMessageId: number;

  // Uid fields (for locking, caching, broadcasting)
  agentUid: string;
  channelUid: string;
  threadUid: string;

  // User message data
  userMessage: UserMessageWithContent;

  noStreamBroadcast?: boolean | null;
  processOnlyCurrentMessage?: boolean | null;
}

/**
 * Agent Request Result - Result of processing an agent request
 */
export interface AgentRequestResult {
  success: boolean;
  agentMessageId?: number;
  error?: string;
}

/**
 * Process an agent request
 *
 * This function:
 * 1. Retrieves the agent configuration
 * 2. Gets conversation context from Valkey cache
 * 3. Calls the appropriate AI provider (OpenAI, Anthropic, Google)
 * 4. Streams the response
 * 5. Creates an agent message with the response
 * 6. Broadcasts the message to subscribers
 *
 * @param agentRequest - The agent request to process
 * @returns Result of processing the request
 */
export const processAgentRequest = async (
  agentRequest: AgentRequest,
): Promise<AgentRequestResult> => {
  const payload = await getPayload({ config: payloadConfig });
  const startTime = Date.now();

  // Extract both IDs (internal) and Uids (external) from request
  const {
    agentId,
    agentMessageId,
    agentUid,
    channelUid,
    threadUid,
    userMessage,
    noStreamBroadcast,
    processOnlyCurrentMessage,
  } = agentRequest;

  payload.logger.debug(
    {
      agentUid,
      threadUid,
      channelUid,
      agentId,
      agentMessageId,
    },
    '[AI] Processing agent request',
  );

  try {
    const agentMessage = await updateAgentMessageContent(payload, agentMessageId, {
      text: '',
      status: 'streaming',
    });

    if (!agentMessage) {
      throw new Error('Agent message not found');
    }

    payload.logger.debug({ agentMessage }, `[AI] Agent message updated`);

    // === STEP 1: LOCK THE THREAD ===
    // Note: Lock state broadcast is handled by Threads collection afterChange hook
    const lockedThread = await lockThread(payload, threadUid, 'agentResponding');

    if (!lockedThread) {
      throw new Error('Failed to lock thread');
    }

    payload.logger.debug(`[AI] Thread ${threadUid} locked successfully`);

    // === STEP 2: GET AGENT CONFIGURATION ===
    const agent = await payload.findByID({
      collection: 'agents',
      id: agentId,
    });

    if (!agent) {
      // Unlock before throwing (broadcast handled by hook)
      await unlockThread(payload, threadUid);
      throw new Error(`Agent not found with ID: ${agentId}`);
    }

    payload.logger.debug(
      `[AI] Agent found: ${agent.agentName} (${(agent.agentModel as ModelDefinition).label}), Uid: ${agent.agentUid}`,
    );

    // 4. Get all messages from the thread for context
    // Query both UserMessages and AgentMessages collections
    const baseWhere = {
      threadUid: { equals: threadUid },
      deletedAt: { equals: null }, // Exclude soft-deleted messages
    };

    const [userMessagesResult, agentMessagesResult] = processOnlyCurrentMessage
      ? await Promise.all([
          payload.find({
            collection: 'userMessages',
            where: baseWhere,
            limit: 1,
            sort: '-createdAt', // Ascending order (oldest first)
            depth: 0, // No need to populate relationships for AI context
          }),
        ])
      : await Promise.all([
          payload.find({
            collection: 'userMessages',
            where: baseWhere,
            limit: 1000,
            sort: 'createdAt', // Ascending order (oldest first)
            depth: 0, // No need to populate relationships for AI context
          }),
          payload.find({
            collection: 'agentMessages',
            where: baseWhere,
            limit: 1000,
            sort: 'createdAt', // Ascending order (oldest first)
            depth: 0, // No need to populate relationships for AI context
          }),
        ]);

    // Combine and sort messages by date
    let allMessages: ((UserMessage | AgentMessage) & { timestamp: number })[] = [
      ...userMessagesResult.docs.map((msg) => ({
        ...msg,
        senderType: 'user' as const,
        timestamp: new Date(msg.createdAt).getTime(),
      })),
    ];

    if (!processOnlyCurrentMessage && agentMessagesResult) {
      allMessages.push(
        ...agentMessagesResult.docs.map((msg) => ({
          ...msg,
          senderType: 'agent' as const,
          timestamp: new Date(msg.createdAt).getTime(),
        })),
      );
    }

    allMessages = allMessages.sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp ascending

    // Map to CacheMessage format
    const recentMessages = allMessages.map((msg) => {
      const senderUid =
        (msg as any).senderType === 'user'
          ? (msg as any).senderUserUid || 'unknown'
          : (msg as any).senderAgentUid || 'unknown';

      return {
        id: msg.id,
        senderType: (msg as any).senderType,
        senderUid,
        messageContent: JSON.stringify(msg.messageContent),
        timestamp: msg.timestamp,
        channelUid,
        threadUid,
      };
    });

    payload.logger.debug(
      {
        userMessagesCount: userMessagesResult.docs.length,
        agentMessagesCount: agentMessagesResult?.docs.length,
        totalMessages: recentMessages.length,
      },
      `[AI] Retrieved all thread messages`,
    );

    // Add the current user message to the context
    recentMessages.push(
      formatUserMessageForCache(
        {
          ...userMessage,
          senderType: 'user',
        },
        channelUid,
        threadUid,
      ),
    );

    // Parse messages with null handling (updated in Task 8.4)
    const parsedRecentMessages = recentMessages
      .map((msg) => parseCacheMessage(msg))
      .filter((msg): msg is NonNullable<typeof msg> => msg !== null); // Type guard

    payload.logger.debug(
      {
        totalMessages: recentMessages.length,
        parsedMessages: parsedRecentMessages.length,
      },
      '[AI] Retrieved context',
    );

    // 5. Format messages for AI (uses Uid for sender identification)
    const aiMessages = formatMessagesForAI(parsedRecentMessages);
    const systemMessage = formatSystemMessage(agent);

    // If last two messages are exactly the same user message, remove the last message
    const len = aiMessages.length;
    if (
      len >= 2 &&
      aiMessages[len - 1].role === 'user' &&
      aiMessages[len - 2].role === 'user' &&
      JSON.stringify(aiMessages[len - 1].content) === JSON.stringify(aiMessages[len - 2].content)
    ) {
      aiMessages.pop();
      payload.logger.debug(
        `[AI] Removed duplicate user message from context (last two messages were identical)`,
      );
    }

    // payload.logger.debug(
    //   {
    //     aiMessages,
    //   },
    //   '[AI] Formatted messages for AI',
    // );

    // 6. Get AI model
    const model = agent.agentModel as ModelDefinition;
    // const providerConfig = getProviderConfig(model.provider);

    // Get circuit breaker for this provider
    const { circuitBreakers } = await import('@/utils/resilience/circuit-breaker');
    const providerCircuitBreaker =
      circuitBreakers[model.provider.toLowerCase() as AIProvider['name']];

    if (!providerCircuitBreaker) {
      throw new Error(`No circuit breaker found for provider: ${model.provider}`);
    }

    payload.logger.debug(
      {
        modelValue: model.value,
        // circuitBreakerState: providerCircuitBreaker.getState(),
      },
      '[AI] 🚀 Streaming AI response',
    );

    // 7. Stream AI response
    const streamStartTime = Date.now();
    let fullText = '';
    let lastDbUpdateTime = streamStartTime;
    let lastBroadcastTime = streamStartTime;
    const DB_UPDATE_INTERVAL = 1000; // ms between database updates
    const BROADCAST_INTERVAL = 10; // ms between broadcasts

    const streamTextOptions = {
      model: getAIModel({
        provider: model.provider,
        modelId: model.value,
        apiKey: model.apiKey,
      }),
      system: systemMessage,
      messages: aiMessages,
    };

    payload.logger.debug(streamTextOptions);

    if (!noStreamBroadcast) {
      // Wrap AI streaming in circuit breaker
      const result = await providerCircuitBreaker.execute(async () => {
        return await streamText(streamTextOptions);
      });

      // 8. Process stream
      for await (const textPart of result.textStream) {
        fullText += textPart;
        const now = Date.now();
        const shouldUpdateDb = now - lastDbUpdateTime >= DB_UPDATE_INTERVAL;
        const shouldBroadcast = now - lastBroadcastTime >= BROADCAST_INTERVAL;

        if (shouldUpdateDb) {
          // Update agent message content in database
          await updateAgentMessageContent(payload, agentMessageId, {
            text: fullText,
            status: 'streaming',
          });

          lastDbUpdateTime = Date.now();
        }

        const partialBroadcastData: BroadcastMessage = {
          ...agentMessage,
          senderType: 'agent',
          senderUid: agent.agentUid,
          messageContent: {
            text: fullText,
            status: 'streaming',
          },
          partial: true,
          timestamp: streamStartTime,
        };

        // payload.logger.debug({partialBroadcastData}, `[AI] Broadcasting partial: ${shouldBroadcast}`);

        if (shouldBroadcast) {
          // Broadcast partial update (uses Uid fields for routing)
          await broadcastMessage(partialBroadcastData);

          lastBroadcastTime = Date.now();
        }
      }
    } else {
      const result = await generateText(streamTextOptions);

      fullText = result.text;
    }

    payload.logger.debug(`[AI] AI streaming complete. Total length: ${fullText.length}`);

    // 9. Final update
    await updateAgentMessageContent(payload, agentMessageId, {
      text: fullText,
      status: 'complete',
    });

    // 10. Update message cache - happens via afterChange hook on agentMessages

    // 11. Broadcast final complete message (uses Uid fields)
    await broadcastMessage({
      ...agentMessage,
      senderType: 'agent',
      senderUid: agent.agentUid,
      messageContent: {
        text: fullText,
        status: 'streaming',
      },
      timestamp: streamStartTime,
    });

    payload.logger.debug(`[AI] Agent request processing complete: ${agentMessageId}`);

    // === STEP 12: UNLOCK THREAD AFTER COMPLETION ===
    // Note: Unlock state broadcast is handled by Threads collection afterChange hook
    payload.logger.debug('[AI] AI streaming complete, unlocking thread');

    const unlockedThread = await unlockThread(payload, threadUid);

    if (unlockedThread) {
      payload.logger.debug(`[AI] Thread ${threadUid} unlocked successfully`);
    } else {
      payload.logger.warn(`[AI] Failed to unlock thread ${threadUid}`);
    }

    // === RECORD METRICS ===
    const { recordMetric, recordProcessingTime } = await import('@/utils/monitoring/metrics');
    const processingTime = Date.now() - startTime;

    recordMetric('agentRequestsProcessed', 1);
    recordProcessingTime(processingTime);

    payload.logger.info(
      {
        agentUid,
        threadUid,
        processingTimeMs: processingTime,
        success: true,
      },
      '[AI] Agent request completed',
    );

    return {
      success: true,
      agentMessageId,
    };
  } catch (error) {
    payload.logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        agentUid,
        threadUid,
        channelUid,
        agentId,
        agentMessageId,
      },
      '[AI] Error processing agent request',
    );

    // === CRITICAL: ALWAYS UNLOCK THREAD ON ERROR ===
    // Note: Unlock state broadcast is handled by Threads collection afterChange hook
    try {
      await unlockThread(payload, threadUid);
      payload.logger.debug(`[AI] Thread ${threadUid} unlocked after error`);
    } catch (unlockError) {
      payload.logger.error(
        {
          error: unlockError instanceof Error ? unlockError.message : 'Unknown error',
          threadUid,
        },
        '[AI] Failed to unlock thread after error:',
      );
    }

    // === BROADCAST ERROR TO CLIENTS ===
    // If agentMessage exists, broadcast error status to all subscribers
    try {
      const { recordMetric } = await import('@/utils/monitoring/metrics');
      const agent = await payload.findByID({ collection: 'agents', id: agentId });
      const agentMessage = await payload.findByID({
        collection: 'agentMessages',
        id: agentMessageId,
      });

      if (agentMessage && agent) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        await broadcastMessage({
          ...agentMessage,
          senderType: 'agent',
          senderUid: agent.agentUid,
          messageContent: {
            text: 'An error occurred while processing your request.',
            status: 'error',
            error: errorMessage,
          },
          timestamp: Date.now(),
        });
        payload.logger.debug({ threadUid }, '[AI] Error message broadcasted to clients');
      }

      // === RECORD ERROR METRICS ===
      recordMetric('agentRequestsFailed', 1);
    } catch (broadcastError) {
      payload.logger.error(
        {
          error: broadcastError instanceof Error ? broadcastError.message : 'Unknown error',
          threadUid,
        },
        '[AI] Failed to broadcast error message',
      );
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
