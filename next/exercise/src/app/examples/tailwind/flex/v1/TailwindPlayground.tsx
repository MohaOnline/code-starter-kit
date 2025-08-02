'use client';

import { useState } from 'react';
import { PlaygroundState, FlexProperties } from './types';

const flexProperties: FlexProperties = {
  display: {
    name: '显示类型',
    options: [
      { value: 'flex', label: 'flex' },
      { value: 'inline-flex', label: 'inline-flex' },
    ],
  },
  flexDirection: {
    name: '弹性方向',
    options: [
      { value: 'flex-row', label: 'row' },
      { value: 'flex-row-reverse', label: 'row-reverse' },
      { value: 'flex-col', label: 'column' },
      { value: 'flex-col-reverse', label: 'column-reverse' },
    ],
  },
  justifyContent: {
    name: '主轴对齐',
    options: [
      { value: 'justify-start', label: 'flex-start' },
      { value: 'justify-end', label: 'flex-end' },
      { value: 'justify-center', label: 'center' },
      { value: 'justify-between', label: 'space-between' },
      { value: 'justify-around', label: 'space-around' },
      { value: 'justify-evenly', label: 'space-evenly' },
    ],
  },
  alignItems: {
    name: '交叉轴对齐',
    options: [
      { value: 'items-start', label: 'flex-start' },
      { value: 'items-end', label: 'flex-end' },
      { value: 'items-center', label: 'center' },
      { value: 'items-baseline', label: 'baseline' },
      { value: 'items-stretch', label: 'stretch' },
    ],
  },
  flexWrap: {
    name: '换行',
    options: [
      { value: 'flex-nowrap', label: 'nowrap' },
      { value: 'flex-wrap', label: 'wrap' },
      { value: 'flex-wrap-reverse', label: 'wrap-reverse' },
    ],
  },
  gap: {
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
};

const initialState: PlaygroundState = {
  display: 'flex',
  flexDirection: 'flex-row',
  justifyContent: 'justify-start',
  alignItems: 'items-center',
  flexWrap: 'flex-nowrap',
  gap: 'gap-4',
};

export default function TailwindPlayground() {
  const [state, setState] = useState<PlaygroundState>(initialState);
  const [items, setItems] = useState<number>(3);

  const handlePropertyChange = (property: keyof PlaygroundState, value: string) => {
    setState((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const containerClassNames = [
    state.display,
    state.flexDirection,
    state.justifyContent,
    state.alignItems,
    state.flexWrap,
    state.gap,
    'p-4 border-2 border-gray-300 rounded-lg min-h-[300px] bg-gray-100',
  ].join(' ');

  const resetPlayground = () => {
    setState(initialState);
    setItems(3);
  };

  const addItem = () => setItems((prev) => Math.min(prev + 1, 12));
  const removeItem = () => setItems((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          {Object.entries(flexProperties).map(([key, property]) => (
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

        <div className="flex gap-4">
          <button
            onClick={addItem}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={items >= 12}
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
              className={`flex items-center justify-center p-4 rounded-md bg-blue-500 text-white font-bold min-w-[100px] min-h-[80px]`}
              style={{ fontSize: '1.25rem' }}
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
    </div>
  );
}
