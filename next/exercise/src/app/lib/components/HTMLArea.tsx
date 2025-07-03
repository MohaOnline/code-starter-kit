'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { htmlCompletionSource } from '@codemirror/lang-html';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Button } from '@/components/ui/button';

interface HTMLAreaProps {
  value?: string;
  handleNoteChange?: (value: any) => void;
  height?: string;
  name?: string;
}

export const HTMLArea: React.FC<HTMLAreaProps> = ({ 
  value = '', 
  handleNoteChange, 
  height = '200px',
  name
}) => {
  const [htmlContent, setHtmlContent] = useState(value);
  const [scrollSync, setScrollSync] = useState(true);
  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);

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
      code: '<span aria-label="" speaker="" data_voice_id=""></span>'
    },
    {
      label: 'Math Formula',
      icon: '∑',
      code: '$$'
    },
    {
      label: 'Image with Voice',
      icon: '🖼️',
      code: '<img aria-label="" speaker="" data_voice_id="" src=""/>'
    }
  ];

  // 处理内容变化
  const handleContentChange = (val: string) => {
    setHtmlContent(val);
    const e = {
      target: {
        name: name,
        value: val,
      }
    };
      handleNoteChange?.(e);
  };

  // 插入代码到编辑器
  const insertCode = (code: string) => {
    if (editorRef.current) {
      const view = editorRef.current.view;
      if (view) {
        const { state } = view;
        const { selection } = state;
        const { from, to } = selection.main;
        const selectedText = state.doc.sliceString(from, to);
        
        let insertText = code;
        let cursorPos = from + code.length;
        
        if (selectedText) {
          // 有选中内容：将代码包裹选中内容
          if (code.includes('><')) {
            // 对于 HTML 标签，将选中内容放在标签内部
            const tagMatch = code.match(/^<([^>]+)>(.*)(<\/[^>]+>)$/);
            if (tagMatch) {
              insertText = `<${tagMatch[1]}>${selectedText}</${tagMatch[1].split(' ')[0]}>`;
              cursorPos = from + insertText.length;
            } else {
              // 其他情况，简单包裹
              insertText = code.replace(/></, `>${selectedText}<`);
              cursorPos = from + insertText.length;
            }
          } else if (code === '$$') {
            // 数学公式：将选中内容放在 $ $ 之间
            insertText = `$${selectedText}$`;
            cursorPos = from + insertText.length;
          } else {
            // 其他情况，在选中内容前后添加代码
            insertText = `${code}${selectedText}${code}`;
            cursorPos = from + insertText.length;
          }
        } else {
          // 没有选中内容：将光标定位到代码内部
          if (code.includes('><')) {
            // HTML 标签：光标定位到标签内部
            const closeTagIndex = code.indexOf('><');
            if (closeTagIndex > 0) {
              cursorPos = from + closeTagIndex + 1;
            }
          } else if (code === '$$') {
            // 数学公式：光标定位到两个 $ 之间
            cursorPos = from + 1;
          } else {
            // 其他情况：光标定位到代码末尾
            cursorPos = from + code.length;
          }
        }
        
        view.dispatch({
          changes: { from, to, insert: insertText },
          selection: { anchor: cursorPos }
        });
        view.focus();
      }
    }
  };

  // 滚动同步状态
  const [isScrolling, setIsScrolling] = useState(false);
  const cleanupRef = useRef(null);

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
    
    // setIsScrolling(true);
    const editor = editorRef.current.view;
    if (editor) {
      const editorScrollHeight = editor.scrollDOM.scrollHeight - editor.scrollDOM.clientHeight;
      editor.scrollDOM.scrollTop = editorScrollHeight * scrollPercent;
    }
    
    // setTimeout(() => setIsScrolling(false), 100);
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
  }, [scrollSync]);

  // 初始化值
  useEffect(() => {
    setHtmlContent(value);
  }, [value]);

  // 渲染预览内容
  const renderPreview = () => {
    return (
      <div 
        ref={previewRef}
        className="h-full overflow-auto p-4 bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-600"
        style={{ height }}
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
      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
      data-name={name}
    >
      {/* 工具栏 */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => insertCode(button.code)}
            title={button.label}
            className="h-8 px-2 text-xs"
          >
            <span className="mr-1">{button.icon}</span>
            {button.label}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-2">
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
            height={height}
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
