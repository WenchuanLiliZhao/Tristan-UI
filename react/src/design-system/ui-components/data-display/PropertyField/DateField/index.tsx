import type { DateFieldProps } from "..";
import React from 'react';

// DateField Component
export const DateField: React.FC<DateFieldProps> = ({ 
  value, 
  format = 'short',
  locale,
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
    <>{formatDate(value)}</>
  );
};
