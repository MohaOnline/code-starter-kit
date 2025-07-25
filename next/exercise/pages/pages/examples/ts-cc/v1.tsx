import React from 'react';
import { withTsCcLayout } from './_layout';

/**
 * TS-CC V1 页面组件
 * 这个组件只包含 body 内容，HTML head 和整体布局由 _layout.tsx 统一处理
 * 展示了如何在 Pages Router 中实现统一布局管理
 */
function TsCcV1Page() {
  return (
    <div className="space-y-8">
      {/* 页面标题区域 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          TS-CC V1 页面
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          这是一个使用统一布局的示例页面。HTML head、导航栏和页脚都由布局组件统一管理，
          这个页面组件只需要关注 body 内容的实现。
        </p>
      </div>

      {/* 功能展示区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 特性卡片 1 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">
              统一布局
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            所有 ts-cc 目录下的页面共享相同的 HTML head 设置、导航栏和页脚结构。
          </p>
        </div>

        {/* 特性卡片 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">
              TypeScript 支持
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            完整的 TypeScript 类型定义，提供更好的开发体验和代码安全性。
          </p>
        </div>

        {/* 特性卡片 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">
              高性能
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            基于 Next.js Pages Router，支持 SSG、SSR 等多种渲染模式。
          </p>
        </div>
      </div>

      {/* 代码示例区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          使用示例
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-800">
            <code>{`// 使用 withTsCcLayout 高阶组件
import { withTsCcLayout } from './_layout';

function MyPage() {
  return (
    <div>
      {/* 只需要编写 body 内容 */}
      <h1>我的页面</h1>
      <p>页面内容...</p>
    </div>
  );
}

// 导出时包装布局
export default withTsCcLayout(MyPage, {
  title: '我的页面',
  description: '页面描述',
  keywords: 'typescript, example'
});`}</code>
          </pre>
        </div>
      </div>

      {/* 交互演示区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          交互演示
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              主要按钮
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              次要按钮
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>提示:</strong> 这个页面的 HTML head、导航栏和页脚都是由布局组件自动添加的。
              页面组件只需要专注于内容区域的实现。
            </p>
          </div>
        </div>
      </div>

      {/* 技术说明区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          技术实现说明
        </h2>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-start">
            <span className="font-medium text-gray-800 w-20 flex-shrink-0">布局:</span>
            <span>使用 _layout.tsx 提供统一的页面结构</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-800 w-20 flex-shrink-0">SEO:</span>
            <span>自动设置 title、description、keywords 等 meta 标签</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-800 w-20 flex-shrink-0">样式:</span>
            <span>使用 Tailwind CSS 实现响应式设计</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-800 w-20 flex-shrink-0">类型:</span>
            <span>完整的 TypeScript 类型定义和接口</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 使用 withTsCcLayout 高阶组件包装页面，设置页面特定的 meta 信息
export default withTsCcLayout(TsCcV1Page, {
  title: 'V1 版本',
  description: 'TS-CC V1 版本页面，展示统一布局系统的使用方法',
  keywords: 'typescript, code challenge, v1, layout, next.js'
});