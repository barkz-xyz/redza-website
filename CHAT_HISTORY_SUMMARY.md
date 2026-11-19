# Resumen del historial de trabajo — Redza Website

Fecha de actualización: 17 de septiembre de 2026

## Objetivo del proyecto

Construir y preparar el sitio web de Redza, una empresa de transporte y logística en Chile, con una identidad visual más sólida, moderna y coherente para posteriormente desplegarlo en Railway.

## Referencias de diseño

- Se revisó la referencia de branding logístico compartida desde Cosmos:
  [Cosmos — Logistics Branding](https://www.cosmos.so/barkz/logistics-branding).
- Se tomó como dirección visual una estética operacional y editorial: rojo Redza, negro, crema, tipografía contundente, módulos rectangulares, líneas de ruta, señalética y patrones técnicos.
- También se revisaron referencias de branding de empresas logísticas como DHL, Maersk, Flexport y Katoen Natie.

## Trabajo de branding realizado

Se revisaron los archivos de branding existentes y se creó un sistema visual adicional dentro de:

`public/images/redza branding/redesign/`

Assets principales creados:

- `redza brand lockup.svg`
- `redza motion mark.svg`
- `redza route system.svg`
- `redza cargo mark.svg`
- `redza signal pattern.svg`
- `redza route icon.svg`
- `redza package icon.svg`
- `redza ramp icon.svg`

Estos recursos formaron parte de una iteración anterior del encabezado, hero, tarjetas de servicios y fondos decorativos. En la auditoría de septiembre de 2026 se retiraron las referencias a los archivos `redesign/` eliminados: el sitio ahora conserva los SVG oficiales para los logos y usa CSS/Lucide para la geometría y los símbolos de apoyo.

## Mapa interactivo de Chile

Se creó un mapa SVG de las 16 regiones de Chile con interacción por región:

- Cada región es un `path` SVG independiente.
- Hover y focus aplican elevación visual, cambio de color y sombra.
- La región activa actualiza un panel con nombre, hub operativo y tipo de servicio.
- El mapa incluye soporte para navegación con teclado.
- El diseño usa la paleta de Redza en lugar de colores aleatorios.

Archivos relacionados:

- `src/app/ChileRegionsMap.tsx`
- `src/app/chileRegions.ts`
- `public/images/redza branding/redesign/redza regions hover.svg`
- `public/images/redza branding/redesign/chile regions source.svg`

El mapa base conserva la referencia y atribución de SimpleMaps en el archivo SVG.

## Corrección de codificación en español

Se detectó y corrigió un problema de codificación UTF-8 que mostraba algunos acentos y caracteres especiales de forma incorrecta.

Los textos fueron reparados en `src/app/page.tsx`. Ahora aparecen correctamente palabras como `Logística`, `operación`, `cotización`, `Última`, `coordinación` y `©`.

## Implementación técnica

- Aplicación Next.js con React y TypeScript.
- Se integraron los nuevos assets SVG al sitio existente.
- Se agregó un `.gitignore` para excluir `node_modules`, `.next`, archivos de entorno y logs.
- El proyecto no incluye secretos ni archivos `.env`.

## Validaciones realizadas

- `npm run lint` — aprobado.
- `npm run build` — aprobado.
- Los SVG principales fueron validados como XML correcto.
- Se comprobó el renderizado local de textos en español.
- Se verificó que el contenido visible del sitio no contenga caracteres de codificación dañada.

## GitHub

Repositorio configurado:

[bobo-labs/redza-website](https://github.com/bobo-labs/redza-website)

La rama principal utilizada es `main` y quedó sincronizada con `origin/main`.

## Estado de Vercel

El sitio se desplegó correctamente en producción en:

https://redzaweb-codex.vercel.app

Proyecto: `redzaweb-codex` en la cuenta `bobo-labs-8827`.

El deployment de corrección de contacto quedó `READY` con el identificador `2fRUHkZQqf9rDXXXSytvRs4sMPWa`. El repositorio de GitHub todavía no está conectado automáticamente a Vercel porque la integración no tenía acceso suficiente; por ahora el deploy se realiza desde la carpeta local con `vercel deploy --prod`.

## Contacto oficial

El número comercial confirmado es `+56 9 8788 5833`.

Se actualizó en:

- `src/app/page.tsx`: WhatsApp, `tel` y número visible.
- `src/app/layout.tsx`: teléfono estructurado y FAQ.
- `branding/README.md`: regla de contacto oficial.

## Experimentos de logo V2

Los experimentos V2 fueron rechazados y archivados en `branding/99-archive/logo-v2-rejected-2026-09-17/`. No se usan en el sitio ni en material activo. El sistema vigente sigue siendo el de los SVG oficiales blanco/negro de Redza; la producción no fue modificada por este archivo.

## Manual de mantenimiento

La documentación consolidada está en `branding/09-website-management/` y en `WEBSITE-MANAGEMENT.md`:

- operaciones de Vercel;
- edición de contenido y marca;
- auditoría y hoja de ruta;
- checklist de publicación.

## Investigación de dominio

La consulta exacta en WHOIS de NIC Chile del 17 de septiembre de 2026 mostró `redza.cl` disponible. Porkbun no mostró `.cl` como extensión registrable y solo ofreció alternativas `.com`/`.net`. La recomendación es registrar `redza.cl` directamente en NIC Chile y luego conectarlo al proyecto de Vercel. La investigación detallada está en `branding/10-domain-research/redza-cl-domain-research.md`.

## Estado de Railway

El código ya está listo para ser conectado a Railway desde el repositorio de GitHub. La configuración y el despliegue final en Railway todavía deben realizarse desde la cuenta/proyecto de Railway.

## Próximos pasos sugeridos

1. Crear un nuevo proyecto en Railway desde `bobo-labs/redza-website`.
2. Seleccionar la rama `main`.
3. Configurar el comando de build si Railway no lo detecta automáticamente.
4. Agregar las variables de entorno necesarias si se incorporan nuevas integraciones.
5. Revisar el dominio, favicon, SEO y analítica después del primer deploy.
