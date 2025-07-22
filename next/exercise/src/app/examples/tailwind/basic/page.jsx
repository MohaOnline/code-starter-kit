// Next.js 15 App Router 页面组件 - 使用 JavaScript
// 业务逻辑：展示主题切换功能的示例页面
// 技术背景：使用客户端组件来支持交互式主题切换
// 参考文档：https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
'use client';

import React from 'react';
import { ThemeToggle } from '@/app/lib/components/ThemeToggle';

/**
 * 示例页面组件
 * 
 * 功能说明：
 * - 展示主题切换按钮的使用示例
 * - 使用客户端组件以支持交互功能
 * 
 * 性能优化：
 * - 仅在需要交互时使用 'use client'
 * - 组件结构简洁，避免不必要的重渲染
 */
function ExamplePage() {
    return (
        <main className="container mx-auto p-4">
            {/* 主题切换组件 - 提供明暗主题切换功能 */}
            <div className="mb-6">
                <ThemeToggle />
            </div>
            
            {/* 页面标题 */}
            <header>
                <h1 className="text-2xl font-bold mb-4">
                    示例页面
                </h1>
                <p className="text-muted-foreground">
                    这是一个展示主题切换功能的示例页面。
                </p>
            </header>
        </main>
    );
}

// 使用具名导出以提高代码可读性和调试体验
export { ExamplePage };

// 默认导出保持 Next.js 页面组件约定
export default ExamplePage;
