import type { TimeValue } from '@react-types/datepicker';
import {
  DateInput,
  DateSegment,
  FieldError,
  Label,
  TimeField as ReactAriaTimeField,
  type TimeFieldProps as ReactAriaTimeFieldProps,
  Text,
} from 'react-aria-components';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface TimeFieldProps
  extends Omit<Omit<ReactAriaTimeFieldProps<TimeValue>, 'onChange'>, 'value'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isLoading?: boolean;
  value?: TimeValue | Date | null;
  onChange?: (value: TimeValue | null) => void;
  hourCycle?: 12 | 24;
}

const TimeField = ({
  label,
  description,
  errorMessage,
  isLoading,
  className,
  onChange,
  value,
  hourCycle = 24,
  ...props
}: TimeFieldProps) => {
  const finalClassName = parseClassName('time-field-component', className);

  const handleChange: ReactAriaTimeFieldProps<TimeValue>['onChange'] = (val) => {
    onChange?.(val ?? null);
  };

  const timeValue: TimeValue | null = (() => {
    if (!value) return null;
    if (value instanceof Date) {
      return {
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds(),
      } as any;
    }
    return value;
  })();

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-10" />
      </div>
    </div>
  ) : (
    <ReactAriaTimeField
      className={`form-control ${finalClassName}`}
      onChange={handleChange}
      value={timeValue ?? null}
      isInvalid={!!errorMessage}
      hourCycle={hourCycle}
      {...props}
    >
      {label && <Label>{label}</Label>}
      <div>
        <DateInput className="input w-auto">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
      </div>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </ReactAriaTimeField>
  );
};

export default TimeField;
