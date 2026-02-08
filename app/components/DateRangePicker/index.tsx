import type { DateValue } from '@internationalized/date';
import { CalendarDateTime } from '@internationalized/date';
import type { RangeValue } from '@react-types/shared';
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  DateRangePicker as ReactAriaDateRangePicker,
  type DateRangePickerProps as ReactAriaDateRangePickerProps,
  Text,
} from 'react-aria-components';

import Button from '@/components/Button';
import dayjs from '@/util/dayjs';
import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

// Helper functions to convert between Date and DateValue
const dateToDateValue = (date: Date): DateValue => {
  const dayjsDate = dayjs(date).tz(dayjs.tz.guess());
  return new CalendarDateTime(
    dayjsDate.year(),
    dayjsDate.month() + 1, // dayjs months are 0-indexed
    dayjsDate.date(),
    dayjsDate.hour(),
    dayjsDate.minute(),
    dayjsDate.second(),
    dayjsDate.millisecond(),
  );
};

const dateValueToDate = (dateValue: DateValue): Date => {
  return dateValue.toDate(dayjs.tz.guess());
};

export interface DateRangePickerProps
  extends Omit<Omit<ReactAriaDateRangePickerProps<DateValue>, 'onChange'>, 'value'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isLoading?: boolean;
  value?: RangeValue<DateValue> | { start: Date | null; end: Date | null } | null;
  onChange?: (value: { start: Date | null; end: Date | null } | null) => void;
}

const toDateValue = (date: Date | null | undefined): DateValue | null => {
  if (!date) return null;
  return dateToDateValue(date);
};

const toRangeDateValue = (value: DateRangePickerProps['value']): RangeValue<DateValue> | null => {
  if (!value) return null;
  const start = (value as any).start;
  const end = (value as any).end;

  const startAsDateValue = start instanceof Date ? toDateValue(start) : (start ?? null);
  const endAsDateValue = end instanceof Date ? toDateValue(end) : (end ?? null);

  return {
    // react-aria accepts nulls for partially selected ranges
    start: startAsDateValue as DateValue | null,
    end: endAsDateValue as DateValue | null,
  } as RangeValue<DateValue>;
};

const DateRangePicker = ({
  label,
  description,
  errorMessage,
  isLoading,
  className,
  onChange,
  value,
  ...props
}: DateRangePickerProps) => {
  const finalClassName = parseClassName('date-range-picker-component', className);

  const handleChange: ReactAriaDateRangePickerProps<DateValue>['onChange'] = (newValue) => {
    if (!newValue) {
      onChange?.(null);
      return;
    }
    const start = newValue.start ? dateValueToDate(newValue.start) : null;
    const end = newValue.end ? dateValueToDate(newValue.end) : null;
    onChange?.({ start, end });
  };

  const rangeValue = value ? toRangeDateValue(value) : null;

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-10" />
      </div>
    </div>
  ) : (
    <ReactAriaDateRangePicker
      className={`form-control ${finalClassName}`}
      {...props}
      onChange={handleChange}
      value={rangeValue}
    >
      {label && <Label>{label}</Label>}
      <Group className="flex join">
        <DateInput className="input join-item border-r-0 w-auto" slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true" className="input join-item px-2 select-none border-x-0 w-auto">
          –
        </span>
        <DateInput className="input join-item border-l-0 w-auto" slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button iconName="calendar" className="btn-primary join-item" />
      </Group>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && (
        // we had to do it like this, FieldError does not work with DatePicker/DateRangePicker
        <span className="react-aria-FieldError" slot="errorMessage">
          {errorMessage}
        </span>
      )}
      <Popover>
        <Dialog>
          <RangeCalendar className="datepicker-calendar">
            <header className="flex items-center gap-1 pb-4">
              <Button iconName="arrowLeft" className="btn-sm btn-ghost" slot="previous" />
              <Heading className="flex-1 text-center font-semibold" />
              <Button iconName="arrowRight" className="btn-sm btn-ghost" slot="next" />
            </header>
            <CalendarGrid className="w-full">
              <CalendarGridHeader>
                {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
              </CalendarGridHeader>
              <CalendarGridBody>{(date) => <CalendarCell date={date} />}</CalendarGridBody>
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </ReactAriaDateRangePicker>
  );
};

export default DateRangePicker;
