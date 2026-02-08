# Styling Standards

## CSS Framework Usage

### Tailwind CSS + DaisyUI

We use Tailwind CSS as our primary styling framework with DaisyUI for component classes.

```tsx
// Combine utility classes with DaisyUI component classes
<button className="btn btn-primary rounded-lg shadow-md">
  Click me
</button>
```

## Theme-Aware Color Usage

### Primary Color Classes

Prioritize semantic color classes that adapt to both light and dark themes.

```tsx
// ✅ Correct - Theme-aware colors
className="bg-base-100 text-base-content"
className="bg-primary text-primary-content" 
className="bg-success text-success-content"
className="bg-error text-error-content"
className="bg-warning text-warning-content"
className="bg-info text-info-content"

// ❌ Incorrect - Fixed colors that don't adapt
className="bg-white text-black"
className="bg-blue-500 text-white"
```

### Base Color System

Use the base color system for backgrounds and content.

```tsx
// Background variations
className="bg-base-100"    // Main background
className="bg-base-200"    // Secondary background  
className="bg-base-300"    // Tertiary background

// Text colors
className="text-base-content"     // Primary text
className="text-base-content/70"  // Secondary text
className="text-base-content/50"  // Muted text
```

### Edge Case Color Usage

When using non-semantic colors, always provide dark mode variants.

```tsx
// ✅ Correct - With dark mode variants
className="bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300"

// ❌ Incorrect - No dark mode consideration
className="bg-blue-50 border-blue-400 text-blue-700"
```

## Class Name Management

### Use parseClassName Utility

Always use the `parseClassName` utility for combining class names.

```tsx
import { parseClassName } from '@/util/parse-class-name';

const buttonClasses = parseClassName(
  'button-component react-aria-Button btn',
  className,
  isActive ? 'is-active' : undefined
);

return <button className={buttonClasses} />;
```

### Component Base Classes

Every component should have a base CSS class for identification.

```tsx
// Button component
className="button-component react-aria-Button btn"

// Modal component  
className="modal-component modal modal-open"

// Link component
className="link-component"
```

## CSS File Organization

### Component Styles

Each component can have its own `styles.css` file that references global styles.

```css
@reference "@/global.css";

.modal-header {
  @apply flex items-center gap-2;
}

.modal-close-button {
  @apply flex items-center btn-ghost cursor-pointer w-8;
}
```

### Tailwind Apply Directive

Use `@apply` for reusable component patterns.

```css
.react-aria-Button {
  @apply inline-flex items-center gap-2;
}
```

## DaisyUI Component Classes

### Button Variants

```tsx
// Color variants
className="btn-primary"
className="btn-secondary" 
className="btn-accent"
className="btn-neutral"

// Style variants
className="btn-outline"
className="btn-ghost"
className="btn-link"

// Size variants
className="btn-xs btn-sm btn-md btn-lg"

// Modifiers
className="btn-wide btn-block btn-circle btn-square"
```

### Modal Classes

```tsx
className="modal modal-open"
className="modal-box"
className="modal-action"
```

## Responsive Design

### Mobile-First Approach

Use responsive prefixes for breakpoint-specific styles.

```tsx
className="flex flex-col md:flex-row gap-4 md:gap-6"
className="text-sm md:text-base lg:text-lg"
```

## State-Based Styling

### Conditional Classes

Use conditional logic for state-based styling.

```tsx
const linkClasses = parseClassName(
  'link-component',
  className,
  isActive ? 'is-active' : undefined,
  external ? 'external-link' : undefined
);
```

### Loading States

```tsx
className="loading loading-spinner loading-sm"
className="loading loading-dots loading-md"
```

## Icon Integration

### Icon Wrapper Classes

```tsx
<span className="icon-component" data-icon-name={name}>
  <SelectedIcon />
</span>
```

## Accessibility Considerations

### Focus States

Ensure proper focus states are maintained with theme colors.

```tsx
className="focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
```

### High Contrast Support

Use sufficient color contrast ratios with semantic colors.

```tsx
// Good contrast with theme support
className="bg-base-100 text-base-content border border-base-300"
``` 