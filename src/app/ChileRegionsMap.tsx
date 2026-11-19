'use client';

import { useId, useState } from 'react';
import { chileRegions } from './chileRegions';
import styles from './ChileRegionsMap.module.css';

export default function ChileRegionsMap() {
  const controlId = useId();
  const [activeId, setActiveId] = useState('CLRM');
  const activeRegion = chileRegions.find(({ id }) => id === activeId) ?? chileRegions[0];

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.detail}>
          <label htmlFor={controlId} className={styles.label}>Selecciona una región</label>
          <select
            id={controlId}
            className={styles.select}
            value={activeRegion.id}
            onChange={(event) => setActiveId(event.currentTarget.value)}
          >
            {chileRegions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>

          <h3>{activeRegion.name}</h3>
          <p className={styles.summary} role="status" aria-atomic="true">
            Hub operativo: {activeRegion.hub}. {activeRegion.service}.
          </p>
          <p className={styles.copy}>Diseñamos la ruta según el ritmo y la complejidad de tu operación.</p>
          <p className={styles.status}><span className="status-pulse" aria-hidden="true" />Cobertura disponible</p>
        </div>

        <div className={styles.stage}>
          <p className={styles.legend}>16 regiones · cobertura nacional</p>
          <svg viewBox="0 0 760 1000" role="img" aria-label="Mapa de las regiones de Chile">
            {/* The native picker provides the same selection without aiming at small shapes. */}
            <g transform="matrix(1.8 0 0 1 -450 0)" onClick={(event) => {
              if (event.target instanceof SVGUseElement && event.target.dataset.region) {
                setActiveId(event.target.dataset.region);
              }
            }}>
              {chileRegions.map(({ id }) => (
                <use
                  key={id}
                  href={`/images/chile-regions.svg#${id}`}
                  data-region={id}
                  data-active={id === activeRegion.id || undefined}
                  className={styles.shape}
                />
              ))}
            </g>
          </svg>
          <p className={styles.caption} aria-hidden="true">Zona activa · {activeRegion.name}</p>
        </div>
      </div>
    </div>
  );
}
