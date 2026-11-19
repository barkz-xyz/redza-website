# Auditoría de Redza y hoja de ruta

## Diagnóstico de marca

### Fortalezas

- El sistema visual es distintivo: `#0B0B0C`, `#151517`, rojo Redza, crema y blanco.
- Manrope + DM Mono crea una combinación editorial/operacional coherente.
- El sitio usa fotos propias de flota, carga y rutas, lo que ayuda a demostrar operación real.
- La jerarquía está bien orientada a B2B: servicio, método, cobertura, clientes y contacto.
- El CTA de WhatsApp aparece en navegación, hero, servicios, cobertura y cierre.
- El mapa de Chile y el sistema de ruta convierten la cobertura nacional en una experiencia memorable.
- El contenido social y la tarjeta ya comparten paleta, tipografía, QR y número oficial.

### Riesgos actuales

- El alias público actual es `redzaweb-codex.vercel.app`; el código anuncia `www.redza.cl` como canonical. Hay que terminar el dominio antes de una campaña fuerte.
- Vercel aún no está conectado automáticamente al repositorio de GitHub; un push no garantiza un deploy.
- Las marcas `Alvi` y `Unimarc` aparecen como clientes; conserva autorización para mostrarlas y reemplázalas por logos aprobados si cambia el permiso.
- La metadata incluye email y horario continuo. Confirma que ambos datos sean verdaderos antes de usar SEO local como fuente oficial.
- La landing es principalmente estática: no hay formulario persistente, CRM, analítica ni registro nativo de conversiones.
- El import de Google Fonts en CSS depende de una petición externa; si la velocidad o la privacidad se vuelven críticas, conviene autoalojar las fuentes licenciadas.

La auditoría también encontró referencias a archivos antiguos de `public/images/redza branding/redesign/` que habían sido eliminados. Ya fueron retiradas del sitio: los símbolos de servicio ahora son Lucide y las líneas/patrones de ruta se dibujan con CSS. Los únicos archivos usados como logo siguen siendo los SVG oficiales blanco/negro.

## Qué no cambiar sin evidencia

- No cambiar colores por tendencias.
- No generar una versión nueva del wordmark con IA.
- No convertir cada sección en una ilustración distinta.
- No prometer trazabilidad, seguro, tiempos o cobertura específica si la operación no los garantiza.
- No mover el CTA principal fuera de WhatsApp sin probar una alternativa.

## Hoja de ruta recomendada

### Fase 1 — publicación segura

1. Conectar `www.redza.cl` y el dominio apex a Vercel.
2. Confirmar DNS, HTTPS, canonical, Open Graph, sitemap y robots.
3. Revisar todos los enlaces de WhatsApp con `+56 9 8788 5833`.
4. Obtener permiso escrito para logos y testimonios de clientes.
5. Instalar analítica con consentimiento y medir clics en WhatsApp.

### Fase 2 — conversión

1. Añadir evento de clic a WhatsApp y evento de solicitud de cotización.
2. Usar mensajes prellenados distintos para `WEB`, `CARD` e `INSTAGRAM`.
3. Crear una sección breve de “qué enviar para cotizar”: origen, destino, carga, fecha y condiciones de descarga.
4. Añadir testimonios reales con nombre de empresa solo cuando exista autorización.

### Fase 3 — autoridad comercial

1. Crear casos de ruta con origen, destino, tipo de carga y resultado verificable.
2. Publicar fotografías reales de operación en Google Business Profile e Instagram.
3. Conectar GitHub con Vercel para previews y deploys consistentes.
4. Evaluar CMS solo si actualizar contenido semanalmente desde el código se vuelve una carga.

## Indicadores mensuales

- clics a WhatsApp desde web;
- conversaciones que incluyen origen, destino, carga y fecha;
- cotizaciones enviadas;
- cotizaciones convertidas;
- visitas a páginas clave y profundidad de scroll;
- rendimiento por fuente: WEB, CARD, INSTAGRAM, GOOGLE;
- tiempo entre primer contacto y respuesta.
