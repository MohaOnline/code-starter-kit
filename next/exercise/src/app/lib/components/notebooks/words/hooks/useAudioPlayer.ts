'use client';

import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { 
  wordsAtom, 
  currentWordIndexAtom, 
  playedWordIndexAtom, 
  audioConfigAtom, 
  uiStateAtom 
} from '@/app/lib/atoms';
import { VoicePlayerHowler } from '@/app/lib/VoicePlayerHowler';

export const useAudioPlayer = () => {
  const [words] = useAtom(wordsAtom);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
  const [playedWordIndex, setPlayedWordIndex] = useAtom(playedWordIndexAtom);
  const [audioConfig] = useAtom(audioConfigAtom);
  const [uiState, setUiState] = useAtom(uiStateAtom);
  
  const playerRef = useRef<VoicePlayerHowler | null>(null);

  // 初始化播放器
  useEffect(() => {
    playerRef.current = new VoicePlayerHowler();
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  /** 将连续相同的URL交错排列 */
  const alternateVoiceURLs = (urls: string[]): string[] => {
    if (urls.length <= 1) return urls;

    // 分组相同的URL
    const groups: string[][] = [];
    let currentGroup = [urls[0]];

    for (let i = 1; i < urls.length; i++) {
      if (urls[i] === urls[i - 1]) {
        currentGroup.push(urls[i]);
      } else {
        groups.push(currentGroup);
        currentGroup = [urls[i]];
      }
    }
    groups.push(currentGroup);

    // 如果只有一组，直接返回
    if (groups.length === 1) return urls;

    // 交错排列
    const result: string[] = [];
    const maxLength = Math.max(...groups.map(group => group.length));

    for (let i = 0; i < maxLength; i++) {
      for (let j = 0; j < groups.length; j++) {
        if (i < groups[j].length) {
          result.push(groups[j][i]);
        }
      }
    }

    return result;
  };

  /** 根据audioConfig生成语音URL数组 */
  const generateVoiceURLs = (wordIndex: number): string[] => {
    const word = words[wordIndex];
    if (!word?.voice_id_uk) return [];

    let voiceURLs: string[] = [];

    if (audioConfig.english.repeatCount) {
      const firstChar = word.voice_id_uk[0].toLowerCase();
      const englishURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${word.voice_id_uk}.wav`;
      for (let i = 0; i < audioConfig.english.repeatCount; i++) {
        voiceURLs.push(englishURL);
      }
    }

    if (audioConfig.chinese.repeatCount) {
      const firstCharChinese = word.voice_id_translation[0].toLowerCase();
      const chineseURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstCharChinese}/${word.voice_id_translation}.wav`;
      for (let i = 0; i < audioConfig.chinese.repeatCount; i++) {
        voiceURLs.push(chineseURL);
      }
    }

    // 如果启用交错播放，重新排列URL
    if (audioConfig.alternatePlay && voiceURLs.length > 0) {
      voiceURLs = alternateVoiceURLs(voiceURLs);
    }

    return voiceURLs;
  };

  /** 播放当前单词音频 */
  const playCurrentWord = (onCompleteCallback?: () => void) => {
    if (!playerRef.current) return;
    
    const voiceURLs = generateVoiceURLs(currentWordIndex);
    if (voiceURLs.length > 0) {
      playerRef.current.stop();
      playerRef.current.setSpeed(audioConfig.speed / 100);
      playerRef.current.setVolume(audioConfig.volume / 100);
      playerRef.current.setVoiceInterval(
        audioConfig.english.waitVoiceLength, 
        audioConfig.chinese.waitVoiceLength, 
        audioConfig.english.pauseTime * 1000, 
        audioConfig.chinese.pauseTime * 1000
      );
      playerRef.current.play(voiceURLs, onCompleteCallback || (() => {}));
    }
  };

  /** 自动播放下一个单词 */
  const autoNextWord = () => {
    if (uiState.isPlaying) {
      nextWord();
    }
  };

  /** 下一个单词 */
  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
  };

  /** 上一个单词 */
  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      setCurrentWordIndex(words.length - 1);
    }
  };

  /** 切换播放状态 */
  const togglePlayback = () => {
    setUiState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  /** 停止播放 */
  const stopPlayback = () => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
    setUiState(prev => ({ ...prev, isPlaying: false }));
  };

  // 播放音频: 当 currentWordIndex 或 words 改变时
  useEffect(() => {
    if (words.length > 0 && words[currentWordIndex]?.voice_id_uk) {
      // 暂停时不播放声音，或者已经播放过的单词不重复播放
      if (uiState.isPlaying || playedWordIndex !== currentWordIndex) {
        playCurrentWord(autoNextWord);
        setPlayedWordIndex(currentWordIndex);
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, [uiState.isPlaying, currentWordIndex, words, audioConfig]);

  return {
    playCurrentWord,
    nextWord,
    previousWord,
    togglePlayback,
    stopPlayback,
    isPlaying: uiState.isPlaying
  };
};