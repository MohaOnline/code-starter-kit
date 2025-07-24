'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorModel } from './components/EditorModel';
import { EditorView } from './components/EditorView';
import { InputHandler } from './components/InputHandler';
import { CursorManager } from './components/CursorManager';
import './styles/editor.css';

/**
 * Monaco Editor 风格的编辑器演示页面
 * 
 * 基于 Monaco Editor 的实现原理，使用相同的技术架构：
 * 1. Model/View 分离 - EditorModel 管理数据，EditorView 负责渲染
 * 2. 虚拟渲染 - 只渲染可视区域内容，支持大文件编辑
 * 3. 隐藏输入 - 使用隐藏的 textarea 捕获输入事件
 * 4. 绝对定位光标 - 精确映射行列坐标到屏幕位置
 * 5. 自定义滚动 - 虚拟滚动机制，按需渲染
 */
export default function MonacoEditorDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<EditorModel | null>(null);
  const [view, setView] = useState<EditorView | null>(null);
  const [cursorManager, setCursorManager] = useState<CursorManager | null>(null);
  const [inputHandler, setInputHandler] = useState<InputHandler | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });
  const [lineCount, setLineCount] = useState(0);
  

  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 初始化编辑器组件
    initializeEditor();
    
    return () => {
      // 清理资源
      cleanup();
    };
  }, []);
  
  /**
   * 初始化编辑器
   */
  const initializeEditor = async () => {
    if (!containerRef.current) {
      return;
    }
    
    try {
      // 1. 创建数据模型
      const editorModel = new EditorModel();
      
      // 定义统一的字体选项
      const fontOptions = {
        lineHeight: 21,
        fontSize: 14,
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
      };
      
      // 2. 创建视图渲染器（EditorView 自带滚动管理）
      const editorView = new EditorView(
        containerRef.current,
        editorModel,
        {
          ...fontOptions,
          showLineNumbers: true
        }
      );
      
      // 3. 创建光标管理器，使用相同的字体选项
      const cursorMgr = new CursorManager(containerRef.current, editorModel, {
        width: 2,
        color: '#ffffff',
        blinkRate: 530,
        style: 'line',
        ...fontOptions
      });
      
      // 4. 创建输入处理器
      const inputMgr = new InputHandler(containerRef.current, editorModel, cursorMgr);
      
      // 5. 设置组件间的协作关系
      setupComponentInteractions(editorModel, editorView, cursorMgr, inputMgr);
      
      // 6. 加载示例内容
      loadSampleContent(editorModel);
      
      // 7. 保存组件实例
      setModel(editorModel);
      setView(editorView);
      setCursorManager(cursorMgr);
      setInputHandler(inputMgr);
      
      // 9. 初始化状态
      setLineCount(editorModel.getLineCount());
      
      setIsReady(true);
      
      console.log('Monaco Editor 演示版本初始化完成');
    } catch (error) {
      console.error('编辑器初始化失败:', error);
    }
  };
  
  /**
   * 设置组件间的交互关系
   */
  const setupComponentInteractions = (
    model: EditorModel,
    view: EditorView,
    cursor: CursorManager,
    input: InputHandler
  ) => {
    // 模型变化时更新视图和状态
    model.onDidChangeContent(() => {
      view.render();
      setLineCount(model.getLineCount());
    });
    
    // 光标位置变化时更新状态
    cursor.onDidChangeCursorPosition((position) => {
      setCursorPosition(position);
    });
    
    // 输入焦点管理
    containerRef.current?.addEventListener('click', (event) => {
      // 将点击位置转换为文档坐标
      const rect = containerRef.current!.getBoundingClientRect();
      const viewport = view.getViewport();
      
      // 计算相对于内容区域的坐标（需要减去行号区域的宽度）
      const lineNumberWidth = 60; // 行号区域宽度，应该与EditorView中的设置一致
      const x = event.clientX - rect.left - lineNumberWidth + viewport.scrollLeft;
      const y = event.clientY - rect.top + viewport.scrollTop;
      
      // 转换为行列位置
      const position = cursor.coordinatesToPosition(x, y);
      cursor.setCursorPosition(position);
      
      // 聚焦输入处理器
      input.focus();
    });
  };
  
  /**
   * 加载示例内容
   */
  const loadSampleContent = (model: EditorModel) => {
    const sampleCode = `// Monaco Editor 演示 - 基于相同原理实现
// 展示核心技术：虚拟渲染、输入处理、光标定位、滚动管理

class MonacoEditorDemo {
  constructor() {
    this.model = new EditorModel();
    this.view = new EditorView();
    this.cursor = new CursorManager();
    this.scroll = new ScrollManager();
    this.input = new InputHandler();
  }
  
  // 虚拟渲染 - 只渲染可视区域
  renderVisibleLines() {
    const viewport = this.scroll.getViewportInfo();
    const lines = [];
    
    for (let i = viewport.startLine; i <= viewport.endLine; i++) {
      const lineContent = this.model.getLineContent(i);
      const lineElement = this.createLineElement(lineContent, i);
      lines.push(lineElement);
    }
    
    return lines;
  }
  
  // 输入处理 - 隐藏 textarea 捕获事件
  handleInput(event) {
    const position = this.cursor.getCursorPosition();
    const text = event.target.value;
    
    this.model.insertText(position, text);
    this.cursor.setCursorPosition({
      line: position.line,
      column: position.column + text.length
    });
  }
  
  // 光标定位 - 绝对定位映射行列
  updateCursorPosition(line, column) {
    const coordinates = this.calculateCoordinates(line, column);
    this.cursor.setPosition(coordinates.x, coordinates.y);
  }
  
  // 语法高亮 - 标记化和样式应用
  applySyntaxHighlighting(text, language) {
    const highlighter = new SyntaxHighlighter(language);
    const tokens = highlighter.tokenizeLine(text);
    return highlighter.tokensToHtml(tokens);
  }
}

// 示例：创建编辑器实例
const editor = new MonacoEditorDemo();
console.log('编辑器已就绪');

// 支持的特性：
// ✓ 文本显示 - div + span 虚拟渲染
// ✓ 接收输入 - 隐藏 textarea 捕获输入事件
// ✓ 光标定位 - div.cursor 绝对定位，映射行列
// ✓ 虚拟滚动 - 自定义滚动，按需渲染
// ✓ Model/View 分离 - 编辑器内容和显示完全解耦
// ✓ 语法高亮 - 基于标记化的语法着色
// ✓ 行号显示 - 动态行号渲染
// ✓ 自定义滚动条 - 完全自定义的滚动体验

// 测试多行内容和滚动
for (let i = 0; i < 20; i++) {
  console.log(\`这是第 \${i + 1} 行，用于测试虚拟滚动功能\`);
}

// 函数定义示例
function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// 类定义示例
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  distanceTo(other) {
    return calculateDistance(this.x, this.y, other.x, other.y);
  }
}

// 异步函数示例
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
    throw error;
  }
}

// 对象和数组示例
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  features: ['syntax-highlighting', 'virtual-scrolling', 'cursor-management']
};

// 正则表达式示例
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const phoneRegex = /^\\+?[1-9]\\d{1,14}$/;

// 模板字符串示例
const message = \`
  欢迎使用 Monaco Editor 演示版本！
  当前时间: \${new Date().toLocaleString()}
  编辑器特性: \${config.features.join(', ')}
\`;

console.log(message);`;
    
    model.setValue(sampleCode);
  };
  
  /**
   * 清理资源
   */
  const cleanup = () => {
    inputHandler?.dispose();
    cursorManager?.dispose();
    view?.dispose();
    model?.dispose();
  };
  
  /**
   * 切换语言
   */
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    view?.setLanguage(language);
  };
  
  /**
   * 获取编辑器内容
   */
  const getEditorContent = () => {
    return model?.getValue() || '';
  };
  
  /**
   * 设置编辑器内容
   */
  const setEditorContent = (content: string) => {
    model?.setValue(content);
  };
  
  return (
    <div className="monaco-editor-demo" style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div className="editor-header" style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>Monaco Editor 演示 - 基于相同原理实现</h1>
        

        
        <div className="editor-controls" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            语言:
            <select 
              value={currentLanguage} 
              onChange={(e) => handleLanguageChange(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="css">CSS</option>
              <option value="html">HTML</option>
              <option value="json">JSON</option>
            </select>
          </label>
          <span className="status" style={{ color: isReady ? '#28a745' : '#ffc107' }}>
            状态: {isReady ? '就绪' : '初始化中...'}
          </span>
          <span style={{ color: '#666' }}>
            行: {cursorPosition.line + 1}, 列: {cursorPosition.column + 1}
          </span>
          <span style={{ color: '#666' }}>
            总行数: {lineCount}
          </span>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="monaco-editor"
        style={{
          width: '100%',
          height: '80vh',
          minHeight: '600px',
          border: '1px solid #3c3c3c',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      />
      
      <div className="editor-info" style={{ marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>技术实现要点</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>文本显示:</strong> div + span 虚拟渲染，只渲染可视区域内容，支持大文件编辑</li>
          <li><strong>接收输入:</strong> 隐藏 &lt;textarea&gt; 捕获输入事件，转换为编辑操作</li>
          <li><strong>光标定位:</strong> div.cursor 绝对定位，精确映射行列坐标到屏幕像素</li>
          <li><strong>虚拟滚动:</strong> 自定义滚动机制，按需渲染，支持平滑滚动和惯性滚动</li>
          <li><strong>Model/View 分离:</strong> 编辑器内容和显示完全解耦，便于扩展和维护</li>
          <li><strong>语法高亮:</strong> 基于标记化的语法着色，支持多种编程语言</li>
          <li><strong>自定义滚动条:</strong> 完全自定义的滚动条样式和交互行为</li>
        </ul>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '14px' }}>
          <strong>操作提示:</strong>
          <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
            <li>点击编辑器区域可定位光标</li>
            <li>使用键盘输入文本，支持常用快捷键</li>
            <li>鼠标滚轮或拖拽滚动条进行滚动</li>
            <li>切换语言可查看不同的语法高亮效果</li>
          </ul>
        </div>
      </div>
    </div>
  );
}