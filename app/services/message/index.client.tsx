import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

import { MessageContext, type MessageContextType, type ThreadLockBroadcast } from './index';

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [threadLockBroadcast, setThreadLockBroadcast] = useState<ThreadLockBroadcast | null>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in development mode
    if (initializingRef.current) {
      return;
    }
    initializingRef.current = true;

    console.log('[MessageProvider] Initializing Socket.IO connection...');
    console.log('[MessageProvider] JWT token will be sent automatically via HTTP-only cookies');

    // Determine the message broker URL
    // In development, use window.location; in production, use your configured URL
    const messageBrokerUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;

    // Connect to message broker
    // Note: We use withCredentials to send HTTP-only cookies automatically
    // This is the same approach used by the GraphQL client
    const socketInstance = io(messageBrokerUrl, {
      path: '/socket.io/',
      auth: {
        clientType: 'user', // Use auth instead of extraHeaders for reliable delivery
      },
      withCredentials: true, // Send cookies automatically (including HTTP-only cookies)
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection successful
    socketInstance.on('connect', () => {
      console.log('[MessageProvider] Connected to message broker:', socketInstance.id);
      setSocketId(socketInstance.id || null);
      setConnected(true);
      setError(null);
    });

    // Disconnected
    socketInstance.on('disconnect', (reason) => {
      console.log('[MessageProvider] Disconnected from message broker:', reason);
      setConnected(false);
      setSocketId(null);
    });

    // Connection error
    socketInstance.on('connect_error', (err) => {
      console.error('[MessageProvider] Connection error:', err);
      setError(`Connection failed: ${err.message}`);
      setConnected(false);
    });

    // Authentication error
    socketInstance.on('authenticationError', (data) => {
      console.error('[MessageProvider] Authentication error:', data);
      setError('Authentication failed. Please log in again.');
      setConnected(false);
    });

    // Connection confirmation
    socketInstance.on('connectionConfirmation', (data) => {
      console.log('[MessageProvider] Connection confirmed:', data);
    });

    // Subscription confirmed
    socketInstance.on('subscriptionConfirmed', (data) => {
      console.log('[MessageProvider] Subscription confirmed:', data);
    });

    // Subscription error
    socketInstance.on('subscriptionError', (data) => {
      console.error('[MessageProvider] Subscription error:', data);
      setError(data.error || 'Subscription failed');
    });

    // Unsubscription confirmed
    socketInstance.on('unsubscriptionConfirmed', (data) => {
      console.log('[MessageProvider] Unsubscription confirmed:', data);
    });

    // Unsubscription error
    socketInstance.on('unsubscriptionError', (data) => {
      console.error('[MessageProvider] Unsubscription error:', data);
    });

    // Rate limit error
    socketInstance.on('rateLimitError', (data) => {
      console.error('[MessageProvider] Rate limit error:', data);
      setError('Rate limit exceeded. Please slow down.');
    });

    // Thread state updates (lock/unlock)
    socketInstance.on('threadState', (data: ThreadLockBroadcast) => {
      console.log('[MessageProvider] Thread state update:', data);
      setThreadLockBroadcast(data);
    });

    setSocket(socketInstance);

    // Cleanup function
    return () => {
      console.log('[MessageProvider] Cleaning up Socket.IO connection...');
      if (socketInstance) {
        socketInstance.disconnect();
      }
      initializingRef.current = false;
    };
  }, []);

  const subscribe = useCallback(
    (channelUid: string, threadUid: string) => {
      if (!socket || !connected) {
        console.warn('[MessageProvider] Cannot subscribe: not connected');
        setError('Not connected to message broker');
        return;
      }

      console.log('[MessageProvider] Subscribing to:', { channelUid, threadUid });
      socket.emit('subscribe-user', { channelUid, threadUid });
    },
    [socket, connected],
  );

  const unsubscribe = useCallback(
    (channelUid: string, threadUid: string) => {
      if (!socket || !connected) {
        console.warn('[MessageProvider] Cannot unsubscribe: not connected');
        return;
      }

      console.log('[MessageProvider] Unsubscribing from:', { channelUid, threadUid });
      socket.emit('unsubscribe-user', { channelUid, threadUid });
    },
    [socket, connected],
  );

  const value: MessageContextType = {
    connected,
    error,
    subscribe,
    unsubscribe,
    socketId,
    socket,
    threadLockBroadcast,
  };

  return <MessageContext value={value}>{children}</MessageContext>;
};
