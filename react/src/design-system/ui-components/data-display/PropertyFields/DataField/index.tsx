import React from 'react';
import styles from './styles.module.scss';

export interface TextFieldProps {
  label: string;
  value: React.ReactNode;
  /** Text color override */
  color?: string;
  /** Font weight override */
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Font size override */
  fontSize?: 'sm' | 'base' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

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

export type DataFieldProps = TextFieldProps | DateFieldProps;

const isDateField = (props: DataFieldProps): props is DateFieldProps => {
  return props.value instanceof Date;
};

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  value, 
  color,
  fontWeight = 'normal',
  fontSize = 'base',
  className 
}) => (
  <div className={`${styles.property} ${className || ''}`}>
    <div className={styles.propertyLabel}>{label}</div>
    <div 
      className={`${styles.propertyValue} ${styles[`fontSize-${fontSize}`]} ${styles[`fontWeight-${fontWeight}`]}`}
      style={{ color }}
    >
      {value}
    </div>
  </div>
);

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

export const DataField: React.FC<DataFieldProps> = (props) => {
  if (isDateField(props)) {
    return <DateField {...props} />;
  } else {
    return <TextField {...props} />;
  }
}; 