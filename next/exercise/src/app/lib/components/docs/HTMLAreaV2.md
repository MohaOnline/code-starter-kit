


          
I need to create an HTMLAreaV2 component with auto-height functionality and improved toolbar behavior, then create an example page. Let me first examine the current HTMLArea component to understand its structure.
        
            
toolName: view_files
            
status: success
          
            
filePath: ./code-starter-kit/next/exercise/src/app/lib/components/HTMLArea.tsx
          
Let me view the rest of the HTMLArea component to understand the complete implementation.
        
            
toolName: view_files
            
status: success
          
            
filePath: ./code-starter-kit/next/exercise/src/app/lib/components/HTMLArea.tsx
          
Now I'll create the HTMLAreaV2 component with auto-height functionality and improved toolbar behavior that maintains selection state.
        
            
toolName: write_to_file
            
status: success
          
            
filePath: ./code-starter-kit/next/exercise/src/app/lib/components/HTMLAreaV2.tsx
          
content: 'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { htmlCompletionSource } from '@codemirror/lang-html';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Button } from '@/components/ui/button';

interface HTMLAreaV2Props {
  value?: string;
  handleNoteChange?: (value: any) => void;
  minHeight?: string;
  maxHeight?: string;
  name?: string;
}

export const HTMLAreaV2: React.FC<HTMLAreaV2Props> = ({
  value = '',
  handleNoteChange,
  minHeight = '200px',
  maxHeight = '800px',
  name
}) => {
  const [htmlContent, setHtmlContent] = useState(value);
  const [scrollSync, setScrollSync] = useState(true);
  const [editorHeight, setEditorHeight] = useState(minHeight);
  const [selectedRange, setSelectedRange] = useState<{from: number, to: number} | null>(null);
  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // MathJax 配置
  const mathJaxConfig = {
    loader: { load: ['[tex]/mhchem'] },
    tex: {
      packages: { '[+]': ['mhchem'] },
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
      processEnvironments: true
    },
    options: {
      renderActions: {
        addMenu: [0, '', '']
      },
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      ignoreHtmlClass: 'cm-editor|CodeMirror'
    },
    startup: {
      typeset: false
    }
  };

  // 工具栏按钮配置
  const toolbarButtons = [
    {
      label: 'Paragraph',
      icon: 'P',
      code: '<p></p>'
    },
    {
      label: 'Span with Voice',
      icon: '🔊',
      code: '<span aria-label="" speaker="" data-voice-id=""></span>'
    },
    {
      label: 'Math Formula',
      icon: '∑',
      code: '$$'
    },
    {
      label: 'Image with Voice',
      icon: '🖼️',
      code: '<img aria-label="" speaker="" data-voice-id="" src=""/>'
    }
  ];

  // 计算自动高度
  const calculateAutoHeight = useCallback((content: string) => {
    const lines = content.split('\n').length;
    const lineHeight = 20; // 估算每行高度
    const padding = 40; // 上下padding
    const calculatedHeight = Math.max(
      parseInt(minHeight),
      Math.min(lines * lineHeight + padding, parseInt(maxHeight))
    );
    return `${calculatedHeight}px`;
  }, [minHeight, maxHeight]);

  // 处理内容变化
  const handleContentChange = (val: string) => {
    setHtmlContent(val);
    
    // 自动调整高度
    const newHeight = calculateAutoHeight(val);
    setEditorHeight(newHeight);
    
    const e = {
      target: {
        name: name,
        value: val,
      }
    };
    handleNoteChange?.(e);
  };

  // 保存当前选择范围
  const saveSelection = () => {
    if (editorRef.current) {
      const view = editorRef.current.view;
      if (view) {
        const { selection } = view.state;
        const { from, to } = selection.main;
        setSelectedRange({ from, to });
      }
    }
  };

  // 恢复选择范围
  const restoreSelection = () => {
    if (editorRef.current && selectedRange) {
      const view = editorRef.current.view;
      if (view) {
        // 延迟恢复选择，确保内容已更新
        setTimeout(() => {
          view.dispatch({
            selection: { anchor: selectedRange.from, head: selectedRange.to }
          });
          view.focus();
        }, 10);
      }
    }
  };

  // 插入代码到编辑器（改进版，保持选择状态）
  const insertCode = (code: string) => {
    if (editorRef.current) {
      const view = editorRef.current.view;
      if (view) {
        const { state } = view;
        const { selection } = state;
        const { from, to } = selection.main;
        const selectedText = state.doc.sliceString(from, to);

        let insertText = code;
        let newFrom = from;
        let newTo = from + code.length;

        if (selectedText) {
          // 有选中内容：将代码包裹选中内容
          if (code.includes('><')) {
            // 对于 HTML 标签，将选中内容放在标签内部
            const tagMatch = code.match(/^<([^>]+)>(.*)(<\/[^>]+>)$/);
            if (tagMatch) {
              const tagName = tagMatch[1].split(' ')[0];
              insertText = `<${tagMatch[1]}>${selectedText}</${tagName}>`;
              newFrom = from;
              newTo = from + insertText.length;
            } else {
              // 其他情况，简单包裹
              insertText = code.replace(/></, `>${selectedText}<`);
              newFrom = from;
              newTo = from + insertText.length;
            }
          } else if (code === '$$') {
            // 数学公式：将选中内容放在 $ $ 之间
            insertText = `$${selectedText}$`;
            newFrom = from;
            newTo = from + insertText.length;
          } else {
            // 其他情况，在选中内容前后添加代码
            insertText = `${code}${selectedText}${code}`;
            newFrom = from;
            newTo = from + insertText.length;
          }
        } else {
          // 没有选中内容：将光标定位到代码内部
          if (code.includes('><')) {
            // HTML 标签：光标定位到标签内部
            const closeTagIndex = code.indexOf('><');
            if (closeTagIndex > 0) {
              newFrom = newTo = from + closeTagIndex + 1;
            }
          } else if (code === '$$') {
            // 数学公式：光标定位到两个 $ 之间
            newFrom = newTo = from + 1;
          } else {
            // 其他情况：光标定位到代码末尾
            newFrom = newTo = from + code.length;
          }
        }

        view.dispatch({
          changes: { from, to, insert: insertText },
          selection: { anchor: newFrom, head: newTo }
        });
        
        // 保存新的选择状态
        setSelectedRange({ from: newFrom, to: newTo });
        view.focus();
      }
    }
  };

  // 滚动同步状态
  const [isScrolling, setIsScrolling] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  // 编辑器滚动同步到预览
  const handleEditorScroll = useCallback(() => {
    if (!scrollSync || !editorRef.current || !previewRef.current || isScrolling) return;

    const editor = editorRef.current.view;
    if (editor) {
      const scrollInfo = editor.scrollDOM;
      const scrollTop = scrollInfo.scrollTop;
      const scrollHeight = scrollInfo.scrollHeight - scrollInfo.clientHeight;
      const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      const preview = previewRef.current;
      const previewScrollHeight = preview.scrollHeight - preview.clientHeight;
      preview.scrollTop = previewScrollHeight * scrollPercent;
    }
  }, [scrollSync, isScrolling]);

  // 预览滚动同步到编辑器
  const handlePreviewScroll = useCallback(() => {
    if (!scrollSync || !editorRef.current || !previewRef.current || isScrolling) return;

    const preview = previewRef.current;
    const scrollTop = preview.scrollTop;
    const scrollHeight = preview.scrollHeight - preview.clientHeight;
    const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    const editor = editorRef.current.view;
    if (editor) {
      const editorScrollHeight = editor.scrollDOM.scrollHeight - editor.scrollDOM.clientHeight;
      editor.scrollDOM.scrollTop = editorScrollHeight * scrollPercent;
    }
  }, [scrollSync, isScrolling]);

  // 添加滚动事件监听器
  useEffect(() => {
    // 清理之前的监听器
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (!scrollSync) return;

    // 延迟初始化，确保 CodeMirror 完全加载
    const initScrollSync = () => {
      if (!editorRef.current || !previewRef.current) return false;

      const editor = editorRef.current.view;
      const preview = previewRef.current;

      if (editor && preview && editor.scrollDOM) {
        const editorScrollDOM = editor.scrollDOM;

        editorScrollDOM.addEventListener('scroll', handleEditorScroll);
        preview.addEventListener('scroll', handlePreviewScroll);

        cleanupRef.current = () => {
          editorScrollDOM.removeEventListener('scroll', handleEditorScroll);
          preview.removeEventListener('scroll', handlePreviewScroll);
        };

        return true;
      }
      return false;
    };

    // 立即尝试初始化
    if (initScrollSync()) return;

    // 如果初始化失败，延迟重试
    const timer = setTimeout(() => {
      initScrollSync();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [scrollSync, handleEditorScroll, handlePreviewScroll]);

  // 初始化值和高度
  useEffect(() => {
    setHtmlContent(value);
    const initialHeight = calculateAutoHeight(value);
    setEditorHeight(initialHeight);
  }, [value, calculateAutoHeight]);

  // 渲染预览内容
  const renderPreview = () => {
    return (
      <div
        ref={previewRef}
        className="h-full overflow-auto p-4 bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-600"
        style={{ height: editorHeight }}
      >
        <MathJaxContext config={mathJaxConfig}>
          <MathJax hideUntilTypeset="first">
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose max-w-none mathjax-preview dark:prose-invert"
            />
          </MathJax>
        </MathJaxContext>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
      data-name={name}
      style={{ minHeight: minHeight }}
    >
      {/* 工具栏 */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => {
              saveSelection();
              insertCode(button.code);
            }}
            title={button.label}
            className="h-8 px-2 text-xs"
          >
            <span className="mr-1">{button.icon}</span>
            {button.label}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Height: {editorHeight}
          </span>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={scrollSync}
              onChange={(e) => setScrollSync(e.target.checked)}
              className="w-4 h-4"
            />
            Sync Scroll
          </label>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex">
        {/* 左侧编辑器 */}
        <div className="w-1/2">
          <CodeMirror
            ref={editorRef}
            value={htmlContent}
            height={editorHeight}
            theme={oneDark}
            extensions={[
              html(),
              autocompletion({
                override: [htmlCompletionSource]
              }),
              EditorView.lineWrapping,
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                  handleContentChange(update.state.doc.toString());
                }
                // 保存选择状态
                if (update.selectionSet) {
                  const { from, to } = update.state.selection.main;
                  setSelectedRange({ from, to });
                }
              })
            ]}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              highlightSelectionMatches: false
            }}
          />
        </div>

        {/* 右侧预览 */}
        <div className="w-1/2">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default HTMLAreaV2;
          
Now I'll create an example page to demonstrate the HTMLAreaV2 component under the codemirror directory.
        
            
toolName: write_to_file
            
status: success
          
            
filePath: ./code-starter-kit/next/exercise/src/app/example/codemirror/HTMLAreaV2/page.tsx
          
content: 'use client';

import React, { useState } from 'react';
import HTMLAreaV2 from '@/app/lib/components/HTMLAreaV2';

const HTMLAreaV2Example: React.FC = () => {
  const [content, setContent] = useState(`<p>Welcome to HTMLAreaV2 Demo!</p>
<p>This component features auto-height adjustment and improved toolbar behavior.</p>

<p>Math formula example: $E = mc^2$</p>

<p>Chemical formula with mhchem: $\\ce{H2O}$</p>

<p>Display math:</p>
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

<p>Chemical reaction:</p>
$$\\ce{2H2 + O2 -> 2H2O}$$

<img aria-label="Sample image" speaker="" data_voice_id="" src="https://placehold.co/300x200" alt="Sample" style="max-width: 100%; height: auto;"/>

<p>Try adding more content to see the auto-height feature in action!</p>
<p>Select text and use toolbar buttons to see the improved selection behavior.</p>`);

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
    console.log('Content changed:', e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTMLAreaV2 Component Demo</h1>
        <p className="text-gray-600 mb-4">
          This demo showcases the enhanced HTMLAreaV2 component with auto-height adjustment, 
          improved toolbar behavior, and better user experience.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">New Features in V2:</h3>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• <strong>Auto-height adjustment:</strong> Editor grows/shrinks based on content</li>
            <li>• <strong>Improved toolbar behavior:</strong> Maintains text selection after button clicks</li>
            <li>• <strong>Height indicator:</strong> Shows current editor height in toolbar</li>
            <li>• <strong>Better selection handling:</strong> Preserves cursor position and selection state</li>
            <li>• <strong>Configurable height limits:</strong> Set minimum and maximum heights</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Features:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Left panel: CodeMirror HTML editor with syntax highlighting</li>
            <li>• Right panel: Live HTML preview with MathJax rendering</li>
            <li>• Toolbar with quick insert buttons for common elements</li>
            <li>• Synchronized scrolling between editor and preview</li>
            <li>• Support for mathematical formulas using $ $ syntax</li>
            <li>• Support for chemical formulas using mhchem extension</li>
            <li>• Voice-enabled spans and images with aria-label attributes</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">How to Test Auto-Height:</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Add multiple lines of content to see the editor expand</li>
            <li>• Delete content to see the editor shrink (respecting minimum height)</li>
            <li>• The height indicator in the toolbar shows current dimensions</li>
            <li>• Both editor and preview panels adjust their height automatically</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-800 mb-2">How to Test Selection Behavior:</h3>
          <ul className="text-purple-700 text-sm space-y-1">
            <li>• Select some text in the editor</li>
            <li>• Click any toolbar button (P, 🔊, ∑, 🖼️)</li>
            <li>• Notice how the selection is preserved and the content is wrapped</li>
            <li>• Try with different types of content and toolbar buttons</li>
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Interactive Editor</h2>
        <HTMLAreaV2
          value={content}
          handleNoteChange={handleContentChange}
          minHeight="300px"
          maxHeight="600px"
          name="main-html-editor-v2"
        />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Current Content Stats:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><strong>Characters:</strong> {content.length}</p>
            <p><strong>Lines:</strong> {content.split('\n').length}</p>
          </div>
          <div>
            <p><strong>Words:</strong> {content.split(/\s+/).filter(word => word.length > 0).length}</p>
            <p><strong>Paragraphs:</strong> {(content.match(/<p>/g) || []).length}</p>
          </div>
        </div>
        
        <h3 className="font-semibold mt-4 mb-2">Sample Math & Chemistry Examples:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><code>$E = mc^2$</code> - Inline math</p>
          <p><code>{`$$\\int_0^1 x^2 dx$$`}</code> - Display math</p>
          <p><code>{`$\\ce{H2O}$`}</code> - Chemical formula</p>
          <p><code>{`$\\ce{2H2 + O2 -> 2H2O}$`}</code> - Chemical reaction</p>
        </div>

        <h3 className="font-semibold mt-4 mb-2">Test Content for Auto-Height:</h3>
        <div className="text-sm text-gray-600">
          <button 
            onClick={() => setContent(content + '\n<p>Additional paragraph to test auto-height expansion.</p>')}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 mb-2"
          >
            Add Content
          </button>
          <button 
            onClick={() => {
              const lines = content.split('\n');
              if (lines.length > 1) {
                setContent(lines.slice(0, -1).join('\n'));
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded mr-2 mb-2"
          >
            Remove Line
          </button>
          <button 
            onClick={() => setContent(`<p>Welcome to HTMLAreaV2 Demo!</p>
<p>This component features auto-height adjustment and improved toolbar behavior.</p>`)}
            className="bg-gray-500 text-white px-3 py-1 rounded mb-2"
          >
            Reset Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default HTMLAreaV2Example;
          
Now I'll create a layout file for the HTMLAreaV2 example page to ensure proper theming and styling.
        
            
toolName: write_to_file
            
status: success
          
            
filePath: ./code-starter-kit/next/exercise/src/app/example/codemirror/HTMLAreaV2/layout.js
          
content: import {ThemeProvider} from 'next-themes';

import '@/app/notebooks/css/page.css';

export const metadata = {
  title: 'HTMLAreaV2 Demo - Create Next App',
  description: 'HTMLAreaV2 component demo with auto-height and improved toolbar behavior',
};

export default function RootLayout({children}) {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
  );
}
          
Let me check if the development server is running and then open the preview to show the new HTMLAreaV2 component.
        
            
toolName: check_command_status
            
status: success
          
          
The development server is running successfully on port 3001. Now I'll open the preview to show the new HTMLAreaV2 component.
        
            
toolName: open_preview
            
status: running
          
Preview
          
I've successfully created the HTMLAreaV2 component with the requested enhancements and an example page to demonstrate its features.

## Files Created:

### HTMLAreaV2 Component
- **Location**: <mcfile name="HTMLAreaV2.tsx" path="./code-starter-kit/next/exercise/src/app/lib/components/HTMLAreaV2.tsx"></mcfile>
- **Key Features**:
  - **Auto-height adjustment**: Editor automatically grows/shrinks based on content with configurable min/max heights
  - **Improved toolbar behavior**: Maintains text selection state after toolbar button clicks
  - **Height indicator**: Shows current editor height in the toolbar
  - **Better selection handling**: Preserves cursor position and selection state when using toolbar buttons

### Example Page
- **Location**: <mcfile name="page.tsx" path="./code-starter-kit/next/exercise/src/app/example/codemirror/HTMLAreaV2/page.tsx"></mcfile>
- **Layout**: <mcfile name="layout.js" path="./code-starter-kit/next/exercise/src/app/example/codemirror/HTMLAreaV2/layout.js"></mcfile>

## Key Improvements in V2:

1. **Auto-Height Feature**: 
   - Component automatically calculates height based on content lines
   - Respects minimum and maximum height constraints
   - Both editor and preview panels adjust synchronously

2. **Enhanced Toolbar Behavior**:
   - Saves selection state before toolbar operations
   - Restores selection after content insertion
   - Maintains cursor position for better user experience
   - Improved wrapping logic for selected text

3. **Better User Experience**:
   - Height indicator in toolbar shows current dimensions
   - Test buttons in example page to demonstrate auto-height
   - Comprehensive documentation and usage examples

## Demo Features:
- Interactive buttons to add/remove content and test auto-height
- Detailed instructions for testing selection behavior
- Statistics showing content metrics (characters, lines, words, paragraphs)
- All original features from HTMLArea (MathJax, mhchem, scroll sync, etc.)

The component is now available at: http://localhost:3001/example/codemirror/HTMLAreaV2
        