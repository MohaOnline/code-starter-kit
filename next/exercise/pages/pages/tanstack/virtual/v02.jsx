'use client';

/**
 *
 */

import Script from "next/script";
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {useVirtualizer} from '@tanstack/react-virtual';

/**
 * @uri /pages/tanstack/virtual/v02
 */
export default function Pages() {
  // The scrollable element for your list
  const frameRef = React.useRef(null)

  const [words, setWords] = useState([]) // 保存服务器获取的单词列表
  const [needWordsRefresh, setNeedWordsRefresh] = useState(false);
  const [itemSizes, setItemSizes] = useState(new Map()); // 缓存实际测量的尺寸
  const measureRef = React.useRef(null); // 用于测量的隐藏容器

  // 获取单词
  useEffect(() => {
    fetch("/api/notebook-words-english", {
      credentials: "include",
    }).then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
        setWords(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [needWordsRefresh]);

  // 使用虚拟元素实际测量项目高度
  const measureItemHeight = React.useCallback((word, index) => {
    if (!measureRef.current || !word) return 60;

    // console.log(`measureRef.current ${measureRef.current}`);
    //
    // // 创建临时测量元素
    // const tempElement = document.createElement('div');
    // tempElement.className = 'border border-green-300 p-2';
    // tempElement.style.cssText = `
    //   position: absolute;
    //   top: -9999px;
    //   left: 0;
    //   width: ${measureRef.current.offsetWidth}px;
    //   min-height: 40px;
    //   box-sizing: border-box; /* 含边框、Padding */
    //   visibility: hidden;
    // `;
    // console.log(`tempElement ${tempElement}`);
    //
    // // 添加实际内容
    // tempElement.innerHTML = `
    //   <div class="font-medium text-sm leading-5 mb-1">${word.word || ''}</div>
    //   <div class="text-gray-600 text-xs leading-4">${word.translation || ''}</div>
    // `;
    //
    // // 添加到DOM并测量
    // document.body.appendChild(tempElement);
    // const height = tempElement.getBoundingClientRect().height;
    // document.body.removeChild(tempElement);

    measureRef.current.innerHTML = `
      <div class="font-medium text-sm leading-5 mb-1">${word.word || ''}</div>
      <div class="text-gray-600 text-xs leading-4">${word.translation || ''}</div>
    `;
    const height = measureRef.current.getBoundingClientRect().height;

    return height;
  }, []);

  // 预测量所有项目的高度
  useEffect(() => {
    if (words.length > 0 && measureRef.current) {
      const newSizes = new Map();

      // 批量测量前几个项目来建立基准
      const sampleSize = Math.min(50, words.length); // 只测量前50个作为样本

      for (let i = 0; i < sampleSize; i++) {
        const height = measureItemHeight(words[i], i);
        newSizes.set(i, height);
      }

      setItemSizes(newSizes);
    }
  }, [words, measureItemHeight]);

  // 智能尺寸估算：优先使用实际测量值，否则使用平均值或默认值
  const estimateItemSize = React.useCallback((index) => {
    // 如果有实际测量值，直接使用
    if (itemSizes.has(index)) {
      return itemSizes.get(index);
    }

    // 如果有样本数据，计算平均值
    if (itemSizes.size > 0) {
      const sizes = Array.from(itemSizes.values());
      const avgSize = sizes.reduce((sum, size) => sum + size, 0) / sizes.length;
      return Math.round(avgSize);
    }

    // 默认估算
    return 60;
  }, [itemSizes]);

  const virtualizer = useVirtualizer({
    count: words.length,
    estimateSize: estimateItemSize,
    getScrollElement: () => frameRef.current,
    getItemKey: (index) => words[index]?.id || index, // 更好的key追踪
    overscan: 5, // 减少overscan提高性能
    measureElement: (el) => {
      const height = el.getBoundingClientRect().height;
      const index = parseInt(el.dataset.index);

      // 缓存实际测量的高度
      if (!isNaN(index) && height > 0) {
        setItemSizes(prev => new Map(prev).set(index, height));
      }

      // 可选：添加调试日志
      // console.log(`Measured item ${index}: ${height}px`);
      return height;
    },
  });

  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>

      {/* The scrollable element for your list */}
      <section className={'border'}
               ref={frameRef}
               style={{
                 height: `400px`,
                 overflow: 'auto', // Make it scroll!
               }}
      >
        {/* The large inner element to hold all the items */}
        <div className={'inner-wrapper'}
             style={{
               height: virtualizer ? `${virtualizer.getTotalSize()}px` : '0',
               width: '100%',
               position: 'relative',  // prepare for positioning the items: absolute
             }}>

          {/* 隐藏的测量容器 - 用于预测量项目高度 */}
          <div ref={measureRef} aria-hidden="true"
               style={{
                 position: 'absolute',
                 top: '-9999px',
                 left: 0,
                 width: '100%',
                 visibility: 'hidden',
                 pointerEvents: 'none'
               }}/>

          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {virtualizer?.getVirtualItems().map((item) => {
            const word = words[item.index];
            if (!word) return null;

            return (
              <div key={item.key}
                   data-index={item.index}
                   ref={virtualizer.measureElement}
                   className={'border border-green-300 p-2'}
                   style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     width: '100%',
                     minHeight: '40px', // 确保最小高度
                     transform: `translateY(${item.start}px)`,
                     boxSizing: 'border-box',
                   }}>
                <div className="font-medium text-sm leading-5 mb-1">
                  {word.word}
                </div>
                <div className="text-gray-600 text-xs leading-4">
                  {word.translation}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}