import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useRouter} from 'next/navigation';

import {
  autocompleteClasses, AppBar, Autocomplete, Avatar, Box, Button,
  Checkbox, Chip, Container, FormControl, IconButton, InputLabel, InputAdornment,
  Link as MuiLink, ListItemText, ListSubheader, Menu, MenuItem, MenuList,
  Paper, Popper,
  Stack, Select, Tabs, Tab, TextField, Toolbar, Tooltip, Typography, useTheme
} from '@mui/material';
import {
  Adb as AdbIcon, ArrowRight as ArrowRightIcon,
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Clear as ClearIcon,
  FormatBold as FormatBoldIcon, Info as InfoIcon,
  Menu as MenuIcon, NoteAdd as NoteAddIcon, NoteAddOutlined as NoteAddOutlinedIcon,
  PlayArrow as PlayArrowIcon, PlaylistAdd as PlaylistAddIcon, PlayCircleFilledTwoTone as PlayCircleFilledTwoToneIcon,
  PostAdd as PostAddIcon,
  StopTwoTone as StopTwoToneIcon, Sync as SyncIcon
} from '@mui/icons-material';

import he from 'he'
import hljs from 'highlight.js';

// Own libraries and css.
import {useStatus} from "@/app/lib/atoms";
import {bindCtrlCmdShortcut2ButtonClickFactory, bindShortcut2ButtonClickFactory, calculateHTMLOffsetFromDomClick} from "@/lib/common";

import './details.css';


const classNamesFromType = (type_id) => {
  let classNames = '';
  switch (type_id) {
    case '21':
      classNames = ' chinese_article';
      break;
  }
}

