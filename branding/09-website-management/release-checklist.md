# Checklist de publicación

## Antes de editar

- [ ] Confirmé que el cambio pertenece a Redza y no a otro proyecto.
- [ ] Revisé si hay modificaciones de usuario sin relación y no las sobrescribí.
- [ ] Usé el SVG oficial blanco/negro correcto.
- [ ] Conservé `#0B0B0C`, `#151517`, `#E21A16`, `#BB1512`, `#F3F3F1` y `#FFFFFF`.

## Contenido

- [ ] El número es `+56 9 8788 5833` en texto, `tel` y WhatsApp.
- [ ] El CTA pide una acción concreta.
- [ ] Los acentos y caracteres españoles se ven correctamente.
- [ ] Los `alt` describen la foto sin inventar información.
- [ ] Los logos de clientes tienen autorización vigente.

## Visual

- [ ] El logo no está estirado, rotado ni recoloreado.
- [ ] Las fotos no están estiradas; solo se recortan cuando el módulo lo exige.
- [ ] El titular se lee a 375 px y en escritorio.
- [ ] No hay texto crítico debajo de controles móviles.
- [ ] Los fondos claros usan logo negro y los fondos oscuros logo blanco.

## Técnico

```powershell
npm.cmd run lint
npm.cmd run build
```

- [ ] Revisé el preview de Vercel.
- [ ] Probé navegación, WhatsApp, teléfono, correo, mapa, video y menú móvil.
- [ ] Verifiqué que `/robots.txt` y `/sitemap.xml` respondan.
- [ ] Revisé errores en logs.
- [ ] Publiqué con `vercel deploy --prod --scope bobo-labs-8827`.
- [ ] Guardé la URL del deployment y revisé el alias estable.

## Después de publicar

- [ ] Probé el sitio en móvil real y escritorio.
- [ ] Probé el enlace oficial de WhatsApp.
- [ ] Confirmé que no aparezca el número antiguo `+56 9 9149 9999`.
- [ ] Registré fecha, cambio y deployment en el historial del proyecto.
