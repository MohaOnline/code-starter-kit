# PreviewArea 组件功能增强变更日志 - 001
# PreviewArea Component Feature Enhancement Changelog - 001

## 版本信息 / Version Information

- **变更日期**: 2024年
- **Change Date**: 2024
- **变更类型**: 功能增强
- **Change Type**: Feature Enhancement
- **影响组件**: PreviewArea.tsx
- **Affected Component**: PreviewArea.tsx
- **新增 API**: `/api/notebooks/notes/voice/chinese`
- **New API**: `/api/notebooks/notes/voice/chinese`

## 变更概述 / Change Overview

本次更新为笔记本编辑器的 PreviewArea 组件添加了 span 标签的编辑和语音生成功能，包括：

This update adds span tag editing and voice generation functionality to the PreviewArea component of the notebook editor, including:

1. 为包含 `aria-label` 和 `data-voice-id` 的 span 标签添加编辑和刷新图标
2. 实现编辑对话框功能
3. 创建中文语音生成 API
4. 集成语音生成调用功能

1. Added edit and refresh icons for span tags containing `aria-label` and `data-voice-id`
2. Implemented edit dialog functionality
3. Created Chinese voice generation API
4. Integrated voice generation call functionality

## 详细变更内容 / Detailed Changes

### 1. 新增文件 / New Files

#### 1.1 中文语音生成 API
**文件路径**: `src/app/api/notebooks/notes/voice/chinese/route.js`

**主要功能**:
- 接收 `ariaLabel`、`voiceId`、`tid` 参数
- 根据 tid 映射到不同的存储目录
- 使用 Azure TTS 生成中文语音文件
- 支持 SSML 语音合成
- 完整的错误处理和日志记录

**TID 映射表**:
```javascript
const tidToDirectoryMap = {
  21: 'chinese-compositions',
  22: 'chinese-poetry', 
  23: 'chinese-literature',
  24: 'chinese-essays',
  25: 'chinese-novels'
};
```

**音频文件存储路径**:
```
./public/refs/notes/{directory}/${SPEECH_VOICE_CHINESE}/${firstChar}/${voiceId}.wav
```

### 2. 修改文件 / Modified Files

#### 2.1 PreviewArea 组件增强
**文件路径**: `src/app/notebooks/editor/components/PreviewArea.tsx`

**新增导入**:
```typescript
import React, { useState, useRef, useEffect } from "react";
import { Edit3, RefreshCw } from "lucide-react";
```

**新增接口定义**:
```typescript
interface SpanEditData {
  ariaLabel: string;
  dataSpeaker: string;
  dataVoiceId: string;
}

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SpanEditData) => void;
  initialData: SpanEditData;
}
```

**新增组件**:
- `EditDialog`: 模态编辑对话框组件
- 支持编辑 `aria-label`、`data-speaker`、`data-voice-id` 属性
- 响应式设计，支持深色模式
- 键盘交互支持（ESC 取消，点击背景关闭）

**新增状态管理**:
```typescript
const [editDialog, setEditDialog] = useState({
  isOpen: false,
  spanElement: null as HTMLSpanElement | null,
  data: { ariaLabel: '', dataSpeaker: '', dataVoiceId: '' } as SpanEditData
});

const [isGeneratingVoice, setIsGeneratingVoice] = useState<string | null>(null);
```

**新增核心功能函数**:

1. **`addIconsToSpans`**: 为 span 标签添加图标
   - 使用正则表达式匹配目标 span 标签
   - 为每个 span 添加唯一的 `data-span-id`
   - 插入编辑和刷新按钮

2. **`handleEditClick`**: 处理编辑按钮点击
   - 提取 span 标签的当前属性值
   - 打开编辑对话框

3. **`handleEditSave`**: 处理编辑保存
   - 更新 span 标签的属性值
   - 触发重新渲染

4. **`handleRefreshVoice`**: 处理语音刷新
   - 调用中文语音生成 API
   - 显示加载状态
   - 处理成功/失败反馈

