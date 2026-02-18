---
inclusion: fileMatch
fileMatchPattern: '**/notebooks/words/english/player/page.js'
---

# 英文单词播放器架构说明

## 概述

这是一个用于英语单词学习的音频播放应用，支持循环播放单词的英文和中文发音，具有丰富的配置选项来控制播放行为。应用使用 React 构建，集成了 Media Session API 以支持系统级媒体控制。

## 核心组件

### 1. 状态管理 (status)

应用使用 React useState 管理一个复杂的状态对象：

```javascript
const [status, setStatus] = useState({
  currentWordIndex: 0,        // 当前显示/播放的单词索引
  playedWordIndex: -1,        // 上次播放的单词索引
  playedWordCounter: 1,       // 已播放单词计数器
  playCurrent: null,          // 播放当前单词的函数引用
  onWheel: false,             // 滚动状态标志
  isPlaying: false,           // 是否正在自动播放
  words: [],                  // 当前显示的单词列表（已过滤）
  originalWords: [],          // 原始单词列表（未过滤）
  isDialogOpen: false,        // 编辑对话框状态
  dialogData: {},             // 对话框数据
  isProcessing: false,        // 处理中状态（显示遮罩）
  isComposing: false,         // 输入法组合状态
  isTabPressed: false,        // Tab 键按下状态
  searchText: "",             // 搜索文本
  isConfigDialogOpen: false,  // 配置对话框状态
  audioConfig: {},            // 音频配置对象
  prioritiesIndices: {},      // 优先级索引缓存
});
```

### 2. 音频配置 (audioConfig)

音频配置控制播放行为，存储在 localStorage 中持久化：

```javascript
const DEFAULT_AUDIO_CONFIG = {
  // 全局设置
  alternatePlay: false,       // 是否交错播放英文和中文
  volume: 100,                // 音量 (50-150%)
  speed: 100,                 // 播放速度 (90-110%)
  batch_quantity: 100,        // 批量播放数量 (25/50/75/100/125/150/175=无限)
  priorities: [1, 5],         // 显示的单词优先级范围
  wordStartIndex: 0,          // 起始单词编号
  
  // 英文设置
  english: {
    repeatCount: 1,           // 发音次数 (0-5)
    pauseTime: 0,             // 停顿时间 (0-1.25秒)
    showText: true,           // 是否显示英文
    waitVoiceLength: true,    // 是否等待音频时长
  },
  
  // 中文设置
  chinese: {
    repeatCount: 0,           // 发音次数 (0-5)
    pauseTime: 0,             // 停顿时间 (0-1.25秒)
    showText: true,           // 是否显示中文
    waitVoiceLength: true,    // 是否等待音频时长
  },
};
```

## 播放逻辑核心流程

### 流程图

```
用户操作/自动触发
    ↓
更新 currentWordIndex
    ↓
useEffect 监听到 currentWordIndex 变化
    ↓
调用 playCurrentWord(autoNextWord)
    ↓
generateVoiceURLs() 生成音频 URL 数组
    ↓
playerRef.current.play(voiceURLs, onCompleteCallback)
    ↓
VoicePlayerWithMediaSession 播放音频序列
    ↓
播放完成后调用 autoNextWord
    ↓
nextWord() 更新 currentWordIndex
    ↓
循环继续...
```

### 1. 单词索引更新 (nextWord)

`nextWord()` 函数负责根据配置更新当前单词索引：

```javascript
const nextWord = () => {
  setStatus(prev => {
    const isInfiniteMode = prev.audioConfig.batch_quantity === 175;
    const batchSize = prev.audioConfig.batch_quantity;
    const totalWords = prev.words.length;
    const startWordIndex = status.audioConfig.wordStartIndex - 1;

    // 无限模式：顺序播放，到末尾循环
    if (isInfiniteMode) {
      const nextIndex = (prev.currentWordIndex + 1) % totalWords;
      return {
        ...prev,
        currentWordIndex: nextIndex,
        playedWordCounter: prev.playedWordCounter + 1,
      };
    }

    // 分批模式：播放指定数量后循环到批次开头
    // 逻辑：
    // 1. 如果到达列表末尾，跳到开头
    // 2. 如果在批次范围内，继续下一个
    // 3. 如果超出批次范围，跳回批次开头
    
    if ((startWordIndex + batchSize) > (totalWords - 1) 
        && (prev.currentWordIndex === totalWords - 1)) {
      // 批次超出列表末尾，且当前在末尾，跳到开头
      return {
        ...prev,
        currentWordIndex: 0,
        playedWordCounter: prev.playedWordCounter + 1,
      };
    }
    else if ((startWordIndex + batchSize) <= totalWords - 1
        && prev.currentWordIndex >= startWordIndex 
        && prev.currentWordIndex < startWordIndex + batchSize - 1
        || (startWordIndex + batchSize) > totalWords - 1
        && (prev.currentWordIndex < startWordIndex + batchSize - totalWords - 1 
            || prev.currentWordIndex >= startWordIndex)) {
      // 在批次范围内，继续下一个
      return {
        ...prev,
        currentWordIndex: prev.currentWordIndex + 1,
        playedWordCounter: prev.playedWordCounter + 1,
      };
    }
    else {
      // 超出批次范围，跳回批次开头
      return {
        ...prev,
        currentWordIndex: startWordIndex,
        playedWordCounter: 1,
      };
    }
  });
};
```

