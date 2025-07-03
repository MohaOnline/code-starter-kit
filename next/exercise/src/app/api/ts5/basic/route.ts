import { prisma, jsonResponse } from '@/lib/prisma';

export async function GET(request: Request) {
    const data = await request.json();
    console.log(data);
    return jsonResponse({ success: true, data });
}

export async function POST(request: Request) {
    // 处理POST请求
}

/**
 * 回退处理：处理其他未明确指定的请求
 */
export default async function handler(request: Request) {

}


export async function HEAD(request: Request) {


    // 返回空响应体，仅设置状态码和必要的响应头
    return new Response(null, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}