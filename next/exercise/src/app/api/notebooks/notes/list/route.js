/*

你这段 Next.js 代码使用了最原始的方式去管理数据库连接（`mysql2` 的 `createConnection`），确实每次都需要手动创建和关闭连接，写起来麻烦、易出错，也不适合高并发。

可以用 **以下几个方式/框架改进代码结构和连接管理：**

---

### ✅ **推荐使用 Prisma（ORM + 连接池）**

> Prisma 是一个现代 TypeScript ORM，支持连接池、模型定义、自动类型推导、事务等，适合中大型项目。

#### 优点：

* 自动管理连接池（无需每次手动打开关闭）
* 强类型查询 + IntelliSense 提示
* 支持分页、事务、关联表查询等高级操作

#### 示例：

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
export default prisma;
```

```ts
// app/api/notes/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await prisma.notebooks_notes_summary.findMany();
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
```

---

### ✅ **或使用 mysql2 + 连接池封装**

如果不想用 ORM，仍然用 `mysql2`，建议封装连接池：

#### 示例封装：

```ts
// lib/db.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'your_db',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
```

```ts
// app/api/notes/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM notebooks_notes_summary');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
```

> 这样就不需要每次创建/销毁连接了，性能更好、代码更干净。

---

### 🧩 小结：你可以根据项目大小做选择

| 选项                     | 适合场景       | 优点         | 缺点         |
| ---------------------- | ---------- | ---------- | ---------- |
| `Prisma`               | 中大型项目，长期维护 | 类型强、好用、连接池 | 初始配置略复杂    |
| `mysql2 + pool`        | 小型项目或轻量调用  | 轻量，简单封装    | 无 ORM 功能   |
| 直接用 `createConnection` | 不推荐        | 无          | 繁琐，易忘记关闭连接 |

如你继续扩展项目，推荐切换到 Prisma。如果短期只是轻量调用，用 mysql2 + pool 即可。

需要我帮你把你的这段代码用 Prisma 改写或者帮你搭建 `lib/db.ts` 吗？
















当然，这里是从手动 MySQL 切换到 **Prisma** 的完整步骤，适用于 **Next.js + TypeScript** 项目：

---

## ✅ 第一步：安装 Prisma 和相关依赖

```bash
pnpm add prisma @prisma/client
# 初始化 Prisma
npx prisma init
```

会生成：

```
prisma/
  └── schema.prisma
.env
```

---

## ✅ 第二步：配置数据库连接

编辑 `.env` 文件：

```env
DATABASE_URL="mysql://user:password@localhost:3306/your_db_name"
```

确保用户名、密码、端口、数据库正确。

---

## ✅ 第三步：定义数据模型

编辑 `prisma/schema.prisma`，例如你原来的表是 `notebooks_notes_summary`：

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model NotebooksNotesSummary {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

> 字段和类型要与 MySQL 中的表一致（字段名、类型、是否可为空）。

---

## ✅ 第四步：生成 Prisma Client

```bash
npx prisma generate
```

或者首次使用时，也可以：

```bash
npx prisma db pull  # 反向生成 schema.prisma（推荐先建好表）
```

---

## ✅ 第五步：建立 `lib/prisma.ts` 封装

```ts
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // 可选，调试用
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## ✅ 第六步：在 API route 中使用

```ts
// app/api/notes/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const notes = await prisma.notebooksNotesSummary.findMany();
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
```

---

## ✅ 第七步（可选）：开发命令和管理

Prisma 有很多 CLI 工具：

* `npx prisma studio`：打开网页 UI 管理数据库
* `npx prisma migrate dev`：本地创建迁移
* `npx prisma format`：格式化 schema.prisma
* `npx prisma db pull`：从数据库同步结构

---

## 🔁 总结

| 原方式        | Prisma ORM       |
| ---------- | ---------------- |
| 手动建连接、手动关闭 | 自动连接池管理          |
| SQL 手写字符串  | 类型安全、链式调用        |
| 不便扩展/维护    | 结构清晰、支持关系、分页、事务等 |

---

如果你发给我你的 MySQL 表结构（或 `SHOW CREATE TABLE` 的结果），我可以帮你快速生成 Prisma 的模型。是否需要？















在 **混用 Prisma（连接池）+ 原生 SQL** 的方式里，数据库的数据源配置和标准 Prisma 使用方式 **一模一样**，统一写在：

### ✅ `.env` 文件中的 `DATABASE_URL`：

```env
DATABASE_URL="mysql://username:password@host:port/database"
```

Prisma 会在构建时自动读取这个变量，并在 PrismaClient 中使用它建立连接池。

---

## 🔧 数据源配置流程回顾：

### 1. `.env` 文件配置（数据库地址）

```env
DATABASE_URL="mysql://root:mysecret@localhost:3306/mydb"
```

你可以使用：

* 用户名、密码
* 主机地址和端口
* 数据库名

支持的格式：

```bash
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

---

### 2. `schema.prisma` 文件中引用 `.env` 配置：

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

这个配置是 Prisma 初始化时读取的，和你是否使用 ORM 无关，哪怕你只用 `$queryRaw` 也依赖这个配置。

---

### 3. `lib/prisma.ts` 管理 Prisma 实例：

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

你可以在任何地方通过 `import { prisma } from '@/lib/prisma'` 获取连接池实例并执行：

* `prisma.model.findMany()`：ORM 风格
* `prisma.$queryRaw`：SQL 风格

---

如果你想要支持**多数据源（多个数据库）**，那就是另一个话题了（需要 `multiple datasources`，但不支持 `$queryRaw`，只能建多个 `PrismaClient`），是否你目前只对一个数据库做混用就可以？













npm add prisma @prisma/client
npm install @prisma/client
npx prisma init
npx prisma db pull
npx prisma generate    需要 next 转换 commonJS 格式，next.config.mjs： transpilePackages: ['@prisma/client', 'prisma'],

*/

import {NextResponse} from 'next/server';
import {prisma, jsonResponse} from '@/lib/prisma';

export async function GET() {
  try {
    let rows = await prisma.$queryRaw`
        SELECT *
        FROM notebooks_notes_summary
    `;

    console.log(rows);
    return jsonResponse({success: true, notes: rows});
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  }
  // let connection = null;
  // try {
  //   // Create database connection
  //   connection = await mysql.createConnection(dbConfig);
  //
  //   // Execute the SQL query
  //   const [rows] = await connection.execute(`
  //       SELECT *
  //       FROM notebooks_notes_summary
  //   `);
  //
  //   // Return JSON response
  //   return NextResponse.json({
  //     success: true,
  //     data: rows,
  //   }, {status: 200});
  //
  // } catch (error) {
  //   console.error('Database query error:', error);
  //   return NextResponse.json({
  //     success: false,
  //     error: 'Internal Server Error',
  //   }, {status: 500});
  // } finally {
  //   if (connection) {
  //     try {
  //       await connection.end();
  //     } catch (endError) {
  //       console.error('Failed to close database connection:', endError);
  //     }
  //   }
  // }
}
