import React, { type ReactNode } from "react";
import styles from "./styles.module.scss";
import { type BaseComponentProps } from "../../types";

// ========== Cascader Item Types ==========

export interface CascaderItemProps extends BaseComponentProps {
  key: string;
  content: ReactNode;
  value?: string | number | object;
  disabled?: boolean;
  onClick?: (value: string | number | object | undefined, item: CascaderItemProps) => void;
  /** 
   * Set to true when content is already an interactive component (Button, etc.)
   * This will render content directly without CascaderItem wrapper events
   */
  interactive?: boolean;
}

export interface CascaderGroupProps {
  groupTitle?: ReactNode;
  items: CascaderItemProps[];
}

// ========== Cascader Item Component ==========

export const CascaderItem: React.FC<CascaderItemProps> = ({
  content,
  value,
  disabled = false,
  onClick,
  interactive = false,
  className,
  'data-testid': dataTestId,
}) => {
  // For interactive content, use minimal wrapper without competing event handlers
  if (interactive) {
    const handleInteractiveClick = () => {
      // Only trigger cascader onClick if the click wasn't handled by inner content
      // We use a slight delay to let the inner component handle its click first
      setTimeout(() => {
        if (!disabled && onClick) {
          onClick(value, { key: '', content, value, disabled, onClick, interactive });
        }
      }, 0);
    };

    return (
      <div
        className={`${styles["cascader-item"]} ${styles["cascader-item--interactive"]} ${disabled ? styles["cascader-item--disabled"] : ""} ${className || ""}`}
        onClick={handleInteractiveClick}
        data-testid={dataTestId}
      >
        {content}
      </div>
    );
  }

  // Non-interactive content: traditional CascaderItem behavior
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && onClick) {
      onClick(value, { key: '', content, value, disabled, onClick, interactive });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled && onClick) {
        onClick(value, { key: '', content, value, disabled, onClick, interactive });
      }
    }
  };

  return (
    <div
      className={`${styles["cascader-item"]} ${disabled ? styles["cascader-item--disabled"] : ""} ${className || ""}`}
      onClick={disabled ? undefined : handleClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      data-testid={dataTestId}
      {...(disabled && { 'aria-disabled': 'true' })}
    >
      {content}
    </div>
  );
};

// ========== Cascader Component ==========

interface CascaderProps extends BaseComponentProps {
  groups: CascaderGroupProps[];
  onItemClick?: (value: string | number | object | undefined, item: CascaderItemProps) => void;
  maxHeight?: number;
  width?: number;
}

export const Cascader: React.FC<CascaderProps> = ({
  groups,
  onItemClick,
  maxHeight = 300,
  width = 200,
  className,
  'data-testid': dataTestId,
}) => {
  const handleItemClick = (value: string | number | object | undefined, item: CascaderItemProps) => {
    if (onItemClick) {
      onItemClick(value, item);
    }
  };

  return (
    <div
      className={`${styles["cascader"]} ${className || ""}`}
      style={{ maxHeight, width }}
      data-testid={dataTestId}
    >
      <div className={styles["cascader-content"]}>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles["cascader-group"]}>
            {group.groupTitle && (
              <div className={styles["cascader-group-title"]}>
                {group.groupTitle}
              </div>
            )}
            <div className={styles["cascader-group-items"]}>
              {group.items.map((item) => (
                <CascaderItem
                  key={item.key}
                  content={item.content}
                  value={item.value}
                  disabled={item.disabled}
                  onClick={handleItemClick}
                  className={item.className}
                  data-testid={item['data-testid']}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 