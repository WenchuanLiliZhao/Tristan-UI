// Import TextField types for internal use

// Property Field Components
export { ProgressField, PropertyField } from './ProgressField';
export { TagField } from './TagField';
export { TextField } from './TextField';
export { DateField } from './DateField';

// Export all types
export type { 
  ProgressFieldProps,
  PropertyFieldProps 
} from './ProgressField';
export type { TagFieldProps } from './TagField';
export type { TextFieldProps } from './TextField';

// DataField specific types (for external usage)
export interface DateFieldProps {
  label: string;
  value: Date;
  /** Date format: 'short' | 'medium' | 'long' | 'full' */
  format?: 'short' | 'medium' | 'long' | 'full';
  /** Locale for date formatting */
  locale?: string;
  /** Text color override */
  color?: string;
} 