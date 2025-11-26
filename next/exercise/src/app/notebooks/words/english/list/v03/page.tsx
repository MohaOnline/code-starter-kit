'use client';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
  draggable, dropTargetForElements, monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {autoScrollForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';

import {useVirtualizer} from '@tanstack/react-virtual';
import {Input} from '@/components/ui/input';
import {toast} from 'react-toastify';
import NavTop from '@/app/lib/components/NavTop';

/**
 * Pragmatic Drag and Drop 工作原理说明：
 *
 * 1. 基本概念：
 *    - draggable(): 让元素可拖拽
 *    - dropTargetForElements(): 让元素可接收拖拽
 *    - monitorForElements(): 全局监听拖拽事件
 *
 * 2. 跨列表拖拽的关键步骤：
 *    Step 1: 设置 draggable 元素，定义数据载荷 (getInitialData)
 *    Step 2: 设置 dropTarget 元素，定义接收条件 (canDrop)
 *    Step 3: 使用 monitor 监听全局拖拽事件，处理业务逻辑
 *    Step 4: 通过 data 属性区分不同的拖拽类型和来源
 *
 * 3. 数据流：
 *    拖拽开始 → source.data (来源数据) → target.data (目标数据) → 业务处理
 */

interface Word {
  id: number;
  nid: number;
  weight: string;
  word: string;
  pos: string;
  translation: string;
  phonetic_uk: string;

  [key: string]: any;
}

interface SortableWordItemProps {
  word: Word;
  columnId: string;
  isHighlighted?: boolean;
  style?: React.CSSProperties;
}

function SortableWordItem({word, columnId, isHighlighted = false, style: virtualStyle}: SortableWordItemProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    console.log(`🔧 设置拖拽元素: ${word.word} (列: ${columnId})`);

    // Step 1: 设置可拖拽元素
    // 关键配置：getInitialData 定义拖拽时携带的数据
    const cleanupDraggable = draggable({
      element,
      // 📦 数据载荷：拖拽时携带的信息，这是跨列表拖拽的关键
      getInitialData: () => {
        const dragData = {
          word,      // 被拖拽的单词对象
          columnId,  // 来源列ID（用于跨列表识别）
          type: 'word-item'  // 拖拽类型标识
        };
        console.log('🚀 开始拖拽，携带数据:', dragData);
        return dragData;
      },
      onDragStart:    () => {
        console.log(`📤 拖拽开始: ${word.word} 从 ${columnId} 列`);
        setIsDragging(true);
      },
      onDrop:         () => {
        console.log(`📥 拖拽结束: ${word.word}`);
        setIsDragging(false);
      },
    });

    // Step 2: 设置拖拽目标（接收区域）
    // 关键配置：canDrop 决定是否可以接收拖拽
    const cleanupDropTarget = dropTargetForElements({
      element,
      // 🎯 接收条件：决定哪些拖拽可以放到这里
      canDrop: ({source}) => {
        const sourceData = source.data;
        const canAccept = sourceData.type === 'word-item' && (sourceData.word as Word)?.id !== word.id;
        console.log(`🤔 检查是否可接收拖拽:`, {
          sourceWord:   (sourceData.word as Word)?.word,
          targetWord:   word.word,
          sourceColumn: sourceData.columnId,
          targetColumn: columnId,
          canAccept
        });
        return canAccept;
      },
      // 📋 目标数据：当前元素作为目标时提供的信息
      getData:     () => {
        const targetData = {
          word,
          columnId,
          type: 'word-item'
        };
        console.log('🎯 提供目标数据:', targetData);
        return targetData;
      },
      onDragEnter: () => {
        console.log(`➡️ 拖拽进入目标: ${word.word} (列: ${columnId})`);
        setIsDropTarget(true);
      },
      onDragLeave: () => {
        console.log(`⬅️ 拖拽离开目标: ${word.word} (列: ${columnId})`);
        setIsDropTarget(false);
      },
      onDrop:      () => {
        console.log(`🎯 在目标上释放: ${word.word} (列: ${columnId})`);
        setIsDropTarget(false);
      },
    });

    return () => {
      console.log(`🧹 清理拖拽设置: ${word.word}`);
      cleanupDraggable();
      cleanupDropTarget();
    };
  }, [word, columnId]);

  const style = {
    ...virtualStyle,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={elementRef}
      style={style}
      className={`p-3 border rounded-lg cursor-grab active:cursor-grabbing shadow-sm transition-all duration-200 ${
        isDropTarget
          ? 'border-blue-400 border-2 bg-blue-900/30 scale-105'
          : isHighlighted
          ? 'border-yellow-600 border-2 bg-gray-900 hover:bg-gray-800'
          : 'border-gray-600 bg-gray-900 hover:bg-gray-800'
      }`}
    >
      <div className="text-sm font-medium text-green-400">{word.word}</div>
      <div className="text-sm text-green-200 mt-1">{word.translation}</div>
    </div>
  );
}

