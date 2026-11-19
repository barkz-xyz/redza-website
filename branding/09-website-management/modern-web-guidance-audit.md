# Auditoría Modern Web Guidance · Redza

## Resultado del build final

Se clasificaron las 209 guías por su pertinencia para la web comercial de Redza. Se implementaron mejoras en la portada, navegación por teclado, cotizaciones, cobertura, legibilidad, carga de fuentes e imágenes y movimiento. Los resultados siguientes corresponden a la compilación de producción ejecutada en localhost el 18 de noviembre de 2026.

| Lighthouse móvil, mismo equipo y URL | Antes | Después |
|---|---:|---:|
| Primera aparición de contenido (FCP) | 2,0 s | 1,1 s |
| Aparición del contenido principal (LCP simulado) | 2,0 s | 3,1 s |
| Peso transferido durante la prueba | 1.269 KiB | 469 KiB |
| Cambios de posición del contenido (CLS) | 0,032 | ≈ 0 |
| Rendimiento | 98 | 93 |
| Accesibilidad | 96 | 100 |
| Buenas prácticas / SEO | 100 / 100 | 100 / 100 |

La prueba inicial identificó el titular como elemento LCP. La prueba final identificó la imagen de portada, visible antes al reducir el espacio vertical en móvil. En la traza local apareció a los 466 ms (antes, 914 ms para el titular); Lighthouse estimó 3,1 s bajo sus condiciones móviles simuladas. La imagen se solicitó con prioridad alta. La regresión simulada sigue abierta: conviene contrastarla con mediciones de visitantes después de publicar. Los dos ensayos son mediciones de laboratorio.

### Comprobaciones realizadas

- Chrome en 320, 390, 768 y 1440 px: enlace de salto, anclas, Escape, fichas regionales, decodificación de imágenes y enlace de cotización por tipo de servicio. Con tamaño raíz al 200 %, el titular y el CTA de contacto quedaron dentro del ancho disponible.
- Firefox 150 y WebKit 26.4 a 390 px: abrir y cerrar el menú al navegar a Contacto, seleccionar Antofagasta y comprobar el destino de WhatsApp. Pruebas de motor con viewport emulado.
- El mapa conserva los 16 contornos, accesibles con un solo selector de teclado. La región activa se distingue también en colores forzados. Las coordenadas se sirven como SVG compartido.
- El MP4 de 477.303 bytes se carga en móvil al pulsar reproducir. Se comprobó que la pausa manual se mantiene al volver a la sección. La franja tiene pausa propia y con movimiento reducido muestra una sola copia accesible de cada lema.
- Las visitas de prueba descargaron recursos únicamente del origen del sitio. Las familias oficiales se sirven desde el proyecto. Se comprobó que las fotos mantienen su proporción y que las etiquetas de cotización conservan el texto visible en su nombre accesible.
- Compilación, TypeScript y ESLint correctos. El escaneo final de `src` devolvió cero coincidencias. Quedan fuera de estas pruebas la lectura con VoiceOver/TalkBack en teléfonos físicos, la recepción de mensajes comerciales y los datos de rendimiento de usuarios reales.

**Corte:** 18 de noviembre de 2026, 22:45–22:46, hora de Santiago. Lectura del árbol de trabajo compartido, no de producción ni del último commit limpio (HEAD de referencia: `bb78f2a`). Durante la revisión cambiaron componentes del sitio por separado de esta auditoría. Para distinguir versiones, los prefijos SHA-256 observados son: mapa `BEBD62FDF7E2`, franja `A344C30BAD83`, video `1FB8CFDC1A94`, layout `CDBDF833708B`, CSS global `85552E4B4F23`. Si difieren, contrastar los pendientes antes de abrir tareas.

## Método y alcance

