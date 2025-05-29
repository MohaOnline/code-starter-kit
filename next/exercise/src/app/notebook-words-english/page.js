'use client';
import './page.css';

import React, {useEffect, useRef, useState} from 'react';
import {FaPlay, FaPause, FaTrash} from 'react-icons/fa';
import {Dialog, Transition} from '@headlessui/react';
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    // 处理中文输入法 ESC 意外关闭 Dialog
    const handleCompositionStart = () => {
      setStatus({...status, isComposing: true});
    };

    const handleCompositionEnd = () => {
      setStatus({...status, isComposing: false});
    };

    // 添加键盘事件监听器
    document.addEventListener('keydown', keyDownCallback);
    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);

    // 清理函数（组件卸载时移除键盘监听器）
    return () => {
      document.removeEventListener('keydown', keyDownCallback);
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
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

  /**
   * 检索已入库单词
   */
  const searchExistingWordsEnglishChinese = async (word) => {

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
                script: '',
                noted: false,
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
          {/* Edit / Add Button */}
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
              className="px-4 py-2 bg-gray-800 text-green-900 rounded hover:bg-gray-600"
          >
            Edit / Add
          </button>
          <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
        </div>

        <Transition show={status.isDialogOpen}
                    className="">
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
                    value={status.dialogData.word}
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
                         value={status.dialogData.eid}
                         readOnly={true}
                         className={'w-auto p-2 border pointer-events-none'}
                  /></div>
                <input
                    type="text"
                    value={status.dialogData.accent}
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
                    value={status.dialogData.syllable}
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
                    value={status.dialogData.script}
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
                                       value={translation.id}
                                />
                                <input name={'notebook-id'} type={'hidden'}
                                       value={translation.nid}
                                />
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
                                    checked={translation.noted}
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
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700"
                  >
                    Add Translation
                  </button>

                  {/* 提交单词 */}
                  <button
                      onClick={async () => {
                        try {

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

                              setStatus({
                                ...status, // 复制现有状态
                                dialogData: data.data,
                              });

                            }
                          } else {
                            toast.error('Failed to add to notebook!');
                          }
                        } catch (error) {
                          toast.error('Failed to save:' + error.message);
                        }

                      }}
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
