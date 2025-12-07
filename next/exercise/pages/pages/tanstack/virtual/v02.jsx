'use client';

/**
 *
 */
import React, {createContext, forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal} from 'react-dom';

import Link from "next/link";
import {useRouter, useSearchParams} from 'next/navigation';
import Script from "next/script";

import {useVirtualizer} from '@tanstack/react-virtual';

import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {monitorForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {autoScrollForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {preventUnhandled} from "@atlaskit/pragmatic-drag-and-drop/prevent-unhandled";
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

/**
 * @uri /pages/tanstack/virtual/v02
 */
export default function Pages() {
  // The scrollable element for your list
  const wordWindowRef = React.useRef(null)

  const [words, setWords] = useState([]) // 保存服务器获取的单词列表
  const [needWordsRefresh, setNeedWordsRefresh] = useState(false);
  const [wordsSize, setWordsSize] = useState(new Map()); // 缓存实际测量的尺寸
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
  const measureItemHeight = useCallback((word, index) => {
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
      <div class="text-xs leading-4">${word.translation || ''}</div>
    `;
    const height = measureRef.current.getBoundingClientRect().height;

    return height;
  }, []);

  // 预测量前50个存在的项目的高度
  useEffect(() => {
    if (words.length > 0 && measureRef.current) {
      const newSizes = new Map();

      // 批量测量前几个项目来建立基准
      const sampleSize = Math.min(50, words.length); // 只测量前50个作为样本

      for (let i = 0; i < sampleSize; i++) {
        const height = measureItemHeight(words[i], i);
        newSizes.set(i, height);
      }

      setWordsSize(newSizes); // Map
    }
  }, [words, measureItemHeight]);

  // 智能尺寸估算：优先使用实际测量值，否则使用平均值或默认值
  const estimateItemSize = useCallback((index) => {
    // 如果有实际测量值，直接使用
    if (wordsSize.has(index)) {
      return wordsSize.get(index);
    }

    // 如果有样本数据，计算平均值
    if (wordsSize.size > 0) {
      const sizes = Array.from(wordsSize.values());
      const avgSize = sizes.reduce((sum, size) => sum + size, 0) / sizes.length;
      return Math.round(avgSize);
    }

    // 默认估算
    return 60;
  }, [wordsSize]);

  const virtualizer = useVirtualizer({
    count: words.length,
    estimateSize: estimateItemSize,
    getScrollElement: () => wordWindowRef.current,
    getItemKey: (index) => words[index]?.id || index, // 更好的key追踪
    overscan: 5, // 减少overscan提高性能
    measureElement: (el) => {
      const height = el.getBoundingClientRect().height;
      const index = parseInt(el.dataset.index);

      // // 缓存实际测量的高度
      // if (!isNaN(index) && height > 0) {
      //   setWordsSize(prev => new Map(prev).set(index, height));
      // }

      // 可选：添加调试日志
      // console.log(`Measured item ${index}: ${height}px`);
      return height;
    },
  });

  // https://zh-hans.react.dev/reference/react/memo
  const WordItem = memo(({word, item}) => {

    // Pragmatic Drag and Drop
    useEffect(() => {
      return combine(

      );
    }, []);

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
        <div className="text-gray-600 text-xs leading-5">
          {word.translation}
        </div>
      </div>
    );
  });

  /* default return */
  return (
    <>
      {/* 不确定需要什么 class，用 CDN 全部引入。 */}
      <Script src={'https://cdn.tailwindcss.com'} strategy={'beforeInteractive'}/>

      {/* The scrollable element for your list */}
      <section className={'border'}
               ref={wordWindowRef}
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
                 pointerEvents: 'none' // pointer-events: none; 无鼠标、无触摸
               }}/>

          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {virtualizer?.getVirtualItems().map((item) => {
            // https://tanstack.com/virtual/latest/docs/api/virtual-item
            // key: 默认情况下这是项目索引，但应通过 getItemKey 虚拟化选项进行配置。
            // start: The starting pixel offset for the item. This is usually mapped to a css property or transform like top/left or translateX/translateY.
            //        项目的起始像素偏移量。这通常映射到 CSS 属性或变换，如 top/left 或 translateX/translateY。
            // size: The size of the item. This is usually mapped to a css property like width/height. Before an item is measured with the VirtualItem.measureElement method,
            //       this will be the estimated size returned from your estimateSize virtualizer option. After an item is measured (if you choose to measure it at all),
            //       this value will be the number returned by your measureElement virtualizer option (which by default is configured to measure elements with getBoundingClientRect()).
            //       项目的大小。这通常映射到 CSS 属性，如 width/height。在项目使用 VirtualItem.measureElement 方法测量之前，这将是从您的 estimateSize 虚拟器选项返回的估计大小。
            //       在项目被测量后（如果您选择测量它），此值将是您的 measureElement 虚拟器选项返回的数值（默认配置为使用 getBoundingClientRect() 测量元素）。
            const word = words[item.index];
            if (!word) return null;
            // console.dir(item);
            return (
              <WordItem key={item.key} word={word} item={item}/>
            );
          })}
        </div>
      </section>
    </>
  );
}