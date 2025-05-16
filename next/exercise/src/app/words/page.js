'use client';

import React, {useEffect, useState} from 'react';
import {handleKeyDown} from './components/common';

import list from './CET4_T.json';

export default function Words() {

  const [status, setStatus] = useState({
    currentWord: 0,
  });

  // 键盘事件处理
  useEffect(() => {

    // 打包 app 状态
    const keyDownCallback = (event) => handleKeyDown(event, status, setStatus);

    // 添加键盘事件监听器
    document.addEventListener('keydown', keyDownCallback);

    // 清理函数（组件卸载时移除键盘监听器）
    return () => {
      document.removeEventListener('keydown', keyDownCallback);
    };

  });

  return (
      <React.Fragment>
        <div>{list[status.currentWord].name}</div>
        <div>{list[status.currentWord].trans.join(', ')}</div>
      </React.Fragment>
  );
}

export {FuncSample};
