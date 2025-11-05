import React, {memo, useCallback, useRef, useEffect} from "react";
import NextLink from "next/link";
import {useRouter} from 'next/navigation';

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, IconButton, Input,
  Link, ListSubheader, Menu, MenuItem, OutlinedInput,
  Stack, Tabs, Tab, TextField, Toolbar, Tooltip, Typography,
  useTheme
} from '@mui/material';
import {toast} from "react-toastify";

import {useStatus} from "@/app/lib/atoms";
import HTMLField from "@/app/lib/components/HTMLField/v01";
import {Panel} from '@/lib/components/tailwind/panel/v01';
import {updateObject2Array} from '@/lib/utils';
import {
  bindCtrlCmdShortcut2ButtonClickFactory, bindShortcut2ButtonClickFactory,
  registerComposingMarker, unregisterComposingMarker
} from '@/lib/common';

export function Editor({note}) {
  const [status, setStatus] = useStatus();
  const router = useRouter();
  const saveButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  // 取消编辑，返回详情页
  const cancelEditing = useCallback(() => {
    router.push(`/notebooks/notes/v02/list?noteId=${note.id}`);
  }, [router, note.id]);

  // POST note to API
  const updateNote = useCallback(async () => {
    let action = "create";
    if (status.note.id) {
      action = "update";
    }

    try {
      status.isProcessing = true;
      setStatus({...status});
      await fetch("/api/notebooks/v02/notes/crud", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
            note: status.note,
          }),
        }
      ).then(res => res.json()).then(json => {
          console.log("API Response:", json); // 更明确的日志标识

          if (!json.success) {
            toast.error("API Response: " + json.error);
          }
          else {
            status.note = json.note;
            status.notes = updateObject2Array(status.notes, json.note);
            setStatus({...status});
            toast.success("Note Updated.");
            // [继续编辑更好, 不需要回到列表界面] 保存成功后跳转到详情页
            //router.push(`/notebooks/notes/v02/list?noteId=${json.note.id}`);
          }
        }
      )
    }
    catch (error) {
      console.log('Note Update Error...')
      console.dir(error);
    }
    finally {
      status.isProcessing = false;
      setStatus({...status});
    }
  }, [status]);

  const Operations = memo(() => (
    <div className={'gap-2 flex flex-row justify-end'}>
      <Button ref={saveButtonRef} variant="contained" onClick={updateNote}>Save</Button>
      {/* @see https://mui.com/material-ui/customization/palette/#default-colors */}
      <Button ref={cancelButtonRef} variant="outlined" onClick={cancelEditing} color="error">Cancel</Button>
    </div>)
  )

  // 把 UI 的 content 更新到 status.note 。
  const updateStatusNoteAttribute = useCallback((val, attribute) => {
    console.log('val:', val);
    setStatus(prev => ({
      ...prev,
      note: {
        ...prev.note,
        [attribute]: val,
      },
    }));
  }, [setStatus]);

  const shortcutSaveButton = useCallback(bindCtrlCmdShortcut2ButtonClickFactory(saveButtonRef, 's'), []);
  const shortcutCancelButton = useCallback(bindShortcut2ButtonClickFactory(cancelButtonRef, 'Escape'), []);
  // 键盘快捷键监听 Keyboard related
  useEffect(() => {
    // 给保存、取消按钮设置快捷键
    document.addEventListener('keydown', shortcutSaveButton);
    document.addEventListener('keydown', shortcutCancelButton);
    registerComposingMarker();

    // 清理函数
    return () => {
      document.removeEventListener('keydown', shortcutSaveButton);
      document.removeEventListener('keydown', shortcutCancelButton);
      unregisterComposingMarker();
    };
  }, []); // 空依赖数组，只在组件挂载和卸载时执行

  return (
    <>
      <Stack paddingTop={2} paddingBottom={2} gap={2}>
        {/* title */}
        <TextField id="outlined-basic" label="Title" variant="outlined" value={note.title} onChange={(e) => {
          updateStatusNoteAttribute(e.target.value, 'title')
        }}/>

        {/*  */}
        {(note.type_id === '21' || note.tid === '21' // 语文作文
          ) &&
          <Panel title={'question'}><>
            <HTMLField content={note.question}
                       onChange={(value) => {
                         updateStatusNoteAttribute(value, 'question')
                       }}/>
          </>
          </Panel>
        }

        {/* body_script first */}
        {(note.type_id === '999' || note.tid === '999' || note.type_id === '997' || note.tid === '997' ||
            note.type_id === '31' || note.tid === '31' || note.type_id === '61' || note.tid === '61' ||
            note.type_id === '21' || note.tid === '21') &&
          <Panel title={'body_script'}><>
            <HTMLField content={note.body_script} cursorPosition={status.cursorPositionBodyScript}
                       onChange={(value) => {
                         updateStatusNoteAttribute(value, 'body_script')
                       }}/>
          </>
          </Panel>
        }
      </Stack>

      <Operations/>
    </>
  );
}