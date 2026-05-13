// components/ProductsCarousel.tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

type Props = { products: any[] };

function LeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function RightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function ProductsCarousel({ products }: Props) {
  const sc = useRef<HTMLDivElement | null>(null);

  function scroll(dir: 'left' | 'right') {
    if (!sc.current) return;
    const container = sc.current;
    const visible = container.clientWidth;
    const amount = Math.round(visible * 0.85);

    // debug log — ver no console do browser
    console.log('ProductsCarousel: scroll', dir, 'amount', amount, 'scrollLeftBefore', container.scrollLeft);

    // smooth scroll calculation
    const target = dir === 'right' ? container.scrollLeft + amount : container.scrollLeft - amount;

    // try scrollTo with smooth behavior (works in modern browsers)
    try {
      container.scrollTo({ left: target, behavior: 'smooth' });
    } catch (err) {
      // fallback
      container.scrollLeft = target;
    }

    // log after (não garante final position — é só indicativo)
    setTimeout(() => console.log('ProductsCarousel: scrollLeftAfter', container.scrollLeft), 300);
  }

  return (
    <div className="relative overflow-visible">
      {/* Left button */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); scroll('left'); }}
          aria-label="Anterior"
          className="w-11 h-11 flex items-center justify-center p-2 bg-black/50 hover:bg-black/60 text-white rounded-full shadow-lg backdrop-blur-sm ml-[-8px]"
          style={{ pointerEvents: 'auto' }}
        >
          <LeftIcon />
        </button>
      </div>

      {/* Right button */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); scroll('right'); }}
          aria-label="Próximo"
          className="w-11 h-11 flex items-center justify-center p-2 bg-black/50 hover:bg-black/60 text-white rounded-full shadow-lg backdrop-blur-sm mr-[-8px]"
          style={{ pointerEvents: 'auto' }}
        >
          <RightIcon />
        </button>
      </div>

      {/* scroll container */}
      <div
        ref={sc}
        className="products-scroll flex gap-6 overflow-x-auto scroll-smooth py-4 px-6 md:px-12 touch-pan-x snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {products.map((p: any, i: number) => (
          <div key={p.id} className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0 snap-start">
            <Link href={`/produto/${p.slug}`} className="block">
              <ProductCard p={p} i={i} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}