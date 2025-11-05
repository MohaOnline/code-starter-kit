"use client"

import {useCallback} from "react";
import {atom, useAtom} from 'jotai';

/**
 * import { useStatus } from '@/app/lib/atoms';
 *
 * const [status, setStatus] = useStatus();
 */

export const notebookAtom = atom({isProcessing: false});

// 英语单词学习应用状态管理
export interface AudioConfig {
  alternatePlay: boolean;
  volume: number;
  speed: number;
  english: {
    repeatCount: number;
    pauseTime: number;
    showText: boolean;
    waitVoiceLength: boolean;
  };
  chinese: {
    repeatCount: number;
    pauseTime: number;
    showText: boolean;
    waitVoiceLength: boolean;
  };
}

// 音频配置状态
export const audioConfigAtom = atom<AudioConfig>({
  alternatePlay: false,
  volume:        100,
  speed:         100,
  english:       {
    repeatCount:     1,
    pauseTime:       0,
    showText:        true,
    waitVoiceLength: true,
  },
  chinese:       {
    repeatCount:     0,
    pauseTime:       0,
    showText:        true,
    waitVoiceLength: true,
  },
});

export interface Word {
  id: string;
  word: string;
  voice_id_uk: string;
  voice_id_translation: string;
  weight: number;
  translations: Translation[];
}

export interface Translation {
  id: string;
  cid: string;
  nid: string;
  pos: string;
  phonetic_us: string;
  phonetic_uk: string;
  translation: string;
  script: string;
  noted: boolean;
  note: string;
  note_explain: string;
  deleted?: boolean;
}

// 单词数据状态
export const wordsAtom = atom<Word[]>([]);
export const currentWordIndexAtom = atom<number>(0);
export const playedWordIndexAtom = atom<number>(-1);

// UI状态
export const uiStateAtom = atom({
  isPlaying:   false,
  isDialogOpen: false,
  isConfigDialogOpen: false,
  isProcessing: false,
  isComposing: false,
  isTabPressed: false,
  searchText:  '',
  onWheel:     false,
  mode:        'study' as 'study' | 'listen',
  processingMessage: '',
});

// 对话框数据状态
export const dialogDataAtom = atom<{
  eid?: string;
  word?: string;
  accent?: string;
  script?: string;
  syllable?: string;
  translations: Translation[];
}>({
  translations: []
});

export const englishWordsAtom = atom({});

export interface NoteType {
  id: string;
  title: string;
  title_sub: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  question: string;
  answer: string;
  type_id: string;
  type_title: string;
  type_title_sub: string;
  note: string;
  note_extra: string;
  type: NoteType;
  body_script: string;
  body_extra: string;
}

// 初始化笔记状态的默认值
export function initStatusNote(): Note {
  return {
    id:          '',
    title:       '',
    body:        '',
    question:    '',
    answer:      '',
    type_id:     '',
    type_title:  '',
    type_title_sub: '',
    note:        '',
    note_extra:  '',
    type:        {
      id:    '',
      title: '',
      title_sub: '',
    },
    body_script: '',
    body_extra:  '',
  }
}

// 定义状态类型
export type StatusType = {
  notes: any[];
  note: Note;               //
  types: any[];
  isAdding: boolean;
  isEditing: boolean;       // Current Note Editing flag.
  isProcessing: boolean;
  isPlaying: boolean;
  currentNoteId: string;    // 有值；无值。用 status.note 显示笔记。
  selectedTypeID: string;   // /notebooks/notes/v02/list 选中的 TypeID。
  cursorPositionBodyScript?: number;  // 光标位置，用于预览点击同步到编辑器
  noteEditorCursorPositions: {
    question: number;
    answer: number;
    body: number;
    body_script: number;
    note: number;
    note_extra: number;
  };
  noteViewConfig: {
    loopMode: string; // one; all; next; none
    pagingSize: number;
  }
  words: any[];
  currentWordIndex: number;
  notesListeningDialog: {
    notes: any[];
    currentNoteIndex: number;
    isPlaying: boolean;
  };
  setSelectedTypeID: (tid: string) => void;
  setTypes: (loadedTypes: any[]) => void;
  setEditing: any;
  cancelEditing: any;
  setProcessing: any;
  cancelProcessing: any;
};

export function initNoteCursorPositions() {
  return {
    question:    -1,
    answer:      -1,
    body:        -1,
    body_script: -1,
    note:        -1,
    note_extra:  -1,
  };
}

