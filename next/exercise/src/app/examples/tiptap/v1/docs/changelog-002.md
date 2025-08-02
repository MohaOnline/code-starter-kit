# TipTap 自定义编辑器示例变更日志

## 2025-08-03 修复 SSR 渲染问题

### 问题描述

在 Next.js 服务器端渲染(SSR)环境中，TipTap 编辑器出现了水合不匹配错误：

```
Error: Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
```

这是因为 TipTap 在服务器端尝试渲染编辑器，但客户端水合过程中状态不一致导致错误。

### 修复方案

在 `useEditor` 配置中添加 `immediatelyRender: false` 选项，明确告知 TipTap 不要在服务器端立即渲染编辑器，而是等待客户端水合后再初始化编辑器。

```tsx
const editor = useEditor({
  // 其他配置...
  immediatelyRender: false, // 防止 SSR 渲染问题
});
```

### 技术说明

在 Next.js App Router 中，即使页面组件使用了 'use client' 指令，某些初始化仍然会在服务器端执行，这可能导致 TipTap 的服务器渲染出现问题。设置 `immediatelyRender: false` 可以确保 TipTap 编辑器仅在客户端初始化，避免服务器端和客户端状态不一致的问题。
