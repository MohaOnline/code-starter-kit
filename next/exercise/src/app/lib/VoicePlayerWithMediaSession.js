'use client';

import { Howl, Howler } from 'howler';
import { preciseTimeout } from '@/app/lib/common';

/**
 * 增强版音频播放器，支持 Media Session API
 * 让音频播放出现在手机通知栏中，支持息屏后继续播放
 */
export class VoicePlayerWithMediaSession {
  constructor() {
    this.durations = [];
    this.howls = [];
    this.isPlaying = false;
    this.currentIndex = 0;
    this.activeTimeouts = [];
    this.speed = 1.0;
    this.volume = 1.0;
    
    // Media Session 相关
    this.currentPlaylist = [];
    this.currentWordData = null;
    this.onCompleteCallback = null;
    this.pendingActivation = true;
    this.userInteracted = false;
    
    // 音频间隔设置
    this.en_waitVoiceLength = true;
    this.cn_waitVoiceLength = true;
    this.en_interval = 250;
    this.cn_interval = 250;
    
    // 初始化 Media Session
    this.initMediaSession();
    
    // 创建一个隐藏的 HTML audio 元素来触发 Media Session
    this.createSilentAudioElement();
    
    // 监听用户交互
    this.setupUserInteractionListeners();
  }
  
  /**
   * 创建一个静音的 HTML audio 元素
   * 这是触发 Media Session API 的必要条件
   */
  createSilentAudioElement() {
    this.silentAudio = new Audio();
    this.silentAudio.loop = true;
    this.silentAudio.volume = 0.01; // 极低音量而不是完全静音
    this.silentAudio.preload = 'auto';
    this.silentAudio.crossOrigin = 'anonymous';
    
    // 创建一个极短的音频上下文来生成静音
    this.createSilentAudioBlob();
  }
  
