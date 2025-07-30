import React from "react";
import type { BaseComponentProps } from "../../types";
import styles from "./styles.module.scss";

export interface NavLinkProps extends BaseComponentProps {
  to: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  isActive?: boolean;
  target?: string;
  rel?: string;
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  variant = "default",
  activeColor,
  className,
  isActive,
  target,
  rel,
  exact = false,
  "data-testid": dataTestId,
}) => {
  // Auto-detect active state based on current URL if isActive is not provided
  const getActiveState = (): boolean => {
    if (isActive !== undefined) {
      return isActive;
    }
    
    const currentPath = window.location.pathname;
    
    if (exact) {
      return currentPath === to;
    }
    
    // For non-exact matching, check if current path starts with the link path
    // This handles cases like /dashboard being active when on /dashboard/settings
    return currentPath.startsWith(to) && to !== "/";
  };

  const isLinkActive = getActiveState();

  const getActiveColor = () => {
    if (activeColor) return activeColor;
    return variant === "primary"
      ? "var(--color--text-prime)"
      : "var(--color--text-prime)";
  };
  

  return (
    <a
      href={to}
      className={`${styles["tristan-navlink"]} ${
        styles[`tristan-navlink--${variant}`]
      } ${className || ""}`}
      style={{
        color: isLinkActive ? "var(--color--text-prime)" : "var(--color--text-negative)",
      }}
      data-testid={dataTestId}
      target={target}
      rel={rel}
    >
      {children}
      {isLinkActive && <div className={styles["active-indicator"]} style={{backgroundColor: getActiveColor()}}/>}
    </a>
  );
};
