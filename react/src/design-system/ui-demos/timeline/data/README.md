# Timeline Data Module

这个目录是 Timeline 组件的**核心数据层**，提供了完整的数据处理、类型安全、时间计算和布局算法功能。它不仅包含颜色系统，还涵盖了时间线组件所需的全部底层功能。

## 📁 文件结构

```
data/
├── README.md           # 📖 本说明文档
├── index.ts           # 📤 统一导出入口
├── types.ts           # 🏷️ TypeScript 类型定义 (325行)
├── hooks.ts           # 🎣 React Hooks (166行)
└── utils.ts           # 🔧 数据处理工具函数 (262行)
```

## 🎯 核心功能概览

### 📊 **数据处理与算法**
- **智能布局算法** - 自动避免时间线项目重叠
- **时间计算引擎** - 处理日期范围、持续时间、重叠检测
- **数据分组与排序** - 按任意字段分组，智能排序算法

### 🎨 **颜色系统**
- **设计系统集成** - Rainbow 和 Semantic 颜色支持
- **灵活的颜色方案** - 支持 CSS 变量、十六进制等多种格式
- **类型安全的颜色 API** - 防止颜色配置错误

### ⚡ **React Hooks**
- **浏览器手势控制** - 禁用影响时间线的浏览器导航手势
- **缩放功能支持** - 为时间线缩放提供容器引用

### 🏗️ **类型系统**
- **强类型支持** - 完整的 TypeScript 类型定义
- **泛型设计** - 支持自定义数据结构扩展
- **配置构建器** - 简化复杂配置的创建

## 🎨 颜色系统

Timeline 组件支持三种颜色使用方式：

### ✅ 支持的颜色格式

#### 1. 设计系统 Rainbow 颜色
```typescript
import { getRainbowColor } from "../../../../styles/color";

const priority = {
  high: {
    name: "High Priority",
    color: getRainbowColor('rose'),     // → '--color-chart--rainbow-rose'
    icon: "stat_2"
  }
};
```

**可用颜色**: `'amber'`, `'orange'`, `'rose'`, `'pink'`, `'purple'`, `'blue'`, `'cyan'`, `'emerald'`

#### 2. 设计系统 Semantic 颜色
```typescript
import { getSemanticColor } from "../../../../styles/color";

const status = {
  success: {
    name: "Success",
    color: getSemanticColor('success'),  // → '--color--semantic-success'
  }
};
```

**可用颜色**: `'active'`, `'success'`, `'warning'`, `'error'`

#### 3. 直接 CSS 颜色值
```typescript
const custom = {
  brand: {
    name: "Brand Color",
    color: '#ff6b6b',                   // 十六进制
  },
  theme: {
    name: "Theme Color", 
    color: 'var(--my-custom-color)',    // CSS 变量函数
  },
  transparent: {
    name: "Semi-transparent",
    color: 'rgba(255, 107, 107, 0.7)',  // RGBA
  }
};
```

## 🏷️ 核心类型 (`types.ts`)

### `BaseTimelineItemType`
Timeline 项目的基础接口，包含四个必需字段：

```typescript
interface BaseTimelineItemType {
  id: string;           // 唯一标识符
  name: string;         // 显示名称
  startDate: Date;      // 开始时间
  endDate: Date;        // 结束时间
}
```

### `TimelineColorType`
颜色类型定义，支持三种颜色格式：

```typescript
type TimelineColorType = RainbowColorVar | SemanticColorVar | string;
```

### `createFieldConfig`
简化配置对象创建的工具函数：

```typescript
// 进度条配置
createFieldConfig.progress<T>(field, options?)

// 图标配置  
createFieldConfig.iconFromMap<T>(field, colorMap)

// 标签配置
createFieldConfig.tagFromMap<T>(field, colorMap, options?)
```

## 🎣 React Hooks (`hooks.ts`)

### `useCenterBasedZoom`
为 Timeline 提供缩放功能的容器引用：

```typescript
const { containerRef } = useCenterBasedZoom(zoomLevel);

// 使用方式
<div ref={containerRef}>
  {/* Timeline 内容 */}
</div>
```

### `useDisableBrowserGestures`
禁用浏览器导航手势，防止时间线操作时触发浏览器前进/后退：

```typescript
const timelineRef = useDisableBrowserGestures();

return (
  <div ref={timelineRef}>
    {/* Timeline 容器，自动禁用浏览器手势 */}
  </div>
);
```

**功能特性**：
- 🚫 禁用横向滚轮导航 
- 🚫 阻止触摸板手势导航
- 🚫 防止触摸滑动触发浏览器前进/后退
- 🎯 只在鼠标悬停时激活，离开后自动恢复

## 🔧 工具函数 (`utils.ts`)

### 📊 **数据处理函数**

#### `groupTimelineItemsByField`
按指定字段对 Timeline 数据进行分组，返回结构化数据：

