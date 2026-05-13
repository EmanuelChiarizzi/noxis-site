// components/CountdownTimer.tsx
'use client'

import { useEffect, useState } from 'react';

type Props = {
  targetDateIso?: string | null;
  label?: string;
  liveText?: string;
  showSoonIfNoDate?: boolean;
  className?: string;
};

function formatTwo(n: number) {
  return String(Math.max(0, Math.floor(n))).padStart(2, '0');
}

export default function CountdownTimer({
  targetDateIso,
  label = 'Próximo drop',
  liveText = 'Drop ao vivo!',
  showSoonIfNoDate = true,
  className = ''
}: Props) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!targetDateIso) {
    if (showSoonIfNoDate) {
      return (
        <div className={`flex flex-col items-start gap-2 ${className}`}>
          <div className="text-xs tracking-widest text-[#7A00FF]">// PRÓXIMO DROP</div>
          <div className="text-2xl font-black">Em breve...</div>
        </div>
      );
    }
    return null;
  }

  const target = new Date(targetDateIso).getTime();
  const diff = Math.max(0, target - now);

  if (isNaN(target) || target <= 0) {
    return (
      <div className={`flex flex-col items-start gap-2 ${className}`}>
        <div className="text-xs tracking-widest text-[#7A00FF]">// PRÓXIMO DROP</div>
        <div className="text-2xl font-black">Em breve...</div>
      </div>
    );
  }

  if (diff === 0) {
    return (
      <div className={`flex flex-col items-start gap-2 ${className}`}>
        <div className="text-xs tracking-widest text-[#7A00FF]">// PRÓXIMO DROP</div>
        <div className="text-2xl font-black">{liveText}</div>
      </div>
    );
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <div className="text-xs tracking-widest text-[#7A00FF]">// PRÓXIMO DROP</div>
      <div className="flex items-center gap-6">
        <div className="text-2xl font-black">{label}</div>
        <div className="flex items-center gap-2 text-sm">
          {days > 0 && (
            <div className="px-3 py-2 bg-[#0b0b0b] border border-white/5 rounded-md text-center min-w-[64px]">
              <div className="font-black text-lg">{formatTwo(days)}</div>
              <div className="text-xs text-white/60">dias</div>
            </div>
          )}
          <div className="px-3 py-2 bg-[#0b0b0b] border border-white/5 rounded-md text-center min-w-[54px]">
            <div className="font-black text-lg">{formatTwo(hours)}</div>
            <div className="text-xs text-white/60">horas</div>
          </div>
          <div className="px-3 py-2 bg-[#0b0b0b] border border-white/5 rounded-md text-center min-w-[54px]">
            <div className="font-black text-lg">{formatTwo(minutes)}</div>
            <div className="text-xs text-white/60">min</div>
          </div>
          <div className="px-3 py-2 bg-[#0b0b0b] border border-white/5 rounded-md text-center min-w-[54px]">
            <div className="font-black text-lg">{formatTwo(seconds)}</div>
            <div className="text-xs text-white/60">seg</div>
          </div>
        </div>
      </div>
    </div>
  );
}