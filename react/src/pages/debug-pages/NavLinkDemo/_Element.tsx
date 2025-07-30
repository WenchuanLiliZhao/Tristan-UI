import React from 'react';
import { NavLink } from '../../../design-system/ui-components';
import styles from './styles.module.scss';

export const NavLinkDemo: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>NavLink Component Demo</h1>
      
      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <div className={styles.navGroup}>
          <NavLink to="/demo">Default Link</NavLink>
          <NavLink to="/demo" variant="primary">Primary Link</NavLink>
          <NavLink to="/demo" variant="secondary">Secondary Link</NavLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Size Variants</h2>
        <div className={styles.navGroup}>
          <NavLink to="/demo" size="small">Small Link</NavLink>
          <NavLink to="/demo" size="medium">Medium Link</NavLink>
          <NavLink to="/demo" size="large">Large Link</NavLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Custom Colors</h2>
        <div className={styles.navGroup}>
          <NavLink 
            to="/demo" 
            activeColor="#007bff" 
            inactiveColor="#6c757d"
          >
            Custom Colors
          </NavLink>
          <NavLink 
            to="/demo" 
            activeColor="#28a745" 
            inactiveColor="#dc3545"
          >
            Success/Error Colors
          </NavLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Navigation Menu Example</h2>
        <nav className={styles.navigationMenu}>
          <NavLink to="/overview">Overview</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </section>
    </div>
  );
}; 