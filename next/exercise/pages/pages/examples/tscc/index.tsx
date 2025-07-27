'use client'

import React from 'react'
import Script from 'next/script'
import { withPagesExamplesLayoutLayout } from '@/pages/libs/pagesExamplesLayout'

/**
 * 演示如何产生一个干净的页面。
 */
function Page () {

  return (
    <>
      {/*
          页面加载顺序：
          1. HTML 解析开始
          2. beforeInteractive 脚本加载 ✅ (DOMContentLoaded 还未触发)
          3. DOM 构建完成
          4. DOMContentLoaded 事件触发 ✅ (事件监听器执行)
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
export default withPagesExamplesLayoutLayout(Page, {
  title: 'TypeScript Crash Course',
  description: '',
  keywords: '',
})

