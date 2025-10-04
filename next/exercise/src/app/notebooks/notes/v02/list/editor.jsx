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

export function Editor({note}) {
  const [status, setStatus] = useStatus();
  const saveButtonRef = useRef(null);

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

  // 生成事件处理函数
  const genBindCtrlCmdShortcut2ButtonClick = useCallback((buttonRef, key) => {
    return (event) => {
      // 检查是否按下了 Ctrl+S (Windows/Linux) 或 Cmd+S (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === key) {
        event.preventDefault(); // 阻止浏览器默认的保存行为
        // 模拟点击保存按钮
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    }
  }, []);

  // 键盘快捷键监听
  useEffect(() => {
    // 添加事件监听器
    document.addEventListener('keydown', genBindCtrlCmdShortcut2ButtonClick(saveButtonRef, 's'));

    // 清理函数
    return () => {
      document.removeEventListener('keydown', genBindCtrlCmdShortcut2ButtonClick(saveButtonRef, 's'));
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
            <HTMLField content={note.body_script} onChange={(value) => {
              updateStatusNoteAttribute(value, 'body_script')
            }}/>
          </>
          </Panel>
        }
      </Stack>

      <div className={'gap-2 flex flex-row justify-end'}>
        <Button ref={saveButtonRef} variant="contained" onClick={updateNote}>Save</Button>
        <Button variant="outlined"
                color="error"   // @see https://mui.com/material-ui/customization/palette/#default-colors
                onClick={() => {
                  setStatus(prev => ({
                    ...prev,
                    isEditing: false,
                  }))
                }}
        >Cancel</Button>
      </div>
    </>
  );
}