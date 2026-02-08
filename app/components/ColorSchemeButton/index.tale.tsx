import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import ColorSchemeButtonTale from './index.tale.mdx';

interface ColorSchemeButtonTaleState {
  className: string;
}

const tale: TaleContent<ColorSchemeButtonTaleState> = {
  taleComponent: ({ taleState }) => {
    const { className } = taleState;

    const colorSchemeButtonProps = {
      className,
    };

    return (
      <>
        <ColorSchemeButtonTale colorSchemeButtonProps={colorSchemeButtonProps} />
      </>
    );
  },
  defaultValues: {
    className: 'btn btn-ghost gap-2',
  },
  schema: z.object({
    className: z.string(),
  }),
};

export default tale;
