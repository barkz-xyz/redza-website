import Image from 'next/image';
import { MapPin } from 'lucide-react';
import SectionNavigation from './SectionNavigation';
import { whatsappLink } from './service-links';

export function SiteHeader({ home = false, quoteUrl = whatsappLink }: { home?: boolean; quoteUrl?: string }) {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <div className="shell nav-wrap">
          <a href={home ? "#inicio" : "/"} className="brand" aria-label="Redza, volver al inicio">
            <Image src="/images/redza branding/white svgs/redza white lettering svg.svg" alt="Redza Transporte y Logística" loading="eager" width={2182} height={350} className="brand-logo brand-logo-new" />
          </a>
          <SectionNavigation home={home} quoteUrl={quoteUrl} />
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ home = false }: { home?: boolean }) {
  const base = home ? '' : '/';
  return (
      <footer className="site-footer"><div className="shell footer-top"><a href={`${base}#inicio`} className="brand footer-brand" aria-label="Redza, volver al inicio"><span className="footer-brand-stage" aria-hidden="true"><Image src="/images/redza branding/white svgs/redza white lettering svg.svg" alt="" width={2182} height={350} className="footer-lettering" /><Image src="/images/redza branding/white svgs/white truck.svg" alt="" width={2183} height={488} className="footer-truck" /></span></a><div className="footer-links"><a href={`${base}#servicios`}>Servicios</a><a href={`${base}#metodo`}>Cómo trabajamos</a><a href={`${base}#clientes`}>Clientes</a><a href={`${base}#cobertura`}>Cobertura</a><a href={`${base}#flota`}>Flota</a><a href={`${base}#contacto`}>Contacto</a></div><div className="footer-location"><MapPin size={16} /> Santiago, Chile</div></div><div className="shell footer-bottom"><span>© 2026 Redza Transporte y Logística</span><span>Movemos lo que importa · Santiago, Chile.</span></div></footer>
  );
}
