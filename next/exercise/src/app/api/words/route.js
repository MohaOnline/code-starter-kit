import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
};

export async function GET() {
  try {
    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    const session = await getServerSession(authOptions)
    let userId = session?.user?.id;
    if (!userId) {
      userId = '6';
    }

    // Execute the SQL query
    const [rows] = await connection.execute(`
        SELECT words_english.id,
               words_english_chinese.id as chinese_id,
               words_english.word,
               words_english.accent,
               words_english.syllable,
               words_english.script,
               words_english_chinese.part_of_speech,
               words_english_chinese.phonetic_uk,
               words_english_chinese.voice_id_uk,
               words_english_chinese.phonetic_us,
               words_english_chinese.voice_id_us,
               words_english_chinese.translation
        FROM words_english_chinese
                 LEFT JOIN words_english
                           ON words_english_chinese.english_id = words_english.id
        ORDER BY words_english.created AND words_english_chinese.weight
    `);

    // Close the connection
    await connection.end();

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: rows,
    }, {status: 200});

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  }
}