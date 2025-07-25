# HTMLAreaV3 需求文档

## 项目概述

基于现有的 HTMLAreaV2 组件创建一个增强版本 HTMLAreaV3，主要增加代码块插入功能和代码高亮预览支持。

## 核心需求

### 1. 代码块插入功能

- **需求描述**: 在工具栏中新增一个代码块插入按钮
- **按钮图标**: `</>`
- **插入的 HTML**: `<pre><code class="language hljs"></code></pre>`
- **功能行为**:
  - 无选中文本时：插入空的代码块模板，光标定位到 `<code>` 标签内部
  - 有选中文本时：将选中文本包裹在代码块中

### 2. Highlight.js 代码高亮预览

- **需求描述**: 预览区支持使用 Highlight.js 对代码块进行语法高亮
- **技术实现**:
  - 安装 `highlight.js` 依赖包
  - 引入 GitHub 风格的样式 `highlight.js/styles/github.css`
  - 在预览渲染时自动检测并高亮 `<pre><code>` 代码块
  - 支持多种编程语言的语法高亮

### 3. 默认预览区状态

- **需求描述**: 组件初始化时默认关闭预览区
- **实现方式**: 将 `showPreview` 状态的初始值设置为 `false`
- **用户交互**: 用户可通过工具栏的 "Preview" 复选框手动开启预览

## 技术规格

### 组件接口

```typescript
interface HTMLAreaV3Props {
  value?: string;
  handleNoteChange?: (value: any) => void;
  minHeight?: string;
  maxHeight?: string;
  name?: string;
}
```

### 工具栏按钮配置

```typescript
const toolbarButtons = [
  {
    label: "Paragraph",
    icon: "P",
    code: "<p></p>",
  },
  {
    label: "Span with Voice",
    icon: "🔊",
    code: '<span aria-label="" speaker="" data-voice-id=""></span>',
  },
  {
    label: "Math Formula",
    icon: "∑",
    code: "$$",
  },
  {
    label: "Image with Voice",
    icon: "🖼️",
    code: '<img aria-label="" speaker="" data-voice-id="" src=""/>',
  },
  {
    label: "Code Block", // 新增
    icon: "</>",
    code: '<pre><code class="language hljs"></code></pre>',
  },
];
```

### 依赖包

- `highlight.js`: 代码语法高亮库
- 保留所有 HTMLAreaV2 的现有依赖

## 功能特性

### 保留的 V2 功能

- ✅ CodeMirror 编辑器集成
- ✅ HTML 语法高亮和自动补全
- ✅ MathJax 数学公式渲染
- ✅ HTML 标签匹配和跳转（Ctrl+J/Cmd+J）
- ✅ 自动高度调整
- ✅ 编辑器与预览区滚动同步
- ✅ 工具栏快捷插入功能
- ✅ 响应式布局支持

### 新增的 V3 功能

- ✨ 代码块插入按钮
- ✨ Highlight.js 代码语法高亮
- ✨ 默认关闭预览区
- ✨ 智能代码块内容包裹

## 使用示例

### 基本用法

```tsx
import HTMLAreaV3 from "./HTMLAreaV3";

function MyComponent() {
  const [content, setContent] = useState("");

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <HTMLAreaV3 value={content} handleNoteChange={handleChange} minHeight="300px" maxHeight="600px" name="my-editor" />
  );
}
```

### 支持的代码语言

- JavaScript
- TypeScript
- Python
- Java
- C/C++
- HTML
- CSS
- SQL
- Bash/Shell
- 以及 Highlight.js 支持的其他语言

## 实现细节

### 代码高亮处理

```typescript
const highlightCodeBlocks = useCallback((element: HTMLElement) => {
  const codeBlocks = element.querySelectorAll("pre code");
  codeBlocks.forEach(block => {
    if (block.getAttribute("data-highlighted") === "yes") {
      return;
    }
    hljs.highlightElement(block as HTMLElement);
  });
}, []);
```

### 代码块插入逻辑

- 检测选中文本状态
- 智能包裹或插入代码块模板
- 自动定位光标到合适位置
- 保持编辑器焦点状态

## 测试用例

### 功能测试

1. **代码块插入测试**

   - 无选中文本时插入空代码块
   - 有选中文本时包裹选中内容
   - 光标定位正确性

2. **代码高亮测试**

   - JavaScript 代码高亮
   - Python 代码高亮
   - HTML/CSS 代码高亮
   - 多个代码块同时高亮

3. **预览区测试**
   - 默认关闭状态
   - 手动开启预览
   - 滚动同步功能

### 兼容性测试

- 与现有 HTMLAreaV2 功能的兼容性
- 数学公式渲染正常
- 语音标签功能正常
- 响应式布局正常

## 部署说明

1. 安装依赖：`npm install highlight.js`
2. 导入组件：`import HTMLAreaV3 from './HTMLAreaV3'`
3. 替换现有的 HTMLAreaV2 组件（可选）
4. 测试所有功能正常工作

## 版本信息

- **版本**: V3.0.0
- **基于**: HTMLAreaV2
- **创建日期**: 2024 年
- **主要变更**: 代码块插入 + Highlight.js 支持 + 默认关闭预览
