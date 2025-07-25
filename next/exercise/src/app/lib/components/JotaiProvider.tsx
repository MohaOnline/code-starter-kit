'use client';

/**
 * Jotai 状态管理提供者组件 - Jotai State Management Provider Component
 * 
 * 这个组件是 Jotai 状态管理库的根提供者，用于在整个应用中提供全局状态管理功能。
 * This component is the root provider for Jotai state management library, providing global state management functionality throughout the application.
 * 
 * 使用位置 Usage Location:
 * - 在 src/app/layout.js 中被引入和使用，包裹整个应用的子组件
 * - Imported and used in src/app/layout.js, wrapping all child components of the application
 * 
 * 相关状态管理文件 Related State Management Files:
 * - src/app/lib/atoms.ts: 定义了所有的 Jotai atoms 和状态接口
 * - Defines all Jotai atoms and state interfaces
 * 
 * 主要管理的状态 Main States Managed:
 * - notebookAtom: 笔记本处理状态 (Notebook processing state)
 * - wordsAtom: 英语单词数据 (English words data)
 * - audioConfigAtom: 音频播放配置 (Audio playback configuration)
 * - uiStateAtom: UI 界面状态 (UI interface state)
 * - status: 通用状态管理 (General status management)
 * 
 * 技术背景 Technical Background:
 * Jotai 是一个原子化的状态管理库，采用自下而上的方法，每个状态都是独立的原子。
 * Jotai is an atomic state management library that takes a bottom-up approach where each state is an independent atom.
 * 
 * 参考文档 Reference Documentation:
 * - Jotai 官方文档: https://jotai.org/
 * - React Context vs Jotai: https://jotai.org/docs/basics/comparison
 */

import { Provider } from 'jotai';
import React from 'react';

/**
 * Jotai 提供者组件接口定义 - Jotai Provider Component Interface Definition
 */
interface JotaiProviderProps {
  /** 子组件 - Child components */
  children: React.ReactNode;
}

/**
 * Jotai 状态管理提供者组件 - Jotai State Management Provider Component
 * 
 * @param props - 组件属性，包含子组件 Component props containing child components
 * @returns JSX 元素，包裹了 Jotai Provider 的子组件 JSX element with child components wrapped in Jotai Provider
 * 
 * @example
 * ```tsx
 * // 在 layout.js 中的使用示例 Usage example in layout.js
 * import { JotaiProvider } from '@/app/lib/components/JotaiProvider';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <JotaiProvider>
 *           {children}
 *         </JotaiProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function JotaiProvider({ children }: JotaiProviderProps) {
    // 调试日志：Jotai Provider 初始化 - Debug log: Jotai Provider initialization
    console.log('[TRACE] JotaiProvider: Initializing Jotai state management provider');
    
    return (
        <Provider>
            {children}
        </Provider>
    );
}