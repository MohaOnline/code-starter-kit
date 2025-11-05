'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Link from "next/link";
import {useRouter, useSearchParams} from 'next/navigation';
import Script from "next/script";

import {css, Global} from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, InputLabel, InputAdornment,
  Link, ListItemText, ListSubheader, Menu, MenuItem, MenuList, IconButton, Stack, Select,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {
  Adb as AdbIcon, ArrowRight as ArrowRightIcon, 
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Clear as ClearIcon, 
  Menu as MenuIcon, NoteAdd as NoteAddIcon, NoteAddOutlined as NoteAddOutlinedIcon, 
  PlaylistAdd as PlaylistAddIcon, PlayCircleFilledTwoTone as PlayCircleFilledTwoToneIcon, PostAdd as PostAddIcon,
  StopTwoTone as StopTwoToneIcon, Sync as SyncIcon
} from '@mui/icons-material';
import {styled, lighten, darken} from '@mui/system';

// 3rd part libs:
// atlaskit/pragmatic-drag-and-drop
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

// CodeMirror
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"

/**
 * @see /pages/mui/7/utils/v01
 */
export default function Page() {
  return (
    <>
      <div>Temp</div>
    </>
  );
}