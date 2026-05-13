import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Conta() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login?callbackUrl=/conta');
  const userId = (session.user as any).id;
  const orders = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

  return (
    <section className="pt-12 pb-24 min-h-[60vh]">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// MINHA CONTA</div>
        <h1 className="text-4xl font-black tracking-tight mb-2">OLÁ, {session.user.name?.toUpperCase()}</h1>
        <p className="text-[#a0a0b0] mb-10">{session.user.email}</p>

        <h2 className="text-sm tracking-[0.3em] text-white/70 mb-4">HISTÓRICO DE PEDIDOS</h2>
        {orders.length === 0 ? (
          <div className="bg-[#0f0f1a] p-8 rounded-sm text-center text-[#a0a0b0]">Você ainda não tem pedidos.</div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => {
              const items = o.items as any[];
              return (
                <div key={o.id} className="bg-[#0f0f1a] p-5 rounded-sm">
                  <div className="flex justify-between mb-3 text-xs tracking-[0.2em] text-white/60">
                    <span>PEDIDO #{o.id.slice(-8).toUpperCase()}</span>
                    <span>{new Date(o.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    {items?.map?.((i: any, idx: number) => <div key={idx} className="flex justify-between"><span>{i.name} · Tam {i.size} · x{i.quantity}</span><span>R$ {(i.price*i.quantity).toFixed(2)}</span></div>)}
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-white/5">
                    <span className="text-xs uppercase tracking-[0.2em] bg-[#7A00FF]/20 text-[#7A00FF] px-2 py-1 rounded-sm">{o.status}</span>
                    <span className="font-bold text-[#7A00FF]">R$ {o.total.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
