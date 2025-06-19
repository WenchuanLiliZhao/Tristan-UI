import React from 'react';

import { Icon } from '../../components/General/Icon';
import styles from './Element.module.scss';
import { Button } from '../../components/General';

export const Element: React.FC = () => {
  return (
    <div className={styles["not-found"]}>
      <div className={styles["not-found-container"]}>
        <div className={styles["error-code"]}>
          <Icon name="error" size={120} color="#dc3545" />
          <h1>404</h1>
        </div>
        
        <h2>Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        
        <div className={styles["actions"]}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => window.history.back()}
          >
            <Icon name="arrow-left" size={20} />
            Go Back
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => window.location.href = '/'}
          >
            <Icon name="home" size={20} />
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}; 