# Icon 组件使用指南

这是 Lili Design System 中的统一图标系统，提供了灵活、可扩展且易于使用的图标解决方案。

## 🎯 特性

- ✅ **15+ 内置图标** - 常用的业务图标已预设
- ✅ **多种尺寸支持** - small (16px), medium (24px), large (32px) 或自定义数值
- ✅ **灵活的颜色控制** - 支持任意颜色值或使用 currentColor
- ✅ **交互功能** - 支持点击事件和禁用状态
- ✅ **无障碍访问** - ARIA 标签和键盘导航支持
- ✅ **旋转和动画** - 内置旋转角度和动画效果
- ✅ **TypeScript 支持** - 完整的类型定义

## 📦 基本用法

```tsx
import { Icon } from 'lili-design-system';

// 基本使用
<Icon name="star" />

// 指定尺寸和颜色
<Icon name="heart" size="large" color="#dc3545" />

// 自定义尺寸
<Icon name="search" size={28} />

// 交互式图标
<Icon 
  name="settings" 
  onClick={() => console.log('Settings clicked!')}
/>
```

## 🎨 可用图标

当前包含以下图标：

| 图标名称 | 用途 | 示例 |
|---------|------|------|
| `circle` | 占位符、状态指示 | 双圆圈图标 |
| `arrow` | 导航、展开收起 | 右箭头 |
| `home` | 首页、主页 | 房子图标 |
| `user` | 用户、个人资料 | 用户头像 |
| `settings` | 设置、配置 | 齿轮图标 |
| `search` | 搜索 | 放大镜 |
| `plus` | 添加、新增 | 加号 |
| `minus` | 删除、减少 | 减号 |
| `close` | 关闭、取消 | X 号 |
| `check` | 确认、完成 | 对勾 |
| `heart` | 喜欢、收藏 | 心形 |
| `star` | 评级、收藏 | 星形 |
| `mail` | 邮件、消息 | 信封 |
| `download` | 下载 | 下载箭头 |
| `upload` | 上传 | 上传箭头 |

## 📏 尺寸选项

```tsx
// 预设尺寸
<Icon name="star" size="small" />   // 16px
<Icon name="star" size="medium" />  // 24px (默认)
<Icon name="star" size="large" />   // 32px

// 自定义尺寸
<Icon name="star" size={48} />      // 48px
```

## 🎨 颜色控制

```tsx
// 使用当前文本颜色（默认）
<Icon name="heart" />

// 指定颜色
<Icon name="heart" color="#dc3545" />
<Icon name="heart" color="var(--primary-color)" />

// 使用 CSS 类控制颜色
<Icon name="heart" className="text-primary" />
```

## 🖱️ 交互功能

```tsx
// 可点击图标
<Icon 
  name="settings" 
  onClick={() => handleSettings()}
/>

// 禁用状态
<Icon 
  name="download" 
  disabled
  onClick={() => handleDownload()}
/>

// 键盘导航支持
// 自动支持 Enter 和 Space 键触发点击事件
```

## 🔄 旋转和动画

```tsx
// 旋转角度
<Icon name="arrow" rotate={90} />   // 向下箭头
<Icon name="arrow" rotate={180} />  // 向左箭头

// 动画效果（通过 CSS 类）
<Icon name="settings" className="icon--spinning" />
<Icon name="heart" className="icon--pulse" />
```

## 💡 高级用法

### 1. 在按钮中使用

```tsx
<Button>
  <Icon name="plus" size="small" />
  添加项目
</Button>
```

### 2. 状态指示器

```tsx
const StatusIcon = ({ status }) => (
  <Icon 
    name={status === 'success' ? 'check' : 'close'} 
    color={status === 'success' ? '#28a745' : '#dc3545'}
  />
);
```

### 3. 导航菜单

```tsx
const NavItem = ({ icon, label, active, onClick }) => (
  <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    <Icon name={icon} size="small" />
    <span>{label}</span>
  </div>
);
```

## 🔧 扩展图标

要添加新图标，请修改 `Icon.tsx` 中的 `iconRegistry`：

```tsx
const iconRegistry = {
  // 现有图标...
  
  // 添加新图标
  newIcon: (
    <svg viewBox="0 0 24 24" fill="none">
      {/* SVG 路径 */}
    </svg>
  )
};
```

## 📱 无障碍访问

Icon 组件自动提供：

- **ARIA 标签** - 描述图标用途
- **键盘导航** - Tab 键导航和 Enter/Space 键触发
- **屏幕阅读器支持** - 合适的 role 属性
- **高对比度模式** - 自动适应系统设置

## 🎭 主题集成

Icon 组件与设计系统主题无缝集成：

```tsx
// 使用主题颜色
<Icon name="heart" className="icon--primary" />
<Icon name="star" className="icon--warning" />

// 响应主题切换
<Icon name="settings" color="var(--text-primary)" />
```

## 🔍 调试技巧

1. **图标不显示** - 检查图标名称是否正确，查看控制台警告
2. **尺寸异常** - 确保传入的 size 值有效
3. **颜色不生效** - 检查 CSS 优先级，使用 `!important` 或更具体的选择器

## 📊 性能优化

- 所有图标使用内联 SVG，无需额外网络请求
- SVG 代码在打包时会被压缩
- 使用 `currentColor` 减少 CSS 规则
- 支持 tree-shaking，未使用的图标会被移除

---

有问题或建议？请创建 Issue 或提交 PR！ 