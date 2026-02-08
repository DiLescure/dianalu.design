import { NotesField } from '@/components/NotesField';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

export const createFormNotesField = (useFieldContext: useFieldContextFn) => {
  return ({ label, description, isDisabled, isLoading }: FormFieldCommonProps) => {
    const field = useFieldContext<string>();

    return (
      <NotesField
        label={label}
        description={description}
        defaultValue={field.state.value}
        onChange={(value) => field.handleChange(value)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        errorMessage={field.getMeta().errors?.[0]?.message}
        className="form-notes-field-component"
      />
    );
  };
};

export default createFormNotesField;
