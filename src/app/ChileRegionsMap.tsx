'use client';

import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PhoneAlternative from './PhoneAlternative';
import { chileRegions, originName, santiago } from './chileRegions';
import styles from './ChileRegionsMap.module.css';

type MapMode = 'origen' | 'destino';

// In-region label anchors in the map viewBox, not depots or GPS positions.
const anchors: Record<(typeof chileRegions)[number]['id'], [number, number]> = {
  CLAP: [496,61], CLTA: [506,97], CLAN: [522,162], CLAT: [488,243],
  CLCO: [460,308], CLVS: [454,358], CLRM: [460,372], CLLI: [450,391],
  CLML: [433,416], CLNB: [421,438], CLAR: [406,487], CLBI: [408,458],
  CLLR: [397,518], CLLL: [386,561], CLAI: [373,679], CLMA: [451,846],
};

function MapMarker({ id, end }: { id: keyof typeof anchors; end: 'A' | 'B' }) {
  const [x,y] = anchors[id];
  const dx = end === 'A' ? -105 : 105;
  return <g transform={`translate(${x} ${y})`} className={styles.marker} data-end={end} aria-hidden="true">
    <line x2={dx} /><circle r="4" />
    <rect x={dx-23} y="-23" width="46" height="46" rx={end === 'A' ? 23 : 5} />
    <text x={dx} y="1" textAnchor="middle" dominantBaseline="central">{end}</text>
  </g>;
}

export default function ChileRegionsMap() {
  const [origin, setOrigin] = useState<string>(santiago);
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState<MapMode>('destino');
  const [ready, setReady] = useState(false);
  const init = useCallback((form: HTMLFormElement | null) => {
    if (!form) return;
    const data = new FormData(form);
    setOrigin(String(data.get('origen') ?? santiago));
    setDestination(String(data.get('destino') ?? ''));
    setReady(true);
  }, []);
  const from = originName(origin);
  const fromRegion = chileRegions.find(r => r.id === origin);
  const to = chileRegions.find(r => r.id === destination);
  const options = chileRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>);

  return (
    <form ref={init} className="shell coverage-grid" action="/cotizar-ruta" method="get" target="_blank" rel="noreferrer" aria-label="Cotizar una ruta por WhatsApp">
      <div className={styles.intro}>
        <p className="eyebrow"><span>06</span> Llegamos más lejos</p>
        <h2>{ready ? <>Desde {from}<br />{to ? 'a ' : 'a todo '}<em>{to?.name ?? 'Chile'}.</em></> : <>Transporte entre<br /><em>regiones de Chile.</em></>}</h2>
        <p className="coverage-copy">Elige dónde retiramos tu carga y en qué región la entregamos. Coordinamos rutas urbanas, interurbanas y nacionales.</p>
        <button className="button button-light route-quote" data-umami-event={to ? "whatsapp-route-quote" : undefined} type="submit" aria-describedby={ready && to ? 'resumen-ruta' : undefined}>
          Cotizar esta ruta
          <span className={styles.quoteIcon} aria-hidden="true"><ArrowUpRight size={17} /></span>
        </button>
        <PhoneAlternative />
      </div>
      <div className="map-card regions-map-card">
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.detail}>
              <label className={styles.label}>Origen del retiro
                <select className={styles.select} name="origen" value={origin} onChange={e => setOrigin(e.currentTarget.value)}>
                  {options}
                </select>
              </label>
              <label className={styles.label}>Región de destino (obligatoria)
                <select className={styles.select} name="destino" required value={destination} onChange={e => setDestination(e.currentTarget.value)}>
                  <option value="">Selecciona el destino</option>{options}
                </select>
              </label>
              <div className={styles.quoteNote}>
                <h3>Al cotizar por WhatsApp</h3>
                <p>El mensaje ya incluye tu ruta. Agrega las comunas de retiro y entrega, el tipo de carga y la fecha.</p>
              </div>
            </div>
            <div className={styles.stage}>
              {ready ? <fieldset className={styles.mode}>
                <legend>Seleccionar en el mapa</legend>
                <div className={styles.switcher}>{(['origen', 'destino'] as const).map(value => <label key={value}>
                  <input type="radio" name="mapa" value={value} checked={mode === value} onChange={() => setMode(value)} />
                  <span>{value === 'origen' ? 'Origen' : 'Destino'}</span>
                </label>)}</div>
              </fieldset> : <p className={styles.legend}>16 regiones · cobertura nacional</p>}
              <svg viewBox="120 0 650 1000" role="img" aria-label="Mapa de las regiones de Chile" aria-describedby="resumen-ruta">
                <g transform="matrix(1.8 0 0 1 -450 0)" onClick={e => {
                  const id = e.target instanceof SVGUseElement && e.target.dataset.region;
                  if (id) (mode === 'origen' ? setOrigin : setDestination)(id);
                }}>
                  {chileRegions.map(r => <use key={r.id} href={`/images/chile-regions.svg#${r.id}`} data-region={r.id}
                    data-origin={ready && r.id === origin || undefined}
                    data-destination={ready && r.id === destination || undefined} className={styles.shape} />)}
                </g>
                {ready && fromRegion && <MapMarker id={fromRegion.id} end="A" />}
                {ready && to && <MapMarker id={to.id} end="B" />}
              </svg>
              <p id="resumen-ruta" className={styles.caption} role="status" aria-atomic="true">{ready ? <>
                <span className={styles.stop}><i className={styles.originKey} aria-hidden="true">A</i><small>Origen</small><strong>{from}</strong></span>
                <span className={styles.stop}><i className={styles.destinationKey} data-pending={!to || undefined} aria-hidden="true">B</i><small>Destino</small><strong>{to?.name ?? 'Por elegir'}</strong></span>
              </> : 'Cobertura nacional'}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
