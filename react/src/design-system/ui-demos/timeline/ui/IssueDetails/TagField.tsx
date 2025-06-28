import React from 'react';
import { Tag, Icon } from '../../../../ui-components';
import styles from './styles.module.scss';

interface TagFieldProps {
  label: string;
  name: string;
  color: string;
  icon?: string;
}

export const TagField: React.FC<TagFieldProps> = ({ label, name, color, icon }) => (
  <div className={styles.property}> 
    <div className={styles.propertyLabel}>{label}</div>
    <div className={styles.propertyValue}>
      <Tag color={color} variant="contained">
        {icon && <Icon name={icon} />} {name}
      </Tag>
    </div>
  </div>
); 