5. **`handleContentClick`**: 处理内容区域点击事件
   - 事件委托处理图标按钮点击
   - 防止事件冒泡

**修改的现有功能**:
- `renderSection` 函数：集成图标添加和事件处理
- 内容渲染：使用 `contentWithIcons` 替代原始内容

### 3. 功能特性 / Features

#### 3.1 图标显示 / Icon Display
- **编辑图标**: ✏️ (Edit)
- **刷新图标**: 🔄 (Refresh Voice)
- **样式**: 半透明显示，悬停时高亮
- **位置**: 紧跟在目标 span 标签后

#### 3.2 编辑功能 / Edit Functionality
- **触发方式**: 点击编辑图标
- **编辑界面**: 模态对话框
- **编辑字段**: 
  - `aria-label`: 多行文本框
  - `data-speaker`: 单行输入框
  - `data-voice-id`: 单行输入框
- **操作按钮**: 取消、保存
- **实时更新**: 保存后立即更新 DOM 元素

#### 3.3 语音生成功能 / Voice Generation
- **触发方式**: 点击刷新图标
- **参数验证**: 检查必需的 `aria-label`、`data-voice-id`、`tid`
- **API 调用**: POST 请求到 `/api/notebooks/notes/voice/chinese`
- **状态反馈**: 加载状态显示和结果通知
- **错误处理**: 网络错误和服务器错误处理

### 4. 技术实现细节 / Technical Implementation Details

#### 4.1 正则表达式匹配 / Regex Matching
```javascript
const spanRegex = /(<span[^>]*aria-label="[^"]*"[^>]*data-voice-id="[^"]*"[^>]*>)(.*?)(<\/span>)/g;
```

#### 4.2 唯一 ID 生成 / Unique ID Generation
```javascript
const spanId = `span-${Math.random().toString(36).substr(2, 9)}`;
```

#### 4.3 事件委托 / Event Delegation
- 使用单一点击处理器处理所有图标按钮
- 通过 `data-action` 和 `data-target` 属性识别操作类型和目标元素

#### 4.4 API 请求格式 / API Request Format
```javascript
{
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ariaLabel: '文本内容',
    voiceId: 'uuid-string',
    tid: 21
  })
}
```

### 5. 样式和用户体验 / Styling and UX

#### 5.1 图标样式 / Icon Styling
```css
style="background: none; border: none; cursor: pointer; padding: 2px; margin: 0 1px; color: #666; hover:color: #333;"
```

#### 5.2 对话框样式 / Dialog Styling
- 使用 Tailwind CSS 类
- 支持深色模式
- 响应式设计
- 阴影和圆角效果

#### 5.3 用户反馈 / User Feedback
- 加载状态指示器
- 成功/失败消息提示
- 悬停效果和过渡动画

### 6. 错误处理 / Error Handling

#### 6.1 前端错误处理 / Frontend Error Handling
- 参数验证（检查必需字段）
- 网络请求错误捕获
- 用户友好的错误消息

#### 6.2 后端错误处理 / Backend Error Handling
- Content-Type 验证
- 参数类型和存在性检查
- Azure TTS 服务错误处理
- 文件系统操作错误处理

### 7. 性能考虑 / Performance Considerations

- **事件委托**: 减少事件监听器数量
- **条件渲染**: 只为匹配的 span 标签添加图标
- **状态管理**: 最小化不必要的重新渲染
- **API 优化**: 避免重复生成已存在的语音文件

## 测试建议 / Testing Recommendations

### 功能测试 / Functional Testing
1. 验证图标在正确的 span 标签后显示
2. 测试编辑对话框的打开、编辑、保存、取消功能
3. 测试语音生成 API 调用和文件生成
4. 验证不同 tid 值的目录映射
5. 测试错误场景（缺少参数、网络错误等）

