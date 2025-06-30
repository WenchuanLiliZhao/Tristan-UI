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