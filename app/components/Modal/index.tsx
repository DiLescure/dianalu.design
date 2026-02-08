import debounce from 'lodash.debounce';
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Modal as AriaModal } from 'react-aria-components';

import Button from '@/components/Button';
import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface ModalProps {
  children?: ReactNode | ((...props: any) => ReactNode);
  isOpen?: boolean;
  onOpen?:
    | null
    | ((onOpenProps: {
        childrenProps: any;
        setChildrenProps: (childrenProps: any) => void;
      }) => Promise<void>);
  onClose: (args?: any) => void;
  title: string;
  className?: string;
  boxClassName?: string;
  closeButtonLabel?: string;
  actionChildren?: null | ReactNode | ((...props: any) => ReactNode);
}

export interface ModalRef {
  getChildrenProps: () => any;
  setChildrenProps: (props: any) => void;
}

const Modal = React.forwardRef<ModalRef, ModalProps>(
  (
    {
      children,
      isOpen,
      onOpen,
      onClose,
      title,
      className,
      boxClassName,
      closeButtonLabel,
      actionChildren,
    },
    ref,
  ) => {
    const [childrenProps, setChildrenProps] = useState<any>({});

    useImperativeHandle(ref, () => ({
      getChildrenProps: () => childrenProps,
      setChildrenProps: (props: any) => {
        // console.log('setChildrenProps', props);
        setChildrenProps((prev: any) => ({ ...prev, ...props }));
      },
    }));

    const handleOpen = useCallback(
      debounce(() => {
        console.log('Modal handleOpen');
        onOpen?.({
          childrenProps,
          setChildrenProps: (props: any) =>
            setChildrenProps((prev: any) => ({ ...prev, ...props })),
        });
      }, 100),
      [],
    );

    useEffect(() => {
      if (isOpen) {
        handleOpen();
      }
    }, [isOpen, onOpen]);

    const handleClose = (event: any) => {
      event.preventDefault?.();

      onClose?.();
    };

    const handleOpenChange = (v: boolean) => {
      console.log('handleOpenChange', v);
      if (!v) {
        onClose?.();
      }
    };

    return isOpen ? (
      <AriaModal
        className={parseClassName('modal-component modal modal-open', className || '')}
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={handleOpenChange}
      >
        <div
          className={parseClassName('modal-box prose border border-base-300', boxClassName || '')}
        >
          <div className="modal-header prose-headings:m-0">
            {title && <h3 className="modal-title flex-1">{title}</h3>}
            <Button
              type="button"
              className="modal-close-button"
              onPress={handleClose}
              iconName="close"
            />
          </div>
          <div className="modal-content">
            {typeof children === 'function' ? children(childrenProps) : children}
          </div>
          {(actionChildren || closeButtonLabel) && (
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                {typeof actionChildren === 'function'
                  ? actionChildren(childrenProps)
                  : actionChildren}
                {closeButtonLabel && (
                  <Button type="button" onPress={handleClose}>
                    {closeButtonLabel}
                  </Button>
                )}
              </form>
            </div>
          )}
        </div>
      </AriaModal>
    ) : null;
  },
);

export default Modal;
