# 批量笔记语音生成脚本 / Batch Notes Voice Generation Script

## 概述 / Overview

`fetch-azure-tts-notes.js` 是一个用于批量生成笔记语音文件的脚本，它从数据库中读取 `notebooks_notes` 表的 `body_script` 字段，提取其中的 span 元素，并使用 Azure TTS 服务为每个 span 生成对应的中文语音文件。

`fetch-azure-tts-notes.js` is a script for batch generating voice files for notes. It reads the `body_script` field from the `notebooks_notes` table in the database, extracts span elements, and uses Azure TTS service to generate corresponding Chinese voice files for each span.

## 功能特性 / Features

### 🎯 核心功能 / Core Features

- **数据库集成**：从 `notebooks_notes` 表读取笔记数据
- **HTML解析**：提取 `body_script` 字段中的 span 元素
- **属性提取**：获取 `aria-label` 和 `data-voice-id` 属性
- **语音生成**：使用 Azure TTS 生成中文语音文件
- **文件管理**：按 tid 和 voiceId 组织音频文件存储
- **重复检测**：跳过已存在的音频文件，避免重复生成
- **批量处理**：支持大量笔记的批量语音生成

### 🔧 技术特性 / Technical Features

- **延迟控制**：每次 Azure TTS 交互间隔 1 秒，避免频率限制
- **错误处理**：完整的错误捕获和报告机制
- **进度跟踪**：详细的处理进度和统计信息
- **类型安全**：TypeScript 兼容的类型定义
- **资源管理**：自动清理数据库连接和音频资源

## 数据结构 / Data Structure

### 数据库表结构 / Database Table Structure

```sql
CREATE TABLE `notebooks_notes` (
  `tid` bigint(20) DEFAULT 0 COMMENT 'Type ID from notebook_types, 笔记类型与条目类型混用',
  `body_script` mediumtext DEFAULT NULL COMMENT 'Body voice (consider in html)',
  -- 其他字段...
);
```

### HTML 结构示例 / HTML Structure Example

```html
<p>
  <span aria-label="在认识任何事物时，都应如此，识百家之长济己。" data-speaker="" data-voice-id="96e78290-9027-4756-86ba-0cdea3fcf827">
    在认识任何事物时，都应如此，识百家之长济己。
  </span>
  <span aria-label="一出一入，方见境界。" data-speaker="" data-voice-id="cb561adc-86e9-47ba-986a-3dd425911e49">
    一出一入，方见境界。
  </span>
</p>
```

### TID 映射表 / TID Mapping Table

| TID | 目录名称 / Directory Name | 描述 / Description |
|-----|---------------------------|--------------------|
| 21  | chinese-compositions      | 中文作文 / Chinese Compositions |
| 22  | chinese-poetry           | 中文诗歌 / Chinese Poetry |
| 23  | chinese-literature       | 中文文学 / Chinese Literature |
| 24  | chinese-essays           | 中文散文 / Chinese Essays |
| 25  | chinese-novels           | 中文小说 / Chinese Novels |

## 文件存储结构 / File Storage Structure

```
public/refs/notes/
├── chinese-compositions/
│   └── zh-CN-XiaoxiaoNeural/
│       ├── 0/
│       │   └── 0xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.wav
│       ├── 1/
│       │   └── 1xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.wav
│       └── ...
├── chinese-poetry/
├── chinese-literature/
├── chinese-essays/
└── chinese-novels/
```

## 环境变量配置 / Environment Variables

```bash
# Azure TTS 配置 / Azure TTS Configuration
SPEECH_KEY=your_azure_speech_key
SPEECH_REGION=your_azure_region
NEXT_PUBLIC_SPEECH_VOICE_CHINESE=zh-CN-XiaoxiaoNeural

# 数据库配置 / Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## 使用方法 / Usage

### 1. 安装依赖 / Install Dependencies

```bash
npm install mysql2 microsoft-cognitiveservices-speech-sdk
```

### 2. 配置环境变量 / Configure Environment Variables

创建 `.env.local` 文件并配置必要的环境变量。

Create `.env.local` file and configure necessary environment variables.

### 3. 运行脚本 / Run Script

```bash
node scripts/fetch-azure-tts-notes.js
```

## 脚本输出示例 / Script Output Example

```
开始批量生成笔记语音文件...
Starting batch generation of note voice files...
数据库连接成功
Database connection successful
找到 150 条包含body_script的笔记
Found 150 notes with body_script

