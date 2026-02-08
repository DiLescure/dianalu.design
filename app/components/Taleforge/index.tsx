import { type AnyFieldApi, createFormHook, createFormHookContexts } from '@tanstack/react-form';
import type { ViewUpdate } from '@uiw/react-codemirror';
import { type JSX, useCallback, useEffect, useMemo, useState } from 'react';
import type { ZodObject, ZodType, z } from 'zod';

import Code from '@/components/Code';
import Heading from '@/components/Heading';
import { generateTableOfContents } from '@/components/Heading/generate-table-of-contents';
import { safeJsonObject } from '@/util/safe-json';

import type { Tale, TaleContent, TaleOnChangeFn } from './types';

import './styles.css';

type TaleFieldComponentProps = {
  field: AnyFieldApi;
  schema: TaleContent['schema'];
  label?: string;
  defaultValue?: any;
};

const FieldErrorMessage = ({ field }: { field: AnyFieldApi }) => {
  const errorMessage = field.getMeta().errors?.[0];
  if (!errorMessage) return null;

  // Handle different types of error messages safely
  let displayMessage = '';
  if (typeof errorMessage === 'string') {
    displayMessage = errorMessage;
  } else if (errorMessage && typeof errorMessage === 'object') {
    // For Zod errors, extract the message
    displayMessage = 'Invalid value';

    // Try to extract message from Zod error object if available
    if ('message' in errorMessage && typeof errorMessage.message === 'string') {
      displayMessage = errorMessage.message;
    }
  }

  return <div className="text-error text-sm mt-1">{displayMessage}</div>;
};

const TaleStringFieldComponent = ({ field, label }: TaleFieldComponentProps) => {
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <input
        id={field.name}
        type="text"
        className="input input-bordered w-full"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldErrorMessage field={field} />
    </div>
  );
};

const TaleNumberFieldComponent = ({ field, label }: TaleFieldComponentProps) => {
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <input
        id={field.name}
        type="number"
        className="input input-bordered w-full"
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        onBlur={field.handleBlur}
      />
      <FieldErrorMessage field={field} />
    </div>
  );
};

const TaleBigIntFieldComponent = ({ field, label }: TaleFieldComponentProps) => {
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <input
        id={field.name}
        type="text"
        className="input input-bordered w-full"
        value={field.state.value.toString()}
        onChange={(e) => {
          try {
            const value = BigInt(e.target.value);
            field.handleChange(value);
          } catch (_err) {
            // Handle invalid BigInt input
          }
        }}
        onBlur={field.handleBlur}
      />
      <FieldErrorMessage field={field} />
    </div>
  );
};

const TaleBooleanFieldComponent = ({ field, label }: TaleFieldComponentProps) => {
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  return (
    <div className="form-control mb-4">
      <label className="label cursor-pointer flex">
        <input
          id={field.name}
          type="checkbox"
          className="checkbox"
          checked={!!field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
          onBlur={field.handleBlur}
        />
        <span className="label-text ml-2">{displayLabel}</span>
      </label>
      <FieldErrorMessage field={field} />
    </div>
  );
};

const TaleDateFieldComponent = ({ field, label }: TaleFieldComponentProps) => {
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  // Format date as YYYY-MM-DD for input
  const formatDateForInput = (date: Date) => {
    return date ? date.toISOString().split('T')[0] : undefined;
  };

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <input
        id={field.name}
        type="date"
        className="input input-bordered w-full"
        value={formatDateForInput(field.state.value)}
        onChange={(e) => {
          const date = new Date(e.target.value);
          if (Number.isNaN(date.getTime())) {
            field.handleChange(null);
          } else {
            field.handleChange(date);
          }
        }}
        onBlur={field.handleBlur}
      />
      <FieldErrorMessage field={field} />
    </div>
  );
};

const TaleEnumFieldComponent = ({ field, label, schema }: TaleFieldComponentProps) => {
  const fieldName = field.name;
  const displayLabel = label || fieldName;

  // Extract enum values from the validator schema if it's a Zod enum
  const getEnumValues = (): string[] => {
    try {
      // Safe type checking for ZodObject with shape
      if ('shape' in schema) {
        // Now safely access the field schema
        const shape = schema.shape;
        if (shape && typeof shape === 'object' && fieldName in shape) {
          const fieldSchema = shape[fieldName];

          // Check if it's a ZodEnum with values
          if (fieldSchema.def && fieldSchema.def.type === 'enum' && fieldSchema.def.entries) {
            return Object.values(fieldSchema.def.entries) as string[];
          }
        }
      }

      return [];
    } catch (err) {
      console.error('Error extracting enum values:', err);
      return [];
    }
  };

  const enumValues = getEnumValues();

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <select
        id={field.name}
        className="select select-bordered w-full"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        {enumValues.length === 0 ? (
          <option value="" disabled>
            No options available
          </option>
        ) : (
          enumValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))
        )}
      </select>
      <FieldErrorMessage field={field} />
    </div>
  );
};

