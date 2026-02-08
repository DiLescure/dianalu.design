import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { createFormTextField } from '@/components/Form';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormTextField: createFormTextField(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

interface EmailFormProps {
  onChange: (email: string, isValid: boolean) => void;
  onPressEnter: (email: string) => void;
}

const EmailForm = ({ onChange, onPressEnter }: EmailFormProps) => {
  const form = useAppForm({
    defaultState: {
      values: {
        email: '',
      },
    },
    validators: {
      onChange: formSchema,
    },
  });

  useEffect(() => {
    form.validateAllFields('change');
    form.store.subscribe(({ currentVal }) => {
      if (currentVal.isFieldsValid && !currentVal.isPristine) {
        onChange(currentVal.values?.email || '', currentVal.isFieldsValid);
      } else {
        onChange('', false);
      }
    });
  }, [form]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && onPressEnter && form.state.isFieldsValid && !form.state.isPristine) {
      e.preventDefault();
      onPressEnter(form.getFieldValue('email'));
    }
  };

  return (
    <form>
      <form.AppField name="email">
        {(field) => {
          return <field.FormTextField label="Email address" onKeyDown={handleKeyDown} />;
        }}
      </form.AppField>
    </form>
  );
};

export default EmailForm;
