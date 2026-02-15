---
inclusion: always
---

# Language Preference: Simplified Chinese

Use Simplified Chinese (简体中文) as the primary language for all responses, explanations, and documentation.

## Response Language Guidelines

- Write all explanations, summaries, and conversational responses in Simplified Chinese
- Keep code, logs, and technical output in their original language (typically English)
- Use English for technical terms when appropriate, but provide Chinese explanations in parentheses on first use
- Write code comments in English with Chinese translations when clarification is needed

## Code and Technical Content

- Variable names, function names, and code identifiers: English (standard practice)
- Code comments: English preferred, add Chinese translation for complex logic
- Error messages and logs: Keep original language (usually English)
- API endpoints and configuration keys: English (standard practice)

## Documentation

- README files and project documentation: Simplified Chinese
- Inline code documentation: English with Chinese explanations when needed
- Commit messages: English (standard practice) or Chinese based on team preference
- Spec documents (requirements.md, design.md, tasks.md): Simplified Chinese

## Technical Terms

When using technical terms:
- First mention: English term with Chinese explanation in parentheses
  - Example: "React hooks (React 钩子函数)"
- Subsequent mentions: Use whichever is clearer in context
- Well-known terms can remain in English: API, HTTP, JSON, etc.

## Examples

Good response format:
```
我将帮你创建一个新的 React 组件。首先，让我们定义组件的 props 接口。

// Component props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

Technical explanation format:
```
这个函数使用了 memoization (记忆化) 技术来优化性能。通过缓存计算结果，避免重复执行昂贵的操作。
```
