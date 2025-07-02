# CascaderItem Interactive Optimization

## Overview

The `CascaderItem` component has been optimized to handle interactive content (like Button components) more efficiently, avoiding double event handling and conflicting behaviors.

## Problem Statement

Previously, when using interactive components (like Button) as content in CascaderItem:

1. **Double Event Handling**: Both CascaderItem and the inner Button handled click events
2. **Conflicting Accessibility**: CascaderItem's `role="button"` conflicted with the inner Button
3. **Style Interference**: CascaderItem's hover/focus styles competed with the inner component's styles
4. **Unnecessary Complexity**: Extra wrapper logic for already-interactive content

## Solution: Interactive Mode

### New `interactive` Property

```typescript
interface CascaderItemProps {
  // ... other props
  /** 
   * Set to true when content is already an interactive component (Button, etc.)
   * This will render content directly without CascaderItem wrapper events
   */
  interactive?: boolean;
}
```

### Usage Examples

#### Non-Interactive Content (Default)
```tsx
// For simple text or non-interactive content
{
  key: 'item1',
  content: 'Simple Text Option',
  value: 'option1'
  // interactive: false (default)
}
```

#### Interactive Content (Optimized)
```tsx
// For Button or other interactive components
{
  key: 'item1',
  content: (
    <Button variant="ghost" size="medium">
      Option with Button
    </Button>
  ),
  value: 'option1',
  interactive: true // Enables optimized mode
}
```

## Behavioral Differences

### Non-Interactive Mode (Default)
- CascaderItem wraps content with full event handling
- Adds `role="button"`, `tabIndex`, keyboard navigation
- Applies hover/focus/active styles
- Handles all click events

### Interactive Mode (`interactive: true`)
- Minimal wrapper with reduced padding
- No competing event handlers or accessibility attributes
- Lets the inner component handle its own interactions
- Uses setTimeout to coordinate with inner component events
- Transparent hover/focus/active states

## Implementation Details

### Event Coordination
When `interactive: true`, CascaderItem uses a delayed event handler:

```typescript
const handleInteractiveClick = () => {
  setTimeout(() => {
    if (!disabled && onClick) {
      onClick(value, item);
    }
  }, 0);
};
```

This allows the inner component to handle its events first, then triggers the cascader selection.

### Styling
Interactive mode uses minimal styling:

```scss
.cascader-item--interactive {
  padding: 4px; // Reduced padding
  
  &:hover, &:active, &:focus-visible {
    background-color: transparent; // No competing styles
    outline: none;
  }
}
```

## Migration Guide

### Before (Non-Optimized)
```tsx
const items = options.map(option => ({
  key: option.key,
  content: (
    <Button variant="ghost">{option.label}</Button>
  ),
  value: option.value
  // CascaderItem handles all events, causing conflicts
}));
```

### After (Optimized)
```tsx
const items = options.map(option => ({
  key: option.key,
  content: (
    <Button variant="ghost">{option.label}</Button>
  ),
  value: option.value,
  interactive: true // Enable optimized mode
}));
```

## Benefits

1. **Clean Event Handling**: No more double event handling or conflicts
2. **Better Accessibility**: Inner components maintain their own accessibility features
3. **Improved Performance**: Reduced event propagation complexity
4. **Cleaner Styling**: No style conflicts between wrapper and content
5. **Backward Compatible**: Existing code continues to work unchanged

## Real-World Usage

This optimization is particularly beneficial in components like:
- **GroupBySelector**: Using Button components as dropdown options
- **Navigation Menus**: With Link or Button components
- **Action Dropdowns**: With pre-styled interactive elements

The optimization maintains the flexibility of CascaderItem while providing a cleaner, more efficient path for interactive content. 