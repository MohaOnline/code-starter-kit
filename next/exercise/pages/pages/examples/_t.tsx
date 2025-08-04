import React from 'react';
import {withPagesExamplesLayout} from '@/pages/libs/pagesExamplesLayout'

/**
 * TS-CC 主页面组件
 * 展示统一布局系统的概览和导航
 * 演示如何在 Pages Router 中实现统一的 HTML head 和 body 结构管理
 */
function Page () {

  return (
    <>
      <div className="space-y-8">
        {/* 欢迎区域 */}
        Welcome
      </div>
    </>
  );
}

// 使用 共通 Pages Examples 的包装主页面
export default withPagesExamplesLayout(Page, {
  title: 'Pure Index',
  description: 'TypeScript Code Challenge 项目主页，展示统一布局系统',
  keywords: 'typescript, code challenge, layout, next.js, pages router'
});
