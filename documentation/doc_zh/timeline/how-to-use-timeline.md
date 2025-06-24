# 如何使用 Timeline 组件

## 概述

Timeline 是一个通用化的时间线组件，支持展示任意数据类型的时间线项目。本指南将带您逐步学习如何使用这个强大而灵活的组件。

**核心设计理念：** 最少约束，最大自由
- **只要求 4 个基础字段** - Timeline 能正常工作的最少要求
- **其他字段完全自定义** - 您可以添加任意数据结构，组件会智能适配
- **类型安全保障** - 完整的 TypeScript 支持，确保编译时安全

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

// 定义状态选项（可选 - 用于更好的类型安全）
export const status = {
  high: {
    name: "High",
    color: "red"
  },
  medium: {
    name: "Medium",
    color: "yellow"
  },
  low: {
    name: "Low",
    color: "green"
  }
}

// 定义团队选项
export const team = {
  sales: {
    name: "Sales",
    color: "blue"
  },
  marketing: {
    name: "Marketing",
    color: "green"
  },
  engineering: {
    name: "Engineering",
    color: "purple"
  },
  design: {
    name: "Design",
    color: "orange"
  },
  product: {
    name: "Product",
    color: "pink"
  },
  other: {
    name: "Other",
    color: "gray"
  }
}

// 定义优先级选项
export const priority = {
  high: {
    name: "High",
    color: "red",
    icon: "icon-a"
  },
  medium: {
    name: "Medium",
    color: "yellow",
    icon: "icon-b"
  },
  low: {
    name: "Low",
    color: "green",
    icon: "icon-c"
  }
}

// 定义风险等级选项
export const riskLevel = {
  high: {
    name: "High Risks",
    color: "red",
    icon: "icon-a"
  },
  medium: {
    name: "Medium Risks",
    color: "yellow",
    icon: "icon-b"
  },
  low: {
    name: "Low Risks",
    color: "green",
    icon: "icon-c"
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

### 步骤 4：在 React 组件中使用 Timeline

```typescript
import React from "react";
// 导入样式文件（重要！）
import "tristan-ui/dist/tristan-ui.css";

// 导入 Timeline 组件和工具函数
import { Timeline } from "../../../app/src/design-system/ui-demos/timeline/ui/Timeline";
import { groupTimelineItemsByField } from "../../../app/src/design-system/ui-demos/timeline/data/utils";

// 导入您的数据和类型
import { ExampleData, type ProjectDataType } from "./example-data";

function App() {
  // 使用工具函数按指定字段分组数据
  const groupedData = groupTimelineItemsByField(ExampleData, "category");

  return (
    <div>
      <Timeline<ProjectDataType>
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
        inputData={groupedData}
      />
    </div>
  );
}
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

### 3. 性能优化
- 对于大量数据（>1000项），考虑分页加载
- 使用 React.memo 包装 Timeline 组件避免不必要的重渲染
- 预先计算和缓存分组数据

### 4. 样式定制
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

### Q: 如何自定义时间线的外观？
A: Timeline 组件支持通过 CSS 变量进行主题定制。您可以覆盖预定义的 CSS 变量来改变颜色、字体等。

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
| `init` | `TimelineConfigType<T>` | ❌ | 初始化配置（为未来扩展保留） |

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

您可以在 `tests/React18` 目录中找到完整的使用示例，包括：
- 完整的 TypeScript 配置
- 项目依赖设置
- 数据结构定义
- Timeline 组件使用

要运行示例：

```bash
cd tests/React18
npm install
npm run dev
```

## 总结

Timeline 组件的使用可以总结为以下几个要点：

1. **安装依赖**：`npm install tristan-ui`
2. **定义数据接口**：继承 `BaseTimelineItemType`，添加自定义字段
3. **准备数据**：创建符合接口的数据数组
4. **分组数据**：使用 `groupTimelineItemsByField` 函数
5. **渲染组件**：传入分组数据给 `Timeline` 组件
6. **导入样式**：别忘了导入 `"tristan-ui/dist/tristan-ui.css"`

遵循这个流程，您就可以快速创建出功能强大、美观的时间线组件了！

