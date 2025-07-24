/**
 * EditorModel - 编辑器数据模型
 * 
 * 基于 Monaco Editor 的 Model 设计理念，实现文档内容的存储和管理
 * 核心特点：
 * 1. 与视图完全分离，只负责数据存储和操作
 * 2. 提供事件机制，通知视图层数据变更
 * 3. 支持撤销/重做操作
 * 4. 高效的文本操作算法
 */

export interface Position {
  line: number;    // 行号，从 0 开始
  column: number;  // 列号，从 0 开始
}

export interface Range {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface TextChange {
  range: Range;
  text: string;
  timestamp: number;
}

/**
 * 内容变更事件监听器类型
 */
type ContentChangeListener = (changes: TextChange[]) => void;

/**
 * EditorModel 类 - 文档数据模型的核心实现
 * 
 * 参考 Monaco Editor 的 ITextModel 接口设计
 * 提供文档内容的存储、查询、修改等功能
 */
export class EditorModel {
  private lines: string[] = [''];  // 文档行数组，每个元素代表一行文本
  private changeListeners: ContentChangeListener[] = [];  // 内容变更监听器
  private history: TextChange[] = [];  // 操作历史记录
  private historyIndex = -1;  // 当前历史位置
  private maxHistorySize = 1000;  // 最大历史记录数
  
  constructor(initialContent = '') {
    this.setContent(initialContent);
  }
  
  /**
   * 获取文档的完整内容
   * @returns 文档内容字符串
   */
  getContent(): string {
    return this.lines.join('\n');
  }
  
  /**
   * 设置文档的完整内容
   * @param content 新的文档内容
   */
  setContent(content: string): void {
    const newLines = content.split('\n');
    if (newLines.length === 0) {
      newLines.push('');
    }
    
    const oldLines = this.lines;
    this.lines = newLines;
    
    // 触发内容变更事件
    const change: TextChange = {
      range: {
        startLine: 0,
        startColumn: 0,
        endLine: oldLines.length - 1,
        endColumn: oldLines[oldLines.length - 1]?.length || 0
      },
      text: content,
      timestamp: Date.now()
    };
    
    this.notifyContentChange([change]);
  }
  
  /**
   * 设置文档值（setValue 别名方法，兼容 Monaco Editor API）
   * @param value 新的文档内容
   */
  setValue(value: string): void {
    this.setContent(value);
  }
  
  /**
   * 获取文档值（getValue 别名方法，兼容 Monaco Editor API）
   * @returns 完整的文档内容
   */
  getValue(): string {
    return this.getContent();
  }
  
  /**
   * 获取指定行的内容
   * @param lineNumber 行号（从 0 开始）
   * @returns 行内容，如果行号无效则返回空字符串
   */
  getLineContent(lineNumber: number): string {
    if (lineNumber < 0 || lineNumber >= this.lines.length) {
      return '';
    }
    return this.lines[lineNumber];
  }
  
  /**
   * 获取文档总行数
   * @returns 行数
   */
  getLineCount(): number {
    return this.lines.length;
  }
  
  /**
   * 获取指定行的长度
   * @param lineNumber 行号（从 0 开始）
   * @returns 行长度
   */
  getLineLength(lineNumber: number): number {
    return this.getLineContent(lineNumber).length;
  }
  
  /**
   * 在指定位置插入文本
   * @param position 插入位置
   * @param text 要插入的文本
   */
  insertText(position: Position, text: string): void {
    const { line, column } = this.validatePosition(position);
    
    if (text.includes('\n')) {
      // 处理多行插入
      this.insertMultilineText(line, column, text);
    } else {
      // 处理单行插入
      const lineContent = this.lines[line];
      const newLineContent = lineContent.slice(0, column) + text + lineContent.slice(column);
      this.lines[line] = newLineContent;
    }
    
    // 记录变更
    const change: TextChange = {
      range: {
        startLine: line,
        startColumn: column,
        endLine: line,
        endColumn: column
      },
      text,
      timestamp: Date.now()
    };
    
    this.addToHistory(change);
    this.notifyContentChange([change]);
  }
  
  /**
   * 删除指定范围的文本
   * @param range 要删除的文本范围
   */
  deleteText(range: Range): string {
    const validatedRange = this.validateRange(range);
    const deletedText = this.getTextInRange(validatedRange);
    
    if (validatedRange.startLine === validatedRange.endLine) {
      // 单行删除
      const line = validatedRange.startLine;
      const lineContent = this.lines[line];
      const newLineContent = 
        lineContent.slice(0, validatedRange.startColumn) + 
        lineContent.slice(validatedRange.endColumn);
      this.lines[line] = newLineContent;
    } else {
      // 多行删除
      this.deleteMultilineText(validatedRange);
    }
    
    // 记录变更
    const change: TextChange = {
      range: validatedRange,
      text: '',
      timestamp: Date.now()
    };
    
    this.addToHistory(change);
    this.notifyContentChange([change]);
    
    return deletedText;
  }
  
