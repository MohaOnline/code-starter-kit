'use client';

import React from 'react';

import {useTheme as useNextTheme} from 'next-themes';

import {css, Global} from '@emotion/react';
import {Autocomplete, Button, Checkbox, Chip, ListSubheader, Stack, TextField, useTheme} from '@mui/material';

import {getWeight, getWeights} from "@/lib/utils";
import HTMLField from "@/app/lib/components/HTMLField/v01";


/**
 * @see /pages/codemirror/6/v01
 */
export default function Page() {
  const [value, setValue] = React.useState(`
<div><span aria-label="—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过“看山是山”罢了。" data-speaker="" data-voice-id="22ae9f42-aeb5-40bf-aa92-a59d384c54ff">—— 我们往往自信站得足够近，占尽了先天的优势，但其实也不过“看山是山”罢了。</span></div>
`);

  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, [setValue]);

  return (
    <>
      <HTMLField content={value} onChange={onChange}/>
    </>
  );

}