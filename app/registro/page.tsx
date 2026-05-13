'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
    if (!res.ok) { const j = await res.json(); toast.error(j.error || 'Erro'); setLoading(false); return; }
    const r = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (r?.ok) { toast.success('Conta criada!'); router.replace('/conta'); }
  };

  return (
    <section className="min-h-[80vh] flex items-center py-16">
      <div className="max-w-md mx-auto w-full px-6">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// CADASTRO</div>
        <h1 className="text-4xl font-black tracking-tight mb-8">CRIAR CONTA</h1>
        <form onSubmit={submit} className="space-y-4 bg-[#0f0f1a] p-8 rounded-sm">
          <div><label className="text-xs tracking-[0.3em] text-white/70">NOME</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <div><label className="text-xs tracking-[0.3em] text-white/70">EMAIL</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <div><label className="text-xs tracking-[0.3em] text-white/70">SENHA</label><input required type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <button disabled={loading} className="w-full bg-[#7A00FF] hover:bg-[#9020ff] py-3 text-xs tracking-[0.3em] font-bold rounded-sm disabled:opacity-50">{loading?'CRIANDO...':'CRIAR CONTA'}</button>
        </form>
        <p className="text-center text-sm text-[#a0a0b0] mt-6">Já tem conta? <Link href="/login" className="text-[#7A00FF]">Entrar</Link></p>
      </div>
    </section>
  );
}
