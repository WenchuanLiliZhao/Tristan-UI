import React from 'react';
import type { BaseComponentProps } from '../../types';
import styles from './styles.module.scss';

export interface FloatingButtonGroupProps extends BaseComponentProps {
  /** Array of React elements (typically buttons) */
  items: React.ReactNode[];
  /** Position of the floating group */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Whether to show the group (for conditional visibility) */
  visible?: boolean;
}

/**
 * FloatingButtonGroup Component
 * 
 * A floating group of React elements that can be positioned anywhere on the screen.
 * Commonly used for quick actions, view controls, or navigation shortcuts.
 * 
 * @example
 * ```tsx
 * <FloatingButtonGroup
 *   items={[
 *     <Button>Day</Button>,
 *     <Button>Month</Button>,
 *     <Button>Year</Button>
 *   ]}
 *   position="bottom-right"
 * />
 * ```
 */
export const FloatingButtonGroup: React.FC<FloatingButtonGroupProps> = ({
  items,
  position = 'bottom-right',
  visible = true,
  className,
  'data-testid': dataTestId,
  ...rest
}) => {
  if (!visible || items.length === 0) {
    return null;
  }

  const containerClasses = [
    styles['floating-button-group'],
    styles[`floating-button-group--${position}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      data-testid={dataTestId}
      {...rest}
    >
      <div className={styles['floating-button-group__container']}>
        {items.map((item, index) => (
          <div key={index} className={styles['floating-button-group__item']}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingButtonGroup;
