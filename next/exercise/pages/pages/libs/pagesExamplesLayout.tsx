import React from 'react'
import Head from 'next/head'

import { pagesExamplesLayoutProps } from '@/pages/libs/interfaces'

/**
 * TS-CC 页面统一布局组件
 * 为 ts-cc 目录下的所有子页面提供统一的 HTML head 和 body 结构
 * 子页面只需要提供 body 内容，布局会自动包装
 */



export function PagesExamplesLayout ({
  children,
  title = 'Pages Examples',
  description = 'Pages examples',
  keywords = 'code demo, example, next.js',
}: pagesExamplesLayoutProps) {

  return (
    <>
      {/* 统一的 HTML Head 设置 */}
      <Head>
        <title>{`${title} - Pages Examples`}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="author" content="TS-CC Team"/>

        {/* Open Graph 标签 */}
        <meta property="og:title" content={`${title} - TS-CC`}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>

        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={`${title} - TS-CC`}/>
        <meta name="twitter:description" content={description}/>

        {/* 字体和样式预加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"
              crossOrigin="anonymous"/>

        {/* 网站图标 */}
        <link rel="icon" href="/favicon.ico"/>
      </Head>


      {/* 子页面内容在这里渲染 */}
      {children}
    </>
  )
}

/**
 * 为页面组件添加布局的高阶组件
 * 使用方式：
 *
 * ```tsx
 * import { withTsCcLayout } from './_layout';
 *
 * function MyPage() {
 *   return <div>页面内容</div>;
 * }
 *
 * export default withTsCcLayout(MyPage, {
 *   title: '我的页面',
 *   description: '页面描述'
 * });
 * ```
 */
export function withPagesExamplesLayoutLayout (
  Component: React.ComponentType,
  layoutProps?: Omit<pagesExamplesLayoutProps, 'children'>,
) {

  const WrappedComponent = (props: any) => {
    return (
      <PagesExamplesLayout {...layoutProps}>
        <Component {...props} />
      </PagesExamplesLayout>
    )
  }

  // 保持组件名称用于调试
  WrappedComponent.displayName = `withPagesExamplesLayout(${Component.displayName ||
  Component.name})`

  return WrappedComponent
}

/**
 * 获取布局函数，用于 Next.js getLayout 模式
 * 使用方式：
 *
 * ```tsx
 * import { getTsCcLayout } from './_layout';
 *
 * function MyPage() {
 *   return <div>页面内容</div>;
 * }
 *
 * MyPage.getLayout = getTsCcLayout({
 *   title: '我的页面',
 *   description: '页面描述'
 * });
 *
 * export default MyPage;
 * ```
 */
export function getTsCcLayout (layoutProps?: Omit<pagesExamplesLayoutProps, 'children'>) {
  return function getLayout (page: React.ReactElement) {
    return (
      <PagesExamplesLayout {...layoutProps}>
        {page}
      </PagesExamplesLayout>
    )
  }
}