'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

export default function AudioAmplificationExample() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([1]); // 默认音量为1
  const [gain, setGain] = useState([2]); // 默认放大倍数为2
  
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);

  const audioUrl = 'http://localhost:3000/refs/listening_dialog/03/20232Yangpu08.wav';

  // 初始化音频上下文
  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      
      // 创建增益节点
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      // 设置初始增益值
      gainNodeRef.current.gain.value = volume[0] * gain[0];
    }
    
    // 确保音频上下文处于运行状态
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
  };

  // 加载音频文件
  const loadAudio = async () => {
    if (audioBufferRef.current) return;
    
    setIsLoading(true);
    try {
      await initAudioContext();
      
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      audioBufferRef.current = audioBuffer;
      setDuration(audioBuffer.duration);
    } catch (error) {
      console.error('加载音频失败:', error);
      alert('加载音频失败，请检查音频文件是否存在');
    } finally {
      setIsLoading(false);
    }
  };

  // 播放音频
  const playAudio = async () => {
    if (!audioBufferRef.current) {
      await loadAudio();
      if (!audioBufferRef.current) return;
    }

    await initAudioContext();
    
    // 停止当前播放的音频
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
    }

    // 创建新的音频源节点
    sourceNodeRef.current = audioContextRef.current.createBufferSource();
    sourceNodeRef.current.buffer = audioBufferRef.current;
    sourceNodeRef.current.connect(gainNodeRef.current);

    // 设置播放结束回调
    sourceNodeRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      pauseTimeRef.current = 0;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    // 从暂停位置开始播放
    const offset = pauseTimeRef.current;
    sourceNodeRef.current.start(0, offset);
    startTimeRef.current = audioContextRef.current.currentTime - offset;
    
    setIsPlaying(true);
    updateProgress();
  };

  // 暂停音频
  const pauseAudio = () => {
    if (sourceNodeRef.current && isPlaying) {
      sourceNodeRef.current.stop();
      pauseTimeRef.current = audioContextRef.current.currentTime - startTimeRef.current;
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  // 停止音频
  const stopAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    pauseTimeRef.current = 0;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // 更新播放进度
  const updateProgress = () => {
    if (isPlaying && audioContextRef.current && startTimeRef.current) {
      const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
      setCurrentTime(Math.min(elapsed, duration));
      
      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    }
  };

  // 更新音量和增益
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume[0] * gain[0];
    }
  }, [volume, gain]);

  // 格式化时间显示
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-6 w-6" />
            音频放大示例
          </CardTitle>
          <CardDescription>
            使用 Web Audio API 的 GainNode 实现音频放大功能
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 音频信息 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">音频文件:</p>
            <p className="text-xs font-mono break-all">{audioUrl}</p>
          </div>

          {/* 播放控制 */}
          <div className="flex items-center gap-4">
            <Button
              onClick={isPlaying ? pauseAudio : playAudio}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isLoading ? '加载中...' : isPlaying ? '暂停' : '播放'}
            </Button>
            
            <Button
              onClick={stopAudio}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              停止
            </Button>
            
            <div className="text-sm text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* 进度条 */}
          <div className="space-y-2">
            <Label>播放进度</Label>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* 音量控制 */}
          <div className="space-y-2">
            <Label>基础音量: {volume[0].toFixed(1)}</Label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* 增益控制 */}
          <div className="space-y-2">
            <Label>放大倍数: {gain[0].toFixed(1)}x</Label>
            <Slider
              value={gain}
              onValueChange={setGain}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* 最终音量显示 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-800">
              最终音量: {(volume[0] * gain[0]).toFixed(2)} 
              {gain[0] > 1 && (
                <span className="text-orange-600 ml-2">
                  (已放大 {((gain[0] - 1) * 100).toFixed(0)}%)
                </span>
              )}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              最终音量 = 基础音量 × 放大倍数
            </p>
          </div>

          {/* 技术说明 */}
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <h4 className="font-medium mb-2">技术实现:</h4>
            <ul className="space-y-1 text-xs">
              <li>• 使用 Web Audio API 的 AudioContext</li>
              <li>• 通过 GainNode 实现音频放大</li>
              <li>• 支持超过 100% 的音量放大</li>
              <li>• 实时音量调节，无需重新加载音频</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}