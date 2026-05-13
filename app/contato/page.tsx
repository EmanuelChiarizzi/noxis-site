'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { MessageCircle, Mail, Instagram } from 'lucide-react';

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }).catch(()=>{});
    toast.success('Mensagem enviada! Em breve entramos em contato.');
    setForm({ name:'', email:'', message:'' });
  };
  return (
    <section className="pt-12 pb-24">
      <div className="max-w-[1000px] mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// CONTATO</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">FALE COM A NOXIS</h1>
          <p className="text-[#a0a0b0] mb-8">Dúvidas, parcerias ou suporte. Estamos aqui.</p>
          <div className="space-y-4">
            <a href="https://wa.me/5585996847307" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#7A00FF]"><MessageCircle className="w-5 h-5 text-[#7A00FF]"/> (85) 99684-7307</a>
            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#7A00FF]"/> usenoxis@gmail.com</div>
            <a href="https://instagram.com/Streetnoxis" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#7A00FF]"><Instagram className="w-5 h-5 text-[#7A00FF]"/> @Streetnoxis</a>
          </div>
        </div>
        <form onSubmit={submit} className="bg-[#0f0f1a] p-6 rounded-sm space-y-4">
          <div><label className="text-xs tracking-[0.3em] text-white/70">NOME</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <div><label className="text-xs tracking-[0.3em] text-white/70">EMAIL</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <div><label className="text-xs tracking-[0.3em] text-white/70">MENSAGEM</label><textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full mt-2 bg-black/40 px-4 py-3 rounded-sm outline-none focus:ring-1 focus:ring-[#7A00FF]"/></div>
          <button className="w-full bg-[#7A00FF] hover:bg-[#9020ff] py-3 text-xs tracking-[0.3em] font-bold rounded-sm">ENVIAR</button>
        </form>
      </div>
    </section>
  );
}
