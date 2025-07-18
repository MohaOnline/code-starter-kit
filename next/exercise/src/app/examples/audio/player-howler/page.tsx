'use client';

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

// 播放列表接口定义
interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  src: string;
}

// 播放模式枚举
type PlayMode = 'single' | 'loop';

// 内容模式枚举
type ContentMode = 'file' | 'playlist';

export default function HowlerAudioPlayerPage() {
  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  
  // 播放模式和内容模式
  const [playMode, setPlayMode] = useState<PlayMode>('single');
  const [contentMode, setContentMode] = useState<ContentMode>('file');
  
  // 播放列表相关状态
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Howler 实例引用
  const howlRef = useRef<Howl | null>(null);
  
  // 使用 ref 存储最新状态值，解决 onend 回调中的闭包问题
  const contentModeRef = useRef(contentMode);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const playModeRef = useRef(playMode);
  
  // 更新 ref 值
  useEffect(() => {
    contentModeRef.current = contentMode;
  }, [contentMode]);
  
  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);
  
  useEffect(() => {
    playModeRef.current = playMode;
  }, [playMode]);
  const [playlist] = useState<PlaylistItem[]>([
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
  ]);
  
  // 当前播放的音频源
  const currentSrc = contentMode === 'file' 
    ? '/refs/listening_dialog/03/20232Congming11.wav'
    : playlist[currentTrackIndex]?.src;
    
  const currentTrack = contentMode === 'playlist' 
    ? playlist[currentTrackIndex]
    : {
        id: 'single',
        title: '聪明的小猴子',
        artist: '听力对话练习',
        src: currentSrc
      };

  // 初始化 Howler 实例
  const initializeHowl = (src: string) => {
    // 强制清理之前的实例
    if (howlRef.current) {
      try {
        howlRef.current.stop(); // 先停止播放
        howlRef.current.unload(); // 然后卸载
        console.log('清理旧的 Howler 实例');
      } catch (error) {
        console.warn('清理旧实例时出错:', error);
      }
      howlRef.current = null; // 确保引用被清空
    }
    
    // 重置状态
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    
    const howl = new Howl({
      src: [src],
      html5: true, // 使用 HTML5 Audio 以支持流式播放
      preload: true,
      volume: volume,
      loop: contentMode === 'file' && playMode === 'loop', // 只在单文件模式下设置循环
      onload: () => {
        setDuration(howl.duration());
        setIsLoading(false);
        console.log('音频加载完成');
      },
      onplay: () => {
        setIsPlaying(true);
        console.log('开始播放');
      },
      onpause: () => {
        setIsPlaying(false);
        console.log('暂停播放');
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        console.log('停止播放');
      },
      onend: () => {
        setIsPlaying(false);
        // 使用 ref 获取最新的状态值，避免闭包问题
        const currentContentMode = contentModeRef.current;
        const currentIndex = currentTrackIndexRef.current;
        const currentPlayMode = playModeRef.current;
        
        console.log('播放结束，当前模式:', currentContentMode, '当前索引:', currentIndex);
        if (currentContentMode === 'playlist') {
          // 播放列表模式下处理下一首音频
          // 设置自动播放标志，但不直接调用 play() 避免浏览器限制
          setShouldAutoPlay(true);
          console.log('播放列表模式：准备播放下一首，当前索引:', currentIndex);
          // 传递当前索引以避免状态更新延迟问题
          playNext(currentIndex);
        } else if (currentPlayMode !== 'loop') {
          // 单文件模式且非循环时，重置播放位置
          setCurrentTime(0);
          console.log('单文件模式：重置播放位置');
        }
      },
      onloaderror: (id, error) => {
        console.error('音频加载错误:', error);
        setIsLoading(false);
      },
      onplayerror: (id, error) => {
        console.error('播放错误:', error);
        setIsLoading(false);
      }
    });
    
    howlRef.current = howl;
  };

  // 监听音频源变化，重新初始化 Howler
  useEffect(() => {
    if (currentSrc) {
      initializeHowl(currentSrc);
    }
    
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
  }, [currentSrc]); // 只在音频源变化时重新初始化，避免重复创建实例

  // 更新播放模式时重新设置循环
  useEffect(() => {
    if (howlRef.current) {
      // 只有在单文件模式下才启用文件级循环
      howlRef.current.loop(contentMode === 'file' && playMode === 'loop');
    }
  }, [playMode, contentMode]);

  // 处理自动播放逻辑
  useEffect(() => {
    console.log('自动播放逻辑检查:', {
      shouldAutoPlay,
      isLoading,
      hasHowl: !!howlRef.current,
      contentMode,
      currentTrackIndex
    });
    
    if (shouldAutoPlay && !isLoading && howlRef.current && contentMode === 'playlist') {
      // 只在播放列表模式下且音频已加载完成时自动播放
      console.log('准备自动播放，延迟300ms');
      const timer = setTimeout(() => {
        const howl = howlRef.current;
        if (howl && !isLoading && !isPlaying) {
          try {
            // 确保从头开始播放
            howl.seek(0);
            howl.play();
            setShouldAutoPlay(false);
            console.log('✅ 自动播放成功，当前索引:', currentTrackIndex);
          } catch (error) {
            console.warn('❌ 自动播放失败，可能需要用户交互:', error);
            setShouldAutoPlay(false);
          }
        } else {
          console.log('❌ 跳过自动播放：', { 
            hasHowl: !!howl, 
            isLoading, 
            isPlaying, 
            shouldAutoPlay 
          });
          setShouldAutoPlay(false);
        }
      }, 300); // 增加延迟确保实例完全初始化
      
      return () => clearTimeout(timer);
    }
  }, [shouldAutoPlay, isLoading, contentMode, currentTrackIndex, isPlaying]);

  // 定时更新播放进度
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && howlRef.current) {
      interval = setInterval(() => {
        const seek = howlRef.current?.seek() || 0;
        setCurrentTime(typeof seek === 'number' ? seek : 0);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  // 播放/暂停切换
  const togglePlay = () => {
    const howl = howlRef.current;
    if (!howl || isLoading) {
      console.warn('Howler 实例不存在或正在加载中');
      return;
    }
    
    try {
      if (isPlaying) {
        howl.pause();
        setShouldAutoPlay(false); // 用户暂停时停止自动播放
        console.log('用户暂停播放');
      } else {
        // 确保从当前位置开始播放
        howl.play();
        // 只在播放列表模式下启用自动播放
        if (contentMode === 'playlist') {
          setShouldAutoPlay(true);
        }
        console.log('用户开始播放，内容模式:', contentMode);
      }
    } catch (error) {
      console.error('播放/暂停操作失败:', error);
      setIsPlaying(false);
    }
  };

  // 进度条拖拽
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const howl = howlRef.current;
    if (!howl || isLoading) {
      console.warn('无法调整进度：Howler 实例不存在或正在加载中');
      return;
    }
    
    try {
      const newTime = parseFloat(e.target.value);
      if (isNaN(newTime) || newTime < 0 || newTime > duration) {
        console.warn('无效的时间位置:', newTime);
        return;
      }
      
      howl.seek(newTime);
      setCurrentTime(newTime);
      console.log('调整播放位置到:', newTime);
    } catch (error) {
      console.error('调整播放位置失败:', error);
    }
  };

  // 音量调节
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (howlRef.current) {
      howlRef.current.volume(newVolume);
    }
  };

  // 快退 10 秒
  const skipBackward = () => {
    const howl = howlRef.current;
    if (!howl) return;
    
    const currentSeek = howl.seek() || 0;
    const newSeek = Math.max(currentSeek - 10, 0);
    howl.seek(newSeek);
    setCurrentTime(newSeek);
  };

  // 快进 10 秒
  const skipForward = () => {
    const howl = howlRef.current;
    if (!howl) return;
    
    const currentSeek = howl.seek() || 0;
    const newSeek = Math.min(currentSeek + 10, duration);
    howl.seek(newSeek);
    setCurrentTime(newSeek);
  };

  // 播放上一首（仅播放列表模式）
  const playPrevious = () => {
    if (contentMode !== 'playlist') return;
    
    const newIndex = currentTrackIndex > 0 
      ? currentTrackIndex - 1 
      : playlist.length - 1;
    setCurrentTrackIndex(newIndex);
  };

  // 播放下一首（仅播放列表模式）
  const playNext = (fromIndexOrEvent?: number | React.MouseEvent) => {
    // 使用 ref 获取最新的状态值，避免闭包问题
    const currentContentMode = contentModeRef.current;
    const currentPlayMode = playModeRef.current;
    const currentIndex = currentTrackIndexRef.current;
    
    if (currentContentMode !== 'playlist') return;
    
    // 判断是否为事件对象，如果是数字则使用，否则为undefined
    const fromIndex = typeof fromIndexOrEvent === 'number' ? fromIndexOrEvent : undefined;
    
    // 使用传入的索引或当前索引
    const indexToUse = fromIndex !== undefined ? fromIndex : currentIndex;
    const isLastTrack = indexToUse >= playlist.length - 1;
    
    console.log('playNext 调用：当前索引', indexToUse, '是否最后一首', isLastTrack, '播放模式', currentPlayMode);
    
    if (isLastTrack && currentPlayMode === 'loop') {
      // 循环模式：播放列表结束后重新开始
      setCurrentTrackIndex(0);
      console.log('播放列表循环：重新开始播放');
    } else if (isLastTrack && currentPlayMode === 'single') {
      // 单次模式：播放列表结束后停止，但不重置索引
      setIsPlaying(false);
      setShouldAutoPlay(false);
      console.log('播放列表结束：停止播放');
      return; // 直接返回，不改变当前索引
    } else {
      // 正常播放下一首
      const nextIndex = indexToUse + 1;
      setCurrentTrackIndex(nextIndex);
      console.log('播放下一首：从索引', indexToUse, '到', nextIndex);
    }
  };

  // 切换播放模式
  const togglePlayMode = () => {
    setPlayMode(prev => prev === 'single' ? 'loop' : 'single');
  };

  // 切换内容模式
  const toggleContentMode = () => {
    setContentMode(prev => prev === 'file' ? 'playlist' : 'file');
    // 切换到文件模式时重置到第一首
    if (contentMode === 'playlist') {
      setCurrentTrackIndex(0);
    }
  };

  // 时间格式化
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Howler.js 音频播放器
          </h1>
          <p className="text-white/70 text-sm">
            专业音频库 • 支持播放列表 • 循环播放
          </p>
        </div>
        
        <div className="space-y-8">
          {/* 模式切换按钮 */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleContentMode}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                contentMode === 'file'
                  ? 'bg-blue-500/30 text-white border border-blue-400/50'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
              }`}
            >
              {contentMode === 'file' ? '📄 单文件' : '📄 单文件'}
            </button>
            <button
              onClick={toggleContentMode}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                contentMode === 'playlist'
                  ? 'bg-blue-500/30 text-white border border-blue-400/50'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
              }`}
            >
              {contentMode === 'playlist' ? '📋 播放列表' : '📋 播放列表'}
            </button>
            <button
              onClick={togglePlayMode}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                playMode === 'loop'
                  ? 'bg-green-500/30 text-white border border-green-400/50'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
              }`}
            >
              {playMode === 'loop' ? '🔁 循环' : '▶️ 单次'}
            </button>
          </div>
          
          {/* 音频信息卡片 */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.846l3.537-2.816a1 1 0 011.617.816zM16 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1z" clipRule="evenodd" />
                  <path d="M14.657 2.757a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.243 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{currentTrack?.title}</h3>
              <p className="text-white/60 text-sm">{currentTrack?.artist}</p>
              {contentMode === 'playlist' && (
                <p className="text-white/50 text-xs mt-1">
                  {currentTrackIndex + 1} / {playlist.length}
                </p>
              )}
            </div>
          </div>
          
          {/* 进度条 */}
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              disabled={isLoading}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* 播放控制按钮 */}
          <div className="flex items-center justify-center space-x-6">
            {contentMode === 'playlist' && (
              <button
                onClick={playPrevious}
                disabled={isLoading}
                className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/30"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
              </button>
            )}
            
            <button
              onClick={skipBackward}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
            
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="bg-white/30 hover:bg-white/40 disabled:opacity-50 text-white rounded-full p-4 transition-all duration-200 backdrop-blur-sm border border-white/40 shadow-lg"
            >
              {isLoading ? (
                <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <button
              onClick={skipForward}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
            
            {contentMode === 'playlist' && (
              <button
                onClick={playNext}
                disabled={isLoading}
                className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm border border-white/30"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
              </button>
            )}
          </div>
          
          {/* 音量控制 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.846l3.537-2.816a1 1 0 011.617.816zM12.828 7.757a1 1 0 011.414 0A3.982 3.982 0 0116 10a3.982 3.982 0 01-1.758 2.243 1 1 0 11-1.414-1.414A1.993 1.993 0 0014 10c0-.553-.223-1.051-.586-1.414a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white/70 text-sm w-8">{Math.round(volume * 100)}</span>
            </div>
          </div>
          
          {/* 播放列表 */}
          {contentMode === 'playlist' && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-white/90 font-medium mb-3 text-center">播放列表</h4>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrackIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentTrackIndex
                        ? 'bg-blue-500/20 border border-blue-400/30'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        index === currentTrackIndex && isPlaying
                          ? 'bg-green-400 animate-pulse'
                          : index === currentTrackIndex
                          ? 'bg-blue-400'
                          : 'bg-white/30'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{track.title}</p>
                        <p className="text-white/60 text-xs">{track.artist}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 功能说明 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-center text-white/70 text-sm space-y-1">
              <p className="font-medium text-white/90">✨ Howler.js 特性</p>
              <p>🎵 专业音频处理</p>
              <p>📋 播放列表支持</p>
              <p>🔁 循环播放模式</p>
              <p>⚡ 高性能音频引擎</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-webkit-slider-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        
        .slider::-moz-range-track {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}