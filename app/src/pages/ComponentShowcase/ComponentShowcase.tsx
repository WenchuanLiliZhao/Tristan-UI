import React, { useState } from 'react';
import './ComponentShowcase.scss';
import { Button } from '../../components/Button/Button';
import Icon, { availableIcons } from '../../components/Icon/Icon';

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

        {/* Icon Showcase */}
        <section className="showcase-section">
          <h2>Icon Component</h2>
          
          <div className="showcase-group">
            <h3>All Available Icons</h3>
            <div className="icon-grid">
              {availableIcons.map((iconName) => (
                <div key={iconName} className="icon-item">
                  <Icon name={iconName} size="large" />
                  <span className="icon-name">{iconName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase-group">
            <h3>Sizes</h3>
            <div className="showcase-row">
              <div className="icon-demo">
                <Icon name="star" size="small" />
                <span>Small (16px)</span>
              </div>
              <div className="icon-demo">
                <Icon name="star" size="medium" />
                <span>Medium (24px)</span>
              </div>
              <div className="icon-demo">
                <Icon name="star" size="large" />
                <span>Large (32px)</span>
              </div>
              <div className="icon-demo">
                <Icon name="star" size={48} />
                <span>Custom (48px)</span>
              </div>
            </div>
          </div>

          <div className="showcase-group">
            <h3>Colors</h3>
            <div className="showcase-row">
              <Icon name="heart" color="#007bff" />
              <Icon name="heart" color="#28a745" />
              <Icon name="heart" color="#dc3545" />
              <Icon name="heart" color="#ffc107" />
              <Icon name="heart" color="#6c757d" />
            </div>
          </div>

          <div className="showcase-group">
            <h3>Interactive Icons</h3>
            <div className="showcase-row">
              <Icon 
                name="star" 
                onClick={() => alert('Star clicked!')} 
                className="interactive-icon"
              />
              <Icon 
                name="heart" 
                onClick={() => alert('Heart clicked!')} 
                className="interactive-icon"
              />
              <Icon 
                name="settings" 
                onClick={() => alert('Settings clicked!')} 
                className="interactive-icon"
              />
              <Icon 
                name="search" 
                disabled 
                onClick={() => alert('This should not trigger!')} 
                className="interactive-icon"
              />
            </div>
          </div>

          <div className="showcase-group">
            <h3>Rotation</h3>
            <div className="showcase-row">
              <Icon name="arrow" rotate={0} />
              <Icon name="arrow" rotate={90} />
              <Icon name="arrow" rotate={180} />
              <Icon name="arrow" rotate={270} />
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