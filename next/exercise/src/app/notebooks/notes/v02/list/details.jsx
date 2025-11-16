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
  }, [note]);
  const questionWithHTMLEntityEncode = useMemo(() => getHTMLContentsWithHTMLEntityEncode('question'), [getHTMLContentsWithHTMLEntityEncode, note.question]);
  const questionArticleRef = useRef(null);

  // const getBodyScriptWithHTMLEntityEncode = useMemo(()=>{__html: useMemo(() => {
  //   // const regex = /<pre><code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code><\/pre>/gs;
  //   const regex = /<code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code>/gs;
  //   return note?.body_script?.replace(regex, (match, content) => {
  //     const encodedContent = he.encode(content, {useNamedReferences: true});
  //     return match.replace(content, encodedContent);
  //   });
  // }, [note.body_script])}, [note.body_script]);
  const bodyScriptWithHTMLEntityEncodeObject = useMemo(() => ({
    __html: getHTMLContentsWithHTMLEntityEncode('body_script')
  }), [getHTMLContentsWithHTMLEntityEncode, note.body_script]);
  const bodyScriptArticleRef = useRef(null);
  const highlightHandler = useCallback(function () {
    const container = bodyScriptArticleRef.current;
    if (!container) {
      return;
    }
    const all = [...container.querySelectorAll('pre > code:not([data-highlighted="yes"])')]
    const outermost = all.filter(el => !all.some(other => other !== el && other.contains(el)))
    outermost.forEach(el => {
      hljs?.highlightElement(el); // 或 hljs.highlightAllUnder(container);
    });
  }, [bodyScriptArticleRef.current]);
  useEffect(() => {
    highlightHandler();
  });

  // 计算点击位置在原始 HTML Code 中的偏移量
  // 原理：过滤掉 <...> 中的内容，折算 &...; 的内容。
  // 处理 body_script 预览区域点击事件
  const onBodyScriptPreviewClick = useCallback((event) => {
    if (!status.isEditing) return; // 只在编辑模式下响应

    const offset = calculateHTMLOffsetFromDomClick(event, bodyScriptArticleRef.current, note?.body_script);

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
  const currentHoveredSpanRef = useRef(null);
  const handleActionClick = useCallback((command) => {
    console.log('handleActionClick', command, popperAnchorEl);
    if (currentHoveredSpanRef.current) {
      console.log('handleActionClick', currentHoveredSpanRef.current.dataset.voiceId, command);
    }
  }, [popperAnchorEl]);
  const [mouseOffsetX, setMouseOffsetX] = useState(0);
  const PopperToolbar = memo(({mouseOffsetX}) => {
    return (
      <>
        {popperAnchorEl && (
          <Popper open={Boolean(popperAnchorEl)}
                  anchorEl={popperAnchorEl}
                  placement="top"
            // anchorOrigin={{
            //   vertical: 'bottom',
            //   horizontal: 'left',
            // }}
                  modifiers={[  // https://popper.js.org/docs/v2/modifiers/
                    {name: 'arrow', options: {element: '.MuiPopper-arrow'}},
                    {name: 'offset', options: {offset: [mouseOffsetX, 5]}},
                    {name: 'preventOverflow', options: {boundary: 'viewport'}}
                  ]}
                  sx={{zIndex: 1300}}
          >
            <Paper variant="outlined" component="div"
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

              <Tooltip title="Pause">
                <IconButton size="small" onClick={() => handleActionClick('pause')}>
                  <PauseIcon fontSize="small"/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Sync">
                <IconButton size="small" onClick={() => handleActionClick('sync')}>
                  <SyncIcon fontSize="small"/>
                </IconButton>
              </Tooltip>
            </Paper>
          </Popper>)}
      </>
    );
  })
  const handleVoiceSpanMouseOver = useCallback((event) => {
    if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
      console.log('handleVoiceSpanMouseOver', event);
      if (currentHoveredSpanRef.current === event.target) {
        return;
      }
      event.stopPropagation();
      if (!(event.target instanceof Element)) return;

      // 计算鼠标相对于 span 中心的偏移
      const spanRect = event.target.getBoundingClientRect();  // 返回元素相对于**视口（viewport）**的位置和尺寸信息。
      console.log('handleVoiceSpanMouseOver spanRect:', spanRect);
      /*
      // spanRect 是一个 DOMRect 对象，包含：
      {
        x: 100,        // 元素左边缘距离视口左边的距离（同 left）
        y: 200,        // 元素上边缘距离视口顶部的距离（同 top）
        width: 150,    // 元素的宽度（包括 padding 和 border）
        height: 30,    // 元素的高度（包括 padding 和 border）
        top: 200,      // 元素上边缘距离视口顶部的距离
        right: 250,    // 元素右边缘距离视口左边的距离（left + width）
        bottom: 230,   // 元素下边缘距离视口顶部的距离（top + height）
        left: 100      // 元素左边缘距离视口左边的距离
      }
      浏览器视口（viewport）
┌─────────────────────────────────────┐
│                                     │
│  (0, 0)                             │
│    ↓                                │
│    ┌─────────────────────┐          │
│    │  left: 100          │          │
│    │  top: 200           │          │
│    │  width: 150         │          │
│    │  height: 30         │          │
│    │                     │          │
│    │  <span>文本</span>   │          │
│    │                     │          │
│    └─────────────────────┘          │
│         ↑                           │
│         right: 250 (100 + 150)      │
│         bottom: 230 (200 + 30)      │
│                                     │
└─────────────────────────────────────┘
       */
      const spanCenterX = spanRect.left + spanRect.width / 2;
      const offsetX = event.clientX - spanCenterX;
      console.log('handleVoiceSpanMouseOver', event.clientX, spanCenterX, offsetX);
      setMouseOffsetX(offsetX);

      currentHoveredSpanRef.current = event.target;
      setPopperAnchorEl(event.target);

      // const {clientX, clientY} = event;
      // setPopperAnchorEl({
      //   getBoundingClientRect: () => ({
      //     width: 0,
      //     height: 0,
      //     top: clientY,
      //     bottom: clientY,
      //     left: clientX,
      //     right: clientX,
      //     x: clientX,
      //     y: clientY,
      //     // DOMRect 需要 toJSON（MUI 内部会调用）
      //     toJSON: () => {
      //     },
      //   }),
      //   nodeType: 1,
      // })
      clearTimeout(popperToolbarCloseTimerRef.current);
    }
  }, []);
  const handleVoiceSpanMouseOut = useCallback((event) => {
    if (event.target.tagName === 'SPAN' && event.target.dataset.voiceId) {
      console.log('handleVoiceSpanMouseOut', event);

      // 检查鼠标是否移动到了 span 外部
      // 场景分析：
      // 1. relatedTarget 是 span 的子元素 → 忽略（鼠标还在 span 内）
      // 2. relatedTarget 是 span 外的元素 → 处理（鼠标真的离开了）
      // 3. relatedTarget 是 null → 处理（鼠标离开了文档）
      const relatedTarget = event.relatedTarget; // 鼠标将进入的元素（到哪里去）

      // 如果移动到的新元素是当前 span 的子元素，忽略（检查鼠标是否移动到了当前元素的子元素）
      if (relatedTarget && event.target.contains(relatedTarget)) {
        // 鼠标移动到了 span 的子元素，还在 span 内部
        return;
      }

      // 只处理当前追踪的 span
      // 避免旧的/其他 span 的 mouseout 事件干扰当前状态
      // 没有这个判断，鼠标快速在多个 span 之间移动时，Popper 会闪烁或错误关闭。
      if (currentHoveredSpanRef.current === event.target) {
        event.stopPropagation();
        clearTimeout(popperToolbarCloseTimerRef.current);
        popperToolbarCloseTimerRef.current = setTimeout(() => {
          currentHoveredSpanRef.current = null;
          setPopperAnchorEl(null);
        }, 280);
      }
    }
  }, []);

  // 绑定 Popper 触发 到 span
  useEffect(() => {
    if (!note.body_script || !bodyScriptArticleRef.current) return;

    bodyScriptArticleRef.current.addEventListener('mouseover', handleVoiceSpanMouseOver);
    bodyScriptArticleRef.current.addEventListener('mouseout', handleVoiceSpanMouseOut);

    return () => {
      bodyScriptArticleRef.current?.removeEventListener('mouseover', handleVoiceSpanMouseOver);
      bodyScriptArticleRef.current?.removeEventListener('mouseout', handleVoiceSpanMouseOut);
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
        <article key={`question: ${note.id}`} contentEditable={status.isEditing} ref={questionArticleRef}
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
        <article key={`body_script: ${note.id}`} contentEditable={status.isEditing} ref={bodyScriptArticleRef} onClick={onBodyScriptPreviewClick}
                 className={`prose text-inherit dark:text-primary m-auto max-w-4xl ${status.isEditing ? 'cursor-text transition-colors' : ''}`}
                 dangerouslySetInnerHTML={bodyScriptWithHTMLEntityEncodeObject}/>
        {/*
          dangerouslySetInnerHTML={{__html: getBodyScriptWithHTMLEntityEncode()}} 创建了一个新对象
          React 检测到 dangerouslySetInnerHTML 的值变了（新对象引用）
          React 重新设置 innerHTML，销毁旧 DOM，创建新 DOM
          鼠标仍在原位置，新的 span 出现在鼠标下方
          触发 mouseover 事件
          调用 setPopperAnchorEl
          回到步骤 1，无限循环！
          */}
      </>
    }

    <PopperToolbar mouseOffsetX={mouseOffsetX}/>
  </>);
}