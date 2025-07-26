import { prisma, jsonResponse } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// 批量更新 topics 的位置和层级关系
// POST /api/notebooks/topics/claude/updatePositions
export async function POST(req: NextRequest) {
  try {
    console.log('🔄 [Claude Topics API] updatePositions request received');
    
    const body = await req.json();
    const { updates } = body;
    
    console.log('📊 [Claude Topics API] Updating positions for', updates?.length, 'topics');
    
    if (!updates || !Array.isArray(updates)) {
      console.warn('⚠️ [Claude Topics API] Updates array is required');
      return jsonResponse({ 
        success: false, 
        error: 'Updates array is required' 
      }, 400);
    }

    // 使用事务批量更新 / Use transaction for batch updates
    const result = await prisma.$transaction(async (tx) => {
      const updatePromises = updates.map((update: any) => {
        const { id, pid, weight } = update;
        
        console.log('🔧 [Claude Topics API] Updating topic:', {
          id,
          pid,
          weight
        });
        
        return tx.notebooks_topics.update({
          where: { id: Number(id) },
          data: {
            pid: pid ? Number(pid) : 0,
            weight: weight || '1000000'
          }
        });
      });
      
      return Promise.all(updatePromises);
    });

    console.log('✅ [Claude Topics API] Positions updated successfully for', result.length, 'topics');

    return jsonResponse({ 
      success: true,
      message: `Updated positions for ${result.length} topics`,
      data: result.length
    });
  } catch (error) {
    console.error('❌ [Claude Topics API] Failed to update positions:', error);
    return jsonResponse({ 
      success: false, 
      error: 'Failed to update positions' 
    }, 500);
  }
}