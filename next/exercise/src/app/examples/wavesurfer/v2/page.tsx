'use client';

/**
 * Wavesurfer V2 音乐播放器 - 基于最佳实践的完整音乐播放器
 * Wavesurfer V2 Music Player - Complete music player based on best practices
 * 
 * 功能特性 / Features:
 * - 多音频文件播放列表管理 / Multi-audio playlist management
 * - 多种循环播放模式 / Multiple loop playback modes
 * - 音量和播放速度控制 / Volume and playback speed control
 * - 波形可视化和区域选择 / Waveform visualization and region selection
 * - 现代化用户界面 / Modern user interface
 * - 键盘快捷键支持 / Keyboard shortcuts support
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Repeat1, 
  Shuffle,
  List,
  Music,
  Clock,
  Zap
} from 'lucide-react';
import { toast } from 'react-toastify';

// 音频文件接口定义 / Audio file interface definition
interface AudioFile {
  id: string;
  name: string;
  url: string;
  duration?: number;
}

// 播放模式枚举 / Play mode enumeration
type PlayMode = 'sequence' | 'loop' | 'single' | 'shuffle';

// 播放器状态接口 / Player state interface
interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isMuted: boolean;
  currentIndex: number;
  playMode: PlayMode;
}

// 音频文件列表 / Audio file list
const audioFiles: AudioFile[] = [
  {
    id: '1',
    name: '中文朗读 1',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0ac5f21d-d87d-4c47-a11d-e3b1f649e9d8.wav'
  },
  {
    id: '2',
    name: '中文朗读 2',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/06e91889-a572-4913-bff0-e49cec988ecf.wav'
  },
  {
    id: '3',
    name: '中文朗读 3',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/070c4aa3-320a-403a-8464-d429f2fa456a.wav'
  },
  {
    id: '4',
    name: '中文朗读 4',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0380e9ab-8ca8-4fe0-978f-49315efe4219.wav'
  },
  {
    id: '5',
    name: '中文朗读 5',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0829d25d-010f-41c6-8e4d-1471f2855d27.wav'
  }
];

// 播放速度选项 / Playback speed options
const playbackRates = [
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1.0x' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 2.0, label: '2.0x' }
];

// 播放模式配置 / Play mode configuration
const playModeConfig = {
  sequence: { icon: List, label: '顺序播放', description: '按列表顺序播放' },
  loop: { icon: Repeat, label: '列表循环', description: '播放完列表后重新开始' },
  single: { icon: Repeat1, label: '单曲循环', description: '重复播放当前音频' },
  shuffle: { icon: Shuffle, label: '随机播放', description: '随机选择下一首' }
};

export default function WavesurferV2MusicPlayer() {
  // DOM 引用 / DOM references
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const regionsPlugin = useRef<RegionsPlugin | null>(null);
  
  // 播放器状态 / Player state
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 80,
    playbackRate: 1.0,
    isMuted: false,
    currentIndex: 0,
    playMode: 'sequence'
  });
  
  // 其他状态 / Other states
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [shuffleHistory, setShuffleHistory] = useState<number[]>([]);

  // 初始化 Wavesurfer / Initialize Wavesurfer
  useEffect(() => {
    if (!waveformRef.current) return;

    // 初始化 regions plugin / Initialize regions plugin
    regionsPlugin.current = RegionsPlugin.create();

    // 初始化 WaveSurfer / Initialize WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4F46E5',
      progressColor: '#7C3AED',
      cursorColor: '#EF4444',
      barWidth: 2,
      barRadius: 3,
      height: 120,
      normalize: true,
      plugins: [regionsPlugin.current],
      interact: true
    });

    // 启用拖拽选择区域功能 / Enable drag selection for regions
    regionsPlugin.current.enableDragSelection({
      color: 'rgba(59, 130, 246, 0.25)'
    });

    // 事件监听 / Event listeners
    setupEventListeners();

    // 加载初始音频 / Load initial audio
    loadAudio(playerState.currentIndex);

    return () => {
      wavesurfer.current?.destroy();
    };
  }, []);

  // 设置事件监听器 / Setup event listeners
  const setupEventListeners = useCallback(() => {
    if (!wavesurfer.current || !regionsPlugin.current) return;

    // Wavesurfer 事件 / Wavesurfer events
    wavesurfer.current.on('ready', () => {
      setPlayerState(prev => ({ ...prev, duration: wavesurfer.current?.getDuration() || 0 }));
      setIsLoading(false);
    });

    wavesurfer.current.on('audioprocess', () => {
      setPlayerState(prev => ({ ...prev, currentTime: wavesurfer.current?.getCurrentTime() || 0 }));
    });

    wavesurfer.current.on('play', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    });

    wavesurfer.current.on('pause', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    });

    wavesurfer.current.on('finish', () => {
      handleTrackFinish();
    });

    wavesurfer.current.on('error', (error) => {
      console.error('Wavesurfer error:', error);
      toast.error('音频加载失败');
      setIsLoading(false);
    });

    // Regions 事件 / Regions events
    regionsPlugin.current.on('region-created', (region: any) => {
      setSelectedRegion(region);
      toast.success('区域已创建');
    });

    regionsPlugin.current.on('region-updated', (region: any) => {
      setSelectedRegion(region);
    });

    regionsPlugin.current.on('region-removed', () => {
      setSelectedRegion(null);
      toast.success('区域已删除');
    });
  }, []);

  // 处理音频播放完成 / Handle track finish
  const handleTrackFinish = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
    
    // 如果有选中区域且是单曲循环，循环播放区域 / If region selected and single loop, loop region
    if (selectedRegion && playerState.playMode === 'single') {
      setTimeout(() => {
        playRegion();
      }, 100);
      return;
    }
    
    // 根据播放模式处理下一首 / Handle next track based on play mode
    switch (playerState.playMode) {
      case 'single':
        // 单曲循环 / Single loop
        setTimeout(() => {
          wavesurfer.current?.seekTo(0);
          wavesurfer.current?.play();
        }, 100);
        break;
      case 'sequence':
        // 顺序播放 / Sequential play
        if (playerState.currentIndex < audioFiles.length - 1) {
          playNext();
        }
        break;
      case 'loop':
        // 列表循环 / List loop
        playNext();
        break;
      case 'shuffle':
        // 随机播放 / Shuffle play
        playNext();
        break;
    }
  }, [selectedRegion, playerState.playMode, playerState.currentIndex]);

  // 加载音频 / Load audio
  const loadAudio = useCallback((index: number) => {
    if (!wavesurfer.current || index < 0 || index >= audioFiles.length) return;
    
    setIsLoading(true);
    setSelectedRegion(null);
    regionsPlugin.current?.clearRegions();
    
    const audio = audioFiles[index];
    wavesurfer.current.load(audio.url);
    
    setPlayerState(prev => ({ ...prev, currentIndex: index }));
    toast.success(`正在加载: ${audio.name}`);
  }, []);

  // 播放/暂停 / Play/Pause
  const togglePlayPause = useCallback(() => {
    if (!wavesurfer.current) return;
    wavesurfer.current.playPause();
  }, []);

  // 停止播放 / Stop playback
  const stop = useCallback(() => {
    if (!wavesurfer.current) return;
    wavesurfer.current.stop();
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  // 上一首 / Previous track
  const playPrevious = useCallback(() => {
    let nextIndex: number;
    
    if (playerState.playMode === 'shuffle') {
      // 随机模式下从历史记录中获取 / Get from history in shuffle mode
      if (shuffleHistory.length > 1) {
        const newHistory = [...shuffleHistory];
        newHistory.pop(); // 移除当前
        const prevIndex = newHistory.pop() || 0;
        setShuffleHistory(newHistory);
        nextIndex = prevIndex;
      } else {
        nextIndex = Math.floor(Math.random() * audioFiles.length);
      }
    } else {
      // 其他模式 / Other modes
      nextIndex = playerState.currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = playerState.playMode === 'loop' ? audioFiles.length - 1 : 0;
      }
    }
    
    loadAudio(nextIndex);
  }, [playerState.currentIndex, playerState.playMode, shuffleHistory, loadAudio]);

  // 下一首 / Next track
  const playNext = useCallback(() => {
    let nextIndex: number;
    
    if (playerState.playMode === 'shuffle') {
      // 随机模式 / Shuffle mode
      do {
        nextIndex = Math.floor(Math.random() * audioFiles.length);
      } while (nextIndex === playerState.currentIndex && audioFiles.length > 1);
      
      setShuffleHistory(prev => [...prev, playerState.currentIndex]);
    } else {
      // 其他模式 / Other modes
      nextIndex = playerState.currentIndex + 1;
      if (nextIndex >= audioFiles.length) {
        nextIndex = playerState.playMode === 'loop' ? 0 : audioFiles.length - 1;
      }
    }
    
    loadAudio(nextIndex);
  }, [playerState.currentIndex, playerState.playMode, loadAudio]);

  // 切换播放模式 / Toggle play mode
  const togglePlayMode = useCallback(() => {
    const modes: PlayMode[] = ['sequence', 'loop', 'single', 'shuffle'];
    const currentModeIndex = modes.indexOf(playerState.playMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    
    setPlayerState(prev => ({ ...prev, playMode: nextMode }));
    toast.success(`播放模式: ${playModeConfig[nextMode].label}`);
    
    // 清空随机播放历史 / Clear shuffle history
    if (nextMode !== 'shuffle') {
      setShuffleHistory([]);
    }
  }, [playerState.playMode]);

  // 音量控制 / Volume control
  const handleVolumeChange = useCallback((value: number[]) => {
    const volume = value[0];
    setPlayerState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
    
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume / 100);
    }
  }, []);

  // 静音切换 / Mute toggle
  const toggleMute = useCallback(() => {
    const newMuted = !playerState.isMuted;
    setPlayerState(prev => ({ ...prev, isMuted: newMuted }));
    
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newMuted ? 0 : playerState.volume / 100);
    }
  }, [playerState.isMuted, playerState.volume]);

  // 播放速度控制 / Playback rate control
  const handlePlaybackRateChange = useCallback((value: string) => {
    const rate = parseFloat(value);
    setPlayerState(prev => ({ ...prev, playbackRate: rate }));
    
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(rate);
    }
    
    toast.success(`播放速度: ${rate}x`);
  }, []);

  // 播放选中区域 / Play selected region
  const playRegion = useCallback(() => {
    if (!selectedRegion || !wavesurfer.current) return;
    
    wavesurfer.current.stop();
    wavesurfer.current.seekTo(selectedRegion.start / wavesurfer.current.getDuration());
    wavesurfer.current.play();
    
    // 设置定时器在区域结束时停止 / Set timer to stop at region end
    const regionDuration = (selectedRegion.end - selectedRegion.start) * 1000;
    setTimeout(() => {
      if (wavesurfer.current && wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause();
      }
    }, regionDuration);
  }, [selectedRegion]);

  // 删除选中区域 / Remove selected region
  const removeRegion = useCallback(() => {
    if (selectedRegion) {
      selectedRegion.remove();
      setSelectedRegion(null);
    }
  }, [selectedRegion]);

  // 清除所有区域 / Clear all regions
  const clearAllRegions = useCallback(() => {
    regionsPlugin.current?.clearRegions();
    setSelectedRegion(null);
  }, []);

  // 添加随机区域 / Add random region
  const addRandomRegion = useCallback(() => {
    if (!wavesurfer.current || !regionsPlugin.current) return;
    
    const duration = wavesurfer.current.getDuration();
    const start = Math.random() * duration * 0.5;
    const end = start + Math.random() * duration * 0.3;
    
    regionsPlugin.current.addRegion({
      start: start,
      end: Math.min(end, duration),
      color: 'rgba(34, 197, 94, 0.25)',
      drag: true,
      resize: true
    });
  }, []);

  // 格式化时间 / Format time
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // 键盘快捷键 / Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 避免在输入框中触发 / Avoid triggering in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          playPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          playNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange([Math.min(100, playerState.volume + 5)]);
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange([Math.max(0, playerState.volume - 5)]);
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'KeyL':
          e.preventDefault();
          togglePlayMode();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [togglePlayPause, playPrevious, playNext, handleVolumeChange, playerState.volume, toggleMute, togglePlayMode]);

  const currentAudio = audioFiles[playerState.currentIndex];
  const PlayModeIcon = playModeConfig[playerState.playMode].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 / Page title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Music className="w-10 h-10 text-blue-600" />
            Wavesurfer V2 音乐播放器
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            基于 Wavesurfer.js 的专业音频播放器，支持波形可视化、多种播放模式和区域选择
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 主播放区域 / Main player area */}
          <div className="lg:col-span-3 space-y-6">
            {/* 当前播放信息 / Current playing info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  正在播放: {currentAudio.name}
                  {isLoading && <Badge variant="secondary">加载中...</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* 波形显示 / Waveform display */}
                <div 
                  ref={waveformRef} 
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 mb-4"
                />
                
                {/* 时间信息 / Time info */}
                <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatTime(playerState.currentTime)}
                  </span>
                  <span>{formatTime(playerState.duration)}</span>
                </div>
              </CardContent>
            </Card>

            {/* 播放控制面板 / Playback control panel */}
            <Card>
              <CardHeader>
                <CardTitle>播放控制</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 主要控制按钮 / Main control buttons */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={playPrevious}
                    className="w-12 h-12"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    size="lg"
                    onClick={togglePlayPause}
                    className="w-16 h-16"
                    disabled={isLoading}
                  >
                    {playerState.isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={stop}
                    className="w-12 h-12"
                  >
                    <Square className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={playNext}
                    className="w-12 h-12"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                {/* 音量和速度控制 / Volume and speed control */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 音量控制 / Volume control */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                      >
                        {playerState.isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                      <span className="text-sm font-medium">音量: {playerState.volume}%</span>
                    </div>
                    <Slider
                      value={[playerState.isMuted ? 0 : playerState.volume]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* 播放速度控制 / Playback speed control */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">播放速度</span>
                    </div>
                    <Select
                      value={playerState.playbackRate.toString()}
                      onValueChange={handlePlaybackRateChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {playbackRates.map((rate) => (
                          <SelectItem key={rate.value} value={rate.value.toString()}>
                            {rate.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 播放模式和区域控制 / Play mode and region control */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 播放模式 / Play mode */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PlayModeIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">播放模式</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={togglePlayMode}
                      className="w-full justify-start"
                    >
                      <PlayModeIcon className="w-4 h-4 mr-2" />
                      {playModeConfig[playerState.playMode].label}
                    </Button>
                  </div>

                  {/* 区域控制 / Region control */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium">区域控制</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addRandomRegion}
                      >
                        添加区域
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={playRegion}
                        disabled={!selectedRegion}
                      >
                        播放区域
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeRegion}
                        disabled={!selectedRegion}
                      >
                        删除区域
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 选中区域信息 / Selected region info */}
                {selectedRegion && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      选中区域: {formatTime(selectedRegion.start)} - {formatTime(selectedRegion.end)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 播放列表 / Playlist */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <List className="w-5 h-5" />
                    播放列表
                  </span>
                  <Badge variant="secondary">{audioFiles.length} 首</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {audioFiles.map((audio, index) => (
                    <div
                      key={audio.id}
                      onClick={() => loadAudio(index)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        index === playerState.currentIndex
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {index === playerState.currentIndex && playerState.isPlaying && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{audio.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {audio.url.split('/').pop()?.substring(0, 20)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 快捷键说明 / Keyboard shortcuts */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">快捷键</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <div><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">空格</kbd> 播放/暂停</div>
                  <div><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">←/→</kbd> 上一首/下一首</div>
                  <div><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">↑/↓</kbd> 音量调节</div>
                  <div><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">M</kbd> 静音切换</div>
                  <div><kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">L</kbd> 播放模式</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 使用说明 / Usage instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">基础操作</h4>
                <ul className="space-y-1">
                  <li>• 点击波形图跳转到指定位置</li>
                  <li>• 拖拽波形图创建选中区域</li>
                  <li>• 点击播放列表切换音频</li>
                  <li>• 使用键盘快捷键快速控制</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">高级功能</h4>
                <ul className="space-y-1">
                  <li>• 四种播放模式：顺序、循环、单曲、随机</li>
                  <li>• 区域选择和精确播放</li>
                  <li>• 音量和播放速度调节</li>
                  <li>• 响应式设计适配各种设备</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}