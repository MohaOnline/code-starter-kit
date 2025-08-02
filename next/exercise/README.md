This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel
# Next.js 项目

## 运行测试

项目使用 Vitest 和 React Testing Library 进行组件测试。

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 运行测试

```bash
# 运行所有测试
npm test

# 以监视模式运行测试
npm run test:watch

# 使用UI界面运行测试
npm run test:ui

# 生成测试覆盖率报告
npm run test:coverage
```

### 测试文件位置

测试文件位于与被测组件相同的目录下的 `__tests__` 文件夹中。
例如，`src/app/examples/ts5/basic/v1/page.tsx` 的测试文件位于 `src/app/examples/ts5/basic/v1/__tests__/page.test.tsx`。

### 测试命名约定

- 组件测试文件：`ComponentName.test.tsx`
- 函数测试文件：`functionName.test.ts`

### 为什么使用 Vitest 而不是 Jest

项目使用 Vitest 替代 Jest 作为测试运行器，主要原因是：

1. 对 React 19 有更好的兼容性支持
2. 更快的测试运行速度
3. 与 Vite 生态系统的无缝集成
4. 开箱即用的 TypeScript 支持
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Changelog

2025/06/13



2025/05/17

- 添加键盘控制支持
