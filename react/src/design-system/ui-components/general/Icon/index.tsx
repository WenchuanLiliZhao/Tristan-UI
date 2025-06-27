import React from 'react';
import './fonts/material-icons.scss';
import type { BaseComponentProps } from '../../types';

export interface IconProps extends BaseComponentProps {
  /** 图标名称 - 使用 Material Symbols 的官方名称 */
  name: string;
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
 * <Icon name="settings" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  style,
  'data-testid': dataTestId,
  ...rest
}) => {
  return (
    <span
      className={`${className} material-icons`}
      style={style}
      data-testid={dataTestId}
      {...rest}
    >
      {name}
    </span>
  );
}; 