- **Catálogo:** `npx.cmd -y modern-web-guidance@latest list --skill-version 2026_11_10-47b4c80e`. Se clasificaron los 209 identificadores devueltos y sus descripciones. La versión indicada es la de la skill; `@latest` podría devolver un catálogo distinto en otra fecha. [Fuente oficial de las guías](https://developer.chrome.com/docs/modern-web-guidance).
- **Lectura selectiva:** se recuperaron las guías de accesibilidad, rendimiento, movimiento, barra de navegación, escala de texto del sistema, carga diferida audiovisual, posición de desplegables, tipografía y privacidad. La matriz distingue esta revisión por pertinencia de una evaluación exhaustiva de cada regla individual.
- **Escaneo:** `npx.cmd -y modern-web-guidance@latest legacy-scan src --json`. Tanto la ejecución inicial como la repetición durante el corte informaron el siguiente resumen:

```json
{"targetDir":"src","totalFindings":0,"guides":[],"activeRuleCount":52,"activeGuideCount":38}
```

Son **38 de 209 guías (18,2 %)** con reglas activas; las otras 171 no quedaron evaluadas por este comando. No hubo coincidencias a las que aplicar los criterios de conservar o descartar. El escaneo no mide accesibilidad, contraste, compatibilidad ni Core Web Vitals; tampoco incluye por sí mismo los archivos de `public`.

## Hipótesis registradas durante la revisión inicial

La tabla conserva el punto de partida de la revisión. Las comprobaciones posteriores y sus límites están en el resultado del build final, arriba.

| Orden | Evidencia en el corte | Qué falta para cerrar |
|---|---|---|
| P1 · Cobertura regional | [Mapa](../../src/app/ChileRegionsMap.tsx): el selector nativo tiene etiqueta asociada; selector y clic en un elemento SVG `use` actualizan el mismo estado. Hay 16 regiones en [los datos](../../src/app/chileRegions.ts) y 16 identificadores regionales en el recurso SVG. El resumen lleva `role="status"`. | Comparar una región del norte y otra del sur por teclado y por toque. Nombre, hub, resaltado y anuncio deben coincidir sin exigir acertar un área pequeña. Probar también colores forzados. No corresponde pedir 16 botones SVG adicionales. |
| P2 · Franja de marca | En la lectura de cierre, [BrandStrip](../../src/app/BrandStrip.tsx) ya presenta una lista de seis rótulos, oculta la copia con `aria-hidden` y ofrece un botón de pausa. Su [CSS](../../src/app/BrandStrip.module.css) parte de una lista estática y solo habilita la animación con `no-preference`. El pendiente dejó de ser añadir el botón. | Verificar que el lector anuncie una sola lista, que la pausa se conserve al salir y volver a la sección, y que con movimiento reducido los seis textos se distribuyan sin recorte en móvil. No se comprobó el comportamiento en ejecución. |
| P3 · Reflujo y lectura | [CSS global](../../src/app/globals.css): el tablero de ruta ya parte de una columna y declara un contenedor; aún hay rótulos de 8 px y recorte en el tablero. El [mapa](../../src/app/ChileRegionsMap.module.css) ya usa rem, cqi y una consulta a 34 rem. | A 320 CSS px y con texto ampliado al 200 %, revisar titular, tres estaciones, pies de foto y CTA. Incluir anchos intermedios y medir contraste sobre los fondos reales. Registrar el elemento que se corta, si lo hay; no se observó un fallo de reflujo en navegador. |
| P4 · Navegación móvil | [Menú](../../src/app/MobileNavigation.tsx): botón con destino declarativo, popover automático y cierre al elegir enlace. El CSS limita la altura y prevé enlaces en flujo sin soporte del selector de popover. La cabecera es sticky. | Abrir con teclado, recorrer enlaces, cerrar con Escape y activar «Cobertura». Comprobar foco, destino visible bajo la cabecera, orientación horizontal y alternativa estática. No asumir que el CSS de respaldo se ha probado. |
| P5 · Hero y presupuesto de carga | [Video](../../src/app/HeroVideo.tsx): póster WebP de 38 038 B, MP4 ligero de 477 303 B **en disco**. Precarga del póster desde 901 px, video con `preload="none"`, URL asignada al reproducir; [observador](../../src/app/observeMotionVisibility.ts) combina visibilidad e intersección. | En carga fría móvil/escritorio identificar el elemento LCP y las peticiones reales; comprobar ahorro de datos cuando esté disponible, movimiento reducido, autoplay bloqueado y pausa manual tras salir/regresar. Comparar imágenes elegidas por `sizes` con su ancho visible. No afirmar ahorro transferido ni mejora de LCP/INP/CLS sin medición. |
| P6 · Fuentes y terceros | El [layout](../../src/app/layout.tsx) referencia WOFF2 locales con `next/font/local`; Manrope ajusta su fallback y DM Mono no se precarga. El antiguo diagnóstico sobre Google Fonts no describe este corte. El CTA de la [landing](../../src/app/page.tsx) navega a WhatsApp. | Con caché fría y fuentes bloqueadas, observar dominios, sustitución tipográfica y desplazamientos. Distinguir una petición al cargar de una navegación por clic. Inventariar cabeceras en la respuesta antes de concluir que falta una política; no añadir analítica por defecto. |

No se ejecutaron build, lint, pruebas de navegador o lector de pantalla, Lighthouse, mediciones de campo ni deploy en esta auditoría. Las condiciones de cierre anteriores son propuestas, no resultados. Para cambios futuros sin una matriz de navegadores acordada, partir de Baseline ampliamente disponible y conservar las alternativas de las guías para funciones más recientes.

## Matriz de trazabilidad

Cada ID aparece una vez en la matriz. **R · revisar** (32): pertinente con una comprobación pendiente. **C · conservar** (7): hay una solución adecuada en el código, sin certificación de funcionamiento. **D · diferir** (31): reconsiderar si se cumple la condición indicada. **O · omitir** (139): no hay necesidad actual de ese patrón. Los estados se asignan por decisión sobre la landing, no por popularidad de la API.

### Acceso al contenido y navegación

| Estado | IDs del catálogo | Decisión para Redza |
|---|---|---|
| R | `accessibility`, `html`, `js` | Hay idioma, estructura, salto al contenido y controles nativos. Validar que elegir una región por cualquiera de las dos vías actualice el mismo resumen (P1). |
| R | `accessible-generated-content`, `content-first-noise-reduction` | Los adornos de ruta se generan con contenido CSS vacío; las copias de la franja, en cambio, son texto HTML real (P2). |
| R | `navbar`, `declarative-dialog-popover-control`, `viewport-aware-dropdowns` | La navegación usa anclas; en móvil el botón abre un popover nativo, no un menú de comandos. Verificar posición, foco y alternativa sin Popover (P4). |
| C | `icons`, `card` | Mantener iconos vectoriales, nombres de botones y artículos de servicios/clientes. No volver clicable toda la tarjeta si no hay destino. |
| O | `app-menus`, `menu`, `navigation-drawer`, `stack-drill-down`, `toolbar` | Son enlaces en un solo nivel: no hay comandos de aplicación, panel lateral, submenús ni barra de herramientas. |
| O | `breadcrumbs`, `scrollspy`, `scroll-position-aware-elements`, `scroll-progress-indicator`, `shrinking-header-on-scroll`, `state-aware-sticky-headers` | Las anclas y la cabecera sticky ya permiten orientarse. No hay jerarquía de páginas ni requisito de marcar progreso o transformar la cabecera. |
| O | `position-aware-tooltips`, `interest-triggered-action-previews`, `interest-triggered-tooltips`, `hovercard` | El detalle de región ocupa un panel persistente. No es una burbuja flotante ni una previsualización de acción; no esconderlo tras hover. |
| O | `light-dismiss-a-dialog`, `platform-controls-dismiss-dialog`, `prevent-page-scroll-under-modal-dialog`, `dialog` | El panel móvil es no modal. No atrapar el foco, bloquear el scroll ni introducir un diálogo solo para mostrar enlaces. |
| O | `accordion`, `tabs`, `search-hidden-content` | Las secciones comerciales se leen en flujo; no hay pestañas, acordeones ni texto editorial plegado que revelar al buscar. |
| O | `copy-button`, `persistent-app-tours`, `persistent-toast-notifications`, `progress`, `progress-ring`, `spinner` | La cotización abre un destino; no hay acción de copiar, recorrido guiado, transacción asíncrona, progreso ni notificaciones que implementar. |

### Composición, lectura y color

| Estado | IDs del catálogo | Decisión para Redza |
|---|---|---|
| R | `respect-os-text-scale`, `fluid-scaling`, `responsive-design`, `form-factor-adaptation`, `improve-text-layout-and-legibility`, `typography` | Ya hay títulos equilibrados y tipografía fluida por contenedor en cobertura. Contrastar esa solución con rótulos en px y el salto forzado del titular (P3). |
| R | `css`, `css-layout`, `overflow-clipping-control`, `size-aware-styling` | El mapa ya cambia de composición según su contenedor; el tablero declara route-board y recorta el desborde. Comprobar el contenido visible sin quitar el recorte de los adornos (P3). |
| R | `color`, `visually-stable-font-fallbacks` | Contrastar rótulos sobre fotos, foco y textos secundarios; comprobar sustitución de Manrope/DM Mono por sus fuentes de reserva (P3 y P6). |
| C | `visual-effects`, `deliver-optimized-decorative-images`, `resolution-optimized-pseudo-elements` | Rutas, puntos y tramas están dibujados con gradientes y pseudoelementos; no requieren descargar imágenes por densidad. Las fotografías sí son contenido. |
| D | `calculate-with-intrinsic-sizes`, `individual-transform-properties`, `reduce-style-repetition`, `selector-atrule-combinations` | Revisar dimensiones intrínsecas, composición de transformaciones y repetición de reglas si se toca la galería. No introducir funciones CSS solo para acortar una hoja que ya funciona. |
| D | `content-based-styling`, `design-token-reactivity`, `usage-aware-component-variations`, `component-specific-light-dark-theme` | Los fondos se fijan por sección, y el selector de cobertura usa esquema oscuro local. No generalizar a un sistema de densidades o variantes por contenido sin otros consumidores. |
| O | `atrule-support-conditionals`, `child-state-based-styling`, `dynamic-sibling-styling` | No hay regla-at experimental imprescindible, selector interactivo de tema ni distribución cromática dependiente del número de hermanos. El fallback del popover detecta un selector, no una regla-at. |
| O | `single-line-overflow`, `contrast-color`, `equal-width-text-lines`, `precise-text-alignment`, `visually-stable-mixed-fonts` | No forzar etiquetas a una línea ni ajustar cada línea del titular al mismo ancho; no hay fondos elegidos por el visitante ni un problema demostrado de alineación óptica o mezcla de glifos. |
| O | `checkbox`, `dark-mode-toggle`, `browser-ui-theming`, `dark-mode` | La alternancia editorial de fondos no es un tema del sistema. No hay checkbox ni selector de tema solicitado; la adaptación puntual del control regional no exige tematizar toda la página. |
| O | `adapt-scrollbar-to-contrast-preferences`, `customize-scrollbar-color-and-thickness` | No se personaliza la barra de desplazamiento; mantener comportamiento y contraste del sistema. |
| O | `complex-shapes`, `custom-text-decorations`, `shaped-cutouts`, `visually-texture-content` | La identidad ya usa SVG oficial, líneas y gradientes. No hacen falta recortes, texturas ni subrayados animados nuevos. |
| O | `scrollability-affordance-hints`, `soft-edge-content-fade` | El degradado de la franja es decorativo, no un indicador de contenido que el usuario pueda desplazar ni una barrera de lectura. |

### Movimiento e interacción

| Estado | IDs del catálogo | Decisión para Redza |
|---|---|---|
| R | `motion`, `natural-interactions` | El video admite pausa y respeta movimiento reducido al iniciarse. La franja automática y el mapa requieren comprobar control independiente, toque y teclado (P1–P2). |
| D | `interactive-content-reveal`, `scoped-component-transitions` | El vidrio del hero ya tiene botón; las fotos reaccionan con CSS. Un efecto de revelado o una transición local solo se justifica si comunica información adicional. |
| O | `animate-to-intrinsic-sizes`, `animate-element-entry-exit`, `animate-to-from-top-layer`, `custom-button-actions`, `dynamic-sibling-animations`, `physics-based-easing` | Abrir enlaces no exige animar alturas, escalonar elementos, añadir rebotes ni comandos personalizados. El popover ya se controla de forma declarativa. |
| O | `carousel-slide-effects`, `carousel-snap-highlights`, `scroll-snap-realtime-feedback`, `scroll-snap-state-sync`, `scroll-target-on-load`, `carousel` | La galería es una cuadrícula de figuras y la franja es una cinta automática, no un carrusel seleccionable. No instalar controles de diapositivas ni sincronización de scroll snap. |
| O | `pull-to-reveal`, `2d-panning`, `drag`, `drag-and-drop`, `spatial-navigation`, `swipe-to-remove`, `swipe-to-reveal` | Las regiones se seleccionan; no se desplazan como un plano ni se reordenan. Tampoco hay listas con acciones por gesto. Preservar toque y teclado ordinarios. |
| O | `anchor-positioning-tab-underline`, `directional-navigation-transitions`, `dynamic-sort`, `group-element-transitions`, `move-dom-element-without-losing-state`, `persistent-top-layer-ui` | No hay pestaña móvil entre destinos, elementos reordenables ni nodos que cambien de padre; el popover no necesita conservarse tras un traslado. |
| O | `consistent-cross-document-transitions`, `cross-document-transitions`, `same-document-transitions` | Los enlaces internos cambian de fragmento en el mismo documento. No hay vistas de aplicación que coordinar ni páginas interiores que enlazar con una transición. |
| O | `parallax-scroll-effects`, `scroll-completion-effects`, `scroll-entry-exit-effects`, `scrollytelling` | Las secciones ya están disponibles al desplazarse. No condicionar su lectura a paralaje, animaciones de entrada o al fin del scroll. |
| O | `highlight-text-ranges`, `responsive-table`, `sortable-table` | No hay búsqueda interna ni tabla de resultados que resaltar u ordenar; las cifras y regiones no son tablas interactivas. |

### Carga, medición y recursos

| Estado | IDs del catálogo | Decisión para Redza |
|---|---|---|
| R | `lazy-load-video-and-audio`, `optimize-image-priority`, `optimize-preload-priority`, `performance` | El hero separa póster y película y prioriza el póster en escritorio. Identificar el LCP real y las solicitudes por viewport antes de tocar esa decisión (P5). |
| R | `defer-rendering-heavy-content`, `efficient-background-processing` | El video observa intersección y visibilidad del documento. Verificar intención de pausa al regresar; diferir el pintado de otras secciones solo si se mide un coste (P5). |
| D | `break-up-long-tasks`, `identify-heavy-scripts`, `identify-inp-causes`, `interaction-paint-timing`, `interactions-in-complex-layouts`, `schedule-tasks-by-priority` | Evaluar respuesta del mapa y del menú si una traza muestra trabajo largo. No fragmentar las 16 regiones ni añadir planificación de tareas sin atribución. |
| D | `batch-analytics-events`, `calculate-total-foreground-time`, `detect-initial-visibility-state`, `full-session-analytics` | Si se aprueba analítica, definir primero qué clic en cotizar se necesita medir. Agrupar envíos solo si procede; tiempo de pestaña no prueba conversación ni venta. |
| O | `conditional-async-dependencies`, `defer-work-until-scroll-ends`, `deprioritize-background-fetches`, `optimize-script-priority`, `out-of-order-html-streaming` | No se identificó un flujo de dependencias condicionales, consultas de fondo, trabajo al terminar scroll ni contenido tardío que requiera streaming manual. No cambiar prioridades de scripts a ciegas. |
| O | `faster-spa-view-transitions`, `flicker-free-client-side-ab-testing`, `improve-next-page-load-performance` | No hay vistas internas sucesivas ni experimento A/B. No precargar WhatsApp ni prerenderizar fragmentos de la misma página. |

### Privacidad, confianza y cuenta

| Estado | IDs del catálogo | Decisión para Redza |
|---|---|---|
| R | `privacy`, `restrict-outbound-connections`, `secure-external-subresources`, `security` | El layout referencia fuentes locales. Distinguir solicitudes de carga y la salida voluntaria a WhatsApp; observar orígenes y cabeceras reales antes de restringirlos (P6). |
| D | `sanitize-untrusted-html`, `trusted-types` | El JSON-LD se serializa con datos del proyecto y origen configurado; no equivale a HTML de usuario. Revisar el punto de inserción si entra contenido de CMS; no afirmar una vulnerabilidad por el nombre de la API. |
| O | `client-side-encryption`, `digital-signatures`, `local-network-access`, `validate-origins` | No hay intercambio de claves, firma, acceso a dispositivos de red ni canal de mensajes entre ventanas que autenticar. |
| O | `passkey-authentication`, `passkey-conditional-create`, `passkey-management`, `passkey-reauthentication`, `passkey-registration`, `passkeys`, `quick-sign-ins`, `verify-email-ownership` | Página pública sin cuentas, alta, sesión, reautenticación ni verificación de correo. El enlace de contacto no autentica al visitante. |
| O | `install-web-app`, `migrate-web-app-origin` | Un cambio de dominio del sitio no es una migración de una aplicación instalada. No se identificó un flujo de instalación que conservar. |

### Captura de datos, plataforma y funciones ausentes

| Estado | IDs del catálogo | Decisión para Redza |
|---|---|---|
| D | `accessible-error-announcement`, `style-parent-with-has`, `autofill-address-form`, `autofill-highlight-inputs`, `brand-consistent-forms`, `form-fields-automatically-fit-contents`, `forms`, `required-field-feedback`, `validate-input-after-interaction` | Si Redza incorpora un formulario propio de cotización, revisar etiquetas, dirección, autocompletado y errores tras interacción. Hoy el visitante escribe en WhatsApp, no en campos del sitio. |
| O | `autofill-payment-form`, `autofill-sign-in-form`, `autofill-sign-up-form`, `ime-safe-enter-submit`, `sms-otp-form` | Sin pagos, credenciales, alta, OTP ni envío por Enter desde un editor. No capturar estos datos para solicitar contacto. |
| C | `branded-select-styling`, `select-menu-interaction` | El selector regional modifica colores y espaciado sin sustituir las opciones nativas. Conservar interacción de teclado y selector del sistema; no imponer un picker personalizado (P1). |
| O | `animated-select-picker`, `custom-select-picker-layouts`, `rich-media-picker`, `slider`, `switch` | Hay un select nativo de regiones con etiqueta y estilo local. Mantener selección convencional; no requiere animación, opciones multimedia, deslizadores ni switches. |
| O | `accessible-web-components`, `custom-elements`, `form-associated-custom-elements`, `prerendering-custom-elements`, `shadow-dom`, `styling-web-components`, `web-components` | Los componentes observados son React con HTML/SVG, no elementos personalizados registrados; no hay Shadow DOM, controles de formulario asociados ni hidratación de dichos elementos. |
| O | `calculate-event-differentials`, `capture-location-agnostic-data`, `coordinate-global-events`, `sort-high-precision-timestamps`, `support-global-calendar-systems` | La cobertura, el horario y las etapas de retiro son información editorial. No se calculan duraciones, reservas globales, calendarios alternativos ni orden temporal de eventos. |
| O | `language-detection`, `language-model`, `summarizer`, `translator` | El contenido está editado en español. No se recibe texto que haya que detectar, traducir, resumir o procesar con un modelo en el navegador. |
| O | `apply-webgl-shaders`, `export-html-media-from-canvas`, `expose-canvas-content-to-browser-features`, `interactive-content-in-3d-scenes`, `cpp-on-the-web` | El mapa es SVG y la operación se ilustra con fotos y MP4. No hay canvas que exportar, escena 3D, shader ni módulo C++ que portar. |
| O | `agentic-forms`, `agentic-javascript-tools`, `webmcp` | No hay herramientas de agente ni formulario transaccional que exponer mediante WebMCP; la vía de cotización sigue siendo un enlace. |