// First implement other type components, this is complex and we will wait for a decision on the code text field component
const TaleAnyFieldComponent = ({ field, label, defaultValue }: TaleFieldComponentProps) => {
  const value = JSON.stringify(field.state.value, null, 2);
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  const onChange = (value: string, _viewUpdate: ViewUpdate) => {
    const newValue = safeJsonObject(value, defaultValue);
    // console.log('onChange.value', typeof value, value);
    // console.log('onChange.viewUpdate', typeof viewUpdate, viewUpdate);
    // console.log('onChange.newValue', typeof newValue, newValue);
    if (newValue || newValue !== null || /[\s\r\n\t]*null[\s\r\n\t]*/.test(value)) {
      field.handleChange(newValue);
    }
  };

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
        <Code value={value} height="200px" language="tsx" onChange={onChange} />
      </label>
      <FieldErrorMessage field={field} />
    </div>
  );
};
const TaleUnknownFieldComponent = TaleAnyFieldComponent;

const TaleReadOnlyFieldComponent = ({ field, label }: TaleFieldComponentProps) => {
  const fieldName = field.name.split('.').pop() || field.name;
  const displayLabel = label || fieldName;

  return (
    <div className="form-control w-full mb-4">
      <label className="label" htmlFor={field.name}>
        <span className="label-text">{displayLabel}</span>
      </label>
      <textarea
        id={field.name}
        className="input w-full"
        value={JSON.stringify(field.state.value, null, 2) || ''}
        readOnly={true}
        disabled={true}
      />
    </div>
  );
};

const { fieldContext, formContext } = createFormHookContexts();

const fieldComponents = {
  TaleStringFieldComponent,
  TaleNumberFieldComponent,
  TaleBigIntFieldComponent,
  TaleBooleanFieldComponent,
  TaleDateFieldComponent,
  TaleEnumFieldComponent,
  TaleAnyFieldComponent,
  TaleUnknownFieldComponent,
  TaleReadOnlyFieldComponent,
};

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

type TaleControlsProps<TaleState extends Record<string, any>> = {
  taleState: TaleState;
  schema: TaleContent['schema'];
  onChange: (value: any) => void;
  defaultValues: Partial<TaleState>;
  form: ReturnType<typeof useAppForm>;
};

type TaleControls = <TaleState extends Record<string, any> = any>(
  props: TaleControlsProps<TaleState>,
) => JSX.Element;

const TaleControls: TaleControls = <TaleState extends Record<string, any>>({
  taleState,
  schema,
  onChange,
  form,
  defaultValues,
}: TaleControlsProps<TaleState>) => {
  // Helper function to determine the field component type
  const getFieldComponentName = (key: string, value: any): keyof typeof fieldComponents | null => {
    const fieldSchema = schema.shape[key];

    // console.log('getFieldComponentName.fieldSchema', fieldSchema);

    // console.log('fieldSchema!', fieldSchema);

    if (fieldSchema.type === 'readonly') {
      return 'TaleReadOnlyFieldComponent';
    }

    // console.log(schema);
    // Handle special case for enum types first
    if (typeof value === 'string' && schema) {
      // Use type guard to check if this is a ZodObject schema
      const isZodObject = (s: ZodType): s is ZodObject<any> =>
        s && (s.type === 'object' || 'shape' in s);

      if (isZodObject(schema)) {
        const fieldSchema = schema.shape[key];
        // Check if the field schema is a ZodEnum
        if (fieldSchema.type === 'enum') {
          return 'TaleEnumFieldComponent';
        }
      }
    }

    if (schema?.shape?.[key]) {
      if (fieldSchema.type === 'any' || fieldSchema.type === 'unknown') {
        return 'TaleAnyFieldComponent';
      }
    }
    // Handle standard primitive types
    if (typeof value === 'string') {
      return 'TaleStringFieldComponent';
    }
    if (typeof value === 'number') {
      value;
      return 'TaleNumberFieldComponent';
    }
    if (typeof value === 'bigint') {
      return 'TaleBigIntFieldComponent';
    }
    if (typeof value === 'boolean') {
      return 'TaleBooleanFieldComponent';
    }
    if (value instanceof Date) {
      return 'TaleDateFieldComponent';
    }
    if (value === null) {
      if (fieldSchema.type === 'date') {
        return 'TaleDateFieldComponent';
      }
    }

    // No matching field component
    return null;
  };

  const taleStateEntries = Object.entries(taleState);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {taleStateEntries.length > 0
        ? taleStateEntries.map(([key, value]) => {
            const fieldComponentName = getFieldComponentName(key, value);

            if (!fieldComponentName) {
              console.log(
                `No field component found for field "${key}" with type "${typeof value}"`,
              );
              return null;
            }

            return (
              <form.AppField
                // @ts-ignore - We know these field names are valid for our form
                name={key}
                key={key}
                listeners={{
                  onChange,
                }}
                children={(field) => {
                  // Cast the dynamic field component with the correct type
                  const DynamicField = field[
                    fieldComponentName
                  ] as React.ComponentType<TaleFieldComponentProps>;

                  if (key === 'bigintExample') {
                    // console.log('bigintExample', field.getMeta());
                  }

                  // Avoid unnecessary rerenders by memoizing field parameters
                  return (
                    <DynamicField
                      field={field}
                      label={key}
                      schema={schema}
                      defaultValue={defaultValues[key]}
                    />
                  );
                }}
              />
            );
          })
        : null}
    </form>
  );
};

