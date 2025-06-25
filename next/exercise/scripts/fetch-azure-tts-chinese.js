// 加载 .env 文件（仅在独立脚本中需要） ː  ˈ  ˌ
import {config} from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import mysql from 'mysql2/promise';
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig, ResultReason, SpeechSynthesisOutputFormat,
} from 'microsoft-cognitiveservices-speech-sdk';

// 加载 .env.local 文件
config({path: path.resolve(process.cwd(), '.env.local')});

// 配置 Azure TTS
const speechConfig = SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION,
);
speechConfig.speechSynthesisVoiceName = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE;
speechConfig.speechSynthesisLanguage = process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE.slice(
    0, 5);
speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm;

console.log(speechConfig);

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 生成 SSML
function generateSSML(text) {
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE.slice(
      0, 5)}">
      <voice name="${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}">
        ${text}
      </voice>
    </speak>
  `;
}

async function fetchAzureTTSChinese() {
  try {

    // 连接 MySQL 数据库
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 第一步：查询 words_english_chinese 表，为空的 voice_id_translation 设置UUID
    console.log('Step 1: Setting UUID for empty voice_id_translation...');
    const [emptyVoiceRows] = await connection.execute(`
        SELECT id, translation
        FROM words_english_chinese
        WHERE voice_id_translation IS NULL OR voice_id_translation = ''
    `);

    for (let i = 0; i < emptyVoiceRows.length; i++) {
      const row = emptyVoiceRows[i];
      const { id, translation } = row;
      if (translation && translation.trim()) {
        const newUuid = uuidv4();
        await connection.execute(`
            UPDATE words_english_chinese
            SET voice_id_translation = ?
            WHERE id = ?
        `, [newUuid, id]);
        console.log(`Set UUID ${newUuid} for record ID ${id}: ${translation}`);
      }
    }

    // 第二步：查询 words_english_chinese_summary 表，生成中文语音文件
    console.log('Step 2: Generating Chinese TTS files...');
    const [rows] = await connection.execute(`
        SELECT translation, chinese_script, voice_id_translation
        FROM words_english_chinese_summary
        WHERE voice_id_translation IS NOT NULL AND voice_id_translation != ''
        AND translation IS NOT NULL AND translation != ''
    `);

    // 处理每条记录
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const {
        translation,
        chinese_script,
        voice_id_translation,
      } = row;

      const textToSpeak = chinese_script || translation;

      if (!voice_id_translation || !textToSpeak) continue;

      const firstChar = voice_id_translation[0].toLowerCase(); // UUID 第一个字符
      const filePath = path.resolve(
          process.cwd(),
          `./public/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE_CHINESE}/${firstChar}/${voice_id_translation}.wav`,
      );

      // 检查文件是否存在
      try {
        await fs.access(filePath, fs.constants.F_OK);
        console.log(`File already exists for UUID ${voice_id_translation}: ${textToSpeak}`);
      } catch (error) {
        // 文件不存在，生成 TTS
        console.log(`Generating Chinese TTS for UUID ${voice_id_translation}: ${textToSpeak}`);

        // 创建目录（如果不存在）
        const dirPath = path.dirname(filePath);
        await fs.mkdir(dirPath, {recursive: true});

        // 生成 SSML
        const ssml = generateSSML(textToSpeak);
        console.log(ssml);

        await delay(1000);

        // 配置音频输出
        const audioConfig = AudioConfig.fromAudioFileOutput(filePath);
        const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

        // 生成语音
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
              },
          );
        });

        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          console.log(`Chinese TTS generated and saved to ${filePath}`);
        } else {
          await fs.unlink(filePath).catch(() => {});
          console.error(
              `Chinese TTS failed for ${textToSpeak}: ${result.errorDetails}`);
        }
      }
    }

    await connection.end();
    console.log('Azure Chinese TTS processing completed');

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }

}

fetchAzureTTSChinese().then();