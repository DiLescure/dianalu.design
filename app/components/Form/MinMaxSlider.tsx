import MinMaxSlider from '@/components/MinMaxSlider';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

interface FormMinMaxSliderProps extends FormFieldCommonProps {
  minValue?: number;
  maxValue?: number;
  step?: number;
  thumbLabels?: string[];
}

export const createFormMinMaxSlider = (useFieldContext: useFieldContextFn) => {
  return ({
    label,
    description,
    isDisabled,
    isLoading,
    minValue,
    maxValue,
    step,
    thumbLabels,
  }: FormMinMaxSliderProps) => {
    const field = useFieldContext<[number, number]>();

    return (
      <MinMaxSlider
        label={label}
        description={description}
        value={field.state.value}
        onChange={(val) => field.handleChange(val)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-min-max-slider-component"
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        thumbLabels={thumbLabels}
      />
    );
  };
};

export default createFormMinMaxSlider;
