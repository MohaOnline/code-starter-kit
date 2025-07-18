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

export default function HowlerVoicePlayerPage() {
  // Howler 实例引用
  const howlRef = useRef<Howl | null>(null);
  
  // 播放状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  
  // 播放模式和内容模式 - 默认设置为循环播放列表模式
  const [playMode, setPlayMode] = useState<PlayMode>('loop');
  const [contentMode, setContentMode] = useState<ContentMode>('playlist');
  
  // 播放列表相关状态
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // 扩展的语音播放列表，包含来自所有子目录的 Azure TTS 语音样本
  // 这些语音文件来自 en-GB-RyanNeural 语音模型，适合英语学习场景
  const [playlist] = useState<PlaylistItem[]>([
    // 来自目录 0 的语音样本
    
    {
      id: '-3',
      title: '聪明的小猴子 11',
      artist: '听力对话练习',
      src: '/refs/listening_dialog/03/20232Congming11.wav'
    },
    {
      id: '-1',
      title: '聪明的小猴子 11',
      artist: '听力对话练习',
      src: '/refs/listening_dialog/03/20232Congming11.wav'
    },
    {
      id: '0',
      title: '聪明的小猴子 11',
      artist: '听力对话练习',
      src: '/refs/listening_dialog/03/20232Congming11.wav'
    },
    {
      id: '1',
      title: 'Voice Sample 01',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/0/00246732-22e8-429a-8d0d-239dd5d08e7a.wav'
    },
    {
      id: '2', 
      title: 'Voice Sample 02',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/0/005353c5-c026-46a8-9c85-3d1f0801c6f0.wav'
    },
    {
      id: '3',
      title: 'Voice Sample 03', 
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/0/008e6c73-e3bf-419f-aed8-d9664df18dec.wav'
    },
    {
      id: '4',
      title: 'Voice Sample 04',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/0/014db1df-d6b9-4da24-894cb-47b0fd75c029.wav'
    },
    {
      id: '5',
      title: 'Voice Sample 05',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/0/016dc87d-4871-42eb-ac8f-0fac8cd16206.wav'
    },
    // 来自目录 1 的语音样本
    {
      id: '6',
      title: 'Voice Sample 06',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/1/105d48a1-3f30-42bf-ac43-e5d3eb2c7667.wav'
    },
    {
      id: '7',
      title: 'Voice Sample 07',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/1/107a7c28-5c4d-4f80-9bbe-8886101d871a.wav'
    },
    {
      id: '8',
      title: 'Voice Sample 08',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/1/107c7529-11f0-4eda-b416-ba61e791e924.wav'
    },
    {
      id: '9',
      title: 'Voice Sample 09',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/1/10a10916-e731-404e-9917-36c140505a1b.wav'
    },
    {
      id: '10',
      title: 'Voice Sample 10',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/1/1176dc37-d6fe-4bd50-82177-2a0e182198be.wav'
    },
    // 来自目录 2 的语音样本
    {
      id: '11',
      title: 'Voice Sample 11',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/2/202842c2-fb5a-4d340-b4ced-ab5006860821.wav'
    },
    {
      id: '12',
      title: 'Voice Sample 12',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/2/2092dd85-08a1-4b325-8202f-dfd84b0d0457.wav'
    },
    {
      id: '13',
      title: 'Voice Sample 13',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/2/20b53f4f-6266-4b8c6-ac8af-a1391eb18386.wav'
    },
    {
      id: '14',
      title: 'Voice Sample 14',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/2/216bd738-1064-4daef-a77d1-8ada5cbe0b47.wav'
    },
    {
      id: '15',
      title: 'Voice Sample 15',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/2/21ad0bba-0066-4ac88-83d61-718666a367ea.wav'
    },
    // 来自目录 3 的语音样本
    {
      id: '16',
      title: 'Voice Sample 16',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/3/308f5ea8-aee4-404c9-a2f49-3a6fd3f2875f.wav'
    },
    {
      id: '17',
      title: 'Voice Sample 17',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/3/30d1c032-fce4-4eb4-b482-814dddfb8afa.wav'
    },
    {
      id: '18',
      title: 'Voice Sample 18',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/3/30f84dc2-8f84-4ce4-8e47-0d76edcb9299.wav'
    },
    {
      id: '19',
      title: 'Voice Sample 19',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/3/311d4ca7-74d6-4b0fe-84224-142115daa8aa.wav'
    },
    {
      id: '20',
      title: 'Voice Sample 20',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/3/313c7fb5-ab76-4048-80ff-bef776b2c2dd.wav'
    },
    // 来自目录 4 的语音样本
    {
      id: '21',
      title: 'Voice Sample 21',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/4/40237095-12e9-43078-aa256-53ffa4c26e43.wav'
    },
    {
      id: '22',
      title: 'Voice Sample 22',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/4/4029ed90-e3b8-4c1fa-aa9a2-40794684d6a0.wav'
    },
    {
      id: '23',
      title: 'Voice Sample 23',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/4/40a4bb9f-21e8-4f6d8-b195a-a92e9e304215.wav'
    },
    {
      id: '24',
      title: 'Voice Sample 24',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/4/40ab04a4-0bd0-4de84-9d900-baa462edc2f0.wav'
    },
    {
      id: '25',
      title: 'Voice Sample 25',
      artist: 'en-GB-RyanNeural',
      src: '/refs/voices/en-GB-RyanNeural/4/415800af-d58a-4b7d4-85285-dc588f5053f6.wav'
    }
  ]);
  
  // 当前播放的音频源
  const currentSrc = contentMode === 'file' 
    ? '/refs/voices/en-GB-RyanNeural/0/00246732-22e8-429a-8d0d-239dd5d08e7a.wav'
    : playlist[currentTrackIndex]?.src;
    
  const currentTrack = contentMode === 'playlist' 
    ? playlist[currentTrackIndex]
    : {
        id: 'single',
        title: 'Voice Sample',
        artist: 'en-GB-RyanNeural',
        src: currentSrc
      };

  // 初始化 Howler 实例
  // Howler.js 是一个现代化的 Web 音频库，提供了比原生 HTML5 Audio 更强大的功能
  // 参考文档: https://howlerjs.com/
  const initializeHowl = (src: string) => {
    // 清理之前的实例，避免内存泄漏
    if (howlRef.current) {
      howlRef.current.unload();
    }
    
    setIsLoading(true);
    
    const howl = new Howl({
      src: [src],
      html5: true, // 使用 HTML5 Audio 以支持流式播放，适合较大的音频文件
      preload: true, // 预加载音频数据，提供更好的用户体验
      volume: volume,
      loop: contentMode === 'file' && playMode === 'loop', // 只在单文件模式下设置循环
      onload: () => {
        setDuration(howl.duration());
        setIsLoading(false);
        console.log('语音文件加载完成:', src);
      },
      onplay: () => {
        setIsPlaying(true);
        console.log('开始播放语音');
      },
      onpause: () => {
        setIsPlaying(false);
        console.log('暂停播放语音');
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        console.log('停止播放语音');
      },
      onend: () => {
        setIsPlaying(false);
        if (contentMode === 'playlist') {
          // 播放列表模式下处理下一首语音
          // 设置自动播放标志，但不直接调用 play() 避免浏览器限制
          setShouldAutoPlay(true);
          playNext();
        } else if (playMode !== 'loop') {
          // 单文件模式且非循环时，重置播放位置
          setCurrentTime(0);
        }
        console.log('语音播放结束');
      },
      onloaderror: (id, error) => {
        console.error('语音文件加载错误:', error);
        setIsLoading(false);
      },
      onplayerror: (id, error) => {
        console.error('语音播放错误:', error);
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
  }, [currentSrc]);

  // 处理自动播放逻辑
  useEffect(() => {
    if (shouldAutoPlay && !isLoading && howlRef.current && contentMode === 'playlist') {
      // 只在播放列表模式下且音频已加载完成时自动播放
      const timer = setTimeout(() => {
        if (howlRef.current && !isLoading) {
          try {
            howlRef.current.play();
            setShouldAutoPlay(false);
            console.log('自动播放下一首语音');
          } catch (error) {
            console.warn('自动播放失败，可能需要用户交互:', error);
            setShouldAutoPlay(false);
          }
        }
      }, 200); // 稍微延迟确保音频完全加载
      
      return () => clearTimeout(timer);
    }
  }, [shouldAutoPlay, isLoading, contentMode]);

  // 更新播放模式时重新设置循环
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.loop(playMode === 'loop');
    }
  }, [playMode]);

  // 定时更新播放进度
  // 使用 1 秒间隔更新，平衡性能和用户体验
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
    if (!howl) return;
    
    if (isPlaying) {
      howl.pause();
      setShouldAutoPlay(false); // 用户暂停时停止自动播放
    } else {
      howl.play();
      setShouldAutoPlay(true); // 用户开始播放时启用自动播放
    }
  };

  // 进度条拖拽
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const howl = howlRef.current;
    if (!howl) return;
    
    const newTime = parseFloat(e.target.value);
    howl.seek(newTime);
    setCurrentTime(newTime);
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
  const playNext = () => {
    if (contentMode !== 'playlist') return;
    
    const isLastTrack = currentTrackIndex >= playlist.length - 1;
    
    if (isLastTrack && playMode === 'loop') {
      // 循环模式：播放列表结束后重新开始
      setCurrentTrackIndex(0);
      console.log('播放列表循环：重新开始播放');
    } else if (isLastTrack && playMode === 'single') {
      // 单次模式：播放列表结束后停止
      setCurrentTrackIndex(0);
      setIsPlaying(false);
      console.log('播放列表结束：停止播放');
    } else {
      // 正常播放下一首
      setCurrentTrackIndex(currentTrackIndex + 1);
      console.log('播放下一首：', currentTrackIndex + 1);
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            语音播放器
          </h1>
          <p className="text-white/70 text-sm">
            en-GB-RyanNeural • Azure TTS 语音 • 英语学习
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
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h3a1 1 0 110 2h-1v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6H4a1 1 0 010-2h3zM9 6v8h2V6H9z" />
                  <path d="M5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
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
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-h-64 overflow-y-auto">
              <h4 className="text-white/90 font-medium mb-3 text-center">语音播放列表</h4>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrackIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentTrackIndex
                        ? 'bg-emerald-500/20 border border-emerald-400/30'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        index === currentTrackIndex && isPlaying
                          ? 'bg-green-400 animate-pulse'
                          : index === currentTrackIndex
                          ? 'bg-emerald-400'
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
              <p className="font-medium text-white/90">🎙️ 语音播放器特性</p>
              <p>🇬🇧 英式英语语音</p>
              <p>🔁 默认循环播放</p>
              <p>📋 语音文件列表</p>
              <p>⚡ Azure TTS 高质量语音</p>
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
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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