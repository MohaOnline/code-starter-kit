// 本文件为 Next.js 15 App Router 页面组件，使用 TypeScript 编写
// 业务逻辑简单，仅渲染主题切换按钮和标题
// 参考文档：https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
"use client";

import React from "react";

// React Icons imports.
import {FaInfo} from "react-icons/fa";
import {MdOutlineWarning} from "react-icons/md";

// 自定义通用类型、函数、类 imports。
import {simpleStringFn} from "@/app/lib/common/interfaces";
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";
import {TemperatureConverter} from "@/app/lib/common/TemperatureConverter";

/**
 *
 * @returns {string}
 */
const demoTypeScriptBasic: simpleStringFn = () => {
  return "";
};

/**
 * 返回 JSX 的可以直接当 React 组件使用
 *
 * @returns {React.ReactElement} JSX 元素
 */
/*
const TypeScriptBasicReact: () => React.ReactElement = (): React.ReactElement => {
  // : () => React.ReactElement 指：变量 TypeScriptBasicReact 是一个无参数并返回 React.ReactElement 类型的函数
  // : React.ReactElement 指：箭头函数 () => {} 返回值类型为 React.ReactElement
*/
const TypeScriptBasicReact = () => {

  // Primitive types Demo:
  // 赋值时 type 可以推断，显示指定是冗余的。
  const bodyNormalTemperature: number = 37;
  const explanation: string = '温度自动转换：';
  const ifWarning: boolean = false;
  const bigNumber: bigint = 100n;


  console.log(typeof demoTypeScriptBasic);

  return (
    <>
      <div>TypeScriptBasicReact</div>
      <div className={'flex items-center'}>
        {ifWarning ? <MdOutlineWarning/> : <FaInfo/>} 37 °C = {TemperatureConverter.celsiusToFahrenheit(bodyNormalTemperature)} °F
        {explanation}
      </div>
    </>
  )
};

// Page 组件为页面入口，类型为 React.FC（函数式组件）
const Page: React.FC = () => {
  const basic = demoTypeScriptBasic();
  console.log(basic);

  return (
    <>
      <ThemeToggle/>
      <h1>TypeScript Basic</h1>
      <TypeScriptBasicReact/>
    </>
  );
};

export default Page;
