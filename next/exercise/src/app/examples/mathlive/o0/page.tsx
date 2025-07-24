'use client';

import Head from 'next/head';
import { useEffect } from 'react';

/**
 * MathLive 数学编辑器示例页面
 * 加载第三方数学编辑器库并提供基础容器
 */
export default function MathLiveO0Page() {
  useEffect(() => {
    // 动态加载 CSS 文件
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/3rd/mathEditor.7c968c35.css';
    document.head.appendChild(cssLink);

    // 动态加载 JS 文件
    const script = document.createElement('script');
    script.src = '/3rd/mathEditor.78141fae.js';
    script.async = true;
    document.head.appendChild(script);

    // 清理函数：组件卸载时移除动态添加的资源
    return () => {
      document.head.removeChild(cssLink);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>MathLive O0 - 数学编辑器示例</title>
        <meta name="description" content="MathLive 数学编辑器基础示例" />
      </Head>
      
      {/* 主容器 div，提供给数学编辑器使用 */}
      <div id="main"></div>
    </>
  );
}