---
inclusion: fileMatch
fileMatchPattern: ['src/app/examples/**/*', 'pages/pages/**/*']
---

# Examples 目录代码规范

当在 `src/app/examples` 或 `pages/pages` 目录下生成代码时，遵循以下最佳实践，而不是参考项目中的既有代码。

## 核心原则

- 使用现代化、简洁的代码风格
- 遵循最新的 React 和 Next.js 最佳实践
- 代码应具有教学性和可读性
- 每个示例应该是独立、完整的

## React 组件规范

### 使用函数组件和 Hooks
```tsx
// ✅ 推荐：使用函数组件
export default function ExampleComponent() {
  const [state, setState] = useState(initialValue);
  
  return <div>...</div>;
}

// ❌ 避免：类组件
class ExampleComponent extends React.Component { }
```

### TypeScript 优先
```tsx
// ✅ 推荐：明确的类型定义
interface ExampleProps {
  title: string;
  onAction: (id: string) => void;
}

export default function Example({ title, onAction }: ExampleProps) {
  // ...
}
```

### 组件结构
```tsx
// 推荐的组件文件结构
import { useState, useEffect } from 'react';
import type { ComponentProps } from './types';

// 1. 类型定义
interface Props {
  // ...
}

// 2. 常量定义
const DEFAULT_CONFIG = {
  // ...
};

// 3. 主组件
export default function Component({ prop1, prop2 }: Props) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 派生状态
  const derivedValue = useMemo(() => {}, []);
  
  // 3.3 事件处理
  const handleClick = useCallback(() => {}, []);
  
  // 3.4 副作用
  useEffect(() => {}, []);
  
  // 3.5 渲染
  return <div>...</div>;
}

// 4. 子组件（如果需要）
function SubComponent() {
  // ...
}
```

## Next.js 最佳实践

### App Router (Next.js 13+)
```tsx
// src/app/examples/feature/page.tsx
import { Suspense } from 'react';

export const metadata = {
  title: 'Example Title',
  description: 'Example description',
};

export default function Page() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
    </main>
  );
}
```

### 数据获取
```tsx
// ✅ 推荐：Server Components 中直接 fetch
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store', // 或 'force-cache'
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

## 样式规范

### 优先使用 Tailwind CSS
```tsx
// ✅ 推荐：Tailwind utility classes
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>

// 如果需要自定义样式，使用 CSS Modules
import styles from './example.module.css';
```

### 响应式设计
```tsx
// 使用 Tailwind 响应式前缀
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* ... */}
</div>
```

## 状态管理

### 本地状态
```tsx
// 简单状态：useState
const [count, setCount] = useState(0);

// 复杂状态：useReducer
const [state, dispatch] = useReducer(reducer, initialState);
```

### 全局状态
```tsx
// 使用 Context API 或 Zustand
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## 性能优化

### 避免不必要的重渲染
```tsx
// 使用 memo 包裹纯组件
const MemoizedComponent = memo(function Component({ data }) {
  return <div>{data}</div>;
});

// 使用 useCallback 缓存函数
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// 使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

## 错误处理

### 使用 Error Boundaries
```tsx
// error.tsx (App Router)
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## 可访问性 (a11y)

```tsx
// 使用语义化 HTML
<button onClick={handleClick} aria-label="Close dialog">
  <CloseIcon />
</button>

// 键盘导航支持
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

## 代码组织

### 文件命名
- 组件文件：`PascalCase.tsx` 或 `kebab-case.tsx`
- 工具函数：`camelCase.ts`
- 类型定义：`types.ts` 或 `interfaces.ts`
- 常量：`constants.ts`

### 导入顺序
```tsx
// 1. React 和第三方库
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. 内部模块
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// 3. 类型
import type { User } from '@/types';

// 4. 样式
import styles from './component.module.css';
```

## 注释和文档

```tsx
/**
 * 示例组件：展示如何使用 XYZ 功能
 * 
 * @example
 * ```tsx
 * <ExampleComponent title="Hello" onAction={(id) => console.log(id)} />
 * ```
 */
export default function ExampleComponent({ title, onAction }: Props) {
  // 实现细节的简短注释
  const processedTitle = title.toUpperCase();
  
  return <div>{processedTitle}</div>;
}
```

## 测试友好

```tsx
// 添加 data-testid 用于测试
<button data-testid="submit-button" onClick={handleSubmit}>
  Submit
</button>

// 导出内部函数以便测试
export function validateInput(input: string): boolean {
  // ...
}
```

## 避免的反模式

❌ 不要在组件内定义组件（除非是 render props）
❌ 不要直接修改 state
❌ 不要在循环中使用 Hooks
❌ 不要忘记清理副作用（useEffect cleanup）
❌ 不要过度使用 useEffect（考虑是否可以用派生状态）
❌ 不要在 JSX 中定义内联函数（性能敏感场景）

## 示例模板

每个示例应包含：
1. 清晰的标题和描述
2. 完整的可运行代码
3. 必要的注释说明
4. 使用的技术栈说明
5. 相关文档链接（如果适用）
