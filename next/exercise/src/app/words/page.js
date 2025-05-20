'use client';

import React, {useEffect, useState} from 'react';
import {handleKeyDown} from './components/common';

import list from './CET4_T.json';

export default function Words() {

  const [status, setStatus] = useState({
    currentWordIndex: 0,
    isPlaying: true,
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

  // 是否自动播放单词
  useEffect(() => {

    let timer;

    if (status.isPlaying) {
      timer = setInterval(() => {
        console.debug('auto next word.');

        setStatus({
          ...status, // 复制现有状态
          currentWordIndex: status.currentWordIndex + 1, // 更新 currentWord
        });
      }, 2000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  });

  return (
      <React.Fragment>
        <div>{list[status.currentWordIndex].name}</div>
        <div>{list[status.currentWordIndex].trans.join(', ')}</div>
      </React.Fragment>
  );
}
