'use client';

import React, { useState } from 'react';
import HTMLAreaV1 from '@/app/lib/components/HTMLAreaV1';

const CodeMirrorV1Example: React.FC = () => {
  const [content, setContent] = useState(`<p>这是一个 CodeMirror 6 在 Next.js 15 中的示例。</p>
<p>尝试编辑这里的 HTML 内容，右侧会实时预览效果。</p>

<p>这是一个数学公式: $a^2 + b^2 = c^2$</p>

<p>这是一个更复杂的公式:</p>
$$\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

<img src="https://placehold.co/300x200" alt="placeholder" />
`);

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">CodeMirror 6 + Next.js 15 示例 (V1)</h1>
      <p className="text-gray-600 mb-6">
        这个示例展示了如何在 Next.js 应用中使用 CodeMirror 6 编辑器，并实现 HTML 的实时预览、MathJax 公式支持、自动高度调整和自定义工具栏等功能。
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">主要功能:</h3>
        <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
          <li>左侧是支持语法高亮的 CodeMirror HTML 编辑器。</li>
          <li>右侧是 HTML 内容的实时预览。</li>
          <li>预览区支持 MathJax 对数学公式进行渲染。</li>
          <li>编辑器高度会根据内容长度自动调整。</li>
          <li>顶部工具栏提供了插入常用 HTML 元素的快捷按钮。</li>
        </ul>
      </div>

      <HTMLAreaV1
        value={content}
        handleNoteChange={handleContentChange}
        minHeight="300px"
        maxHeight="800px"
        name="html-editor-v1"
      />

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">编辑器内容预览:</h3>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>{content}</code></pre>
      </div>
    </div>
  );
};

export default CodeMirrorV1Example;