# Tristan UI 用户使用指南

## 📋 概述

Tristan UI 现在提供灵活的安装选项，用户可以根据需求选择安装完整包或特定组件包。

## 📦 包选择指南

### 🎯 选择合适的包

| 使用场景 | 推荐包 | 包大小 | 安装命令 |
|---------|-------|--------|----------|
| **小型项目** | 仅需基础组件 | ~8KB | `npm i tristan-ui-core` |
| **Timeline 项目** | 需要时间轴功能 | ~15KB | `npm i tristan-ui-timeline tristan-ui-core` |
| **完整功能** | 使用所有组件 | ~20KB | `npm i tristan-ui` |

## 🚀 安装方式

### 方式 1：完整包（最简单）

```bash
# 安装完整的 Tristan UI
npm install tristan-ui

# 或使用 yarn
yarn add tristan-ui
```

**优点：**
- ✅ 一次安装，包含所有功能
- ✅ 无需管理多个依赖
- ✅ 适合大多数项目

**缺点：**
- ❌ 包体积稍大
- ❌ 可能包含不需要的功能

### 方式 2：按需安装（推荐）

```bash
# 只需要基础组件
npm install tristan-ui-core

# 需要 Timeline + 基础组件
npm install tristan-ui-core tristan-ui-timeline

# 或者只安装 Timeline（会自动包含 core 依赖）
npm install tristan-ui-timeline
```

**优点：**
- ✅ 按需安装，减少包体积
- ✅ 更精确的依赖控制
- ✅ 适合性能敏感项目

**缺点：**
- ❌ 需要管理多个包
- ❌ 添加新功能时需要额外安装

## 💻 使用方式

### 使用完整包：

```typescript
// 导入所有功能
import { Button, Timeline, Icon, Switch } from 'tristan-ui';

function App() {
  return (
    <div>
      <Button>基础按钮</Button>
      <Timeline data={timelineData} />
    </div>
  );
}
```

### 使用独立包：

```typescript
// 只使用基础组件
import { Button, Icon, Switch } from 'tristan-ui-core';

function BasicApp() {
  return (
    <div>
      <Button>基础按钮</Button>
      <Icon name="home" />
    </div>
  );
}

// 使用 Timeline 组件
import { Timeline } from 'tristan-ui-timeline';
import { Button } from 'tristan-ui-core';

function TimelineApp() {
  return (
    <div>
      <Button>控制按钮</Button>
      <Timeline data={timelineData} />
    </div>
  );
}
```

## 📚 组件分布

### tristan-ui-core 包含：

**基础组件 (General):**
- `Button` - 按钮组件
- `Icon` - 图标组件
- `Switch` - 开关组件
- `Tag` - 标签组件

**数据展示 (Data Display):**
- `ProgressCircle` - 进度圆环
- `Tooltip` - 提示框

**布局 (Layout):**
- `TristanLayout` - 基础布局

**导航 (Navigation):**
- `TopNav` - 顶部导航
- `FloatingButtonGroup` - 浮动按钮组

### tristan-ui-timeline 包含：

**Timeline 组件:**
- `Timeline` - 主时间轴组件
- `useTimelineZoom` - 缩放钩子

**Timeline 工具:**
- 时间计算函数
- 排序和分组工具
- 布局计算工具

**Timeline 钩子:**
- `useCenterBasedZoom` - 中心缩放
- `useVirtualizedTimeline` - 虚拟化
- `useZoomLevelMonitor` - 缩放监控

## 🔄 迁移指南

### 从旧版本迁移：

**如果你之前使用：**
```typescript
import { Button, Timeline } from 'tristan-ui-old';
```

**现在可以选择：**

```typescript
// 选项 1: 继续使用完整包
import { Button, Timeline } from 'tristan-ui';

// 选项 2: 按需导入
import { Button } from 'tristan-ui-core';
import { Timeline } from 'tristan-ui-timeline';
```

## 🎨 样式导入

### 完整包：
```typescript
// 样式会自动导入，无需额外操作
import { Button } from 'tristan-ui';
```

### 独立包：
```typescript
// 各包样式独立，但会自动导入
import { Button } from 'tristan-ui-core';        // 自动包含 core 样式
import { Timeline } from 'tristan-ui-timeline';  // 自动包含 timeline 样式
```

## 🔧 TypeScript 支持

所有包都提供完整的 TypeScript 类型定义：

```typescript
import type { ButtonProps } from 'tristan-ui-core';
import type { TimelineProps } from 'tristan-ui-timeline';

// 或从完整包导入
import type { ButtonProps, TimelineProps } from 'tristan-ui';
```

## 📦 包依赖关系

```
tristan-ui (完整包)
├── 重新导出 tristan-ui-core
└── 重新导出 tristan-ui-timeline

tristan-ui-timeline
└── 依赖 tristan-ui-core

tristan-ui-core
└── 无外部依赖（除了 React）
```

## ⚠️ 重要说明

### 不要混合安装：
```bash
# ❌ 错误：同时安装完整包和独立包
npm install tristan-ui tristan-ui-core

# ✅ 正确：选择其中一种方式
npm install tristan-ui
# 或
npm install tristan-ui-core tristan-ui-timeline
```

### 版本兼容性：
- 所有 `tristan-ui-*` 包版本应保持一致
- 完整包 `tristan-ui` 版本与组件包版本对应

### React 版本要求：
- React >= 18.0.0
- React DOM >= 18.0.0 