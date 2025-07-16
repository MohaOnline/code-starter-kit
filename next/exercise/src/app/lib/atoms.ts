import { atom, useAtom } from 'jotai';

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

// 音频配置状态
export const audioConfigAtom = atom<AudioConfig>({
  alternatePlay: false,
  volume: 100,
  speed: 100,
  english: {
    repeatCount: 1,
    pauseTime: 0,
    showText: true,
    waitVoiceLength: true,
  },
  chinese: {
    repeatCount: 0,
    pauseTime: 0,
    showText: true,
    waitVoiceLength: true,
  },
});

// UI状态
export const uiStateAtom = atom({
  isPlaying: false,
  isDialogOpen: false,
  isConfigDialogOpen: false,
  isProcessing: false,
  isComposing: false,
  isTabPressed: false,
  searchText: '',
  onWheel: false,
  mode: 'study' as 'study' | 'listen',
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

export function initStatusNote(): Note {
    return {
        id: '',
        title: '',
        body: '',
        question: '',
        answer: '',
        type_id: '',
        type_title: '',
        type_title_sub: '',
        note: '',
        note_extra: '',
        type: {
            id: '',
            title: '',
            title_sub: '',
        },
        body_script: '',
        body_extra: '',
    }
}

// 通用 status，所有数据在此周转。
// Define the status atom without the handler function
export const status = atom({
    notes: [],
    note: initStatusNote(),
    types: [],
    isAdding: false,
    isProcessing: false,
    isPlaying: false,

    // Words announcing data:
    words: [],
    currentWordIndex: 0,

    // listening dialog
    notesListeningDialog: {
        notes: [],
        currentNoteIndex: 0,
        isPlaying: false,
    }
});

// 自定义 Hook 也是一个以 'use' 开头的函数
export function useStatus() {
    // 在自定义 Hook 内部调用 useAtom 是允许的
    return useAtom(status);
}

