'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Download, Upload, Trash2, Volume2 } from 'lucide-react';

// 音频文件接口 / Audio file interface
interface AudioFile {
  id: string;
  name: string;
  url: string;
  duration?: number;
  buffer?: AudioBuffer;
}

// 音频缓冲区状态接口 / Audio buffer state interface
interface BufferState {
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  combinedBuffer: AudioBuffer | null;
}

// 预设音频文件列表 / Preset audio files list
const presetAudioFiles: AudioFile[] = [
  {
    id: '1',
    name: '音频片段 1',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0ac5f21d-d87d-4c47-a11d-e3b1f649e9d8.wav'
  },
  {
    id: '2',
    name: '音频片段 2',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/06e91889-a572-4913-bff0-e49cec988ecf.wav'
  },
  {
    id: '3',
    name: '音频片段 3',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/070c4aa3-320a-403a-8464-d429f2fa456a.wav'
  },
  {
    id: '4',
    name: '音频片段 4',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0380e9ab-8ca8-4fe0-978f-49315efe4219.wav'
  },
  {
    id: '5',
    name: '音频片段 5',
    url: '/refs/notes/chinese-compositions/zh-CN-XiaochenMultilingualNeural/0/0829d25d-010f-41c6-8e4d-1471f2855d27.wav'
  }
];

