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