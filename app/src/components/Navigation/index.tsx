import React from 'react';
import styles from './styles.module.scss';


const Test = () => {
  return (
    <div>test</div>
  )
}


export interface NavigationProps {
  left: React.ReactNode[];
  right: React.ReactNode[];
}

export const Navigation: React.FC<NavigationProps> = ({ left, right }) => {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["left"]}>
        <Test />
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