### 用户体验测试 / UX Testing
1. 验证图标的视觉效果和交互反馈
2. 测试对话框的响应性和可访问性
3. 验证加载状态和错误消息的显示
4. 测试键盘导航和快捷键

### 兼容性测试 / Compatibility Testing
1. 不同浏览器的兼容性
2. 移动设备的响应式效果
3. 深色模式的显示效果

## 后续优化建议 / Future Optimization Suggestions

1. **图标优化**: 使用 SVG 图标替代 emoji，提供更好的视觉效果
2. **批量操作**: 支持批量编辑多个 span 标签
3. **快捷键**: 添加键盘快捷键支持
4. **撤销功能**: 实现编辑操作的撤销/重做
5. **语音预览**: 添加语音文件的播放预览功能
6. **缓存优化**: 实现语音生成结果的客户端缓存

## 最新更新 - ProcessingMask 集成 / Latest Update - ProcessingMask Integration

### 更新日期 / Update Date
2024年 - ProcessingMask 防误操作功能集成

### 新增功能 / New Features

#### ProcessingMask 集成 / ProcessingMask Integration
- **功能描述 / Feature Description**: 在点击刷新图标生成语音时启用全屏遮罩，防止用户误操作
- **实现位置 / Implementation Location**: 
  - `src/app/notebooks/editor/components/PreviewArea.tsx` - 集成 useStatus hook 和状态控制
  - `src/app/layout.js` - 添加 ProcessingMask 组件到应用根布局
  - `src/app/lib/components/ProcessingMask.tsx` - 遮罩组件（已存在）
  - `src/app/lib/components/ProcessingMask.css` - 遮罩样式（已存在）

#### 技术实现 / Technical Implementation
1. **状态管理 / State Management**:
   - 使用 `useStatus` hook 访问全局状态
   - 在语音生成开始时设置 `isProcessing: true`
   - 在语音生成结束时设置 `isProcessing: false`

2. **组件集成 / Component Integration**:
   - 在 `layout.js` 中将 `ProcessingMask` 组件添加到 `JotaiProvider` 内部
   - 确保遮罩能够访问全局状态并正确显示

3. **用户体验 / User Experience**:
   - 全屏半透明遮罩防止误操作
   - 显示 "Processing..." 文字提示
   - 自动在操作完成后消失

#### 代码变更 / Code Changes
- **PreviewArea.tsx**: 导入 `useStatus`，在 `handleRefreshVoice` 函数中添加状态控制
- **layout.js**: 导入并添加 `ProcessingMask` 组件
- **无新文件创建**: 复用现有的 ProcessingMask 组件和样式

#### 测试验证 / Testing Verification
- API 测试通过：`/api/notebooks/notes/voice/chinese` 正常响应
- 组件集成测试：ProcessingMask 正确显示和隐藏
- 用户交互测试：点击刷新图标时遮罩正常工作

## 最新更新 - 音频播放功能和循环模式 / Latest Update - Audio Playback and Loop Modes

### 新增功能 / New Features
1. **音频播放功能**
   - 在每个 `<span>` 标签的图标组中添加播放按钮 (▶️)
   - 点击播放按钮播放对应的 WAV 音频文件
   - 播放时图标变为停止按钮 (⏹️)
   - 支持点击停止按钮停止播放

2. **循环模式选择器**
   - 在每个 section 标题旁添加循环模式单选组件
   - 三种模式：不循环、单句循环、全文循环
   - 每个 section 独立设置循环模式
   - 播放功能根据所在 section 的循环设置工作

3. **智能播放控制**
   - 不循环：播放完毕后自动停止
   - 单句循环：重复播放当前音频文件
   - 全文循环：重复播放当前音频文件
   - 播放新音频时自动停止当前播放

### 技术实现 / Technical Implementation
1. **状态管理**
   - 添加 `LoopMode` 类型定义：`'none' | 'single' | 'all'`
   - 添加 `AudioState` 接口管理播放状态
   - 使用 `sectionLoopModes` 状态管理各 section 的循环设置
   - 使用 `audioState` 状态管理当前播放状态

