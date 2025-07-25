'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { autocompletion } from '@codemirror/autocomplete';
import { htmlCompletionSource } from '@codemirror/lang-html';
import { bracketMatching } from '@codemirror/language';
import { standardKeymap } from '@codemirror/commands';
import { Decoration, DecorationSet, ViewPlugin, ViewUpdate, WidgetType } from '@codemirror/view';
import { StateField, StateEffect, Range } from '@codemirror/state';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Button } from '@/components/ui/button';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 引入highlight.js样式

// HTMLAreaV3组件属性接口
interface HTMLAreaV3Props {
  value?: string;
  handleNoteChange?: (value: any) => void;
  minHeight?: string;
  maxHeight?: string;
  name?: string;
}

/**
 * HTMLAreaV3 - 增强版HTML编辑器组件
 * 基于HTMLAreaV2，新增功能：
 * 1. 代码块插入按钮 - 插入<pre><code class="language hljs"></code></pre>
 * 2. Highlight.js代码高亮预览支持
 * 3. 默认关闭预览区
 */
export const HTMLAreaV3: React.FC<HTMLAreaV3Props> = ({
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
  const [showLabels, setShowLabels] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // 默认关闭预览区
  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // MathJax 配置 - 数学公式渲染配置
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

  // 工具栏按钮配置 - 新增代码块按钮
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
    },
    {
      label: 'Code Block', // 新增代码块按钮
      icon: '</>', 
      code: '<pre><code class="language hljs"></code></pre>'
    }
  ];

  // 精确计算自动高度 - 根据内容动态调整编辑器高度
  const calculateAutoHeight = useCallback((content: string) => {
    if (!editorRef.current || !containerRef.current) {
      // 如果编辑器还未初始化，使用简单估算
      const lines = content.split('\n').length;
      const lineHeight = 20;
      const padding = 40;
      const calculatedHeight = Math.max(
        parseInt(minHeight),
        Math.min(lines * lineHeight + padding, parseInt(maxHeight))
      );
      return `${calculatedHeight}px`;
    }

    try {
      const view = editorRef.current.view;
      if (!view) {
        return editorHeight; // 返回当前高度
      }

      // 获取编辑器的实际内容高度
      const contentHeight = view.contentHeight;
      const scrollDOM = view.scrollDOM;
      
      // 获取编辑器的样式信息
      const computedStyle = window.getComputedStyle(scrollDOM);
      const paddingTop = parseInt(computedStyle.paddingTop) || 0;
      const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
      const borderTop = parseInt(computedStyle.borderTopWidth) || 0;
      const borderBottom = parseInt(computedStyle.borderBottomWidth) || 0;
      
      // 计算总的内容高度（包括padding和border）
      const totalContentHeight = contentHeight + paddingTop + paddingBottom + borderTop + borderBottom;
      
      // 获取当前编辑器高度
      const currentHeight = parseInt(editorHeight);
      
      // 设置缓冲区，防止频繁调整高度导致抖动
      const bufferZone = 30; // 缓冲区大小
      const expandThreshold = 20; // 扩展阈值
      const shrinkThreshold = 50; // 收缩阈值
      
      let newHeight = currentHeight;
      
      // 检查是否需要扩展高度
      if (totalContentHeight + expandThreshold > currentHeight) {
        newHeight = totalContentHeight + bufferZone;
      }
      // 检查是否需要收缩高度
      else if (totalContentHeight + shrinkThreshold < currentHeight) {
        newHeight = Math.max(totalContentHeight + bufferZone, parseInt(minHeight));
      }
      
      // 确保高度在最小值和最大值之间
      newHeight = Math.max(parseInt(minHeight), Math.min(newHeight, parseInt(maxHeight)));
      
      return `${newHeight}px`;
    } catch (error) {
      console.warn('计算自动高度时出错:', error);
      return editorHeight; // 出错时返回当前高度
    }
  }, [minHeight, maxHeight, editorHeight]);

  // 防抖定时器引用
  const heightUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // 处理内容变化 - 内容更新时触发
  const handleContentChange = (val: string) => {
    setHtmlContent(val);
    
    // 清除之前的定时器
    if (heightUpdateTimerRef.current) {
      clearTimeout(heightUpdateTimerRef.current);
    }
    
    // 使用防抖机制延迟更新高度，避免频繁计算
    heightUpdateTimerRef.current = setTimeout(() => {
      const newHeight = calculateAutoHeight(val);
      if (newHeight !== editorHeight) {
        setEditorHeight(newHeight);
      }
    }, 150); // 150ms 防抖延迟
    
    const e = {
      target: {
        name: name,
        value: val,
      }
    };
    handleNoteChange?.(e);
  };
  
  // HTML标签匹配装饰器 - 用于高亮匹配的HTML标签
  const matchingTagEffect = StateEffect.define<{from: number, to: number}[]>();
  
  const matchingTagField = StateField.define<DecorationSet>({
    create() {
      return Decoration.none;
    },
    update(decorations, tr) {
      decorations = decorations.map(tr.changes);
      for (let effect of tr.effects) {
        if (effect.is(matchingTagEffect)) {
          decorations = Decoration.none;
          for (let range of effect.value) {
            decorations = decorations.update({
              add: [Decoration.mark({
                class: "cm-matching-tag"
              }).range(range.from, range.to)]
            });
          }
        }
      }
      return decorations;
    },
    provide: f => EditorView.decorations.from(f)
  });
  
  // 查找匹配标签的函数 - 查找HTML标签的开始和结束标签
  const findMatchingTags = useCallback((view: EditorView, pos: number) => {
    const state = view.state;
    const doc = state.doc;
    
    // 简单的HTML标签匹配逻辑
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    let match;
    const tags: Array<{name: string, from: number, to: number, isClosing: boolean}> = [];
    
    // 查找所有标签
    while ((match = tagRegex.exec(doc.toString())) !== null) {
      const isClosing = match[0].startsWith('</');
      const tagName = match[1].toLowerCase();
      tags.push({
        name: tagName,
        from: match.index,
        to: match.index + match[0].length,
        isClosing
      });
    }
    
    // 查找当前光标位置的标签
    let currentTag = null;
    for (const tag of tags) {
      if (pos >= tag.from && pos <= tag.to) {
        currentTag = tag;
        break;
      }
    }
    
    if (!currentTag) return [];
    
    // 查找匹配的标签
    let matchingTag = null;
    if (currentTag.isClosing) {
      // 查找对应的开始标签
      let depth = 1;
      for (let i = tags.indexOf(currentTag) - 1; i >= 0; i--) {
        const tag = tags[i];
        if (tag.name === currentTag.name) {
          if (tag.isClosing) {
            depth++;
          } else {
            depth--;
            if (depth === 0) {
              matchingTag = tag;
              break;
            }
          }
        }
      }
    } else {
      // 查找对应的结束标签
      let depth = 1;
      for (let i = tags.indexOf(currentTag) + 1; i < tags.length; i++) {
        const tag = tags[i];
        if (tag.name === currentTag.name) {
          if (tag.isClosing) {
            depth--;
            if (depth === 0) {
              matchingTag = tag;
              break;
            }
          } else {
            depth++;
          }
        }
      }
    }
    
    return matchingTag ? [currentTag, matchingTag] : [currentTag];
  }, []);
  
  // 标签匹配插件 - CodeMirror插件，用于实时高亮匹配的HTML标签
  const tagMatchingPlugin = ViewPlugin.fromClass(class {
    updateTimer: number | null = null;
    
    constructor(view: EditorView) {
      // 延迟初始化，避免在构造函数中直接更新
      setTimeout(() => this.scheduleUpdate(view), 0);
    }
    
    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet) {
        this.scheduleUpdate(update.view);
      }
    }
    
    scheduleUpdate(view: EditorView) {
      // 清除之前的定时器
      if (this.updateTimer !== null) {
        clearTimeout(this.updateTimer);
      }
      
      // 异步更新，避免在更新过程中触发新的更新
      this.updateTimer = window.setTimeout(() => {
        this.updateMatching(view);
        this.updateTimer = null;
      }, 0);
    }
    
    updateMatching(view: EditorView) {
      try {
        // 检查视图状态是否有效
        if (!view.state) {
          return;
        }
        
        const pos = view.state.selection.main.head;
        const matchingTags = findMatchingTags(view, pos);
        
        view.dispatch({
          effects: matchingTagEffect.of(matchingTags.map(tag => ({
            from: tag.from,
            to: tag.to
          })))
        });
      } catch (error) {
        console.warn('标签匹配更新时出错:', error);
      }
    }
    
    destroy() {
      if (this.updateTimer !== null) {
        clearTimeout(this.updateTimer);
        this.updateTimer = null;
      }
    }
  });

  // HTML标签跳转命令 - 快捷键Ctrl+J/Cmd+J跳转到匹配的标签
  const toMatchingTag = useCallback((view: EditorView): boolean => {
    const state = view.state;
    const selection = state.selection.main;
    const doc = state.doc;
    const pos = selection.head;
    
    // 获取当前位置的文本
    const line = doc.lineAt(pos);
    const lineText = line.text;
    const linePos = pos - line.from;
    
    // 简单的HTML标签匹配逻辑
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
    let match;
    const tags: Array<{name: string, pos: number, isClosing: boolean, fullMatch: string}> = [];
    
    // 查找所有标签
    while ((match = tagRegex.exec(doc.toString())) !== null) {
      const isClosing = match[0].startsWith('</');
      const tagName = match[1].toLowerCase();
      tags.push({
        name: tagName,
        pos: match.index,
        isClosing,
        fullMatch: match[0]
      });
    }
    
    // 查找当前光标位置的标签
    let currentTag = null;
    for (const tag of tags) {
      if (pos >= tag.pos && pos <= tag.pos + tag.fullMatch.length) {
        currentTag = tag;
        break;
      }
    }
    
    if (!currentTag) return false;
    
    // 查找匹配的标签
    let matchingTag = null;
    if (currentTag.isClosing) {
      // 查找对应的开始标签
      let depth = 1;
      for (let i = tags.indexOf(currentTag) - 1; i >= 0; i--) {
        const tag = tags[i];
        if (tag.name === currentTag.name) {
          if (tag.isClosing) {
            depth++;
          } else {
            depth--;
            if (depth === 0) {
              matchingTag = tag;
              break;
            }
          }
        }
      }
    } else {
      // 查找对应的结束标签
      let depth = 1;
      for (let i = tags.indexOf(currentTag) + 1; i < tags.length; i++) {
        const tag = tags[i];
        if (tag.name === currentTag.name) {
          if (tag.isClosing) {
            depth--;
            if (depth === 0) {
              matchingTag = tag;
              break;
            }
          } else {
            depth++;
          }
        }
      }
    }
    
    if (matchingTag) {
      // 跳转到匹配的标签
      view.dispatch({
        selection: { anchor: matchingTag.pos, head: matchingTag.pos }
      });
      return true;
    }
    
    return false;
  }, []);

  // 检查滚动条并调整高度 - 自动调整编辑器高度以避免滚动条
  const checkScrollbarAndAdjustHeight = useCallback(() => {
    if (!editorRef.current) return;
    
    try {
      const view = editorRef.current.view;
      if (!view) return;
      
      const scrollDOM = view.scrollDOM;
      const hasVerticalScrollbar = scrollDOM.scrollHeight > scrollDOM.clientHeight;
      
      if (hasVerticalScrollbar) {
        // 如果出现了滚动条，计算需要的高度
        const contentHeight = view.contentHeight;
        const computedStyle = window.getComputedStyle(scrollDOM);
        const paddingTop = parseInt(computedStyle.paddingTop) || 0;
        const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
        const borderTop = parseInt(computedStyle.borderTopWidth) || 0;
        const borderBottom = parseInt(computedStyle.borderBottomWidth) || 0;
        
        const totalNeededHeight = contentHeight + paddingTop + paddingBottom + borderTop + borderBottom + 20; // 额外20px缓冲
        const maxHeightValue = parseInt(maxHeight);
        
        // 只有在不超过最大高度的情况下才调整
        if (totalNeededHeight <= maxHeightValue) {
          const newHeight = `${totalNeededHeight}px`;
          if (newHeight !== editorHeight) {
            setEditorHeight(newHeight);
          }
        }
      }
    } catch (error) {
      console.warn('检查滚动条状态时出错:', error);
    }
  }, [editorHeight, maxHeight]);
  
  // 清理定时器
  useEffect(() => {
    return () => {
      if (heightUpdateTimerRef.current) {
        clearTimeout(heightUpdateTimerRef.current);
      }
    };
  }, []);

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
          } else if (code.includes('<pre><code')) {
            // 代码块：将选中内容放在code标签内部
            insertText = code.replace('></code>', `>${selectedText}</code>`);
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
          } else if (code.includes('<pre><code')) {
            // 代码块：光标定位到code标签内部
            const codeTagIndex = code.indexOf('>');
            if (codeTagIndex > 0) {
              newFrom = newTo = from + codeTagIndex + 1;
            }
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

  // Highlight.js 代码高亮处理函数
  const highlightCodeBlocks = useCallback((element: HTMLElement) => {
    const codeBlocks = element.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      // 如果已经高亮过，跳过
      if (block.getAttribute('data-highlighted') === 'yes') {
        return;
      }
      
      // 应用highlight.js高亮
      hljs.highlightElement(block as HTMLElement);
    });
  }, []);

  // 渲染预览内容 - 支持MathJax数学公式和Highlight.js代码高亮
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
              ref={(el) => {
                if (el) {
                  // 延迟执行代码高亮，确保DOM已渲染
                  setTimeout(() => {
                    highlightCodeBlocks(el);
                  }, 100);
                }
              }}
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
            <span className={showLabels ? "mr-1" : ""}>{button.icon}</span>
            {showLabels && button.label}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Height: {editorHeight}
          </span>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="w-4 h-4"
            />
            Labels
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={showPreview}
              onChange={(e) => setShowPreview(e.target.checked)}
              className="w-4 h-4"
            />
            Preview
          </label>
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
        <div className={showPreview ? "w-1/2" : "w-full"}>
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
              bracketMatching(),
               matchingTagField,
               tagMatchingPlugin,
               keymap.of([
                 ...standardKeymap,
                 {
                   key: "Ctrl-j",
                   run: toMatchingTag
                 },
                 {
                   key: "Cmd-j",
                   run: toMatchingTag
                 }
               ]),
               EditorView.theme({
                 ".cm-matching-tag": {
                   backgroundColor: "rgba(255, 255, 0, 0.2)",
                   border: "1px solid rgba(255, 255, 0, 0.6)",
                   borderRadius: "2px"
                 }
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
                // 监听视图变化，检查是否需要调整高度
                if (update.viewportChanged || update.geometryChanged) {
                  // 延迟检查滚动条状态
                  setTimeout(() => {
                    checkScrollbarAndAdjustHeight();
                  }, 50);
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
        {showPreview && (
          <div className="w-1/2">
            {renderPreview()}
          </div>
        )}
      </div>
    </div>
  );
};

export default HTMLAreaV3;