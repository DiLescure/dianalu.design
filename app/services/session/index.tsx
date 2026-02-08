import { createContext, use } from 'react';

export interface SessionContextType {
  keepSessionAlive: (exp: number) => Promise<number | { error: any }>;
  pingBackend: () => Promise<{ userUid?: string; exp?: number; error?: any }>;
  checkSessionExpired: () => Promise<boolean>;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = use(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
