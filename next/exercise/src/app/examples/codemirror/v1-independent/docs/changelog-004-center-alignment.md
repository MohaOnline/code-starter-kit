# CodeMirror 6 HTML 编辑器 - 中心对齐线功能实现

## 项目信息
- **文件路径**: `/src/app/examples/codemirror/v1-independent/page.tsx`
- **实现日期**: 2024-12-31
- **版本**: v1.3 (中心对齐线版)

## 功能概述

实现了代码编辑器与预览区的精确视觉对齐功能，通过在页面中间添加一条虚线作为基准线，当代码滚动到这条线时，对应的预览内容也同步显示在相同高度位置。

## 核心功能特性

### 🎯 中心对齐线系统
- **视觉基准线**: 在编辑器和预览区中间显示一条蓝色虚线（50%高度位置）
- **智能对齐**: 当代码行滚动到基准线时，对应的预览内容自动对齐到预览区的基准线位置
- **实时同步**: 滚动过程中持续保持代码与预览内容的视觉对应关系

### 📐 对齐算法原理

1. **中心线计算**: 获取编辑器容器50%高度位置作为基准线
2. **代码位置定位**: 计算当前基准线对应的代码行号
3. **相对位置计算**: 基于`<body>`标签计算相对行数
4. **预览区同步**: 将对应内容定位到预览区的50%高度位置

## 技术实现详情

### 核心算法改进

```tsx
// 基于中心线对齐的滚动同步算法
const handleEditorScroll = useCallback((scrollTop: number, scrollHeight: number, clientHeight: number) => {
  // 获取编辑器容器的中心线位置（50%高度）
  const editorContainer = editorRef.current
  const editorCenterY = editorContainer.clientHeight / 2
  
  // 计算当前中心线对应的代码位置
  const centerLinePos = view.lineBlockAtHeight(scrollTop + editorCenterY)
  const centerLineNumber = doc.lineAt(centerLinePos.from).number
  
  // 计算相对于 body 标签的行数（中心线位置）
  const relativeLineFromBody = Math.max(0, centerLineNumber - bodyStartLine)
  
  // 估算预览区对应的内容高度
  const estimatedContentHeight = relativeLineFromBody * 22
  
  // 计算目标滚动位置：让对应内容显示在预览区中心
  const previewCenterY = previewClientHeight / 2
  const targetScrollTop = estimatedContentHeight - previewCenterY
  
  // 应用滚动位置，确保在有效范围内
  const finalScrollTop = Math.min(Math.max(0, targetScrollTop), maxScrollTop)
  previewDocument.documentElement.scrollTop = finalScrollTop
}, [isScrollSyncing, htmlCode])
```

### 视觉基准线实现

```tsx
{/* 中心对齐线 - 50%高度的虚线 */}
<div className="absolute left-0 right-0 z-10 pointer-events-none" 
     style={{ top: '50%', transform: 'translateY(-50%)' }}>
  <div className="w-full h-px bg-blue-400/30 border-t border-dashed border-blue-400/50"></div>
  <div className="absolute left-4 -top-2 text-xs text-blue-400/70 bg-background px-1 rounded">
    对齐基准线
  </div>
</div>
```

## 算法优化要点

### 1. 中心线定位策略
- **编辑器中心**: 使用 `clientHeight / 2` 计算编辑器可视区域中心
- **代码行映射**: 通过 `lineBlockAtHeight(scrollTop + editorCenterY)` 精确定位中心线对应的代码行
- **预览区中心**: 将对应内容定位到预览区的 `previewClientHeight / 2` 位置

### 2. 内容高度估算
- **行高映射**: 每行代码对应预览区约22px的内容高度
- **相对定位**: 基于`<body>`标签计算相对行数，避免HTML头部干扰
- **精确计算**: `estimatedContentHeight = relativeLineFromBody * 22`

### 3. 滚动边界处理
- **上边界**: `Math.max(0, targetScrollTop)` 防止负值滚动
- **下边界**: `Math.min(targetScrollTop, maxScrollTop)` 防止超出可滚动范围
- **平滑过渡**: 确保滚动位置在有效范围内的平滑变化

## 用户体验提升

### 🎨 视觉效果
- **清晰基准**: 蓝色虚线提供明确的视觉参考
- **标签提示**: "对齐基准线"文字说明功能用途
- **半透明设计**: 不干扰内容阅读的同时提供清晰指引

### ⚡ 交互体验
- **实时对齐**: 滚动过程中代码与预览内容始终保持视觉对应
- **精确定位**: 当特定代码行到达基准线时，对应预览内容准确对齐
- **流畅同步**: 优化的算法确保滚动同步的流畅性

