'use client';
import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  return <Suspense><LoginInner /></Suspense>;
}

function LoginInner() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params?.get('callbackUrl') || '/conta';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) { toast.success('Bem-vindo de volta'); router.replace(callbackUrl); }
    else toast.error('Credenciais inválidas');
  };

  return (
    <section className="min-h-[80vh] flex items-center py-16">
      <div className="max-w-md mx-auto w-full px-6">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// ACESSO</div>
        <h1 className="text-4xl font-black tracking-tight mb-8">ENTRAR</h1>
        <form onSubmit={submit} className="space-y-4 bg-[#0f0f1a] p-8 rounded-sm">
          <div><label className="text-xs tracking-[0.3em] text-white/70">EMAIL</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <div><label className="text-xs tracking-[0.3em] text-white/70">SENHA</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <button disabled={loading} className="w-full bg-[#7A00FF] hover:bg-[#9020ff] py-3 text-xs tracking-[0.3em] font-bold rounded-sm disabled:opacity-50">{loading?'ENTRANDO...':'ENTRAR'}</button>
        </form>
        <p className="text-center text-sm text-[#a0a0b0] mt-6">Não tem conta? <Link href="/registro" className="text-[#7A00FF]">Criar conta</Link></p>
      </div>
    </section>
  );
}
