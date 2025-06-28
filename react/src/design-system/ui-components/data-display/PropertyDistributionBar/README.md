# PropertyDistributionBar

A flexible data visualization component that displays the distribution of property values as a horizontal bar chart.

## Features

- 📊 **Visual Distribution**: Shows data distribution as proportional colored segments
- 🎨 **Customizable Colors**: Support for CSS variables, hex colors, and custom mappings
- 📱 **Responsive Design**: Adapts to different screen sizes
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🎯 **Interactive**: Optional click handlers and hover effects
- 📈 **Smart Grouping**: Automatically merge small segments into "Others"
- 🔧 **Highly Configurable**: Multiple styling and behavior options

## Basic Usage

```tsx
import { PropertyDistributionBar } from '@/ui-components';

const data = [
  { status: 'active', team: 'engineering' },
  { status: 'inactive', team: 'design' },
  { status: 'active', team: 'engineering' },
  // ...more data
];

const statusMapping = {
  active: { name: 'Active', color: '#22c55e' },
  inactive: { name: 'Inactive', color: '#ef4444' },
  pending: { name: 'Pending', color: '#f59e0b' }
};

<PropertyDistributionBar
  data={data}
  field="status"
  mapping={statusMapping}
  label="Status Distribution"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<Record<string, unknown>>` | - | Array of data objects to analyze |
| `field` | `string` | - | Property name to analyze distribution for |
| `mapping` | `PropertyDistributionMapping` | - | Maps field values to display names and colors |
| `label` | `string` | - | Optional label displayed above the bar |
| `showLegend` | `boolean` | `false` | Show legend with counts below the bar |
| `height` | `number` | `4` | Height of the distribution bar in pixels |
| `enableHover` | `boolean` | `true` | Enable hover effects on segments |
| `className` | `string` | - | Additional CSS class name |
| `borderRadius` | `number` | `2` | Border radius of the bar in pixels |
| `minPercentage` | `number` | `0` | Minimum percentage to show; smaller segments are grouped as "Others" |
| `sortBy` | `'count' \| 'name' \| 'value' \| function` | `'count'` | How to sort the segments |
| `onSegmentClick` | `(segment: PropertyDistributionSegment) => void` | - | Callback when a segment is clicked |

## Advanced Usage

### With Custom Sorting

```tsx
<PropertyDistributionBar
  data={teamData}
  field="priority"
  mapping={priorityMapping}
  sortBy={(a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.value] - order[b.value];
  }}
/>
```

### With Legend and Click Handling

```tsx
<PropertyDistributionBar
  data={projectData}
  field="team"
  mapping={teamMapping}
  label="Team Distribution"
  showLegend={true}
  onSegmentClick={(segment) => {
    console.log(`Clicked ${segment.name}: ${segment.count} items`);
  }}
/>
```

### Custom Styling

```tsx
<PropertyDistributionBar
  data={data}
  field="category"
  mapping={categoryMapping}
  height={8}
  borderRadius={4}
  className="my-custom-distribution"
  minPercentage={5} // Group segments < 5% as "Others"
/>
```

### Using Design System Colors

```tsx
import { getRainbowColor, getSemanticColor } from '@/styles';

const statusMapping = {
  active: { 
    name: 'Active', 
    color: getSemanticColor('success') 
  },
  error: { 
    name: 'Error', 
    color: getRainbowColor('rose') 
  },
  pending: { 
    name: 'Pending', 
    color: getRainbowColor('amber') 
  }
};
```

## Types

### PropertyDistributionSegment

```tsx
interface PropertyDistributionSegment {
  value: string;      // Original field value
  count: number;      // Number of items with this value
  percentage: number; // Percentage of total
  color: string;      // Display color
  name: string;       // Display name
}
```

### PropertyDistributionMapping

```tsx
interface PropertyDistributionMapping {
  [key: string]: {
    name: string;   // Display name
    color: string;  // CSS color value
  };
}
```

## Styling

The component supports CSS modules and custom styling through:

- CSS variables for colors and spacing
- `className` prop for custom classes
- Style variants through CSS classes:
  - `.variant-compact` - Smaller, more compact layout
  - `.variant-large` - Larger, more spacious layout

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- Focus indicators
- Color contrast compliance

## Examples

### Simple Status Bar
```tsx
<PropertyDistributionBar
  data={tickets}
  field="status"
  mapping={{
    open: { name: 'Open', color: '#3b82f6' },
    closed: { name: 'Closed', color: '#10b981' },
    pending: { name: 'Pending', color: '#f59e0b' }
  }}
  label="Ticket Status"
/>
```

### Interactive Team Distribution
```tsx
<PropertyDistributionBar
  data={employees}
  field="department"
  mapping={departmentColors}
  label="Department Distribution"
  showLegend={true}
  height={6}
  onSegmentClick={(segment) => {
    setSelectedDepartment(segment.value);
  }}
/>
``` 