// 通用 status，所有数据在此周转。
// Define the status atom with proper typing
export const status = atom<StatusType>({
  notes:          [],
  note:           initStatusNote(),
  noteEditorCursorPositions: initNoteCursorPositions(),
  noteViewConfig:            {
    loopMode:   'none',
    pagingSize: 10,
  },
  types:          [],
  selectedTypeID: '', // 默认无选中 Type ID
  isAdding:       false,
  isEditing:      false,
  isProcessing:   false,
  isPlaying:      false,
  currentNoteId:  '',  /**/

  // Words announcing data:
  words: [],
  currentWordIndex: 0,

  // listening dialog
  notesListeningDialog: {
    notes:     [],
    currentNoteIndex: 0,
    isPlaying: false,
  },
  setSelectedTypeID: (tid: string) => {
  },
  setTypes:             (loadedTypes: any[]) => {
  },
  setEditing:           () => {
  },
  cancelEditing:        () => {
  },
  setProcessing:        () => {
  },
  cancelProcessing:     () => {
  }
});

// 自定义 Hook 也是一个以 'use' 开头的函数
// 提供状态管理和调试日志功能
export function useStatus(): [StatusType, (updater: StatusType | ((prev: StatusType) => StatusType)) => void] {
  // 在自定义 Hook 内部调用 useAtom 是允许的
  const [statusValue, setStatusValue] = useAtom(status);

  // 包装 setStatus 函数，添加调试日志
  const setStatusWithLog = (updater: StatusType | ((prev: StatusType) => StatusType)) => {
    if (typeof updater === 'function') {
      setStatusValue((prevStatus) => {
        const newStatus = updater(prevStatus);

        // 检查 notesListeningDialog 相关的状态变化
        if (newStatus.notesListeningDialog !== prevStatus.notesListeningDialog) {
          console.log('📊 [Status Update] notesListeningDialog 状态变化:', {
            previous: {
              currentNoteIndex: prevStatus.notesListeningDialog.currentNoteIndex,
              isPlaying:  prevStatus.notesListeningDialog.isPlaying,
              notesCount: prevStatus.notesListeningDialog.notes.length
            },
            new:      {
              currentNoteIndex: newStatus.notesListeningDialog.currentNoteIndex,
              isPlaying:  newStatus.notesListeningDialog.isPlaying,
              notesCount: newStatus.notesListeningDialog.notes.length
            }
          });
        }

        // 检查全局播放状态变化
        if (newStatus.isPlaying !== prevStatus.isPlaying) {
          console.log('🎵 [Status Update] 全局播放状态变化:', {
            previous: prevStatus.isPlaying,
            new: newStatus.isPlaying
          });
        }

        return newStatus;
      });
    } else {
      // 直接设置状态值的情况
      console.log('📊 [Status Update] 直接状态更新:', updater);
      setStatusValue(updater);
    }
  };

  statusValue.setSelectedTypeID = useCallback(function (tid) {
    statusValue.selectedTypeID = tid;
    // 存储到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTypeID', tid);
    }
    setStatusWithLog(prev => ({...prev, selectedTypeID: tid}));
  }, [setStatusWithLog]);

  statusValue.setEditing = useCallback(function () {
    statusValue.isEditing = true;
    setStatusWithLog(prev => ({...prev, isEditing: true}));
  }, [setStatusWithLog]);

  statusValue.cancelEditing = useCallback(function () {
    statusValue.isEditing = false;
    setStatusWithLog(prev => ({...prev, isEditing: false}));
  }, [setStatusWithLog]);

  statusValue.setProcessing = useCallback(function () {
    statusValue.isProcessing = true;
    setStatusWithLog(prev => ({...prev, isProcessing: true}));
  }, [setStatusWithLog]);

  statusValue.cancelProcessing = useCallback(function () {
    statusValue.isProcessing = false;
    setStatusWithLog(prev => ({...prev, isProcessing: false}));
  }, [setStatusWithLog]);

  // 保存 Types 并从 localStorage 恢复选中的 Type ID
  statusValue.setTypes = useCallback(function (loadedTypes: any[]) {
    if (typeof window !== 'undefined') {
      const savedTypeID = localStorage.getItem('selectedTypeID');
      if (savedTypeID) {
        console.log('savedTypeID:', savedTypeID);
        // 检查保存的 Type ID 是否在可用的 types 中
        const isValidTypeID = loadedTypes.some(type => type.id === savedTypeID);
        if (isValidTypeID) {
          statusValue.selectedTypeID = savedTypeID;
          setStatusWithLog(prev => ({
            ...prev,
            types:          loadedTypes,
            selectedTypeID: savedTypeID,
          }));

          console.log('set valid Type ID:', savedTypeID);
          return;
        } else {
          // 如果无效，清除 localStorage 中的值
          localStorage.removeItem('selectedTypeID');
        }
      }
    }
    // 如果无法恢复 selectedTypeID，则仅保存已加载 Types。
    setStatusWithLog(prev => ({
      ...prev,
      types: loadedTypes
    }));
  }, [setStatusWithLog]);

  return [statusValue, setStatusWithLog];
}