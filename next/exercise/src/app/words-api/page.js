'use client';

import React, {useEffect, useRef, useState} from 'react';
import {FaPlay, FaPause} from 'react-icons/fa';

import {handleKeyDown} from '../words/components/common';

export default function Notebook() {

  const [status, setStatus] = useState({
    currentWordIndex: 0,
    isPlaying: false,
  });

  const [words, setWords] = useState([]);
  const audioRef = useRef(null);

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

  //
  useEffect(() => {
    const fetchWords = async () => {

      const response = await fetch('/api/words');
      const json = await response.json();

      if (json.success) {
        setWords(json.data);
      } else {
        throw new Error('API 返回错误：success 为 false');
      }

    };

    fetchWords();
  }, []);

  // 当 current 或 words 改变时播放音频
  useEffect(() => {
    if (words.length > 0 && words[status.currentWordIndex]?.voice_id_us) {

      const firstChar = words[status.currentWordIndex].voice_id_us[0].toLowerCase();
      const audio = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${words[status.currentWordIndex].voice_id_us}.wav`;

      // 停止当前音频
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

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
  }, [status, words]);

  if (words.length === 0) return <div>Loading...</div>;

  return (
      <React.Fragment>
        <div className={'word-container'} style={{
          display: 'grid',
          'place-items': 'center',
          'font-size': '34px',
          margin: 'auto',
          width: '800px',
          'text-align': 'center',
          'font-family': 'serif',
          'background-color': 'black',
          color: 'rgb(120, 210, 120)',
          height: '85vh',
        }}>
          <div>
          <div style={{
            opacity: 0.6,
          }} dangerouslySetInnerHTML={{
            __html: words[status.currentWordIndex].phonetic_us ||
                words[status.currentWordIndex].phonetic_uk || '&nbsp;',
          }}></div>
          <div
              style={{
                margin: '0 0 0 0',
                'font-size': '60px',
                'letter-spacing': '3px',
              }}>{words[status.currentWordIndex].word}</div>

          {/*<div dangerouslySetInnerHTML={{*/}
          {/*  __html: words[status.currentWordIndex].accent ||*/}
          {/*      words[status.currentWordIndex].word,*/}
          {/*}}/>*/}

          <div
              style={{
                margin: '50px 0 0 0',
                'font-size': '28px',
                opacity: 0.6,
              }}>{words[status.currentWordIndex].part_of_speech
              ? '[' +
              words[status.currentWordIndex].part_of_speech + ']'
              :
              '[组]'} {words[status.currentWordIndex].translation}</div>

          <div></div>
          </div>
        </div>

        <div onClick={(event) => {
          event.key = ' ';
          keyDownCallback(event);
        }}>{status.isPlaying ?
            <FaPause/> : <FaPlay/>}</div>


      </React.Fragment>
  );
}
