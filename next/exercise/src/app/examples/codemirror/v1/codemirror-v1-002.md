# CodeMirror 6 + Next.js 15 示例 (V1) - 功能增强

## 任务

根据用户请求，为 `HTMLAreaV1` 组件的工具栏添加更多常用功能，包括：

- 粗体
- 无序列表
- 表格

## 已完成工作

1.  **更新 `HTMLAreaV1.tsx`**:
    *   **扩展工具栏**: 在 `toolbarButtons` 数组中添加了“粗体”、“无序列表”和“表格”按钮的配置。
    *   **引入 `type` 属性**: 为每个按钮配置添加了 `type` 属性 (`'wrap'` 或 `'insert'`)，以区分不同的插入行为。
    *   **改进 `insertCode` 函数**: 
        *   当 `type` 为 `'wrap'` 时，如果用户选择了文本，该函数会用指定的 HTML 标签包裹所选内容。
        *   如果未选择文本，则插入完整的标签对，并将光标置于标签内部。
        *   当 `type` 为 `'insert'` 时，执行标准的插入操作。

2.  **文件清单**:
    *   已修改: `src/app/lib/components/HTMLAreaV1.tsx`
    *   已创建: `src/app/examples/codemirror/v1/codemirror-v1-002.md`

## 后续步骤

- 验证新功能是否按预期工作。
- 根据用户反馈进一步优化或添加功能。