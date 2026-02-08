import cloneDeep from 'lodash.clonedeep';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { StateContext, type StoredAppState, type VirtualAppState } from './index';

const initialStoredAppState: StoredAppState = {
  userUid: null,
};

const initialVirtualAppState: VirtualAppState = {};

const LOCAL_STORAGE_STATE_KEY = 'siteState';

// Move window access into a function to avoid SSR issues
const getCurrentPagePath = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '';
};

const loadState = <StoredPageState, VirtualPageState>(
  initialStoredPageState: StoredPageState,
  initialVirtualPageState: VirtualPageState,
): {
  storedAppState: StoredAppState;
  virtualAppState: VirtualAppState;
  storedPageState: StoredPageState;
  virtualPageState: VirtualPageState;
} => {
  let storedAppState: StoredAppState = cloneDeep(initialStoredAppState);
  let storedPageState: StoredPageState = cloneDeep(initialStoredPageState);

  // Only access localStorage on the client
  if (typeof window !== 'undefined') {
    try {
      const serializedAppState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
      if (serializedAppState !== null) {
        const loadedState: StoredAppState = JSON.parse(serializedAppState);
        // console.log('Loaded app state from localStorage:', loadedState);
        storedAppState = loadedState;
      }
    } catch (err) {
      console.error('Error loading app state from localStorage:', err);
      storedAppState = cloneDeep(initialStoredAppState);
    }

    try {
      const currentPagePath = getCurrentPagePath();
      const serializedPageState = localStorage.getItem(
        `${LOCAL_STORAGE_STATE_KEY}${currentPagePath}`,
      );
      if (serializedPageState !== null) {
        const loadedState: StoredPageState = JSON.parse(serializedPageState);
        // console.log('Loaded page state from localStorage:', loadedState);
        storedPageState = loadedState;
      }
    } catch (err) {
      console.error('Error loading page state from localStorage:', err);
      storedPageState = cloneDeep(initialStoredPageState);
    }
  }

  return {
    storedAppState,
    virtualAppState: cloneDeep(initialVirtualAppState),
    storedPageState,
    virtualPageState: cloneDeep(initialVirtualPageState),
  };
};

const saveAppState = (state: StoredAppState) => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, serializedState);
    } catch (err) {
      console.error('Error saving app state to localStorage:', err);
    }
  }
};

const savePageState = (state: any) => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = JSON.stringify(state);
      const currentPagePath = getCurrentPagePath();
      localStorage.setItem(`${LOCAL_STORAGE_STATE_KEY}${currentPagePath}`, serializedState);
    } catch (err) {
      console.error('Error saving page state to localStorage:', err);
    }
  }
};

type StateProviderComponentProps<StoredPageState, VirtualPageState> = {
  initialStoredPageState: StoredPageState;
  initialVirtualPageState: VirtualPageState;
  children: ReactNode;
};

interface StateProviderComponent extends React.FC<StateProviderComponentProps<any, any>> {
  <StoredPageState, VirtualPageState>(
    props: StateProviderComponentProps<StoredPageState, VirtualPageState>,
  ): ReturnType<React.FC>;
}

export const StateProvider: StateProviderComponent = <StoredPageState, VirtualPageState>({
  children,
  initialStoredPageState,
  initialVirtualPageState,
}: StateProviderComponentProps<StoredPageState, VirtualPageState>) => {
  const {
    storedAppState: loadedStoredAppState,
    virtualAppState: loadedVirtualAppState,
    storedPageState: loadedStoredPageState,
    virtualPageState: loadedVirtualPageState,
  } = loadState(initialStoredPageState, initialVirtualPageState);

  const [storedAppState, setStoredAppState] = useState<StoredAppState>(loadedStoredAppState);
  const [virtualAppState, setVirtualAppState] = useState<VirtualAppState>(loadedVirtualAppState);
  const [storedPageState, setStoredPageState] = useState<StoredPageState>(loadedStoredPageState);
  const [virtualPageState, setVirtualPageState] =
    useState<VirtualPageState>(loadedVirtualPageState);

  useEffect(() => {
    saveAppState(storedAppState);
  }, [storedAppState]);

  const updateStoredAppState = useCallback((newState: Partial<StoredAppState>) => {
    setStoredAppState((prevState) => {
      const updatedState = cloneDeep({ ...prevState, ...newState });
      saveAppState(updatedState);
      return updatedState;
    });
  }, []);

  const updateVirtualAppState = useCallback((newState: Partial<VirtualAppState>) => {
    setVirtualAppState((prevState) => {
      const updatedState = cloneDeep({ ...prevState, ...newState });
      return updatedState;
    });
  }, []);

  const updateStoredPageState = useCallback((newState: Partial<StoredPageState>) => {
    setStoredPageState((prevState) => {
      const updatedState = cloneDeep({ ...prevState, ...newState });
      savePageState(updatedState);
      return updatedState;
    });
  }, []);

  const updateVirtualPageState = useCallback((newState: Partial<VirtualPageState>) => {
    setVirtualPageState((prevState) => {
      const updatedState = cloneDeep({ ...prevState, ...newState });
      return updatedState;
    });
  }, []);

  // console.log('virtualAppState', virtualAppState);

  const contextValue = useMemo(
    () => ({
      storedAppState,
      updateStoredAppState,
      virtualAppState,
      updateVirtualAppState,
      storedPageState,
      updateStoredPageState,
      virtualPageState,
      updateVirtualPageState,
    }),
    [
      storedAppState,
      updateStoredAppState,
      virtualAppState,
      updateVirtualAppState,
      storedPageState,
      updateStoredPageState,
      virtualPageState,
      updateVirtualPageState,
    ],
  );

  return <StateContext value={contextValue}>{children}</StateContext>;
};

export default StateProvider;
