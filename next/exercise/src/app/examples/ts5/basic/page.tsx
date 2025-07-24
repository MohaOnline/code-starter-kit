// 本文件为 Next.js 15 App Router 页面组件，使用 TypeScript 编写
// 业务逻辑简单，仅渲染主题切换按钮和标题
// 参考文档：https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
"use client";

import React from "react";
import { ThemeToggle } from "@/app/lib/components/ThemeToggle";

/**
 *
 * @returns {string}
 */
const demoTypeScriptBasic: () => string = (): string => {
  return "";
};

/**
 * 返回 JSX 的可以直接当 React 组件使用
 *
 * @returns {React.ReactElement} JSX 元素
 */
const TypeScriptBasicReact: () => React.ReactElement = (): React.ReactElement => {
  // : () => React.ReactElement 指：变量 TypeScriptBasicReact 是一个无参数并返回 React.ReactElement 类型的函数
  // : React.ReactElement 指：箭头函数 () => {} 返回值类型为 React.ReactElement

  return (
    <>
      <div>TypeScriptBasicReact</div>
    </>
  );
};

// Page 组件为页面入口，类型为 React.FC（函数式组件）
const Page: React.FC = () => {
  const basic = demoTypeScriptBasic();
  console.log(basic);

  return (
    <>
      <ThemeToggle />
      <TypeScriptBasicReact />
      <h1>Page</h1>
    </>
  );
};

export default Page;
