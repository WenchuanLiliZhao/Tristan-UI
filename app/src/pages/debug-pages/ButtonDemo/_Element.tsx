import React, { useState } from 'react';
import { Button } from '../../../design-system/ui-components/general';

// Mock icons for demonstration
const MockIcon = () => <span>📄</span>;
const MockDecoIcon = () => <span>✨</span>;
const DownloadIcon = () => <span>⬇️</span>;
const CheckIcon = () => <span>✓</span>;
const PlusIcon = () => <span>+</span>;
const DeleteIcon = () => <span>🗑️</span>;
const EditIcon = () => <span>✏️</span>;
const CancelIcon = () => <span>✖️</span>;

export const Element: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [showText, setShowText] = useState(true);
  const [showDecoIcon, setShowDecoIcon] = useState(true);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const variants = ['filled', 'outlined', 'text'] as const;
  const sizes = ['small', 'medium', 'large'] as const;
  const semantics = ['default', 'success', 'active', 'warning', 'error'] as const;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Component Demo</h1>
      <p style={{ color: 'var(--color--text-secondary)', marginBottom: '2rem' }}>
        Updated Button component with semantic colors, icon support, and Figma-aligned design system
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

      {/* Interactive Controls */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Interactive Controls</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          padding: '1rem',
          backgroundColor: 'var(--color--bg-pale)',
          borderRadius: '8px'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color--text-prime)' }}>
            <input 
              type="checkbox" 
              checked={showIcon} 
              onChange={(e) => setShowIcon(e.target.checked)} 
            />
            Show Icon
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color--text-prime)' }}>
            <input 
              type="checkbox" 
              checked={showText} 
              onChange={(e) => setShowText(e.target.checked)} 
            />
            Show Text
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color--text-prime)' }}>
            <input 
              type="checkbox" 
              checked={showDecoIcon} 
              onChange={(e) => setShowDecoIcon(e.target.checked)} 
            />
            Show Deco Icon
          </label>
        </div>
      </section>

      {/* New Variants (Mode) */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Variants (Mode)</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {variants.map(variant => (
            <Button 
              key={variant} 
              variant={variant}
              semantic="active"
              showIcon={showIcon}
              showText={showText}
              showDecoIcon={showDecoIcon}
              icon={showIcon ? <MockIcon /> : undefined}
              decoIcon={showDecoIcon ? <MockDecoIcon /> : undefined}
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

      {/* Semantic Colors */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Semantic Colors</h2>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          {variants.map(variant => (
            <div key={variant}>
              <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {variant} Variant
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {semantics.map(semantic => (
                  <Button 
                    key={`${variant}-${semantic}`}
                    variant={variant}
                    semantic={semantic}
                    showIcon={showIcon}
                    showText={showText}
                    showDecoIcon={showDecoIcon}
                    icon={showIcon ? <MockIcon /> : undefined}
                    decoIcon={showDecoIcon ? <MockDecoIcon /> : undefined}
                    onClick={handleClick}
                  >
                    {semantic}
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
              <Button onClick={handleClick} icon={<CheckIcon />}>Normal</Button>
              <Button variant="outlined" onClick={handleClick} icon={<EditIcon />}>Outlined</Button>
              <Button variant="text" onClick={handleClick} icon={<MockIcon />}>Text</Button>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Disabled State</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button disabled icon={<CheckIcon />}>Disabled</Button>
              <Button variant="outlined" disabled icon={<EditIcon />}>Disabled</Button>
              <Button variant="text" disabled icon={<MockIcon />}>Disabled</Button>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Loading State</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button loading={isLoading} onClick={handleLoadingClick} icon={<DownloadIcon />}>
                {isLoading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button variant="outlined" loading icon={<CheckIcon />}>Loading</Button>
              <Button variant="text" loading icon={<MockIcon />}>Loading</Button>
            </div>
          </div>

          <div>
            <h3 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Types</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button type="button" onClick={handleClick}>Button</Button>
              <Button type="submit" semantic="success">Submit</Button>
              <Button type="reset" semantic="warning">Reset</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Practical Examples</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
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
              <Button 
                semantic="success" 
                icon={<CheckIcon />}
                onClick={() => alert('Save successful!')}
              >
                Save
              </Button>
              <Button 
                semantic="error" 
                variant="outlined" 
                icon={<DeleteIcon />}
                onClick={() => alert('Confirm deletion?')}
              >
                Delete
              </Button>
              <Button 
                variant="text" 
                icon={<CancelIcon />}
                onClick={() => alert('Cancel operation')}
              >
                Cancel
              </Button>
            </div>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-pale)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-secondary-trans)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
              Size & Icon Comparison
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button 
                size="small" 
                semantic="active"
                icon={<DownloadIcon />}
              >
                Small
              </Button>
              <Button 
                size="medium" 
                semantic="active"
                icon={<DownloadIcon />}
              >
                Medium
              </Button>
              <Button 
                size="large" 
                semantic="active"
                icon={<DownloadIcon />}
              >
                Large
              </Button>
            </div>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-pale)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-secondary-trans)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
              State Toggle Demo
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button 
                semantic={isLoading ? 'warning' : 'active'}
                loading={isLoading}
                icon={<DownloadIcon />}
                onClick={handleLoadingClick}
              >
                {isLoading ? 'Processing...' : 'Start Processing'}
              </Button>
            </div>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-pale)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-secondary-trans)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
              Icon Configuration Demo
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button 
                showIcon={false}
                showText={true}
                showDecoIcon={false}
                semantic="active"
                onClick={handleClick}
              >
                Text Only
              </Button>
              <Button 
                showIcon={true}
                showText={false}
                showDecoIcon={false}
                icon={<PlusIcon />}
                semantic="success"
                onClick={handleClick}
              >
              </Button>
              <Button 
                showIcon={true}
                showText={true}
                showDecoIcon={true}
                icon={<EditIcon />}
                decoIcon={<MockDecoIcon />}
                semantic="active"
                onClick={handleClick}
              >
                Full Config
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Updated Code Examples</h2>
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
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>New Variants (filled, outlined, text):</h4>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button variant="filled">Filled Button</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button variant="outlined">Outlined Button</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)' }}>
              {`<Button variant="text">Text Button</Button>`}
            </code>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Semantic Colors:</h4>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button semantic="default">Default</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button semantic="success">Success</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button semantic="active">Active</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button semantic="warning">Warning</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)' }}>
              {`<Button semantic="error">Error</Button>`}
            </code>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Icon Configuration:</h4>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button icon={<Icon />} showIcon={true}>With Icon</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button decoIcon={<DecoIcon />} showDecoIcon={true}>With Deco Icon</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button showText={false} icon={<Icon />}>Icon Only</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)' }}>
              {`<Button icon={<Icon />} decoIcon={<Deco />} showIcon showDecoIcon>Full Config</Button>`}
            </code>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Advanced Usage:</h4>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button disabled>Disabled Button</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)', marginBottom: '0.25rem' }}>
              {`<Button loading>Loading Button</Button>`}
            </code>
            <code style={{ display: 'block', color: 'var(--color--text-secondary)' }}>
              {`<Button size="large" semantic="success" variant="filled" icon={<SaveIcon />} onClick={handleSave}>Save Document</Button>`}
            </code>
          </div>
        </div>
      </section>

      <div style={{ fontSize: '0.9rem', color: 'var(--color--text-secondary)' }}>
        <p>
          <strong style={{ color: 'var(--color--text-prime)' }}>Updated Props:</strong> variant, size, semantic, disabled, loading, showIcon, showText, showDecoIcon, icon, decoIcon, onClick, type, className<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Supported Variants:</strong> filled, outlined, text<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Supported Sizes:</strong> small, medium, large<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Supported Semantics:</strong> default, success, active, warning, error<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Icon Support:</strong> icon (main), decoIcon (decorative), showIcon, showText, showDecoIcon controls
        </p>
      </div>
    </div>
  );
}; 