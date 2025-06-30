import React from 'react';
import styles from './ProgressField.module.scss';

export interface ProgressFieldProps {
  label: string;
  value: number;
  /** Progress bar color */
  color?: string;
  /** Show percentage text */
  showText?: boolean;
  /** Progress bar height */
  height?: 'sm' | 'md' | 'lg';
  /** Progress bar variant */
  variant?: 'default' | 'rounded' | 'square';
}

export const ProgressField: React.FC<ProgressFieldProps> = ({ 
  label, 
  value, 
  color,
  showText = true,
  height = 'md',
  variant = 'default'
}) => {
  const progressValue = Math.max(0, Math.min(100, value));
  const fillColor = color || (progressValue >= 100 ? 'var(--color--semantic-success)' : 'var(--color--semantic-active)');

  return (
    <div className={styles.property}> 
      <div className={styles.propertyLabel}>{label}</div>
      <div className={styles.propertyValue}>
        <div className={styles.progressContainer}>
          <div className={`${styles.progressBar} ${styles[`height-${height}`]} ${styles[`variant-${variant}`]}`}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progressValue}%`, backgroundColor: fillColor }} 
            />
          </div>
          {showText && (
            <span className={styles.progressText}>{progressValue}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Legacy export for backward compatibility
export const PropertyField = ProgressField;
export type PropertyFieldProps = ProgressFieldProps; 