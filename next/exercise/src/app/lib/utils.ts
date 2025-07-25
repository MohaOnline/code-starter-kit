import { split } from 'sentence-splitter';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名的工具函数
 * Utility function for merging Tailwind CSS class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 使用 sentence-splitter 库处理中英文文本的预处理函数
 * Text preprocessing function using sentence-splitter library for Chinese and English text
 * 
 * 支持混合处理：已处理的段落保持原样，未处理的段落进行句子分割处理
 * Supports mixed processing: processed paragraphs remain unchanged, unprocessed paragraphs are sentence-split
 * 
 * @param text - 输入的原始文本 / Input raw text
 * @returns 处理后的 HTML 字符串，包含 <p> 和 <span> 标签 / Processed HTML string with <p> and <span> tags
 */
export function preprocessTextWithSentenceSplitter(text: string): string {
  if (!text || typeof text !== "string") {
    return text;
  }

  // 首先按段落分割文本，支持多种分割方式
  // First split text by paragraphs, supporting multiple splitting methods
  const paragraphs = splitTextIntoParagraphs(text);
  
  return paragraphs
    .map(paragraph => {
      const trimmedParagraph = paragraph.trim();
      if (!trimmedParagraph) return "";

      // 检查段落是否已经被处理过（包含完整的<p>和<span>标签结构）
      // Check if paragraph is already processed (contains complete <p> and <span> tag structure)
      if (isParagraphProcessed(trimmedParagraph)) {
        // 检查已处理段落中是否有多个句子在同一个span中，需要拆分
        // Check if processed paragraph has multiple sentences in the same span that need splitting
        return refineParagraphSpans(trimmedParagraph);
      }

      // 如果段落未处理，进行句子分割和HTML包装
      // If paragraph is unprocessed, perform sentence splitting and HTML wrapping
      return processUnprocessedParagraph(trimmedParagraph);
    })
    .filter(p => p)
    .join("\n");
}

/**
 * 将文本分割为段落数组
 * Split text into paragraph array
 * 
 * @param text - 输入文本 / Input text
 * @returns 段落数组 / Array of paragraphs
 */
function splitTextIntoParagraphs(text: string): string[] {
  // 智能段落分割，支持混合内容（已处理和未处理的段落）
  // Smart paragraph splitting, supports mixed content (processed and unprocessed paragraphs)
  
  const paragraphs: string[] = [];
  let currentParagraph = '';
  let insideHtmlTag = false;
  let htmlTagDepth = 0;
  
  // 按行分割文本
  // Split text by lines
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 空行表示段落结束
    // Empty line indicates end of paragraph
    if (!line) {
      if (currentParagraph.trim()) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
        insideHtmlTag = false;
        htmlTagDepth = 0;
      }
      continue;
    }
    
    // 检查是否是HTML段落标签
    // Check if it's an HTML paragraph tag
    if (line.includes('<p>') || line.includes('<p ')) {
      // 如果当前段落不为空，先保存
      // If current paragraph is not empty, save it first
      if (currentParagraph.trim()) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
      insideHtmlTag = true;
      htmlTagDepth = 1;
      currentParagraph = line;
    } else if (line.includes('</p>')) {
      // HTML段落结束
      // End of HTML paragraph
      currentParagraph += (currentParagraph ? '\n' : '') + line;
      if (htmlTagDepth > 0) {
        htmlTagDepth--;
        if (htmlTagDepth === 0) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = '';
          insideHtmlTag = false;
        }
      }
    } else if (insideHtmlTag) {
      // 在HTML标签内的文本
      // Text inside HTML tags
      currentParagraph += (currentParagraph ? '\n' : '') + line;
    } else {
      // 普通文本行
      // Regular text line
      
      // 如果当前段落为空，直接开始新段落
      // If current paragraph is empty, start new paragraph directly
      if (!currentParagraph.trim()) {
        currentParagraph = line;
      }
      // 如果当前段落不为空，且当前行看起来像新段落的开始
      // If current paragraph is not empty and current line looks like start of new paragraph
      else if (isNewParagraphStart(line, currentParagraph)) {
        // 保存当前段落，开始新段落
        // Save current paragraph and start new paragraph
        paragraphs.push(currentParagraph.trim());
        currentParagraph = line;
      } else {
        // 继续当前段落
        // Continue current paragraph
        currentParagraph += ' ' + line;
      }
    }
  }
  
  // 处理最后一个段落
  // Handle the last paragraph
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
  }
  
  return paragraphs.filter(p => p.trim());
}

/**
 * 判断当前行是否是新段落的开始
 * Determine if current line is the start of a new paragraph
 * 
 * @param currentLine - 当前行 / Current line
 * @param existingParagraph - 已有段落内容 / Existing paragraph content
 * @returns 是否为新段落开始 / Whether it's start of new paragraph
 */
