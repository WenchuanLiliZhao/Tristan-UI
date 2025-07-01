# Timeline Sidebar 属性分布可视化指南

## 概述

Timeline 组件现在支持在左侧边栏显示每个分组中属性的分布可视化。这个功能让用户能够快速了解各个分组中不同属性值的分布情况，比如状态、团队、优先级、进度等。

支持两种类型的属性分布：
- **映射类型**：适用于有限枚举值的字段（如状态、团队、优先级）
- **进度类型**：适用于数值字段（如进度、完成百分比）

## 效果展示

在侧边栏的每个分组标题下方，会显示颜色条来表示该分组中各属性值的分布比例。每种颜色代表不同的属性值，颜色条的宽度表示该属性值在组中的占比。

## 基本用法

### 1. 导入必要的工具

```typescript
import { 
  Timeline, 
  createSidebarProperty 
} from "tristan-ui";
```

### 2. 映射类型属性

适用于有限枚举值的字段，如状态、团队、优先级等：

```typescript
import { getRainbowColor } from "tristan-ui";

// 状态映射
const statusMap = {
  high: {
    name: "高优先级",
    color: getRainbowColor('rose')
  },
  medium: {
    name: "中优先级", 
    color: getRainbowColor('amber')
  },
  low: {
    name: "低优先级",
    color: getRainbowColor('emerald')
  }
};

// 团队映射
const teamMap = {
  engineering: {
    name: "工程团队",
    color: getRainbowColor('purple')
  },
  design: {
    name: "设计团队",
    color: getRainbowColor('orange')
  },
  product: {
    name: "产品团队",
    color: getRainbowColor('pink')
  }
};
```

### 3. 进度类型属性 (新功能)

适用于数值字段，如进度、完成百分比等：

```typescript
// 使用默认 tooltip 配置
const sidebarProperties = [
  createSidebarProperty.fromProgressField<ProjectDataType>("progress", {
    label: "进度分布",
    maxValueOfEachItem: 100, // 每个项目的最大值
    // 不指定 tooltip 时，使用默认配置：
    // - [0, 0]: "not started" (灰色)
    // - [0, 100): "in progress" (绿色)  
    // - [100, 100]: "done" (绿色)
  }),
];

// 使用自定义 tooltip 配置
const sidebarPropertiesCustom = [
  createSidebarProperty.fromProgressField<ProjectDataType>("progress", {
    label: "进度分布",
    maxValueOfEachItem: 100,
    tooltip: [
      {
        interval: ["closed", 0, 0, "closed"],
        label: "未开始",
        color: grayColors.gray5,
      },
      {
        interval: ["open", 0, 30, "closed"],
        label: "刚开始",
        color: getRainbowColor("rose"),
      },
      {
        interval: ["open", 30, 70, "closed"],
        label: "进行中",
        color: getRainbowColor("amber"),
      },
      {
        interval: ["open", 70, 100, "open"],
        label: "即将完成",
        color: getRainbowColor("blue"),
      },
      {
        interval: ["closed", 100, 100, "closed"],
        label: "已完成",
        color: getRainbowColor("emerald"),
      },
    ]
  }),
];
```

### 4. 配置 Sidebar 属性

```typescript
// 混合使用映射类型和进度类型
const sidebarProperties = [
  // 映射类型
  createSidebarProperty.fromMap<ProjectDataType>("status", statusMap, {
    label: "状态分布",
    showCount: false,
  }),
  createSidebarProperty.fromMap<ProjectDataType>("team", teamMap, {
    label: "团队分布",
    showCount: true,
  }),
  
  // 进度类型
  createSidebarProperty.fromProgressField<ProjectDataType>("progress", {
    label: "进度分布",
    maxValueOfEachItem: 100,
  }),
];
```

### 5. 传递给 Timeline 组件

```typescript
<Timeline<ProjectDataType>
  inputData={ExampleData}
  groupByOptions={groupByOptions}
  sidebarProperties={sidebarProperties}  // 🎯 添加这一行
  zoomLevels={zoomLevels}
/>
```

## 完整示例

```typescript
import React from "react";
import { 
  Timeline, 
  createSidebarProperty,
  getRainbowColor 
} from "tristan-ui";

// 定义数据类型
interface ProjectData {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: 'high' | 'medium' | 'low';
  team: 'engineering' | 'design' | 'product';
  priority: 'urgent' | 'normal' | 'low';
}

// 定义属性映射
const statusMap = {
  high: { name: "高风险", color: getRainbowColor('rose') },
  medium: { name: "中风险", color: getRainbowColor('amber') },
  low: { name: "低风险", color: getRainbowColor('emerald') }
};

const teamMap = {
  engineering: { name: "工程", color: getRainbowColor('purple') },
  design: { name: "设计", color: getRainbowColor('orange') },
  product: { name: "产品", color: getRainbowColor('pink') }
};

function MyTimeline() {
  // 配置sidebar属性分布
  const sidebarProperties = [
    createSidebarProperty.fromMap<ProjectData>("status", statusMap, {
      label: "风险分布",
    }),
    createSidebarProperty.fromMap<ProjectData>("team", teamMap, {
      label: "团队分布",
      showCount: true,
    }),
  ];

  return (
    <Timeline<ProjectData>
      inputData={projectData}
      sidebarProperties={sidebarProperties}
      groupByOptions={[
        { label: "按类别", field: "category" },
        { label: "按团队", field: "team" }
      ]}
    />
  );
}
```

