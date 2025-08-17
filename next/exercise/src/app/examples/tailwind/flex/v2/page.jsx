// 参考文档：https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
'use client';

import React from 'react';
import {ThemeToggle} from '@/app/lib/components/ThemeToggle';

// Page 组件为页面入口，类型为 React.FC（函数式组件）
const Page = () => {
  return (
    <>
      <ThemeToggle/>
      <h1>Page</h1>
    </>
  );
};

export default Page;
