# Tristan UI 项目管理指南

## 📋 概述

Tristan UI 采用 Monorepo + 多包架构。本指南说明如何管理各个包的入口文件 (`index.ts`)。

## 📁 包结构

```
react/
├── packages/                   # 库代码
│   ├── core/                  # @tristan-ui/core - 基础组件
│   ├── timeline/              # @tristan-ui/timeline - Timeline 组件
│   └── all/                   # tristan-ui - 完整包
└── demo/                      # 演示应用（不再有重复代码）
```

## 🔧 index.ts 配置规则

### 1. Core 包 (`packages/core/src/index.ts`)

**你需要管理：**
- ✅ 添加新组件的导出
- ✅ 更新类型导出
- ✅ 维护版本号

**配置模式：**
```typescript
// 类型导出 - 添加新类型时更新这里
export type { BaseComponentProps, Size, Color } from './types';

// 组件导出 - 添加新组件分类时更新这里
export * from './general';        // Button, Icon, Switch, Tag
export * from './data-display';   // ProgressCircle, Tooltip
export * from './layout';         // TristanLayout
export * from './navigation';     // TopNav, FloatingButtonGroup

// 样式导入
import '../styles/_app.scss';

// 版本信息 - 发布时自动更新
export const version = '0.4.8';
```

### 2. Timeline 包 (`packages/timeline/src/index.ts`)

**你需要管理：**
- ✅ 添加新 Timeline 相关功能
- ✅ 更新 Timeline 类型
- ✅ 维护版本号

**配置模式：**
```typescript
// 主组件导出
export { Timeline, useTimelineZoom } from './ui/Timeline';

// 类型导出
export type { TimelineProps, TimelineItemType } from './types';

// 配置助手导出
export { createFieldConfig } from './types';

// 工具函数导出
export { sortTimelineItemsByStartDate } from './utils';

// 钩子导出
export { useCenterBasedZoom } from './hooks';

// 样式和版本
import '../styles/_app.scss';
export const version = '0.4.8';
```

### 3. 完整包 (`packages/all/src/index.ts`)

**你不需要管理：**
- ❌ 这个文件基本不用手动修改
- ❌ 它自动重新导出其他包的内容

### 4. 演示应用 (`demo/`)

**你不需要管理重复代码：**
- ❌ 演示应用直接从 `@tristan-ui/core` 和 `@tristan-ui/timeline` 导入
- ❌ 不再有重复的组件实现

## 📝 日常管理清单

### 添加新的基础组件时：
1. 在 `packages/core/src/` 下创建组件
2. 在对应分类的 `index.ts` 中导出 (如 `general/index.ts`)
3. 在 `packages/core/src/index.ts` 中确保分类已导出
4. 演示页面自动可用（通过 `@tristan-ui/core` 导入）

### 添加新的 Timeline 功能时：
1. 在 `packages/timeline/src/` 下创建功能
2. 在 `packages/timeline/src/index.ts` 中添加导出
3. 演示页面自动可用（通过 `@tristan-ui/timeline` 导入）

### 添加新的大型组件包时：
1. 在 `packages/` 下创建新目录
2. 创建独立的 `index.ts`
3. 在 `packages/all/src/index.ts` 中添加重新导出
4. 在 `demo/package.json` 中添加依赖

## ⚠️ 重要注意事项

- **单一数据源：** 只有 `packages/` 中的代码是真实的
- **版本同步：** 所有包的版本号应保持一致
- **依赖关系：** Timeline 包依赖 Core 包，确保正确引用
- **演示应用：** 直接从包导入，无重复代码 