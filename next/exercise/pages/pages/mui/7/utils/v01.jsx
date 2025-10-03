'use client';

import React, {useState, useEffect} from 'react';
import Script from "next/script";

import {css, Global} from '@emotion/react';
import {
  autocompleteClasses, Autocomplete, Box, Button, Checkbox, Chip,
  ListSubheader, Stack, Tabs, Tab, TextField, Typography, useTheme
} from '@mui/material';

// 3rd part libs: CodeMirror
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"
import {Tailwind3V02Basic} from "@/pages/tailwind/3/v02.basic";
import {BoxModel} from "@/pages/tailwind/3/v02.box";
import {Mui7Basic} from "@/pages/mui/7/utils/v01.basic";
import {Mui7Navi} from "@/pages/mui/7/nav/v01";

/**
 * @see /_t
 */
export default function Page() {
  // 记录哪个 tab 被选中。
  const [tabSelected, setTabSelected] = useState('basic');

  return (
    <>
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>
      <Mui7Navi/>

      <h1>MUI 7 Utils</h1>
      <Box sx={{display: 'flex', width: '100%', minHeight: 400, bgcolor: 'background.paper', border: 1, borderColor: 'divider'}}>
        <Tabs orientation="vertical"
              variant="scrollable"
              onChange={(event, newValue) => {
                setTabSelected(newValue);
              }}
              value={tabSelected}
              aria-label="Vertical tabs example"
              sx={{
                width: 160, flexShrink: 0,
                borderRight: 1, borderColor: 'divider',
              }}
        >
          <Tab label="Basic" value={'basic'} id={`vertical-tab-basic`} aria-controls={`vertical-tabpanel-basic`}/>
          <Tab label="Spacing" value={'spacing'} id={`vertical-tab-spacing`} aria-controls={`vertical-tabpanel-spacing`}/>
          <Tab label="Layout" value={'layout'} id={`vertical-tab-2`} aria-controls={`vertical-tabpanel-2`}/>
          <Tab label="Item One" value={3} id={`vertical-tab-3`} aria-controls={`vertical-tabpanel-3`}/>
        </Tabs>

        <Box hidden={tabSelected !== 'basic'} sx={{
          flex: 1, /* 使 Flex 项尽可能占用父容器的剩余空间，同时允许在空间不足时收缩，初始尺寸为 0（但会根据内容调整）。 */
          px: 2,
        }}
        ><Mui7Basic/></Box>

        <Box hidden={tabSelected !== 'spacing'} sx={{
          flex: 1, /* 使 Flex 项尽可能占用父容器的剩余空间，同时允许在空间不足时收缩，初始尺寸为 0（但会根据内容调整）。 */
          px: 2,
        }}
        >
          <BoxModel/>
        </Box>

        <Box hidden={tabSelected !== 'layout'} sx={{
          flex: 1, /* 使 Flex 项尽可能占用父容器的剩余空间，同时允许在空间不足时收缩，初始尺寸为 0（但会根据内容调整）。 */
          px: 2,
        }}
        >
        </Box>
      </Box>
    </>
  );
}