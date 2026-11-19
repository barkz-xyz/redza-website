import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { SiteFooter, SiteHeader } from '../../SiteFrame';
import PhoneAlternative from '../../PhoneAlternative';
import { refrigeratedPath, refrigeratedQuote } from '../../service-links';
import { siteUrl } from '../../site-url';
import styles from '../service.module.css';

const title = 'Transporte refrigerado para empresas en Chile | Redza';
const description = 'Cotiza el traslado de carga refrigerada en camiones frigoríficos Redza. Cuéntanos qué producto mueves, a qué temperatura debe viajar y dónde se entrega.';
const photo = '/images/redza_fotos/optimized/redza-equipo-frigorifico.webp';
const alt = 'Equipo de refrigeración sobre la cabina de un camión de la flota Redza';
const url = siteUrl + refrigeratedPath;

export const metadata: Metadata = {
  title, description, alternates: { canonical: refrigeratedPath },
  openGraph: { title, description, url, type: 'website', locale: 'es_CL', siteName: 'Redza Transporte y Logística',
    images: [{ url: photo, width: 444, height: 220, alt }] },
  twitter: { card: 'summary_large_image', title, description, images: [photo] },
};

const service = {
  '@context': 'https://schema.org', '@type': 'Service', '@id': url + '#servicio',
  name: 'Transporte refrigerado para empresas', serviceType: 'Transporte de carga refrigerada',
  url, description, image: siteUrl + photo,
  provider: { '@id': siteUrl + '/#redza' }, areaServed: { '@type': 'Country', name: 'Chile' },
};

export default function RefrigeratedService() {
  return <>
    <SiteHeader quoteUrl={refrigeratedQuote} />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <section className={styles.hero} aria-labelledby="contenido">
        <div className={`shell ${styles.grid}`}>
          <div>
            <Link href="/#flota" className="text-link"><ArrowLeft size={16} aria-hidden="true" /> Volver a Flota</Link>
            <p className={`eyebrow ${styles.index}`}>Servicios / Camiones frigoríficos</p>
            <h1 id="contenido" tabIndex={-1}>Transporte <em>refrigerado</em> para empresas</h1>
            <p className="hero-lede">¿A qué temperatura debe viajar tu carga? Contamos con camiones frigoríficos. Antes de confirmar el retiro, revisamos contigo el producto, la temperatura que necesita y la ruta de entrega.</p>
            <a href={refrigeratedQuote} data-umami-event="whatsapp-refrigerated-quote" className="button button-primary" target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Cotizar transporte refrigerado</a>
            <PhoneAlternative />
          </div>
          <figure className={styles.figure}>
            <Image className={styles.equipment} src={photo} alt={alt} width={444} height={220} sizes="(max-width: 900px) 100vw, 36vw" loading="eager" fetchPriority="high" />
            <figcaption>Flota Redza / Equipo de refrigeración</figcaption>
          </figure>
        </div>
      </section>
      <section className={`shell section-pad ${styles.grid}`} aria-labelledby="cotizar">
        <div>
          <p className="eyebrow">Coordinación / Antes del retiro</p>
          <h2 id="cotizar">Qué necesitamos<br />para <em>cotizar.</em></h2>
          <p className="hero-lede">Envíanos estos datos por WhatsApp. Con ellos revisamos qué camión se ajusta a tu carga y si está disponible para la fecha que necesitas.</p>
        </div>
        <div>
          <ol className="steps">
            <li><b aria-hidden="true">01</b><div><h3>Producto y temperatura</h3><p>Indica qué vas a transportar y a qué temperatura o dentro de qué rango debe mantenerse durante el trayecto.</p></div></li>
            <li><b aria-hidden="true">02</b><div><h3>Volumen y peso</h3><p>Cuéntanos cómo viene embalada la carga, cuántos bultos o pallets son y cuáles son sus medidas y peso aproximados.</p></div></li>
            <li><b aria-hidden="true">03</b><div><h3>Ruta y horarios</h3><p>Comparte las comunas de retiro y entrega, la fecha del despacho y el horario en que pueden recibir el camión.</p></div></li>
          </ol>
          <a href={refrigeratedQuote} data-umami-event="whatsapp-refrigerated-quote" className="text-link" target="_blank" rel="noreferrer">Cotizar transporte refrigerado <MessageCircle size={16} aria-hidden="true" /></a>
          <PhoneAlternative />
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