## 配置选项

### `createSidebarProperty.fromMap` 参数说明 (映射类型)

| 参数 | 类型 | 说明 |
|------|------|------|
| `field` | `keyof T` | 要显示分布的数据字段名 |
| `mapping` | `Record<string, { name: string; color: string }>` | 字段值到显示名称和颜色的映射 |
| `options.label` | `string?` | 可选的显示标签，会显示在分布条上方 |
| `options.showCount` | `boolean?` | 是否显示每个值的数量，默认为 `false` |

### `createSidebarProperty.fromProgressField` 参数说明 (进度类型)

| 参数 | 类型 | 说明 |
|------|------|------|
| `field` | `keyof T` | 要显示分布的数据字段名（数值类型） |
| `options.label` | `string?` | 可选的显示标签，会显示在分布条上方 |
| `options.showCount` | `boolean?` | 是否显示每个值的数量，默认为 `false` |
| `options.maxValueOfEachItem` | `number?` | 每个项目的最大值，用于计算百分比，默认为 `100` |
| `options.tooltip` | `ProgressTooltipInterval[]?` | 自定义区间配置，不指定时使用默认配置 |

### 进度区间配置 (`ProgressTooltipInterval`)

| 参数 | 类型 | 说明 |
|------|------|------|
| `interval` | `["open"\|"closed", number, number, "open"\|"closed"]` | 区间范围定义 [左边界类型, 起始值, 结束值, 右边界类型] |
| `label` | `string` | 区间显示标签 |
| `color` | `TimelineColorType` | 区间颜色 |

#### 区间类型说明：
- `["closed", 0, 50, "closed"]`：表示 [0, 50]，即 0 ≤ value ≤ 50
- `["closed", 0, 50, "open"]`：表示 [0, 50)，即 0 ≤ value < 50  
- `["open", 0, 50, "closed"]`：表示 (0, 50]，即 0 < value ≤ 50
- `["open", 0, 50, "open"]`：表示 (0, 50)，即 0 < value < 50

#### 常见区间示例：
```typescript
// 精确匹配某个值
{ interval: ["closed", 0, 0, "closed"], label: "未开始" }      // value = 0
{ interval: ["closed", 100, 100, "closed"], label: "完成" }   // value = 100

// 范围匹配
{ interval: ["open", 0, 50, "closed"], label: "初期" }        // 0 < value ≤ 50
{ interval: ["open", 50, 100, "open"], label: "后期" }        // 50 < value < 100
```

### 默认进度配置

如果不指定 `tooltip` 参数，将使用以下默认配置：

```typescript
[
  {
    interval: ["closed", 0, 0, "closed"],
    label: "not started",
    color: grayColors.gray5,
  },
  {
    interval: ["open", 0, 100, "open"],
    label: "in progress",
    color: getRainbowColor("emerald"),
  },
  {
    interval: ["closed", 100, 100, "closed"],
    label: "done",
    color: getRainbowColor("emerald"),
  },
]
```

### 颜色支持

支持三种颜色格式：

1. **设计系统 Rainbow 颜色**：`getRainbowColor('rose')`
2. **设计系统 Semantic 颜色**：`getSemanticColor('success')`  
3. **自定义颜色**：`'#ff6b6b'`、`'rgba(255, 255, 255, 0.5)'`

## 最佳实践

1. **限制属性数量**：建议每个sidebar最多显示2-3个属性分布，避免信息过载
2. **选择合适的颜色**：确保不同属性值的颜色有足够的区分度
3. **有意义的标签**：为属性分布提供清晰的标签名称
4. **合理使用数量显示**：对于重要的属性可以开启 `showCount`

## 交互功能

- **悬停提示**：鼠标悬停在颜色条上会显示具体的属性值名称、数量和百分比
- **响应式设计**：分布条会根据组的实际数据动态调整
- **动态更新**：当分组方式改变时，属性分布会自动重新计算

## 注意事项

- 属性分布只在有数据的分组中显示，空的占位分组不会显示分布
- 如果某个属性值在映射中不存在，会使用默认的灰色显示
- 分布按数量从多到少排序显示 