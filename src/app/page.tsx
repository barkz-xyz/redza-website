import Image from 'next/image';
import BrandStrip from './BrandStrip';
import type { Metadata } from 'next';
import { siteUrl } from './site-url';
import ChileRegionsMap from './ChileRegionsMap';
import HeroVideo from './HeroVideo';
import FleetSection from './FleetSection';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from './SiteFrame';
import { quoteLink, rampPath, whatsappLink } from './service-links';
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,

  MessageCircle,
  Package,
  PhoneCall,
  Route,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Redza | Transporte de carga y logística en Chile',
  description: 'Transporte de carga y distribución para empresas en Chile. Redza coordina tus despachos con seguimiento de entregas en Logitrack y reportes digitales.',
  keywords: ['transporte de carga en Chile', 'logística nacional', 'distribución B2B', 'transporte Santiago regiones', 'camiones con rampa hidráulica', 'Redza'],
  alternates: { canonical: '/' },
  openGraph: { title: 'Redza | Transporte de carga y logística en Chile', description: 'Tu carga no se detiene. Transporte y distribución nacional con Redza.', url: siteUrl, siteName: 'Redza Transporte y Logística', locale: 'es_CL', type: 'website', images: [{ url: '/images/redza_fotos/optimized/redza-flota-camiones-operacion.webp', alt: 'Flota Redza en un centro de distribución' }] },
  twitter: { card: 'summary_large_image', title: 'Redza | Transporte de carga y logística en Chile', description: 'Transporte y distribución nacional con Redza.', images: ['/images/redza_fotos/optimized/redza-flota-camiones-operacion.webp'] },
  robots: { index: true, follow: true },
};

const services = [
  {
    number: '01',
    title: 'Distribución nacional',
    text: 'Movemos tu carga entre Santiago y regiones con coordinación, trazabilidad y ventanas de entrega claras.',
    icon: Route,
  },
  {
    number: '02',
    title: 'Última milla B2B',
    text: 'Reparto para retail, supermercados y operaciones corporativas que necesitan puntualidad en cada local.',
    icon: Package,
  },
  {
    number: '03',
    title: 'Carga con rampa',
    text: 'Camiones con rampas hidráulicas autónomas para entregar donde no hay andén de descarga.',
    icon: Truck,
  },
];

