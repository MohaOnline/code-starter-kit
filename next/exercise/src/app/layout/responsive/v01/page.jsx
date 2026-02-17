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
  MeetingRoomTwoTone as MeetingRoomIcon, Menu as MenuIcon, NoteAdd as NoteAddIcon, NoteAddOutlined as NoteAddOutlinedIcon,
  Pause as PauseIcon, PlayArrow as PlayArrowIcon, PlaylistAdd as PlaylistAddIcon, PlayCircleFilledTwoTone as PlayCircleFilledTwoToneIcon,
  PostAdd as PostAddIcon, Search as SearchIcon,
  Settings as SettingsIcon, SettingsApplications as SettingsApplicationsIcon, SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon,
  Stop as StopIcon, StopTwoTone as StopTwoToneIcon, Sync as SyncIcon, Tune as TuneIcon,
} from '@mui/icons-material';
import {styled, lighten, darken} from '@mui/system';

import {ImExit} from 'react-icons/im';

// 3rd part libs:
// @tanstack
import {useVirtualizer} from '@tanstack/react-virtual';
import {useMergeRefs} from '@floating-ui/react';

// @atlaskit/pragmatic-drag-and-drop
import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {dropTargetForExternal, monitorForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';  // 标记可投放区域。
import {dropTargetForTextSelection, monitorForTextSelection} from '@atlaskit/pragmatic-drag-and-drop/text-selection/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import {autoScrollForElements, autoScrollWindowForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
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

/**
 * @see layout/responsive/v01
 */
export default function Page() {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSearch]);

  // == DEFAULT ==
  return (
      <React.Fragment>
        <div className={'flex '
            + 'flex-col lg:flex-row orientation-landscape:flex-row ' /* 手机竖直排列 */
            + 'w-screen h-screen ' /* 宽高随屏幕 */}>

          {/* 主内容 */}
          <div className={'flex-1 ' /*  */
              + 'flex flex-col items-stretch'     /**/}>

            <div className="flex-1 border-b text-center flex items-center justify-center">top</div>
            <div className="flex-2 border-b text-center flex items-center justify-center">middle</div>
            <div className="flex-1 text-center">bottom</div>
          </div>

          {/* 工具条 */}
          <div className={'shrink-0 relative ' /* DIV 不收缩，relative 用于定位搜索框 */
              /* 配置工具条布局：主轴均铺（两端不留白）、交叉轴方向居中对齐 */
              + 'flex flex-row lg:flex-col orientation-landscape:flex-col justify-between items-center '
              + 'h-10 w-full' /* 手机竖屏底部工具条 */
              + 'lg:w-14 lg:h-full  orientation-landscape:w-14 orientation-landscape:h-full '  /* 手机竖屏底部工具条 */
              + 'bg-slate-900 text-white'}
              ref={searchRef}>

            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded">A</button>
            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded">B</button>
            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded">C</button>
            
            {/* S 搜索按钮 */}
            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                    onClick={() => setShowSearch(!showSearch)}>搜</button>

            {/* 悬浮搜索框 */}
            {showSearch && (
              <div className={'absolute z-50 '
                              /* 底部工具栏时：在按钮上方显示 */
                              + 'bottom-full left-1/2 -translate-x-1/2 w-full p-0.5 '
                              /* 右侧工具栏时：在按钮左侧显示 */
                              + 'lg:bottom-auto lg:left-auto lg:right-full lg:mr-2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 '
                              + 'orientation-landscape:bottom-auto orientation-landscape:left-auto orientation-landscape:right-full orientation-landscape:mr-2 orientation-landscape:top-1/2 orientation-landscape:-translate-y-1/2 orientation-landscape:translate-x-0'}>
                <input placeholder="搜索..." type="text" autoFocus
                       // width: 100%  
                       className="w-full p-2 bg-white text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#78d278]" />
              </div>
            )}
          </div>
        </div>

      </React.Fragment>
  );
}