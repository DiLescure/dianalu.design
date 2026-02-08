import type React from 'react';
import { memo } from 'react';
import LoadingOverlay from '@/components/LoadingOverlay';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import { useAppLoading, useModalProps, useToastProps } from '@/services/overlay';

// Using memo to prevent re-renders when props don't change
const OverlayLayout: React.FC = memo(() => {
  // Use specialized hooks that only subscribe to specific parts of the context
  const modalProps = useModalProps();
  const toastProps = useToastProps();
  const appLoading = useAppLoading();

  return (
    <>
      {modalProps && <Modal {...modalProps} />}
      {toastProps && <Toast {...toastProps} />}
      {appLoading && <LoadingOverlay isVisible={appLoading} />}
    </>
  );
});

export default OverlayLayout;
