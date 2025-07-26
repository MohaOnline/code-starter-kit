'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

interface AudioFile {
  id: string;
  name: string;
  url: string;
}

const audioFiles: AudioFile[] = [
  {
    id: '1',
    name: '音频文件 1',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0ac5f21d-d87d-4c47-a11d-e3b1f649e9d8.wav'
  },
  {
    id: '2',
    name: '音频文件 2',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/06e91889-a572-4913-bff0-e49cec988ecf.wav'
  },
  {
    id: '3',
    name: '音频文件 3',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/070c4aa3-320a-403a-8464-d429f2fa456a.wav'
  },
  {
    id: '4',
    name: '音频文件 4',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0380e9ab-8ca8-4fe0-978f-49315efe4219.wav'
  },
  {
    id: '5',
    name: '音频文件 5',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0829d25d-010f-41c6-8e4d-1471f2855d27.wav'
  }
];

export default function WaveSurferDemo() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const regionsPlugin = useRef<RegionsPlugin | null>(null);
  
  const [currentAudio, setCurrentAudio] = useState<AudioFile>(audioFiles[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!waveformRef.current) return;

    // 初始化 regions plugin / Initialize regions plugin
    regionsPlugin.current = RegionsPlugin.create();

    // 初始化 WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4F46E5',
      progressColor: '#7C3AED',
      cursorColor: '#EF4444',
      barWidth: 2,
      barRadius: 3,
      height: 100,
      normalize: true,
      plugins: [regionsPlugin.current],
      // 启用交互功能 / Enable interaction features
      interact: true
    });

    // 事件监听
    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current?.getDuration() || 0);
    });

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
    });

    wavesurfer.current.on('play', () => {
      setIsPlaying(true);
    });

    wavesurfer.current.on('pause', () => {
      setIsPlaying(false);
    });

    wavesurfer.current.on('finish', () => {
      setIsPlaying(false);
      if (isLooping && selectedRegion) {
        // 如果有选中区域且开启循环，跳转到区域开始位置继续播放
        wavesurfer.current?.seekTo(selectedRegion.start / (wavesurfer.current?.getDuration() || 1));
        wavesurfer.current?.play();
      } else if (isLooping) {
        // 如果没有选中区域但开启循环，从头开始播放
        wavesurfer.current?.seekTo(0);
        wavesurfer.current?.play();
      }
    });

    // 启用拖拽选择区域功能 / Enable drag selection for regions
    regionsPlugin.current.enableDragSelection({
      color: 'rgba(59, 130, 246, 0.25)' // 蓝色透明背景 / Blue transparent background
    });

    // Regions 事件监听 / Regions event listeners
    regionsPlugin.current.on('region-created', (region: any) => {
      setSelectedRegion(region);
    });

    regionsPlugin.current.on('region-updated', (region: any) => {
      setSelectedRegion(region);
    });

    regionsPlugin.current.on('region-removed', () => {
      setSelectedRegion(null);
    });

    // 加载初始音频
    wavesurfer.current.load(currentAudio.url);

    return () => {
      wavesurfer.current?.destroy();
    };
  }, []);

  // 切换音频文件
  const switchAudio = (audio: AudioFile) => {
    if (wavesurfer.current) {
      setCurrentAudio(audio);
      setIsPlaying(false);
      setSelectedRegion(null);
      
      // 清除所有区域
      regionsPlugin.current?.clearRegions();
      
      // 加载新音频
      wavesurfer.current.load(audio.url);
    }
  };

  // 播放/暂停
  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  // 停止播放
  const stop = () => {
    if (wavesurfer.current) {
      wavesurfer.current.stop();
      setIsPlaying(false);
    }
  };

  // 播放选中区域 / Play selected region
  const playRegion = () => {
    if (selectedRegion && wavesurfer.current) {
      // 停止当前播放 / Stop current playback
      wavesurfer.current.stop();
      
      // 跳转到区域开始位置 / Seek to region start
      wavesurfer.current.seekTo(selectedRegion.start / wavesurfer.current.getDuration());
      
      // 开始播放 / Start playback
      wavesurfer.current.play();
      
      // 设置定时器在区域结束时停止播放 / Set timer to stop at region end
      const regionDuration = (selectedRegion.end - selectedRegion.start) * 1000; // 转换为毫秒
      setTimeout(() => {
        if (wavesurfer.current && wavesurfer.current.isPlaying()) {
          wavesurfer.current.pause();
        }
      }, regionDuration);
    }
  };

  // 删除选中区域 / Remove selected region
  const removeRegion = () => {
    if (selectedRegion) {
      selectedRegion.remove();
      setSelectedRegion(null);
    }
  };

  // 清除所有区域 / Clear all regions
  const clearAllRegions = () => {
    regionsPlugin.current?.clearRegions();
    setSelectedRegion(null);
  };

  // 添加随机区域示例 / Add random region example
  const addRandomRegion = () => {
    if (wavesurfer.current && regionsPlugin.current) {
      const duration = wavesurfer.current.getDuration();
      const start = Math.random() * duration * 0.5;
      const end = start + Math.random() * duration * 0.3;
      
      regionsPlugin.current.addRegion({
        start: start,
        end: Math.min(end, duration),
        color: 'rgba(34, 197, 94, 0.25)', // 绿色透明背景 / Green transparent background
        drag: true,
        resize: true
      });
    }
  };

  // 切换循环模式
  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          WaveSurfer 音频演示
        </h1>
        
        {/* 音频文件选择 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            选择音频文件
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {audioFiles.map((audio) => (
              <button
                key={audio.id}
                onClick={() => switchAudio(audio)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  currentAudio.id === audio.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="text-sm font-medium">{audio.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {audio.url.split('/').pop()?.substring(0, 8)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 波形显示 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            当前播放: {currentAudio.name}
          </h2>
          <div 
            ref={waveformRef} 
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg"
          />
          
          {/* 时间信息 */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 控制面板 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            播放控制
          </h2>
          
          {/* 基础控制 */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={togglePlayPause}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  暂停
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  播放
                </>
              )}
            </button>
            
            <button
              onClick={stop}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              停止
            </button>
            
            <button
              onClick={toggleLoop}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                isLooping
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              {isLooping ? '循环开启' : '循环关闭'}
            </button>
          </div>

          {/* 区域控制 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
              区域选择控制
            </h3>
            <div className="flex flex-wrap gap-3 mb-3">
              <button
                onClick={addRandomRegion}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                添加示例区域
              </button>
              
              <button
                onClick={playRegion}
                disabled={!selectedRegion}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                播放选中区域
              </button>
              
              <button
                onClick={removeRegion}
                disabled={!selectedRegion}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
                删除选中区域
              </button>
              
              <button
                onClick={clearAllRegions}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                清除所有区域
              </button>
            </div>
            
            {selectedRegion && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                选中区域: {formatTime(selectedRegion.start)} - {formatTime(selectedRegion.end)}
              </div>
            )}
          </div>

          {/* 使用说明 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
              使用说明
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>点击波形图</strong>：跳转到指定播放位置</li>
              <li>• <strong>拖拽选择区域</strong>：按住鼠标左键在波形图上拖拽可创建选中区域</li>
              <li>• <strong>添加示例区域</strong>：点击绿色按钮可快速添加一个随机区域进行测试</li>
              <li>• <strong>播放选中区域</strong>：仅播放当前选中的音频片段</li>
              <li>• <strong>删除/清除区域</strong>：可删除单个选中区域或清除所有区域</li>
              <li>• <strong>区域编辑</strong>：选中区域后可拖拽边缘调整大小，拖拽中间移动位置</li>
              <li>• <strong>循环播放</strong>：开启后优先循环播放选中区域，无区域时循环播放整个音频</li>
              <li>• <strong>音频切换</strong>：可随时切换不同音频文件，切换时会清除所有区域</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}