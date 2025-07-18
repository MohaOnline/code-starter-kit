/**
 * 进度条组件
 * 显示播放进度并支持拖拽调节
 */

import React, { useRef, useCallback, useState } from 'react';
import type { PlayerState, PlayerControls } from '../types';
import { formatTime, safeExecute, classNames } from '../utils';
import { STYLES } from '../constants';

interface ProgressBarProps {
  playerState: PlayerState;
  controls: Pick<PlayerControls, 'seek'>;
}

export function ProgressBar({ playerState, controls }: ProgressBarProps) {
  const { currentTime, duration, isLoading } = playerState;
  const { seek } = controls;
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  
  // 计算进度百分比
  const displayTime = isDragging ? dragTime : currentTime;
  const progressPercentage = duration > 0 ? (displayTime / duration) * 100 : 0;
  
  // 计算时间位置
  const calculateTimeFromPosition = useCallback((clientX: number) => {
    if (!progressBarRef.current || !duration || duration <= 0) return 0;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    return percentage * duration;
  }, [duration]);
  
  // 处理鼠标按下（开始拖拽）
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!duration || duration <= 0 || isLoading) return;
    
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
    const newTime = calculateTimeFromPosition(event.clientX);
    setDragTime(newTime);
  }, [duration, isLoading, calculateTimeFromPosition]);
  
  // 处理鼠标移动（拖拽中）
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return;
    
    const newTime = calculateTimeFromPosition(event.clientX);
    setDragTime(newTime);
  }, [isDragging, calculateTimeFromPosition]);
  
  // 处理鼠标释放（结束拖拽）
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    const timeToSeek = dragTime;
    setIsDragging(false);
    safeExecute(() => seek(timeToSeek), 'Failed to seek audio');
  }, [isDragging, dragTime, seek]);
  
  // 处理进度条点击
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    // 防止拖拽时触发点击
    if (isDragging) return;
    
    // 确保点击的是进度条本身，而不是子元素
    if (event.target !== event.currentTarget) return;
    
    const newTime = calculateTimeFromPosition(event.clientX);
    safeExecute(() => seek(newTime), 'Failed to seek audio');
  }, [isDragging, calculateTimeFromPosition, seek]);
  
  // 处理键盘导航
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!duration || duration <= 0) return;
    
    const step = duration * 0.05; // 5% of total duration
    let newTime = currentTime;
    
    switch (event.key) {
      case 'ArrowLeft':
        newTime = Math.max(0, currentTime - step);
        break;
      case 'ArrowRight':
        newTime = Math.min(duration, currentTime + step);
        break;
      default:
        return;
    }
    
    event.preventDefault();
    safeExecute(() => seek(newTime), 'Failed to seek audio');
  }, [currentTime, duration, seek]);
  
  // 添加全局鼠标事件监听
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  return (
    <div className="w-full space-y-2">
      {/* 时间显示 */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatTime(displayTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      {/* 进度条 */}
      <div className={classNames(
        STYLES.PROGRESS_BAR,
        {
          'opacity-50': isLoading
        }
      )}>
        <div
          ref={progressBarRef}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label="播放进度"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={displayTime}
          aria-valuetext={`${formatTime(displayTime)} / ${formatTime(duration)}`}
          tabIndex={0}
          className="relative w-full h-2 bg-gray-300 rounded-full"
          style={{
            cursor: duration > 0 && !isLoading ? (isDragging ? 'grabbing' : 'pointer') : 'default'
          }}
        >
        {/* 进度填充 */}
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
        />
        
        {/* 进度指示器 */}
        {duration > 0 && (
          <div
            className={classNames(
              "absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg transform -translate-y-1/2",
              {
                "transition-all duration-150 ease-out": !isDragging,
                "scale-110": isDragging
              }
            )}
            style={{
              left: `calc(${Math.min(100, Math.max(0, progressPercentage))}% - 8px)`
            }}
          />
        )}
        </div>
      </div>
      
      {/* 加载状态指示 */}
      {isLoading && (
        <div className="text-center text-sm text-gray-500">
          加载中...
        </div>
      )}
    </div>
  );
}