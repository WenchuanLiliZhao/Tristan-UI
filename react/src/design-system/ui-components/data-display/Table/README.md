# Table 表格组件

一个功能丰富、灵活配置的表格组件，支持排序、加载状态、空数据处理等功能。

## 功能特性

- ✅ **灵活的列配置** - 支持自定义渲染、对齐方式、宽度等
- ✅ **数据排序** - 内置排序功能，支持升序、降序、取消排序
- ✅ **多种尺寸** - 支持 small、middle、large 三种尺寸
- ✅ **样式变体** - 支持边框、斑马纹等样式
- ✅ **加载状态** - 内置加载状态展示
- ✅ **空数据处理** - 优雅的空数据状态展示
- ✅ **交互支持** - 支持行点击事件
- ✅ **响应式设计** - 在移动端自动启用横向滚动
- ✅ **TypeScript支持** - 完整的类型定义

## 基础用法

```tsx
import { Table, TableColumn } from '@/design-system/ui-components/data-display';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const columns: TableColumn<User>[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    sortable: true,
    align: 'center',
  },
  {
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
  },
];

const dataSource: User[] = [
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
];

<Table 
  dataSource={dataSource} 
  columns={columns} 
/>
```

## 自定义渲染

```tsx
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    title: '用户信息',
    render: (_, record) => (
      <div>
        <div style={{ fontWeight: 'bold' }}>{record.name}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
      </div>
    ),
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    render: (age) => `${age}岁`,
    align: 'center',
  },
];
```

## 带边框和斑马纹

```tsx
<Table 
  dataSource={dataSource} 
  columns={columns}
  bordered
  striped
  size="small"
/>
```

## 加载状态

```tsx
<Table 
  dataSource={[]} 
  columns={columns}
  loading={true}
/>
```

## 行点击事件

```tsx
<Table 
  dataSource={dataSource} 
  columns={columns}
  onRowClick={(record, index) => {
    console.log('点击了行:', record, index);
  }}
/>
```

## API

### Table Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| dataSource | 数据源 | `T[]` | - |
| columns | 列配置 | `TableColumn<T>[]` | - |
| rowKey | 行的唯一标识符 | `keyof T \| ((record: T) => string \| number)` | `'id'` |
| loading | 是否显示加载状态 | `boolean` | `false` |
| emptyText | 空数据时的展示内容 | `React.ReactNode` | `'暂无数据'` |
| size | 表格大小 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| bordered | 是否显示边框 | `boolean` | `false` |
| striped | 是否显示斑马纹 | `boolean` | `false` |
| onRowClick | 行点击事件 | `(record: T, index: number) => void` | - |
| className | 表格容器的className | `string` | - |
| style | 表格容器的style | `React.CSSProperties` | - |

### TableColumn Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 列的唯一标识 | `string` | - |
| title | 列标题 | `string` | - |
| dataIndex | 对应数据源的字段名 | `keyof T` | - |
| render | 自定义渲染函数 | `(value: unknown, record: T, index: number) => React.ReactNode` | - |
| sortable | 是否可排序 | `boolean` | `false` |
| width | 列宽度 | `string \| number` | - |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| className | 列的className | `string` | - |

## 注意事项

1. **数据源**: 确保每行数据都有唯一的 `rowKey`，如果不是使用 `id` 字段，请自定义 `rowKey` 属性。

2. **排序功能**: 排序是基于客户端的，对于大数据量建议在服务端实现排序。

3. **自定义渲染**: 使用 `render` 函数时，第一个参数是当前列的值，第二个参数是完整的行数据。

4. **响应式**: 在小屏幕设备上，表格会自动启用横向滚动来保证内容的可读性。 