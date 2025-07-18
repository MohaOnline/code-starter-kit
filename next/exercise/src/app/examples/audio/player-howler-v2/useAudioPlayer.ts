/**
 * 音频播放器自定义 Hook
 * 封装 Howler.js 的状态管理和业务逻辑
 */

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Howl } from 'howler';
import {
  PlaylistItem,
  PlayMode,
  ContentMode,
  PlayerState,
  PlayerConfig,
  PlayerControls,
  CurrentTrack
} from './types';
import {
  formatTime,
  isValidTime,
  getNextIndex,
  getPreviousIndex,
  safeExecute,
  debounce
} from './utils';
import {
  SINGLE_FILE_SRC,
  PLAYER_CONFIG
} from './constants';

interface UseAudioPlayerOptions {
  playlist: PlaylistItem[];
  initialContentMode?: ContentMode;
  initialPlayMode?: PlayMode;
  initialVolume?: number;
}

export function useAudioPlayer({
  playlist,
  initialContentMode = 'playlist',
  initialPlayMode = 'loop',
  initialVolume = PLAYER_CONFIG.DEFAULT_VOLUME
}: UseAudioPlayerOptions) {
  // 播放器状态
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: initialVolume
  });
  
  // 播放器配置
  const [playerConfig, setPlayerConfig] = useState<PlayerConfig>({
    contentMode: initialContentMode,
    playMode: initialPlayMode,
    currentTrackIndex: 0
  });
  
  // 自动播放标志
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  
  // Refs for stable references
  const howlRef = useRef<Howl | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const contentModeRef = useRef(playerConfig.contentMode);
  const playModeRef = useRef(playerConfig.playMode);
  const currentTrackIndexRef = useRef(playerConfig.currentTrackIndex);
  
  // 更新 refs 当状态改变时
  useEffect(() => {
    contentModeRef.current = playerConfig.contentMode;
    playModeRef.current = playerConfig.playMode;
    currentTrackIndexRef.current = playerConfig.currentTrackIndex;
  }, [playerConfig]);
  
  // 获取当前音轨信息
  const currentTrack: CurrentTrack | null = useMemo(() => {
    if (playerConfig.contentMode === 'single') {
      return {
        title: 'Single Audio File',
        artist: 'Unknown Artist',
        src: SINGLE_FILE_SRC
      };
    }
    
    const track = playlist[playerConfig.currentTrackIndex];
    return track ? {
      title: track.title,
      artist: track.artist,
      album: track.album,
      src: track.src,
      cover: track.cover
    } : null;
  }, [playlist, playerConfig.contentMode, playerConfig.currentTrackIndex]);
  
  // 获取当前音频源
  const getCurrentAudioSrc = useCallback(() => {
    return playerConfig.contentMode === 'single' 
      ? SINGLE_FILE_SRC 
      : playlist[playerConfig.currentTrackIndex]?.src;
  }, [playerConfig.contentMode, playerConfig.currentTrackIndex, playlist]);
  
  // 清理 Howl 实例
  const cleanupHowl = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.unload();
      howlRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);
  
  // 创建新的 Howl 实例
  const createHowl = useCallback((src: string) => {
    cleanupHowl();
    
    const howl = new Howl({
      src: [src],
      html5: PLAYER_CONFIG.HOWLER_CONFIG.html5,
      preload: PLAYER_CONFIG.HOWLER_CONFIG.preload,
      volume: playerState.volume,
      
      onload: () => {
        setPlayerState(prev => ({
          ...prev,
          isLoading: false,
          duration: howl.duration()
        }));
        
        // 如果需要自动播放
        if (shouldAutoPlay) {
          setShouldAutoPlay(false);
          setTimeout(() => {
            safeExecute(() => {
              if (howl.state() === 'loaded' && howlRef.current === howl) {
                howl.play();
              }
            }, 'Auto play error');
          }, PLAYER_CONFIG.AUTO_PLAY_DELAY);
        }
      },
      
      onplay: () => {
        setPlayerState(prev => ({ ...prev, isPlaying: true }));
        
        // 开始进度更新
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        progressIntervalRef.current = setInterval(() => {
          if (howl.playing()) {
            setPlayerState(prev => ({
              ...prev,
              currentTime: howl.seek() as number || 0
            }));
          }
        }, PLAYER_CONFIG.PROGRESS_UPDATE_INTERVAL);
      },
      
      onpause: () => {
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      },
      
      onstop: () => {
        setPlayerState(prev => ({
          ...prev,
          isPlaying: false,
          currentTime: 0
        }));
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      },
      
      onend: () => {
        setPlayerState(prev => ({
          ...prev,
          isPlaying: false,
          currentTime: 0
        }));
        
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        // 处理播放结束后的逻辑
        const currentContentMode = contentModeRef.current;
        const currentIndex = currentTrackIndexRef.current;
        
        if (currentContentMode === 'playlist') {
          setShouldAutoPlay(true);
          playNext(currentIndex);
        }
      },
      
      onloaderror: (id, error) => {
        console.error('Audio load error:', error);
        setPlayerState(prev => ({ ...prev, isLoading: false }));
      },
      
      onplayerror: (id, error) => {
        console.error('Audio play error:', error);
        setPlayerState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
      }
    });
    
    howlRef.current = howl;
    return howl;
  }, [playerState.volume, shouldAutoPlay, cleanupHowl]);
  
  // 播放控制函数
  const togglePlay = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    
    if (howl.playing()) {
      howl.pause();
    } else {
      howl.play();
    }
  }, []);
  
  const seek = useCallback((time: number) => {
    const howl = howlRef.current;
    if (!howl || !isValidTime(time)) return;
    
    // 先设置 Howler 的播放位置
    howl.seek(time);
    
    // 立即更新状态，确保UI同步
    setPlayerState(prev => ({ ...prev, currentTime: time }));
    
    // 如果正在播放，强制同步一次进度
    if (howl.playing()) {
      setTimeout(() => {
        const actualTime = howl.seek() as number || 0;
        setPlayerState(prev => ({ ...prev, currentTime: actualTime }));
      }, 50); // 给 Howler 一点时间来处理 seek 操作
    }
  }, []);
  
  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    
    setPlayerState(prev => ({ ...prev, volume: clampedVolume }));
    
    if (howlRef.current) {
      howlRef.current.volume(clampedVolume);
    }
  }, []);
  
  const skipForward = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    
    const currentTime = howl.seek() as number || 0;
    const newTime = Math.min(howl.duration(), currentTime + PLAYER_CONFIG.SKIP_STEP);
    seek(newTime);
  }, [seek]);
  
  const skipBackward = useCallback(() => {
    const howl = howlRef.current;
    if (!howl) return;
    
    const currentTime = howl.seek() as number || 0;
    const newTime = Math.max(0, currentTime - PLAYER_CONFIG.SKIP_STEP);
    seek(newTime);
  }, [seek]);
  
  // 播放指定音轨
  const playTrack = useCallback((index: number) => {
    if (playerConfig.contentMode === 'single') return;
    
    if (index >= 0 && index < playlist.length) {
      setPlayerConfig(prev => ({ ...prev, currentTrackIndex: index }));
      setShouldAutoPlay(true);
    }
  }, [playerConfig.contentMode, playlist.length]);
  
  // 播放下一首
  const playNext = useCallback((fromIndex?: number) => {
    const currentContentMode = contentModeRef.current;
    const currentPlayMode = playModeRef.current;
    const currentIndex = fromIndex ?? currentTrackIndexRef.current;
    
    if (currentContentMode === 'single') return;
    
    const nextIndex = getNextIndex(currentIndex, playlist.length, currentPlayMode === 'loop');
    
    if (nextIndex !== null) {
      // 有下一首歌曲
      setPlayerConfig(prev => ({ ...prev, currentTrackIndex: nextIndex }));
      setShouldAutoPlay(true);
    } else {
      // 没有下一首（单次模式结束）
      if (howlRef.current) {
        howlRef.current.stop();
      }
      setShouldAutoPlay(false);
    }
  }, [playlist.length]);
  
  // 播放上一首
  const playPrevious = useCallback(() => {
    if (playerConfig.contentMode === 'single') return;
    
    const prevIndex = getPreviousIndex(playerConfig.currentTrackIndex, playlist.length, playerConfig.playMode === 'loop');
    if (prevIndex !== null) {
      setPlayerConfig(prev => ({ ...prev, currentTrackIndex: prevIndex }));
      setShouldAutoPlay(true);
    }
  }, [playerConfig.contentMode, playerConfig.currentTrackIndex, playerConfig.playMode, playlist.length]);
  
  // 切换播放模式
  const togglePlayMode = useCallback(() => {
    setPlayerConfig(prev => ({
      ...prev,
      playMode: prev.playMode === 'loop' ? 'single' : 'loop'
    }));
  }, []);
  
  // 切换内容模式
  const toggleContentMode = useCallback(() => {
    setPlayerConfig(prev => ({
      ...prev,
      contentMode: prev.contentMode === 'playlist' ? 'single' as ContentMode : 'playlist' as ContentMode,
      currentTrackIndex: 0
    }));
    setShouldAutoPlay(false);
  }, []);
  
  // 当音频源改变时重新创建 Howl 实例
  useEffect(() => {
    const audioSrc = getCurrentAudioSrc();
    if (audioSrc) {
      setPlayerState(prev => ({ ...prev, isLoading: true, currentTime: 0 }));
      createHowl(audioSrc);
    }
    
    return () => {
      cleanupHowl();
    };
  }, [getCurrentAudioSrc, createHowl, cleanupHowl]);
  
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanupHowl();
    };
  }, [cleanupHowl]);
  
  // 创建兼容的事件处理函数
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (!isNaN(time)) {
      seek(time);
    }
  }, [seek]);
  
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    if (!isNaN(volume)) {
      setVolume(volume);
    }
  }, [setVolume]);
  
  // 返回状态和控制方法
  const controls: PlayerControls = {
    togglePlay,
    seek,
    setVolume,
    skipForward,
    skipBackward,
    playTrack,
    playNext,
    playPrevious,
    togglePlayMode,
    toggleContentMode,
    // 兼容 PlayerControls 接口的事件处理方法
    handleSeek,
    handleVolumeChange,
    setTrackIndex: playTrack
  };
  
  return {
    playerState,
    playerConfig,
    currentTrack,
    controls
  };
}