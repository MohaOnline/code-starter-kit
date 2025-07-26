# Topics 编辑器 - Augment 版本

## 项目概述

这是一个支持层级结构的 Topics 编辑器，位于 `src/app/notebooks/topics/mgmt/augment`，提供了完整的 topics 管理功能。

## 功能特性

### 🎯 核心功能
- **层级管理**: 支持无限层级的 topic 结构
- **拖拽排序**: 直观的拖拽操作调整 topic 位置和层级
- **类型过滤**: 根据 type_id 过滤显示 topics
- **实时编辑**: 即时保存和取消功能
- **批量操作**: 支持批量更新位置信息

### 🎨 用户界面
- **左右布局**: 左侧显示区，右侧操作区
- **响应式设计**: 适配不同屏幕尺寸
- **多语言支持**: 中英文双语界面
- **Toast 通知**: 友好的操作反馈

### 🔧 技术实现
- **前端**: React + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes + Prisma ORM
- **数据库**: MySQL
- **状态管理**: React Hooks

## 数据库设计

### notebooks_topics 表
```sql
CREATE TABLE notebooks_topics (
  pid bigint(20) DEFAULT 0,           -- 父 topic ID
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(512) DEFAULT NULL,    -- topic 标题
  type_id bigint(20) DEFAULT 0,       -- 类型 ID
  note varchar(4096) DEFAULT NULL,    -- 备注
  note_extra text DEFAULT NULL,       -- 扩展备注
  weight varchar(64) DEFAULT NULL     -- 排序权重
)
```

### notebooks_types 表
```sql
CREATE TABLE notebooks_types (
  pid bigint(20) NOT NULL DEFAULT 0,  -- 父类型 ID
  id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(512) DEFAULT NULL,    -- 类型标题
  title_sub varchar(512) DEFAULT NULL -- 类型副标题
)
```

## API 接口

### 基础 CRUD 操作
- `GET /api/notebooks/topics/augment` - 获取 topics 列表
- `POST /api/notebooks/topics/augment` - 创建新 topic
- `PUT /api/notebooks/topics/augment` - 更新 topic
- `POST /api/notebooks/topics/augment/delete` - 删除 topic

### 特殊操作
- `POST /api/notebooks/topics/augment/updatePositions` - 批量更新位置
- `GET /api/notebooks/types/list` - 获取类型列表

### 查询参数
- `type_id`: 按类型过滤 topics（可选）

## 使用指南

### 基本操作
1. **访问页面**: 导航到 `/notebooks/topics/mgmt/augment`
2. **选择类型**: 使用顶部的类型过滤器
3. **选中 Topic**: 点击左侧列表中的 topic
4. **编辑信息**: 在右侧操作区修改标题、类型、备注
5. **保存更改**: 点击保存按钮确认修改

### 高级操作
1. **拖拽排序**: 使用 ⋮⋮ 拖拽手柄重新排序
2. **调整层级**: 拖拽到绿色区域成为子级
3. **新建 Topic**: 使用新建按钮在指定位置创建
4. **删除 Topic**: 选中后使用删除按钮（需确认）

### 拖拽规则
- **蓝色区域**: 在目标 topic 之前/之后插入
- **绿色区域**: 成为目标 topic 的子级
- **限制**: 不能将父级拖到其子级中

## 文件结构

```
src/app/notebooks/topics/mgmt/augment/
├── page.tsx                    # 主页面组件
├── components/
│   └── Toast.tsx              # Toast 通知组件
├── docs/
│   └── requirements.md        # 需求文档
└── api/
    └── notebooks/topics/augment/
        ├── route.ts           # 基础 CRUD API
        ├── delete/route.ts    # 删除 API
        └── updatePositions/route.ts # 位置更新 API
```

## 开发说明

### 环境要求
- Node.js 18+
- MySQL 数据库
- Prisma ORM 配置

### 本地开发
1. 确保数据库连接正常
2. 运行 `npm run dev` 启动开发服务器
3. 访问 `http://localhost:3000/notebooks/topics/mgmt/augment`

### 代码特点
- **类型安全**: 完整的 TypeScript 类型定义
- **错误处理**: 完善的错误捕获和用户提示
- **性能优化**: 使用 React.memo 和 useCallback
- **可维护性**: 清晰的代码结构和注释

## 扩展功能

### 可能的改进
1. **批量操作**: 支持多选和批量删除
2. **搜索功能**: 添加 topic 搜索和过滤
3. **导入导出**: 支持 JSON/CSV 格式导入导出
4. **历史记录**: 操作历史和撤销功能
5. **权限控制**: 基于用户角色的操作权限

### 集成建议
1. **与其他模块集成**: 可与 notes、words 等模块联动
2. **API 扩展**: 支持更多查询和过滤选项
3. **UI 组件化**: 提取可复用的组件库

## 维护说明

### 常见问题
1. **拖拽不工作**: 检查浏览器兼容性和 JavaScript 启用状态
2. **数据不同步**: 确认 API 调用成功和数据库连接正常
3. **类型过滤失效**: 检查 type_id 参数传递和 API 响应

### 监控指标
- API 响应时间
- 数据库查询性能
- 用户操作成功率
- 错误日志统计

## 测试验证

### ✅ 已验证功能
1. **API 接口测试**
   - ✅ GET /api/notebooks/topics/augment - 获取 topics 列表
   - ✅ POST /api/notebooks/topics/augment - 创建新 topic
   - ✅ PUT /api/notebooks/topics/augment - 更新 topic
   - ✅ POST /api/notebooks/topics/augment/delete - 删除 topic
   - ✅ POST /api/notebooks/topics/augment/updatePositions - 批量更新位置

2. **数据处理验证**
   - ✅ BigInt 类型正确处理和转换
   - ✅ 层级关系正确维护
   - ✅ 权重排序功能正常
   - ✅ 类型过滤功能正常

3. **前端功能验证**
   - ✅ Toast 通知系统正常工作
   - ✅ 响应式布局适配
   - ✅ 多语言界面支持
   - ✅ 拖拽功能实现

### 🧪 测试数据
当前系统包含以下测试数据：
- 力学 (id:1) → 运动 (id:8)
- 电学 (id:2) → 电荷性质 (id:3)
- 生物/医疗 (id:4)
- 体育赛事 (id:5)
- 家庭 (id:6)
- 人物关系 (id:7)

### 📋 快速测试命令
```bash
# 创建测试 topic
curl -X POST http://localhost:3000/api/notebooks/topics/augment \
  -H "Content-Type: application/json" \
  -d '{"title":"测试Topic","note":"测试","type_id":3,"pid":0}'

# 删除测试 topic (替换 ID)
curl -X POST http://localhost:3000/api/notebooks/topics/augment/delete \
  -H "Content-Type: application/json" \
  -d '{"id":YOUR_TOPIC_ID}'
```

---

**创建时间**: 2025-07-26
**版本**: v1.0.0
**状态**: ✅ 完成并测试通过
**维护者**: AI Assistant
