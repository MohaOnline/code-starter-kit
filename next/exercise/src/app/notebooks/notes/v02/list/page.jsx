"use client"

import React, {memo, useCallback, useEffect, useState, useMemo} from "react";
import {useRouter, useSearchParams} from 'next/navigation';

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, InputLabel, InputAdornment,
  Link, ListItemText, ListSubheader, Menu, MenuItem, MenuList, IconButton, Stack, Select,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {
  Adb as AdbIcon, ArrowRight as ArrowRightIcon, CheckBox as CheckBoxIcon, Clear as ClearIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import {toast, ToastContainer} from "react-toastify";

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

  // 从URL参数恢复状态
  useEffect(() => {
    const noteId = searchParams.get('noteId');
    const mode = searchParams.get('mode');

    if (noteId && noteId !== status.currentNoteId) {
      // 需要加载特定笔记
      // fetch(`/api/notebooks/notes/get?id=${noteId}`)
      //   .then(res => res.json())
      //   .then(json => {
      //     if (json.success && json.note) {
      //       setStatus(prev => ({
      //         ...prev,
      //         currentNoteId: noteId,
      //         note: json.note,
      //         isEditing: mode === 'edit'
      //       }));
      //     }
      //     else {
      //       // 笔记不存在，回到列表页
      //       router.push('/notebooks/notes/v02/list');
      //     }
      //   })
      //   .catch(err => {
      //     console.error('Failed to load note:', err);
      //     router.push('/notebooks/notes/v02/list');
      //   });
    }
    else if (!noteId && status.currentNoteId) {
      // URL没有noteId但状态有，清除状态
      setStatus(prev => ({
        ...prev,
        currentNoteId: '',
        isEditing: false
      }));
    }
    else if (noteId && mode !== (status.isEditing ? 'edit' : undefined)) {
      // 同步编辑状态
      setStatus(prev => ({
        ...prev,
        isEditing: mode === 'edit'
      }));
    }
  }, [searchParams, router]);

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
          note: {},
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
  if (status.notes?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavTop/>
      <ThemeToggle/>
      <div className={"flex flex-col items-center justify-center"}>
        {!status.currentNoteId &&
          <h1 className={''}>Notes</h1>}

        <div className={"flex flex-row w-full justify-center"}>
          {/* Sidebar: Type Filter, Topic Selector. */}
          {!status.currentNoteId && !status.isEditing &&
            // https://v3.tailwindcss.com/docs/width
            <div className={'w-64'}>
              <Sidebar/>
            </div>
          }

          {/* Note List */}
          {!status.currentNoteId &&
            <div className={'basis-1/2'}>
              {status.notes?.filter((note) => {
                console.log(status.selectedTypeID, note.tid);
                return (!status.selectedTypeID || status.selectedTypeID === note.tid);
              }).map((note) => (
                <Item key={note.id} note={note}/>
              ))}
            </div>
          }
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

      <ProcessingMask/>
      <ToastContainer position="top-right" newestOnTop={false} draggable
                      autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss pauseOnHover
                      rtl={false}/>
    </>
  );
}