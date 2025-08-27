'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { FixedSizeList as List } from 'react-window';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import number from "framework7-icons/react/esm/Number.js";

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
  isDragging?: boolean;
}

function SortableWordItem({ word, columnId, isHighlighted = false, style, isDragging = false }: SortableWordItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({ 
    id: `${columnId}-${word.id}`,
    data: { word, columnId }
  });

  const combinedStyle = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: (isDragging || sortableIsDragging) ? 0.5 : 1,
    zIndex: (isDragging || sortableIsDragging) ? 1000 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
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

interface VirtualizedColumnProps {
  title: string;
  words: Word[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (direction: 'next' | 'prev') => void;
  columnId: string;
  highlightedIndex: number;
  height: number;
}

// 虚拟化行组件
const VirtualRow = React.memo(({ index, style, data }) => {
  const { words, columnId, highlightedIndex, searchTerm } = data;
  const word = words[index];

  if (!word) return null;

  return (
    <div style={style}>
      <SortableWordItem 
        key={word.id} 
        word={word} 
        columnId={columnId}
        isHighlighted={index === highlightedIndex && searchTerm.trim() !== ''}
      />
    </div>
  );
});

VirtualRow.displayName = 'VirtualRow';

function VirtualizedWordColumn({ 
  title, 
  words, 
  searchTerm, 
  onSearchChange, 
  onSearchSubmit, 
  columnId,
  highlightedIndex,
  height
}: VirtualizedColumnProps) {
  const listRef = useRef<List>(null);

  // 滚动到高亮项
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      listRef.current.scrollToItem(highlightedIndex, 'center');
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchSubmit(e.shiftKey ? 'prev' : 'next');
    }
  };

  const itemData = useMemo(() => ({
    words,
    columnId,
    highlightedIndex,
    searchTerm
  }), [words, columnId, highlightedIndex, searchTerm]);

  return (
    <div className="flex-1 flex flex-col border border-gray-600 rounded-lg bg-gray-900" style={{ height }}>
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
      <div className="flex-1 overflow-hidden p-4">
        <SortableContext 
          items={words.map(word => `${columnId}-${word.id}`)}
          strategy={verticalListSortingStrategy}
        >
          <List
            ref={listRef}
            height={height - 120} // 减去头部高度
            itemCount={words.length}
            itemSize={100} // 每个项目的高度
            itemData={itemData}
            className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {VirtualRow}
          </List>
        </SortableContext>
      </div>
    </div>
  );
}

interface SortDialogProps {
  isOpen: boolean;
  onClose: () => void;
  words: Word[];
  onSortComplete: (newWords: Word[]) => void;
}

export default function SortDialog({ isOpen, onClose, words, onSortComplete }: SortDialogProps) {
  const [localWords, setLocalWords] = useState<Word[]>([]);
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedWord, setDraggedWord] = useState<Word | null>(null);
  const [leftHighlightedIndex, setLeftHighlightedIndex] = useState(-1);
  const [rightHighlightedIndex, setRightHighlightedIndex] = useState(-1);
  const [isUpdating, setIsUpdating] = useState(false);

  const leftSearchIndexRef = useRef(0);
  const rightSearchIndexRef = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 当对话框打开时，复制单词数据
  useEffect(() => {
    if (isOpen && words.length > 0) {
      setLocalWords([...words]);
    }
  }, [isOpen, words]);

  // 搜索函数
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

  const handleLeftSearch = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = direction === 'next' ? leftSearchIndexRef.current + 1 : leftSearchIndexRef.current - 1;
    const foundIndex = searchInWords(localWords, leftSearch, currentIndex, direction);

    if (foundIndex !== -1) {
      leftSearchIndexRef.current = foundIndex;
      setLeftHighlightedIndex(foundIndex);
    } else {
      toast.info('没有找到');
    }
  }, [localWords, leftSearch, searchInWords]);

  const handleRightSearch = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = direction === 'next' ? rightSearchIndexRef.current + 1 : rightSearchIndexRef.current - 1;
    const foundIndex = searchInWords(localWords, rightSearch, currentIndex, direction);

    if (foundIndex !== -1) {
      rightSearchIndexRef.current = foundIndex;
      setRightHighlightedIndex(foundIndex);
    } else {
      toast.info('没有找到');
    }
  }, [localWords, rightSearch, searchInWords]);

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

    // Find indices in the local words array
    const oldIndex = localWords.findIndex(w => w.id === activeWordIdNum);
    const newIndex = localWords.findIndex(w => w.id === overWordIdNum);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    try {
      setIsUpdating(true);

      // Create new array with moved item
      const newWords = arrayMove(localWords, oldIndex, newIndex);

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

      // Update local state
      setLocalWords(newWords);
      toast.success('排序已更新');
    } catch (error) {
      console.error('Drag end error:', error);
      toast.error('更新排序失败');
      // Restore original order on error
      setLocalWords([...words]);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSave = () => {
    onSortComplete(localWords);
    onClose();
  };

  const handleCancel = () => {
    setLocalWords([...words]); // 恢复原始数据
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>单词排序管理 ({localWords.length} 个单词)</DialogTitle>
        </DialogHeader>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-[70vh]">
            <VirtualizedWordColumn
              title="左列"
              words={localWords}
              searchTerm={leftSearch}
              onSearchChange={setLeftSearch}
              onSearchSubmit={handleLeftSearch}
              columnId="left"
              highlightedIndex={leftHighlightedIndex}
              height={500}
            />

            <VirtualizedWordColumn
              title="右列"
              words={localWords}
              searchTerm={rightSearch}
              onSearchChange={setRightSearch}
              onSearchSubmit={handleRightSearch}
              columnId="right"
              highlightedIndex={rightHighlightedIndex}
              height={500}
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

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            取消
          </Button>
          <Button
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? '保存中...' : '保存排序'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
