import { atom, useAtom } from 'jotai';

/**
 * import { useStatus } from '@/app/lib/atoms';
 * 
 * const [status, setStatus] = useStatus();
 */

export const notebookAtom = atom({isProcessing: false});
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

