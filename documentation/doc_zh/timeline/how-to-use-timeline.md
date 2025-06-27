# 如何使用 Timeline 组件

## 概述

Timeline 是一个通用化的时间线组件，支持展示任意数据类型的时间线项目。本指南将带您逐步学习如何使用这个强大而灵活的组件。

**核心设计理念：** 最少约束，最大自由
- **只要求 4 个基础字段** - Timeline 能正常工作的最少要求
- **其他字段完全自定义** - 您可以添加任意数据结构，组件会智能适配
- **类型安全保障** - 完整的 TypeScript 支持，确保编译时安全
- **🆕 字段显示配置** - 灵活配置数据字段的显示方式（图标、进度条、标签等）

## 快速开始

### 步骤 0：安装依赖

```bash
# 安装 tristan-ui 包
npm install tristan-ui

# 安装必要的依赖（如果项目中还没有）
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```

### 步骤 1：了解基础数据结构

Timeline 组件**只强制要求**以下 4 个字段：

```typescript
import type { BaseTimelineItemType } from "tristan-ui";

// 基础时间线项目接口 - 只需要这 4 个字段
interface BaseTimelineItemType {
  id: string;        // 唯一标识符 - 用于区分不同的时间线项目
  name: string;      // 显示名称 - 在时间线上显示的标题
  startDate: Date;   // 开始日期 - 时间线条的起点
  endDate: Date;     // 结束日期 - 时间线条的终点
}
```

### 步骤 2：创建自己的数据接口

在基础字段之上，您可以添加任意自定义字段：

```typescript
import type { BaseTimelineItemType } from "tristan-ui";
import { rainbowColorNames } from "tristan-ui/colors";

// 定义状态选项（可选 - 用于更好的类型安全）
export const status = {
  high: {
    name: "High",
    color: rainbowColorNames.rose  // 使用设计系统的rainbow颜色
  },
  medium: {
    name: "Medium",
    color: rainbowColorNames.amber
  },
  low: {
    name: "Low",
    color: rainbowColorNames.emerald
  }
}

// 定义团队选项
export const team = {
  sales: {
    name: "Sales",
    color: rainbowColorNames.blue
  },
  marketing: {
    name: "Marketing",
    color: rainbowColorNames.emerald
  },
  engineering: {
    name: "Engineering",
    color: rainbowColorNames.purple
  },
  design: {
    name: "Design",
    color: rainbowColorNames.orange
  },
  product: {
    name: "Product",
    color: rainbowColorNames.pink
  },
  other: {
    name: "Other",
    color: rainbowColorNames.cyan
  }
}

// 定义优先级选项
export const priority = {
  high: {
    name: "High",
    color: rainbowColorNames.rose,
    icon: "priority_high"
  },
  medium: {
    name: "Medium",
    color: rainbowColorNames.amber,
    icon: "low_priority"
  },
  low: {
    name: "Low",
    color: rainbowColorNames.emerald,
    icon: "flag"
  }
}

// 定义风险等级选项
export const riskLevel = {
  high: {
    name: "High Risks",
    color: rainbowColorNames.rose,
    icon: "warning"
  },
  medium: {
    name: "Medium Risks",
    color: rainbowColorNames.amber,
    icon: "info"
  },
  low: {
    name: "Low Risks",
    color: rainbowColorNames.emerald,
    icon: "check_circle"
  }
}

// 扩展基础接口，添加您的自定义字段
export interface ProjectDataType extends BaseTimelineItemType {
  projectKey: string;                    // 项目编号
  status: keyof typeof status;           // 状态（引用上面定义的状态）
  progress: number;                      // 进度 (0-100)
  team: keyof typeof team;               // 团队
  priority: keyof typeof priority;       // 优先级
  category: string;                      // 分类
  riskLevel: keyof typeof riskLevel;     // 风险等级
}
```

### 步骤 3：创建符合接口的示例数据

```typescript
export const ExampleData: ProjectDataType[] = [
  {
    // 🔴 必需的基础字段
    id: "1",
    name: "Interactive Calculus Workshop",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    
    // 🟢 您的自定义字段
    projectKey: "CALC-001",
    status: "high",
    progress: 50,
    team: "engineering",
    priority: "high",
    category: "Advance Solutions",
    riskLevel: "high"
  },
  {
    id: "2",
    name: "Mobile App Development",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    projectKey: "MOBILE-002",
    status: "low",
    progress: 100,
    team: "engineering",
    priority: "low",
    category: "Advance Solutions",
    riskLevel: "low"
  },
  {
    id: "3",
    name: "Machine Learning Model Training",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    projectKey: "ML-003",
    status: "high",
    progress: 100,
    team: "engineering",
    priority: "low",
    category: "Advance Capabilities",
    riskLevel: "medium"
  }
  // 可以添加更多数据...
]
```

