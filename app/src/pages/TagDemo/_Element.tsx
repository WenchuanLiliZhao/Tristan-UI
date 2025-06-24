import React, { useState } from 'react';
import { Tag } from '../../design-system/ui-components/General';

const TagDemo: React.FC = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'JavaScript']);

  const handleRemoveTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>Tag 组件演示</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2>基础用法</h2>
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
        <h2>不同变体</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag variant="contained" color="primary">实心标签</Tag>
          <Tag variant="outlined" color="primary">边框标签</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>不同尺寸</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small">小尺寸</Tag>
          <Tag size="medium">中等尺寸</Tag>
          <Tag size="large">大尺寸</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>可关闭的标签</h2>
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
        <p style={{ color: '#666', fontSize: '14px' }}>
          点击 × 按钮可以删除标签
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>禁用状态</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag disabled>禁用标签</Tag>
          <Tag disabled closable>禁用的可关闭标签</Tag>
          <Tag disabled variant="outlined" color="warning">禁用边框标签</Tag>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>组合示例</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Tag size="small" variant="outlined" color="info">小信息</Tag>
          <Tag closable color="success">可关闭成功</Tag>
          <Tag size="large" variant="outlined" color="warning" closable>大警告可关闭</Tag>
        </div>
      </section>
    </div>
  );
};

export default TagDemo; 