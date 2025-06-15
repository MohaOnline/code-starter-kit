import { atom, useAtom } from 'jotai';

interface statusAtom {
    isProcessing: boolean,
}

export const notebookAtom = atom({isProcessing: false});
export const englishWordsAtom = atom({});

export const status = atom({isProcessing: false});

// 自定义 Hook 也是一个以 'use' 开头的函数
export function useStatus() {
    // 在自定义 Hook 内部调用 useAtom 是允许的
    return useAtom(status);
}