export function Details(props) {
  const [status, setStatus] = useStatus();
  const router = useRouter();
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
  // <pre><code> 里的内容没有做 < & 转义处理，显示前先做转义处理
  const getHTMLContentsWithHTMLEntityEncode = useCallback((attribute) => {
    // const regex = /<pre><code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code><\/pre>/gs;
    const regex = /<code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code>/gs;
    return note?.[attribute]?.replace(regex, (match, content) => {
      const encodedContent = he.encode(content, {useNamedReferences: true});
      return match.replace(content, encodedContent);
    });
  });
  const questionWithHTMLEntityEncode = useMemo(() => getHTMLContentsWithHTMLEntityEncode('question'), [getHTMLContentsWithHTMLEntityEncode, note.question]);
  const getBodyScriptWithHTMLEntityEncode = useCallback(() => {
    // const regex = /<pre><code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code><\/pre>/gs;
    const regex = /<code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code>/gs;
    return note?.body_script?.replace(regex, (match, content) => {
      const encodedContent = he.encode(content, {useNamedReferences: true});
      return match.replace(content, encodedContent);
    });
  }, [note.body_script]);
  const articleBodyScriptRef = useRef(null);
  const articleQuestionRef = useRef(null);
  const highlightHandler = useCallback(function () {
    const container = articleBodyScriptRef.current;
    if (!container) {
      return;
    }
    const all = [...container.querySelectorAll('pre > code:not([data-highlighted="yes"])')]
    const outermost = all.filter(el => !all.some(other => other !== el && other.contains(el)))
    outermost.forEach(el => {
      hljs?.highlightElement(el); // 或 hljs.highlightAllUnder(container);
    });
  }, [articleBodyScriptRef.current]);
  useEffect(() => {
    highlightHandler();
  });

  // 计算点击位置在原始 HTML Code 中的偏移量
  // 原理：过滤掉 <...> 中的内容，折算 &...; 的内容。
  // 处理 body_script 预览区域点击事件
  const onBodyScriptPreviewClick = useCallback((event) => {
    if (!status.isEditing) return; // 只在编辑模式下响应

    const offset = calculateHTMLOffsetFromDomClick(event, articleBodyScriptRef.current, note?.body_script);

    // 将光标位置传递给编辑器
    setStatus(prev => ({
      ...prev,
      cursorPositionBodyScript: offset,
    }));
  }, [status.isEditing, setStatus, note?.body_script]);

  // 没有 currentNoteId 就显示笔记一览
  const click2List = useCallback(() => {
    router.push('/notebooks/notes/v02/list');
  }, [router]);

  // 点击编辑按钮
  const click2Edit = useCallback(() => {
    router.push(`/notebooks/notes/v02/list?noteId=${note.id}&mode=edit`);
  }, [router, note.id]);

  // 详细页面操作面板：播放按钮、播放模式 Radio、Edit 按钮、List 按钮
  const Operations = memo(() => {
    return (
      <>
        <div className={'border flex flex-row justify-start sticky top-0 z-10'}>
          <button>🔄</button>
        </div>
        <div className={'gap-2 flex flex-row justify-end sticky top-0 z-10'}>
          {!status.isEditing && // 编辑的时候不需要操作按钮，整个 Details 变成预览。
            <Button sx={{
              backgroundColor: 'success.light', // @see https://mui.com/material-ui/customization/default-theme/
              '&:hover': { // 鼠标悬停
                backgroundColor: 'success.dark',
                color: 'error.contrastText',
              },
            }} ref={editButtonRef} className={''} variant="contained" onClick={click2Edit}>Edit</Button>
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
      </>
    );
  })

  // 工具条
  const [popperAnchorEl, setPopperAnchorEl] = useState(null); // the hovered span element
  const popperToolbarCloseTimerRef = useRef(null);
  const handlePopperToolbarMouseEnter = () => {
    clearTimeout(popperToolbarCloseTimerRef.current);
  };
  const handlePopperToolbarMouseLeave = (delay = 150) => {
    clearTimeout(popperToolbarCloseTimerRef.current);
    popperToolbarCloseTimerRef.current = setTimeout(() => {
      setPopperAnchorEl(null);
    }, delay);
  };
  const handleActionClick = useCallback((command)=>{},[]);
  const PopperToolbar = memo(() => {
    return (
      <>
        {popperAnchorEl && (
          <Popper open={Boolean(popperAnchorEl)}
                  anchorEl={popperAnchorEl}
                  placement="top"
                  modifiers={[
                    {name: 'offset', options: {offset: [0, 8]}},
                    {name: 'preventOverflow', options: {boundary: 'viewport'}}
                  ]}
                  sx={{zIndex: 1300}}
          >
            <Paper elevation={4}
                   onMouseEnter={handlePopperToolbarMouseEnter}
                   onMouseLeave={handlePopperToolbarMouseLeave}
                   sx={{
                     display: 'flex',
                     alignItems: 'center',
                     px: 0.5,
                     py: 0.25,
                     borderRadius: 1,
                     pointerEvents: 'auto' // ensure popper can receive pointer
                   }}
            >
              <Tooltip title="Play">
                <IconButton size="small" onClick={() => handleActionClick('play')}>
                  <PlayArrowIcon fontSize="small"/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Bold">
                <IconButton size="small" onClick={() => handleActionClick('bold')}>
                  <FormatBoldIcon fontSize="small"/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Info">
                <IconButton size="small" onClick={() => handleActionClick('info')}>
                  <InfoIcon fontSize="small"/>
                </IconButton>
              </Tooltip>
            </Paper>
          </Popper>)}
      </>
    );
  })
  const handleVoiceSpanMouseOver = useCallback((event) => {
    console.log('handleVoiceSpanMouseOver', event);

    if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
      event.stopPropagation();
      if (!(event.target instanceof Element)) return;
      setPopperAnchorEl(event.target);
      clearTimeout(popperToolbarCloseTimerRef.current);
    }
  }, []);
  const handleVoiceSpanMouseOut = useCallback((event) => {
    console.log('handleVoiceSpanMouseOut', event);

    if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
      event.stopPropagation();

      clearTimeout(popperToolbarCloseTimerRef.current);
      popperToolbarCloseTimerRef.current = setTimeout(() => {
        setPopperAnchorEl(null);
      }, 150);
    }
  }, []);

  // 绑定 Popper 触发 到 span
  useEffect(() => {
    if (!note.body_script || !articleBodyScriptRef.current) return;

    articleBodyScriptRef.current.addEventListener('mouseover', handleVoiceSpanMouseOver);
    articleBodyScriptRef.current.addEventListener('mouseout', handleVoiceSpanMouseOut);

    return () => {
      articleBodyScriptRef.current?.removeEventListener('mouseover', handleVoiceSpanMouseOver);
      articleBodyScriptRef.current?.removeEventListener('mouseout', handleVoiceSpanMouseOut);
    }
  }, [note.body_script]);

  return (<>
    {/* Title */}
    <Typography variant="h1" gutterBottom sx={{textAlign: "center"}}>{note.title}<sup>(ID: {note.id})</sup></Typography>
    <Operations/>

    {/* question */}
    {(note.type_id === '61' || note.tid === '61' ||     // 数学笔记
        note.type_id === '31' || note.tid === '31' ||   // 物理笔记
        note.type_id === '21' || note.tid === '21') &&  // 语文作文
      <>
        <article key={`question: ${note.id}`} contentEditable={status.isEditing} ref={articleQuestionRef}
                 className={`prose text-inherit dark:text-primary m-auto max-w-4xl ${status.isEditing ? 'cursor-text transition-colors' : ''}`}
                 dangerouslySetInnerHTML={{__html: questionWithHTMLEntityEncode}}/>
      </>
    }

    {/* body_script */}
    {(note.tid === '999' || note.type_id === '999' || note.type_id === '997' || note.tid === '997' ||
        note.type_id === '61' || note.tid === '61' ||   // 数学笔记
        note.type_id === '31' || note.tid === '31' ||   // 物理笔记
        note.type_id === '21' || note.tid === '21') &&
      <>
        <article key={`body_script: ${note.id}`} contentEditable={status.isEditing} ref={articleBodyScriptRef} onClick={onBodyScriptPreviewClick}
                 className={`prose text-inherit dark:text-primary m-auto max-w-4xl ${status.isEditing ? 'cursor-text transition-colors' : ''}`}
                 dangerouslySetInnerHTML={{__html: getBodyScriptWithHTMLEntityEncode()}}/>
      </>
    }

    {/*<PopperToolbar/>*/}
  </>);
}