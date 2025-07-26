// 加载 .env 文件（仅在独立脚本中需要）
// Load .env file (only needed in standalone scripts)
import {config} from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import fs from 'fs/promises';
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
  ResultReason,
  SpeechSynthesisOutputFormat,
} from 'microsoft-cognitiveservices-speech-sdk';
// import { JSDOM } from 'jsdom'; // 注释掉，使用内置的DOMParser替代
// Use built-in DOMParser instead of jsdom for better compatibility

// 加载 .env.local 文件
// Load .env.local file
config({path: path.resolve(process.cwd(), '.env.local')});

// 配置 Azure TTS 中文语音
// Configure Azure TTS Chinese voice
const speechConfig = SpeechConfig.fromSubscription(
  process.env.SPEECH_KEY,
  process.env.SPEECH_REGION,
);
speechConfig.speechSynthesisVoiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE;
speechConfig.speechSynthesisLanguage = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE.slice(0, 5);
speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm;

/**
 * tid 到目录路径的映射表
 * Mapping table from tid to directory path
 */
const tidToDirectoryMap = {
  21: 'chinese-compositions',
  22: 'chinese-poetry',
  23: 'chinese-literature',
  24: 'chinese-essays',
  25: 'chinese-novels',
  // 可以根据需要添加更多映射
  // Add more mappings as needed
};

/**
 * 生成中文语音的 SSML
 * Generate SSML for Chinese speech
 * 
 * @param {string} text - 要转换为语音的文本 / Text to convert to speech
 * @returns {string} SSML 字符串 / SSML string
 */
