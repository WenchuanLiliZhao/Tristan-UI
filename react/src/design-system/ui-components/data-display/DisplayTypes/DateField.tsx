import React from 'react';
import { TextField } from './TextField';

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

export const DateField: React.FC<DateFieldProps> = ({ 
  label, 
  value, 
  format = 'short',
  locale,
  color 
}) => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      short: { month: 'numeric', day: 'numeric', year: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { month: 'long', day: 'numeric', year: 'numeric' },
      full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    }[format] as Intl.DateTimeFormatOptions;

    return date.toLocaleDateString(locale, options);
  };

  return (
    <TextField 
      label={label} 
      value={formatDate(value)} 
      color={color}
    />
  );
}; 