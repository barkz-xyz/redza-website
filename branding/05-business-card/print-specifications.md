# Especificaciones de impresión — tarjeta Redza

## Formato

- Tamaño final: 90 × 50 mm.
- Mesa de trabajo: 96 × 56 mm.
- Sangrado: 3 mm por cada lado.
- Área segura: 5 mm hacia adentro desde la línea de corte.
- PDF: dos páginas; frente primero y reverso después.
- PNG: prueba visual de alta resolución; no reemplaza el PDF de imprenta.
- SVG: master editable con el mismo sangrado.

## Sistema visual

- Frente oscuro: logo blanco oficial y señal roja.
- Reverso claro: truck mark negro oficial y datos comerciales.
- QR: negro sobre blanco, con zona silenciosa intacta y dentro de un módulo Redza negro/rojo.
- El marco, la etiqueta “COTIZA AQUÍ” y el mensaje “ESCANEA / WHATSAPP” cohesionan el QR con el resto de la tarjeta sin modificar sus módulos.

## Destino del QR

El QR abre WhatsApp con este mensaje:

`Hola Redza, vi su tarjeta. Quiero cotizar un transporte.`

Número: `+56 9 8788 5833`.

## Checklist de imprenta

- Imprimir al 100 %, sin “Ajustar a página”.
- Confirmar que la imprenta reconoce 3 mm de sangrado por lado.
- Solicitar primero una prueba física de 10 a 20 unidades.
- Probar el QR con al menos dos teléfonos, luz interior y luz natural.
- Revisar número, URL, tildes y corte antes del tiraje final.
- Preferir laminado mate o soft touch; evitar brillo intenso sobre el QR.
- No usar tinta metálica, barniz localizado ni relieve sobre el QR.
- Papel sugerido: 350–400 g/m², blanco, sin textura profunda.

## Control de versiones

Si cambia el número, el mensaje o la URL, ejecutar nuevamente `python branding\\build_assets.py`; no editar solamente la imagen del QR.
