'use client';
import './page.css';

import React, {useEffect, useRef, useState} from 'react';
import {FaPlay, FaPause, FaTrash} from 'react-icons/fa';
import {Dialog, Transition} from '@headlessui/react';

import {handleKeyDown} from '../words/components/common';

export default function Page() {
  const [status, setStatus] = useState({
    currentWordIndex: 0,
    playedWordIndex: -1,
    isPlaying: false,
    words: [],
    isDialogOpen: false,
    dialogData: {translations: []},
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

  function addTranslation() {
    setStatus(
        {
          ...status,
          dialogData: {
            ...status.dialogData,
            translations: [
              ...status.dialogData.translations, {
                cid: '',
                pos: '',
                phonetic_us: '',
                phonetic_uk: '',
                translation: '',
                script: '',
              }],
          },
        });
  }

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
              onClick={() => {
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
                })
              }}
              className="px-4 py-2 bg-gray-800 text-green-900 rounded hover:bg-gray-600"
          >
            Edit / Add
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
                  className="bg-gray-700/95 rounded-lg p-6 max-w-2/3 w-full">
                <input name={'note-word-id'} type={'hidden'}
                       value={status.dialogData.id
                           ? status.dialogData.id
                           : status.words[status.currentWordIndex].id}
                />
                <input name={'notebook-id'} type={'hidden'}
                       value={status.dialogData.nid
                           ? status.dialogData.nid
                           : status.words[status.currentWordIndex].nid}
                />
                <input name={'eid'} type={'hidden'} value={status.dialogData.eid
                    ? status.dialogData.eid
                    : status.words[status.currentWordIndex].eid}
                />
                <input
                    type="text"
                    defaultValue={status.dialogData.word
                        ? status.dialogData.word
                        : status.words[status.currentWordIndex].word}
                    onBlur={(e) => searchEdit(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter word to search"
                />
                <input
                    type="text"
                    value={status.dialogData.accent
                        ? status.dialogData.accent
                        : status.words[status.currentWordIndex].accent}
                    onChange={(e) => setStatus(
                        {
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            accent: e.target.value,
                          },
                        })}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="accent"
                />
                <input
                    type="text"
                    value={status.dialogData.script
                        ? status.dialogData.script
                        : status.words[status.currentWordIndex].script}
                    onChange={(e) => setStatus(
                        {
                          ...status,
                          dialogData: {
                            ...status.dialogData,
                            accent: e.target.value,
                          },
                        })}
                    className="w-full mt-2 p-2 border rounded"
                    placeholder="script"
                />
                {
                  status.dialogData.translations.map((translation, index) => {

                        if (translation.deleted) return null;

                        return (
                            <div key={index}
                                 className="translation mt-2 bg-gray-950/70">
                              <div className={'flex items-center gap-2'}>
                                <input name={'cid'} type={'hidden'}
                                       value={translation.cid}
                                />
                                <input
                                    type="text"
                                    className="w-10 p-2 pl-1 pr-1 border rounded"
                                    placeholder="PoS"
                                    value={translation.pos}
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
                                    value={translation.phonetic_uk}
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
                                <input
                                    type="text"
                                    value={translation.phonetic_us}
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
                                />
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="text"
                                    value={translation.translation}
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
                                    value={translation.script}
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
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-700"
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
                            </div>
                        );
                      }
                  )
                }

                <textarea
                    className={'w-full p-2 border rounded mt-2'}
                    placeholder={'解释'}>

                </textarea>

                <textarea
                    className={'w-full p-2 border rounded '}
                    placeholder={'追加解释'}>

                </textarea>

                {/* 对话框操作区 */}
                <div className="flex justify-end gap-2 mt-2 ">
                  <button
                      onClick={() => {addTranslation(true);}}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700"
                  >
                    Add Translation
                  </button>

                  <button
                      onClick={() => {}}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700"
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
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:bg-gray-900"
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
