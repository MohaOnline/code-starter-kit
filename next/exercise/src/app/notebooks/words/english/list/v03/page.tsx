'use client';

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {autoScrollForElements} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {useVirtualizer} from '@tanstack/react-virtual';
import {Input} from '@/components/ui/input';
import {toast} from 'react-toastify';
import NavTop from '@/app/lib/components/NavTop';

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

    // Make element draggable
    const cleanupDraggable = draggable({
      element,
      getInitialData: () => ({
        word,
        columnId,
        type: 'word-item'
      }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });

    // Make element a drop target
    const cleanupDropTarget = dropTargetForElements({
      element,
      canDrop: ({source}) => {
        const sourceData = source.data;
        return sourceData.type === 'word-item' && (sourceData.word as Word)?.id !== word.id;
      },
      getData: () => ({
        word,
        columnId,
        type: 'word-item'
      }),
      onDragEnter: () => setIsDropTarget(true),
      onDragLeave: () => setIsDropTarget(false),
      onDrop: () => setIsDropTarget(false),
    });

    return () => {
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

  // Set up drag monitoring
  useEffect(() => {
    return monitorForElements({
      onDragStart({source}) {
        const data = source.data;
        if (data.type === 'word-item' && data.word) {
          setDraggedWord(data.word as Word);
          setIsDragging(true);
        }
      },
      onDrop({source, location}) {
        setDraggedWord(null);
        setIsDragging(false);
        
        const sourceData = source.data;
        const target = location.current.dropTargets[0];
        
        if (!target || !sourceData.word) return;
        
        const targetData = target.data;
        if (!targetData.word) return;

        const sourceWord = sourceData.word as Word;
        const targetWord = targetData.word as Word;

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

  const handleWordDrop = async (sourceWord: Word, targetWord: Word) => {
    const oldIndex = words.findIndex(w => w.id === sourceWord.id);
    const newIndex = words.findIndex(w => w.id === targetWord.id);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    try {
      // Create new array with moved item
      const newWords = arrayMove(words, oldIndex, newIndex);

      // Calculate new weight based on position in the reordered array
      let referenceWeights: any = {};
      if (newIndex === 0) {
        referenceWeights = {after: newWords[1]?.weight};
        const newWeight = await updateWordWeight(sourceWord.id, 'start', referenceWeights);
        newWords[newIndex].weight = newWeight;
      } else if (newIndex === newWords.length - 1) {
        referenceWeights = {before: newWords[newIndex - 1]?.weight};
        const newWeight = await updateWordWeight(sourceWord.id, 'end', referenceWeights);
        newWords[newIndex].weight = newWeight;
      } else {
        referenceWeights = {
          before: newWords[newIndex - 1]?.weight,
          after:  newWords[newIndex + 1]?.weight
        };
        const newWeight = await updateWordWeight(sourceWord.id, 'between', referenceWeights);
        newWords[newIndex].weight = newWeight;
      }

      // Update the single source of truth
      setWords(newWords);
      toast.success('排序已更新');
    } catch (error) {
      console.error('Drop error:', error);
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
      if (!result.success) {
        throw new Error(result.error);
      }

      return result.newWeight;
    } catch (error) {
      console.error('Update weight error:', error);
      toast.error('更新排序失败');
      throw error;
    }
  };

  return (
    <>
      <NavTop/>
      <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-green-400">单词排序管理 (Pragmatic DnD)</h1>

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