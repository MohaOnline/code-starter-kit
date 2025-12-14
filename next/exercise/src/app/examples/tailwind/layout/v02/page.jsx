'use client';

import React, {createContext, forwardRef, memo, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal} from 'react-dom';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import Script from 'next/script';

import {css, Global} from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, IconButton, InputLabel, InputAdornment,
  Link as MuiLink, ListItemText, ListSubheader, Menu, MenuItem, MenuList,
  Paper, Popper,
  Stack, Select, Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme,
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
  Stop as StopIcon, StopTwoTone as StopTwoToneIcon, Sync as SyncIcon, Tune as TuneIcon,
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
import {preventUnhandled} from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {DropIndicator} from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import {attachClosestEdge, extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {getReorderDestinationIndex} from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'; // 前后移动时重算 targetIndex
import {reorder} from '@atlaskit/pragmatic-drag-and-drop/reorder';  // 移动数组元素

// CodeMirror
import {EditorView, basicSetup} from 'codemirror';
import {html} from '@codemirror/lang-html';

///////// Own libraries //////////////
import {useStatus} from '@/app/lib/atoms';

// Comment Template//
// ①②③④⑤⑥⑦⑧⑨⑩

export default function Page() {

  return (
      <>
        <div>Temp</div>
        <div className="w-full bg-black/80 backdrop-blur-md border-t border-gray-800 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-gray-400">

            <div className="flex items-center space-x-6">
              <span className="text-active text-sm font-medium">24 / 992</span>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
                <input type="text" placeholder=""
                       className="w-32 sm:w-48 bg-transparent border border-gray-700 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-active"/>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-angle-double-left text-lg"></i></button>
              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-backward-step text-lg"></i></button>
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition">
                <i className="fas fa-play text-lg"></i>
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-forward-step text-lg"></i></button>
              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-angle-double-right text-lg"></i></button>

              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-volume-up text-lg"></i></button>
              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-comment-dots text-lg"></i></button>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center bg-gray-900/80 rounded-lg px-2 py-1 space-x-1">
                <button className="px-3 py-1.5 rounded text-sm hover:bg-white/10 transition">1</button>
                <button className="px-3 py-1.5 rounded text-sm hover:bg-white/10 transition">2</button>
                <button className="px-3 py-1.5 rounded text-sm hover:bg-white/10 transition">3</button>
                <button className="px-3 py-1.5 rounded text-sm hover:bg-white/10 transition">4</button>
                <button className="px-3 py-1.5 rounded bg-active text-black font-medium text-sm">5</button>
              </div>

              <button className="p-2 rounded-full hover:bg-white/10 transition"><i className="fas fa-edit text-lg"></i></button>
            </div>
          </div>
        </div>
      </>
  );
}