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

const PREDEFINED_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
};

const PREDEFINED_COLORS = {
  primary: "#6592F2",
  secondary: "#6C757D",
  success: "#28A745",
  warning: "#FFC107",
  error: "#DC3545",
  info: "#17A2B8",
};

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
  // 确定实际尺寸
  const actualSize = typeof size === "number" ? size : PREDEFINED_SIZES[size];
  
  // 确定实际颜色
  const actualColor = PREDEFINED_COLORS[color as Color] || color;
  
  // 计算圆圈参数
  const center = actualSize / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  // 限制进度值在 0-100 之间
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  // 计算进度弧的长度
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;
  
  const baseClass = "lili-progress-circle";
  const classes = [
    styles[baseClass],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const progressText = text !== undefined ? text : `${Math.round(clampedProgress)}%`;

  return (
    <div 
      className={classes}
      style={{ width: actualSize, height: actualSize }}
      data-testid={dataTestId}
      {...rest}
    >
      <svg
        width={actualSize}
        height={actualSize}
        viewBox={`0 0 ${actualSize} ${actualSize}`}
        className={styles[`${baseClass}__svg`]}
      >
        <defs>
          <clipPath id={`clip-${Math.random().toString(36).substr(2, 9)}`}>
            <rect width={actualSize} height={actualSize} />
          </clipPath>
        </defs>
        
        {/* 背景圆圈 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeOpacity={backgroundOpacity}
          strokeWidth={strokeWidth}
          fill="none"
          className={styles[`${baseClass}__background`]}
        />
        
        {/* 进度圆弧 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={actualColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={styles[`${baseClass}__progress`]}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: `stroke-dashoffset ${animationDuration}ms ease-in-out`,
          }}
        />
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