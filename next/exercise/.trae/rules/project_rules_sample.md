# Next.js 15 项目开发规范示例

## 核心原则 (Key Principles)

### 文档管理
- 为每个需求生成和更新markdown文档来追踪计划和完成情况
- 文档保存在相同文件夹下，使用"源文件名-编号"命名规范 (如: common-001.md, common-002.md)
- 在markdown文档或响应请求时使用相对于项目根目录的路径

### 代码质量
- 编写简洁、技术性的TypeScript代码，提供准确的示例
- 基于Next.js 15 & App Router架构进行开发
- 添加足够的简体中文注释来解释业务逻辑，介绍技术知识和技术背景
- 让其他维护者无需搜索和学习太多文档就能开始编码工作，即使他们不熟悉当前技术栈
- 在注释中添加参考文档、用法或示例的链接（如果可用）

### 编程范式
- 使用函数式和声明式编程模式；避免使用类
- 优先选择迭代和模块化而非代码重复
- 使用带有辅助动词的描述性变量名 (如: isLoading, hasError, canSubmit)
- 文件结构：导出组件、子组件、辅助函数、静态内容、类型定义

## 命名约定 (Naming Conventions)

### 目录命名
- 使用小写字母和连字符 (如: components/auth-wizard, pages/user-profile)
- 使用语义化的目录名称，体现功能模块

### 组件命名
- 优先使用命名导出而非默认导出
- 组件名使用PascalCase (如: UserProfile, AuthWizard)
- Hook名使用camelCase并以use开头 (如: useUserData, useAuthState)

### 文件命名
- 页面文件：page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
- 组件文件：使用kebab-case (如: user-profile.tsx, auth-wizard.tsx)
- 工具函数：使用kebab-case (如: format-date.ts, api-client.ts)

## TypeScript 使用规范

### 类型定义
- 所有代码使用TypeScript；优先使用interface而非type
- 避免使用enums；使用maps或const assertions代替
- 使用函数组件配合TypeScript接口

### 类型组织
```typescript
// 优先使用interface
interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// 避免enum，使用const assertion
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
} as const;

type UserRoleType = typeof UserRole[keyof typeof UserRole];
```

## 语法和格式化

### 函数定义
- 对于纯函数使用"function"关键字
- 避免在条件语句中使用不必要的花括号；对简单语句使用简洁语法
- 使用声明式JSX

### 代码示例
```typescript
// ✅ 推荐：使用function关键字的纯函数
function formatUserName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

// ✅ 推荐：简洁的条件语句
const isActive = user.status === 'active';
if (isActive) return <ActiveUserBadge />;

// ✅ 推荐：声明式JSX
return (
  <div className="user-profile">
    {users.map(user => (
      <UserCard key={user.id} user={user} />
    ))}
  </div>
);
```

## UI 和样式

### 组件库
- 使用Shadcn UI、Radix和Tailwind进行组件开发和样式设计
- 使用Tailwind CSS实现响应式设计；采用移动优先的方法

### 样式规范
```typescript
// ✅ 推荐：移动优先的响应式设计
<div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white dark:bg-gray-800">
  <h2 className="text-lg md:text-xl font-semibold mb-4">
    用户信息
  </h2>
</div>
```

## 性能优化

### 组件优化
- 最小化'use client'、'useEffect'和'setState'的使用；优先使用React Server Components (RSC)
- 将客户端组件包装在Suspense中并提供fallback
- 对非关键组件使用动态加载
- 优化图片：使用WebP格式，包含尺寸数据，实现懒加载

