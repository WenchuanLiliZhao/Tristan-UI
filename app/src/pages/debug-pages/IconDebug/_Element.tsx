import React, { useState } from 'react';
import { Icon } from '../../../design-system/ui-components';

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
      <h1 style={{ color: 'var(--color--text-prime)' }}>Material Icons Debug Tool</h1>
      <p style={{ color: 'var(--color--text-secondary)' }}>Debug and test various parameters and styling effects of the Material Icons component.</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '2rem', 
        marginTop: '2rem' 
      }}>
        {/* Control Panel */}
        <div style={{ 
          padding: '1.5rem', 
          border: '1px solid var(--color--border-secondary-trans)', 
          borderRadius: '8px',
          backgroundColor: 'var(--color--bg-pale)'
        }}>
          <h3 style={{ color: 'var(--color--text-prime)' }}>Parameter Control Panel</h3>
          
          {/* Icon Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              Icon Name
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
              placeholder="Enter Material Icons name"
            />
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              Size
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
              title="Select icon size"
            >
              {sizeOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              Color
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="color"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px' }}
                title="Select color"
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
                placeholder="Enter color value (e.g: var(--color--semantic-active))"
                title="Color value"
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

          {/* Rotation Angle */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color--text-prime)' }}>
              Rotation Angle: {iconRotate}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              value={iconRotate}
              onChange={(e) => setIconRotate(Number(e.target.value))}
              style={{ width: '100%' }}
              title="Adjust rotation angle"
            />
          </div>

          {/* Disabled State */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                title="Toggle disabled state"
              />
              <span style={{ fontWeight: 'bold', color: 'var(--color--text-prime)' }}>Disabled State</span>
            </label>
          </div>

          {/* Current Parameters Display */}
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--color--bg-prime)', 
            border: '1px solid var(--color--border-secondary-trans)',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Current Parameters:</h4>
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

        {/* Preview Area */}
        <div>
          {/* Large Preview */}
          <div style={{ 
            padding: '2rem', 
            border: '1px solid var(--color--border-secondary-trans)', 
            borderRadius: '8px',
            backgroundColor: 'var(--color--bg-prime)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: 'var(--color--text-prime)' }}>Current Effect Preview</h3>
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
              Click the icon to test interactive effects (unless disabled)
            </p>
          </div>

          {/* Common Icons Display */}
          <div style={{ 
            padding: '1.5rem', 
            border: '1px solid var(--color--border-secondary-trans)', 
            borderRadius: '8px',
            backgroundColor: 'var(--color--bg-prime)'
          }}>
            <h3 style={{ color: 'var(--color--text-prime)' }}>Common Icons Reference</h3>
            <p style={{ color: 'var(--color--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Click on icon names to quickly apply them to the preview area
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

      {/* Usage Instructions */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        backgroundColor: 'var(--color--semantic-active-pale)', 
        borderRadius: '8px',
        border: '1px solid var(--color--semantic-active)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
          💡 Usage Instructions
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color--text-prime)' }}>
          <li>Adjust icon parameters in the left control panel, preview effects in real-time on the right</li>
          <li>You can manually enter any Material Icons icon name</li>
          <li>Click on common icons to quickly switch to that icon</li>
          <li>Supports custom colors, sizes, rotation angles and other parameters</li>
          <li>You can test disabled states and click interaction effects</li>
          <li>Copy the generated code at the bottom to use directly in your project</li>
        </ul>
      </div>
    </div>
  );
}; 