# Icon Component

A flexible icon system that provides consistent iconography throughout the application, with built-in support for Material Icons.

## Features

- Material Icons integration
- Customizable sizes and colors
- Accessibility support with proper ARIA labels
- Font-based icon rendering for optimal performance
- Comprehensive icon library management

## Files

- `index.tsx` - Main icon component implementation
- `styles.module.scss` - Icon styling and sizing utilities
- `fonts/` - Font files and Material Icons integration
- `MATERIAL_ICONS_INTEGRATION.md` - Detailed guide for icon usage

## Usage

```typescript
import { Icon } from '@/ui-components';

<Icon name="home" size={24} color="primary" />
<Icon name="search" size="small" />
```

## Documentation

See `MATERIAL_ICONS_INTEGRATION.md` for comprehensive documentation on available icons and integration patterns. 