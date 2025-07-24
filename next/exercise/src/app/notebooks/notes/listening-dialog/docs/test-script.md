# 音频依次播放功能测试脚本

## 快速测试脚本

将以下代码复制到浏览器控制台中运行，可以快速检查功能状态：

```javascript
// 音频依次播放功能测试脚本
(function () {
  console.log("🧪 [Test Script] 开始测试音频依次播放功能");

  // 1. 检查页面元素
  const playButton =
    document.querySelector('[data-testid="sequential-play-button"]') ||
    document.querySelector('button[aria-label*="播放"]') ||
    document.querySelector('button:contains("播放")');

  console.log("🔍 [Test] 播放按钮检查:", {
    found: !!playButton,
    element: playButton,
    text: playButton?.textContent || playButton?.getAttribute("aria-label"),
  });

  // 2. 检查音频组件
  const audioComponents =
    document.querySelectorAll("[data-note-id]") || document.querySelectorAll(".note-listening-dialog");

  console.log("🔍 [Test] 音频组件检查:", {
    count: audioComponents.length,
    components: Array.from(audioComponents).map((comp, index) => ({
      index,
      id: comp.getAttribute("data-note-id") || comp.id,
      hasAudio: !!comp.querySelector("audio, [data-howl]"),
    })),
  });

  // 3. 检查事件监听器
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;
  const eventListeners = {
    sequentialAudioEnded: 0,
    playSequentialAudio: 0,
    stopSequentialAudio: 0,
    disableAllLoops: 0,
  };

  // 临时拦截事件监听器注册
  window.addEventListener = function (type, listener, options) {
    if (eventListeners.hasOwnProperty(type)) {
      eventListeners[type]++;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };

  // 触发组件重新渲染来检查事件监听器
  setTimeout(() => {
    console.log("🔍 [Test] 事件监听器检查:", eventListeners);

    // 恢复原始函数
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  }, 1000);

  // 4. 检查全局状态
  try {
    // 尝试访问 React DevTools 或 Jotai DevTools
    const reactFiber = playButton?._reactInternalFiber || playButton?.__reactInternalInstance;
    console.log("🔍 [Test] React 组件检查:", {
      hasReactFiber: !!reactFiber,
      componentName: reactFiber?.type?.name || reactFiber?.elementType?.name,
    });
  } catch (e) {
    console.log("🔍 [Test] React 组件检查失败:", e.message);
  }

  // 5. 模拟事件测试
  console.log("🧪 [Test] 开始模拟事件测试");

  // 测试自定义事件是否能正常触发
  let eventReceived = false;
  const testListener = () => {
    eventReceived = true;
  };

  window.addEventListener("test-sequential-event", testListener);
  window.dispatchEvent(new CustomEvent("test-sequential-event"));

  setTimeout(() => {
    console.log("🔍 [Test] 自定义事件测试:", {
      eventReceived,
      customEventSupport: typeof CustomEvent !== "undefined",
    });

    window.removeEventListener("test-sequential-event", testListener);

    // 6. 生成测试报告
    const testResults = {
      playButtonFound: !!playButton,
      audioComponentsCount: audioComponents.length,
      customEventSupport: typeof CustomEvent !== "undefined",
      eventListenersRegistered: Object.values(eventListeners).some(count => count > 0),
      browserSupport: {
        howler: typeof window.Howl !== "undefined",
        webAudio: typeof window.AudioContext !== "undefined" || typeof window.webkitAudioContext !== "undefined",
        promises: typeof Promise !== "undefined",
      },
    };

    console.log("📋 [Test Report] 测试结果汇总:", testResults);

    // 生成建议
    const suggestions = [];
    if (!testResults.playButtonFound) {
      suggestions.push("❌ 未找到播放按钮，请检查按钮是否正确渲染");
    }
    if (testResults.audioComponentsCount === 0) {
      suggestions.push("❌ 未找到音频组件，请检查笔记数据是否正确加载");
    }
    if (!testResults.customEventSupport) {
      suggestions.push("❌ 浏览器不支持 CustomEvent，请升级浏览器");
    }
    if (!testResults.eventListenersRegistered) {
      suggestions.push("⚠️ 未检测到事件监听器注册，可能存在组件初始化问题");
    }
    if (!testResults.browserSupport.howler) {
      suggestions.push("❌ Howler.js 未加载，请检查音频库是否正确引入");
    }

    if (suggestions.length === 0) {
      console.log("✅ [Test Report] 所有基础检查通过，功能应该正常工作");
    } else {
      console.log("⚠️ [Test Report] 发现以下问题:");
      suggestions.forEach(suggestion => console.log(suggestion));
    }

    console.log("🧪 [Test Script] 测试完成");
  }, 1500);
})();
```

## 手动测试步骤

### 步骤 1: 基础功能测试

1. **打开页面**

   - 访问 `/notebooks/notes/listening-dialog`
   - 等待页面完全加载
   - 检查是否有笔记列表显示

2. **检查播放按钮**

   - 查找顺序播放按钮（通常在页面顶部）
   - 确认按钮可以点击
   - 检查按钮的图标状态

3. **检查音频组件**
   - 确认每个笔记项都有音频播放控件
   - 尝试单独播放一个音频，确认音频文件可以正常加载

### 步骤 2: 顺序播放测试