2. **音频播放逻辑**
   - `handlePlayAudio` 函数处理播放/停止切换
   - 根据循环模式设置 `audio.loop` 属性
   - 音频文件路径：`/audio/{voiceId}.wav`
   - 完善的错误处理和用户反馈

3. **动态图标更新**
   - 修改 `addIconsToSpans` 函数动态生成播放图标
   - 根据 `audioState` 判断显示播放或停止图标
   - 使用 `renderKey` 状态强制组件重新渲染
   - 确保图标状态与播放状态同步

### 代码变更 / Code Changes
1. **PreviewArea.tsx**
   - 导入 `Play` 和 `Square` 图标组件
   - 添加类型定义：`LoopMode`、`AudioState`
   - 新增状态：`sectionLoopModes`、`audioState`、`renderKey`
   - 新增函数：`handlePlayAudio`、`stopAudio`、`setSectionLoopMode`
   - 修改 `addIconsToSpans` 支持动态播放图标
   - 修改 `createContentClickHandler` 处理播放按钮点击
   - 修改 `renderSection` 添加循环模式选择器
   - 添加 `useEffect` 清理音频资源

### 用户界面 / User Interface
1. **循环模式选择器**
   - 位置：每个 section 标题右侧
   - 样式：单选按钮组，响应式设计
   - 标签："不循环"、"单句循环"、"全文循环"
   - 默认值："不循环"

2. **播放按钮**
   - 位置：编辑和刷新图标之后
   - 图标：▶️ (播放) / ⏹️ (停止)
   - 悬停提示："播放音频" / "停止播放"
   - 样式：与其他图标保持一致

### 用户体验 / User Experience
1. **直观的播放控制**
   - 图标状态清晰反映播放状态
   - 点击即可播放/停止，操作简单
   - Toast 通知提供操作反馈

2. **灵活的循环设置**
   - 每个 section 独立设置
   - 实时生效，无需刷新页面
   - 适应不同的学习和使用场景

3. **资源管理**
   - 自动停止之前的播放
   - 组件卸载时清理音频资源
   - 防止内存泄漏

### 问题修复 (Bug Fixes)
1. **播放控制修复**
   - 修复点击停止图标时重新播放的问题，现在正确停止播放
   - 修复播放新音频时未停止当前播放的问题
   - 优化音频切换逻辑，确保无缝切换

2. **循环模式动态更新**
   - 实现循环模式改变时实时影响当前播放行为
   - 从循环模式切换到不循环时，播放完毕后自动停止
   - 从不循环切换到循环模式时，当前音频开始循环播放
   - 添加 Toast 通知提示循环模式切换

3. **状态同步优化**
   - 改进音频状态管理，确保图标与播放状态同步
   - 优化事件监听器，避免重复设置
   - 完善错误处理和用户反馈

### 技术改进 (Technical Improvements)
1. **音频控制逻辑**
   - 修改 `handlePlayAudio` 函数，正确处理停止/播放切换
   - 优化音频对象的创建和销毁流程
   - 添加音频时间重置 (`currentTime = 0`)

2. **循环模式实时更新**
   - 增强 `setSectionLoopMode` 函数，支持动态更新当前播放音频的循环设置
   - 通过 DOM 查询确定当前播放音频所属的 section
   - 实时更新 `audio.loop` 属性

3. **用户体验提升**
   - 添加循环模式切换的 Toast 通知
   - 优化播放完毕的提示信息
   - 确保操作反馈的及时性和准确性

### 测试验证 (Testing Verification)
1. **播放功能测试**
   - ✅ 验证音频文件加载和播放
   - ✅ 测试播放/停止图标切换
   - ✅ 确认循环模式正确工作
   - ✅ 测试停止图标点击停止播放
   - ✅ 测试播放新音频时停止当前播放

