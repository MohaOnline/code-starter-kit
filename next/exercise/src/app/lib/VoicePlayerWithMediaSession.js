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
    
    // 音频间隔设置
    this.en_waitVoiceLength = true;
    this.cn_waitVoiceLength = true;
    this.en_interval = 250;
    this.cn_interval = 250;
    
    // 初始化 Media Session
    this.initMediaSession();
    
    // 创建一个隐藏的 HTML audio 元素来触发 Media Session
    this.createSilentAudioElement();
  }
  
  /**
   * 创建一个静音的 HTML audio 元素
   * 这是触发 Media Session API 的必要条件
   */
  createSilentAudioElement() {
    // 创建一个非常短的静音音频 data URL
    const silentAudio = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
    
    this.silentAudio = new Audio(silentAudio);
    this.silentAudio.loop = true;
    this.silentAudio.volume = 0;
    this.silentAudio.preload = 'auto';
    
    // 设置为静音但保持播放状态
    this.silentAudio.muted = true;
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
  activateMediaSession() {
    if (this.silentAudio && this.silentAudio.paused) {
      this.silentAudio.play().catch(error => {
        console.warn('Failed to play silent audio:', error);
      });
    }
    
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'playing';
    }
  }
  
  /**
   * 暂停静音音频
   */
  deactivateMediaSession() {
    if (this.silentAudio && !this.silentAudio.paused) {
      this.silentAudio.pause();
    }
    
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
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
  play(audioURLs, onCompleteCallback = () => {}, wordData = null) {
    this.stop(); // 先清理之前的播放器状态

    this.isPlaying = true;
    this.currentIndex = 0;
    this.onCompleteCallback = onCompleteCallback;
    this.currentWordData = wordData;
    this.currentPlaylist = audioURLs;
    
    // 更新 Media Session 元数据
    this.updateMediaMetadata(wordData);
    
    // 激活 Media Session
    this.activateMediaSession();

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
  }
  
  /**
   * 清理资源
   */
  destroy() {
    this.stop();
    
    if (this.silentAudio) {
      this.silentAudio.pause();
      this.silentAudio = null;
    }
    
    // 清理 Media Session
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
      navigator.mediaSession.metadata = null;
    }
  }
}