'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { audioConfigAtom, AudioConfig } from '@/app/lib/atoms';

// 默认音频配置
const DEFAULT_AUDIO_CONFIG: AudioConfig = {
  alternatePlay: false,
  volume: 100,
  speed: 100,
  english: {
    repeatCount: 1,
    pauseTime: 0,
    showText: true,
    waitVoiceLength: true,
  },
  chinese: {
    repeatCount: 0,
    pauseTime: 0,
    showText: true,
    waitVoiceLength: true,
  },
};

// 从 localStorage 读取音频配置
const loadAudioConfig = (): AudioConfig => {
  try {
    const saved = localStorage.getItem('audioConfig');
    if (saved) {
      const parsed = JSON.parse(saved);
      // 验证配置结构，确保所有必需字段存在
      const config: AudioConfig = {
        alternatePlay: parsed.alternatePlay ?? DEFAULT_AUDIO_CONFIG.alternatePlay,
        volume: parsed.volume ?? DEFAULT_AUDIO_CONFIG.volume,
        speed: parsed.speed ?? DEFAULT_AUDIO_CONFIG.speed,
        english: {
          repeatCount: parsed.english?.repeatCount ?? DEFAULT_AUDIO_CONFIG.english.repeatCount,
          pauseTime: parsed.english?.pauseTime ?? DEFAULT_AUDIO_CONFIG.english.pauseTime,
          showText: parsed.english?.showText ?? DEFAULT_AUDIO_CONFIG.english.showText,
          waitVoiceLength: parsed.english?.waitVoiceLength ?? DEFAULT_AUDIO_CONFIG.english.waitVoiceLength,
        },
        chinese: {
          repeatCount: parsed.chinese?.repeatCount ?? DEFAULT_AUDIO_CONFIG.chinese.repeatCount,
          pauseTime: parsed.chinese?.pauseTime ?? DEFAULT_AUDIO_CONFIG.chinese.pauseTime,
          showText: parsed.chinese?.showText ?? DEFAULT_AUDIO_CONFIG.chinese.showText,
          waitVoiceLength: parsed.chinese?.waitVoiceLength ?? DEFAULT_AUDIO_CONFIG.chinese.waitVoiceLength,
        },
      };
      return config;
    }
  } catch (error) {
    console.error('读取音频配置失败:', error);
  }
  return DEFAULT_AUDIO_CONFIG;
};

// 保存音频配置到 localStorage
const saveAudioConfig = (config: AudioConfig) => {
  try {
    localStorage.setItem('audioConfig', JSON.stringify(config));
  } catch (error) {
    console.error('保存音频配置失败:', error);
  }
};

export const useAudioConfig = () => {
  const [audioConfig, setAudioConfig] = useAtom(audioConfigAtom);

  // 初始化时从localStorage读取配置
  useEffect(() => {
    const savedConfig = loadAudioConfig();
    setAudioConfig(savedConfig);
  }, [setAudioConfig]);

  // 更新音频配置并保存到 localStorage
  const updateAudioConfig = (newConfig: AudioConfig) => {
    setAudioConfig(newConfig);
    saveAudioConfig(newConfig);
  };

  return {
    audioConfig,
    updateAudioConfig,
    DEFAULT_AUDIO_CONFIG
  };
};