import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CookieBanner } from '@/components/cookie-banner';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700','800','900'], variable: '--font-sans' });

export const metadata = {
  title: 'NOXIS — Vista o que poucos entendem',
  description: 'NOXIS streetwear oversize. Edição limitada cyber tribal. Frente: identidade. Costas: poder.',
  openGraph: { title: 'NOXIS', description: 'Streetwear cyber tribal. Edição limitada.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <Script src="https://apps.abacus.ai/chatllm/appllm-lib.js" strategy="afterInteractive" />
      </head>
      <body className={`${inter.variable} font-sans bg-[#050505] text-white min-h-screen`}>
        <Providers>
          <div className="bg-[#7A00FF] text-white text-center text-xs tracking-[0.2em] py-2 font-medium uppercase">
            Frete grátis para todo o Brasil acima de R$199
          </div>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#0f0f1a', color: '#fff', border: '1px solid #7A00FF' } }} />
        </Providers>
      </body>
    </html>
  );
}
