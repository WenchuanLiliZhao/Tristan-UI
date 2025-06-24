import React from 'react';
import styles from './styles.module.scss';
import './fonts/material-icons.scss';

export interface IconProps {
  /** 图标名称 - 使用 Material Icons 的官方名称 */
  name: string;
  /** 图标大小 */
  size?: number | 'small' | 'medium' | 'large';
  /** 图标颜色 */
  color?: string;
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
 * Icon 组件 - 基于 Material Icons 字体的图标系统
 * 
 * @example
 * ```tsx
 * <Icon name="home" size="large" color="#007bff" />
 * <Icon name="person" onClick={() => console.log('clicked')} />
 * <Icon name="chevron_left" rotate={90} />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color = 'inherit',
  className = '',
  onClick,
  disabled = false,
  rotate = 0,
  ...props
}) => {
  const sizeValue = getSizeValue(size);
  const isClickable = !!onClick && !disabled;
  
  const iconClasses = [
    'material-icons',
    styles.icon,
    styles.icon__font,
    className,
    isClickable ? styles['icon--clickable'] : '',
    disabled ? styles['icon--disabled'] : '',
  ].filter(Boolean).join(' ');

  const iconStyle: React.CSSProperties = {
    fontSize: `${sizeValue}px`,
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
    color,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <span
      className={iconClasses}
      style={iconStyle}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `${name} button` : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
      {...props}
    >
      {name}
    </span>
  );
}; 