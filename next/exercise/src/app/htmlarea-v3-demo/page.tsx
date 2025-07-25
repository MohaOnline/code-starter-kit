'use client';

import React, { useState } from 'react';
import HTMLAreaV3 from '../lib/components/HTMLAreaV3';

/**
 * HTMLAreaV3 演示页面
 * 展示新增的代码块插入功能和Highlight.js预览支持
 */
export default function HTMLAreaV3Demo() {
  const [content, setContent] = useState(`<h1>HTMLAreaV3 演示</h1>
<p>这是一个增强版的HTML编辑器，新增了以下功能：</p>
<ul>
  <li>代码块插入按钮</li>
  <li>Highlight.js代码高亮预览</li>
  <li>默认关闭预览区</li>
</ul>

<h2>数学公式示例</h2>
<p>行内公式：$E = mc^2$</p>
<p>块级公式：</p>
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

<h2>代码块示例</h2>
<p>JavaScript代码：</p>
<pre><code class="language hljs javascript">function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55</code></pre>

<p>Python代码：</p>
<pre><code class="language hljs python">def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3,6,8,10,1,2,1]))</code></pre>

<h2>语音标签示例</h2>
<p>这是一个带语音的文本：<span aria-label="Hello World" speaker="en-US" data-voice-id="voice1">Hello World</span></p>

<h2>图片示例</h2>
<img aria-label="示例图片" speaker="zh-CN" data-voice-id="voice2" src="https://via.placeholder.com/300x200?text=示例图片" alt="示例图片"/>`);

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTMLAreaV3 演示</h1>
        <p className="text-gray-600 dark:text-gray-400">
          这是HTMLAreaV3组件的演示页面，展示了新增的代码块插入功能和Highlight.js代码高亮预览支持。
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">功能特点</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>✨ 新增代码块插入按钮（&lt;/&gt;图标）</li>
          <li>🎨 支持Highlight.js代码语法高亮</li>
          <li>👁️ 默认关闭预览区（可手动开启）</li>
          <li>📐 保留所有V2版本的功能（数学公式、语音标签等）</li>
          <li>🔄 支持编辑器与预览区滚动同步</li>
          <li>🏷️ HTML标签匹配高亮（Ctrl+J/Cmd+J跳转）</li>
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">使用说明</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>点击工具栏中的 &lt;/&gt; 按钮插入代码块</li>
          <li>在代码块中添加相应的编程语言代码</li>
          <li>勾选"Preview"复选框查看代码高亮效果</li>
          <li>支持JavaScript、Python、HTML、CSS等多种语言</li>
        </ol>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-medium mb-3">编辑器</h3>
        <HTMLAreaV3
          value={content}
          handleNoteChange={handleContentChange}
          minHeight="400px"
          maxHeight="800px"
          name="htmlarea-v3-demo"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">当前内容长度</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {content.length} 字符
        </p>
      </div>
    </div>
  );
}