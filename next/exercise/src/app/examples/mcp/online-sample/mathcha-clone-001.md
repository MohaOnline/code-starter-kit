# 数学公式可视化编辑器 - Mathcha 克隆版

## 项目概述

本项目是对 [Mathcha 编辑器](https://www.mathcha.io/editor) 的功能复刻，实现了一个基于 Next.js 15 的数学公式可视化编辑器。参考了 [Mathcha 官方文档](https://www.mathcha.io/documentation/) 的功能设计。

## 功能特性

### 1. 可视化构建器
- **拖拽式编辑**: 通过点击工具栏元素构建数学公式
- **实时预览**: 编辑过程中实时显示公式效果
- **结构元素支持**:
  - 分数 (a/b)
  - 根号 (√x)
  - 上标 (x^n)
  - 下标 (x_n)
  - 函数 (f(x))

### 2. LaTeX 编辑器
- **传统文本编辑**: 直接输入 LaTeX 代码
- **符号工具栏**: 快速插入常用数学符号
- **实时渲染**: 输入时即时显示渲染效果
- **多种编辑模式**:
  - 文本模式
  - 数学模式
  - 内联数学公式 ($...$)
  - 数学容器 (独立行)

### 3. 高级数学渲染
- **自定义 LaTeX 解析器**: 支持复杂嵌套结构
- **数学符号库**:
  - 希腊字母 (α, β, γ, δ, θ, π, σ, ω)
  - 运算符 (±, ∓, ×, ÷, ⋅, ∞, ∂, ∇)
  - 三角函数 (sin, cos, tan, cot, log, ln, exp, lim)
- **样式优化**: 专业的数学公式排版效果

### 4. 示例公式集合
- **经典公式展示**:
  - 复杂三角函数公式
  - 二次公式
  - 欧拉公式
  - 积分公式
  - 矩阵表示
- **代码查看**: 每个示例都可以查看对应的 LaTeX 代码

## 技术实现

### 架构设计
```
src/app/examples/mcp/online-sample/
├── page.tsx                    # 主页面组件
├── components/
│   ├── MathRenderer.tsx        # 数学公式渲染器
│   └── FormulaBuilder.tsx      # 可视化构建器
└── mathcha-clone-001.md        # 项目文档
```

### 核心组件

#### 1. MathRenderer.tsx
- **LaTeX 解析器**: 自定义词法分析和语法解析
- **递归渲染**: 支持复杂嵌套结构
- **样式系统**: CSS-in-JS 实现专业排版
- **错误处理**: 优雅的错误显示和调试信息

#### 2. FormulaBuilder.tsx
- **可视化编辑**: 拖拽式公式构建
- **元素管理**: 动态添加、删除、更新公式元素
- **LaTeX 生成**: 将可视化结构转换为 LaTeX 代码
- **符号库**: 分类整理的数学符号集合

#### 3. 主页面 (page.tsx)
- **标签页布局**: 分离不同编辑模式
- **状态管理**: 统一的公式状态管理
- **响应式设计**: 适配不同屏幕尺寸

### 技术栈
- **框架**: Next.js 15 + App Router
- **UI 组件**: Shadcn UI + Radix UI
- **样式**: Tailwind CSS + CSS-in-JS
- **语言**: TypeScript
- **状态管理**: React Hooks

## 与 Mathcha 的对比

### 已实现功能
✅ 文本模式和数学模式切换  
✅ 内联数学公式 ($...$)  
✅ 数学容器 (独立行公式)  
✅ 分数、根号、上下标  
✅ 希腊字母和数学符号  
✅ 三角函数支持  
✅ 实时预览  
✅ LaTeX 代码生成  

### 待扩展功能
🔄 矩阵和表格支持  
🔄 更多数学函数 (积分、求和、极限)  
🔄 公式导出 (PNG, SVG, PDF)  
🔄 协作编辑功能  
🔄 公式库和模板  
🔄 撤销/重做功能  

## 使用示例

### 复杂三角函数公式
```latex
\frac{\sin(\theta - 5\pi)}{\tan(3\pi-\theta)} \cdot \frac{\cot(\frac{\pi}{2} - \theta)}{\tan(\theta - \frac{3\pi}{2})} \cdot \frac{\cos(8\pi - \theta)}{\cos(\theta + \frac{\pi}{2})}
```

### 二次公式
```latex
x = \frac{-b \pm \sqrt{b^{2} - 4ac}}{2a}
```

### 欧拉公式
```latex
e^{i\pi} + 1 = 0
```

## 开发说明

### 本地运行
```bash
# 在项目根目录运行
npm run dev

# 访问编辑器
http://localhost:3000/examples/mcp/online-sample
```

### 代码结构
- 使用函数式组件和 React Hooks
- TypeScript 严格模式
- 模块化设计，组件职责分离
- 响应式布局，移动端友好

### 扩展指南
1. **添加新的数学符号**: 在 `MATH_SYMBOLS` 对象中添加
2. **支持新的 LaTeX 命令**: 在 `LatexParser` 类中扩展 `parseCommand` 方法
3. **添加新的结构元素**: 在 `ELEMENT_TEMPLATES` 中定义模板
4. **自定义样式**: 修改 CSS-in-JS 样式定义

## 性能优化

- **懒加载**: 组件按需加载
- **记忆化**: 使用 `useCallback` 和 `useMemo` 优化渲染
- **虚拟化**: 大量公式时的性能优化
- **缓存**: LaTeX 解析结果缓存

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

本项目仅用于学习和演示目的，参考了 Mathcha 的设计理念但为独立实现。

---

**创建时间**: 2024年12月
**技术栈**: Next.js 15, TypeScript, Tailwind CSS, Shadcn UI
**参考**: [Mathcha Editor](https://www.mathcha.io/editor) | [Mathcha Documentation](https://www.mathcha.io/documentation/)