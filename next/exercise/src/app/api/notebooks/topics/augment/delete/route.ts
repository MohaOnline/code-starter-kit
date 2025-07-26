import { prisma, jsonResponse } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// 删除 topic
// POST /api/notebooks/topics/augment/delete
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

    // 检查是否有子 topics
    const childTopics = await prisma.notebooks_topics.findMany({
      where: { pid: BigInt(id) }
    });

    if (childTopics.length > 0) {
      return jsonResponse({
        success: false,
        error: 'Cannot delete topic with child topics. Please delete child topics first.'
      }, 400);
    }

    // 删除 topic
    await prisma.notebooks_topics.delete({
      where: { id: BigInt(id) }
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
