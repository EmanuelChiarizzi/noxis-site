// components/FixedCollection.tsx
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import ProductsCarousel from './ProductsCarousel';
const FIXED_PRODUCTS: any[] = [
  { id: 'fixed-arte-1', slug: 'fallen-emblem',  name: 'Fallen Emblem',  price: 99.99, originalPrice: null, description: 'Arte fixa — preta 1', frontImage: '/Frente.png', backImage: '/Arte1Preto.png', badge: 'ARTE FIXA' },
  { id: 'fixed-arte-2', slug: 'crowned-skull',  name: 'Crowned Skull',  price: 99.99, originalPrice: null, description: 'Arte fixa — preta 2', frontImage: '/Frente.png', backImage: '/Arte2Preto.png', badge: 'ARTE FIXA' },
  { id: 'fixed-arte-3', slug: 'thorns-heart',   name: 'Thorns Heart',   price: 99.99, originalPrice: null, description: 'Arte fixa — preta 3', frontImage: '/Frente.png', backImage: '/Arte3Preto.webp', badge: 'ARTE FIXA' },
  { id: 'fixed-arte-4', slug: 'sacred-cross',   name: 'Sacred Cross',   price: 99.99, originalPrice: null, description: 'Arte fixa — preta 4', frontImage: '/Frente.png', backImage: '/Arte4Preto.png', badge: 'ARTE FIXA' },

  // novos 2 cards
  { id: 'fixed-arte-5', slug: 'dark-arcanum',         name: 'Dark Arcanum',         price: 99.99, originalPrice: null, description: 'Arte fixa — preta 5', frontImage: '/Frente.png', backImage: '/Arte5Preto.webp', badge: 'ARTE FIXA' },
  { id: 'fixed-arte-6', slug: 'cyber-spike',         name: 'Cyber Spike',         price: 99.99, originalPrice: null, description: 'Arte fixa — preta 6', frontImage: '/Frente.png', backImage: '/Arte6Preto.png', badge: 'ARTE FIXA' },
];

export function FixedCollection() {
  const products = FIXED_PRODUCTS.map((p) => ({
    ...p,
    originalPrice: p.originalPrice ?? null,
    frontImage: p.frontImage?.startsWith('/') ? p.frontImage : `/${p.frontImage}`,
    backImage: p.backImage?.startsWith('/') ? p.backImage : `/${p.backImage}`,
  }));

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// COLEÇÃO FIXA</div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">PEÇAS FIXAS</h2>
          </div>
          <Link href="/colecao" className="hidden md:inline-flex items-center gap-1 text-xs tracking-[0.3em] text-white/70 hover:text-[#7A00FF]">
            VER TUDO
          </Link>
        </div>

        <ProductsCarousel products={products} />
        
      </div>
    </section>
  );
}