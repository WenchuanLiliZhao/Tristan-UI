import React from 'react';
import './Icon.scss';

export interface IconProps {
  /** 图标名称 */
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

// SVG 图标注册表
const iconRegistry: Record<string, React.ReactNode> = {
  // 基础图标
  circle: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  arrow: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  home: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
      <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  user: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  settings: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m7-7 2.5 2.5M16.5 16.5 14 14m2.5-9.5L14 7m2.5 9.5L14 14" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  search: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  plus: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  minus: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  close: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  
  check: (
    <svg viewBox="0 0 24 24" fill="none">
      <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  heart: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  star: (
    <svg viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  mail: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  download: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  upload: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

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
 * ```
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'medium', 
  color = 'currentColor',
  className = '',
  onClick,
  disabled = false,
  rotate = 0
}) => {
  const sizeValue = getSizeValue(size);
  const sizeClass = typeof size === 'string' ? `icon--${size}` : '';
  
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
        icon 
        ${sizeClass} 
        ${onClick ? 'icon--clickable' : ''} 
        ${disabled ? 'icon--disabled' : ''} 
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
      {iconRegistry[name]}
    </span>
  );
};

// 导出可用的图标名称
// eslint-disable-next-line react-refresh/only-export-components
export const availableIcons = Object.keys(iconRegistry);

export default Icon; 