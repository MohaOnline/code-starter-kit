import React from 'react';
import Link from 'next/link';
import { withTsCcLayout } from './_layout';

/**
 * TS-CC 主页面组件
 * 展示统一布局系统的概览和导航
 * 演示如何在 Pages Router 中实现统一的 HTML head 和 body 结构管理
 */
function TsCcIndexPage() {
  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          欢迎来到 TS-CC
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          TypeScript Code Challenge 项目展示了如何在 Next.js Pages Router 中
          实现统一的页面布局管理。所有子页面共享相同的 HTML head 设置和页面结构，
          而页面组件只需要专注于 body 内容的实现。
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/pages/examples/ts-cc/v1"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            查看 V1 示例
          </Link>
          <a 
            href="#features"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            了解特性
          </a>
        </div>
      </div>

      {/* 布局系统说明 */}
      <div id="features" className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          统一布局系统特性
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 特性 1 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                统一 HTML Head 管理
              </h3>
              <p className="text-gray-600">
                所有页面自动包含统一的 meta 标签、SEO 设置、Open Graph 标签等，
                子页面可以通过参数自定义 title、description 等信息。
              </p>
            </div>
          </div>

          {/* 特性 2 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                统一页面结构
              </h3>
              <p className="text-gray-600">
                包含导航栏、主内容区域和页脚的完整页面结构，
                确保所有页面具有一致的用户体验和视觉风格。
              </p>
            </div>
          </div>

          {/* 特性 3 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                TypeScript 类型安全
              </h3>
              <p className="text-gray-600">
                完整的 TypeScript 接口定义，提供类型检查和智能提示，
                确保布局参数的正确性和开发效率。
              </p>
            </div>
          </div>

          {/* 特性 4 */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                多种使用方式
              </h3>
              <p className="text-gray-600">
                支持高阶组件（HOC）和 getLayout 两种使用模式，
                灵活适应不同的开发需求和代码组织方式。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 使用方法说明 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          使用方法
        </h2>
        
        <div className="space-y-6">
          {/* 方法 1 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              方法一：使用高阶组件（推荐）
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-800">
                <code>{`import { withTsCcLayout } from './_layout';

function MyPage() {
  return (
    <div>
      {/* 只需要编写 body 内容 */}
      <h1>我的页面标题</h1>
      <p>页面内容...</p>
    </div>
  );
}

// 导出时包装布局，设置页面特定信息
export default withTsCcLayout(MyPage, {
  title: '我的页面',
  description: '页面描述',
  keywords: 'typescript, example'
});`}</code>
              </pre>
            </div>
          </div>

          {/* 方法 2 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              方法二：使用 getLayout 模式
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-800">
                <code>{`import { getTsCcLayout } from './_layout';

function MyPage() {
  return (
    <div>
      {/* 只需要编写 body 内容 */}
      <h1>我的页面标题</h1>
      <p>页面内容...</p>
    </div>
  );
}

// 设置布局函数
MyPage.getLayout = getTsCcLayout({
  title: '我的页面',
  description: '页面描述'
});

export default MyPage;`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 页面列表 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          可用页面
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/pages/examples/ts-cc/v1"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              V1 页面
            </h3>
            <p className="text-gray-600 text-sm">
              展示统一布局系统的完整功能和使用示例
            </p>
            <div className="mt-3 text-blue-600 text-sm font-medium">
              查看页面 →
            </div>
          </Link>
          
          {/* 预留更多页面卡片 */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              V2 页面
            </h3>
            <p className="text-gray-500 text-sm">
              即将推出更多功能和示例
            </p>
            <div className="mt-3 text-gray-400 text-sm">
              敬请期待...
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              V3 页面
            </h3>
            <p className="text-gray-500 text-sm">
              更多高级功能和交互示例
            </p>
            <div className="mt-3 text-gray-400 text-sm">
              敬请期待...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 使用 withTsCcLayout 包装主页面
export default withTsCcLayout(TsCcIndexPage, {
  title: 'TS-CC 主页',
  description: 'TypeScript Code Challenge 项目主页，展示统一布局系统',
  keywords: 'typescript, code challenge, layout, next.js, pages router'
});