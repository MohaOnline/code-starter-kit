import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

export async function GET(request) {
  try {
    const {searchParams} = new URL(request.url);
    const word = searchParams.get('word'); // 获取查询参数 word

    if (!word) {
      return NextResponse.json({
        success: true,
        data: [],
      }, {status: 200});
    }
    const params = [];
    params.push(`${word}%`);

    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    // Execute the SQL query
    const [rows] = await connection.execute(`
        SELECT words_english_chinese_summary.*,
               notebook_words_english.id          as wid,
               notebook_words_english.uid,
               notebook_words_english.notebook_id as nid,
               notebook_words_english.note,
               notebook_words_english.note_explain
        FROM words_english_chinese_summary
                 LEFT JOIN notebook_words_english
                           on words_english_chinese_summary.chinese_id =
                              notebook_words_english.chinese_id
        WHERE word LIKE ?
        ORDER BY id
        ;
    `, params);

    // Close the connection
    await connection.end();

    const processed = [];

    rows.map((row, index) => {
      if (processed.length === 0 ||
          processed[processed.length - 1].eid !== row.id) {
        processed.push({
          eid: row.id,
          word: row.word,
          accent: row.accent,
          script: row.script,
          syllable: row.syllable,
          translations: [
            {
              cid: row.chinese_id,
              pos: row.part_of_speech,
              phonetic_uk: row.phonetic_uk,
              phonetic_us: row.phonetic_us,
              translation: row.translation,
              script: row.chinese_script,
              voice_id_uk: row.voice_id_uk,
              voice_id_us: row.voice_id_us,
              voice_id_translation: row.voice_id_translation,
              noted: !!row.wid,
              note: row.note ? row.note : '',
              note_explain: row.note_explain ? row.note_explain : '',
            },
          ],
        });
      } else {
        processed[processed.length - 1].translations.push({
          cid: row.chinese_id,
          pos: row.part_of_speech,
          phonetic_uk: row.phonetic_uk,
          phonetic_us: row.phonetic_us,
          translation: row.translation,
          script: row.chinese_script,
          voice_id_uk: row.voice_id_uk,
          voice_id_us: row.voice_id_us,
          voice_id_translation: row.voice_id_translation,
          noted: !!row.wid,
          note: row.note ? row.note : '',
          note_explain: row.note_explain ? row.note_explain : '',
        });
      }
    });

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: processed,
    }, {status: 200});

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  }
}

export async function POST(request) {
}