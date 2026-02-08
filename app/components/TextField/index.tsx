import type { TextFieldProps as AriaTextFieldProps, ValidationResult } from 'react-aria-components';
import { TextField as AriaTextField, FieldError, Input, Label, Text } from 'react-aria-components';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isLoading?: boolean;
  placeholder?: string;
}

const TextField = ({
  label,
  description,
  errorMessage,
  isLoading,
  className,
  ...props
}: TextFieldProps) => {
  // console.log('errorMessage', errorMessage);
  const finalClassName = parseClassName('text-field-component', className);

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-6" />
      </div>
    </div>
  ) : (
    <AriaTextField
      className={`form-control ${finalClassName}`}
      {...props}
      isInvalid={!!errorMessage}
    >
      {label && <Label>{label}</Label>}
      <Input className="input" />
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </AriaTextField>
  );
};

export default TextField;
