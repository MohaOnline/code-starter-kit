'use client';
import './page.css';

import React, {useEffect, useRef, useState} from 'react';
import {CgPlayTrackNextR, CgPlayTrackPrevR} from 'react-icons/cg';

import {
  FaPlay,
  FaPause,
  FaTrash,
  FaVolumeUp,
  FaSync, FaSearch,
} from 'react-icons/fa';
import {PiHandWaving, PiRocket, PiGearFineLight, PiGear} from 'react-icons/pi';
import {RiFileSearchLine} from 'react-icons/ri';
import {LuSquarePlay} from 'react-icons/lu';
import {GiPlayerPrevious, GiPlayerNext, GiGears} from 'react-icons/gi';


import {Dialog, Transition} from '@headlessui/react';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStatus } from '@/app/lib/atoms';
import {handleKeyDown} from '../words/components/common';
import NavTop from '@/app/lib/components/NavTop.js';

export default function Page() {

  const [status, setStatus] = useState({
    currentWordIndex: 0,
    playedWordIndex: -1,
    playCurrent: null,
    onWheel: false,       // 滚动时，不播放录音。
    isPlaying: false,
    words: [],
    isDialogOpen: false,
    dialogData: {translations: []},
    isProcessing: false,
    isComposing: false,
    isTabPressed: false,
    searchText: '',
  });

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const keyDownCallback = (event) => handleKeyDown(event, status, setStatus);
  const keyUpCallback = (event) => handleKeyUp(event, status, setStatus);

  const handleKeyUp = (event, status, setStatus) => {
    if (event.key === 'Tab') {
      console.debug('Tab Up');
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
    document.addEventListener('keydown', keyDownCallback);
    document.addEventListener('keyup', keyUpCallback);
    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);

    // 清理函数（组件卸载时移除键盘监听器）
    return () => {
      document.removeEventListener('keydown', keyDownCallback);
      document.removeEventListener('keyup', keyUpCallback);
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
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

      const response = await fetch('/api/notebook-words-english');
      const json = await response.json();

      if (json.success) {
        try {
          let savedIndex = 0;
          savedIndex = parseInt(localStorage.getItem('wordStatus'), 10);
          if (isNaN(savedIndex)) {
            savedIndex = 0;
          }
          status.currentWordIndex = savedIndex;
        } catch (e) {}

        status.words = json.data;
        setStatus({
          ...status, // 复制现有状态
          // words: json.data,
        });
      } else {
        console.error('API 报错');
        toast.error('cant load words from API.');
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
  }, []);

  // 播放音频: 当 currentWordIndex 或 words 改变时
  useEffect(() => {
    if (status.words.length > 0 &&
        status.words[status.currentWordIndex]?.voice_id_uk) {

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
    }
  }, [status.isPlaying, status.currentWordIndex]);

  /** 播放当前单词音频。 */
  const playCurrentWord = () => {
    const firstChar = status.words[status.currentWordIndex].voice_id_uk[0].toLowerCase();
    const audio = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${status.words[status.currentWordIndex].voice_id_uk}.wav`;

    audioRef.current = new Audio(audio);
    audioRef.current.play().catch(error => {
      console.error('Audio playback failed:', error);
    });
  };

  status.playCurrent = () => playCurrentWord();

  /**
   * 检索已入库单词
   */
  const searchExistingWordsEnglishChinese = async (word) => {

    if (!status.isTabPressed) {return;}
    // search current word
    try {
      const response = await fetch(
          `/api/words-english-chinese?word=${word}`);
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
      } else {

        setStatus({
          ...status, // 复制现有状态
          dialogData: {
            eid: '',
            word: status.dialogData.word,
            accent: '',
            script: '',
            syllable: '',
            translations: [
              {
                id: '',
                cid: '',
                nid: '',
                pos: '',
                phonetic_us: '',
                phonetic_uk: '',
                translation: '',
                script: '',
                noted: false,
                note: '',
                note_explain: '',
              }],
          },
        });
        toast.error(`${word} not found.`);
      }
      // if data.

    } catch (error) {
      console.error('Failed to search english-chinese:', error);
      toast.error('查询失败，请检查网络或稍后再试');
    }
    // try {
    //   if (!status.dialogData.word) {
    //     setStatus({...status, dialogData: {word: word}});
    //   }
    // } catch (error) {
    //   console.error('Failed to search word:', error);
    // }
  };

  if (status.words?.length === 0) return <div>Loading...</div>;

  function addTranslation() {
    for (let i = status.dialogData.translations.length - 1; i >= 0; i--) {
      if (status.dialogData.translations[i].deleted === true) {
        status.dialogData.translations[i].deleted = false;
        setStatus({...status});
        return;
      }
    }
    setStatus(
        {
          ...status,
          dialogData: {
            ...status.dialogData,
            translations: [
              ...status.dialogData.translations, {
                cid: '',
                nid: '',
                pos: '',
                phonetic_us: '',
                phonetic_uk: '',
                translation: '',
                note: '',
                note_explain: '',
                script: '',
                noted: false,
              }],
          },
        });
  }

  const handleWordWheel = (event) => {

    status.onWheel = false;
    status.isPlaying = false;

    const delta = event.deltaY;
    if (delta > 0) {
      console.log('向下滚动 ' + delta);
      status.currentWordIndex = Math.min(status.words.length - 1,
        status.currentWordIndex + 1);
      setStatus({
        ...status, // 复制现有状态
      });
    } else {
      console.log('向上滚动' + delta);
      status.currentWordIndex = Math.max(0, status.currentWordIndex -1);
      setStatus({
        ...status, // 复制现有状态
      });
    }
  };

  /**  */
  const handlePutEnd = async (event) => {
    console.log('handlePutEnd');

    if (status.currentWordIndex === status.words.length - 1) {
      return;
    }

    setStatus((prev)=>({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch(
        '/api/notebook/words/english',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'put_end',
            word: status.words[status.currentWordIndex],
          }),
        });

    setStatus((prev)=>({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error('Failed to put word to the end.');
      return;
    } else if (response.ok) {
      toast.success('Successfully put word end.');
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !==
          status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.push(jsonResponse.data);
        setStatus({
          ...status,
        });
      }
    }

  };

  const handlePutNext = async (event) => {

    if (status.currentWordIndex === status.words.length - 1) {
      return;
    }

    console.log('handlePutNext');

    setStatus((prev)=>({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch(
        '/api/notebook/words/english',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'put_next',
            word: status.words[status.currentWordIndex],
            weight1: status.words[status.currentWordIndex + 1].weight,
            weight2: status.words[status.currentWordIndex + 2].weight,
          }),
        });

    setStatus((prev)=>({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error('Failed to put word to the next.');
      return;
    } else if (response.ok) {
      toast.success('Successfully put word to next.');
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !==
          status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.splice(status.currentWordIndex + 1, 0, jsonResponse.data);
        status.currentWordIndex++;
        setStatus({
          ...status,
        });
      }
    }

  };

  const handlePutTop = async (event) => {

    console.log('handlePutTop');

    if (status.currentWordIndex === 0) {
      return;
    }

    setStatus((prev)=>({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch(
        '/api/notebook/words/english',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'put_top',
            word: status.words[status.currentWordIndex],
          }),
        });

    setStatus((prev)=>({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error('Failed to put word to the top.');
      return;
    } else if (response.ok) {
      toast.success('Successfully put word top.');
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !==
          status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.unshift(jsonResponse.data);
        setStatus({
          ...status,
        });
      }
    }

  };

  const handlePutPrevious = async (event) => {

    if (status.currentWordIndex === 0) {
      return;
    }

    if (status.currentWordIndex === 1) {
      return handlePutTop(event);
    }

    console.log('handlePutPrevious');


    setStatus((prev)=>({
      ...prev,
      isProcessing: true,
    }));

    const response = await fetch(
        '/api/notebook/words/english',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'put_previous',
            word: status.words[status.currentWordIndex],
            weight1: status.words[status.currentWordIndex - 1].weight,
            weight2: status.words[status.currentWordIndex - 2].weight,
          }),
        });


    setStatus((prev)=>({
      ...prev,
      isProcessing: false,
    }));

    if (!response.ok) {
      toast.error('Failed to put word to previous.');
      return;
    } else if (response.ok) {
      toast.success('Successfully put word previous.');
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (jsonResponse.success) {
      if (jsonResponse.data.weight !==
          status.words[status.currentWordIndex].weight) {
        const [item] = status.words.splice(status.currentWordIndex, 1);
        status.words.splice(status.currentWordIndex - 1, 0, jsonResponse.data);
        status.currentWordIndex--;
        setStatus({
          ...status,
        });
      }
    }

  };

  return (
      <>
        <NavTop/>
        <div className={'word-container'}>
          <div>
            <div>
              <span className={'phonetic'} dangerouslySetInnerHTML={{
              __html: status.words[status.currentWordIndex]?.phonetic_us ||
                  status.words[status.currentWordIndex]?.phonetic_uk || '&nbsp;',
              }}></span>

              <span className={'pos'}>&nbsp;
                {status.words[status.currentWordIndex]?.pos
                    ? '[' +
                    status.words[status.currentWordIndex]?.pos + ']'
                    :
                    ' '}
                &nbsp;</span>
            </div>

            <div
                className={'word'}
                onWheel={handleWordWheel}>{status.words[status.currentWordIndex].word}</div>


            <div onWheel={handleWordWheel}
                className={'translation'}>{status.words[status.currentWordIndex].translation}</div>

          </div>
        </div>

        <div
            className={'operation text-center'}
            onWheel={handleWordWheel}>
          {status.currentWordIndex +
              1} / {status.words.length}</div>

        <div className={'operation text-center'}>
          <span className={'put_top'} onClick={handlePutTop}><PiRocket />
          </span>
          <span className={'put_previous'}
                onClick={handlePutPrevious}> <GiPlayerPrevious/> </span>
          <span className={'put_next'}
                onClick={handlePutNext}> <GiPlayerNext/> </span>
          <form className={'inline search-form'}
                onSubmit={(event) => {
                  event.preventDefault();
                  if (status.searchText && status.words?.length > 1) {
                    let index = 0;
                    for (index = 1; index < status.words.length; index++) {
                      let i = index + status.currentWordIndex;
                      if (i >= status.words.length) {
                        i = i - status.words.length;
                      }
                      const word = status.words[i];
                      if (word.word.toLowerCase().
                              includes(status.searchText.toLowerCase()) ||
                          word.translation.toLowerCase().
                              includes(status.searchText.toLowerCase()) ||
                          i + 1 + '' === status.searchText) {
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
            <input className={'focus:outline-none border'}
                   type={'text'}
                   value={status.searchText}
                   onFocus={(e) => e.target.select()}
                   onChange={(event) => {
                     setStatus({...status, searchText: event.target.value});
                   }}
            />
            <button type="submit" className="ml-2"><RiFileSearchLine/>
            </button>
          </form>
          <span onClick={(event) => {
            keyDownCallback({...event, key: ' '});
          }}> {status.isPlaying ?
              <FaPause/> : <LuSquarePlay/>}</span>
          <span onClick={(event) => {
            keyDownCallback({...event, key: 'ArrowLeft'});
          }}> <CgPlayTrackPrevR/> </span>
          <span onClick={(event) => {
            keyDownCallback({...event, key: 'ArrowRight'});
          }}> <CgPlayTrackNextR/> </span>
          <span onClick={playCurrentWord}><FaVolumeUp/></span>
          <span onClick={()=>{}}><PiGear/></span>
          <span className={'put_end'} onClick={handlePutEnd}><PiRocket />
          </span></div>


        <div className="text-center mt-2">
          {/* Open Editor Dialog */}
          <button
              onClick={async () => {
                // search current word
                try {
                  const response = await fetch(
                      `/api/words-english-chinese?word=${status.words[status.currentWordIndex].word}`);
                  const data = await response.json();
                  console.log(data);

                  if (data?.data.length > 0) {
                    setStatus({
                      ...status, // 复制现有状态
                      isDialogOpen: true,
                      dialogData: data.data[0],
                    });
                  } else {
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
              }}
              className="px-4 py-2 bg-gray-800 text-green-900 rounded hover:bg-gray-600 border"
          >
            Editor
          </button>
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
        </div>

        <Transition show={status.isDialogOpen}>
          <Dialog onClose={() => setStatus({
            ...status, // 复制现有状态
            isDialogOpen: false,
            dialogData: {translations: []},
          })} className="relative z-50">

            {/* Shade */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            <div
                className="fixed inset-0 flex items-center justify-center p-4 ">
              {/* Scrollable */}
              <Dialog.Panel
                  className="bg-gray-700/95 rounded-lg p-6 max-w-2/3 w-full max-h-[80vh] overflow-y-auto">
                <div className={'flex'}>
                <input
                    type="text"
                    value={status.dialogData.word||''}
                    onChange={(e) => setStatus(
                        {
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            word: e.target.value,
                          },
                        })}
                    onBlur={(e) => searchExistingWordsEnglishChinese(
                        e.target.value)}
                    className="flex-1 p-2 border rounded"
                    onFocus={(e) => e.target.select()}
                    placeholder="Word..."
                />
                  <input name={'eid'} type={'text'}
                         value={status.dialogData.eid||''}
                         readOnly={true}
                         className={'w-auto p-2 border pointer-events-none'}
                  /></div>
                <input
                    type="text"
                    value={status.dialogData.accent||''}
                    onChange={(e) => setStatus(
                        {
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            accent: e.target.value,
                          },
                        })}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Accent..."
                />
                <input
                    type="text"
                    value={status.dialogData.syllable||''}
                    onChange={(e) => setStatus(
                        {
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            syllable: e.target.value,
                          },
                        })}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Syllable..."
                />
                <input
                    type="text"
                    value={status.dialogData.script||''}
                    onChange={(e) => setStatus(
                        {
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            script: e.target.value,
                          },
                        })}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="Script..."
                />
                {
                  status.dialogData.translations.map((translation, index) => {

                        if (translation.deleted) return null;

                        return (
                            <div key={index}
                                 className="translation mt-2 bg-gray-950/70">
                              <div className={'flex items-center gap-2'}>
                                <input name={'note-word-id'} type={'hidden'}
                                       value={translation.id||''}
                                />
                                <input name={'notebook-id'} type={'hidden'}
                                       value={translation.nid||''}
                                />
                                <input name={'cid'} type={'hidden'}
                                       value={translation.cid||''}
                                />
                                <input
                                    type="text"
                                    className="w-10 p-2 pl-1 pr-1 border rounded"
                                    placeholder="PoS"
                                    value={translation.pos||''}
                                    onChange={(e) => {
                                      const translations = [...status.dialogData.translations];
                                      translations[index] = {
                                        ...translation,
                                        pos: e.target.value,
                                      };
                                      setStatus(
                                          {
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
                                    value={translation.phonetic_uk||''}
                                    onChange={(e) => {
                                      const translations = [...status.dialogData.translations];
                                      translations[index] = {
                                        ...translation,
                                        phonetic_uk: e.target.value,
                                      };
                                      setStatus(
                                          {
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
                                          const response = await fetch(
                                              `/api/words-english-azure-tts?cid=${translation.cid}`);
                                          const data = await response.json();
                                          console.log(data);
                                          toast.info(JSON.stringify(data));
                                        }
                                      } finally {
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
                                    value={translation.phonetic_us||''}
                                    onChange={(e) => {
                                      const translations = [...status.dialogData.translations];
                                      translations[index] = {
                                        ...translation,
                                        phonetic_us: e.target.value,
                                      };
                                      setStatus(
                                          {
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
                                    checked={translation.noted||''}
                                    onChange={(e) => {
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
                                    value={translation.translation||''}
                                    onChange={(e) => {
                                      const translations = [...status.dialogData.translations];
                                      translations[index] = {
                                        ...translation,
                                        translation: e.target.value,
                                      };
                                      setStatus(
                                          {
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
                                <input
                                    type="text"
                                    value={translation.script||''}
                                    onChange={(e) => {
                                      const translations = [...status.dialogData.translations];
                                      translations[index] = {
                                        ...translation,
                                        script: e.target.value,
                                      };
                                      setStatus(
                                          {
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
                                        setStatus(
                                            {
                                              ...status,
                                              dialogData: {
                                                ...status.dialogData,
                                                translations: translations,
                                              },
                                            });
                                      } else {
                                        const translations = [
                                          ...status.dialogData.translations.slice(0,
                                              index),
                                          ...status.dialogData.translations.slice(
                                              index + 1)];
                                        setStatus(
                                            {
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
                                  className={'w-full p-2 border rounded mt-2'}
                                  placeholder={'笔记...'}>

                              </textarea>

                              {/*<textarea*/}
                              {/*    className={'w-full p-2 border rounded '}*/}
                              {/*    placeholder={'笔记：解释...'}>*/}

                              {/*</textarea>*/}
                            </div>
                        );
                      }
                  )
                }


                {/* 对话框操作区 */}
                <div className="flex justify-end gap-2 mt-2 ">
                  <button
                      onClick={() => {addTranslation();}}
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
                            status.dialogData.weight2 = '';
                          } else if (status.currentWordIndex ===
                              status.words.length - 1) {
                            status.dialogData.weight1 = '';
                            status.dialogData.weight2 = status.words[status.currentWordIndex].weight;
                          } else {
                            status.dialogData.weight1 = status.words[status.currentWordIndex].weight;
                            status.dialogData.weight2 = status.words[status.currentWordIndex +
                            1].weight;
                          }

                          // 锁屏
                          setStatus((prevStatus) => ({
                            ...prevStatus,
                            isProcessing: true,
                          }));

                          const response = await fetch(
                              '/api/words-english-chinese',
                              {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(status.dialogData),
                              });

                          if (response.ok) {
                            const data = await response.json();
                            console.log(data);

                            if (data.success && data.data) {
                              toast.success(
                                  'Successfully added to notebook!' +
                                  JSON.stringify(data.data));

                              if (!!data.data.translations) {
                                data.data.translations.forEach(
                                    (translation) => {

                                      const word = {
                                        id: translation.id,
                                        cid: translation.cid,
                                        nid: translation.nid,
                                        note: translation.note,
                                        pos: translation.pos,
                                        note_explain: translation.note_explain,
                                        eid: data.data.eid,
                                        script: data.data.script,
                                        word: data.data.word,
                                        accent: data.data.accent,
                                        translation: translation.translation,
                                        translation_script: translation.script,
                                        weight: translation.weight,
                                        phonetic_uk: translation.phonetic_uk,
                                        phonetic_us: translation.phonetic_us,
                                        voice_id_uk: translation.voice_id_uk,
                                        voice_id_us: translation.voice_id_us,
                                        voice_id_translation: translation.voice_id_translation,
                                      };

                                      if (translation.new) { // 如果 translations 中有 weight，说明刚刚加入单词本。该词条需同时进入客户端单词本。
                                        console.debug(
                                            'trans has valid weight');

                                        if (!!data.data.weight1 &&
                                            !data.data.weight2) {
                                          status.words.unshift(word);
                                        } else if (!data.data.weight1 &&
                                            !!data.data.weight2) {
                                          status.words.push(word);
                                          status.currentWordIndex++;
                                        } else if (!!data.data.weight1 &&
                                            !!data.data.weight2) {
                                          status.words.splice(
                                              status.currentWordIndex + 1, 0,
                                              word);
                                          status.currentWordIndex++;
                                        }

                                        delete translation.new;
                                      } // if (translation.weight)
                                      else if (!translation.noted) {
                                        for (let index = status.words.length -
                                            1; index >= 0; index--) {
                                          if (
                                              status.words[index].eid ===
                                              word.eid &&
                                              status.words[index].cid ===
                                              word.cid
                                          ) {
                                            status.words.splice(index, 1);

                                            if (index <
                                                status.currentWordIndex ||
                                                status.currentWordIndex >=
                                                status.words.length) {
                                              status.currentWordIndex--;
                                            }
                                          }
                                        }
                                      } else {
                                        for (let index = status.words.length -
                                            1; index >= 0; index--) {
                                          if (status.words[index].eid ===
                                              word.eid &&
                                              status.words[index].cid ===
                                              word.cid) {
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
                          } else {
                            toast.error('Failed to add to notebook!');
                          }
                        } catch (error) {
                          toast.error('Failed to save:' + error.message);
                        } finally {
                          setStatus({...status, isProcessing: false});
                        }

                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 border"
                  >
                    Save
                  </button>

                  <button
                      onClick={() => {
                        status.dialogData.word = '';
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

        {/* 全屏遮罩 */}
        {status.isProcessing && (
            <div className={'overlay'}>
              <div className={'loader'}>Processing...</div>
            </div>
        )}
      </>
  );
}
