# 笔记列表页面需求文档

## 基本信息
- **路径**: `src/app/notebooks/notes/list/[tid]`
- **功能**: 根据传入的 `tid` 参数生成笔记列表页面
- **现有 API**: `src/app/api/notebooks/notes/list/[tid]/route.js`
- **数据源**: `notebooks_notes_summary` 视图

## 核心功能需求

### 1. 字段过滤器 (Field Filter)
- **默认显示字段**: `body_script`
- **可选字段列表**:
  - `body` - 正文内容
  - `question` - 问题
  - `answer` - 答案
  - `body_script` - 脚本化正文（默认）
  - `note` - 笔记
  - `note_extra` - 额外笔记
- **交互方式**: 下拉选择器或单选按钮组
- **功能**: 用户选择字段后，列表显示对应字段的内容

### 2. 音频播放功能
- **播放按钮组**: 包含播放/暂停、上一句、下一句等控制按钮
- **播放逻辑参考**: `src/app/notebooks/editor/components/PreviewArea.tsx`
- **音频来源**: 从选中字段的 HTML span 元素中提取 voice-id，播放对应音频文件

### 3. 播放循环选项
- **无循环**: 播放完当前音频后停止
- **单句循环**: 重复播放当前选中的 span 音频
- **Note 循环**: 循环播放当前 note 中选中字段的所有 span 音频
- **全部循环**: 循环播放列表中所有 note 的选中字段音频

## 数据结构

### notebooks_notes_summary 视图字段
```sql
- type, type_sub (笔记本类型)
- notebook_title, notebook_title_sub (笔记本标题)
- topics, topics_ids (主题信息)
- pid, id, nbid, tid (ID 字段)
- title (标题)
- body, question, answer (基础内容字段)
- choise_a 到 choise_k (选择题选项)
- weight, created, updated, deleted (元数据)
- figures (图片)
- body_script, body_extra (脚本化内容)
- note, note_extra (笔记内容)
```

## 技术实现要点

### 1. 页面结构
- 使用 Next.js 15 App Router
- 动态路由 `[tid]` 参数处理
- TypeScript + React Server Components

### 2. 状态管理
- 当前选中字段状态
- 播放状态（播放中、暂停、停止）
- 循环模式状态
- 当前播放的 note 和 span 索引

### 3. 音频处理
- 从 HTML span 元素解析 voice-id
- 音频文件路径构建
- 播放队列管理
- 循环逻辑实现

### 4. UI 组件
- 字段选择器组件
- 笔记列表组件
- 音频播放控制组件
- 循环模式选择组件

## 用户交互流程

1. 用户访问 `/notebooks/notes/list/[tid]` 页面
2. 页面加载对应 tid 的笔记列表，默认显示 `body_script` 字段
3. 用户可通过字段过滤器切换显示不同字段内容
4. 用户点击播放按钮开始播放当前 note 的选中字段音频
5. 用户可选择不同的循环模式控制播放行为
6. 播放控制按钮支持暂停、上一句、下一句等操作

## 参考文件
- `src/app/notebooks/editor/components/PreviewArea.tsx` - 播放和循环逻辑参考
- `src/app/api/notebooks/notes/list/[tid]/route.js` - 数据获取 API

## 实现状态

### ✅ 已完成功能

#### 1. 页面基础结构
- ✅ Next.js 15 App Router 动态路由 `[tid]` 实现
- ✅ TypeScript 类型定义完整
- ✅ 响应式布局设计
- ✅ 深色模式支持

#### 2. 数据获取与显示
- ✅ 从 API 获取笔记列表数据
- ✅ 加载状态和错误处理
- ✅ 笔记元信息显示（ID、权重、创建时间等）

#### 3. 字段过滤器
- ✅ 6个可选字段的下拉选择器
- ✅ 默认显示 `body_script` 字段
- ✅ 动态切换显示内容
- ✅ 支持的字段：body、question、answer、body_script、note、note_extra

#### 4. 音频播放功能
- ✅ 从 HTML span 元素提取 voice-id
- ✅ 音频文件路径构建（基于 tid 映射）
- ✅ 播放/暂停控制
- ✅ 上一句/下一句导航
- ✅ 音频播放状态管理
- ✅ 播放图标显示（🔊/🔇）
- ✅ 点击 span 元素播放对应音频

#### 5. 循环模式实现
- ✅ 无循环：播放完当前音频后停止
- ✅ 单句循环：重复播放当前选中的 span 音频
- ✅ Note 循环：循环播放当前 note 中选中字段的所有 span 音频
- ✅ 全部循环：循环播放列表中所有 note 的选中字段音频
- ✅ 循环模式单选按钮组

#### 6. 用户界面
- ✅ MathJax 数学公式渲染支持
- ✅ 控制面板布局（字段选择器 + 播放控制 + 循环选项）
- ✅ 笔记卡片式布局
- ✅ 当前播放笔记高亮显示
- ✅ Toast 消息提示
- ✅ 响应式设计

#### 7. 技术特性
- ✅ 音频资源自动清理
- ✅ 事件监听器管理
- ✅ 错误处理和用户反馈
- ✅ 性能优化（强制重渲染控制）
- ✅ 全局播放函数注册

### 🎯 核心功能流程

1. **页面加载**：解析 tid 参数 → 调用 API 获取笔记数据 → 渲染列表
2. **字段切换**：选择字段 → 更新显示内容 → 重新渲染播放图标
3. **音频播放**：点击播放按钮或 span → 构建音频路径 → 播放音频 → 更新状态
4. **循环控制**：音频结束 → 检查循环模式 → 执行对应循环逻辑
5. **导航控制**：上一句/下一句 → 计算目标位置 → 播放对应音频

### 📋 待优化项目

- [ ] 批量语音生成功能（可选）
- [ ] 播放进度条显示（可选）
- [ ] 键盘快捷键支持（可选）
- [ ] 播放历史记录（可选）