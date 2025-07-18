/**
 * 音量控制组件
 * 包含音量滑块和静音按钮
 */

import React, { useRef, useCallback } from 'react';
import type { PlayerState, PlayerControls } from '../types';
import { safeExecute, classNames } from '../utils';
import { STYLES } from '../constants';

interface VolumeControlProps {
  playerState: PlayerState;
  controls: Pick<PlayerControls, 'setVolume'>;
}

/**
 * 音量图标组件
 */
function VolumeIcon({ volume }: { volume: number }) {
  if (volume === 0) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.793a1 1 0 011.617.793zm7.617 2.924a1 1 0 011.414 0 5 5 0 010 7.071 1 1 0 01-1.414-1.414 3 3 0 000-4.243 1 1 0 010-1.414zM15 8a1 1 0 011.414 0 3 3 0 010 4.243A1 1 0 0115 11.414 1 1 0 0115 8z" clipRule="evenodd" />
        <path d="M13.5 6.5l3 3m0-3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  
  if (volume < 0.3) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.793a1 1 0 011.617.793z" clipRule="evenodd" />
      </svg>
    );
  }
  
  if (volume < 0.7) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.793a1 1 0 011.617.793zm2.617 5.924a1 1 0 011.414 0 3 3 0 010 4.243A1 1 0 0112 11.414 1 1 0 0112 9z" clipRule="evenodd" />
      </svg>
    );
  }
  
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.793a1 1 0 011.617.793zm7.617 2.924a1 1 0 011.414 0 5 5 0 010 7.071 1 1 0 01-1.414-1.414 3 3 0 000-4.243 1 1 0 010-1.414zM15 8a1 1 0 011.414 0 3 3 0 010 4.243A1 1 0 0115 11.414 1 1 0 0115 8z" clipRule="evenodd" />
    </svg>
  );
}

export function VolumeControl({ playerState, controls }: VolumeControlProps) {
  const { volume, isLoading } = playerState;
  const { setVolume } = controls;
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const lastVolumeRef = useRef(volume);
  
  // 处理音量条点击
  const handleVolumeClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current || isLoading) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    
    safeExecute(() => setVolume(percentage), 'Failed to set volume');
  }, [isLoading, setVolume]);
  
  // 处理静音切换
  const handleMuteToggle = useCallback(() => {
    if (isLoading) return;
    
    if (volume > 0) {
      lastVolumeRef.current = volume;
      safeExecute(() => setVolume(0), 'Failed to toggle mute');
    } else {
      safeExecute(() => setVolume(lastVolumeRef.current > 0 ? lastVolumeRef.current : 0.5), 'Failed to toggle mute');
    }
  }, [volume, isLoading, setVolume]);
  
  // 处理键盘控制
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (isLoading) return;
    
    let newVolume = volume;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newVolume = Math.max(0, volume - 0.1);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newVolume = Math.min(1, volume + 0.1);
        break;
      case 'Home':
        newVolume = 0;
        break;
      case 'End':
        newVolume = 1;
        break;
      case ' ':
      case 'Enter':
        handleMuteToggle();
        event.preventDefault();
        return;
      default:
        return;
    }
    
    event.preventDefault();
    safeExecute(() => setVolume(newVolume), 'Failed to set volume');
  }, [volume, isLoading, setVolume, handleMuteToggle]);
  
  const volumePercentage = volume * 100;
  
  return (
    <div className="flex items-center space-x-3">
      {/* 静音按钮 */}
      <button
        onClick={handleMuteToggle}
        disabled={isLoading}
        className={STYLES.CONTROL_BUTTON}
        title={volume > 0 ? '静音' : '取消静音'}
      >
        <VolumeIcon volume={volume} />
      </button>
      
      {/* 音量滑块 */}
      <div className="flex items-center space-x-2">
        <div
          ref={volumeBarRef}
          className={classNames(
            STYLES.VOLUME_BAR,
            'group'
          )}
          onClick={handleVolumeClick}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label="音量控制"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(volumePercentage)}
          aria-valuetext={`音量 ${Math.round(volumePercentage)}%`}
          tabIndex={0}
          style={{
            cursor: !isLoading ? 'pointer' : 'default'
          }}
        >
          {/* 音量填充 */}
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${volumePercentage}%` }}
          />
          
          {/* 音量指示器 */}
          <div
            className="absolute top-1/2 w-3 h-3 bg-blue-500 rounded-full border border-white shadow transform -translate-y-1/2 transition-all duration-150 ease-out"
            style={{
              left: `calc(${volumePercentage}% - 6px)`
            }}
          />
        </div>
        
        {/* 音量百分比显示 */}
        <span className="text-sm text-gray-600 w-8 text-right">
          {Math.round(volumePercentage)}
        </span>
      </div>
    </div>
  );
}