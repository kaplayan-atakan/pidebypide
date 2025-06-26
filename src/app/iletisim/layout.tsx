import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'İletişim - Pide By Pide',
  description: 'Pide By Pide ile iletişime geçin. Görüş ve önerilerinizi bizimle paylaşın.',
  keywords: 'İletişim, Pide By Pide iletişim, müşteri hizmetleri, görüş öneri',
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
    </>
  );
}
