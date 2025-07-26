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
 * 使用 Azure TTS 生成中文语音文件
 * Generate Chinese speech file using Azure TTS
 * 
 * @param {string} text - 要转换的文本 / Text to convert
 * @param {string} voiceId - 语音ID / Voice ID
 * @param {number} tid - 类型ID，用于确定存储目录 / Type ID for determining storage directory
 * @returns {Promise<string>} 错误信息（如果有）/ Error message (if any)
 */
async function generateChineseVoice(text, voiceId, tid) {
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

  // 检查文件是否已存在
  // Check if file already exists
  try {
    await fs.access(filePath, fs.constants.F_OK);
    console.log(`语音文件已存在: ${filePath}`);
    console.log(`Voice file already exists: ${filePath}`);
    return ''; // 文件已存在，无需重新生成 / File exists, no need to regenerate
  } catch (error) {
    // 文件不存在，需要生成
    // File doesn't exist, need to generate
    console.log(`正在为文本生成中文语音: ${text}`);
    console.log(`Generating Chinese voice for text: ${text}`);
  }

  try {
    // 创建目录（如果不存在）
    // Create directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    // 生成 SSML
    // Generate SSML
    const ssml = generateSSMLChinese(text);
    console.log('生成的 SSML:', ssml);
    console.log('Generated SSML:', ssml);

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
      return ''; // 成功，返回空字符串 / Success, return empty string
    } else {
      // 生成失败，删除可能创建的文件
      // Generation failed, delete possibly created file
      await fs.unlink(filePath).catch(() => {});
      const errorMsg = `中文语音生成失败: ${result.errorDetails}`;
      console.error(errorMsg);
      console.error(`Chinese TTS failed: ${result.errorDetails}`);
      return errorMsg;
    }
  } catch (error) {
    console.error('生成中文语音时发生错误:', error);
    console.error('Error generating Chinese voice:', error);
    return error.message || '生成语音时发生未知错误';
  }
}

/**
 * POST 请求处理器 - 生成中文语音
 * POST request handler - Generate Chinese voice
 * 
 * 请求体格式 / Request body format:
 * {
 *   "ariaLabel": "要转换的文本",
 *   "voiceId": "语音文件的唯一标识",
 *   "tid": 21
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
    console.log('中文语音生成请求:', data);
    console.log('Chinese voice generation request:', data);

    // 验证必需的参数
    // Validate required parameters
    const { ariaLabel, voiceId, tid } = data;
    
    if (!ariaLabel || typeof ariaLabel !== 'string') {
      return NextResponse.json(
        { success: false, error: 'ariaLabel 参数是必需的且必须是字符串 / ariaLabel parameter is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!voiceId || typeof voiceId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'voiceId 参数是必需的且必须是字符串 / voiceId parameter is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!tid || typeof tid !== 'number') {
      return NextResponse.json(
        { success: false, error: 'tid 参数是必需的且必须是数字 / tid parameter is required and must be a number' },
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

    // 生成语音文件
    // Generate voice file
    const errorMessage = await generateChineseVoice(ariaLabel, voiceId, tid);
    
    if (errorMessage) {
      // 生成失败
      // Generation failed
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    } else {
      // 生成成功
      // Generation successful
      return NextResponse.json(
        { 
          success: true, 
          message: '中文语音生成成功 / Chinese voice generated successfully',
          data: {
            ariaLabel,
            voiceId,
            tid,
            directory: tidToDirectoryMap[tid]
          }
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('处理中文语音生成请求时发生错误:', error);
    console.error('Error processing Chinese voice generation request:', error);
    return NextResponse.json(
      { success: false, error: '服务器内部错误 / Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * GET 请求处理器 - 获取支持的 tid 映射
 * GET request handler - Get supported tid mappings
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: {
        supportedTids: tidToDirectoryMap,
        description: 'tid 到目录的映射表 / Mapping table from tid to directory'
      }
    },
    { status: 200 }
  );
}