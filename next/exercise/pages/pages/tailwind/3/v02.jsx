'use client';

import Link from "next/link"; // tailwind v4
import Script from "next/script";

import React, {useState, useEffect} from 'react';

import {useElement4HeadSupplement} from '@/lib/customHooks.js';


/**
 * @see /pages/tailwind/4/v02
 * @see /pages/pages/libs/pagesExamplesLayout.tsx
 */
export default function SamplePage() {

  /**
   * SamplePage 正式内容
   *
   * @see /pages/tailwind/4/v02
   */
  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>

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