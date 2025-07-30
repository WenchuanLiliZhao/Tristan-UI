# NavLink Component

A navigation link component that integrates with React Router and provides consistent styling for navigation elements.

## Purpose

The NavLink component provides a styled navigation link that automatically handles active states when used with React Router. It's designed for use in navigation menus, breadcrumbs, and other navigation contexts.

## Props API

### Required Props
- `to: string` - The route path to navigate to
- `children: React.ReactNode` - The content to display in the link

### Optional Props
- `variant?: 'default' | 'primary' | 'secondary'` - Visual variant of the link (default: 'default')
- `activeColor?: string` - Custom color for active state (overrides variant colors)
- `inactiveColor?: string` - Custom color for inactive state (overrides variant colors)
- `className?: string` - Additional CSS classes
- `data-testid?: string` - Test identifier for testing

## Usage Examples

### Basic Usage
```tsx
import { NavLink } from '@tristan-ui/navigation';

<NavLink to="/dashboard">Dashboard</NavLink>
```

### With Variants
```tsx
<NavLink to="/profile" variant="primary">
  Profile
</NavLink>
```

### Custom Colors
```tsx
<NavLink 
  to="/settings" 
  activeColor="#007bff" 
  inactiveColor="#6c757d"
>
  Settings
</NavLink>
```

## Design Considerations

- Uses CSS variables for consistent theming
- Smooth color transitions for state changes
- Responsive sizing with consistent spacing
- Accessible hover and focus states
- Integrates seamlessly with React Router's active state detection

## Integration with React Router

This component wraps React Router's `NavLink` component and adds Tristan-UI styling. It automatically handles the `isActive` state and applies appropriate styling based on the current route. 