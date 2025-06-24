'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export const HowlerVoicePlayer = ({ audioFiles, onComplete, interval = 1000 }) => {
  const queueRef = useRef([]);
  const currentIndexRef = useRef(0);
  const isCleanedRef = useRef(false);
  const durationsRef = useRef([]); // 存储每个音频的时长

  useEffect(() => {
    isCleanedRef.current = false;

    // 初始化音频队列
    queueRef.current = audioFiles.map(
        (file, index) => {
          const howl = new Howl({
            src: [file],
            format: file.endsWith('.wav') ? 'wav' : 'mp3',
            onload: () => {
              // 音频加载完成后存储时长（转换为毫秒）
              durationsRef.current[index] = howl.duration() * 1000;
            },

            onend: () => {
              if (isCleanedRef.current) return;

              // 当前音频播放完成，等待 interval 毫秒后播放下一个
              if (currentIndexRef.current < queueRef.current.length - 1) {
                setTimeout(() => {
                  currentIndexRef.current += 1;
                  queueRef.current[currentIndexRef.current].play();
                }, durationsRef.current[index] + interval);
              } else {
                // 队列播放完成，触发 onComplete
                onComplete();
              }
            },

            onerror: (error) => {
              console.error('音频播放错误:', file, error);
            },
          });

          return howl;
        }
    );

    // 播放第一个音频，后面的通过
    if (queueRef.current.length > 0) {
      currentIndexRef.current = 0;
      queueRef.current[0].play();
    }

    // 清理
    return () => {
      isCleanedRef.current = true;
      queueRef.current.forEach((howl) => howl.unload());
    };
  }, [audioFiles, onComplete, interval]);

  return null; // 无需渲染 UI，纯逻辑组件
};
