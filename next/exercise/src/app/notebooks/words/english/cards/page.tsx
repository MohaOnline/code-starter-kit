'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavTop from '@/app/lib/components/NavTop';
import ModeToggle from '@/components/mode-toggle';
import { WordDisplay } from '@/app/lib/components/notebooks/words/WordDisplay';
import { AudioControls } from '@/app/lib/components/notebooks/words/AudioControls';
import { WordNavigation } from '@/app/lib/components/notebooks/words/WordNavigation';
import { AudioConfigDialog } from '@/app/lib/components/notebooks/words/AudioConfigDialog';
import { WordEditDialog } from '@/app/lib/components/notebooks/words/WordEditDialog';
import { ProgressIndicator } from '@/app/lib/components/notebooks/words/ProgressIndicator';
import { useKeyboardShortcuts } from '@/app/lib/components/notebooks/words/hooks/useKeyboardShortcuts';
import { useWordData } from '@/app/lib/components/notebooks/words/hooks/useWordData';
import { useAudioPlayer } from '@/app/lib/components/notebooks/words/hooks/useAudioPlayer';
import { ProcessingMask } from '@/app/lib/components/ProcessingMask';

export default function EnglishWordsCardsPage() {
  // 初始化数据和音频播放器
  useWordData();
  useAudioPlayer();
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-background">
      <NavTop />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">英语单词学习</h1>
            <ModeToggle />
          </div>
          
          <ProgressIndicator />
          <WordDisplay />
          <AudioControls />
          <WordNavigation />
          
          <AudioConfigDialog />
          <WordEditDialog />
          <ProcessingMask />
        </div>
      </div>
      
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