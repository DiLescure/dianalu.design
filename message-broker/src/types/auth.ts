export interface TokenValidationResult {
  isValid: boolean;
  userUid?: string;
  error?: string;
}

export interface AuthRequest {
  token: string;
  clientType: 'user' | 'cms';
  socketId: string;
}

export type TokenVerifier = (token: string) => Promise<TokenValidationResult>;
