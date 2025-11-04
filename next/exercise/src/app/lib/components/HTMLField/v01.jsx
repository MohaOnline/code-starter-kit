'use client';

import React from 'react';

import { useTheme as useNextTheme } from 'next-themes';

import { css, Global } from '@emotion/react';
import { Autocomplete, Button, Checkbox, Chip, ListSubheader, Stack, TextField, useTheme } from '@mui/material';

// 3rd part libs: CodeMirror
import CodeMirror from '@uiw/react-codemirror';
import { color, colorView, colorTheme } from '@uiw/codemirror-extensions-color';
import {
  BidiSpan, BlockInfo, BlockType, Decoration, Direction, EditorView, GutterMarker, MatchDecorator,
  RectangleMarker, ViewPlugin, ViewUpdate, WidgetType,
  closeHoverTooltips, crosshairCursor, drawSelection, dropCursor,
  getDialog, getDrawSelectionConfig, getPanel, getTooltip, gutter, gutterLineClass, gutterWidgetClass, gutters,
  hasHoverTooltips, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, highlightTrailingWhitespace, highlightWhitespace, hoverTooltip,
  keymap, layer, lineNumberMarkers, lineNumberWidgetMarker, lineNumbers, logException,
  panels, placeholder, rectangularSelection, repositionTooltips, runScopeHandlers,
  scrollPastEnd, showDialog, showPanel, showTooltip, tooltips
} from '@codemirror/view';
import {
  Annotation, AnnotationType, ChangeDesc, ChangeSet, CharCategory, Compartment,
  EditorSelection, EditorState, Facet, Line, MapMode,
  Prec, Range, RangeSet, RangeSetBuilder, RangeValue,
  SelectionRange, StateEffect, StateEffectType, StateField, Text, Transaction,
  codePointAt, codePointSize, combineConfig, countColumn, findClusterBreak, findColumn, fromCodePoint
} from '@codemirror/state';
import { basicSetup, minimalSetup } from "codemirror";
import { bracketMatching } from "@codemirror/language";
import { html } from "@codemirror/lang-html"
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

import {v4 as genUUID} from 'uuid';

import { getWeight, getWeights } from "@/lib/utils";

import './v01.css';


/**
 * @see /pages/codemirror/6/v01
 */
export default function HTMLField({ content, onChange, cursorPosition }) {
  const [value, setValue] = React.useState(content);
  const editorRef = React.useRef(null);

  const handleCodeMirrorChange = React.useCallback((val) => {
    // console.log('val:', val);
    setValue(val);
    onChange?.(val);
  }, [setValue, onChange]);

  // （工具条辅助）插入HTML标签的函数
  const insertHtmlTag = React.useCallback((tagName) => {
    if (!editorRef.current?.view) return;

    const view = editorRef.current.view;
    const state = view.state;
    const selection = state.selection.main;

    let openTag, closeTag;

    if (tagName === 'span_voice') {
      openTag = `<span data-voice-id="${genUUID()}">`;
      closeTag = '</span>';
    }
    else if (tagName === 'code_block') {
      openTag = '<pre><code class="language-">';
      closeTag = '</code></pre>';
    }
    else if (tagName === 'uuid') {
      openTag = `${genUUID()}`;
      closeTag = '';
    }
    else {
      openTag = `<${tagName}>`;
      closeTag = `</${tagName}>`;
    }

    if (selection.empty) {
      // 没有选中内容，在光标位置插入标签，光标定位在标签中间
      const insertText = openTag + closeTag;
      const cursorPos = selection.from + openTag.length;

      view.dispatch({
        changes: {
          from: selection.from,
          to: selection.to,
          insert: insertText
        },
        selection: {
          anchor: cursorPos,
          head: cursorPos
        }
      });
    }
    else {
      // 有选中内容，在选中内容前后添加标签，保持新内容被选中
      const selectedText = state.doc.sliceString(selection.from, selection.to);
      const insertText = openTag + selectedText + closeTag;

      view.dispatch({
        changes: {
          from: selection.from,
          to: selection.to,
          insert: insertText
        },
        selection: {
          anchor: selection.from,
          head: selection.from + insertText.length
        }
      });
    }

    view.focus();
  }, []);

  // 处理光标位置设置
  React.useEffect(() => {
    if (cursorPosition !== undefined && editorRef.current && editorRef.current.view) {
      const view = editorRef.current.view;
      const doc = view.state.doc;

      // 确保位置在有效范围内
      const pos = Math.min(Math.max(0, cursorPosition), doc.length);
      console.log('pos:', pos);
      // 设置光标位置
      view.dispatch({
        selection: { anchor: pos, head: pos },
        scrollIntoView: true
      });

      // 聚焦编辑器
      view.focus();
    }
  }, [cursorPosition]);


  return (
    <>
      <Stack direction="row" spacing={1} className={'sticky toolbar top-0 z-10 dark:bg-black bg-white p-2 border'}>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('h2')}>h2</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('ol')}>ol</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('ul')}>ul</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('li')}>li</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('del')}>del</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('p')}>P</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('span_voice')}>span voice</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('code')}>Code</Button>
        <Button variant="outlined" size="small" onClick={() => insertHtmlTag('code_block')}>Codes</Button>
      </Stack>

      {/* [javascript({jsx: true})] */}
      <CodeMirror ref={editorRef} value={value}
                  extensions={[
                    minimalSetup,
                    color,
                    EditorView.lineWrapping,
                    html({
                      matchClosingTags: false,       // 无效
                    }),
                    // 自定义当前行高亮背景色和光标颜色
                    EditorView.theme({
                      '&': {
                        color: '#78d278 !important',
                        backgroundColor: '#000 !important',
                      },
                      '.cm-activeLine': {
                        backgroundColor: '#ffff0025 !important', // 自定义背景色
                      },
                      '.cm-activeLineGutter': {
                        backgroundColor: '#ffff0025 !important', // 行号区域背景色
                      },
                      '.cm-cursor, .cm-dropCursor': {
                        borderLeftColor: '#ff6b6b !important', // 光标颜色 - 红色
                      },
                      '.cm-cursor-primary': {
                        borderLeftColor: '#43cdffff !important', // 主光标颜色 - 青色
                      },
                      '.cm-cursor-secondary': {
                        borderLeftColor: '#ffe66d !important', // 次光标颜色 - 黄色
                      },
                      '.cm-editor': {
                        fontFamily: 'Monaco, "Cascadia Code", "Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
                        fontSize: '14px',
                      },
                      '.cm-content': {
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                      }
                    })
                  ]}
                  basicSetup={{
                    highlightSelectionMatches: true, // 高亮与选择相同内容
                  }}
                  theme={oneDark}
                  onChange={handleCodeMirrorChange}
      />
    </>
  );

}