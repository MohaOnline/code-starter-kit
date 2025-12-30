"use client"

import React, {memo, useCallback, useEffect, useState, useMemo, useRef} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

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

import {toast, ToastContainer} from "react-toastify";

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

import {useStatus} from "@/app/lib/atoms";
import NavTop from '@/app/lib/components/NavTop';
import {ProcessingMask} from "@/app/lib/components/ProcessingMask";
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";

import {Item} from "@/app/notebooks/notes/v02/list/item";
import {Details} from "@/app/notebooks/notes/v02/list/details";
import {Editor} from "@/app/notebooks/notes/v02/list/editor";
import {Sidebar} from "@/app/notebooks/notes/v02/list/sidebar";


export default function NotesList() {
  const [status, setStatus] = useStatus();
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL参数同步函数
  const updateURL = (noteId, mode) => {
    const params = new URLSearchParams();
    if (noteId) {
      params.set('noteId', noteId);
    }
    if (mode === 'edit') {
      params.set('mode', 'edit');
    }

    const newURL = params.toString() ? `?${params.toString()}` : '';
    router.push(`/notebooks/notes/v02/list${newURL}`, {scroll: false});
  };

  // // 从URL参数恢复状态
  // useEffect(() => {
  //   const noteId = searchParams.get('noteId');
  //   const mode = searchParams.get('mode');
  //
  //   if (noteId && noteId !== status.currentNoteId) {
  //     // 需要加载特定笔记
  //     // fetch(`/api/notebooks/notes/get?id=${noteId}`)
  //     //   .then(res => res.json())
  //     //   .then(json => {
  //     //     if (json.success && json.note) {
  //     //       setStatus(prev => ({
  //     //         ...prev,
  //     //         currentNoteId: noteId,
  //     //         note: json.note,
  //     //         isEditing: mode === 'edit'
  //     //       }));
  //     //     }
  //     //     else {
  //     //       // 笔记不存在，回到列表页
  //     //       router.push('/notebooks/notes/v02/list');
  //     //     }
  //     //   })
  //     //   .catch(err => {
  //     //     console.error('Failed to load note:', err);
  //     //     router.push('/notebooks/notes/v02/list');
  //     //   });
  //   }
  //   else if (!noteId && status.currentNoteId) {
  //     // URL没有noteId但状态有，清除状态
  //     setStatus(prev => ({
  //       ...prev,
  //       currentNoteId: '',
  //       isEditing: false
  //     }));
  //   }
  //   else if (noteId && mode !== (status.isEditing ? 'edit' : undefined)) {
  //     // 同步编辑状态
  //     setStatus(prev => ({
  //       ...prev,
  //       isEditing: mode === 'edit'
  //     }));
  //   }
  // }, [searchParams, router]);

  // 监听内部状态，同步到 URL
  // useEffect(() => {
  //   const currentNoteId = searchParams.get('noteId');
  //   const currentMode = searchParams.get('mode');
  //
  //   const shouldUpdateURL =
  //     currentNoteId !== status.currentNoteId ||
  //     (status.currentNoteId && currentMode !== (status.isEditing ? 'edit' : null));
  //
  //   if (shouldUpdateURL) {
  //     updateURL(status.currentNoteId, status.isEditing ? 'edit' : null);
  //   }
  // }, [status.currentNoteId, status.isEditing]);

  // 更新页面标题
  // v2 setTitle
  // useEffect(() => {
  //   const updateTitle = () => {
  //     if (status.note?.title) {
  //       document.title = `${status.note.title} - Notes`;
  //     } else if (status.currentNoteId) {
  //       // 如果有noteId但还没加载到note，显示加载状态
  //       document.title = 'Loading... - Notes';
  //     } else {
  //       document.title = 'Notes';
  //     }
  //   };

  //   updateTitle();

  //   // 防止标题被其他代码重置，定期检查并恢复
  //   const titleInterval = setInterval(() => {
  //     const expectedTitle = status.note?.title
  //       ? `${status.note.title} - Notes`
  //       : status.currentNoteId
  //         ? 'Loading... - Notes'
  //         : 'Notes';

  //     if (document.title !== expectedTitle) {
  //       document.title = expectedTitle;
  //     }
  //   }, 100);

  //   return () => clearInterval(titleInterval);
  // }, [status.note?.title, status.currentNoteId]);

  // v1 setTitle
  // useEffect(() => {
  //   if (status.note?.title) {
  //     document.title = `${status.note.title} - Notes`;
  //   }
  //   else {
  //     document.title = 'Notes';
  //   }
  // }, [status.note?.title]);


  // 加载所有 notes 处理 URL 参数
  useEffect(() => {
    // 转换 URL 参数到内部状态：
    const restoreStatus = (notes) => {
      // 处理 detail / edit 页面
      let noteId = searchParams.get('noteId');
      const mode = searchParams.get('mode');

      if (noteId && notes) {
        const note = notes.find((note) => note.id === noteId);
        if (note) {
          document.title = note.title;
          if (mode !== 'edit') {
            setStatus((prev) => ({
              ...prev,
              notes: notes,
              currentNoteId: noteId,
              note: note,
              isEditing: false,
            }))
          }
          else if (mode === 'edit') {
            setStatus((prev) => ({
              ...prev,
              notes: notes,
              currentNoteId: noteId,
              note: note,
              isEditing: true,
            }))
          }
        }
        else { // Note 不存在时
          noteId = null;
        }
      }

      if (!noteId) { // 显示 Note List
        router.replace('/notebooks/notes/v02/list');
        setStatus((prev) => ({
          ...prev,
          notes: notes,
          currentNoteId: '',
          note: null,
          isEditing: false,
        }))
      }
    }

    if (status.notes?.length === 0) { //!status.notes || status.notes.length <= 0
      fetch('/api/notebooks/notes/list')
        .then(res => res.json())
        .then(json => {
          restoreStatus(json.notes);
        })
        .catch(err => {
          console.error('Fetch API error: /api/notebooks/notes/list', err);
          toast.error('cant load notes from API.');
        });
    }
    else {
      restoreStatus(status.notes);
    }
  }, [searchParams, useRouter]);

  const notesWindowRef = useRef(null);

  useEffect(() => {
    // 🛡️ 安全检查：如果 ref 还没有绑定到元素（比如正在加载中），则不执行初始化
    // 如果是 detail 页面，不需要 monitor 拖动
    if (!notesWindowRef.current || status.currentNoteId) {
      return;
    }

    return combine(
        // 👇 注册自动滚动
        autoScrollForElements({
          // element: notesWindowRef.current, // 指定滚动的容器，比如 tanstack inner DIV element。
          element: document.body, // Window 滚动
        }),

        // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/monitors/
        monitorForElements({
          canMonitor({initial, source}) {
            console.log('canMonitor:', '(initial)', initial, '(source)', source);
            return true;
          },

          onDrop({location, source}) {
            console.log('onDrop:', '(location)', location, '(source)', source);

          //   const target = location.current.dropTargets[0];
          //   if (!target) return;
          //
          //   // DB check
          //   fetch('/api/notebooks/words/english', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(post),
          //   }).then((response) => response.json()).then((data) => {
          //     console.log('data:', data);
          //
          //     if (data.wordsNeedUpdate === true || data.success === false) {
          //       setWordsNeedUpdate(true);
          //     }
          //     else {
          //       // ✅ 关键：把状态更新延后，避免和虚拟列表滚动/测量的同步更新撞在同一 render/commit 周期里
          //       queueMicrotask(() => {
          //         startTransition(() => {
          //           // 只是改了位置，weight 没有更新。
          //           setWords(prev => {
          //             prev[startIndex].weight = data.weight;
          //             return reorder({list: prev, startIndex, finishIndex});
          //           });
          //         });
          //       });
          //     }
          //   });
          }, // onDrop

        }),
    );
  }, [status.notes, status.currentNoteId]);

  // 需优化，load 数据后可以为空。
  if (status.notes?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProcessingMask/>
      <NavTop/>
      <ThemeToggle/>

      <div className={"flex flex-col items-center justify-center"}>
        {!status.currentNoteId &&
          <h1 className={''}>Notes</h1>}

        <div className={'flex flex-col item-center xl:flex-row xl:item-start w-full justify-center gap-4'}>
          {/* Sidebar: Type Filter, Topic Selector. */}
          {!status.currentNoteId && !status.isEditing &&
              // https://v3.tailwindcss.com/docs/width
              <div className={'w-full xl:w-64'}>
              <Sidebar/>
              </div>}

          {/* Note List */}
          {!status.currentNoteId &&
              <div ref={notesWindowRef} className={'w-full xl:basis-1/2'}>
                {status.notes?.filter((note) => {
                  console.log(status.selectedTypeID, note.tid);
                  return (!status.selectedTypeID || status.selectedTypeID === note.tid);
                }).map((note) => (
                    <Item key={note.id} note={note}/>
                ))}
              </div>}

          {/* Certain Note is selected */}
          {status.currentNoteId &&
            <div className={'note-details p-2 ' + (!status.isEditing ? 'basis-3/5' : 'basis-5/12')}>
              <Details note={status.note}/>
            </div>}

          {/* Editor */}
          {status.isEditing &&
            <div className={'basis-7/12'}>
              <Editor note={status.note}/>
            </div>
          }
        </div>
      </div>

      <ToastContainer position="top-right" newestOnTop={false} draggable
                      autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss pauseOnHover
                      rtl={false}/>
    </>
  );
}