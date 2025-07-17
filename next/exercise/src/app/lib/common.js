'use client';

// // 导出的 atom 可以在项目中的任何地方通过 useAtom 或其他 Jotai API 使用，确保状态的一致性。
// export const currentWordIndexAtom = atom(0);
//
// export function useCurrentWordIndex() {
//   const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
//   const nextWord = () => setCurrentWordIndex(current => current + 1);
//   const prevWord = () => setCurrentWordIndex(
//       current => current > 0 ? current - 1 : current);
//
//   return {
//     currentWordIndex,
//     nextWord,
//     prevWord,
//   };
// }
//
// export const IndexUpdateContext = createContext(null);
//
// export function suppressWord() {
//
// }

export const handleKeyDown = (event, status, setStatus) => {
  status.onWheel = false;

  // 对话框开启的处理
  if (status.isDialogOpen) {

    if (event.key === 'Escape' && document.activeElement.tagName === 'INPUT' &&
      document.activeElement instanceof HTMLInputElement &&
      document.activeElement.type === 'text' && !!status.isComposing) {
      event.preventDefault(); // 阻止 ESC 键的默认行为
    } else if (event.key === 'Tab') {
      console.debug('Tab Down');
      status.isTabPressed = true;
      setStatus({
        ...status, // 复制现有状态
      });
    }
    return;
  }
  // 对话框未开启的处理
  else {
    if (document.activeElement.tagName === 'INPUT' &&
      document.activeElement instanceof HTMLInputElement &&
      document.activeElement.type === 'text') {
      return;

    } else {
      event.preventDefault?.();
    }
  }

  console.log(event.key);
  if (event.key === 'F5') {
    console.log('F5 被阻止');
  }

  if (event.key === 'ArrowRight') {
    console.debug('next word');

    let next = status.currentWordIndex + 1;
    // if (status.words !== undefined) {
    //   next = Math.min(status.words.length - 1, next);
    // }
    if (next > status.words.length - 1) {
      next = 0;
    }

    setStatus({
      ...status, // 复制现有状态
      currentWordIndex: next, // 更新 currentWord
    });
  } else if (event.key === 'ArrowLeft') {
    console.debug('previous word');

    let nextIndex = status.currentWordIndex - 1;
    if (nextIndex < 0) {
      nextIndex = status.words.length - 1;
    }

    setStatus({
      ...status, // 复制现有状态
      isPlaying: false,
      // currentWordIndex: Math.max(0, status.currentWordIndex - 1),
      currentWordIndex: nextIndex,
    });
  } else if (event.key === 'v') {
    console.debug('play current pronunciation');
    status.playCurrent();

  } else if (event.key === ' ') {
    console.debug('play pronunciation');

    setStatus({
      ...status, // 复制现有状态
      isPlaying: !status.isPlaying,
    });
  } else if (event.key === 'c') {
    console.debug('toggle chinese text display');

    setStatus({
      ...status, // 复制现有状态
      audioConfig: {
        ...status.audioConfig,
        chinese: {
          ...status.audioConfig.chinese,
          showText: !status.audioConfig.chinese.showText,
        },
      },
    });
  } else if (event.key === 'e') {
    console.debug('toggle english text display');

    setStatus({
      ...status, // 复制现有状态
      audioConfig: {
        ...status.audioConfig,
        english: {
          ...status.audioConfig.english,
          showText: !status.audioConfig.english.showText,
        },
      },
    });
  }

  localStorage.setItem('wordStatus', status.currentWordIndex);
};

/**
 * 
 * @param {*} callback 
 * @param {*} delay 
 * @returns cancel function. 取消函数，调用、执行后会取消定时器。
 */
export function preciseTimeout1(callback, delay) {
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

/**
 * 使用 MessageChannel 实现的精确定时器，不依赖 requestAnimationFrame
 * 在浏览器最小化时仍能正常工作
 * @param {Function} callback 回调函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 取消函数
 */
export function preciseTimeout(callback, delay) {
  const start = performance.now();
  let cancelled = false;
  let timeoutId;

  // 方法1: 使用 MessageChannel 实现高精度定时
  const channel = new MessageChannel();
  const port1 = channel.port1;
  const port2 = channel.port2;

  function check() {
    if (cancelled) return;

    const now = performance.now();
    const elapsed = now - start;

    if (elapsed >= delay) {
      callback();
    } else {
      const remaining = delay - elapsed;
      // 使用较短的间隔进行检查，提高精度
      const checkInterval = Math.min(remaining, 4); // 最多4ms间隔

      timeoutId = setTimeout(() => {
        if (!cancelled) {
          port2.postMessage(null);
        }
      }, checkInterval);
    }
  }

  port1.onmessage = check;

  // 启动检查
  port2.postMessage(null);

  // 返回取消函数
  return () => {
    cancelled = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    port1.close();
    port2.close();
  };
}

/**
 * 使用 Web Worker 实现的精确定时器（备选方案）
 * @param {Function} callback 回调函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 取消函数
 */
export function preciseTimeout3(callback, delay) {
  let cancelled = false;

  // 创建一个简单的 Worker
  const workerCode = `
    let startTime;
    let targetDelay;
    let intervalId;
    
    self.onmessage = function(e) {
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
    };
  `;

  const worker = new Worker(new URL('./precise-timer-worker.js', import.meta.url), { type: 'module' });

  worker.onmessage = function (e) {
    if (e.data.type === 'complete' && !cancelled) {
      callback();
      worker.terminate();
    }
  };

  // 启动定时器
  worker.postMessage({ type: 'start', delay });

  // 返回取消函数
  return () => {
    cancelled = true;
    worker.postMessage({ type: 'cancel' });
    worker.terminate();
  };
}