1. **开始播放**

   ```
   操作: 点击顺序播放按钮
   预期:
   - 按钮图标变为暂停图标
   - 第一个音频开始播放
   - 当前播放项有高亮显示
   ```

2. **自动切换**

   ```
   操作: 等待第一个音频播放完成
   预期:
   - 自动开始播放第二个音频
   - 高亮切换到第二个音频项
   - 播放状态保持连续
   ```

3. **暂停恢复**

   ```
   操作: 在播放过程中点击暂停按钮
   预期:
   - 当前音频立即暂停
   - 按钮图标变为播放图标

   操作: 再次点击播放按钮
   预期:
   - 从暂停位置继续播放
   - 按钮图标变为暂停图标
   ```

4. **完成播放**
   ```
   操作: 等待所有音频播放完成
   预期:
   - 播放状态自动重置
   - 按钮图标变为播放图标
   - 高亮状态清除
   ```

### 步骤 3: 交互测试

1. **选择起始位置**

   ```
   操作: 点击第3个笔记项，然后点击顺序播放
   预期: 从第3个音频开始播放
   ```

2. **循环播放禁用**
   ```
   操作: 开启某个音频的循环播放，然后开始顺序播放
   预期: 循环播放被自动禁用
   ```

## 性能测试

### 内存使用测试

```javascript
// 内存使用监控脚本
(function () {
  const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
  console.log("🧪 [Memory Test] 开始内存监控，初始内存:", startMemory);

  // 模拟多次播放操作
  let testCount = 0;
  const maxTests = 10;

  const memoryTest = () => {
    if (testCount >= maxTests) {
      const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
      const memoryDiff = endMemory - startMemory;
      console.log("🧪 [Memory Test] 测试完成:", {
        startMemory,
        endMemory,
        memoryDiff,
        memoryLeakSuspected: memoryDiff > 10 * 1024 * 1024, // 10MB
      });
      return;
    }

    // 触发播放事件
    window.dispatchEvent(
      new CustomEvent("playSequentialAudio", {
        detail: { noteIndex: testCount % 3 },
      })
    );

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("sequentialAudioEnded"));
      testCount++;

      if (performance.memory) {
        console.log(`🧪 [Memory Test] 第${testCount}次测试，当前内存:`, performance.memory.usedJSHeapSize);
      }

      setTimeout(memoryTest, 100);
    }, 100);
  };

  memoryTest();
})();
```

### 事件响应时间测试

```javascript
// 事件响应时间测试脚本
(function () {
  console.log("🧪 [Performance Test] 开始事件响应时间测试");

  const testEventResponse = (eventName, detail = {}) => {
    const startTime = performance.now();
    let responseReceived = false;

    const responseListener = () => {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      console.log(`⏱️ [Performance] ${eventName} 响应时间:`, responseTime + "ms");
      responseReceived = true;
    };

    // 监听可能的响应事件
    window.addEventListener("sequentialAudioEnded", responseListener, { once: true });

    // 发送测试事件
    window.dispatchEvent(new CustomEvent(eventName, { detail }));

    // 超时检查
    setTimeout(() => {
      if (!responseReceived) {
        console.warn(`⚠️ [Performance] ${eventName} 响应超时 (>1000ms)`);
        window.removeEventListener("sequentialAudioEnded", responseListener);
      }
    }, 1000);
  };

  // 测试不同事件的响应时间
  setTimeout(() => testEventResponse("playSequentialAudio", { noteIndex: 0 }), 100);
  setTimeout(() => testEventResponse("stopSequentialAudio"), 200);
  setTimeout(() => testEventResponse("disableAllLoops"), 300);
})();
```

## 错误场景测试

### 网络异常测试

1. **断网测试**

   - 开始播放后断开网络
   - 检查是否有适当的错误处理
   - 恢复网络后检查功能是否正常

2. **音频文件 404 测试**
   - 修改某个音频文件的 URL 为无效地址
   - 检查是否跳过该音频继续播放下一个
   - 检查是否有错误提示

### 浏览器兼容性测试

1. **不同浏览器测试**

   - Chrome (推荐)
   - Firefox
   - Safari
   - Edge

2. **移动设备测试**
   - iOS Safari
   - Android Chrome
   - 检查触摸交互是否正常

## 测试结果记录模板

```
测试日期: ___________
浏览器: ___________
操作系统: ___________

基础功能测试:
□ 页面正常加载
□ 播放按钮可见且可点击
□ 音频组件正常显示
□ 单个音频可以正常播放

顺序播放测试:
□ 点击播放按钮开始播放
□ 第一个音频正常播放
□ 自动切换到下一个音频
□ 暂停功能正常
□ 恢复播放功能正常
□ 播放完成后状态重置

交互测试:
□ 选择起始位置功能正常
□ 循环播放自动禁用
□ 当前项高亮显示正常

性能测试:
□ 内存使用正常（无明显泄漏）
□ 事件响应时间 < 200ms
□ 音频切换流畅

错误处理测试:
□ 网络异常处理正常
□ 音频文件加载失败处理正常
□ 浏览器兼容性良好

发现的问题:
1. ___________
2. ___________
3. ___________

控制台日志:
（粘贴相关的控制台输出）
```

请按照以上测试步骤进行测试，并将结果反馈给我。特别注意控制台中的调试日志，这些信息对于定位问题非常重要。
