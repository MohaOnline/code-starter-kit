/*

npm add prisma @prisma/client
npm install @prisma/client
npx prisma init
npx prisma db pull
npx prisma generate    需要 next 转换 commonJS 格式，next.config.mjs： transpilePackages: ['@prisma/client', 'prisma'],

*/

import { NextResponse } from 'next/server';
import { prisma, jsonResponse } from '@/lib/prisma';

export async function GET() {
  try {
    let rows = await prisma.$queryRaw`
        SELECT *
        FROM notebooks_types
    `;

    console.log(rows);
    return jsonResponse({ success: true, types: rows });
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({ success: false, error: 'DB Error' }, 500);
  }
}