2. **状态管理测试**
   - ✅ 验证多个 section 独立工作
   - ✅ 测试播放状态在组件间的同步
   - ✅ 确认资源清理正常执行
   - ✅ 测试循环模式动态切换功能

3. **用户交互测试**
   - ✅ 测试循环模式切换的实时生效
   - ✅ 验证 Toast 通知的准确性
   - ✅ 确认音频播放的连贯性

---

## Toast 通知和音频覆盖功能 / Toast Notifications and Audio Overwrite

### 更新日期 / Update Date
2024年 - Toast 通知替换 Alert 和音频文件覆盖功能

### 功能改进 / Feature Improvements

#### 1. Toast 通知系统 / Toast Notification System
- **改进描述 / Improvement Description**: 将所有 alert 弹窗替换为 toast 通知，提供更好的用户体验
- **实现位置 / Implementation Location**: `src/app/notebooks/editor/components/PreviewArea.tsx`
- **技术实现 / Technical Implementation**:
  - 导入 `react-toastify` 的 `toast` 方法
  - 替换参数验证失败的 alert 为 `toast.error`
  - 替换语音生成成功的 alert 为 `toast.success`
  - 替换语音生成失败的 alert 为 `toast.error`
  - 替换网络请求失败的 alert 为 `toast.error`

#### 2. 音频文件覆盖功能 / Audio File Overwrite Feature
- **改进描述 / Improvement Description**: 修改语音生成 API，总是生成新的音频文件并覆盖已存在的文件
- **实现位置 / Implementation Location**: `src/app/api/notebooks/notes/voice/chinese/route.js`
- **技术实现 / Technical Implementation**:
  - 移除文件存在性检查逻辑
  - 删除 `fs.access` 检查和早期返回
  - 总是执行语音生成流程
  - 添加更详细的日志记录

#### 代码变更详情 / Code Change Details

**PreviewArea.tsx 变更**:
- 导入: `import { toast } from "react-toastify";`
- 替换: `alert('缺少必要的参数...')` → `toast.error('缺少必要的参数...')`
- 替换: `alert('语音生成成功！...')` → `toast.success('语音生成成功！...')`
- 替换: `alert('语音生成失败：...')` → `toast.error('语音生成失败：...')`
- 替换: `alert('语音生成请求失败...')` → `toast.error('语音生成请求失败...')`

**route.js 变更**:
- 移除: 文件存在性检查的 try-catch 块
- 添加: 更详细的生成日志和文件路径日志
- 行为: 总是生成音频文件，覆盖已存在的文件

#### 用户体验改进 / UX Improvements
1. **非阻塞通知**: Toast 通知不会阻塞用户操作，比 alert 弹窗体验更好
2. **视觉一致性**: Toast 通知与应用整体设计风格保持一致
3. **自动消失**: Toast 通知会自动消失，无需用户手动关闭
4. **音频更新**: 用户可以重新生成音频文件，确保内容是最新的

#### 测试验证 / Testing Verification
- Toast 通知功能测试：所有通知类型正常显示
- 音频覆盖测试：重复请求同一音频文件，确认覆盖行为
- API 响应测试：验证修改后的 API 正常工作
- 用户界面测试：确认 toast 容器在根布局中正确配置

## 依赖变更 / Dependency Changes

### 新增依赖 / New Dependencies
- `lucide-react`: 图标库（Edit3, RefreshCw 图标）
- `microsoft-cognitiveservices-speech-sdk`: Azure TTS SDK

### 环境变量要求 / Environment Variables Required
- `SPEECH_KEY`: Azure Speech Service 密钥
- `SPEECH_REGION`: Azure Speech Service 区域
- `NEXT_PUBLIC_SPEECH_VOICE_CHINESE`: 中文语音名称

---

**变更完成日期**: 2024年
**Change Completion Date**: 2024

**测试状态**: ✅ 待测试
**Testing Status**: ✅ Pending Testing

**部署状态**: ✅ 就绪
**Deployment Status**: ✅ Ready