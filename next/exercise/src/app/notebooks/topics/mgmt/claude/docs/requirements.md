# Claude Topics 编辑器需求文档

## 项目概述
在 `src/app/notebooks/topics/mgmt/claude` 目录下创建一个支持层级的 topics 编辑器。

## 数据库表结构

### notebooks_topics 表
```sql
CREATE TABLE notebooks_topics (
  pid bigint(20) DEFAULT 0,
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(512) DEFAULT NULL,
  type_id bigint(20) DEFAULT 0 COMMENT 'redundant info',
  note varchar(4096) DEFAULT NULL,
  note_extra text DEFAULT NULL,
  weight varchar(64) DEFAULT NULL
)
```

### notebooks_types 表
```sql
CREATE TABLE `notebooks_types` (
  `pid` bigint(20) NOT NULL DEFAULT 0 COMMENT 'Parent Type ID from this Table',
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(512) DEFAULT NULL,
  `title_sub` varchar(512) DEFAULT NULL
)
```

## 字段说明
- **pid**: 父 topic 的 ID，用于构建层级关系
- **weight**: 表示排列顺序，用于同级 topic 的排序
- **type_id**: 关联 notebooks_types 表的 ID

## API 接口

### 获取 Types 列表
- **路径**: `src/app/api/notebooks/types/list/route.js`
- **方法**: GET
- **返回**: types 列表数据

### Topics 管理 API
- **基础路径**: `src/app/api/notebooks/topics/claude`
- **需要实现的接口**:
  - GET: 获取所有 topics（支持 type_id 过滤）
  - POST: 创建新 topic
  - PUT: 更新 topic
  - DELETE: 删除 topic
  - POST /updatePositions: 批量更新位置和层级

## 界面布局

### 整体布局
- **左右布局**: 左边显示区，右边操作区
- **响应式设计**: 支持移动端适配

### 左侧显示区
- **层级显示**: 使用 topic 的 title 字段层级显示所有 topic
- **选中状态**: 可以选中已有的 topic 为当前 topic
- **拖拽功能**: 
  - 可以拖动子 topic 到其他 topic 下
  - 可以拖动调整 topic 的顺序
  - topic 调整时连同子 topic 一起调整
- **视觉反馈**: 当前选中的 topic 高亮显示

### 右侧操作区
- **Type Filter**: 可以选择不同的 type，过滤 topic 显示
- **编辑功能**: 
  - 编辑当前 topic 的 title
  - 编辑当前 topic 的 note
  - 选择 type_id
- **操作按钮**:
  - 保存按钮：保存当前编辑的内容
  - 取消按钮：取消当前编辑，恢复之前状态
- **新建功能**:
  - 在当前 topic 之前创建新 topic
  - 在当前 topic 之后创建新 topic
  - 在当前 topic 之下创建新 topic（作为子 topic）
  - 没有 topic 选中时可在最前位置新增 topic

## 功能特性

### 新建 Topic 流程
1. 点击新建按钮后，新的 topic 变成当前 topic
2. 新建时不用保存到数据库，只在前端临时创建
3. 点击保存按钮后，连同位置信息、type_id 保存到数据库
4. 点击取消按钮的话，忽略刚刚新建的 topic，恢复之前的当前 topic

### 拖拽功能
- **技术实现**: 使用 `@atlaskit/pragmatic-drag-and-drop`
- **拖拽规则**:
  - 支持层级调整
  - 支持顺序调整
  - 拖拽时连同子 topic 一起移动
- **视觉反馈**: 拖拽过程中显示放置区域提示

### 通知系统
- **成功通知**: 操作成功时显示 toast 通知
- **失败通知**: 操作失败时显示错误 toast 通知
- **加载状态**: 显示加载指示器

### 调试功能
- **Console Log**: 添加必要的调试日志
- **错误处理**: 完善的错误捕获和处理
- **状态追踪**: 关键状态变化的日志记录

## 技术要求

### 前端技术栈
- **框架**: Next.js 15 + App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS + Shadcn UI
- **拖拽**: @atlaskit/pragmatic-drag-and-drop
- **状态管理**: React useState + useEffect
- **通知**: Toast 组件

### 后端技术栈
- **ORM**: Prisma
- **数据库**: MySQL
- **API**: Next.js API Routes

### 代码规范
- **类型安全**: 完整的 TypeScript 类型定义
- **错误处理**: 完善的错误捕获和用户提示
- **注释**: 中英文双语注释
- **调试**: 保留调试代码和日志

## 实现计划

### 第一阶段：基础结构
1. 创建目录结构
2. 实现 API 接口
3. 创建基础页面组件
4. 实现数据获取和显示

### 第二阶段：核心功能
1. 实现层级显示
2. 实现选中和编辑功能
3. 实现新建 topic 功能
4. 实现保存和取消功能

### 第三阶段：高级功能
1. 实现拖拽功能
2. 实现 type 过滤
3. 完善通知系统
4. 添加调试日志

### 第四阶段：优化完善
1. 性能优化
2. 响应式适配
3. 错误处理完善
4. 用户体验优化