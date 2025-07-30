# Changelog 005 - WaveSurfer v3 Debugging Fix

## 修复概述
修复了组件初始化期间访问未初始化状态变量导致的错误。

## 问题描述
在组件函数的开头添加了访问状态变量的 console.log 语句，导致在状态变量声明之前就尝试访问它们，引发 ReferenceError。

## 解决方案
将 console.log 语句移动到状态变量声明之后，确保在访问状态变量时它们已经被正确初始化。

## 文件变更
- `src/app/examples/wavesurfer/v3/page.tsx` - 修复状态变量访问顺序
- `docs/changelog-005.md` - 记录此次修复

## 技术说明
- React 组件中的状态变量必须在声明后才能被访问
- console.log 语句应该放在 useState 声明之后