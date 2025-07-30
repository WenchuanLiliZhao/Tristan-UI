import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import type { BaseComponentProps } from '../../types';
import styles from './styles.module.scss';

export interface NavLinkProps extends BaseComponentProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  variant = 'default',
  size = 'medium',
  activeColor,
  inactiveColor,
  className,
  'data-testid': dataTestId,
}) => {
  const getActiveColor = () => {
    if (activeColor) return activeColor;
    return variant === 'primary' 
      ? 'var(--color--text-prime)' 
      : 'var(--color--text-prime)';
  };

  const getInactiveColor = () => {
    if (inactiveColor) return inactiveColor;
    return variant === 'primary' 
      ? 'var(--color--text-negative)' 
      : 'var(--color--text-negative)';
  };

  return (
    <RouterNavLink
      to={to}
      className={`${styles['tristan-navlink']} ${styles[`tristan-navlink--${variant}`]} ${styles[`tristan-navlink--${size}`]} ${className || ''}`}
      style={({ isActive }) => ({
        color: isActive ? getActiveColor() : getInactiveColor(),
      })}
      data-testid={dataTestId}
    >
      {children}
    </RouterNavLink>
  );
}; 