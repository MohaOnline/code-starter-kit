# preciseTimeout 函数优化 - 对象池复用技术

## 优化前的问题

原始的 `preciseTimeout` 函数存在以下问题：

1. **内存泄漏风险**：每次调用都创建新的 Blob URL 和 Worker
2. **资源浪费**：频繁创建和销毁 Worker 对象
3. **异常处理不完善**：callback 异常可能导致资源未清理
4. **竞态条件**：取消操作和完成回调之间可能存在竞态

## 优化方案：Worker 对象池

### 核心改进

#### 1. WorkerPool 类
```javascript
class WorkerPool {
  constructor(maxSize = 5) {
    this.maxSize = maxSize;           // 最大 Worker 数量
    this.availableWorkers = [];       // 可用 Worker 队列
    this.busyWorkers = new Set();     // 忙碌 Worker 集合
    this.workerUrl = null;            // 共享的 Worker URL
  }
}
```

#### 2. 资源复用机制
- **单一 Blob URL**：所有 Worker 共享同一个 Blob URL
- **Worker 复用**：完成任务的 Worker 返回池中等待下次使用
- **智能分配**：优先使用空闲 Worker，必要时创建新的
- **容量限制**：最多创建 5 个 Worker，避免资源过度消耗

#### 3. 任务隔离
```javascript
// 每个任务都有唯一 ID
let taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Worker 内部支持多任务管理
if (e.data.type === 'start') {
  const { taskId, delay } = e.data;
  currentTask = { taskId, startTime, delay, cancelled: false };
}
```

#### 4. 错误处理增强
```javascript
const messageHandler = function(e) {
  if (e.data.type === 'complete' && e.data.taskId === taskId && !cancelled) {
    try {
      callback();
    } catch (error) {
      console.error('Callback execution error:', error);
    } finally {
      cleanup(); // 确保资源总是被清理
    }
  }
};
```

#### 5. 降级机制
```javascript
if (!worker) {
  // 如果无法获取 worker，降级到 MessageChannel 方案
  console.warn('Worker pool exhausted, falling back to MessageChannel');
  return preciseTimeout2(callback, delay);
}
```

### 性能优势

1. **减少内存分配**：
   - 原版：每次调用创建 1 个 Blob + 1 个 URL + 1 个 Worker
   - 优化版：最多创建 1 个 Blob + 1 个 URL + 5 个 Worker（复用）

2. **降低 GC 压力**：
   - Worker 对象复用，减少垃圾回收频率
   - 统一的资源清理机制

3. **提高响应速度**：
   - 避免重复的 Worker 初始化开销
   - 空闲 Worker 可立即使用

### 使用方式

使用方式完全不变，保持向后兼容：

```javascript
// 创建定时器
const cancelFn = preciseTimeout(() => {
  console.log('Timer completed!');
}, 1000);

// 取消定时器（如需要）
cancelFn();
```

### 资源管理

- **自动清理**：页面卸载时自动清理所有 Worker 和 URL
- **异常安全**：即使 callback 抛出异常也能正确清理资源
- **内存监控**：可通过 `workerPool.busyWorkers.size` 监控活跃任务数

### 适用场景

特别适合以下场景：
- 音频播放控制（如当前项目的 VoicePlayerHowler）
- 动画定时控制
- 游戏循环
- 需要高精度定时的应用

### 监控和调试

```javascript
// 查看当前池状态
console.log('Available workers:', workerPool.availableWorkers.length);
console.log('Busy workers:', workerPool.busyWorkers.size);

// 手动清理（通常不需要）
workerPool.destroy();
```

这个优化版本解决了原始实现的所有主要问题，同时保持了 API 的简洁性和向后兼容性。