/**
 * 音频播放器模块
 * 使用 AudioContext 进行精确的时间计算
 * 支持传入音频URL数组并依次播放
 */
class AudioPlayer {
  constructor() {
    this.audioContext = null;
    this.currentAudio = null;
    this.isPlaying = false;
    this.currentIndex = 0;
    this.audioUrls = [];
    this.onProgress = null;
    this.onComplete = null;
    this.onError = null;
    this.playbackTimer = null;
    this.pauseDuration = 0; // 停顿时间（毫秒）
    
    this.initAudioContext();
  }

  /**
   * 初始化 AudioContext
   */
  initAudioContext() {
    try {
      if (typeof window === 'undefined') {
        console.warn('当前处于非浏览器环境，无法初始化 AudioContext');
        return;
      }

      // 兼容不同浏览器的AudioContext
      const AudioContextClass = window.AudioContext || // @ts-ignore
        window.webkitAudioContext || // @ts-ignore
        window.mozAudioContext || // @ts-ignore
        window.msAudioContext;  // @ts-ignore
      
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      } else {
        console.warn('当前浏览器不支持AudioContext');
      }
    } catch (error) {
      console.error('AudioContext 初始化失败:', error);
    }
  }

  /**
   * 设置音频URL列表
   * @param {string[]} urls - 音频文件URL数组
   * @param {number} pauseDuration - 每个音频之间的停顿时间（毫秒）
   */
  setAudioUrls(urls, pauseDuration = 500) {
    this.audioUrls = urls;
    this.pauseDuration = pauseDuration;
    this.currentIndex = 0;
  }

  /**
   * 设置回调函数
   * @param {Object} callbacks - 回调函数对象
   * @param {Function} callbacks.onProgress - 播放进度回调 (currentIndex, totalCount)
   * @param {Function} callbacks.onComplete - 播放完成回调
   * @param {Function} callbacks.onError - 错误回调
   */
  setCallbacks(callbacks) {
    this.onProgress = callbacks.onProgress || null;
    this.onComplete = callbacks.onComplete || null;
    this.onError = callbacks.onError || null;
  }

  /**
   * 开始播放音频列表
   * @param {number} startIndex - 开始播放的索引
   */
  async play(startIndex = 0) {
    if (!this.audioUrls.length) {
      console.warn('没有音频URL可播放');
      return;
    }

    this.currentIndex = Math.max(0, Math.min(startIndex, this.audioUrls.length - 1));
    this.isPlaying = true;

    // 确保 AudioContext 处于运行状态
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.playCurrentAudio();
  }

  /**
   * 播放当前索引的音频
   */
  async playCurrentAudio() {
    if (!this.isPlaying || this.currentIndex >= this.audioUrls.length) {
      this.handlePlaybackComplete();
      return;
    }

    try {
      const url = this.audioUrls[this.currentIndex];
      
      // 清理之前的音频
      this.cleanupCurrentAudio();

      // 创建新的音频对象
      this.currentAudio = new Audio(url);
      
      // 设置音频事件监听器
      this.setupAudioEventListeners();

      // 播放音频
      await this.currentAudio.play();
      
      // 通知进度更新
      if (this.onProgress) {
        this.onProgress(this.currentIndex, this.audioUrls.length);
      }

    } catch (error) {
      console.error('音频播放失败:', error);
      if (this.onError) {
        this.onError(error, this.currentIndex);
      }
      this.playNext();
    }
  }

  /**
   * 设置音频事件监听器
   */
  setupAudioEventListeners() {
    if (!this.currentAudio) return;

    // 音频加载完成
    this.currentAudio.addEventListener('loadedmetadata', () => {
      console.debug(`音频 ${this.currentIndex} 时长:`, this.currentAudio.duration);
    });

    // 音频播放结束
    this.currentAudio.addEventListener('ended', () => {
      this.handleAudioEnded();
    });

    // 音频播放错误
    this.currentAudio.addEventListener('error', (error) => {
      console.error('音频播放错误:', error);
      if (this.onError) {
        this.onError(error, this.currentIndex);
      }
      this.playNext();
    });
  }

  /**
   * 处理音频播放结束
   */
  handleAudioEnded() {
    if (!this.isPlaying) return;

    // 使用 AudioContext 获取精确的播放时间
    const actualDuration = this.currentAudio ? this.currentAudio.duration * 1000 : 0;
    const totalPause = actualDuration + this.pauseDuration;

    console.debug(`音频 ${this.currentIndex} 播放完成，停顿 ${totalPause}ms`);

    // 设置定时器播放下一个音频
    this.playbackTimer = setTimeout(() => {
      this.playNext();
    }, this.pauseDuration);
  }

  /**
   * 播放下一个音频
   */
  playNext() {
    if (!this.isPlaying) return;

    this.currentIndex++;
    
    if (this.currentIndex < this.audioUrls.length) {
      this.playCurrentAudio();
    } else {
      this.handlePlaybackComplete();
    }
  }

  /**
   * 播放上一个音频
   */
  playPrevious() {
    if (!this.isPlaying) return;

    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.playCurrentAudio();
  }

  /**
   * 跳转到指定索引播放
   * @param {number} index - 目标索引
   */
  jumpTo(index) {
    if (index >= 0 && index < this.audioUrls.length) {
      this.currentIndex = index;
      if (this.isPlaying) {
        this.playCurrentAudio();
      }
    }
  }

  /**
   * 暂停播放
   */
  pause() {
    this.isPlaying = false;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
    
    if (this.playbackTimer) {
      clearTimeout(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  /**
   * 恢复播放
   */
  resume() {
    if (!this.isPlaying && this.currentAudio) {
      this.isPlaying = true;
      this.currentAudio.play().catch(error => {
        console.error('恢复播放失败:', error);
        if (this.onError) {
          this.onError(error, this.currentIndex);
        }
      });
    }
  }

  /**
   * 停止播放
   */
  stop() {
    this.isPlaying = false;
    this.currentIndex = 0;
    
    this.cleanupCurrentAudio();
    
    if (this.playbackTimer) {
      clearTimeout(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  /**
   * 处理播放完成
   */
  handlePlaybackComplete() {
    this.isPlaying = false;
    this.cleanupCurrentAudio();
    
    if (this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * 清理当前音频资源
   */
  cleanupCurrentAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      
      // 移除所有事件监听器
      this.currentAudio.removeEventListener('loadedmetadata', () => {});
      this.currentAudio.removeEventListener('ended', () => {});
      this.currentAudio.removeEventListener('error', () => {});
      
      this.currentAudio = null;
    }
  }

  /**
   * 获取当前播放状态
   */
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentIndex: this.currentIndex,
      totalCount: this.audioUrls.length,
      currentUrl: this.audioUrls[this.currentIndex] || null
    };
  }

  /**
   * 销毁播放器
   */
  destroy() {
    this.stop();
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.audioUrls = [];
    this.onProgress = null;
    this.onComplete = null;
    this.onError = null;
  }
}

export default AudioPlayer;