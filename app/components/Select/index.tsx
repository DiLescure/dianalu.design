import type {
  ListBoxItemProps,
  SelectProps as ReactAriaSelectProps,
  ValidationResult,
} from 'react-aria-components';
import {
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as ReactAriaSelect,
  SelectValue,
  Text,
} from 'react-aria-components';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

import './styles.css';

interface SelectProps<T extends object, M extends 'single' | 'multiple'>
  extends Omit<ReactAriaSelectProps<T, M>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export const Select = <T extends object, M extends 'single' | 'multiple' = 'single'>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T, M>) => {
  return (
    <ReactAriaSelect {...props}>
      <Label>{label}</Label>

      <Button className="select-container join w-full btn-ghost p-0 m-0 !gap-0">
        <SelectValue className="join-item input input-sm">
          {({ selectedItems, defaultChildren, isPlaceholder }) =>
            isPlaceholder || selectedItems.length === 1
              ? defaultChildren
              : `${selectedItems.length} selected items`
          }
        </SelectValue>
        <div className="join-item btn btn-sm btn-primary">
          <Icon name="dropdownArrow" className="w-6" aria-hidden="true" />
        </div>
      </Button>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox className="select-list" items={items}>
          {children}
        </ListBox>
      </Popover>
    </ReactAriaSelect>
  );
};

export const SelectItem = (props: ListBoxItemProps) => {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `select-item ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`
      }
    />
  );
};
