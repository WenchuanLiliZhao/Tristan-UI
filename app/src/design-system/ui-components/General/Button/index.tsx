import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Size } from "../../types";
import { Icon } from "../Icon";
import { HoverBox } from "../../shared/HoverBox";

export interface ButtonProps extends BaseComponentProps {
  children?: React.ReactNode;
  /** Button mode/variant - matches Figma "mode" property */
  variant?: "filled" | "outlined" | "ghost";
  /** Button size */
  size?: Size;
  /** Semantic color variant - matches Figma "semantic" property */
  semantic?: "default" | "success" | "active" | "warning" | "error";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Icon to display (when showIcon is true) */
  icon?: string;
  /** Decorative icon to display (when showDecoIcon is true) */
  decoIcon?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "outlined",
  size = "medium",
  semantic = "default",
  disabled = false,
  icon,
  decoIcon,
  onClick,
  type = "button",
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  const baseClass = "tristan-button";
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${semantic}`],
    disabled && styles[`${baseClass}--disabled`],
    className,
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestId}
      {...rest}
    >
      {icon && <span className={styles[`${baseClass}__icon`]}><Icon name={icon} /></span>}
      <span className={styles[`${baseClass}__content`]}>
        {children}
      </span>
      {decoIcon && <span className={styles[`${baseClass}__icon`]}><Icon name={decoIcon} /></span>}
      <HoverBox className={styles["hover-box"]}/>
    </button>
  );
}; 