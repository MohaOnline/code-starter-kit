import {NextResponse} from 'next/server';
import {prisma, jsonResponse} from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return jsonResponse({success: false, error: 'Note ID is required'}, 400);
    }

    const note = await prisma.$queryRaw`
        SELECT *
        FROM notebooks_notes_summary
        WHERE id = ${id}
        LIMIT 1
    `;

    if (!note || note.length === 0) {
      return jsonResponse({success: false, error: 'Note not found'}, 404);
    }

    return jsonResponse({success: true, note: note[0]});
  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  }
}

export async function POST(request) {
  const contentType = request.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    return jsonResponse({success: false, error: 'Invalid invoking...'}, 403);
  }

  let result = null;

  try {
    const data = await request.json();
    
    const note = await prisma.$queryRaw`
        SELECT *
        FROM notebooks_notes_summary
        WHERE id = ${id}
        LIMIT 1
    `;

  } catch (error) {
    console.error('Query error:', error);
    return jsonResponse({success: false, error: 'DB Error'}, 500);
  } finally {
    return jsonResponse({success: true, result: result});
  }
}