/**
 * SyntaxHighlighter - 语法高亮器
 * 
 * 基于 Monaco Editor 的语法高亮机制，提供基础的代码语法高亮功能
 * 核心特点：
 * 1. 多语言支持 - 支持 JavaScript、TypeScript、CSS、HTML 等常见语言
 * 2. 标记化 - 将代码文本分解为语法标记
 * 3. 样式映射 - 将语法标记映射到 CSS 类名
 * 4. 性能优化 - 缓存标记化结果，避免重复计算
 * 5. 扩展性 - 易于添加新的语言支持
 */

export interface Token {
  type: string;      // 标记类型（keyword, string, comment 等）
  value: string;     // 标记内容
  startIndex: number; // 在行中的起始位置
  endIndex: number;   // 在行中的结束位置
}

export interface LanguageDefinition {
  name: string;
  keywords: string[];
  operators: string[];
  brackets: string[];
  stringDelimiters: string[];
  commentPatterns: {
    line?: string;     // 单行注释标记
    blockStart?: string; // 块注释开始标记
    blockEnd?: string;   // 块注释结束标记
  };
  numberPattern: RegExp;
  identifierPattern: RegExp;
}

/**
 * 内置语言定义
 */
const LANGUAGE_DEFINITIONS: { [key: string]: LanguageDefinition } = {
  javascript: {
    name: 'JavaScript',
    keywords: [
      'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
      'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
      'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
      'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
      'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
      'null', 'package', 'private', 'protected', 'public', 'return', 'short',
      'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
      'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
      'with', 'yield', 'async', 'of'
    ],
    operators: [
      '+', '-', '*', '/', '%', '++', '--', '=', '+=', '-=', '*=', '/=', '%=',
      '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '!', '&',
      '|', '^', '~', '<<', '>>', '>>>', '?', ':', '=>'
    ],
    brackets: ['(', ')', '[', ']', '{', '}'],
    stringDelimiters: ['"', "'", '`'],
    commentPatterns: {
      line: '//',
      blockStart: '/*',
      blockEnd: '*/'
    },
    numberPattern: /\b\d+(\.\d+)?([eE][+-]?\d+)?\b/,
    identifierPattern: /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/
  },
  
  typescript: {
    name: 'TypeScript',
    keywords: [
      'abstract', 'any', 'as', 'asserts', 'bigint', 'boolean', 'break', 'case',
      'catch', 'class', 'const', 'continue', 'debugger', 'declare', 'default',
      'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally',
      'for', 'from', 'function', 'get', 'if', 'implements', 'import', 'in',
      'infer', 'instanceof', 'interface', 'is', 'keyof', 'let', 'module',
      'namespace', 'never', 'new', 'null', 'number', 'object', 'of', 'package',
      'private', 'protected', 'public', 'readonly', 'require', 'return', 'set',
      'static', 'string', 'super', 'switch', 'symbol', 'this', 'throw', 'true',
      'try', 'type', 'typeof', 'undefined', 'unique', 'unknown', 'var', 'void',
      'while', 'with', 'yield', 'async', 'await'
    ],
    operators: [
      '+', '-', '*', '/', '%', '++', '--', '=', '+=', '-=', '*=', '/=', '%=',
      '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '!', '&',
      '|', '^', '~', '<<', '>>', '>>>', '?', ':', '=>', '??', '?.'
    ],
    brackets: ['(', ')', '[', ']', '{', '}', '<', '>'],
    stringDelimiters: ['"', "'", '`'],
    commentPatterns: {
      line: '//',
      blockStart: '/*',
      blockEnd: '*/'
    },
    numberPattern: /\b\d+(\.\d+)?([eE][+-]?\d+)?\b/,
    identifierPattern: /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/
  },
  
  css: {
    name: 'CSS',
    keywords: [
      'important', 'inherit', 'initial', 'unset', 'auto', 'none', 'normal',
      'bold', 'italic', 'underline', 'left', 'right', 'center', 'justify',
      'top', 'bottom', 'middle', 'baseline', 'absolute', 'relative', 'fixed',
      'static', 'sticky', 'block', 'inline', 'flex', 'grid', 'table'
    ],
    operators: [':', ';', ',', '>', '+', '~', '*'],
    brackets: ['(', ')', '[', ']', '{', '}'],
    stringDelimiters: ['"', "'"],
    commentPatterns: {
      blockStart: '/*',
      blockEnd: '*/'
    },
    numberPattern: /\b\d+(\.\d+)?(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax|deg|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?\b/,
    identifierPattern: /\b[a-zA-Z_-][a-zA-Z0-9_-]*\b/
  },
  
  html: {
    name: 'HTML',
    keywords: [
      'html', 'head', 'title', 'body', 'div', 'span', 'p', 'a', 'img', 'ul',
      'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button',
      'script', 'style', 'link', 'meta', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    operators: ['='],
    brackets: ['<', '>', '(', ')', '[', ']', '{', '}'],
    stringDelimiters: ['"', "'"],
    commentPatterns: {
      blockStart: '<!--',
      blockEnd: '-->'
    },
    numberPattern: /\b\d+\b/,
    identifierPattern: /\b[a-zA-Z_-][a-zA-Z0-9_-]*\b/
  },
  
  json: {
    name: 'JSON',
    keywords: ['true', 'false', 'null'],
    operators: [':', ','],
    brackets: ['[', ']', '{', '}'],
    stringDelimiters: ['"'],
    commentPatterns: {},
    numberPattern: /\b-?\d+(\.\d+)?([eE][+-]?\d+)?\b/,
    identifierPattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/
  }
};

/**
 * SyntaxHighlighter 类 - 语法高亮的核心实现
 */
export class SyntaxHighlighter {
  private language: LanguageDefinition;
  private tokenCache = new Map<string, Token[]>();
  private maxCacheSize = 1000;
  
  constructor(languageId: string = 'javascript') {
    this.setLanguage(languageId);
  }
  
  /**
   * 设置当前语言
   * @param languageId 语言标识符
   */
  setLanguage(languageId: string): void {
    const language = LANGUAGE_DEFINITIONS[languageId.toLowerCase()];
    if (!language) {
      console.warn(`不支持的语言: ${languageId}，使用默认的 JavaScript`);
      this.language = LANGUAGE_DEFINITIONS.javascript;
    } else {
      this.language = language;
    }
    
    // 清空缓存
    this.tokenCache.clear();
  }
  
  /**
   * 获取支持的语言列表
   */
  static getSupportedLanguages(): string[] {
    return Object.keys(LANGUAGE_DEFINITIONS);
  }
  
  /**
   * 标记化单行文本
   * @param line 要标记化的文本行
   * @returns 标记数组
   */
  tokenizeLine(line: string): Token[] {
    // 检查缓存
    if (this.tokenCache.has(line)) {
      return this.tokenCache.get(line)!;
    }
    
    const tokens = this.parseTokens(line);
    
    // 缓存结果（限制缓存大小）
    if (this.tokenCache.size >= this.maxCacheSize) {
      // 删除最旧的缓存项
      const firstKey = this.tokenCache.keys().next().value;
      this.tokenCache.delete(firstKey);
    }
    this.tokenCache.set(line, tokens);
    
    return tokens;
  }
  
  /**
   * 解析文本行为标记
   * @param line 文本行
   * @returns 标记数组
   */
  private parseTokens(line: string): Token[] {
    const tokens: Token[] = [];
    let index = 0;
    
    while (index < line.length) {
      const char = line[index];
      
      // 跳过空白字符
      if (/\s/.test(char)) {
        index++;
        continue;
      }
      
      // 检查注释
      const commentToken = this.tryParseComment(line, index);
      if (commentToken) {
        tokens.push(commentToken);
        index = commentToken.endIndex;
        continue;
      }
      
      // 检查字符串
      const stringToken = this.tryParseString(line, index);
      if (stringToken) {
        tokens.push(stringToken);
        index = stringToken.endIndex;
        continue;
      }
      
      // 检查数字
      const numberToken = this.tryParseNumber(line, index);
      if (numberToken) {
        tokens.push(numberToken);
        index = numberToken.endIndex;
        continue;
      }
      
      // 检查操作符
      const operatorToken = this.tryParseOperator(line, index);
      if (operatorToken) {
        tokens.push(operatorToken);
        index = operatorToken.endIndex;
        continue;
      }
      
      // 检查括号
      const bracketToken = this.tryParseBracket(line, index);
      if (bracketToken) {
        tokens.push(bracketToken);
        index = bracketToken.endIndex;
        continue;
      }
      
      // 检查标识符（关键字、函数名、变量名等）
      const identifierToken = this.tryParseIdentifier(line, index);
      if (identifierToken) {
        tokens.push(identifierToken);
        index = identifierToken.endIndex;
        continue;
      }
      
      // 未识别的字符，作为普通文本处理
      const textToken: Token = {
        type: 'text',
        value: char,
        startIndex: index,
        endIndex: index + 1
      };
      tokens.push(textToken);
      index++;
    }
    
    return tokens;
  }
  
  /**
   * 尝试解析注释
   */
  private tryParseComment(line: string, startIndex: number): Token | null {
    const { line: lineComment, blockStart, blockEnd } = this.language.commentPatterns;
    
    // 单行注释
    if (lineComment && line.substring(startIndex, startIndex + lineComment.length) === lineComment) {
      return {
        type: 'comment',
        value: line.substring(startIndex),
        startIndex,
        endIndex: line.length
      };
    }
    
    // 块注释开始
    if (blockStart && line.substring(startIndex, startIndex + blockStart.length) === blockStart) {
      let endIndex = startIndex + blockStart.length;
      
      // 查找块注释结束
      if (blockEnd) {
        const blockEndIndex = line.indexOf(blockEnd, endIndex);
        if (blockEndIndex !== -1) {
          endIndex = blockEndIndex + blockEnd.length;
        } else {
          endIndex = line.length; // 块注释在本行未结束
        }
      }
      
      return {
        type: 'comment',
        value: line.substring(startIndex, endIndex),
        startIndex,
        endIndex
      };
    }
    
    return null;
  }
  
  /**
   * 尝试解析字符串
   */
  private tryParseString(line: string, startIndex: number): Token | null {
    const char = line[startIndex];
    
    if (!this.language.stringDelimiters.includes(char)) {
      return null;
    }
    
    let endIndex = startIndex + 1;
    let escaped = false;
    
    while (endIndex < line.length) {
      const currentChar = line[endIndex];
      
      if (escaped) {
        escaped = false;
      } else if (currentChar === '\\') {
        escaped = true;
      } else if (currentChar === char) {
        endIndex++; // 包含结束引号
        break;
      }
      
      endIndex++;
    }
    
    return {
      type: 'string',
      value: line.substring(startIndex, endIndex),
      startIndex,
      endIndex
    };
  }
  
  /**
   * 尝试解析数字
   */
  private tryParseNumber(line: string, startIndex: number): Token | null {
    const match = line.substring(startIndex).match(this.language.numberPattern);
    
    if (match && match.index === 0) {
      return {
        type: 'number',
        value: match[0],
        startIndex,
        endIndex: startIndex + match[0].length
      };
    }
    
    return null;
  }
  
  /**
   * 尝试解析操作符
   */
  private tryParseOperator(line: string, startIndex: number): Token | null {
    // 按长度降序排序，优先匹配长操作符
    const sortedOperators = [...this.language.operators].sort((a, b) => b.length - a.length);
    
    for (const operator of sortedOperators) {
      if (line.substring(startIndex, startIndex + operator.length) === operator) {
        return {
          type: 'operator',
          value: operator,
          startIndex,
          endIndex: startIndex + operator.length
        };
      }
    }
    
    return null;
  }
  
  /**
   * 尝试解析括号
   */
  private tryParseBracket(line: string, startIndex: number): Token | null {
    const char = line[startIndex];
    
    if (this.language.brackets.includes(char)) {
      return {
        type: 'punctuation',
        value: char,
        startIndex,
        endIndex: startIndex + 1
      };
    }
    
    return null;
  }
  
  /**
   * 尝试解析标识符
   */
  private tryParseIdentifier(line: string, startIndex: number): Token | null {
    const match = line.substring(startIndex).match(this.language.identifierPattern);
    
    if (match && match.index === 0) {
      const value = match[0];
      let type = 'variable';
      
      // 检查是否为关键字
      if (this.language.keywords.includes(value)) {
        type = 'keyword';
      }
      // 检查是否为函数调用（后面跟着括号）
      else if (startIndex + value.length < line.length && line[startIndex + value.length] === '(') {
        type = 'function';
      }
      // 检查是否为类型（首字母大写）
      else if (/^[A-Z]/.test(value)) {
        type = 'type';
      }
      
      return {
        type,
        value,
        startIndex,
        endIndex: startIndex + value.length
      };
    }
    
    return null;
  }
  
  /**
   * 将标记转换为 HTML
   * @param tokens 标记数组
   * @returns HTML 字符串
   */
  tokensToHtml(tokens: Token[]): string {
    return tokens.map(token => {
      const className = this.getTokenClassName(token.type);
      const escapedValue = this.escapeHtml(token.value);
      
      if (className) {
        return `<span class="${className}">${escapedValue}</span>`;
      } else {
        return escapedValue;
      }
    }).join('');
  }
  
  /**
   * 将标记转换为 React 元素数据
   * @param tokens 标记数组
   * @returns React 元素数据数组
   */
  tokensToReactElements(tokens: Token[]): Array<{ type: string; value: string; className?: string }> {
    return tokens.map(token => ({
      type: token.type,
      value: token.value,
      className: this.getTokenClassName(token.type)
    }));
  }
  
  /**
   * 获取标记对应的 CSS 类名
   * @param tokenType 标记类型
   * @returns CSS 类名
   */
  private getTokenClassName(tokenType: string): string | null {
    const classMap: { [key: string]: string } = {
      'keyword': 'token-keyword',
      'string': 'token-string',
      'comment': 'token-comment',
      'number': 'token-number',
      'operator': 'token-operator',
      'function': 'token-function',
      'variable': 'token-variable',
      'type': 'token-type',
      'punctuation': 'token-punctuation'
    };
    
    return classMap[tokenType] || null;
  }
  
  /**
   * 转义 HTML 特殊字符
   * @param text 原始文本
   * @returns 转义后的文本
   */
  private escapeHtml(text: string): string {
    const htmlEscapes: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    
    return text.replace(/[&<>"']/g, char => htmlEscapes[char]);
  }
  
  /**
   * 清空标记缓存
   */
  clearCache(): void {
    this.tokenCache.clear();
  }
  
  /**
   * 获取缓存统计信息
   */
  getCacheStats() {
    return {
      size: this.tokenCache.size,
      maxSize: this.maxCacheSize,
      language: this.language.name
    };
  }
  
  /**
   * 注册新的语言定义
   * @param languageId 语言标识符
   * @param definition 语言定义
   */
  static registerLanguage(languageId: string, definition: LanguageDefinition): void {
    LANGUAGE_DEFINITIONS[languageId.toLowerCase()] = definition;
  }
}

/**
 * 创建语法高亮器实例的工厂函数
 * @param languageId 语言标识符
 * @returns 语法高亮器实例
 */
export function createSyntaxHighlighter(languageId: string = 'javascript'): SyntaxHighlighter {
  return new SyntaxHighlighter(languageId);
}

/**
 * 快速高亮单行文本的工具函数
 * @param line 文本行
 * @param languageId 语言标识符
 * @returns HTML 字符串
 */
export function highlightLine(line: string, languageId: string = 'javascript'): string {
  const highlighter = new SyntaxHighlighter(languageId);
  const tokens = highlighter.tokenizeLine(line);
  return highlighter.tokensToHtml(tokens);
}