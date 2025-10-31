import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import {PagesTopLoader} from 'nextjs-toploader/pages';

import {NextThemesProvider} from '@/app/lib/theme-provider';
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";


import {pagesExamplesLayoutProps} from '@/pages/libs/interfaces'

/**
 * 为 tailwind/4 pages 提供 Dark/Light 选则器。
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"/>
        <meta name="author" content="Pages Route"/>

        {/* Open Graph 标签 */}
        <meta property="og:title" content={`${title} - Pages Examples`}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>

        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={`${title} - Pages Examples`}/>
        <meta name="twitter:description" content={description}/>
      </Head>

      <PagesTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />

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
        <>
          {children}
        </>
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