"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

/**
 * CodeMirror 6 实现原理分析页面
 *
 * 本页面深入解析 CodeMirror 6 的核心实现机制，回答一个关键问题：
 * 为什么一个普通的 div 元素（没有 contenteditable 属性）能够实现文本编辑功能？
 *
 * CodeMirror 6 的核心创新：
 * 1. 虚拟文档模型 (Document Model) - 维护文档的抽象表示
 * 2. 视图层 (View Layer) - 将文档模型渲染为 DOM
 * 3. 事件系统 (Event System) - 捕获和处理用户输入
 * 4. 状态管理 (State Management) - 统一的状态更新机制
 */
export default function CodeMirror6ImplementationPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [showInternals, setShowInternals] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    // 创建 CodeMirror 6 编辑器实例
    const view = new EditorView({
      doc: `console.log('Hello, CodeMirror 6!')

// CodeMirror 6 的神奇之处：
// 这个编辑器没有使用 contenteditable
// 而是通过精密的 DOM 操作和事件处理实现编辑功能

function explainCodeMirror6() {
  // 1. 文档模型：Text 类维护文档内容
  // 2. 视图层：EditorView 负责 DOM 渲染
  // 3. 状态管理：EditorState 管理所有状态
  // 4. 事件处理：自定义事件系统捕获输入
  return "这就是 CodeMirror 6 的实现原理！"
}`,
      extensions: [
        basicSetup,
        javascript(),
        oneDark,
        // 添加调试扩展来观察内部状态
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            setDebugInfo({
              docLength: update.state.doc.length,
              selection: update.state.selection.main,
              changes: update.changes.desc,
              timestamp: Date.now(),
            });
          }
        }),
      ],
      parent: editorRef.current,
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, []);

  // 获取编辑器的内部 DOM 结构信息
  const getDOMStructure = () => {
    if (!editorView) return null;

    const contentDOM = editorView.contentDOM;
    console.log("contentDOM:", contentDOM);
    return {
      tagName: contentDOM.tagName,
      className: contentDOM.className,
      attributes: Array.from(contentDOM.attributes).map(attr => ({
        name: attr.name,
        value: attr.value,
      })),
      childrenCount: contentDOM.children.length,
      hasContentEditable: contentDOM.hasAttribute("contenteditable"),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">CodeMirror 6 实现原理深度解析</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">核心问题：为什么普通 div 能够编辑？</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              CodeMirror 6 的革命性创新在于<strong>完全抛弃了 contenteditable</strong>，
              而是通过以下四个核心机制实现文本编辑：
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                <strong>虚拟文档模型</strong>：使用 Text 类维护文档的抽象表示，与 DOM 分离
              </li>
              <li>
                <strong>精确的 DOM 渲染</strong>：EditorView 将文档模型精确映射到 DOM 结构
              </li>
              <li>
                <strong>事件拦截系统</strong>：捕获所有键盘、鼠标事件，转换为文档操作
              </li>
              <li>
                <strong>增量更新机制</strong>：只更新变化的 DOM 部分，保证性能
              </li>
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 编辑器演示 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">实际编辑器演示</h3>
            <div
              ref={editorRef}
              className="border border-gray-300 rounded-md overflow-hidden"
              style={{ minHeight: "300px" }}
            />
          </div>

          {/* DOM 结构分析 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">DOM 结构分析</h3>
            <button
              onClick={() => setShowInternals(!showInternals)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {showInternals ? "隐藏" : "显示"} 内部结构
            </button>

            {showInternals && (
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded">
                  <h4 className="font-semibold mb-2">编辑器 DOM 信息：</h4>
                  <pre className="text-sm overflow-auto">{JSON.stringify(getDOMStructure(), null, 2)}</pre>
                </div>

                <div className="bg-gray-100 p-4 rounded">
                  <h4 className="font-semibold mb-2">实时调试信息：</h4>
                  <pre className="text-sm overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 技术原理详解 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">技术原理详解</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 文档模型 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">1. 文档模型 (Document Model)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Text 类</strong>：不可变的文档表示
                </p>
                <p>
                  <strong>Line 结构</strong>：高效的行级操作
                </p>
                <p>
                  <strong>Change 对象</strong>：描述文档变更
                </p>
                <p>
                  <strong>优势</strong>：与 DOM 解耦，支持撤销/重做
                </p>
              </div>
            </div>

            {/* 视图层 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-600 mb-3">2. 视图层 (View Layer)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>EditorView</strong>：DOM 渲染引擎
                </p>
                <p>
                  <strong>ViewUpdate</strong>：增量更新机制
                </p>
                <p>
                  <strong>Decoration</strong>：样式和组件装饰
                </p>
                <p>
                  <strong>优势</strong>：精确控制，高性能渲染
                </p>
              </div>
            </div>

            {/* 事件系统 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-600 mb-3">3. 事件系统 (Event System)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>DOM 事件拦截</strong>：捕获所有用户输入
                </p>
                <p>
                  <strong>输入法支持</strong>：处理复杂的组合输入
                </p>
                <p>
                  <strong>选择管理</strong>：精确的光标和选区控制
                </p>
                <p>
                  <strong>优势</strong>：完全可控的编辑体验
                </p>
              </div>
            </div>

            {/* 状态管理 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-600 mb-3">4. 状态管理 (State Management)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>EditorState</strong>：不可变状态容器
                </p>
                <p>
                  <strong>Transaction</strong>：状态变更描述
                </p>
                <p>
                  <strong>Extension</strong>：模块化功能扩展
                </p>
                <p>
                  <strong>优势</strong>：可预测的状态变更
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 关键代码示例 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">关键实现代码示例</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">1. 事件处理机制</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {`// CodeMirror 6 如何处理键盘输入
class EditorView {
  constructor(config) {
    this.contentDOM = document.createElement('div')
    this.contentDOM.className = 'cm-content'
    this.contentDOM.setAttribute('role', 'textbox')
    this.contentDOM.setAttribute('aria-multiline', 'true')
    
    // 关键：不设置 contenteditable，而是监听事件
    this.contentDOM.addEventListener('keydown', this.handleKeyDown)
    this.contentDOM.addEventListener('input', this.handleInput)
    this.contentDOM.addEventListener('compositionstart', this.handleComposition)
  }
  
  handleKeyDown = (event) => {
    // 拦截所有键盘事件，转换为文档操作
    const transaction = this.state.update({
      changes: this.keyToChange(event)
    })
    this.dispatch(transaction)
    event.preventDefault() // 阻止默认行为
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">2. DOM 同步机制</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {`// 文档模型到 DOM 的同步
class ViewUpdate {
  updateDOM() {
    // 只更新变化的部分，不是重新渲染整个编辑器
    for (let change of this.changes) {
      const domRange = this.mapPosToDOM(change.from, change.to)
      const newContent = this.renderText(change.insert)
      
      // 精确替换 DOM 节点
      domRange.deleteContents()
      domRange.insertNode(newContent)
    }
    
    // 更新光标位置
    this.updateSelection()
  }
}`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">3. 为什么不用 contenteditable？</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>浏览器兼容性问题</strong>：不同浏览器的 contenteditable 行为差异巨大
                  </li>
                  <li>
                    <strong>无法精确控制</strong>：浏览器的默认编辑行为难以定制
                  </li>
                  <li>
                    <strong>性能问题</strong>：contenteditable 在大文档时性能较差
                  </li>
                  <li>
                    <strong>输入法支持</strong>：自定义事件处理能更好地支持各种输入法
                  </li>
                  <li>
                    <strong>撤销/重做</strong>：需要自定义的历史管理系统
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 总结 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">总结：CodeMirror 6 的创新之处</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              CodeMirror 6 通过<strong>完全重新设计编辑器架构</strong>， 实现了一个没有 contenteditable
              但功能强大的代码编辑器。 它的核心思想是<strong>"控制一切"</strong>：
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-4">
              <li>用虚拟文档模型替代 DOM 作为数据源</li>
              <li>用自定义事件处理替代浏览器默认行为</li>
              <li>用增量渲染替代全量更新</li>
              <li>用模块化扩展替代单体架构</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              这种设计使得 CodeMirror 6 在性能、可定制性和跨浏览器兼容性方面 都达到了前所未有的高度。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
