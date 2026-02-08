import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import Button from '@/components/Button';
import type { CheckboxGroupOption } from '@/components/CheckboxGroup';
import {
  createFormCheckboxGroup,
  createFormComboBox,
  createFormNotesField,
  createFormTextArea,
  createFormTextField,
} from '@/components/Form';
import FormModal, { type FormModalOnOpenProps, type FormModalRef } from '@/components/Form/Modal';
import type { TaleContent } from '@/components/Taleforge/types';
import eventService from '@/services/event';
import { uid, type WithOptionalId, wait } from '@/util';

import FormModalTale from './form.tale.mdx';

const itemTypes = [
  { id: '1', name: 'Product' },
  { id: '2', name: 'Service' },
  { id: '3', name: 'Subscription' },
];

const categoryOptions: CheckboxGroupOption[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'food', label: 'Food' },
  { value: 'books', label: 'Books' },
];

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.string().min(1, 'Item type is required'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  notes: z.string().min(1, 'Notes are required'),
  details: z.string().optional(),
});

type Item = WithOptionalId<z.infer<typeof formSchema>>;

interface FormModalTaleState {
  isOpen: boolean;
  submitShouldSucceed: boolean;
}

const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const fieldComponents = {
  FormTextField: createFormTextField(useFieldContext),
  FormTextArea: createFormTextArea(useFieldContext),
  FormComboBox: createFormComboBox(useFieldContext),
  FormCheckboxGroup: createFormCheckboxGroup(useFieldContext),
  FormNotesField: createFormNotesField(useFieldContext),
};

