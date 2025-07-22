Mathcha 的所见即所得公式编辑同样离不开“三大件”：

| 组件 | 在 Mathcha 中的具体实现 |
|---|---|
| **排版引擎** | MathJax 3（SVG 输出模式）<br>把 LaTeX 直接渲染成 `<svg>`，而不是像 MathQuill 那样用 DOM+CSS 画字符。 |
| **隐藏输入层** | 一个透明 `<textarea>`（或 `contenteditable` 的 `<div>`）叠在最上层，负责吃所有键盘、输入法、复制/粘贴事件。 |
| **光标&选区** | 用 SVG `<rect>` 画蓝色/橙色光标；点击时同样借助 Range/Point API 把**鼠标坐标**映射到 MathJax 内部的**字符盒子** → 再算回 **LaTeX 字符串偏移** → 最后把 `<textarea>` 的 `selectionStart/End` 设过去。 |

### 工作流程（一次击键的一生）

1. **用户按 `x^2`**  
   `textarea` 收到 `x^2`，Mathcha 立即把 `x^2` 当成 LaTeX 源码。
2. **MathJax 重排版**  
   源码 → 解析 → MathML → SVG，整个公式区域被替换成新的 `<svg>`。
3. **光标同步**  
   - 根据 `selectionStart` 把光标位置转成“第 3 个字符之后”  
   - MathJax 提供 `math.getBounds(3)` 返回该字符的 `x, y, w, h`  
   - 在 SVG 里插入 `<rect class="cursor" .../>` 并闪动。

### 与 MathQuill 的差异速览

| 维度 | MathQuill | Mathcha |
|---|---|---|
| 渲染技术 | DOM + 手写 CSS | MathJax 3 → SVG |
| LaTeX 粒度 | 内部 AST 节点 | 纯文本字符串 |
| 光标实现 | `<span class="mq-cursor">` | `<rect>` in SVG |
| 输出格式 | 可导出 LaTeX / MathML | 默认就是 LaTeX，可转 MathML |

一句话总结：  
**Mathcha = MathJax（排版）+ 透明 `<textarea>`（输入）+ Range API（点击定位）**，思路与 MathQuill 一致，只是渲染层换成了更“重”的 MathJax-SVG，所以能支持完整的 LaTeX 语法且排版质量更高。