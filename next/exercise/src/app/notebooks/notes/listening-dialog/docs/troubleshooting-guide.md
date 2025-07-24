# 音频依次播放功能故障排查指南

## 问题现象

用户点击依次播放按钮后，音频没有按预期顺序播放。

## 排查步骤

### 0. 查看调试日志

我已经在关键位置添加了详细的 console.log 调试信息。请按照以下步骤查看日志：

1. 打开浏览器开发者工具（F12）
2. 切换到 Console 标签页
3. 清空控制台（Ctrl+L 或点击清除按钮）
4. 执行操作并观察日志输出

**日志分类说明：**

- 🎵 顺序播放控制相关
- 📡 事件发送相关
- 👂 事件监听相关
- 🎮 音频控制相关
- 📊 状态管理相关
- 👆 用户交互相关

**预期的调试日志：**

```
👂 [Event Listener] 已添加 sequentialAudioEnded 事件监听器
👂 [Event Listeners] 已为笔记添加事件监听器: {noteId: "xxx", noteIndex: 0}
```

### 1. 检查基础数据加载

#### 1.1 验证音频数据是否正确加载

```javascript
// 在浏览器控制台中执行
console.log("Notes data:", window.status?.notesListeningDialog?.notes);
```

**预期结果**: 应该显示包含音频文件路径的笔记数组

**如果数据为空或 undefined**:

- 检查 API 接口 `/api/notebooks/notes/list/11` 是否正常返回数据
- 检查网络请求是否成功
- 验证数据库中是否有对应的听力对话数据

#### 1.2 检查音频文件路径

```javascript
// 检查第一个音频文件路径
const firstNote = window.status?.notesListeningDialog?.notes[0];
console.log("First audio path:", firstNote?.figures);
console.log("Full audio URL:", `/refs${firstNote?.figures}`);
```

**验证方法**: 在浏览器中直接访问音频 URL，确认文件存在且可播放

### 2. 检查状态管理

#### 2.1 验证全局状态

```javascript
// 检查当前播放状态
console.log("Current playing state:", {
  isSequentialPlaying: window.isSequentialPlaying,
  currentNoteIndex: window.status?.notesListeningDialog?.currentNoteIndex,
  isPlaying: window.status?.notesListeningDialog?.isPlaying,
});
```

#### 2.2 监控状态变化

```javascript
// 添加状态变化监听
const originalSetStatus = window.setStatus;
window.setStatus = function (updater) {
  console.log("Status update:", updater);
  return originalSetStatus(updater);
};
```

### 3. 检查事件通信

#### 3.1 监听自定义事件

```javascript
// 监听所有相关事件
["disableAllLoops", "playSequentialAudio", "stopSequentialAudio", "sequentialAudioEnded"].forEach(eventName => {
  window.addEventListener(eventName, event => {
    console.log(`Event fired: ${eventName}`, event.detail);
  });
});
```

#### 3.2 手动触发事件测试

```javascript
// 测试事件是否正常工作
window.dispatchEvent(
  new CustomEvent("playSequentialAudio", {
    detail: { noteIndex: 0 },
  })
);
```

### 4. 检查音频组件状态

#### 4.1 验证 Howl 实例

```javascript
// 在NoteListeningDialog组件中添加调试代码
console.log("Howl instance:", local.howlInstance);
console.log("Audio loaded:", local.howlInstance?.state());
console.log("Audio duration:", local.howlInstance?.duration());
```

#### 4.2 检查音频播放能力

```javascript
// 手动测试音频播放
if (local.howlInstance) {
  local.howlInstance.play();
  console.log("Manual play triggered");
}
```

### 5. 检查浏览器兼容性

#### 5.1 音频上下文权限

```javascript
// 检查音频上下文状态
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
console.log("Audio context state:", audioContext.state);

// 如果是suspended，需要用户交互来激活
if (audioContext.state === "suspended") {
  audioContext.resume().then(() => {
    console.log("Audio context resumed");
  });
}
```

#### 5.2 检查浏览器音频支持

```javascript
// 检查音频格式支持
const audio = new Audio();
console.log("MP3 support:", audio.canPlayType("audio/mpeg"));
console.log("WAV support:", audio.canPlayType("audio/wav"));
```

## 常见问题和解决方案

### 问题 1: 点击播放按钮无反应

**可能原因**:

1. 事件处理函数未正确绑定
2. 状态管理出现问题
3. 音频数据未加载

**解决步骤**:

1. 检查按钮的 onClick 事件是否正确绑定到`handleSequentialPlay`
2. 验证`isSequentialPlaying`状态是否正确更新
3. 确认`status.notesListeningDialog.notes`数组不为空

**调试代码**:

