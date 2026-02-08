import { createContext, use } from 'react';

export interface StoredAppState {
  userUid: string | null;
}

export interface VirtualAppState extends Record<string, any> {}

export interface StateContextType<StoredPageState = any, VirtualPageState = any> {
  storedAppState: StoredAppState;
  updateStoredAppState: (newState: Partial<StoredAppState>) => void;
  virtualAppState: VirtualAppState;
  updateVirtualAppState: (newState: Partial<VirtualAppState>) => void;
  storedPageState: StoredPageState;
  updateStoredPageState: (newState: Partial<StoredPageState>) => void;
  virtualPageState: VirtualPageState;
  updateVirtualPageState: (newState: Partial<VirtualPageState>) => void;
}

export const StateContext = createContext<StateContextType | undefined>(undefined);

export const useGlobalState = <StoredPageState, VirtualPageState>() => {
  const context = use<StateContextType<StoredPageState, VirtualPageState> | undefined>(
    StateContext,
  );
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a StateProvider');
  }
  return context;
};
