import React from "react";
import styles from "./styles.module.scss";
import type { BaseComponentProps } from "../../types";
import { NavLink } from "react-router-dom";
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

export const TristanNavLink: React.FC<TristanNavLinkProps> = ({
  to,
  name,
  icon,
  className = "",
  "data-testid": dataTestId,
  ...rest
}) => {
  return (
    <NavLink
      to={to}
      className={`${styles["nav-link"]} ${className}`}
      data-testid={dataTestId}
      {...rest}
    >
      {({ isActive }) => (
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
      )}
    </NavLink>
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
