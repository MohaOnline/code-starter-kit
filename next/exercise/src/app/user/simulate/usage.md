


          
## 在不同场景中获取登录状态和用户信息

根据你的 NextAuth.js 配置，可以在不同场景中获取登录状态和用户信息：

### 1. 客户端组件中

#### 使用 useSession Hook
```typescript
'use client'

import { useSession } from 'next-auth/react'

export default function ClientComponent() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>加载中...</div>
  if (status === 'unauthenticated') return <div>未登录</div>

  // 获取用户信息
  const userId = session?.user?.id
  const userLogin = session?.user?.email // 在你的配置中，email 字段存储的是 login
  const userName = session?.user?.name

  return (
    <div>
      <p>用户ID: {userId}</p>
      <p>登录名: {userLogin}</p>
      <p>用户名: {userName}</p>
    </div>
  )
}
```

### 2. 服务端组件中

#### 使用 getServerSession
```typescript
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function ServerComponent() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>未登录</div>
  }

  // 获取用户信息
  const userId = session.user.id
  const userLogin = session.user.email
  const userName = session.user.name

  return (
    <div>
      <p>用户ID: {userId}</p>
      <p>登录名: {userLogin}</p>
      <p>用户名: {userName}</p>
    </div>
  )
}
```

#### 需要导出 authOptions
首先需要修改 NextAuth 配置文件，导出 authOptions：

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      // ... 你现有的配置
    })
  ],
  // ... 其他配置
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### 3. API 路由中

#### 使用 getServerSession
```typescript
// src/app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: '未授权访问' },
      { status: 401 }
    )
  }

  // 获取用户信息
  const userId = session.user.id
  const userLogin = session.user.email
  const userName = session.user.name

  return NextResponse.json({
    message: '授权成功',
    user: {
      id: userId,
      login: userLogin,
      name: userName
    }
  })
}
```

#### 使用 JWT Token 验证（替代方案）
```typescript
// src/app/api/protected-jwt/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })

  if (!token) {
    return NextResponse.json(
      { error: '未授权访问' },
      { status: 401 }
    )
  }

  // 从 JWT token 中获取用户信息
  const userId = token.id
  const userLogin = token.email
  const userName = token.name

  return NextResponse.json({
    message: '授权成功',
    user: {
      id: userId,
      login: userLogin,
      name: userName
    }
  })
}
```

### 4. 中间件中进行路由保护

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // 可以在这里添加额外的逻辑
    console.log('用户已认证:', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/protected/:path*', '/admin/:path*']
}
```

### 5. 自定义 Hook 封装

```typescript
// src/hooks/useAuth.ts
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface UseAuthOptions {
  required?: boolean
  redirectTo?: string
}

export function useAuth(options: UseAuthOptions = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { required = false, redirectTo = '/user/simulate' } = options

  useEffect(() => {
    if (required && status === 'unauthenticated') {
      router.push(redirectTo)
    }
  }, [status, required, redirectTo, router])

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    user: session?.user,
    userId: session?.user?.id,
    userLogin: session?.user?.email,
    userName: session?.user?.name
  }
}
```

使用自定义 Hook：
```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function ProtectedPage() {
  const { isAuthenticated, userId, userLogin, userName } = useAuth({ 
    required: true 
  })

  if (!isAuthenticated) return null

  return (
    <div>
      <h1>受保护的页面</h1>
      <p>用户ID: {userId}</p>
      <p>登录名: {userLogin}</p>
      <p>用户名: {userName}</p>
    </div>
  )
}
```

### 总结

- **客户端组件**: 使用 `useSession()` Hook
- **服务端组件**: 使用 `getServerSession(authOptions)`
- **API 路由**: 使用 `getServerSession()` 或 `getToken()`
- **中间件**: 使用 `withAuth()` 进行路由保护
- **自定义封装**: 创建 `useAuth` Hook 简化使用

根据你的 NextAuth 配置，用户信息映射关系为：
- `session.user.id` → 用户数据库 ID
- `session.user.email` → 用户 login 字段
- `session.user.name` → 用户 nickname 或 login
        