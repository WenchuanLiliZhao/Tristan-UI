import React from 'react';
import styles from './styles.module.scss';


const NavPlaceholderItem = () => {
  return (
    <div className={styles["nav-placeholder-item"]} />
  )
}


export interface NavigationProps {
  left?: React.ReactNode[];
  right?: React.ReactNode[];
}

export const TopNav: React.FC<NavigationProps> = ({
  left = [
    <NavPlaceholderItem />,
    <NavPlaceholderItem />,
  ],
  right = [
    <NavPlaceholderItem />,
    <NavPlaceholderItem />,
    <NavPlaceholderItem />,
    <NavPlaceholderItem />,
    <NavPlaceholderItem />,
  ]
}) => {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["left"]}>
        <NavPlaceholderItem />
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