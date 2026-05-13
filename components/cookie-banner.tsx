'use client';
import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem('noxis_cookies')) setShow(true); }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[60] bg-[#0f0f1a] border border-[#7A00FF]/30 p-4 rounded-sm shadow-2xl">
      <p className="text-xs text-[#a0a0b0] mb-3">Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política de privacidade (LGPD).</p>
      <button onClick={() => { localStorage.setItem('noxis_cookies','1'); setShow(false); }} className="text-xs tracking-[0.2em] bg-[#7A00FF] px-4 py-2 rounded-sm hover:bg-[#9020ff]">ACEITAR</button>
    </div>
  );
}
