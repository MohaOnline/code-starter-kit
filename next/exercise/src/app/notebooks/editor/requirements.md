# 笔记本编辑功能需求文档

## 概述

本文档描述了笔记本编辑功能的详细需求，包括前端界面、API接口和数据库操作等方面。

## 功能需求

### 1. 整体布局

- **界面分布**: 左右两列布局
  - 左侧：编辑区域
  - 右侧：预览区域
- **响应式设计**: 使用 Tailwind CSS 实现移动端适配
- **UI组件**: 基于 Shadcn UI 组件库

### 2. 左侧编辑区域

#### 2.1 顶部ID输入区
- **ID输入框**: 用户可输入记录ID
- **获取按钮**: 点击后从 `notebooks_notes` 表获取对应记录
- **错误处理**: 记录不存在时使用 toast 通知用户

#### 2.2 表单字段（从上到下排列）

1. **nbid 字段**
   - 组件类型: Combobox
   - 数据源: `notebooks` 表
   - 显示: notebook 名称和ID

2. **tid 字段**
   - 组件类型: Combobox  
   - 数据源: `notebooks_types` 表
   - 显示: type 名称和ID

3. **HTML内容字段** (使用自定义HTMLArea组件)
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
  - 有ID时：更新现有记录
  - 无ID时：创建新记录
  - 保存成功后刷新预览区

### 3. 右侧预览区域

- **MathJax集成**: 支持数学公式渲染
- **HTML渲染**: 实时预览编辑内容
- **配置参考**: 使用 `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/lib/components/HTMLArea.tsx#L32-51` 的 MathJax 配置

### 4. API接口需求

#### 4.1 基础路径
- API路径: `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/api/notebooks/editor`

#### 4.2 接口列表

1. **GET /api/notebooks/editor/[id]**
   - 功能: 根据ID获取笔记记录
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
   - 功能: 获取notebooks表数据用于Combobox
   - 返回: notebooks列表

5. **GET /api/notebooks/editor/options/types**
   - 功能: 获取notebooks_types表数据用于Combobox
   - 返回: types列表

### 5. 数据库操作

#### 5.1 主表: notebooks_notes
- **字段列表**:
  - `id`: 主键
  - `nbid`: 外键关联notebooks表
  - `tid`: 外键关联notebooks_types表
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

#### 5.2 Weight字段生成逻辑
- **参考实现**: `/Users/ma3310/p/code-starter-kit/next/exercise/src/app/api/notebook/words/english/route.js#L32-43`
- **生成规则**: 
  1. 查询同nbid下的最大weight值
  2. 使用LexoRank算法生成下一个权重值
  3. 确保权重值的唯一性和排序性

### 6. 技术栈

- **前端框架**: Next.js 15 + App Router
- **UI组件**: Shadcn UI + Radix
- **样式**: Tailwind CSS
- **数学公式**: MathJax (better-react-mathjax)
- **代码编辑**: HTMLArea自定义组件
- **状态管理**: React useState/useEffect
- **数据获取**: fetch API
- **通知**: Toast组件

### 7. 用户体验

- **实时预览**: 编辑内容实时在右侧预览
- **错误处理**: 友好的错误提示和Toast通知
- **加载状态**: 数据获取时显示加载状态
- **表单验证**: 必填字段验证
- **响应式**: 移动端友好的界面设计

### 8. 安全考虑

- **输入验证**: 服务端验证所有输入数据
- **SQL注入防护**: 使用参数化查询
- **XSS防护**: HTML内容适当转义
- **权限控制**: 确保用户只能操作授权的数据

## 实现优先级

1. **Phase 1**: 基础CRUD API接口
2. **Phase 2**: 前端编辑界面和表单
3. **Phase 3**: 预览功能和MathJax集成
4. **Phase 4**: 用户体验优化和错误处理
5. **Phase 5**: 响应式设计和移动端适配

## 验收标准

- [ ] 能够通过ID获取和显示现有笔记
- [ ] 能够创建新的笔记记录
- [ ] 能够更新现有笔记记录
- [ ] Combobox正确显示notebooks和types数据
- [ ] HTMLArea组件正常工作
- [ ] 预览区正确渲染HTML和数学公式
- [ ] Weight字段按LexoRank算法正确生成
- [ ] 错误情况有适当的用户提示
- [ ] 界面响应式且用户友好