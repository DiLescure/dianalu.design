import CheckboxGroup, { type CheckboxGroupOption } from '@/components/CheckboxGroup';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

interface FormCheckboxGroupProps {
  options: CheckboxGroupOption[];
}

export const createFormCheckboxGroup = (useFieldContext: useFieldContextFn) => {
  return ({
    label,
    description,
    isDisabled,
    isLoading,
    options,
  }: FormFieldCommonProps & FormCheckboxGroupProps) => {
    const field = useFieldContext<string[]>();

    return (
      <CheckboxGroup
        name={field.name}
        label={label}
        description={description}
        options={options}
        value={field.state.value}
        onChange={(values: string[]) => field.handleChange(values)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-checkbox-group-component"
      />
    );
  };
};

export default createFormCheckboxGroup;
