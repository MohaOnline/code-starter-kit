/**
 * EditorView - 编辑器视图渲染层
 * 
 * 基于 Monaco Editor 的虚拟渲染机制，实现高性能的文本显示
 * 核心特点：
 * 1. 虚拟渲染 - 只渲染可视区域内的内容
 * 2. div + span 构建 - 使用 DOM 元素构建文本显示
 * 3. 语法高亮支持 - 可扩展的语法着色机制
 * 4. 行号显示 - 左侧行号区域
 * 5. 性能优化 - 避免不必要的 DOM 操作
 */

import { EditorModel, Position } from './EditorModel';

export interface ViewportInfo {
  startLine: number;    // 可视区域起始行
  endLine: number;      // 可视区域结束行
  scrollTop: number;    // 垂直滚动位置
  scrollLeft: number;   // 水平滚动位置
  visibleLines: number; // 可见行数
  containerHeight: number; // 容器高度
  lineHeight: number;   // 行高
}

export interface RenderOptions {
  lineHeight: number;     // 行高（像素）
  fontSize: number;       // 字体大小（像素）
  fontFamily: string;     // 字体族
  tabSize: number;        // Tab 大小
  showLineNumbers: boolean; // 是否显示行号
  lineNumberWidth: number;  // 行号区域宽度
}

/**
 * EditorView 类 - 编辑器视图渲染的核心实现
 * 
 * 参考 Monaco Editor 的视图架构，实现虚拟渲染和 DOM 管理
 */
export class EditorView {
  private container: HTMLDivElement;
  private model: EditorModel;
  private options: RenderOptions;
  
  // DOM 元素
  private viewportElement: HTMLDivElement;
  private lineNumbersElement: HTMLDivElement;
  private contentElement: HTMLDivElement;
  private scrollbarElement: HTMLDivElement;
  
  // 渲染状态
  private viewport: ViewportInfo;
  private renderedLines: Map<number, HTMLDivElement> = new Map();
  private isDisposed = false;
  
  // 渲染相关
  private renderRequestId: number | null = null;
  private lastRenderTime = 0;
  private renderThrottleMs = 16; // 约 60fps
  private resizeObserver: ResizeObserver | null = null;
  
  constructor(container: HTMLDivElement, model: EditorModel, options?: Partial<RenderOptions>) {
    this.container = container;
    this.model = model;
    this.options = {
      lineHeight: 21,
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      tabSize: 4,
      showLineNumbers: true,
      lineNumberWidth: 60,
      ...options
    };
   // 初始化视口信息
    this.viewport = {
      startLine: 0,
      endLine: 0,
      scrollTop: 0,
      scrollLeft: 0,
      visibleLines: 0,
      containerHeight: 0,
      lineHeight: this.options.lineHeight
    };
    
    console.log('🚀 [EditorView] 构造函数开始，容器:', this.container);
    
    this.initializeDOM();
    this.setupEventListeners();
    
    // 延迟计算视口，确保容器已经有实际尺寸
    setTimeout(() => {
      console.log('🔧 [EditorView] 开始延迟初始化');
      console.log('🔧 [EditorView] 容器尺寸:', {
        clientWidth: this.container.clientWidth,
        clientHeight: this.container.clientHeight,
        offsetWidth: this.container.offsetWidth,
        offsetHeight: this.container.offsetHeight,
        computedStyle: window.getComputedStyle(this.container).height
      });
      console.log('🔧 [EditorView] DOM结构检查:', {
        container: this.container,
        viewportElement: this.viewportElement,
        contentElement: this.contentElement,
        containerParent: this.container.parentElement
      });
      this.calculateViewport();
      this.render();
    }, 0);
    
    console.log('🚀 [EditorView] 构造函数完成');
  }
  