**关键点：**
- 支持两种模式：无限循环模式 (batch_quantity=175) 和分批循环模式
- 分批模式会在播放完指定数量后跳回批次开头
- 使用 `wordStartIndex` 定义批次起始位置

### 2. 音频 URL 生成 (generateVoiceURLs)

根据配置生成音频 URL 数组：

```javascript
const generateVoiceURLs = wordIndex => {
  const word = status.words[wordIndex];
  if (!word?.voice_id_uk) return [];

  let voiceURLs = [];

  // 添加英文音频
  if (status.audioConfig.english.repeatCount) {
    const firstChar = word.voice_id_uk[0].toLowerCase();
    const englishURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${word.voice_id_uk}.wav`;
    for (let i = 0; i < status.audioConfig.english.repeatCount; i++) {
      voiceURLs.push(englishURL);
    }
  }

  // 添加中文音频
  if (status.audioConfig.chinese.repeatCount && status.audioConfig.chinese.showText) {
    const firstCharChinese = word.voice_id_translation[0].toLowerCase();
    const chineseURL = `/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstCharChinese}/${word.voice_id_translation}.wav`;
    for (let i = 0; i < status.audioConfig.chinese.repeatCount; i++) {
      voiceURLs.push(chineseURL);
    }
  }

  // 如果启用交错播放，重新排列URL
  if (status.audioConfig.alternatePlay && voiceURLs.length > 0) {
    voiceURLs = alternateVoiceURLs(voiceURLs);
  }

  return voiceURLs;
};
```

**URL 结构：**
- 英文：`/refs/voices/en-GB-RyanNeural/[首字母]/[voice_id].wav`
- 中文：`/refs/voices/zh-CN-XiaoxiaoNeural/[首字母]/[voice_id].wav`

**交错播放逻辑 (alternateVoiceURLs)：**
```javascript
// 将连续相同的URL交错排列
// 例如：[en, en, en, cn, cn] => [en, cn, en, cn, en]
const alternateVoiceURLs = urls => {
  // 1. 分组相同的URL
  // 2. 交错排列各组
  // 3. 返回新数组
};
```

### 3. 播放执行 (playCurrentWord)

```javascript
const playCurrentWord = (onCompleteCallback = () => {}) => {
  const voiceURLs = generateVoiceURLs(status.currentWordIndex);
  if (voiceURLs.length > 0 && playerRef.current) {
    const currentWord = status.words[status.currentWordIndex];
    const wordData = {
      word: currentWord.word,
      translation: currentWord.translations?.[0]?.translation || currentWord.translation || "",
      phonetic: currentWord.phonetic_uk || currentWord.phonetic_us || "",
      pos: currentWord.pos || '',
    };

    // 配置播放器
    playerRef.current.stop();
    playerRef.current.setSpeed(status.audioConfig.speed / 100);
    playerRef.current.setVolume(status.audioConfig.volume / 100);
    playerRef.current.setVoiceInterval(
      status.audioConfig.english.waitVoiceLength,
      status.audioConfig.chinese.waitVoiceLength,
      status.audioConfig.english.pauseTime * 1000,
      status.audioConfig.chinese.pauseTime * 1000
    );
    
    // 开始播放
    playerRef.current.play(voiceURLs, onCompleteCallback, wordData);
  }
};
```

### 4. 自动播放触发 (useEffect)

```javascript
useEffect(() => {
  // 不播放的情况：配置窗口打开、没有单词、没有音频ID
  if (!status.isConfigDialogOpen 
      && status.words.length > 0 
      && status.words[status.currentWordIndex]?.voice_id_uk) {
    
    // 播放条件：正在自动播放 或 单词索引改变
    if (status.isPlaying || status.playedWordIndex !== status.currentWordIndex) {
      playCurrentWord(autoNextWord);
      status.playedWordIndex = status.currentWordIndex;
    }
  }

  return () => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
  };
}, [status.isPlaying, status.currentWordIndex]);
```

**触发条件：**
1. `status.isPlaying` 变化（用户点击播放/暂停）
2. `status.currentWordIndex` 变化（切换单词）

### 5. 播放器实现 (VoicePlayerWithMediaSession)

播放器使用 Howler.js 库处理音频，并集成 Media Session API：

**核心功能：**
1. **音频队列播放**：按顺序播放多个音频文件
2. **间隔控制**：
   - `waitVoiceLength=true`：等待音频实际时长（去除尾部静音）
   - `waitVoiceLength=false`：不等待音频时长
   - `pauseTime`：额外停顿时间
3. **Media Session 集成**：
   - 显示在系统通知栏
   - 支持锁屏控制
   - 显示单词信息（标题、翻译、词性）
4. **静音音频技巧**：播放极低音量的循环音频以保持 Media Session 活跃

**播放流程：**
```javascript
play(audioURLs, onCompleteCallback, wordData) {
  // 1. 停止之前的播放
  this.stop();
  
  // 2. 更新 Media Session 元数据
  this.updateMediaMetadata(wordData);
  
  // 3. 激活 Media Session
  await this.activateMediaSession();
  
  // 4. 创建 Howl 实例数组
  this.howls = audioURLs.map((url, index) => {
    return new Howl({
      src: [url],
      onload: () => {
        // 分析音频时长，去除尾部静音
        // 计算实际停顿时间
      },
      onend: () => {
        // 播放下一个音频或调用完成回调
        if (this.currentIndex < this.howls.length - 1) {
          // 延迟后播放下一个
          preciseTimeout(() => {
            this.currentIndex += 1;
            this.howls[this.currentIndex].play();
          }, pauseTime);
        } else {
          // 播放完成，调用回调
          preciseTimeout(() => {
            this.onCompleteCallback();
          }, pauseTime);
        }
      }
    });
  });
  
  // 5. 开始播放第一个音频
  this.howls[0].play();
}
```

## 用户交互

### 键盘控制

```javascript
// 空格键：播放/暂停
// 左箭头：上一个单词
// 右箭头：下一个单词
// Tab：标记为需要查询
// ESC：关闭对话框
// Enter：搜索单词
```

### 鼠标控制

```javascript
// 滚轮：切换单词（停止自动播放）
// 点击单词：播放当前单词
// 点击翻译：播放翻译音频
// 点击音标：播放完整配置的音频
```

### 优先级系统

单词有 1-5 的优先级，可以通过点击数字按钮设置：
- 优先级 1：最重要
- 优先级 5：最不重要
- 配置中的 `priorities: [1, 5]` 控制显示哪些优先级的单词

## 数据流

### 初始化流程

```
1. 组件挂载
   ↓
