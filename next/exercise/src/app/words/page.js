'use client';

import React, {useEffect, useState} from 'react';
import {FaPlay, FaPause} from 'react-icons/fa';

import {handleKeyDown} from './components/common';

import list from './CET4_T.json';

export default function Words() {

  const [status, setStatus] = useState({
    currentWordIndex: 0,
    isPlaying: false,
  });

  // 打包 app 状态给键盘处理函数
  const keyDownCallback = (event) => handleKeyDown(event, status, setStatus);

  // 键盘事件处理
  useEffect(() => {

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
        rɪˈsɔːs
        <div onClick={(event) => {
          event.key = ' ';
          keyDownCallback(event);
        }}>{status.isPlaying ?
            <FaPause/> : <FaPlay/>}</div>

        <p>
          <span data-type="sentence">红海早过了。</span>
          <span data-type="sentence">船在印度洋面上开驶着。</span>
          <span
              data-type="sentence">但是太阳依然不饶人地迟落早起侵占去大部分的夜。</span>
        </p>
      </React.Fragment>
  );
}
