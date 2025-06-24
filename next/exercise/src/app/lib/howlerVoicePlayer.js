
import { Howl } from 'howler';

// 音频播放器类
class howlerVoicePlayer {
  constructor({ interval = 1000 } = {}) {
    this.interval = interval; // 额外暂停时间（毫秒）
    this.audioQueue = []; // 音频实例队列
    this.durations = []; // 音频时长数组
    this.currentIndex = 0; // 当前播放索引
    this.isPlaying = false; // 播放状态
    this.onCompleteCallback = null; // 播放完成回调

    // DOM 元素
    this.playButton = document.getElementById('playButton');
    this.pauseButton = document.getElementById('pauseButton');
    this.statusElement = document.getElementById('status');

    // 绑定事件
    this.playButton.addEventListener('click', () => this.handlePlay());
    this.pauseButton.addEventListener('click', () => this.handlePause());
  }

  // 初始化音频队列
  initQueue(audioFiles) {
    this.audioQueue = audioFiles.map((file, index) => {
      const howl = new Howl({
        src: [file],
        format: file.endsWith('.wav') ? 'wav' : 'mp3',
        onload: () => {
          this.durations[index] = howl.duration() * 1000; // 存储时长（毫秒）
        },
        onend: () => {
          if (!this.isPlaying) return;

          const pauseTime = (this.durations[this.currentIndex] || 0) + this.interval;

          if (this.currentIndex < this.audioQueue.length - 1) {
            setTimeout(() => {
              this.currentIndex += 1;
              this.audioQueue[this.currentIndex].play();
              this.updateStatus(`正在播放：${audioFiles[this.currentIndex]}`);
            }, pauseTime);
          } else {
            this.isPlaying = false;
            this.updateStatus('播放完成');
            this.updateButtons();
            if (this.onCompleteCallback) {
              this.onCompleteCallback();
            }
          }
        },
        onerror: (error) => {
          console.error('音频播放错误:', file, error);
          this.updateStatus(`错误：无法播放 ${file}`);
        },
      });
      return howl;
    });
  }

  // 开始播放
  play(audioFiles, onComplete) {
    if (this.isPlaying) return; // 防止重复播放

    this.isPlaying = true;
    this.currentIndex = 0;
    this.onCompleteCallback = onComplete;
    this.durations = [];
    this.initQueue(audioFiles);

    if (this.audioQueue.length > 0) {
      this.audioQueue[0].play();
      this.updateStatus(`正在播放：${audioFiles[0]}`);
      this.updateButtons();
    } else {
      this.isPlaying = false;
      this.updateStatus('无音频文件');
      this.updateButtons();
    }
  }

  // 暂停并清理
  pause() {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    this.audioQueue.forEach((howl) => {
      howl.stop(); // 停止播放
      howl.unload(); // 释放资源
    });
    this.audioQueue = [];
    this.durations = [];
    this.currentIndex = 0;
    this.updateStatus('已暂停');
    this.updateButtons();
  }

  // 处理播放按钮点击
  handlePlay() {
    // 示例：假设外部逻辑维护音频组列表
    const currentWord = words[wordIndex];
    const audioFiles = [currentWord.en, currentWord.en, currentWord.cn];
    this.play(audioFiles, () => {
      wordIndex = (wordIndex + 1) % words.length; // 循环播放单词
      this.handlePlay(); // 自动播放下一组
    });
  }

  // 处理暂停按钮点击
  handlePause() {
    this.pause();
  }

  // 更新按钮状态
  updateButtons() {
    this.playButton.disabled = this.isPlaying;
    this.pauseButton.disabled = !this.isPlaying;
  }

  // 更新状态显示
  updateStatus(message) {
    this.statusElement.textContent = message;
  }
}