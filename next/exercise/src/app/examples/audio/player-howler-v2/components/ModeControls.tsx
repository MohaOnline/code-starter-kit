/**
 * 模式控制组件
 * 包含播放模式和内容模式的切换按钮
 */

import React from 'react';
import type { PlayMode, ContentMode, PlayerConfig, PlayerControls } from '../types';
import { STYLES } from '../constants';
import { safeExecute, classNames } from '../utils';

interface ModeControlsProps {
  playerConfig: PlayerConfig;
  controls: Pick<PlayerControls, 'togglePlayMode' | 'toggleContentMode'>;
}

/**
 * 播放模式图标
 */
function PlayModeIcon({ mode }: { mode: PlayMode }) {
  switch (mode) {
    case 'loop':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      );
    case 'single':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * 内容模式图标
 */
function ContentModeIcon({ mode }: { mode: ContentMode }) {
  switch (mode) {
    case 'playlist':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      );
    case 'single':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * 模式按钮组件
 */
function ModeButton({
  isActive,
  onClick,
  title,
  children
}: {
  isActive: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        STYLES.MODE_BUTTON,
        isActive ? 'bg-blue-100 text-blue-600 border-blue-300' : 'text-gray-600 hover:text-gray-900'
      )}
      title={title}
    >
      {children}
    </button>
  );
}

export function ModeControls({ playerConfig, controls }: ModeControlsProps) {
  const { playMode, contentMode } = playerConfig;
  const { togglePlayMode, toggleContentMode } = controls;
  
  const handlePlayModeToggle = () => {
    safeExecute(() => togglePlayMode(), 'Failed to toggle play mode');
  };
  
  const handleContentModeToggle = () => {
    safeExecute(() => toggleContentMode(), 'Failed to toggle content mode');
  };
  
  // 获取模式描述文本
  const getPlayModeText = (mode: PlayMode): string => {
    switch (mode) {
      case 'loop':
        return '循环播放';
      case 'single':
        return '单次播放';
      default:
        return '未知模式';
    }
  };
  
  const getContentModeText = (mode: ContentMode): string => {
    switch (mode) {
      case 'playlist':
        return '播放列表模式';
      case 'single':
        return '单文件模式';
      default:
        return '未知模式';
    }
  };
  
  return (
    <div className="flex items-center justify-center space-x-4">
      {/* 播放模式切换 */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">播放模式:</span>
        <div className="flex space-x-1">
          <ModeButton
            isActive={playMode === 'loop'}
            onClick={handlePlayModeToggle}
            title={`当前: ${getPlayModeText(playMode)}，点击切换`}
          >
            <PlayModeIcon mode="loop" />
            <span className="ml-1 text-xs">循环</span>
          </ModeButton>
          
          <ModeButton
            isActive={playMode === 'single'}
            onClick={handlePlayModeToggle}
            title={`当前: ${getPlayModeText(playMode)}，点击切换`}
          >
            <PlayModeIcon mode="single" />
            <span className="ml-1 text-xs">单次</span>
          </ModeButton>
        </div>
      </div>
      
      {/* 内容模式切换 */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">内容模式:</span>
        <div className="flex space-x-1">
          <ModeButton
            isActive={contentMode === 'playlist'}
            onClick={handleContentModeToggle}
            title={`当前: ${getContentModeText(contentMode)}，点击切换`}
          >
            <ContentModeIcon mode="playlist" />
            <span className="ml-1 text-xs">列表</span>
          </ModeButton>
          
          <ModeButton
            isActive={contentMode === 'single'}
            onClick={handleContentModeToggle}
            title={`当前: ${getContentModeText(contentMode)}，点击切换`}
          >
            <ContentModeIcon mode="single" />
            <span className="ml-1 text-xs">单文件</span>
          </ModeButton>
        </div>
      </div>
    </div>
  );
}