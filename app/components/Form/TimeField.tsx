import type { TimeValue } from '@react-types/datepicker';
import TimeField from '@/components/TimeField';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

interface FormTimeFieldProps extends FormFieldCommonProps {
  hourCycle?: 12 | 24;
}

export const createFormTimeField = (useFieldContext: useFieldContextFn) => {
  return ({
    label,
    description,
    isDisabled,
    isLoading,
    onKeyDown,
    hourCycle,
  }: FormTimeFieldProps) => {
    const field = useFieldContext<TimeValue | null>();

    return (
      <TimeField
        label={label}
        description={description}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-time-field-component"
        onKeyDown={onKeyDown as any}
        hourCycle={hourCycle}
      />
    );
  };
};

export default createFormTimeField;
