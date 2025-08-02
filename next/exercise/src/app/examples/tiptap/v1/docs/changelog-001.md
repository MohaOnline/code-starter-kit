# TipTap 自定义编辑器示例变更日志

## 2025-08-03 初始实现

### 添加的文件

1. **page.tsx** - 主页面组件
   - 实现 TipTap 编辑器
   - 添加自定义容器和 span 扩展
   - 实现属性编辑对话框
   - 支持 HTML 预览

2. **utils.ts** - 工具函数
   - 实现双引号转义处理
   - 提供 HTML 处理辅助函数

3. **api-route.ts** - API 路由
   - 用于保存和读取编辑器内容

### 实现的功能

1. **自定义 TipTap 扩展**
   - CustomSpan 扩展支持三个属性：data-speaker、aria-label、data-voice-id
   - CustomContainer 扩展支持 div 和 p 容器

2. **属性编辑对话框**
   - 通过对话框编辑 span 属性
   - 处理 aria-label 中的双引号

3. **容器管理**
   - 支持切换 div/p 容器类型
   - 允许添加新容器

4. **HTML 实时预览**
   - 显示当前编辑器的 HTML 内容
   - 便于调试和验证

5. **数据持久化**
   - 支持从后端读取和保存内容
