/**
 * Custom Howler Implementation
 * 自定义音频播放器，支持获取尾部静音长度
 */

'use strict';

// 全局音频缓存
const audioCache = {};

/**
 * 全局音频控制器
 */
class CustomHowlerGlobal {
  constructor() {
    this.init();
  }

  init() {
    // 创建全局 ID 计数器
    this._counter = 1000;
    
    // 内部属性
    this._howls = [];
    this._muted = false;
    this._volume = 1;
    this.masterGain = null;
    this.noAudio = false;
    this.usingWebAudio = true;
    this.ctx = null;
    
    // 设置音频上下文
    this._setupAudioContext();
    
    return this;
  }

  /**
   * 设置音频上下文
   */
  _setupAudioContext() {
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore - webkitAudioContext 兼容性
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
          this.masterGain = this.ctx.createGain();
          this.masterGain.connect(this.ctx.destination);
          this.usingWebAudio = true;
        } else {
          this.usingWebAudio = false;
          this.noAudio = true;
        }
      } else {
        this.usingWebAudio = false;
        this.noAudio = true;
      }
    } catch (error) {
      console.error('AudioContext 初始化失败:', error);
      this.usingWebAudio = false;
      this.noAudio = true;
    }
  }

  /**
   * 设置全局音量
   */
  volume(vol) {
    if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
      this._volume = vol;
      
      if (this.usingWebAudio && this.masterGain) {
        this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
      }
      
      return this;
    }
    
    return this._volume;
  }

  /**
   * 静音控制
   */
  mute(muted) {
    this._muted = muted;
    
    if (this.usingWebAudio && this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this._volume, this.ctx.currentTime);
    }
    
    return this;
  }
}

/**
 * 音频组控制器
 */
class CustomHowl {
  constructor(options) {
    if (!options.src || options.src.length === 0) {
      throw new Error('必须提供音频源文件');
    }
    
    this.init(options);
  }

  init(options) {
    // 用户定义的属性
    this._autoplay = options.autoplay || false;
    this._format = typeof options.format !== 'string' ? options.format : [options.format];
    this._html5 = options.html5 || false;
    this._muted = options.mute || false;
    this._loop = options.loop || false;
    this._preload = typeof options.preload === 'boolean' ? options.preload : true;
    this._rate = options.rate || 1;
    this._src = typeof options.src !== 'string' ? options.src[0] : options.src;
    this._volume = options.volume !== undefined ? options.volume : 1;
    
    // 内部属性
    this._duration = 0;
    this._state = 'unloaded';
    this._sounds = [];
    this._webAudio = CustomHowler.usingWebAudio && !this._html5;
    
    // 事件监听器
    this._onload = options.onload ? [{ fn: options.onload }] : [];
    this._onloaderror = options.onloaderror ? [{ fn: options.onloaderror }] : [];
    this._onplay = options.onplay ? [{ fn: options.onplay }] : [];
    this._onend = options.onend ? [{ fn: options.onend }] : [];
    this._onerror = options.onerror ? [{ fn: options.onerror }] : [];
    
    // 添加到全局控制器
    CustomHowler._howls.push(this);
    
    // 预加载音频
    if (this._preload) {
      this.load();
    }
    
    return this;
  }

  /**
   * 加载音频文件
   */
  load() {
    if (this._state === 'loaded') {
      return this;
    }
    
    this._state = 'loading';
    
    if (this._webAudio) {
      this._loadBuffer();
    } else {
      // HTML5 Audio fallback
      this._loadHtml5();
    }
    
    return this;
  }