处理第 1/150 条笔记 (tid: 21)
Processing note 1/150 (tid: 21)
找到 5 个语音项目
Found 5 voice items
  处理语音项目 1/5: 96e78290-9027-4756-86ba-0cdea3fcf827
  Processing voice item 1/5: 96e78290-9027-4756-86ba-0cdea3fcf827
  文件已存在，跳过生成: /path/to/file.wav
  File already exists, skipping generation: /path/to/file.wav
  等待1秒后继续...
  Waiting 1 second before continuing...

=== 最终结果 / Final Results ===
处理结果 / Processing result: {
  totalNotes: 150,
  totalVoiceItems: 750,
  success: 680,
  failure: 20,
  skipped: 50,
  successRate: '90.67%'
}
```

## 核心函数说明 / Core Functions

### `extractVoiceItemsFromHTML(htmlContent)`

从 HTML 内容中提取语音项目数据。

Extracts voice item data from HTML content.

**参数 / Parameters:**
- `htmlContent` (string): HTML 内容字符串

**返回值 / Returns:**
- Array: 包含 `{text, voiceId}` 对象的数组

### `generateSingleChineseVoice(text, voiceId, tid)`

生成单个中文语音文件。

Generates a single Chinese voice file.

**参数 / Parameters:**
- `text` (string): 要转换的文本
- `voiceId` (string): 语音文件的唯一标识
- `tid` (number): 类型ID，用于确定存储目录

**返回值 / Returns:**
- Promise: 包含生成结果的对象

### `batchProcessNotesVoices(notes)`

批量处理笔记的语音生成。

Batch processes voice generation for notes.

**参数 / Parameters:**
- `notes` (Array): 笔记数组

**返回值 / Returns:**
- Promise: 包含处理统计信息的对象

## 错误处理 / Error Handling

脚本包含完整的错误处理机制：

The script includes comprehensive error handling:

- **数据库连接错误** / Database connection errors
- **Azure TTS 服务错误** / Azure TTS service errors
- **文件系统错误** / File system errors
- **HTML 解析错误** / HTML parsing errors
- **网络超时错误** / Network timeout errors

## 性能优化 / Performance Optimization

- **文件存在检查**：避免重复生成已存在的音频文件
- **延迟控制**：防止 Azure TTS 频率限制
- **内存管理**：及时清理音频资源和数据库连接
- **批量处理**：高效处理大量数据
- **正则表达式**：使用高效的 HTML 解析方法

## 注意事项 / Notes

1. **Azure TTS 配额**：注意 Azure TTS 服务的使用配额限制
2. **存储空间**：确保有足够的磁盘空间存储音频文件
3. **数据库性能**：大量数据处理时注意数据库性能
4. **网络稳定性**：确保网络连接稳定，避免生成中断
5. **环境变量**：确保所有必要的环境变量都已正确配置

## 相关文件 / Related Files

- `src/app/api/notebooks/notes/voice/chinese/batch/route.js` - 批量语音生成 API
- `scripts/fetch-azure-tts-chinese.js` - 单个语音生成脚本参考
- `src/app/notebooks/editor/components/PreviewArea.tsx` - 前端语音播放组件

## 更新日志 / Changelog

### v1.0.1 (2024-12-20)
- 🐛 **环境变量加载修复**
  - 添加 dotenv 配置加载 `.env.local` 文件
  - 修复 `throwIfNullOrUndefined:subscriptionKey` 错误
  - 参考 `fetch-azure-tts-chinese.js` 的环境变量加载方式
  - 确保 Azure TTS 配置正确初始化

### v1.0.0 (2024-12-20)
- ✅ 初始版本发布
- ✅ 支持从数据库批量读取笔记数据
- ✅ 支持 HTML 解析和 span 元素提取
- ✅ 支持 Azure TTS 中文语音生成
- ✅ 支持文件存在检查和跳过机制
- ✅ 支持详细的进度跟踪和错误报告
- ✅ 支持多种 tid 类型的目录映射