import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import TemplateTale from './index.tale.mdx';

interface TaleContentProps {
  example: string;
}

const tale: TaleContent<TaleContentProps> = {
  taleComponent: ({
    taleState,
    // taleOnChange,
  }) => <TemplateTale {...taleState} />,
  defaultValues: {
    example: 'Hello World',
  },
  schema: z.object({
    example: z.string(),
  }),
};

export default tale;
