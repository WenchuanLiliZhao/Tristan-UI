import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Color, Size } from "../../types";

export interface ButtonProps extends BaseComponentProps {
  variant?: "contained" | "outlined" | "text";
  size?: Size;
  color?: Color;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  disabled = false,
  loading = false,
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
    styles[`${baseClass}--${color}`],
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
      <span className={styles[`${baseClass}__content`]}>{children}</span>
    </button>
  );
}; 