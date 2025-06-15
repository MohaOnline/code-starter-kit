import { prisma, jsonResponse } from '@/lib/prisma';

export async function POST(request) {

  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return jsonResponse({ success: false, error: 'Invalid invoking...' }, 403);
  }

  let result = null;

  try {

    const data = await request.json();
    if (data?.action === 'update') {

      await prisma.$transaction(async (tx) => {
        result = await tx.$executeRaw`UPDATE notebooks_notes SET title = ${data.note.title}, body = ${data.note.body} WHERE id = ${data.note.id}`;
        console.log(result);
        // 可以继续用 tx 处理更多逻辑
      });
    } else if (data?.action === 'add') {
      
      result = await prisma.$executeRaw`INSERT INTO notebooks_notes (title, body) VALUES (${data.note.title}, ${data.note.body})`;
      console.log(result);
    }

    console.log('note updated:' + JSON.stringify(data.note));
    return jsonResponse({ success: true, note: data.note });
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({ success: false, error: 'DB Error' }, 500);
  }
}
