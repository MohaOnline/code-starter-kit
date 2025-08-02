/**
 * TipTap 编辑器工具函数
 * 提供处理 HTML 属性和内容的辅助功能
 */

/**
 * 处理双引号，避免破坏 HTML 属性结构
 * @param str 需要处理的字符串
 * @returns 处理后的字符串
 */
export const escapeQuotes = (str: string): string => {
  if (!str) return '';
  // 将双引号替换为 HTML 实体
  return str.replace(/"/g, '&quot;');
};

/**
 * 还原转义后的双引号
 * @param str 包含转义双引号的字符串
 * @returns 还原后的字符串
 */
export const unescapeQuotes = (str: string): string => {
  if (!str) return '';
  // 将 HTML 实体转回双引号
  return str.replace(/&quot;/g, '"');
};

/**
 * 生成随机 UUID
 * 用于设置新 span 的 data-voice-id
 * @returns UUID 字符串
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
