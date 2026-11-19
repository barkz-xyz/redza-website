'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { observeMotionVisibility } from './observeMotionVisibility';
import styles from './BrandStrip.module.css';

const baseSequence = ['REDZA / 01', 'OPERACIÓN COORDINADA', 'RUTAS QUE RESPONDEN', 'CARGA B2B', 'SANTIAGO — CHILE', '24—7'];

export default function BrandStrip() {
  const strip = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (strip.current) return observeMotionVisibility(strip.current, setVisible);
  }, []);

  return (
    <section ref={strip} className={`brand-strip ${styles.strip}`} aria-label="Sistema de marca Redza">
      <div className={styles.viewport}>
        <div className={`brand-strip-track ${styles.track}`} data-running={visible && !paused}>
          {[false, true].map((copy) => (
            <ul className={styles.group} role="list" aria-hidden={copy || undefined} key={String(copy)}>
              {baseSequence.map((label, index) => (
                <li key={label}><span className={index === 0 ? 'brand-strip-lead' : undefined}>{label}</span></li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button className={styles.control} type="button" onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Reanudar franja de marca' : 'Pausar franja de marca'}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </section>
  );
}
