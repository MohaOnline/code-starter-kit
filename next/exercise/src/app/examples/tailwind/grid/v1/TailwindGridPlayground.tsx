'use client';

import { useState } from 'react';
import { PlaygroundState, GridProperties } from './types';

const gridProperties: GridProperties = {
  display: {
    name: '显示类型',
    options: [
      { value: 'grid', label: 'grid' },
      { value: 'inline-grid', label: 'inline-grid' },
    ],
  },
  gridTemplateColumns: {
    name: '列模板',
    options: [
      { value: 'grid-cols-1', label: '1列' },
      { value: 'grid-cols-2', label: '2列' },
      { value: 'grid-cols-3', label: '3列' },
      { value: 'grid-cols-4', label: '4列' },
      { value: 'grid-cols-5', label: '5列' },
      { value: 'grid-cols-6', label: '6列' },
      { value: 'grid-cols-none', label: 'none' },
    ],
  },
  gridTemplateRows: {
    name: '行模板',
    options: [
      { value: 'grid-rows-1', label: '1行' },
      { value: 'grid-rows-2', label: '2行' },
      { value: 'grid-rows-3', label: '3行' },
      { value: 'grid-rows-4', label: '4行' },
      { value: 'grid-rows-5', label: '5行' },
      { value: 'grid-rows-6', label: '6行' },
      { value: 'grid-rows-none', label: 'none' },
    ],
  },
  gridAutoFlow: {
    name: '自动流向',
    options: [
      { value: 'grid-flow-row', label: 'row' },
      { value: 'grid-flow-col', label: 'column' },
      { value: 'grid-flow-row-dense', label: 'row dense' },
      { value: 'grid-flow-col-dense', label: 'column dense' },
    ],
  },
  gridGap: {
    name: '间距',
    options: [
      { value: 'gap-0', label: '0' },
      { value: 'gap-1', label: '0.25rem' },
      { value: 'gap-2', label: '0.5rem' },
      { value: 'gap-4', label: '1rem' },
      { value: 'gap-6', label: '1.5rem' },
      { value: 'gap-8', label: '2rem' },
    ],
  },
  justifyItems: {
    name: '水平对齐项目',
    options: [
      { value: 'justify-items-start', label: 'start' },
      { value: 'justify-items-end', label: 'end' },
      { value: 'justify-items-center', label: 'center' },
      { value: 'justify-items-stretch', label: 'stretch' },
    ],
  },
  alignItems: {
    name: '垂直对齐项目',
    options: [
      { value: 'items-start', label: 'start' },
      { value: 'items-end', label: 'end' },
      { value: 'items-center', label: 'center' },
      { value: 'items-stretch', label: 'stretch' },
      { value: 'items-baseline', label: 'baseline' },
    ],
  },
  justifyContent: {
    name: '水平对齐容器',
    options: [
      { value: 'justify-start', label: 'start' },
      { value: 'justify-end', label: 'end' },
      { value: 'justify-center', label: 'center' },
      { value: 'justify-between', label: 'space-between' },
      { value: 'justify-around', label: 'space-around' },
      { value: 'justify-evenly', label: 'space-evenly' },
    ],
  },
  alignContent: {
    name: '垂直对齐容器',
    options: [
      { value: 'content-start', label: 'start' },
      { value: 'content-end', label: 'end' },
      { value: 'content-center', label: 'center' },
      { value: 'content-between', label: 'space-between' },
      { value: 'content-around', label: 'space-around' },
      { value: 'content-evenly', label: 'space-evenly' },
    ],
  },
};

const initialState: PlaygroundState = {
  display: 'grid',
  gridTemplateColumns: 'grid-cols-3',
  gridTemplateRows: 'grid-rows-3',
  gridAutoFlow: 'grid-flow-row',
  gridGap: 'gap-4',
  justifyItems: 'justify-items-stretch',
  alignItems: 'items-stretch',
  justifyContent: 'justify-start',
  alignContent: 'content-start',
};

export default function TailwindGridPlayground() {
  const [state, setState] = useState<PlaygroundState>(initialState);
  const [items, setItems] = useState<number>(9);

  const handlePropertyChange = (property: keyof PlaygroundState, value: string) => {
    setState((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const containerClassNames = [
    state.display,
    state.gridTemplateColumns,
    state.gridTemplateRows,
    state.gridAutoFlow,
    state.gridGap,
    state.justifyItems,
    state.alignItems,
    state.justifyContent,
    state.alignContent,
    'p-4 border-2 border-gray-300 rounded-lg min-h-[400px] bg-gray-100',
  ].join(' ');

  const resetPlayground = () => {
    setState(initialState);
    setItems(9);
  };

  const addItem = () => setItems((prev) => Math.min(prev + 1, 24));
  const removeItem = () => setItems((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(gridProperties).map(([key, property]) => (
            <div key={key} className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-700">{property.name}</h3>
              <div className="flex flex-wrap gap-2">
                {property.options.map((option) => (
                  <button
                    key={option.value}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      state[key as keyof PlaygroundState] === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => handlePropertyChange(key as keyof PlaygroundState, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={items >= 24}
          >
            添加元素
          </button>
          <button
            onClick={removeItem}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={items <= 1}
          >
            移除元素
          </button>
          <button
            onClick={resetPlayground}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors ml-auto"
          >
            重置
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">预览</h2>
        <div className={containerClassNames}>
          {Array.from({ length: items }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-4 rounded-md bg-blue-500 text-white font-bold`}
              style={{ fontSize: '1.25rem', minHeight: '80px' }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">当前 CSS 类</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">{containerClassNames}</pre>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">项目元素布局</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium">网格跨列</h3>
            <p className="text-sm text-gray-600">通过添加 <code className="bg-gray-100 px-1">col-span-2</code> 类让元素跨越多列</p>
          </div>
          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium">网格跨行</h3>
            <p className="text-sm text-gray-600">通过添加 <code className="bg-gray-100 px-1">row-span-2</code> 类让元素跨越多行</p>
          </div>
          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium">网格起始/结束</h3>
            <p className="text-sm text-gray-600">使用 <code className="bg-gray-100 px-1">col-start-2 col-end-4</code> 控制精确位置</p>
          </div>
          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium">自动列/行</h3>
            <p className="text-sm text-gray-600">使用 <code className="bg-gray-100 px-1">auto-cols-min</code> 和 <code className="bg-gray-100 px-1">auto-rows-min</code> 控制自动尺寸</p>
          </div>
        </div>
      </div>
    </div>
  );
}
