import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import CopyButtonTale from './index.tale.mdx';

interface CopyButtonTaleState {
  value: string;
  className: string;
}

const tale: TaleContent<CopyButtonTaleState> = {
  taleComponent: ({ taleState }) => {
    const { value, className } = taleState;

    const copyButtonProps = {
      value,
      className,
    };

    return (
      <>
        <CopyButtonTale copyButtonProps={copyButtonProps} />

        {/* Props documentation is included in the MDX file above */}
      </>
    );
  },
  defaultValues: {
    value: 'Hello, World!',
    className: '',
  },
  schema: z.object({
    value: z.string().min(1, 'Value cannot be empty'),
    className: z.string(),
  }),
};

export default tale;
