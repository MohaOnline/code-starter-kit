# TS-CC 统一布局系统需求文档

## 项目概述

为 `pages/pages/examples/ts-cc` 目录下的所有子页面创建统一的 HTML head 和 body 标签管理系统，使得子页面（如 `ts-cc/v1`）只需要返回 body 内容，而不需要重复设置页面结构和 meta 信息。

## 核心需求

### 1. 统一 HTML Head 管理
- 所有子页面共享相同的基础 meta 标签设置
- 支持页面级别的自定义 title、description、keywords
- 包含 SEO 优化的 Open Graph 和 Twitter Card 标签
- 统一的字体、样式和资源预加载设置

### 2. 统一页面结构
- 提供一致的页面布局框架（header、main、footer）
- 包含导航栏和页脚的统一设计
- 响应式布局支持移动端和桌面端
- 子页面只需要专注于主内容区域的实现

### 3. 灵活的使用方式
- 支持高阶组件（HOC）模式
- 支持 Next.js getLayout 模式
- TypeScript 类型安全保障
- 简单易用的 API 设计

## 技术规格

### 框架和技术栈
- **框架**: Next.js Pages Router
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件**: React 函数组件

### 文件结构
```
pages/pages/examples/ts-cc/
├── _layout.tsx          # 统一布局组件
├── index.tsx           # 主页面
├── v1.tsx              # V1 示例页面
└── docs/
    ├── requirements.md  # 需求文档
    └── changelog-001.md # 变更日志
```

### 核心组件设计

#### TsCcLayout 组件
- **功能**: 提供统一的页面结构和 HTML head 设置
- **参数**:
  - `children`: React.ReactNode - 子页面内容
  - `title?`: string - 页面标题
  - `description?`: string - 页面描述
  - `keywords?`: string - 页面关键词

#### withTsCcLayout 高阶组件
- **功能**: 包装页面组件，自动应用布局
- **使用**: `withTsCcLayout(Component, layoutProps)`
- **优势**: 简单直观，适合大多数使用场景

#### getTsCcLayout 函数
- **功能**: 返回 getLayout 函数，用于 Next.js getLayout 模式
- **使用**: `Component.getLayout = getTsCcLayout(layoutProps)`
- **优势**: 更灵活，适合复杂的布局需求

## 功能特性

### 1. SEO 优化
- 自动设置页面 title 格式：`{title} - TS-CC`
- 完整的 meta 标签：description、keywords、viewport、author
- Open Graph 标签支持社交媒体分享
- Twitter Card 标签优化

### 2. 性能优化
- 字体和资源预加载
- 响应式图片和图标
- CSS 优化和压缩

### 3. 用户体验
- 统一的导航栏设计
- 清晰的页面层次结构
- 移动端友好的响应式设计
- 一致的视觉风格和交互

### 4. 开发体验
- TypeScript 类型安全
- 清晰的 API 设计
- 详细的代码注释
- 多种使用模式支持

## 使用场景

### 场景 1: 简单页面
```tsx
import { withTsCcLayout } from './_layout';

function SimplePage() {
  return <div>简单页面内容</div>;
}

export default withTsCcLayout(SimplePage);
```

### 场景 2: 自定义 meta 信息
```tsx
import { withTsCcLayout } from './_layout';

function CustomPage() {
  return <div>自定义页面内容</div>;
}

export default withTsCcLayout(CustomPage, {
  title: '自定义标题',
  description: '自定义描述',
  keywords: 'custom, page, example'
});
```

### 场景 3: getLayout 模式
```tsx
import { getTsCcLayout } from './_layout';

function AdvancedPage() {
  return <div>高级页面内容</div>;
}

AdvancedPage.getLayout = getTsCcLayout({
  title: '高级页面',
  description: '使用 getLayout 模式的页面'
});

export default AdvancedPage;
```

## 实现状态

✅ **已完成**:
- 创建 `_layout.tsx` 统一布局组件
- 实现 `withTsCcLayout` 高阶组件
- 实现 `getTsCcLayout` 函数
- 创建 `index.tsx` 主页面
- 创建 `v1.tsx` 示例页面
- 完整的 TypeScript 类型定义
- 响应式设计和样式
- SEO 优化设置

## 访问路径

- 主页面: `/pages/examples/ts-cc`
- V1 示例: `/pages/examples/ts-cc/v1`

## 扩展计划

### 短期计划
- 添加更多示例页面（v2, v3）
- 增加主题切换功能
- 添加面包屑导航

### 长期计划
- 支持多语言国际化
- 添加页面过渡动画
- 集成分析和监控工具
- 支持自定义主题配置

## 技术债务

目前无明显技术债务，代码质量良好，符合最佳实践。

## 维护说明

- 布局修改请在 `_layout.tsx` 中进行
- 新增页面请参考 `v1.tsx` 的实现方式
- 样式修改请遵循 Tailwind CSS 规范
- 类型定义请保持完整和准确