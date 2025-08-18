'use client';

import Link from "next/link"; // tailwind v4
import Script from "next/script";

import React, {useState, useEffect} from 'react';

/**
 * @see /pages/tailwind/4/v01
 * @see /pages/pages/libs/pagesExamplesLayout.tsx
 */
export default function SamplePage() {
  const [classValues, setClassValues] = useState({
    h1_text: 'text-3xl',
  });

  // 引入 tailwind 变量，暂时无效。
  useEffect(() => {
    // 检查是否已存在相同样式标签，避免重复注入
    const existingStyle = document.querySelector('style[data-tailwind-theme]');
    if (existingStyle) return;

    // 创建 style 元素
    const styleElement = document.createElement('style');
    styleElement.type = 'text/tailwindcss';
    styleElement.setAttribute('data-tailwind-theme', 'true'); // 用于标识，避免重复

    // 注入样式内容（直接复制您的配置）
    styleElement.innerHTML = `
      .dark {
        --background: #000000;
        --foreground: rgb(120, 210, 120);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --background: #000000;
          --foreground: rgb(120, 210, 120);
        }
      }
      /* 自定义 class。 */
      @theme {
      }
    `;

    // 追加到 head 元素
    document.head.appendChild(styleElement);

    // 可选：清理函数，在组件卸载时移除
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // 空依赖数组，确保仅执行一次

  /**
   * Updates the value of a specific class in the `classValues` object based on the provided event.
   * 范例：event + 自定义内容一起传入函数。
   *
   * @param {Object} e - The event object triggered by the value change, typically a DOM event.
   * @param {string} [className=''] - The name of the class whose value is being updated. Defaults to an empty string.
   *
   * @description
   * If a valid `className` is provided, extracts the new value from the event's target and updates the corresponding entry in the `classValues` object.
   * After updating, a new object is created and set to `classValues` to reflect the change. If `className` is falsy or an empty string, the function exits without making any changes.
   */
  const handleClassValuesUpdate = (e, className = '') => {
    if (!className) {
      return;
    }

    classValues[className] = e.target.value;
    setClassValues({
      ...classValues,
    });
    console.dir(classValues);
  }

  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'}/>

      Class of H1 ↓: <input className={'border'} value={classValues.h1} onChange={e => handleClassValuesUpdate(e, 'h1')}/>
      <h1 id={'h1'} className={classValues.h1}>Tailwind v4 Playground</h1>

      {/* https://www.lipsum.com/ */}
      <div className={'border'}>
        恰恰与流行观念相反，Lorem Ipsum并不是简简单单的随机文本。它追溯于一篇公元前45年的经典拉丁著作，从而使它有着两千多年的岁数。弗吉尼亚州Hampden-Sydney大学拉丁系教授Richard
        McClintock曾在Lorem Ipsum段落中注意到一个涵义十分隐晦的拉丁词语，“consectetur”，通过这个单词详细查阅跟其有关的经典文学著作原文，McClintock教授发掘了这个不容置疑的出处。Lorem
        Ipsum始于西塞罗(Cicero)在公元前45年作的“de Finibus Bonorum et Malorum”（善恶之尽）里1.10.32 和1.10.33章节。这本书是一本关于道德理论的论述，曾在文艺复兴时期非常流行。Lorem
        Ipsum的第一行”Lorem ipsum dolor sit amet..”节选于1.10.32章节。
      </div>

    </>
  );
}