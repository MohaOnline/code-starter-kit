# CodeMirror 6 官方库示例需求文档

## 用户需求

用户要求在 `./src/app/examples/codemirror/basic-v2-pure` 目录下生成一个最简单的 CodeMirror 6 示例页面 `page.tsx`，并明确要求：

- **使用官方库**：不使用第三方 React 封装库（如 @uiw/react-codemirror）
- **最简单实现**：创建一个基础的代码编辑器示例
- **技术栈**：Next.js 15 + App Router + TypeScript

## 技术实现方案

### 核心依赖包

- `@codemirror/state` - 编辑器状态管理
- `@codemirror/view` - 编辑器视图和 DOM 渲染
- `@codemirror/commands` - 默认命令和键盘快捷键
- `@codemirror/lang-javascript` - JavaScript 语言支持

### 实现要点

1. **状态管理**：使用 `EditorState.create()` 创建不可变的编辑器状态
2. **视图渲染**：使用 `EditorView` 构造函数创建编辑器实例
3. **React 集成**：
   - 使用 `useRef` 管理 DOM 容器引用
   - 使用 `useEffect` 处理编辑器生命周期
   - 在组件卸载时调用 `view.destroy()` 清理资源
4. **功能扩展**：
   - 集成默认键盘快捷键（撤销、重做等）
   - 添加 JavaScript 语法高亮支持

### 文件结构

```
basic-v2-pure/
├── page.tsx          # 主要示例页面
└── docs/
    └── requirements.md # 需求文档（本文件）
```

## 参考资料

- [CodeMirror 6 官方文档](https://codemirror.net/docs/guide/)
- [CodeMirror 6 API 参考](https://codemirror.net/docs/ref/)
- [CodeMirror 6 迁移指南](https://codemirror.net/docs/migration/)
