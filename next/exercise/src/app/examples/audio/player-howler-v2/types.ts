/**
 * Howler.js 音频播放器类型定义
 * 定义播放器相关的所有类型接口
 */

// 播放列表项接口
export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  src: string;
  album?: string;
  cover?: string;
  duration?: number;
}

// 播放模式类型
export type PlayMode = 'single' | 'loop';

// 内容模式类型
export type ContentMode = 'file' | 'playlist' | 'single';

// 播放器状态接口
export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
}

// 播放器配置接口
export interface PlayerConfig {
  playMode: PlayMode;
  contentMode: ContentMode;
  currentTrackIndex: number;
}

// 播放器控制方法接口
export interface PlayerControls {
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  playNext: (fromIndex?: number) => void;
  playPrevious: () => void;
  playTrack: (index: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePlayMode: () => void;
  toggleContentMode: () => void;
  setTrackIndex: (index: number) => void;
}

// 当前播放轨道信息接口
export interface CurrentTrack {
  title: string;
  artist: string;
  album?: string;
  src: string;
  cover?: string;
}