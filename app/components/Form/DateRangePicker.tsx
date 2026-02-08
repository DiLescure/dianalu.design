import type { DateValue } from 'react-aria-components';
import DateRangePicker from '@/components/DateRangePicker';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

type DateRange = { start: Date | null; end: Date | null } | null;

interface FormDateRangePickerProps extends FormFieldCommonProps {
  granularity?: 'day' | 'hour' | 'minute' | 'second';
  minValue?: DateValue | null;
  maxValue?: DateValue | null;
  isDateUnavailable?: (date: DateValue) => boolean;
  placeholderValue?: DateValue | null;
}

export const createFormDateRangePicker = (useFieldContext: useFieldContextFn) => {
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
  }: FormDateRangePickerProps) => {
    const field = useFieldContext<DateRange>();

    return (
      <DateRangePicker
        label={label}
        description={description}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-date-range-picker-component"
        onKeyDown={onKeyDown as any}
        granularity={granularity}
        minValue={minValue as DateValue | undefined}
        maxValue={maxValue as DateValue | undefined}
        isDateUnavailable={isDateUnavailable}
        placeholderValue={placeholderValue as DateValue | undefined}
      />
    );
  };
};

export default createFormDateRangePicker;
