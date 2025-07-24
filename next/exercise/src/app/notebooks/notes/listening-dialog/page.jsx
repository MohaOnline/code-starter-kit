'use client';

/**
 * 候选控件：
 * - https://github.com/jedwatson/react-select
 */

import { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ModeToggle from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check, ChevronsUpDown, X, Square, CheckSquare } from 'lucide-react';

import { NoteListeningDialog } from '@/app/notebooks/notes/libs/NoteListeningDialog';
import { ProcessingMask } from '@/app/lib/components/ProcessingMask';
import { NoteDialog } from "@/app/notebooks/notes/libs/NoteDialog";
import NavTop from '@/app/lib/components/NavTop';
import { initStatusNote, useStatus } from '@/app/lib/atoms';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

export default function NotesListeningDialog() {

  const [status, setStatus] = useStatus();
  const [isSequentialPlaying, setIsSequentialPlaying] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // 控制粘性定位状态
  const operationRef = useRef(null); // 操作栏的引用
  const originalOffsetTop = useRef(0); // 记录操作栏的原始位置

  // 加载所有 notes
  useEffect(() => {
    fetch('/api/notebooks/notes/list/11')
      .then(res => res.json())
      .then(json => {
        setStatus((prev) => ({
          ...prev,
          notesListeningDialog: {
            ...prev.notesListeningDialog,
            notes: json.notes,
          },
        }))
      })
      .catch(err => {
        console.error('Fetch API error: /api/notebooks/notes/list');
        toast.error('cant load notes from API.');
      });

  }, []);

  // 监听滚动事件，实现粘性导航栏
  useEffect(() => {
    // 记录操作栏的原始位置
    if (operationRef.current) {
      originalOffsetTop.current = operationRef.current.offsetTop;
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // 只有当滚动位置超过操作栏原始位置时才启用粘性定位
      // 当滚动回到原始位置以上时则取消粘性定位
      setIsSticky(scrollTop > originalOffsetTop.current);
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 清理函数：组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 处理顺序播放 - 主要的播放控制逻辑
  const handleSequentialPlay = () => {
    console.log('🎵 [Sequential Play] 触发顺序播放按钮，当前状态:', {
      isSequentialPlaying,
      isPlaying: status.notesListeningDialog?.isPlaying,
      currentNoteIndex: status.notesListeningDialog.currentNoteIndex,
      notesCount: status.notesListeningDialog.notes.length
    });
    
    if (isSequentialPlaying) {
      // 停止顺序播放
      console.log('⏹️ [Sequential Play] 停止顺序播放');
      setIsSequentialPlaying(false);
      // 停止当前播放的音频
      const currentNote = status.notesListeningDialog.notes[status.notesListeningDialog.currentNoteIndex];
      if (currentNote) {
        // 通过触发自定义事件来停止当前音频
        window.dispatchEvent(new CustomEvent('stopSequentialAudio'));
        console.log('📡 [Sequential Play] 已发送 stopSequentialAudio 事件');
      }
      // 重置播放状态
      setStatus((prev) => ({
        ...prev,
        notesListeningDialog: {
          ...prev.notesListeningDialog,
          isPlaying: false,
        },
      }));
    } else {
      // 开始顺序播放
      console.log('▶️ [Sequential Play] 开始顺序播放');
      setIsSequentialPlaying(true);
      // 关闭所有音频的循环播放，避免影响顺序播放
      window.dispatchEvent(new CustomEvent('disableAllLoops'));
      console.log('📡 [Sequential Play] 已发送 disableAllLoops 事件');
      // 从当前选中的项开始播放
      const startIndex = status.notesListeningDialog.currentNoteIndex || 0;
      playNoteAtIndex(startIndex);
    }
  };

  // 播放指定索引的笔记 - 核心的音频切换逻辑
  const playNoteAtIndex = (index) => {
    console.log('🎯 [Play Note] 尝试播放笔记:', {
      index,
      noteId: status.notesListeningDialog.notes[index]?.id,
      notesLength: status.notesListeningDialog.notes.length,
      isValidIndex: index >= 0 && index < status.notesListeningDialog.notes.length
    });
    
    if (index >= status.notesListeningDialog.notes.length) {
      // 播放完所有音频，停止顺序播放
      console.log('✅ [Play Note] 所有音频播放完成，重置状态');
      setIsSequentialPlaying(false);
      // 重置播放状态
      setStatus((prev) => ({
        ...prev,
        notesListeningDialog: {
          ...prev.notesListeningDialog,
          isPlaying: false,
        },
      }));
      return;
    }

    // 设置当前播放项
    setStatus((prev) => ({
      ...prev,
      notesListeningDialog: {
        ...prev.notesListeningDialog,
        currentNoteIndex: index,
        isPlaying: true,
      },
    }));
    console.log('📝 [Play Note] 已更新 currentNoteIndex 为:', index);

    // 播放当前音频
    setTimeout(() => {
      const playEvent = new CustomEvent('playSequentialAudio', {
        detail: { noteIndex: index }
      });
      window.dispatchEvent(playEvent);
      console.log('📡 [Play Note] 已发送 playSequentialAudio 事件:', {
        noteIndex: index,
        noteId: status.notesListeningDialog.notes[index]?.id,
        noteTitle: status.notesListeningDialog.notes[index]?.title || '无标题'
      });
    }, 100);
  };

  // 监听音频播放结束事件 - 自动切换到下一个音频的核心逻辑
  useEffect(() => {
    const handleAudioEnded = (event) => {
      console.log('🔚 [Audio Ended] 收到音频播放结束事件:', {
        isSequentialPlaying,
        currentNoteIndex: status.notesListeningDialog.currentNoteIndex,
        notesLength: status.notesListeningDialog.notes.length,
        eventDetail: event.detail
      });
      
      if (isSequentialPlaying) {
        const nextIndex = status.notesListeningDialog.currentNoteIndex + 1;
        console.log('➡️ [Audio Ended] 计算下一个索引:', {
          currentIndex: status.notesListeningDialog.currentNoteIndex,
          nextIndex,
          hasNext: nextIndex < status.notesListeningDialog.notes.length
        });
        
        if (nextIndex >= status.notesListeningDialog.notes.length) {
          // 播放完所有音频，停止顺序播放
          console.log('✅ [Audio Ended] 所有音频播放完成，重置状态');
          setIsSequentialPlaying(false);
          setStatus((prev) => ({
            ...prev,
            notesListeningDialog: {
              ...prev.notesListeningDialog,
              isPlaying: false,
            },
          }));
        } else {
          console.log('▶️ [Audio Ended] 播放下一个音频，索引:', nextIndex);
          playNoteAtIndex(nextIndex);
        }
      } else {
        console.log('ℹ️ [Audio Ended] 非顺序播放模式，忽略事件');
      }
    };

    // 添加事件监听器
    window.addEventListener('sequentialAudioEnded', handleAudioEnded);
    console.log('👂 [Event Listener] 已添加 sequentialAudioEnded 事件监听器');
    
    return () => {
      window.removeEventListener('sequentialAudioEnded', handleAudioEnded);
      console.log('🗑️ [Event Listener] 已移除 sequentialAudioEnded 事件监听器');
    };
  }, [isSequentialPlaying, status.notesListeningDialog.currentNoteIndex, status.notesListeningDialog.notes.length]);

  return (
    <div className="w-full">
      <NavTop />
      <h1 className="text-3xl font-bold text-center">
        Listening Dialog
      </h1>

      {/* 笔记添加 */}
      {/* 当操作栏固定时的占位元素，防止内容跳跃 */}
      {isSticky && <div className="h-16 mb-2"></div>}
      
      <div 
        ref={operationRef}
        className={`operation text-right flex items-center justify-end gap-2 mb-2 transition-all duration-200 ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md px-4 py-2' 
            : ''
        }`}
      >
        <Button variant="outline" onClick={handleSequentialPlay}>
          {isSequentialPlaying && status.notesListeningDialog?.isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
        </Button>
        <NoteDialog preOpenCallback={() => {
          setStatus((prev) => ({
            ...prev,
            note: {
              ...initStatusNote(),
              type: {
                title: '英语听力：对话',
                title_sub: '高中',
                id: '11',
              },
            },
          }));
        }} />
        <ModeToggle />
      </div>

      {status.notesListeningDialog?.notes?.length === 0 && <div>Loading...</div>}

      <div className="notes flex flex-col gap-4">
        {status.notesListeningDialog.notes
          ?.map((note, index) => (
            <div 
              key={note.id}
              onClick={(e) => {
                // 检查是否有文字被选中，如果有则不触发点击事件
                const selection = window.getSelection();
                if (selection && selection.toString().length > 0) {
                  return;
                }
                
                // 检查点击的目标是否是可交互元素
                const target = e.target;
                if (target instanceof HTMLElement) {
                  if (target.tagName === 'BUTTON' || 
                      target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.closest('button') || 
                      target.closest('input') || 
                      target.closest('textarea') ||
                      target.closest('.audio-controls') ||
                      target.closest('.choice-option') ||
                      target.closest('.operation')) {
                    return;
                  }
                }
                
                console.log('👆 [Note Click] 用户点击笔记项:', {
                  index,
                  noteId: note.id,
                  noteTitle: note.title || '无标题',
                  previousIndex: status.notesListeningDialog.currentNoteIndex
                });
                
                setStatus((prev) => ({
                  ...prev,
                  notesListeningDialog: {
                    ...prev.notesListeningDialog,
                    currentNoteIndex: index,
                  },
                }));
              }}
              style={{
                border: status.notesListeningDialog.currentNoteIndex === index 
                  ? '2px solid #D2B48C' 
                  : '1px solid transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
            >
              <NoteListeningDialog 
                note={note} 
                isCurrentNote={status.notesListeningDialog.currentNoteIndex === index}
                noteIndex={index}
              />
            </div>
          ))}
      </div>
      <ProcessingMask />
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
  );
}
