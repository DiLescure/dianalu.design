# Component Architecture Standards

## Import Patterns

### Use `@/` Alias for All Internal Imports

Always use the `@/` alias for importing internal modules, components, and utilities.

```tsx
// ✅ Correct
import Button from '@/components/Button';
import { parseClassName } from '@/util/parse-class-name';
import eventService from '@/services/event';

// ❌ Incorrect  
import Button from '../Button';
import { parseClassName } from '../../util/parse-class-name';
```

### Import Order Convention

1. External library imports
2. React imports (if needed explicitly)
3. Internal component imports (using `@/`)
4. Type imports
5. Styles imports

```tsx
import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { Modal as AriaModal } from 'react-aria-components';

import Button from '@/components/Button';
import { parseClassName } from '@/util/parse-class-name';
import type { IconName } from '@/components/Icon';

import './styles.css';
```

## Component Structure

### Use Arrow Function Components

Always use arrow function syntax for components.

```tsx
// ✅ Correct
const Button = (props: ButtonProps) => {
  return <button>{props.children}</button>;
};

// ❌ Incorrect
function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}
```

### Component with forwardRef Pattern

When refs are needed, use `React.forwardRef` with proper TypeScript typing.

```tsx
const Modal = React.forwardRef<ModalRef, ModalProps>(
  ({ children, isOpen, onClose, title }, ref) => {
    useImperativeHandle(ref, () => ({
      getChildrenProps: () => childrenProps,
      setChildrenProps: (props: any) => setChildrenProps(props),
    }));

    return (
      <div>{children}</div>
    );
  }
);
```

## TypeScript Standards

### Interface Definitions

- Use `interface` for component props
- Place interfaces above the component definition
- Export interfaces when they're used externally

```tsx
export interface ModalProps {
  children?: ReactNode | ((...props: any) => ReactNode);
  isOpen?: boolean;
  onClose: (args?: any) => void;
  title: string;
  className?: string;
}

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  // Component implementation
};
```

### Type Exports

Export types alongside components for external usage.

```tsx
export type ButtonProps = ReactAriaButtonProps & {
  isLoading?: boolean;
  iconName?: IconName;
};

export type IconName = keyof typeof availableIcons;
```

## Component Composition Patterns

### Prioritize Internal Components

Always use internal components from `@/components` over native HTML elements.

```tsx
// ✅ Correct
import Button from '@/components/Button';
import Link from '@/components/Link';

return (
  <Button onPress={handleClick}>
    <Link to="/page">Go to page</Link>
  </Button>
);

// ❌ Incorrect
return (
  <button onClick={handleClick}>
    <a href="/page">Go to page</a>
  </button>
);
```

### Component Extension Pattern

When extending external library components, maintain consistent prop interfaces.

```tsx
export type ButtonProps = ReactAriaButtonProps & 
  React.RefAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    iconName?: IconName;
  };

const Button = (props: ButtonProps) => {
  const { isLoading, iconName, children, className, ...rest } = props;
  return (
    <ReactAriaButton {...rest} className={buttonClasses}>
      {/* Custom implementation */}
    </ReactAriaButton>
  );
};
```

## File Organization

### Component File Structure

Each component should follow this structure:
- `index.tsx` - Main component
- `index.tale.tsx` - Story/example component
- `index.tale.mdx` - Documentation
- `styles.css` - Component-specific styles

### Default Exports

Always use default exports for main components.

```tsx
// ✅ Correct
const Button = (props: ButtonProps) => {
  // Implementation
};

export default Button;

// ❌ Incorrect  
export const Button = (props: ButtonProps) => {
  // Implementation
};
``` 