## 🎨 颜色定义最佳实践

### Rainbow 颜色系统

Timeline 组件使用统一的设计系统颜色，推荐使用 `rainbowColorNames` 而不是硬编码的颜色字符串：

```typescript
import { rainbowColorNames } from "tristan-ui/colors";

// ✅ 推荐：使用设计系统颜色
export const status = {
  high: {
    name: "High Priority",
    color: rainbowColorNames.rose    // 自动适配深色/浅色主题
  },
  medium: {
    name: "Medium Priority", 
    color: rainbowColorNames.amber
  },
  low: {
    name: "Low Priority",
    color: rainbowColorNames.emerald
  }
}

// ❌ 不推荐：硬编码颜色
export const statusOld = {
  high: { name: "High", color: "red" },      // 主题切换时可能不匹配
  medium: { name: "Medium", color: "yellow" }, // 可能与其他组件不一致
  low: { name: "Low", color: "green" }
}
```

### 可用的 Rainbow 颜色

```typescript
import { rainbowColorNames } from "tristan-ui/colors";

// 8种预设的rainbow颜色，每种都有4个变体（default, dark, half, pale）
const colors = {
  rose: rainbowColorNames.rose,       // 玫瑰红：适合高优先级、错误状态
  amber: rainbowColorNames.amber,     // 琥珀色：适合警告、中等优先级
  emerald: rainbowColorNames.emerald, // 翡翠绿：适合成功、低风险
  blue: rainbowColorNames.blue,       // 蓝色：适合信息、主要操作
  purple: rainbowColorNames.purple,   // 紫色：适合特殊类别
  orange: rainbowColorNames.orange,   // 橙色：适合次要警告
  pink: rainbowColorNames.pink,       // 粉色：适合标记、突出显示
  cyan: rainbowColorNames.cyan,       // 青色：适合辅助信息
};
```

### 颜色实现原理

颜色值通过CSS类而非内嵌样式实现，这样可以：

1. **更好的性能**：避免运行时样式计算
2. **主题支持**：自动适配深色/浅色主题
3. **一致性**：与整个设计系统保持统一
4. **可维护性**：集中管理所有颜色定义

```typescript
// 组件会自动生成对应的CSS类名
// color: rainbowColorNames.rose → CSS类: .lili-tag--rose
// 支持contained和outlined两种变体
```

### 颜色选择建议

```typescript
// 语义化颜色选择
export const semanticColors = {
  // 状态相关
  success: rainbowColorNames.emerald,  // 成功、完成
  warning: rainbowColorNames.amber,    // 警告、需要注意
  error: rainbowColorNames.rose,       // 错误、失败
  info: rainbowColorNames.blue,        // 信息、提示
  
  // 优先级相关
  urgent: rainbowColorNames.rose,      // 紧急
  high: rainbowColorNames.orange,      // 高
  medium: rainbowColorNames.amber,     // 中
  low: rainbowColorNames.emerald,      // 低
  
  // 团队/部门相关
  engineering: rainbowColorNames.purple,
  design: rainbowColorNames.pink,
  product: rainbowColorNames.blue,
  marketing: rainbowColorNames.emerald,
  sales: rainbowColorNames.cyan,
  
  // 特殊用途
  feature: rainbowColorNames.blue,     // 新功能
  bugfix: rainbowColorNames.orange,    // 修复
  maintenance: rainbowColorNames.cyan,  // 维护
};
```

## 🆕 字段显示配置系统

### 概述

Timeline 组件支持灵活配置数据字段的显示方式，支持两个显示区域：

1. **图形信息区域** (`graphicFields`) - 显示图标或进度条
2. **标签区域** (`tagFields`) - 显示各种标签

### 简化配置方式

#### 方式 1：使用 `createFieldConfig` 简化配置（推荐）

```typescript
import React from "react";
import { 
  Timeline, 
  groupTimelineItemsByField,
  createFieldConfig 
} from "tristan-ui";
import { ExampleData, type ProjectDataType, status, team, priority, riskLevel } from "./example-data";

function TimelineExample() {
  // 🎯 简化的字段显示配置
  const itemDisplayConfig = {
    // 图形信息区域 - 显示进度条和优先级图标
    graphicFields: [
      createFieldConfig.progress<ProjectDataType>("progress"),
      createFieldConfig.iconFromMap<ProjectDataType>("priority", priority),
    ],
    // 标签区域 - 显示状态、团队和风险等级标签
    tagFields: [
      createFieldConfig.tagFromMap<ProjectDataType>("status", status),
      createFieldConfig.tagFromMap<ProjectDataType>("team", team),
      createFieldConfig.tagFromMap<ProjectDataType>("riskLevel", riskLevel, {
        variant: "outlined",
        hideValue: "low", // 自动隐藏低风险项目
      }),
    ],
  };

  const sortedData = groupTimelineItemsByField(ExampleData, "category");

  return (
    <Timeline<ProjectDataType> 
      init={itemDisplayConfig} 
      inputData={sortedData} 
    />
  );
}
```

