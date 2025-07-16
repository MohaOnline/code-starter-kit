'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaSync 
} from 'react-icons/fa';
import { 
  CgPlayTrackNextR, 
  CgPlayTrackPrevR 
} from 'react-icons/cg';
import { 
  GiPlayerPrevious, 
  GiPlayerNext 
} from 'react-icons/gi';
import { PiGear, PiHandWaving } from 'react-icons/pi';
import { RiFileSearchLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { uiStateAtom, wordsAtom, currentWordIndexAtom } from '@/app/lib/atoms';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { toast } from 'react-toastify';

export const AudioControls: React.FC = () => {
  const [uiState, setUiState] = useAtom(uiStateAtom);
  const [words] = useAtom(wordsAtom);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
  const { 
    playCurrentWord, 
    nextWord, 
    previousWord, 
    togglePlayback, 
    isPlaying 
  } = useAudioPlayer();

  const handlePutEnd = async () => {
    if (currentWordIndex === words.length - 1) {
      return;
    }

    setUiState(prev => ({ ...prev, isProcessing: true }));

    try {
      const response = await fetch('/api/notebook/words/english', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'put_end',
          word: words[currentWordIndex],
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          toast.success('Successfully put word end.');
          // 这里可能需要重新获取单词列表
        }
      } else {
        toast.error('Failed to put word to the end.');
      }
    } catch (error) {
      console.error('Put end failed:', error);
      toast.error('操作失败，请稍后再试');
    } finally {
      setUiState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handlePutNext = async () => {
    if (currentWordIndex === words.length - 1) {
      return;
    }

    setUiState(prev => ({ ...prev, isProcessing: true }));

    try {
      const response = await fetch('/api/notebook/words/english', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'put_next',
          word: words[currentWordIndex],
          weight1: words[currentWordIndex + 1]?.weight,
          weight2: words[currentWordIndex + 2]?.weight,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          toast.success('Successfully put word to next.');
          // 这里可能需要重新获取单词列表
        }
      } else {
        toast.error('Failed to put word to the next.');
      }
    } catch (error) {
      console.error('Put next failed:', error);
      toast.error('操作失败，请稍后再试');
    } finally {
      setUiState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const jumpToFirst = () => {
    setCurrentWordIndex(0);
  };

  const jumpToLast = () => {
    setCurrentWordIndex(words.length - 1);
  };

  const openConfigDialog = () => {
    setUiState(prev => ({ ...prev, isConfigDialogOpen: true }));
  };

  const openEditDialog = () => {
    setUiState(prev => ({ ...prev, isDialogOpen: true }));
  };

  return (
    <div className="bg-card rounded-lg border p-6 mb-6">
      <div className="flex flex-wrap justify-center gap-3">
        {/* 置顶按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePutEnd}
          disabled={uiState.isProcessing || currentWordIndex === words.length - 1}
          className="flex items-center gap-2"
        >
          <PiHandWaving className="w-4 h-4" />
          置顶
        </Button>

        {/* 上一个 */}
        <Button
          variant="outline"
          size="sm"
          onClick={previousWord}
          className="flex items-center gap-2"
        >
          <GiPlayerPrevious className="w-4 h-4" />
          上一个
        </Button>

        {/* 下一个 */}
        <Button
          variant="outline"
          size="sm"
          onClick={nextWord}
          className="flex items-center gap-2"
        >
          <GiPlayerNext className="w-4 h-4" />
          下一个
        </Button>

        {/* 搜索 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setUiState(prev => ({ ...prev, searchText: '' }))}
          className="flex items-center gap-2"
        >
          <RiFileSearchLine className="w-4 h-4" />
          搜索
        </Button>

        {/* 播放/暂停 */}
        <Button
          variant={isPlaying ? "default" : "outline"}
          size="sm"
          onClick={togglePlayback}
          className="flex items-center gap-2"
        >
          {isPlaying ? (
            <FaPause className="w-4 h-4" />
          ) : (
            <FaPlay className="w-4 h-4" />
          )}
          {isPlaying ? '暂停' : '播放'}
        </Button>

        {/* 上一句 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWordIndex(Math.max(0, currentWordIndex - 1))}
          className="flex items-center gap-2"
        >
          <CgPlayTrackPrevR className="w-4 h-4" />
          上一句
        </Button>

        {/* 下一句 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWordIndex(Math.min(words.length - 1, currentWordIndex + 1))}
          className="flex items-center gap-2"
        >
          <CgPlayTrackNextR className="w-4 h-4" />
          下一句
        </Button>

        {/* 发音 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => playCurrentWord()}
          className="flex items-center gap-2"
        >
          <FaVolumeUp className="w-4 h-4" />
          发音
        </Button>

        {/* 设置 */}
        <Button
          variant="outline"
          size="sm"
          onClick={openConfigDialog}
          className="flex items-center gap-2"
        >
          <PiGear className="w-4 h-4" />
          设置
        </Button>
      </div>

      {/* 第二行按钮 */}
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {/* Editor按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={openEditDialog}
          className="flex items-center gap-2"
        >
          Editor
        </Button>

        {/* 刷新Azure TTS */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePutNext}
          disabled={uiState.isProcessing || currentWordIndex === words.length - 1}
          className="flex items-center gap-2"
        >
          <FaSync className="w-4 h-4" />
          刷新Azure TTS
        </Button>
      </div>
    </div>
  );
};