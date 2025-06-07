import {PrismaClient} from '@/prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export function handleBigInt(obj: any) {
    return JSON.parse(
        JSON.stringify(obj, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    );
}

import {NextResponse} from 'next/server';

function replacer(_key: string, value: any) {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    if (value === undefined || value === null) {
        return '';
    }
    return value;
}

export function jsonResponse(
    data: any,
    status: number = 200
): NextResponse {
    const safeJson = JSON.stringify(data, replacer);
    return new NextResponse(safeJson, {
        status,
        headers: {'Content-Type': 'application/json'},
    });
}
