/**
 * 播放列表组件
 * 显示播放列表并支持歌曲选择
 */

import React from 'react';
import type { PlaylistItem, PlayerState, PlayerConfig, PlayerControls } from '../types';
import { formatTime, classNames } from '../utils';
import { STYLES } from '../constants';

interface PlaylistProps {
  playlist: PlaylistItem[];
  playerState: PlayerState;
  playerConfig: PlayerConfig;
  controls: Pick<PlayerControls, 'playTrack'>;
}

/**
 * 播放状态图标
 */
function PlayingIcon({ isPlaying }: { isPlaying: boolean }) {
  if (isPlaying) {
    return (
      <div className="flex items-center space-x-1">
        <div className="w-1 h-3 bg-blue-500 animate-pulse" />
        <div className="w-1 h-4 bg-blue-500 animate-pulse" style={{ animationDelay: '0.1s' }} />
        <div className="w-1 h-2 bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>
    );
  }
  
  return (
    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  );
}

/**
 * 单个播放列表项组件
 */
function PlaylistItemComponent({ 
  item, 
  index, 
  isActive, 
  isPlaying, 
  isLoading, 
  onSelect 
}: {
  item: PlaylistItem;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={classNames(
        STYLES.PLAYLIST_ITEM,
        {
          'bg-blue-50 border-blue-200': isActive,
          'hover:bg-gray-50': !isActive
        }
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`播放 ${item.title} - ${item.artist}`}
    >
      {/* 播放状态指示器 */}
      <div className="flex-shrink-0 w-8 flex justify-center">
        {isActive ? (
          <PlayingIcon isPlaying={isPlaying && !isLoading} />
        ) : (
          <span className="text-sm text-gray-400">{index + 1}</span>
        )}
      </div>
      
      {/* 歌曲信息 */}
      <div className="flex-1 min-w-0">
        <div className={classNames(
          "font-medium truncate",
          {
            "text-blue-600": isActive,
            "text-gray-900": !isActive
          }
        )}>
          {item.title}
        </div>
        <div className="text-sm text-gray-500 truncate">
          {item.artist}
        </div>
      </div>
      
      {/* 时长 */}
      <div className="flex-shrink-0 text-sm text-gray-400">
        {formatTime(item.duration || 0)}
      </div>
    </div>
  );
}

export function Playlist({ playlist, playerState, playerConfig, controls }: PlaylistProps) {
  const { isPlaying, isLoading } = playerState;
  const { currentTrackIndex, contentMode } = playerConfig;
  const { playTrack } = controls;
  
  // 只在播放列表模式下显示
  if (contentMode !== 'playlist') {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* 播放列表标题 */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          播放列表
        </h3>
        <p className="text-sm text-gray-500">
          共 {playlist.length} 首歌曲
        </p>
      </div>
      
      {/* 播放列表内容 */}
      <div className="max-h-64 overflow-y-auto">
        {playlist.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p>播放列表为空</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {playlist.map((item, index) => (
              <PlaylistItemComponent
                key={`${item.src}-${index}`}
                item={item}
                index={index}
                isActive={index === currentTrackIndex}
                isPlaying={isPlaying}
                isLoading={isLoading}
                onSelect={() => playTrack(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}