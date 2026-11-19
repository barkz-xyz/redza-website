# Redza Brand & Client-Growth Kit

Sistema de marca, material comercial y captación de clientes para Redza Transporte y Logística.

## Qué contiene

- `01-brand-foundation/`: posicionamiento, mensajes, voz y tono.
- `02-visual-system/`: paleta, tipografía y reglas de uso del logo.
- `03-logo-assets/`: copias organizadas de los SVG oficiales entregados por Redza.
- `04-social-content/`: banco de 12 posts verticales y 12 historias, con captions y calendario de cuatro semanas.
- `05-business-card/`: tarjeta de dos caras, QR de WhatsApp y PDF de imprenta.
- `06-marketing-plan/`: plan enfocado en tarjetas, página web e Instagram opcional.
- `07-reusable-templates/`: plantillas editables para cotización, testimonios y contenido.
- `08-reference-research/`: decisiones tomadas a partir de la investigación visual en Cosmos y Pinterest.
- `09-website-management/`: auditoría, edición de contenido, operación de Vercel y checklist de publicación.
- `99-archive/logo-v2-rejected-2026-09-17/`: experimentos V2 archivados por decisión del usuario; no usar en producción.
- `10-domain-research/`: investigación de disponibilidad de `redza.cl`, Porkbun, NIC Chile y conexión con Vercel.

## Ruta recomendada

1. Confirmar que el número comercial definitivo es `+56 9 8788 5833`.
2. Mantener la guía de edición en `09-website-management/` y ejecutar lint/build antes de publicar.
3. Solicitar una prueba física de 10 a 20 tarjetas y escanear el QR en condiciones reales.
4. Hacer que el botón principal de la web y el QR abran el mismo flujo de WhatsApp.
5. Repartir tarjetas de forma selectiva y registrar cada conversación con la etiqueta `CARD`.
6. Si se activa Instagram, publicar el banco de 12 piezas durante cuatro semanas, tres veces por semana.

## Vista rápida

- Vista general del contenido: `04-social-content/redza-social-content-overview.png`.
- Tarjeta: `05-business-card/redza-business-card-preview.png`.
- Plan principal: `06-marketing-plan/30-day-client-growth-plan.md`.

## Regla de marca

Redza debe sentirse como un sistema operacional preciso: fondo controlado, señal roja, fotografía real, jerarquía clara y un solo llamado a la acción.

## Regla de logos

Usar únicamente los archivos oficiales en:

- `public/images/redza branding/white svgs/` sobre fondos oscuros.
- `public/images/redza branding/black svgs/` sobre fondos claros.

No recrear, redibujar, recolorear ni generar el logo con IA.

## Calidad de imágenes

Las publicaciones se exportan a:

- Feed: 1080 × 1350 px, PNG.
- Historia: 1080 × 1920 px, PNG.
- Master: SVG editable con fotografía incrustada a calidad alta.

El generador usa el archivo original disponible cuando tiene mejor resolución, recorte Lanczos, compresión JPEG de alta calidad sin submuestreo de color y nitidez moderada. No inventa detalle con IA.

## Contacto oficial

El número comercial oficial para el sitio web y todo el material nuevo es `+56 9 8788 5833`. Verifica que cualquier pieza nueva, perfil social o anuncio conserve este número.

## Regenerar los recursos

Desde la raíz del proyecto:

```powershell
python branding\build_assets.py
```

El script vuelve a exportar los 12 posts, las 12 historias, la vista general, la tarjeta, el QR y el PDF.
