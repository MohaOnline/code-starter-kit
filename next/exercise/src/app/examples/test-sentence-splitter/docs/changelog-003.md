# Changelog 003 - 属性名称和英文句子格式修正

## 变更概述

**日期：** 2024年12月
**版本：** v1.1.1
**类型：** 问题修正
**关联：** 修正建议 002

## 变更背景

用户反馈了两个需要修正的小问题：
1. **属性名称问题：** `speaker` 属性应该改为 `data-speaker`，保持与其他 data-* 属性的命名一致性
2. **英文句子格式问题：** 英文句子最后应该保留一个半角空格，除非那一句英文是某段的最后一句

## 修正内容

### 1. 属性名称修正

#### 1.1 问题描述
原代码中使用了 `speaker=""` 属性，但按照 HTML 标准和项目规范，应该使用 `data-speaker=""` 格式。

#### 1.2 修正方案
- 将所有生成的 span 标签中的 `speaker=""` 改为 `data-speaker=""`
- 更新测试用例中的示例数据
- 保持与 `data-voice-id` 等其他属性的命名一致性

#### 1.3 影响范围
- `refineParagraphSpans` 函数
- `processUnprocessedParagraph` 函数
- 测试页面的测试用例

### 2. 英文句子空格处理

#### 2.1 问题描述
英文句子之间需要保持适当的空格间隔，但段落最后一句不应该有尾随空格。

#### 2.2 实现方案

**新增函数：**
```typescript
function isEnglishSentence(sentence: string): boolean {
  if (!sentence) return false;
  
  // 英文字符的正则表达式（字母、数字、常见标点符号）
  const englishRegex = /[a-zA-Z0-9\s.,!?;:"'()\-]/g;
  const englishMatches = sentence.match(englishRegex);
  const englishCount = englishMatches ? englishMatches.length : 0;
  const totalChars = sentence.length;
  
  // 如果英文字符占比超过 70%，认为是英文句子
  return totalChars > 0 && (englishCount / totalChars) > 0.7;
}
```

**处理逻辑：**
```typescript
// 为英文句子添加半角空格，除非是段落最后一句
let displayContent = cleanSentence;
if (index < sentences.length - 1 && isEnglishSentence(cleanSentence)) {
  displayContent = cleanSentence + ' ';
}
```

#### 2.3 检测规则
- **英文句子判断：** 基于字符占比，如果英文字符（字母、数字、常见标点）占比超过 70%，认为是英文句子
- **空格添加规则：** 只有非段落最后一句的英文句子才添加半角空格
- **中文句子：** 不添加额外空格，保持原有格式

## 技术实现细节

### 1. 修改的函数

#### 1.1 `refineParagraphSpans` 函数
```typescript
return sentences
  .map((sentence, index) => {
    const cleanSentence = sentence.trim();
    let ariaContent = removePrefix(sentence).trim();
    
    // 为英文句子添加半角空格，除非是段落最后一句
    let displayContent = cleanSentence;
    if (index < sentences.length - 1 && isEnglishSentence(cleanSentence)) {
      displayContent = cleanSentence + ' ';
    }
    
    return `<span aria-label="${ariaContent}" data-speaker="" data-voice-id="">${displayContent}</span>`;
  })
  .join("");
```

#### 1.2 `processUnprocessedParagraph` 函数
```typescript
const spanElements = sentences
  .map((sentence, index) => {
    const cleanSentence = sentence.trim();
    if (!cleanSentence) return "";

    let ariaContent = removePrefix(sentence).trim();
    
    // 为英文句子添加半角空格，除非是段落最后一句
    let displayContent = cleanSentence;
    if (index < sentences.length - 1 && isEnglishSentence(cleanSentence)) {
      displayContent = cleanSentence + ' ';
    }

    return `<span aria-label="${ariaContent}" data-speaker="" data-voice-id="">${displayContent}</span>`;
  })
  .filter(span => span)
  .join("");
```

### 2. 新增的辅助函数

#### 2.1 `isEnglishSentence` 函数
- **功能：** 检测句子是否主要包含英文字符
- **算法：** 基于字符占比统计
- **阈值：** 英文字符占比 > 70% 判定为英文句子
- **支持字符：** 字母、数字、空格、常见标点符号

## 测试验证

### 1. 新增测试用例

#### 1.1 英文句子空格测试
```
输入：'This is the first English sentence. This is the second sentence! Is this the third sentence? This is the final sentence.'

期望输出：
<p>
  <span aria-label="This is the first English sentence." data-speaker="" data-voice-id="">This is the first English sentence. </span>
  <span aria-label="This is the second sentence!" data-speaker="" data-voice-id="">This is the second sentence! </span>
  <span aria-label="Is this the third sentence?" data-speaker="" data-voice-id="">Is this the third sentence? </span>
  <span aria-label="This is the final sentence." data-speaker="" data-voice-id="">This is the final sentence.</span>
</p>
```