#### 方式 2：使用预设模板

```typescript
import { TimelineTemplates } from "tristan-ui";

function TemplateExample() {
  // 🎯 使用预设模板，一行代码搞定配置
  const itemDisplayConfig = TimelineTemplates.projectManagement<ProjectDataType>({
    status,
    team,
    priority,
  });

  // 直接使用 itemDisplayConfig，无需包装

  // ... 其余代码相同
}
```

#### 方式 3：使用构建器模式

```typescript
import { TimelineConfigBuilder } from "tristan-ui";

function BuilderExample() {
  // 🎯 链式调用构建配置
  const itemDisplayConfig = new TimelineConfigBuilder<ProjectDataType>()
    .addProgress("progress", { showText: true })
    .addIcon("priority", priority)
    .addTag("status", status)
    .addTag("team", team)
    .addTag("riskLevel", riskLevel, { 
      variant: "outlined", 
      hideValue: "low" 
    })
    .build();

  // ... 其余代码相同
}
```

### 详细配置选项

#### 可用的字段配置函数

```typescript
// 进度条配置
createFieldConfig.progress<T>(
  field: keyof T, 
  options?: { showText?: boolean; color?: string }
)

// 图标配置（从映射对象）
createFieldConfig.iconFromMap<T>(
  field: keyof T, 
  map: Record<string, { icon?: string; color: string }>
)

// 标签配置（从映射对象）
createFieldConfig.tagFromMap<T>(
  field: keyof T, 
  map: Record<string, { name: string; color: string }>, 
  options?: {
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
    color?: string;
  }
)

// 简单文本标签配置
createFieldConfig.tag<T>(
  field: keyof T, 
  options?: { 
    color?: string; 
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
  }
)
```

#### 可用的预设模板

```typescript
// 项目管理模板
TimelineTemplates.projectManagement<T>(dataMaps: {
  status?: Record<string, { name: string; color: string }>;
  team?: Record<string, { name: string; color: string }>;
  priority?: Record<string, { icon?: string; color: string; name?: string }>;
})

// 任务管理模板
TimelineTemplates.taskManagement<T>(dataMaps: {
  assignee?: Record<string, { name: string; color: string }>;
  priority?: Record<string, { name: string; color: string }>;
  status?: Record<string, { name: string; color: string }>;
})
```

### 步骤 4：在 React 组件中使用 Timeline

```typescript
import React from "react";
// 导入样式文件（重要！）
import "tristan-ui/dist/tristan-ui.css";

// 导入 Timeline 组件和配置工具
import { 
  Timeline, 
  groupTimelineItemsByField,
  createFieldConfig 
} from "tristan-ui";

// 导入您的数据和类型
import { ExampleData, type ProjectDataType, status, team, priority } from "./example-data";

function App() {
  // 配置字段显示方式
  const itemDisplayConfig = {
    graphicFields: [
      createFieldConfig.progress<ProjectDataType>("progress"),
      createFieldConfig.iconFromMap<ProjectDataType>("priority", priority),
    ],
    tagFields: [
      createFieldConfig.tagFromMap<ProjectDataType>("status", status),
      createFieldConfig.tagFromMap<ProjectDataType>("team", team),
    ],
  };

  // 使用工具函数按指定字段分组数据
  const groupedData = groupTimelineItemsByField(ExampleData, "category");

  return (
    <div>
      <Timeline<ProjectDataType>
        init={itemDisplayConfig}
        inputData={groupedData}
      />
    </div>
  );
}

export default App;
```

## 进阶使用

### 不同的分组方式

您可以按任意字段对数据进行分组：

```typescript
// 按团队分组
const byTeam = groupTimelineItemsByField(ExampleData, "team");

// 按优先级分组
const byPriority = groupTimelineItemsByField(ExampleData, "priority");

// 按状态分组
const byStatus = groupTimelineItemsByField(ExampleData, "status");

// 按风险等级分组
const byRiskLevel = groupTimelineItemsByField(ExampleData, "riskLevel");
```

### 动态分组切换