interface WordColumnProps {
  title: string;
  words: Word[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (direction: 'next' | 'prev') => void;
  columnId: string;
  scrollRef: React.RefObject<HTMLDivElement>;
  highlightedIndex: number;
}

function WordColumn({
                      title,
                      words,
                      searchTerm,
                      onSearchChange,
                      onSearchSubmit,
                      columnId,
                      scrollRef,
                      highlightedIndex
                    }: WordColumnProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchSubmit(e.shiftKey ? 'prev' : 'next');
    }
  };

  const virtualizer = useVirtualizer({
    count:            words.length,
    getScrollElement: () => scrollRef.current,
    estimateSize:     () => 80,
    overscan:         20,
  });

  // Set up auto-scroll for this column
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    return autoScrollForElements({
      element,
    });
  }, [scrollRef]);

  return (
    <div className="flex-1 flex flex-col h-[90vh] border border-gray-600 rounded-lg bg-gray-900">
      <div className="p-4 border-b border-gray-600 bg-gray-900">
        <h2 className="text-lg font-semibold mb-2 text-green-400">{title}</h2>
        <Input
          placeholder="搜索单词或翻译..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-800 border-gray-600 text-green-300 placeholder-gray-400"
        />
        <div className="text-xs text-gray-400 mt-1">
          回车：向下查找 | Shift+回车：向上查找
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto bg-gray-900"
        style={{
          contain: 'strict',
        }}
      >
        <div
          style={{
            height:   `${virtualizer.getTotalSize()}px`,
            width:    '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const word = words[virtualItem.index];
            const isHighlighted = virtualItem.index === highlightedIndex && searchTerm.trim() !== '';

            return (
              <div
                key={`${columnId}-${word.id}`}
                style={{
                  position:  'absolute',
                  top:       0,
                  left:      0,
                  width:     '100%',
                  height:    `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                  padding:   '0 16px',
                }}
              >
                <div style={{paddingBottom: '8px'}}>
                  <SortableWordItem
                    word={word}
                    columnId={columnId}
                    isHighlighted={isHighlighted}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Custom drag overlay component
function DragOverlay({draggedWord, isDragging}: {draggedWord: Word | null, isDragging: boolean}) {
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

  useEffect(() => {
    if (!isDragging || !draggedWord) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({x: e.clientX, y: e.clientY});
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, draggedWord]);

  if (!isDragging || !draggedWord) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: mousePosition.x + 10,
        top: mousePosition.y + 10,
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'rotate(5deg)',
      }}
      className="p-3 border border-blue-400 rounded-lg bg-gray-800 shadow-xl opacity-90 scale-105"
    >
      <div className="text-sm font-medium text-green-400">{draggedWord.word}</div>
      <div className="text-sm text-green-200 mt-1">{draggedWord.translation}</div>
    </div>
  );
}

export default function WordListPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [draggedWord, setDraggedWord] = useState<Word | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [leftHighlightedIndex, setLeftHighlightedIndex] = useState(-1);
  const [rightHighlightedIndex, setRightHighlightedIndex] = useState(-1);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const leftSearchIndexRef = useRef(0);
  const rightSearchIndexRef = useRef(0);

  // Load words from API
  useEffect(() => {
    fetch('/api/notebook-words-english')
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          setWords(json.data);
        }
      })
      .catch(err => {
        console.error('Fetch API error:', err);
        toast.error('加载单词失败');
      });
  }, []);

  // Step 3: 设置全局拖拽监听器
  // 这是处理跨列表拖拽的核心逻辑
  useEffect(() => {
    console.log('🌐 设置全局拖拽监听器');
    
    return monitorForElements({
      // 🚀 拖拽开始时的全局处理
      onDragStart({source}) {
        const data = source.data;
        console.log('🌐 全局监听：拖拽开始', data);
        
        if (data.type === 'word-item' && data.word) {
          const draggedWord = data.word as Word;
          console.log(`🌐 设置拖拽覆盖层: ${draggedWord.word} 来自 ${data.columnId} 列`);
          setDraggedWord(draggedWord);
          setIsDragging(true);
        }
      },

      // 🎯 拖拽释放时的全局处理 - 这里处理跨列表的业务逻辑
      onDrop({source, location}) {
        console.log('🌐 全局监听：拖拽释放');
        console.log('📤 来源数据:', source.data);
        console.log('📥 位置信息:', location);
        
        setDraggedWord(null);
        setIsDragging(false);
        
        const sourceData = source.data;
        const target = location.current.dropTargets[0]; // 获取最近的目标

        if (!target || !sourceData.word) {
          console.log('❌ 无效的拖拽目标或来源');
          return;
        }
        
        const targetData = target.data;
        if (!targetData.word) {
          console.log('❌ 目标没有单词数据');
          return;
        }

        const sourceWord = sourceData.word as Word;
        const targetWord = targetData.word as Word;
        const sourceColumn = sourceData.columnId;
        const targetColumn = targetData.columnId;

        console.log('🔄 执行拖拽处理:', {
          source:        `${sourceWord.word} (${sourceColumn})`,
          target:        `${targetWord.word} (${targetColumn})`,
          isCrossColumn: sourceColumn !== targetColumn
        });

        // 调用业务处理函数
        handleWordDrop(sourceWord, targetWord);
      },
    });
  }, [words]);

  // Utility function to move array items
  const arrayMove = <T,>(array: T[], fromIndex: number, toIndex: number): T[] => {
    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    return newArray;
  };

  // Step 4: 业务逻辑处理函数
  // 这里处理拖拽完成后的数据更新
  const handleWordDrop = async (sourceWord: Word, targetWord: Word) => {
    console.log('🔄 开始处理拖拽业务逻辑');
    console.log(`📤 来源: ${sourceWord.word} (ID: ${sourceWord.id})`);
    console.log(`📥 目标: ${targetWord.word} (ID: ${targetWord.id})`);
    
    const oldIndex = words.findIndex(w => w.id === sourceWord.id);
    const newIndex = words.findIndex(w => w.id === targetWord.id);

    console.log(`📍 索引变化: ${oldIndex} → ${newIndex}`);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
      console.log('❌ 无效的索引变化，取消操作');
      return;
    }

    try {
      console.log('🔧 开始重新排序数组');
      // Create new array with moved item
      const newWords = arrayMove(words, oldIndex, newIndex);
      console.log('✅ 数组重排完成');

      // Calculate new weight based on position in the reordered array
      let referenceWeights: any = {};
      let position: string;
      
      if (newIndex === 0) {
        position = 'start';
        referenceWeights = {after: newWords[1]?.weight};
        console.log('📍 移动到开头位置', referenceWeights);
      } else if (newIndex === newWords.length - 1) {
        position = 'end';
        referenceWeights = {before: newWords[newIndex - 1]?.weight};
        console.log('📍 移动到末尾位置', referenceWeights);
      } else {
        position = 'between';
        referenceWeights = {
          before: newWords[newIndex - 1]?.weight,
          after:  newWords[newIndex + 1]?.weight
        };
        console.log('📍 移动到中间位置', referenceWeights);
      }

      console.log('🔄 更新服务器权重...');
      const newWeight = await updateWordWeight(sourceWord.id, position, referenceWeights);
      newWords[newIndex].weight = newWeight;
      console.log(`✅ 新权重: ${newWeight}`);

      // Update the single source of truth
      setWords(newWords);
      console.log('✅ 本地状态更新完成');
      toast.success('排序已更新');
    } catch (error) {
      console.error('❌ 拖拽处理错误:', error);
      toast.error('更新排序失败');
      // Reload data on error
      window.location.reload();
    }
  };

  // Search function
  const searchInWords = useCallback((words: Word[], term: string, startIndex: number, direction: 'next' | 'prev') => {
    if (!term.trim()) return -1;

    const searchTerm = term.toLowerCase();
    const len = words.length;

    for (let i = 0; i < len; i++) {
      let index: number;
      if (direction === 'next') {
        index = (startIndex + i) % len;
      } else {
        index = (startIndex - i + len) % len;
      }

      const word = words[index];
      if (word.word.toLowerCase().includes(searchTerm) ||
        word.translation.toLowerCase().includes(searchTerm)) {
        return index;
      }
    }
    return -1;
  }, []);

  const scrollToIndex = (scrollRef: React.RefObject<HTMLDivElement>, index: number) => {
    if (scrollRef.current && index >= 0 && index < words.length) {
      const itemHeight = 80;
      const targetOffset = index * itemHeight;
      const containerHeight = scrollRef.current.clientHeight;
      const scrollTop = targetOffset - containerHeight / 2 + itemHeight / 2;

      scrollRef.current.scrollTo({
        top:      Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  };

  const handleLeftSearch = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = direction === 'next' ? leftSearchIndexRef.current + 1 : leftSearchIndexRef.current - 1;
    const foundIndex = searchInWords(words, leftSearch, currentIndex, direction);

    if (foundIndex !== -1) {
      leftSearchIndexRef.current = foundIndex;
      setLeftHighlightedIndex(foundIndex);
      scrollToIndex(leftScrollRef, foundIndex);
    } else {
      toast.info('没有找到');
    }
  }, [words, leftSearch, searchInWords]);

  const handleRightSearch = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = direction === 'next' ? rightSearchIndexRef.current + 1 : rightSearchIndexRef.current - 1;
    const foundIndex = searchInWords(words, rightSearch, currentIndex, direction);

    if (foundIndex !== -1) {
      rightSearchIndexRef.current = foundIndex;
      setRightHighlightedIndex(foundIndex);
      scrollToIndex(rightScrollRef, foundIndex);
    } else {
      toast.info('没有找到');
    }
  }, [words, rightSearch, searchInWords]);

  // Reset search index when search term changes
  useEffect(() => {
    leftSearchIndexRef.current = 0;
    setLeftHighlightedIndex(-1);
  }, [leftSearch]);

  useEffect(() => {
    rightSearchIndexRef.current = 0;
    setRightHighlightedIndex(-1);
  }, [rightSearch]);

  const updateWordWeight = async (wordId: number, targetPosition: string, referenceWeights: any) => {
    console.log('🌐 发送权重更新请求到服务器');
    console.log('📤 请求参数:', {wordId, targetPosition, referenceWeights});
    
    try {
      const response = await fetch('/api/notebooks/words/update-weight', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:    JSON.stringify({
          wordId,
          targetPosition,
          referenceWeights
        })
      });

      const result = await response.json();
      console.log('📥 服务器响应:', result);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      console.log(`✅ 权重更新成功: ${result.newWeight}`);
      return result.newWeight;
    } catch (error) {
      console.error('❌ 权重更新失败:', error);
      toast.error('更新排序失败');
      throw error;
    }
  };

  return (
    <>
      <NavTop/>
      <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-green-400">单词排序管理 (Pragmatic DnD)</h1>

        {/* 📋 使用说明 */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="text-sm font-semibold text-yellow-400 mb-2">🔧 Pragmatic DnD 工作原理演示</h3>
          <div className="text-xs text-gray-300 space-y-1">
            <p>• 打开浏览器控制台查看详细的拖拽日志</p>
            <p>• 每个单词都是 draggable + dropTarget</p>
            <p>• 全局 monitor 处理跨列表拖拽逻辑</p>
            <p>• 通过 columnId 区分不同列表来源</p>
          </div>
        </div>

        <div className="flex gap-4">
          <WordColumn
            title={`左列 (${words.length} 个单词)`}
            words={words}
            searchTerm={leftSearch}
            onSearchChange={setLeftSearch}
            onSearchSubmit={handleLeftSearch}
            columnId="left"
            scrollRef={leftScrollRef}
            highlightedIndex={leftHighlightedIndex}
          />

          <WordColumn
            title={`右列 (${words.length} 个单词)`}
            words={words}
            searchTerm={rightSearch}
            onSearchChange={setRightSearch}
            onSearchSubmit={handleRightSearch}
            columnId="right"
            scrollRef={rightScrollRef}
            highlightedIndex={rightHighlightedIndex}
          />
        </div>

        <DragOverlay draggedWord={draggedWord} isDragging={isDragging} />
      </div>
    </>
  );
}
/*
*
 * 🎯 Pragmatic Drag and Drop 跨列表拖拽完整实现指南
 * 
 * ================================
 * 核心概念和配置步骤
 * ================================
 * 
 * 1️⃣ 【设置拖拽源 - draggable()】
 * ```javascript
 * draggable({
 *   element: domElement,
 *   getInitialData: () => ({
 *     // 🔑 关键：定义拖拽时携带的数据
 *     item: yourData,
 *     sourceId: 'list-1',  // 来源标识
 *     type: 'item'         // 类型标识
 *   }),
 *   onDragStart: () => {},
 *   onDrop: () => {}
 * })
 * ```
 * 
 * 2️⃣ 【设置拖拽目标 - dropTargetForElements()】
 * ```javascript
 * dropTargetForElements({
 *   element: domElement,
 *   canDrop: ({source}) => {
 *     // 🔑 关键：决定是否接受拖拽
 *     return source.data.type === 'item' && 
 *            source.data.sourceId !== currentListId;
 *   },
 *   getData: () => ({
 *     // 🔑 关键：提供目标信息
 *     targetId: 'list-2',
 *     position: index
 *   }),
 *   onDragEnter: () => {},
 *   onDrop: () => {}
 * })
 * ```
 * 
 * 3️⃣ 【全局监听 - monitorForElements()】
 * ```javascript
 * monitorForElements({
 *   onDragStart: ({source}) => {
 *     // 设置拖拽状态，显示拖拽预览
 *   },
 *   onDrop: ({source, location}) => {
 *     // 🔑 关键：处理跨列表的业务逻辑
 *     const sourceData = source.data;
 *     const targetData = location.current.dropTargets[0]?.data;
 *     
 *     if (sourceData.sourceId !== targetData.targetId) {
 *       // 跨列表拖拽逻辑
 *       handleCrossListDrop(sourceData, targetData);
 *     }
 *   }
 * })
 * ```
 * 
 * ================================
 * 跨列表拖拽的关键要点
 * ================================
 * 
 * 🎯 数据流向：
 * 拖拽开始 → source.data (来源) → target.data (目标) → 业务处理
 * 
 * 🔧 必需配置：
 * • getInitialData: 定义拖拽携带的数据（包含来源标识）
 * • canDrop: 决定接收条件（通常检查类型和来源）
 * • getData: 提供目标信息（包含目标标识）
 * • monitor.onDrop: 处理跨列表的业务逻辑
 * 
 * 🚀 实现步骤：
 * 1. 每个可拖拽元素设置 draggable + dropTarget
 * 2. 通过 sourceId/targetId 区分不同列表
 * 3. 在 canDrop 中过滤有效的拖拽操作
 * 4. 在 monitor.onDrop 中统一处理业务逻辑
 * 5. 更新状态并同步到服务器
 * 
 * 💡 最佳实践：
 * • 使用 type 字段区分不同类型的拖拽
 * • 使用 sourceId/targetId 区分不同列表
 * • 在 monitor 中统一处理，避免重复逻辑
 * • 合理使用 canDrop 过滤无效操作
 * • 提供视觉反馈（拖拽状态、目标高亮）
 */