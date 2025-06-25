'use client';

import { Howl } from 'howler';

function preciseTimeout(callback, delay) {
  const start = performance.now();
  let rafId;
  let cancelled = false;

  function check() {
    if (cancelled) return;
    
    const now = performance.now();
    if (now - start >= delay) {
      callback();
    } else {
      rafId = requestAnimationFrame(check);
    }
  }

  rafId = requestAnimationFrame(check);
  
  // 返回取消函数
  return () => {
    cancelled = true;
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  };
}

export class VoicePlayerHowler {
  constructor(){
    this.durations = [];
    this.howls = [];      // instances of Howl.
    this.isPlaying = false; // 是否收到 stop 命令，play -> True, stop -> False.
    this.currentIndex = 0;
    this.activeTimeouts = []; // 跟踪活跃的定时器
  }

  play(audioURls, onCompleteCallback=()=>{}, interval = 500) {
    this.stop(); // 先清理之前的播放器状态

    this.isPlaying = true;
    this.currentIndex = 0;

    this.howls = audioURls.map((url, index) => {

      if (this.isPlaying) {
        // onload 循环引用该 howl
        const howl = new Howl({
          src: [url],
          format: url.endsWith('.wav') ? 'wav' : 'mp3',

          onload: () => {
            this.durations[index] = howl.duration() * 1000 + interval; // 存储时长（毫秒）
          },

          onend: () => {
            if (!this.isPlaying) return;

            const pauseTime = (this.durations[this.currentIndex] || 0) + interval;

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

