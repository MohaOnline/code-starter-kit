import React, { useCallback, useEffect, useRef, useState } from "react";

import Script from "next/script";

import { css, Global } from '@emotion/react';
import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Link, ListSubheader, Menu, MenuItem, IconButton, Stack,
  Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {
  Adb as AdbIcon, ArrowRight as ArrowRightIcon, CheckBox as CheckBoxIcon, Clear as ClearIcon,
  Menu as MenuIcon, NoteAdd as NoteAddIcon, NoteAddOutlined as NoteAddOutlinedIcon,
  PlaylistAdd as PlaylistAddIcon, PlayCircleFilledTwoTone as PlayCircleFilledTwoToneIcon, PostAdd as PostAddIcon,
  StopTwoTone as StopTwoToneIcon, Sync as SyncIcon
} from '@mui/icons-material';

import { useStatus } from "@/app/lib/atoms";
import { toast } from "react-toastify";
import { SelectFieldSingle } from "@/lib/components/mui/SelectFields";

export function Sidebar() {
  const [status, setStatus] = useStatus();
  const [openDialog, setOpenDialog] = useState(false);

  // 加载 Types 数据 - 只在数据为空时加载
  useEffect(() => {
    // 如果已经有数据，就不重复加载
    if (status.types.length > 0) {
      console.log('Types already loaded, skipping fetch');
      return;
    }

    console.log('Loading types data from API...');
    fetch('/api/notebooks/types/list')
      .then(res => res.json())
      .then(json => {
        status.setTypes(json.types);
        console.log('Types loaded successfully:', json.types.length);
      })
      .catch(err => {
        console.error('Fetch API error: /api/notebooks/types/list');
        toast.error('cant load types from API.');
      });
  }, [status.types.length, setStatus]);

  // 处理新建笔记按钮点击
  const handleAddNoteClick = () => {
    if (!status.selectedTypeID) {
      toast.warning('请先选择一个 Type');
      return;
    }
    setOpenDialog(true);
  };

  // 处理对话框关闭
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // 处理确认创建笔记
  const handleConfirmCreate = async () => {
    try {
      const response = await fetch(`/api/notebooks/notes/${status.selectedTypeID}/crud`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // 获取选中的 type 信息
        const selectedType = status.types.find(type => type.id === status.selectedTypeID);
        
        // 补全返回的 note 字段
        const newNote = {
          type: selectedType?.title || '',
          type_sub: selectedType?.title_sub || '',
          notebook_title: '',
          notebook_title_sub: '',
          topics: '',
          topics_ids: '',
          pid: '0',
          id: data.note.id,
          nbid: '0',
          tid: data.note.tid,
          title: '',
          body: '',
          question: '',
          answer: '',
          choise_a: '',
          choise_b: '',
          choise_c: '',
          choise_d: '',
          choise_e: '',
          choise_f: '',
          choise_g: '',
          choise_h: '',
          choise_i: '',
          choise_j: '',
          choise_k: '',
          weight: data.note.weight,
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          deleted: 0,
          figures: '',
          body_script: '',
          body_extra: '',
          note: '',
          note_extra: '',
        };

        // 插入到 status.notes 的开头（因为是最新的 weight）
        setStatus(prev => ({
          ...prev,
          notes: [newNote, ...prev.notes],
        }));

        toast.success('笔记创建成功');
        setOpenDialog(false);
      } else {
        toast.error(data.error || '创建笔记失败');
      }
    } catch (error) {
      console.error('Create note error:', error);
      toast.error('创建笔记时发生错误');
    }
  };

  // 获取选中的 type 标题
  const getSelectedTypeTitle = () => {
    const selectedType = status.types.find(type => type.id === status.selectedTypeID);
    if (!selectedType) return '';
    return selectedType.title_sub 
      ? `${selectedType.title} - ${selectedType.title_sub}` 
      : selectedType.title;
  };

  return (
    <>
      <Stack className={'toolbar pb-2'} direction="row" spacing={2}>
        <Button size={'small'} variant={'outlined'} onClick={handleAddNoteClick}>
          <NoteAddOutlinedIcon/>
        </Button>
      </Stack>
      <Stack className={'border pt-1'}>
        <SelectFieldSingle label='Types'
                           items={status.types.map((type) => ({value: type.id, label: type.id + '. ' + (type.title_sub ? `${type.title} - ${type.title_sub}` : type.title)}))}
                           value={status.selectedTypeID} updateValue={status.setSelectedTypeID}/>
        {/*{status.types.map((type) => (*/}
        {/*  <div key={type.id}>{`${type.id} ${type.title}`}</div>*/}
        {/*))}*/}
      </Stack>

      {/* 新建笔记确认对话框 */}
      <Dialog open={openDialog}
              onClose={handleDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title">
          新建笔记
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            是否新建 {getSelectedTypeTitle()} 笔记？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>取消</Button>
          <Button onClick={handleConfirmCreate} autoFocus variant="contained">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}