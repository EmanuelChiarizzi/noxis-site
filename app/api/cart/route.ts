import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function loadCart(userId: string) {
  const rows = await prisma.cartItem.findMany({ where: { userId }, include: { product: true } });
  return rows.map(r => ({
    productId: r.productId, slug: r.product.slug, name: r.product.name,
    price: r.product.price, image: r.product.backImage, size: r.size, quantity: r.quantity,
  }));
}

export async function GET() {
  const s = await getServerSession(authOptions);
  if (!s?.user) return NextResponse.json({ items: [] });
  return NextResponse.json({ items: await loadCart((s.user as any).id) });
}

export async function PUT(req: Request) {
  const s = await getServerSession(authOptions);
  if (!s?.user) return NextResponse.json({ error: 'unauth' }, { status: 401 });
  const userId = (s.user as any).id;
  const { items } = await req.json();
  await prisma.cartItem.deleteMany({ where: { userId } });
  if (Array.isArray(items) && items.length) {
    await prisma.cartItem.createMany({
      data: items.map((i: any) => ({ userId, productId: i.productId, size: i.size, quantity: i.quantity })),
      skipDuplicates: true,
    });
  }
  return NextResponse.json({ items: await loadCart(userId) });
}
