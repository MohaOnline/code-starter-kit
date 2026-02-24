"use client";
import "./page.css";

import React, {useEffect, useRef, useState} from "react";

import {
  Bs0SquareFill, Bs1SquareFill, Bs2SquareFill, Bs3SquareFill, Bs4SquareFill, Bs5SquareFill, Bs6SquareFill, Bs7SquareFill, Bs8SquareFill, Bs9SquareFill,
  Bs0Square, Bs1Square, Bs2Square, Bs3Square, Bs4Square, Bs5Square, Bs6Square, Bs7Square, Bs8Square, Bs9Square, BsPrinter,
} from 'react-icons/bs';
import {CgPlayTrackNextR, CgPlayTrackPrevR} from "react-icons/cg";
import {CiEdit} from "react-icons/ci";
import {FaEdit, FaPlay, FaPause, FaTrash, FaVolumeUp, FaSync, FaSearch, FaPrint} from 'react-icons/fa';
import {FiPrinter} from 'react-icons/fi';
import {GiPlayerPrevious, GiPlayerNext, GiGears} from "react-icons/gi";
import {LuSquarePlay} from "react-icons/lu";
import {MdOutlineRecordVoiceOver} from 'react-icons/md';
import {PiHandWaving, PiRocket, PiGearFineLight, PiGear} from "react-icons/pi";
import {RiFileSearchLine} from "react-icons/ri";

