'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import MobileNavigation from './MobileNavigation';

const sections = [
  ['servicios', 'Servicios'], ['metodo', 'Cómo trabajamos'], ['cobertura', 'Cobertura'],
  ['clientes', 'Clientes'], ['flota', 'Flota'], ['contacto', 'Contacto'],
] as const;

export default function SectionNavigation({ home, quoteUrl }: { home: boolean; quoteUrl: string }) {
  const [current, setCurrent] = useState('');
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    if (!home) return;
    // Use one reading line for both menus, including when the mobile popover is closed.
    let observer: IntersectionObserver;
    function observeSections() {
      observer?.disconnect();
      // Keep the reading line below the sticky header and the anchor landing offset, even in landscape.
      const height = document.documentElement.clientHeight;
      const reference = document.getElementById(sections[0][0]);
      const sectionOffset = reference ? parseFloat(getComputedStyle(reference).scrollMarginTop) || 0 : 0;
      const top = Math.max(0, Math.min(height - 2, Math.max(sectionOffset + 2, Math.round(height * .23))));
      observer = new IntersectionObserver((entries) => {
        const entered = entries.find(entry => entry.isIntersecting);
        if (entered) setCurrent(entered.target.id);
        else setCurrent(previous => entries.some(entry => entry.target.id === previous) ? '' : previous);
      }, { rootMargin: `-${top}px 0px -${Math.max(0, height - top - 2)}px 0px` });
      sections.forEach(([id]) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    }
    observeSections();
    window.addEventListener('resize', observeSections);
    // On tall screens the last section may never reach the reading line.
    const footer = document.querySelector('.site-footer');
    const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    if (footer) footerObserver.observe(footer);
    return () => { window.removeEventListener('resize', observeSections); observer.disconnect(); footerObserver.disconnect(); };
  }, [home]);

  const activeSection = footerVisible ? 'contacto' : current;
  const links = sections.map(([id, label]) => (
    <a key={id} href={`${home ? '' : '/'}#${id}`} aria-current={home && id === activeSection ? 'location' : undefined}>{label}</a>
  ));
  return <>
    <nav className="desktop-nav" aria-label="Navegación principal">{links}</nav>
    <a className="nav-cta" data-umami-event="whatsapp-nav-quote" href={quoteUrl} target="_blank" rel="noreferrer">Cotizar ahora <ArrowUpRight size={16} aria-hidden="true" /></a>
    <MobileNavigation quoteUrl={quoteUrl}>{links}</MobileNavigation>
  </>;
}
