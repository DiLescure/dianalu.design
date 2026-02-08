import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { createFormTextField } from '@/components/Form';
import TextField from '@/components/TextField';

const formSchema = z.object({
  code: z.string().min(6, 'Code must be 6 characters'),
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

interface CodeFormProps {
  onChange: (code: string, isValid: boolean) => void;
  onPressEnter: (code: string) => void;
}

const CodeForm = ({ onChange, onPressEnter }: CodeFormProps) => {
  const form = useAppForm({
    defaultState: {
      values: {
        code: '',
      },
    },
    validators: {
      onChange: formSchema,
    },
  });

  // Create refs for each text field
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
  // State to track individual field values
  const [fieldValues, setFieldValues] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    form.validateAllFields('change');
    form.store.subscribe(({ currentVal }) => {
      if (currentVal.isFieldsValid && !currentVal.isPristine) {
        onChange(currentVal.values?.code || '', currentVal.isFieldsValid);
      } else {
        onChange('', false);
      }
    });
  }, [form]);

  const handleCodeChange = (code: string) => {
    form.setFieldValue('code', code);
    form.validateField('code', 'change');
  };

  const handleFieldChange = (index: number, value: string) => {
    // Only take the last character if multiple are entered
    const newValue = value.slice(-1);

    // Update local field values state
    const newFieldValues = [...fieldValues];
    newFieldValues[index] = newValue;
    setFieldValues(newFieldValues);

    // Update form field with combined code
    const newCode = newFieldValues.join('');
    handleCodeChange(newCode);

    // Move focus to next field if there's a value and it's not the last field
    if (newValue && index < 5) {
      setTimeout(() => {
        const nextField = fieldRefs.current[index + 1];
        const input = nextField?.querySelector('input');
        input?.focus();
      }, 0);
    }
  };

  const handlePaste = (e: React.ClipboardEvent, _targetIndex: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const first6Chars = pastedText.slice(0, 6);

    // Update field values with pasted characters
    const newFieldValues = ['', '', '', '', '', ''];
    for (let i = 0; i < 6; i++) {
      newFieldValues[i] = first6Chars[i] || '';
    }
    setFieldValues(newFieldValues);

    // Update the form field value
    handleCodeChange(first6Chars);

    // Focus the next empty field or the last field
    const nextFocusIndex = Math.min(first6Chars.length, 5);
    setTimeout(() => {
      const nextField = fieldRefs.current[nextFocusIndex];
      const input = nextField?.querySelector('input');
      input?.focus();
    }, 0);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous field
    if (e.key === 'Backspace' && !fieldValues[index] && index > 0) {
      setTimeout(() => {
        const prevField = fieldRefs.current[index - 1];
        const input = prevField?.querySelector('input');
        input?.focus();
      }, 0);
    }

    // Handle Enter key press
    if (e.key === 'Enter' && onPressEnter && form.state.isFieldsValid && !form.state.isPristine) {
      e.preventDefault();
      onPressEnter(form.getFieldValue('code'));
    }
  };

  return (
    <form className="code-form">
      <div className="flex justify-between w-[80%] mx-auto gap-4">
        <div
          className="w-[16%]"
          ref={(el) => {
            fieldRefs.current[0] = el;
          }}
        >
          <TextField
            value={fieldValues[0]}
            onChange={(value) => handleFieldChange(0, value)}
            onPaste={(e) => handlePaste(e, 0)}
            onKeyDown={(e) => handleKeyDown(0, e)}
            maxLength={1}
          />
        </div>
        <div
          className="w-[16%]"
          ref={(el) => {
            fieldRefs.current[1] = el;
          }}
        >
          <TextField
            value={fieldValues[1]}
            onChange={(value) => handleFieldChange(1, value)}
            onPaste={(e) => handlePaste(e, 1)}
            onKeyDown={(e) => handleKeyDown(1, e)}
            maxLength={1}
          />
        </div>
        <div
          className="w-[16%]"
          ref={(el) => {
            fieldRefs.current[2] = el;
          }}
        >
          <TextField
            value={fieldValues[2]}
            onChange={(value) => handleFieldChange(2, value)}
            onPaste={(e) => handlePaste(e, 2)}
            onKeyDown={(e) => handleKeyDown(2, e)}
            maxLength={1}
          />
        </div>
        <div
          className="w-[16%]"
          ref={(el) => {
            fieldRefs.current[3] = el;
          }}
        >
          <TextField
            value={fieldValues[3]}
            onChange={(value) => handleFieldChange(3, value)}
            onPaste={(e) => handlePaste(e, 3)}
            onKeyDown={(e) => handleKeyDown(3, e)}
            maxLength={1}
          />
        </div>
        <div
          className="w-[16%]"
          ref={(el) => {
            fieldRefs.current[4] = el;
          }}
        >
          <TextField
            value={fieldValues[4]}
            onChange={(value) => handleFieldChange(4, value)}
            onPaste={(e) => handlePaste(e, 4)}
            onKeyDown={(e) => handleKeyDown(4, e)}
            maxLength={1}
          />
        </div>
        <div
          className="w-[16%]"
          ref={(el) => {
            fieldRefs.current[5] = el;
          }}
        >
          <TextField
            value={fieldValues[5]}
            onChange={(value) => handleFieldChange(5, value)}
            onPaste={(e) => handlePaste(e, 5)}
            onKeyDown={(e) => handleKeyDown(5, e)}
            maxLength={1}
          />
        </div>
      </div>
      <div className="hidden-form-field">
        <form.AppField name="code">
          {(field) => {
            return <field.FormTextField label="Code" />;
          }}
        </form.AppField>
      </div>
    </form>
  );
};

export default CodeForm;
