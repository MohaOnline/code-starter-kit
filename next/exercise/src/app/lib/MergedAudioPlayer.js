'use client';

/**
 * 合并音频播放器 - 专为安卓设备优化
 * 将多个单词的音频合并成一个长音频文件循环播放
 * 解决安卓设备短音频后台播放被暂停的问题
 */
export class MergedAudioPlayer {
  constructor() {
    this.audioContext = null;
    this.audioElement = null;
    this.isPlaying = false;
    this.currentLoop = 0;
    this.maxLoops = Infinity;
    this.onLoopComplete = null;
    this.speed = 1.0;
    this.volume = 1.0;
    
    // Media Session 相关
    this.currentWordData = null;
    this.onPreviousWord = null;
    this.onNextWord = null;
    
    this.initAudioContext();
    this.initMediaSession();
  }
  
  /**
   * 初始化 Audio Context
   */
  initAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
      console.log('Audio Context initialized');
    } catch (error) {
      console.error('Failed to initialize Audio Context:', error);
    }
  }
  
  /**
   * 初始化 Media Session API
   */
  initMediaSession() {
    if (!('mediaSession' in navigator)) {
      console.warn('Media Session API not supported');
      return;
    }
    
    navigator.mediaSession.setActionHandler('play', () => {
      console.log('Media Session: play');
      this.resume();
    });
    
    navigator.mediaSession.setActionHandler('pause', () => {
      console.log('Media Session: pause');
      this.pause();
    });
    
    navigator.mediaSession.setActionHandler('stop', () => {
      console.log('Media Session: stop');
      this.stop();
    });
    
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      console.log('Media Session: previous track');
      if (this.onPreviousWord) this.onPreviousWord();
    });
    
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      console.log('Media Session: next track');
      if (this.onNextWord) this.onNextWord();
    });
    
    navigator.mediaSession.playbackState = 'paused';
  }
  
  /**
   * 更新 Media Session 元数据
   */
  updateMediaMetadata(wordData) {
    if (!('mediaSession' in navigator) || !wordData) return;
    
    const metadata = {
      title: wordData.word || 'Unknown Word',
      artist: wordData.translation || '',
      artwork: [
        {
          src: '/favicon.ico',
          sizes: '96x96',
          type: 'image/png'
        }
      ]
    };

    if (wordData.pos && wordData.pos.length > 0) {
      metadata.title = `[${wordData.pos}] ${wordData.word}`;
    }
    
    navigator.mediaSession.metadata = new MediaMetadata(metadata);
    console.log('Media Session metadata updated:', metadata);
  }
  
  /**
   * 设置外部控制回调
   */
  setExternalControls(onPreviousWord, onNextWord) {
    this.onPreviousWord = onPreviousWord;
    this.onNextWord = onNextWord;
  }
  
  /**
   * 设置音量
   */
  setVolume(volume) {
    this.volume = volume;
    if (this.audioElement) {
      this.audioElement.volume = volume;
    }
  }
  
  /**
   * 设置播放速度
   */
  setSpeed(speed) {
    this.speed = speed;
    if (this.audioElement) {
      this.audioElement.playbackRate = speed;
    }
  }
  
  /**
   * 加载音频文件并返回 AudioBuffer
   */
  async loadAudioBuffer(url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.error(`Failed to load audio: ${url}`, error);
      return null;
    }
  }
  
  /**
   * 检测音频末尾的静音部分
   */
  detectSilence(audioBuffer, threshold = 0.01) {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    let silentSamplesFromEnd = 0;
    for (let i = channelData.length - 1; i >= 0; i--) {
      if (Math.abs(channelData[i]) < threshold) {
        silentSamplesFromEnd++;
      } else {
        break;
      }
    }
    
    const silentDurationMs = (silentSamplesFromEnd / sampleRate) * 1000;
    return silentDurationMs;
  }
  
  /**
   * 合并多个 AudioBuffer
   */
  mergeAudioBuffers(audioBuffers, intervals) {
    if (!audioBuffers || audioBuffers.length === 0) {
      return null;
    }
    
    const sampleRate = audioBuffers[0].sampleRate;
    const numberOfChannels = audioBuffers[0].numberOfChannels;
    
    // 计算总长度（包含间隔）
    let totalLength = 0;
    audioBuffers.forEach((buffer, index) => {
      if (buffer) {
        totalLength += buffer.length;
        // 添加间隔（转换为采样数）
        if (index < audioBuffers.length - 1 && intervals[index]) {
          totalLength += Math.floor((intervals[index] / 1000) * sampleRate);
        }
      }
    });
    
    // 创建合并后的 AudioBuffer
    const mergedBuffer = this.audioContext.createBuffer(
      numberOfChannels,
      totalLength,
      sampleRate
    );
    
    // 复制音频数据
    let offset = 0;
    audioBuffers.forEach((buffer, index) => {
      if (buffer) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sourceData = buffer.getChannelData(channel);
          const targetData = mergedBuffer.getChannelData(channel);
          targetData.set(sourceData, offset);
        }
        offset += buffer.length;
        
        // 添加静音间隔
        if (index < audioBuffers.length - 1 && intervals[index]) {
          const silenceSamples = Math.floor((intervals[index] / 1000) * sampleRate);
          offset += silenceSamples;
        }
      }
    });
    
    console.log(`Merged ${audioBuffers.length} audio buffers, total duration: ${mergedBuffer.duration}s`);
    return mergedBuffer;
  }
  
  /**
   * 将 AudioBuffer 转换为 WAV Blob
   */
  audioBufferToWav(buffer) {
    const length = buffer.length * buffer.numberOfChannels * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);
    
    // WAV 文件头
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    const channels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const bitsPerSample = 16;
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * bitsPerSample / 8, true);
    view.setUint16(32, channels * bitsPerSample / 8, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(36, 'data');
    view.setUint32(40, length, true);
    
    // 音频数据
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < channels; channel++) {
        const sample = buffer.getChannelData(channel)[i];
        const clampedSample = Math.max(-1, Math.min(1, sample));
        view.setInt16(offset, clampedSample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }
  
  /**
   * 播放合并后的音频
   * @param {Array} audioURLs - 音频URL数组
   * @param {Array} intervals - 每个音频后的间隔时间（毫秒）
   * @param {Object} wordData - 单词数据
   * @param {Function} onLoopComplete - 每次循环完成的回调
   * @param {Number} maxLoops - 最大循环次数（默认无限）
   */
  async play(audioURLs, intervals, wordData, onLoopComplete, maxLoops = Infinity) {
    this.stop(); // 先停止之前的播放
    
    if (!audioURLs || audioURLs.length === 0) {
      console.warn('No audio URLs provided');
      return;
    }
    
    this.currentWordData = wordData;
    this.onLoopComplete = onLoopComplete;
    this.maxLoops = maxLoops;
    this.currentLoop = 0;
    this.isPlaying = true;
    
    // 更新 Media Session
    this.updateMediaMetadata(wordData);
    
    try {
      // 加载所有音频
      console.log('Loading audio files...');
      const audioBuffers = await Promise.all(
        audioURLs.map(url => this.loadAudioBuffer(url))
      );
      
      // 过滤掉加载失败的音频
      const validBuffers = audioBuffers.filter(buffer => buffer !== null);
      if (validBuffers.length === 0) {
        console.error('No valid audio buffers loaded');
        return;
      }
      
      // 合并音频
      console.log('Merging audio buffers...');
      const mergedBuffer = this.mergeAudioBuffers(validBuffers, intervals);
      if (!mergedBuffer) {
        console.error('Failed to merge audio buffers');
        return;
      }
      
      // 转换为 WAV Blob
      console.log('Converting to WAV...');
      const wavBlob = this.audioBufferToWav(mergedBuffer);
      const audioUrl = URL.createObjectURL(wavBlob);
      
      // 创建 Audio 元素
      this.audioElement = new Audio(audioUrl);
      this.audioElement.volume = this.volume;
      this.audioElement.playbackRate = this.speed;
      this.audioElement.loop = false; // 手动控制循环
      
      // 监听播放结束
      this.audioElement.addEventListener('ended', () => {
        this.currentLoop++;
        console.log(`Loop ${this.currentLoop} completed`);
        
        if (this.onLoopComplete) {
          this.onLoopComplete();
        }
        
        // 检查是否继续循环
        if (this.isPlaying && this.currentLoop < this.maxLoops) {
          this.audioElement.currentTime = 0;
          this.audioElement.play().catch(error => {
            console.error('Failed to replay audio:', error);
          });
        } else {
          this.stop();
        }
      });
      
      // 开始播放
      await this.audioElement.play();
      
      // 更新 Media Session 状态
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
      
      console.log('Merged audio playback started');
      
      // 清理 URL（在音频加载后）
      this.audioElement.addEventListener('loadeddata', () => {
        URL.revokeObjectURL(audioUrl);
      }, { once: true });
      
    } catch (error) {
      console.error('Failed to play merged audio:', error);
      this.isPlaying = false;
    }
  }
  
  /**
   * 暂停播放
   */
  pause() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
      this.isPlaying = false;
      
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
      
      console.log('Playback paused');
    }
  }
  
  /**
   * 恢复播放
   */
  resume() {
    if (this.audioElement && this.audioElement.paused) {
      this.audioElement.play().catch(error => {
        console.error('Failed to resume playback:', error);
      });
      this.isPlaying = true;
      
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
      
      console.log('Playback resumed');
    }
  }
  
  /**
   * 停止播放
   */
  stop() {
    this.isPlaying = false;
    this.currentLoop = 0;
    
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement.src = '';
      this.audioElement = null;
    }
    
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
    
    console.log('Playback stopped');
  }
  
  /**
   * 销毁播放器
   */
  destroy() {
    console.log('Destroying MergedAudioPlayer...');
    
    this.stop();
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    }
    
    this.onLoopComplete = null;
    this.onPreviousWord = null;
    this.onNextWord = null;
    
    console.log('MergedAudioPlayer destroyed');
  }
}
