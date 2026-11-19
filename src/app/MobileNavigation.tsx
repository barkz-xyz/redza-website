'use client';

import type { ReactNode } from 'react';
import { Menu } from 'lucide-react';

export default function MobileNavigation({ children }: { children: ReactNode }) {
  return (
    <nav className="mobile-menu" aria-label="Navegación móvil">
      <button type="button" popoverTarget="mobile-links" aria-controls="mobile-links" aria-label="Menú de navegación">
        <Menu size={21} aria-hidden="true" />
      </button>
      <div id="mobile-links" popover="auto" onClick={(event) => {
        if (event.target instanceof Element && event.target.closest('a[href]')) {
          event.currentTarget.hidePopover?.();
        }
      }}>
        {children}
      </div>
    </nav>
  );
}
