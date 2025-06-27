# 🎯 Tristan UI - Monorepo 多包结构

Tristan UI 现在采用 **Monorepo + Multi-package** 架构，让用户可以按需选择组件包，优化项目体积。

## 📦 包结构概览

```
react/
├── packages/
│   ├── core/           # @tristan-ui/core - 核心组件包
│   ├── timeline/       # @tristan-ui/timeline - Timeline 组件包  
│   └── all/            # tristan-ui - 完整包（元包）
├── package.json        # 工作区配置
└── scripts/
    └── publish.sh      # 发布脚本
```

## 🎪 包说明

### 📦 @tristan-ui/core
**轻量级核心组件包** - 包含基础设计系统组件

```bash
npm install @tristan-ui/core
```

**包含组件：**
- Button, Icon, Switch, Tag
- Layout 组件 (TristanLayout)
- 数据展示组件 (ProgressCircle, Tooltip)
- 导航组件 (TopNav, FloatingButtonGroup)

**包体积：** ~1,974 行代码，优化的轻量级体验

**使用示例：**
```typescript
import { Button, Icon, Switch } from '@tristan-ui/core';
import '@tristan-ui/core/style.css';

function App() {
  return (
    <div>
      <Button variant="filled">Click me</Button>
      <Icon name="home" />
      <Switch checked={true} />
    </div>
  );
}
```

### ⏱️ @tristan-ui/timeline
**高级 Timeline 组件包** - 功能丰富的时间线可视化组件

```bash
npm install @tristan-ui/timeline @tristan-ui/core
```

**核心特性：**
- 智能布局算法，避免项目重叠
- 多级时间缩放 (年/月/日视图)
- 分组显示和数据过滤
- 虚拟化渲染，支持大数据集
- 响应式设计

**包体积：** ~3,662 行代码，专业级数据可视化

**使用示例：**
```typescript
import { Timeline } from '@tristan-ui/timeline';
import { Button } from '@tristan-ui/core';
import '@tristan-ui/timeline/style.css';

const data = [
  {
    id: "1",
    name: "项目 Alpha",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-01"),
  }
];

function App() {
  return <Timeline inputData={data} />;
}
```

### 🎯 tristan-ui
**完整包** - 包含所有组件的元包

```bash
npm install tristan-ui
```

**特点：**
- 重新导出所有子包内容
- 无感知使用体验，向后兼容
- 适合需要完整功能的项目

**使用示例：**
```typescript
import { Button, Timeline } from 'tristan-ui';
import 'tristan-ui/style.css';

// 可以同时使用所有组件
```

## 🚀 开发和构建

### 安装依赖
```bash
npm install  # 安装所有工作区依赖
```

### 构建单个包
```bash
npm run build:core      # 构建核心包
npm run build:timeline  # 构建 timeline 包
```

### 构建所有包
```bash
npm run build:lib  # 构建所有库包
```

### 发布流程
```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

## 💡 选择指南

### 选择 @tristan-ui/core 如果：
- ✅ 项目需要基础的设计系统组件
- ✅ 优先考虑包体积和加载性能
- ✅ 不需要复杂的数据可视化功能
- ✅ 快速原型和小型项目

### 选择 @tristan-ui/timeline 如果：
- ✅ 需要专业级的时间线可视化
- ✅ 处理项目管理、甘特图类需求
- ✅ 需要高级数据展示功能
- ✅ 企业级应用开发

### 选择 tristan-ui 如果：
- ✅ 需要完整的组件生态系统
- ✅ 希望简化包管理
- ✅ 长期项目，体积不是主要考虑因素
- ✅ 向后兼容现有代码

## 📊 体积对比

| 包名 | 代码行数 | 预估体积 | 适用场景 |
|------|----------|----------|----------|
| @tristan-ui/core | ~1,974 行 | 轻量级 | 基础项目 |
| @tristan-ui/timeline | ~3,662 行 | 中等 | 数据可视化 |
| tristan-ui | ~5,636 行 | 完整 | 企业应用 |

## 🔧 迁移指南

### 从单包迁移到多包：

**之前：**
```typescript
import { Button, Timeline } from 'tristan-ui';
```

**现在（按需选择）：**
```typescript
// 选项 1: 按需安装
import { Button } from '@tristan-ui/core';
import { Timeline } from '@tristan-ui/timeline';

// 选项 2: 继续使用完整包（无需修改代码）
import { Button, Timeline } from 'tristan-ui';
```

## 🎉 优势总结

✅ **按需加载**: 只安装需要的组件，优化项目体积  
✅ **渐进增强**: 从核心包开始，根据需要添加高级功能  
✅ **向后兼容**: 完整包保持原有的使用方式  
✅ **独立版本**: 各包可以独立发版和更新  
✅ **清晰职责**: 核心组件 vs 高级功能分离明确

这种架构让 Tristan UI 既保持了灵活性，又满足了不同项目的性能要求。🚀 