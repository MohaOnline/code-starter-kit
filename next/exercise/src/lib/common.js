

/**
 * Extracts the file name from the stack trace where the given function is invoked.
 *
 * @param {Function} fn - The function whose stack trace will be used to find the file name.
 * @return {string|null} The file name as a string if available, otherwise null.
 */
function getFileNameFromStack(fn) {
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
