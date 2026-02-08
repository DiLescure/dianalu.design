import type React from 'react';
import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ModalProps } from '@/components/Modal';
import type { ToastProps } from '@/components/Toast';
import { TOAST_FALLBACK_INTERVAL_TIME } from '@/config';
import eventService from '@/services/event';
import { uid } from '@/util';

export interface OverlayState {
  appLoading: boolean;
  toastQueue: ToastProps[] | null;
  toastProps: ToastProps | null;
  modalProps: ModalProps | null;
}

interface OverlayContextType {
  appLoading: boolean;
  toastQueue: ToastProps[] | null;
  toastProps: ToastProps | null;
  modalProps: ModalProps | null;
  toastQueueAdd: (toastProps: ToastProps) => void;
  toastQueueRemove: (toastProps: ToastProps) => void;
  toastQueueClear: () => void;
  toastQueueNext: () => void;
  setModalProps: (modalProps: ModalProps | null) => void;
  setAppLoading: (appLoading: boolean) => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

type OverlayProviderComponentProps = {
  children: ReactNode;
};

let toastFallbackInterval: NodeJS.Timeout;

export const OverlayProvider: React.FC<OverlayProviderComponentProps> = ({ children }) => {
  // Split the state into individual pieces to avoid full re-renders when only one property changes
  const [appLoading, setAppLoading] = useState<boolean>(false);
  const [toastQueue, setToastQueue] = useState<ToastProps[] | null>(null);
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const toastQueueRemove = useCallback((toastProps: ToastProps) => {
    setToastQueue((prevQueue) => prevQueue?.filter((toast) => toast.id !== toastProps.id) || null);
  }, []);

  const toastQueueClear = useCallback(() => {
    setToastQueue([]);
  }, []);

  const toastQueueNext = useCallback(() => {
    if (toastQueue && toastQueue.length > 0) {
      const nextToastProps = toastQueue[0];

      console.log('nextToastProps', nextToastProps);

      setToastProps(nextToastProps);
      // Remove the toast we're displaying from the queue
      setToastQueue(
        (prevQueue) => prevQueue?.filter((toast) => toast.id !== nextToastProps.id) || null,
      );
    } else {
      setToastProps(null);
    }
  }, [toastQueue]);

  const toastQueueAdd = useCallback(
    (toastPropsArg: ToastProps) => {
      const newToast = {
        ...toastPropsArg,
        id: uid.rnd(),
      };

      console.log('toastQueueAdd', toastPropsArg, toastProps, toastQueue, toastQueueNext);

      // If no active toast, set this one immediately
      if (!toastProps) {
        setToastProps(newToast);
      } else {
        setToastQueue((prevQueue) => {
          const updatedQueue = [...(prevQueue || []), newToast];
          return updatedQueue;
        });
      }
    },
    [toastProps, toastQueueNext],
  );

  // Check for queued toasts when the current toast is cleared
  useEffect(() => {
    clearInterval(toastFallbackInterval);

    toastFallbackInterval = setInterval(() => {
      if (toastQueue && toastQueue.length > 0 && !toastProps) {
        toastQueueNext();
      }
    }, TOAST_FALLBACK_INTERVAL_TIME);

    return () => {
      clearInterval(toastFallbackInterval);
    };
  }, [toastQueue, toastProps, toastQueueNext]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      appLoading,
      toastQueue,
      toastProps,
      modalProps,
      toastQueueAdd,
      toastQueueRemove,
      toastQueueClear,
      toastQueueNext,
      setModalProps,
      setAppLoading,
    }),
    [
      appLoading,
      toastQueue,
      toastProps,
      modalProps,
      toastQueueAdd,
      toastQueueRemove,
      toastQueueClear,
      toastQueueNext,
      setModalProps,
      setAppLoading,
    ],
  );

  useEffect(() => {
    eventService.on('overlay:request-toast-queue-add', toastQueueAdd);

    return () => {
      eventService.off('overlay:request-toast-queue-add', toastQueueAdd);
    };
  }, [toastQueueAdd]);

  useEffect(() => {
    eventService.on('overlay:request-set-modal-props', setModalProps);

    return () => {
      eventService.off('overlay:request-set-modal-props', setModalProps);
    };
  }, [setModalProps]);

  useEffect(() => {
    eventService.on('overlay:request-set-app-loading', setAppLoading);

    return () => {
      eventService.off('overlay:request-set-app-loading', setAppLoading);
    };
  }, [setAppLoading]);

  return <OverlayContext value={contextValue}>{children}</OverlayContext>;
};

export const useOverlayState = () => {
  const context = use(OverlayContext);
  if (!context) {
    throw new Error('useOverlayState must be used within an OverlayProvider');
  }
  return context;
};

// Specialized hooks for accessing only specific parts of the state
// This prevents components from re-rendering when unrelated state changes
export const useToastProps = () => {
  const context = use(OverlayContext);
  if (!context) {
    throw new Error('useToastProps must be used within an OverlayProvider');
  }
  return context.toastProps;
};

export const useModalProps = () => {
  const context = use(OverlayContext);
  if (!context) {
    throw new Error('useModalProps must be used within an OverlayProvider');
  }
  return context.modalProps;
};

export const useToastQueue = () => {
  const context = use(OverlayContext);
  if (!context) {
    throw new Error('useToastQueue must be used within an OverlayProvider');
  }
  return {
    toastQueue: context.toastQueue,
    toastQueueAdd: context.toastQueueAdd,
    toastQueueRemove: context.toastQueueRemove,
    toastQueueClear: context.toastQueueClear,
    toastQueueNext: context.toastQueueNext,
  };
};

export const useAppLoading = () => {
  const context = use(OverlayContext);
  if (!context) {
    throw new Error('useAppLoading must be used within an OverlayProvider');
  }
  return context.appLoading;
};
