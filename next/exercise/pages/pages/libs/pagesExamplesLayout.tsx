import React from 'react';
import Head from 'next/head';
// import {Html, Head, Main, NextScript} from 'next/document'
import {useRouter} from 'next/router';
import {NextThemesProvider} from '@/app/lib/theme-provider';
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";


import {pagesExamplesLayoutProps} from '@/pages/libs/interfaces'

/**
 * TS-CC 页面统一布局组件
 * 为 ts-cc 目录下的所有子页面提供统一的 HTML head 和 body 结构
 * 子页面只需要提供 body 内容，布局会自动包装
 */



export default function PagesExamplesLayout(
  {
    children,
    title = 'Pages Examples',
    description = 'Pages examples',
    keywords = 'code demo, example, next.js',
  }: pagesExamplesLayoutProps
) {

  const {pathname} = useRouter();
  const needThemeProvider = pathname.startsWith('/pages/tailwind/4');
  if (needThemeProvider) {
  }

  return (
    <>
      {/* 统一的 HTML Head 设置 */}
      <Head>
        <title>{`${title} - Pages Examples`}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="author" content="Pages Route"/>

        {/* Open Graph 标签 */}
        <meta property="og:title" content={`${title} - Pages Examples`}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>

        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={`${title} - Pages Examples`}/>
        <meta name="twitter:description" content={description}/>

        {/*/!* 字体和样式预加载 *!/*/}
        {/*<link rel="preconnect" href="https://fonts.googleapis.com"/>*/}
        {/*<link rel="preconnect" href="https://fonts.gstatic.com"*/}
        {/*      crossOrigin="anonymous"/>*/}

        {/* 网站图标 */}
        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" href="/fonts/local.css"/>
      </Head>

      {needThemeProvider ? (
        <NextThemesProvider attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange>
          <ThemeToggle/>
          {/* 子页面内容在这里渲染 */}
          {children}
        </NextThemesProvider>
      ) : (
        {children}
      )}
    </>
  )
}

/**
 * A higher-order component that wraps the given React component with a layout defined by `PagesExamplesLayout`.
 * It passes layout properties like `title`, `description`, and `keywords` to the layout, and renders the original component as its child.
 *
 * @param {React.FunctionComponent} Component - The React component to be wrapped. This must be a valid React component type.
 * @param {Omit<pagesExamplesLayoutProps, 'children'>} [layoutProps] - Optional metadata for the layout, such as `title`, `description`, and `keywords`.
 * @return {React.FunctionComponent} A new React functional component that includes the provided component inside the layout.
 */
export function withPagesExamplesLayout(
  Component: React.FunctionComponent, // 在 JSX 中尝试使用 `<Component {...props} />` 需要 `Component` 是一个有效的组件类型
  layoutProps?: Omit<pagesExamplesLayoutProps, 'children'>, // Meta data.
) {

  console.log('withPagesExamplesLayout: ', Component, layoutProps)

  // pros 传入的所有 属性/值 pairs，比如：name="city_input" value="shanghai"。
  const WrappedComponent = (props: any) => {
    // 使用类型安全的方式传递属性
    return (
      <PagesExamplesLayout title={layoutProps?.title}
                           description={layoutProps?.description}
                           keywords={layoutProps?.keywords}>
        <Component {...props} />
      </PagesExamplesLayout>
    )
  }

  // 保持组件名称用于调试
  WrappedComponent.displayName =
    `withPagesExamplesLayout(${Component.displayName || Component.name || 'Component'})`

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
export function getPagesExamplesLayout(layoutProps?: Omit<pagesExamplesLayoutProps, 'children'>) {
  return function getLayout (page: React.ReactElement) {
    return (
      <PagesExamplesLayout
        title={layoutProps?.title}
        description={layoutProps?.description}
        keywords={layoutProps?.keywords}
      >
        {page}
      </PagesExamplesLayout>
    )
  }
}