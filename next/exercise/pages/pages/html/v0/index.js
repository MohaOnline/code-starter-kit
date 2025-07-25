import React from 'react';
import Head from 'next/head';

/**
 * HTML v0 页面组件
 * 使用 Pages Router 创建的基础 HTML 页面
 * 路由路径: /html/v0
 */
export default function HtmlV0Page() {
  return (
    <>
      <Head>
        <title>HTML v0 页面</title>
        <meta name="description" content="使用 Pages Router 创建的 HTML v0 页面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              HTML v0 页面
            </h1>
            <p className="text-lg text-gray-600">
              这是使用 Next.js Pages Router 创建的 HTML v0 页面
            </p>
          </div>

          {/* 主要内容区域 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              页面信息
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">路由:</span>
                <span className="text-gray-600">/html/v0</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">类型:</span>
                <span className="text-gray-600">Pages Router</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">版本:</span>
                <span className="text-gray-600">v0</span>
              </div>
            </div>
          </div>

          {/* 示例内容 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              示例内容
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                这是一个基础的 HTML 页面示例，展示了如何使用 Next.js Pages Router 创建页面。
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                特性说明:
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>使用 Pages Router 路由系统</li>
                <li>包含 SEO 友好的 meta 标签</li>
                <li>响应式设计，支持移动端</li>
                <li>使用 Tailwind CSS 样式</li>
                <li>清晰的页面结构和布局</li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>提示:</strong> 这个页面可以通过访问 
                  <code className="bg-blue-100 px-1 rounded">/html/v0</code> 
                  路径来查看。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 服务端渲染函数 (可选)
 * 在页面渲染前获取数据
 */
export async function getStaticProps() {
  return {
    props: {
      // 可以在这里传递数据给页面组件
      timestamp: new Date().toISOString(),
    },
  };
}