const { useAppForm } = createFormHook({
  fieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

const initialFormValues: Item = {
  name: '',
  description: '',
  type: '',
  categories: [],
  notes: '',
  details: '',
};

// Custom hook to handle modal state with consistent hook structure
const useModalState = () => {
  const [items, setItems] = useState<Item[]>([]);

  return {
    items,
    setItems,
  };
};

const ModalFormTale: TaleContent<FormModalTaleState> = {
  taleComponent: ({ taleState, taleOnChange }) => {
    const { isOpen, submitShouldSucceed } = taleState as FormModalTaleState;

    // Use simple local state management instead of global state
    const { items, setItems } = useModalState();

    const clearItems = () => {
      setItems([]);
    };

    // Create form
    const form = useAppForm({
      defaultValues: initialFormValues,
      validators: {
        // @ts-ignore
        onChange: formSchema,
      },
    });

    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    if (selectedItem) {
      for (const [key, value] of Object.entries(selectedItem)) {
        form.setFieldValue(key as keyof Item, value);
      }
    }

    const handleOpenModal = async () => {
      form.reset();

      taleOnChange({
        stateKey: 'isOpen',
        value: true,
      });
    };

    const onOpenModal = async ({ setChildrenProps }: FormModalOnOpenProps) => {
      setChildrenProps({
        canSubmit: false,
      });

      console.log('onOpenModal');
      await wait(1000);

      form.validateAllFields('change');
    };

    const handleCloseModal = () => {
      taleOnChange({
        stateKey: 'isOpen',
        value: false,
      });
      setSelectedItem(null);
    };

    const toggleSucceed = () => {
      taleOnChange({
        stateKey: 'submitShouldSucceed',
        value: !submitShouldSucceed,
      });
    };

    const handleSubmit = async () => {
      await wait(1000);
      if (!submitShouldSucceed) {
        throw new Error('API call failed');
      }

      if (!form.store?.state?.values) {
        throw new Error('Form values are not set');
      }

      let updatedItems = items;

      if (selectedItem?.id) {
        updatedItems = items.map((item) => {
          if (item.id === selectedItem.id) {
            return {
              ...form.store.state.values,
              id: selectedItem.id,
            };
          }
          return item;
        });
      } else {
        updatedItems = [
          ...items,
          {
            ...form.store.state.values,
            id: uid.rnd(),
          },
        ];
      }

      setItems(updatedItems);
    };

    const handleSubmitError = (error: any) => {
      eventService.emit('overlay:request-toast-queue-add', {
        message: 'API call "failed"',
        level: 'error',
      });
      console.error('API call failed', error);
    };

    const handleRemoveItem = (item: Item) => {
      setItems(items.filter((i) => i.id !== item.id));
    };

    const formModalRef = useRef<FormModalRef | null>(null);

    useEffect(() => {
      form.validateAllFields('change');
      form.store.subscribe(({ currentVal }) => {
        // console.log('currentVal', currentVal);
        formModalRef.current?.setCanSubmit(currentVal.isFieldsValid && !currentVal.isPristine);
      });
    }, [form]);

    useEffect(() => {
      if (selectedItem) {
        taleOnChange({
          stateKey: 'isOpen',
          value: true,
        });
      }
    }, [selectedItem]);

    return (
      <>
        <div className="flex flex-col gap-4 mb-4">
          <div className="card bg-base-200 border border-base-300 p-4 shadow-md">
            <div className="mt-4 flex gap-3">
              <Button onPress={handleOpenModal} className="btn-primary" iconName="add">
                Add New Item
              </Button>
              <Button
                onPress={toggleSucceed}
                className={submitShouldSucceed ? 'btn-success' : 'btn-error'}
                iconName={submitShouldSucceed ? 'checkmark' : 'close'}
              >
                {submitShouldSucceed ? 'API Call: Will Succeed' : 'API Call: Will Fail'}
              </Button>
              <Button onPress={clearItems} className="btn-error" iconName="delete">
                Clear Items
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-lg font-bold">Items</h3>
              {items.length < 1 && (
                <div className="text-center text-sm text-gray-500">No items added yet</div>
              )}
              {items.map((item) => (
                <div
                  key={item.name}
                  className="card bg-base-100 border border-base-300 p-4 shadow-md"
                >
                  <div>
                    <strong>Name:</strong> {item.name}
                  </div>
                  <div>
                    <strong>Description:</strong> {item.description}
                  </div>
                  <div>
                    <strong>Type:</strong> {item.type}
                  </div>
                  <div>
                    <strong>Categories:</strong> {item.categories.join(', ')}
                  </div>
                  <div>
                    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: it's not a user-generated value */}
                    <strong>Notes:</strong> <div dangerouslySetInnerHTML={{ __html: item.notes }} />
                  </div>
                  <div>
                    <strong>Details:</strong>{' '}
                    {item.details || <em className="text-gray-500">No details provided</em>}
                  </div>
                  <div className="divider" />
                  <div className="flex gap-2 justify-end">
                    <Button
                      onPress={() => handleRemoveItem(item)}
                      className="btn-error"
                      iconName="remove"
                    >
                      Remove
                    </Button>
                    <Button
                      onPress={() => setSelectedItem(item)}
                      className="btn-primary"
                      iconName="edit"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FormModal
            ref={formModalRef}
            isOpen={isOpen}
            title="Add New Item"
            onOpen={onOpenModal}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            onSubmitError={handleSubmitError}
            submitButtonLabel="Save Item"
          >
            {({ isLoading, isSubmitting }) => (
              <div className="p-2 flex flex-col gap-4">
                <div className="opacity-75 text-sm mb-2">
                  Complete the form below to add a new item to the list.
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <form.AppField name="name">
                    {(field) => {
                      return (
                        <field.FormTextField
                          label="Name"
                          isDisabled={isSubmitting}
                          isLoading={isLoading}
                        />
                      );
                    }}
                  </form.AppField>

                  <form.AppField name="description">
                    {(field) => {
                      return (
                        <field.FormTextArea
                          label="Description"
                          isDisabled={isSubmitting}
                          isLoading={isLoading}
                        />
                      );
                    }}
                  </form.AppField>

                  <form.AppField name="type">
                    {(field) => {
                      return (
                        <field.FormComboBox
                          label="Item Type"
                          isDisabled={isSubmitting}
                          isLoading={isLoading}
                          items={itemTypes}
                        />
                      );
                    }}
                  </form.AppField>

                  <form.AppField name="categories">
                    {(field) => {
                      return (
                        <field.FormCheckboxGroup
                          label="Categories"
                          isDisabled={isSubmitting}
                          isLoading={isLoading}
                          options={categoryOptions}
                        />
                      );
                    }}
                  </form.AppField>

                  <form.AppField name="notes">
                    {(field) => {
                      return (
                        <field.FormNotesField
                          label="Notes"
                          isDisabled={isSubmitting}
                          isLoading={isLoading}
                        />
                      );
                    }}
                  </form.AppField>

                  <form.AppField name="details">
                    {(field) => {
                      return (
                        <field.FormTextArea
                          label="Additional Details"
                          isDisabled={isSubmitting}
                          isLoading={isLoading}
                        />
                      );
                    }}
                  </form.AppField>
                </form>
              </div>
            )}
          </FormModal>
        </div>
        <FormModalTale />
      </>
    );
  },
  defaultValues: {
    isOpen: false,
    submitShouldSucceed: true,
  },
  schema: z.object({
    isOpen: z.boolean().describe('Determine if modal is open'),
    submitShouldSucceed: z.boolean().describe('Determine if form submission succeeds or fails'),
  }),
};

export default ModalFormTale;
