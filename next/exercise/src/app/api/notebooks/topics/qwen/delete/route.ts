import { prisma, jsonResponse } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID is required' 
      }, 400);
    }

    // 验证 id 是否为有效数字
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return jsonResponse({ 
        success: false, 
        error: 'Topic ID must be a valid number' 
      }, 400);
    }

    // 删除 topic 及其子 topics
    await prisma.notebooks_topics.delete({
      where: { id: numericId }
    });

    // 同时删除所有子 topics (pid = id)
    await prisma.notebooks_topics.deleteMany({
      where: { pid: numericId }
    });

    return jsonResponse({ 
      success: true,
      message: 'Topic deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete topic:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to delete topic' 
    }, 500);
  }
}