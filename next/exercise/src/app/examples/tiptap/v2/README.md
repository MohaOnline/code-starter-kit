# 自定义 Span 属性的 Tiptap 编辑器

这是一个基于 Tiptap 和 React 的富文本编辑器示例，支持自定义 span 元素的属性编辑。

## 功能特点

- 支持基本的富文本编辑（加粗、斜体、段落）
- 自定义 span 元素，可添加和编辑以下属性：
  - `aria-label`：朗读文本
  - `data-speaker`：说话者
  - `data-voice-id`：语音ID
- 完整的 HTML 输出
- 属性值中的引号自动转义，确保 HTML 结构完整

## 组件结构

- `TiptapEditor.tsx`：主编辑器组件
- `Toolbar.tsx`：编辑工具栏
- `SpanAttributeModal.tsx`：属性编辑模态框
- `extensions/CustomSpanExtension.tsx`：自定义 Span 节点扩展

## 使用方法

在编辑器中，您可以：

1. 使用工具栏添加新的 span 元素
2. 选中现有的 span 元素后，点击「编辑 Span 属性」按钮修改其属性
3. 编辑完成后，可以点击「保存内容」将 HTML 内容保存

## 注意事项

- 编辑 aria-label 时，引号会自动转义为 `&quot;`，确保 HTML 结构完整
- 未提供 data-voice-id 时会自动生成 UUID
- 支持 div 和 p 作为最外层容器，内部可以包含多个 span 元素
