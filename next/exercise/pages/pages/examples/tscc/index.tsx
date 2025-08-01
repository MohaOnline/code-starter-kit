'use client'

import React from 'react'
import Script from 'next/script'
import {withPagesExamplesLayout} from '@/pages/libs/pagesExamplesLayout'

/**
 * 演示如何产生一个干净的页面。
 *
 * @return
 *     1. **JSX.Element**：最常用于函数组件的返回类型，表示单个JSX元素 [[2]](https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement)
 *     2. **React.ReactElement**：与JSX.Element基本相同，代表由React.createElement()创建的对象 [[4]](https://www.totaltypescript.com/jsx-element-vs-react-reactnode)
 *     3. **React.FC** (Function Component)：一个更完整的类型，包含了children和其他React组件特有的属性 [[6]](https://www.reddit.com/r/reactjs/comments/i4jx85/reactfc_vs_jsxelement/)
 *     4. **不指定返回类型**：让TypeScript自动推断（在现代TypeScript配置中通常也能正确工作）
 *
 */
function Page(): React.ReactElement {

  return (
    <>
      {/*
          页面加载顺序：
          1. HTML 解析开始
          2. beforeInteractive 脚本加载 ✅ (DOMContentLoaded 还未触发)
          3. DOM 构建完成
          4. DOMContentLoaded 事件触发 ✅ (事件监听器执行) - HTML 文档结构解析完时触发
          5. 页面变为交互式
          6. afterInteractive 脚本加载 ❌ (DOMContentLoaded 已经触发过了)
          7. 页面空闲时
          8. lazyOnload 脚本加载 ❌ (DOMContentLoaded 已经触发过了)
      */}
      <Script src="/pages/tscc/scripts/employees.js"
              strategy={'beforeInteractive'}
              onLoad={() => {
                  console.log('👋 Script has loaded')
              }}></Script>
      <h1>Crash Course - Start Sample <span>form Pluralsight</span></h1>

      <Script src="/pages/tscc/scripts/ts/employees.js"
              strategy={'beforeInteractive'}
              onLoad={() => {
                console.log('👋 Script has loaded')
              }}></Script>
    </>
  )
}

// 使用通用 Pages Examples 页面布局包装本页面
export default withPagesExamplesLayout(Page, {
  title: 'TypeScript Crash Course',
  description: '',
  keywords: '',
})

