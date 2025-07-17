let startTime;
let targetDelay;
let intervalId;

self.addEventListener('message', (e) => {
  if (e.data.type === 'start') {
    startTime = performance.now();
    targetDelay = e.data.delay;

    function check() {
      const elapsed = performance.now() - startTime;
      if (elapsed >= targetDelay) {
        self.postMessage({ type: 'complete' });
      } else {
        // 使用较短间隔检查，提高精度
        setTimeout(check, Math.min(targetDelay - elapsed, 4));
      }
    }

    check();
  } else if (e.data.type === 'cancel') {
    self.close();
  }
});