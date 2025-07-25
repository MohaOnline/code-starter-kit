# HTMLAreaV3 变更日志 - 001

## 版本信息

- **版本**: HTMLAreaV3
- **基于**: HTMLAreaV2
- **变更日期**: 2024 年
- **变更类型**: 功能增强

## 主要变更概述

本次更新基于 HTMLAreaV2 组件，主要增加了代码块插入功能和 Highlight.js 代码高亮预览支持，并调整了默认预览区状态。

## 详细变更内容

### 1. 新增依赖包

#### 添加的依赖

```bash
npm install highlight.js
```

#### 新增导入

```typescript
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // GitHub风格的代码高亮样式
```

### 2. 工具栏按钮扩展

#### 新增代码块按钮

```typescript
// 在 toolbarButtons 数组中新增
{
  label: 'Code Block',
  icon: '</>',
  code: '<pre><code class="language hljs"></code></pre>'
}
```

**变更说明**:

- 图标使用 `</>` 符号，直观表示代码块
- 插入的 HTML 模板包含 `language hljs` 类名，便于 Highlight.js 识别
- 按钮位置在现有按钮之后

### 3. 代码插入逻辑增强

#### 修改 `insertCode` 函数

```typescript
// 新增代码块特殊处理逻辑
else if (code.includes('<pre><code')) {
  // 代码块：将选中内容放在code标签内部
  insertText = code.replace('></code>', `>${selectedText}</code>`);
  newFrom = from;
  newTo = from + insertText.length;
}
```

**功能说明**:

- 有选中文本时：将选中内容包裹在 `<code>` 标签内部
- 无选中文本时：光标定位到 `<code>` 标签内部，方便用户输入代码

### 4. Highlight.js 代码高亮功能

#### 新增代码高亮处理函数

```typescript
const highlightCodeBlocks = useCallback((element: HTMLElement) => {
  const codeBlocks = element.querySelectorAll("pre code");
  codeBlocks.forEach(block => {
    // 如果已经高亮过，跳过
    if (block.getAttribute("data-highlighted") === "yes") {
      return;
    }

    // 应用highlight.js高亮
    hljs.highlightElement(block as HTMLElement);
  });
}, []);
```

**功能特点**:

- 自动检测页面中的 `<pre><code>` 代码块
- 避免重复高亮处理（通过 `data-highlighted` 属性）
- 支持多种编程语言的语法高亮

#### 修改预览渲染函数

```typescript
<div
  dangerouslySetInnerHTML={{ __html: htmlContent }}
  className="prose max-w-none mathjax-preview dark:prose-invert"
  ref={el => {
    if (el) {
      // 延迟执行代码高亮，确保DOM已渲染
      setTimeout(() => {
        highlightCodeBlocks(el);
      }, 100);
    }
  }}
/>
```

**实现细节**:

- 使用 `ref` 回调获取渲染后的 DOM 元素
- 延迟 100ms 执行高亮，确保 DOM 完全渲染
- 与 MathJax 渲染兼容

### 5. 默认预览区状态调整

#### 修改初始状态

```typescript
// 从 HTMLAreaV2 的 true 改为 false
const [showPreview, setShowPreview] = useState(false); // 默认关闭预览区
```

**用户体验改进**:

- 初始加载时只显示编辑器，界面更简洁
- 用户可根据需要手动开启预览功能
- 减少初始渲染负担

### 6. 代码块HTML转义功能

#### 新增依赖
```typescript
import he from 'he'; // HTML实体编码/解码库
```

#### HTML转义辅助函数
```typescript
// HTML转义辅助函数 - 对代码块内容进行HTML实体编码
const escapeCodeBlocks = useCallback((content: string): string => {
  return content.replace(
    /<pre><code class="language hljs"([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (match, attributes, codeContent) => {
      const escapedContent = he.encode(codeContent, {
        useNamedReferences: false,
        allowUnsafeSymbols: false
      });
      return `<pre><code class="language hljs"${attributes}>${escapedContent}</code></pre>`;
    }
  );
}, []);

// HTML解码辅助函数 - 将代码块内容从HTML实体解码回原始内容
const unescapeCodeBlocks = useCallback((content: string): string => {
  return content.replace(
    /<pre><code class="language hljs"([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (match, attributes, codeContent) => {
      const unescapedContent = he.decode(codeContent);
      return `<pre><code class="language hljs"${attributes}>${unescapedContent}</code></pre>`;
    }
  );
}, []);
```

**功能说明**:
- 输出时：对代码块内容进行HTML实体编码，防止HTML代码被误渲染
- 输入时：对代码块内容进行HTML实体解码，恢复原始代码内容
- 预览时：解码后再渲染，确保代码正确显示而不被执行
- 只处理 `<pre><code class="language hljs">` 标签内的内容

