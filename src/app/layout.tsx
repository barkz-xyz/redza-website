import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { siteUrl } from './site-url';
import { umamiConfig } from '../umami';

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
  icons: { icon: '/images/redza branding/black svgs/black truck svg.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const analytics = umamiConfig(process.env);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#redza`,
    name: 'Redza Transporte y Logística',
    url: siteUrl,
    image: `${siteUrl}/images/redza%20branding/black%20svgs/full%20logo%20redza%20black%20svg.svg`,
    telephone: '+56 9 8788 5833',
    address: { '@type': 'PostalAddress', addressLocality: 'Santiago', addressRegion: 'Región Metropolitana', addressCountry: 'CL' },
    areaServed: [{ '@type': 'Country', name: 'Chile' }, { '@type': 'City', name: 'Santiago' }],
    openingHours: 'Mo-Su 00:00-23:59',
  };
  return (
    <html lang="es-CL" className={`${manrope.variable} ${dmMono.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head>
      <body>
        {children}
        {analytics && <script defer fetchPriority="low" src="/stats/script.js"
          data-website-id={analytics.id} data-host-url="/stats" data-domains={analytics.hostname}
          data-exclude-search="true" data-exclude-hash="true" />}
      </body>
    </html>
  );
}
