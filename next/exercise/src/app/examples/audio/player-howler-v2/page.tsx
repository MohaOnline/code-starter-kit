/**
 * Howler.js 音频播放器 V2
 * 重构后的版本，具有更好的代码组织和可维护性
 */

'use client';

import React from 'react';
import { useAudioPlayer } from './useAudioPlayer';
import { 
  AudioInfo, 
  ModeControls, 
  PlayControls, 
  Playlist, 
  ProgressBar, 
  VolumeControl 
} from './components';
import { DEFAULT_PLAYLIST } from './constants';

export default function HowlerPlayerV2() {
  const {
    // 状态
    playerState,
    playerConfig,
    currentTrack,
    
    // 控制方法
    controls
  } = useAudioPlayer({
    playlist: DEFAULT_PLAYLIST,
    initialContentMode: 'playlist',
    initialPlayMode: 'loop',
    initialVolume: 0.7
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* 页面标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Howler.js 音频播放器 V2
          </h1>
          <p className="text-gray-600">
            重构后的版本，具有更好的代码组织和可维护性
          </p>
        </div>
        
        {/* 模式控制 */}
        <ModeControls 
          playerConfig={playerConfig}
          controls={controls}
        />
        
        {/* 音频信息卡片 */}
        <AudioInfo 
          currentTrack={currentTrack}
          playerState={playerState}
          playerConfig={playerConfig}
        />
        
        {/* 进度条 */}
        <ProgressBar 
          playerState={playerState}
          controls={controls}
        />
        
        {/* 播放控制按钮 */}
        <PlayControls 
          playerState={playerState}
          playerConfig={playerConfig}
          controls={controls}
        />
        
        {/* 音量控制 */}
        <div className="flex justify-center">
          <VolumeControl 
            playerState={playerState}
            controls={controls}
          />
        </div>
        
        {/* 播放列表 */}
        <Playlist 
          playlist={DEFAULT_PLAYLIST}
          playerState={playerState}
          playerConfig={playerConfig}
          controls={controls}
        />
        
        {/* 功能说明 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            功能说明
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">播放控制</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 播放/暂停：点击中央播放按钮</li>
                <li>• 上一首/下一首：仅在播放列表模式下可用</li>
                <li>• 快进/快退：每次跳跃10秒</li>
                <li>• 进度调节：点击进度条或使用键盘方向键</li>
                <li>• 音量控制：拖拽音量滑块或点击静音按钮</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">播放模式</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>循环模式</strong>：播放完最后一首后回到第一首</li>
                <li>• <strong>单次模式</strong>：播放完最后一首后停止</li>
                <li>• <strong>播放列表模式</strong>：显示完整播放列表</li>
                <li>• <strong>单文件模式</strong>：只播放当前选中的文件</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">技术特性</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 基于 Howler.js 的高性能音频播放</li>
              <li>• 响应式设计，支持移动端和桌面端</li>
              <li>• TypeScript 类型安全</li>
              <li>• 模块化组件架构</li>
              <li>• 自定义 Hook 封装业务逻辑</li>
              <li>• 无障碍访问支持（ARIA 标签）</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}