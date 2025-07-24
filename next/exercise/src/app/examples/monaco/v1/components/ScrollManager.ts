/**
 * ScrollManager - 滚动管理器
 * 
 * 基于 Monaco Editor 的虚拟滚动实现机制，提供高性能的滚动体验
 * 核心特点：
 * 1. 虚拟滚动 - 只渲染可视区域内容，支持大文件编辑
 * 2. 平滑滚动 - 提供流畅的滚动动画和惯性滚动
 * 3. 自定义滚动条 - 完全自定义的滚动条样式和行为
 * 4. 性能优化 - 节流处理滚动事件，减少重绘次数
 * 5. 精确定位 - 支持精确的行列定位和滚动到指定位置
 */

import { EditorModel } from './EditorModel';

export interface ScrollInfo {
  scrollTop: number;      // 垂直滚动位置
  scrollLeft: number;     // 水平滚动位置
  scrollWidth: number;    // 内容总宽度
  scrollHeight: number;   // 内容总高度
  clientWidth: number;    // 可视区域宽度
  clientHeight: number;   // 可视区域高度
}

export interface ViewportInfo {
  startLine: number;      // 可视区域起始行
  endLine: number;        // 可视区域结束行
  startColumn: number;    // 可视区域起始列
  endColumn: number;      // 可视区域结束列
  offsetY: number;        // 垂直偏移量
  offsetX: number;        // 水平偏移量
}

export interface ScrollOptions {
  lineHeight: number;     // 行高
  charWidth: number;      // 字符宽度
  maxLineLength: number;  // 最大行长度
  smoothScrolling: boolean; // 是否启用平滑滚动
  scrollSensitivity: number; // 滚动灵敏度
  showScrollbars: boolean;   // 是否显示滚动条
}

/**
 * 滚动事件监听器类型
 */
type ScrollChangeListener = (scrollInfo: ScrollInfo, viewport: ViewportInfo) => void;

/**
 * ScrollManager 类 - 虚拟滚动的核心实现
 * 
 * 参考 Monaco Editor 的滚动系统，实现高性能的虚拟滚动
 */
export class ScrollManager {
  private container: HTMLDivElement;
  private model: EditorModel;
  
  // 滚动容器和内容区域
  private scrollContainer: HTMLDivElement;
  private contentArea: HTMLDivElement;
  private verticalScrollbar: HTMLDivElement;
  private horizontalScrollbar: HTMLDivElement;
  private verticalThumb: HTMLDivElement;
  private horizontalThumb: HTMLDivElement;
  
  // 滚动状态
  private scrollTop = 0;
  private scrollLeft = 0;
  private scrollWidth = 0;
  private scrollHeight = 0;
  private clientWidth = 0;
  private clientHeight = 0;
  
  // 配置选项
  private options: ScrollOptions = {
    lineHeight: 21,
    charWidth: 8.4,
    maxLineLength: 120,
    smoothScrolling: true,
    scrollSensitivity: 3,
    showScrollbars: true
  };
  
  // 视口信息
  private viewport: ViewportInfo = {
    startLine: 0,
    endLine: 0,
    startColumn: 0,
    endColumn: 0,
    offsetY: 0,
    offsetX: 0
  };
  
  // 事件监听器
  private scrollChangeListeners: ScrollChangeListener[] = [];
  
  // 滚动动画
  private scrollAnimation: number | null = null;
  private targetScrollTop = 0;
  private targetScrollLeft = 0;
  
  // 节流控制
  private scrollThrottleTimer: number | null = null;
  private resizeThrottleTimer: number | null = null;
  
  // 滚动条拖拽状态
  private isDraggingVertical = false;
  private isDraggingHorizontal = false;
  private dragStartY = 0;
  private dragStartX = 0;
  private dragStartScrollTop = 0;
  private dragStartScrollLeft = 0;
  
  constructor(container: HTMLDivElement, model: EditorModel, options?: Partial<ScrollOptions>) {
    this.container = container;
    this.model = model;
    
    if (options) {
      this.options = { ...this.options, ...options };
    }
    
    this.createScrollStructure();
    this.bindEvents();
    this.updateScrollMetrics();
    this.updateViewport();
  }
  
