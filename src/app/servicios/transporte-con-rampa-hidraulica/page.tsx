import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { SiteFooter, SiteHeader } from '../../SiteFrame';
import PhoneAlternative from '../../PhoneAlternative';
import { rampPath, rampQuote } from '../../service-links';
import { siteUrl } from '../../site-url';
import styles from './ramp.module.css';

const name = 'Transporte de carga con rampa hidráulica';
const title = 'Transporte con rampa hidráulica para empresas en Chile | Redza';
const description = '¿Tu punto de entrega no tiene andén? Cotiza transporte de carga con rampa hidráulica. Indícanos la ruta, el peso y el acceso para evaluar la descarga.';
const photo = '/images/redza_fotos/optimized/redza-manipulacion-carga-traspaleta.webp';
const url = siteUrl + rampPath;
export const metadata: Metadata = {
  title, description, alternates: { canonical: rampPath },
  openGraph: { title, description, url, type: 'website', locale: 'es_CL', siteName: 'Redza Transporte y Logística',
    images: [{ url: photo, width: 720, height: 975, alt: 'Carga paletizada en un camión Redza' }] },
  twitter: { card: 'summary_large_image', title, description, images: [photo] },
};
const service = {
  '@context': 'https://schema.org', '@type': 'Service', '@id': url + '#servicio',
  name, url, description, serviceType: 'Transporte con rampa hidráulica', image: siteUrl + photo,
  provider: { '@id': siteUrl + '/#redza' }, areaServed: { '@type': 'Country', name: 'Chile' },
};

export default function RampService() {
  return <>
    <SiteHeader quoteUrl={rampQuote} />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <section className={styles.hero} aria-labelledby="contenido">
        <div className={`shell ${styles.grid}`}>
          <div>
            <Link href="/#servicios" className="text-link"><ArrowLeft size={16} aria-hidden="true" /> Volver a servicios</Link>
            <p className={`eyebrow ${styles.index}`}><span>03</span> Servicios / Carga con rampa</p>
            <h1 id="contenido" tabIndex={-1}>Transporte de carga con <em>rampa hidráulica</em></h1>
            <p className="hero-lede">¿Recibes mercadería en un local o una bodega sin andén? La plataforma del camión permite bajar la carga hasta el nivel del suelo. Coordinamos el transporte y revisamos contigo las condiciones de descarga antes del retiro.</p>
            <a data-umami-event="whatsapp-ramp-quote" href={rampQuote} className="button button-primary" target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Cotizar transporte con rampa</a>
            <PhoneAlternative />
          </div>
          <figure className={styles.figure}>
            <Image src={photo} width={720} height={975} sizes="(max-width: 900px) 100vw, 36vw"
              loading="eager" fetchPriority="high" alt="Carga paletizada y transpaleta dentro de un camión Redza" />
            <figcaption>Operación Redza / Preparación de carga</figcaption>
          </figure>
        </div>
      </section>
      <section className={`shell section-pad ${styles.grid}`} aria-labelledby="cotizar">
        <div><p className="eyebrow">Coordinación / Antes del retiro</p>
          <h2 id="cotizar">Qué necesitamos<br />para <em>cotizar.</em></h2>
          <p className="hero-lede">Para una entrega de pallets sin andén, el peso no es el único dato: también importa dónde puede detenerse el camión. Con esta información evaluamos si la rampa es adecuada para tu entrega.</p>
        </div>
        <div>
          <ol className="steps">
            <li><b aria-hidden="true">01</b><div><h3>Origen, destino y fecha</h3><p>Indica las comunas de retiro y entrega, la fecha y el horario en que pueden recibir la carga.</p></div></li>
            <li><b aria-hidden="true">02</b><div><h3>Peso y dimensiones</h3><p>Cuéntanos qué transportas, cuántos bultos o pallets son y cuánto pesa y mide cada uno.</p></div></li>
            <li><b aria-hidden="true">03</b><div><h3>Acceso para la descarga</h3><p>¿La recepción es en patio o a nivel de calle? Avísanos si hay pendientes, desniveles o restricciones de estacionamiento.</p></div></li>
          </ol>
          <a className="text-link" data-umami-event="whatsapp-ramp-quote" href={rampQuote} target="_blank" rel="noreferrer">Enviar los datos por WhatsApp <MessageCircle size={16} aria-hidden="true" /></a>
          <PhoneAlternative />
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
