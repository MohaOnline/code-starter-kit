import {use} from 'react';
import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';
import {v4 as uuid} from 'uuid';
import {LexoRank} from 'lexorank';
import path from 'path';
import fs from 'fs/promises';
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig, ResultReason, SpeechSynthesisOutputFormat,
} from 'microsoft-cognitiveservices-speech-sdk';

// 配置 Azure TTS
const speechConfig = SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION,
);
speechConfig.speechSynthesisVoiceName = process.env.SPEECH_VOICE;
speechConfig.speechSynthesisLanguage = process.env.SPEECH_VOICE.slice(
    0, 5);
speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm;

function generateSSML(word, phonetic_us, phonetic_uk) {
  const phonetic = phonetic_us || phonetic_uk || ''; // 优先使用 phonetic_us，否则用 phonetic_uk
  const textToSpeak = word; // word 或 script 已在上层处理
  return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${process.env.SPEECH_VOICE.slice(
      0, 5)}">
      <voice name="${process.env.SPEECH_VOICE}">
        ${phonetic
      ? `<phoneme alphabet="ipa" ph="${phonetic}">${textToSpeak}</phoneme>`
      : textToSpeak}
      </voice>
    </speak>
  `;
}

async function fetchAzureTTS(
    word, script, voice_id_us, phonetic_us, phonetic_uk) {

  const textToSpeak = script || word; // 优先使用 script，否则用 word

  const firstChar = voice_id_us[0].toLowerCase(); // UUID 第一个字符
  const filePath = path.resolve(
      process.cwd(),
      `./public/refs/voices/${process.env.NEXT_PUBLIC_SPEECH_VOICE}/${firstChar}/${voice_id_us}.wav`,
  );

  // 检查文件是否存在
  try {
    await fs.unlink(filePath).catch(() => {});

    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    // 文件不存在，生成 TTS
    console.log(`Generating TTS for UUID ${voice_id_us}: ${textToSpeak}`);

    // 创建目录（如果不存在）
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, {recursive: true});

    // 生成 SSML
    const ssml = generateSSML(textToSpeak, phonetic_us, phonetic_uk);
    console.log(ssml);

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
      console.log(`TTS generated and saved to ${filePath}`);
    } else {
      await fs.unlink(filePath).catch(() => {});
      console.error(
          `TTS failed for ${textToSpeak}: ${result.errorDetails}`);
      return result.errorDetails;
    }
  }

  return '';
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

/** 打开编辑对话框时查询 */
export async function GET(request) {

  let connection;
  const {searchParams} = await new URL(request.url);
  const cid = searchParams.get('cid');

  if (!cid) {
    return NextResponse.json({
      success: false,
      data: [],
    }, {status: 200});
  }

  try {

    // Create database connection
    connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    // 单纯查词接口，是否在笔记本里进攻参考。
    const [
      rows] = await connection.execute(`
        SELECT word, script, voice_id_uk, phonetic_us, phonetic_uk
        FROM words_english_chinese_summary
        WHERE words_english_chinese_summary.chinese_id = ?
        ;
    `, [cid]);
    console.log(rows);

    const result = await fetchAzureTTS(rows[0].word, rows[0].script,
        rows[0].voice_id_uk, rows[0].phonetic_us,
        rows[0].phonetic_uk);

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: result,
    }, {status: 200});

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  } finally {

    // Close the connection
    await connection.end();
  }
}