```typescript
const groupedData = groupTimelineItemsByField(projects, 'team');
// 返回: { meta: { sortBy: 'team' }, data: [...] }
```

#### `sortTimelineItemsByStartDate`
按开始时间对 Timeline 项目进行排序：

```typescript
const sortedItems = sortTimelineItemsByStartDate(items);
```

### ⏰ **时间计算函数**

#### `TimelineItemInterval`
计算时间线显示的时间范围（年份和起始月份）：

```typescript
const { years, startMonth } = TimelineItemInterval({ inputData });
// 返回: { years: [2023, 2024], startMonth: 2 }
```

#### `calculateDurationInDays`
计算两个日期之间的持续天数（包含起止日期）：

```typescript
const duration = calculateDurationInDays(startDate, endDate);
// 返回: 天数 (number)
```

#### `doDateRangesOverlap`
检测两个时间段是否重叠：

```typescript
const hasOverlap = doDateRangesOverlap(start1, end1, start2, end2);
// 返回: boolean
```

### 🎯 **布局算法函数**

#### `findPlacement`
智能布局算法，为新的时间线项目找到合适的垂直位置，避免重叠：

```typescript
const column = findPlacement(placements, item, startDate, endDate);
// 返回: 列号 (number)，用于垂直排列
```

#### `calculateMaxOverlapCardinality`
计算时间线项目的最大重叠数，用于优化布局：

```typescript
const maxOverlap = calculateMaxOverlapCardinality(items);
// 返回: 最大同时重叠的项目数
```

### 🎨 **颜色辅助函数**

#### `getStatusColor` / `getTeamColor`
预定义的状态和团队颜色映射（兼容性函数）：

```typescript
const statusColor = getStatusColor("On Track");  // → "#28a745"
const teamColor = getTeamColor("Engineering");   // → "#20c997"
```

### 📅 **日期工具函数**

#### `getDaysInMonth`
获取指定月份的天数：

```typescript
const days = getDaysInMonth(2024, 1); // February 2024 → 29
```

#### `monthNames`
月份名称常量数组：

```typescript
export const monthNames = ["Jan", "Feb", "Mar", ...];
```

## 🚀 算法与性能

### 📐 **智能布局算法**

Timeline 使用了先进的布局算法来处理项目重叠：

```typescript
// 算法工作原理示例
const placements: PlacementResult[] = [];

items.forEach(item => {
  const column = findPlacement(placements, item, item.startDate, item.endDate);
  placements.push({
    column,
    item,
    startDate: item.startDate,
    endDate: item.endDate
  });
});
```

**算法特点**：
- ⚡ **O(n×k) 时间复杂度** - n为项目数，k为最大重叠数
- 🎯 **贪心策略** - 优先使用最低可用列
- 🔄 **动态适应** - 自动处理任意数量的重叠项目

### 📊 **重叠检测算法**

使用扫描线算法计算最大重叠数：

```typescript
// 事件点算法示例
const events = [
  { date: startDate, type: 'start' },
  { date: endDate, type: 'end' }
];

// 按时间排序，同时间点 end 事件优先
events.sort((a, b) => {
  const timeDiff = a.date.getTime() - b.date.getTime();
  return timeDiff === 0 ? (a.type === 'end' ? -1 : 1) : timeDiff;
});
```

**性能优势**：
- ⚡ **单次扫描** - O(n log n) 时间复杂度
- 💾 **内存高效** - 只存储事件点，不存储完整区间
- 🎯 **精确计算** - 处理边界情况和同时间点事件

## 📝 使用示例

### 基础使用
```typescript
import {
  type TimelineConfigType,
  type ProjectDataType,
  createFieldConfig,
  groupTimelineItemsByField
} from "./data";
import { getRainbowColor, getSemanticColor } from "../../../styles/color";

// 1. 定义数据类型
interface ProjectDataType extends BaseTimelineItemType {
  priority: 'high' | 'medium' | 'low';
  status: 'planning' | 'active' | 'completed';
  progress: number;
}

// 2. 定义颜色映射
const priorityColors = {
  high: {
    name: "High Priority",
    color: getRainbowColor('rose'),
    icon: "stat_2"
  },
  medium: {
    name: "Medium Priority",
    color: getSemanticColor('warning'),
    icon: "stat_1"
  },
  low: {
    name: "Low Priority", 
    color: '#10b981',
    icon: "stat_minus_1"
  }
};

// 3. 配置 Timeline
const timelineConfig: TimelineConfigType<ProjectDataType> = {
  groupBy: "status",
  itemDisplayConfig: {
    graphicFields: [
      createFieldConfig.progress<ProjectDataType>("progress"),
      createFieldConfig.iconFromMap<ProjectDataType>("priority", priorityColors)
    ],
    tagFields: [
      createFieldConfig.tagFromMap<ProjectDataType>("status", statusColors)
    ]
  }
};

// 4. 处理数据
const sortedData = groupTimelineItemsByField(projectData, "status");
```

