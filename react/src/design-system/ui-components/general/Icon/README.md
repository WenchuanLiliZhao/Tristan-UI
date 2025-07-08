# Icon Component

基于 Lucide React 图标的图标组件，支持自定义尺寸和样式，同时保持与 Material Icons 名称的兼容性。

## 特性

- ✅ 基于 Lucide React 图标库（现代、轻量、美观）
- ✅ Material Icons 名称兼容性（无缝迁移）
- ✅ 支持自定义数字尺寸
- ✅ 当不设置尺寸时，自动继承父元素的 font-size
- ✅ 完全可定制的样式
- ✅ 填充模式支持
- ✅ TypeScript 支持
- ✅ 无需网络连接（内置图标）

## 基本用法

```tsx
import { Icon } from '@/design-system/ui-components';

// 基本用法 - 继承父元素尺寸
<Icon name="home" />

// 自定义数字尺寸
<Icon name="home" size={20} />
<Icon name="home" size={28} />

// 填充模式
<Icon name="home" filled />

// 自定义样式
<Icon name="home" size={24} style={{ color: 'red' }} />
```

## 继承父元素尺寸

当不设置 `size` 属性时，图标会继承父元素的 `font-size`：

```tsx
<div style={{ fontSize: '18px' }}>
  <Icon name="info" /> {/* 图标尺寸为 18px */}
  <span>文本内容</span>
</div>

<h1 style={{ fontSize: '32px' }}>
  <Icon name="star" /> {/* 图标尺寸为 32px */}
  标题内容
</h1>
```

## 与其他组件结合

```tsx
// 在按钮中使用
<Button icon="home">
  首页
</Button>

// 在通知消息中使用
<div className="notification">
  <Icon name="check_circle" size={16} style={{ color: 'green' }} />
  <span>操作成功</span>
</div>
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|---------|-------------|
| `name` | `string` | - | **必需** Material Icons 兼容的图标名称 |
| `size` | `number` | `undefined` | 图标尺寸（像素），为空时继承父元素 font-size |
| `filled` | `boolean` | `false` | 是否使用填充模式 |
| `style` | `React.CSSProperties` | `undefined` | 自定义样式 |
| `className` | `string` | `''` | 自定义 CSS 类名 |
| `data-testid` | `string` | `undefined` | 测试 ID |

## 支持的图标名称

### 导航类
```tsx
<Icon name="home" />          // 首页
<Icon name="menu" />          // 菜单
<Icon name="search" />        // 搜索
<Icon name="settings" />      // 设置
<Icon name="arrow_back" />    // 返回
<Icon name="arrow_forward" /> // 前进
<Icon name="expand_more" />   // 展开更多
<Icon name="expand_less" />   // 收起
```

### 用户和社交
```tsx
<Icon name="person" />        // 用户
<Icon name="people" />        // 多用户
<Icon name="favorite" />      // 收藏/喜欢
<Icon name="star" />          // 星标
<Icon name="share" />         // 分享
```

### 操作类
```tsx
<Icon name="add" />           // 添加
<Icon name="remove" />        // 删除
<Icon name="edit" />          // 编辑
<Icon name="delete" />        // 删除
<Icon name="close" />         // 关闭
<Icon name="check" />         // 确认
<Icon name="save" />          // 保存
<Icon name="copy" />          // 复制
```

### 文件操作
```tsx
<Icon name="download" />      // 下载
<Icon name="upload" />        // 上传
<Icon name="folder" />        // 文件夹
<Icon name="file" />          // 文件
<Icon name="attach_file" />   // 附件
```

### 可见性
```tsx
<Icon name="visibility" />    // 显示
<Icon name="visibility_off" /> // 隐藏
```

### 状态和反馈
```tsx
<Icon name="info" />          // 信息
<Icon name="warning" />       // 警告
<Icon name="error" />         // 错误
<Icon name="check_circle" />  // 成功
<Icon name="cancel" />        // 取消
```

### 媒体控制
```tsx
<Icon name="play_arrow" />    // 播放
<Icon name="pause" />         // 暂停
<Icon name="stop" />          // 停止
<Icon name="volume_up" />     // 音量开
<Icon name="volume_off" />    // 音量关
```

## 填充模式

Lucide 图标通过 `filled` 属性模拟填充效果：

```tsx
<Icon name="favorite" />        // 空心
<Icon name="favorite" filled /> // 填充（模拟）
<Icon name="star" />           // 空心
<Icon name="star" filled />    // 填充（模拟）
```

## 注意事项

1. 图标名称使用 Material Icons 的命名约定，内部自动映射到对应的 Lucide 图标
2. 如果使用了未映射的图标名称，会显示警告并使用默认的帮助图标
3. `filled` 模式通过样式模拟，某些图标可能效果有限
4. 自定义数字尺寸使用像素值
5. 当 `size` 为 `undefined` 时，图标会完全继承父元素的 font-size
6. 图标颜色可以通过 CSS 的 `color` 属性或 `style.color` 控制
7. 所有图标都是内置的，无需网络连接

## 迁移说明

从 Material Icons 迁移到 Lucide 图标：

- ✅ **无需修改现有代码** - 所有 Material Icons 名称都有对应映射
- ✅ **API 完全兼容** - 所有原有属性都被保留
- ✅ **样式保持一致** - 视觉效果基本相同
- ✅ **性能提升** - 无需加载外部字体文件
- ✅ **离线可用** - 所有图标都内置在组件中

## Files

- `index.tsx` - Main icon component implementation with Lucide integration
- `README.md` - This documentation file
- `MATERIAL_ICONS_INTEGRATION.md` - Migration and compatibility guide

## Usage

```typescript
import { Icon } from '@/ui-components';

<Icon name="home" size={24} />
<Icon name="search" filled />
<Icon name="settings" style={{ color: 'blue' }} />
``` 