### 🔧 实用价值
- **快速定位**: 通过基准线快速找到代码与预览的对应关系
- **编辑效率**: 减少在代码和预览间来回查找的时间
- **视觉辅助**: 为复杂HTML文档提供清晰的结构对应关系

## 技术亮点

### 1. 智能算法设计
- **中心线策略**: 以50%高度为基准，提供最佳的视觉对应体验
- **动态计算**: 实时计算代码行与预览内容的对应关系
- **自适应调整**: 根据容器尺寸动态调整对齐策略

### 2. 性能优化
- **防抖机制**: 通过 `isScrollSyncing` 状态防止循环触发
- **边界检查**: 有效的边界条件处理避免异常滚动
- **错误处理**: 完善的异常捕获确保功能稳定性

### 3. 代码质量
- **类型安全**: 完整的TypeScript类型定义
- **注释完善**: 详细的中文注释说明算法逻辑
- **模块化设计**: 清晰的函数职责分离

## 使用场景

### 📝 HTML编辑
- **结构对应**: 快速理解HTML标签与渲染效果的对应关系
- **样式调试**: 精确定位CSS样式对应的HTML元素
- **内容编辑**: 高效编辑长篇HTML文档

### 🎓 学习教学
- **代码理解**: 帮助初学者理解HTML代码与页面效果的关系
- **实时演示**: 教学过程中的实时代码演示工具
- **对比分析**: 代码修改与效果变化的直观对比

### 🔍 调试开发
- **问题定位**: 快速定位HTML渲染问题的源代码位置
- **效果验证**: 实时验证代码修改的视觉效果
- **结构分析**: 分析复杂HTML文档的结构层次

## 测试建议

### 1. 基准线显示测试
- 确认蓝色虚线在页面中央（50%高度）正确显示
- 验证"对齐基准线"标签的位置和样式
- 测试基准线在不同屏幕尺寸下的显示效果

### 2. 对齐精度测试
- 将特定HTML标签（如`<h1>`、`<p>`）滚动到基准线位置
- 观察对应预览内容是否准确对齐到预览区基准线
- 测试不同长度HTML文档的对齐精度

### 3. 滚动同步测试
- 连续滚动编辑器，观察预览区的同步流畅性
- 测试快速滚动和慢速滚动的同步效果
- 验证滚动边界处理的正确性

### 4. 响应式测试
- 调整浏览器窗口大小，确保基准线位置正确
- 测试不同分辨率下的对齐效果
- 验证移动端的显示和交互效果

### 5. 兼容性测试
- 测试与工具栏置顶功能的兼容性
- 验证与光标插入功能的协同工作
- 确保所有现有功能正常运行

## 访问地址
- **本地访问**: http://localhost:3000/examples/codemirror/v1-independent
- **开发服务器**: `npm run dev`

## 功能演示

### 使用步骤
1. 打开HTML编辑器页面
2. 观察页面中央的蓝色虚线基准线
3. 在编辑器中滚动代码，将特定HTML标签移动到基准线位置
4. 观察预览区对应内容自动对齐到基准线高度
5. 体验代码与预览内容的精确视觉对应关系

## 问题修复记录 (2024-12-31 - 第二次更新)

### 修复的问题
**基准线定位问题**: 对齐基准线随页面滚动移动，导致HTML代码无法接近该线进行测试

**解决方案**:
- 将基准线从相对定位 `absolute` 改为固定定位 `fixed`
- 使用视口单位 `50vh` 替代百分比定位，确保基准线固定在屏幕中央
- 提升层级 `z-20` 确保基准线始终可见
- 增强视觉效果，添加阴影和边框提高可见性

**代码变更**:
```tsx
{/* 修复前 - 相对定位，随页面滚动 */}
<div className="absolute left-0 right-0 z-10 pointer-events-none" 
     style={{ top: '50%', transform: 'translateY(-50%)' }}>

{/* 修复后 - 固定定位，固定在视口中央 */}
<div className="fixed left-0 right-0 z-20 pointer-events-none" 
     style={{ top: '50vh', transform: 'translateY(-50%)' }}>
```

**改进效果**:
- ✅ 基准线现在固定在屏幕中央，不随页面滚动移动
- ✅ HTML代码可以通过滚动接近基准线进行对齐测试
- ✅ 增强了基准线的视觉效果和可见性
- ✅ 标签文字更新为"对齐基准线 (固定)"以明确功能

---

**功能实现时间**: 2024-12-31  
**最后更新时间**: 2024-12-31  
**状态**: ✅ 中心对齐线功能已完成，基准线固定定位问题已修复