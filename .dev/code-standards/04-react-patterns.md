# React Patterns & Standards

## Component Declaration

### Arrow Function Components Only

Always use arrow function syntax for React components.

```tsx
// ✅ Correct
const Button = (props: ButtonProps) => {
  return <button>{props.children}</button>;
};

// ❌ Incorrect - Function declarations
function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

// ❌ Incorrect - Class components
class Button extends React.Component {
  render() {
    return <button>{this.props.children}</button>;
  }
}
```

### Component with Hooks

```tsx
const Modal = ({ isOpen, onClose, title }: ModalProps) => {
  const [childrenProps, setChildrenProps] = useState<any>({});
  
  const handleClose = useCallback((event: any) => {
    event.preventDefault?.();
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div>{/* Implementation */}</div>
  );
};
```

## State Management

### useState Patterns

Use descriptive state variable names with proper TypeScript typing.

```tsx
// ✅ Correct
const [isLoading, setIsLoading] = useState<boolean>(false);
const [selectedItem, setSelectedItem] = useState<Item | null>(null);
const [formErrors, setFormErrors] = useState<Record<string, string>>({});

// ❌ Incorrect
const [loading, setLoading] = useState(false);
const [item, setItem] = useState(null);
const [errors, setErrors] = useState({});
```

### State Updates

Use functional updates when the new state depends on the previous state.

```tsx
// ✅ Correct
setChildrenProps((prev: any) => ({ ...prev, ...props }));
setItems(items => items.filter(item => item.id !== removedId));

// ❌ Incorrect
setChildrenProps({ ...childrenProps, ...props });
```

## Event Handling

### React Event Handlers Only

Never use vanilla DOM event manipulation. Always use React's event system.

```tsx
// ✅ Correct - React event handling
const Button = ({ onPress, children }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onPress?.(event);
  };

  return <button onClick={handleClick}>{children}</button>;
};

// ❌ Incorrect - Vanilla DOM manipulation
const Button = ({ onPress, children }) => {
  useEffect(() => {
    const button = document.getElementById('my-button');
    button?.addEventListener('click', onPress);
    
    return () => {
      button?.removeEventListener('click', onPress);
    };
  }, []);

  return <button id="my-button">{children}</button>;
};
```

### Event Handler Naming

Use `handle` prefix for internal event handlers, `on` prefix for prop event handlers.

```tsx
interface ButtonProps {
  onPress?: (event: any) => void;  // Prop handler
  onSubmit?: () => void;           // Prop handler
}

const Button = ({ onPress, onSubmit }: ButtonProps) => {
  // Internal handlers use 'handle' prefix
  const handleClick = (event: any) => {
    onPress?.(event);
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  return <button onClick={handleClick}>{children}</button>;
};
```

## Hook Usage Patterns

### useEffect Dependencies

Always include all dependencies in useEffect dependency arrays.

```tsx
// ✅ Correct
useEffect(() => {
  if (isOpen) {
    handleOpen();
  }
}, [isOpen, handleOpen]); // All dependencies listed

// ❌ Incorrect
useEffect(() => {
  if (isOpen) {
    handleOpen();
  }
}, []); // Missing dependencies
```

### useCallback for Event Handlers

Use useCallback for event handlers that are passed as props or used in effects.

```tsx
const handleOpen = useCallback(
  debounce(() => {
    onOpen?.({
      childrenProps,
      setChildrenProps: (props: any) =>
        setChildrenProps((prev: any) => ({ ...prev, ...props })),
    });
  }, 100),
  [onOpen, childrenProps],
);
```

### Custom Hooks

Create custom hooks for reusable stateful logic.

```tsx
// ✅ Correct - Custom hook pattern
const useModalState = () => {
  const [items, setItems] = useState<Item[]>([]);
  
  const addItem = useCallback((item: Item) => {
    setItems(prev => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return { items, addItem, removeItem };
};

// Usage in component
const MyComponent = () => {
  const { items, addItem, removeItem } = useModalState();
  // Component implementation
};
```

## Refs and Imperative Handles

### forwardRef Pattern

Use forwardRef when you need to expose component methods.

```tsx
interface ModalRef {
  getChildrenProps: () => any;
  setChildrenProps: (props: any) => void;
}

const Modal = React.forwardRef<ModalRef, ModalProps>(
  ({ children, isOpen, onClose }, ref) => {
    const [childrenProps, setChildrenProps] = useState<any>({});

    useImperativeHandle(ref, () => ({
      getChildrenProps: () => childrenProps,
      setChildrenProps: (props: any) => {
        setChildrenProps((prev: any) => ({ ...prev, ...props }));
      },
    }));

    return <div>{/* Implementation */}</div>;
  }
);
```

## Conditional Rendering

### Use Ternary for Simple Conditions

```tsx
// ✅ Correct
return isOpen ? (
  <Modal>{children}</Modal>
) : null;

// ✅ Correct for inline conditions
<div>
  {isLoading && <LoadingSpinner />}
  {error && <ErrorMessage error={error} />}
</div>
```

### Avoid Complex Logic in JSX

Extract complex conditional logic to variables or functions.

```tsx
// ✅ Correct
const shouldShowActions = actionChildren || closeButtonLabel;
const renderActions = () => {
  if (!shouldShowActions) return null;
  
  return (
    <div className="modal-action">
      {typeof actionChildren === 'function'
        ? actionChildren(childrenProps)
        : actionChildren}
      {closeButtonLabel && (
        <Button onPress={handleClose}>{closeButtonLabel}</Button>
      )}
    </div>
  );
};

return (
  <div>
    {/* Other content */}
    {renderActions()}
  </div>
);
```

## Component Composition

### Function as Children Pattern

Support both static children and function children for flexible composition.

```tsx
interface ModalProps {
  children?: ReactNode | ((...props: any) => ReactNode);
}

const Modal = ({ children }: ModalProps) => {
  const [childrenProps, setChildrenProps] = useState({});

  return (
    <div>
      {typeof children === 'function' 
        ? children(childrenProps) 
        : children}
    </div>
  );
};
```

## No Class Components

### Convert Classes to Functional Components

Always use functional components with hooks instead of class components.

```tsx
// ✅ Correct - Functional component
const MyComponent = ({ initialValue }: Props) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Side effect logic
  }, []);

  return <div>{value}</div>;
};

// ❌ Incorrect - Class component
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
  }

  componentDidMount() {
    // Side effect logic
  }

  render() {
    return <div>{this.state.value}</div>;
  }
}
```

## DOM Manipulation

### React-Only DOM Access

Never use vanilla DOM methods. Use React refs when DOM access is needed.

```tsx
// ✅ Correct - Using React ref
const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

// ❌ Incorrect - Vanilla DOM manipulation
const MyComponent = () => {
  const handleFocus = () => {
    const input = document.getElementById('my-input');
    input?.focus();
  };

  return (
    <div>
      <input id="my-input" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};
``` 