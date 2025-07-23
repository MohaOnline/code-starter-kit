// 本文件为 Next.js 15 App Router 页面组件，使用 TypeScript 编写
// 业务逻辑简单，仅渲染主题切换按钮和标题
// 参考文档：https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
'use client';

import React from 'react';
import { ThemeToggle } from '@/app/lib/components/ThemeToggle';

// Page 组件为页面入口，类型为 React.FC（函数式组件）
const Page: React.FC = () => {
  return (
    <>
      <ThemeToggle />
      <h1>Page</h1>
    </>
  );
};

export default Page;
