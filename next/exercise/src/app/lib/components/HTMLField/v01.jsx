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
  Annotation,
  AnnotationType,
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


/**
 * @see /pages/codemirror/6/v01
 */
export default function HTMLField({content, onChange}) {
  const [value, setValue] = React.useState(content);

  const handleUpdate = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
    onChange(val);
  }, [setValue, onChange]);

  return (
    <>
      {/* [javascript({jsx: true})] */}
      <CodeMirror value={value}
                  extensions={[
                    basicSetup,
                    color,
                    EditorView.lineWrapping,
                    html(),
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