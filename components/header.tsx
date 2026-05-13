'use client';
import Link from 'next/link';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from './cart-context';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const { count, setOpen } = useCart();
  const { data: session } = useSession() || {};
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', f); f();
    return () => window.removeEventListener('scroll', f);
  }, []);

  const links = [
    { href: '/', label: 'INÍCIO' },
    { href: '/colecao', label: 'COLEÇÃO' },
    { href: '/sobre', label: 'SOBRE' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contato', label: 'CONTATO' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all ${scrolled ? 'backdrop-blur-xl bg-black/70' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-[0.3em] text-white hover:text-[#7A00FF] transition-colors">NOXIS</Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => <Link key={l.href} href={l.href} className="text-xs tracking-[0.2em] text-white/80 hover:text-[#7A00FF] transition-colors">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/conta" className="text-xs tracking-[0.2em] text-white/80 hover:text-[#7A00FF]"><User className="inline w-4 h-4 mr-1"/>{(session.user as any).name?.split(' ')[0]?.toUpperCase() ?? 'CONTA'}</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-xs tracking-[0.2em] text-white/50 hover:text-white">SAIR</button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block text-xs tracking-[0.2em] text-white/80 hover:text-[#7A00FF]">ENTRAR</Link>
          )}
          <button onClick={() => setOpen(true)} className="relative p-2 hover:text-[#7A00FF] transition-colors" aria-label="Carrinho">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && <span className="absolute -top-0 -right-0 bg-[#7A00FF] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{count}</span>}
          </button>
          <button className="md:hidden p-2" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}</button>
        </div>
      </div>
      {menu && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <nav className="flex flex-col p-6 gap-4">
            {links.map(l => <Link key={l.href} href={l.href} onClick={()=>setMenu(false)} className="text-sm tracking-[0.2em] text-white hover:text-[#7A00FF]">{l.label}</Link>)}
            {session?.user ? <>
              <Link href="/conta" onClick={()=>setMenu(false)} className="text-sm tracking-[0.2em] text-white">MINHA CONTA</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-left text-sm tracking-[0.2em] text-white/50">SAIR</button>
            </> : <Link href="/login" onClick={()=>setMenu(false)} className="text-sm tracking-[0.2em] text-white">ENTRAR</Link>}
          </nav>
        </div>
      )}
    </header>
  );
}