```javascript
// 在handleSequentialPlay函数开头添加
console.log("Sequential play clicked, current state:", {
  isSequentialPlaying,
  notesCount: status.notesListeningDialog.notes.length,
  currentIndex: status.notesListeningDialog.currentNoteIndex,
});
```

### 问题 2: 只播放第一个音频，不会自动播放下一个

**可能原因**:

1. `sequentialAudioEnded`事件未正确触发
2. 事件监听器未正确绑定
3. Howl 的`onend`回调未执行

**解决步骤**:

1. 检查 Howl 实例的`onend`回调是否正确设置
2. 验证`sequentialAudioEnded`事件是否被触发
3. 确认主页面的事件监听器是否正常工作

**调试代码**:

```javascript
// 在Howl的onend回调中添加
onend: () => {
  console.log("Audio ended, isLooping:", local.isLooping);
  if (!local.isLooping) {
    setLocal(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    console.log("Dispatching sequentialAudioEnded event");
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("sequentialAudioEnded"));
    }, 100);
  }
};
```

### 问题 3: 音频播放但没有声音

**可能原因**:

1. 音频文件损坏或格式不支持
2. 浏览器音频被静音
3. Howler 音量设置问题

**解决步骤**:

1. 检查音频文件是否可以直接在浏览器中播放
2. 验证浏览器音频设置
3. 检查 Howler 的音量设置

**调试代码**:

```javascript
// 检查音量设置
console.log("Howler global volume:", Howler.volume());
console.log("Instance volume:", local.howlInstance?.volume());

// 设置音量
Howler.volume(1.0);
local.howlInstance?.volume(1.0);
```

### 问题 4: 音频重叠播放

**可能原因**:

1. 前一个音频未正确停止
2. 循环播放未被禁用
3. 多个音频实例同时播放

**解决步骤**:

1. 确保`disableAllLoops`事件正确处理
2. 在播放新音频前停止所有其他音频
3. 检查 Howl 实例的循环设置

**调试代码**:

```javascript
// 在播放前检查其他音频状态
const handlePlaySequentialAudio = event => {
  console.log("Play event received for index:", event.detail.noteIndex);
  console.log("Current component index:", noteIndex);
  console.log("Is this component target:", event.detail.noteIndex === noteIndex);

  if (event.detail.noteIndex === noteIndex) {
    if (local.howlInstance) {
      console.log("Starting playback, current state:", {
        isPlaying: local.isPlaying,
        isLooping: local.isLooping,
        duration: local.howlInstance.duration(),
      });
      local.howlInstance.seek(0);
      local.howlInstance.play();
    }
  }
};
```

## 性能监控

### 添加性能监控代码

```javascript
// 监控音频加载时间
const startTime = performance.now();
wavesurfer.on("ready", () => {
  const loadTime = performance.now() - startTime;
  console.log(`Audio loaded in ${loadTime}ms`);
});

// 监控播放延迟
let playStartTime;
const originalPlay = local.howlInstance.play;
local.howlInstance.play = function () {
  playStartTime = performance.now();
  return originalPlay.call(this);
};

local.howlInstance.on("play", () => {
  const playDelay = performance.now() - playStartTime;
  console.log(`Play delay: ${playDelay}ms`);
});
```

## 日志收集

### 启用详细日志

```javascript
// 在页面加载时添加
window.debugSequentialPlay = true;

// 在相关函数中添加条件日志
if (window.debugSequentialPlay) {
  console.log('Debug info:', ...);
}
```

### 收集错误信息

```javascript
// 全局错误处理
window.addEventListener("error", event => {
  if (event.filename.includes("NoteListeningDialog") || event.filename.includes("listening-dialog")) {
    console.error("Sequential play related error:", event.error);
  }
});

// Promise错误处理
window.addEventListener("unhandledrejection", event => {
  console.error("Unhandled promise rejection:", event.reason);
});
```

## 修复验证

### 功能测试清单

- [ ] 点击播放按钮能开始播放第一个音频
- [ ] 第一个音频播放完成后自动播放第二个
- [ ] 所有音频播放完成后停止顺序播放
- [ ] 播放过程中点击暂停能停止播放
- [ ] 当前播放项有正确的高亮显示
- [ ] 点击其他音频项能切换当前选中项
- [ ] 音频控制按钮显示正确的图标状态

### 回归测试

- [ ] 单个音频的播放/暂停功能正常
- [ ] 音频循环播放功能正常
- [ ] 音频选择区域播放功能正常
- [ ] 页面刷新后功能仍然正常
- [ ] 多个浏览器标签页不会相互干扰

通过以上排查步骤，应该能够定位和解决音频依次播放功能的问题。建议按顺序执行排查步骤，并记录每一步的结果，以便快速定位问题根源。
