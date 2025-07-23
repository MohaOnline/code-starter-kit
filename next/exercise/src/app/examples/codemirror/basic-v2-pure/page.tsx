"use client";
import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

/**
 * CodeMirror 6 官方库最简单示例
 * 
 * 技术要点：
 * 1. 使用官方 @codemirror/state 和 @codemirror/view 核心包
 * 2. 通过 EditorState.create() 创建编辑器状态
 * 3. 通过 EditorView 构造函数创建编辑器视图
 * 4. 在 React 中需要使用 useEffect 和 useRef 管理 DOM 生命周期
 * 
 * 参考文档：https://codemirror.net/docs/guide/
 */
export default function Page() {
  // 用于引用 DOM 容器元素
  const editorRef = useRef<HTMLDivElement>(null);
  // 用于保存 EditorView 实例，避免重复创建
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // 创建编辑器状态
    // EditorState 是不可变的数据结构，包含文档内容、选择范围等
    const startState = EditorState.create({
      doc: "console.log('Hello, CodeMirror 6!')\n\n// 这是使用官方 CodeMirror 6 库的最简单示例\n// 支持 JavaScript 语法高亮和基本编辑功能",
      extensions: [
        // 添加默认键盘快捷键支持（如 Ctrl+Z 撤销等）
        keymap.of(defaultKeymap),
        // 添加 JavaScript 语言支持（语法高亮、代码折叠等）
        javascript()
      ]
    });

    // 创建编辑器视图
    // EditorView 管理 DOM 渲染和用户交互
    const view = new EditorView({
      state: startState,
      parent: editorRef.current
    });

    // 保存视图实例用于清理
    viewRef.current = view;

    // 清理函数：组件卸载时销毁编辑器
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "20px" }}>
      <h2>CodeMirror 6 官方库示例</h2>
      <p>使用 @codemirror/state 和 @codemirror/view 等官方核心包构建的最简单编辑器</p>
      
      {/* 编辑器容器 */}
      <div 
        ref={editorRef}
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          minHeight: "200px",
          fontSize: "14px"
        }}
      />
      
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <h3>技术说明：</h3>
        <ul>
          <li>使用官方 <code>@codemirror/state</code> 管理编辑器状态</li>
          <li>使用官方 <code>@codemirror/view</code> 渲染编辑器界面</li>
          <li>集成 <code>@codemirror/lang-javascript</code> 提供 JavaScript 语法支持</li>
          <li>通过 <code>@codemirror/commands</code> 添加默认键盘快捷键</li>
          <li>在 React 中正确管理 EditorView 生命周期</li>
        </ul>
      </div>
    </div>
  );
}