'use client';

import React, {createContext, forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal} from 'react-dom';

import dynamic from 'next/dynamic';
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
// @tanstack
import {useVirtualizer} from '@tanstack/react-virtual';
import {useMergeRefs} from '@floating-ui/react';

// @atlaskit/pragmatic-drag-and-drop
import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {monitorForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import {autoScrollForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {preventUnhandled} from "@atlaskit/pragmatic-drag-and-drop/prevent-unhandled";
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {DropIndicator} from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

// CodeMirror
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"

///////// Own libraries //////////////
import {useStatus} from "@/app/lib/atoms";

// Comment Template//
// ①②③④⑤⑥⑦⑧⑨⑩

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