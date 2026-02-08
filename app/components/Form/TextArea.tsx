import TextArea from '@/components/TextArea';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

export const createFormTextArea = (useFieldContext: useFieldContextFn) => {
  return ({ label, description, isDisabled, isLoading }: FormFieldCommonProps) => {
    const field = useFieldContext<string>();

    return (
      <TextArea
        name={field.name}
        label={label}
        description={description}
        value={field.state.value}
        onChange={(value) => field.handleChange(value)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-textarea-component"
      />
    );
  };
};

export default createFormTextArea;
