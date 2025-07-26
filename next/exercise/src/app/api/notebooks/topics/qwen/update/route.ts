import { prisma, jsonResponse } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, note } = body;

    if (!id) {
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID is required' 
      }, 400);
    }

    // 验证 id 是否可以转换为有效的数字
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID must be a valid number' 
      }, 400);
    }

    const updatedTopic = await prisma.notebooks_topics.update({
      where: { id: numericId },
      data: {
        title,
        note
      }
    });

    return jsonResponse({ 
      success: true, 
      data: updatedTopic 
    });
  } catch (error) {
    console.error('Failed to update topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to update topic' 
    }, 500);
  }
}