import React from 'react';
import { Tag, Icon } from '../../general';
import styles from './styles.module.scss';

export interface TagFieldProps {
  label: string;
  name: string;
  color: string;
  icon?: string;
  /** Tag variant */
  variant?: 'contained' | 'outlined';
}

export const TagField: React.FC<TagFieldProps> = ({ 
  label, 
  name, 
  color, 
  icon,
  variant = 'contained'
}) => (
  <div className={styles.property}> 
    <div className={styles.propertyLabel}>{label}</div>
    <div className={styles.propertyValue}>
      <Tag color={color} variant={variant}>
        {icon && <Icon name={icon} />} {name}
      </Tag>
    </div>
  </div>
); 