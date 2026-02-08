import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect } from 'react';
import { z } from 'zod';

import Code from '@/components/Code';
import type { ComboBoxItemType } from '@/components/ComboBox';
import { createFormComboBox } from '@/components/Form';
import Heading from '@/components/Heading';
import Link from '@/components/Link';
import type { TaleContent } from '@/components/Taleforge/types';

import ComboBoxTale from './index.tale.mdx';

const formSchema = z.object({
  comboBox: z.string().min(1, 'ComboBox selection is required'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormComboBox: createFormComboBox(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  comboBox: '',
};

interface ComboBoxTaleState {
  label: string;
  selectedKey: string;
  items: ComboBoxItemType[];
  description?: string;
  isLoading: boolean;
  isDisabled: boolean;
}

const tale: TaleContent<ComboBoxTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const form = useAppForm({
      defaultValues: initialFormValues,
      validators: {
        onChange: formSchema,
      },
    });

    const handleSelectionChange = (key: string) => {
      taleOnChange({
        stateKey: 'selectedKey',
        value: key,
      });
    };

    useEffect(() => {
      form.validateAllFields('change');
      form.store.subscribe(({ currentVal }) => {
        handleSelectionChange(currentVal.values?.comboBox || '');
      });
    }, [form]);

    return (
      <>
        <p>
          The ComboBox component is a field that allows the user to select an item from a list of
          options.
        </p>
        <p>We have implemented two versions of the ComboBox component:</p>
        <ul>
          <li>
            <strong>Standalone ComboBox</strong> - This is a standalone component that can be used
            on its own.
          </li>
          <li>
            <strong>Form ComboBox</strong> - This is a decorated version of the standalone ComboBox
            component that is meant to be used in forms created using{' '}
            <Link to="https://tanstack.com/form/latest" external={true}>
              TanStack Form
            </Link>
            .
          </li>
        </ul>
        <p>You can see examples of both versions below.</p>
        <Heading level={2}>Form ComboBox Example</Heading>
        <p>
          If you are using the ComboBox to send data to the server, you should use the Form version
          of the ComboBox.
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
          <li>
            A store implementation that tracks the selected value and the validity of the form
          </li>
          <li>Validation of the selected value</li>
          <li>Visual feedback on the validity of the ComboBox</li>
        </ul>
        <p>
          In the following example, if you select the "-" option, an error message will be
          displayed:
        </p>
        <div className="card bg-base-200 shadow-sm max-w-md">
          <div className="card-body">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <form.AppField name="comboBox">
                {(field) => {
                  return (
                    <field.FormComboBox
                      label={taleState.label}
                      items={taleState.items}
                      description={taleState.description}
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

import type { ComboBoxItemType } from '@/components/ComboBox';

const comboBoxOptions: ComboBoxItemType[] = ${JSON.stringify(taleState.items, null, 2)};

const formSchema = z.object({
  comboBox: z.string().min(1, 'ComboBox selection is required'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormComboBox: createFormComboBox(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues = {
  comboBox: '',
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
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <form.AppField name="comboBox">
        {(field) => {
          return (
            <field.FormComboBox
              label="${taleState.label}"
              items={comboBoxOptions}
              description="${taleState.description}"
              isDisabled={${taleState.isDisabled ? 'true' : 'false'}}
              isLoading={${taleState.isLoading ? 'true' : 'false'}}
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

        <Heading level={2}>Form ComboBox Props</Heading>

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
                  <code>items</code>
                </td>
                <td>
                  <code>ComboBoxItemType[]</code>
                </td>
                <td>✅</td>
                <td>Array of items with id and name properties to display in the ComboBox</td>
              </tr>
              <tr>
                <td>
                  <code>label</code>
                </td>
                <td>
                  <code>string</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>The label text displayed above the ComboBox</td>
              </tr>
              <tr>
                <td>
                  <code>isDisabled</code>
                </td>
                <td>
                  <code>boolean</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Disables the ComboBox when true</td>
              </tr>
              <tr>
                <td>
                  <code>isLoading</code>
                </td>
                <td>
                  <code>boolean</code> | <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Shows loading state when true</td>
              </tr>
              <tr>
                <td>
                  <code>renderItem</code>
                </td>
                <td>
                  <code>(item: ComboBoxItemType) =&gt; React.ReactNode</code> |{' '}
                  <code>undefined</code>
                </td>
                <td>❌</td>
                <td>Custom render function for items. Defaults to displaying item.name</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-600 mt-8 p-4 text-blue-700 dark:text-blue-300">
          <p className="font-medium">Developer Note:</p>
          <p className="text-sm">
            Form ComboBox automatically handles form state, validation, and error display through
            TanStack Form integration. The field name, selected value, and change handlers are
            managed automatically.
          </p>
          <p className="text-sm">
            The <code>ComboBoxItemType</code> interface requires objects with{' '}
            <code>id: string</code> and <code>name: string</code> properties.
          </p>
        </div>

        <br />
        <ComboBoxTale
          label={taleState.label}
          selectedKey={taleState.selectedKey}
          items={taleState.items}
          onSelectionChange={handleSelectionChange}
          description={taleState.description}
          isDisabled={taleState.isDisabled}
          isLoading={taleState.isLoading}
        />
      </>
    );
  },
  defaultValues: {
    label: 'My ComboBox',
    description: 'This is a description for the ComboBox',
    isLoading: false,
    isDisabled: false,
    selectedKey: 'default',
    items: [
      {
        id: '',
        name: '-',
      },
      {
        id: 'item-1',
        name: 'Item 1',
      },
      {
        id: 'item-2',
        name: 'Item 2',
      },
    ],
  },
  schema: z.object({
    label: z.string(),
    selectedKey: z.string().readonly(),
    isLoading: z.boolean(),
    isDisabled: z.boolean(),
    description: z.string(),
    items: z.any(),
  }),
};

export default tale;