  /**
   * 创建滚动结构
   * 构建虚拟滚动所需的 DOM 结构
   */
  private createScrollStructure(): void {
    // 清空容器
    this.container.innerHTML = '';
    
    // 创建滚动容器
    this.scrollContainer = document.createElement('div');
    this.scrollContainer.className = 'scroll-container';
    this.scrollContainer.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `;
    
    // 创建内容区域
    this.contentArea = document.createElement('div');
    this.contentArea.className = 'content-area';
    this.contentArea.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `;
    
    // 创建垂直滚动条
    this.createVerticalScrollbar();
    
    // 创建水平滚动条
    this.createHorizontalScrollbar();
    
    // 组装结构
    this.scrollContainer.appendChild(this.contentArea);
    
    if (this.options.showScrollbars) {
      this.scrollContainer.appendChild(this.verticalScrollbar);
      this.scrollContainer.appendChild(this.horizontalScrollbar);
    }
    
    this.container.appendChild(this.scrollContainer);
  }
  
  /**
   * 创建垂直滚动条
   */
  private createVerticalScrollbar(): void {
    this.verticalScrollbar = document.createElement('div');
    this.verticalScrollbar.className = 'vertical-scrollbar';
    this.verticalScrollbar.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 14px;
      height: 100%;
      background-color: #f8f8f8;
      border-left: 1px solid #e0e0e0;
      z-index: 100;
    `;
    
    this.verticalThumb = document.createElement('div');
    this.verticalThumb.className = 'vertical-thumb';
    this.verticalThumb.style.cssText = `
      position: absolute;
      top: 0;
      left: 2px;
      width: 10px;
      background-color: #c0c0c0;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    `;
    
    this.verticalScrollbar.appendChild(this.verticalThumb);
  }
  
