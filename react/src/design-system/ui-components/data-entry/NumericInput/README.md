# NumericInput

A specialized input component for numeric values with icon support, keyboard controls, and optional units.

## Features

- **Icon Support**: Display Lucide icons alongside the input
- **Keyboard Controls**: Use arrow keys (↑/↓) to increment/decrement values
- **Unit Display**: Optional unit text displayed after the value
- **Validation**: Built-in min/max constraints
- **Accessibility**: Full keyboard navigation and screen reader support
- **Theme Support**: Consistent with Tristan-UI design system

## Usage

```tsx
import { NumericInput } from '@tristan-ui/data-entry';

// Basic usage
<NumericInput 
  icon="trending-up"
  label="Growth Rate"
  value={5.2}
  unit="%"
  step={0.1}
  onChange={(value) => console.log(value)}
/>

// With constraints
<NumericInput 
  icon="target"
  label="Target Score"
  value={85}
  min={0}
  max={100}
  step={5}
  required
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'outlined' \| 'filled' \| 'ghost'` | `'outlined'` | Visual style variant |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Component size |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `icon` | `string` | - | Lucide icon name to display |
| `label` | `string` | - | Label text for the input |
| `value` | `number` | - | Controlled numeric value |
| `defaultValue` | `number` | `0` | Default value for uncontrolled mode |
| `min` | `number` | - | Minimum allowed value |
| `max` | `number` | - | Maximum allowed value |
| `step` | `number` | `1` | Increment step for keyboard controls |
| `unit` | `string` | - | Unit text to display after the value |
| `required` | `boolean` | `false` | Whether the value is required |
| `placeholder` | `string` | `''` | Placeholder text |
| `onChange` | `(value: number, event: ChangeEvent) => void` | - | Called when value changes |
| `onEnter` | `(value: number) => void` | - | Called when Enter is pressed |
| `onFocus` | `(event: FocusEvent) => void` | - | Called when input is focused |
| `onBlur` | `(event: FocusEvent) => void` | - | Called when input loses focus |
| `onKeyDown` | `(event: KeyboardEvent) => void` | - | Called when any key is pressed |

## Keyboard Controls

- **↑ Arrow**: Increment value by step amount
- **↓ Arrow**: Decrement value by step amount
- **Enter**: Trigger onEnter callback
- **Tab**: Standard focus navigation

## Design Considerations

- Values are right-aligned for better readability
- Icons use Lucide icon set for consistency
- Unit text is styled as secondary text
- Focus states use semantic active colors
- Disabled state reduces opacity and prevents interaction
- Required fields show a red asterisk indicator

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators for keyboard users
- High contrast mode support
- Reduced motion support for users with vestibular disorders 