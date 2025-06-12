import React, { useState } from 'react';
import { Button } from '../../components';
import './ComponentShowcase.scss';

const ComponentShowcase: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="component-showcase">
      <div className="showcase-container">
        <h1>Lili Design System - Component Showcase</h1>
        
        {/* Button Showcase */}
        <section className="showcase-section">
          <h2>Button Component</h2>
          
          <div className="showcase-group">
            <h3>Variants</h3>
            <div className="showcase-row">
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

          <div className="showcase-group">
            <h3>Sizes</h3>
            <div className="showcase-row">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div className="showcase-group">
            <h3>Colors</h3>
            <div className="showcase-row">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="error">Error</Button>
            </div>
          </div>

          <div className="showcase-group">
            <h3>States</h3>
            <div className="showcase-row">
              <Button disabled>Disabled</Button>
              <Button loading={loading} onClick={handleLoadingTest}>
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
            </div>
          </div>
        </section>

        {/* Placeholder for other components */}
        <section className="showcase-section">
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
  );
};

export default ComponentShowcase; 