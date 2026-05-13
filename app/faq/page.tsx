'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'Quais tamanhos estão disponíveis?', a: 'Trabalhamos com P, M, G e GG. Todas as peças são oversize streetwear.' },
  { q: 'Quanto tempo leva para entregar?', a: 'O prazo varia de 5 a 12 dias úteis dependendo da região. Frete grátis para todo o Brasil em compras acima de R$199.' },
  { q: 'Como funciona a troca?', a: 'Você tem 7 dias após o recebimento para solicitar troca por tamanho. Entre em contato pelo WhatsApp.' },
  { q: 'As peças são realmente edição limitada?', a: 'Sim. Cada drop tem quantidade limitada e não será reposto.' },
  { q: 'Como finalizo o pedido?', a: 'Adicione ao carrinho, faça login e finalize. Você será redirecionado para o WhatsApp para pagamento e confirmação.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(0);
  return (
    <section className="pt-12 pb-24">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// DÚVIDAS</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-10">FAQ</h1>
        <div className="space-y-2">
          {FAQS.map((f,i) => (
            <div key={i} className="bg-[#0f0f1a] rounded-sm overflow-hidden">
              <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between items-center text-left p-5 hover:bg-[#161624]">
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open===i?'rotate-180 text-[#7A00FF]':''}`}/>
              </button>
              {open===i && <div className="px-5 pb-5 text-[#a0a0b0] text-sm">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
