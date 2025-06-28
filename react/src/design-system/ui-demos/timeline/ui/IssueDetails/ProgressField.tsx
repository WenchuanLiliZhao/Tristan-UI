import React from 'react';
import styles from './styles.module.scss';

interface ProgressFieldProps {
  label: string;
  value: number;
}

export const ProgressField: React.FC<ProgressFieldProps> = ({ label, value }) => {
  const progressValue = Math.max(0, Math.min(100, value));
  const fillColor = progressValue >= 100 ? 'var(--color--semantic-success)' : 'var(--color--semantic-active)';

  return (
    <div className={styles.property}> 
      <div className={styles.propertyLabel}>{label}</div>
      <div className={styles.propertyValue}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressValue}%`, backgroundColor: fillColor }} />
          </div>
          <span className={styles.progressText}>{progressValue}%</span>
        </div>
      </div>
    </div>
  );
}; 