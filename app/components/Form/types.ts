import type { FieldApi } from '@tanstack/react-form';

// Common props shared across all form components
export interface FormFieldCommonProps {
  label: string;
  description?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// From @tanstack/react-form/dist/esm/createFormHook.d.ts
export type useFieldContextFn = <TData>() => FieldApi<
  any,
  string,
  TData,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