function isNewParagraphStart(currentLine: string, existingParagraph: string): boolean {
  // 如果已有段落为空，不是新段落
  // If existing paragraph is empty, not a new paragraph
  if (!existingParagraph.trim()) {
    return false;
  }
  
  // 检查已有段落是否是完整的HTML段落（以</p>结尾）
  // Check if existing paragraph is a complete HTML paragraph (ends with </p>)
  if (existingParagraph.trim().endsWith('</p>')) {
    // HTML段落后的任何非空文本都应该是新段落
    // Any non-empty text after HTML paragraph should be a new paragraph
    return currentLine.trim().length > 0;
  }
  
  // 获取已有段落的最后一行（按换行符分割）
  // Get the last line of existing paragraph (split by newline)
  const existingLines = existingParagraph.trim().split(/[\n\r]+/);
  const lastLine = existingLines[existingLines.length - 1].trim();
  
  // 检查语言变化：中文到英文或英文到中文
  // Check language change: Chinese to English or English to Chinese
  const isCurrentChinese = isChineseText(currentLine);
  const isLastChinese = isChineseText(lastLine);
  
  // 语言变化时自动分段
  // Auto-split when language changes
  if (isCurrentChinese !== isLastChinese) {
    return true;
  }
  
  // 检查是否以句号结尾（可能是段落结束）
  // Check if ends with period (might be end of paragraph)
  const endsWithPeriod = /[。.!?！？]\s*$/.test(lastLine);
  
  // 检查当前行是否以特殊标记开始（如 ——）
  // Check if current line starts with special markers (like ——)
  const startsWithMarker = /^[——\-\*\+]/.test(currentLine);
  
  // 句号结尾 + 特殊标记开头 = 新段落
  // Period ending + special marker beginning = new paragraph
  if (endsWithPeriod && startsWithMarker) {
    return true;
  }
  
  // 对于没有特殊标记的情况，如果上一行以句号结尾，当前行开始新内容，也认为是新段落
  // For cases without special markers, if previous line ends with period and current line starts new content, consider as new paragraph
  if (endsWithPeriod && currentLine.trim() && !currentLine.startsWith(' ')) {
    return true;
  }
  
  return false;
}

/**
 * 检查段落是否已经被处理过
 * Check if paragraph is already processed
 * 
 * @param paragraph - 段落文本 / Paragraph text
 * @returns 是否已处理 / Whether processed
 */
function isParagraphProcessed(paragraph: string): boolean {
  // 检查是否包含span标签和必要的属性
  // Check if contains span tags and necessary attributes
  return paragraph.includes('<span') && 
         paragraph.includes('aria-label=') && 
         paragraph.includes('data-voice-id=');
}

/**
 * 优化已处理段落中的span标签（拆分多句子的span）
 * Refine span tags in processed paragraphs (split multi-sentence spans)
 * 
 * @param paragraph - 已处理的段落 / Processed paragraph
 * @returns 优化后的段落 / Refined paragraph
 */
function refineParagraphSpans(paragraph: string): string {
  // 匹配span标签的正则表达式
  // Regular expression to match span tags
  const spanRegex = /<span[^>]*aria-label="([^"]+)"[^>]*data-voice-id="[^"]*"[^>]*>([^<]+)<\/span>/g;
  let hasMultipleSentences = false;

  // 首先检查是否有需要拆分的span
  // First check if there are spans that need splitting
  paragraph.replace(spanRegex, (match, ariaLabel, content) => {
    const sentences = splitTextIntoSentences(content);
    if (sentences.length > 1) {
      hasMultipleSentences = true;
    }
    return match;
  });

  if (!hasMultipleSentences) {
    return paragraph;
  }

  // 拆分多句子的span
  // Split multi-sentence spans
  return paragraph.replace(spanRegex, (match, ariaLabel, content) => {
    const sentences = splitTextIntoSentences(content);
    if (sentences.length <= 1) {
      return match;
    }

    return sentences
      .map((sentence, index) => {
        const cleanSentence = sentence.trim();
        let ariaContent = removePrefix(sentence).trim();
        
        // 为英文句子添加半角空格，除非是段落最后一句
        // Add half-width space for English sentences, except for the last sentence in paragraph
        let displayContent = cleanSentence;
        if (index < sentences.length - 1 && isEnglishSentence(cleanSentence)) {
          displayContent = cleanSentence + ' ';
        }
        
        return `<span aria-label="${ariaContent}" data-speaker="" data-voice-id="">${displayContent}</span>`;
      })
      .join("");
  });
}

/**
 * 处理未处理的段落（进行句子分割和HTML包装）
 * Process unprocessed paragraphs (perform sentence splitting and HTML wrapping)
 * 
 * @param paragraph - 未处理的段落 / Unprocessed paragraph
 * @returns 处理后的段落 / Processed paragraph
 */