  /**
   * 创建静音音频 Blob
   */
  createSilentAudioBlob() {
    try {
      // 创建音频上下文，兼容 webkit 前缀
      const AudioContextClass = window.AudioContext /*|| window.webkitAudioContext*/;
      if (!AudioContextClass) {
        throw new Error('AudioContext not supported');
      }
      
      const audioContext = new AudioContextClass();
      const sampleRate = audioContext.sampleRate;
      const duration = 1; // 1秒
      const frameCount = sampleRate * duration;
      
      // 创建音频缓冲区
      const audioBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
      const channelData = audioBuffer.getChannelData(0);
      
      // 填充极低音量的音频数据（而不是完全静音）
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.001; // 440Hz 极低音量
      }
      
      // 转换为 WAV 格式的 Blob
      const wavBlob = this.audioBufferToWav(audioBuffer);
      const audioUrl = URL.createObjectURL(wavBlob);
      
      this.silentAudio.src = audioUrl;
      
      // 清理 URL
      this.silentAudio.addEventListener('loadeddata', () => {
        URL.revokeObjectURL(audioUrl);
      });
      
    } catch (error) {
      console.warn('Failed to create silent audio blob, using fallback:', error);
      // 降级到简单的静音音频
      this.silentAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    }
  }
  
  /**
   * 将 AudioBuffer 转换为 WAV 格式的 Blob
   */
  audioBufferToWav(buffer) {
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const channelData = buffer.getChannelData(0);
    
    // WAV 文件头
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    // 音频数据
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }
  
  /**
   * 初始化 Media Session API
   */
  initMediaSession() {
    if (!('mediaSession' in navigator)) {
      console.warn('Media Session API not supported');
      return;
    }
    
    // 设置动作处理器
    navigator.mediaSession.setActionHandler('play', () => {
      console.log('Media Session: play');
      this.resumePlayback();
    });
    
    navigator.mediaSession.setActionHandler('pause', () => {
      console.log('Media Session: pause');
      this.pausePlayback();
    });
    
    navigator.mediaSession.setActionHandler('stop', () => {
      console.log('Media Session: stop');
      this.stop();
    });
    
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      console.log('Media Session: previous track');
      this.previousWord();
    });
    
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      console.log('Media Session: next track');
      this.nextWord();
    });
    
    // 设置播放状态
    navigator.mediaSession.playbackState = 'paused';
  }
  
  /**
   * 更新 Media Session 元数据
   */
  updateMediaMetadata(wordData) {
    if (!('mediaSession' in navigator) || !wordData) return;
    
    const metadata = {
      title: wordData.word || 'Unknown Word',
      artist: 'English Learning',
      album: 'Vocabulary Practice',
      artwork: [
        {
          src: '/favicon.ico',
          sizes: '96x96',
          type: 'image/png'
        }
      ]
    };
    
    // 如果有中文翻译，添加到 title 中
    if (wordData.translation) {
      metadata.title = `${wordData.word} - ${wordData.translation}`;
    }
    
    navigator.mediaSession.metadata = new MediaMetadata(metadata);
    console.log('Media Session metadata updated:', metadata);
  }
  
  /**
   * 启动静音音频以激活 Media Session
   */
  async activateMediaSession() {
    console.log('Activating Media Session...');
    
    // 确保静音音频已加载
    if (this.silentAudio && this.silentAudio.readyState < 2) {
      await new Promise((resolve) => {
        const onCanPlay = () => {
          this.silentAudio.removeEventListener('canplay', onCanPlay);
          resolve();
        };
        this.silentAudio.addEventListener('canplay', onCanPlay);
      });
    }
    
    // 播放静音音频
    if (this.silentAudio && this.silentAudio.paused) {
      try {
        await this.silentAudio.play();
        console.log('Silent audio started successfully');
        this.pendingActivation = false;
      } catch (error) {
        console.warn('Failed to play silent audio:', error);
        // 尝试用户交互后再次播放
        this.pendingActivation = true;
      }
    }
    
    // 设置 Media Session 状态
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'playing';
      console.log('Media Session playback state set to playing');
    }
  }
  
  /**
   * 暂停静音音频
   */
  deactivateMediaSession() {
    console.log('Deactivating Media Session...');
    
    // 不要暂停静音音频，保持 Media Session 活跃
    // if (this.silentAudio && !this.silentAudio.paused) {
    //   this.silentAudio.pause();
    // }
    
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
      console.log('Media Session playback state set to paused');
    }
  }
  
  /**
   * 恢复播放
   */
  resumePlayback() {
    if (!this.isPlaying && this.howls.length > 0) {
      this.isPlaying = true;
      this.activateMediaSession();
      
      if (this.currentIndex < this.howls.length) {
        this.howls[this.currentIndex].play();
      }
    }
  }
  
  /**
   * 暂停播放
   */
  pausePlayback() {
    this.isPlaying = false;
    this.deactivateMediaSession();
    
    // 暂停当前播放的音频
    this.howls.forEach(howl => {
      if (howl.playing()) {
        howl.pause();
      }
    });
    
    // 取消所有定时器
    this.activeTimeouts.forEach(cancelFn => {
      if (typeof cancelFn === 'function') {
        cancelFn();
      }
    });
    this.activeTimeouts = [];
    
    console.log('Playback paused, Media Session updated');
  }
  
  /**
   * 上一个单词（由外部控制）
   */
  previousWord() {
    // 这里需要外部提供回调函数
    if (this.onPreviousWord) {
      this.onPreviousWord();
    }
  }
  
  /**
   * 下一个单词（由外部控制）
   */
  nextWord() {
    // 这里需要外部提供回调函数
    if (this.onNextWord) {
      this.onNextWord();
    }
  }
  
  /**
   * 设置外部控制回调
   */
  setExternalControls(onPreviousWord, onNextWord) {
    this.onPreviousWord = onPreviousWord;
    this.onNextWord = onNextWord;
  }
  
  /**
   * 设置用户交互监听器
   */
  setupUserInteractionListeners() {
    const events = ['click', 'touchstart', 'keydown'];
    const handleFirstInteraction = async () => {
      if (!this.userInteracted) {
        this.userInteracted = true;
        console.log('First user interaction detected');
        
        // 尝试激活静音音频
        if (this.pendingActivation && this.silentAudio) {
          try {
            await this.silentAudio.play();
            console.log('Silent audio activated after user interaction');
            this.pendingActivation = false;
          } catch (error) {
            console.warn('Still failed to activate silent audio:', error);
          }
        }
        
        // 移除监听器
        events.forEach(event => {
          document.removeEventListener(event, handleFirstInteraction);
        });
      }
    };
    
    // 添加监听器
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { passive: true });
    });
  }
  
  /**
   * 处理用户交互以激活 Media Session
   */
  async handleUserInteraction() {
    if (this.pendingActivation && this.silentAudio) {
      try {
        await this.silentAudio.play();
        console.log('Silent audio activated after user interaction');
        this.pendingActivation = false;
      } catch (error) {
        console.warn('Still failed to activate silent audio:', error);
      }
    }
  }
  
  // 分析 AudioBuffer 检测静音
  analyzeAudioBuffer(audioBuffer, index) {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const silenceThreshold = 0.01;
    const silenceDurationMs = 800;
    const silenceSamples = (silenceDurationMs / 1000) * sampleRate;

    let silentSamplesFromEnd = 0;
    for (let i = channelData.length - 1; i >= 0; i--) {
      if (Math.abs(channelData[i]) < silenceThreshold) {
        silentSamplesFromEnd++;
      } else {
        break;
      }
    }

    const silentDurationMs = (silentSamplesFromEnd / sampleRate) * 1000;
    const actualDuration = (audioBuffer.duration * 1000) - silentDurationMs;

    console.log(`Audio ${index}: Total duration: ${audioBuffer.duration * 1000}ms, Silent from end: ${silentDurationMs}ms, Actual duration: ${actualDuration}ms`);

    this.durations[index] = Math.max(actualDuration, 100);

    return {
      totalDuration: audioBuffer.duration * 1000,
      silentDuration: silentDurationMs,
      actualDuration: actualDuration
    };
  }

  setVolume(volume) {
    console.log('setVolume:', volume);
    this.volume = volume;
    Howler.volume(volume);
  }

  setSpeed(speed) {
    console.log('setSpeed:', speed);
    this.speed = speed;
  }

  setVoiceInterval(en_waitVoiceLength = true, cn_waitVoiceLength = true, en_interval = 250, cn_interval = 250) {
    this.en_waitVoiceLength = en_waitVoiceLength;
    this.cn_waitVoiceLength = cn_waitVoiceLength;
    this.en_interval = en_interval;
    this.cn_interval = cn_interval;
    console.log('setVoiceInterval:', this.en_waitVoiceLength, this.cn_waitVoiceLength, this.en_interval, this.cn_interval);
  }

  /**
   * 播放音频列表
   * @param {Array} audioURLs - 音频URL数组
   * @param {Function} onCompleteCallback - 播放完成回调
   * @param {Object} wordData - 当前单词数据，用于 Media Session
   */
  async play(audioURLs, onCompleteCallback = () => {}, wordData = null) {
    this.stop(); // 先清理之前的播放器状态

    this.isPlaying = true;
    this.currentIndex = 0;
    this.onCompleteCallback = onCompleteCallback;
    this.currentWordData = wordData;
    this.currentPlaylist = audioURLs;
    
    // 更新 Media Session 元数据
    this.updateMediaMetadata(wordData);
    
    // 检查是否需要用户交互来激活 Media Session
    if (this.pendingActivation) {
      await this.handleUserInteraction();
    }
    
    // 激活 Media Session
    await this.activateMediaSession();

    this.howls = audioURLs.map((url, index) => {
      if (this.isPlaying) {
        const howl = new Howl({
          src: [url],
          format: url.endsWith('.wav') ? 'wav' : 'mp3',
          volume: this.volume || 1,
          rate: this.speed || 1.0,

          onload: () => {
            this.durations[index] = 0;

            if (url.includes('en-')) {
              if (this.en_waitVoiceLength) {
                this.durations[index] = howl.duration() * 1000;
                fetch(url)
                  .then(response => response.arrayBuffer())
                  .then(arrayBuffer => {
                    const audioContext = Howler.ctx;
                    audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                      const { silentDuration } = this.analyzeAudioBuffer(audioBuffer, index);
                      console.log(this.durations[index]);
                    });
                  })
                  .catch(error => console.error('Error:', error));
              }
              this.durations[index] += this.en_interval;
            }
            else if (url.includes('zh-')) {
              if (this.cn_waitVoiceLength) {
                this.durations[index] = howl.duration() * 1000;
                fetch(url)
                  .then(response => response.arrayBuffer())
                  .then(arrayBuffer => {
                    const audioContext = Howler.ctx;
                    audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                      const { silentDuration } = this.analyzeAudioBuffer(audioBuffer, index);
                      console.log(this.durations[index]);
                    });
                  })
                  .catch(error => console.error('Error:', error));
              }
              this.durations[index] += this.cn_interval;
            }
          },

          onend: () => {
            if (!this.isPlaying) return;

            const pauseTime = (this.durations[this.currentIndex] || 0);
            console.debug('pauseTime:', pauseTime);

            if (this.currentIndex < (this.howls.length - 1) && this.isPlaying) {
              const cancelTimeout = preciseTimeout(() => {
                this.currentIndex += 1;
                if (this.isPlaying) {
                  this.howls[this.currentIndex].play();
                  // 确保 Media Session 状态同步
                  if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'playing';
                  }
                }
              }, pauseTime);
              this.activeTimeouts.push(cancelTimeout);
            } else {
              // 播放完成
              this.deactivateMediaSession();
              const cancelTimeout = preciseTimeout(() => {
                if (this.onCompleteCallback) {
                  this.onCompleteCallback();
                }
                console.log('Audio playlist ended, Media Session updated');
              }, pauseTime);
              this.activeTimeouts.push(cancelTimeout);
            }
          },

          onerror: (error) => {
            console.error('VoicePlayerWithMediaSession error:', url, error);
          },
        });

        return howl;
      }
    });

    // 开始播放第一个音频
    if (this.howls[this.currentIndex]) {
      this.howls[this.currentIndex].play();
    }
  }

  stop() {
    this.isPlaying = false;
    this.currentIndex = 0;
    
    // 停用 Media Session
    this.deactivateMediaSession();

    // 取消所有活跃的定时器
    this.activeTimeouts.forEach(cancelFn => {
      if (typeof cancelFn === 'function') {
        cancelFn();
      }
    });
    this.activeTimeouts = [];

    // 停止并卸载所有 Howl 实例
    this.howls.forEach(howl => {
      howl.stop();
      howl.unload();
    });

    // 清空数组
    this.howls = [];
    this.durations = [];
    this.currentPlaylist = [];
    this.currentWordData = null;
    
    console.log('Playback stopped, Media Session updated');
  }
  
  /**
   * 销毁播放器，清理资源
   */
  destroy() {
    console.log('Destroying VoicePlayerWithMediaSession...');
    
    // 停止所有播放
    this.stop();
    
    // 清理静音音频
    if (this.silentAudio) {
      this.silentAudio.pause();
      this.silentAudio.src = '';
      this.silentAudio.load(); // 重置音频元素
      this.silentAudio = null;
    }
    
    // 清理 Media Session
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    }
    
    // 清理回调
    this.onPlay = null;
    this.onPause = null;
    this.onStop = null;
    this.onEnd = null;
    this.onError = null;
    this.onNext = null;
    this.onPrevious = null;
    this.onCompleteCallback = null;
    
    console.log('VoicePlayerWithMediaSession destroyed');
  }
}