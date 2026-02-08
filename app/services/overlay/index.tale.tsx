import { z } from 'zod';

import type { TaleContent } from '@/components/Taleforge/types';

import OverlayServiceTale from './index.tale.mdx';

const tale: TaleContent = {
  taleComponent: OverlayServiceTale,
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
