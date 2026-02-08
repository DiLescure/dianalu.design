import { useEffect } from 'react';
import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';
import eventService from '@/services/event';

import BasicModalTale from './basic.tale.mdx';

// Basic Modal Tale
interface ModalBasicState {
  isOpen: boolean;
  showCloseButton: boolean;
  title: string;
  content: string;
}

const tale: TaleContent<ModalBasicState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const { isOpen, showCloseButton, title, content } = taleState as ModalBasicState;

    const handleCloseModal = () => {
      eventService.emit('overlay:request-set-modal-props', null);

      taleOnChange({
        stateKey: 'isOpen',
        value: false,
      });
    };

    const handleOpenModal = () => {
      eventService.emit('overlay:request-set-modal-props', {
        isOpen,
        title,
        children: content,
        onClose: handleCloseModal,
        closeButtonLabel: showCloseButton ? 'Close' : undefined,
      });

      if (!isOpen) {
        taleOnChange({
          stateKey: 'isOpen',
          value: true,
        });
      }
    };

    useEffect(() => {
      if (isOpen) {
        handleOpenModal();
      }
    }, [isOpen]);

    return <BasicModalTale handleOpenModal={handleOpenModal} taleState={taleState} />;
  },
  defaultValues: {
    isOpen: false,
    showCloseButton: true,
    title: 'Basic Modal Example',
    content: 'This is a basic modal example with configurable properties.',
  },
  schema: z.object({
    isOpen: z.boolean(),
    showCloseButton: z.boolean(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  }),
};

export default tale;
