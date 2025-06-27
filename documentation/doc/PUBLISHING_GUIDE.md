# Tristan UI 发布管理指南

## 📋 概述

从单包发布迁移到多包发布的完整指南。解释如何替代以前的 `npm version patch` + `npm publish` 工作流。

## 🔄 从单包到多包的变化

### 以前（单包）：
```bash
npm version patch  # 更新版本
npm publish        # 发布
```

### 现在（多包）：
```bash
./scripts/publish.sh  # 统一构建和发布脚本
```

## 🚀 发布流程

### 方法 1：使用自动化脚本（推荐）

```bash
# 进入 react 目录
cd react

# 运行发布脚本
./scripts/publish.sh
```

**脚本执行流程：**
1. 🧹 清理所有包的构建文件
2. 📦 按依赖顺序构建包：
   - Core → Timeline → Complete
3. ✅ 构建成功后询问是否发布
4. 📤 按顺序发布到 npm

### 方法 2：手动分步发布

```bash
# 1. 清理构建文件
npm run clean

# 2. 构建所有库包（不包括完整包）
npm run build:lib

# 3. 发布到 npm
npm run publish:all
```

### 方法 3：逐包手动控制

```bash
# 构建指定包
npm run build:core
npm run build:timeline

# 发布指定包
cd packages/core && npm publish && cd ../..
cd packages/timeline && npm publish && cd ../..
cd packages/all && npm publish && cd ../..
```

## 📦 构建命令总览

### 构建所有包：
```bash
npm run build          # 构建所有包（包括开发演示）
npm run build:lib      # 只构建库包（core + timeline）
```

### 构建单个包：
```bash
npm run build:core      # 只构建 tristan-ui-core
npm run build:timeline  # 只构建 tristan-ui-timeline
```

### 清理构建文件：
```bash
npm run clean           # 清理所有包的 dist 目录
```

## 🔢 版本管理

### 更新版本的正确方式：

**选项 1：手动更新（推荐）**
```bash
# 1. 手动编辑所有 package.json 文件
# packages/core/package.json
# packages/timeline/package.json  
# packages/all/package.json
# package.json (workspace root)

# 2. 更新所有 index.ts 中的版本号
# packages/core/src/index.ts
# packages/timeline/src/index.ts
# packages/all/src/index.ts
```

**选项 2：使用 npm workspace 命令**
```bash
# 更新所有工作区的版本
npm version patch --workspaces
```

### 版本同步检查：
```bash
# 检查所有包的版本是否一致
grep -r '"version"' packages/*/package.json
```

## 📂 构建产物管理

### 构建输出位置：
```
packages/
├── core/dist/          # tristan-ui-core 构建产物
├── timeline/dist/      # tristan-ui-timeline 构建产物
└── all/dist/           # tristan-ui 构建产物
```

### 清理策略：
- **每次发布前：** 自动清理所有 `dist` 目录
- **开发期间：** 可以保留构建文件用于测试
- **Git 忽略：** 所有 `dist` 目录已在 `.gitignore` 中

## 🎯 发布策略

### 完整发布（推荐）：
- 同时发布所有包
- 保持版本号同步
- 确保依赖关系正确

### 独立发布（高级用法）：
- 只发布特定包
- 适用于紧急修复
- 需要手动管理依赖版本

## ⚠️ 重要注意事项

### 发布顺序很重要：
1. **Core** → 2. **Timeline** → 3. **Complete**
2. Timeline 依赖 Core，必须等 Core 发布后再发布
3. Complete 重新导出所有包，最后发布

### 版本一致性：
- 所有包必须使用相同版本号
- 发布前检查 `package.json` 和 `index.ts` 中的版本

### npm 发布权限：
- 确保你有发布所有包的权限
- 包名格式：`tristan-ui-core`, `tristan-ui-timeline`, `tristan-ui`
- 所有包均为公开包，无需特殊权限

## 🛠️ 故障排除

### 构建失败：
```bash
# 清理后重新构建
npm run clean
npm run build:lib
```

### 发布失败：
```bash
# 检查登录状态
npm whoami

# 检查包权限
npm access list packages

# 手动发布单个包
cd packages/core
npm publish
```

### 版本冲突：
```bash
# 检查现有版本
npm view tristan-ui-core versions --json
npm view tristan-ui-timeline versions --json
npm view tristan-ui versions --json
```

## 🎉 发布成功示例

当前最新版本：**0.4.12**

已发布的包：
- ✅ `tristan-ui-core@0.4.12` - 核心组件包
- ✅ `tristan-ui-timeline@0.4.12` - Timeline 组件包  
- ✅ `tristan-ui@0.4.12` - 完整组件库

用户可以通过以下方式安装：
```bash
# 安装完整库
npm install tristan-ui

# 或按需安装
npm install tristan-ui-core tristan-ui-timeline
``` 