  /**
   * 初始化 DOM 结构
   * 创建编辑器的基本 DOM 层次结构
   */
  private initializeDOM(): void {
    // 清空容器
    this.container.innerHTML = '';
    
    // 保存原始高度设置
    const originalHeight = this.container.style.height || window.getComputedStyle(this.container).height;
    
    // 设置容器样式，保留原始高度
    this.container.style.cssText = `
      position: relative;
      overflow: hidden;
      width: 100%;
      height: ${originalHeight};
      font-family: ${this.options.fontFamily};
      font-size: ${this.options.fontSize}px;
      line-height: ${this.options.lineHeight}px;
      background-color: #1e1e1e;
      color: #d4d4d4;
    `;
    
    // 添加编辑器类名以应用CSS样式
    this.container.classList.add('monaco-editor');
    
    // 创建视口容器
    this.viewportElement = document.createElement('div');
    this.viewportElement.className = 'editor-viewport';
    this.viewportElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: visible;
    `;
    
    // 创建行号区域
    if (this.options.showLineNumbers) {
      this.lineNumbersElement = document.createElement('div');
      this.lineNumbersElement.className = 'editor-line-numbers';
      this.lineNumbersElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: ${this.options.lineNumberWidth}px;
        height: 100%;
        background-color: #1e1e1e;
        border-right: 1px solid #3c3c3c;
        color: #858585;
        user-select: none;
        z-index: 2;
      `;
      this.viewportElement.appendChild(this.lineNumbersElement);
    }
    
    // 创建内容区域
    this.contentElement = document.createElement('div');
    this.contentElement.className = 'editor-content';
    this.contentElement.style.cssText = `
      position: absolute;
      top: 0;
      left: ${this.options.showLineNumbers ? this.options.lineNumberWidth : 0}px;
      right: 0;
      bottom: 0;
      overflow: visible;
      z-index: 1;
      transform: translateY(0px);
    `;
    
    // 创建滚动条容器
    this.scrollbarElement = document.createElement('div');
    this.scrollbarElement.className = 'editor-scrollbar';
    this.scrollbarElement.style.cssText = `
      position: absolute;
      right: 0;
      top: 0;
      width: 12px;
      height: 100%;
      background-color: #2d2d30;
      z-index: 3;
    `;
    
