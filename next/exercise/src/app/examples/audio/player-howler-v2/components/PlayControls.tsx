/**
 * 播放控制按钮组件
 * 包含播放/暂停、上一首、下一首、快进、快退等控制按钮
 */

import React from 'react';
import { PlayerState, PlayerConfig, PlayerControls } from '../types';
import { STYLES } from '../constants';
import { classNames } from '../utils';

interface PlayControlsProps {
  playerState: PlayerState;
  playerConfig: PlayerConfig;
  controls: Pick<PlayerControls, 'togglePlay' | 'playNext' | 'playPrevious' | 'skipForward' | 'skipBackward'>;
}

/**
 * 播放/暂停按钮图标
 */
function PlayPauseIcon({ isPlaying, isLoading }: { isPlaying: boolean; isLoading: boolean }) {
  if (isLoading) {
    return (
      <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    );
  }
  
  if (isPlaying) {
    return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  }
  
  return (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  );
}

/**
 * 控制按钮图标组件
 */
function ControlIcon({ type }: { type: 'previous' | 'next' | 'backward' | 'forward' }) {
  const icons = {
    previous: (
      <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
    ),
    next: (
      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
    ),
    backward: (
      <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
    ),
    forward: (
      <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
    )
  };
  
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      {icons[type]}
    </svg>
  );
}

export function PlayControls({ playerState, playerConfig, controls }: PlayControlsProps) {
  const { isLoading } = playerState;
  const { contentMode } = playerConfig;
  const { togglePlay, playNext, playPrevious, skipForward, skipBackward } = controls;
  
  return (
    <div className="flex items-center justify-center space-x-6">
      {/* 上一首按钮 - 仅播放列表模式显示 */}
      {contentMode === 'playlist' && (
        <button
          onClick={playPrevious}
          disabled={isLoading}
          className={STYLES.CONTROL_BUTTON}
          title="上一首"
        >
          <ControlIcon type="previous" />
        </button>
      )}
      
      {/* 快退按钮 */}
      <button
        onClick={skipBackward}
        disabled={isLoading}
        className={STYLES.CONTROL_BUTTON}
        title="快退10秒"
      >
        <ControlIcon type="backward" />
      </button>
      
      {/* 播放/暂停按钮 */}
      <button
        onClick={togglePlay}
        disabled={isLoading}
        className={STYLES.PLAY_BUTTON}
        title={playerState.isPlaying ? '暂停' : '播放'}
      >
        <PlayPauseIcon 
          isPlaying={playerState.isPlaying} 
          isLoading={isLoading} 
        />
      </button>
      
      {/* 快进按钮 */}
      <button
        onClick={skipForward}
        disabled={isLoading}
        className={STYLES.CONTROL_BUTTON}
        title="快进10秒"
      >
        <ControlIcon type="forward" />
      </button>
      
      {/* 下一首按钮 - 仅播放列表模式显示 */}
      {contentMode === 'playlist' && (
        <button
          onClick={() => playNext()}
          disabled={isLoading}
          className={STYLES.CONTROL_BUTTON}
          title="下一首"
        >
          <ControlIcon type="next" />
        </button>
      )}
    </div>
  );
}