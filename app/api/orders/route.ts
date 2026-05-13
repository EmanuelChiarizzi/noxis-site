import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const s = await getServerSession(authOptions);
  if (!s?.user) return NextResponse.json({ error: 'unauth' }, { status: 401 });
  const { items, total } = await req.json();
  const order = await prisma.order.create({ data: { userId: (s.user as any).id, items, total } });
  await prisma.cartItem.deleteMany({ where: { userId: (s.user as any).id } });
  return NextResponse.json({ id: order.id });
}

export async function GET() {
  const s = await getServerSession(authOptions);
  if (!s?.user) return NextResponse.json({ orders: [] });
  const orders = await prisma.order.findMany({ where: { userId: (s.user as any).id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ orders });
}
