# Especificación de logo V2

> **Estado: archivado y rechazado.** No usar esta especificación para nuevas piezas sin una aprobación explícita.

## Qué mejora

La identidad actual ya tiene un wordmark reconocible y un lenguaje de señalética fuerte. La V2 resuelve principalmente aplicaciones donde el logo original queda demasiado ancho:

1. crea una relación horizontal controlada entre lettering y truck;
2. conserva una línea de ruta roja como elemento de conexión;
3. deja una versión compacta para tamaños pequeños;
4. mantiene exactamente la paleta y los SVG oficiales.

## Jerarquía de uso

| Situación | Archivo recomendado |
|---|---|
| Primera presentación, portada, tarjeta | Lockup oficial completo |
| Encabezado oscuro ancho | `redza-v2-horizontal-white.svg` |
| Encabezado claro ancho | `redza-v2-horizontal-black.svg` |
| Avatar, firma, pie de pieza o espacio reducido | `redza-v2-compact-white.svg` o black |
| Sitio web actual | Mantener por ahora los SVG oficiales actuales |

## Medidas mínimas

- Lockup horizontal: mínimo 180 px en pantalla o 38 mm en impresión.
- Versión compacta: mínimo 120 px en pantalla o 25 mm en impresión.
- Clear space: al menos la altura de la señal roja del lockup en todos los lados.
- No colocar sobre fotografías sin un campo sólido de contraste.
- Mantener `preserveAspectRatio="xMinYMid meet"`; nunca usar `preserveAspectRatio="none"` para logos.

## Criterios de aprobación

La V2 está lista para reemplazar una aplicación concreta cuando:

- el logo se reconoce a tamaño real;
- el rojo funciona como señal y no como relleno dominante;
- la lectura de `REDZA` ocurre antes que el descriptor;
- la variante blanco/negro tiene contraste suficiente;
- el archivo se ve correctamente en navegador, Figma/Illustrator y prueba física;
- no aparece ninguna deformación en el wordmark o el truck.

## Recomendación

Usar esta V2 como sistema de presentación y no como una nueva marca independiente. La unidad de marca sigue siendo el SVG oficial; la V2 es su composición responsive.
