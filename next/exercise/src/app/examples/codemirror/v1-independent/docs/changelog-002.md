# CodeMirror 6 HTML 编辑器 - 追加功能实现 - 变更日志 002

## 任务概述
基于 changelog-001.md 的基础功能，实现以下追加功能：
1. 工具栏滚动置顶功能
2. 编辑器与预览区滚动同步

## 技术实现

### 1. 工具栏置顶功能
**实现原理：**
- 使用 `useRef` 获取工具栏 DOM 引用
- 监听 `window.scroll` 事件
- 通过 `getBoundingClientRect().top` 判断工具栏是否超出可视区域
- 动态切换 CSS 类实现 `fixed` 定位

**关键代码：**
```typescript
// 工具栏置顶效果监听
useEffect(() => {
  const handleScroll = () => {
    if (toolbarRef.current) {
      const toolbarTop = toolbarRef.current.getBoundingClientRect().top
      setIsToolbarSticky(toolbarTop <= 0)
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**UI 优化：**
- 添加占位空间防止内容跳跃
- 置顶时添加阴影效果
- 平滑过渡动画

### 2. 编辑器与预览区滚动同步
**实现原理：**
- 监听 CodeMirror 编辑器的滚动事件
- 计算编辑器滚动比例
- 将滚动比例同步应用到预览区 iframe
- 使用防抖机制避免循环触发

**关键代码：**
```typescript
// 编辑器滚动同步到预览区
const handleEditorScroll = useCallback((scrollTop: number, scrollHeight: number, clientHeight: number) => {
  if (isScrollSyncing || !previewRef.current) return
  
  setIsScrollSyncing(true)
  
  // 计算滚动比例
  const scrollRatio = scrollTop / (scrollHeight - clientHeight)
  
  // 同步到预览区
  try {
    const previewDocument = previewRef.current.contentDocument
    if (previewDocument) {
      const previewBody = previewDocument.body
      const previewScrollHeight = previewBody.scrollHeight
      const previewClientHeight = previewDocument.documentElement.clientHeight
      const targetScrollTop = scrollRatio * (previewScrollHeight - previewClientHeight)
      
      previewDocument.documentElement.scrollTop = Math.max(0, targetScrollTop)
    }
  } catch (error) {
    // 忽略跨域错误
    console.warn('Preview scroll sync failed:', error)
  }
  
  // 防止循环触发
  setTimeout(() => setIsScrollSyncing(false), 100)
}, [isScrollSyncing])
```

**技术难点解决：**
- iframe 跨域访问处理
- 滚动事件的性能优化
- 防止滚动同步循环触发

## 新增功能特性

### 🔝 工具栏置顶
- **智能置顶**：滚动超出可视范围时自动置顶
- **平滑过渡**：200ms 过渡动画
- **视觉反馈**：置顶时添加阴影效果
- **布局稳定**：占位空间防止内容跳跃
- **响应式**：全宽度适配

### 🔄 滚动同步
- **实时同步**：编辑器滚动实时同步到预览区
- **比例计算**：基于滚动比例的精确同步
- **性能优化**：防抖机制避免过度触发
- **错误处理**：跨域访问异常处理
- **用户体验**：便于观察代码修改的实时效果

## 代码变更

### 新增 Hooks 和状态
```typescript
// 引用管理
const toolbarRef = useRef<HTMLDivElement>(null)
const editorRef = useRef<HTMLDivElement>(null)
const previewRef = useRef<HTMLIFrameElement>(null)
const [isToolbarSticky, setIsToolbarSticky] = useState(false)

// 滚动同步状态
const [isScrollSyncing, setIsScrollSyncing] = useState(false)
```

### 修改的组件结构
1. **工具栏组件**：添加 ref 和动态样式
2. **编辑器组件**：包装 div 容器，添加滚动监听
3. **预览组件**：添加 ref 引用
4. **布局调整**：添加占位空间和条件样式

## 用户体验提升

1. **操作便利性**
   - 工具栏始终可见，随时可以插入标签
   - 滚动时无需手动调整预览位置

2. **视觉连贯性**
   - 编辑器和预览区保持同步滚动
   - 便于观察代码修改的即时效果

3. **界面稳定性**
   - 工具栏置顶时无内容跳跃
   - 平滑的过渡动画

## 技术亮点

1. **性能优化**
   - 使用 `useCallback` 优化滚动处理函数
   - 防抖机制避免过度渲染
   - 事件监听器的正确清理

2. **错误处理**
   - iframe 跨域访问的异常捕获
   - 边界条件的安全处理

3. **代码质量**
   - TypeScript 类型安全
   - 清晰的注释说明
   - 模块化的功能实现

## 测试建议

1. **工具栏置顶测试**
   - 滚动页面验证工具栏是否正确置顶
   - 检查置顶时是否有内容跳跃
   - 验证置顶状态下工具栏功能正常

2. **滚动同步测试**
   - 在编辑器中滚动，观察预览区是否同步
   - 测试长内容的滚动同步精度
   - 验证快速滚动时的性能表现

## 后续优化方向

1. **双向同步**：实现预览区滚动同步到编辑器
2. **滚动指示器**：添加滚动位置指示
3. **自定义同步比例**：允许用户调整同步灵敏度
4. **滚动动画**：添加平滑滚动动画效果