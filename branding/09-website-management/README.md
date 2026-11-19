# Redza website management

Manual práctico para mantener el sitio de Redza sin perder la identidad visual ni el flujo de cotización.

## Estado actual

| Elemento | Estado |
|---|---|
| Framework | Next.js 16.2.11 + React 19 + TypeScript |
| Proyecto Vercel | `redzaweb-codex` |
| Cuenta/equipo | `bobo-labs-8827` |
| Alias de producción | `https://redzaweb-codex.vercel.app` |
| Dominio de marca | El build local usa el alias de Vercel como canonical. Configurar `SITE_URL` cuando el dominio propio sirva la web por HTTPS. |
| Deploy actual | Consultar el alias de producción en el panel de Vercel; la auditoría de modernización se validó en local. |
| Repositorio | `https://github.com/bobo-labs/redza-website`, aún sin conexión automática a Vercel |
| Variables de entorno | No se requieren actualmente para esta landing estática |
| Canal comercial | WhatsApp `+56 9 8788 5833` |

## Documentos de esta carpeta

- `vercel-operations.md`: comandos diarios, previews, producción, dominios, variables y rollback.
- `content-and-brand-editing.md`: dónde editar textos, fotos, logos, CTA y mapa.
- `audit-and-roadmap.md`: diagnóstico, riesgos, oportunidades y orden recomendado de mejoras.
- [Auditoría Modern Web Guidance](modern-web-guidance-audit.md): matriz de las 209 guías, mediciones antes y después y pruebas en navegadores.
- `release-checklist.md`: control de calidad antes de publicar.

## Regla de oro

Una modificación del sitio debe seguir este flujo:

```text
editar → npm.cmd run lint → npm.cmd run build → preview → revisar móvil/escritorio → producción
```

Nunca edites directamente el HTML generado ni reemplaces los SVG oficiales con una imagen generada por IA.
