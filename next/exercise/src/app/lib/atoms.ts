import { atom, useAtom } from 'jotai';

/**
 * import { useStatus } from '@/app/lib/atoms';
 * 
 * const [status, setStatus] = useStatus();
 */

export const notebookAtom = atom({isProcessing: false});
export const englishWordsAtom = atom({});

// 通用 status，所有数据在此周转。
export const status = atom({
    notes: [],
    types: [],
    type: {
        id: '',
        title: '',
        title_sub: '',
    },
    isAdding: false,
    isProcessing: false
});

// 自定义 Hook 也是一个以 'use' 开头的函数
export function useStatus() {
    // 在自定义 Hook 内部调用 useAtom 是允许的
    return useAtom(status);
}

