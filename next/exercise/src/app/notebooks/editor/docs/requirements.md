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
  nbid?: number; // 笔记本 ID / Notebook ID
  tid?: number; // 类型 ID / Type ID
  title?: string; // 标题 / Title
  body?: string; // 主体内容 / Body content
  question?: string; // 问题 / Question
  answer?: string; // 答案 / Answer
  figures?: string; // 图表 / Figures
  body_script?: string; // 主体脚本 / Body script
  body_extra?: string; // 额外主体内容 / Extra body content
  note?: string; // 笔记 / Note
  note_extra?: string; // 额外笔记 / Extra note
  deleted?: boolean; // 删除标记 / Deletion flag
  created?: string; // 创建时间 / Creation time
  weight?: string; // 权重 / Weight
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

# 笔记本编辑功能需求文档

## 概述

本文档描述了笔记本编辑功能的详细需求，包括前端界面、API 接口和数据库操作等方面。

## 功能需求

### 1. 整体布局

- **界面分布**: 左右两列布局
  - 左侧：编辑区域
  - 右侧：预览区域
- **响应式设计**: 使用 Tailwind CSS 实现移动端适配
- **UI 组件**: 基于 Shadcn UI 组件库

### 2. 左侧编辑区域

#### 2.1 顶部 ID 输入区

- **ID 输入框**: 用户可输入记录 ID
- **获取按钮**: 点击后从 `notebooks_notes` 表获取对应记录
- **错误处理**: 记录不存在时使用 toast 通知用户

#### 2.2 表单字段（从上到下排列）

1. **nbid 字段**

   - 组件类型: Combobox
   - 数据源: `notebooks` 表
   - 显示: notebook 名称和 ID

2. **tid 字段**

   - 组件类型: Combobox
   - 数据源: `notebooks_types` 表
   - 显示: type 名称和 ID

3. **HTML 内容字段** (使用自定义 HTMLArea 组件)

   - `body`: 主体内容
   - `question`: 问题内容
   - `answer`: 答案内容
   - `figures`: 图片内容
   - `body_script`: 脚本内容
   - `body_extra`: 额外主体内容
   - `note`: 笔记内容
   - `note_extra`: 额外笔记内容

4. **deleted 字段**

   - 组件类型: Switch
   - 默认值: false

5. **只读字段**
   - `created`: 创建时间（新建时自动生成）
   - `weight`: 权重值（新建时自动生成）

#### 2.3 底部操作区

- **保存按钮**:
  - 有 ID 时：更新现有记录
  - 无 ID 时：创建新记录
  - 保存成功后刷新预览区

### 3. 右侧预览区域

- **MathJax 集成**: 支持数学公式渲染
- **HTML 渲染**: 实时预览编辑内容
- **配置参考**: 使用 `./code-starter-kit/next/exercise/src/app/lib/components/HTMLArea.tsx#L32-51` 的 MathJax 配置

### 4. API 接口需求

#### 4.1 基础路径

- API 路径: `./code-starter-kit/next/exercise/src/app/api/notebooks/editor`

#### 4.2 接口列表

1. **GET /api/notebooks/editor/[id]**

   - 功能: 根据 ID 获取笔记记录
   - 参数: id (路径参数)
   - 返回: 完整的笔记记录数据

2. **POST /api/notebooks/editor**

   - 功能: 创建新笔记记录
   - 参数: 笔记数据（body）
   - 自动生成: `created` 时间戳, `weight` 值

3. **PUT /api/notebooks/editor/[id]**

   - 功能: 更新现有笔记记录
   - 参数: id (路径参数) + 笔记数据（body）

4. **GET /api/notebooks/editor/options/notebooks**

   - 功能: 获取 notebooks 表数据用于 Combobox
   - 返回: notebooks 列表

5. **GET /api/notebooks/editor/options/types**
   - 功能: 获取 notebooks_types 表数据用于 Combobox
   - 返回: types 列表

### 5. 数据库操作

#### 5.1 主表: notebooks_notes

- **字段列表**:
  - `id`: 主键
  - `nbid`: 外键关联 notebooks 表
  - `tid`: 外键关联 notebooks_types 表
  - `body`: 主体内容
  - `question`: 问题内容
  - `answer`: 答案内容
  - `figures`: 图片内容
  - `body_script`: 脚本内容
  - `body_extra`: 额外主体内容
  - `note`: 笔记内容
  - `note_extra`: 额外笔记内容
  - `deleted`: 删除标记
  - `created`: 创建时间
  - `weight`: 权重值

#### 5.2 Weight 字段生成逻辑

- **参考实现**: `./code-starter-kit/next/exercise/src/app/api/notebook/words/english/route.js#L32-43`
- **生成规则**:
  1. 查询同 nbid 下的最大 weight 值
  2. 使用 LexoRank 算法生成下一个权重值
  3. 确保权重值的唯一性和排序性

### 6. 技术栈

- **前端框架**: Next.js 15 + App Router
- **UI 组件**: Shadcn UI + Radix
- **样式**: Tailwind CSS
- **数学公式**: MathJax (better-react-mathjax)
- **代码编辑**: HTMLArea 自定义组件
- **状态管理**: React useState/useEffect
- **数据获取**: fetch API
- **通知**: Toast 组件

### 7. 用户体验

- **实时预览**: 编辑内容实时在右侧预览
- **错误处理**: 友好的错误提示和 Toast 通知
- **加载状态**: 数据获取时显示加载状态
- **表单验证**: 必填字段验证
- **响应式**: 移动端友好的界面设计

### 8. 安全考虑

- **输入验证**: 服务端验证所有输入数据
- **SQL 注入防护**: 使用参数化查询
- **XSS 防护**: HTML 内容适当转义
- **权限控制**: 确保用户只能操作授权的数据

## 实现优先级

1. **Phase 1**: 基础 CRUD API 接口
2. **Phase 2**: 前端编辑界面和表单
3. **Phase 3**: 预览功能和 MathJax 集成
4. **Phase 4**: 用户体验优化和错误处理
5. **Phase 5**: 响应式设计和移动端适配

## 验收标准

- [ ] 能够通过 ID 获取和显示现有笔记
- [ ] 能够创建新的笔记记录
- [ ] 能够更新现有笔记记录
- [ ] Combobox 正确显示 notebooks 和 types 数据
- [ ] HTMLArea 组件正常工作
- [ ] 预览区正确渲染 HTML 和数学公式
- [ ] Weight 字段按 LexoRank 算法正确生成
- [ ] 错误情况有适当的用户提示
- [ ] 界面响应式且用户友好