#### 1.2 属性名称验证
- 所有生成的 span 标签都使用 `data-speaker=""` 而不是 `speaker=""`
- 与 `data-voice-id` 属性保持命名一致性

### 2. 回归测试

#### 2.1 中文句子处理
- 确保中文句子不受影响
- 保持原有的处理逻辑
- 不添加额外空格

#### 2.2 混合语言处理
- 中英文混合文本正确处理
- 英文句子添加空格，中文句子保持原样
- 段落最后一句无论中英文都不添加尾随空格

## 文件变更详情

### 1. 核心文件修改

#### `src/app/lib/utils.ts`
- **修改函数：** `refineParagraphSpans` - 添加英文句子空格处理和属性名修正
- **修改函数：** `processUnprocessedParagraph` - 添加英文句子空格处理和属性名修正
- **新增函数：** `isEnglishSentence` - 英文句子检测
- **更新注释：** 添加英文句子空格处理说明

#### `src/app/test-sentence-splitter/page.tsx`
- **更新测试用例：** 将 `speaker=""` 改为 `data-speaker=""`
- **新增测试用例：** 英文句子空格测试
- **保持兼容：** 其他功能不受影响

### 2. 文档更新

#### `src/app/test-sentence-splitter/docs/requirements.md`
- **新增章节：** 修正建议 002
- **详细说明：** 属性名称和格式调整需求
- **实现方案：** 技术实现细节

#### `src/app/test-sentence-splitter/docs/changelog-003.md`
- **创建文档：** 本变更日志文件
- **详细记录：** 修正过程和技术细节

## 兼容性保证

### 1. 向后兼容
- **输出格式：** HTML 结构保持不变
- **函数接口：** 输入输出参数不变
- **处理逻辑：** 核心算法保持稳定

### 2. 属性变更影响
- **CSS 选择器：** 如果有使用 `[speaker]` 选择器的代码需要更新为 `[data-speaker]`
- **JavaScript 访问：** 需要使用 `dataset.speaker` 而不是 `getAttribute('speaker')`
- **建议：** 统一使用 data-* 属性访问方式

## 性能影响

### 1. 性能优化
- **英文检测：** 轻量级字符统计，性能影响微小
- **空格处理：** 简单字符串拼接，无性能损耗
- **整体影响：** 可忽略不计

### 2. 内存使用
- **新增函数：** 内存占用极小
- **字符串处理：** 及时释放临时变量
- **总体评估：** 无明显内存增长

## 验收结果

### ✅ 已验证功能

- [x] 属性名称修正：`speaker` → `data-speaker`
- [x] 英文句子空格处理：非最后一句添加空格
- [x] 中文句子保持不变：无额外空格
- [x] 混合语言正确处理：分别应用规则
- [x] 段落最后一句：无尾随空格
- [x] 英文句子检测：准确识别英文内容
- [x] 回归测试通过：原有功能正常

### 📋 测试覆盖

- [x] 纯英文段落测试
- [x] 纯中文段落测试
- [x] 中英文混合测试
- [x] 单句段落测试
- [x] 多句段落测试
- [x] 特殊字符处理测试

## 使用指南

### 1. 基本使用

```typescript
import { preprocessTextWithSentenceSplitter } from '@/app/lib/utils';

// 英文文本处理
const englishText = 'Hello world. How are you? Fine, thank you.';
const result = preprocessTextWithSentenceSplitter(englishText);
// 输出：<p><span ...>Hello world. </span><span ...>How are you? </span><span ...>Fine, thank you.</span></p>

// 中文文本处理
const chineseText = '你好世界。你好吗？我很好。';
const result2 = preprocessTextWithSentenceSplitter(chineseText);
// 输出：<p><span ...>你好世界。</span><span ...>你好吗？</span><span ...>我很好。</span></p>
```

### 2. 属性访问

```javascript
// 推荐的属性访问方式
const spans = document.querySelectorAll('span[data-speaker]');
spans.forEach(span => {
  const speaker = span.dataset.speaker; // 使用 dataset API
  const voiceId = span.dataset.voiceId;
  // 处理逻辑...
});
```

### 3. CSS 样式

```css
/* 推荐的 CSS 选择器 */
span[data-speaker] {
  /* 样式定义 */
}

span[data-voice-id] {
  /* 样式定义 */
}
```

## 后续计划

### 短期优化（1周内）
1. 更多语言的空格处理规则
2. 可配置的英文检测阈值
3. 更多边界情况测试

### 中期扩展（2-4周）
1. 自定义空格处理规则
2. 更智能的语言检测
3. 性能基准测试

### 长期规划（1-3个月）
1. 多语言国际化支持
2. 可视化配置界面
3. 批量处理优化

## 相关链接

- **测试页面：** `/test-sentence-splitter`
- **源码文件：** `src/app/lib/utils.ts`
- **需求文档：** `src/app/test-sentence-splitter/docs/requirements.md`
- **上一版本：** `src/app/test-sentence-splitter/docs/changelog-002.md`
- **初始版本：** `src/app/test-sentence-splitter/docs/changelog-001.md`