2. useEffect 触发 fetchWords()
   ↓
3. 从 API 获取单词列表
   ↓
4. 从 localStorage 读取 audioConfig
   ↓
5. 根据 priorities 过滤单词
   ↓
6. 从 localStorage 读取 currentWordIndex
   ↓
7. 初始化 VoicePlayerWithMediaSession
   ↓
8. 设置键盘事件监听
```

### 配置更新流程

```
1. 用户修改配置
   ↓
2. updateAudioConfig() 更新 status.audioConfig
   ↓
3. saveAudioConfig() 保存到 localStorage
   ↓
4. 如果修改了 priorities，重新过滤单词列表
   ↓
5. 如果修改了音量/速度，立即应用到播放器
```

### 单词切换流程

```
1. 触发 nextWord() 或用户操作
   ↓
2. 更新 currentWordIndex
   ↓
3. useEffect 检测到变化
   ↓
4. 调用 playCurrentWord(autoNextWord)
   ↓
5. generateVoiceURLs() 生成音频列表
   ↓
6. playerRef.current.play() 开始播放
   ↓
7. 播放完成后调用 autoNextWord
   ↓
8. 如果 isPlaying=true，调用 nextWord()
   ↓
9. 循环继续...
```

## 特殊功能

### 1. 打印功能

```javascript
handlePrint() {
  // 1. 根据 wordStartIndex 和 batch_quantity 选择单词
  // 2. 生成 HTML 表格
  // 3. 每 25 个单词分页
  // 4. 打开新窗口并触发打印
}
```

### 2. 单词编辑

- 点击编辑按钮打开对话框
- 可以编辑音标、翻译、笔记等
- 支持多个翻译（一词多义）
- 可以触发 Azure TTS 重新生成音频

### 3. 单词搜索

```javascript
// 搜索逻辑：
// 1. 输入搜索文本
// 2. 按 Enter 向前搜索，Shift+Enter 向后搜索
// 3. 匹配单词拼写、翻译或序号
// 4. 跳转到匹配的单词
```

### 4. 单词排序

```javascript
// 提供四个排序操作：
handlePutTop()      // 移到最前
handlePutPrevious() // 移到前一个位置
handlePutNext()     // 移到后一个位置
handlePutEnd()      // 移到最后

