# NavLink Component

A navigation link component that uses native anchor tags and provides consistent styling for navigation elements with automatic active state detection.

## Purpose

The NavLink component provides a styled navigation link that can be used for both internal and external navigation. It automatically detects the active state based on the current browser URL, making it perfect for navigation menus, breadcrumbs, and other navigation contexts.

## Props API

### Required Props
- `to: string` - The URL or path to navigate to
- `children: React.ReactNode` - The content to display in the link

### Optional Props
- `variant?: 'default' | 'primary' | 'secondary'` - Visual variant of the link (default: 'default')
- `activeColor?: string` - Custom color for active state (overrides variant colors)
- `inactiveColor?: string` - Custom color for inactive state (overrides variant colors)
- `isActive?: boolean` - Manual override for active state (if not provided, auto-detects from URL)
- `exact?: boolean` - Whether to use exact path matching (default: false)
- `target?: string` - Target attribute for the anchor tag (e.g., '_blank' for external links)
- `rel?: string` - Rel attribute for the anchor tag (e.g., 'noopener noreferrer' for external links)
- `className?: string` - Additional CSS classes
- `data-testid?: string` - Test identifier for testing

## Usage Examples

### Basic Usage (Auto-active detection)
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

### External Links
```tsx
<NavLink 
  to="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  External Link
</NavLink>
```

### Exact Path Matching
```tsx
<NavLink to="/dashboard" exact>
  Dashboard (exact match only)
</NavLink>
```

### Manual Active State Override
```tsx
<NavLink to="/dashboard" isActive={customActiveLogic}>
  Dashboard
</NavLink>
```

## Active State Detection

The component automatically detects the active state by comparing the current browser URL (`window.location.pathname`) with the link's `to` prop:

- **Non-exact matching (default)**: Link is active if current path starts with the link path
  - `/dashboard` is active when on `/dashboard/settings`
  - `/users` is active when on `/users/123`
- **Exact matching**: Link is active only if current path exactly matches the link path
  - `/dashboard` is active only when on `/dashboard`

## Design Considerations

- Uses CSS variables for consistent theming
- Smooth color transitions for state changes
- Responsive sizing with consistent spacing
- Accessible hover and focus states
- Native anchor tag for better compatibility and SEO
- Automatic active state detection without external dependencies

## Integration Notes

This component uses native `<a>` tags and automatically detects active states based on the browser URL. No routing library is required, making it compatible with any React application. The active state can be manually overridden using the `isActive` prop if needed. 