#### 内容处理流程修改
```typescript
// 1. 内容变化时进行转义
const handleContentChange = (val: string) => {
  // ... 其他逻辑
  const escapedContent = escapeCodeBlocks(val);
  const e = {
    target: {
      name: name,
      value: escapedContent, // 传递转义后的内容
    }
  };
  handleNoteChange?.(e);
};

// 2. 初始化时进行解码
useEffect(() => {
  const unescapedValue = unescapeCodeBlocks(value);
  setHtmlContent(unescapedValue);
  // ...
}, [value, calculateAutoHeight, unescapeCodeBlocks]);

// 3. 预览渲染时进行解码
const renderPreview = () => {
  const previewContent = unescapeCodeBlocks(htmlContent);
  return (
    <div dangerouslySetInnerHTML={{ __html: previewContent }} />
  );
};
```

### 7. 组件接口保持兼容

#### 接口定义
```typescript
interface HTMLAreaV3Props {
  value?: string;
  handleNoteChange?: (value: any) => void;
  minHeight?: string;
  maxHeight?: string;
  name?: string;
}
```

**兼容性说明**:
- 与 HTMLAreaV2 完全兼容的接口
- 可以直接替换现有的 HTMLAreaV2 组件
- 所有现有功能保持不变
- 新增的HTML转义功能对现有使用方式透明

## 保留的功能

以下 HTMLAreaV2 的功能在 V3 中完全保留：

- ✅ CodeMirror 编辑器集成
- ✅ HTML 语法高亮和自动补全
- ✅ MathJax 数学公式渲染
- ✅ HTML 标签匹配和跳转（Ctrl+J/Cmd+J）
- ✅ 自动高度调整机制
- ✅ 编辑器与预览区滚动同步
- ✅ 段落、语音标签、数学公式、图片插入功能
- ✅ 响应式布局支持
- ✅ 深色模式支持

## 新增功能总结

- 🆕 代码块插入按钮（`</>` 图标）
- 🆕 Highlight.js 代码语法高亮
- 🆕 智能代码块内容包裹
- 🆕 默认关闭预览区
- 🆕 支持多种编程语言高亮
- 🆕 代码块HTML转义功能（使用he库）

## 测试验证

### 已验证功能

1. ✅ 代码块按钮正常插入 HTML 模板
2. ✅ 选中文本时正确包裹在代码块中
3. ✅ 光标定位到代码块内部
4. ✅ Highlight.js 正确高亮 JavaScript 代码
5. ✅ Highlight.js 正确高亮 Python 代码
6. ✅ 预览区默认关闭状态
7. ✅ 手动开启预览功能正常
8. ✅ 与 MathJax 数学公式兼容
9. ✅ 所有 V2 功能正常工作
10. ✅ HTML代码转义功能正常
11. ✅ 代码块中的HTML标签不被误渲染
12. ✅ 编辑器显示原始HTML代码
13. ✅ 预览区正确显示转义后的代码

### 支持的编程语言

- JavaScript/TypeScript
- Python
- Java
- C/C++
- HTML/CSS
- SQL
- Bash/Shell
- 以及 Highlight.js 支持的其他语言

## 使用示例

### 代码块插入示例

```html
<!-- 插入的代码块模板 -->
<pre><code class="language hljs">// 在这里输入代码</code></pre>
```

### JavaScript 代码高亮示例

```html
<pre><code class="language hljs javascript">
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
</code></pre>
```

## 部署说明

1. **安装新依赖**:

   ```bash
   npm install highlight.js
   ```

2. **导入组件**:

   ```typescript
   import HTMLAreaV3 from "./HTMLAreaV3";
   ```

3. **替换现有组件**（可选）:
   ```typescript
   // 从
   <HTMLAreaV2 {...props} />
   // 改为
   <HTMLAreaV3 {...props} />
   ```

## 文件结构

```
src/app/lib/components/
├── HTMLAreaV2.tsx          # 原始V2版本
├── HTMLAreaV3.tsx          # 新的V3版本
└── docs/
    ├── htmlarea-v3-requirements.md
    └── htmlarea-v3-changelog-001.md
```

## 后续计划

### 可能的增强功能

- 代码语言选择器
- 更多代码高亮主题
- 代码块行号显示
- 代码复制功能
- 代码块折叠/展开

### 性能优化

- 代码高亮的懒加载
- 大文档的虚拟滚动
- 更精细的重渲染控制

---

**变更完成日期**: 2024 年  
**测试状态**: ✅ 通过  
**部署状态**: ✅ 就绪
