'use client';

import { useEffect, useRef, useState } from 'react';

export default function AudioPlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    // 设置媒体会话元数据以支持手机控制栏
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: '聪明的小猴子',
        artist: '听力对话练习',
        album: '英语学习音频',
        artwork: [
          { src: '/favicon.ico', sizes: '96x96', type: 'image/png' },
        ],
      });

      // 设置媒体会话动作处理器
      navigator.mediaSession.setActionHandler('play', () => {
        audio.play();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause();
      });

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
      });

      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime) {
          audio.currentTime = details.seekTime;
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        audio.currentTime = 0;
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        audio.currentTime = audio.duration;
      });
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // 更新媒体会话位置状态
  useEffect(() => {
    if ('mediaSession' in navigator && duration > 0) {
      navigator.mediaSession.setPositionState({
        duration: duration,
        playbackRate: audioRef.current?.playbackRate || 1,
        position: currentTime,
      });
    }
  }, [currentTime, duration]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error('播放失败:', error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  };

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
            HTML5 音频播放器
          </h1>
          <p className="text-white/70 text-sm">
            支持手机锁屏控制栏 • Media Session API
          </p>
        </div>
        
        <div className="space-y-8">
          {/* 音频元素 */}
          <audio
            ref={audioRef}
            src="/refs/listening_dialog/03/20232Congming11.wav"
            preload="metadata"
            className="hidden"
          />
          
          {/* 音频信息卡片 */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.846l3.537-2.816a1 1 0 011.617.816zM16 7a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1z" clipRule="evenodd" />
                  <path d="M14.657 2.757a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.243 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">聪明的小猴子</h3>
              <p className="text-white/60 text-sm">听力对话练习 • 英语学习音频</p>
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
          
          {/* 功能说明 */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-center text-white/70 text-sm space-y-1">
              <p className="font-medium text-white/90">✨ 支持功能</p>
              <p>🔒 手机锁屏控制栏</p>
              <p>🎵 Media Session API</p>
              <p>⏯️ 播放/暂停/快进/快退</p>
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