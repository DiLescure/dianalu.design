import { z } from 'zod';
import type { TaleContent } from '@/components/Taleforge/types';

const tale: TaleContent = {
  taleComponent: () => <></>,
  defaultValues: {},
  schema: z.object({}),
};

export default tale;