```typescript
import React, { useState } from "react";

function AdvancedTimeline() {
  const [groupBy, setGroupBy] = useState<keyof ProjectDataType>("category");
  
  const groupedData = groupTimelineItemsByField(ExampleData, groupBy);

  // 字段显示配置
  const itemDisplayConfig = {
    graphicFields: [
      createFieldConfig.progress<ProjectDataType>("progress"),
      createFieldConfig.iconFromMap<ProjectDataType>("priority", priority),
    ],
    tagFields: [
      createFieldConfig.tagFromMap<ProjectDataType>("status", status),
      createFieldConfig.tagFromMap<ProjectDataType>("team", team),
    ],
  };

  return (
    <div>
      {/* 分组选择器 */}
      <select 
        value={groupBy} 
        onChange={(e) => setGroupBy(e.target.value as keyof ProjectDataType)}
      >
        <option value="category">按分类分组</option>
        <option value="team">按团队分组</option>
        <option value="priority">按优先级分组</option>
        <option value="status">按状态分组</option>
      </select>
      
      {/* Timeline 组件 */}
      <Timeline<ProjectDataType>
        init={itemDisplayConfig}
        inputData={groupedData}
      />
    </div>
  );
}
```

### 自定义字段映射

如果预设的配置函数不满足需求，您也可以使用底层的 `FieldMappers`：

```typescript
import { FieldMappers } from "tristan-ui";

// 自定义配置
const customConfig = {
  graphicFields: [
    {
      field: "progress",
      displayType: "progress" as const,
      mapping: FieldMappers.progress({ showText: true, color: "blue" }),
      visible: true,
    },
    {
      field: "priority",
      displayType: "icon" as const,
      mapping: FieldMappers.iconFromMap(priority),
      visible: (item) => item.priority !== "low", // 条件显示
    },
  ],
  tagFields: [
    {
      field: "status",
      displayType: "tag" as const,
      mapping: FieldMappers.fromMap(status),
      visible: true,
    },
  ],
};
```

## 最佳实践

### 1. 类型定义
- 始终为自定义数据定义明确的 TypeScript 接口
- 使用 `extends BaseTimelineItemType` 确保包含必需字段
- 为选项值定义枚举或常量对象，提高类型安全性

### 2. 数据格式
- **日期格式**：始终使用 `Date` 对象，不要使用字符串
- **唯一ID**：确保每个项目的 `id` 字段唯一
- **分组字段**：确保用于分组的字段在所有数据项中都存在

### 3. 字段显示配置
- **优先使用简化配置**：`createFieldConfig` 比手写配置更简洁安全
- **合理使用预设模板**：对于常见场景，模板可以大幅减少配置代码
- **条件显示**：使用 `hideValue` 或 `visible` 函数实现动态显示逻辑

### 4. 性能优化
- 对于大量数据（>1000项），考虑分页加载
- 使用 React.memo 包装 Timeline 组件避免不必要的重渲染
- 预先计算和缓存分组数据

### 5. 样式定制
```typescript
// 记得导入样式文件
import "tristan-ui/dist/tristan-ui.css";

// 如需自定义样式，可以覆盖 CSS 变量
// 在您的样式文件中添加：
/*
:root {
  --timeline-primary-color: #your-color;
  --timeline-background-color: #your-bg-color;
}
*/
```

## 常见问题

### Q: 如何添加更多自定义字段？
A: 在接口定义中添加任意字段即可，Timeline 组件会自动适配：

```typescript
interface MyProjectType extends BaseTimelineItemType {
  // 基础字段已由 BaseTimelineItemType 提供
  
  // 添加任意自定义字段
  department: string;
  budget: number;
  tags: string[];
  assignee: {
    name: string;
    email: string;
  };
  // ... 更多字段
}
```

### Q: 如何自定义字段的显示方式？
A: 使用新的字段显示配置系统：

```typescript
// 方法 1：使用简化配置
const config = {
  graphicFields: [
    createFieldConfig.progress("budget"),
    createFieldConfig.iconFromMap("department", departmentMap),
  ],
  tagFields: [
    createFieldConfig.tagFromMap("tags", tagMap),
  ],
};

// 方法 2：使用预设模板
const config = TimelineTemplates.projectManagement({ 
  status: myStatusMap 
});

// 方法 3：完全自定义
const config = {
  graphicFields: [{
    field: "myField",
    displayType: "icon",
    mapping: (value) => ({ iconName: "custom", color: "red" }),
    visible: (item) => someCondition(item),
  }],
};
```

### Q: 时间线项目重叠怎么办？
A: Timeline 组件内置智能布局算法，会自动检测并避免重叠，将重叠的项目分层显示。