export default function AudioBufferDemo() {
  // 状态管理 / State management
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [bufferState, setBufferState] = useState<BufferState>({
    isLoading: false,
    isPlaying: false,
    currentTime: 0,
    totalDuration: 0,
    combinedBuffer: null
  });
  const [loadingProgress, setLoadingProgress] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);

  // 音频上下文和源节点引用 / Audio context and source node references
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  // 初始化音频上下文 / Initialize audio context
  useEffect(() => {
    const initAudioContext = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
      } catch (err) {
        setError('无法初始化音频上下文');
        console.error('Audio context initialization error:', err);
      }
    };

    initAudioContext();
    
    // 加载预设音频文件 / Load preset audio files
    setAudioFiles(presetAudioFiles);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // 加载单个音频文件到缓冲区 / Load single audio file to buffer
  const loadAudioBuffer = async (file: AudioFile): Promise<AudioBuffer> => {
    if (!audioContextRef.current) {
      throw new Error('音频上下文未初始化');
    }

    try {
      setLoadingProgress(prev => ({ ...prev, [file.id]: 0 }));
      
      const response = await fetch(file.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      setLoadingProgress(prev => ({ ...prev, [file.id]: 50 }));
      
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      setLoadingProgress(prev => ({ ...prev, [file.id]: 100 }));
      
      return audioBuffer;
    } catch (err) {
      setLoadingProgress(prev => ({ ...prev, [file.id]: -1 }));
      throw new Error(`加载音频文件失败: ${file.name}`);
    }
  };

  // 合并多个音频缓冲区 / Combine multiple audio buffers
  const combineAudioBuffers = (buffers: AudioBuffer[]): AudioBuffer => {
    if (!audioContextRef.current || buffers.length === 0) {
      throw new Error('无法合并音频缓冲区');
    }

    // 计算总时长和采样率 / Calculate total duration and sample rate
    const sampleRate = buffers[0].sampleRate;
    const numberOfChannels = buffers[0].numberOfChannels;
    const totalLength = buffers.reduce((sum, buffer) => sum + buffer.length, 0);

    // 创建新的音频缓冲区 / Create new audio buffer
    const combinedBuffer = audioContextRef.current.createBuffer(
      numberOfChannels,
      totalLength,
      sampleRate
    );

    // 合并所有通道的数据 / Combine data from all channels
    let offset = 0;
    for (const buffer of buffers) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        combinedBuffer.getChannelData(channel).set(channelData, offset);
      }
      offset += buffer.length;
    }

    return combinedBuffer;
  };

  // 生成合并的音频缓冲区 / Generate combined audio buffer
  const generateCombinedBuffer = async () => {
    if (selectedFiles.length === 0) {
      setError('请至少选择一个音频文件');
      return;
    }

    setBufferState(prev => ({ ...prev, isLoading: true }));
    setError(null);
    setLoadingProgress({});

    try {
      // 获取选中的音频文件 / Get selected audio files
      const filesToLoad = audioFiles.filter(file => selectedFiles.includes(file.id));
      
      // 并行加载所有音频文件 / Load all audio files in parallel
      const buffers: AudioBuffer[] = [];
      for (const file of filesToLoad) {
        const buffer = await loadAudioBuffer(file);
        buffers.push(buffer);
      }

      // 合并音频缓冲区 / Combine audio buffers
      const combinedBuffer = combineAudioBuffers(buffers);
      const totalDuration = combinedBuffer.duration;

      setBufferState(prev => ({
        ...prev,
        isLoading: false,
        combinedBuffer,
        totalDuration
      }));

      // 更新音频文件信息 / Update audio file info
      setAudioFiles(prev => prev.map(file => {
        const buffer = buffers[filesToLoad.findIndex(f => f.id === file.id)];
        return buffer ? { ...file, duration: buffer.duration, buffer } : file;
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : '生成音频缓冲区失败');
      setBufferState(prev => ({ ...prev, isLoading: false }));
      console.error('Generate combined buffer error:', err);
    }
  };

  // 播放合并的音频 / Play combined audio
  const playCombinedAudio = () => {
    if (!audioContextRef.current || !gainNodeRef.current || !bufferState.combinedBuffer) {
      setError('音频缓冲区未准备就绪');
      return;
    }

    try {
      // 停止当前播放 / Stop current playback
      stopAudio();

      // 创建新的音频源节点 / Create new audio source node
      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = bufferState.combinedBuffer;
      sourceNodeRef.current.connect(gainNodeRef.current);

      // 设置播放结束回调 / Set playback end callback
      sourceNodeRef.current.onended = () => {
        setBufferState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        startTimeRef.current = 0;
        pauseTimeRef.current = 0;
      };

      // 从暂停位置开始播放 / Start playing from pause position
      const startOffset = pauseTimeRef.current;
      sourceNodeRef.current.start(0, startOffset);
      startTimeRef.current = audioContextRef.current.currentTime - startOffset;

      setBufferState(prev => ({ ...prev, isPlaying: true }));
      
      // 开始更新播放时间 / Start updating playback time
      updatePlaybackTime();

    } catch (err) {
      setError('播放音频失败');
      console.error('Play audio error:', err);
    }
  };

  // 暂停音频播放 / Pause audio playback
  const pauseAudio = () => {
    if (sourceNodeRef.current && audioContextRef.current) {
      // 记录暂停时间 / Record pause time
      pauseTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      
      // 停止当前播放 / Stop current playback
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
      
      setBufferState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  // 停止音频播放 / Stop audio playback
  const stopAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
    
    startTimeRef.current = 0;
    pauseTimeRef.current = 0;
    setBufferState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
  };

  // 更新播放时间 / Update playback time
  const updatePlaybackTime = () => {
    if (bufferState.isPlaying && audioContextRef.current) {
      const currentTime = audioContextRef.current.currentTime - startTimeRef.current;
      setBufferState(prev => ({ ...prev, currentTime: Math.min(currentTime, prev.totalDuration) }));
      
      if (currentTime < bufferState.totalDuration) {
        requestAnimationFrame(updatePlaybackTime);
      }
    }
  };

  // 下载合并的音频 / Download combined audio
  const downloadCombinedAudio = async () => {
    if (!bufferState.combinedBuffer) {
      setError('没有可下载的音频缓冲区');
      return;
    }

    try {
      // 将AudioBuffer转换为WAV格式 / Convert AudioBuffer to WAV format
      const wavBuffer = audioBufferToWav(bufferState.combinedBuffer);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      
      // 创建下载链接 / Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `combined-audio-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      setError('下载音频失败');
      console.error('Download audio error:', err);
    }
  };

  // AudioBuffer转WAV格式的辅助函数 / Helper function to convert AudioBuffer to WAV
  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = buffer.length * blockAlign;
    const bufferSize = 44 + dataSize;
    
    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);
    
    // WAV文件头 / WAV file header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, bufferSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);
    
    // 写入音频数据 / Write audio data
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return arrayBuffer;
  };

  // 切换文件选择 / Toggle file selection
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  // 全选/取消全选 / Select all / Deselect all
  const toggleSelectAll = () => {
    if (selectedFiles.length === audioFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(audioFiles.map(file => file.id));
    }
  };

  // 格式化时间 / Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 获取加载进度 / Get loading progress
  const getLoadingProgress = (fileId: string) => {
    const progress = loadingProgress[fileId];
    if (progress === undefined) return null;
    if (progress === -1) return 'error';
    return progress;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          音频缓冲区演示 - Audio Buffer Demo
        </h1>
        
        {/* 错误提示 / Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* 音频文件选择 / Audio file selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              选择音频文件 ({selectedFiles.length}/{audioFiles.length})
            </h2>
            <button
              onClick={toggleSelectAll}
              className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200"
            >
              {selectedFiles.length === audioFiles.length ? '取消全选' : '全选'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audioFiles.map((file) => {
              const isSelected = selectedFiles.includes(file.id);
              const progress = getLoadingProgress(file.id);
              
              return (
                <div
                  key={file.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{file.name}</h3>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFileSelection(file.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {file.url.split('/').pop()?.substring(0, 20)}...
                  </div>
                  
                  {file.duration && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      时长: {formatTime(file.duration)}
                    </div>
                  )}
                  
                  {progress !== null && (
                    <div className="mt-2">
                      {progress === 'error' ? (
                        <div className="text-red-500 text-xs">加载失败</div>
                      ) : (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 缓冲区控制 / Buffer controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            音频缓冲区控制
          </h2>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={generateCombinedBuffer}
              disabled={selectedFiles.length === 0 || bufferState.isLoading}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {bufferState.isLoading ? '生成中...' : '生成音频缓冲区'}
            </button>
            
            <button
              onClick={bufferState.isPlaying ? pauseAudio : playCombinedAudio}
              disabled={!bufferState.combinedBuffer}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {bufferState.isPlaying ? (
                <>
                  <Square className="w-4 h-4" />
                  暂停播放
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  播放合并音频
                </>
              )}
            </button>
            
            <button
              onClick={stopAudio}
              disabled={!bufferState.combinedBuffer}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              停止播放
            </button>
            
            <button
              onClick={downloadCombinedAudio}
              disabled={!bufferState.combinedBuffer}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              下载合并音频
            </button>
          </div>
          
          {/* 播放进度 / Playback progress */}
          {bufferState.combinedBuffer && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{formatTime(bufferState.currentTime)}</span>
                <span>{formatTime(bufferState.totalDuration)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-100"
                  style={{ 
                    width: `${bufferState.totalDuration > 0 ? (bufferState.currentTime / bufferState.totalDuration) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 技术说明 / Technical explanation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            技术说明
          </h2>
          
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">音频缓冲区技术</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>使用 Web Audio API 的 AudioContext 和 AudioBuffer</li>
                <li>将多个音频文件解码为 AudioBuffer 对象</li>
                <li>通过采样数据拼接实现音频合并</li>
                <li>支持多声道音频处理</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">功能特性</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>多文件选择和批量处理</li>
                <li>实时加载进度显示</li>
                <li>音频播放控制（播放/暂停/停止）</li>
                <li>合并音频下载为 WAV 格式</li>
                <li>播放进度可视化</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">使用场景</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>音频片段拼接和合并</li>
                <li>语音合成结果组合</li>
                <li>音频编辑和处理</li>
                <li>多媒体内容制作</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}