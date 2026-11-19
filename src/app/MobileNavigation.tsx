'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function MobileNavigation({ children, quoteUrl }: { children: ReactNode; quoteUrl: string }) {
  return (
    <nav className="mobile-menu" aria-label="Navegación móvil">
      <button type="button" popoverTarget="mobile-links" aria-controls="mobile-links" aria-label="Menú de navegación">
        Menú
        <Menu className="menu-open-icon" size={18} aria-hidden="true" />
        <X className="menu-close-icon" size={18} aria-hidden="true" />
      </button>
      <div id="mobile-links" popover="auto" onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) {
          event.currentTarget.hidePopover?.();
        }
      }}>
        <div className="mobile-sections">{children}</div>
        <a className="mobile-quote" data-umami-event="whatsapp-nav-quote" href={quoteUrl} target="_blank" rel="noreferrer">
          Cotizar por WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
