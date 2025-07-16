'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';
import { wordsAtom, currentWordIndexAtom, uiStateAtom } from '@/app/lib/atoms';

export const useWordData = () => {
  const [words, setWords] = useAtom(wordsAtom);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
  const [uiState, setUiState] = useAtom(uiStateAtom);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setUiState(prev => ({ ...prev, isProcessing: true }));
        
        const response = await fetch('/api/notebook-words-english');
        const json = await response.json();

        if (json.success) {
          // 从localStorage读取保存的索引
          try {
            let savedIndex = 0;
            const saved = localStorage.getItem('wordStatus');
            if (saved) {
              savedIndex = parseInt(saved, 10);
              if (isNaN(savedIndex) || savedIndex >= json.data.length) {
                savedIndex = 0;
              }
            }
            setCurrentWordIndex(savedIndex);
          } catch (e) {
            console.error('读取保存的索引失败:', e);
            setCurrentWordIndex(0);
          }

          setWords(json.data);
        } else {
          console.error('API 报错');
          toast.error('无法从API加载单词数据');
        }
      } catch (error) {
        console.error('获取单词数据失败:', error);
        toast.error('获取单词数据失败，请检查网络连接');
      } finally {
        setUiState(prev => ({ ...prev, isProcessing: false }));
      }
    };

    fetchWords();
  }, [setWords, setCurrentWordIndex, setUiState]);

  // 保存当前索引到localStorage
  useEffect(() => {
    if (words.length > 0) {
      localStorage.setItem('wordStatus', currentWordIndex.toString());
    }
  }, [currentWordIndex, words.length]);

  return {
    words,
    currentWordIndex,
    isLoading: uiState.isProcessing
  };
};