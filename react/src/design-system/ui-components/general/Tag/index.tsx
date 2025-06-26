import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Color, Size } from "../../types";
import { type RainbowColorName } from "../../../../styles/color";

export interface TagProps extends BaseComponentProps {
  children?: React.ReactNode;
  variant?: "contained" | "outlined";
  size?: Size;
  color?: Color | RainbowColorName | string;
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
  // 定义预定义颜色列表（只保留核心语义颜色）
  const predefinedColors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  const isPredefinedColor = predefinedColors.includes(color as string);

  const baseClass = "lili-tag";
  
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${variant}`],
    styles[`${baseClass}--${size}`],
    // 只有预定义颜色才使用颜色类
    isPredefinedColor && styles[`${baseClass}--${color}`],
    disabled && styles[`${baseClass}--disabled`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // 构建动态样式对象
  const componentStyle = !isPredefinedColor && color ? {
    '--element-color': (color as string).startsWith('--') ? `var(${color})` : color,
  } as React.CSSProperties : {};

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
      style={componentStyle}
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