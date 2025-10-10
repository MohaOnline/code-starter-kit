'use client';

import React from 'react';

import {useTheme as useNextTheme} from 'next-themes';

import {css, Global} from '@emotion/react';
import {Autocomplete, Button, Checkbox, Chip, ListSubheader, Stack, TextField, useTheme} from '@mui/material';

// 3rd part libs: CodeMirror
import CodeMirror from '@uiw/react-codemirror';
import {color, colorView, colorTheme} from '@uiw/codemirror-extensions-color';
import {
  BidiSpan,
  BlockInfo,
  BlockType,
  Decoration,
  Direction,
  EditorView,
  GutterMarker,
  MatchDecorator,
  RectangleMarker,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
  closeHoverTooltips,
  crosshairCursor,
  drawSelection,
  dropCursor,
  getDialog,
  getDrawSelectionConfig,
  getPanel,
  getTooltip,
  gutter,
  gutterLineClass,
  gutterWidgetClass,
  gutters,
  hasHoverTooltips,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  highlightTrailingWhitespace,
  highlightWhitespace,
  hoverTooltip,
  keymap,
  layer,
  lineNumberMarkers,
  lineNumberWidgetMarker,
  lineNumbers,
  logException,
  panels,
  placeholder,
  rectangularSelection,
  repositionTooltips,
  runScopeHandlers,
  scrollPastEnd,
  showDialog,
  showPanel,
  showTooltip,
  tooltips
} from '@codemirror/view';
import {
  Annotation, AnnotationType,
  ChangeDesc,
  ChangeSet,
  CharCategory,
  Compartment,
  EditorSelection,
  EditorState,
  Facet,
  Line,
  MapMode,
  Prec,
  Range,
  RangeSet,
  RangeSetBuilder,
  RangeValue,
  SelectionRange,
  StateEffect,
  StateEffectType,
  StateField,
  Text,
  Transaction,
  codePointAt,
  codePointSize,
  combineConfig,
  countColumn,
  findClusterBreak,
  findColumn,
  fromCodePoint
} from '@codemirror/state';
import {basicSetup, minimalSetup} from "codemirror";
import {bracketMatching} from "@codemirror/language";
import {html} from "@codemirror/lang-html"
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';

import {getWeight, getWeights} from "@/lib/utils";

import './v01.css';


/**
 * @see /pages/codemirror/6/v01
 */
export default function HTMLField({content, onChange, cursorPosition}) {
  const [value, setValue] = React.useState(content);
  const editorRef = React.useRef(null);

  const handleUpdate = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
    onChange?.(val);
  }, [setValue, onChange]);

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
        selection: {anchor: pos, head: pos},
        scrollIntoView: true
      });

      // 聚焦编辑器
      view.focus();
    }
  }, [cursorPosition]);


  return (
    <>
      <Stack className={'sticky top-0 z-10'}>Toolbar</Stack>
      {/* [javascript({jsx: true})] */}
      <CodeMirror ref={editorRef}
                  value={value}
                  extensions={[
                    minimalSetup,
                    color,
                    EditorView.lineWrapping,
                    html({
                      matchClosingTags: false,       // 无效
                    }),
                  ]}
                  basicSetup={{
                    highlightSelectionMatches: true, // 高亮与选择相同内容
                  }}
                  theme={oneDark}
                  onChange={handleUpdate}
      />
    </>
  );

}