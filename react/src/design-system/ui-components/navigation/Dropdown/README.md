# Dropdown Component

A flexible dropdown component that uses Cascader as its menu content. Click-triggered only.

## Usage

```tsx
import { Dropdown, CascaderGroupProps } from '@/ui-components';

const groups: CascaderGroupProps[] = [
  {
    groupTitle: "Group 1",
    items: [
      {
        key: "item1",
        content: <span>Option 1</span>,
        value: "option1"
      }
    ]
  }
];

<Dropdown
  trigger={<button>Click me</button>}
  groups={groups}
  onItemClick={(value) => {
    console.log('Selected:', value);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | - | The element that triggers the dropdown |
| `groups` | `CascaderGroupProps[]` | - | Array of cascader groups for the menu |
| `position` | `Position` | `"bottom-start"` | Where to position the dropdown | 