# 🎨 Tristan Design System

一个现代化的 React 组件库，专为优雅的用户界面而设计。

[![npm version](https://badge.fury.io/js/tristan-design-system.svg)](https://badge.fury.io/js/tristan-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🧩 **模块化组件** - 每个组件都经过精心设计，具有良好的可复用性
- 🎨 **一致的设计语言** - 统一的设计原则确保整个系统的视觉一致性
- 📱 **响应式设计** - 所有组件都支持移动端和桌面端的完美适配
- ⚡ **高性能** - 基于现代 React 技术栈，确保最佳的渲染性能
- 🔧 **TypeScript 支持** - 完整的类型定义，提供更好的开发体验
- 🎯 **易于定制** - 支持主题定制和样式覆盖

## 📦 安装

使用 npm:
```bash
npm install tristan-design-system
```

使用 yarn:
```bash
yarn add tristan-design-system
```

使用 pnpm:
```bash
pnpm add tristan-design-system
```

## 🚀 快速开始

### 基本使用

```tsx
import React from 'react';
import { Button } from 'tristan-design-system';
// 如果需要样式，请导入 CSS 文件
import 'tristan-design-system/dist/style.css';

function App() {
  return (
    <div>
      <Button color="primary" size="large">
        Hello World
      </Button>
    </div>
  );
}

export default App;
```

### 使用多个组件

```tsx
import React, { useState } from 'react';
import { Button } from 'tristan-design-system';
import 'tristan-design-system/dist/style.css';

function MyApp() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <h1>我的应用</h1>
      
      {/* 不同颜色的按钮 */}
      <Button color="primary">主要按钮</Button>
      <Button color="secondary">次要按钮</Button>
      <Button color="success">成功按钮</Button>
      <Button color="warning">警告按钮</Button>
      <Button color="error">错误按钮</Button>
      
      {/* 不同变体的按钮 */}
      <Button variant="contained">填充按钮</Button>
      <Button variant="outlined">边框按钮</Button>
      <Button variant="text">文本按钮</Button>
      
      {/* 不同尺寸的按钮 */}
      <Button size="small">小按钮</Button>
      <Button size="medium">中等按钮</Button>
      <Button size="large">大按钮</Button>
      
      {/* 状态按钮 */}
      <Button disabled>禁用按钮</Button>
      <Button loading={loading} onClick={handleClick}>
        {loading ? '加载中...' : '点击加载'}
      </Button>
    </div>
  );
}

export default MyApp;
```

## 📚 组件文档

### Button 组件

#### 属性 (Props)

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `variant` | `'contained' \| 'outlined' \| 'text'` | `'contained'` | 按钮变体 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | 按钮颜色 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `onClick` | `(event: MouseEvent) => void` | - | 点击事件处理函数 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮类型 |
| `className` | `string` | - | 自定义 CSS 类名 |
| `children` | `ReactNode` | - | 按钮内容 |

#### 示例

```tsx
// 基本用法
<Button>默认按钮</Button>

// 不同变体
<Button variant="outlined" color="primary">边框按钮</Button>
<Button variant="text" color="secondary">文本按钮</Button>

// 不同尺寸
<Button size="small">小按钮</Button>
<Button size="large">大按钮</Button>

// 状态
<Button disabled>禁用按钮</Button>
<Button loading>加载中</Button>

// 事件处理
<Button onClick={() => console.log('clicked')}>
  点击我
</Button>
```

## 🎨 自定义样式

你可以通过 CSS 变量来自定义组件的样式：

```css
:root {
  --tristan-color-primary: #your-primary-color;
  --tristan-color-secondary: #your-secondary-color;
  /* 更多变量... */
}
```

或者通过 CSS 类覆盖：

```css
.my-custom-button {
  background-color: #your-color;
  border-radius: 12px;
}
```

```tsx
<Button className="my-custom-button">
  自定义样式按钮
</Button>
```

## 🌍 浏览器支持

- Chrome ≥ 88
- Firefox ≥ 85
- Safari ≥ 14
- Edge ≥ 88

## 🤝 贡献

我们欢迎所有形式的贡献！请查看我们的 [贡献指南](CONTRIBUTING.md)。

## 📄 许可证

MIT © [Your Name](https://github.com/yourusername)

## 🔗 相关链接

- [GitHub Repository](https://github.com/wenchuanlilizhao/tristan-design-system)
- [Issues](https://github.com/wenchuanlilizhao/tristan-design-system/issues)
- [Changelog](CHANGELOG.md)

## 📞 支持

如果你遇到任何问题或有建议，请：

1. 查看 [FAQ](FAQ.md)
2. 搜索 [现有的 Issues](https://github.com/wenchuanlilizhao/tristan-design-system/issues)
3. 创建一个新的 [Issue](https://github.com/wenchuanlilizhao/tristan-design-system/issues/new)
