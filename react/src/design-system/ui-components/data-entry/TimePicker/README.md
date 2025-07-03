# TimePicker

A flexible time picker component that allows users to select start and end dates with automatic focus progression.

## Features

- **Date Range Selection**: Select both start and end dates
- **Auto Focus Progression**: Automatically focuses the next input field when current field is complete
- **YYYY-MM-DD Format**: Structured date input with clear separation
- **Keyboard Navigation**: Support for Tab, Arrow keys, and Enter
- **Input Validation**: Basic validation for month (01-12) and day (01-31) ranges
- **Responsive Design**: Adapts to mobile devices with vertical layout
- **Accessibility**: Proper ARIA labels and keyboard support
- **Multiple Sizes**: Supports tiny, small, medium, and large sizes

## Usage

### Basic Usage

```tsx
import { TimePicker } from '@/design-system/ui-components/data-entry';

function MyComponent() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <TimePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
    />
  );
}
```

### With Custom Placeholders

```tsx
<TimePicker
  startDatePlaceholder="开始日期"
  endDatePlaceholder="结束日期"
  startDate={startDate}
  endDate={endDate}
  onChange={(start, end) => {
    console.log('Date range:', start, end);
  }}
/>
```

### Different Sizes

```tsx
<TimePicker size="tiny" />
<TimePicker size="small" />
<TimePicker size="medium" /> {/* default */}
<TimePicker size="large" />
```

### With Auto Focus

```tsx
<TimePicker
  autoFocus
  startDate={startDate}
  endDate={endDate}
  onEnter={(start, end) => {
    console.log('Form submitted with dates:', start, end);
  }}
/>
```

### Disabled State

```tsx
<TimePicker
  disabled
  startDate="2024-01-01"
  endDate="2024-12-31"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the time picker |
| `disabled` | `boolean` | `false` | Whether the time picker is disabled |
| `startDate` | `string` | `''` | Start date value in YYYY-MM-DD format |
| `endDate` | `string` | `''` | End date value in YYYY-MM-DD format |
| `startDatePlaceholder` | `string` | `'Start Date'` | Placeholder for start date |
| `endDatePlaceholder` | `string` | `'End Date'` | Placeholder for end date |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `style` | `React.CSSProperties` | - | Custom styles |
| `className` | `string` | `''` | Additional CSS classes |
| `data-testid` | `string` | - | Test identifier |

## Event Handlers

| Handler | Type | Description |
|---------|------|-------------|
| `onStartDateChange` | `(date: string) => void` | Called when start date changes |
| `onEndDateChange` | `(date: string) => void` | Called when end date changes |
| `onChange` | `(startDate: string, endDate: string) => void` | Called when any date changes |
| `onEnter` | `(startDate: string, endDate: string) => void` | Called when Enter key is pressed |

## Input Format

The component expects and returns dates in `YYYY-MM-DD` format:
- **Year**: 4 digits (e.g., 2024)
- **Month**: 2 digits, 01-12 (e.g., 03 for March)
- **Day**: 2 digits, 01-31 (e.g., 15)

Example: `2024-03-15`

## Keyboard Navigation

- **Tab/Arrow Right**: Move to next input field
- **Arrow Left**: Move to previous input field
- **Enter**: Complete current date and trigger onEnter
- **Auto Focus**: Automatically moves to next field when current field is complete

## Auto Focus Behavior

1. Year → Month (when 4 digits are entered)
2. Month → Day (when 2 digits are entered)
3. Start Date → End Date (when start date day is complete)
4. End Date → onEnter callback (when end date day is complete)

## Validation

- **Month**: Automatically constrains to 01-12 range
- **Day**: Automatically constrains to 01-31 range
- **Year**: Accepts any 4-digit number
- **Format**: Only accepts numeric input for date fields

## Responsive Design

On mobile devices (< 768px):
- Layout changes to vertical stack
- Arrow icon rotates 90 degrees
- Fields take full width
- Maintains functionality and accessibility

## Accessibility

- Proper ARIA labels for each input field
- Keyboard navigation support
- Focus management with visual indicators
- Screen reader friendly structure
- Disabled state handling

## Styling

The component uses CSS modules with the following class structure:

```scss
.tristan-time-picker
├── .tristan-time-picker__field
│   ├── .tristan-time-picker__label
│   └── .tristan-date-input
│       ├── .tristan-date-input__year
│       ├── .tristan-date-input__month
│       ├── .tristan-date-input__day
│       └── .tristan-date-input__separator
└── .tristan-time-picker__arrow
```

## CSS Custom Properties

The component uses the following CSS variables from the design system:

- `--color--bg-prime`: Background color
- `--color--border-prime`: Border color
- `--color--border-secondary`: Hover border color
- `--color--text-prime`: Primary text color
- `--color--text-secondary`: Secondary text color
- `--color--text-tertiary`: Placeholder text color
- `--color--semantic-active`: Active/focus color
- `--color--semantic-active-pale`: Active/focus background color

## Examples

### Controlled Component

```tsx
function DateRangeForm() {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({ start: startDate, end: endDate });
  };

  return (
    <form>
      <TimePicker
        startDate={dateRange.start}
        endDate={dateRange.end}
        onChange={handleDateChange}
        onEnter={(start, end) => {
          console.log('Submitting date range:', { start, end });
        }}
      />
    </form>
  );
}
```

### With Validation

```tsx
function ValidatedTimePicker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const validateDateRange = (start: string, end: string) => {
    if (start && end && start > end) {
      setError('Start date must be before end date');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <TimePicker
        startDate={startDate}
        endDate={endDate}
        onChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
          validateDateRange(start, end);
        }}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
``` 