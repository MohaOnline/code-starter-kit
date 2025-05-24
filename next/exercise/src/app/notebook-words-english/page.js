'use client';
import './page.css';

import React, {useEffect, useRef, useState} from 'react';
import {FaPlay, FaPause} from 'react-icons/fa';
import {Dialog, Transition} from '@headlessui/react';

import {handleKeyDown} from '../words/components/common';

export default function Page() {
  const [status, setStatus] = useState({
    currentWordIndex: 0,
    playedWordIndex: -1,
    isPlaying: false,
    words: [],
    isDialogOpen: false,
    dialogData: {},
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

      if (status.isPlaying !== false || status.currentWordIndex !==
          status.playedWordIndex) {

        audioRef.current = new Audio(audio);

        // 监听音频元数据加载以获取时长
        audioRef.current.addEventListener('loadedmetadata', () => {
          const duration = audioRef.current.duration * 1000; // 转换为毫秒

          console.debug('Audio duration:', duration);
          console.debug('isPlaying;', status.isPlaying);
          console.debug('currentWordIndex;', status.currentWordIndex);
          console.debug('playedWordIndex:', status.playedWordIndex);

          // 播放音频
          audioRef.current.play().catch(error => {
            console.error('Audio playback failed:', error);
          });

          status.playedWordIndex = status.currentWordIndex;
          setStatus({
            ...status, // 复制现有状态
            playedWordIndex: status.currentWordIndex,
          });

          // 监听音频播放结束
          const handleAudioEnded = () => {
            console.debug('Audio ended');
            console.debug('playedWordIndex:', status.playedWordIndex);

            // 音频播放完毕后开始计时，播放到最后单词时停止。
            intervalRef.current = setInterval(() => {
              if (status.isPlaying) {
                if (status.currentWordIndex + 1 <= status.words.length - 1) {
                  setStatus({
                    ...status, // 复制现有状态
                    currentWordIndex: status.currentWordIndex + 1, // 更新 currentWord
                  });
                } else {
                  setStatus({
                    ...status, // 复制现有状态
                    isPlaying: !status.isPlaying,
                  });
                }

              }
            }, duration); // 使用音频时长作为延迟
          };

          audioRef.current.addEventListener('ended', handleAudioEnded);

          // 清理音频事件监听
          return () => {
            audioRef.current.removeEventListener('ended', handleAudioEnded);
          };
        });
      }

      // 清理函数
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [status.isPlaying, status.currentWordIndex]);

  const searchEdit = async (word) => {
    try {
      if (!status.dialogData.word) {
        setStatus({...status, dialogData: {word: word}});
      }
    } catch (error) {
      console.error('Failed to search word:', error);
    }
  };

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
                className={'translation'}>{status.words[status.currentWordIndex].pos
                ? '[' +
                status.words[status.currentWordIndex].pos + ']'
                :
                '[组]'} {status.words[status.currentWordIndex].translation}</div>

            <div></div>
          </div>
        </div>

        <div className={'text-center'} onClick={(event) => {
          event.key = ' ';
          keyDownCallback(event);
        }}>{status.isPlaying ?
            <FaPause/> : <FaPlay/>}
        </div>

        <div className="text-right">
          <button
              onClick={() => setStatus({
                ...status, // 复制现有状态
                isDialogOpen: true,
              })}
              className="px-4 py-2 bg-gray-800 text-green-900 rounded hover:bg-gray-600"
          >
            Add
          </button>
        </div>

        <Transition show={status.isDialogOpen}>
          <Dialog onClose={() => setStatus({
            ...status, // 复制现有状态
            isDialogOpen: false,
          })} className="relative z-50">

            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
            <div
                className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel
                  className="bg-gray-600 rounded-lg p-6 max-w-lg w-full">
                <input
                    type="text"
                    defaultValue={status.dialogData.word
                        ? status.dialogData.word
                        : status.words[status.currentWordIndex].word}
                    onBlur={(e) => searchEdit(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter word to search"
                />

                <div className="flex justify-end gap-2">
                  <button
                      onClick={() => {
                        status.dialogData.word = '';
                        setStatus({
                          ...status, // 复制现有状态
                          isDialogOpen: false,
                        });
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </div>

          </Dialog>
        </Transition>
      </>
  );
}