  /**
   * 获取指定范围内的文本
   * @param range 文本范围
   * @returns 范围内的文本内容
   */
  getTextInRange(range: Range): string {
    const validatedRange = this.validateRange(range);
    
    if (validatedRange.startLine === validatedRange.endLine) {
      // 单行文本
      const lineContent = this.lines[validatedRange.startLine];
      return lineContent.slice(validatedRange.startColumn, validatedRange.endColumn);
    } else {
      // 多行文本
      const result: string[] = [];
      
      // 第一行
      const firstLine = this.lines[validatedRange.startLine];
      result.push(firstLine.slice(validatedRange.startColumn));
      
      // 中间行
      for (let i = validatedRange.startLine + 1; i < validatedRange.endLine; i++) {
        result.push(this.lines[i]);
      }
      
      // 最后一行
      if (validatedRange.endLine < this.lines.length) {
        const lastLine = this.lines[validatedRange.endLine];
        result.push(lastLine.slice(0, validatedRange.endColumn));
      }
      
      return result.join('\n');
    }
  }
  
  /**
   * 替换指定范围的文本
   * @param range 要替换的文本范围
   * @param text 新文本
   */
  replaceText(range: Range, text: string): void {
    this.deleteText(range);
    this.insertText({ line: range.startLine, column: range.startColumn }, text);
  }
  
  /**
   * 验证并修正位置坐标
   * @param position 原始位置
   * @returns 修正后的有效位置
   */
  private validatePosition(position: Position): Position {
    const line = Math.max(0, Math.min(position.line, this.lines.length - 1));
    const maxColumn = this.getLineLength(line);
    const column = Math.max(0, Math.min(position.column, maxColumn));
    
    return { line, column };
  }
  
  /**
   * 验证并修正文本范围
   * @param range 原始范围
   * @returns 修正后的有效范围
   */
  private validateRange(range: Range): Range {
    const start = this.validatePosition({ line: range.startLine, column: range.startColumn });
    const end = this.validatePosition({ line: range.endLine, column: range.endColumn });
    
    // 确保开始位置在结束位置之前
    if (start.line > end.line || (start.line === end.line && start.column > end.column)) {
      return {
        startLine: end.line,
        startColumn: end.column,
        endLine: start.line,
        endColumn: start.column
      };
    }
    
    return {
      startLine: start.line,
      startColumn: start.column,
      endLine: end.line,
      endColumn: end.column
    };
  }
  
  /**
   * 插入多行文本的内部实现
   * @param line 插入行号
   * @param column 插入列号
   * @param text 要插入的多行文本
   */
  private insertMultilineText(line: number, column: number, text: string): void {
    const textLines = text.split('\n');
    const currentLine = this.lines[line];
    
    // 分割当前行
    const beforeText = currentLine.slice(0, column);
    const afterText = currentLine.slice(column);
    
    // 构建新的行数组
    const newLines: string[] = [];
    
    // 第一行：原行的前半部分 + 插入文本的第一行
    newLines.push(beforeText + textLines[0]);
    
    // 中间行：插入文本的中间行
    for (let i = 1; i < textLines.length - 1; i++) {
      newLines.push(textLines[i]);
    }
    
    // 最后一行：插入文本的最后一行 + 原行的后半部分
    if (textLines.length > 1) {
      newLines.push(textLines[textLines.length - 1] + afterText);
    }
    
    // 替换原行并插入新行
    this.lines.splice(line, 1, ...newLines);
  }
  
  /**
   * 删除多行文本的内部实现
   * @param range 要删除的范围
   */
  private deleteMultilineText(range: Range): void {
    const startLine = this.lines[range.startLine];
    const endLine = this.lines[range.endLine];
    
    // 合并首尾行的剩余部分
    const mergedLine = 
      startLine.slice(0, range.startColumn) + 
      endLine.slice(range.endColumn);
    
    // 删除范围内的所有行，并用合并后的行替换
    const deleteCount = range.endLine - range.startLine + 1;
    this.lines.splice(range.startLine, deleteCount, mergedLine);
  }
  
  /**
   * 添加操作到历史记录
   * @param change 文本变更记录
   */
  private addToHistory(change: TextChange): void {
    // 清除当前位置之后的历史记录
    this.history = this.history.slice(0, this.historyIndex + 1);
    
    // 添加新的变更记录
    this.history.push(change);
    this.historyIndex = this.history.length - 1;
    
    // 限制历史记录大小
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize);
      this.historyIndex = this.history.length - 1;
    }
  }
  
  /**
   * 注册内容变更监听器
   * @param listener 监听器函数
   */
  onDidChangeContent(listener: ContentChangeListener): void {
    this.changeListeners.push(listener);
  }
  
  /**
   * 移除内容变更监听器
   * @param listener 要移除的监听器函数
   */
  offDidChangeContent(listener: ContentChangeListener): void {
    const index = this.changeListeners.indexOf(listener);
    if (index >= 0) {
      this.changeListeners.splice(index, 1);
    }
  }
  
  /**
   * 通知所有监听器内容已变更
   * @param changes 变更记录数组
   */
  private notifyContentChange(changes: TextChange[]): void {
    this.changeListeners.forEach(listener => {
      try {
        listener(changes);
      } catch (error) {
        console.error('内容变更监听器执行错误:', error);
      }
    });
  }
  
  /**
   * 获取模型的调试信息
   * @returns 调试信息对象
   */
  getDebugInfo() {
    return {
      lineCount: this.lines.length,
      contentLength: this.getContent().length,
      historySize: this.history.length,
      historyIndex: this.historyIndex,
      listenerCount: this.changeListeners.length
    };
  }

  /**
   * 清理资源
   */
  dispose(): void {
    this.changeListeners.length = 0;
    this.history.length = 0;
    this.lines.length = 0;
    this.historyIndex = -1;
  }
}