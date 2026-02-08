import { useCallback } from 'react';
import { z } from 'zod';
import type { SliderProps } from '@/components/Slider';
import type { TaleContent } from '@/components/Taleforge/types';
import MinMaxSliderTale from './index.tale.mdx';

interface SliderTaleState {
  label: string;
  description?: string;
  isLoading: boolean;
  isDisabled: boolean;
  minValue: number;
  maxValue: number;
  step: number;
  value: number;
  thumbLabel: string;
}

const tale: TaleContent<SliderTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const {
      label,
      description,
      isLoading,
      isDisabled,
      minValue,
      maxValue,
      step,
      value,
      thumbLabel,
    } = taleState;

    const handleChange = useCallback(
      (value: number) => {
        taleOnChange({
          stateKey: 'value',
          value,
        });
      },
      [taleOnChange],
    );

    const sliderProps: SliderProps = {
      label,
      description,
      isLoading,
      isDisabled,
      minValue,
      maxValue,
      step,
      thumbLabel,
      defaultValue: value,
      onChange: handleChange,
    };

    return <MinMaxSliderTale sliderProps={sliderProps} />;
  },
  defaultValues: {
    label: 'Range',
    description: 'Slide to select a value',
    isLoading: false,
    isDisabled: false,
    minValue: 0,
    maxValue: 100,
    step: 1,
    value: 20,
    thumbLabel: 'Value',
  },
  schema: z.object({
    label: z.string(),
    description: z.string().optional(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    minValue: z.number(),
    maxValue: z.number(),
    step: z.number(),
    value: z.number().readonly(),
    thumbLabel: z.string(),
  }),
};

export default tale;
