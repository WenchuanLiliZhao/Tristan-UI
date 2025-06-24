import React from 'react';
import './fonts/material-icons.scss';

export interface IconProps {
  /** 图标名称 - 使用 Material Symbols 的官方名称 */
  name: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}
/**
 * Icon 组件 - 基于 Material Symbols 字体的图标系统（200字重）
 * 
 * @example
 * ```tsx
 * <Icon name="home" />
 * <Icon name="person" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  style,
}) => {
  return (
    <span
      className={`${className} material-icons`}
      style={style}
    >
      {name}
    </span>
  );
}; 