import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const s = await getServerSession(authOptions);
  if (!s?.user) return NextResponse.json({ error: 'unauth' }, { status: 401 });
  const userId = (s.user as any).id;
  const { items } = await req.json();
  if (!Array.isArray(items)) return NextResponse.json({ ok: true });
  for (const i of items) {
    const existing = await prisma.cartItem.findUnique({ where: { userId_productId_size: { userId, productId: i.productId, size: i.size } } });
    if (existing) await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + i.quantity } });
    else await prisma.cartItem.create({ data: { userId, productId: i.productId, size: i.size, quantity: i.quantity } });
  }
  return NextResponse.json({ ok: true });
}
