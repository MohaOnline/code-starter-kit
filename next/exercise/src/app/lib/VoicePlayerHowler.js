'use client';

import { Howl, Howler, cache as HowlCache } from 'howler';

import { preciseTimeout } from '@/app/lib/common';

export class VoicePlayerHowler {
  constructor() {
    this.durations = [];
    this.howls = [];      // instances of Howl.
    this.isPlaying = false; // 是否收到 stop 命令，play -> True, stop -> False.
    this.currentIndex = 0;
    this.activeTimeouts = []; // 跟踪活跃的定时器

    this.speed = 1.0;

    this.en_waitVoiceLength = true;
    this.cn_waitVoiceLength = true;
    this.en_interval = 250;
    this.cn_interval = 250;
  }

  // 分析 AudioBuffer 检测静音
  analyzeAudioBuffer(audioBuffer, index) {
    const channelData = audioBuffer.getChannelData(0); // 获取第一个声道
    const sampleRate = audioBuffer.sampleRate;
    const silenceThreshold = 0.01; // 静音阈值
    const silenceDurationMs = 800; // 静音持续时间（毫秒）
    const silenceSamples = (silenceDurationMs / 1000) * sampleRate;

    // 从末尾开始检测静音
    let silentSamplesFromEnd = 0;
    for (let i = channelData.length - 1; i >= 0; i--) {
      if (Math.abs(channelData[i]) < silenceThreshold) {
        silentSamplesFromEnd++;
      } else {
        break;
      }
    }

    // 计算实际音频结束时间（排除末尾静音）
    const silentDurationMs = (silentSamplesFromEnd / sampleRate) * 1000;
    const actualDuration = (audioBuffer.duration * 1000) - silentDurationMs;

    console.log(`Audio ${index}: Total duration: ${audioBuffer.duration * 1000}ms, Silent from end: ${silentDurationMs}ms, Actual duration: ${actualDuration}ms`);

    // 更新实际播放时长
    this.durations[index] = Math.max(actualDuration, 100); // 最少100ms

    return {
      totalDuration: audioBuffer.duration * 1000,
      silentDuration: silentDurationMs,
      actualDuration: actualDuration
    };
  }

  setVolume(volume) {
    console.log('setVolume:', volume);
    Howler.volume(volume);
    this.volume = volume;
  }

  setSpeed(speed) {
    console.log('setSpeed:', speed);
    // Howler.rate(speed);
    this.speed = speed;
  }

  // 设置播放间隔
  setVoiceInterval(en_waitVoiceLength = true, cn_waitVoiceLength = true, en_interval = 250, cn_interval = 250) {
    this.en_waitVoiceLength = en_waitVoiceLength;
    this.cn_waitVoiceLength = cn_waitVoiceLength;
    this.en_interval = en_interval;
    this.cn_interval = cn_interval;
    console.log('setVoiceInterval:', this.en_waitVoiceLength, this.cn_waitVoiceLength, this.en_interval, this.cn_interval);
  }

  play(audioURls, onCompleteCallback = () => { }) {
    this.stop(); // 先清理之前的播放器状态

    this.isPlaying = true;
    this.currentIndex = 0;
    console.log('volume:', this.volume);

    this.howls = audioURls.map((url, index) => {

      if (this.isPlaying) {
        // onload 循环引用该 howl
        const howl = new Howl({
          src: [url],
          format: url.endsWith('.wav') ? 'wav' : 'mp3',
          volume: this.volume || 1,
          rate: this.speed || 1.0,

          onload: () => {
            this.durations[index] = 0;

            if (url.includes('en-')) {
              if (this.en_waitVoiceLength) {
                this.durations[index] = howl.duration() * 1000; // 存储时长（毫秒）
                // console.log('onload:', howl._sounds[0]._node.bufferSource);
                // console.log('onload:', HowlCache);
                // console.log(this.ctx);
                // console.log(Howler.ctx);
                fetch(url)
                  .then(response => response.arrayBuffer())
                  .then(arrayBuffer => {
                    const audioContext = Howler.ctx;
                    audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                      const { silentDuration } = this.analyzeAudioBuffer(audioBuffer, index);
                      console.log(this.durations[index]);
                      // this.durations[index] -= silentDuration;
                    });
                  })
                  .catch(error => console.error('Error:', error));
              }

              this.durations[index] += this.en_interval;
            }
            else if (url.includes('zh-')) {
              if (this.cn_waitVoiceLength) {
                this.durations[index] = howl.duration() * 1000; // 存储时长（毫秒）
                fetch(url)
                  .then(response => response.arrayBuffer())
                  .then(arrayBuffer => {
                    const audioContext = Howler.ctx;
                    audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                      const { silentDuration } = this.analyzeAudioBuffer(audioBuffer, index);
                      console.log(this.durations[index]);
                      // this.durations[index] -= silentDuration;
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
                this.howls[this.currentIndex].play();
              }, pauseTime);
              this.activeTimeouts.push(cancelTimeout);
            } else {
              this.stop();

              const cancelTimeout = preciseTimeout(onCompleteCallback, pauseTime);
              this.activeTimeouts.push(cancelTimeout);
            }
          },

          onerror: (error) => {
            console.error('VoicePlayerHowler error:', url, error);
          },
        });

        return howl;

      } // if isPlaying.
    }); // map end.

    this.howls[this.currentIndex].play();
  } // Play method.

  stop() {
    // 重置状态
    this.isPlaying = false;
    this.currentIndex = 0;

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
  }

}

