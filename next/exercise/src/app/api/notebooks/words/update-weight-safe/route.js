import {getServerSession} from 'next-auth/next';
import {NextResponse} from 'next/server';

import mysql from 'mysql2/promise';
import {LexoRank} from 'lexorank';

import {prisma, jsonResponse} from '@/lib/prisma';

import {authOptions} from '@/app/api/auth/[...nextauth]/route';

// Database configuration
// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'your_username',
//   password: process.env.DB_PASSWORD || 'your_password',
//   database: process.env.DB_NAME || 'your_database',
// };

export async function POST(request) {
  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return jsonResponse({success: false, error: 'Invalid invoking...'}, 403);
  }
  let result = null;

  try {
    const session = await getServerSession(authOptions);

    const data = await request.json();

    let sql = `
        SELECT COUNT(id) AS weight
        FROM notebook_words_english_summary
        WHERE id = ${data.word[0].id} AND weight = ${data.word[0].weight}
           OR id = ${data.word[1].id} AND weight = ${data.word[1].weight}
           OR id = ${data.word[2].id} AND weight = ${data.word[2].weight}
    `;

    let rows = await prisma.$queryRaw`
        SELECT MIN(weight) AS weight
        FROM notebook_words_english_summary
        HAVING id = ${data.word.id}
           AND MAX(weight) > ${data.word.weight}
    `;

    console.log(rows);

    const weight = rows[0].weight;

    console.log('note crud:' + JSON.stringify(data.note));
    return jsonResponse({success: true, action: data.action, note: data.note});
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  }

  try {
    const {wordId, targetPosition, referenceWeights} = await request.json();

    if (!wordId || targetPosition === undefined) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters',
      }, {status: 400});
    }

    const connection = await mysql.createConnection(dbConfig);

    let newWeight;

    // Calculate new weight based on position
    if (targetPosition === 'start' && referenceWeights.after) {
      // Insert at the beginning
      const lexoRank = LexoRank.parse(referenceWeights.after);
      newWeight = lexoRank.genPrev().format();
    } else if (targetPosition === 'end' && referenceWeights.before) {
      // Insert at the end
      const lexoRank = LexoRank.parse(referenceWeights.before);
      newWeight = lexoRank.genNext().format();
    } else if (referenceWeights.before && referenceWeights.after) {
      // Insert between two items
      const lexoRank1 = LexoRank.parse(referenceWeights.before);
      const lexoRank2 = LexoRank.parse(referenceWeights.after);
      newWeight = lexoRank1.between(lexoRank2).format();
    } else {
      throw new Error('Invalid position parameters');
    }

    // Update the word's weight in database
    await connection.execute(
        'UPDATE notebook_words_english SET weight = ? WHERE id = ?',
        [newWeight, wordId],
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      newWeight,
    }, {status: 200});

  } catch (error) {
    console.error('Update weight error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  }
}