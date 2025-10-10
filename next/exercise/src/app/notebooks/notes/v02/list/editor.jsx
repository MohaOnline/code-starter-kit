import React, {useCallback, useRef, useEffect} from "react";
import NextLink from "next/link";

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
import {updateObjectArray} from '@/lib/utils';
import {
  bindCtrlCmdShortcut2ButtonClickFactory, bindShortcut2ButtonClickFactory,
  registerComposingMarker, unregisterComposingMarker
} from '@/lib/common';

export function Editor({note}) {
  const [status, setStatus] = useStatus();
  const saveButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

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
            status.notes = updateObjectArray(status.notes, json.note);
            setStatus({...status});
            toast.success("Note Updated.");
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

  
  const cancelEditing = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      isEditing: false,
    }))
  }, [setStatus]);

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

        {/* body_script first */}
        {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
          <Panel title={'body_script'}><>
            <HTMLField content={note.body_script} cursorPosition={status.cursorPosition}
                       onChange={(value) => {
                         updateStatusNoteAttribute(value, 'body_script')
                       }}/>
          </>
          </Panel>
        }
      </Stack>

      <div className={'gap-2 flex flex-row justify-end'}>
        <Button ref={saveButtonRef} variant="contained" onClick={updateNote}>Save</Button>
        <Button ref={cancelButtonRef} variant="outlined" onClick={status.cancelEditing}
                color="error"   // @see https://mui.com/material-ui/customization/palette/#default-colors
        >Cancel</Button>
      </div>
    </>
  );
}