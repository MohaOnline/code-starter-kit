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

    if (event.key === 'Escape' && 
      ((document.activeElement.tagName === 'INPUT' &&
        document.activeElement instanceof HTMLInputElement &&
        document.activeElement.type === 'text') ||
       (document.activeElement.tagName === 'TEXTAREA' &&
        document.activeElement instanceof HTMLTextAreaElement)) &&
      !!status.isComposing) {
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
    }
    // 不要无条件阻止默认行为，这会影响复制粘贴等系统功能
  }

  console.log(event.key);
  if (event.key === 'F5') {
    console.log('F5 被阻止');
  }

  if (event.key === 'ArrowRight') {
    if (typeof(event?.preventDefault)==='function'){
      event?.preventDefault?.();
    }
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
    if (typeof(event?.preventDefault)==='function'){
      event?.preventDefault?.();
    }
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
  } else if (event.key === 'v' && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    console.debug('play current pronunciation');
    status.playCurrent();

  } else if (event.key === ' ') {
    console.debug('play pronunciation');

    setStatus({
      ...status, // 复制现有状态
      isPlaying: !status.isPlaying,
    });
    event?.preventDefault?.();
  } else if (event.key === 'c' && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
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
    event.preventDefault();
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
export function preciseTimeout2(callback, delay) {
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
 * 使用 Web Worker 实现的精确定时器（移动端息屏兼容版本）
 * @param {Function} callback 回调函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 取消函数
 */
export function preciseTimeout(callback, delay) {
  let cancelled = false;

  try {
    // 尝试使用 Web Worker（最佳方案）
    const worker = new Worker(new URL('./precise-timer-worker.js', import.meta.url), { type: 'module' });

    worker.onmessage = function (e) {
      if (e.data.type === 'complete' && !cancelled) {
        callback();
        worker.terminate();
      }
    };

    worker.onerror = function(error) {
      console.warn('Worker failed, falling back to alternative timer:', error);
      worker.terminate();
      // 降级到 MessageChannel 方案
      return preciseTimeoutFallback(callback, delay);
    };

    // 启动定时器
    worker.postMessage({ type: 'start', delay });

    // 返回取消函数
    return () => {
      cancelled = true;
      try {
        worker.postMessage({ type: 'cancel' });
        worker.terminate();
      } catch (e) {
        // Worker 可能已经终止
      }
    };
  } catch (error) {
    console.warn('Web Worker not available, using fallback timer:', error);
    // 降级到备用方案
    return preciseTimeoutFallback(callback, delay);
  }
}

/**
 * 备用定时器实现 - 使用多种技术组合确保移动端息屏后也能工作
 * @param {Function} callback 回调函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 取消函数
 */
function preciseTimeoutFallback(callback, delay) {
  const start = performance.now();
  let cancelled = false;
  let timeoutId;
  let intervalId;
  let channel;
  let port1, port2;

  // 方案1: MessageChannel (高优先级)
  try {
    channel = new MessageChannel();
    port1 = channel.port1;
    port2 = channel.port2;

    function checkTime() {
      if (cancelled) return;

      const elapsed = performance.now() - start;
      if (elapsed >= delay) {
        callback();
        return;
      }

      const remaining = delay - elapsed;
      const nextCheck = Math.min(remaining, 16); // 最多16ms间隔

      timeoutId = setTimeout(() => {
        if (!cancelled) {
          port2.postMessage(null);
        }
      }, nextCheck);
    }

    port1.onmessage = checkTime;
    port2.postMessage(null); // 启动

    // 方案2: 备用 setInterval (低优先级，防止 MessageChannel 失效)
    intervalId = setInterval(() => {
      if (cancelled) return;
      
      const elapsed = performance.now() - start;
      if (elapsed >= delay) {
        callback();
        clearInterval(intervalId);
      }
    }, Math.min(delay / 4, 50)); // 使用较短间隔确保精度

  } catch (error) {
    console.warn('MessageChannel not available, using setTimeout only:', error);
    
    // 方案3: 纯 setTimeout 递归 (最后备用)
    function recursiveTimeout() {
      if (cancelled) return;
      
      const elapsed = performance.now() - start;
      if (elapsed >= delay) {
        callback();
        return;
      }
      
      const remaining = delay - elapsed;
      timeoutId = setTimeout(recursiveTimeout, Math.min(remaining, 16));
    }
    
    recursiveTimeout();
  }

  // 返回取消函数
  return () => {
    cancelled = true;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    if (port1) {
      port1.close();
    }
    
    if (port2) {
      port2.close();
    }
  };
}

