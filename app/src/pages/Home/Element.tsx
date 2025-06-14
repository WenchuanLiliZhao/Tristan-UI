import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Icon, availableIcons } from '../../components/Icon';
import styles from './Element.module.scss';
import { Navigation } from '../../components/Navigation';

export const Element: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
    <Navigation left={[]} right={[]} />
    <div className={styles["component-showcase"]}>
      <div className={styles["showcase-container"]}>
        <h1>Lili Design System - Component Showcase</h1>
        
        {/* Button Showcase */}
        <section className={styles["showcase-section"]}>
          <h2>Button Component</h2>
          
          <div className={styles["showcase-group"]}>
            <h3>Variants</h3>
            <div className={styles["showcase-row"]}>
              <Button variant="contained" color="primary">
                Contained
              </Button>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="text" color="primary">
                Text
              </Button>
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>Sizes</h3>
            <div className={styles["showcase-row"]}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>Colors</h3>
            <div className={styles["showcase-row"]}>
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="error">Error</Button>
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>States</h3>
            <div className={styles["showcase-row"]}>
              <Button disabled>Disabled</Button>
              <Button loading={loading} onClick={handleLoadingTest}>
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
            </div>
          </div>
        </section>

        {/* Icon Showcase */}
        <section className={styles["showcase-section"]}>
          <h2>Icon Component</h2>
          
          <div className={styles["showcase-group"]}>
            <h3>All Available Icons</h3>
            <div className={styles["icon-grid"]}>
              {availableIcons.map((iconName) => (
                <div key={iconName} className={styles["icon-item"]}>
                  <Icon name={iconName} size="large" />
                  <span className={styles["icon-name"]}>{iconName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>Sizes</h3>
            <div className={styles["showcase-row"]}>
              <div className={styles["icon-demo"]}>
                <Icon name="star" size="small" />
                <span>Small (16px)</span>
              </div>
              <div className={styles["icon-demo"]}>
                <Icon name="star" size="medium" />
                <span>Medium (24px)</span>
              </div>
              <div className={styles["icon-demo"]}>
                <Icon name="star" size="large" />
                <span>Large (32px)</span>
              </div>
              <div className={styles["icon-demo"]}>
                <Icon name="star" size={48} />
                <span>Custom (48px)</span>
              </div>
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>Colors</h3>
            <div className={styles["showcase-row"]}>
              <Icon name="heart" color="#007bff" />
              <Icon name="heart" color="#28a745" />
              <Icon name="heart" color="#dc3545" />
              <Icon name="heart" color="#ffc107" />
              <Icon name="heart" color="#6c757d" />
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>Interactive Icons</h3>
            <div className={styles["showcase-row"]}>
              <Icon 
                name="star" 
                onClick={() => alert('Star clicked!')} 
                className={styles["interactive-icon"]}
              />
              <Icon 
                name="heart" 
                onClick={() => alert('Heart clicked!')} 
                className={styles["interactive-icon"]}
              />
              <Icon 
                name="settings" 
                onClick={() => alert('Settings clicked!')} 
                className={styles["interactive-icon"]}
              />
              <Icon 
                name="search" 
                disabled 
                onClick={() => alert('This should not trigger!')} 
                className={styles["interactive-icon"]}
              />
            </div>
          </div>

          <div className={styles["showcase-group"]}>
            <h3>Rotation</h3>
            <div className={styles["showcase-row"]}>
              <Icon name="arrow" rotate={0} />
              <Icon name="arrow" rotate={90} />
              <Icon name="arrow" rotate={180} />
              <Icon name="arrow" rotate={270} />
            </div>
          </div>
        </section>

        {/* Placeholder for other components */}
        <section className={styles["showcase-section"]}>
          <h2>Coming Soon</h2>
          <p>More components will be showcased here as they are developed:</p>
          <ul>
            <li>Input Components</li>
            <li>Card Components</li>
            <li>Typography Components</li>
            <li>Layout Components</li>
            <li>Navigation Components</li>
            <li>And more...</li>
          </ul>
        </section>
      </div>
    </div>
    </>
  );
};