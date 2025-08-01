# Cascader Component

A flexible cascader component that supports grouping and custom ReactNode content.

## Usage

```tsx
import { Cascader, CascaderGroupProps } from '@/ui-components';

const groups: CascaderGroupProps[] = [
  {
    groupTitle: "Recent",
    items: [
      {
        key: "item1",
        content: <span>Option 1</span>,
        value: "option1"
      }
    ]
  },
  {
    // No group title
    items: [
      {
        key: "item2", 
        content: <div>Custom Content</div>,
        value: { id: 2, name: "custom" }
      }
    ]
  }
];

<Cascader 
  groups={groups}
  onItemClick={(value, item) => {
    console.log('Selected:', value);
  }}
/>
```

## Props

### CascaderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `groups` | `CascaderGroupProps[]` | - | Array of item groups |
| `onItemClick` | `(value, item) => void` | - | Callback when item is clicked |
| `maxHeight` | `number` | `300` | Maximum height in pixels |
| `width` | `number` | `200` | Width in pixels |
| `className` | `string` | - | Additional CSS class |
| `data-testid` | `string` | - | Test identifier |

### CascaderGroupProps

| Prop | Type | Description |
|------|------|-------------|
| `groupTitle` | `ReactNode` | Optional group title (can be empty) |
| `items` | `CascaderItemProps[]` | Array of items in the group |

### CascaderItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | - | Unique identifier |
| `content` | `ReactNode` | - | Content to display (can be any ReactNode) |
| `value` | `string \| number \| object` | - | Value passed to onClick |
| `disabled` | `boolean` | `false` | Whether item is disabled |
| `interactive` | `boolean` | `false` | Set to true for interactive content (Button, etc.) |
| `onClick` | `(value, item) => void` | - | Click handler |
| `className` | `string` | - | Additional CSS class |
| `data-testid` | `string` | - | Test identifier |

## Interactive Mode

For content that is already interactive (like Button components), use the `interactive` prop to optimize performance and avoid conflicts:

```tsx
// Non-interactive content (default)
{
  key: "text-item",
  content: "Simple text option",
  value: "text"
}

// Interactive content (optimized)
{
  key: "button-item", 
  content: (
    <Button variant="ghost" size="medium">
      Interactive Button
    </Button>
  ),
  value: "button",
  interactive: true // Enables optimized mode
}
```

When `interactive: true`:
- Minimal wrapper styling to avoid conflicts
- No competing event handlers 
- Inner component handles its own accessibility
- Coordinated event handling via setTimeout

## Features

- **Flexible Content**: Items can contain any ReactNode content
- **Interactive Mode**: Optimized handling for interactive components
- **Grouping**: Items can be organized into groups with optional titles
- **Keyboard Support**: Basic keyboard navigation
- **Accessibility**: ARIA labels and proper focus management
- **Customizable**: Supports custom styling and dimensions

## Advanced Usage

See [INTERACTIVE_OPTIMIZATION.md](./INTERACTIVE_OPTIMIZATION.md) for detailed information about the interactive mode optimization. 