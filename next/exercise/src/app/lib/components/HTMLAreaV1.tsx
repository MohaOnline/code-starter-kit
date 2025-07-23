'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Button } from '@/components/ui/button';

interface HTMLAreaV1Props {
  value?: string;
  handleNoteChange?: (value: any) => void;
  minHeight?: string;
  maxHeight?: string;
  name?: string;
}

export const HTMLAreaV1: React.FC<HTMLAreaV1Props> = ({
  value = '',
  handleNoteChange,
  minHeight = '200px',
  maxHeight = '800px',
  name
}) => {
  const [htmlContent, setHtmlContent] = useState(value);
  const [editorHeight, setEditorHeight] = useState(minHeight);
  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const mathJaxConfig = {
    tex: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']]
    }
  };

  const toolbarButtons = [
    {
      label: 'Paragraph',
      icon: 'P',
      code: '<p></p>',
      type: 'wrap'
    },
    {
      label: 'Bold',
      icon: 'B',
      code: '<b></b>',
      type: 'wrap'
    },
    {
      label: 'Unordered List',
      icon: 'UL',
      code: '<ul>\n  <li></li>\n</ul>',
      type: 'insert'
    },
    {
      label: 'Table',
      icon: 'T',
      code: '<table>\n  <tr>\n    <td></td>\n  </tr>\n</table>',
      type: 'insert'
    },
    {
      label: 'Image',
      icon: '🖼️',
      code: '<img src="" alt="" />',
      type: 'insert'
    },
    {
      label: 'Math Formula',
      icon: '∑',
      code: '$$',
      type: 'insert'
    }
  ];

  const calculateAndSetHeight = useCallback(() => {
    if (editorRef.current) {
      const view = editorRef.current.view;
      if (view) {
        const contentHeight = view.contentHeight;
        const newHeight = Math.max(parseInt(minHeight), Math.min(contentHeight, parseInt(maxHeight)));
        setEditorHeight(`${newHeight}px`);
      }
    }
  }, [minHeight, maxHeight]);

  useEffect(() => {
    calculateAndSetHeight();
  }, [htmlContent, calculateAndSetHeight]);

  const handleCmChange = (val: string) => {
    setHtmlContent(val);
    if (handleNoteChange) {
      handleNoteChange({ target: { name, value: val } });
    }
  };

  const insertCode = (code: string, type: 'wrap' | 'insert' = 'insert') => {
    if (!editorRef.current) return;

    const view = editorRef.current.view;
    const { state } = view;
    const { from, to } = state.selection.main;
    const selectedText = state.doc.sliceString(from, to);

    if (type === 'wrap') {
      const openTag = code.slice(0, code.indexOf('>') + 1);
      const closeTag = code.slice(code.indexOf('>') + 1);

      if (selectedText) {
        // 如果有选中文本，则用标签包裹
        const newText = `${openTag}${selectedText}${closeTag}`;
        view.dispatch({
          changes: { from, to, insert: newText },
          selection: { anchor: from + newText.length }
        });
      } else {
        // 如果没有选中文本，则插入标签并将光标置于中间
        view.dispatch({
          changes: { from, to, insert: code },
          selection: { anchor: from + openTag.length }
        });
      }
    } else {
      // 默认的插入行为
      view.dispatch({
        changes: { from, to, insert: code },
        selection: { anchor: from + code.length }
      });
    }
    view.focus();
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => insertCode(button.code, button.type as any)}
            title={button.label}
          >
            {button.icon}
          </Button>
        ))}
      </div>
      <div className="flex">
        <div className="w-1/2">
          <CodeMirror
            ref={editorRef}
            value={htmlContent}
            height={editorHeight}
            theme={oneDark}
            extensions={[
              html(),
              EditorView.lineWrapping,
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                  handleCmChange(update.state.doc.toString());
                }
                if (update.geometryChanged) {
                  calculateAndSetHeight();
                }
              })
            ]}
            onChange={handleCmChange}
          />
        </div>
        <div 
          ref={previewRef}
          className="w-1/2 p-4 bg-white dark:bg-gray-900 overflow-auto"
          style={{ height: editorHeight }}
        >
          <MathJaxContext config={mathJaxConfig}>
            <MathJax>
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose dark:prose-invert max-w-none" />
            </MathJax>
          </MathJaxContext>
        </div>
      </div>
    </div>
  );
};

export default HTMLAreaV1;