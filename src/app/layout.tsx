import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { siteUrl } from './site-url';

const manrope = localFont({
  src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  weight: '200 800',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const dmMono = localFont({
  src: [
    { path: '../../node_modules/@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../../node_modules/@fontsource/dm-mono/files/dm-mono-latin-500-normal.woff2', weight: '500' },
  ],
  variable: '--font-dm-mono',
  adjustFontFallback: false,
  preload: false,
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Redza | Transporte de carga y logística en Chile',
  description: 'Transporte de carga, distribución nacional y logística B2B en Chile. Coordinamos cada recorrido con atención directa y operación confiable.',
  keywords: ['transporte de carga en Chile', 'logística nacional', 'distribución B2B', 'transporte Santiago regiones', 'camiones con rampa hidráulica', 'Redza'],
  alternates: { canonical: '/' },
  icons: { icon: '/images/redza branding/black svgs/black truck svg.svg' },
  openGraph: { title: 'Redza | Transporte de carga y logística en Chile', description: 'Tu carga no se detiene. Transporte y distribución nacional con Redza.', url: siteUrl, siteName: 'Redza Transporte y Logística', locale: 'es_CL', type: 'website', images: [{ url: '/images/redza_fotos/optimized/redza-flota-camiones-operacion.webp', alt: 'Flota Redza en un centro de distribución' }] },
  twitter: { card: 'summary_large_image', title: 'Redza | Transporte de carga y logística en Chile', description: 'Transporte y distribución nacional con Redza.', images: ['/images/redza_fotos/optimized/redza-flota-camiones-operacion.webp'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Redza Transporte y Logística',
    url: siteUrl,
    image: `${siteUrl}/images/redza%20branding/black%20svgs/full%20logo%20redza%20black%20svg.svg`,
    telephone: '+56 9 8788 5833',
    address: { '@type': 'PostalAddress', addressLocality: 'Santiago', addressRegion: 'Región Metropolitana', addressCountry: 'CL' },
    areaServed: [{ '@type': 'Country', name: 'Chile' }, { '@type': 'City', name: 'Santiago' }],
    serviceType: ['Transporte de carga', 'Distribución nacional', 'Logística B2B', 'Transporte con rampa hidráulica'],
    openingHours: 'Mo-Su 00:00-23:59',
  };
  return (
    <html lang="es-CL" className={`${manrope.variable} ${dmMono.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body>{children}</body>
    </html>
  );
}
