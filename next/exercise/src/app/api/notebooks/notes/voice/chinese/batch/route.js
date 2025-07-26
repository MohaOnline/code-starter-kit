import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
  ResultReason,
  SpeechSynthesisOutputFormat,
} from 'microsoft-cognitiveservices-speech-sdk';

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
 * 使用 Azure TTS 生成单个中文语音文件
 * Generate single Chinese speech file using Azure TTS
 * 
 * @param {string} text - 要转换的文本 / Text to convert
 * @param {string} voiceId - 语音ID / Voice ID
 * @param {number} tid - 类型ID，用于确定存储目录 / Type ID for determining storage directory
 * @returns {Promise<{success: boolean, error?: string, filePath?: string}>} 生成结果 / Generation result
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
 * 批量生成中文语音文件
 * Batch generate Chinese speech files
 * 
 * @param {Array} voiceItems - 语音项目数组 / Array of voice items
 * @param {number} tid - 类型ID / Type ID
 * @returns {Promise<{success: boolean, results: Array, summary: Object, errors?: Array}>} 批量生成结果 / Batch generation result
 */
async function batchGenerateChineseVoices(voiceItems, tid) {
  const results = [];
  let successCount = 0;
  let failureCount = 0;
  const errors = [];

  console.log(`开始批量生成 ${voiceItems.length} 个中文语音文件`);
  console.log(`Starting batch generation of ${voiceItems.length} Chinese voice files`);

  // 逐个生成语音文件（避免并发过多导致资源问题）
  // Generate voice files one by one (avoid too many concurrent requests causing resource issues)
  for (let i = 0; i < voiceItems.length; i++) {
    const item = voiceItems[i];
    const { text, voiceId } = item;

    console.log(`正在处理第 ${i + 1}/${voiceItems.length} 个语音: ${voiceId}`);
    console.log(`Processing voice ${i + 1}/${voiceItems.length}: ${voiceId}`);

    try {
      const result = await generateSingleChineseVoice(text, voiceId, tid);
      
      if (result.success) {
        successCount++;
        results.push({
          voiceId,
          text,
          success: true,
          filePath: result.filePath
        });
      } else {
        failureCount++;
        errors.push({ voiceId, text, error: result.error });
        results.push({
          voiceId,
          text,
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      failureCount++;
      const errorMsg = error.message || '未知错误';
      errors.push({ voiceId, text, error: errorMsg });
      results.push({
        voiceId,
        text,
        success: false,
        error: errorMsg
      });
    }

    // 添加短暂延迟，避免请求过于频繁
    // Add brief delay to avoid too frequent requests
    if (i < voiceItems.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  const summary = {
    total: voiceItems.length,
    success: successCount,
    failure: failureCount,
    successRate: voiceItems.length > 0 ? (successCount / voiceItems.length * 100).toFixed(2) + '%' : '0%'
  };

  console.log('批量生成完成:', summary);
  console.log('Batch generation completed:', summary);

  return {
    success: failureCount === 0,
    results,
    summary,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * POST 请求处理器 - 批量生成中文语音
 * POST request handler - Batch generate Chinese voices
 * 
 * 请求体格式 / Request body format:
 * {
 *   "tid": 21,
 *   "voiceItems": [
 *     {
 *       "text": "要转换的文本1",
 *       "voiceId": "语音文件的唯一标识1"
 *     },
 *     {
 *       "text": "要转换的文本2",
 *       "voiceId": "语音文件的唯一标识2"
 *     }
 *   ]
 * }
 */
export async function POST(request) {
  try {
    // 检查 Content-Type
    // Check Content-Type
    const contentType = request.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: '无效的 Content-Type / Invalid Content-Type' },
        { status: 400 }
      );
    }

    // 解析请求体
    // Parse request body
    const data = await request.json();
    console.log('批量中文语音生成请求:', data);
    console.log('Batch Chinese voice generation request:', data);

    // 验证必需的参数
    // Validate required parameters
    const { tid, voiceItems } = data;
    
    if (!tid || typeof tid !== 'number') {
      return NextResponse.json(
        { success: false, error: 'tid 参数是必需的且必须是数字 / tid parameter is required and must be a number' },
        { status: 400 }
      );
    }

    if (!Array.isArray(voiceItems) || voiceItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'voiceItems 参数是必需的且必须是非空数组 / voiceItems parameter is required and must be a non-empty array' },
        { status: 400 }
      );
    }

    // 检查 tid 是否在映射表中
    // Check if tid exists in mapping table
    if (!tidToDirectoryMap[tid]) {
      return NextResponse.json(
        { success: false, error: `不支持的 tid: ${tid} / Unsupported tid: ${tid}` },
        { status: 400 }
      );
    }

    // 验证 voiceItems 数组中的每个项目
    // Validate each item in voiceItems array
    for (let i = 0; i < voiceItems.length; i++) {
      const item = voiceItems[i];
      if (!item.text || typeof item.text !== 'string') {
        return NextResponse.json(
          { success: false, error: `voiceItems[${i}].text 是必需的且必须是字符串 / voiceItems[${i}].text is required and must be a string` },
          { status: 400 }
        );
      }
      if (!item.voiceId || typeof item.voiceId !== 'string') {
        return NextResponse.json(
          { success: false, error: `voiceItems[${i}].voiceId 是必需的且必须是字符串 / voiceItems[${i}].voiceId is required and must be a string` },
          { status: 400 }
        );
      }
    }

    // 检查批量请求的数量限制（防止过大的请求）
    // Check batch request size limit (prevent oversized requests)
    const maxBatchSize = 50; // 最大批量处理数量 / Maximum batch size
    if (voiceItems.length > maxBatchSize) {
      return NextResponse.json(
        { success: false, error: `批量请求数量不能超过 ${maxBatchSize} 个 / Batch request size cannot exceed ${maxBatchSize} items` },
        { status: 400 }
      );
    }

    // 执行批量生成
    // Execute batch generation
    const batchResult = await batchGenerateChineseVoices(voiceItems, tid);
    
    // 根据结果返回相应的状态码
    // Return appropriate status code based on result
    const statusCode = batchResult.success ? 200 : 207; // 207 Multi-Status for partial success
    
    return NextResponse.json(
      { 
        success: batchResult.success,
        message: batchResult.success 
          ? '批量中文语音生成成功 / Batch Chinese voice generation successful'
          : '批量中文语音生成部分成功 / Batch Chinese voice generation partially successful',
        data: {
          tid,
          directory: tidToDirectoryMap[tid],
          summary: batchResult.summary,
          results: batchResult.results,
          errors: batchResult.errors
        }
      },
      { status: statusCode }
    );

  } catch (error) {
    console.error('处理批量中文语音生成请求时发生错误:', error);
    console.error('Error processing batch Chinese voice generation request:', error);
    return NextResponse.json(
      { success: false, error: '服务器内部错误 / Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * GET 请求处理器 - 获取批量生成接口信息
 * GET request handler - Get batch generation API information
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: {
        supportedTids: tidToDirectoryMap,
        maxBatchSize: 50,
        description: '批量中文语音生成接口 / Batch Chinese voice generation API',
        usage: {
          endpoint: '/api/notebooks/notes/voice/chinese/batch',
          method: 'POST',
          requestBody: {
            tid: 'number (required) - 类型ID / Type ID',
            voiceItems: 'array (required) - 语音项目数组 / Array of voice items',
            'voiceItems[].text': 'string (required) - 要转换的文本 / Text to convert',
            'voiceItems[].voiceId': 'string (required) - 语音文件的唯一标识 / Unique identifier for voice file'
          }
        }
      }
    },
    { status: 200 }
  );
}