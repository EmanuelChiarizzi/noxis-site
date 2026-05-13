'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/components/cart-context';
import { toast } from 'sonner';
import { ShoppingBag, Truck, Shield, Repeat } from 'lucide-react';

const SIZES = ['P','M','G','GG'];

export default function ProductDetail({ product }: { product: any }) {
  const { add, setOpen } = useCart();
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<'back'|'front'>('back');

  const handleAdd = async () => {
    await add({ productId: product.id, slug: product.slug, name: product.name, price: product.price, image: product.backImage, size, quantity: qty });
    toast.success(`${product.name} adicionado ao carrinho`);
    setOpen(true);
  };

  return (
    <section className="pt-12 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-[3/4] bg-[#0f0f1a] rounded-sm overflow-hidden">
            <Image src={view==='back'?product.backImage:product.frontImage} alt={product.name} fill priority className="object-cover"/>
            {product.badge && <span className="absolute top-4 left-4 bg-[#7A00FF] text-[10px] tracking-[0.2em] px-2 py-1 rounded-sm">{product.badge}</span>}
          </div>
          <div className="flex gap-3 mt-3">
            <button onClick={()=>setView('back')} className={`relative aspect-square w-20 rounded-sm overflow-hidden border-2 ${view==='back'?'border-[#7A00FF]':'border-transparent'}`}><Image src={product.backImage} alt="costas" fill className="object-cover"/></button>
            <button onClick={()=>setView('front')} className={`relative aspect-square w-20 rounded-sm overflow-hidden border-2 ${view==='front'?'border-[#7A00FF]':'border-transparent'}`}><Image src={product.frontImage} alt="frente" fill className="object-cover"/></button>
          </div>
        </div>
        <div>
          <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// NOXIS</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            {product.originalPrice && <span className="text-[#a0a0b0] line-through">R$ {product.originalPrice.toFixed(2)}</span>}
            <span className="text-3xl font-bold text-[#7A00FF]">R$ {product.price.toFixed(2)}</span>
          </div>
          <p className="text-[#a0a0b0] mb-8">{product.description}</p>

          <div className="mb-6">
            <div className="text-xs tracking-[0.3em] mb-3 text-white/70">TAMANHO</div>
            <div className="flex gap-2">
              {SIZES.map(s => <button key={s} onClick={()=>setSize(s)} className={`w-12 h-12 text-sm font-bold rounded-sm transition-all ${size===s?'bg-[#7A00FF] text-white':'bg-[#0f0f1a] text-white/70 hover:bg-[#1a1a2a]'}`}>{s}</button>)}
            </div>
          </div>

          <div className="mb-8">
            <div className="text-xs tracking-[0.3em] mb-3 text-white/70">QUANTIDADE</div>
            <div className="inline-flex items-center bg-[#0f0f1a] rounded-sm">
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="px-4 py-3 hover:text-[#7A00FF]">−</button>
              <span className="px-4 font-bold">{qty}</span>
              <button onClick={()=>setQty(qty+1)} className="px-4 py-3 hover:text-[#7A00FF]">+</button>
            </div>
          </div>

          <button onClick={handleAdd} className="w-full bg-[#7A00FF] hover:bg-[#9020ff] py-4 text-xs tracking-[0.3em] font-bold rounded-sm transition-all hover:shadow-[0_0_30px_rgba(122,0,255,0.5)] flex items-center justify-center gap-2"><ShoppingBag className="w-4 h-4"/> ADICIONAR AO CARRINHO</button>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-[#0f0f1a] p-4 rounded-sm text-center"><Truck className="w-5 h-5 text-[#7A00FF] mx-auto mb-2"/><p className="text-[10px] tracking-[0.2em] text-white/70">FRETE GRÁTIS</p><p className="text-[10px] text-[#a0a0b0]">acima R$199</p></div>
            <div className="bg-[#0f0f1a] p-4 rounded-sm text-center"><Shield className="w-5 h-5 text-[#7A00FF] mx-auto mb-2"/><p className="text-[10px] tracking-[0.2em] text-white/70">EDIÇÃO</p><p className="text-[10px] text-[#a0a0b0]">limitada</p></div>
            <div className="bg-[#0f0f1a] p-4 rounded-sm text-center"><Repeat className="w-5 h-5 text-[#7A00FF] mx-auto mb-2"/><p className="text-[10px] tracking-[0.2em] text-white/70">TROCA</p><p className="text-[10px] text-[#a0a0b0]">7 dias</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
