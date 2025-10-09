import React, {useCallback, useEffect, useRef} from "react";
import {Button, Typography} from "@mui/material";

import hljs from 'highlight.js';

// Own libraries and css.
import {useStatus} from "@/app/lib/atoms";
import {bindCtrlCmdShortcut2ButtonClickFactory, bindShortcut2ButtonClickFactory} from "@/lib/common";

import './details.css';


export function Details(props) {
  const [status, setStatus] = useStatus();
  const {note} = props;

  // 键盘快捷键监听
  const editButtonRef = useRef(null);
  const listButtonRef = useRef(null);
  const shortcutEditButton = useCallback(bindCtrlCmdShortcut2ButtonClickFactory(editButtonRef, 'e'), []);
  const shortcutListButton = useCallback(bindCtrlCmdShortcut2ButtonClickFactory(listButtonRef, 'l'), []);
  useEffect(() => {
    // 给保存、取消按钮设置快捷键
    document.addEventListener('keydown', shortcutEditButton);
    document.addEventListener('keydown', shortcutListButton);

    // 清理函数
    return () => {
      document.removeEventListener('keydown', shortcutEditButton);
      document.removeEventListener('keydown', shortcutListButton);
    };
  }, []); // 空依赖数组，只在组件挂载和卸载时执行

  // 语法高亮
  const contentRef = useRef(null);
  const highlightHandler = useCallback(function () {
    const container = contentRef.current;
    container?.querySelectorAll('code>pre').forEach(el => {
      // 针对容器内的高亮
      hljs?.highlightElement(el); // 或 hljs.highlightAllUnder(container);
    });
  }, [contentRef, note.body_script]);

  useEffect(() => {
    highlightHandler();
  })

  // 没有 currentNoteId 就显示笔记一览
  const click2List = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      isEditing: false,
      currentNoteId: '',
    }))
  }, [setStatus]);

  return (<>
    {(note.tid === '999' || note.type_id === '999' || note.type_id === '997') &&
      <>
        <Typography variant="h1" gutterBottom sx={{textAlign: "center"}}>{note.title}</Typography>
        <article ref={contentRef} className={'prose text-inherit dark:text-primary m-auto max-w-4xl'}
                 dangerouslySetInnerHTML={{__html: note.body_script}}/>
      </>
    }

      <div className={'gap-2 flex flex-row justify-end'}>
        {!status.isEditing && // 编辑的时候不需要操作按钮，整个 Details 变成预览。
          <Button ref={editButtonRef} sx={{
            backgroundColor: 'success.light', // @see https://mui.com/material-ui/customization/default-theme/
            '&:hover': { // 鼠标悬停
              backgroundColor: 'success.dark',
              color: 'error.contrastText',
            },
          }} className={''} variant="contained"
                  onClick={() => {
                    setStatus(prev => ({
                      ...prev,
                      isEditing: true,
                    }))
                  }}
          >Edit</Button>
        }
        <Button variant="contained" onClick={click2List} ref={listButtonRef} sx={{
          backgroundColor: 'grey.300',
          '&:hover': {
            backgroundColor: 'grey.500',
            color: 'error.contrastText',
          },
        }}
        >List</Button>
      </div>

  </>);
}