const clients = [
  {
    number: '01',
    name: 'Alvi Mayorista',
    src: '/images/marcas que confian/alvi.webp',
    alt: 'Logo Club Alvi Mayorista',
    service: 'Distribución y abastecimiento',
  },
  {
    number: '02',
    name: 'Unimarc',
    src: '/images/marcas que confian/unimarc.webp',
    alt: 'Logo Unimarc',
    service: 'Transporte para retail',
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader home />

      <main>
      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="hero-route-system" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> Logística que llega</p>
            <h1 id="contenido" tabIndex={-1}>Que tu carga<br /><em>no se detenga.</em></h1>
            <p className="hero-lede">Transporte confiable para empresas que necesitan cumplir. Conectamos tu operación con todo Chile, desde el retiro hasta la entrega final.</p>
            <div className="hero-actions">
              <a className="button button-primary" data-umami-event="whatsapp-quote" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Solicitar cotización</a>
              <a className="text-link" href="#servicios">Explorar servicios <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-trust"><ShieldCheck size={17} /><span>Operación coordinada · Atención directa · Respuesta ágil</span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-label">REDZA / 24—7</div>
            <HeroVideo />
            <div className="visual-note"><span>01</span><p>Del origen al destino,<br />con control en cada tramo.</p></div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true"><span>Desliza para conocer Redza</span><ChevronDown size={16} /></div>
      </section>

      <BrandStrip />

      <section className="intro-section section-pad">
        <div className="shell intro-grid">
          <div><p className="eyebrow"><span>02</span> Una operación que responde</p></div>
          <div className="intro-content"><h2>La logística no es solo mover carga. <em>Es mover tu negocio.</em></h2><p>En Redza entendemos que una entrega a tiempo protege ventas, equipos y relaciones. Por eso combinamos flota, coordinación y seguimiento para que cada traslado tenga un responsable de principio a fin.</p><a className="text-link dark-link" href="#contacto">Hablemos de tu operación <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="service-section section-pad" id="servicios" tabIndex={-1}>
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow"><span>03</span> Lo que hacemos</p><h2>Una solución para<br /><em>cada recorrido.</em></h2></div><p>Servicios de transporte pensados para operaciones reales: entregas urbanas, distribución regional y carga de mayor volumen.</p></div>
          <div className="service-grid">
            {services.map(({ number, title, text, icon: ServiceIcon }) => (
              <article className="service-card" key={number}>
                <div className="card-top"><span>{number}</span><ServiceIcon size={42} strokeWidth={1.35} className="service-icon" aria-hidden="true" /></div>
                <h3>{number === '03' ? <Link className="service-detail-link" href={rampPath}>Transporte con rampa hidráulica</Link> : title}</h3>
                <p>{text}</p>
                <a data-umami-event="whatsapp-service-quote" href={quoteLink(`Hola Redza, necesito cotizar el servicio de ${title}.`)} target="_blank" rel="noreferrer" aria-label={`Cotizar servicio: ${title}`}>
                  Cotizar servicio <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-section section-pad" id="metodo" tabIndex={-1}>
        <div className="shell proof-grid">
          <div className="proof-image">
            <span className="proof-image-label">FLOTA / OPERACIÓN</span>
            <picture>
              <source media="(min-width: 320px) and (max-width: 900px)" type="image/avif"
                srcSet="/images/redza_fotos/optimized/redza-flota-movil-400.avif 400w, /images/redza_fotos/optimized/redza-flota-movil-720.avif 720w"
                sizes="(max-width: 520px) calc(100vw - 30px), min(680px, 100vw - 36px)" />
              <Image src="/images/redza_fotos/optimized/redza-flota-camiones-operacion.webp" alt="Flota de camiones Redza frente a un centro de distribución" fill sizes="(max-width: 520px) calc(100vw - 30px), (max-width: 900px) min(680px, 100vw - 36px), 42vw" className="proof-photo-main" />
            </picture>
            <span className="proof-photo-grade" aria-hidden="true" />
            <span className="proof-photo-overlay">OPERACIÓN REAL<br /><strong>LISTOS PARA SALIR</strong></span>
            <span className="proof-stamp">RZ / 2026</span>
          </div>
          <div className="proof-copy">
            <p className="eyebrow"><span>04</span> Nuestra forma de trabajar</p>
            <h2>Simple para ti.<br /><em>Preciso para tu carga.</em></h2>
            <ol className="steps" role="list">
              <li><b aria-hidden="true">01</b><div><h3>Cuéntanos qué necesitas</h3><p>Origen, destino, tipo de carga y fecha. Te respondemos con claridad.</p></div></li>
              <li><b aria-hidden="true">02</b><div><h3>Planificamos el recorrido</h3><p>Asignamos el vehículo y coordinamos la ventana de retiro y entrega.</p></div></li>
              <li>
                <b aria-hidden="true">03</b>
                <div>
                  <h3>Seguimiento de entregas con Logitrack</h3>
                  <p>Desde el retiro hasta la recepción en destino, nuestro equipo monitorea cada despacho y registra su avance en Logitrack. Tu empresa recibe reportes de distribución con el estado de los envíos y el respaldo digital de las entregas realizadas.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="field-section section-pad" aria-labelledby="field-title">
        <div className="shell">
          <div className="field-heading"><div><p className="eyebrow"><span>05</span> Flota / trabajo real</p><h2 id="field-title">Cada entrega<br /><em>empieza en terreno.</em></h2></div><p>Fotos reales de nuestra operación: carga preparada, vehículos en patio y rutas que conectan Chile de norte a sur.</p></div>
          <div className="field-gallery">
            <figure className="field-card field-card-main"><Image src="/images/redza_fotos/optimized/redza-manipulacion-carga-traspaleta.webp" alt="Carga palletizada preparada dentro de un camión Redza" fill sizes="(max-width: 520px) calc(100vw - 30px), (max-width: 900px) min(340px, 50vw - 18px), 50vw" /><figcaption><span>OPERACIÓN / 01</span><strong>Carga asegurada antes de salir.</strong></figcaption></figure>
            <figure className="field-card field-card-route"><Image src="/images/redza_fotos/optimized/redza-ruta-la-mano-del-desierto.webp" alt="Camión Redza en ruta junto a La Mano del Desierto, Antofagasta" fill sizes="(max-width: 520px) calc(100vw - 30px), (max-width: 900px) min(340px, 50vw - 18px), 25vw" /><figcaption><span>RUTA / NORTE</span><strong>Una cobertura que cruza el desierto.</strong></figcaption></figure>
            <div className="field-note"><span>RZ / 05</span><p>Una flota visible, cuidada y preparada para que tu operación avance.</p><a className="text-link" data-umami-event="whatsapp-quote" href={whatsappLink} target="_blank" rel="noreferrer">Coordinar una ruta <ArrowUpRight size={16} /></a></div>
            <figure className="field-card field-card-yard"><Image src="/images/redza_fotos/optimized/redza-flota-vehiculos-distribucion.webp" alt="Vehículos de distribución Redza estacionados en patio operativo" fill sizes="(max-width: 520px) calc(100vw - 30px), (max-width: 900px) min(340px, 50vw - 18px), 25vw" /><figcaption><span>FLOTA / 02</span><strong>Vehículos para cada recorrido.</strong></figcaption></figure>
            <figure className="field-card field-card-patio"><Image src="/images/redza_fotos/optimized/redza-flota-camiones-patio.webp" alt="Camiones Redza preparados en un patio logístico" fill sizes="(max-width: 520px) calc(100vw - 30px), (max-width: 900px) min(340px, 50vw - 18px), 25vw" /><figcaption><span>PATIO / 03</span><strong>Coordinación desde el origen.</strong></figcaption></figure>
            <aside className="field-operations-board" aria-label="Flujo operativo Redza">
              <div className="field-board-top"><span>RUTA ACTIVA / REDZA</span><span className="field-board-live"><i /> OPERACIÓN 24—7</span></div>
              <div className="field-board-content">
                <div className="field-board-copy"><span>CONTROL DE PUNTA A PUNTA</span><p>Un recorrido.<br /><strong>Tres puntos de control.</strong></p></div>
                <div className="field-route-flow">
                  <span className="field-route-vehicle" aria-hidden="true"><Truck size={15} strokeWidth={2} /></span>
                  <ol className="field-route-stations">
                    <li><b>01</b><strong>Retiro</strong><small>Origen confirmado</small></li>
                    <li><b>02</b><strong>Coordinación</strong><small>Ruta monitoreada</small></li>
                    <li><b>03</b><strong>Entrega</strong><small>Destino cumplido</small></li>
                  </ol>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="coverage-section section-pad" id="cobertura" tabIndex={-1}>
        <ChileRegionsMap />
      </section>

      <section className="clients-section section-pad" id="clientes" tabIndex={-1}>
        <div className="shell">
          <div className="clients-heading"><div><p className="eyebrow"><span>07</span> Confianza que se mueve</p><h2>Empresas que<br /><em>confían en Redza.</em></h2></div><p>Nos eligen porque cada entrega necesita más que un camión: necesita coordinación, cuidado y una respuesta que no se detenga.</p></div>
          <div className="clients-grid">
            {clients.map((client) => <article className="client-card" key={client.name}><div className="client-card-top"><span>CLIENTE / {client.number}</span></div><div className="client-logo-wrap"><Image src={client.src} alt={client.alt} width={240} height={150} sizes="(max-width: 900px) 100vw, 30vw" className="client-logo" /></div><div className="client-card-bottom"><strong>{client.name}</strong><span>{client.service}</span></div></article>)}
            <div className="client-note"><ShieldCheck size={23} /><div><strong>Tu operación, en buenas manos.</strong><p>Sumamos experiencia y seguimiento para que tu marca llegue bien representada a cada destino.</p><a className="text-link" data-umami-event="whatsapp-quote" href={whatsappLink} target="_blank" rel="noreferrer">Conversemos sobre tu operación <ArrowUpRight size={16} /></a></div></div>
          </div>
        </div>
      </section>

      <FleetSection />

      <section className="contact-section" id="contacto" tabIndex={-1}><div className="shell contact-grid"><div><p className="eyebrow"><span>09</span> Empecemos</p><h2>Tu próxima entrega<br /><em>parte aquí.</em></h2><p>Cuéntanos sobre tu operación y preparemos el recorrido correcto para tu carga.</p></div><div className="contact-card"><div><span className="contact-kicker">Respuesta directa</span><h3>Hablemos por WhatsApp</h3><p>Disponible para cotizaciones y coordinación de servicios.</p></div><a className="contact-action" data-umami-event="whatsapp-quote" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Escribir a Redza <ArrowUpRight size={17} /></a><div className="contact-details"><a data-umami-event="phone-call" href="tel:+56987885833"><PhoneCall size={16} /> +56 9 8788 5833</a><span><Clock3 size={16} /> Lunes a domingo · servicio continuo</span></div></div></div></section>
      </main>

      <SiteFooter home />
    </>
  );
}


