import { FixedCollection } from '@/components/FixedCollection';
import { CartDrawer } from '@/components/cart-drawer';

export const dynamic = 'force-dynamic';

export default async function Colecao() {
  return (
    <>
      <CartDrawer />

      <section className="pt-20 pb-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// COLEÇÃO</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">PEÇAS FIXAS</h1>
          <p className="text-[#a0a0b0] mb-12 max-w-xl">Nossa seleção fixa — disponíveis agora.</p>
        </div>

        {/* FixedCollection renderiza os cards centrados */}
        <div className="max-w-[1200px] mx-auto px-6">
          <FixedCollection />
        </div>
      </section>
    </>
  );
}