import React from 'react';
import styles from './styles.module.scss';
import { iconRegistry } from './_iconRegistry';

export interface IconProps {
  /** 图标名称 */
  name: string;
  /** 图标大小 */
  size?: number | 'small' | 'medium' | 'large';
  /** 图标颜色 */
  color?: string;
  /** 描边粗细 */
  strokeWidth?: number;
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 旋转角度 */
  rotate?: number;
}

// 获取尺寸值
const getSizeValue = (size: IconProps['size']): number => {
  switch (size) {
    case 'small': return 16;
    case 'medium': return 24;
    case 'large': return 32;
    default: return typeof size === 'number' ? size : 24;
  }
};

/**
 * Icon 组件 - 统一的图标系统
 * 
 * @example
 * ```tsx
 * <Icon name="circle" size="large" color="#007bff" />
 * <Icon name="arrow" size={32} onClick={handleClick} />
 * <Icon name="ellipsis-vertical" strokeWidth={1.5} color="#666" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'medium', 
  color = 'currentColor',
  strokeWidth = 1,
  className = '',
  onClick,
  disabled = false,
  rotate = 0
}) => {
  const sizeValue = getSizeValue(size);
  const sizeClass = typeof size === 'string' ? styles[`icon--${size}`] : '';
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // 检查图标是否存在
  if (!iconRegistry[name]) {
    console.warn(`Icon "${name}" not found in registry. Available icons:`, Object.keys(iconRegistry));
    return null;
  }

  return (
    <span 
      className={`
        ${styles["icon"]} 
        ${sizeClass} 
        ${onClick ? styles["icon--clickable"] : ''} 
        ${disabled ? styles["icon--disabled"] : ''} 
        ${className}
      `.trim()}
      style={{ 
        color,
        width: sizeValue,
        height: sizeValue,
        fontSize: sizeValue,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        cursor: onClick && !disabled ? 'pointer' : undefined
      }}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `${name} button` : name}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {iconRegistry[name](strokeWidth)}
    </span>
  );
};

// 导出可用的图标名称
// eslint-disable-next-line react-refresh/only-export-components
export const availableIcons = Object.keys(iconRegistry); 