import {NextResponse} from 'next/server';
import mysql from 'mysql2/promise';

import {getServerSession} from 'next-auth'
import {getToken} from 'next-auth/jwt'
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