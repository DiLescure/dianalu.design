import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect } from 'react';
import { z } from 'zod';

import Code from '@/components/Code';
import { createFormTextArea } from '@/components/Form';
import Heading from '@/components/Heading';
import Link from '@/components/Link';
import type { TaleContent } from '@/components/Taleforge/types';

import TextAreaTale from './index.tale.mdx';

const formSchema = z.object({
  textArea: z.string().min(1, 'TextArea input is required'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormTextArea: createFormTextArea(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  textArea: '',
};

interface TextAreaTaleState {
  label: string;
  value: string;
  isLoading: boolean;
  isDisabled: boolean;
  placeholder?: string;
  description?: string;
}

const tale: TaleContent<TextAreaTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const form = useAppForm({
      defaultValues: initialFormValues,
      validators: {
        onChange: formSchema,
      },
    });

    const handleValueChange = (value: string) => {
      taleOnChange({
        stateKey: 'value',
        value: value,
      });
    };

    useEffect(() => {
      form.validateAllFields('change');
      form.store.subscribe(({ currentVal }) => {
        handleValueChange(currentVal.values?.textArea || '');
      });
    }, [form]);

    return (
      <>
        <p>
          The TextArea component is a multi-line text input field that allows the user to enter
          longer text content.
        </p>
        <p>We have implemented two versions of the TextArea component:</p>
        <ul>
          <li>
            <strong>Standalone TextArea</strong> - This is a standalone component that can be used
            on its own.
          </li>
          <li>
            <strong>Form TextArea</strong> - This is a decorated version of the standalone TextArea
            component that is meant to be used in forms created using{' '}
            <Link to="https://tanstack.com/form/latest" external={true}>
              TanStack Form
            </Link>
            .
          </li>
        </ul>
        <p>You can see examples of both versions below.</p>
        <Heading level={2}>Form TextArea Example</Heading>
        <p>
          If you are using the TextArea to send data to the server, you should use the Form version
          of the TextArea.
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
          <li>Visual feedback on the validity of the TextArea</li>
        </ul>
        <p>
          In the following example, if you leave the field empty, an error message will be
          displayed:
        </p>
        <div className="card bg-base-200 shadow-sm max-w-md">
          <div className="card-body">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <form.AppField name="textArea">
                {(field) => {
                  return <field.FormTextArea label={taleState.label} />;
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

import { createFormTextArea } from '@/components/Form';

const formSchema = z.object({
  textArea: z.string().min(1, 'TextArea input is required'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormTextArea: createFormTextArea(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  textArea: '',
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
      <form.AppField name="textArea">
        {(field) => {
          return (
            <field.FormTextArea
              label="${taleState.label}"
              isLoading={${taleState.isLoading ? 'true' : 'false'}}
              isDisabled={${taleState.isDisabled ? 'true' : 'false'}}
              description="${taleState.description}"
            />
          );
        }}
      </form.AppField>
    </form>
  );
}`}
          />
        </details>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 mt-8 p-4 text-blue-700 dark:text-blue-300">
          <p className="font-medium">Developer Note:</p>
          <p className="text-sm">
            You can see a more detailed implementation of a form in the{' '}
            <Link to="/docs/components/actions/modal-form/">Modal (Form) tale</Link>.
          </p>
        </div>

        <Heading level={2}>Form TextArea Props</Heading>

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
                  <code>string</code>
                </td>
                <td>✅</td>
                <td>The label text displayed above the text area field</td>
              </tr>
              <tr>
                <td>
                  <code>isDisabled</code>
                </td>
                <td>
                  <code>boolean</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Disables the text area when true</td>
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
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 mt-8 p-4 text-blue-700 dark:text-blue-300">
          <p className="font-medium">Developer Note:</p>
          <p className="text-sm">
            Form TextArea automatically handles form state, validation, and error display through
            TanStack Form integration. The field name, current value, and change handlers are
            managed automatically.
          </p>
          <p className="text-sm">
            Unlike the standalone version, the form version has a simplified API since most props
            are managed by the form context.
          </p>
        </div>

        <br />
        <TextAreaTale
          label={taleState.label}
          value={taleState.value}
          isLoading={taleState.isLoading}
          isDisabled={taleState.isDisabled}
          placeholder={taleState.placeholder}
          description={taleState.description}
          onChange={handleValueChange}
        />
      </>
    );
  },
  defaultValues: {
    label: 'My TextArea',
    value: '',
    isLoading: false,
    isDisabled: false,
    placeholder: 'Enter your text here...',
    description: 'This is a description for the text area',
  },
  schema: z.object({
    label: z.string(),
    value: z.string(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    placeholder: z.string().optional(),
    description: z.string().optional(),
  }),
};

export default tale;
