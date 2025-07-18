let startTime;
let targetDelay;
let timeoutId;
let intervalId;
let isActive = false;

// 移动端息屏优化：使用多重定时器策略
self.addEventListener('message', (e) => {
  if (e.data.type === 'start') {
    startTime = performance.now();
    targetDelay = e.data.delay;
    isActive = true;

    // 策略1: 高精度检查（主要方案）
    function preciseCheck() {
      if (!isActive) return;
      
      const elapsed = performance.now() - startTime;
      if (elapsed >= targetDelay) {
        isActive = false;
        self.postMessage({ type: 'complete' });
        cleanup();
        return;
      }
      
      const remaining = targetDelay - elapsed;
      // 动态调整检查间隔，越接近目标时间检查越频繁
      const checkInterval = Math.min(remaining / 2, 16, Math.max(1, remaining));
      timeoutId = setTimeout(preciseCheck, checkInterval);
    }

    // 策略2: 备用间隔检查（防止主策略失效）
    intervalId = setInterval(() => {
      if (!isActive) return;
      
      const elapsed = performance.now() - startTime;
      if (elapsed >= targetDelay) {
        isActive = false;
        self.postMessage({ type: 'complete' });
        cleanup();
      }
    }, Math.min(targetDelay / 8, 50)); // 使用较短间隔作为安全网

    // 启动主检查
    preciseCheck();
    
  } else if (e.data.type === 'cancel') {
    isActive = false;
    cleanup();
    self.close();
  }
});

// 清理函数
function cleanup() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// 处理 Worker 错误
self.addEventListener('error', (error) => {
  console.error('Timer worker error:', error);
  isActive = false;
  cleanup();
});

// Export to satisfy ES module requirements
export {};