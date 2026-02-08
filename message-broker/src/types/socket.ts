import type { Socket } from 'socket.io';
import type { TokenValidationResult } from './auth';
import type { ClientMetadata } from './client';

export interface SocketMetadata {
  socketId: string;
  clientMetadata: ClientMetadata;
}

export interface ExtendedSocket extends Socket {
  authResult: TokenValidationResult;
}
