import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import React from 'react';

export const dynamic = 'force-dynamic';

async function getOrdersForUser(userId: string) {
  // Cast 'any' na options para evitar erro de tipos gerados pelo Prisma no CI
  const orders = await prisma.order.findMany(
    {
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    } as any
  );

  return orders as any[];
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Minha conta</h1>
        <p className="mt-4">Você precisa entrar para ver seus pedidos.</p>
      </main>
    );
  }

  const userId = (session.user as any).id;
  const orders = await getOrdersForUser(userId);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Meus Pedidos</h1>

      {orders.length === 0 ? (
        <div className="mt-6 text-gray-400">Nenhum pedido encontrado.</div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o: any) => {
            const items = (o.items as any[]) || [];

            return (
              <div key={o.id} className="bg-[#0f0f1a] p-5 rounded-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-400">Pedido #{o.id}</div>
                    <div className="text-xs text-gray-500">
                      {o.createdAt ? new Date(o.createdAt).toLocaleString() : '—'}
                    </div>
                  </div>
                  <div className="text-sm font-medium">{o.status ?? '—'}</div>
                </div>

                <div className="mt-3 space-y-2">
                  {items.map((it: any, idx: number) => (
                    <div key={`${it.productId ?? idx}-${it.size ?? ''}`} className="flex items-center gap-3">
                      <img
                        src={it.image ?? '/placeholder-front.svg'}
                        alt={it.name ?? 'produto'}
                        className="w-12 h-12 object-cover rounded-sm"
                      />
                      <div>
                        <div className="text-sm">{it.name ?? 'Produto'}</div>
                        <div className="text-xs text-gray-500">Tamanho: {it.size ?? '—'}</div>
                      </div>
                      <div className="ml-auto text-sm">
                        {(typeof it.price === 'number' ? it.price : 0).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}