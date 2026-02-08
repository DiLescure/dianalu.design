import { z } from 'zod';

import { availableIconNames, type IconName } from '@/components/Icon';
import type { TaleContent } from '@/components/Taleforge/types';
import { parseClassName } from '@/util/parse-class-name';

import ButtonTale from './index.tale.mdx';

interface ButtonTaleState {
  buttonText: string;
  isLoading: boolean;
  isDisabled: boolean;
  iconName: IconName | '';
  color: string;
  style: string;
  behavior: string;
  size: string;
  modifier: string;
}

const tale: TaleContent<ButtonTaleState> = {
  taleComponent: ({ taleState }) => {
    const { buttonText, isLoading, isDisabled, iconName, color, style, behavior, size, modifier } =
      taleState;

    const byobButtonProps: {
      isLoading: boolean;
      isDisabled: boolean;
      iconName: IconName | '';
      className?: string;
    } = {
      isLoading,
      isDisabled,
      iconName,
    };

    byobButtonProps.className = parseClassName(color, style, behavior, size, modifier);

    return <ButtonTale byobButtonProps={byobButtonProps} byobButtonText={buttonText} />;
  },
  defaultValues: {
    buttonText: 'Click me',
    isLoading: false,
    isDisabled: false,
    iconName: '',
    color: 'btn-primary',
    style: '',
    behavior: '',
    size: '',
    modifier: '',
  },
  schema: z.object({
    buttonText: z.string(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    iconName: z.enum(['', ...availableIconNames] as [string, ...string[]]),
    color: z.enum([
      '',
      'btn-primary',
      'btn-secondary',
      'btn-accent',
      'btn-info',
      'btn-success',
      'btn-warning',
      'btn-error',
      'btn-neutral',
    ]),
    style: z.enum(['', 'btn-outline', 'btn-dash', 'btn-soft', 'btn-ghost', 'btn-link']),
    behavior: z.enum(['', 'btn-active']),
    size: z.enum(['', 'btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-xl']),
    modifier: z.enum(['', 'btn-wide', 'btn-block', 'btn-square', 'btn-circle']),
  }),
};

export default tale;
