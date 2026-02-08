# TypeScript Standards

## Interface Definitions

### Component Props Interfaces

Always define explicit interfaces for component props with proper typing.

```tsx
// ✅ Correct - Explicit prop interface
export interface ModalProps {
  children?: ReactNode | ((...props: any) => ReactNode);
  isOpen?: boolean;
  onOpen?: null | ((onOpenProps: {
    childrenProps: any;
    setChildrenProps: (childrenProps: any) => void;
  }) => Promise<void>);
  onClose: (args?: any) => void;
  title: string;
  className?: string;
  closeButtonLabel?: string;
}

// ❌ Incorrect - Generic or missing types
interface ModalProps {
  children?: any;
  onClose: Function;
  title: any;
}
```

### Ref Interfaces

Define specific interfaces for component refs when using forwardRef.

```tsx
export interface ModalRef {
  getChildrenProps: () => any;
  setChildrenProps: (props: any) => void;
}

const Modal = React.forwardRef<ModalRef, ModalProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      getChildrenProps: () => childrenProps,
      setChildrenProps: (props: any) => setChildrenProps(props),
    }));
  }
);
```

## Type Composition

### Extending Library Types

Extend existing library types rather than redefining them.

```tsx
// ✅ Correct - Extending React Aria types
export type ButtonProps = ReactAriaButtonProps &
  React.RefAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    iconName?: IconName;
    iconClassName?: string;
  };

// ❌ Incorrect - Redefining everything
export interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}
```

### Union Types for Enums

Use union types for specific value sets.

```tsx
// ✅ Correct - Union type for icon names
export type IconName = keyof typeof availableIcons;

// ✅ Correct - String literal union
type ButtonColor = 
  | 'btn-primary' 
  | 'btn-secondary' 
  | 'btn-accent' 
  | 'btn-info'
  | 'btn-success' 
  | 'btn-warning' 
  | 'btn-error';
```

## Generic Types

### Utility Type Usage

Use TypeScript utility types for common patterns.

```tsx
// ✅ Correct - Using utility types
type WithOptionalId<T> = T & { id?: string };
type Item = WithOptionalId<z.infer<typeof formSchema>>;

// ✅ Correct - Partial for optional props
type PartialModalProps = Partial<ModalProps>;

// ✅ Correct - Pick for subset of props
type MinimalButtonProps = Pick<ButtonProps, 'children' | 'onPress'>;
```

### Generic Component Props

Define generic interfaces for reusable components.

```tsx
// ✅ Correct - Generic tale component
interface TaleContent<T = any> {
  taleComponent: ({ taleState, taleOnChange }: {
    taleState: T;
    taleOnChange: (update: { stateKey: string; value: any }) => void;
  }) => JSX.Element;
  defaultValues: T;
  schema: z.ZodType<T>;
}
```

## Function Typing

### Event Handler Types

Use specific event types for handlers.

```tsx
// ✅ Correct - Specific event types
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

// ❌ Incorrect - Generic any type
const handleClick = (event: any) => {};
```

### Async Function Types

Properly type async functions and their return values.

```tsx
// ✅ Correct - Async function typing
const fetchUserData = async (): Promise<User> => {
  const response = await api.get('/user');
  return response.data;
};

const handleAsyncSubmit = async (formData: FormData): Promise<void> => {
  await submitForm(formData);
};
```

### Callback Function Types

Define specific types for callback functions.

```tsx
// ✅ Correct - Specific callback types
interface FormModalOnOpenProps {
  childrenProps: any;
  setChildrenProps: (props: any) => void;
}

interface ModalProps {
  onOpen?: (props: FormModalOnOpenProps) => Promise<void>;
  onClose: (args?: any) => void;
}
```

## State Typing

### useState with Types

Explicitly type useState when the type isn't inferred correctly.

```tsx
// ✅ Correct - Explicit typing when needed
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
const [formErrors, setFormErrors] = useState<Record<string, string>>({});
const [isLoading, setIsLoading] = useState<boolean>(false);

// ✅ Correct - Type inference works
const [items, setItems] = useState([]); // Type inferred as never[]
const [items, setItems] = useState<Item[]>([]); // Better explicit typing
```

## Schema Integration

### Zod Schema Types

Use Zod for runtime validation and TypeScript type inference.

```tsx
// ✅ Correct - Zod schema with TypeScript integration
const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.string().min(1, 'Item type is required'),
});

type FormData = z.infer<typeof formSchema>;

// Usage in component
const [formData, setFormData] = useState<FormData>({
  name: '',
  description: '',
  type: '',
});
```

## Type Guards

### Runtime Type Checking

Create type guards for runtime type safety.

```tsx
// ✅ Correct - Type guard function
const isIconName = (name: string): name is IconName => {
  return name in availableIcons;
};

// Usage
const getIcon = (name: string) => {
  if (isIconName(name)) {
    return availableIcons[name]; // TypeScript knows this is safe
  }
  return availableIcons.image; // Fallback
};
```

## Optional Chaining and Nullish Coalescing

### Safe Property Access

Use optional chaining and nullish coalescing for safe property access.

```tsx
// ✅ Correct - Safe property access
const handleClose = (event: any) => {
  event.preventDefault?.();
  onClose?.();
};

// ✅ Correct - Nullish coalescing for defaults
const finalClassName = className ?? '';
const buttonText = props.children ?? 'Default Text';
```

## Type Exports

### Export Types for External Use

Export types that might be used by consuming code.

```tsx
// ✅ Correct - Export types for external use
export type { ModalProps, ModalRef } from './Modal';
export type { ButtonProps } from './Button';
export type { IconName } from './Icon';

// In consuming code
import type { ModalProps } from '@/components/Modal';
```

## Strict TypeScript Configuration

### tsconfig.json Compliance

Ensure all code follows strict TypeScript configuration.

```tsx
// ✅ Correct - No implicit any
const processItems = (items: Item[]): ProcessedItem[] => {
  return items.map(item => processItem(item));
};

// ❌ Incorrect - Implicit any (if strict mode enabled)
const processItems = (items) => {
  return items.map(item => processItem(item));
};
```

## Type Assertion

### Use Type Assertion Sparingly

Only use type assertions when you have more information than TypeScript.

```tsx
// ✅ Correct - When you know more than TypeScript
const formValues = form.store?.state?.values as FormData;

// ✅ Correct - Non-null assertion when you're certain
const inputElement = inputRef.current!;

// ❌ Incorrect - Unnecessary assertion
const name = props.name as string; // If props.name is already string
``` 