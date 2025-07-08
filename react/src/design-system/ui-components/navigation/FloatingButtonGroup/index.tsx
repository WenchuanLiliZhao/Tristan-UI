import React, { useState } from "react";
import type { BaseComponentProps } from "../../types";
import styles from "./styles.module.scss";
import { Button, ButtonGroupDevider } from "../../general";

export interface FloatingButtonGroupProps extends BaseComponentProps {
  /** Array of React elements (typically buttons) */
  itemGroups: React.ReactNode[][];
  /** Position of the floating group */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Whether to show the group (for conditional visibility) */
  visible?: boolean;
  canBeHidden?: boolean;
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
  itemGroups,
  position = "bottom-right",
  visible = true,
  className,
  "data-testid": dataTestId,
  canBeHidden = true,
  ...rest
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (!visible || itemGroups.length === 0) {
    return null;
  }

  const containerClasses = [
    styles["floating-button-group"],
    styles[`floating-button-group--${position}`],
    isCollapsed && canBeHidden ? styles.hidden : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} data-testid={dataTestId} {...rest}>
      <div className={styles["container"]}>
        {(position === "bottom-left" || position === "top-left") && (
          <>
            {canBeHidden && (
              <Button
                icon={isCollapsed ? "chevron_right" : "chevron_left"}
                variant="ghost"
                onClick={handleToggle}
              />
            )}
            {!isCollapsed && canBeHidden && itemGroups.length > 0 && (
              <ButtonGroupDevider />
            )}
          </>
        )}
        {!isCollapsed &&
          itemGroups.map((itemGroup, index) => (
            <div key={index} className={styles["item-group"]}>
              {index > 0 && <ButtonGroupDevider />}
              {itemGroup.map((item, index) => (
                <div key={index} className={styles["item"]}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        {(position === "bottom-right" || position === "top-right") && (
          <>
            {!isCollapsed && canBeHidden && itemGroups.length > 0 && (
              <ButtonGroupDevider />
            )}
            {canBeHidden && (
              <Button
                icon={isCollapsed ? "chevron_left" : "chevron_right"}
                variant="ghost"
                onClick={handleToggle}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingButtonGroup;
