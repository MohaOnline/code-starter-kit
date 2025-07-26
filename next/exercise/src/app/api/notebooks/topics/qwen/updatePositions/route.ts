import { prisma, jsonResponse } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topics } = body;

    // 使用事务更新所有 topics 的位置和层级
    const updates = topics.map((topic: { id: number; pid: number; weight: string }) => 
      prisma.notebooks_topics.update({
        where: { id: Number(topic.id) },
        data: {
          pid: Number(topic.pid),
          weight: topic.weight
        }
      })
    );

    await prisma.$transaction(updates);

    return jsonResponse({ 
      success: true,
      message: 'Topics positions updated successfully'
    });
  } catch (error) {
    console.error('Failed to update topics positions:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to update topics positions' 
    }, 500);
  }
}