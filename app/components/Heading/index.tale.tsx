import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import HeadingTale from './index.tale.mdx';

const tale: TaleContent = {
  taleComponent: HeadingTale,
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
