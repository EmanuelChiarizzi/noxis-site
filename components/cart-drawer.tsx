'use client';
import { useCart } from './cart-context';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { items, open, setOpen, total, update, remove, count } = useCart();
  const freteGratis = total >= 199;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]" onClick={()=>setOpen(false)} />
          <motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween', duration:0.3}}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[#0a0a0a] z-[80] flex flex-col border-l border-[#7A00FF]/20">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-sm tracking-[0.3em] font-bold">CARRINHO ({count})</h3>
              <button onClick={()=>setOpen(false)} className="hover:text-[#7A00FF]"><X className="w-5 h-5"/></button>
            </div>
            {freteGratis && <div className="bg-[#7A00FF]/20 text-[#7A00FF] text-xs tracking-[0.2em] py-2 text-center">✨ FRETE GRÁTIS LIBERADO</div>}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
              {items.length === 0 && <p className="text-[#a0a0b0] text-center py-12 text-sm">Seu carrinho está vazio.</p>}
              {items.map(i => (
                <div key={`${i.productId}-${i.size}`} className="flex gap-3 bg-[#0f0f1a] p-3 rounded-sm">
                  <div className="relative w-20 h-24 bg-black/40 flex-shrink-0">
                    <Image src={i.image} alt={i.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-bold tracking-wider">{i.name}</p>
                        <p className="text-xs text-[#a0a0b0]">Tam: {i.size}</p>
                      </div>
                      <button onClick={()=>remove(i.productId, i.size)} className="text-[#a0a0b0] hover:text-red-400"><Trash2 className="w-4 h-4"/></button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-black/40 rounded-sm">
                        <button onClick={()=>update(i.productId,i.size,i.quantity-1)} className="p-1.5 hover:text-[#7A00FF]"><Minus className="w-3 h-3"/></button>
                        <span className="text-xs w-6 text-center">{i.quantity}</span>
                        <button onClick={()=>update(i.productId,i.size,i.quantity+1)} className="p-1.5 hover:text-[#7A00FF]"><Plus className="w-3 h-3"/></button>
                      </div>
                      <p className="text-sm font-bold text-[#7A00FF]">R$ {(i.price*i.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[#a0a0b0]">Subtotal</span><span className="font-bold">R$ {total.toFixed(2)}</span></div>
              <Link href="/checkout" onClick={()=>setOpen(false)} className={`block w-full text-center py-3 text-xs tracking-[0.3em] font-bold rounded-sm transition-all ${items.length===0?'bg-white/10 text-white/30 pointer-events-none':'bg-[#7A00FF] hover:bg-[#9020ff] text-white'}`}>FINALIZAR PEDIDO</Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
