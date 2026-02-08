import { useCallback } from 'react';
import { z } from 'zod';
import type { MinMaxSliderProps } from '@/components/MinMaxSlider';
import type { TaleContent } from '@/components/Taleforge/types';
import MinMaxSliderTale from './index.tale.mdx';

interface MinMaxSliderTaleState {
  label: string;
  description?: string;
  isLoading: boolean;
  isDisabled: boolean;
  minValue: number;
  maxValue: number;
  step: number;
  valueMin: number;
  valueMax: number;
  thumbLabelMin: string;
  thumbLabelMax: string;
}

const tale: TaleContent<MinMaxSliderTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const {
      label,
      description,
      isLoading,
      isDisabled,
      minValue,
      maxValue,
      step,
      valueMin,
      valueMax,
      thumbLabelMin,
      thumbLabelMax,
    } = taleState;

    const handleChange = useCallback(
      (value: number[]) => {
        taleOnChange({
          stateKey: 'valueMin',
          value: value[0],
        });
        taleOnChange({
          stateKey: 'valueMax',
          value: value[1],
        });
      },
      [taleOnChange],
    );

    const sliderProps: MinMaxSliderProps = {
      label,
      description,
      isLoading,
      isDisabled,
      minValue,
      maxValue,
      step,
      thumbLabels: [thumbLabelMin, thumbLabelMax],
      defaultValue: [valueMin, valueMax],
      onChange: handleChange,
    };

    return <MinMaxSliderTale sliderProps={sliderProps} />;
  },
  defaultValues: {
    label: 'Range',
    description: 'Select a minimum and maximum value',
    isLoading: false,
    isDisabled: false,
    minValue: 0,
    maxValue: 100,
    step: 1,
    valueMin: 20,
    valueMax: 80,
    thumbLabelMin: 'Minimum',
    thumbLabelMax: 'Maximum',
  },
  schema: z.object({
    label: z.string(),
    description: z.string().optional(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    minValue: z.number(),
    maxValue: z.number(),
    step: z.number(),
    valueMin: z.number().readonly(),
    valueMax: z.number().readonly(),
    thumbLabelMin: z.string(),
    thumbLabelMax: z.string(),
  }),
};

export default tale;
