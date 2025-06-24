import React, { useState } from 'react';
import { Tag } from '../../design-system/ui-components/General';
import { rainbowColorNames } from '../../styles/color';

const TagDemo: React.FC = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'JavaScript']);

  const handleRemoveTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Tag 组件演示</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>基础用法</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag>默认标签</Tag>
          <Tag color="secondary">次要标签</Tag>
          <Tag color="success">成功标签</Tag>
          <Tag color="warning">警告标签</Tag>
          <Tag color="error">错误标签</Tag>
          <Tag color="info">信息标签</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>不同变体</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag variant="contained" color="primary">实心标签</Tag>
          <Tag variant="outlined" color="primary">边框标签</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>不同尺寸</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small">小尺寸</Tag>
          <Tag size="medium">中等尺寸</Tag>
          <Tag size="large">大尺寸</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>可关闭的标签</h2>
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
          点击 × 按钮可以删除标签
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>禁用状态</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag disabled>禁用标签</Tag>
          <Tag disabled closable>禁用的可关闭标签</Tag>
          <Tag disabled variant="outlined" color="warning">禁用边框标签</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>组合示例</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small" variant="outlined" color="info">小信息</Tag>
          <Tag closable color="success">可关闭成功</Tag>
          <Tag size="large" variant="outlined" color="warning" closable>大警告可关闭</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>彩虹颜色</h2>
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

export default TagDemo; 