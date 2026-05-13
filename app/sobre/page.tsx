import Image from 'next/image';

export default function Sobre() {
  return (
    <section className="pt-12 pb-24">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-xs tracking-[0.4em] text-[#7A00FF] mb-3">// SOBRE</div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-12">A NOXIS</h1>
        <div className="relative aspect-[21/9] mb-12 rounded-sm overflow-hidden"><Image src="/ArteTopo.png" alt="NOXIS" fill className="object-cover"/></div>
        <div className="prose prose-invert max-w-none space-y-6 text-[#a0a0b0] text-lg leading-relaxed">
          <p><span className="text-white">Na frente, identidade. Nas costas, história.</span></p>
          <p>Noxis não é só roupa. É expressão, é atitude, é sobre carregar quem você é. Nascemos do underground, da estética cyber tribal, da convicção de que cada peça deve significar algo.</p>
          <p>Cada drop é uma edição limitada. Cada estampa, uma narrativa. Quando você veste Noxis, você não segue tendência — você afirma um código.</p>
          <p className="text-2xl text-white font-bold pt-6">Vista o que poucos entendem.</p>
        </div>
      </div>
    </section>
  );
}
