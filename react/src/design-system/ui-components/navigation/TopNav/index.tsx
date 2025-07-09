import React from "react";
import styles from "./styles.module.scss";
import type { BaseComponentProps } from "../../types";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../../general";
export interface NavigationProps extends BaseComponentProps {
  left: React.ReactNode[];
  right: React.ReactNode[];
}

export const TopNav: React.FC<NavigationProps> = ({
  left,
  right,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  return (
    <nav
      className={`${styles["nav"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      <div className={styles["left"]}>
        {left.map((item, index) => (
          <div key={index} className={styles["item"]}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles["right"]}>
        {right.map((item, index) => (
          <div key={index} className={styles["item"]}>
            {item}
          </div>
        ))}
      </div>
    </nav>
  );
};

export interface NavTitleProps extends BaseComponentProps {
  title: string;
}

export const NavTitle: React.FC<NavTitleProps> = ({
  title,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  return (
    <div
      className={`${styles["nav-title"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      {title}
    </div>
  );
};

interface TristanNavLinkProps extends BaseComponentProps {
  to: string;
  name: string;
  icon?: string;
}

// Error Boundary for NavLink compatibility
class NavLinkErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('TristanNavLink: Router context error, using fallback:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const TristanNavLink: React.FC<TristanNavLinkProps> = ({
  to,
  name,
  icon,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  const location = useLocation();

  // Render the actual content
  const renderContent = (isActive: boolean) => (
    <>
      <div
        className={`${styles["nav-link-name"]} ${
          isActive ? styles["active"] : ""
        }`}
      >
        <Button icon={icon} variant="ghost" size="medium">{name}</Button>
      </div>
      {isActive ? (
        <div className={styles["nav-link-active-indicator"]} />
      ) : null}
    </>
  );

  // Fallback link for when NavLink fails
  const fallbackLink = (
    <a
      href={to}
      className={`${styles["nav-link"]} ${className}`}
      data-testid={dataTestId}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, '', to);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }}
    >
      {renderContent(location.pathname === to || location.pathname.startsWith(to + '/'))}
    </a>
  );

  // Main NavLink implementation
  const navLink = (
    <NavLink
      to={to}
      className={`${styles["nav-link"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      {({ isActive }: { isActive: boolean }) => renderContent(isActive)}
    </NavLink>
  );

  return (
    <NavLinkErrorBoundary fallback={fallbackLink}>
      {navLink}
    </NavLinkErrorBoundary>
  );
};

export interface TristanNavLinkGroupProps extends BaseComponentProps {
  items: TristanNavLinkProps[];
}

export const TristanNavLinkGroup: React.FC<TristanNavLinkGroupProps> = ({
  items,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  return (
    <div
      className={`${styles["nav-link-group"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      {items.map((item, index) => (
        <TristanNavLink key={index} {...item} />
      ))}
    </div>
  );
};
