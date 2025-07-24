/**
 * InputHandler - 输入事件处理器
 * 
 * 基于 Monaco Editor 的输入处理机制，使用隐藏的 textarea 捕获所有输入事件
 * 核心特点：
 * 1. 隐藏 textarea - 透明且不可见，但能接收焦点和输入
 * 2. 事件捕获 - 处理键盘输入、粘贴、复制等操作
 * 3. 输入转换 - 将原生输入事件转换为编辑器操作
 * 4. 组合输入支持 - 处理中文等复合字符输入
 * 5. 快捷键处理 - 支持常见的编辑器快捷键
 */

import { EditorModel, Position, Range } from './EditorModel';
import { CursorManager } from './CursorManager';

export interface EditorKeyboardEvent {
  key: string;
  code: string;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

/**
 * InputHandler 类 - 输入事件处理的核心实现
 * 
 * 参考 Monaco Editor 的输入架构，使用隐藏 textarea 作为输入代理
 */
export class InputHandler {
  private container: HTMLDivElement;
  private model: EditorModel;
  private cursorManager: CursorManager;
  
  // 输入代理元素
  private textareaElement: HTMLTextAreaElement;
  
  // 输入状态
  private isComposing = false;  // 是否正在进行组合输入（如中文输入）
  private compositionText = '';  // 组合输入的临时文本
  private lastInputValue = '';   // 上次输入的值，用于检测变化
  
  // 事件监听器
  private eventListeners: Array<{ element: EventTarget; type: string; listener: EventListener }> = [];
  
  // 快捷键映射
  private shortcuts = new Map<string, () => void>();
  
  constructor(container: HTMLDivElement, model: EditorModel, cursorManager: CursorManager) {
    this.container = container;
    this.model = model;
    this.cursorManager = cursorManager;
    
    this.createTextareaProxy();
    this.setupEventListeners();
    this.setupShortcuts();
    this.focusTextarea();
  }
  
