import React from 'react';
import Head from 'next/head';

/**
 * TS-CC 页面统一布局组件
 * 为 ts-cc 目录下的所有子页面提供统一的 HTML head 和 body 结构
 * 子页面只需要提供 body 内容，布局会自动包装
 */

interface TsCcLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

export default function TsCcLayout({
  children,
  title = 'TS-CC 页面',
  description = 'TypeScript Code Challenge 页面',
  keywords = 'typescript, code, challenge, next.js'
}: TsCcLayoutProps) {
  return (
    <>
      {/* 统一的 HTML Head 设置 */}
      <Head>
        <title>{title} - TS-CC</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="TS-CC Team" />
        
        {/* Open Graph 标签 */}
        <meta property="og:title" content={`${title} - TS-CC`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title} - TS-CC`} />
        <meta name="twitter:description" content={description} />
        
        {/* 字体和样式预加载 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 网站图标 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 统一的 Body 结构 */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* 页面头部导航 */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  TS-CC
                </h1>
                <span className="ml-2 text-sm text-gray-500">
                  TypeScript Code Challenge
                </span>
              </div>
              
              <nav className="flex space-x-4">
                <a 
                  href="/pages/examples/ts-cc" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  首页
                </a>
                <a 
                  href="/pages/examples/ts-cc/v1" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  V1
                </a>
              </nav>
            </div>
          </div>
        </header>
        
        {/* 主要内容区域 */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* 子页面内容在这里渲染 */}
            {children}
          </div>
        </main>
        
        {/* 页面底部 */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>
                © 2024 TS-CC Project. 
                使用 Next.js Pages Router 构建.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
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
export function withTsCcLayout(
  Component: React.ComponentType,
  layoutProps?: Omit<TsCcLayoutProps, 'children'>
) {
  const WrappedComponent = (props: any) => {
    return (
      <TsCcLayout {...layoutProps}>
        <Component {...props} />
      </TsCcLayout>
    );
  };
  
  // 保持组件名称用于调试
  WrappedComponent.displayName = `withTsCcLayout(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
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
export function getTsCcLayout(layoutProps?: Omit<TsCcLayoutProps, 'children'>) {
  return function getLayout(page: React.ReactElement) {
    return (
      <TsCcLayout {...layoutProps}>
        {page}
      </TsCcLayout>
    );
  };
}