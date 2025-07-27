import React from 'react'
import Head from 'next/head'
import { withPagesExamplesLayoutLayout } from '@/pages/libs/pagesExamplesLayout'

/**
 * 演示如何产生一个干净的页面。
 */
function Page () {

  return (
    <>
      <Head>
        <script src="/pages/tscc/scripts/employees.js"></script>
      </Head>
      <h1>Crash Course - Start Sample <span>form Pluralsight</span></h1>
    </>
  )
}

// 使用通用 Pages Examples 页面布局包装本页面
export default withPagesExamplesLayoutLayout(Page, {
  title: 'TypeScript Crash Course',
  description: '',
  keywords: '',
})

