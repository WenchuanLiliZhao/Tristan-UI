# Tristan UI 故障排除指南

## 📋 概述

本文档记录在 Monorepo 架构中遇到的常见问题及解决方案。

## 🚨 TypeScript 导入错误

### 问题描述
```typescript
// 错误信息
Cannot find module '@tristan-ui/timeline' or its corresponding type declarations.
```

在 VS Code 中 `Command + .` 也找不到 `@tristan-ui/timeline` 的代码提示。

### 问题原因
1. **缺少主要类型声明文件**：TypeScript 编译生成的声明文件在 `dist/src/index.d.ts`，但 `package.json` 中指定的是 `dist/index.d.ts`
2. **package.json 配置不匹配**：`"types": "./dist/index.d.ts"` 路径与实际生成的文件位置不符

### 解决方案

#### 1. 修复构建脚本
在每个包的 `package.json` 中修改构建脚本：

```json
{
  "scripts": {
    "build": "vite build --mode library && tsc --emitDeclarationOnly && cp dist/src/index.d.ts dist/index.d.ts"
  }
}
```

#### 2. 验证修复
```bash
# 重新构建包
npm run build:lib

# 检查类型声明文件
ls -la packages/*/dist/index.d.ts

# 重新安装演示应用依赖
cd demo && npm install

# 测试构建
npm run build
```

### 预防措施

#### package.json 配置检查清单
```json
{
  "name": "@tristan-ui/[package-name]",
  "main": "dist/index.js",
  "module": "dist/index.esm.js", 
  "types": "dist/index.d.ts",    // ✅ 关键：确保路径正确
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",   // ✅ 确保路径一致
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    }
  }
}
```

#### TypeScript 配置要点
```json
{
  "compilerOptions": {
    "declaration": true,              // ✅ 生成声明文件
    "declarationMap": true,           // ✅ 生成源映射
    "outDir": "dist",                 // ✅ 输出目录
    "declarationDir": "dist"          // ✅ 声明文件目录
  }
}
```

## 🔧 演示应用依赖问题

### 问题描述
演示应用无法识别本地包，或者包更新后没有同步。

### 解决方案

#### 1. 使用本地文件协议
```json
{
  "dependencies": {
    "@tristan-ui/core": "file:../packages/core",
    "@tristan-ui/timeline": "file:../packages/timeline"
  }
}
```

#### 2. 重新安装依赖
```bash
cd demo
npm install  # 这会重新链接本地包
```

#### 3. 确保包已构建
```bash
npm run build:lib  # 确保包有最新的构建产物
```

## 📦 发布相关问题

### 问题：发布时缺少文件

#### 解决方案
检查 `package.json` 中的 `files` 字段：

```json
{
  "files": [
    "dist",           // ✅ 包含所有构建产物
    "README.md"       // ✅ 包含文档
  ]
}
```

### 问题：版本不同步

#### 解决方案
```bash
# 检查所有包版本
grep -r '"version"' packages/*/package.json

# 手动同步版本或使用工作区命令
npm version patch --workspaces
```

## 🎯 开发流程最佳实践

### 1. 修改组件后的步骤
```bash
# 1. 重新构建包
npm run build:lib

# 2. 如果演示应用有问题，重新安装依赖
cd demo && npm install && cd ..

# 3. 测试演示应用
npm run demo
```

### 2. 添加新组件的步骤
```bash
# 1. 在 packages/core/src/ 中创建组件
# 2. 在对应的 index.ts 中导出
# 3. 构建包
npm run build:core

# 4. 演示应用自动可用（如果有类型问题，重新安装依赖）
cd demo && npm install
```

### 3. 发布前检查清单
- [ ] 所有包构建成功：`npm run build:lib`
- [ ] 演示应用构建成功：`npm run build:demo`
- [ ] 版本号同步：检查所有 `package.json`
- [ ] 类型声明文件存在：`ls packages/*/dist/index.d.ts`

## 🐛 常见错误排查

### VS Code TypeScript 错误
1. **重启 TypeScript 服务**：`Cmd + Shift + P` → "TypeScript: Restart TS Server"
2. **清理缓存**：关闭 VS Code，删除 `.vscode` 目录，重新打开
3. **检查工作区设置**：确保 VS Code 打开的是项目根目录

### 构建失败
1. **清理重建**：`npm run clean && npm run build:lib`
2. **检查依赖**：`npm install`（在根目录和 demo 目录都执行）
3. **检查 Node 版本**：确保 >= 16.0.0

### 导入路径错误
```typescript
// ❌ 错误：使用相对路径
import { Button } from "../../../design-system/ui-components/general";

// ✅ 正确：使用包名
import { Button } from "@tristan-ui/core";
``` 