# MathLive O0 页面需求文档

## 用户需求

在 `./src/app/examples/mathlive/o0` 位置生成页面，要求：

1. 返回一个包含 `id="main"` 的 div 元素
2. 加载以下两个第三方文件：
   - CSS 文件：`./public/3rd/mathEditor.7c968c35.css`
   - JS 文件：`./public/3rd/mathEditor.78141fae.js`

## 技术实现

### 页面结构
- 使用 Next.js 15 App Router 架构
- 创建客户端组件（'use client'）以支持动态资源加载
- 提供基础的 HTML 结构和 SEO 元数据

### 资源加载策略
- 使用 `useEffect` 钩子在组件挂载时动态加载 CSS 和 JS 文件
- 通过 DOM 操作直接向 `document.head` 添加 `<link>` 和 `<script>` 标签
- 实现清理函数，在组件卸载时移除动态添加的资源，避免内存泄漏

### 文件路径映射
- 第三方文件存放在 `./public/3rd/` 目录下
- 在组件中使用相对于 public 目录的路径：`/3rd/mathEditor.*`

## 预期用途

该页面为数学编辑器的基础容器，第三方 MathEditor 库将使用 `#main` 容器来渲染数学编辑界面。