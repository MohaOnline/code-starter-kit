'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';

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
}

function SortableWordItem({ word, columnId, isHighlighted = false }: SortableWordItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: `${columnId}-${word.id}`,
    data: { word, columnId }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 border rounded-lg cursor-grab active:cursor-grabbing mb-2 shadow-sm ${
        isHighlighted 
          ? 'border-yellow-600 border-2 bg-gray-900 hover:bg-gray-800' 
          : 'border-gray-600 bg-gray-900 hover:bg-gray-800'
      }`}
    >
      <div className="text-sm font-medium text-green-400">{word.word}</div>
      <div className="text-xs text-green-300">{word.phonetic_uk}</div>
      <div className="text-xs text-green-500">{word.pos}</div>
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
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-900"
      >
        <SortableContext 
          items={words.map(word => `${columnId}-${word.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {words.map((word, index) => (
            <SortableWordItem 
              key={word.id} 
              word={word} 
              columnId={columnId}
              isHighlighted={index === highlightedIndex && searchTerm.trim() !== ''}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default function WordListPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedWord, setDraggedWord] = useState<Word | null>(null);
  const [leftHighlightedIndex, setLeftHighlightedIndex] = useState(-1);
  const [rightHighlightedIndex, setRightHighlightedIndex] = useState(-1);
  
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const leftSearchIndexRef = useRef(0);
  const rightSearchIndexRef = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  // Search function
  const searchInWords = useCallback((words: Word[], term: string, startIndex: number, direction: 'next' | 'prev') => {
    if (!term.trim()) return -1;
    
    const searchTerm = term.toLowerCase();
    const len = words.length;
    
    for (let i = 0; i < len; i++) {
      let index;
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
    if (scrollRef.current) {
      const container = scrollRef.current;
      const items = container.children;
      if (items[index]) {
        items[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    const data = active.data.current;
    if (data?.word) {
      setDraggedWord(data.word);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setDraggedWord(null);
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    const [, activeWordId] = activeId.split('-');
    const [, overWordId] = overId.split('-');
    
    const activeWordIdNum = parseInt(activeWordId);
    const overWordIdNum = parseInt(overWordId);
    
    // Find indices in the main words array
    const oldIndex = words.findIndex(w => w.id === activeWordIdNum);
    const newIndex = words.findIndex(w => w.id === overWordIdNum);
    
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
    
    try {
      // Create new array with moved item
      const newWords = arrayMove(words, oldIndex, newIndex);
      
      // Calculate new weight based on position in the reordered array
      let referenceWeights: any = {};
      if (newIndex === 0) {
        referenceWeights = { after: newWords[1]?.weight };
        const newWeight = await updateWordWeight(activeWordIdNum, 'start', referenceWeights);
        newWords[newIndex].weight = newWeight;
      } else if (newIndex === newWords.length - 1) {
        referenceWeights = { before: newWords[newIndex - 1]?.weight };
        const newWeight = await updateWordWeight(activeWordIdNum, 'end', referenceWeights);
        newWords[newIndex].weight = newWeight;
      } else {
        referenceWeights = {
          before: newWords[newIndex - 1]?.weight,
          after: newWords[newIndex + 1]?.weight
        };
        const newWeight = await updateWordWeight(activeWordIdNum, 'between', referenceWeights);
        newWords[newIndex].weight = newWeight;
      }
      
      // Update the single source of truth
      setWords(newWords);
      toast.success('排序已更新');
    } catch (error) {
      console.error('Drag end error:', error);
      toast.error('更新排序失败');
      // Reload data on error
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-green-400">单词排序管理</h1>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
        
        <DragOverlay>
          {activeId && draggedWord ? (
            <div className="p-3 border border-gray-600 rounded-lg bg-gray-900 shadow-lg opacity-90">
              <div className="text-sm font-medium text-green-400">{draggedWord.word}</div>
              <div className="text-xs text-green-300">{draggedWord.phonetic_uk}</div>
              <div className="text-xs text-green-500">{draggedWord.pos}</div>
              <div className="text-sm text-green-200 mt-1">{draggedWord.translation}</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}



