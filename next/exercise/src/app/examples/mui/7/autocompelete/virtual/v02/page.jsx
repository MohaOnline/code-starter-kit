'use client';

import React, {useRef} from 'react';
import {Autocomplete, TextField, Box} from "@mui/material";
import {useVirtualizer} from '@tanstack/react-virtual';
import {ThemeToggle} from "@/app/lib/components/ThemeToggle";

// 虚拟化列表组件 - 使用 React 19 的直接 ref prop 方式
const VirtualizedListbox = ({ref, ...props}) => {
  const listRef = useRef();

  // 从 props 中解构出 MUI Autocomplete 传递的数据
  const {children, ...otherProps} = props;

  // 将 children 转换为数组以便处理
  const childArray = React.Children.toArray(children);

  const virtualizer = useVirtualizer({
    count: childArray.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  return (
    <ul ref={ref} {...otherProps} role="listbox">
      <div
        ref={listRef}
        style={{
          height: Math.min(virtualizer.getTotalSize(), 300),
          width: '100%',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const child = childArray[virtualItem.index];

            return (
              <div
                key={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: virtualItem.size,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </ul>
  );
};

// 优化的虚拟化 Autocomplete 组件
const VirtualizedAutocomplete = ({options, ...props}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  // 优化的过滤逻辑
  const filterOptions = React.useCallback((inputValue) => {
    if (!inputValue.trim()) {
      // 没有输入时只显示前100个选项，减少初始加载时间
      return options.slice(0, 100);
    }

    // 有输入时进行过滤，限制最多显示500个结果
    const filtered = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 500);

    return filtered;
  }, [options]);

  // 使用 useEffect 来异步更新选项，避免阻塞UI
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredOptions(filterOptions(inputValue));
    }, 0); // 使用 setTimeout 来异步执行

    return () => clearTimeout(timeoutId);
  }, [inputValue, filterOptions]);

  // 使用 React 19 的直接 ref 传递方式
  const CustomListboxComponent = React.useCallback(
    (listboxProps) => <VirtualizedListbox {...listboxProps} />,
    []
  );

  return (
    <Autocomplete
      {...props}
      options={filteredOptions}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      filterOptions={(x) => x} // 禁用内置过滤，我们自己处理
      slotProps={{
        listbox: {
          component: CustomListboxComponent,
        }
      }}
      // 优化性能的额外配置
      disableListWrap
      clearOnBlur={false}
      selectOnFocus={false}
      handleHomeEndKeys={false}
    />
  );
};

// @see /examples/mui/7/autocompelete/virtual/v02
export default function Page() {

  function random(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  const OPTIONS = Array.from(new Array(10000))
                       .map(() => random(10 + Math.ceil(Math.random() * 20)))
                       .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

  return (
    <>
      <ThemeToggle/>
      <h2>使用 @tanstack/react-virtual 优化的 MUI Autocomplete</h2>
      <p>包含 10,000 个选项，使用虚拟化渲染提高性能</p>
      <VirtualizedAutocomplete
        options={OPTIONS}
        sx={{width: 300, mt: 2}}
        renderInput={(params) => (
          <TextField
            {...params}
            label="虚拟化选择器"
            helperText="仅渲染可见选项，提高性能"
          />
        )}
        noOptionsText="没有找到选项"
        loadingText="加载中..."
      />
    </>
  );
}
