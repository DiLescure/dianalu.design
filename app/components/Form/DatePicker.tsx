import type { DateValue } from 'react-aria-components';
import DatePicker from '@/components/DatePicker';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

interface FormDatePickerProps extends FormFieldCommonProps {
  granularity?: 'day' | 'hour' | 'minute' | 'second';
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  isDateUnavailable?: (date: DateValue) => boolean;
  placeholderValue?: DateValue | null;
}

export const createFormDatePicker = (useFieldContext: useFieldContextFn) => {
  return ({
    label,
    description,
    isDisabled,
    isLoading,
    onKeyDown,
    granularity,
    minValue,
    maxValue,
    isDateUnavailable,
    placeholderValue,
  }: FormDatePickerProps) => {
    const field = useFieldContext<Date | null>();

    return (
      <DatePicker
        name={field.name}
        label={label}
        description={description}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-date-picker-component"
        onKeyDown={onKeyDown}
        granularity={granularity}
        minValue={minValue}
        maxValue={maxValue}
        isDateUnavailable={isDateUnavailable}
        placeholderValue={placeholderValue}
      />
    );
  };
};

export default createFormDatePicker;
