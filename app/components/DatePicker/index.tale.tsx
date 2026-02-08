import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect } from 'react';
import { z } from 'zod';

import Code from '@/components/Code';
import { createFormDatePicker } from '@/components/Form';
import Heading from '@/components/Heading';
import Link from '@/components/Link';
import type { TaleContent } from '@/components/Taleforge/types';

import DatePickerTale from './index.tale.mdx';

const formSchema = z.object({
  datePicker: z
    .date()
    .refine((val) => val !== null, 'Date is required')
    .refine((val) => new Date(val.setHours(0, 0, 0, 0)) > new Date(), 'Date must be in the future'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormDatePicker: createFormDatePicker(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  datePicker: new Date(),
};

interface DatePickerTaleState {
  label: string;
  value: Date;
  isLoading: boolean;
  isDisabled: boolean;
  description?: string;
  granularity: 'day' | 'hour' | 'minute' | 'second';
}

const tale: TaleContent<DatePickerTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const form = useAppForm({
      defaultValues: initialFormValues,
      validators: {
        onChange: formSchema,
      },
    });

    const handleValueChange = (value: Date) => {
      taleOnChange({
        stateKey: 'value',
        value: value,
      });
    };

    useEffect(() => {
      form.validateAllFields('change');
      form.store.subscribe(({ currentVal }) => {
        handleValueChange(currentVal.values?.datePicker);
      });
    }, [form]);

    return (
      <>
        <p>
          The DatePicker component allows users to select dates using either a text input or a
          visual calendar.
        </p>
        <p>We have implemented two versions of the DatePicker component:</p>
        <ul>
          <li>
            <strong>Standalone DatePicker</strong> - This is a standalone component that can be used
            on its own.
          </li>
          <li>
            <strong>Form DatePicker</strong> - This is a decorated version of the standalone
            DatePicker component that is meant to be used in forms created using{' '}
            <Link to="https://tanstack.com/form/latest" external={true}>
              TanStack Form
            </Link>
            .
          </li>
        </ul>
        <p>You can see examples of both versions below.</p>
        <Heading level={2}>Form DatePicker Example</Heading>
        <p>
          If you are using the DatePicker to send data to the server, you should use the Form
          version of the DatePicker.
        </p>
        <p>
          Using{' '}
          <Link to="https://tanstack.com/form/latest" external={true}>
            TanStack Form
          </Link>{' '}
          and{' '}
          <Link to="https://zod.dev/" external={true}>
            Zod
          </Link>{' '}
          in the way shown below, gives us the following features out of the box:
        </p>
        <ul>
          <li>A store implementation that tracks the input value and the validity of the form</li>
          <li>Validation of the input value</li>
          <li>Visual feedback on the validity of the DatePicker</li>
        </ul>
        <p>
          In the following example, if you leave the field empty, an error message will be
          displayed:
        </p>
        <div className="card bg-base-200 shadow-sm max-w-md">
          <div className="card-body">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <form.AppField name="datePicker">
                {(field) => {
                  return (
                    <field.FormDatePicker
                      label={taleState.label}
                      description={taleState.description}
                      granularity={taleState.granularity}
                      isDisabled={taleState.isDisabled}
                      isLoading={taleState.isLoading}
                    />
                  );
                }}
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

import { createFormDatePicker } from '@/components/Form';

const formSchema = z.object({
  datePicker: z.any().refine((val) => val !== null, 'Date is required'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormDatePicker: createFormDatePicker(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  datePicker: null,
};

const MyForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);

  const form = useAppForm({
    defaultValues: initialFormValues,
    validators: {
      onChange: formSchema,
    },
  });

  // This validates if the form can be submitted and updates the form state accordingly
  useEffect(() => {
    form.validateAllFields('change');
    form.store.subscribe(({ currentVal }) => {
      setCanSubmit(currentVal.isFieldsValid && !currentVal.isPristine);
    });
  }, [form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      if (!form.store?.state?.values) {
        throw new Error('Form values are not set');
      }

      // TODO: Implement form submission logic here
      console.log('Form submitted', form.store.state.values);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <form.AppField name="datePicker">
        {(field) => {
          return (
            <field.FormDatePicker
              label="${taleState.label}"
              isLoading={${taleState.isLoading ? 'true' : 'false'}}
              isDisabled={${taleState.isDisabled ? 'true' : 'false'}}
              description="${taleState.description}"
              granularity="${taleState.granularity}"
            />
          );
        }}
      </form.AppField>
    </form>
  );
};`}
          />
        </details>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 mt-8 p-4 text-blue-700 dark:text-blue-300">
          <p className="font-medium">Developer Note:</p>
          <p className="text-sm">
            You can see a more detailed implementation of a form in the{' '}
            <Link to="/docs/components/actions/modal-form/">Modal (Form) tale</Link>.
          </p>
        </div>

        <Heading level={2}>Form DatePicker Props</Heading>

        <div className="table-container">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>label</code>
                </td>
                <td>
                  <code>string</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>The label text displayed above the date picker</td>
              </tr>
              <tr>
                <td>
                  <code>description</code>
                </td>
                <td>
                  <code>string</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Optional description text displayed below the date picker</td>
              </tr>
              <tr>
                <td>
                  <code>isLoading</code>
                </td>
                <td>
                  <code>boolean</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Shows skeleton loading state when true</td>
              </tr>
              <tr>
                <td>
                  <code>isDisabled</code>
                </td>
                <td>
                  <code>boolean</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Disables the date picker when true</td>
              </tr>
              <tr>
                <td>
                  <code>granularity</code>
                </td>
                <td>
                  <code>'day'</code> | <code>'hour'</code> | <code>'minute'</code> |{' '}
                  <code>'second'</code>
                </td>
                <td>❌</td>
                <td>Controls the precision of the date picker</td>
              </tr>
              <tr>
                <td>
                  <code>minValue</code>
                </td>
                <td>
                  <code>DateValue</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>The minimum allowed date</td>
              </tr>
              <tr>
                <td>
                  <code>maxValue</code>
                </td>
                <td>
                  <code>DateValue</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>The maximum allowed date</td>
              </tr>
              <tr>
                <td>
                  <code>isDateUnavailable</code>
                </td>
                <td>
                  <code>(date: DateValue) =&gt; boolean</code>
                </td>
                <td>❌</td>
                <td>Function to determine if a date should be unavailable for selection</td>
              </tr>
              <tr>
                <td>
                  <code>placeholderValue</code>
                </td>
                <td>
                  <code>DateValue</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>A placeholder date that controls the format when no value is selected</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 mt-8 p-4 text-blue-700 dark:text-blue-300">
          <p className="font-medium">Developer Note:</p>
          <p className="text-sm">
            Form DatePicker automatically handles form state, validation, and error display through
            TanStack Form integration. The field name, current value, and change handlers are
            managed automatically.
          </p>
          <p className="text-sm">
            Unlike the standalone version, the form version has a simplified API since most props
            are managed by the form context.
          </p>
        </div>

        <br />
        <DatePickerTale
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
    label: 'Event Date',
    value: new Date(),
    isLoading: false,
    isDisabled: false,
    description: 'Select a date for your event',
    granularity: 'second',
  },
  schema: z.object({
    label: z.string(),
    value: z.date().nullable().readonly(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    description: z.string(),
    granularity: z.enum(['day', 'hour', 'minute', 'second']),
  }),
};

export default tale;
