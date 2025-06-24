import React, { useState } from 'react';
import { Icon } from '../../design-system/ui-components/General/Icon';

export const Element: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [iconSize, setIconSize] = useState<number | 'small' | 'medium' | 'large'>('medium');
  const [iconColor, setIconColor] = useState('#000000');
  const [iconRotate, setIconRotate] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // 常用的 Material Icons 图标
  const commonIcons = [
    'home', 'person', 'settings', 'search', 'menu', 'close', 'check', 'add',
    'edit', 'delete', 'favorite', 'share', 'info', 'warning', 'error', 'help',
    'star', 'star_border', 'thumb_up', 'thumb_down', 'visibility', 'visibility_off',
    'keyboard_arrow_left', 'keyboard_arrow_right', 'keyboard_arrow_up', 'keyboard_arrow_down',
    'expand_more', 'expand_less', 'chevron_left', 'chevron_right',
    'play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous',
    'download', 'upload', 'cloud', 'cloud_download', 'cloud_upload',
    'mail', 'phone', 'location_on', 'date_range', 'schedule',
    'account_circle', 'notifications', 'shopping_cart', 'work', 'school'
  ];

  const sizeOptions = [
    { label: 'Small (16px)', value: 'small' as const },
    { label: 'Medium (24px)', value: 'medium' as const },
    { label: 'Large (32px)', value: 'large' as const },
    { label: 'Custom 48px', value: 48 },
    { label: 'Custom 64px', value: 64 },
  ];

  const colorPresets = [
    { label: 'Black', value: '#000000' },
    { label: 'Primary Blue', value: '#007bff' },
    { label: 'Success Green', value: '#28a745' },
    { label: 'Warning Orange', value: '#fd7e14' },
    { label: 'Danger Red', value: '#dc3545' },
    { label: 'Info Cyan', value: '#17a2b8' },
    { label: 'Purple', value: '#6f42c1' },
    { label: 'Gray', value: '#6c757d' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Material Icons Debug 工具</h1>
      <p style={{ color: 'var(--color--text-secondary)' }}>用于调试和测试 Material Icons 组件的各种参数和样式效果。</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '2rem', 
        marginTop: '2rem' 
      }}>
        {/* 控制面板 */}
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid var(--color--border-secondary-trans)', 
          borderRadius: '8px',
          backgroundColor: 'var(--color--bg-pale)'
        }}>
          <h3 style={{ color: 'var(--color--text-prime)' }}>参数控制面板</h3>
          
          {/* 图标选择 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              图标名称
            </label>
            <input
              type="text"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--color--border-secondary-trans)',
                borderRadius: '4px',
                backgroundColor: 'var(--color--bg-prime)',
                color: 'var(--color--text-prime)'
              }}
              placeholder="输入 Material Icons 名称"
            />
          </div>

          {/* 尺寸选择 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              尺寸
            </label>
            <select
              value={iconSize}
              onChange={(e) => {
                const value = e.target.value;
                setIconSize(isNaN(Number(value)) ? value as 'small' | 'medium' | 'large' : Number(value));
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--color--border-secondary-trans)',
                borderRadius: '4px',
                backgroundColor: 'var(--color--bg-prime)',
                color: 'var(--color--text-prime)'
              }}
              title="选择图标尺寸"
            >
              {sizeOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* 颜色选择 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              颜色
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="color"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px' }}
                title="选择颜色"
              />
              <input
                type="text"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid var(--color--border-secondary-trans)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color--bg-prime)',
                  color: 'var(--color--text-prime)'
                }}
                placeholder="输入颜色值 (如: var(--color--semantic-active))"
                title="颜色值"
              />
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {colorPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setIconColor(preset.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.8rem',
                    border: '1px solid var(--color--border-secondary-trans)',
                    borderRadius: '4px',
                    backgroundColor: iconColor === preset.value ? preset.value : 'var(--color--bg-prime)',
                    color: iconColor === preset.value ? '#fff' : 'var(--color--text-prime)',
                    cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 旋转角度 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              旋转角度: {iconRotate}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              value={iconRotate}
              onChange={(e) => setIconRotate(Number(e.target.value))}
              style={{ width: '100%' }}
              title="调整旋转角度"
            />
          </div>

          {/* 禁用状态 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                title="切换禁用状态"
              />
              <span style={{ fontWeight: 'bold', color: 'var(--color--text-prime)' }}>禁用状态</span>
            </label>
          </div>

          {/* 当前参数显示 */}
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--color--bg-prime)', 
            border: '1px solid var(--color--border-secondary-trans)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>当前参数:</h4>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--color--text-prime)' }}>
{`<Icon
  name="${selectedIcon}"
  size={${typeof iconSize === 'string' ? `"${iconSize}"` : iconSize}}
  color="${iconColor}"
  rotate={${iconRotate}}
  disabled={${isDisabled}}
/>`}
            </pre>
          </div>
        </div>

        {/* 预览区域 */}
        <div>
          {/* 大型预览 */}
          <div style={{ 
            padding: '2rem', 
            border: '1px solid var(--color--border-secondary-trans)', 
            borderRadius: '8px',
            backgroundColor: 'var(--color--bg-prime)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: 'var(--color--text-prime)' }}>当前效果预览</h3>
            <div style={{ 
              padding: '2rem',
              backgroundColor: 'var(--color--bg-pale)',
              borderRadius: '8px',
              margin: '1rem 0'
            }}>
              <Icon
                name={selectedIcon}
                size={iconSize}
                color={iconColor}
                rotate={iconRotate}
                disabled={isDisabled}
                onClick={() => alert(`Clicked ${selectedIcon} icon!`)}
              />
            </div>
            <p style={{ color: 'var(--color--text-secondary)', fontSize: '0.9rem' }}>
              点击图标测试交互效果 (除非禁用)
            </p>
          </div>

          {/* 常用图标展示 */}
          <div style={{ 
            padding: '1.5rem', 
            border: '1px solid var(--color--border-secondary-trans)', 
            borderRadius: '8px',
            backgroundColor: 'var(--color--bg-prime)'
          }}>
            <h3 style={{ color: 'var(--color--text-prime)' }}>常用图标参考</h3>
            <p style={{ color: 'var(--color--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              点击图标名称可快速应用到预览区域
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
              gap: '1rem' 
            }}>
              {commonIcons.map((iconName) => (
                <div
                  key={iconName}
                  onClick={() => setSelectedIcon(iconName)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.75rem',
                    border: '1px solid var(--color--border-secondary-trans)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedIcon === iconName ? 'var(--color--semantic-active-pale)' : 'var(--color--bg-pale)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color--bg-darken)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = selectedIcon === iconName ? 'var(--color--semantic-active-pale)' : 'var(--color--bg-pale)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon name={iconName} size="medium" />
                  <span style={{ 
                    fontSize: '0.8rem', 
                    marginTop: '0.5rem', 
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    color: 'var(--color--text-prime)'
                  }}>
                    {iconName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        backgroundColor: 'var(--color--semantic-active-pale)', 
        borderRadius: '8px',
        border: '1px solid var(--color--semantic-active)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
          💡 使用说明
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color--text-prime)' }}>
          <li>在左侧控制面板调整图标参数，右侧实时预览效果</li>
          <li>可以手动输入任何 Material Icons 图标名称</li>
          <li>点击常用图标可快速切换到该图标</li>
          <li>支持自定义颜色、尺寸、旋转角度等参数</li>
          <li>可以测试禁用状态和点击交互效果</li>
          <li>复制底部生成的代码直接在项目中使用</li>
        </ul>
      </div>
    </div>
  );
}; 