### 示例代码
```typescript
// ✅ 推荐：Server Component with Suspense
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 动态加载非关键组件
const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <div>图表加载中...</div>
});

export default function Dashboard() {
  return (
    <div>
      <h1>仪表板</h1>
      <Suspense fallback={<div>数据加载中...</div>}>
        <UserStats />
      </Suspense>
      <Suspense fallback={<div>图表加载中...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

## 关键约定

### 状态管理
- 使用'nuqs'进行URL搜索参数状态管理
- 优化Web Vitals (LCP, CLS, FID)
- 限制'use client'的使用：
  - 优先使用服务器组件和Next.js SSR
  - 仅在小组件中用于Web API访问
  - 避免用于数据获取或状态管理

### 数据获取
- 遵循Next.js文档中的数据获取、渲染和路由指南
- 在Server Components中使用async/await进行数据获取
- 使用适当的缓存策略：force-cache, no-store, revalidate

## Next.js 15 & App Router 最佳实践

### 路由和文件结构
- 对所有新功能和页面使用App Router (app目录)
- 默认优先使用Server Components；仅在必要时使用Client Components
- 在整个项目中一致使用TypeScript (.tsx/.ts) 文件扩展名
- 实现适当的loading.tsx、error.tsx和not-found.tsx文件以提供更好的用户体验

### 高级路由模式
- 使用并行路由和拦截路由实现高级路由模式
- 利用路由组（带括号的文件夹）进行组织而不影响URL结构
- 使用generateMetadata进行动态SEO优化

### 示例文件结构
```
app/
├── (dashboard)/          # 路由组
│   ├── analytics/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   └── settings/
│       ├── page.tsx
│       └── @modal/       # 并行路由
│           └── edit/
├── api/
│   └── users/
│       └── route.ts      # API路由
├── globals.css
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

### 数据获取和缓存
```typescript
// ✅ 推荐：Server Component中的数据获取
export default async function UserList() {
  // 使用适当的缓存策略
  const users = await fetch('https://api.example.com/users', {
    next: { revalidate: 3600 } // 1小时后重新验证
  }).then(res => res.json());

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Server Actions
```typescript
// ✅ 推荐：使用Server Actions进行表单提交
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // 验证数据
  if (!name || !email) {
    throw new Error('姓名和邮箱是必填项');
  }
  
  // 保存到数据库
  const user = await db.user.create({
    data: { name, email }
  });
  
  // 重新验证相关页面
  revalidatePath('/users');
  
  return user;
}
```

### 错误处理和边界
```typescript
// error.tsx - 错误边界
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold mb-4">出现了一些问题</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        重试
      </button>
    </div>
  );
}
```

### 中间件使用
```typescript
// middleware.ts - 认证和重定向
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 检查认证状态
  const token = request.cookies.get('auth-token');
  
  // 保护的路由
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*']
};
```

### 性能和优化
- 使用动态导入和代码分割优化包大小
- 使用Next.js Image组件进行适当的尺寸调整和优化
- 实现适当的TypeScript严格模式配置
- 在需要时使用App Router的内置国际化(i18n)功能
- 利用流式传输和部分预渲染提高性能
- 实现适当的安全头和CSP策略

### 国际化示例
```typescript
// app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  
  // 验证locale是否支持
  if (!['en', 'zh'].includes(locale)) {
    notFound();
  }
  
  const t = await getTranslations('common');
  
  return (
    <html lang={locale}>
      <body>
        <nav>
          <h1>{t('title')}</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
```

## 安全最佳实践

### 环境变量管理
- 使用.env.local存储敏感信息
- 在代码中永远不要暴露或记录密钥和秘密
- 永远不要将密钥或秘密提交到仓库

### CSP和安全头
```typescript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

## 测试策略

### 单元测试
```typescript
// __tests__/components/user-card.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from '@/components/user-card';

const mockUser = {
  id: '1',
  name: '张三',
  email: 'zhangsan@example.com'
};

describe('UserCard', () => {
  it('应该正确显示用户信息', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('zhangsan@example.com')).toBeInTheDocument();
  });
});
```

### E2E测试
```typescript
// e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test('用户注册流程', async ({ page }) => {
  await page.goto('/register');
  
  // 填写表单
  await page.fill('[name="name"]', '测试用户');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  
  // 提交表单
  await page.click('button[type="submit"]');
  
  // 验证重定向到仪表板
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('欢迎，测试用户');
});
```

---

*此文档基于Next.js 15和现代React开发最佳实践编写，旨在为团队提供一致的开发规范和代码质量标准。*