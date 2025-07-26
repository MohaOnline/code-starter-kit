# Topics 编辑器需求文档

## 项目概述
在 `src/app/notebooks/topics/mgmt/augment` 目录下创建一个支持层级的 topics 编辑器。

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
- **基础路径**: `src/app/api/notebooks/topics/augment`
- **需要实现的接口**:
  - GET: 获取所有 topics
  - POST: 创建新 topic
  - PUT: 更新 topic
  - DELETE: 删除 topic
  - POST /updatePositions: 批量更新位置

## 界面布局

### 整体布局
- **左右布局**: 左边显示区，右边操作区
- **响应式设计**: 适配不同屏幕尺寸

### 左侧显示区功能
1. **层级显示**: 使用 topic 的 title 字段层级显示所有 topic
2. **选中功能**: 可以选中已有的 topic 为当前 topic
3. **拖拽排序**: 
   - 可以拖动子 topic 到其他 topic 下
   - 可以拖动调整 topic 的顺序
   - topic 调整时连同子 topic 一起调整
4. **视觉反馈**: 当前选中的 topic 高亮显示

### 右侧操作区功能

#### Type Filter
- **下拉选择**: 可以选择不同的 type
- **过滤显示**: 根据选择的 type 过滤 topic 显示
- **全部显示**: 提供"全部"选项显示所有 type 的 topic

#### 编辑功能
1. **编辑当前 topic**:
   - title 字段编辑
   - note 字段编辑
   - type_id 选择
2. **保存按钮**: 保存当前 topic 的修改
3. **取消按钮**: 取消当前修改，恢复原始状态

#### 新建功能
1. **新建位置选项**:
   - 在当前 topic 之前创建
   - 在当前 topic 之后创建
   - 在当前 topic 之下创建（作为子 topic）
2. **无选中时新建**: 没有 topic 选中时也可在最前位置新增 topic
3. **新建流程**:
   - 新建 topic 后，新的 topic 变成当前 topic
   - 新建时不用保存到数据库
   - 点击保存按钮后，连同位置信息、type_id 保存到数据库
   - 点击取消按钮，忽略刚刚新建的 topic，恢复之前的当前 topic

## 交互体验

### 通知系统
- **Toast 通知**: 操作成功失败都用 toast 通知
- **错误处理**: 友好的错误提示信息

### 用户体验
- **实时反馈**: 拖拽时提供视觉反馈
- **操作确认**: 重要操作提供确认提示
- **加载状态**: 数据加载时显示加载状态

## 技术要求

### 前端技术栈
- **React**: 使用 React Hooks
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **拖拽功能**: HTML5 Drag and Drop API

### 后端技术栈
- **Next.js API Routes**: 服务端接口
- **Prisma ORM**: 数据库操作
- **MySQL**: 数据库

### 数据处理
- **BigInt 处理**: 使用 handleBigInt 函数处理数据库返回的 BigInt 类型
- **事务处理**: 批量更新操作使用数据库事务
- **错误处理**: 完善的错误捕获和处理机制

## 实现状态

### ✅ 已完成功能
1. **基础 API 接口**
   - GET /api/notebooks/topics/augment - 获取 topics（支持 type_id 过滤）
   - POST /api/notebooks/topics/augment - 创建新 topic
   - PUT /api/notebooks/topics/augment - 更新 topic
   - POST /api/notebooks/topics/augment/delete - 删除 topic
   - POST /api/notebooks/topics/augment/updatePositions - 批量更新位置

2. **前端页面功能**
   - 左右布局的编辑器界面
   - Type 过滤器功能
   - 树形结构显示 topics
   - 选中和编辑 topic 功能
   - 新建 topic（之前/之后/子级/根级）
   - 拖拽排序功能
   - 删除 topic 功能
   - Toast 通知系统
   - 多语言注释（中英文）

3. **用户体验**
   - 实时数据同步
   - 友好的错误提示
   - 操作确认机制
   - 加载状态显示
   - 响应式设计

### 🔄 技术特性
- **类型安全**: 使用 TypeScript 确保类型安全
- **状态管理**: React Hooks 管理组件状态
- **数据库操作**: Prisma ORM 处理数据库交互
- **错误处理**: 完善的错误捕获和用户友好的错误提示
- **性能优化**: 使用 useCallback 优化函数重新创建

### 📝 使用说明
1. 访问 `/notebooks/topics/mgmt/augment` 页面
2. 使用类型过滤器筛选显示的 topics
3. 点击左侧 topic 进行选中和编辑
4. 使用拖拽功能重新排序和调整层级
5. 在右侧操作区编辑 topic 信息
6. 使用新建按钮创建新的 topics
