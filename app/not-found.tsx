import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// 404</div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4">PERDIDO NO <span className="text-[#7A00FF]">VOID</span></h1>
        <p className="text-[#a0a0b0] mb-8">Esta página não existe. Mas o drop continua.</p>
        <Link href="/" className="inline-block bg-[#7A00FF] hover:bg-[#9020ff] px-8 py-4 text-xs tracking-[0.3em] font-bold rounded-sm">VOLTAR AO INÍCIO</Link>
      </div>
    </section>
  );
}
