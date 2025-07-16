'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
  currentWordIndexAtom, 
  wordsAtom, 
  uiStateAtom, 
  dialogDataAtom 
} from '@/app/lib/atoms';
import { useAudioPlayer } from './useAudioPlayer';
import { toast } from 'react-toastify';

export const useKeyboardShortcuts = () => {
  const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
  const [words] = useAtom(wordsAtom);
  const [uiState, setUiState] = useAtom(uiStateAtom);
  const [, setDialogData] = useAtom(dialogDataAtom);
  const { nextWord, previousWord, togglePlayback, playCurrentWord } = useAudioPlayer();

  const handleKeyDown = (event: KeyboardEvent) => {
    // 如果正在输入中文，不处理快捷键
    if (uiState.isComposing) return;

    // 如果对话框打开，只处理ESC键
    if (uiState.isDialogOpen || uiState.isConfigDialogOpen) {
      if (event.key === 'Escape') {
        setUiState(prev => ({ 
          ...prev, 
          isDialogOpen: false, 
          isConfigDialogOpen: false 
        }));
      }
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextWord();
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        previousWord();
        break;
        
      case ' ': // 空格键
        event.preventDefault();
        togglePlayback();
        break;
        
      case 'Enter':
        event.preventDefault();
        playCurrentWord();
        break;
        
      case 'Home':
        event.preventDefault();
        setCurrentWordIndex(0);
        break;
        
      case 'End':
        event.preventDefault();
        setCurrentWordIndex(words.length - 1);
        break;
        
      case 'Tab':
        event.preventDefault();
        setUiState(prev => ({ ...prev, isTabPressed: true }));
        // 搜索当前单词
        if (words[currentWordIndex]) {
          searchExistingWordsEnglishChinese(words[currentWordIndex].word);
        }
        break;
        
      case 'Escape':
        setUiState(prev => ({ 
          ...prev, 
          isDialogOpen: false, 
          isConfigDialogOpen: false 
        }));
        break;
        
      case 's':
      case 'S':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          setUiState(prev => ({ ...prev, isConfigDialogOpen: true }));
        }
        break;
        
      case 'e':
      case 'E':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (words[currentWordIndex]) {
            setUiState(prev => ({ ...prev, isDialogOpen: true }));
          }
        }
        break;
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      setUiState(prev => ({ ...prev, isTabPressed: false }));
    }
  };

  const handleCompositionStart = () => {
    setUiState(prev => ({ ...prev, isComposing: true }));
  };

  const handleCompositionEnd = () => {
    setUiState(prev => ({ ...prev, isComposing: false }));
  };

  /**
   * 检索已入库单词
   */
  const searchExistingWordsEnglishChinese = async (word: string) => {
    if (!uiState.isTabPressed) return;
    
    try {
      const response = await fetch(`/api/words-english-chinese?word=${word}`);
      const data = await response.json();
      
      if (data?.data.length > 0) {
        setDialogData(data.data[0]);
        setUiState(prev => ({ ...prev, isDialogOpen: true }));
        toast.info(`${word} found.`);
      } else {
        setDialogData({
          eid: '',
          word: word,
          accent: '',
          script: '',
          syllable: '',
          translations: [{
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
        });
        toast.error(`${word} not found.`);
      }
    } catch (error) {
      console.error('Failed to search english-chinese:', error);
      toast.error('查询失败，请检查网络或稍后再试');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [currentWordIndex, words, uiState, nextWord, previousWord, togglePlayback, playCurrentWord]);

  return {
    searchExistingWordsEnglishChinese
  };
};