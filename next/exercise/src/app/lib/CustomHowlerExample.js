/**
 * CustomHowler 使用示例
 * 展示如何使用自定义音频播放器和获取尾部静音长度
 */

import { CustomHowl } from './CustomHowler.js';

/**
 * 示例：基本音频播放
 */
export function basicPlayExample() {
  const howl = new CustomHowl({
    src: '/path/to/audio.mp3',
    volume: 0.8,
    onload: function() {
      console.log('音频加载完成');
      console.log('音频时长:', this.duration());
    },
    onplay: function() {
      console.log('开始播放');
    },
    onend: function() {
      console.log('播放结束');
    }
  });
  
  // 播放音频
  const soundId = howl.play();
  
  return { howl, soundId };
}

/**
 * 示例：获取尾部静音长度
 */
export function getTailSilenceExample() {
  const howl = new CustomHowl({
    src: '/path/to/audio.mp3',
    onload: function() {
      console.log('音频加载完成，开始分析尾部静音');
      
      // 播放音频并获取 Sound 实例
      const soundId = this.play();
      const sound = this._soundById(soundId);
      
      if (sound) {
        // 获取尾部静音长度
        const silenceLength = sound.getTailSilenceLength();
        console.log('尾部静音长度:', silenceLength, 'ms');
        
        // 使用自定义静音阈值
        const customSilenceLength = sound.getTailSilenceLength(null, 0.005);
        console.log('自定义阈值的尾部静音长度:', customSilenceLength, 'ms');
      }
    }
  });
  
  return howl;
}

/**
 * 示例：音频队列播放器（类似现有的 VoicePlayerHowler）
 */
export class CustomVoicePlayer {
  constructor() {
    this.howls = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.durations = [];
    this.silenceLengths = []; // 存储每个音频的尾部静音长度
  }
  
  /**
   * 播放音频队列
   * @param {string[]} audioUrls - 音频 URL 数组
   * @param {Function} onComplete - 完成回调
   * @param {number} interval - 间隔时间（毫秒）
   */
  play(audioUrls, onComplete = () => {}, interval = 500) {
    this.stop(); // 清理之前的状态
    
    this.isPlaying = true;
    this.currentIndex = 0;
    
    this.howls = audioUrls.map((url, index) => {
      const howl = new CustomHowl({
        src: url,
        format: url.endsWith('.wav') ? 'wav' : 'mp3',
        
        onload: () => {
          // 存储音频时长
          this.durations[index] = howl.duration() * 1000;
          
          // 获取尾部静音长度
          const soundId = howl.play();
          howl.stop(soundId); // 立即停止，只是为了创建 Sound 实例
          
          const sound = howl._soundById(soundId);
          if (sound) {
            const silenceLength = sound.getTailSilenceLength();
            this.silenceLengths[index] = silenceLength;
            console.log(`音频 ${index} 尾部静音长度: ${silenceLength}ms`);
          }
        },
        
        onend: () => {
          if (!this.isPlaying) return;
          
          // 计算暂停时间：使用实际音频长度减去尾部静音，再加上设定的间隔
          const actualDuration = this.durations[this.currentIndex] || 0;
          const silenceLength = this.silenceLengths[this.currentIndex] || 0;
          const effectiveDuration = actualDuration - silenceLength;
          const pauseTime = effectiveDuration + interval;
          
          console.log(`音频 ${this.currentIndex} 播放完成:`);
          console.log(`  总时长: ${actualDuration}ms`);
          console.log(`  尾部静音: ${silenceLength}ms`);
          console.log(`  有效时长: ${effectiveDuration}ms`);
          console.log(`  暂停时间: ${pauseTime}ms`);
          
          if (this.currentIndex < this.howls.length - 1) {
            setTimeout(() => {
              if (this.isPlaying) {
                this.currentIndex++;
                this.howls[this.currentIndex].play();
              }
            }, pauseTime);
          } else {
            this.stop();
            onComplete();
          }
        },
        
        onerror: (error) => {
          console.error('音频播放错误:', url, error);
        }
      });
      
      return howl;
    });
    
    // 开始播放第一个音频
    if (this.howls.length > 0) {
      this.howls[0].play();
    }
  }
  
  /**
   * 停止播放
   */
  stop() {
    this.isPlaying = false;
    this.currentIndex = 0;
    
    this.howls.forEach(howl => {
      howl.stop();
    });
    
    this.howls = [];
    this.durations = [];
    this.silenceLengths = [];
  }
  
  /**
   * 设置音量
   * @param {number} volume - 音量 (0-1)
   */
  setVolume(volume) {
    this.howls.forEach(howl => {
      howl._volume = volume;
    });
  }
}

/**
 * 示例：分析多个音频文件的尾部静音
 */
export function analyzeMultipleAudioFiles(audioUrls) {
  const results = [];
  let completedCount = 0;
  
  return new Promise((resolve) => {
    audioUrls.forEach((url, index) => {
      const howl = new CustomHowl({
        src: url,
        onload: function() {
          const soundId = this.play();
          this.stop(soundId); // 立即停止
          
          const sound = this._soundById(soundId);
          if (sound) {
            const silenceLength = sound.getTailSilenceLength();
            results[index] = {
              url,
              duration: this.duration() * 1000,
              tailSilence: silenceLength,
              effectiveDuration: (this.duration() * 1000) - silenceLength
            };
          }
          
          completedCount++;
          if (completedCount === audioUrls.length) {
            resolve(results);
          }
        },
        onloaderror: (error) => {
          console.error('加载失败:', url, error);
          results[index] = {
            url,
            error: error.toString()
          };
          
          completedCount++;
          if (completedCount === audioUrls.length) {
            resolve(results);
          }
        }
      });
    });
  });
}

// 使用示例
/*
// 基本播放
const { howl, soundId } = basicPlayExample();

// 获取尾部静音长度
getTailSilenceExample();

// 音频队列播放
const player = new CustomVoicePlayer();
player.play([
  '/audio/word1.mp3',
  '/audio/word2.mp3',
  '/audio/word3.mp3'
], () => {
  console.log('所有音频播放完成');
}, 1000);

// 分析多个音频文件
analyzeMultipleAudioFiles([
  '/audio/file1.mp3',
  '/audio/file2.mp3',
  '/audio/file3.mp3'
]).then(results => {
  console.log('分析结果:', results);
});
*/