# Naming Conventions

## Variable Naming

### Use Descriptive camelCase

Variables should use camelCase and be descriptive of their purpose.

```tsx
// ✅ Correct - Descriptive names
const isModalOpen = true;
const selectedItems = [];
const handleSubmitForm = () => {};
const userAccountData = {};

// ❌ Incorrect - Too short or unclear
const open = true;
const items = [];
const submit = () => {};
const data = {};
```

### State Variables

State variables should clearly indicate what they represent.

```tsx
// ✅ Correct
const [isLoading, setIsLoading] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [formErrors, setFormErrors] = useState({});
const [childrenProps, setChildrenProps] = useState({});

// ❌ Incorrect
const [loading, setLoading] = useState(false);
const [item, setItem] = useState(null);
const [errors, setErrors] = useState({});
```

### Boolean Variables

Use clear boolean naming with `is`, `has`, `can`, `should` prefixes.

```tsx
// ✅ Correct
const isActive = true;
const hasErrors = false;
const canSubmit = true;
const shouldShowButton = false;
const isDisabled = true;

// ❌ Incorrect
const active = true;
const errors = false;
const submit = true;
```

## Function Naming

### Use Verb-Based Names

Functions should start with verbs that describe their action.

```tsx
// ✅ Correct - Action-oriented names
const handleOpenModal = () => {};
const validateFormFields = () => {};
const fetchUserData = async () => {};
const toggleModalVisibility = () => {};
const parseClassName = () => {};

// ❌ Incorrect - Noun-based names
const modalOpen = () => {};
const formFields = () => {};
const userData = async () => {};
```

### Event Handlers

Event handlers should use the `handle` prefix followed by the action.

```tsx
// ✅ Correct
const handleSubmit = () => {};
const handleClose = () => {};
const handleOpenModal = () => {};
const handleFormChange = () => {};
const handleButtonPress = () => {};

// ❌ Incorrect
const onSubmit = () => {};
const close = () => {};
const submit = () => {};
```

### Async Functions

Async functions should clearly indicate they perform asynchronous operations.

```tsx
// ✅ Correct
const fetchUserData = async () => {};
const submitFormData = async () => {};
const loadModalContent = async () => {};

// ❌ Incorrect  
const getUserData = async () => {};
const formSubmit = async () => {};
```

## Component Naming

### PascalCase for Components

All React components use PascalCase naming.

```tsx
// ✅ Correct
const Button = () => {};
const ModalForm = () => {};
const UserAccountModal = () => {};
const TaskCard = () => {};

// ❌ Incorrect
const button = () => {};
const modalForm = () => {};
const userAccountModal = () => {};
```

### Component File Names

Component files should match the component name.

```
// ✅ Correct file structure
components/
  Button/
    index.tsx          // exports Button component
    index.tale.tsx     // Button stories
  Modal/
    index.tsx          // exports Modal component
    basic.tale.tsx     // Basic modal story
    form.tale.tsx      // Form modal story
```

## Type and Interface Naming

### Interface Names

Interfaces should be descriptive and end with appropriate suffixes.

```tsx
// ✅ Correct
interface ModalProps {
  title: string;
  onClose: () => void;
}

interface ModalRef {
  getChildrenProps: () => any;
  setChildrenProps: (props: any) => void;
}

interface ButtonTaleState {
  isLoading: boolean;
  iconName: IconName;
}

// ❌ Incorrect
interface Modal {
  title: string;
}

interface IModalProps {
  title: string;
}
```

### Type Aliases

Type aliases should be descriptive and use PascalCase.

```tsx
// ✅ Correct
type IconName = keyof typeof availableIcons;
type ButtonProps = ReactAriaButtonProps & {
  isLoading?: boolean;
};

// ❌ Incorrect
type iconName = string;
type Props = any;
```

## File and Directory Naming

### Directory Names

Use PascalCase for component directories, kebab-case for utility directories.

```
// ✅ Correct
components/
  Button/
  Modal/
  TaskCard/
  
util/
  parse-class-name/
  safe-json/
  copy-to-clipboard/

// ❌ Incorrect  
components/
  button/
  modal/
  task-card/
```

### File Names

- Components: `index.tsx`
- Stories: `index.tale.tsx`, `basic.tale.tsx`
- Documentation: `index.tale.mdx`
- Styles: `styles.css`
- Utilities: `index.ts`

## Constant Naming

### Use SCREAMING_SNAKE_CASE

Constants should use uppercase with underscores.

```tsx
// ✅ Correct
const MAX_ITEMS = 100;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = 'https://api.example.com';

// ❌ Incorrect
const maxItems = 100;
const defaultTimeout = 5000;
```

### Object Constants

Object constants can use camelCase if they're configuration objects.

```tsx
// ✅ Correct for configuration objects
const itemTypes = [
  { id: '1', name: 'Product' },
  { id: '2', name: 'Service' },
];

const availableIcons = {
  close: CloseIcon,
  add: AddIcon,
  edit: EditIcon,
};
```

## Service and Utility Naming

### Service Names

Services should have descriptive names ending with 'Service'.

```tsx
// ✅ Correct
import eventService from '@/services/event';
import apiService from '@/services/api';

// ❌ Incorrect
import event from '@/services/event';
import api from '@/services/api';
```

### Utility Functions

Utility functions should be verb-based and descriptive.

```tsx
// ✅ Correct
export const parseClassName = () => {};
export const generateNuqsSearchParams = () => {};
export const copyToClipboard = () => {};

// ❌ Incorrect
export const className = () => {};
export const params = () => {};
export const copy = () => {};
```

## Props Destructuring

### Descriptive Destructuring

When destructuring props, maintain clear variable names.

```tsx
// ✅ Correct
const Modal = ({ 
  children, 
  isOpen, 
  onClose, 
  title, 
  className,
  closeButtonLabel 
}) => {
  // Implementation
};

// ❌ Incorrect
const Modal = ({ children, open, close, title, class: cls }) => {
  // Implementation  
};
``` 