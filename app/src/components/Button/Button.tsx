import React from 'react';
import type { ButtonProps } from '../types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  'data-testid': dataTestId,
  ...rest
}) => {
  const baseClass = 'lili-button';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    `${baseClass}--${color}`,
    disabled && `${baseClass}--disabled`,
    loading && `${baseClass}--loading`,
    className
  ].filter(Boolean).join(' ');

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
      {loading && <span className={`${baseClass}__spinner`}>⟳</span>}
      <span className={`${baseClass}__content`}>{children}</span>
    </button>
  );
};

export default Button; 