function processUnprocessedParagraph(paragraph: string): string {
  // 使用 sentence-splitter 将段落分割成句子
  // Use sentence-splitter to split paragraph into sentences
  const sentences = splitTextIntoSentences(paragraph);

  const spanElements = sentences
    .map((sentence, index) => {
      const cleanSentence = sentence.trim();
      if (!cleanSentence) return "";

      // 去除前缀用于aria-label
      // Remove prefix for aria-label
      let ariaContent = removePrefix(sentence).trim();
      
      // 为英文句子添加半角空格，除非是段落最后一句
      // Add half-width space for English sentences, except for the last sentence in paragraph
      let displayContent = cleanSentence;
      if (index < sentences.length - 1 && isEnglishSentence(cleanSentence)) {
        displayContent = cleanSentence + ' ';
      }

      return `<span aria-label="${ariaContent}" data-speaker="" data-voice-id="">${displayContent}</span>`;
    })
    .filter(span => span)
    .join("");

  return `<p>${spanElements}</p>`;
}

/**
 * 使用 sentence-splitter 库分割文本为句子
 * Split text into sentences using sentence-splitter library
 * 
 * @param text - 输入文本 / Input text
 * @returns 句子数组 / Array of sentences
 */
function splitTextIntoSentences(text: string): string[] {
  if (!text || !text.trim()) {
    return [];
  }

  try {
    // 使用 sentence-splitter 库进行句子分割
    // Use sentence-splitter library for sentence splitting
    // 该库支持中文、英文等多种语言的句子分割
    // This library supports sentence splitting for Chinese, English and other languages
    const sentences = split(text)
      .filter(node => node.type === 'Sentence')
      .map(node => node.raw.trim())
      .filter(sentence => sentence.length > 0);

    return sentences;
  } catch (error) {
    console.error('Error splitting sentences:', error);
    // 如果 sentence-splitter 出错，回退到简单的分割方法
    // If sentence-splitter fails, fallback to simple splitting method
    return fallbackSentenceSplit(text);
  }
}

/**
 * 备用的句子分割方法（当 sentence-splitter 失败时使用）
 * Fallback sentence splitting method (used when sentence-splitter fails)
 * 
 * @param text - 输入文本 / Input text
 * @returns 句子数组 / Array of sentences
 */
function fallbackSentenceSplit(text: string): string[] {
  // 中文句子结束标点：。！？
  // 英文句子结束标点：. ! ?
  // Chinese sentence ending punctuation: 。！？
  // English sentence ending punctuation: . ! ?
  const sentences = text
    .split(/([。！？.!?])\s*/)
    .reduce((acc: string[], part: string, index: number, array: string[]) => {
      if (index % 2 === 0) {
        // 文本部分
        // Text part
        const nextPart = array[index + 1];
        if (nextPart && /[。！？.!?]/.test(nextPart)) {
          acc.push((part + nextPart).trim());
        } else if (part.trim()) {
          acc.push(part.trim());
        }
      }
      return acc;
    }, [])
    .filter(sentence => sentence.length > 0);

  return sentences;
}

/**
 * 去除句子前缀的辅助函数
 * Helper function to remove sentence prefixes
 * 
 * @param sentence - 输入句子 / Input sentence
 * @returns 去除前缀后的句子 / Sentence with prefix removed
 */
function removePrefix(sentence: string): string {
  // 去除常见的对话前缀：M: W: Q: 等
  // Remove common dialogue prefixes: M: W: Q: etc.
  return sentence.replace(/^(M:|W:|Q:)\s*/, "");
}

/**
 * 检测句子是否主要包含英文字符
 * Detect if sentence mainly contains English characters
 * 
 * @param sentence - 输入句子 / Input sentence
 * @returns 是否为英文句子 / Whether it's English sentence
 */
function isEnglishSentence(sentence: string): boolean {
  if (!sentence) return false;
  
  // 英文字符的正则表达式（字母、数字、常见标点符号）
  // Regular expression for English characters (letters, numbers, common punctuation)
  const englishRegex = /[a-zA-Z0-9\s.,!?;:"'()\-]/g;
  const englishMatches = sentence.match(englishRegex);
  const englishCount = englishMatches ? englishMatches.length : 0;
  const totalChars = sentence.length;
  
  // 如果英文字符占比超过 70%，认为是英文句子
  // If English characters account for more than 70%, consider it English sentence
  return totalChars > 0 && (englishCount / totalChars) > 0.7;
}

/**
 * 检测文本是否主要包含中文字符
 * Detect if text mainly contains Chinese characters
 * 
 * @param text - 输入文本 / Input text
 * @returns 是否为中文文本 / Whether it's Chinese text
 */
export function isChineseText(text: string): boolean {
  if (!text) return false;
  
  // 中文字符的 Unicode 范围
  // Unicode range for Chinese characters
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2b820-\u2ceaf]/g;
  const chineseMatches = text.match(chineseRegex);
  const chineseCount = chineseMatches ? chineseMatches.length : 0;
  const totalChars = text.replace(/\s/g, '').length;
  
  // 如果中文字符占比超过 30%，认为是中文文本
  // If Chinese characters account for more than 30%, consider it Chinese text
  return totalChars > 0 && (chineseCount / totalChars) > 0.3;
}