import React from "react";

import styles from "./styles.module.scss";
import type { BaseComponentProps, Color, Size } from "../../types";

export interface ProgressCircleProps extends BaseComponentProps {
  /** 进度值，范围 0-100 */
  progress?: number;
  /** 尺寸 */
  size?: Size | number;
  /** 进度条颜色 */
  color?: Color | string;
  /** 背景圆圈颜色 */
  backgroundColor?: string;
  /** 背景圆圈透明度 */
  backgroundOpacity?: number;
  /** 线条粗细 */
  strokeWidth?: number;
  /** 是否显示进度文字 */
  showText?: boolean;
  /** 自定义进度文字 */
  text?: string;
  /** 动画持续时间（毫秒） */
  animationDuration?: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress = 0,
  size = "medium",
  color = "primary",
  backgroundColor = "white",
  backgroundOpacity = 0.03,
  strokeWidth = 2,
  showText = false,
  text,
  animationDuration = 300,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  // 限制进度值在 0-100 之间
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  const baseClass = "lili-progress-circle";
  const classes = [
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const progressText = text !== undefined ? text : `${Math.round(clampedProgress)}%`;

  return (
    <div 
      className={classes}
      data-testid={dataTestId}
      style={{
        '--progress': clampedProgress,
        '--background-color': backgroundColor,
        '--background-opacity': backgroundOpacity,
        '--stroke-width': `${strokeWidth}px`,
        '--animation-duration': `${animationDuration}ms`,
      } as React.CSSProperties}
      {...rest}
    >
      <svg className={styles[`${baseClass}__svg`]}>
        {/* 背景圆圈 */}
        <circle className={styles[`${baseClass}__background`]} />
        
        {/* 进度圆弧 */}
        <circle className={styles[`${baseClass}__progress`]} />
      </svg>
      
      {/* 进度文字 */}
      {showText && (
        <div className={styles[`${baseClass}__text`]}>
          {progressText}
        </div>
      )}
    </div>
  );
}; 