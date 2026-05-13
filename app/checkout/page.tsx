'use client';
import { useCart } from '@/components/cart-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const userName = (session?.user as any)?.name || name;

  const handleCheckout = async () => {
    if (status !== 'authenticated') { toast.error('Faça login para continuar'); router.push('/login?callbackUrl=/checkout'); return; }
    if (!userName.trim()) { toast.error('Informe seu nome'); return; }
    if (items.length === 0) { toast.error('Carrinho vazio'); return; }
    setLoading(true);
    try {
      await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, total }) });
      const itensTxt = items.map(i => `• ${i.name} (Tam ${i.size}) x${i.quantity} — R$ ${(i.price*i.quantity).toFixed(2)}`).join('\n');
      const msg = `Olá! Meu nome é ${userName}. Quero fazer um pedido da NOXIS:\n\n${itensTxt}\nTotal: R$ ${total.toFixed(2)}\nDrop: DROP 01\n\nAguardo confirmação!`;
      const wa = (n: string) => `https://wa.me/55${n}?text=${encodeURIComponent(msg)}`;
      await clear();
      window.open(wa('85996847307'), '_blank');
      setTimeout(() => router.push('/conta'), 800);
    } catch { toast.error('Erro. Tente o WhatsApp alternativo.'); } finally { setLoading(false); }
  };

  return (
    <section className="pt-12 pb-24 min-h-[60vh]">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// CHECKOUT</div>
        <h1 className="text-4xl font-black tracking-tight mb-8">FINALIZAR PEDIDO</h1>

        {items.length === 0 ? (
          <div className="bg-[#0f0f1a] p-8 rounded-sm text-center">
            <p className="text-[#a0a0b0] mb-4">Seu carrinho está vazio.</p>
            <Link href="/colecao" className="inline-block bg-[#7A00FF] px-6 py-3 text-xs tracking-[0.3em]">EXPLORAR COLEÇÃO</Link>
          </div>
        ) : (
          <>
            <div className="bg-[#0f0f1a] rounded-sm p-6 mb-6 space-y-3">
              {items.map(i => (
                <div key={`${i.productId}-${i.size}`} className="flex justify-between text-sm">
                  <span>{i.name} · Tam {i.size} · x{i.quantity}</span>
                  <span className="font-bold">R$ {(i.price*i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-white/5 pt-3 flex justify-between font-bold">
                <span>Total</span><span className="text-[#7A00FF]">R$ {total.toFixed(2)}</span>
              </div>
              {total >= 199 && <div className="text-[#7A00FF] text-xs tracking-[0.2em]">✨ FRETE GRÁTIS LIBERADO</div>}
            </div>

            {status === 'authenticated' ? (
              <div className="bg-[#0f0f1a] p-6 rounded-sm mb-6">
                <label className="text-xs tracking-[0.3em] text-white/70">SEU NOME</label>
                <input value={userName} onChange={e=>setName(e.target.value)} className="w-full bg-black/40 mt-2 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]" placeholder="Nome completo"/>
              </div>
            ) : (
              <div className="bg-[#0f0f1a] p-6 rounded-sm mb-6 text-center">
                <p className="text-[#a0a0b0] mb-4">Você precisa estar logado para finalizar o pedido.</p>
                <Link href="/login?callbackUrl=/checkout" className="inline-block bg-[#7A00FF] px-6 py-3 text-xs tracking-[0.3em]">ENTRAR / CADASTRAR</Link>
              </div>
            )}

            <button onClick={handleCheckout} disabled={loading || status !== 'authenticated'} className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-40 py-4 text-xs tracking-[0.3em] font-bold rounded-sm flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4"/>{loading?'PROCESSANDO...':'FINALIZAR NO WHATSAPP'}
            </button>
            <p className="text-[10px] text-center text-[#a0a0b0] mt-3">Caso não funcione, contato alternativo: (85) 98436-0656</p>
          </>
        )}
      </div>
    </section>
  );
}
