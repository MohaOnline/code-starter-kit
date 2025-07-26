# Notes List Tab 页面需求文档

## 项目概述
在 `src/app/notebooks/notes/list/tab/` 目录下创建一个新的 note list 页面，基于现有的 `src/app/notebooks/notes/list/page.jsx` 进行改进。

## 核心需求

### 1. 数据源
- **参考页面**: `src/app/notebooks/notes/list/page.jsx`
- **API 接口**: `/api/notebooks/notes/list`
- **数据结构**: 使用相同的 notes 数据结构
- **状态管理**: 复用现有的 useStatus hook

### 2. 界面布局改进
- **原始设计**: 顶部过滤工具栏，包含 Type 和 Sub Type 下拉选择器
- **新设计**: 将 type filter 改为右侧面板的 tab 形式
- **布局结构**: 左侧内容区域 + 右侧 tab 面板

### 3. Tab 功能设计

#### Tab 面板位置
- **位置**: 页面右侧
- **样式**: 垂直 tab 布局
- **响应式**: 移动端可考虑折叠或水平布局

#### Tab 内容
- **数据来源**: 从 notes 数据中提取所有唯一的 type 值
- **Tab 项**: 每个 type 对应一个 tab
- **默认状态**: 显示所有 notes 或第一个 type 的 notes

#### 交互行为
- **点击 tab**: 只显示对应 type 的 note 列表
- **活跃状态**: 当前选中的 tab 有明显的视觉反馈
- **计数显示**: 每个 tab 显示对应 type 的 note 数量

### 4. 过滤逻辑
- **主要过滤**: 基于 type 进行过滤
- **Sub Type**: 保留 sub type 过滤功能，作为二级过滤
- **组合过滤**: type (tab) + sub type (下拉选择器)

### 5. 保留功能
- **Note 组件**: 复用现有的 Note 组件显示
- **添加功能**: 保留 NoteDialog 添加笔记功能
- **主题切换**: 保留 ModeToggle 功能
- **Toast 提示**: 保留错误和成功提示
- **导航**: 保留 NavTop 组件

## 技术实现要求

### 1. 组件结构
```
page.tsx (主页面)
├── NavTop (导航)
├── 标题区域
├── 主体布局
│   ├── 左侧内容区域
│   │   ├── Sub Type 过滤器
│   │   ├── 添加笔记按钮
│   │   └── Notes 列表
│   └── 右侧 Tab 面板
│       └── Type Tabs
└── 底部组件 (Toast, ModeToggle)
```

### 2. 状态管理
- **selectedType**: 当前选中的 type (通过 tab 控制)
- **selectedTypeSubs**: 选中的 sub types (保留下拉选择器)
- **notes**: 笔记数据
- **status**: 全局状态管理

### 3. 样式设计
- **布局**: 使用 Flexbox 或 Grid 实现左右布局
- **Tab 样式**: 使用 Shadcn UI 的 Tabs 组件或自定义实现
- **响应式**: 确保在不同屏幕尺寸下的良好体验
- **主题支持**: 支持明暗主题切换

### 4. 性能优化
- **数据缓存**: 复用现有的数据获取逻辑
- **渲染优化**: 只渲染当前 type 的 notes
- **懒加载**: 如果数据量大，考虑虚拟滚动

## 用户体验设计

### 1. 交互流程
1. 页面加载 → 获取所有 notes 数据
2. 解析 types → 生成右侧 tab 列表
3. 默认显示第一个 type 或所有 notes
4. 用户点击 tab → 切换显示对应 type 的 notes
5. 用户选择 sub type → 在当前 type 基础上进一步过滤

### 2. 视觉反馈
- **活跃 tab**: 明显的颜色和样式区分
- **计数显示**: 每个 tab 显示对应的 note 数量
- **加载状态**: 数据加载时的 loading 状态
- **空状态**: 当某个 type 没有 notes 时的提示

### 3. 错误处理
- **API 错误**: 显示友好的错误提示
- **数据为空**: 提供添加第一个 note 的引导
- **网络问题**: 重试机制和离线提示

## 文件结构
```
src/app/notebooks/notes/list/tab/
├── docs/
│   ├── requirements.md (本文档)
│   └── changelog-001.md (开发日志)
├── page.tsx (主页面组件)
└── components/ (如需要自定义组件)
    └── TypeTabs.tsx (Tab 组件)
```

## 开发优先级
1. **高优先级**: 基础页面结构、数据获取、Tab 切换功能
2. **中优先级**: Sub Type 过滤、样式优化、响应式设计
3. **低优先级**: 性能优化、动画效果、高级交互

## 测试要点
- Tab 切换功能正常
- 过滤逻辑准确
- 响应式布局适配
- 主题切换兼容
- 数据加载和错误处理
- 添加笔记功能正常