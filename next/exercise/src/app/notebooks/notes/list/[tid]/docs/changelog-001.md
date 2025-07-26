# 笔记列表页面开发日志 - v1.0.0

## 项目概述

创建了一个基于 Next.js 15 App Router 的笔记列表页面，支持根据 `tid` 参数显示笔记列表，提供字段过滤、音频播放和循环控制功能。

## 开发时间

- **开始时间**: 2024年当前会话
- **完成时间**: 2024年当前会话
- **开发状态**: ✅ 已完成核心功能

## 文件结构

```
src/app/notebooks/notes/list/[tid]/
├── page.tsx                    # 主页面组件
└── docs/
    ├── requirements.md         # 需求文档
    └── changelog-001.md        # 本变更日志
```

## 核心功能实现

### 1. 页面路由与参数处理

```typescript
// 动态路由参数解析
interface PageProps {
  params: Promise<{ tid: string }>;
}

// 异步参数获取
useEffect(() => {
  const getParams = async () => {
    const resolvedParams = await params;
    setTid(resolvedParams.tid);
  };
  getParams();
}, [params]);
```

**技术要点**:
- 使用 Next.js 15 App Router 的动态路由
- 支持异步参数解析
- TypeScript 类型安全

### 2. 数据获取与状态管理

```typescript
// 笔记数据获取
const fetchNotes = async () => {
  try {
    setLoading(true);
    const response = await fetch(`/api/notebooks/notes/list/${tid}`);
    const result = await response.json();
    
    if (result.success) {
      setNotes(result.notes);
    } else {
      setError(result.error || "获取笔记数据失败");
    }
  } catch (err) {
    setError("网络错误，无法获取笔记数据");
  } finally {
    setLoading(false);
  }
};
```

**技术要点**:
- RESTful API 调用
- 完整的错误处理
- 加载状态管理
- 用户友好的错误提示

### 3. 字段过滤器实现

```typescript
// 字段类型定义
type FieldType = "body" | "question" | "answer" | "body_script" | "note" | "note_extra";

// 字段选择器
<select
  value={selectedField}
  onChange={(e) => setSelectedField(e.target.value as FieldType)}
  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
>
  <option value="body">Body - 正文</option>
  <option value="question">Question - 问题</option>
  <option value="answer">Answer - 答案</option>
  <option value="body_script">Body Script - 脚本化正文</option>
  <option value="note">Note - 笔记</option>
  <option value="note_extra">Note Extra - 额外笔记</option>
</select>
```

**技术要点**:
- 类型安全的字段选择
- 默认显示 `body_script` 字段
- 动态内容切换
- 响应式设计

### 4. 音频播放系统

#### 4.1 HTML 内容解析

```typescript
// 从HTML内容中提取span元素
const extractSpansFromContent = (content: string): Array<{ voiceId: string; text: string; ariaLabel: string }> => {
  if (!content) return [];
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const spans = doc.querySelectorAll("span[data-voice-id]");
  
  return Array.from(spans).map(span => ({
    voiceId: span.getAttribute("data-voice-id") || "",
    text: span.textContent || "",
    ariaLabel: span.getAttribute("aria-label") || span.textContent || "",
  })).filter(item => item.voiceId && item.text);
};
```

#### 4.2 音频路径构建

```typescript
// 构建音频文件路径
const buildAudioPath = (voiceId: string): string => {
  const tidToDirectoryMap: Record<string, string> = {
    "21": "chinese-compositions",
    "22": "chinese-poetry",
    "23": "chinese-literature",
    "24": "chinese-essays",
    "25": "chinese-novels",
  };

  const directory = tidToDirectoryMap[tid];
  if (!directory) {
    throw new Error("无效的 tid，无法确定音频文件路径");
  }

  const voiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE || "zh-CN-XiaoxiaoNeural";
  const firstChar = voiceId.charAt(0).toLowerCase();
  return `/refs/notes/${directory}/${voiceName}/${firstChar}/${voiceId}.wav`;
};
```

#### 4.3 音频播放控制

```typescript
// 播放指定的音频
const playAudio = (noteId: number, spanIndex: number, voiceId: string) => {
  try {
    // 停止当前播放的音频
    if (audioState.audio) {
      audioState.audio.pause();
      audioState.audio.src = "";
    }

    const audioPath = buildAudioPath(voiceId);
    const audio = new Audio(audioPath);

    // 设置播放状态
    setCurrentPlayState({ noteId, spanIndex, voiceId });

    // 音频事件处理
    const onCanPlay = () => {
      setAudioState({
        isPlaying: true,
        currentVoiceId: voiceId,
        currentNoteId: noteId,
        audio: audio,
      });
      // ... 播放逻辑
    };

    const onEnded = () => {
      handleAudioEnded(noteId, spanIndex);
    };

    // 添加事件监听器
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // 开始加载音频
    audio.load();
  } catch (error) {
    console.error("播放音频时发生错误:", error);
    toast.error("播放音频时发生错误");
  }
};
```

**技术要点**:
- HTML5 Audio API 使用
- 事件监听器管理
- 错误处理和用户反馈
- 音频资源清理

### 5. 循环模式系统

