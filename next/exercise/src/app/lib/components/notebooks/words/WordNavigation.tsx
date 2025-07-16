'use client';

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  wordsAtom, 
  currentWordIndexAtom, 
  uiStateAtom 
} from '@/app/lib/atoms';

export const WordNavigation: React.FC = () => {
  const [words] = useAtom(wordsAtom);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
  const [uiState, setUiState] = useAtom(uiStateAtom);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    
    const searchTerm = searchInput.trim().toLowerCase();
    const foundIndex = words.findIndex(word => 
      word.word.toLowerCase().includes(searchTerm) ||
      word.translations?.some(t => 
        t.translation.toLowerCase().includes(searchTerm)
      )
    );
    
    if (foundIndex !== -1) {
      setCurrentWordIndex(foundIndex);
      setSearchInput('');
    } else {
      // 可以显示未找到的提示
      console.log('未找到匹配的单词');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const jumpToIndex = (index: number) => {
    if (index >= 0 && index < words.length) {
      setCurrentWordIndex(index);
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    
    // 停止播放
    setUiState(prev => ({ 
      ...prev, 
      onWheel: false, 
      isPlaying: false 
    }));

    const delta = event.deltaY;
    if (delta > 0) {
      // 向下滚动
      const newIndex = Math.min(words.length - 1, currentWordIndex + 1);
      setCurrentWordIndex(newIndex);
    } else {
      // 向上滚动
      const newIndex = Math.max(0, currentWordIndex - 1);
      setCurrentWordIndex(newIndex);
    }
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      {/* 搜索框 */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="搜索单词或翻译..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSearch} size="sm">
          <FaSearch className="w-4 h-4" />
        </Button>
      </div>

      {/* 进度信息 */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          单词 {currentWordIndex + 1} / {words.length}
        </div>
        <div className="text-sm text-muted-foreground">
          进度: {((currentWordIndex + 1) / words.length * 100).toFixed(1)}%
        </div>
      </div>

      {/* 快速跳转按钮 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpToIndex(0)}
          disabled={currentWordIndex === 0}
        >
          首个
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpToIndex(Math.floor(words.length * 0.25))}
        >
          25%
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpToIndex(Math.floor(words.length * 0.5))}
        >
          50%
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpToIndex(Math.floor(words.length * 0.75))}
        >
          75%
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => jumpToIndex(words.length - 1)}
          disabled={currentWordIndex === words.length - 1}
        >
          末个
        </Button>
      </div>

      {/* 滚轮控制区域 */}
      <div 
        className="h-20 bg-muted rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
        onWheel={handleWheel}
      >
        <div className="text-sm text-muted-foreground text-center">
          <div>滚轮控制区域</div>
          <div className="text-xs mt-1">向上/下滚动切换单词</div>
        </div>
      </div>
    </div>
  );
};