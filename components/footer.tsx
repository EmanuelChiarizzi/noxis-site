import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="text-2xl font-black tracking-[0.3em] mb-3">NOXIS</div>
          <p className="text-sm text-[#a0a0b0] max-w-xs">Streetwear cyber tribal. Edições limitadas. Vista o que poucos entendem.</p>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] mb-4 text-white/60">NAVEGAÇÃO</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/colecao" className="hover:text-[#7A00FF]">Coleção</Link></li>
            <li><Link href="/sobre" className="hover:text-[#7A00FF]">Sobre</Link></li>
            <li><Link href="/faq" className="hover:text-[#7A00FF]">FAQ</Link></li>
            <li><Link href="/contato" className="hover:text-[#7A00FF]">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] mb-4 text-white/60">CONECTE-SE</h4>
          <div className="flex gap-3">
            <a target="_blank" rel="noreferrer" href="https://wa.me/5585996847307" className="w-10 h-10 rounded-sm bg-[#0f0f1a] hover:bg-[#7A00FF] flex items-center justify-center transition-colors"><MessageCircle className="w-4 h-4"/></a>
            <a target="_blank" rel="noreferrer" href="https://instagram.com/Streetnoxis" className="w-10 h-10 rounded-sm bg-[#0f0f1a] hover:bg-[#7A00FF] flex items-center justify-center transition-colors"><Instagram className="w-4 h-4"/></a>
            <a target="_blank" rel="noreferrer" href="https://tiktok.com" className="w-10 h-10 rounded-sm bg-[#0f0f1a] hover:bg-[#7A00FF] flex items-center justify-center transition-colors text-xs font-bold">TT</a>
          </div>
          <p className="text-xs text-[#a0a0b0] mt-4">WhatsApp: (85) 99684-7307</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-[#a0a0b0]">© {new Date().getFullYear()} NOXIS — Todos os direitos reservados.</div>
    </footer>
  );
}
