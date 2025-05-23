'use client';
import './page.css';

import React, {useEffect, useRef, useState} from 'react';
import {FaPlay, FaPause} from 'react-icons/fa';

import {handleKeyDown} from '../words/components/common';

export default function Page() {
  const [status, setStatus] = useState({
    currentWordIndex: 0,
    isPlaying: false,
    words: [],
  });

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

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

  // 获取单词
  useEffect(() => {
    const fetchWords = async () => {

      const response = await fetch('/api/notebook-words-english');
      const json = await response.json();

      if (json.success) {
        setStatus({
          ...status, // 复制现有状态
          words: json.data,
        });
      } else {
        console.error('API 报错');
        throw new Error('API 返回错误：success 为 false');
      }

    };

    fetchWords();
  }, []);

  // 播放音频: 当 currentWordIndex 或 words 改变时
  useEffect(() => {
    if (status.words.length > 0 &&
        status.words[status.currentWordIndex]?.voice_id_us) {
      
      // 清理现有定时器和音频
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const firstChar = status.words[status.currentWordIndex].voice_id_us[0].toLowerCase();
      const audio = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${status.words[status.currentWordIndex].voice_id_us}.wav`;

      // 停止当前音频
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // if (status.isPlaying) {
      // }
      // 创建新的音频实例
      audioRef.current = new Audio(audio);

      // 播放音频
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });

      // 清理函数
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [status.isPlaying, status.currentWordIndex]);

  if (status.words?.length === 0) return <div>Loading...</div>;

  return (
      <>
        <div className={'word-container'}>
          <div>
            <div style={{
              opacity: 0.6,
            }} dangerouslySetInnerHTML={{
              __html: status.words[status.currentWordIndex].phonetic_us ||
                  status.words[status.currentWordIndex].phonetic_uk || '&nbsp;',
            }}></div>
            <div
                className={'word'}>{status.words[status.currentWordIndex].word}</div>

            <div
                className={'translation'}>{status.words[status.currentWordIndex].part_of_speech
                ? '[' +
                status.words[status.currentWordIndex].part_of_speech + ']'
                :
                '[组]'} {status.words[status.currentWordIndex].translation}</div>

            <div></div>
          </div>
        </div>

        <div onClick={(event) => {
          event.key = ' ';
          keyDownCallback(event);
        }}>{status.isPlaying ?
            <FaPause/> : <FaPlay/>}</div>
      </>
  );
}