  /**
   * 使用 Web Audio API 加载音频缓冲区
   */
  _loadBuffer() {
    const url = this._src;
    
    // 检查缓存
    if (audioCache[url]) {
      this._duration = audioCache[url].duration;
      this._loadSound(audioCache[url]);
      return;
    }
    
    // 加载音频文件
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        return CustomHowler.ctx.decodeAudioData(arrayBuffer);
      })
      .then(audioBuffer => {
        // 缓存音频缓冲区
        audioCache[url] = audioBuffer;
        this._duration = audioBuffer.duration;
        this._loadSound(audioBuffer);
      })
      .catch(error => {
        console.error('音频加载失败:', error);
        this._emit('loaderror', error);
      });
  }

  /**
   * HTML5 Audio 加载
   */
  _loadHtml5() {
    const audio = new Audio();
    audio.src = this._src;
    audio.preload = 'auto';
    
    audio.addEventListener('canplaythrough', () => {
      this._duration = audio.duration;
      this._loadSound();
    });
    
    audio.addEventListener('error', (error) => {
      this._emit('loaderror', error);
    });
    
    audio.load();
  }

  /**
   * 音频加载完成
   */
  _loadSound(buffer) {
    this._state = 'loaded';
    this._emit('load');
    
    if (this._autoplay) {
      this.play();
    }
  }

  /**
   * 播放音频
   */
  play(id) {
    if (this._state !== 'loaded') {
      // 如果还未加载完成，等待加载
      this._onload.push({
        fn: () => this.play(id)
      });
      return this;
    }
    
    // 创建新的 Sound 实例
    const sound = new CustomSound(this);
    sound.play();
    
    return sound._id;
  }

  /**
   * 停止播放
   */
  stop(id) {
    if (id) {
      const sound = this._soundById(id);
      if (sound) {
        sound.stop();
      }
    } else {
      this._sounds.forEach(sound => sound.stop());
    }
    
    return this;
  }

  /**
   * 获取音频时长
   */
  duration() {
    return this._duration;
  }

  /**
   * 根据 ID 获取 Sound 实例
   */
  _soundById(id) {
    return this._sounds.find(sound => sound._id === id);
  }

  /**
   * 触发事件
   */
  _emit(event, ...args) {
    const eventName = `_on${event}`;
    if (this[eventName]) {
      this[eventName].forEach(listener => {
        if (typeof listener.fn === 'function') {
          listener.fn.apply(this, args);
        }
      });
    }
  }
}

/**
 * 单个音频实例
 */
class CustomSound {
  constructor(parent) {
    this._parent = parent;
    this.init();
  }

  init() {
    // 生成唯一 ID
    this._id = ++CustomHowler._counter;
    
    // 默认参数
    this._muted = this._parent._muted;
    this._loop = this._parent._loop;
    this._volume = this._parent._volume;
    this._rate = this._parent._rate;
    this._seek = 0;
    this._paused = true;
    this._ended = true;
    
    // 添加到父级的声音池
    this._parent._sounds.push(this);
    
    // 创建音频节点
    this.create();
    
    return this;
  }

  /**
   * 创建音频节点
   */
  create() {
    if (this._parent._webAudio) {
      // Web Audio API
      this._node = CustomHowler.ctx.createGain();
      this._node.gain.setValueAtTime(this._volume, CustomHowler.ctx.currentTime);
      this._node.connect(CustomHowler.masterGain);
    } else {
      // HTML5 Audio
      this._node = new Audio();
      this._node.src = this._parent._src;
      this._node.volume = this._volume * CustomHowler.volume();
    }
  }

  /**
   * 播放音频
   */
  play() {
    if (this._parent._webAudio) {
      const buffer = audioCache[this._parent._src];
      if (buffer) {
        this._source = CustomHowler.ctx.createBufferSource();
        this._source.buffer = buffer;
        this._source.connect(this._node);
        
        this._source.onended = () => {
          this._ended = true;
          this._parent._emit('end', this._id);
        };
        
        this._source.start(0);
        this._paused = false;
        this._ended = false;
        
        this._parent._emit('play', this._id);
      }
    } else {
      this._node.play();
      this._paused = false;
      this._ended = false;
      
      this._parent._emit('play', this._id);
    }
    
    return this;
  }

  /**
   * 停止播放
   */
  stop() {
    if (this._parent._webAudio && this._source) {
      this._source.stop();
      this._source.disconnect();
    } else if (this._node) {
      this._node.pause();
      this._node.currentTime = 0;
    }
    
    this._paused = true;
    this._ended = true;
    
    return this;
  }

  /**
   * 获取尾部静音长度
   * @param {string} audioUrl - 音频 URL（可选，默认使用当前音频）
   * @param {number} silenceThreshold - 静音阈值，默认 0.01
   * @returns {number} 尾部静音长度（毫秒）
   */
  getTailSilenceLength(audioUrl, silenceThreshold = 0.01) {
    const url = audioUrl || this._parent._src;
    const audioBuffer = audioCache[url];
    
    if (!audioBuffer) {
      console.warn('音频缓冲区未找到:', url);
      return 0;
    }
    
    // 获取音频数据（单声道）
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate; // 采样率 44100 数据点/秒
    
    // 从音频末尾开始向前检查
    let silenceCount = 0;
    console.log('channelData.length', channelData.length);
    
    for (let i = channelData.length - 1; i >= 0; i--) {
      if (Math.abs(channelData[i]) < silenceThreshold) {
        silenceCount++;
      } else {
        break; // 遇到非静音样本
      }
    }
    
    const silenceTime = silenceCount / sampleRate * 1000;
    
    console.log(`音频 ${url} 尾部静音长度: ${silenceTime}ms`);
    
    return silenceTime;
  }
}

// 创建全局实例
const CustomHowler = new CustomHowlerGlobal();

// 导出
export { CustomHowler, CustomHowl, CustomSound, audioCache };
export default { CustomHowler, CustomHowl, CustomSound };