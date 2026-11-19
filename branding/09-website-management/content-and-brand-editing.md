# Editar contenido y marca del sitio

## Mapa rápido del código

| Necesidad | Archivo o carpeta |
|---|---|
| Metadata, canonical, Schema.org y FAQ | `src/app/layout.tsx` |
| Navegación, hero, servicios, método, galería, clientes, contacto y footer | `src/app/page.tsx` |
| Colores, fuentes, grids, responsive y motion | `src/app/globals.css` |
| Video del hero | `src/app/HeroVideo.tsx` y `public/images/redza_fotos/optimized/` |
| Logos blancos para fondos oscuros | `public/images/redza branding/white svgs/` |
| Logos negros para fondos claros | `public/images/redza branding/black svgs/` |
| Iconos de servicios y sistema de ruta | `src/app/page.tsx` y reglas CSS en `src/app/globals.css` |
| Regiones y labels del mapa | `src/app/chileRegions.ts` y `src/app/ChileRegionsMap.tsx` |
| Fotos reales | `public/images/redza_fotos/optimized/` |
| Kit de marca y posts | `branding/` |

## Contacto oficial

El único número comercial vigente es `+56 9 8788 5833`.

En código se escribe sin espacios para WhatsApp y `tel`:

```ts
const whatsapp = '56987885833';
```

Si el número cambia en el futuro, busca y actualiza todas las apariciones:

```powershell
rg -n "56987885833|\+56 9 8788 5833" src branding
```

Después comprueba que el QR de la tarjeta, los posts, la web y el mensaje prellenado abran el mismo destino.

## Logos

Usa únicamente los SVG reales entregados por Redza:

- fondo negro/oscuro: `white svgs/`;
- fondo blanco/crema: `black svgs/`.

No recrees el wordmark con una fuente, no lo recolorees y no uses `preserveAspectRatio="none"`. En el sitio, `next/image` conserva la proporción del logo; en cualquier SVG nuevo usa `preserveAspectRatio="xMidYMid meet"` o `xMinYMid meet`.

Los experimentos de composición V2 rechazados están archivados en `branding/99-archive/logo-v2-rejected-2026-09-17/`. No usar esos archivos en el sitio ni en material activo. El sistema vigente sigue usando los SVG oficiales blanco/negro documentados en `branding/03-logo-assets/`.

## Fotografía sin deformación

Las imágenes de operación deben conservar su proporción. En tarjetas fotográficas, `object-fit: cover` recorta bordes para llenar el módulo; no estira la imagen. Ajusta `object-position` cuando el sujeto quede mal encuadrado.

Antes de exportar una pieza social:

1. confirma la relación de aspecto original;
2. decide si el recorte es `cover` o si necesitas mostrar la imagen completa con `contain`;
3. nunca fuerces ancho y alto sin una regla de preservación de aspecto;
4. revisa móvil y escritorio.

## Copy y tono

Redza debe sonar directo, preciso y confiable. Prioriza frases activas y verificables:

- “Tu carga no se detiene.”
- “Coordinación directa.”
- “Carga asegurada antes de salir.”
- “Transporte y distribución nacional.”

Evita promesas no demostrables, superlativos vacíos y exceso de texto. Cada sección debe llevar a una acción clara: solicitar cotización por WhatsApp.

## Actualizar una foto

1. Optimiza la foto a WebP y conserva una copia original fuera de `public/`.
2. Pon la versión web en `public/images/redza_fotos/optimized/`.
3. Actualiza la ruta y el `alt` en `src/app/page.tsx`.
4. Ajusta `object-position` si el encuadre lo necesita.
5. Comprueba que no se estire en 375 px, 768 px y escritorio.

## Actualizar una sección

Mantén la estructura editorial: eyebrow numerado, titular corto, prueba concreta y CTA. Si agregas una sección, actualiza también la navegación y revisa el orden numérico de los eyebrows.
