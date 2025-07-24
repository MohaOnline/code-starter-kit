# CodeMirror 6 实现原理分析需求

## 用户需求

用户希望了解 CodeMirror 6 的内部实现原理，特别是：

1. **核心问题**：为什么一个普通的 `<div>` 元素能够实现文本编辑功能？
   - 该 div 没有 `contenteditable` 属性
   - 但却能够响应键盘输入、光标定位等编辑操作

2. **示例 DOM 结构分析**：
   ```html
   <div spellcheck="false" autocorrect="off" autocapitalize="off" 
        writingsuggestions="false" translate="no" style="tab-size: 4;" 
        class="cm-content" role="textbox" aria-multiline="true" 
        data-language="javascript" aria-autocomplete="list">
     <div class="cm-line">console.log(<span class="ͼe">'Hello, CodeMirror 6!'</span>)</div>
     <div class="cm-line"><br></div>
     <!-- 更多行... -->
   </div>
   ```

3. **需要解释的技术点**：
   - CodeMirror 6 的 DOM 操作机制
   - 事件处理系统
   - 虚拟文档模型与 DOM 同步
   - 输入法处理
   - 选择和光标管理
   - 渲染优化策略

4. **输出要求**：
   - 在 `src/app/examples/codemirror/v0` 目录生成示例页面
   - 页面应包含实际的 CodeMirror 6 编辑器
   - 详细的技术原理说明
   - 代码注释使用中文
   - 包含交互式演示来展示内部工作机制

## 技术实现目标

1. 创建一个完整的 Next.js 页面展示 CodeMirror 6 的实现原理
2. 包含多个演示组件，分别展示不同的技术细节
3. 提供详细的中文注释和说明文档
4. 实现交互式的调试工具来观察内部状态变化