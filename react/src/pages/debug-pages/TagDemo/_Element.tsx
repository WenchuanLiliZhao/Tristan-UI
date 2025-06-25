import React, { useState } from 'react';
import { Tag } from '../../../design-system/ui-components';
import { rainbowColorNames } from '../../../styles';


export const Element: React.FC = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'JavaScript']);

  const handleRemoveTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Tag Component Demo</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Basic Usage</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag>Default Tag</Tag>
          <Tag color="secondary">Secondary Tag</Tag>
          <Tag color="success">Success Tag</Tag>
          <Tag color="warning">Warning Tag</Tag>
          <Tag color="error">Error Tag</Tag>
          <Tag color="info">Info Tag</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Different Variants</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag variant="contained" color="primary">Contained Tag</Tag>
          <Tag variant="outlined" color="primary">Outlined Tag</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Different Sizes</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small">Small Size</Tag>
          <Tag size="medium">Medium Size</Tag>
          <Tag size="large">Large Size</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Closable Tags</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {tags.map((tag, index) => (
            <Tag
              key={tag}
              closable
              onClose={() => handleRemoveTag(index)}
              color={index % 2 === 0 ? 'primary' : 'success'}
            >
              {tag}
            </Tag>
          ))}
        </div>
        <p style={{ color: 'var(--color--text-secondary)', fontSize: '14px' }}>
          Click the × button to remove tags
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Disabled State</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag disabled>Disabled Tag</Tag>
          <Tag disabled closable>Disabled Closable Tag</Tag>
          <Tag disabled variant="outlined" color="warning">Disabled Outlined Tag</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Combination Examples</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small" variant="outlined" color="info">Small Info</Tag>
          <Tag closable color="success">Closable Success</Tag>
          <Tag size="large" variant="outlined" color="warning" closable>Large Warning Closable</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Rainbow Colors</h2>
        <div style={{ marginBottom: '20px' }}>
          <h3>Contained Rainbow Tags</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(rainbowColorNames).map(([key, colorName]) => (
              <Tag key={key} variant="contained" color={colorName}>
                {key} (contained)
              </Tag>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Outlined Rainbow Tags</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(rainbowColorNames).map(([key, colorName]) => (
              <Tag key={key} variant="outlined" color={colorName}>
                {key} (outlined)
              </Tag>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Different Sizes</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Tag size="small" color="rose" variant="contained">Small Rose</Tag>
            <Tag size="medium" color="blue" variant="contained">Medium Blue</Tag>
            <Tag size="large" color="emerald" variant="contained">Large Emerald</Tag>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size="small" color="amber" variant="outlined">Small Amber</Tag>
            <Tag size="medium" color="purple" variant="outlined">Medium Purple</Tag>
            <Tag size="large" color="cyan" variant="outlined">Large Cyan</Tag>
          </div>
        </div>

        <div>
          <h3>Legacy Color Support</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Tag color="primary">Primary</Tag>
            <Tag color="secondary">Secondary</Tag>
            <Tag color="success">Success</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="error">Error</Tag>
          </div>
        </div>
      </section>
    </div>
  );
};