### 高级配置
```typescript
// 使用配置构建器
const config = new TimelineConfigBuilder<ProjectDataType>()
  .addProgress("progress", { showText: true })
  .addIcon("priority", priorityColors)
  .addTag("status", statusColors, { variant: "outlined" })
  .build();
```

## 🎯 最佳实践

### 1. 颜色选择指导
- **优先使用设计系统颜色** (`getRainbowColor`, `getSemanticColor`)
- **语义化颜色命名** (high=rose, success=emerald, warning=amber)
- **保持一致性** (同一概念在不同地方使用相同颜色)

### 2. 类型安全
```typescript
// ✅ 推荐：明确定义数据类型
interface MyProjectType extends BaseTimelineItemType {
  priority: 'high' | 'medium' | 'low';
  team: string;
}

// ❌ 避免：使用 any 或过于宽泛的类型
```

### 3. 配置复用
```typescript
// ✅ 推荐：创建可复用的配置
export const standardProjectConfig = TimelineTemplates.projectManagement({
  priority: priorityColors,
  status: statusColors,
  team: teamColors
});
```

## 🔍 API 参考

详细的 API 文档请参考各个文件中的 TypeScript 类型定义和 JSDoc 注释。

### 快速链接
- [类型定义](./types.ts) - 完整的 TypeScript 接口
- [React Hooks](./hooks.ts) - 数据处理 Hooks
- [工具函数](./utils.ts) - 数据处理工具
- [统一导出](./index.ts) - 所有导出的 API

## 🚀 开始使用

```typescript
// 导入所需的类型和工具
import {
  type TimelineConfigType,
  type BaseTimelineItemType,
  createFieldConfig,
  groupTimelineItemsByField
} from "@/design-system/ui-demos/timeline/data";

// 开始构建你的 Timeline！
```

## 🔧 故障排除与优化

### ⚡ **性能优化建议**

#### 大数据集处理
```typescript
// ✅ 推荐：对于超过1000个项目的数据集
const optimizedData = useMemo(() => {
  return groupTimelineItemsByField(largeDataset, 'category');
}, [largeDataset]);
```

#### 颜色配置缓存
```typescript
// ✅ 推荐：缓存颜色映射对象
const colorMaps = useMemo(() => ({
  priority: {
    high: { name: "High", color: getRainbowColor('rose') },
    medium: { name: "Medium", color: getSemanticColor('warning') }
  }
}), []);
```

### 🐛 **常见问题解决**

#### 时间线项目重叠显示不正确
```typescript
// 检查数据格式
const validItem: BaseTimelineItemType = {
  id: "unique-id",
  name: "Project Name", 
  startDate: new Date("2024-01-01"),  // ✅ 必须是 Date 对象
  endDate: new Date("2024-03-01")     // ✅ 必须是 Date 对象
};
```

#### 颜色不显示
```typescript
// ❌ 错误：使用颜色名称字符串
color: 'rose'

// ✅ 正确：使用函数或 CSS 值
color: getRainbowColor('rose')      // 设计系统颜色
color: '#ff6b6b'                    // 自定义颜色
color: 'var(--my-custom-color)'     // CSS 变量
```

#### 浏览器手势冲突
```typescript
// ✅ 解决方案：使用手势禁用 Hook
const timelineRef = useDisableBrowserGestures();

return (
  <div ref={timelineRef} className="timeline-container">
    {/* Timeline 内容 */}
  </div>
);
```

### 📊 **数据结构验证**

```typescript
// 验证时间线数据的完整性
const validateTimelineData = (items: TimelineItemType[]) => {
  return items.every(item => 
    item.id && 
    item.name && 
    item.startDate instanceof Date && 
    item.endDate instanceof Date &&
    item.startDate <= item.endDate
  );
};
```

### 🎯 **类型安全最佳实践**

```typescript
// ✅ 推荐：定义严格的数据接口
interface ProjectDataType extends BaseTimelineItemType {
  priority: 'high' | 'medium' | 'low';  // 限制可选值
  status: 'planning' | 'active' | 'completed';
  progress: number;  // 0-100
  team: string;
}

// ✅ 推荐：使用类型断言保证数据安全
const safeData = data.filter((item): item is ProjectDataType => 
  typeof item.priority === 'string' && 
  typeof item.progress === 'number'
);
```

---

💡 **提示**: 如果你需要更多示例或遇到问题，请查看 `../example-data/` 目录中的实际使用案例。

🔗 **相关文档**:
- [Timeline 组件使用指南](../README.md)
- [设计系统颜色文档](../../../../styles/README.md)
- [React Hooks 最佳实践](https://react.dev/reference/react/hooks) 