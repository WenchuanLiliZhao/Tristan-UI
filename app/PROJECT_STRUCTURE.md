# Lili Design System - 项目结构

这是一个完整的 Design System 项目，包含组件库开发、展示和演示功能。

## 📁 项目结构

```
app/
├── src/
│   ├── components/                 # 🧩 核心组件库
│   │   ├── Button/                # Button 组件
│   │   │   ├── Button.tsx
│   │   │   └── Button.scss
│   │   ├── types.ts              # 组件类型定义
│   │   └── index.ts              # 组件导出文件
│   │
│   ├── pages/                      # 📖 示例页面（用于调试组件）
│   │   └── ComponentShowcase/     # 组件展示页面
│   │       ├── ComponentShowcase.tsx
│   │       └── ComponentShowcase.scss
│   │
│   ├── demos/                      # 🎭 大型演示应用
│   │   └── LibraryManagement/     # 图书馆管理系统演示
│   │       ├── LibraryManagement.tsx
│   │       └── LibraryManagement.scss
│   │
│   ├── data/                       # 📊 示例数据
│   │   └── mockData.ts            # 模拟数据
│   │
│   ├── index.ts                   # 📦 库入口文件（用于npm发布）
│   ├── main.tsx                   # 🚀 开发环境入口
│   ├── App.tsx                    # 📱 主应用组件
│   └── App.scss                   # 🎨 主应用样式
│
├── package.json                    # 📋 项目配置
├── vite.config.ts                 # ⚙️ Vite 配置（支持库模式）
├── tsconfig.json                  # 📝 TypeScript 配置
└── README.md                      # 📚 项目说明
```

## 🚀 功能特性

### 1. 组件库核心 (`src/components/`)
- **模块化设计**: 每个组件都有独立的文件夹
- **TypeScript 支持**: 完整的类型定义
- **SCSS 样式**: 使用 BEM 命名规范
- **可扩展架构**: 易于添加新组件

### 2. 组件展示页面 (`src/pages/`)
- **实时预览**: 在开发过程中调试组件
- **多变体展示**: 展示组件的所有状态和样式
- **交互测试**: 测试组件的交互功能

### 3. 大型演示应用 (`src/demos/`)
- **完整应用**: 展示组件在真实场景中的使用
- **最佳实践**: 演示如何组合使用多个组件
- **用户体验**: 展示设计系统的完整用户体验

### 4. 示例数据 (`src/data/`)
- **模拟数据**: 为演示应用提供真实感的数据
- **类型定义**: TypeScript 类型支持
- **可扩展**: 易于添加新的数据类型

## 🔧 开发工具链

- **React 19**: 最新的 React 版本
- **TypeScript**: 类型安全
- **Vite**: 快速的构建工具
- **SCSS**: 强大的样式预处理器
- **ESLint**: 代码质量检查

## 📦 使用方式

### 开发模式
```bash
npm run dev
```
启动开发服务器，可以查看组件展示和演示应用。

### 构建库文件
```bash
npm run build:lib
```
构建用于发布到 npm 的库文件。

### 构建开发应用
```bash
npm run build
```
构建展示和演示应用。

## 🎯 使用场景

### 1. 组件开发者
- 在 `src/components/` 中开发新组件
- 在 `src/pages/ComponentShowcase/` 中测试和展示组件
- 使用 `npm run dev` 进行实时开发

### 2. 设计师
- 查看 `组件展示` 页面了解所有可用组件
- 查看 `演示应用` 了解组件在实际场景中的表现
- 提供设计反馈和改进建议

### 3. 产品团队
- 查看 `演示应用` 了解设计系统的能力
- 使用组件库构建新的应用界面
- 保持设计一致性

### 4. 用户/开发者
- 通过 npm 安装: `npm install lili-design-system`
- 导入组件: `import { Button, Input } from 'lili-design-system'`
- 在项目中使用组件

## 🎨 设计原则

1. **一致性**: 统一的设计语言和交互模式
2. **可访问性**: 支持键盘导航和屏幕阅读器
3. **响应式**: 适配各种设备尺寸
4. **模块化**: 组件可独立使用或组合使用
5. **可定制**: 支持主题定制和样式覆盖

## 🔮 未来规划

- [ ] 添加更多基础组件 (Input, Card, Modal 等)
- [ ] 主题系统和暗色模式支持
- [ ] Storybook 集成
- [ ] 单元测试覆盖
- [ ] 文档网站
- [ ] 动画和过渡效果
- [ ] 国际化支持

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/new-component`
3. 提交更改: `git commit -am 'Add new component'`
4. 推送分支: `git push origin feature/new-component`
5. 提交 Pull Request

## �� 许可证

MIT License 