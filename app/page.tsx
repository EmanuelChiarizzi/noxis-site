import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { CartDrawer } from '@/components/cart-drawer';
import { ScrollTop } from '@/components/scroll-top';
import { ChevronRight } from 'lucide-react';
import { FixedCollection } from '@/components/FixedCollection';
import CountdownTimer from '@/components/CountdownTimer';


export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({ take: 4 });
  console.log('PRODUCTS.length', products.length, 'slugs', products.map((p: any) => p.slug));
  return (
    <>
      <CartDrawer />
      <ScrollTop />

      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center overflow-hidden">
        <Image src="/ArteTopo.png" alt="NOXIS" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 noxis-grid-bg opacity-40" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">
          <div className="max-w-2xl animate-fade-up">
            <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-6">// NOXIS // DROP 01</div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-4">O QUE VOCÊ VESTE NA FRENTE É SILÊNCIO.</h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-10">O QUE VOCÊ CARREGA NAS COSTAS É <span className="text-[#7A00FF] text-glow">PODER</span>.</h2>
            <Link href="/colecao" className="inline-flex items-center gap-2 bg-[#7A00FF] hover:bg-[#9020ff] px-8 py-4 text-xs tracking-[0.3em] font-bold rounded-sm transition-all hover:shadow-[0_0_30px_rgba(122,0,255,0.6)]">EXPLORAR COLEÇÃO <ChevronRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </section>

      {/* COUNTDOWN (container-aligned, hardcoded date) */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <CountdownTimer targetDateIso="2026-06-01T20:00:00Z" label="Próximo drop em" />
      </div>

      {/* COLEÇÃO FIXA (artes) */}
      <FixedCollection />

      {/* SOBRE */}
      <section className="py-32 bg-[#08080d] relative overflow-hidden">
        <div className="absolute inset-0 noxis-grid-bg opacity-30" />
        <div className="max-w-[1000px] mx-auto px-6 relative text-center">
          <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-6">// MANIFESTO</div>
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-white">
            Na frente, <span className="font-bold">identidade</span>. Nas costas, <span className="font-bold">história</span>.<br/>
            <span className="text-[#a0a0b0]">Noxis não é só roupa. É expressão, é atitude, é sobre carregar quem você é.</span>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A00FF]/30 via-black to-black" />
        <div className="absolute inset-0 noxis-grid-bg opacity-30" />
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">VISTA O QUE <span className="text-[#7A00FF]">POUCOS</span> ENTENDEM.</h2>
          <Link href="/colecao" className="inline-block bg-[#7A00FF] hover:bg-[#9020ff] px-10 py-5 text-xs tracking-[0.3em] font-bold rounded-sm transition-all hover:shadow-[0_0_40px_rgba(122,0,255,0.7)]">COMPRAR AGORA</Link>
        </div>
      </section>
    </>
  );
}