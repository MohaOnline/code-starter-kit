# TipTap 自定义编辑器示例变更日志

## 2025-08-03 修复内容模型错误

### 问题描述

应用出现了 Schema 错误：

```
SyntaxError: No node type or group 'paragraph' found (in content expression 'paragraph block*')
```

这是因为我们尝试完全禁用 paragraph 节点，但 TipTap 的内容模型仍然需要依赖它。

### 修复方案

1. **恢复 StarterKit 的默认配置**：
   - 移除了 `paragraph: false` 配置
   - 保留 paragraph 节点作为 TipTap 基础结构的一部分

2. **修改 CustomContainer 的内容模型**：
   - 将 `content: 'customSpan+'` 改为 `content: 'inline*'`
   - 这样 CustomContainer 可以包含任何内联元素，包括 customSpan
   - 增加 `inline: false` 明确指定为块级元素

3. **调整初始内容格式**：
   - 将初始内容从 `<p>加载中...</p>` 改为 `<div><span>加载中...</span></div>`
   - 确保与我们的自定义容器和 span 模型一致

### 技术说明

TipTap 基于 ProseMirror 的内容模型有严格的规则。当修改或自定义节点类型时，需要确保：

1. 不要完全移除基础节点类型（如 paragraph），因为其他扩展可能依赖它
2. 内容模型表达式需要有效，且引用的所有节点类型或组必须存在
3. 自定义节点应遵循 ProseMirror 的节点规范，包括正确指定 content、group 和嵌套规则

通过保留 StarterKit 的默认配置并调整 CustomContainer 的内容模型，我们解决了 Schema 冲突问题，同时保持了对自定义 span 属性的支持。
