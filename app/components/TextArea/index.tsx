import type { TextFieldProps as AriaTextFieldProps, ValidationResult } from 'react-aria-components';
import {
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  FieldError,
  Label,
  Text,
} from 'react-aria-components';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isLoading?: boolean;
  rows?: number;
  placeholder?: string;
}

const TextArea = ({
  label,
  description,
  errorMessage,
  isLoading,
  className,
  rows,
  placeholder,
  ...props
}: TextFieldProps) => {
  // console.log('errorMessage', errorMessage);
  const finalClassName = parseClassName('text-area-component', className);

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-18" />
      </div>
    </div>
  ) : (
    <AriaTextField
      className={`${finalClassName} form-control`}
      {...props}
      isInvalid={!!errorMessage}
    >
      {label && <Label>{label}</Label>}
      <AriaTextArea rows={rows} placeholder={placeholder} />
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </AriaTextField>
  );
};

export default TextArea;
