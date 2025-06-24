import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Size } from "../../types";

// Updated semantic color types to match Figma
export type ButtonSemantic = "default" | "success" | "active" | "warning" | "error";

// Updated variant to match Figma "mode" property
export type ButtonVariant = "filled" | "outlined" | "text";

export interface ButtonProps extends BaseComponentProps {
  /** Button mode/variant - matches Figma "mode" property */
  variant?: ButtonVariant;
  /** Button size */
  size?: Size;
  /** Semantic color variant - matches Figma "semantic" property */
  semantic?: ButtonSemantic;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Whether to show an icon - matches Figma "show icon" property */
  showIcon?: boolean;
  /** Whether to show text content - matches Figma "show text" property */
  showText?: boolean;
  /** Whether to show decorative icon - matches Figma "show deco icon" property */
  showDecoIcon?: boolean;
  /** Icon to display (when showIcon is true) */
  icon?: React.ReactNode;
  /** Decorative icon to display (when showDecoIcon is true) */
  decoIcon?: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  size = "medium",
  semantic = "default",
  disabled = false,
  loading = false,
  showIcon = true,
  showText = true,
  showDecoIcon = true,
  icon,
  decoIcon,
  onClick,
  type = "button",
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  const baseClass = "lili-button";
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${semantic}`],
    disabled && styles[`${baseClass}--disabled`],
    loading && styles[`${baseClass}--loading`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      data-testid={dataTestId}
      {...rest}
    >
      {loading && <span className={styles[`${baseClass}__spinner`]}>⟳</span>}
      {showIcon && icon && <span className={styles[`${baseClass}__icon`]}>{icon}</span>}
      {showText && <span className={styles[`${baseClass}__content`]}>{children}</span>}
      {showDecoIcon && decoIcon && <span className={styles[`${baseClass}__deco-icon`]}>{decoIcon}</span>}
    </button>
  );
}; 