### Q: 支持哪些时间格式？
A: 只支持 JavaScript `Date` 对象。如果您的数据是字符串格式，请先转换：

```typescript
// 正确 ✅
startDate: new Date("2024-01-01")

// 错误 ❌
startDate: "2024-01-01"
```

### Q: 配置代码太长怎么办？
A: 使用新的简化配置方式可以大幅减少代码量：

```typescript
// 原来需要 90+ 行的配置
const oldConfig = {
  graphicFields: [
    {
      field: "progress",
      displayType: "progress",
      mapping: (value: unknown) => ({
        value: Math.max(0, Math.min(100, Number(value) || 0)),
        showText: true,
      }),
      visible: true,
    },
    // ... 更多重复代码
  ],
};

// 现在只需要 15 行
const newConfig = {
  graphicFields: [
    createFieldConfig.progress("progress"),
    createFieldConfig.iconFromMap("priority", priority),
  ],
  tagFields: [
    createFieldConfig.tagFromMap("status", status),
    createFieldConfig.tagFromMap("team", team),
  ],
};
```

### Q: 数据更新后 Timeline 不刷新？
A: 确保传入新的数据引用。React 需要检测到引用变化才会重新渲染：

```typescript
// 正确 ✅ - 创建新数组
const newData = [...oldData, newItem];

// 错误 ❌ - 修改原数组
oldData.push(newItem);
```

## API 参考

### Timeline Props

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `inputData` | `SortedTimelineDataType<T>` | ✅ | 已分组的时间线数据 |
| `init` | `TimelineItemDisplayConfig<T>` | ❌ | 项目显示配置，直接传递无需包装 |
| `groupBy` | `keyof (BaseTimelineItemType & T)` | ❌ | 分组字段（当 inputData 是原始数据数组时使用） |

### TimelineItemDisplayConfig

```typescript
interface TimelineItemDisplayConfig<T> {
  graphicFields?: FieldDisplayConfig<T>[];  // 图形信息区域配置
  tagFields?: FieldDisplayConfig<T>[];      // 标签区域配置
}
```

### createFieldConfig API

```typescript
const createFieldConfig = {
  // 进度条配置
  progress<T>(field: keyof T, options?: { showText?: boolean; color?: string }),
  
  // 图标配置
  iconFromMap<T>(field: keyof T, map: Record<string, { icon?: string; color: string }>),
  
  // 标签配置（从映射）
  tagFromMap<T>(field: keyof T, map: Record<string, { name: string; color: string }>, options?: {
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
    color?: string;
  }),
  
  // 简单标签配置
  tag<T>(field: keyof T, options?: { 
    color?: string; 
    variant?: 'contained' | 'outlined';
    hideValue?: unknown;
  }),
};
```

### groupTimelineItemsByField 函数

```typescript
function groupTimelineItemsByField<T>(
  items: TimelineItemType<T>[],
  groupBy: keyof (BaseTimelineItemType & T)
): SortedTimelineDataType<T>
```

**参数：**
- `items`: 要分组的时间线项目数组
- `groupBy`: 用于分组的字段名

**返回值：** 分组后的时间线数据，可直接传给 Timeline 组件

## 完整示例项目

您可以在项目的示例目录中找到完整的使用示例，包括：
- 完整的 TypeScript 配置
- 项目依赖设置
- 数据结构定义
- Timeline 组件使用
- 字段显示配置示例

## 总结

Timeline 组件的使用可以总结为以下几个要点：

1. **安装依赖**：`npm install tristan-ui`
2. **定义数据接口**：继承 `BaseTimelineItemType`，添加自定义字段
3. **准备数据**：创建符合接口的数据数组
4. **🆕 配置字段显示**：使用 `createFieldConfig` 或预设模板配置字段显示方式
5. **分组数据**：使用 `groupTimelineItemsByField` 函数
6. **渲染组件**：传入配置和分组数据给 `Timeline` 组件
7. **导入样式**：别忘了导入 `"tristan-ui/dist/tristan-ui.css"`

### 新功能特性

- ✅ **简化配置**: 代码量减少 85%，从 90+ 行到 15 行
- ✅ **预设模板**: 常见场景一行代码搞定
- ✅ **构建器模式**: 链式调用，流畅配置
- ✅ **字段显示**: 支持图标、进度条、标签三种显示类型
- ✅ **条件显示**: 支持基于数据的动态显示逻辑
- ✅ **类型安全**: 完整的 TypeScript 支持

遵循这个流程，您就可以快速创建出功能强大、美观且高度可配置的时间线组件了！

