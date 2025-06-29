# CustomHowler - 自定义音频播放器

这是一个基于 Web Audio API 的自定义音频播放器实现，支持获取音频尾部静音长度的功能。

## 特性

- 🎵 基于 Web Audio API 的高性能音频播放
- 🔇 支持获取音频尾部静音长度
- 📦 内置音频缓存机制
- 🎛️ 支持音量控制和静音
- 🔄 支持音频队列播放
- 📱 兼容现代浏览器

## 核心类

### CustomHowlerGlobal
全局音频控制器，管理音频上下文和全局设置。

### CustomHowl
音频组控制器，负责加载和管理单个音频文件。

### CustomSound
单个音频实例，包含 `getTailSilenceLength` 方法。

## 主要功能

### 1. 基本音频播放

```javascript
import { CustomHowl } from './CustomHowler.js';

const howl = new CustomHowl({
  src: '/path/to/audio.mp3',
  volume: 0.8,
  onload: function() {
    console.log('音频加载完成');
  },
  onplay: function() {
    console.log('开始播放');
  }
});

// 播放音频
const soundId = howl.play();
```

### 2. 获取尾部静音长度

```javascript
const howl = new CustomHowl({
  src: '/path/to/audio.mp3',
  onload: function() {
    const soundId = this.play();
    const sound = this._soundById(soundId);
    
    if (sound) {
      // 获取尾部静音长度（毫秒）
      const silenceLength = sound.getTailSilenceLength();
      console.log('尾部静音长度:', silenceLength, 'ms');
      
      // 使用自定义静音阈值
      const customSilence = sound.getTailSilenceLength(null, 0.005);
      console.log('自定义阈值静音长度:', customSilence, 'ms');
    }
  }
});
```

### 3. 音频队列播放

```javascript
import { CustomVoicePlayer } from './CustomHowlerExample.js';

const player = new CustomVoicePlayer();

player.play([
  '/audio/word1.mp3',
  '/audio/word2.mp3',
  '/audio/word3.mp3'
], () => {
  console.log('所有音频播放完成');
}, 1000); // 1秒间隔
```

## API 参考

### CustomHowl 构造函数选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `src` | string/array | 必需 | 音频文件路径 |
| `volume` | number | 1 | 音量 (0-1) |
| `loop` | boolean | false | 是否循环播放 |
| `autoplay` | boolean | false | 是否自动播放 |
| `preload` | boolean | true | 是否预加载 |
| `format` | string/array | null | 音频格式 |
| `onload` | function | null | 加载完成回调 |
| `onplay` | function | null | 播放开始回调 |
| `onend` | function | null | 播放结束回调 |
| `onerror` | function | null | 错误回调 |

### CustomHowl 方法

#### `play(id?)`
播放音频，返回 sound ID。

#### `stop(id?)`
停止播放。如果提供 ID，停止特定音频；否则停止所有音频。

#### `duration()`
获取音频时长（秒）。

#### `load()`
手动加载音频文件。

### CustomSound 方法

#### `getTailSilenceLength(audioUrl?, silenceThreshold?)`
获取音频尾部静音长度。

**参数：**
- `audioUrl` (string, 可选): 音频 URL，默认使用当前音频
- `silenceThreshold` (number, 可选): 静音阈值，默认 0.01

**返回：**
- `number`: 尾部静音长度（毫秒）

## 实现原理

### 音频缓存机制

```javascript
// 全局音频缓存
const audioCache = {};

// 音频加载时缓存 AudioBuffer
audioCache[url] = audioBuffer;
```

### 尾部静音检测算法

```javascript
getTailSilenceLength(audioUrl, silenceThreshold = 0.01) {
  const audioBuffer = audioCache[url];
  const channelData = audioBuffer.getChannelData(0); // 获取单声道数据
  const sampleRate = audioBuffer.sampleRate;
  
  // 从末尾向前检测静音
  let silenceCount = 0;
  for (let i = channelData.length - 1; i >= 0; i--) {
    if (Math.abs(channelData[i]) < silenceThreshold) {
      silenceCount++;
    } else {
      break; // 遇到非静音样本
    }
  }
  
  // 转换为毫秒
  return silenceCount / sampleRate * 1000;
}
```

## 与原版 Howler.js 的区别

1. **简化实现**: 移除了不必要的复杂功能，专注于核心音频播放
2. **新增功能**: 添加了 `getTailSilenceLength` 方法
3. **现代化**: 使用 ES6+ 语法和 Promise
4. **透明缓存**: 暴露了 `audioCache` 对象，便于调试和扩展

## 浏览器兼容性

- Chrome 66+
- Firefox 60+
- Safari 11.1+
- Edge 79+

## 注意事项

1. **CORS**: 确保音频文件支持跨域访问
2. **用户交互**: 某些浏览器需要用户交互后才能播放音频
3. **内存管理**: 大量音频文件可能占用较多内存
4. **格式支持**: 依赖浏览器的音频格式支持

## 错误处理

```javascript
const howl = new CustomHowl({
  src: '/path/to/audio.mp3',
  onloaderror: function(error) {
    console.error('音频加载失败:', error);
    // 可以尝试备用音频源或显示错误信息
  },
  onerror: function(error) {
    console.error('播放错误:', error);
  }
});
```

## 性能优化建议

1. **预加载**: 对于频繁使用的音频，启用预加载
2. **格式选择**: 使用压缩率高的音频格式（如 MP3、AAC）
3. **缓存管理**: 定期清理不再使用的音频缓存
4. **批量加载**: 避免同时加载过多音频文件

## 扩展示例

查看 `CustomHowlerExample.js` 文件获取更多使用示例，包括：
- 音频队列播放器
- 批量音频分析
- 高级播放控制