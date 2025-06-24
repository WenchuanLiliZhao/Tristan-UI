import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Color, Size } from "../../types";
import { getRainbowColor, type RainbowColorName } from "../../../../styles/color";

export interface TagProps extends BaseComponentProps {
  variant?: "contained" | "outlined";
  size?: Size;
  color?: Color | RainbowColorName;
  closable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  closable = false,
  onClose,
  disabled = false,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  const baseClass = "lili-tag";
  
  // 检查是否是 rainbow 颜色
  const isRainbowColor = color && ['amber', 'orange', 'rose', 'pink', 'purple', 'blue', 'cyan', 'emerald'].includes(color);
  
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    !isRainbowColor && styles[`${baseClass}--${color}`],
    disabled && styles[`${baseClass}--disabled`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 为 rainbow 颜色生成自定义样式
  const rainbowStyle = isRainbowColor ? {
    backgroundColor: variant === "contained" ? `var(${getRainbowColor(color as RainbowColorName)}-pale)` : "transparent",
    color: `var(${getRainbowColor(color as RainbowColorName)})`,
    border: `1px solid var(${getRainbowColor(color as RainbowColorName)}-half)`,
  } : {};

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && onClose) {
      onClose();
    }
  };

  return (
    <span
      className={classes}
      style={isRainbowColor ? rainbowStyle : undefined}
      data-testid={dataTestId}
      {...rest}
    >
      <span className={styles[`${baseClass}__content`]}>{children}</span>
      {closable && (
        <button
          type="button"
          className={styles[`${baseClass}__close`]}
          onClick={handleClose}
          disabled={disabled}
          aria-label="删除标签"
        >
          ×
        </button>
      )}
    </span>
  );
}; 