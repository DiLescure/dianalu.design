import type { DateValue } from '@internationalized/date';
import { CalendarDateTime } from '@internationalized/date';
import {
  Calendar,
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
  DatePicker as ReactAriaDatePicker,
  type DatePickerProps as ReactAriaDatePickerProps,
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

export interface DatePickerProps
  extends Omit<Omit<ReactAriaDatePickerProps<DateValue>, 'onChange'>, 'value'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  isLoading?: boolean;
  value?: DateValue | Date | null;
  onChange?: (value: Date | null) => void;
}

const DatePicker = ({
  label,
  description,
  errorMessage,
  isLoading,
  className,
  onChange,
  value,
  ...props
}: DatePickerProps) => {
  const finalClassName = parseClassName('date-picker-component', className);

  const handleChange: ReactAriaDatePickerProps<DateValue>['onChange'] = (value) => {
    onChange?.(value ? dateValueToDate(value) : null);
  };

  const dateValue = value ? (value instanceof Date ? dateToDateValue(value) : value) : null;

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-10" />
      </div>
    </div>
  ) : (
    <ReactAriaDatePicker
      className={`form-control ${finalClassName}`}
      {...props}
      onChange={handleChange}
      value={dateValue}
    >
      {label && <Label>{label}</Label>}
      <Group className="flex join">
        <DateInput className="input flex-1 join-item">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button iconName="calendar" className="btn-primary join-item" />
      </Group>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && ( // we had to do it like this, FieldError does not work with DatePicker
        <span className="react-aria-FieldError" slot="errorMessage">
          {errorMessage}
        </span>
      )}
      <Popover>
        <Dialog>
          <Calendar className="datepicker-calendar">
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
          </Calendar>
        </Dialog>
      </Popover>
    </ReactAriaDatePicker>
  );
};

export default DatePicker;
