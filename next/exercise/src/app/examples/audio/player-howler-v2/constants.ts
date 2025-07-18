/**
 * Howler.js 音频播放器常量配置
 * 集中管理播放器的配置常量
 */

import { PlaylistItem } from './types';

// 默认播放列表
export const DEFAULT_PLAYLIST: PlaylistItem[] = [
  {
    id: '1',
    title: '聪明的小猴子 11',
    artist: '听力对话练习',
    src: '/refs/listening_dialog/03/20232Congming11.wav'
  },
  {
    id: '2', 
    title: '聪明的小猴子 12',
    artist: '听力对话练习',
    src: '/refs/listening_dialog/03/20232Congming12.wav'
  },
  {
    id: '3',
    title: '聪明的小猴子 13', 
    artist: '听力对话练习',
    src: '/refs/listening_dialog/03/20232Congming13.wav'
  }
];

// 单文件音频源
export const SINGLE_FILE_SRC = '/refs/listening_dialog/03/20232Congming11.wav';

// 单文件轨道信息
export const SINGLE_FILE_TRACK = {
  id: 'single',
  title: '聪明的小猴子',
  artist: '听力对话练习',
  src: SINGLE_FILE_SRC
};

// 播放器配置常量
export const PLAYER_CONFIG = {
  // 自动播放延迟时间（毫秒）
  AUTO_PLAY_DELAY: 300,
  // 进度更新间隔（毫秒）
  PROGRESS_UPDATE_INTERVAL: 1000,
  // 快进/快退步长（秒）
  SKIP_STEP: 10,
  // 默认音量
  DEFAULT_VOLUME: 1,
  // Howler.js 配置
  HOWLER_CONFIG: {
    html5: true,
    preload: true
  }
} as const;

// 样式常量
export const STYLES = {
  // 按钮样式类
  BUTTON_BASE: 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
  BUTTON_ACTIVE: 'bg-blue-500/30 text-white border border-blue-400/50',
  BUTTON_INACTIVE: 'bg-white/10 text-gray-300 border border-gray-600 hover:bg-white/20',
  CONTROL_BUTTON: 'p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  PLAY_BUTTON: 'p-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg',
  // 容器样式类
  CONTAINER: 'min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4',
  CARD: 'bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl',
  SECTION: 'bg-white/5 rounded-2xl p-6 border border-white/10',
  // 滑块样式
  INPUT_RANGE: 'w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer',
  SLIDER: 'w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider',
  PROGRESS_BAR: 'relative w-full h-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-150',
  VOLUME_BAR: 'relative w-24 h-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors duration-150',
  MODE_BUTTON: 'flex items-center px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 hover:bg-gray-50',
  PLAYLIST_ITEM: 'flex items-center p-3 cursor-pointer transition-all duration-200 border border-transparent rounded-lg'
} as const;