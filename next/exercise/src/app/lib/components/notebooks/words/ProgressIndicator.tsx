'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { wordsAtom, currentWordIndexAtom, uiStateAtom } from '@/app/lib/atoms';
import { Progress } from '@/components/ui/progress';

export const ProgressIndicator: React.FC = () => {
  const [words] = useAtom(wordsAtom);
  const [currentWordIndex] = useAtom(currentWordIndexAtom);
  const [uiState] = useAtom(uiStateAtom);

  if (words.length === 0) {
    return null;
  }

  const progress = ((currentWordIndex + 1) / words.length) * 100;
  const currentWord = words[currentWordIndex];

  return (
    <div className="bg-card rounded-lg border p-4 mb-6">
      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">学习进度</span>
          <span className="text-sm text-muted-foreground">
            {currentWordIndex + 1} / {words.length} ({progress.toFixed(1)}%)
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* 当前单词信息 */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="font-medium">
            当前: {currentWord?.word}
          </span>
          {currentWord?.translations?.[0]?.translation && (
            <span className="text-muted-foreground">
              {currentWord.translations[0].translation}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {uiState.isPlaying && (
            <span className="text-green-600 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              播放中
            </span>
          )}
          
          {uiState.isProcessing && (
            <span className="text-blue-600 text-xs flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              处理中
            </span>
          )}
        </div>
      </div>
    </div>
  );
};