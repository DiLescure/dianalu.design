import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';
import BasicTale from './index.tale.mdx';
import TutorialModal, { type TutorialStep } from './index';

interface TutorialModalState {
  isOpen: boolean;
}

const steps: TutorialStep[] = [
  {
    title: 'Welcome',
    content: <p>Welcome to the tutorial! This is the first step.</p>,
  },
  {
    title: 'Features',
    content: <p>Here we explain some features...</p>,
  },
  {
    title: 'Get Started',
    content: <p>You are ready to go!</p>,
  },
];

const tale: TaleContent<TutorialModalState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const { isOpen } = taleState;

    const handleClose = () => {
      taleOnChange({
        stateKey: 'isOpen',
        value: false,
      });
    };

    const handleOpen = () => {
      taleOnChange({
        stateKey: 'isOpen',
        value: true,
      });
    };

    return (
      <>
        <BasicTale handleOpenModal={handleOpen} taleState={taleState} />
        <TutorialModal isOpen={isOpen} onClose={handleClose} steps={steps} />
      </>
    );
  },
  defaultValues: {
    isOpen: true,
  },
  schema: z.object({
    isOpen: z.boolean(),
  }),
};

export default tale;
