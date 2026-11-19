import { ArrowUpRight } from 'lucide-react';
import { quoteLink } from './service-links';
import styles from './FleetSection.module.css';

// Public inventory is aggregated by payload, not by vehicle.
const fleet = [
  { kg: 1500, count: 5 }, { kg: 5000, count: 5 },
  { kg: 10000, count: 1 }, { kg: 15000, count: 1 },
];
const total = fleet.reduce((sum, group) => sum + group.count, 0);
const weight = new Intl.NumberFormat('es-CL');
const refrigeratedQuote = quoteLink('Hola Redza, necesito cotizar transporte refrigerado.\nOrigen: \nDestino: \nProducto y peso: \nTemperatura requerida: \nFecha: ');

export default function FleetSection() {
  return (
    <section className="numbers-section section-pad" id="flota" tabIndex={-1} aria-labelledby="flota-titulo">
      <div className="shell numbers-grid">
        <div>
          <p className="eyebrow"><span>08</span> Flota / Equipo</p>
          <h2 id="flota-titulo">Nuestra flota<br /><em>de camiones.</em></h2>
          <p className="hero-lede">Contamos con {total} camiones y un equipo de <strong>más de 15 colaboradores</strong> para coordinar los retiros, el transporte y las entregas.</p>
          <div className={styles.cold}>
            <h3>Camiones frigoríficos</h3>
            <p>¿Tu carga necesita refrigeración? Indícanos el producto, la temperatura requerida y la ruta para confirmar qué camión puede realizar la entrega.</p>
            <a data-umami-event="whatsapp-refrigerated-quote" href={refrigeratedQuote} className="text-link" target="_blank" rel="noreferrer">Cotizar transporte refrigerado <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <table className={styles.inventory}>
          <caption>Capacidad de carga de la flota</caption>
          <thead><tr><th scope="col">Carga por camión</th><th scope="col">Camiones</th></tr></thead>
          <tbody>{fleet.map(({ kg, count }) => (
            <tr key={kg}><th scope="row">{weight.format(kg)} kg</th><td>{count}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}
