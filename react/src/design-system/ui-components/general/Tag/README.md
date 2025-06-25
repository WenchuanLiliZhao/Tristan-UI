# Tag Component

A label-style component for displaying categories, status indicators, metadata, and other categorical information.

## Features

- Multiple visual variants for different contexts
- Color-coded status indicators
- Flexible sizing options
- Support for interactive and non-interactive states
- Consistent styling with the design system

## Files

- `index.tsx` - Main tag component implementation
- `styles.module.scss` - Comprehensive styling for all tag variants and states

## Usage

```typescript
import { Tag } from '@/ui-components';

<Tag variant="info">Information</Tag>
<Tag variant="success">Completed</Tag>
<Tag variant="warning">Pending</Tag>
<Tag variant="error">Failed</Tag>
```

Perfect for status badges, category labels, and any scenario requiring clear, concise labeling. 