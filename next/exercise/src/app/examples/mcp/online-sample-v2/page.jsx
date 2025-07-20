'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * 简单可编辑示例页面 - Simple Editable Sample Page
 * 
 * 这个组件演示了如何在 Next.js 中实现可编辑元素功能
 * 基于 HTML5 的 contentEditable 属性实现内容编辑
 * 
 * 技术要点：
 * 1. 使用 contentEditable 属性使元素可编辑
 * 2. 通过 CSS 样式控制编辑体验（光标、焦点、占位符等）
 * 3. 使用 React hooks 管理组件状态和副作用
 * 4. 实现动态添加可编辑块的功能
 * 
 * 参考文档：
 * - MDN contentEditable: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable
 * - React useRef: https://react.dev/reference/react/useRef
 * - Next.js Client Components: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */
export default function EditableSamplePage() {
  // 状态管理 - State Management
  const [editableBlocks, setEditableBlocks] = useState([
    { id: 1, content: '可编辑文本', placeholder: '点击编辑文本' },
    { id: 2, content: '另一个文本块', placeholder: '输入更多内容' }
  ]);
  
  const [mathBlocks, setMathBlocks] = useState([
    { id: 1, content: 'θ', placeholder: 'θ' },
    { id: 2, content: 'π', placeholder: 'π' },
    { id: 3, content: '2', placeholder: '2' }
  ]);
  
  const [formulaBlocks, setFormulaBlocks] = useState([
    { id: 1, content: '我的数学公式', placeholder: '输入标题' },
    { id: 2, content: '这是一个三角函数的变换', placeholder: '输入描述' },
    { id: 3, content: 'f(x) = sin(x + π/4)', placeholder: '输入公式' }
  ]);
  
  // 引用管理 - Ref Management
  const containerRef = useRef(null);
  
  // 副作用处理 - Side Effects
  useEffect(() => {
    console.log('简单可编辑示例已加载 - Simple Editable Sample loaded');
    console.log('可编辑块数量:', editableBlocks.length + mathBlocks.length + formulaBlocks.length);
  }, [editableBlocks, mathBlocks, formulaBlocks]);
  
  // 事件处理函数 - Event Handlers
  const handleBlockChange = (id, content, type) => {
    switch (type) {
      case 'editable':
        setEditableBlocks(prev => 
          prev.map(block => block.id === id ? { ...block, content } : block)
        );
        break;
      case 'math':
        setMathBlocks(prev => 
          prev.map(block => block.id === id ? { ...block, content } : block)
        );
        break;
      case 'formula':
        setFormulaBlocks(prev => 
          prev.map(block => block.id === id ? { ...block, content } : block)
        );
        break;
    }
  };
  
  const addEditableBlock = (type) => {
    const newId = Date.now();
    const newBlock = {
      id: newId,
      content: '',
      placeholder: '新的可编辑块'
    };
    
    switch (type) {
      case 'editable':
        setEditableBlocks(prev => [...prev, newBlock]);
        break;
      case 'math':
        setMathBlocks(prev => [...prev, { ...newBlock, placeholder: '数学符号' }]);
        break;
      case 'formula':
        setFormulaBlocks(prev => [...prev, { ...newBlock, placeholder: '数学公式' }]);
        break;
    }
  };
  
  // 可编辑块组件 - Editable Block Component
  const EditableBlock = ({ block, type, className = '', style = {} }) => {
    return (
      <span
        className={`editable-block ${className}`}
        contentEditable={true}
        suppressContentEditableWarning={true}
        data-placeholder={block.placeholder}
        style={style}
        onInput={(e) => {
          const target = e.target;
          if (target instanceof HTMLElement) {
            handleBlockChange(block.id, target.textContent || '', type);
          }
        }}
        onFocus={(e) => {
          const target = e.target;
          if (target instanceof HTMLElement) {
            console.log(`聚焦到块 ${block.id}:`, target.textContent);
          }
        }}
        onBlur={(e) => {
          const target = e.target;
          if (target instanceof HTMLElement) {
            console.log(`失焦块 ${block.id}:`, target.textContent);
          }
        }}
      >
        {block.content}
      </span>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 - Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          简单可编辑示例 Simple Editable Sample
        </h1>
        
        {/* 基础可编辑文本 - Basic Editable Text */}
        <div className="editable-container mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">基础可编辑文本</h2>
          <div className="space-y-4">
            {editableBlocks.map(block => (
              <div key={block.id}>
                <EditableBlock block={block} type="editable" />
              </div>
            ))}
          </div>
          <button
            onClick={() => addEditableBlock('editable')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            添加文本块
          </button>
        </div>
        
        {/* 数学表达式 - Math Expression */}
        <div className="editable-container math-expression mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">数学表达式</h2>
          <div className="text-2xl text-center">
            <div className="mb-4">
              sin(
              {mathBlocks.slice(0, 1).map(block => (
                <EditableBlock key={block.id} block={block} type="math" className="math-symbol" />
              ))}
              -
              <span className="fraction">
                {mathBlocks.slice(1, 2).map(block => (
                  <EditableBlock key={block.id} block={block} type="math" className="math-symbol" />
                ))}
                <span className="fraction-line"></span>
                {mathBlocks.slice(2, 3).map(block => (
                  <EditableBlock key={block.id} block={block} type="math" className="math-symbol" />
                ))}
              </span>
              )
            </div>
            <div className="border-t-2 border-gray-800 pt-2">
              cos(
              {mathBlocks.slice(0, 1).map(block => (
                <EditableBlock key={block.id} block={block} type="math" className="math-symbol" />
              ))}
              )
            </div>
          </div>
          <button
            onClick={() => addEditableBlock('math')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            添加数学符号
          </button>
        </div>
        
        {/* 公式编辑器 - Formula Editor */}
        <div className="editable-container mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">公式编辑器</h2>
          <div className="space-y-4">
            {formulaBlocks.map((block, index) => (
              <div key={block.id} className={index === 0 ? 'text-xl font-bold' : index === 1 ? 'text-gray-600' : 'font-mono text-lg'}>
                <EditableBlock 
                  block={block} 
                  type="formula" 
                  style={index === 1 ? { minWidth: '200px' } : {}}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => addEditableBlock('formula')}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            添加公式块
          </button>
        </div>
        
        {/* 技术说明 - Technical Notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">技术实现说明</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-600">核心特性</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li><code className="bg-gray-100 px-1 rounded">contentEditable="true"</code> 属性使元素可编辑</li>
                <li>CSS 样式控制编辑体验</li>
                <li>React hooks 管理状态</li>
                <li>动态添加编辑块功能</li>
                <li>实时内容更新</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-600">与原始编辑器对比</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>原始编辑器使用自定义 <code className="bg-gray-100 px-1 rounded">&lt;editarea&gt;</code> 元素</li>
                <li>本示例使用标准HTML <code className="bg-gray-100 px-1 rounded">contentEditable</code> 属性</li>
                <li>原始编辑器有复杂的隐藏输入系统</li>
                <li>本示例采用简化的React实现</li>
                <li>两者都支持实时编辑功能</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* 答案说明 - Answer Explanation */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="font-semibold mb-2 text-yellow-800">关于原始文件的 contentEditable 设置</h3>
          <p className="text-yellow-700 text-sm">
            经过分析，原始的 <code>editable-area.html</code> 文件<strong>没有直接使用 contentEditable="true" 属性</strong>。
            相反，它使用了一个复杂的自定义编辑系统：
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-yellow-700">
            <li>通过 <code>&lt;editarea&gt;</code> 自定义元素构建编辑区域</li>
            <li>使用隐藏的 <code>&lt;input&gt;</code> 和 <code>&lt;textarea&gt;</code> 元素捕获键盘输入</li>
            <li>通过复杂的CSS样式和JavaScript逻辑实现可视化编辑</li>
            <li>这种方式提供了更精细的控制，但实现复杂度更高</li>
          </ul>
        </div>
      </div>
      
      {/* 内联样式 - Inline Styles */}
      <style jsx>{`
        /* 可编辑区域样式 - Editable Area Styles */
        .editable-container {
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }
        
        .editable-container:hover {
          border-color: #e5e7eb;
        }
        
        .editable-container:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* 可编辑块元素 - Editable Block Elements */
        .editable-block {
          display: inline-block;
          min-width: 20px;
          min-height: 1.2em;
          padding: 4px 8px;
          border: 1px solid transparent;
          border-radius: 4px;
          background-color: rgba(59, 130, 246, 0.05);
          transition: all 0.2s ease;
          cursor: text;
          outline: none;
          user-select: text;
        }
        
        .editable-block:hover {
          background-color: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .editable-block:focus {
          background-color: rgba(59, 130, 246, 0.15);
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        
        .editable-block:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }
        
        /* 数学表达式样式 - Math Expression Styles */
        .math-expression {
          font-family: 'Times New Roman', serif;
        }
        
        .math-symbol {
          background-color: rgba(16, 185, 129, 0.1);
          font-style: italic;
          font-weight: bold;
        }
        
        .math-symbol:hover {
          background-color: rgba(16, 185, 129, 0.2);
        }
        
        .fraction {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          vertical-align: middle;
          margin: 0 4px;
        }
        
        .fraction-line {
          width: 100%;
          height: 1px;
          background-color: #374151;
          margin: 2px 0;
        }
        
        /* 工具提示样式 - Tooltip Styles */
        .tooltip {
          position: relative;
        }
        
        .tooltip:hover::after {
          content: '点击编辑此内容';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #374151;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 10;
        }
        
        /* 响应式设计 - Responsive Design */
        @media (max-width: 768px) {
          .editable-container {
            padding: 1rem;
          }
          
          .math-expression {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}