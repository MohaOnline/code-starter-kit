'use client';

import {useEffect} from 'react';

/**
 * 自定义 Hook：动态注入脚本或样式到 head 元素
 *
 * @param {Object} meta - 配置选项
 * @param {string} content - JavaScript 或 CSS 字符串内容
 * @param {string} meta.type - 类型：'script' 或 'style'
 * @param {string} meta.identifier - 用于标识的属性值，避免重复注入
 * @param {string} meta.styleType - 样式类型，如 'text/css' 或 'text/tailwindcss'
 */
export const useElementInjection2HTMLHead = (meta = {}, content) => {
  const {
    element = 'style',
    type = 'text/css',
    identifier = 'id-head-supplement',
  } = meta;

  useEffect(() => {
    const injectContent = () => {
      // 检查是否已存在相同内容，避免重复注入
      const existingElement = document.querySelector(`[data-head-supplement-id="${identifier}"]`);
      if (existingElement) return;

      let elementObject;

      if (element === 'script') {
        // 创建 script 元素
        elementObject = document.createElement('script');
        elementObject.type = 'text/javascript';
        elementObject.innerHTML = content;
      }
      else if (element === 'style') {
        // 创建 style 元素
        elementObject = document.createElement('style');
        elementObject.type = type;  // type="text/tailwindcss"
        elementObject.innerHTML = content;
      }

      if (elementObject) {
        elementObject.setAttribute('data-head-supplement-id', identifier);
        // 追加到 head 最后
        document.head.appendChild(elementObject);
      }
    };

    if (document.readyState === 'complete') {
      injectContent();
    }
    else {
      window.addEventListener('load', injectContent);
    }

    // 清理函数
    return () => {
      window.removeEventListener('load', injectContent);
      // 组件卸载时移除注入的元素
      const element = document.querySelector(`[data-head-supplement-id="${identifier}"]`);
      if (element) {
        document.head.removeChild(element);
      }
    };
  }, [content, element, type, identifier]);
};
