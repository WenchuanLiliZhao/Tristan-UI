import React, { useState } from 'react';
import { Icon, availableIcons } from '../../components/General/Icon';
import './styles.scss';

const IconShowcase: React.FC = () => {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

    // 复制图标使用代码
  const copyIconCode = (iconName: string) => {
    const code = `<Icon name="${iconName}" size="${selectedSize}" color="${selectedColor}" strokeWidth={${strokeWidth}} />`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

     

  return (
    <div className="icon-showcase">
      <div className="icon-showcase__header">
        <h1>图标展示</h1>
        <p className="icon-showcase__description">
          展示所有可用的图标组件。点击图标复制使用代码。
        </p>
      </div>

      <div className="icon-showcase__controls">
        <div className="control-group">
          <label htmlFor="size-select">大小:</label>
          <select 
            id="size-select"
            title="选择图标大小"
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value as 'small' | 'medium' | 'large')}
          >
            <option value="small">Small (16px)</option>
            <option value="medium">Medium (24px)</option>
            <option value="large">Large (32px)</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="color-picker">颜色:</label>
          <input 
            id="color-picker"
            title="选择图标颜色"
            type="color" 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
          />
          <input 
            id="color-text"
            title="输入颜色值"
            type="text" 
            value={selectedColor} 
            onChange={(e) => setSelectedColor(e.target.value)}
            placeholder="#000000"
          />
        </div>

        <div className="control-group">
          <label htmlFor="stroke-width">描边粗细:</label>
          <input 
            id="stroke-width"
            title="调整描边粗细"
            type="range" 
            min="0.5" 
            max="4" 
            step="0.5" 
            value={strokeWidth} 
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
          <span>{strokeWidth}</span>
        </div>
      </div>

      <div className="icon-showcase__grid">
        {availableIcons.map((iconName) => (
                     <div 
             key={iconName} 
             className={`icon-showcase__item ${copiedIcon === iconName ? 'copied' : ''}`}
             onClick={() => copyIconCode(iconName)}
             title="点击复制代码"
           >
            <div className="icon-showcase__icon-wrapper">
              <Icon 
                name={iconName} 
                size={selectedSize} 
                color={selectedColor}
                strokeWidth={strokeWidth}
              />
            </div>
            <div className="icon-showcase__icon-name">{iconName}</div>
            {copiedIcon === iconName && (
              <div className="icon-showcase__copied-tip">已复制!</div>
            )}
          </div>
        ))}
      </div>

      <div className="icon-showcase__usage-example">
        <h3>使用示例</h3>
        <div className="code-block">
          <pre>
            <code>
{`import { Icon } from '../../components/General/Icon';

// 基本使用
<Icon name="home" />

// 自定义大小和颜色
<Icon name="user" size="large" color="#007bff" />

// 自定义描边粗细
<Icon name="search" strokeWidth={1.5} />

// 可点击图标
<Icon name="settings" onClick={() => console.log('clicked')} />

// 旋转图标
<Icon name="arrow" rotate={90} />`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default IconShowcase; 