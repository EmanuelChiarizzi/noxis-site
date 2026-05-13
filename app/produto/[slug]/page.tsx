import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CartDrawer } from '@/components/cart-drawer';
import ProductDetail from './product-detail';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { slug: string } }) {
  const p = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!p) notFound();
  return (<><CartDrawer /><ProductDetail product={{ id: p.id, slug: p.slug, name: p.name, price: p.price, originalPrice: p.originalPrice, description: p.description, backImage: p.backImage, frontImage: p.frontImage, badge: p.badge }} /></>);
}
