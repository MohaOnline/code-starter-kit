'use client';

import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Link from "next/link";
import {useRouter, useSearchParams} from 'next/navigation';
import Script from "next/script";

import {css, Global} from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, IconButton, InputLabel, InputAdornment,
  Link as MuiLink, ListItemText, ListSubheader, Menu, MenuItem, MenuList,
  Paper, Popper,
  Stack, Select, Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {
  Adb as AdbIcon, Add as AddIcon, ArrowRight as ArrowRightIcon,
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Clear as ClearIcon,
  Edit as EditIcon, EditNote as EditNoteIcon, FastForward as FastForwardIcon, FastRewind as FastRewindIcon,
  Filter1 as Filter1Icon, Filter2 as Filter2Icon, Filter3 as Filter3Icon, Filter4 as Filter4Icon, Filter5 as Filter5Icon, FilterNone as FilterNoneIcon,
  Filter1TwoTone as Filter1TwoToneIcon, Filter2TwoTone as Filter2TwoToneIcon, Filter3TwoTone as Filter3TwoToneIcon, Filter4TwoTone as Filter4TwoToneIcon,
  Filter5TwoTone as Filter5TwoToneIcon, FilterNoneTwoTone as FilterNoneTwoToneIcon,
  FormatBold as FormatBoldIcon, Info as InfoIcon,
  Menu as MenuIcon, NoteAdd as NoteAddIcon, NoteAddOutlined as NoteAddOutlinedIcon,
  Pause as PauseIcon, PlayArrow as PlayArrowIcon, PlaylistAdd as PlaylistAddIcon, PlayCircleFilledTwoTone as PlayCircleFilledTwoToneIcon,
  PostAdd as PostAddIcon, Search as SearchIcon,
  Settings as SettingsIcon, SettingsApplications as SettingsApplicationsIcon, SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon,
  Stop as StopIcon, StopTwoTone as StopTwoToneIcon, Sync as SyncIcon, Tune as TuneIcon
} from '@mui/icons-material';
import {styled, lighten, darken} from '@mui/system';

// 3rd part libs:
// @atlaskit/pragmatic-drag-and-drop
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

// CodeMirror
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"

// Own libraries
import {useStatus} from "@/app/lib/atoms";

/**
 * @see /pages/react/19/v01
 */
export default function Page() {

  const updateMediaSession = () => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: '歌曲标题', // 必需
      artist: '艺术家名称', // 必需
      album: '专辑名称',
      // artwork: [
      //   {src: 'icon-96x96.png', sizes: '96x96', type: 'image/png'},
      //   {src: 'icon-128x128.png', sizes: '128x128', type: 'image/png'},
      //   {src: 'icon-192x192.png', sizes: '192x192', type: 'image/png'},
      //   {src: 'icon-256x256.png', sizes: '256x256', type: 'image/png'},
      //   {src: 'icon-384x384.png', sizes: '384x384', type: 'image/png'},
      //   {src: 'icon-512x512.png', sizes: '512x512', type: 'image/png'},
      // ]
    });
    navigator.mediaSession.playbackState = 'paused';
  }

  if ('mediaSession' in navigator) {
    // 浏览器支持，继续初始化
    console.log('MediaSession API 可用');
    updateMediaSession();
  }
  else {
    console.log('MediaSession API 不可用');
    // 可以考虑降级处理或提示用户
  }

  useEffect(() => {
    updateMediaSession();
  })

  return (
    <>
      <div>Temp</div>
    </>
  );
}