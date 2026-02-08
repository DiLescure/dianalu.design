import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { z } from 'zod';
import Code from '@/components/Code';
import { createFormDateRangePicker } from '@/components/Form';
import Heading from '@/components/Heading';
import Link from '@/components/Link';
import type { TaleContent } from '@/components/Taleforge/types';
import { endOfDate, startOfDate } from '@/util/date-helpers';

import DateRangePickerTale from './index.tale.mdx';

const rangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

const formSchema = z.object({
  dateRange: rangeSchema.refine(
    (val) => (val.start && val.end ? val.start <= val.end : true),
    'Start date must be before end date',
  ),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormDateRangePicker: createFormDateRangePicker(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const localTimeZone = dayjs.tz.guess();
const todayDate = dayjs().tz(localTimeZone);
const startOfToday = startOfDate(todayDate.toDate(), localTimeZone);
const endOfTomorrow = endOfDate(todayDate.add(1, 'day').toDate(), localTimeZone);

const initialFormValues = {
  dateRange: {
    start: startOfToday,
    end: endOfTomorrow,
  },
};

interface DateRangePickerTaleState {
  label: string;
  value: { start: Date | null; end: Date | null };
  isLoading: boolean;
  isDisabled: boolean;
  description?: string;
  granularity: 'day' | 'hour' | 'minute' | 'second';
}

const tale: TaleContent<DateRangePickerTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const form = useAppForm({
      defaultValues: initialFormValues,
      validators: {
        onChange: formSchema,
      },
    });

    const handleValueChange = (value: { start: Date | null; end: Date | null }) => {
      taleOnChange({
        stateKey: 'value',
        value,
      });
    };

    useEffect(() => {
      form.validateAllFields('change');
      form.store.subscribe(({ currentVal }) => {
        handleValueChange(currentVal.values?.dateRange);
      });
    }, [form]);

    return (
      <>
        <p>
          The DateRangePicker component allows users to select a start and end date using inputs or
          a visual calendar.
        </p>
        <p>We provide two versions of the DateRangePicker component:</p>
        <ul>
          <li>
            <strong>Standalone DateRangePicker</strong> - Use it outside of forms.
          </li>
          <li>
            <strong>Form DateRangePicker</strong> - A decorated version for forms built with{' '}
            <Link to="https://tanstack.com/form/latest" external={true}>
              TanStack Form
            </Link>
            .
          </li>
        </ul>
        <Heading level={2}>Form DateRangePicker Example</Heading>
        <p>Use the form version when sending data to the server.</p>
        <div className="card bg-base-200 shadow-sm max-w-md">
          <div className="card-body">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <form.AppField name="dateRange">
                {(field) => (
                  <field.FormDateRangePicker
                    label={taleState.label}
                    description={taleState.description}
                    granularity={taleState.granularity}
                    isDisabled={taleState.isDisabled}
                    isLoading={taleState.isLoading}
                  />
                )}
              </form.AppField>
            </form>
          </div>
        </div>
        <details open>
          <summary>Source Code</summary>
          <Code
            readOnly={true}
            language="tsx"
            value={`import { useEffect, useState } from 'react';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { z } from 'zod';
import dayjs from 'dayjs';
import { endOfDate, startOfDate } from '@/util/date-helpers';

import { createFormDateRangePicker } from '@/components/Form';

const rangeSchema = z.object({ start: z.date(), end: z.date() });
const formSchema = z.object({
  dateRange: rangeSchema
    .refine((val) => (val.start && val.end ? val.start <= val.end : true), 'Start date must be before end date'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormDateRangePicker: createFormDateRangePicker(useFieldContext),
};

const { useAppForm } = createFormHook({ fieldComponents, formComponents: {}, fieldContext, formContext });

const localTimeZone = dayjs.tz.guess();
const todayDate = dayjs().tz(localTimeZone);
const startOfToday = startOfDate(todayDate.toDate(), localTimeZone);
const endOfTomorrow = endOfDate(todayDate.add(1, 'day').toDate(), localTimeZone);

const initialFormValues = {
  dateRange: {
    start: startOfToday,
    end: endOfTomorrow,
  },
};

const MyForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);

  const form = useAppForm({ defaultValues: initialFormValues, validators: { onChange: formSchema } });

  useEffect(() => {
    form.validateAllFields('change');
    form.store.subscribe(({ currentVal }) => {
      setCanSubmit(currentVal.isFieldsValid && !currentVal.isPristine);
    });
  }, [form]);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <form.AppField name="dateRange">
        {(field) => (
          <field.FormDateRangePicker label="${taleState.label}" isLoading={${taleState.isLoading ? 'true' : 'false'}} isDisabled={${taleState.isDisabled ? 'true' : 'false'}} description="${taleState.description}" granularity="${taleState.granularity}" />
        )}
      </form.AppField>
    </form>
  );
};`}
          />
        </details>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 mt-8 p-4 text-blue-700 dark:text-blue-300">
          <p className="font-medium">Developer Note:</p>
          <p className="text-sm">
            Form DateRangePicker integrates TanStack Form for state, validation, and error display.
          </p>
        </div>

        <br />
        <DateRangePickerTale
          label={taleState.label}
          value={taleState.value}
          isDisabled={taleState.isDisabled}
          isLoading={taleState.isLoading}
          description={taleState.description}
          granularity={taleState.granularity}
          onChange={handleValueChange}
        />
      </>
    );
  },
  defaultValues: {
    label: 'Event Date Range',
    value: { start: new Date(), end: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    isLoading: false,
    isDisabled: false,
    description: 'Select a date range for your event',
    granularity: 'day',
  },
  schema: z.object({
    label: z.string(),
    value: z.object({ start: z.date().nullable(), end: z.date().nullable() }).nullable().readonly(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    description: z.string(),
    granularity: z.enum(['day', 'hour', 'minute', 'second']),
  }),
};

export default tale;
