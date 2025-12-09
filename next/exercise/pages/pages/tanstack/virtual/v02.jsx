'use client';

/**
 *
 */
import React, {createContext, forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal} from 'react-dom';

import dynamic from 'next/dynamic';
import Link from "next/link";
import {useRouter, useSearchParams} from 'next/navigation';
import Script from "next/script";

import {useVirtualizer} from '@tanstack/react-virtual';
import {useMergeRefs} from '@floating-ui/react';

import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {monitorForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import {autoScrollForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {preventUnhandled} from "@atlaskit/pragmatic-drag-and-drop/prevent-unhandled";
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

import {FaGripVertical} from 'react-icons/fa';
import {TbGripVertical} from 'react-icons/tb';
import {attachClosestEdge, extractClosestEdge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {DropIndicator} from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
// import {DropIndicator} from '@/lib/components/mui/DropIndicator/v01';
import {getReorderDestinationIndex} from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import {reorder} from '@atlaskit/pragmatic-drag-and-drop/reorder';

// const DropIndicator = memo(({edge}) => {
//   return (
//       <div className={`absolute z-[99999] bg-blue-500 ${edge === 'top' ? 'top-[-2px]' : 'bottom-[-2px]'} left-0 right-0 w-full h-[2px] pointer-events-none`}></div>
//   );
// });

// https://zh-hans.react.dev/reference/react/memo
const WordItem = memo(({item, word, virtualizer}) => {
  const draggerRef = useRef(null);
  const containerRef = useRef(null);
  const [isSelfDragging, setIsSelfDragging] = useState(false);
  const [indicatorEdge, setIndicatorEdge] = useState(null); // top / bottom
  const itemData = useMemo(() => ({word, item}), [word, item]);

  const WordContent = memo(({word}) => (
      <div className="">
        <div className="font-medium text-sm leading-5">{word.word}</div>
        <div className="text-gray-600 text-xs leading-5">{word.translation}</div>
      </div>
  ));

  // Pragmatic Drag and Drop
  useEffect(() => {
    return combine(
        // https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/about#draggable
        draggable({
          element: draggerRef.current, // 只有点击这个手柄才能拖动
          onDragStart() { setIsSelfDragging(true); },
          onDrop() { setIsSelfDragging(false); },
          // 添加为 source.data: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/recipes/typing-data/
          getInitialData() { return itemData; },
          onGenerateDragPreview({nativeSetDragImage}) {
            // 自定义拖拽时的“幽灵图”，解决浏览器默认样式太丑或包含不必要背景的问题
            setCustomNativeDragPreview({
              nativeSetDragImage,
              getOffset: pointerOutsideOfPreview({x: '16px', y: '8px'}),
              render({container}) {
                // createPortal 不在 JSX 时，生成的 Node 没有机会挂载在 react 里。
                // console.log(`render drag preview: ${container}`);
                // createPortal(
                //     <div className={`inline-block border p-1`} style={{backgroundColor: 'var(--background, #fff)'}}>
                //       <WordContent word={word}/>
                //     </div>,
                //     container,
                // );
                // return () => setIsSelfDragging(true);

                // 创建一个 React root 渲染拖拽预览
                const root = createRoot(container);
                root.render(
                    <div className={`inline-block border p-1`} style={{backgroundColor: 'var(--background, #fff)'}}>
                      <WordContent word={word}/>
                    </div>,
                );
                return () => root.unmount(); // 清理函数：卸载 React root
              },
            });
          },
        }),
        dropTargetForElements({
          element: containerRef.current,
          onDragLeave: () => setIndicatorEdge(null),
          onDrop: () => setIndicatorEdge(null),
          canDrop({source}) {
            // draggable 的 getInitialData 设置的 source.data。
            // 安全检查：只允许同一个列表实例内的元素互相拖拽
            //console.log(`canDrop:`, source.data === itemData, source.data);
            // 虚拟列表滚动的时候这些都会改变。
            // return source.data.item !== item;
            // return source.data !== itemData;
            return source.data?.word?.id !== word?.id;
          },
          getData({input}) { // 拖动时调用，返回内容 top / bottom 保存到 target.data
            // 核心魔法：计算鼠标相对于元素的边缘 (Top/Bottom)
            return attachClosestEdge(itemData, {
              element: containerRef.current,
              input, // 鼠标
              allowedEdges: ['top', 'bottom'],
            });
          },
          onDragEnter({self}) {
            const edge = extractClosestEdge(self.data);
            setIndicatorEdge(edge);
          },
          onDrag: ({self}) => {
            // 持续更新边缘检测结果
            const edge = extractClosestEdge(self.data);
            setIndicatorEdge(edge);
          },
        }),
    );
  }, [item, word]);

  /* 自己实现 useMergeRefs。
function useMergeRefs<T>(...refs: Array<React.Ref<T> | null | undefined>) {
return useCallback((node: T | null) => {
  refs.forEach((ref) => {
    if (!ref) return;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
  });
}, refs);
}
  */
  // Word Item 模版
  return (
      <div key={item.key} data-index={item.index} ref={useMergeRefs([virtualizer.measureElement, containerRef])}
           className={'absolute top-0 left-0 w-full min-h-10 flex items-center box-border border border-green-300 p-1'}
           style={{transform: `translateY(${item.start}px)`, opacity: isSelfDragging ? 0.4 : 1, zIndex: indicatorEdge ? 10 : 1}}>
        {/* 关键修复：当显示指示器时，提升当前 Item 的 z-index，防止被下方的 Item 遮挡*/}
        <div ref={draggerRef} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 pr-2"
            /* 防止图标自身被拖动（让整个 item 控制拖拽）*/ draggable={false}><TbGripVertical className="text-md"/></div>
        <WordContent word={word}/>
        {/* gap 两个 item 中间的距离：有 border 所以正好 2px */}
        {indicatorEdge && (<DropIndicator edge={indicatorEdge} gap={'2px'}/>)}
      </div>
  );
});

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
    }).then((response) => response.json()).then((data) => {
      console.log('data:', data);
      setWords(data.data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
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

    //getBoundingClientRect()
    // 返回值是一个 DOMRect 对象，是包含整个元素的最小矩形（包括 padding 和 border-width）。
    // 该对象使用 left、top、right、bottom、x、y、width 和 height 这几个以像素为单位的只读属性描述整个矩形的位置和大小。
    // 除了 width 和 height 以外的属性是相对于视图窗口的左上角来计算的。
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

  useEffect(() => {
    // 启动全局监听器：https://atlassian.design/components/pragmatic-drag-and-drop/core-package/monitors
    return combine(
        // 👇 注册自动滚动
        autoScrollForElements({
          element: wordWindowRef.current, // 指定滚动的容器
        }),
        monitorForElements({
          canMonitor({source}) {return true;},
          onDrop({location, source}) {
            const target = location.current.dropTargets[0];
            if (!target) return;

            let startIndex = source.data?.item?.index;
            let indexOfTarget = target.data?.item?.index;
            if (startIndex === undefined || indexOfTarget === undefined || startIndex === indexOfTarget) return;

            // 提取目标边缘信息 (top/bottom)
            const closestEdgeOfTarget = extractClosestEdge(target.data);
            console.dir({startIndex, indexOfTarget, closestEdgeOfTarget});

            // 从后往前移动，是移动在某元素后面时，插入在后面元素的位置，后面依次瞬移。
            // if (sourceIndex > targetIndex && closestEdgeOfTarget === 'bottom') {
            //   targetIndex = targetIndex + 1;
            // }
            // 从前往后移动，
            // if (sourceIndex < targetIndex && closestEdgeOfTarget === 'top') {
            //   targetIndex = targetIndex + 1;
            // }

            const finishIndex = getReorderDestinationIndex({
              startIndex,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: 'vertical',
            });

            console.log({startIndex, indexOfTarget, finishIndex, closestEdgeOfTarget});

            if (startIndex === indexOfTarget) return;

            setWords(prev => {
              return reorder({list: prev, startIndex: startIndex, finishIndex: finishIndex});
            });

          },
        }),
    );
  }, []);


  const virtualizer = useVirtualizer({
    count: words.length,
    estimateSize: /*estimateItemSize*/ () => 40,
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

  // // ✅ 监听 words 变化，强制虚拟器重新计算
  // useEffect(() => {
  // // // virtualizer.calculateRange();
  //   if (virtualizer && words.length > 0) {
  //     // 强制重新计算可见范围和总大小
  //     virtualizer.measure();
  //   }
  // }, [words, virtualizer]);

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
                   pointerEvents: 'none', // pointer-events: none; 无鼠标、无触摸
                 }}/>

            {/* Only the visible items in the virtualizer, manually positioned to be in view */}
            {virtualizer?.getVirtualItems().map((item) => {
              // https://tanstack.com/virtual/latest/docs/api/virtual-item
              // index: 从 0 到定义 virtualizer 时的 count -1
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
                  // item.key 设置 words 后，虚拟列表部分不显示。
                  <WordItem key={/*item.key*/word.id} item={item} word={word} virtualizer={virtualizer}/>
              );
            })}
          </div>
        </section>
      </>
  );
}