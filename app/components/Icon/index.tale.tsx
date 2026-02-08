import { z } from 'zod';

import { availableIconNames, type IconName } from '@/components/Icon';
import type { TaleContent } from '@/components/Taleforge/types';

import IconTale from './index.tale.mdx';

interface IconTaleState {
  iconName: IconName;
  sizeClass: string;
}

const tale: TaleContent<IconTaleState> = {
  taleComponent: ({ taleState }) => {
    const { iconName, sizeClass } = taleState;

    const iconProps = {
      name: iconName,
      className: sizeClass,
    };

    return <IconTale availableIconNames={availableIconNames} iconProps={iconProps} />;
  },
  defaultValues: {
    iconName: 'image',
    sizeClass: 'w-12',
  },
  schema: z.object({
    iconName: z.enum(availableIconNames as [string, ...string[]]),
    sizeClass: z.enum([
      'w-4',
      'w-6',
      'w-8',
      'w-10',
      'w-12',
      'w-14',
      'w-16',
      'w-20',
      'w-24',
      'w-28',
      'w-32',
      'w-36',
      'w-40',
      'w-48',
      'w-56',
      'w-64',
    ]),
  }),
};

export default tale;
