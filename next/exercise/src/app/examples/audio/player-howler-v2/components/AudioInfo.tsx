/**
 * 音频信息显示组件
 * 显示当前播放音频的标题、艺术家等信息
 */

import React from 'react';
import type { CurrentTrack, PlayerState, PlayerConfig } from '../types';
import { formatTime, classNames } from '../utils';
import { STYLES } from '../constants';

interface AudioInfoProps {
  currentTrack: CurrentTrack | null;
  playerState: PlayerState;
  playerConfig: PlayerConfig;
}

/**
 * 音频封面占位符
 */
function AudioCoverPlaceholder() {
  return (
    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

/**
 * 播放状态指示器
 */
function PlayingIndicator({ isPlaying, isLoading }: { isPlaying: boolean; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-1 text-blue-500">
        <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
        <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
        <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <span className="text-xs ml-2">加载中</span>
      </div>
    );
  }
  
  if (isPlaying) {
    return (
      <div className="flex items-center space-x-1 text-green-500">
        <div className="w-1 h-2 bg-current animate-pulse" />
        <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '0.1s' }} />
        <div className="w-1 h-2 bg-current animate-pulse" style={{ animationDelay: '0.2s' }} />
        <span className="text-xs ml-2">正在播放</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-1 text-gray-400">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span className="text-xs ml-1">已暂停</span>
    </div>
  );
}

export function AudioInfo({ currentTrack, playerState, playerConfig }: AudioInfoProps) {
  const { isPlaying, isLoading, duration } = playerState;
  const { contentMode, currentTrackIndex } = playerConfig;
  
  // 如果没有当前音轨信息，显示占位内容
  if (!currentTrack) {
    return (
      <div className={classNames(
        "bg-white rounded-lg shadow-sm border p-4",
        {
          "border-blue-200": isPlaying,
          "border-gray-200": !isPlaying
        }
      )}>
        <div className="flex items-center space-x-4">
          <AudioCoverPlaceholder />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-400">
              未选择音频
            </h3>
            <p className="text-sm text-gray-400">
              请选择要播放的音频文件
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex items-center space-x-4">
        {/* 音频封面 */}
        <div className="flex-shrink-0">
          {currentTrack.cover ? (
            <img 
              src={currentTrack.cover} 
              alt={`${currentTrack.title} 封面`}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                // 如果封面加载失败，显示占位符
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={currentTrack.cover ? 'hidden' : ''}>
            <AudioCoverPlaceholder />
          </div>
        </div>
        
        {/* 音频信息 */}
        <div className="flex-1 min-w-0">
          {/* 标题和艺术家 */}
          <div className="mb-2">
            <h3 className={classNames(
              "text-lg font-semibold mb-1 truncate",
              {
                "text-blue-600": isPlaying,
                "text-gray-900": !isPlaying
              }
            )}>
              {currentTrack.title}
            </h3>
            <p className={classNames(
              "text-sm mb-2 truncate",
              {
                "text-blue-500": isPlaying,
                "text-gray-600": !isPlaying
              }
            )}>
              {currentTrack.artist}
            </p>
          </div>
          
          {/* 播放状态和额外信息 */}
          <div className="flex items-center justify-between">
            <PlayingIndicator isPlaying={isPlaying} isLoading={isLoading} />
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {/* 播放模式信息 */}
              {contentMode === 'playlist' && (
                <span>
                  第 {currentTrackIndex + 1} 首
                </span>
              )}
              
              {/* 时长信息 */}
              {duration > 0 && (
                <span>
                  {formatTime(duration)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 专辑信息（如果有） */}
      {currentTrack.album && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            专辑: <span className="font-medium">{currentTrack.album}</span>
          </p>
        </div>
      )}
    </div>
  );
}