function generateSSMLChinese(text) {
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE.slice(0, 5)}">
      <voice name="${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}">
        ${text}
      </voice>
    </speak>
  `;
}

/**
 * 延迟函数
 * Delay function
 * 
 * @param {number} ms - 延迟毫秒数 / Delay in milliseconds
 * @returns {Promise} Promise对象 / Promise object
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 从HTML内容中提取span元素的语音数据
 * Extract voice data from span elements in HTML content
 * 
 * @param {string} htmlContent - HTML内容 / HTML content
 * @returns {Array} 语音项目数组 / Array of voice items
 */
function extractVoiceItemsFromHTML(htmlContent) {
  if (!htmlContent) return [];
  
  const voiceItems = [];
  
  // 使用正则表达式提取span元素的aria-label和data-voice-id
  // Use regex to extract aria-label and data-voice-id from span elements
  const spanRegex = /<span[^>]*aria-label="([^"]*?)"[^>]*data-voice-id="([^"]*?)"[^>]*>/g;
  let match;
  
  while ((match = spanRegex.exec(htmlContent)) !== null) {
    const ariaLabel = match[1];
    const voiceId = match[2];
    
    if (ariaLabel && voiceId) {
      voiceItems.push({
        text: ariaLabel,
        voiceId: voiceId
      });
    }
  }
  
  // 也检查data-voice-id在aria-label之前的情况
  // Also check cases where data-voice-id comes before aria-label
  const spanRegex2 = /<span[^>]*data-voice-id="([^"]*?)"[^>]*aria-label="([^"]*?)"[^>]*>/g;
  while ((match = spanRegex2.exec(htmlContent)) !== null) {
    const voiceId = match[1];
    const ariaLabel = match[2];
    
    if (ariaLabel && voiceId) {
      // 检查是否已经添加过这个voiceId
      // Check if this voiceId has already been added
      const exists = voiceItems.some(item => item.voiceId === voiceId);
      if (!exists) {
        voiceItems.push({
          text: ariaLabel,
          voiceId: voiceId
        });
      }
    }
  }
  
  return voiceItems;
}

/**
 * 使用 Azure TTS 生成单个中文语音文件
 * Generate single Chinese speech file using Azure TTS
 * 
 * @param {string} text - 要转换的文本 / Text to convert
 * @param {string} voiceId - 语音ID / Voice ID
 * @param {number} tid - 类型ID，用于确定存储目录 / Type ID for determining storage directory
 * @returns {Promise<{success: boolean, error?: string, filePath?: string, skipped?: boolean}>} 生成结果 / Generation result
 */
async function generateSingleChineseVoice(text, voiceId, tid) {
  // 根据 tid 获取目录名
  // Get directory name based on tid
  const directoryName = tidToDirectoryMap[tid] || 'default';
  
  // 获取 voiceId 的第一个字符用于子目录
  // Get first character of voiceId for subdirectory
  const firstChar = voiceId[0].toLowerCase();
  
  // 构建文件路径
  // Build file path
  const filePath = path.resolve(
    process.cwd(),
    `./public/refs/notes/${directoryName}/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstChar}/${voiceId}.wav`
  );

  console.log(`正在为文本生成中文语音: ${text}`);
  console.log(`Generating Chinese voice for text: ${text}`);
  console.log(`目标文件路径: ${filePath}`);
  console.log(`Target file path: ${filePath}`);

  try {
    // 检查文件是否已存在
    // Check if file already exists
    try {
      await fs.access(filePath, fs.constants.F_OK);
      console.log(`文件已存在，跳过生成: ${filePath}`);
      console.log(`File already exists, skipping generation: ${filePath}`);
      return { success: true, filePath, skipped: true };
    } catch (error) {
      // 文件不存在，继续生成
      // File doesn't exist, continue with generation
    }

    // 创建目录（如果不存在）
    // Create directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    // 生成 SSML
    // Generate SSML
    const ssml = generateSSMLChinese(text);

    // 配置音频输出
    // Configure audio output
    const audioConfig = AudioConfig.fromAudioFileOutput(filePath);
    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

    // 生成语音
    // Generate speech
    const result = await new Promise((resolve, reject) => {
      synthesizer.speakSsmlAsync(
        ssml,
        (result) => {
          synthesizer.close();
          resolve(result);
        },
        (error) => {
          synthesizer.close();
          reject(error);
        }
      );
    });

    if (result.reason === ResultReason.SynthesizingAudioCompleted) {
      console.log(`中文语音生成成功并保存到: ${filePath}`);
      console.log(`Chinese TTS generated and saved to: ${filePath}`);
      return { success: true, filePath };
    } else {
      // 生成失败，删除可能创建的文件
      // Generation failed, delete possibly created file
      await fs.unlink(filePath).catch(() => {});
      const errorMsg = `中文语音生成失败: ${result.errorDetails}`;
      console.error(errorMsg);
      console.error(`Chinese TTS failed: ${result.errorDetails}`);
      return { success: false, error: errorMsg };
    }
  } catch (error) {
    console.error('生成中文语音时发生错误:', error);
    console.error('Error generating Chinese voice:', error);
    return { success: false, error: error.message || '生成语音时发生未知错误' };
  }
}

/**
 * 批量处理笔记的语音生成
 * Batch process voice generation for notes
 * 
 * @param {Array} notes - 笔记数组 / Array of notes
 * @returns {Promise<Object>} 处理结果 / Processing result
 */
async function batchProcessNotesVoices(notes) {
  let totalVoiceItems = 0;
  let successCount = 0;
  let failureCount = 0;
  let skippedCount = 0;
  const errors = [];

  console.log(`开始批量处理 ${notes.length} 条笔记的语音生成`);
  console.log(`Starting batch voice generation for ${notes.length} notes`);

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const { tid, body_script } = note;

    console.log(`\n处理第 ${i + 1}/${notes.length} 条笔记 (tid: ${tid})`);
    console.log(`Processing note ${i + 1}/${notes.length} (tid: ${tid})`);

    if (!body_script) {
      console.log('跳过：body_script 为空');
      console.log('Skipping: body_script is empty');
      continue;
    }

    // 从HTML中提取语音项目
    // Extract voice items from HTML
    const voiceItems = extractVoiceItemsFromHTML(body_script);
    
    if (voiceItems.length === 0) {
      console.log('跳过：未找到语音项目');
      console.log('Skipping: no voice items found');
      continue;
    }

    console.log(`找到 ${voiceItems.length} 个语音项目`);
    console.log(`Found ${voiceItems.length} voice items`);
    totalVoiceItems += voiceItems.length;

    // 逐个生成语音文件
    // Generate voice files one by one
    for (let j = 0; j < voiceItems.length; j++) {
      const item = voiceItems[j];
      const { text, voiceId } = item;

      console.log(`  处理语音项目 ${j + 1}/${voiceItems.length}: ${voiceId}`);
      console.log(`  Processing voice item ${j + 1}/${voiceItems.length}: ${voiceId}`);

      try {
        const result = await generateSingleChineseVoice(text, voiceId, tid);
        
        if (result.success) {
          if (result.skipped) {
            skippedCount++;
          } else {
            successCount++;
          }
        } else {
          failureCount++;
          errors.push({ 
            noteIndex: i + 1, 
            voiceId, 
            text, 
            error: result.error 
          });
        }
      } catch (error) {
        failureCount++;
        const errorMsg = error.message || '未知错误';
        errors.push({ 
          noteIndex: i + 1, 
          voiceId, 
          text, 
          error: errorMsg 
        });
      }

      // 添加1秒延迟，避免请求过于频繁
      // Add 1 second delay to avoid too frequent requests
      if (j < voiceItems.length - 1 || i < notes.length - 1) {
        console.log('  等待1秒后继续...');
        console.log('  Waiting 1 second before continuing...');
        await delay(1000);
      }
    }
  }

  const summary = {
    totalNotes: notes.length,
    totalVoiceItems,
    success: successCount,
    failure: failureCount,
    skipped: skippedCount,
    successRate: totalVoiceItems > 0 ? (successCount / totalVoiceItems * 100).toFixed(2) + '%' : '0%'
  };

  console.log('\n批量处理完成:', summary);
  console.log('Batch processing completed:', summary);

  return {
    success: failureCount === 0,
    summary,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * 主函数
 * Main function
 */
async function main() {
  let connection;
  
  try {
    console.log('开始批量生成笔记语音文件...');
    console.log('Starting batch generation of note voice files...');

    // 创建数据库连接
    // Create database connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      charset: 'utf8mb4'
    });

    console.log('数据库连接成功');
    console.log('Database connection successful');

    // 查询所有包含body_script的笔记
    // Query all notes with body_script
    const [rows] = await connection.execute(
      'SELECT tid, body_script FROM notebooks_notes WHERE body_script IS NOT NULL AND body_script != "" ORDER BY tid'
    );

    // 确保rows是数组类型
    // Ensure rows is an array type
    const notesArray = Array.isArray(rows) ? rows : [];

    console.log(`找到 ${notesArray.length} 条包含body_script的笔记`);
    console.log(`Found ${notesArray.length} notes with body_script`);

    if (notesArray.length === 0) {
      console.log('没有找到需要处理的笔记');
      console.log('No notes found to process');
      return;
    }

    // 批量处理语音生成
    // Batch process voice generation
    const result = await batchProcessNotesVoices(notesArray);
    
    console.log('\n=== 最终结果 / Final Results ===');
    console.log('处理结果 / Processing result:', result.summary);
    
    if (result.errors && result.errors.length > 0) {
      console.log('\n错误详情 / Error details:');
      result.errors.forEach((error, index) => {
        console.log(`${index + 1}. 笔记 ${error.noteIndex}, 语音ID: ${error.voiceId}, 错误: ${error.error}`);
      });
    }

  } catch (error) {
    console.error('脚本执行失败:', error);
    console.error('Script execution failed:', error);
  } finally {
    // 关闭数据库连接
    // Close database connection
    if (connection) {
      await connection.end();
      console.log('数据库连接已关闭');
      console.log('Database connection closed');
    }
  }
}

// 运行主函数
// Run main function
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main, batchProcessNotesVoices, extractVoiceItemsFromHTML };