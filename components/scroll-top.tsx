'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 600); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f); }, []);
  if (!show) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 left-6 z-40 w-10 h-10 bg-[#7A00FF] hover:bg-[#9020ff] rounded-sm flex items-center justify-center shadow-lg"><ArrowUp className="w-4 h-4"/></button>;
}