```typescript
// 循环模式类型定义
type LoopMode = "none" | "single" | "note" | "all";

// 处理音频播放结束
const handleAudioEnded = (noteId: number, spanIndex: number) => {
  const note = notes.find(n => n.id === noteId);
  if (!note) return;

  const fieldContent = note[selectedField];
  if (!fieldContent) return;

  const spans = extractSpansFromContent(fieldContent);
  
  switch (loopMode) {
    case "single":
      // 单句循环：重新播放当前句子
      if (spans[spanIndex]) {
        setTimeout(() => {
          playAudio(noteId, spanIndex, spans[spanIndex].voiceId);
        }, 100);
      }
      break;
      
    case "note":
      // Note循环：播放当前note的下一句，如果是最后一句则从第一句开始
      if (spanIndex < spans.length - 1) {
        setTimeout(() => {
          playAudio(noteId, spanIndex + 1, spans[spanIndex + 1].voiceId);
        }, 100);
      } else {
        if (spans.length > 0) {
          setTimeout(() => {
            playAudio(noteId, 0, spans[0].voiceId);
          }, 100);
        }
      }
      break;
      
    case "all":
      // 全部循环：播放下一句，如果当前note播放完则播放下一个note
      // ... 复杂的跨note循环逻辑
      break;
      
    default:
      // 无循环：停止播放
      stopAudio();
      break;
  }
};
```

**技术要点**:
- 四种循环模式完整实现
- 跨笔记的播放队列管理
- 异步播放控制
- 状态同步

### 6. 用户界面设计

#### 6.1 响应式布局

```typescript
// 控制面板布局
<div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
  {/* 字段过滤器 */}
  <div className="mb-4">
    {/* ... */}
  </div>

  {/* 播放控制按钮组 */}
  <div className="mb-4">
    <div className="flex items-center space-x-2">
      {/* ... */}
    </div>
  </div>

  {/* 循环模式选择器 */}
  <div>
    {/* ... */}
  </div>
</div>
```

#### 6.2 笔记卡片设计

```typescript
// 笔记卡片布局
<div
  key={`${note.id}-${renderKey}`}
  className={`p-6 border rounded-lg ${
    isCurrentNote
      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
  }`}
>
  {/* 笔记标题和元信息 */}
  <div className="mb-4">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
      {note.title}
    </h3>
    {/* ... */}
  </div>

  {/* 字段内容 */}
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
    <MathJax hideUntilTypeset="first">
      <div
        dangerouslySetInnerHTML={{ __html: contentWithIcons }}
        className="prose max-w-none dark:prose-invert"
      />
    </MathJax>
  </div>
</div>
```

**技术要点**:
- Tailwind CSS 响应式设计
- 深色模式支持
- 当前播放状态高亮
- MathJax 数学公式渲染

### 7. 交互式播放图标

```typescript
// 为HTML内容添加播放图标
const addPlayIconsToContent = (content: string, noteId: number): string => {
  if (!content) return "";
  
  return content.replace(
    /<span([^>]*data-voice-id="([^"]+)"[^>]*)>([^<]*)<\/span>/g,
    (match, attributes, voiceId, text) => {
      const isCurrentlyPlaying = audioState.isPlaying && 
                               audioState.currentVoiceId === voiceId && 
                               audioState.currentNoteId === noteId;
      const icon = isCurrentlyPlaying ? "🔊" : "🔇";
      const spans = extractSpansFromContent(content);
      const spanIndex = spans.findIndex(s => s.voiceId === voiceId);
      
      return `<span${attributes} onclick="window.playSpanAudio(${noteId}, ${spanIndex}, '${voiceId}')" style="cursor: pointer; position: relative;">${text}<span style="margin-left: 4px; font-size: 0.8em;">${icon}</span></span>`;
    }
  );
};

// 全局播放函数注册
useEffect(() => {
  (window as any).playSpanAudio = (noteId: number, spanIndex: number, voiceId: string) => {
    if (audioState.isPlaying && audioState.currentVoiceId === voiceId && audioState.currentNoteId === noteId) {
      stopAudio();
    } else {
      playAudio(noteId, spanIndex, voiceId);
    }
  };
  
  return () => {
    delete (window as any).playSpanAudio;
  };
}, [audioState, notes, selectedField]);
```

**技术要点**:
- 正则表达式 HTML 处理
- 全局函数注册
- 动态图标更新
- 点击交互实现

## 技术栈

- **框架**: Next.js 15 App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数学公式**: MathJax
- **图标**: Lucide React
- **通知**: React Toastify
- **音频**: HTML5 Audio API

## 性能优化

1. **音频资源管理**
   - 自动清理未使用的音频对象
   - 事件监听器正确移除
   - 内存泄漏防护

2. **渲染优化**
   - 强制重渲染控制 (`renderKey`)
   - 条件渲染减少不必要的 DOM 操作
   - MathJax 延迟渲染

3. **状态管理**
   - 最小化状态更新
   - 异步操作错误处理
   - 用户反馈及时性

## 用户体验特性

1. **加载状态**: 旋转图标 + 文字提示
2. **错误处理**: 友好的错误信息 + 重新加载按钮
3. **播放反馈**: Toast 消息 + 视觉状态变化
4. **响应式设计**: 移动端和桌面端适配
5. **深色模式**: 完整的深色主题支持
6. **无障碍**: 语义化 HTML + ARIA 标签

## 测试建议

1. **功能测试**
   - 不同 tid 参数的数据加载
   - 各字段的内容显示
   - 音频播放和停止
   - 循环模式切换
   - 上一句/下一句导航

2. **边界测试**
   - 无效 tid 参数
   - 空数据响应
   - 网络错误处理
   - 音频文件不存在

3. **性能测试**
   - 大量笔记数据加载
   - 频繁播放切换
   - 内存使用监控

## 后续优化方向

1. **功能增强**
   - 播放进度条
   - 播放速度控制
   - 键盘快捷键
   - 播放历史记录

2. **性能优化**
   - 虚拟滚动（大数据量）
   - 音频预加载
   - 缓存策略

3. **用户体验**
   - 拖拽排序
   - 批量操作
   - 搜索过滤
   - 书签功能

## 总结

成功实现了一个功能完整的笔记列表页面，包含字段过滤、音频播放和循环控制等核心功能。代码结构清晰，类型安全，用户体验良好，为后续功能扩展奠定了坚实基础。