// 通过修改 weight 字段实现排序
// weight 是一个浮点数，用于确定单词在列表中的位置
```

## 性能优化

### 1. 音频预加载

Howler.js 自动预加载音频文件，减少播放延迟。

### 2. 静音检测

播放器分析音频文件，检测尾部静音并调整实际播放时长：

```javascript
analyzeAudioBuffer(audioBuffer, index) {
  // 1. 从音频末尾向前扫描
  // 2. 检测低于阈值的样本（静音）
  // 3. 计算静音时长
  // 4. 返回实际音频时长
}
```

### 3. 精确定时

使用自定义的 `preciseTimeout` 函数替代 `setTimeout`，提供更精确的定时控制。

### 4. 状态缓存

使用 `prioritiesIndices` 缓存不同优先级范围的单词索引，切换优先级时恢复上次位置。

## 配置持久化

### localStorage 存储

```javascript
// 存储的数据：
localStorage.setItem('audioConfig', JSON.stringify(config));
localStorage.setItem('wordStatus', currentWordIndex.toString());

// 读取的数据：
const savedConfig = loadAudioConfig();
const savedIndex = parseInt(localStorage.getItem('wordStatus'), 10);
```

### 配置验证

```javascript
loadAudioConfig() {
  // 1. 读取 localStorage
  // 2. 解析 JSON
  // 3. 验证所有必需字段
  // 4. 使用 ?? 运算符提供默认值
  // 5. 返回完整配置对象
}
```

## 错误处理

### 1. API 错误

```javascript
if (!json.success) {
  console.error("API 报错");
  toast.error("cant load words from API.");
}
```

### 2. 音频加载错误

```javascript
onerror: (error) => {
  console.error('VoicePlayerWithMediaSession error:', url, error);
}
```

### 3. localStorage 错误

```javascript
try {
  localStorage.setItem("audioConfig", JSON.stringify(config));
} catch (error) {
  console.error("保存音频配置失败:", error);
}
```

## 依赖库

- **React**: UI 框架
- **Howler.js**: 音频播放库
- **@headlessui/react**: 无样式 UI 组件（Dialog, Transition）
- **react-toastify**: 通知提示
- **react-icons**: 图标库
- **Shadcn UI**: UI 组件库（Dialog, Slider, Switch, Label）

## 注意事项

### 1. Media Session 激活

Media Session API 需要用户交互才能激活，应用使用以下策略：
- 播放极低音量的循环音频
- 监听首次用户交互（点击、触摸、按键）
- 在用户交互后激活静音音频

### 2. 浏览器兼容性

- Media Session API 在 iOS Safari 和 Android Chrome 上支持良好
- 需要 HTTPS 环境才能使用 Media Session
- 某些浏览器可能需要用户手势才能播放音频

### 3. 性能考虑

- 避免同时创建过多 Howl 实例
- 播放完成后及时卸载音频资源
- 使用 `stop()` 方法清理所有资源

### 4. 状态同步

- 使用 `playedWordIndex` 避免重复播放
- 使用 `isPlaying` 控制自动播放
- 配置对话框打开时停止播放

## 扩展建议

### 1. 离线支持

- 使用 Service Worker 缓存音频文件
- 实现 PWA 功能

### 2. 学习统计

- 记录每个单词的播放次数
- 统计学习时长
- 生成学习报告

### 3. 自定义音频

- 支持用户上传自己的发音
- 支持多种口音选择

### 4. 间隔重复算法

- 实现 Anki 式的间隔重复算法
- 根据记忆曲线调整复习频率
