import TextField from '@/components/TextField';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

interface FormTextFieldProps extends FormFieldCommonProps {
  placeholder?: string;
}

export const createFormTextField = (useFieldContext: useFieldContextFn) => {
  return ({
    label,
    description,
    isDisabled,
    isLoading,
    onKeyDown,
    placeholder,
  }: FormTextFieldProps) => {
    const field = useFieldContext<string>();

    return (
      <TextField
        name={field.name}
        label={label}
        description={description}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        placeholder={placeholder}
        className="form-text-field-component"
        onKeyDown={onKeyDown}
      />
    );
  };
};

export default createFormTextField;
