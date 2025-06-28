import React from 'react';
import styles from './styles.module.scss';
import { Tag, Icon } from '../../../../ui-components';
import type { TimelineItemType } from '../../types';
import type { IssueDetailsConfig, PropertyMappingConfig } from '../../issueDetailsConfig';

interface IssueDetailsProps<T = Record<string, unknown>> {
  /** The issue/item to display */
  item: TimelineItemType<T>;
  /** Configuration object controlling how properties are displayed */
  config?: IssueDetailsConfig<T>;
}

// Default property order for timeline items
const DEFAULT_PROPERTY_ORDER = [
  'id',
  'name', 
  'startDate',
  'endDate',
  'status',
  'priority',
  'team',
  'progress',
  'category',
  'riskLevel',
  'projectKey'
];

// Default property labels
const DEFAULT_PROPERTY_LABELS: Record<string, string> = {
  id: 'ID',
  name: 'Name',
  startDate: 'Start Date',
  endDate: 'End Date',
  status: 'Status',
  priority: 'Priority',
  team: 'Team',
  progress: 'Progress',
  category: 'Category',
  riskLevel: 'Risk Level',
  projectKey: 'Project Key'
};

export function IssueDetails<T = Record<string, unknown>>({
  item,
  config = {}
}: IssueDetailsProps<T>): React.ReactElement {
  // Determine the final property order
  const finalOrder = (config.propertyOrder && config.propertyOrder.length > 0)
    ? (config.propertyOrder as string[])
    : DEFAULT_PROPERTY_ORDER;
  
  // Filter only existing properties
  const availableProperties = finalOrder.filter(key => 
    key in item && item[key as keyof typeof item] !== undefined && item[key as keyof typeof item] !== null
  );

  const formatValue = (key: string, value: unknown): React.ReactNode => {
    // Check if there's a custom formatter provided in config
    const mappingConfig = config.propertyMappings?.[key as keyof T | string] as PropertyMappingConfig | undefined;
    if (mappingConfig?.formatter) {
      return mappingConfig.formatter(value);
    }

    // Check if there's a mapping for this property
    const mapping = mappingConfig?.valueMapping;
    if (mapping && typeof value === 'string' && mapping[value]) {
      const mapped = mapping[value];
      return (
        <Tag 
          color={mapped.color} 
          variant="contained"
        >
          {mapped.icon && <Icon name={mapped.icon} />}
          {mapped.name}
        </Tag>
      );
    }

    // Handle different data types
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (key === 'progress' && typeof value === 'number') {
      return (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className={styles.progressText}>{value}%</span>
        </div>
      );
    }

    return String(value);
  };

  const getLabel = (key: string): string => {
    const mappingConfig = config.propertyMappings?.[key as keyof T | string] as PropertyMappingConfig | undefined;
    return mappingConfig?.label || DEFAULT_PROPERTY_LABELS[key] || key;
  };

  return (
    <div className={styles.issueDetails}>
      <div className={styles.properties}>
        {availableProperties.map((key) => {
          const value = item[key as keyof typeof item];
          return (
            <div key={key} className={styles.property}>
              <div className={styles.propertyLabel}>
                {getLabel(key)}
              </div>
              <div className={styles.propertyValue}>
                {formatValue(key, value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 