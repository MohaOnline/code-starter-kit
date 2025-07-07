'use client';

/**
 * 候选控件：
 * - https://github.com/jedwatson/react-select
 */

import { useEffect, useState } from 'react';
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

  // 顺序播放逻辑
  const handleSequentialPlay = () => {
    if (isSequentialPlaying) {
      // 暂停顺序播放
      setIsSequentialPlaying(false);
      // 停止当前播放的音频
      const currentNote = status.notesListeningDialog.notes[status.notesListeningDialog.currentNoteIndex];
      if (currentNote) {
        // 通过触发自定义事件来停止当前音频
        window.dispatchEvent(new CustomEvent('stopSequentialAudio'));
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
      setIsSequentialPlaying(true);
      // 关闭所有音频的循环播放
      window.dispatchEvent(new CustomEvent('disableAllLoops'));
      // 从当前选中的项开始播放
      const startIndex = status.notesListeningDialog.currentNoteIndex || 0;
      playNoteAtIndex(startIndex);
    }
  };

  const playNoteAtIndex = (index) => {
    if (index >= status.notesListeningDialog.notes.length) {
      // 播放完所有音频，停止顺序播放
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

    // 播放当前音频
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('playSequentialAudio', {
        detail: { noteIndex: index }
      }));
    }, 100);
  };

  // 监听音频播放结束事件
  useEffect(() => {
    const handleAudioEnded = (event) => {
      if (isSequentialPlaying) {
        const nextIndex = status.notesListeningDialog.currentNoteIndex + 1;
        if (nextIndex >= status.notesListeningDialog.notes.length) {
          // 播放完所有音频，停止顺序播放
          setIsSequentialPlaying(false);
          setStatus((prev) => ({
            ...prev,
            notesListeningDialog: {
              ...prev.notesListeningDialog,
              isPlaying: false,
            },
          }));
        } else {
          playNoteAtIndex(nextIndex);
        }
      }
    };

    window.addEventListener('sequentialAudioEnded', handleAudioEnded);
    return () => {
      window.removeEventListener('sequentialAudioEnded', handleAudioEnded);
    };
  }, [isSequentialPlaying, status.notesListeningDialog.currentNoteIndex, status.notesListeningDialog.notes.length]);

  return (
    <div className="w-full">
      <NavTop />
      <h1 className="text-3xl font-bold text-center">
        Listening Dialog
      </h1>

      {/* 笔记添加 */}
      <div className="operation text-right flex items-center justify-end gap-2 mb-2">
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
