/**
 * CursorManager - 光标管理器
 * 
 * 基于 Monaco Editor 的光标实现机制，使用绝对定位的 div 元素作为光标
 * 核心特点：
 * 1. 绝对定位 - 使用 CSS 绝对定位精确控制光标位置
 * 2. 行列映射 - 将文本的行列坐标转换为屏幕像素坐标
 * 3. 光标动画 - 实现光标闪烁效果
 * 4. 位置跟踪 - 跟踪光标在文档中的位置
 * 5. 事件通知 - 光标位置变化时通知其他组件
 */

import { EditorModel, Position } from './EditorModel';

export interface CursorStyle {
  width: number;        // 光标宽度（像素）
  color: string;        // 光标颜色
  blinkRate: number;    // 闪烁频率（毫秒）
  style: 'line' | 'block' | 'underline'; // 光标样式
}

/**
 * 光标位置变化事件监听器类型
 */
type CursorPositionChangeListener = (position: Position) => void;

/**
 * CursorManager 类 - 光标管理的核心实现
 * 
 * 参考 Monaco Editor 的光标系统，实现精确的光标定位和动画
 */
export class CursorManager {
  private container: HTMLDivElement;
  private model: EditorModel;
  
  // 光标元素
  private cursorElement: HTMLDivElement;
  
  // 光标状态
  private position: Position = { line: 0, column: 0 };
  private isVisible = true;
  private isBlinking = true;
  
  // 光标样式配置
  private style: CursorStyle = {
    width: 2,
    color: '#000000',
    blinkRate: 530,
    style: 'line'
  };
  
  // 动画控制
  private blinkTimer: number | null = null;
  private blinkState = true; // true: 显示, false: 隐藏
  
  // 位置计算相关
  private lineHeight = 21;     // 行高（像素）
  private charWidth = 8.4;     // 字符宽度（像素，等宽字体）
  private fontSize = 14;       // 字体大小
  private fontFamily = 'Monaco, Menlo, "Ubuntu Mono", monospace';
  
  // 事件监听器
  private positionChangeListeners: CursorPositionChangeListener[] = [];
  
  // 测量元素（用于精确计算字符宽度）
  private measureElement: HTMLSpanElement;
  
  constructor(container: HTMLDivElement, model: EditorModel, options?: Partial<CursorStyle>) {
    this.container = container;
    this.model = model;
    
    if (options) {
      this.style = { ...this.style, ...options };
    }
    
    this.createCursorElement();
    this.createMeasureElement();
    this.calculateCharacterMetrics();
    this.startBlinking();
    this.updateCursorPosition();
  }
  
  /**
   * 创建光标 DOM 元素
   */
  private createCursorElement(): void {
    this.cursorElement = document.createElement('div');
    this.cursorElement.className = 'editor-cursor';
    
    // 设置基础样式
    this.applyCursorStyle();
    
    // 添加到容器
    this.container.appendChild(this.cursorElement);
  }
  
  /**
   * 应用光标样式
   */
  private applyCursorStyle(): void {
    const baseStyle = `
      position: absolute;
      pointer-events: none;
      z-index: 10;
      transition: none;
    `;
    
    let specificStyle = '';
    
    switch (this.style.style) {
      case 'line':
        specificStyle = `
          width: ${this.style.width}px;
          height: ${this.lineHeight}px;
          background-color: ${this.style.color};
        `;
        break;
        
      case 'block':
        specificStyle = `
          width: ${this.charWidth}px;
          height: ${this.lineHeight}px;
          background-color: ${this.style.color};
          opacity: 0.3;
        `;
        break;
        
      case 'underline':
        specificStyle = `
          width: ${this.charWidth}px;
          height: 2px;
          background-color: ${this.style.color};
          top: ${this.lineHeight - 2}px;
        `;
        break;
    }
    
    this.cursorElement.style.cssText = baseStyle + specificStyle;
  }
  