const taleInitialStateFromSchema =
  <T extends ZodType<any>>(model: T) =>
  (input: z.input<T>): z.output<T> => {
    return model.parse(input);
  };

const Taleforge: Tale = ({
  title,
  slug,
  taleComponent: TaleContent,
  defaultValues,
  schema,
  disableTableOfContents,
}) => {
  const [taleStates, setTaleStates] = useState<Record<string, any>>({});

  const updateTaleState = (taleKey: string, newState: any) => {
    setTaleStates((prev) => ({
      ...prev,
      [taleKey]: newState,
    }));
  };

  // Generate a unique key for this tale in the global state
  const taleStateKey = useMemo(() => `tale_${slug || 'unnamed'}`, [slug]);

  // Parse and validate initial state once
  const initialState = taleInitialStateFromSchema(schema)(defaultValues as any) as Record<
    string,
    any
  >;

  // Get the current tale state from virtual page state
  const taleState = (taleStates?.[taleStateKey] || initialState) as Record<string, any>;

  // Function to update tale state in virtual page state
  const updateTaleStateInComponent = (
    updater: Partial<Record<string, any>> | ((state: Record<string, any>) => Record<string, any>),
  ) => {
    const newState =
      typeof updater === 'function' ? updater(taleState) : { ...taleState, ...updater };

    // Validate the new state with schema
    try {
      schema.parse(newState);

      // Update virtual page state
      updateTaleState(taleStateKey, newState);
    } catch (error) {
      console.error('Schema validation failed for tale state update:', error);
    }
  };

  // Create form with validated state
  const form = useAppForm({
    defaultValues: taleState,
    validators: {
      // @ts-ignore
      onChange: schema,
    },
  });

  // useEffect(() => {
  //   return form.store.subscribe(() => {
  //     console.log('form.store.state.values', form);
  //   });
  // }, [form.store]);

  const handleChange: TaleOnChangeFn = (options) => {
    // @ts-ignore
    const { value, fieldApi, stateKey } = options;
    const key = (fieldApi?.name || stateKey) as string;

    try {
      // Create a properly typed update object
      const update = { [key]: value } as unknown as Partial<Record<string, any>>;
      // console.log('update', update);
      updateTaleStateInComponent(update);

      if (stateKey) {
        form.setFieldValue(key as any, value);
      }
    } catch (_) {
      console.warn('Schema unhappy. No change.', fieldApi.getMeta().errors);
    }
  };

  // Initialize the state if it doesn't exist in virtual page state
  useEffect(() => {
    if (!taleStates || !taleStates[taleStateKey]) {
      updateTaleState(taleStateKey, initialState);
    }
  }, [taleStateKey, initialState, updateTaleState]);

  const taleStateEntries = Object.entries(taleState);

  const tableOfContents = useCallback((node: HTMLDivElement) => {
    // console.log('useEffect', node);
    if (node && !disableTableOfContents) {
      node.innerHTML = generateTableOfContents();
    }
  }, []);

  return taleStates?.[taleStateKey] ? (
    <div className="taleforge-tale">
      <div className="taleforge-tale-content">
        <div className="content prose prose-lg max-w-6xl">
          <div id="tableOfContents" ref={tableOfContents} />
          <Heading level={1}>{title}</Heading>
          <TaleContent taleOnChange={handleChange} taleState={taleState} />
        </div>
      </div>
      {taleStateEntries.length > 0 && (
        <div className="taleforge-tale-controls-container collapse">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Tale Controls</div>
          <div className="collapse-content">
            <div className="taleforge-tale-controls">
              <TaleControls
                taleState={taleState}
                schema={schema}
                onChange={handleChange}
                defaultValues={defaultValues}
                // @ts-ignore - We need to pass the form instance despite TS incompatibility
                form={form}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="taleforge-tale">
      <div className="taleforge-tale-content">
        <div className="content prose prose-lg max-w-6xl">
          <Heading level={1}>{title}</Heading>
          {/* Render tale content even when state service is not available (server-side) */}
          <TaleContent taleOnChange={handleChange} taleState={taleState} />
        </div>
      </div>
      <div className="taleforge-tale-controls-container collapse">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">Controls</div>
        <div className="collapse-content">
          <div className="taleforge-tale-controls">
            {taleStateEntries.length > 0 ? (
              <TaleControls
                taleState={taleState}
                schema={schema}
                onChange={handleChange}
                defaultValues={defaultValues}
                // @ts-ignore - We need to pass the form instance despite TS incompatibility
                form={form}
              />
            ) : (
              <p>No tale state found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taleforge;
