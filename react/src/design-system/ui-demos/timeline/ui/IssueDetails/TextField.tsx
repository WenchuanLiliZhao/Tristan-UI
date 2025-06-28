import React from 'react';
import styles from './styles.module.scss';

interface TextFieldProps {
  label: string;
  value: React.ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({ label, value }) => (
  <div className={styles.property}>
    <div className={styles.propertyLabel}>{label}</div>
    <div className={styles.propertyValue}>{value}</div>
  </div>
); 