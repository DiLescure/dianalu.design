import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from 'react-aria-components';
import ShortUniqueId from 'short-unique-id';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

const suid = new ShortUniqueId();

export type CheckboxGroupOption = {
  value: string;
  label: string;
  className?: string;
};

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  options: CheckboxGroupOption[];
  isLoading?: boolean;
}

const CheckboxGroup = ({
  label,
  description,
  errorMessage,
  options,
  isLoading,
  className,
  ...props
}: CheckboxGroupProps) => {
  const uid = suid.formattedUUID('chk-$r6');

  return isLoading ? (
    <div className="checkbox-group-component w-full pb-4">
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-18" />
      </div>
    </div>
  ) : (
    <AriaCheckboxGroup
      {...props}
      className={parseClassName('checkbox-group-component react-aria-CheckboxGroup', className)}
      isInvalid={!!errorMessage}
    >
      {label && <Label>{label}</Label>}
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      {options.map((option, index) => (
        <AriaCheckbox
          key={`${uid}-${index}`}
          value={option.value}
          className={parseClassName('react-aria-Checkbox', option.className)}
        >
          <div className="checkbox" aria-hidden="true" />
          {option.label}
        </AriaCheckbox>
      ))}
    </AriaCheckboxGroup>
  );
};

export default CheckboxGroup;