import {Dialog, Transition} from "@headlessui/react";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Shadcn UI 组件
import {
  Dialog as ShadcnDialog,
  DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {Slider} from "@/components/ui/slider";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";

import {useStatus} from "@/app/lib/atoms";
import {handleKeyDown} from "@/app/lib/common";
import NavTop from "@/app/lib/components/NavTop.jsx";
import {VoicePlayerWithMediaSession} from "@/app/lib/VoicePlayerWithMediaSession.js";
import ModeToggle from "@/components/mode-toggle";
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";
import {useWordOperations} from '@/app/notebooks/words/english/common';


// 默认音频配置
const DEFAULT_AUDIO_CONFIG = {
  // 全局设置
  alternatePlay: false, // 是否交错播放
  volume: 100, // 音量 50%, 75%, 100%, 125%, 150%
  speed: 100,  // 播放速度 50%, 75%, 100%, 125%, 150%, 175%, 200%, 225%
  batch_quantity: 100, // 批量播放数量
  priorities: [1, 5],
  wordStartIndex: 1,
  // 英文设置
  english: {
    repeatCount: 1, // 发音次数 0-5
    pauseTime: 0, // 停顿时间 0, 0.25, 0.5, 0.75, 1, 1.25 秒
    showText: true, // 是否显示英文
    waitVoiceLength: true, // 是否等待音频时长
  },
  // 中文设置
  chinese: {
    repeatCount: 0, // 发音次数 0-5
    pauseTime: 0, // 停顿时间 0, 0.25, 0.5, 0.75, 1, 1.25 秒
    showText: true, // 是否显示中文
    waitVoiceLength: true, // 是否等待音频时长
  },
};

// 从 localStorage 读取音频配置
const loadAudioConfig = () => {
  try {
    const saved = localStorage.getItem("audioConfig");
    console.log("audioConfig", saved);
    if (saved) {
      const parsed = JSON.parse(saved);
      // 验证配置结构，确保所有必需字段存在
      const config = {
        alternatePlay: parsed.alternatePlay ?? DEFAULT_AUDIO_CONFIG.alternatePlay,
        volume: parsed.volume ?? DEFAULT_AUDIO_CONFIG.volume,
        speed: parsed.speed ?? DEFAULT_AUDIO_CONFIG.speed,
        batch_quantity: parsed.batch_quantity ?? DEFAULT_AUDIO_CONFIG.batch_quantity,
        priorities: parsed.priorities ?? [1, 5],  // word priority
        wordStartIndex: 1,  // 起背单词编号：读取/加载后总是从 1 号单词开始。
        english: {
          repeatCount: parsed.english?.repeatCount ?? DEFAULT_AUDIO_CONFIG.english.repeatCount,
          pauseTime: parsed.english?.pauseTime ?? DEFAULT_AUDIO_CONFIG.english.pauseTime,
          showText: parsed.english?.showText ?? DEFAULT_AUDIO_CONFIG.english.showText,
          waitVoiceLength: parsed.english?.waitVoiceLength ?? DEFAULT_AUDIO_CONFIG.english.waitVoiceLength,
        },
        chinese: {
          repeatCount: parsed.chinese?.repeatCount ?? DEFAULT_AUDIO_CONFIG.chinese.repeatCount,
          pauseTime: parsed.chinese?.pauseTime ?? DEFAULT_AUDIO_CONFIG.chinese.pauseTime,
          showText: parsed.chinese?.showText ?? DEFAULT_AUDIO_CONFIG.chinese.showText,
          waitVoiceLength: parsed.chinese?.waitVoiceLength ?? DEFAULT_AUDIO_CONFIG.chinese.waitVoiceLength,
        },
      };

      console.log("processed audioConfig", config);
      return config;
    }
  }
  catch (error) {
    console.error("读取音频配置失败:", error);
  }
  return DEFAULT_AUDIO_CONFIG;
};

// 保存音频配置到 localStorage
const saveAudioConfig = config => {
  try {
    localStorage.setItem("audioConfig", JSON.stringify(config));
  }
  catch (error) {
    console.error("保存音频配置失败:", error);
  }
};

export default function Page() {

  const [status, setStatus] = useState({
    currentWordIndex: 0,
    playedWordIndex: -1,
    playedWordCounter: 1, // 已播放单词, 当前显示单词会默认播放一遍。
    playCurrent: null,
    onWheel: false, // 滚动时，不播放录音。
    isPlaying: false,
    words: [],
    originalWords: [],
    isDialogOpen: false,
    dialogData: {translations: []},
    isProcessing: false,
    isComposing: false,
    isTabPressed: false,
    searchText: "",
    // 配置对话框状态
    isConfigDialogOpen: false,
    // 音频配置（初始化时使用默认值，将在 useEffect 中从 localStorage 读取）
    audioConfig: DEFAULT_AUDIO_CONFIG,
    prioritiesIndices: {},
  });

  // 更新 priority
  const {handlePriority} = useWordOperations(status, setStatus);

  // 更新音频配置并保存到 localStorage
  const updateAudioConfig = newConfig => {
    setStatus(prev => ({
      ...prev,
      audioConfig: newConfig,
    }));
    saveAudioConfig(newConfig);
  };

  // 打印单词函数
  const handlePrint = () => {
    const startIndex = status.audioConfig.wordStartIndex - 1;
    const quantity = status.audioConfig.batch_quantity;
    const wordsToPrint = status.words.slice(startIndex, startIndex + quantity);

    if (wordsToPrint.length === 0) {
      toast.error('没有可打印的单词');
      return;
    }

    // 创建打印内容
    const printWindow = window.open('', '_blank');
    const tableRows = wordsToPrint.map((word, index) => {
      const rowNumber = index + 1;
      const shouldBreak = rowNumber % 25 === 0 && rowNumber !== wordsToPrint.length;

      return `
      <tr class="${shouldBreak ? 'page-break' : ''}">
        <td>${startIndex + index + 1}</td>
        <td>${word.phonetic_uk || word.phonetic_us || ''}</td>
        <td><strong>${word.word}</strong></td>
        <td>${word.pos || ''}</td>
        <td>${word.translation || ''}</td>
        <td>${word.note || ''}</td>
      </tr>
      `;
    }).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>单词打印 - 第 ${startIndex + 1} 到 ${startIndex + wordsToPrint.length} 个</title>
        <style>
          @media print {
            @page {
              margin: 0.5cm;
            }
            .page-break {
              page-break-after: always;
              break-after: page;
            }
          }
          body {
            font-family: Arial, "Microsoft YaHei", sans-serif;
            margin: 5px;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            /*margin-top: 5px;*/
          }
          th, td {
            border: 1px solid #333;
            padding: 2px;
            text-align: left;
            font-size: 16px;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <table>
<!--          <thead>-->
<!--            <tr>-->
<!--              <th>#</th>-->
<!--              <th>音标</th>-->
<!--              <th>拼写</th>-->
<!--              <th>P</th>-->
<!--              <th>中文</th>-->
<!--              <th>Notes</th>-->
<!--            </tr>-->
<!--          </thead>-->
          <tbody>
            ${tableRows}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            // 打印完成后关闭窗口（可选）
            // window.onafterprint = function() { window.close(); };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // 关闭对话框
    setStatus(prev => ({...prev, isPrintDialogOpen: false}));
  };

  const keyDownCallback = event => handleKeyDown(event, status, setStatus);
  const keyUpCallback = event => handleKeyUp(event, status, setStatus);

  const handleKeyUp = (event, status, setStatus) => {
    if (event.key === "Tab") {
      console.debug("Tab Up");
      status.isTabPressed = false;
      setStatus({
        ...status, // 复制现有状态
      });
    }
  };

  // 键盘事件处理
  useEffect(() => {
    // 处理中文输入法 ESC 意外关闭 Dialog
    const handleCompositionStart = () => {
      setStatus({...status, isComposing: true});
    };

    const handleCompositionEnd = () => {
      setStatus({...status, isComposing: false});
    };

    // 添加键盘事件监听器
    document.addEventListener("keydown", keyDownCallback);
    document.addEventListener("keyup", keyUpCallback);
    document.addEventListener("compositionstart", handleCompositionStart);
    document.addEventListener("compositionend", handleCompositionEnd);

    // 清理函数（组件卸载时移除键盘监听器）
    return () => {
      document.removeEventListener("keydown", keyDownCallback);
      document.removeEventListener("keyup", keyUpCallback);
      document.removeEventListener("compositionstart", handleCompositionStart);
      document.removeEventListener("compositionend", handleCompositionEnd);
    };
  });

  // // 保存当前播放索引到 localStorage
  // useEffect(() => {
  //   // localStorage.setItem('wordStatus', JSON.stringify(status));
  //   localStorage.setItem('wordStatus', status.currentWordIndex);
  // }, [status.currentWordIndex]);

  // 获取单词
  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch("/api/notebook-words-english", {
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) {
        try {
          let savedIndex = 0;
          savedIndex = parseInt(localStorage.getItem("wordStatus"), 10);
          if (isNaN(savedIndex)) {
            savedIndex = 0;
          }
          status.currentWordIndex = savedIndex;
        }
        catch (e) {
        }

        // status.words = json.data;
        status.originalWords = json.data;
        const [priority_from, priority_to] = status.audioConfig.priorities;
        status.words = status.originalWords.filter(
            word => (word.priority >= priority_from && word.priority <=
                priority_to));

        if (status.words.length <= status.currentWordIndex) {
          status.currentWordIndex = status.words.length - 1;
        }
        setStatus(prev => ({
          ...prev, // 复制现有状态
          currentWordIndex: status.currentWordIndex,
          originalWords: status.originalWords,
          words: status.words,
        }));
      }
      else {
        console.error("API 报错");
        toast.error("cant load words from API.");
      }

      // try {
      //   const savedStatus = (localStorage.getItem('wordStatus')) ? JSON.parse(
      //       localStorage.getItem('wordStatus')) : {};
      //   console.log(savedStatus);
      //
      //   if (savedStatus.words?.length > 0) {
      //     status.currentWordIndex = (savedStatus.currentWordIndex >=
      //         json.data.length)
      //         ? json.data.length - 1
      //         : savedStatus.currentWordIndex;
      //   } else {
      //     status.currentWordIndex = 0;
      //   }
      // } catch (error) {
      //   console.error('localStorage 获取失败:', error);
      // }
    };

    fetchWords();

    const savedConfig = loadAudioConfig();
    console.log("savedConfig", savedConfig);
    status.audioConfig = savedConfig;
    setStatus(prev => ({
      ...prev,
      audioConfig: savedConfig,
    }));
  }, []);

  // Turn current word to next.
  const autoNextWord = () => {
    if (status.isPlaying) {
      // 单词是否自动播放
      nextWord();
    }
  };

  // const nextWord = () => {
  //   playedWordCounter 从 0 到 25（指定播放个数），到了以后退回到起始单词再次播放。
  //   if (status.audioConfig.batch_quantity !== 175 && status.audioConfig.batch_quantity <= status.playedWordCounter) {
  //     const nextIndex = status.currentWordIndex < status.audioConfig.batch_quantity ? status.currentWordIndex + status.words.length - status.audioConfig.batch_quantity
  //         : status.currentWordIndex - status.audioConfig.batch_quantity;
  //     setStatus(prev => ({
  //       ...prev,
  //       currentWordIndex: nextIndex,
  //       playedWordCounter: 0,
  //     }));
  //   }
  //   else if (status.currentWordIndex < status.words.length - 1) {
  //     setStatus(prev => ({
  //       ...prev,
  //       currentWordIndex: prev.currentWordIndex + 1,
  //       playedWordCounter: prev.playedWordCounter + 1,
  //     }));
  //   }
  //   else {
  //     setStatus(prev => ({
  //       ...prev,
  //       currentWordIndex: 0,
  //       playedWordCounter: prev.playedWordCounter + 1,
  //     }));
  //   }
  // };

  const nextWord = () => {
    setStatus(prev => {
      const isInfiniteMode = prev.audioConfig.batch_quantity === 175;
      const batchSize = prev.audioConfig.batch_quantity;
      const totalWords = prev.words.length;

      // 无限模式：顺序播放，到末尾循环
      if (isInfiniteMode) {
        const nextIndex = (prev.currentWordIndex + 1) % totalWords;
        return {
          ...prev,
          currentWordIndex: nextIndex,
          playedWordCounter: prev.playedWordCounter + 1,
        };
      }

      // 分批模式：播放指定数量后跳到下一批
      const startWordIndex = status.audioConfig.wordStartIndex - 1;

      // // 当前批次还没播完
      // if ((prev.playedWordCounter) < batchSize) {
      //   const nextIndex = (prev.currentWordIndex + 1) % totalWords;
      //   return {
      //     ...prev,
      //     currentWordIndex: nextIndex,
      //     playedWordCounter: prev.playedWordCounter + 1,
      //   };
      // }
      //
      // // 当前批次播完了，回到该批次头部开始重放
      // const backTimes = batchSize % totalWords === 0 ? batchSize : batchSize % totalWords;
      // // const nextIndex = (prev.currentWordIndex + 1) % totalWords;
      // const nextIndex = prev.currentWordIndex >= batchSize - 1 ? prev.currentWordIndex - (batchSize - 1) :
      //     prev.currentWordIndex + totalWords - (backTimes - 1);
      // return {
      //   ...prev,
      //   currentWordIndex: nextIndex,
      //   playedWordCounter: 1, // 重置计数器
      // };

      if ((startWordIndex + prev.audioConfig.batch_quantity) > (prev.words.length - 1)
          && (prev.currentWordIndex === prev.words.length - 1)) {
        return {
          ...prev,
          currentWordIndex: 0,
          playedWordCounter: prev.playedWordCounter + 1,
        };
      }
      /* 0 1 2 3 4 5
                 ^     4 => [0,1,4,5] */
      else if ((startWordIndex + batchSize) <= totalWords - 1
          && prev.currentWordIndex >= startWordIndex && prev.currentWordIndex < startWordIndex + batchSize - 1
          || (startWordIndex + batchSize) > prev.words.length - 1
          && (prev.currentWordIndex < startWordIndex + batchSize - totalWords - 1 || prev.currentWordIndex >= startWordIndex)) { // < 4+4-6-1
        return {
          ...prev,
          currentWordIndex: prev.currentWordIndex + 1,
          playedWordCounter: prev.playedWordCounter + 1, // 重置计数器
        };
      }
      else {

        return {
          ...prev,
          currentWordIndex: startWordIndex,
          playedWordCounter: 1, // 重置计数器
        };
      }
    });
  };

  const playerRef = useRef(null);

  // 初始化播放器
  useEffect(() => {
    playerRef.current = new VoicePlayerWithMediaSession();

    // 设置外部控制回调
    playerRef.current.setExternalControls(
      () => {
        // 上一个单词
        if (status.currentWordIndex > 0) {
          setStatus(prev => ({
            ...prev,
            currentWordIndex: prev.currentWordIndex - 1,
          }));
        }
        else {
          setStatus(prev => ({
            ...prev,
            currentWordIndex: prev.words.length - 1,
          }));
        }
      },
      () => {
        // 下一个单词
        nextWord();
      }
    );

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);
  // 播放音频: 当 currentWordIndex 或 words 改变时
  useEffect(() => {
    // 不播放单词的情况：配置窗口可见时、
    if (!status.isConfigDialogOpen && status.words.length > 0 &&
        status.words[status.currentWordIndex]?.voice_id_uk) {
      // 暂停时不播放声音
      if (status.isPlaying || status.playedWordIndex !== status.currentWordIndex) {
        playCurrentWord(autoNextWord);
        status.playedWordIndex = status.currentWordIndex;
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };

    /*          
          // 清理现有定时器和音频
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
    
          const firstChar = status.words[status.currentWordIndex].voice_id_uk[0].toLowerCase();
          const audio = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${status.words[status.currentWordIndex].voice_id_uk}.wav`;
    
          // 停止当前音频
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
          }
    
          if (!status.onWheel &&
              (status.isPlaying !== false || status.currentWordIndex !==
                  status.playedWordIndex)) {
    
            audioRef.current = new Audio(audio);
    
            // 监听音频元数据加载以获取时长
            audioRef.current?.addEventListener('loadedmetadata', () => {
              const duration = audioRef.current?.duration * 1000 + 500; // 转换为毫秒
    
              console.debug('Audio duration:', duration);
              console.debug('isPlaying;', status.isPlaying);
              console.debug('currentWordIndex;', status.currentWordIndex);
              console.debug('playedWordIndex:', status.playedWordIndex);
    
              if (audioRef.current){          // 播放音频
                audioRef.current.play().catch(error => {
                  console.error('Audio playback failed:', error);
                });
    
                status.playedWordIndex = status.currentWordIndex;
                setStatus({
                  ...status, // 复制现有状态
                  playedWordIndex: status.currentWordIndex,
                });
              }
    
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
                        // isPlaying: !status.isPlaying,
                        currentWordIndex: 0,
                      });
                    }
    
                  }
                }, duration); // 使用音频时长作为延迟
              };
    
              audioRef.current?.addEventListener('ended', handleAudioEnded);
    
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
              audioRef.current.currentTime = 0;
              audioRef.current = null;
            }
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          };
         
        } // if */
  }, [status.isPlaying, status.currentWordIndex]);

  /** 将连续相同的URL交错排列 */
  const alternateVoiceURLs = urls => {
    if (urls.length <= 1) return urls;

    // 分组相同的URL
    const groups = [];
    let currentGroup = [urls[0]];

    for (let i = 1; i < urls.length; i++) {
      if (urls[i] === urls[i - 1]) {
        currentGroup.push(urls[i]);
      }
      else {
        groups.push(currentGroup);
        currentGroup = [urls[i]];
      }
    }
    groups.push(currentGroup);

    // 如果只有一组，直接返回
    if (groups.length === 1) return urls;

    // 交错排列
    const result = [];
    const maxLength = Math.max(...groups.map(group => group.length));

    for (let i = 0; i < maxLength; i++) {
      for (let j = 0; j < groups.length; j++) {
        if (i < groups[j].length) {
          result.push(groups[j][i]);
        }
      }
    }

    return result;
  };

  /** 根据audioConfig生成语音URL数组 */
  const generateVoiceURLs = wordIndex => {
    const word = status.words[wordIndex];
    if (!word?.voice_id_uk) return [];

    let voiceURLs = [];

    if (status.audioConfig.english.repeatCount) {
      const firstChar = word.voice_id_uk[0].toLowerCase();
      const englishURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${word.voice_id_uk}.wav`;
      for (let i = 0; i < status.audioConfig.english.repeatCount; i++) {
        voiceURLs.push(englishURL);
      }
    }

    if (status.audioConfig.chinese.repeatCount && status.audioConfig.chinese.showText) {
      const firstCharChinese = word.voice_id_translation[0].toLowerCase();
      const chineseURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstCharChinese}/${word.voice_id_translation}.wav`;
      for (let i = 0; i < status.audioConfig.chinese.repeatCount; i++) {
        voiceURLs.push(chineseURL);
      }
    }

    // 如果启用交错播放，重新排列URL
    if (status.audioConfig.alternatePlay && voiceURLs.length > 0) {
      voiceURLs = alternateVoiceURLs(voiceURLs);
    }

    return voiceURLs;
  };

  /** 播放当前单词音频。 */
  const playCurrentWord = (onCompleteCallback = () => {
  }) => {
    const voiceURLs = generateVoiceURLs(status.currentWordIndex);
    if (voiceURLs.length > 0 && playerRef.current) {
      const currentWord = status.words[status.currentWordIndex];
      const wordData = {
        word: currentWord.word,
        translation: currentWord.translations?.[0]?.translation || currentWord.translation || "",
        phonetic: currentWord.phonetic_uk || currentWord.phonetic_us || "",
        pos: currentWord.pos || '',
      };

      playerRef.current.stop();
      playerRef.current.setSpeed(status.audioConfig.speed / 100);
      playerRef.current.setVolume(status.audioConfig.volume / 100);
      playerRef.current.setVoiceInterval(
        status.audioConfig.english.waitVoiceLength,
        status.audioConfig.chinese.waitVoiceLength,
        status.audioConfig.english.pauseTime * 1000,
        status.audioConfig.chinese.pauseTime * 1000
      );
      playerRef.current.play(voiceURLs, onCompleteCallback, wordData);
    }
  };
  status.playCurrent = () => playCurrentWord();

  const playCurrentWordOnly = () => {

    if (status.isPlaying) {
      return;
    }

    const word = status.words[status.currentWordIndex];

    let voiceURLs = [];

    if (word?.voice_id_uk) {
      const firstChar = word.voice_id_uk[0].toLowerCase();
      const englishURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${word.voice_id_uk}.wav`;
      for (let i = 0; i < 1; i++) {
        voiceURLs.push(englishURL);
      }
    }

    if (voiceURLs.length > 0 && playerRef.current) {
      const currentWord = status.words[status.currentWordIndex];
      const wordData = {
        word: currentWord.word,
        translation: currentWord.translations?.[0]?.translation || currentWord.translation || "",
        phonetic: currentWord.phonetic_uk || currentWord.phonetic_us || "",
        pos: currentWord.pos || '',
      };

      playerRef.current.stop();
      playerRef.current.setSpeed(status.audioConfig.speed / 100);
      playerRef.current.setVolume(status.audioConfig.volume / 100);
      playerRef.current.setVoiceInterval(
        status.audioConfig.english.waitVoiceLength,
        status.audioConfig.chinese.waitVoiceLength,
        status.audioConfig.english.pauseTime * 1000,
        status.audioConfig.chinese.pauseTime * 1000
      );
      playerRef.current.play(voiceURLs, () => {}, wordData);
    }
  };

  const playCurrentTranslationOnly = (onCompleteCallback = () => {
  }) => {
    const word = status.words[status.currentWordIndex];

    let voiceURLs = [];

    if (word?.voice_id_translation) {
      const firstCharChinese = word.voice_id_translation[0].toLowerCase();
      const chineseURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstCharChinese}/${word.voice_id_translation}.wav`;
      for (let i = 0; i < 1; i++) {
        voiceURLs.push(chineseURL);
      }
    }

    if (voiceURLs.length > 0 && playerRef.current) {
      const currentWord = status.words[status.currentWordIndex];
      const wordData = {
        word: currentWord.word,
        translation: currentWord.translations?.[0]?.translation || currentWord.translation || "",
        phonetic: currentWord.phonetic_uk || currentWord.phonetic_us || "",
        pos: currentWord.pos || '',
      };

      playerRef.current.stop();
      playerRef.current.setSpeed(status.audioConfig.speed / 100);
      playerRef.current.setVolume(status.audioConfig.volume / 100);
      playerRef.current.setVoiceInterval(
        status.audioConfig.english.waitVoiceLength,
        status.audioConfig.chinese.waitVoiceLength,
        status.audioConfig.english.pauseTime * 1000,
        status.audioConfig.chinese.pauseTime * 1000
      );
      playerRef.current.play(voiceURLs, onCompleteCallback, wordData);
    }
  };


  // /**
  //  * 设置优先级。
  //  *
  //  * @param priority
  //  */
  // const handlePriority = async (priority) => {
  //   setStatus({...status, isProcessing: true});
  //
  //   fetch("/api/notebooks/words/update-priority", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       action: "update_priority",
  //       word: status.words[status.currentWordIndex],
  //       value: priority,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (!json.success) {
  //         throw new Error("Failed to set word priority.");
  //       }
  //       toast.success("Successfully set word priority.");
  //       status.words[status.currentWordIndex].priority = priority;
  //     })
  //     .catch(err => {
  //       console.error("Failed to set word priority.");
  //       toast.error("Failed to set word priority.");
  //     })
  //     .finally(() => {
  //       status.isProcessing = false;
  //       setStatus({
  //         ...status,
  //       });
  //     });
  //
  // }

  /**
   * 检索已入库单词
   */
  const searchExistingWordsEnglishChinese = async word => {
    if (!status.isTabPressed) {
      return;
    }
    // search current word
    try {
      const response = await fetch(`/api/words-english-chinese?word=${word}`);
      const data = await response.json();
      console.log(data);

      // 存在的单词压成对象数组在 data.data 中
      if (data?.data.length > 0) {
        setStatus({
          ...status, // 复制现有状态
          isDialogOpen: true,
          dialogData: data.data[0],
        });
        toast.info(`${word} found.`);
      }
      else {
        setStatus({
          ...status, // 复制现有状态
          dialogData: {
            eid: "",
            word: status.dialogData.word,
            accent: "",
            script: "",
            syllable: "",
            translations: [
              {
                id: "",
                cid: "",
                nid: "",
                pos: "",
                phonetic_us: "",
                phonetic_uk: "",
                translation: "",
                script: "",
                noted: false,
                note: "",
                note_explain: "",
              },
            ],
          },
        });
        toast.error(`${word} not found.`);
      }
      // if data.
    }
    catch (error) {
      console.error("Failed to search english-chinese:", error);
      toast.error("查询失败，请检查网络或稍后再试");
    }
    // try {
    //   if (!status.dialogData.word) {
    //     setStatus({...status, dialogData: {word: word}});
    //   }
    // } catch (error) {
    //   console.error('Failed to search word:', error);
    // }
  };

// 改变priority filter 单词时也会有无单词的情况，不需要单独loading界面。
//  if (status.words?.length === 0) return <div>Loading...</div>;

  function addTranslation() {
    for (let i = status.dialogData.translations.length - 1; i >= 0; i--) {
      if (status.dialogData.translations[i].deleted === true) {
        status.dialogData.translations[i].deleted = false;
        setStatus({...status});
        return;
      }
    }
    setStatus({
      ...status,
      dialogData: {
        ...status.dialogData,
        translations: [
          ...status.dialogData.translations,
          {
            cid: "",
            nid: "",
            pos: "",
            phonetic_us: "",
            phonetic_uk: "",
            translation: "",
            note: "",
            note_explain: "",
            script: "",
            noted: false,
          },
        ],
      },
    });
  }

  const handleWordWheel = event => {
    status.onWheel = false;
    status.isPlaying = false;

    const delta = event.deltaY;
    if (delta > 0) {
      console.log("向下滚动 " + delta);
      status.currentWordIndex = Math.min(status.words.length - 1, status.currentWordIndex + 1);
      setStatus({
        ...status, // 复制现有状态
      });
    }
    else {
      console.log("向上滚动" + delta);
      status.currentWordIndex = Math.max(0, status.currentWordIndex - 1);
      setStatus({
        ...status, // 复制现有状态
      });
    }

    localStorage.setItem("wordStatus", status.currentWordIndex.toString());
  };

  /**  */
  const handlePutEnd = async event => {
    console.log("handlePutEnd");

    if (status.currentWordIndex === status.words.length - 1) {
      return;
    }

    setStatus(prev => ({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch("/api/notebook/words/english", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "put_end",
        word: status.words[status.currentWordIndex],
      }),
    });

    setStatus(prev => ({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error("Failed to put word to the end.");
      return;
    }
    else if (response.ok) {
      toast.success("Successfully put word end.");
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !== status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.push(jsonResponse.data);
        setStatus({
          ...status,
        });
      }
    }
  };

  const handlePutNext = async event => {
    if (status.currentWordIndex === status.words.length - 1) {
      return;
    }

    console.log("handlePutNext");

    setStatus(prev => ({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch("/api/notebook/words/english", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "put_next",
        word: status.words[status.currentWordIndex],
        weight1: status.words[status.currentWordIndex + 1].weight,
        weight2: status.words[status.currentWordIndex + 2].weight,
      }),
    });

    setStatus(prev => ({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error("Failed to put word to the next.");
      return;
    }
    else if (response.ok) {
      toast.success("Successfully put word to next.");
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !== status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.splice(status.currentWordIndex + 1, 0, jsonResponse.data);
        status.currentWordIndex++;
        setStatus({
          ...status,
        });
      }
    }
  };

  const handlePutTop = async event => {
    console.log("handlePutTop");

    if (status.currentWordIndex === 0) {
      return;
    }

    setStatus(prev => ({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch("/api/notebook/words/english", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "put_top",
        word: status.words[status.currentWordIndex],
      }),
    });

    setStatus(prev => ({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error("Failed to put word to the top.");
      return;
    }
    else if (response.ok) {
      toast.success("Successfully put word top.");
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !== status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.unshift(jsonResponse.data);
        setStatus({
          ...status,
        });
      }
    }
  };

  const handlePutPrevious = async event => {
    if (status.currentWordIndex === 0) {
      return;
    }

    if (status.currentWordIndex === 1) {
      return handlePutTop(event);
    }

    console.log("handlePutPrevious");

    setStatus(prev => ({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch("/api/notebook/words/english", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "put_previous",
        word: status.words[status.currentWordIndex],
        weight1: status.words[status.currentWordIndex - 1].weight,
        weight2: status.words[status.currentWordIndex - 2].weight,
      }),
    });

    setStatus(prev => ({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error("Failed to put word to previous.");
      return;
    }
    else if (response.ok) {
      toast.success("Successfully put word previous.");
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !== status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.splice(status.currentWordIndex - 1, 0, jsonResponse.data);
        status.currentWordIndex--;
        setStatus({
          ...status,
        });
      }
    }
  };

  // Default Return
  return (
    <>
      <NavTop/>
      <div className="text-right">
        <ThemeToggle/>
      </div>
      {status.words.length > 0 && (
      <div className={"word-container"} onWheel={handleWordWheel}>
        <div>
          <div className={`pronunciation`} onClick={e => playCurrentWord()}>{/* onMouseEnter={e => playCurrentWordOnly()} */}
            <span className={"phonetic"}
                  dangerouslySetInnerHTML={{
                    __html:
                      status.words[status.currentWordIndex]?.phonetic_us ||
                      status.words[status.currentWordIndex]?.phonetic_uk ||
                      "&nbsp;",
                  }}/>

            <span className={"pos"}>
              &nbsp;
              {status.words[status.currentWordIndex]?.pos
                ? "[" + status.words[status.currentWordIndex]?.pos + "]"
                : " "}
              &nbsp;
            </span>
          </div>

          <div className={"word"} onClick={e => playCurrentWordOnly()}
               dangerouslySetInnerHTML={{
                 __html: status.audioConfig.english.showText ? status.words[status.currentWordIndex].word : "&nbsp;",
               }}
          ></div>

          <div className={`translation${status.audioConfig.chinese.showText ? "" : " no-show"}`}
               onClick={e => playCurrentTranslationOnly()}
               dangerouslySetInnerHTML={{
                 __html: status.words[status.currentWordIndex].translation,
               }}/>
          <hr/>

          <div className={`note${status.audioConfig.chinese.showText ? '' : ' no-show'}`}
               dangerouslySetInnerHTML={{
                 __html: status.words[status.currentWordIndex].note ? "📗 " + status.words[status.currentWordIndex].note : "&nbsp;",
               }}/>
        </div>
      </div>
      )}

      {status.words.length > 0 && (
      <div className={"operation text-center"} onWheel={handleWordWheel}>
        {status.currentWordIndex + 1} / {status.words.length}
      </div>
      )}

      <div className={"operation text-center"}>
        {/*<span className={"put_top"} onClick={handlePutTop}>*/}
        {/*  <PiRocket/>*/}
        {/*</span>*/}
        {status.audioConfig?.priorities?.length === 2 && status.audioConfig?.priorities[0] === 1 && status.audioConfig?.priorities[1] === 5 /* TODO: 以后改进，先隐藏 */ && (<>
        <span className={"put_previous"} onClick={handlePutPrevious}><GiPlayerPrevious/></span>{" "}
        <span className={"put_next"} onClick={handlePutNext}><GiPlayerNext/></span>{" "}
        </>)}
        <form className={"inline search-form"}
              onKeyDown={event => {
                if (event.key !== 'Enter') {
                  return;
                }
                event.preventDefault();
                console.log(event.shiftKey);

                if (status.searchText && status.words?.length > 1) {
                  let index = 0;
                  for (index = 1; index < status.words.length; index++) {
                    let i = index + status.currentWordIndex;
                    if (i >= status.words.length) {
                      i = i - status.words.length;
                    }
                    if (event?.shiftKey) {
                      i = -index + status.currentWordIndex;
                      if (i < 0) {
                        i = i + status.words.length;
                      }
                      console.log(i);
                    }
                    const word = status.words[i];
                    if (
                        word.word.toLowerCase().includes(status.searchText.toLowerCase()) ||
                        word.translation.toLowerCase().includes(status.searchText.toLowerCase()) ||
                        i + 1 + '' === status.searchText
                    ) {
                      setStatus({
                        ...status,
                        currentWordIndex: i,
                      });
                      break;
                    }
                  }
                  if (index === status.words.length) {
                    toast.error('Not found.');
                  }
                }
              }}>
          <input id={"search-input"}
                 className={"focus:outline-none border"}
                 type={"text"}
                 autoComplete="off"
                 value={status.searchText}
                 onFocus={e => e.target.select()}
                 onChange={event => {
                   setStatus({...status, searchText: event.target.value});
                 }}/>
          <button type="button" className="" onClick={e => {
            // 手动构造一个模拟的 KeyboardEvent，模拟“单独按下 Enter、不按 Shift”（除非用户真的按了 Shift）
            const simulatedEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              shiftKey: e.shiftKey,   // 关键：把点击时的 shiftKey 状态传递进去
              ctrlKey: e.ctrlKey,
              altKey: e.altKey,
              metaKey: e.metaKey,
              bubbles: true,
              cancelable: true,
            });
            document.getElementById('search-input').dispatchEvent(simulatedEvent);
          }}><RiFileSearchLine/></button>
        </form>{' '}
        {/* 播放按钮 */}<span onClick={event => {keyDownCallback({...event, key: ' '});}}>{status.isPlaying ? <FaPause/> : <LuSquarePlay/>}</span>{' '}
        <span onClick={event => {keyDownCallback({...event, key: 'ArrowLeft'});}}><CgPlayTrackPrevR/></span>
        <span onClick={event => {keyDownCallback({...event, key: 'ArrowRight'});}}><CgPlayTrackNextR/></span>
        {/* 发声按钮 */}<span onClick={playCurrentWord} onMouseEnter={status.isPlaying?undefined:playCurrentWord}><MdOutlineRecordVoiceOver/></span>

        <span onClick={() => {setStatus(prev => ({...prev, isConfigDialogOpen: true}));}}><PiGear/></span> {/* 配置按钮 */}

        {status.words?.length > 0 && (<>
        <span onClick={e => handlePriority(1)}>{(status.words[status.currentWordIndex].priority === 1) ? <Bs1SquareFill/> : <Bs1Square/>}</span>
        <span onClick={e => handlePriority(2)}>
          {(status.words[status.currentWordIndex].priority === 2) ? <Bs2SquareFill/> : <Bs2Square/>}
        </span>
        <span onClick={e => handlePriority(3)}>
          {(status.words[status.currentWordIndex].priority === 3) ? <Bs3SquareFill/> : <Bs3Square/>}
        </span>
        <span onClick={e => handlePriority(4)}>
          {(status.words[status.currentWordIndex].priority === 4) ? <Bs4SquareFill/> : <Bs4Square/>}
        </span>
        <span onClick={e => handlePriority(5)}>
          {(status.words[status.currentWordIndex].priority === 5) ? <Bs5SquareFill/> : <Bs5Square/>}
        </span>
        </>)}
        {/*<span className={"put_end"} onClick={handlePutEnd}>*/}
        {/*  <PiRocket/>*/}
        {/*</span>*/}

        {/* Open Editor Dialog */}
        <button className="cursor-pointer"
                onClick={async () => {
                  // search current word
                  try {
                    const response = await fetch(
                        `/api/words-english-chinese?word=${status.words[status.currentWordIndex].word}`,
                    );
                    const data = await response.json();
                    console.log(data);

                    if (data?.data.length > 0) {
                      setStatus({
                        ...status, // 复制现有状态
                        isDialogOpen: true,
                        dialogData: data.data[0],
                      });
                    }
                    else {
                      setStatus({
                        ...status, // 复制现有状态
                        isDialogOpen: true,
                        dialogData: {
                          id: status.words[status.currentWordIndex].id,
                          nid: status.words[status.currentWordIndex].nid,
                          weight: status.words[status.currentWordIndex].weight,
                          eid: status.words[status.currentWordIndex].eid,
                          word: status.words[status.currentWordIndex].word,
                          translations: [
                            {
                              cid: status.words[status.currentWordIndex].cid,
                              pos: status.words[status.currentWordIndex].pos,
                              phonetic_us: status.words[status.currentWordIndex].phonetic_us,
                              phonetic_uk: status.words[status.currentWordIndex].phonetic_uk,
                              translation: status.words[status.currentWordIndex].translation,
                              script: status.words[status.currentWordIndex].translation_script,
                              note: status.words[status.currentWordIndex].note,
                              note_explain: status.words[status.currentWordIndex].note_explain,
                            },
                          ],
                        },
                      });
                    }
                    // if data.
                  } catch (error) {
                    console.error('Failed to search english-chinese:', error);
                    toast.error('查询失败，请检查网络或稍后再试');
                  }
                }}><CiEdit/></button>

        <button onClick={() => {
          setStatus(prev => ({
            ...prev,
            audioConfig: {
              ...prev.audioConfig,
              wordStartIndex: prev.currentWordIndex + 1, // 选择打印后，总是标记起背单词序号
            },
            isPrintDialogOpen: true,
          }));
        }}><BsPrinter/></button>
      </div>

      {/*<ToastContainer position="top-right"*/}
      {/*                autoClose={3000}*/}
      {/*                hideProgressBar={false}*/}
      {/*                newestOnTop={false}*/}
      {/*                closeOnClick*/}
      {/*                rtl={false}*/}
      {/*                pauseOnFocusLoss draggable pauseOnHover*/}
      {/*                aria-label={undefined}*/}
      {/*/>*/}

      <Transition show={status.isDialogOpen}>
        <Dialog onClose={() =>
            setStatus({
              ...status, // 复制现有状态
              isDialogOpen: false,
              dialogData: {translations: []},
            })} className="relative z-50">

          {/* Shade */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

          <div className="fixed inset-0 flex items-center justify-center p-4 ">
            {/* Scrollable */}
            <Dialog.Panel className="bg-white dark:bg-gray-700/95 rounded-lg p-6 max-w-2/3 w-full max-h-[80vh] overflow-y-auto">
              <div className={"flex"}>
                <input value={status.dialogData.word || ''} type="text"
                       onChange={e =>
                           setStatus({
                             ...status,
                             dialogData: {
                               ...status.dialogData,
                               word: e.target.value,
                             },
                           })
                       }
                       onBlur={e => searchExistingWordsEnglishChinese(e.target.value)}
                       className="flex-1 p-2 border rounded"
                       onFocus={e => e.target.select()}
                       placeholder="Word..."/>
                <input name={'eid'} value={status.dialogData.eid || ''}
                       type={'text'} readOnly={true} className={'w-auto p-2 border pointer-events-none'}/>
              </div>
              <input value={status.dialogData.accent || ''} type="text"
                     onChange={e =>
                         setStatus({
                           ...status,
                           dialogData: {
                             ...status.dialogData,
                             accent: e.target.value,
                           },
                         })
                     }
                     className="w-full mt-2 p-2 border rounded" placeholder="Accent..."/>
              <input value={status.dialogData.syllable || ''} type="text"
                     onChange={e =>
                         setStatus({
                           ...status,
                           dialogData: {
                             ...status.dialogData,
                             syllable: e.target.value,
                           },
                         })
                     }
                     className="w-full mt-2 p-2 border rounded"
                     placeholder="Syllable..."/>
              <input value={status.dialogData.script || ''} type="text"
                     onChange={e => setStatus({
                       ...status,
                       dialogData: {
                         ...status.dialogData,
                         script: e.target.value,
                       },
                     })}
                     className="w-full mt-2 p-2 border rounded" placeholder="Script..."/>

              {/* 翻译部分 */ status.dialogData.translations.map((translation, index) => {
                if (translation.deleted) return null;

                return (
                  <div key={index} className="translation mt-2 bg-gray-100 dark:bg-gray-950/70">
                    <div className={"flex items-center gap-2"}>
                      <input name={"note-word-id"} type={"hidden"} value={translation.id || ""}/>
                      <input name={"notebook-id"} type={"hidden"} value={translation.nid || ""}/>
                      <input name={"cid"} type={"hidden"} value={translation.cid || ""}/>
                      <input
                        type="text"
                        className="w-10 p-2 pl-1 pr-1 border rounded"
                        placeholder="PoS"
                        value={translation.pos || ""}
                        onChange={e => {
                          const translations = [...status.dialogData.translations];
                          translations[index] = {
                            ...translation,
                            pos: e.target.value,
                          };
                          setStatus({
                            ...status,
                            dialogData: {
                              ...status.dialogData,
                              translations: translations,
                            },
                          });
                        }}
                      />
                      <input
                        type="text"
                        value={translation.phonetic_uk || ""}
                        onChange={e => {
                          const translations = [...status.dialogData.translations];
                          translations[index] = {
                            ...translation,
                            phonetic_uk: e.target.value,
                          };
                          setStatus({
                            ...status,
                            dialogData: {
                              ...status.dialogData,
                              translations: translations,
                            },
                          });
                        }}
                        className="flex-1 p-2 pl-1 pr-1 border rounded"
                        placeholder="UK "
                      />
                      <button
                        className="px-4 py-3 bg-green-950 text-white rounded hover:bg-green-600 active:bg-green-700 border flex justify-center items-center"
                        onClick={async () => {
                          try {
                            if (translation.cid) {
                              setStatus({
                                ...status,
                                isProcessing: true,
                              });
                              const response = await fetch(`/api/words-english-azure-tts?cid=${translation.cid}`);
                              const data = await response.json();
                              console.log(data);
                              toast.info(JSON.stringify(data));
                            }
                          }
                          finally {
                            setStatus({
                              ...status,
                              isProcessing: false,
                            });
                          }
                        }}
                      >
                        <FaSync/>
                      </button>
                      <input
                        type="text"
                        value={translation.phonetic_us || ""}
                        onChange={e => {
                          const translations = [...status.dialogData.translations];
                          translations[index] = {
                            ...translation,
                            phonetic_us: e.target.value,
                          };
                          setStatus({
                            ...status,
                            dialogData: {
                              ...status.dialogData,
                              translations: translations,
                            },
                          });
                        }}
                        className="flex-1 p-2 pl-1 pr-1 border rounded"
                        placeholder="US "
                      />

                      <input
                        type="checkbox"
                        checked={translation.noted || ""}
                        onChange={e => {
                          const isChecked = e.target.checked;
                          const translations = [...status.dialogData.translations];
                          translations[index] = {
                            ...translation,
                            noted: isChecked,
                          };
                          setStatus({
                            ...status,
                            dialogData: {
                              ...status.dialogData,
                              translations: translations,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={translation.translation || ""}
                        onChange={e => {
                          const translations = [...status.dialogData.translations];
                          translations[index] = {
                            ...translation,
                            translation: e.target.value,
                          };
                          setStatus({
                            ...status,
                            dialogData: {
                              ...status.dialogData,
                              translations: translations,
                            },
                          });
                        }}
                        className="flex-1 p-2 pl-1 pr-1 border rounded"
                        placeholder="Translation"
                      />
                      <button className="px-4 py-3 bg-green-950 text-white rounded hover:bg-green-600 active:bg-green-700 border flex justify-center items-center"
                        onClick={async () => {
                          try {
                            if (translation.cid) {
                              setStatus({
                                ...status,
                                isProcessing: true,
                              });
                              const response = await fetch(
                                `/api/words-english-translation-azure-tts?cid=${translation.cid}`
                              );
                              const data = await response.json();
                              console.log(data);
                              toast.info(JSON.stringify(data));
                            }
                          }
                          finally {
                            setStatus({
                              ...status,
                              isProcessing: false,
                            });
                          }
                        }}
                      >
                        <FaSync/>
                      </button>
                      <input
                        type="text"
                        value={translation.script || ""}
                        onChange={e => {
                          const translations = [...status.dialogData.translations];
                          translations[index] = {
                            ...translation,
                            script: e.target.value,
                          };
                          setStatus({
                            ...status,
                            dialogData: {
                              ...status.dialogData,
                              translations: translations,
                            },
                          });
                        }}
                        className="flex-1 p-2 pl-1 pr-1 border rounded"
                        placeholder="Script"
                      />
                      <button
                        className="px-4 py-3 bg-red-900 text-white rounded hover:bg-red-500 active:bg-red-700 border flex justify-center items-center"
                        onClick={() => {
                          if (translation.cid) {
                            // 已入库数据仅隐藏。
                            const translations = [...status.dialogData.translations];
                            translations[index] = {
                              ...translation,
                              deleted: true,
                            };
                            setStatus({
                              ...status,
                              dialogData: {
                                ...status.dialogData,
                                translations: translations,
                              },
                            });
                          }
                          else {
                            const translations = [
                              ...status.dialogData.translations.slice(0, index),
                              ...status.dialogData.translations.slice(index + 1),
                            ];
                            setStatus({
                              ...status,
                              dialogData: {
                                ...status.dialogData,
                                translations: translations,
                              },
                            });
                          }
                        }}
                      >
                        <FaTrash/>
                      </button>
                    </div>
                    <textarea
                      className={"w-full p-2 border rounded mt-2"}
                      placeholder={"笔记..."}
                      value={translation.note || ""}
                      onChange={e => {
                        const translations = [...status.dialogData.translations];
                        translations[index] = {
                          ...translation,
                          note: e.target.value,
                        };
                        setStatus({
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            translations: translations,
                          },
                        });
                      }}
                    ></textarea>

                    {/*<textarea*/}
                    {/*    className={'w-full p-2 border rounded '}*/}
                    {/*    placeholder={'笔记：解释...'}>*/}

                    {/*</textarea>*/}
                  </div>
                );
              })}

              {/* 对话框操作区 */}
              <div className="flex justify-end gap-2 mt-2 ">
                <button
                  onClick={() => {
                    addTranslation();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 border"
                >
                  Add Translation
                </button>

                {/* 提交单词 */}
                <button
                  onClick={async () => {
                    try {
                      // Save word in Dialog

                      if (status.currentWordIndex === 0) {
                        status.dialogData.weight1 = status.words[status.currentWordIndex].weight;
                        status.dialogData.weight2 = "";
                      }
                      else if (status.currentWordIndex === status.words.length - 1) {
                        status.dialogData.weight1 = "";
                        status.dialogData.weight2 = status.words[status.currentWordIndex].weight;
                      }
                      else {
                        status.dialogData.weight1 = status.words[status.currentWordIndex].weight;
                        status.dialogData.weight2 = status.words[status.currentWordIndex + 1].weight;
                      }

                      // 锁屏
                      setStatus(prevStatus => ({
                        ...prevStatus,
                        isProcessing: true,
                      }));

                      const response = await fetch("/api/words-english-chinese", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(status.dialogData),
                      });

                      if (response.ok) {
                        const data = await response.json();
                        console.log(data);

                        if (data.success && data.data) {
                          toast.success("Successfully added to notebook!" + JSON.stringify(data.data));

                          if (data.data.translations) {
                            data.data.translations.forEach(translation => {
                              const word = {
                                id: translation.id,
                                cid: translation.cid,
                                nid: translation.nid,
                                pos: translation.pos,
                                note: translation.note,
                                note_explain: translation.note_explain,
                                eid: data.data.eid,
                                script: data.data.script,
                                word: data.data.word,
                                accent: data.data.accent,
                                translation: translation.translation,
                                translation_script: translation.script,
                                weight: translation.weight,
                                priority: translation.priority,
                                phonetic_uk: translation.phonetic_uk,
                                phonetic_us: translation.phonetic_us,
                                voice_id_uk: translation.voice_id_uk,
                                voice_id_us: translation.voice_id_us,
                                voice_id_translation: translation.voice_id_translation,
                              };

                              if (translation.new) { // api 设置返回
                                // 如果 translations 中有 weight，说明刚刚加入单词本。该词条需同时进入客户端单词本。“”
                                console.debug("trans has valid weight");

                                if (!!data.data.weight1 && !data.data.weight2) {
                                  status.words.unshift(word);
                                }
                                else if (!data.data.weight1 && !!data.data.weight2) {
                                  status.words.push(word);
                                  status.currentWordIndex++;
                                }
                                else if (!!data.data.weight1 && !!data.data.weight2) {
                                  status.words.splice(status.currentWordIndex + 1, 0, word);
                                  status.currentWordIndex++;
                                }

                                delete translation.new;
                              } // if (translation.weight)
                              else if (!translation.noted) { // 当前单词表里去掉该单词。
                                for (let index = status.words.length - 1; index >= 0; index--) {
                                  if (status.words[index].eid === word.eid && status.words[index].cid === word.cid) {
                                    status.words.splice(index, 1);

                                    if (
                                      index < status.currentWordIndex ||
                                      status.currentWordIndex >= status.words.length
                                    ) {
                                      status.currentWordIndex--;
                                    }
                                  }
                                }
                              }
                              else {
                                for (let index = status.words.length - 1; index >= 0; index--) {
                                  if (status.words[index].eid === word.eid && status.words[index].cid === word.cid) {
                                    status.words.splice(index, 1, word);
                                    break;
                                  }
                                }
                              }
                            }); // translations.forEach
                          }

                          // setStatus({
                          //   ...status, // 复制现有状态
                          //   dialogData: data.data,
                          // });
                          status.dialogData = data.data;
                        }
                      }
                      else {
                        toast.error("Failed to add to notebook!");
                      }
                    }
                    catch (error) {
                      toast.error("Failed to save:" + error.message);
                    }
                    finally {
                      setStatus({...status, isProcessing: false});
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 border"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    status.dialogData.word = "";
                    setStatus({
                      ...status, // 复制现有状态
                      isDialogOpen: false,
                      dialogData: {
                        translations: [],
                      },
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:bg-gray-900 border"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* 配置对话框 */}
      <ShadcnDialog open={status.isConfigDialogOpen}
                    onOpenChange={open => {
                      setStatus(prev => ({...prev, isConfigDialogOpen: open}));
                    }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>音频播放配置</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* 上栏：全局设置 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">全局设置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 音量 */}
                <div className="space-y-2">
                  <Label>音量: {status.audioConfig.volume}%</Label>
                  <Slider
                    value={[status.audioConfig.volume]}
                    onValueChange={([value]) => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        volume: value,
                      });
                      if (playerRef.current) {
                        playerRef.current.setVolume(value / 100);
                      }
                    }}
                    min={50}
                    max={150}
                    step={25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                    <span>125%</span>
                    <span>150%</span>
                  </div>
                </div>

                {/* 播放速度 */}
                <div className="space-y-2">
                  <Label>播放速度: {status.audioConfig.speed}%</Label>
                  <Slider
                    value={[status.audioConfig.speed]}
                    onValueChange={([value]) => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        speed: value,
                      });
                    }}
                    min={90}
                    max={110}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>90%</span>
                    <span>95%</span>
                    <span>100%</span>
                    <span>105%</span>
                    <span>110%</span>
                  </div>
                </div>

                <div className={`space-y-2`}>
                  <Label>每次播放单词量: {status.audioConfig.batch_quantity ===
                  175 ? '∞' : status.audioConfig.batch_quantity} 个</Label>
                  <Slider value={[status.audioConfig.batch_quantity]}
                          onValueChange={([value]) => {
                            updateAudioConfig({
                              ...status.audioConfig,
                              batch_quantity: value,
                            });
                          }}
                          min={25} max={175} step={25} className="w-full"/>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>&nbsp;25</span>
                    <span>&nbsp;50</span>
                    <span>&nbsp;75</span>
                    <span>100</span>
                    <span>125</span>
                    <span>150</span>
                    <span>ALL</span>
                  </div>
                </div>

                <div className={`space-y-2`}>
                  <Label>显示单词的优先度: </Label>
                  <Slider value={status.audioConfig.priorities || [1, 5]}
                          onValueChange={(value) => { // value is array [].
                            // console.log('222 value slider:', value);
                            updateAudioConfig({
                              ...status.audioConfig,
                              priorities: value,
                            });

                            const indexKeyStore = status.audioConfig.priorities.join(',');
                            const indexKeyLoad = value.join(',');
                            const index = status.prioritiesIndices[indexKeyLoad] || 0;
                            const [priority_from, priority_to] = value;
                            // console.log(status.originalWords);
                            const words = status.originalWords.filter(word => (word.priority >= priority_from && word.priority <= priority_to));
                            // console.log(words);
                            setStatus(prev => ({
                              ...prev,
                              words: prev.originalWords.filter(
                                  word => (word.priority >= priority_from &&
                                      word.priority <= priority_to)),
                              prioritiesIndices: {
                                ...prev.prioritiesIndices,
                                [indexKeyStore]: status.currentWordIndex,
                              },
                              currentWordIndex: index >= words.length ? words.length - 1 : index,
                            }));
                          }}
                          min={1} max={5} step={1}
                          className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                {/* 交错播放 */}
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={status.audioConfig.alternatePlay}
                    onCheckedChange={checked => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        alternatePlay: checked,
                      });
                    }}
                  />
                  <Label>交错播放</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Label className="whitespace-nowrap">起背单词编号: </Label>
                  <input type="number" min={0} step={1}
                      className="w-24 border rounded px-2 py-1"
                      value={status.audioConfig.wordStartIndex ?? 0}
                      onChange={e => {
                        const value = Number.parseInt(e.target.value, 10);
                        updateAudioConfig({
                          ...status.audioConfig,
                          wordStartIndex: Number.isNaN(value) ? 0 : Math.max(0, value),
                        });
                      }}
                  />
                </div>

              </div>
            </div>

            <Separator/>

            {/* 下栏：左右分栏 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 左栏：英文设置 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">英文设置</h3>

                {/* 发音次数 */}
                <div className="space-y-2">
                  <Label>发音次数: {status.audioConfig.english.repeatCount}次</Label>
                  <Slider
                    value={[status.audioConfig.english.repeatCount]}
                    onValueChange={([value]) => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        english: {
                          ...status.audioConfig.english,
                          repeatCount: value,
                        },
                      });
                    }}
                    min={0}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                {/* 停顿时间 */}
                <div className="space-y-2">
                  <Label>停顿时间: {status.audioConfig.english.pauseTime}秒</Label>
                  <Slider
                    value={[status.audioConfig.english.pauseTime * 4]} // 转换为0-5的范围
                    onValueChange={([value]) => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        english: {
                          ...status.audioConfig.english,
                          pauseTime: value / 4, // 转换回实际值
                        },
                      });
                    }}
                    min={0}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>0.25</span>
                    <span>0.5</span>
                    <span>0.75</span>
                    <span>1</span>
                    <span>1.25</span>
                  </div>
                </div>

                {/* 等待音频时长 */}
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={status.audioConfig.english.waitVoiceLength}
                    onCheckedChange={checked => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        english: {
                          ...status.audioConfig.english,
                          waitVoiceLength: checked,
                        },
                      });
                    }}
                  />
                  <Label>等待音频时长</Label>
                </div>

                {/* 显示英文 */}
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={status.audioConfig.english.showText}
                    onCheckedChange={checked => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        english: {
                          ...status.audioConfig.english,
                          showText: checked,
                        },
                      });
                    }}
                  />
                  <Label>显示英文</Label>
                </div>
              </div>

              {/* 右栏：中文设置 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">中文设置</h3>

                {/* 发音次数 */}
                <div className="space-y-2">
                  <Label>发音次数: {status.audioConfig.chinese.repeatCount}次</Label>
                  <Slider
                    value={[status.audioConfig.chinese.repeatCount]}
                    onValueChange={([value]) => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        chinese: {
                          ...status.audioConfig.chinese,
                          repeatCount: value,
                        },
                      });
                    }}
                    min={0}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                {/* 停顿时间 */}
                <div className="space-y-2">
                  <Label>停顿时间: {status.audioConfig.chinese.pauseTime || 0}秒</Label>
                  <Slider
                    value={[(status.audioConfig.chinese.pauseTime || 0) * 4]} // 转换为0-5的范围
                    onValueChange={([value]) => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        chinese: {
                          ...status.audioConfig.chinese,
                          pauseTime: value / 4, // 转换回实际值
                        },
                      });
                    }}
                    min={0}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>0.25</span>
                    <span>0.5</span>
                    <span>0.75</span>
                    <span>1</span>
                    <span>1.25</span>
                  </div>
                </div>

                {/* 等待音频时长 */}
                <div className="flex items-center space-x-2">
                  <Switch checked={status.audioConfig.chinese.waitVoiceLength}
                    onCheckedChange={checked => {
                      updateAudioConfig({
                        ...status.audioConfig,
                        chinese: {
                          ...status.audioConfig.chinese,
                          waitVoiceLength: checked,
                        },
                      });
                    }}
                  />
                  <Label>等待音频时长</Label>
                </div>

                {/* 显示中文 */}
                <div className="flex items-center space-x-2">
                  <Switch checked={status.audioConfig.chinese.showText}
                          onCheckedChange={checked => {
                            updateAudioConfig({
                              ...status.audioConfig,
                              chinese: {
                                ...status.audioConfig.chinese,
                                showText: checked,
                              },
                            });
                          }}/>
                  <Label>显示中文</Label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </ShadcnDialog>

      {/* 打印确认对话框 */}
      <ShadcnDialog open={status.isPrintDialogOpen}
                    onOpenChange={open => {
                      setStatus(prev => ({...prev, isPrintDialogOpen: open}));
                    }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>打印单词确认</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm">
              是否打印从 <strong>{status.currentWordIndex + 1}</strong> 号开始的{' '}
              <strong>{status.audioConfig.batch_quantity === 175 ? '所有' : status.audioConfig.batch_quantity}</strong> 个单词？
            </p>

            <div className="space-y-2">
              <Label>打印单词量: {status.audioConfig.batch_quantity === 175 ? '∞' : status.audioConfig.batch_quantity} 个</Label>
              <Slider value={[status.audioConfig.batch_quantity]}
                      onValueChange={([value]) => {
                        updateAudioConfig({
                          ...status.audioConfig,
                          batch_quantity: value,
                        });
                      }}
                      min={25}
                      max={175}
                      step={25}
                      className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>&nbsp;25</span>
                <span>&nbsp;50</span>
                <span>&nbsp;75</span>
                <span>100</span>
                <span>125</span>
                <span>150</span>
                <span>ALL</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => {setStatus(prev => ({...prev, isPrintDialogOpen: false}));}}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">取消
              </button>
              <button onClick={handlePrint}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">确认打印
              </button>
            </div>
          </div>
        </DialogContent>
      </ShadcnDialog>

      {/* 全屏遮罩 */}
      {status.isProcessing && (
        <div className={"overlay"}>
          <div className={"loader"}>Processing...</div>
        </div>
      )}
    </>
  );
}
