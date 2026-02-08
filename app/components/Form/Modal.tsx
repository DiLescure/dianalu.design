import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import Button from '@/components/Button';
import type { ModalProps, ModalRef } from '@/components/Modal';
import Modal from '@/components/Modal';

type FormModalChildrenProps = {
  [key: string | symbol]: any;
  isLoading: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
};

export type FormModalOnOpenProps = {
  childrenProps: FormModalChildrenProps;
  setChildrenProps: (childrenProps: Partial<FormModalChildrenProps>) => void;
};

export interface FormModalProps extends ModalProps {
  submitButtonLabel?: string;
  onOpen?: (onOpenProps: FormModalOnOpenProps) => Promise<void>;
  onSubmit?: null | ((...args: any) => Promise<void>);
  onSubmitError?: (...args: any) => void;
}

export interface FormModalRef {
  getCanSubmit: () => boolean;
  setCanSubmit: (canSubmit: boolean) => void;
}

const FormModal = forwardRef<FormModalRef, FormModalProps>((props, ref) => {
  const { onOpen, onClose, onSubmit, onSubmitError, submitButtonLabel } = props;

  const modalRef = useRef<ModalRef | null>(null);

  useEffect(() => {
    if (props.isOpen && !onOpen) {
      modalRef.current?.setChildrenProps({
        isLoading: false,
        isSubmitting: false,
        canSubmit: true,
      });
    }
  }, [props.isOpen, onOpen]);

  const handleSubmit = (_: any) => {
    // console.log('handleSubmit', event);

    if (!onSubmit) {
      return;
    }

    modalRef.current?.setChildrenProps({
      isSubmitting: true,
    });

    onSubmit()
      .then(() => onClose?.())
      .catch((error: any) => {
        onSubmitError?.(error);
      })
      .finally(() => {
        modalRef.current?.setChildrenProps({
          isSubmitting: false,
        });
      });
  };

  const handleOpen =
    onOpen && typeof onOpen === 'function'
      ? ({ childrenProps, setChildrenProps }: FormModalOnOpenProps) => {
          console.log('FormModal handleOpen');
          setChildrenProps({
            isLoading: true,
            isSubmitting: false,
            canSubmit: true,
          });

          return onOpen?.({ childrenProps, setChildrenProps }).finally(() => {
            setChildrenProps({
              isLoading: false,
            });
          }) as Promise<void>;
        }
      : null;

  useImperativeHandle(
    ref,
    () => ({
      getCanSubmit: () => modalRef.current?.getChildrenProps().canSubmit,
      setCanSubmit: (canSubmit: boolean) => modalRef.current?.setChildrenProps({ canSubmit }),
    }),
    [modalRef.current],
  );

  // const canSubmit = modalRef.current?.getChildrenProps().canSubmit;

  // console.log('canSubmit', canSubmit);

  return (
    <Modal
      {...props}
      ref={modalRef}
      onOpen={handleOpen}
      actionChildren={(childrenProps: FormModalChildrenProps) =>
        submitButtonLabel && onSubmit ? (
          <Button
            type="submit"
            onPress={handleSubmit}
            className="btn-success"
            isLoading={childrenProps.isSubmitting}
            isDisabled={!childrenProps.canSubmit}
            iconName="send"
          >
            {submitButtonLabel}
          </Button>
        ) : null
      }
      className="form-modal-component"
    />
  );
});

export default FormModal;
