import type { ComboBoxProps, ListBoxItemProps, ValidationResult } from 'react-aria-components';
import {
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  ComboBox as ReactAriaComboBox,
  Text,
} from 'react-aria-components';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

import './styles.css';

export interface MyComboBoxProps<T extends object> extends Omit<ComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
  isLoading?: boolean;
}

export const ComboBox = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  isLoading,
  ...props
}: MyComboBoxProps<T>) => {
  return isLoading ? (
    <div className="combobox-component w-full pb-4">
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-6" />
      </div>
    </div>
  ) : (
    <ReactAriaComboBox
      className="combobox-component form-control"
      {...props}
      isInvalid={!!errorMessage}
    >
      <Label>{label}</Label>
      <div className="combobox-container join w-full">
        <Input className="join-item input" />
        <Button className="join-item btn btn-primary">
          <Icon name="dropdownArrow" className="w-6" />
        </Button>
      </div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox className="combobox-list">{children}</ListBox>
      </Popover>
    </ReactAriaComboBox>
  );
};

export interface ComboBoxItemType {
  id: string;
  name: string;
}

export const ComboBoxItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `combobox-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`
      }
    />
  );
};

export default ComboBox;
