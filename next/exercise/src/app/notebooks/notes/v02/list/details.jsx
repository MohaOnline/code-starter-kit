import React, {useCallback, useEffect, useRef} from "react";
import {Button, Typography} from "@mui/material";

import he from 'he'
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
  // <pre><code> 里的内容没有做 < & 转义处理，显示前先做转义处理
  const getBodyScriptWithHTMLEntityEncode = useCallback(() => {
    // const regex = /<pre><code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code><\/pre>/gs;
    const regex = /<code(?:\s+class=(?:"[^"]*"|'[^']*'))?>(.*?)<\/code>/gs;
    return note?.body_script?.replace(regex, (match, content) => {
      const encodedContent = he.encode(content, {useNamedReferences: true});
      return match.replace(content, encodedContent);
    });
  }, [note.body_script]);
  const contentRef = useRef(null);
  const highlightHandler = useCallback(function () {
    const container = contentRef.current;
    if (!container) {
      return;
    }
    const all = [...container.querySelectorAll('pre > code:not([data-highlighted="yes"])')]
    const outermost = all.filter(el => !all.some(other => other !== el && other.contains(el)))
    outermost.forEach(el => {
      hljs?.highlightElement(el); // 或 hljs.highlightAllUnder(container);
    });
  }, [contentRef.current]);
  useEffect(() => {
    highlightHandler();
  });

  // 计算点击位置在原始 HTML Code 中的偏移量
  // 原理：过滤掉 <...> 中的内容，折算 &...; 的内容。
  const getHTMLOffsetFromClick = useCallback((event) => {
    let range;
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(event.clientX, event.clientY);
    }
    else if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(event.clientX, event.clientY);
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true); // 变成一个光标（无长度的 Range）
    }

    console.log(range);

    if (!range || !contentRef.current) return 0;

    // 创建一个从容器开始到点击位置的范围
    const containerRange = document.createRange();
    containerRange.setStart(contentRef.current, 0);
    containerRange.setEnd(range.startContainer, range.startOffset);

    // 获取范围内的纯文本内容
    const string2Caret = containerRange.toString();

    const htmlContent = note?.body_script || '';
    // const htmlContent = getBodyScriptWithHTMLEntityEncode() || '';

    // 更精确的文本位置映射算法
    let htmlIndex = 0;
    let textIndex = 0;
    let inTag = false;
    let tagLength = 0;
    let inEntity = false;
    let inCode = false;
    let entityBuffer = '';

    while (htmlIndex < htmlContent.length && textIndex < string2Caret.length) {
      const htmlChar = htmlContent[htmlIndex];

      // console.log(htmlChar, htmlIndex, textIndex, inTag, inEntity, tagLength);

      // 处理 HTML 标签
      if (htmlChar === '<' && !inEntity) {
        inTag = true;
        htmlIndex++;
        tagLength++;
        continue;
      }

      if (inTag && htmlChar === '>') {
        // 回溯 tag 如果全部出现在页面文字中，则跳过这部分，应该是在 <code> 块里的代码没有转义 <...> 这类tag，算作代码中的可见字符串。
        // console.log(textIndex, tagLength + 1, string2Caret.slice(textIndex, textIndex + tagLength + 1));
        // console.log(htmlIndex, tagLength + 1, htmlContent.slice(htmlIndex - tagLength, htmlIndex + 1));
        if (textIndex + tagLength < string2Caret.length
          && string2Caret.slice(textIndex, textIndex + tagLength + 1) === htmlContent.slice(htmlIndex - tagLength, htmlIndex + 1)) {
          textIndex += tagLength + 1;
        }
        inTag = false;
        tagLength = 0;
        htmlIndex++;
        continue;
      }

      if (inTag) {

        htmlIndex++;
        tagLength++;
        continue;
      }

      // 处理 HTML 实体
      if (htmlChar === '&' && !inTag) {
        inEntity = true;
        entityBuffer = '&';
        htmlIndex++;
        continue;
      }

      if (inEntity) {
        entityBuffer += htmlChar;
        console.log(entityBuffer);
        if (htmlChar === ';') {
          // 实体结束，解码并比较
          const decoded = he.decode(entityBuffer);
          if (textIndex < string2Caret.length && decoded === string2Caret[textIndex]) {
            textIndex++;
          }
          inEntity = false;
          entityBuffer = '';
        }
        htmlIndex++;
        continue;
      }

      // 普通字符比较
      if (textIndex < string2Caret.length && htmlChar === string2Caret[textIndex]) {
        textIndex++;
      }

      htmlIndex++;
    }

    // 返回在原始 HTML 中的位置
    return Math.max(0, htmlIndex);
  }, [note?.body_script]);

  // 处理预览区域点击事件
  const handlePreviewClick = useCallback((event) => {
    if (!status.isEditing) return; // 只在编辑模式下响应

    const offset = getHTMLOffsetFromClick(event);

    // 将光标位置传递给编辑器
    setStatus(prev => ({
      ...prev,
      cursorPositionBodyScript: offset,
    }));
  }, [status.isEditing, getHTMLOffsetFromClick, setStatus]);

  // 没有 currentNoteId 就显示笔记一览
  const click2List = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      isEditing: false,
      currentNoteId: '',
    }))
  }, [setStatus]);

  const Operations = React.memo(() => {
    return (
      <div className={'gap-2 flex flex-row justify-end sticky top-0 z-10'}>
        {!status.isEditing && // 编辑的时候不需要操作按钮，整个 Details 变成预览。
          <Button sx={{
            backgroundColor: 'success.light', // @see https://mui.com/material-ui/customization/default-theme/
            '&:hover': { // 鼠标悬停
              backgroundColor: 'success.dark',
              color: 'error.contrastText',
            },
          }} ref={editButtonRef} className={''} variant="contained" onClick={status.setEditing}>Edit</Button>
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
    );
  })

  return (<>
    {/*Title*/}
    <Typography variant="h1" gutterBottom sx={{textAlign: "center"}}>{note.title}<sup>(ID: {note.id})</sup></Typography>
    <Operations/>

    {(note.tid === '999' || note.type_id === '999' || note.type_id === '997' ||
        note.type_id === '61' || note.tid === '61' ||
        note.type_id === '31' || note.tid === '31' ||
        note.type_id === '21' || note.tid === '21') &&
      <>
        <article contentEditable={status.isEditing} ref={contentRef} onClick={handlePreviewClick}
                 className={`prose text-inherit dark:text-primary m-auto max-w-4xl ${status.isEditing ? 'cursor-text transition-colors' : ''}`}
                 dangerouslySetInnerHTML={{__html: getBodyScriptWithHTMLEntityEncode()}}/>
      </>
    }

  </>);
}