# Notebook Editor Requirements

## 项目概述 / Project Overview

笔记本编辑器是一个基于 Next.js 15 和 TypeScript 的 Web 应用程序，用于创建、编辑和管理笔记。

The Notebook Editor is a web application built with Next.js 15 and TypeScript for creating, editing, and managing notes.

## 核心功能 / Core Features

### 1. 笔记管理 / Note Management
- 创建新笔记 / Create new notes
- 编辑现有笔记 / Edit existing notes  
- 通过 ID 加载笔记 / Load notes by ID
- 保存笔记（支持 Cmd+S/Ctrl+S 快捷键）/ Save notes (supports Cmd+S/Ctrl+S shortcuts)

### 2. 笔记本分类 / Notebook Categorization
- 笔记本选择下拉框 / Notebook selection dropdown
- 类型选择下拉框 / Type selection dropdown
- 动态加载选项数据 / Dynamic loading of option data

### 3. 内容编辑 / Content Editing
- 标题编辑 / Title editing
- HTML 内容编辑器 / HTML content editor
- 问题和答案字段 / Question and answer fields
- 图表字段 / Figures field
- 脚本和额外内容字段 / Script and extra content fields
- 笔记和额外笔记字段 / Note and extra note fields

### 4. 预览功能 / Preview Feature
- 实时预览编辑内容 / Real-time preview of edited content
- 支持 HTML 渲染 / Support for HTML rendering

### 5. 用户界面 / User Interface
- 响应式设计（移动端优先）/ Responsive design (mobile-first)
- 深色/浅色主题切换 / Dark/light theme toggle
- 加载状态指示器 / Loading state indicators
- 保存状态指示器 / Save state indicators
- 处理遮罩层 / Processing mask overlay

## 技术栈 / Technology Stack

### 前端 / Frontend
- **框架**: Next.js 15 with App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI 组件**: Shadcn UI, Radix
- **状态管理**: Jotai (原子状态管理)
- **通知**: React Toastify

### 后端 API / Backend API
- **笔记本选项**: `/api/notebooks/editor/options/notebooks`
- **类型选项**: `/api/notebooks/editor/options/types`
- **获取笔记**: `/api/notebooks/editor/{id}`
- **创建笔记**: `POST /api/notebooks/editor`
- **更新笔记**: `PUT /api/notebooks/editor/{id}`

## 数据结构 / Data Structures

### NoteData Interface
```typescript
interface NoteData {
  id?: number;
  nbid?: number;        // 笔记本 ID / Notebook ID
  tid?: number;         // 类型 ID / Type ID
  title?: string;       // 标题 / Title
  body?: string;        // 主体内容 / Body content
  question?: string;    // 问题 / Question
  answer?: string;      // 答案 / Answer
  figures?: string;     // 图表 / Figures
  body_script?: string; // 主体脚本 / Body script
  body_extra?: string;  // 额外主体内容 / Extra body content
  note?: string;        // 笔记 / Note
  note_extra?: string;  // 额外笔记 / Extra note
  deleted?: boolean;    // 删除标记 / Deletion flag
  created?: string;     // 创建时间 / Creation time
  weight?: string;      // 权重 / Weight
}
```

### NotebookOption Interface
```typescript
interface NotebookOption {
  id: number;
  title: string;
  title_sub: string;
}
```

### TypeOption Interface
```typescript
interface TypeOption {
  id: number;
  title: string;
  title_sub: string;
}
```

## 状态管理 / State Management

使用 Jotai 进行状态管理，主要状态包括：

- `noteId`: 当前笔记 ID
- `noteData`: 笔记数据对象
- `notebooks`: 笔记本选项列表
- `types`: 类型选项列表
- `loading`: 加载状态
- `saving`: 保存状态
- `status`: 全局状态（通过 useStatus hook）

## 用户体验 / User Experience

### 加载状态 / Loading States
- 获取笔记时显示加载指示器
- 保存时显示保存状态
- 处理时显示遮罩层

### 错误处理 / Error Handling
- API 错误通过 toast 通知用户
- 表单验证（如空 ID 检查）
- 网络错误处理

### 键盘快捷键 / Keyboard Shortcuts
- `Cmd+S` / `Ctrl+S`: 保存笔记

## 性能优化 / Performance Optimization

- 使用 React Server Components (RSC)
- 最小化客户端组件使用
- 动态导入非关键组件
- 优化图片加载

## 安全考虑 / Security Considerations

- 输入验证和清理
- XSS 防护
- CSRF 保护
- 安全的 API 端点

## 可访问性 / Accessibility

- 语义化 HTML
- 键盘导航支持
- 屏幕阅读器兼容
- 适当的 ARIA 标签

## 浏览器兼容性 / Browser Compatibility

- 现代浏览器支持（Chrome, Firefox, Safari, Edge）
- 移动端浏览器支持
- 渐进式增强

## 部署要求 / Deployment Requirements

- Node.js 环境
- Next.js 15 兼容的托管平台
- 环境变量配置
- 数据库连接（用于 API 端点）