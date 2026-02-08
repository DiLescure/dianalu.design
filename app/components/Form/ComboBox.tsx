import ComboBox, { ComboBoxItem, type ComboBoxItemType } from '@/components/ComboBox';

import type { FormFieldCommonProps, useFieldContextFn } from './types';

interface FormComboBoxProps extends FormFieldCommonProps {
  items: ComboBoxItemType[];
  renderItem?: (item: ComboBoxItemType) => React.ReactNode;
}

export const createFormComboBox = (useFieldContext: useFieldContextFn) => {
  return ({ label, description, isDisabled, isLoading, items, renderItem }: FormComboBoxProps) => {
    const field = useFieldContext<string>();

    return (
      <ComboBox
        name={field.name}
        label={label}
        description={description}
        selectedKey={field.state.value}
        onSelectionChange={(key) => key !== null && field.handleChange(key as string)}
        isDisabled={isDisabled}
        errorMessage={field.getMeta().errors?.[0]?.message}
        isLoading={isLoading}
        className="form-combobox-component"
      >
        {items.map((item) => (
          <ComboBoxItem key={item.id} id={item.id}>
            {renderItem ? renderItem(item) : item.name}
          </ComboBoxItem>
        ))}
      </ComboBox>
    );
  };
};

export default createFormComboBox;
