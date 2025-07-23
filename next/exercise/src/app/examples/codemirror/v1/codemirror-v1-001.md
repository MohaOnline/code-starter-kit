# CodeMirror 6 + Next.js 15 示例 (V1) - 实现追踪

## 任务目标

在 `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/examples/codemirror/v1` 目录下创建一个示例页面，演示如何在 Next.js 15 中使用 CodeMirror 6。该示例需要满足以下要求：

- 用户可以编辑 HTML 代码。
- 提供一个实时预览区域，能够展示最终的 HTML 效果。
- 预览区域需要支持 MathJax 来渲染数学公式。
- CodeMirror 编辑器区域的高度应能根据代码内容的长度自动调整。
- 提供一个自定义工具栏，用于快速插入常见的 HTML 代码片段。

## 已完成的工作

1.  **分析现有组件**
    *   仔细研究了位于 `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/lib/components/HTMLAreaV2.tsx` 的现有组件 `HTMLAreaV2`。
    *   分析了其在自动高度调整、工具栏实现、MathJax 集成和滚动同步等方面的实现细节。

2.  **创建新的简化版组件 (`HTMLAreaV1`)**
    *   在 `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/lib/components/HTMLAreaV1.tsx` 路径下创建了一个新的组件 `HTMLAreaV1`。
    *   该组件是 `HTMLAreaV2` 的一个简化版本，保留了核心功能，包括：
        *   使用 `@uiw/react-codemirror` 作为基础编辑器。
        *   实现了基于 `contentHeight` 的自动高度调整逻辑。
        *   提供了一个包含段落、图片和数学公式插入按钮的工具栏。
        *   集成了 `better-react-mathjax` 以支持数学公式的预览。

3.  **创建示例页面**
    *   在 `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/examples/codemirror/v1/page.tsx` 路径下创建了新的示例页面。
    *   该页面引入并使用了 `HTMLAreaV1` 组件。
    *   页面包含一个初始的 HTML 内容示例，其中含有文本、图片和 MathJax 公式，以展示组件的功能。
    *   提供了清晰的页面标题和功能说明，方便用户理解和测试。

## 文件清单

*   **新组件**: `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/lib/components/HTMLAreaV1.tsx`
*   **示例页面**: `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/examples/codemirror/v1/page.tsx`
*   **追踪文档**: `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/examples/codemirror/v1/codemirror-v1-001.md`

## 后续步骤

- 可以在浏览器中访问新创建的示例页面，以验证所有功能是否按预期工作。
- 根据需要，可以进一步对 `HTMLAreaV1` 组件进行扩展或优化。