  /**
   * 创建水平滚动条
   */
  private createHorizontalScrollbar(): void {
    this.horizontalScrollbar = document.createElement('div');
    this.horizontalScrollbar.className = 'horizontal-scrollbar';
    this.horizontalScrollbar.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 14px;
      background-color: #f8f8f8;
      border-top: 1px solid #e0e0e0;
      z-index: 100;
    `;
    
    this.horizontalThumb = document.createElement('div');
    this.horizontalThumb.className = 'horizontal-thumb';
    this.horizontalThumb.style.cssText = `
      position: absolute;
      top: 2px;
      left: 0;
      height: 10px;
      background-color: #c0c0c0;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;
    `;
    
    this.horizontalScrollbar.appendChild(this.horizontalThumb);
  }
  
  /**
   * 绑定事件监听器
   */
  private bindEvents(): void {
    // 鼠标滚轮事件
    this.contentArea.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    
    // 窗口大小变化事件
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // 滚动条拖拽事件
    this.bindScrollbarEvents();
    
    // 模型变化事件
    this.model.onDidChangeContent(() => {
      this.updateScrollMetrics();
      this.updateViewport();
    });
  }
  
  /**
   * 绑定滚动条事件
   */
  private bindScrollbarEvents(): void {
    // 垂直滚动条事件
    this.verticalThumb.addEventListener('mousedown', this.handleVerticalThumbMouseDown.bind(this));
    this.verticalScrollbar.addEventListener('click', this.handleVerticalScrollbarClick.bind(this));
    
    // 水平滚动条事件
    this.horizontalThumb.addEventListener('mousedown', this.handleHorizontalThumbMouseDown.bind(this));
    this.horizontalScrollbar.addEventListener('click', this.handleHorizontalScrollbarClick.bind(this));
    
    // 全局鼠标事件（用于拖拽）
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // 滚动条悬停效果
    this.verticalThumb.addEventListener('mouseenter', () => {
      this.verticalThumb.style.backgroundColor = '#a0a0a0';
    });
    this.verticalThumb.addEventListener('mouseleave', () => {
      if (!this.isDraggingVertical) {
        this.verticalThumb.style.backgroundColor = '#c0c0c0';
      }
    });
    
    this.horizontalThumb.addEventListener('mouseenter', () => {
      this.horizontalThumb.style.backgroundColor = '#a0a0a0';
    });
    this.horizontalThumb.addEventListener('mouseleave', () => {
      if (!this.isDraggingHorizontal) {
        this.horizontalThumb.style.backgroundColor = '#c0c0c0';
      }
    });
  }
  
  /**
   * 处理鼠标滚轮事件
   */
  private handleWheel(event: WheelEvent): void {
    event.preventDefault();
    
    const deltaY = event.deltaY * this.options.scrollSensitivity;
    const deltaX = event.deltaX * this.options.scrollSensitivity;
    
    // 计算新的滚动位置
    let newScrollTop = this.scrollTop + deltaY;
    let newScrollLeft = this.scrollLeft + deltaX;
    
    // 限制滚动范围
    newScrollTop = Math.max(0, Math.min(newScrollTop, this.getMaxScrollTop()));
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, this.getMaxScrollLeft()));
    
    // 应用滚动
    if (this.options.smoothScrolling) {
      this.smoothScrollTo(newScrollLeft, newScrollTop);
    } else {
      this.scrollTo(newScrollLeft, newScrollTop);
    }
  }
  
  /**
   * 处理窗口大小变化
   */
  private handleResize(): void {
    if (this.resizeThrottleTimer) {
      clearTimeout(this.resizeThrottleTimer);
    }
    
    this.resizeThrottleTimer = window.setTimeout(() => {
      this.updateScrollMetrics();
      this.updateViewport();
      this.updateScrollbars();
    }, 100);
  }
  
  /**
   * 处理垂直滚动条拖拽开始
   */
  private handleVerticalThumbMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDraggingVertical = true;
    this.dragStartY = event.clientY;
    this.dragStartScrollTop = this.scrollTop;
    this.verticalThumb.style.backgroundColor = '#808080';
  }
  
  /**
   * 处理水平滚动条拖拽开始
   */
  private handleHorizontalThumbMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDraggingHorizontal = true;
    this.dragStartX = event.clientX;
    this.dragStartScrollLeft = this.scrollLeft;
    this.horizontalThumb.style.backgroundColor = '#808080';
  }
  
  /**
   * 处理鼠标移动（拖拽）
   */
  private handleMouseMove(event: MouseEvent): void {
    if (this.isDraggingVertical) {
      const deltaY = event.clientY - this.dragStartY;
      const scrollbarHeight = this.verticalScrollbar.clientHeight;
      const thumbHeight = this.verticalThumb.clientHeight;
      const scrollableHeight = scrollbarHeight - thumbHeight;
      
      if (scrollableHeight > 0) {
        const scrollRatio = deltaY / scrollableHeight;
        const newScrollTop = this.dragStartScrollTop + (scrollRatio * this.getMaxScrollTop());
        this.scrollTo(this.scrollLeft, Math.max(0, Math.min(newScrollTop, this.getMaxScrollTop())));
      }
    }
    
    if (this.isDraggingHorizontal) {
      const deltaX = event.clientX - this.dragStartX;
      const scrollbarWidth = this.horizontalScrollbar.clientWidth;
      const thumbWidth = this.horizontalThumb.clientWidth;
      const scrollableWidth = scrollbarWidth - thumbWidth;
      
      if (scrollableWidth > 0) {
        const scrollRatio = deltaX / scrollableWidth;
        const newScrollLeft = this.dragStartScrollLeft + (scrollRatio * this.getMaxScrollLeft());
        this.scrollTo(Math.max(0, Math.min(newScrollLeft, this.getMaxScrollLeft())), this.scrollTop);
      }
    }
  }
  
  /**
   * 处理鼠标释放（拖拽结束）
   */
  private handleMouseUp(): void {
    if (this.isDraggingVertical) {
      this.isDraggingVertical = false;
      this.verticalThumb.style.backgroundColor = '#c0c0c0';
    }
    
    if (this.isDraggingHorizontal) {
      this.isDraggingHorizontal = false;
      this.horizontalThumb.style.backgroundColor = '#c0c0c0';
    }
  }
  
  /**
   * 处理垂直滚动条点击
   */
  private handleVerticalScrollbarClick(event: MouseEvent): void {
    if (event.target === this.verticalThumb) return;
    
    const rect = this.verticalScrollbar.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const thumbTop = this.verticalThumb.offsetTop;
    const thumbHeight = this.verticalThumb.clientHeight;
    
    let newScrollTop: number;
    
    if (clickY < thumbTop) {
      // 点击在滑块上方，向上翻页
      newScrollTop = this.scrollTop - this.clientHeight;
    } else if (clickY > thumbTop + thumbHeight) {
      // 点击在滑块下方，向下翻页
      newScrollTop = this.scrollTop + this.clientHeight;
    } else {
      return;
    }
    
    newScrollTop = Math.max(0, Math.min(newScrollTop, this.getMaxScrollTop()));
    
    if (this.options.smoothScrolling) {
      this.smoothScrollTo(this.scrollLeft, newScrollTop);
    } else {
      this.scrollTo(this.scrollLeft, newScrollTop);
    }
  }
  
  /**
   * 处理水平滚动条点击
   */
  private handleHorizontalScrollbarClick(event: MouseEvent): void {
    if (event.target === this.horizontalThumb) return;
    
    const rect = this.horizontalScrollbar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const thumbLeft = this.horizontalThumb.offsetLeft;
    const thumbWidth = this.horizontalThumb.clientWidth;
    
    let newScrollLeft: number;
    
    if (clickX < thumbLeft) {
      // 点击在滑块左侧，向左翻页
      newScrollLeft = this.scrollLeft - this.clientWidth;
    } else if (clickX > thumbLeft + thumbWidth) {
      // 点击在滑块右侧，向右翻页
      newScrollLeft = this.scrollLeft + this.clientWidth;
    } else {
      return;
    }
    
    newScrollLeft = Math.max(0, Math.min(newScrollLeft, this.getMaxScrollLeft()));
    
    if (this.options.smoothScrolling) {
      this.smoothScrollTo(newScrollLeft, this.scrollTop);
    } else {
      this.scrollTo(newScrollLeft, this.scrollTop);
    }
  }
  
  /**
   * 更新滚动度量信息
   */
  private updateScrollMetrics(): void {
    const containerRect = this.container.getBoundingClientRect();
    
    // 更新客户端尺寸
    this.clientWidth = containerRect.width - (this.options.showScrollbars ? 14 : 0);
    this.clientHeight = containerRect.height - (this.options.showScrollbars ? 14 : 0);
    
    // 计算内容尺寸
    const lineCount = this.model.getLineCount();
    this.scrollHeight = lineCount * this.options.lineHeight;
    
    // 计算最大行长度
    let maxLineLength = 0;
    for (let i = 0; i < Math.min(lineCount, 1000); i++) { // 限制检查行数以提高性能
      const lineLength = this.model.getLineLength(i);
      maxLineLength = Math.max(maxLineLength, lineLength);
    }
    
    this.scrollWidth = Math.max(maxLineLength * this.options.charWidth, this.clientWidth);
    
    // 限制当前滚动位置
    this.scrollTop = Math.max(0, Math.min(this.scrollTop, this.getMaxScrollTop()));
    this.scrollLeft = Math.max(0, Math.min(this.scrollLeft, this.getMaxScrollLeft()));
  }
  
  /**
   * 更新视口信息
   */
  private updateViewport(): void {
    // 计算可视行范围
    const startLine = Math.floor(this.scrollTop / this.options.lineHeight);
    const endLine = Math.min(
      Math.ceil((this.scrollTop + this.clientHeight) / this.options.lineHeight),
      this.model.getLineCount() - 1
    );
    
    // 计算可视列范围
    const startColumn = Math.floor(this.scrollLeft / this.options.charWidth);
    const endColumn = Math.ceil((this.scrollLeft + this.clientWidth) / this.options.charWidth);
    
    // 计算偏移量
    const offsetY = this.scrollTop % this.options.lineHeight;
    const offsetX = this.scrollLeft % this.options.charWidth;
    
    this.viewport = {
      startLine,
      endLine,
      startColumn,
      endColumn,
      offsetY,
      offsetX
    };
    
    // 更新滚动条
    this.updateScrollbars();
    
    // 通知监听器
    this.notifyScrollChange();
  }
  
  /**
   * 更新滚动条显示
   */
  private updateScrollbars(): void {
    if (!this.options.showScrollbars) return;
    
    // 更新垂直滚动条
    const maxScrollTop = this.getMaxScrollTop();
    if (maxScrollTop > 0) {
      const scrollRatio = this.scrollTop / maxScrollTop;
      const thumbHeight = Math.max(20, (this.clientHeight / this.scrollHeight) * this.verticalScrollbar.clientHeight);
      const thumbTop = scrollRatio * (this.verticalScrollbar.clientHeight - thumbHeight);
      
      this.verticalThumb.style.height = `${thumbHeight}px`;
      this.verticalThumb.style.top = `${thumbTop}px`;
      this.verticalScrollbar.style.display = 'block';
    } else {
      this.verticalScrollbar.style.display = 'none';
    }
    
    // 更新水平滚动条
    const maxScrollLeft = this.getMaxScrollLeft();
    if (maxScrollLeft > 0) {
      const scrollRatio = this.scrollLeft / maxScrollLeft;
      const thumbWidth = Math.max(20, (this.clientWidth / this.scrollWidth) * this.horizontalScrollbar.clientWidth);
      const thumbLeft = scrollRatio * (this.horizontalScrollbar.clientWidth - thumbWidth);
      
      this.horizontalThumb.style.width = `${thumbWidth}px`;
      this.horizontalThumb.style.left = `${thumbLeft}px`;
      this.horizontalScrollbar.style.display = 'block';
    } else {
      this.horizontalScrollbar.style.display = 'none';
    }
  }
  
  /**
   * 获取最大垂直滚动位置
   */
  private getMaxScrollTop(): number {
    return Math.max(0, this.scrollHeight - this.clientHeight);
  }
  
  /**
   * 获取最大水平滚动位置
   */
  private getMaxScrollLeft(): number {
    return Math.max(0, this.scrollWidth - this.clientWidth);
  }
  
  /**
   * 滚动到指定位置
   * @param left 水平滚动位置
   * @param top 垂直滚动位置
   */
  scrollTo(left: number, top: number): void {
    // 限制滚动范围
    const newScrollLeft = Math.max(0, Math.min(left, this.getMaxScrollLeft()));
    const newScrollTop = Math.max(0, Math.min(top, this.getMaxScrollTop()));
    
    // 检查是否真的需要滚动
    if (newScrollLeft === this.scrollLeft && newScrollTop === this.scrollTop) {
      return;
    }
    
    // 更新滚动位置
    this.scrollLeft = newScrollLeft;
    this.scrollTop = newScrollTop;
    
    // 更新视口
    this.updateViewport();
  }
  
  /**
   * 平滑滚动到指定位置
   * @param left 水平滚动位置
   * @param top 垂直滚动位置
   */
  smoothScrollTo(left: number, top: number): void {
    // 限制滚动范围
    this.targetScrollLeft = Math.max(0, Math.min(left, this.getMaxScrollLeft()));
    this.targetScrollTop = Math.max(0, Math.min(top, this.getMaxScrollTop()));
    
    // 如果已经在目标位置，直接返回
    if (this.targetScrollLeft === this.scrollLeft && this.targetScrollTop === this.scrollTop) {
      return;
    }
    
    // 停止当前动画
    if (this.scrollAnimation) {
      cancelAnimationFrame(this.scrollAnimation);
    }
    
    // 开始新的动画
    this.animateScroll();
  }
  
  /**
   * 滚动动画
   */
  private animateScroll(): void {
    const deltaLeft = this.targetScrollLeft - this.scrollLeft;
    const deltaTop = this.targetScrollTop - this.scrollTop;
    
    // 如果距离很小，直接跳到目标位置
    if (Math.abs(deltaLeft) < 1 && Math.abs(deltaTop) < 1) {
      this.scrollTo(this.targetScrollLeft, this.targetScrollTop);
      this.scrollAnimation = null;
      return;
    }
    
    // 计算缓动
    const easing = 0.15;
    const newScrollLeft = this.scrollLeft + deltaLeft * easing;
    const newScrollTop = this.scrollTop + deltaTop * easing;
    
    // 应用滚动
    this.scrollTo(newScrollLeft, newScrollTop);
    
    // 继续动画
    this.scrollAnimation = requestAnimationFrame(() => this.animateScroll());
  }
  
  /**
   * 滚动到指定行
   * @param line 目标行号
   * @param column 目标列号（可选）
   */
  scrollToLine(line: number, column?: number): void {
    const targetTop = line * this.options.lineHeight;
    let targetLeft = this.scrollLeft;
    
    if (column !== undefined) {
      targetLeft = column * this.options.charWidth;
    }
    
    // 确保目标位置在可视区域内
    const centerTop = targetTop - this.clientHeight / 2;
    const centerLeft = targetLeft - this.clientWidth / 2;
    
    if (this.options.smoothScrolling) {
      this.smoothScrollTo(centerLeft, centerTop);
    } else {
      this.scrollTo(centerLeft, centerTop);
    }
  }
  
  /**
   * 确保指定位置在可视区域内
   * @param line 行号
   * @param column 列号
   */
  revealPosition(line: number, column: number): void {
    const targetTop = line * this.options.lineHeight;
    const targetLeft = column * this.options.charWidth;
    
    let newScrollTop = this.scrollTop;
    let newScrollLeft = this.scrollLeft;
    
    // 检查垂直方向
    if (targetTop < this.scrollTop) {
      // 目标在可视区域上方
      newScrollTop = targetTop;
    } else if (targetTop + this.options.lineHeight > this.scrollTop + this.clientHeight) {
      // 目标在可视区域下方
      newScrollTop = targetTop + this.options.lineHeight - this.clientHeight;
    }
    
    // 检查水平方向
    if (targetLeft < this.scrollLeft) {
      // 目标在可视区域左侧
      newScrollLeft = targetLeft;
    } else if (targetLeft + this.options.charWidth > this.scrollLeft + this.clientWidth) {
      // 目标在可视区域右侧
      newScrollLeft = targetLeft + this.options.charWidth - this.clientWidth;
    }
    
    // 应用滚动
    if (newScrollTop !== this.scrollTop || newScrollLeft !== this.scrollLeft) {
      if (this.options.smoothScrolling) {
        this.smoothScrollTo(newScrollLeft, newScrollTop);
      } else {
        this.scrollTo(newScrollLeft, newScrollTop);
      }
    }
  }
  
  /**
   * 获取当前滚动信息
   */
  getScrollInfo(): ScrollInfo {
    return {
      scrollTop: this.scrollTop,
      scrollLeft: this.scrollLeft,
      scrollWidth: this.scrollWidth,
      scrollHeight: this.scrollHeight,
      clientWidth: this.clientWidth,
      clientHeight: this.clientHeight
    };
  }
  
  /**
   * 获取当前视口信息
   */
  getViewportInfo(): ViewportInfo {
    return { ...this.viewport };
  }
  
  /**
   * 获取内容区域元素
   */
  getContentArea(): HTMLDivElement {
    return this.contentArea;
  }
  
  /**
   * 更新配置选项
   * @param newOptions 新的配置选项
   */
  updateOptions(newOptions: Partial<ScrollOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.updateScrollMetrics();
    this.updateViewport();
  }
  
  /**
   * 注册滚动变化监听器
   * @param listener 监听器函数
   */
  onDidScroll(listener: ScrollChangeListener): void {
    this.scrollChangeListeners.push(listener);
  }
  
  /**
   * 移除滚动变化监听器
   * @param listener 要移除的监听器函数
   */
  offDidScroll(listener: ScrollChangeListener): void {
    const index = this.scrollChangeListeners.indexOf(listener);
    if (index >= 0) {
      this.scrollChangeListeners.splice(index, 1);
    }
  }
  
  /**
   * 通知所有监听器滚动已变化
   */
  private notifyScrollChange(): void {
    const scrollInfo = this.getScrollInfo();
    const viewport = this.getViewportInfo();
    
    // 使用节流避免过于频繁的通知
    if (this.scrollThrottleTimer) {
      clearTimeout(this.scrollThrottleTimer);
    }
    
    this.scrollThrottleTimer = window.setTimeout(() => {
      this.scrollChangeListeners.forEach(listener => {
        try {
          listener(scrollInfo, viewport);
        } catch (error) {
          console.error('滚动变化监听器执行错误:', error);
        }
      });
    }, 16); // 约 60fps
  }
  
  /**
   * 获取调试信息
   */
  getDebugInfo() {
    return {
      scrollInfo: this.getScrollInfo(),
      viewport: this.getViewportInfo(),
      options: this.options,
      isDraggingVertical: this.isDraggingVertical,
      isDraggingHorizontal: this.isDraggingHorizontal,
      scrollAnimation: this.scrollAnimation !== null
    };
  }
  
  /**
   * 销毁滚动管理器
   */
  dispose(): void {
    // 停止动画
    if (this.scrollAnimation) {
      cancelAnimationFrame(this.scrollAnimation);
      this.scrollAnimation = null;
    }
    
    // 清理定时器
    if (this.scrollThrottleTimer) {
      clearTimeout(this.scrollThrottleTimer);
      this.scrollThrottleTimer = null;
    }
    
    if (this.resizeThrottleTimer) {
      clearTimeout(this.resizeThrottleTimer);
      this.resizeThrottleTimer = null;
    }
    
    // 移除事件监听器
    window.removeEventListener('resize', this.handleResize.bind(this));
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // 清理监听器
    this.scrollChangeListeners = [];
    
    console.log('ScrollManager 已销毁');
  }
}