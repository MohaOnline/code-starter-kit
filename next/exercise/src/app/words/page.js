'use client';

// ①②③④⑤⑥⑦⑧⑨⑩

import React, {useEffect, useState} from 'react';
import {FaPlay, FaPause} from 'react-icons/fa';

import {handleKeyDown} from '../lib/common';

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
        <div className="flex h-screen w-screen
              flex-col
              orientation-landscape:flex-row
              lg:flex-row"
        >
          {/* 主内容 */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 border-b">top</div>
            <div className="flex-1 border-b">middle</div>
            <div className="flex-1">bottom</div>
          </div>

          {/* 工具条 */}
          <div className="
          flex shrink-0
          flex-row items-center justify-around
          h-16 w-full
          orientation-landscape:flex-col
          orientation-landscape:w-16 orientation-landscape:h-full
          lg:flex-col lg:w-16 lg:h-full
          bg-slate-900 text-white
        "
          >
            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded">A</button>
            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded">B</button>
            <button className="size-10 orientation-landscape:size-12 lg:size-10 bg-slate-700 rounded">C</button>
          </div>
        </div>

      </React.Fragment>
  );
}
