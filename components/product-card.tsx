'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type ProductLite = { id: string; slug: string; name: string; price: number; originalPrice: number | null; backImage: string; frontImage: string; badge: string | null; };

export function ProductCard({ p, i = 0 }: { p: ProductLite; i?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.08, duration: 0.6 }}>
      <Link href={`/produto/${p.slug}`} className="group block bg-[#0f0f1a] rounded-sm overflow-hidden hover:shadow-[0_0_40px_-5px_rgba(122,0,255,0.5)] transition-all duration-500 hover:-translate-y-1">
        <div className="relative aspect-[3/4] bg-black overflow-hidden">
          {p.badge && <span className="absolute top-3 left-3 z-10 bg-[#7A00FF] text-white text-[10px] tracking-[0.2em] px-2 py-1 rounded-sm">{p.badge}</span>}
          <Image src={p.backImage} alt={`${p.name} - costas`} fill className="object-cover transition-opacity duration-700 group-hover:opacity-0" />
          <Image src={p.frontImage} alt={`${p.name} - frente`} fill className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-bold tracking-[0.2em] mb-1">{p.name}</h3>
          <div className="flex items-baseline gap-2">
            {p.originalPrice && <span className="text-xs text-[#a0a0b0] line-through">R$ {p.originalPrice.toFixed(2)}</span>}
            <span className="text-sm font-bold text-[#7A00FF]">R$ {p.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
