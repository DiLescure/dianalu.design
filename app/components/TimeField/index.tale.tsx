import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect } from 'react';
import { z } from 'zod';

import Code from '@/components/Code';
import { createFormTimeField } from '@/components/Form';
import Heading from '@/components/Heading';
import type { TaleContent } from '@/components/Taleforge/types';

import TimeFieldTale from './index.tale.mdx';

const formSchema = z.object({
  time: z.object(
    { hour: z.number(), minute: z.number(), second: z.number().optional() },
    { message: 'Time is required' },
  ),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormTimeField: createFormTimeField(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  time: { hour: 23, minute: 42 },
};

interface TimeFieldTaleState {
  label: string;
  value: any;
  isLoading: boolean;
  isDisabled: boolean;
  description?: string;
  hourCycle: 12 | 24;
}

const tale: TaleContent<TimeFieldTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const form = useAppForm({
      defaultValues: initialFormValues,
      validators: { onChange: formSchema },
    });

    const handleValueChange = (value: any) => {
      taleOnChange({ stateKey: 'value', value });
    };

    useEffect(() => {
      form.validateAllFields('change');
      form.store.subscribe(({ currentVal }) => {
        handleValueChange(currentVal.values?.time);
      });
    }, [form]);

    return (
      <>
        <p>
          The TimeField component allows users to enter and edit a time value using segmented
          inputs.
        </p>
        <p>We provide two versions:</p>
        <ul>
          <li>
            <strong>Standalone TimeField</strong> - Use it outside of forms.
          </li>
          <li>
            <strong>Form TimeField</strong> - Decorated for TanStack Form.
          </li>
        </ul>
        <Heading level={2}>Form TimeField Example</Heading>
        <div className="card bg-base-200 shadow-sm max-w-md">
          <div className="card-body">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <form.AppField name="time">
                {(field) => (
                  <field.FormTimeField
                    label={taleState.label}
                    description={taleState.description}
                    isDisabled={taleState.isDisabled}
                    isLoading={taleState.isLoading}
                    hourCycle={taleState.hourCycle}
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

import { createFormTimeField } from '@/components/Form';

const formSchema = z.object({ time: z.any().refine((val) => !!val, 'Time is required') });

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = { FormTimeField: createFormTimeField(useFieldContext) };

const { useAppForm } = createFormHook({ fieldComponents, formComponents: {}, fieldContext, formContext });

const initialFormValues = { time: { hour: 12, minute: 0 } };

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
      <form.AppField name="time">
        {(field) => (
          <field.FormTimeField label="${taleState.label}" isLoading={${taleState.isLoading ? 'true' : 'false'}} isDisabled={${taleState.isDisabled ? 'true' : 'false'}} description="${taleState.description}" hourCycle={${taleState.hourCycle}} />
        )}
      </form.AppField>
    </form>
  );
};`}
          />
        </details>

        <br />
        <TimeFieldTale
          label={taleState.label}
          value={taleState.value}
          isDisabled={taleState.isDisabled}
          isLoading={taleState.isLoading}
          description={taleState.description}
          hourCycle={taleState.hourCycle}
          onChange={handleValueChange}
        />
      </>
    );
  },
  defaultValues: {
    label: 'Event Time',
    value: { hour: 12, minute: 0 },
    isLoading: false,
    isDisabled: false,
    description: 'Select a time for your event',
    hourCycle: 24,
  },
  schema: z.object({
    label: z.string(),
    value: z.any().nullable().readonly(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    description: z.string(),
    hourCycle: z.union([z.literal(12), z.literal(24)]),
  }),
};

export default tale;
