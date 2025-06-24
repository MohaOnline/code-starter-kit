'use client';

import { Howl } from 'howler';

export class VoicePlayerHowler {
  constructor(){
    this.durations = [];
    this.howls = [];      // instances of Howl.
    this.isPlaying = false;
    this.currentIndex = 0;
  }

  play(audioURls, onCompleteCallback, interval = 1000) {
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

            if (this.currentIndex < (this.howls.length - 1) && this.isPlaying) {
              setTimeout(() => {
                this.currentIndex += 1;
                this.howls[this.currentIndex].play();
              }, pauseTime);
            } else {
              this.stop();

              onCompleteCallback();
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
    this.isPlaying = false;

    // 停止并卸载所有 Howl 实例
    this.howls.forEach(howl => {
      howl.stop();
      howl.unload();
    });

    // 清空数组
    this.howls = [];
    this.durations = [];

    // 重置状态
    this.isPlaying = false;
    this.currentIndex = 0;
  }

}

