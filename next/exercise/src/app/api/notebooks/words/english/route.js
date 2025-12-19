import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth'
import {getToken} from 'next-auth/jwt'

import mysql from 'mysql2/promise';
import {LexoRank} from 'lexorank';

import {prisma, jsonResponse} from '@/lib/prisma';
import {authOptions} from '@/app/api/auth/[...nextauth]/route'
import {dbConfig} from '@/app/lib/db.js';

/**  */
export async function GET(request) {
  try {
    // Create database connection
    const connection = await mysql.createConnection(dbConfig);

    // 调试：检查请求头中的 cookies
    const cookies = request.headers.get('cookie')
    console.log('Request cookies:', cookies)

    // 方法1：使用 getServerSession
    const session = await getServerSession(authOptions)
    console.log('session: ', session);
    console.log('session.user: ', session?.user);

    // 方法2：使用 getToken 作为备选方案
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })
    console.log('token: ', token)

    let userId = session?.user?.id || token?.id;
    if (!userId) {
      userId = '6'; // 默认用户ID
      console.log('No user ID found, using default:', userId)
    }
    else {
      console.log('Found user ID:', userId)
    }
    console.log('userId: ', userId);

    const searchParams = request.nextUrl?.searchParams ?? new URL(request.url).searchParams;
    let priority_from = Number(searchParams.get('priority_from') ?? 3);
    let priority_to = Number(searchParams.get('priority_to') ?? 3);


    // Execute the SQL query
    const [rows] = await connection.execute(`
        SELECT *
        FROM notebook_words_english_summary
        WHERE deleted <> true
          AND uid = ${userId}
          AND priority >= ${priority_from}
          AND priority <= ${priority_to}
        ORDER BY weight;
    `);

    // Close the connection
    await connection.end();

    // Return JSON response
    return NextResponse.json({
      success: true,
      data: rows,
    }, {status: 200});

  }
  catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error',
    }, {status: 500});
  }
}

export async function POST(request) {
  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return jsonResponse({success: false, error: 'Invalid invoking...'}, 403);
  }
  let result = null;

  try {
    const session = await getServerSession(authOptions);

    const data = await request.json();

    console.log('weight update:');
    console.dir(data);
    let sql;

    if (data.position === 'top' || data.position === 'bottom') {
      sql = `
          SELECT id
          FROM notebook_words_english_summary
          WHERE id = ${data.words[0].id} AND weight = ${data.words[0].weight}
             OR id = ${data.words[1].id} AND weight = ${data.words[1].weight}
      `;
    } else {
      sql = `
          SELECT id
          FROM notebook_words_english_summary
          WHERE id = ${data.words[0].id} AND weight = ${data.words[0].weight}
             OR id = ${data.words[1].id} AND weight = ${data.words[1].weight}
             OR id = ${data.words[2].id} AND weight = ${data.words[2].weight}
      `;
    }
    return jsonResponse({success: true, wordsNeedUpdate: false}, 200);

    let rows = await prisma.$queryRaw`
        ${sql}
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