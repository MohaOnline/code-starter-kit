'use client';

import React from 'react';

import {useTheme as useNextTheme} from 'next-themes';

import {css, Global} from '@emotion/react';
import {Autocomplete, Button, Checkbox, Chip, ListSubheader, Stack, TextField, useTheme} from '@mui/material';

// 3rd part libs: CodeMirror
import CodeMirror from '@uiw/react-codemirror';
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';

import {getWeight, getWeights} from "@/lib/utils";


/**
 * @see /_t
 */
export default function Page() {
  const [value, setValue] = React.useState(`
  <div><span aria-label="—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过“看山是山”罢了。" data-speaker="" data-voice-id="22ae9f42-aeb5-40bf-aa92-a59d384c54ff">—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过“看山是山”罢了。</span></div>
  `);

  console.log('useTheme:', getWeights('0|k000xy:2', '0|k000xy:4', 10));

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, [setValue]);

  return (
    <>
      {/*[javascript({jsx: true})]*/}
      <CodeMirror value={value}
                  extensions={[
                    html(),
                    EditorView.lineWrapping,
                  ]}
                  onChange={onChange}
                  minHeight={`300px`}
                  theme={oneDark}
      />
    </>
  );

}