  /**
   * 创建隐藏的 textarea 代理元素
   * 这个元素负责接收所有的输入事件
   */
  private createTextareaProxy(): void {
    this.textareaElement = document.createElement('textarea');
    this.textareaElement.className = 'editor-input-proxy';
    
    // 设置样式使其完全隐藏但仍能接收焦点
    this.textareaElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
      resize: none;
      border: none;
      outline: none;
      background: transparent;
      color: transparent;
      overflow: hidden;
    `;
    
    // 设置属性
    this.textareaElement.setAttribute('autocomplete', 'off');
    this.textareaElement.setAttribute('autocorrect', 'off');
    this.textareaElement.setAttribute('autocapitalize', 'off');
    this.textareaElement.setAttribute('spellcheck', 'false');
    this.textareaElement.setAttribute('tabindex', '0');
    
    // 添加到容器
    this.container.appendChild(this.textareaElement);
  }
  
  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 输入事件
    this.addEventListener(this.textareaElement, 'input', this.handleInput.bind(this));
    
    // 键盘事件
    this.addEventListener(this.textareaElement, 'keydown', this.handleKeyDown.bind(this));
    this.addEventListener(this.textareaElement, 'keyup', this.handleKeyUp.bind(this));
    
    // 组合输入事件（用于中文等复合字符）
    this.addEventListener(this.textareaElement, 'compositionstart', this.handleCompositionStart.bind(this));
    this.addEventListener(this.textareaElement, 'compositionupdate', this.handleCompositionUpdate.bind(this));
    this.addEventListener(this.textareaElement, 'compositionend', this.handleCompositionEnd.bind(this));
    
    // 剪贴板事件
    this.addEventListener(this.textareaElement, 'paste', this.handlePaste.bind(this));
    this.addEventListener(this.textareaElement, 'copy', this.handleCopy.bind(this));
    this.addEventListener(this.textareaElement, 'cut', this.handleCut.bind(this));
    
    // 焦点事件
    this.addEventListener(this.textareaElement, 'focus', this.handleFocus.bind(this));
    this.addEventListener(this.textareaElement, 'blur', this.handleBlur.bind(this));
    
    // 容器点击事件 - 确保点击编辑器时能获得焦点
    this.addEventListener(this.container, 'mousedown', this.handleContainerMouseDown.bind(this));
  }
  
  /**
   * 添加事件监听器并记录，便于后续清理
   */
  private addEventListener(element: EventTarget, type: string, listener: EventListener): void {
    element.addEventListener(type, listener);
    this.eventListeners.push({ element, type, listener });
  }
  
  /**
   * 设置快捷键映射
   */
  private setupShortcuts(): void {
    // Ctrl/Cmd + A - 全选
    this.shortcuts.set('ctrl+a', () => this.selectAll());
    this.shortcuts.set('cmd+a', () => this.selectAll());
    
    // Ctrl/Cmd + C - 复制
    this.shortcuts.set('ctrl+c', () => this.copy());
    this.shortcuts.set('cmd+c', () => this.copy());
    
    // Ctrl/Cmd + V - 粘贴
    this.shortcuts.set('ctrl+v', () => this.paste());
    this.shortcuts.set('cmd+v', () => this.paste());
    
    // Ctrl/Cmd + X - 剪切
    this.shortcuts.set('ctrl+x', () => this.cut());
    this.shortcuts.set('cmd+x', () => this.cut());
    
    // Ctrl/Cmd + Z - 撤销
    this.shortcuts.set('ctrl+z', () => this.undo());
    this.shortcuts.set('cmd+z', () => this.undo());
    
    // Ctrl/Cmd + Y - 重做
    this.shortcuts.set('ctrl+y', () => this.redo());
    this.shortcuts.set('cmd+y', () => this.redo());
  }
  
  /**
   * 处理输入事件
   * 这是文本输入的主要处理函数
   */
  private handleInput(event: Event): void {
    if (this.isComposing) {
      // 组合输入过程中，不处理普通输入事件
      return;
    }
    
    const inputEvent = event as InputEvent;
    const currentValue = this.textareaElement.value;
    
    // 计算输入的文本
    const inputText = this.getInputText(currentValue);
    
    if (inputText) {
      // 在光标位置插入文本
      const cursorPosition = this.cursorManager.getCursorPosition();
      this.model.insertText(cursorPosition, inputText);
      
      // 更新光标位置
      const newPosition = this.calculateNewCursorPosition(cursorPosition, inputText);
      this.cursorManager.setCursorPosition(newPosition);
    }
    
    // 清空 textarea 以准备下次输入
    this.clearTextarea();
  }
  
  /**
   * 获取实际输入的文本
   * @param currentValue 当前 textarea 的值
   * @returns 新输入的文本
   */
  private getInputText(currentValue: string): string {
    // 简单实现：直接返回当前值
    // 在更复杂的实现中，这里会比较 currentValue 和 lastInputValue
    return currentValue;
  }
  
  /**
   * 计算插入文本后的新光标位置
   * @param currentPosition 当前光标位置
   * @param insertedText 插入的文本
   * @returns 新的光标位置
   */
  private calculateNewCursorPosition(currentPosition: Position, insertedText: string): Position {
    if (insertedText.includes('\n')) {
      // 多行文本
      const lines = insertedText.split('\n');
      const newLine = currentPosition.line + lines.length - 1;
      const newColumn = lines.length === 1 
        ? currentPosition.column + insertedText.length
        : lines[lines.length - 1].length;
      
      return { line: newLine, column: newColumn };
    } else {
      // 单行文本
      return {
        line: currentPosition.line,
        column: currentPosition.column + insertedText.length
      };
    }
  }
  
  /**
   * 处理键盘按下事件
   */
  private handleKeyDown(event: globalThis.KeyboardEvent): void {
    const key = event.key;
    const isCtrl = event.ctrlKey || event.metaKey;
    
    // 检查快捷键
    const shortcutKey = this.getShortcutKey(event);
    if (shortcutKey && this.shortcuts.has(shortcutKey)) {
      event.preventDefault();
      this.shortcuts.get(shortcutKey)!();
      return;
    }
    
    // 处理特殊按键
    switch (key) {
      case 'Enter':
        event.preventDefault();
        this.handleEnterKey(event);
        break;
        
      case 'Backspace':
        event.preventDefault();
        this.handleBackspaceKey(event);
        break;
        
      case 'Delete':
        event.preventDefault();
        this.handleDeleteKey(event);
        break;
        
      case 'Tab':
        event.preventDefault();
        this.handleTabKey(event);
        break;
        
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.handleArrowKey(key, event);
        break;
        
      case 'Home':
      case 'End':
        event.preventDefault();
        this.handleHomeEndKey(key, event);
        break;
    }
  }
  
  /**
   * 获取快捷键字符串
   */
  private getShortcutKey(event: globalThis.KeyboardEvent): string {
    const parts: string[] = [];
    
    if (event.ctrlKey) parts.push('ctrl');
    if (event.metaKey) parts.push('cmd');
    if (event.altKey) parts.push('alt');
    if (event.shiftKey) parts.push('shift');
    
    parts.push(event.key.toLowerCase());
    
    return parts.join('+');
  }
  
  /**
   * 处理回车键
   */
  private handleEnterKey(event: globalThis.KeyboardEvent): void {
    const cursorPosition = this.cursorManager.getCursorPosition();
    this.model.insertText(cursorPosition, '\n');
    
    const newPosition = {
      line: cursorPosition.line + 1,
      column: 0
    };
    this.cursorManager.setCursorPosition(newPosition);
  }
  
  /**
   * 处理退格键
   */
  private handleBackspaceKey(event: globalThis.KeyboardEvent): void {
    const cursorPosition = this.cursorManager.getCursorPosition();
    
    if (cursorPosition.column > 0) {
      // 删除当前行的前一个字符
      const range: Range = {
        startLine: cursorPosition.line,
        startColumn: cursorPosition.column - 1,
        endLine: cursorPosition.line,
        endColumn: cursorPosition.column
      };
      
      this.model.deleteText(range);
      this.cursorManager.setCursorPosition({
        line: cursorPosition.line,
        column: cursorPosition.column - 1
      });
    } else if (cursorPosition.line > 0) {
      // 删除换行符，合并到上一行
      const prevLineLength = this.model.getLineLength(cursorPosition.line - 1);
      const range: Range = {
        startLine: cursorPosition.line - 1,
        startColumn: prevLineLength,
        endLine: cursorPosition.line,
        endColumn: 0
      };
      
      this.model.deleteText(range);
      this.cursorManager.setCursorPosition({
        line: cursorPosition.line - 1,
        column: prevLineLength
      });
    }
  }
  
  /**
   * 处理删除键
   */
  private handleDeleteKey(event: globalThis.KeyboardEvent): void {
    const cursorPosition = this.cursorManager.getCursorPosition();
    const lineLength = this.model.getLineLength(cursorPosition.line);
    
    if (cursorPosition.column < lineLength) {
      // 删除当前位置的字符
      const range: Range = {
        startLine: cursorPosition.line,
        startColumn: cursorPosition.column,
        endLine: cursorPosition.line,
        endColumn: cursorPosition.column + 1
      };
      
      this.model.deleteText(range);
    } else if (cursorPosition.line < this.model.getLineCount() - 1) {
      // 删除换行符，合并下一行
      const range: Range = {
        startLine: cursorPosition.line,
        startColumn: cursorPosition.column,
        endLine: cursorPosition.line + 1,
        endColumn: 0
      };
      
      this.model.deleteText(range);
    }
  }
  
  /**
   * 处理 Tab 键
   */
  private handleTabKey(event: globalThis.KeyboardEvent): void {
    const cursorPosition = this.cursorManager.getCursorPosition();
    const tabText = '    '; // 4 个空格
    
    this.model.insertText(cursorPosition, tabText);
    this.cursorManager.setCursorPosition({
      line: cursorPosition.line,
      column: cursorPosition.column + tabText.length
    });
  }
  
  /**
   * 处理方向键
   */
  private handleArrowKey(key: string, event: globalThis.KeyboardEvent): void {
    const cursorPosition = this.cursorManager.getCursorPosition();
    let newPosition = { ...cursorPosition };
    
    switch (key) {
      case 'ArrowLeft':
        if (cursorPosition.column > 0) {
          newPosition.column--;
        } else if (cursorPosition.line > 0) {
          newPosition.line--;
          newPosition.column = this.model.getLineLength(newPosition.line);
        }
        break;
        
      case 'ArrowRight':
        const lineLength = this.model.getLineLength(cursorPosition.line);
        if (cursorPosition.column < lineLength) {
          newPosition.column++;
        } else if (cursorPosition.line < this.model.getLineCount() - 1) {
          newPosition.line++;
          newPosition.column = 0;
        }
        break;
        
      case 'ArrowUp':
        if (cursorPosition.line > 0) {
          newPosition.line--;
          const prevLineLength = this.model.getLineLength(newPosition.line);
          newPosition.column = Math.min(cursorPosition.column, prevLineLength);
        }
        break;
        
      case 'ArrowDown':
        if (cursorPosition.line < this.model.getLineCount() - 1) {
          newPosition.line++;
          const nextLineLength = this.model.getLineLength(newPosition.line);
          newPosition.column = Math.min(cursorPosition.column, nextLineLength);
        }
        break;
    }
    
    this.cursorManager.setCursorPosition(newPosition);
  }
  
  /**
   * 处理 Home/End 键
   */
  private handleHomeEndKey(key: string, event: globalThis.KeyboardEvent): void {
    const cursorPosition = this.cursorManager.getCursorPosition();
    let newPosition = { ...cursorPosition };
    
    if (key === 'Home') {
      newPosition.column = 0;
    } else if (key === 'End') {
      newPosition.column = this.model.getLineLength(cursorPosition.line);
    }
    
    this.cursorManager.setCursorPosition(newPosition);
  }
  
  /**
   * 处理键盘释放事件
   */
  private handleKeyUp(event: globalThis.KeyboardEvent): void {
    // 目前不需要特殊处理
  }
  
  /**
   * 处理组合输入开始
   */
  private handleCompositionStart(event: CompositionEvent): void {
    this.isComposing = true;
    this.compositionText = '';
  }
  
  /**
   * 处理组合输入更新
   */
  private handleCompositionUpdate(event: CompositionEvent): void {
    this.compositionText = event.data || '';
  }
  
  /**
   * 处理组合输入结束
   */
  private handleCompositionEnd(event: CompositionEvent): void {
    this.isComposing = false;
    
    const finalText = event.data || this.compositionText;
    if (finalText) {
      const cursorPosition = this.cursorManager.getCursorPosition();
      this.model.insertText(cursorPosition, finalText);
      
      const newPosition = this.calculateNewCursorPosition(cursorPosition, finalText);
      this.cursorManager.setCursorPosition(newPosition);
    }
    
    this.compositionText = '';
    this.clearTextarea();
  }
  
  /**
   * 处理粘贴事件
   */
  private handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const text = clipboardData.getData('text/plain');
      if (text) {
        const cursorPosition = this.cursorManager.getCursorPosition();
        this.model.insertText(cursorPosition, text);
        
        const newPosition = this.calculateNewCursorPosition(cursorPosition, text);
        this.cursorManager.setCursorPosition(newPosition);
      }
    }
  }
  
  /**
   * 处理复制事件
   */
  private handleCopy(event: ClipboardEvent): void {
    // 目前简单实现，后续可以支持选择文本的复制
    event.preventDefault();
  }
  
  /**
   * 处理剪切事件
   */
  private handleCut(event: ClipboardEvent): void {
    // 目前简单实现，后续可以支持选择文本的剪切
    event.preventDefault();
  }
  
  /**
   * 处理焦点获得
   */
  private handleFocus(event: FocusEvent): void {
    this.cursorManager.showCursor();
  }
  
  /**
   * 处理焦点失去
   */
  private handleBlur(event: FocusEvent): void {
    this.cursorManager.hideCursor();
  }
  
  /**
   * 处理容器鼠标按下事件
   */
  private handleContainerMouseDown(event: MouseEvent): void {
    // 确保点击编辑器时能获得焦点
    this.focusTextarea();
  }
  
  /**
   * 清空 textarea
   */
  private clearTextarea(): void {
    this.textareaElement.value = '';
    this.lastInputValue = '';
  }
  
  /**
   * 聚焦到 textarea
   */
  private focusTextarea(): void {
    this.textareaElement.focus();
  }
  
  /**
   * 聚焦输入处理器（公共方法）
   */
  focus(): void {
    this.focusTextarea();
  }
  
  // 快捷键操作实现
  
  private selectAll(): void {
    // TODO: 实现全选功能
    console.log('全选');
  }
  
  private copy(): void {
    // TODO: 实现复制功能
    console.log('复制');
  }
  
  private paste(): void {
    // TODO: 实现粘贴功能
    console.log('粘贴');
  }
  
  private cut(): void {
    // TODO: 实现剪切功能
    console.log('剪切');
  }
  
  private undo(): void {
    // TODO: 实现撤销功能
    console.log('撤销');
  }
  
  private redo(): void {
    // TODO: 实现重做功能
    console.log('重做');
  }
  
  /**
   * 销毁输入处理器
   * 清理事件监听器和 DOM 元素
   */
  dispose(): void {
    // 移除所有事件监听器
    this.eventListeners.forEach(({ element, type, listener }) => {
      element.removeEventListener(type, listener);
    });
    this.eventListeners = [];
    
    // 移除 textarea 元素
    if (this.textareaElement.parentNode) {
      this.textareaElement.parentNode.removeChild(this.textareaElement);
    }
    
    // 清理快捷键映射
    this.shortcuts.clear();
    
    console.log('InputHandler 已销毁');
  }
}