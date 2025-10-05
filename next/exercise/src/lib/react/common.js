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
      event.preventDefault(); // 阻止浏览器默认的保存行为
      // 模拟点击保存按钮
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  }
};