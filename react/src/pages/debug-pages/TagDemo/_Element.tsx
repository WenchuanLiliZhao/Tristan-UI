import React, { useState } from 'react';
import { Tag } from '../../../design-system/ui-components';

export const Element: React.FC = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'JavaScript']);

  const handleRemoveTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Tag Component Demo</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Basic Usage - Semantic Colors</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag>Primary (Default)</Tag>
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
          <Tag variant="plain" color="primary">Plain Tag</Tag>
          <Tag variant="contained" color="success">Contained Success</Tag>
          <Tag variant="outlined" color="error">Outlined Error</Tag>
          <Tag variant="plain" color="error">Plain Error</Tag>
        </div>
        <p style={{ color: 'var(--color--text-secondary)', fontSize: '14px', marginBottom: '0' }}>
          Plain variant has no border, no background, and no padding - perfect for minimal text labels.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Different Sizes</h2>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: 'var(--color--text-prime)', fontSize: '16px', marginBottom: '8px' }}>Contained Tags</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Tag size="small">Small Size</Tag>
            <Tag size="medium">Medium Size</Tag>
            <Tag size="large">Large Size</Tag>
          </div>
        </div>
        <div>
          <h3 style={{ color: 'var(--color--text-prime)', fontSize: '16px', marginBottom: '8px' }}>Plain Tags</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0' }}>
            <Tag size="small" variant="plain" color="primary">Small Plain</Tag>
            <Tag size="medium" variant="plain" color="success">Medium Plain</Tag>
            <Tag size="large" variant="plain" color="warning">Large Plain</Tag>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Custom Colors</h2>
        <div style={{ marginBottom: '20px' }}>
          <h3>Hex Colors</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <Tag color="#ff6b6b">Red Hex</Tag>
            <Tag color="#4ecdc4">Teal Hex</Tag>
            <Tag color="#45b7d1">Blue Hex</Tag>
            <Tag color="#96ceb4">Green Hex</Tag>
            <Tag color="#feca57">Yellow Hex</Tag>
            <Tag color="#ff9ff3">Pink Hex</Tag>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>RGB Colors</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <Tag color="rgb(255, 107, 107)" variant="contained">RGB Red</Tag>
            <Tag color="rgba(78, 205, 196, 0.8)" variant="outlined">RGBA Teal</Tag>
            <Tag color="rgb(69, 183, 209)">RGB Blue</Tag>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>HSL Colors</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <Tag color="hsl(0, 100%, 70%)">HSL Red</Tag>
            <Tag color="hsl(120, 60%, 70%)">HSL Green</Tag>
            <Tag color="hsl(240, 80%, 70%)">HSL Blue</Tag>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>CSS Named Colors</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <Tag color="tomato">Tomato</Tag>
            <Tag color="gold">Gold</Tag>
            <Tag color="mediumseagreen">Medium Sea Green</Tag>
            <Tag color="cornflowerblue">Cornflower Blue</Tag>
          </div>
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
          <Tag disabled color="#ff6b6b">Disabled Custom Color</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Text Wrapping</h2>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--color--text-prime)', fontSize: '16px', marginBottom: '8px' }}>Default (No Wrap)</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Tag color="primary">这是一个很长的标签文本，默认情况下不会换行</Tag>
            <Tag color="success" variant="outlined">Another very long tag text that won't wrap by default</Tag>
            <Tag color="warning" variant="plain">第三个很长的标签文本，纯文本样式也不会换行</Tag>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--color--text-prime)', fontSize: '16px', marginBottom: '8px' }}>With Wrap Enabled</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Tag color="primary" wrap>这是一个很长的标签文本，启用换行后可以自动换行显示</Tag>
            <Tag color="success" variant="outlined" wrap>Another very long tag text that will wrap when wrap is enabled</Tag>
            <Tag color="warning" variant="plain" wrap>第三个很长的标签文本，纯文本样式也可以换行</Tag>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: 'var(--color--text-prime)', fontSize: '16px', marginBottom: '8px' }}>Different Sizes with Wrap</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Tag size="small" color="info" wrap>小尺寸标签，长文本换行示例</Tag>
            <Tag size="medium" color="error" wrap>中等尺寸标签，长文本换行示例</Tag>
            <Tag size="large" color="secondary" wrap>大尺寸标签，长文本换行示例</Tag>
          </div>
        </div>
        <div>
          <h3 style={{ color: 'var(--color--text-prime)', fontSize: '16px', marginBottom: '8px' }}>Closable Tags with Wrap</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0' }}>
            <Tag color="primary" closable wrap>可关闭的长文本标签，支持换行显示</Tag>
            <Tag color="success" variant="outlined" closable wrap>Another closable long text tag with wrapping enabled</Tag>
          </div>
        </div>
        <p style={{ color: 'var(--color--text-secondary)', fontSize: '14px', marginTop: '16px', marginBottom: '0' }}>
          Use the <code>wrap</code> prop to allow long text content to wrap to multiple lines instead of being truncated.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Mixed Examples</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small" variant="outlined" color="info">Small Info</Tag>
          <Tag closable color="success">Closable Success</Tag>
          <Tag size="large" variant="outlined" color="#e74c3c" closable>Large Custom Closable</Tag>
          <Tag variant="contained" color="mediumorchid">Custom Purple</Tag>
          <Tag size="small" color="hsl(180, 100%, 50%)">Small HSL</Tag>
          <Tag variant="plain" color="#ff6b6b" closable>Plain Closable</Tag>
          <Tag variant="plain" size="large" color="mediumseagreen">Large Plain</Tag>
          <Tag variant="plain" disabled color="primary">Disabled Plain</Tag>
        </div>
      </section>
    </div>
  );
};