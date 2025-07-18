/**
 * Howler.js 音频播放器工具函数
 * 提供播放器相关的通用工具方法
 */

/**
 * 格式化时间显示
 * @param time 时间（秒）
 * @returns 格式化后的时间字符串 (mm:ss)
 */
export function formatTime(time: number): string {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 验证时间值是否有效
 * @param time 时间值
 * @param duration 总时长
 * @returns 是否有效
 */
export function isValidTime(time: number, duration: number): boolean {
  return !isNaN(time) && time >= 0 && time <= duration;
}

/**
 * 计算下一个播放索引
 * @param currentIndex 当前索引
 * @param playlistLength 播放列表长度
 * @param isLoop 是否循环模式
 * @returns 下一个索引，如果到达末尾且非循环模式则返回null
 */
export function getNextIndex(
  currentIndex: number, 
  playlistLength: number, 
  isLoop: boolean = false
): number | null {
  if (playlistLength === 0) return null;
  
  const nextIndex = currentIndex + 1;
  
  if (nextIndex >= playlistLength) {
    // 已经是最后一首
    return isLoop ? 0 : null; // 循环模式返回第一首，否则返回 null
  }
  
  return nextIndex;
}

/**
 * 计算上一个播放索引
 * @param currentIndex 当前索引
 * @param playlistLength 播放列表长度
 * @param isLoop 是否循环模式
 * @returns 上一个索引，如果到达开头且非循环模式则返回null
 */
export function getPreviousIndex(
  currentIndex: number, 
  playlistLength: number,
  isLoop: boolean = false
): number | null {
  if (playlistLength === 0) return null;
  
  if (currentIndex === 0) {
    // 已经是第一首
    return isLoop ? playlistLength - 1 : null; // 循环模式返回最后一首，否则返回 null
  }
  
  return currentIndex - 1;
}

/**
 * 安全地执行函数，捕获并记录错误
 * @param fn 要执行的函数
 * @param errorMessage 错误消息前缀
 */
export function safeExecute(fn: () => void, errorMessage?: string): void {
  try {
    fn();
  } catch (error) {
    console.error(errorMessage || 'Safe execute error:', error);
  }
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 生成CSS类名字符串
 * @param classes 类名参数
 * @returns 合并后的类名字符串
 */
export function classNames(...classes: (string | Record<string, boolean> | undefined | null | false)[]): string {
  return classes
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}