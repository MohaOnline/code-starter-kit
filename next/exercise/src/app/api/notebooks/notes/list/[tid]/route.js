import {NextResponse} from 'next/server';
import {prisma, jsonResponse} from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { tid } = await params;
    
    // 验证 tid 参数
    if (!tid) {
      return jsonResponse({success: false, error: 'tid parameter is required'}, 400);
    }

    let rows = await prisma.$queryRaw`
        SELECT *
          FROM notebooks_notes_summary
         WHERE tid = ${tid}
      ORDER BY weight ASC
    `;

    console.log(rows);
    return jsonResponse({success: true, notes: rows});
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  }
}