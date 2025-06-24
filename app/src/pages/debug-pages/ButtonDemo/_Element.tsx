import React, { useState } from 'react';
import { Button } from '../../../design-system/ui-components/general';

export const Element: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const variants = ['contained', 'outlined', 'text'] as const;
  const sizes = ['small', 'medium', 'large'] as const;
  const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Component Demo</h1>
      <p style={{ color: 'var(--color--text-secondary)', marginBottom: '2rem' }}>
        Button component demonstration - Showcase all variants, sizes, colors and states of the button component
      </p>

      {/* Click Counter */}
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1rem', 
        backgroundColor: 'var(--color--bg-pale)', 
        borderRadius: '8px',
        border: '1px solid var(--color--border-secondary-trans)'
      }}>
        <p style={{ margin: 0, color: 'var(--color--text-prime)' }}>
          Click Counter: <strong>{clickCount}</strong>
        </p>
      </div>

      {/* Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Variants</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {variants.map(variant => (
            <Button 
              key={variant} 
              variant={variant} 
              onClick={handleClick}
            >
              {variant}
            </Button>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Sizes</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {sizes.map(size => (
            <Button 
              key={size} 
              size={size} 
              onClick={handleClick}
            >
              {size}
            </Button>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Colors</h2>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {variants.map(variant => (
            <div key={variant}>
              <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {variant} Variant
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <Button 
                    key={`${variant}-${color}`}
                    variant={variant}
                    color={color}
                    onClick={handleClick}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button States</h2>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Normal State</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button onClick={handleClick}>Normal</Button>
              <Button variant="outlined" onClick={handleClick}>Outlined</Button>
              <Button variant="text" onClick={handleClick}>Text</Button>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Disabled State</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button disabled>Disabled</Button>
              <Button variant="outlined" disabled>Disabled</Button>
              <Button variant="text" disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Loading State</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button loading={isLoading} onClick={handleLoadingClick}>
                {isLoading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button variant="outlined" loading>Loading</Button>
              <Button variant="text" loading>Loading</Button>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Types</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button type="button" onClick={handleClick}>Button</Button>
              <Button type="submit" color="success">Submit</Button>
              <Button type="reset" color="warning">Reset</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Interactive Examples</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-pale)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-secondary-trans)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
              Action Button Group
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button color="success" onClick={() => alert('Save successful!')}>Save</Button>
              <Button color="error" variant="outlined" onClick={() => alert('Confirm deletion?')}>Delete</Button>
              <Button variant="text" onClick={() => alert('Cancel operation')}>Cancel</Button>
            </div>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-pale)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-secondary-trans)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
              Size Comparison
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button size="small" color="info">Small</Button>
              <Button size="medium" color="info">Medium</Button>
              <Button size="large" color="info">Large</Button>
            </div>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-pale)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-secondary-trans)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
              State Toggle
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button 
                color={isLoading ? 'warning' : 'primary'}
                loading={isLoading}
                onClick={handleLoadingClick}
              >
                {isLoading ? 'Processing...' : 'Start Processing'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Code Examples</h2>
        <div style={{ 
          backgroundColor: 'var(--color--bg-prime)', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid var(--color--border-secondary-trans)',
          fontFamily: 'monospace'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Basic Usage:</h4>
            <code style={{ color: 'var(--color--text-secondary)' }}>
              {`import { Button } from '@/design-system/ui-components/general';`}
            </code>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Different Variants:</h4>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button variant="contained">Contained</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button variant="outlined">Outlined</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)' }}>
              {`<Button variant="text">Text</Button>`}
            </code>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>State Control:</h4>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button disabled>Disabled Button</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button loading>Loading Button</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)' }}>
              {`<Button size="large" color="success" onClick={handleClick}>Custom Button</Button>`}
            </code>
          </div>
        </div>
      </section>

      <div style={{ fontSize: '0.9rem', color: 'var(--color--text-secondary)' }}>
        <p>
          <strong style={{ color: 'var(--color--text-prime)' }}>Props:</strong> variant, size, color, disabled, loading, onClick, type, className<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Supported Variants:</strong> contained, outlined, text<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Supported Sizes:</strong> small, medium, large<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Supported Colors:</strong> primary, secondary, success, warning, error, info
        </p>
      </div>
    </div>
  );
}; 