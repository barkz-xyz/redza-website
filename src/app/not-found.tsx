import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from './SiteFrame';
import PhoneAlternative from './PhoneAlternative';

export const metadata: Metadata = { title: 'Página no encontrada | Redza' };

export default function NotFound() {
  return <>
    <SiteHeader />
    <main className="section-pad">
      <div className="shell">
        <p className="eyebrow"><span>404</span> Página no encontrada</p>
        <h1 id="contenido" tabIndex={-1}>No encontramos <em>esta página.</em></h1>
        <p className="hero-lede">Revisa la dirección o vuelve a nuestros servicios. Si necesitas cotizar un traslado, puedes contactar a nuestro equipo.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/#servicios">Ver servicios</Link>
          <Link className="text-link" href="/#contacto">Contactar a Redza</Link>
        </div>
        <PhoneAlternative />
      </div>
    </main>
    <SiteFooter />
  </>;
}
