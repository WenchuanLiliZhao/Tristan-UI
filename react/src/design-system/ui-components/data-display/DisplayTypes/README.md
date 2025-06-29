# Display Types

Display Types 是专门为 Issue Details 设计的一套标准化字段显示组件。它们提供了统一的样式和配置选项，让你可以轻松地自定义不同数据类型的显示方式。

## 可用组件

### TextField
用于显示文本内容，支持自定义颜色、字体大小和粗细。

```tsx
<TextField 
  label="Name" 
  value="Project Alpha"
  color="var(--color--semantic-active)"
  fontWeight="medium"
  fontSize="lg"
/>
```

**属性:**
- `label: string` - 字段标签
- `value: React.ReactNode` - 显示值
- `color?: string` - 文本颜色（支持CSS颜色值和CSS变量）
- `fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'` - 字体粗细
- `fontSize?: 'sm' | 'base' | 'lg' | 'xl'` - 字体大小
- `className?: string` - 自定义CSS类名

### DateField
用于显示日期，支持多种格式化选项。

```tsx
<DateField 
  label="Start Date" 
  value={new Date('2024-01-15')}
  format="medium"
  color="var(--color--text-secondary)"
/>
```

**属性:**
- `label: string` - 字段标签
- `value: Date` - 日期值
- `format?: 'short' | 'medium' | 'long' | 'full'` - 日期格式
- `locale?: string` - 地区设置
- `color?: string` - 文本颜色

### ProgressField
用于显示进度条，支持自定义颜色和样式。

```tsx
<ProgressField 
  label="Completion" 
  value={75}
  color="var(--color--semantic-success)"
  height="lg"
  variant="rounded"
  showText={true}
/>
```

**属性:**
- `label: string` - 字段标签
- `value: number` - 进度值（0-100）
- `color?: string` - 进度条颜色
- `showText?: boolean` - 是否显示百分比文本
- `height?: 'sm' | 'md' | 'lg'` - 进度条高度
- `variant?: 'default' | 'rounded' | 'square'` - 进度条样式

### TagField
用于显示标签，支持图标和不同变体。

```tsx
<TagField 
  label="Status" 
  name="In Progress"
  color="var(--color--semantic-active)"
  icon="play_arrow"
  variant="contained"
/>
```

**属性:**
- `label: string` - 字段标签
- `name: string` - 标签文本
- `color: string` - 标签颜色
- `icon?: string` - 图标名称（Material Icons）
- `variant?: 'contained' | 'outlined'` - 标签变体

## 在 Issue Details 中使用

### 简化语法

你可以在一个地方定义所有字段的配置：

```tsx
import { IssueDetailsConfigBuilder } from '@/design-system/ui-demos/timeline';

const issueDetailsConfig = IssueDetailsConfigBuilder.create<ProjectDataType>()
  .setPropertyOrder([
    { property: "name", displayType: "text" },
    { 
      property: "status", 
      displayType: "tag", 
      valueMapping: statusMapping,
      label: "Project Status"
    },
    { 
      property: "progress", 
      displayType: "progress",
      displayOptions: { 
        color: "var(--color--semantic-success)",
        height: "lg"
      }
    },
    { 
      property: "team", 
      displayType: "text", 
      displayOptions: { 
        color: "var(--color--semantic-active)",
        fontWeight: "medium" 
      }
    },
    { 
      property: "startDate", 
      displayType: "date",
      displayOptions: { dateFormat: "long" }
    }
  ])
  .build();
```

### 可选的 Issue Details

如果你不想显示 Issue Details，只需要将 `issueDetailsConfig` 设置为 `undefined` 或不传递该属性：

```tsx
// 不显示 Issue Details
<TimelineView 
  inputData={data}
  // issueDetailsConfig={undefined} // 或者直接不传递
/>
```

这样点击时间线项目时不会打开右侧边栏。

## 自定义样式

所有组件都使用统一的 CSS 变量系统，你可以通过修改 `styles.module.scss` 来自定义全局样式，或者通过 `displayOptions` 来设置单个字段的样式。

### 支持的显示选项 (displayOptions)

```tsx
displayOptions: {
  // 文本字段
  color?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  fontSize?: 'sm' | 'base' | 'lg' | 'xl';
  
  // 日期字段
  dateFormat?: 'short' | 'medium' | 'long' | 'full';
  locale?: string;
  
  // 进度字段
  progressColor?: string;
  showProgressText?: boolean;
  progressHeight?: 'sm' | 'md' | 'lg';
  progressVariant?: 'default' | 'rounded' | 'square';
  
  // 标签字段
  tagVariant?: 'contained' | 'outlined';
}
```

## 扩展性

如果需要添加新的显示类型，只需要：

1. 在 `DisplayTypes` 文件夹中创建新的组件
2. 在 `index.ts` 中导出
3. 在 `PropertyMappingConfig` 中添加相应的 `displayType` 和 `displayOptions`
4. 在 `IssueDetails/index.tsx` 的 `renderField` 函数中添加渲染逻辑

这个设计使得添加新的字段类型变得非常简单和一致。 