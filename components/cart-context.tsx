'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  add: (i: CartItem) => Promise<void>;
  remove: (productId: string, size: string) => Promise<void>;
  update: (productId: string, size: string, qty: number) => Promise<void>;
  clear: () => Promise<void>;
  total: number;
  count: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const LS = 'noxis_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession() || {};
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const isAuth = status === 'authenticated';

  // initial load
  useEffect(() => {
    if (status === 'loading') return;
    (async () => {
      let local: CartItem[] = [];
      try { local = JSON.parse(localStorage.getItem(LS) ?? '[]'); } catch {}
      if (isAuth) {
        try {
          if (local.length > 0) {
            await fetch('/api/cart/merge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: local }) });
            localStorage.removeItem(LS);
          }
          const res = await fetch('/api/cart');
          const data = await res.json();
          setItems(data.items ?? []);
        } catch { setItems(local); }
      } else {
        setItems(local);
      }
      setHydrated(true);
    })();
  }, [status, isAuth]);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuth) localStorage.setItem(LS, JSON.stringify(items));
  }, [items, hydrated, isAuth]);

  const persist = useCallback(async (next: CartItem[]) => {
    setItems(next);
    if (isAuth) {
      try { await fetch('/api/cart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: next }) }); } catch {}
    }
  }, [isAuth]);

  const add: CartCtx['add'] = async (i) => {
    const next = [...items];
    const idx = next.findIndex(x => x.productId === i.productId && x.size === i.size);
    if (idx >= 0) next[idx] = { ...next[idx], quantity: next[idx].quantity + i.quantity };
    else next.push(i);
    await persist(next);
  };
  const remove: CartCtx['remove'] = async (pid, size) => persist(items.filter(x => !(x.productId === pid && x.size === size)));
  const update: CartCtx['update'] = async (pid, size, qty) => {
    if (qty <= 0) return remove(pid, size);
    persist(items.map(x => x.productId === pid && x.size === size ? { ...x, quantity: qty } : x));
  };
  const clear = async () => persist([]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return <Ctx.Provider value={{ items, add, remove, update, clear, total, count, open, setOpen }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart outside provider');
  return c;
};