  /**
   * 创建测量元素
   * 用于精确计算字符宽度和行高
   */
  private createMeasureElement(): void {
    this.measureElement = document.createElement('span');
    this.measureElement.className = 'editor-measure';
    this.measureElement.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      visibility: hidden;
      white-space: pre;
      font-family: ${this.fontFamily};
      font-size: ${this.fontSize}px;
      line-height: ${this.lineHeight}px;
    `;
    
    // 添加到容器
    this.container.appendChild(this.measureElement);
  }
  
  /**
   * 计算字符度量信息
   * 精确测量字符宽度和行高
   */
  private calculateCharacterMetrics(): void {
    // 测量单个字符的宽度
    this.measureElement.textContent = 'M'; // 使用 M 作为标准字符
    const rect = this.measureElement.getBoundingClientRect();
    this.charWidth = rect.width;
    
    // 测量行高
    this.measureElement.textContent = 'M\nM';
    const multiLineRect = this.measureElement.getBoundingClientRect();
    this.lineHeight = multiLineRect.height / 2;
    
    // 清空测量元素
    this.measureElement.textContent = '';
    
    console.log(`字符度量: 宽度=${this.charWidth}px, 行高=${this.lineHeight}px`);
  }
  
  /**
   * 测量文本宽度
   * @param text 要测量的文本
   * @returns 文本宽度（像素）
   */
  private measureTextWidth(text: string): number {
    if (!text) return 0;
    
    this.measureElement.textContent = text;
    const rect = this.measureElement.getBoundingClientRect();
    this.measureElement.textContent = '';
    
    return rect.width;
  }
  
  /**
   * 将文档位置转换为屏幕坐标
   * @param position 文档中的位置
   * @returns 屏幕坐标 { x, y }
   */
  private positionToCoordinates(position: Position): { x: number; y: number } {
    const line = Math.max(0, Math.min(position.line, this.model.getLineCount() - 1));
    const lineContent = this.model.getLineContent(line);
    const column = Math.max(0, Math.min(position.column, lineContent.length));
    
    // 计算 Y 坐标（行位置）
    const y = line * this.lineHeight;
    
    // 计算 X 坐标（列位置）
    let x = 0;
    if (column > 0 && lineContent.length > 0) {
      const textBeforeCursor = lineContent.substring(0, column);
      x = this.measureTextWidth(textBeforeCursor);
    }
    
    return { x, y };
  }
  
  /**
   * 将屏幕坐标转换为文档位置
   * @param x 屏幕 X 坐标
   * @param y 屏幕 Y 坐标
   * @returns 文档位置
   */
  coordinatesToPosition(x: number, y: number): Position {
    // 计算行号
    const line = Math.max(0, Math.min(
      Math.floor(y / this.lineHeight),
      this.model.getLineCount() - 1
    ));
    
    // 计算列号
    const lineContent = this.model.getLineContent(line);
    let column = 0;
    
    if (lineContent.length > 0 && x > 0) {
      // 二分查找最接近的列位置
      let left = 0;
      let right = lineContent.length;
      
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const textWidth = this.measureTextWidth(lineContent.substring(0, mid));
        
        if (textWidth < x) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      
      column = left;
      
      // 微调：检查是否更接近前一个位置
      if (column > 0) {
        const currentWidth = this.measureTextWidth(lineContent.substring(0, column));
        const prevWidth = this.measureTextWidth(lineContent.substring(0, column - 1));
        
        if (Math.abs(x - prevWidth) < Math.abs(x - currentWidth)) {
          column--;
        }
      }
    }
    
    return { line, column };
  }
  
  /**
   * 更新光标位置
   * 将光标移动到当前位置对应的屏幕坐标
   */
  private updateCursorPosition(): void {
    const coordinates = this.positionToCoordinates(this.position);
    
    // 更新光标元素的位置
    this.cursorElement.style.left = `${coordinates.x}px`;
    this.cursorElement.style.top = `${coordinates.y}px`;
    
    // 确保光标在可视区域内
    this.ensureCursorVisible();
  }
  
  /**
   * 确保光标在可视区域内
   * 如果光标超出视口，则滚动视图
   */
  private ensureCursorVisible(): void {
    const coordinates = this.positionToCoordinates(this.position);
    const containerRect = this.container.getBoundingClientRect();
    
    // 检查垂直方向
    const cursorTop = coordinates.y;
    const cursorBottom = coordinates.y + this.lineHeight;
    const viewportTop = this.container.scrollTop;
    const viewportBottom = viewportTop + containerRect.height;
    
    if (cursorTop < viewportTop) {
      // 光标在视口上方，向上滚动
      this.container.scrollTop = cursorTop;
    } else if (cursorBottom > viewportBottom) {
      // 光标在视口下方，向下滚动
      this.container.scrollTop = cursorBottom - containerRect.height;
    }
    
    // 检查水平方向
    const cursorLeft = coordinates.x;
    const cursorRight = coordinates.x + this.style.width;
    const viewportLeft = this.container.scrollLeft;
    const viewportRight = viewportLeft + containerRect.width;
    
    if (cursorLeft < viewportLeft) {
      // 光标在视口左侧，向左滚动
      this.container.scrollLeft = cursorLeft;
    } else if (cursorRight > viewportRight) {
      // 光标在视口右侧，向右滚动
      this.container.scrollLeft = cursorRight - containerRect.width;
    }
  }
  
  /**
   * 开始光标闪烁动画
   */
  private startBlinking(): void {
    if (!this.isBlinking) return;
    
    this.stopBlinking(); // 确保没有重复的定时器
    
    this.blinkTimer = window.setInterval(() => {
      if (!this.isVisible) return;
      
      this.blinkState = !this.blinkState;
      this.cursorElement.style.opacity = this.blinkState ? '1' : '0';
    }, this.style.blinkRate);
  }
  
  /**
   * 停止光标闪烁动画
   */
  private stopBlinking(): void {
    if (this.blinkTimer !== null) {
      clearInterval(this.blinkTimer);
      this.blinkTimer = null;
    }
  }
  
  /**
   * 重置闪烁状态
   * 在光标位置改变时调用，确保光标立即显示
   */
  private resetBlink(): void {
    this.blinkState = true;
    this.cursorElement.style.opacity = '1';
    
    if (this.isBlinking) {
      this.startBlinking();
    }
  }
  
  /**
   * 获取当前光标位置
   * @returns 当前光标在文档中的位置
   */
  getCursorPosition(): Position {
    return { ...this.position };
  }
  
  /**
   * 设置光标位置
   * @param position 新的光标位置
   */
  setCursorPosition(position: Position): void {
    // 验证位置的有效性
    const validatedPosition = this.validatePosition(position);
    
    // 检查位置是否真的改变了
    if (validatedPosition.line === this.position.line && 
        validatedPosition.column === this.position.column) {
      return;
    }
    
    // 更新位置
    this.position = validatedPosition;
    
    // 更新光标显示
    this.updateCursorPosition();
    this.resetBlink();
    
    // 通知监听器
    this.notifyPositionChange(this.position);
  }
  
  /**
   * 验证并修正位置
   * @param position 原始位置
   * @returns 修正后的有效位置
   */
  private validatePosition(position: Position): Position {
    const lineCount = this.model.getLineCount();
    const line = Math.max(0, Math.min(position.line, lineCount - 1));
    const lineLength = this.model.getLineLength(line);
    const column = Math.max(0, Math.min(position.column, lineLength));
    
    return { line, column };
  }
  
  /**
   * 显示光标
   */
  showCursor(): void {
    this.isVisible = true;
    this.cursorElement.style.display = 'block';
    this.resetBlink();
  }
  
  /**
   * 隐藏光标
   */
  hideCursor(): void {
    this.isVisible = false;
    this.cursorElement.style.display = 'none';
    this.stopBlinking();
  }
  
  /**
   * 设置光标样式
   * @param newStyle 新的光标样式
   */
  setCursorStyle(newStyle: Partial<CursorStyle>): void {
    this.style = { ...this.style, ...newStyle };
    this.applyCursorStyle();
    
    // 如果闪烁频率改变，重新启动闪烁
    if (newStyle.blinkRate !== undefined) {
      this.startBlinking();
    }
  }
  
  /**
   * 启用/禁用光标闪烁
   * @param enabled 是否启用闪烁
   */
  setBlinking(enabled: boolean): void {
    this.isBlinking = enabled;
    
    if (enabled) {
      this.startBlinking();
    } else {
      this.stopBlinking();
      this.cursorElement.style.opacity = '1';
    }
  }
  
  /**
   * 更新字体度量信息
   * @param fontSize 字体大小
   * @param fontFamily 字体族
   * @param lineHeight 行高
   */
  updateFontMetrics(fontSize?: number, fontFamily?: string, lineHeight?: number): void {
    if (fontSize !== undefined) {
      this.fontSize = fontSize;
      this.measureElement.style.fontSize = `${fontSize}px`;
    }
    
    if (fontFamily !== undefined) {
      this.fontFamily = fontFamily;
      this.measureElement.style.fontFamily = fontFamily;
    }
    
    if (lineHeight !== undefined) {
      this.lineHeight = lineHeight;
      this.measureElement.style.lineHeight = `${lineHeight}px`;
    }
    
    // 重新计算字符度量
    this.calculateCharacterMetrics();
    
    // 更新光标样式和位置
    this.applyCursorStyle();
    this.updateCursorPosition();
  }
  
  /**
   * 注册光标位置变化监听器
   * @param listener 监听器函数
   */
  onDidChangeCursorPosition(listener: CursorPositionChangeListener): void {
    this.positionChangeListeners.push(listener);
  }
  
  /**
   * 移除光标位置变化监听器
   * @param listener 要移除的监听器函数
   */
  offDidChangeCursorPosition(listener: CursorPositionChangeListener): void {
    const index = this.positionChangeListeners.indexOf(listener);
    if (index >= 0) {
      this.positionChangeListeners.splice(index, 1);
    }
  }
  
  /**
   * 通知所有监听器光标位置已变化
   * @param position 新的光标位置
   */
  private notifyPositionChange(position: Position): void {
    this.positionChangeListeners.forEach(listener => {
      try {
        listener(position);
      } catch (error) {
        console.error('光标位置变化监听器执行错误:', error);
      }
    });
  }
  
  /**
   * 获取光标的调试信息
   * @returns 调试信息对象
   */
  getDebugInfo() {
    const coordinates = this.positionToCoordinates(this.position);
    
    return {
      position: this.position,
      coordinates,
      isVisible: this.isVisible,
      isBlinking: this.isBlinking,
      blinkState: this.blinkState,
      charWidth: this.charWidth,
      lineHeight: this.lineHeight,
      style: this.style
    };
  }
  
  /**
   * 销毁光标管理器
   * 清理定时器和 DOM 元素
   */
  dispose(): void {
    // 停止闪烁动画
    this.stopBlinking();
    
    // 移除 DOM 元素
    if (this.cursorElement.parentNode) {
      this.cursorElement.parentNode.removeChild(this.cursorElement);
    }
    
    if (this.measureElement.parentNode) {
      this.measureElement.parentNode.removeChild(this.measureElement);
    }
    
    // 清理监听器
    this.positionChangeListeners = [];
    
    console.log('CursorManager 已销毁');
  }
}