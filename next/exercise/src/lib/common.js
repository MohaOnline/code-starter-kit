import he from "he";


/**
 * Extracts the file name from the stack trace where the given function is invoked.
 *
 * @return {string|null} The file name as a string if available, otherwise null.
 */
function getFileNameFromStack() {
  try {
    const originalPrepare = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };

    const err = new Error();
    const stack = err.stack;

    Error.prepareStackTrace = originalPrepare;

    if (stack && stack[1]) {
      return stack[1].getFileName();
    }
  } catch (e) {
    // 在某些环境下可能不支持
  }
  return null;
}

// 事件处理函数工厂
export const bindCtrlCmdShortcut2ButtonClickFactory = (buttonRef, key) => {
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
};

export const bindCtrlCmd2FunctionFactory = (func, key) => {
}

export const bindShortcut2ButtonClickFactory = (buttonRef, key, ctrl = false, meta = false, option = false, shift = false) => {
  return (event) => {
    const keys = (!ctrl || (ctrl && event.ctrlKey))
      && (!meta || (meta && event.metaKey))
      && (!option || (option && event.altKey))
      && (!shift || (shift && event.shiftKey))
    ;
    console.log('bindCtrlCmdShortcut2ButtonClickFactory', keys);
    // 检查是否按下了 Ctrl+S (Windows/Linux) 或 Cmd+S (Mac)
    if (keys && event.key === key) {
      // 中文输入法时 Esc 键退出中文输入状态。
      if (event.key === 'Escape' && window.isComposing) {
        return;
      }
      event.preventDefault(); // 阻止浏览器默认的保存行为
      // 模拟点击保存按钮
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  }
};

// 标记中文输入法输入面板开启、未开启状态。
const composingStart = () => {
  window.isComposing = true;
}
const composingEnd = () => {
  window.isComposing = false;
}
export const registerComposingMarker = () => {
  document.addEventListener("compositionstart", composingStart);
  document.addEventListener("compositionend", composingEnd);
}
export const unregisterComposingMarker = () => {
  document.removeEventListener("compositionstart", composingStart);
  document.removeEventListener("compositionend", composingEnd);
}

// 点击页面内容计算 HTML code 中的位置
export const calculateHTMLOffsetFromDomClick = (event, element, html) => {
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

  if (!range || !element) return 0;

  // 创建一个从容器开始到点击位置的范围
  const containerRange = document.createRange();
  containerRange.setStart(element, 0);
  containerRange.setEnd(range.startContainer, range.startOffset);

  // 获取范围内的纯文本内容
  const string2Caret = containerRange.toString();

  const htmlContent = html || '';
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
};