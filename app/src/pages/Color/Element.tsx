import React from 'react';
import styles from './Element.module.scss';

export const Element: React.FC = () => {
  const grayColors = [
    { name: 'Gray 50', variable: '--gray-50', description: '最浅灰', fallback: '#fafafa' },
    { name: 'Gray 100', variable: '--gray-100', description: '极浅灰', fallback: '#f5f5f5' },
    { name: 'Gray 200', variable: '--gray-200', description: '浅灰', fallback: '#e5e5e5' },
    { name: 'Gray 300', variable: '--gray-300', description: '中浅灰', fallback: '#d4d4d4' },
    { name: 'Gray 400', variable: '--gray-400', description: '中灰', fallback: '#a3a3a3' },
    { name: 'Gray 500', variable: '--gray-500', description: '标准灰', fallback: '#737373' },
    { name: 'Gray 600', variable: '--gray-600', description: '中深灰', fallback: '#525252' },
    { name: 'Gray 700', variable: '--gray-700', description: '深灰', fallback: '#404040' },
    { name: 'Gray 800', variable: '--gray-800', description: '极深灰', fallback: '#262626' },
    { name: 'Gray 900', variable: '--gray-900', description: '最深灰', fallback: '#171717' },
  ];

  const semanticColors = [
    { 
      category: 'Background Colors',
      colors: [
        { name: 'Background Primary', variable: '--background-primary', description: '主要背景色', fallback: '#fafafa' },
        { name: 'Background Secondary', variable: '--background-secondary', description: '次要背景色', fallback: '#f5f5f5' },
        { name: 'Background Tertiary', variable: '--background-tertiary', description: '第三背景色', fallback: '#e5e5e5' },
      ]
    },
    {
      category: 'Text Colors',
      colors: [
        { name: 'Text Primary', variable: '--text-primary', description: '主要文本色', fallback: '#171717' },
        { name: 'Text Secondary', variable: '--text-secondary', description: '次要文本色', fallback: '#404040' },
        { name: 'Text Tertiary', variable: '--text-tertiary', description: '第三文本色', fallback: '#737373' },
        { name: 'Text Disabled', variable: '--text-disabled', description: '禁用文本色', fallback: '#a3a3a3' },
      ]
    },
    {
      category: 'Border Colors',
      colors: [
        { name: 'Border Light', variable: '--border-light', description: '浅边框色', fallback: '#e5e5e5' },
        { name: 'Border Medium', variable: '--border-medium', description: '中等边框色', fallback: '#d4d4d4' },
        { name: 'Border Strong', variable: '--border-strong', description: '深边框色', fallback: '#a3a3a3' },
      ]
    },
    {
      category: 'Surface Colors',
      colors: [
        { name: 'Surface Primary', variable: '--surface-primary', description: '主要表面色', fallback: '#ffffff' },
        { name: 'Surface Secondary', variable: '--surface-secondary', description: '次要表面色', fallback: '#fafafa' },
        { name: 'Surface Tertiary', variable: '--surface-tertiary', description: '第三表面色', fallback: '#f5f5f5' },
      ]
    }
  ];

  return (
    <div className={styles["color-showcase"]}>
      <div className={styles["showcase-container"]}>
        <h1>Moon Design System 灰度色阶</h1>
        <p className={styles["description"]}>
          基于 Moon Design System 设计理念制定的灰度色阶系统，支持明暗主题切换
        </p>
        
        {/* Gray Scale Colors */}
        <section className={styles["showcase-section"]}>
          <h2>灰度色阶 (Gray Scale)</h2>
          <div className={styles["color-grid"]}>
            {grayColors.map((color) => (
              <div key={color.variable} className={styles["color-item"]}>
                <div 
                  className={styles["color-preview"]} 
                  style={{ 
                    backgroundColor: `var(${color.variable}, ${color.fallback})`,
                  }}
                />
                <div className={styles["color-info"]}>
                  <h3>{color.name}</h3>
                  <p className={styles["color-variable"]}>{color.variable}</p>
                  <p className={styles["color-description"]}>{color.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        {semanticColors.map((category) => (
          <section key={category.category} className={styles["showcase-section"]}>
            <h2>{category.category}</h2>
            <div className={styles["semantic-grid"]}>
              {category.colors.map((color) => (
                <div key={color.variable} className={styles["semantic-item"]}>
                  <div 
                    className={styles["semantic-preview"]} 
                    style={{ 
                      backgroundColor: `var(${color.variable}, ${color.fallback})`,
                    }}
                  />
                  <div className={styles["semantic-info"]}>
                    <h3>{color.name}</h3>
                    <p className={styles["semantic-variable"]}>{color.variable}</p>
                    <p className={styles["semantic-description"]}>{color.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Usage Examples */}
        <section className={styles["showcase-section"]}>
          <h2>使用示例</h2>
          
          <div className={styles["usage-examples"]}>
            <div className={styles["example-card"]} style={{ 
              backgroundColor: 'var(--surface-primary, #ffffff)',
              border: '1px solid var(--border-light, #e5e5e5)'
            }}>
              <h3 style={{ color: 'var(--text-primary, #171717)' }}>示例卡片</h3>
              <p style={{ color: 'var(--text-secondary, #404040)' }}>
                这是一个使用语义化颜色变量的示例卡片
              </p>
              <p style={{ color: 'var(--text-tertiary, #737373)' }}>
                次要文本内容
              </p>
            </div>

            <div className={styles["example-card"]} style={{ 
              backgroundColor: 'var(--surface-secondary, #fafafa)',
              border: '1px solid var(--border-medium, #d4d4d4)'
            }}>
              <h3 style={{ color: 'var(--text-primary, #171717)' }}>另一个示例</h3>
              <p style={{ color: 'var(--text-secondary, #404040)' }}>
                不同的表面色和边框色
              </p>
              <button 
                className={styles["example-button"]}
                style={{ 
                  backgroundColor: 'var(--gray-600, #525252)',
                  color: 'var(--gray-100, #f5f5f5)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px'
                }}
              >
                示例按钮
              </button>
            </div>
          </div>
        </section>

        {/* Theme Toggle Demo */}
        <section className={styles["showcase-section"]}>
          <h2>主题切换</h2>
          <p>切换浏览器的暗色模式或在开发工具中修改 <code>data-theme</code> 属性来查看颜色变化</p>
          <div className={styles["theme-demo"]}>
            <div className={styles["theme-example"]}>
              <div style={{ 
                padding: '20px',
                backgroundColor: 'var(--background-primary, #fafafa)',
                border: '2px solid var(--border-medium, #d4d4d4)',
                borderRadius: '8px'
              }}>
                <h4 style={{ color: 'var(--text-primary, #171717)', margin: '0 0 10px 0' }}>
                  响应式主题
                </h4>
                <p style={{ color: 'var(--text-secondary, #404040)', margin: '0 0 10px 0' }}>
                  这个区域会根据系统主题自动调整颜色
                </p>
                <small style={{ color: 'var(--text-tertiary, #737373)' }}>
                  支持明暗主题自动切换
                </small>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 