    // 组装 DOM 结构
    this.viewportElement.appendChild(this.contentElement);
    this.viewportElement.appendChild(this.scrollbarElement);
    this.container.appendChild(this.viewportElement);
  }
  
  /**
   * 设置事件监听器
   */
  private setupEventListeners(): void {
    // 监听容器大小变化
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateViewport();
      this.scheduleRender();
    });
    this.resizeObserver.observe(this.container);
    
    // 监听滚动事件
    this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
  }
  
  /**
   * 处理滚轮事件
   * @param event 滚轮事件
   */
  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    
    // 计算最大滚动值
    const totalLines = this.model.getLineCount();
    const containerHeight = this.container.clientHeight;
    const maxScrollTop = Math.max(0, (totalLines * this.options.lineHeight) - containerHeight);
    
    // 更新滚动位置
    this.viewport.scrollTop = Math.max(0, Math.min(maxScrollTop, this.viewport.scrollTop + deltaY));
    this.viewport.scrollLeft = Math.max(0, this.viewport.scrollLeft + deltaX);
    
    this.calculateViewport();
    this.scheduleRender();
  }
  
  /**
   * 计算当前视口信息
   * 确定需要渲染的行范围
   */
  private calculateViewport(): void {
    let containerHeight = this.container.clientHeight;
    
    // 如果容器高度为0，使用默认高度或从样式中获取
    if (containerHeight === 0) {
      const computedStyle = window.getComputedStyle(this.container);
      const styleHeight = computedStyle.height;
      if (styleHeight && styleHeight !== 'auto' && styleHeight !== '0px') {
        containerHeight = parseInt(styleHeight, 10);
      } else {
        containerHeight = 600; // 默认高度
      }
    }
    
    const lineHeight = this.options.lineHeight;
    const totalLines = this.model.getLineCount();
    
    // 计算可视行范围
    const startLine = Math.floor(this.viewport.scrollTop / lineHeight);
    const visibleLines = Math.ceil(containerHeight / lineHeight);
    const endLine = startLine + visibleLines + 2; // +2 for buffer to ensure all content is visible
    
    this.viewport.startLine = Math.max(0, startLine);
    this.viewport.endLine = Math.min(endLine, totalLines); // 确保不超出行数范围，但允许渲染到最后一行
    this.viewport.visibleLines = visibleLines;
    this.viewport.containerHeight = containerHeight;
    this.viewport.lineHeight = lineHeight;
    

  }
  
  /**
   * 调度渲染任务
   * 使用节流机制避免过度渲染
   */
  private scheduleRender(): void {
    if (this.renderRequestId !== null) {
      return; // 已有渲染任务在队列中
    }
    
    const now = Date.now();
    const timeSinceLastRender = now - this.lastRenderTime;
    
    if (timeSinceLastRender >= this.renderThrottleMs) {
      // 立即渲染
      this.render();
    } else {
      // 延迟渲染
      const delay = this.renderThrottleMs - timeSinceLastRender;
      this.renderRequestId = window.setTimeout(() => {
        this.renderRequestId = null;
        this.render();
      }, delay);
    }
  }
  
  /**
   * 执行渲染
   * 虚拟渲染的核心实现
   */
  render(): void {
    if (this.isDisposed) return;
    
    this.lastRenderTime = Date.now();
    
    try {
      // 应用滚动变换
      this.contentElement.style.transform = `translateY(${-this.viewport.scrollTop}px)`;
      
      // 渲染行号
      if (this.options.showLineNumbers) {
        this.renderLineNumbers();
        // 同步行号区域的滚动
        this.lineNumbersElement.style.transform = `translateY(${-this.viewport.scrollTop}px)`;
      }
      
      // 渲染内容行
      this.renderContentLines();
      
      // 更新滚动条
      this.updateScrollbar();
      
      // 清理不在视口内的行
      this.cleanupOffscreenLines();
      
    } catch (error) {
      console.error('渲染过程中发生错误:', error);
    }
  }
  
  /**
   * 渲染行号区域
   */
  private renderLineNumbers(): void {
    if (!this.lineNumbersElement) return;
    
    // 清空现有行号
    this.lineNumbersElement.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    
    for (let lineNumber = this.viewport.startLine; lineNumber <= this.viewport.endLine; lineNumber++) {
      const lineNumberElement = document.createElement('div');
      lineNumberElement.className = 'line-number';
      lineNumberElement.style.cssText = `
        position: absolute;
        top: ${lineNumber * this.options.lineHeight}px;
        left: 0;
        width: ${this.options.lineNumberWidth - 10}px;
        height: ${this.options.lineHeight}px;
        text-align: right;
        padding-right: 8px;
        color: #999999;
        font-size: ${this.options.fontSize - 1}px;
        line-height: ${this.options.lineHeight}px;
      `;
      lineNumberElement.textContent = String(lineNumber + 1);
      
      fragment.appendChild(lineNumberElement);
    }
    
    this.lineNumbersElement.appendChild(fragment);
  }
  
  /**
   * 渲染内容行
   * 实现虚拟渲染，只渲染可视区域内的行
   */
  private renderContentLines(): void {
    const fragment = document.createDocumentFragment();
    const newRenderedLines = new Map<number, HTMLDivElement>();
    
    for (let lineNumber = this.viewport.startLine; lineNumber <= this.viewport.endLine; lineNumber++) {
      if (lineNumber >= this.model.getLineCount()) {
        break;
      }
      
      let lineElement = this.renderedLines.get(lineNumber);
      
      if (!lineElement) {
        // 创建新的行元素
        lineElement = this.createLineElement(lineNumber);
      } else {
        // 更新现有行元素的位置
        this.updateLinePosition(lineElement, lineNumber);
      }
      
      newRenderedLines.set(lineNumber, lineElement);
      
      // 如果行元素不在 DOM 中，添加到片段
      if (!lineElement.parentNode) {
        fragment.appendChild(lineElement);
      }

    }
    
    // 将新行添加到内容区域
    if (fragment.children.length > 0) {
      this.contentElement.appendChild(fragment);
    }
    
    // 更新渲染行映射
    this.renderedLines = newRenderedLines;
  }
  
  /**
   * 创建行元素
   * @param lineNumber 行号
   * @returns 行 DOM 元素
   */
  private createLineElement(lineNumber: number): HTMLDivElement {
    const lineElement = document.createElement('div');
    lineElement.className = 'editor-line';
    lineElement.dataset.lineNumber = String(lineNumber);
    
    // 设置行样式
    this.updateLinePosition(lineElement, lineNumber);
    
    // 设置行内容
    this.updateLineContent(lineElement, lineNumber);
    
    return lineElement;
  }
  
  /**
   * 更新行位置
   * @param lineElement 行元素
   * @param lineNumber 行号
   */
  private updateLinePosition(lineElement: HTMLDivElement, lineNumber: number): void {
    // 计算相对于视口起始行的位置
    const relativeLineNumber = lineNumber - this.viewport.startLine;
    const top = relativeLineNumber * this.options.lineHeight;
    const left = -this.viewport.scrollLeft;
    
    lineElement.style.cssText = `
      position: absolute;
      top: ${top}px;
      left: ${left}px;
      width: 100%;
      height: ${this.options.lineHeight}px;
      line-height: ${this.options.lineHeight}px;
      white-space: pre;
      font-family: ${this.options.fontFamily};
      font-size: ${this.options.fontSize}px;
      color: inherit;
    `;
  }
  
  /**
   * 更新行内容
   * @param lineElement 行元素
   * @param lineNumber 行号
   */
  private updateLineContent(lineElement: HTMLDivElement, lineNumber: number): void {
    const lineContent = this.model.getLineContent(lineNumber);
    
    // 处理空行
    if (lineContent.length === 0) {
      lineElement.innerHTML = '&nbsp;'; // 使用不间断空格保持行高
      return;
    }
    
    // 处理 Tab 字符
    const processedContent = this.processLineContent(lineContent);
    
    // 应用语法高亮（简单实现）
    const highlightedContent = this.applySyntaxHighlighting(processedContent);
    
    lineElement.innerHTML = highlightedContent;
  }
  
  /**
   * 处理行内容
   * @param content 原始行内容
   * @returns 处理后的内容
   */
  private processLineContent(content: string): string {
    // 转义 HTML 字符
    let processed = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    
    // 处理 Tab 字符
    const tabSpaces = '&nbsp;'.repeat(this.options.tabSize);
    processed = processed.replace(/\t/g, tabSpaces);
    
    return processed;
  }
  
  /**
   * 应用语法高亮
   * @param content 处理后的行内容
   * @returns 带语法高亮的 HTML
   */
  private applySyntaxHighlighting(content: string): string {
    // 简单的语法高亮实现
    // 在实际项目中，这里可以集成更复杂的语法高亮库
    
    return content
      // 高亮关键字
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|interface|type)\b/g, 
        '<span style="color: #0066cc; font-weight: bold;">$1</span>')
      // 高亮字符串
      .replace(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, 
        '<span style="color: #008800;">$1$2$1</span>')
      // 高亮注释
      .replace(/(\/\/.*$)/gm, 
        '<span style="color: #888888; font-style: italic;">$1</span>')
      // 高亮数字
      .replace(/\b(\d+(?:\.\d+)?)\b/g, 
        '<span style="color: #cc6600;">$1</span>');
  }
  
  /**
   * 更新滚动条
   */
  private updateScrollbar(): void {
    if (!this.scrollbarElement) return;
    
    const totalLines = this.model.getLineCount();
    const totalHeight = totalLines * this.options.lineHeight;
    const containerHeight = this.container.clientHeight;
    
    if (totalHeight <= containerHeight) {
      // 不需要滚动条
      this.scrollbarElement.style.display = 'none';
      return;
    }
    
    this.scrollbarElement.style.display = 'block';
    
    // 计算滚动条拖拽块的大小和位置
    const scrollbarHeight = containerHeight;
    const thumbHeight = Math.max(20, (containerHeight / totalHeight) * scrollbarHeight);
    const thumbTop = (this.viewport.scrollTop / totalHeight) * scrollbarHeight;
    
    // 创建或更新滚动条拖拽块
    let thumb = this.scrollbarElement.querySelector('.scrollbar-thumb') as HTMLDivElement;
    if (!thumb) {
      thumb = document.createElement('div');
      thumb.className = 'scrollbar-thumb';
      thumb.style.cssText = `
        position: absolute;
        right: 2px;
        width: 8px;
        background-color: #cccccc;
        border-radius: 4px;
        cursor: pointer;
      `;
      this.scrollbarElement.appendChild(thumb);
    }
    
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.top = `${thumbTop}px`;
  }
  
  /**
   * 清理不在视口内的行元素
   * 释放内存，提升性能
   */
  private cleanupOffscreenLines(): void {
    const elementsToRemove: HTMLDivElement[] = [];
    const linesToRemove: number[] = [];
    
    this.renderedLines.forEach((element, lineNumber) => {
      if (lineNumber < this.viewport.startLine || lineNumber > this.viewport.endLine) {
        elementsToRemove.push(element);
        linesToRemove.push(lineNumber);
      }
    });
    
    // 从 DOM 中移除元素
    elementsToRemove.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    
    // 从映射中删除
    linesToRemove.forEach(lineNumber => {
      this.renderedLines.delete(lineNumber);
    });
  }
  
  /**
   * 滚动到指定位置
   * @param position 目标位置
   */
  scrollToPosition(position: Position): void {
    const targetTop = position.line * this.options.lineHeight;
    const containerHeight = this.container.clientHeight;
    
    // 确保目标行在可视区域内
    if (targetTop < this.viewport.scrollTop) {
      this.viewport.scrollTop = targetTop;
    } else if (targetTop + this.options.lineHeight > this.viewport.scrollTop + containerHeight) {
      this.viewport.scrollTop = targetTop + this.options.lineHeight - containerHeight;
    }
    
    this.calculateViewport();
    this.scheduleRender();
  }
  
  /**
   * 获取视口信息
   * @returns 当前视口信息
   */
  getViewport(): ViewportInfo {
    return { ...this.viewport };
  }
  
  /**
   * 更新视口信息
   * @param viewport 新的视口信息
   */
  updateViewport(viewport: ViewportInfo): void {
    this.viewport = { ...viewport };
    this.scheduleRender();
  }
  
  /**
   * 设置语言（用于语法高亮）
   * @param language 编程语言
   */
  setLanguage(language: string): void {
    // 这里可以根据语言设置不同的语法高亮规则
    // 目前先触发重新渲染
    this.scheduleRender();
  }
  
  /**
   * 获取渲染选项
   * @returns 当前渲染选项
   */
  getOptions(): RenderOptions {
    return { ...this.options };
  }
  
  /**
   * 更新渲染选项
   * @param newOptions 新的渲染选项
   */
  updateOptions(newOptions: Partial<RenderOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.calculateViewport();
    this.scheduleRender();
  }
  
  /**
   * 销毁视图
   * 清理资源和事件监听器
   */
  dispose(): void {
    if (this.isDisposed) return;
    
    this.isDisposed = true;
    
    // 取消待处理的渲染任务
    if (this.renderRequestId !== null) {
      clearTimeout(this.renderRequestId);
      this.renderRequestId = null;
    }
    
    // 清理 ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    // 清理 DOM
    this.renderedLines.clear();
    this.container.innerHTML = '';
    
    console.log('EditorView 已销毁');
  }
}