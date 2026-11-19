# Analítica de Redza

Redza usa **Umami Cloud Hobby**. La web no abre conexiones a Postgres. Sin Website ID, en desarrollo o en Preview, el sitio no incluye el script ni crea las reescrituras.

## Activación de Cloud

1. Elige [Hobby gratis](https://umami.is/pricing), no la prueba de Pro. Registra el sitio Redza en **Websites** y copia su **Website ID** público.
2. En Vercel, proyecto Redza → Settings → Environment Variables → **Production**, configura `NEXT_PUBLIC_UMAMI_WEBSITE_ID` y `SITE_URL` (origen HTTPS canónico). Deja **sin definir** `UMAMI_ORIGIN` y mantén habilitada la variable de sistema `VERCEL_ENV`. No se usan claves API, secretos ni credenciales de Neon.
3. Recompila solo cuando quieras activar la medición. El GET de `/stats/script.js` se reescribe a `https://cloud.umami.is/script.js`. El POST de `/stats/api/send` llega a una función de Redza que envía el evento a `https://gateway.umami.is/api/send`. Ambas solicitudes del navegador siguen en el dominio de Redza.

### Cómo se determina el país

La función solo opera en Vercel Production para el dominio y Website ID configurados. Toma la IP de [la cabecera de entrada de Vercel](https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for) y la reenvía como `X-Forwarded-For` junto con el User-Agent, siguiendo el [ejemplo oficial de Umami Cloud](https://docs.umami.is/docs/bypass-ad-blockers). Si falta una IP válida, descarta el evento en vez de atribuirlo a la salida del proxy. No añade la IP al evento ni la escribe en logs de la aplicación. No hay que configurar `CLIENT_IP_HEADER` en Redza: no controla el servicio administrado de Umami. El país es una estimación de la IP pública, no GPS; una VPN, el operador o la base GeoIP pueden cambiar el resultado. [Cómo calcula la ubicación Umami](https://docs.umami.is/docs/metric-definitions#reverse-proxies-and-umami-cloud).

## Alternativa para pruebas con Neon (sin Umami Cloud)

Solo si necesitas probar tu propia base: usa una instancia autoalojada y un Website ID de laboratorio. No reutilices el Website ID de Cloud, no envíes los mismos eventos a ambos y no introduzcas las credenciales de Neon en la web. Para Redza con Cloud, omite estos pasos.

1. Confirma el plan de hosting: [Vercel Hobby no admite uso comercial](https://vercel.com/docs/limits/fair-use-guidelines). Si Redza ya usa Pro, puede alojar el segundo proyecto en ese equipo; no se garantiza costo adicional cero. [Neon Free](https://neon.com/pricing) tiene límites de uso.
2. Crea una base Postgres en Neon. Importa el fork de [Umami](https://github.com/umami-software/umami) como un proyecto Next.js **separado**; usa una versión estable (referencia de esta integración: v3.5.0). Conserva los comandos de instalación/build del release, incluido el paso de migraciones.
3. En **Umami → Settings → Environment Variables → Production**, configura:

   | Variable | Valor |
   | --- | --- |
   | `DATABASE_URL` | URL **pooled** de Neon (host con `-pooler`), con los parámetros TLS que entrega Neon. |
   | `DIRECT_DATABASE_URL` | URL **directa**, sin pooler, de la **misma rama y base**. Umami la usa durante las migraciones de build. |
   | `APP_SECRET` | Secreto aleatorio estable. Genera uno de forma privada con `openssl rand -hex 32`. No lo compartas entre instalaciones ni lo cambies en cada build. |

   No copies estas variables a Redza, al repositorio ni a Preview. Deshabilita builds automáticos de ramas del fork si no los necesitas: tampoco deben migrar producción. [Variables oficiales de Umami](https://docs.umami.is/docs/environment-variables).
4. Despliega Umami, cambia de inmediato la contraseña inicial del administrador y registra el dominio canónico de Redza en Websites. Copia **Website ID**, no el ID de usuario ni una API key.
5. En **Redza → Settings → Environment Variables → Production**, fija `SITE_URL` al origen HTTPS real de la portada, `UMAMI_ORIGIN` al origen HTTPS de ese despliegue de Umami y `NEXT_PUBLIC_UMAMI_WEBSITE_ID` al ID anterior. Habilita las variables de sistema de Vercel para que exista `VERCEL_ENV`. Solo cuando decidas publicar, recompila Redza. Los alias deben redirigir al dominio canónico si quieres contarlos.

## Qué se mide

- Vistas de página y clics de intención en WhatsApp y teléfono. Ejemplos: `whatsapp-ramp-quote`, `whatsapp-refrigerated-quote`, `whatsapp-route-quote`, `phone-call`. Los clics del menú se separan como `whatsapp-nav-quote`; filtra por la página para distinguir rampa de portada. No significan una conversación iniciada ni una venta.
- Sin identificadores de clientes, datos del formulario, grabaciones, eventos de scroll ni selección de regiones. Se excluyen parámetros y fragmentos de URL; esto también sacrifica atribución por UTM. La señal «No rastrear» (DNT) por sí sola no desactiva la medición. Sigue disponible la [opción oficial de exclusión por navegador](https://docs.umami.is/docs/exclude-my-own-visits).
- Solo se reenvían `/stats/script.js` y `/stats/api/send` al upstream. El dashboard, login y API administrativa no se publican bajo Redza. Deja los nombres predeterminados de tracker y colector en Umami. La ruta propia no garantiza que todos los bloqueadores permitan la medición.
- En Cloud, revisa el uso de eventos en el panel. Solo en el laboratorio con Neon: deja que la base se suspenda, sin pings periódicos, y revisa mensualmente almacenamiento y CU-horas.

## Comprobación al publicar

Desde Chrome en Android, deja DNT activado y usa datos móviles chilenos sin VPN ni exclusión manual de Umami. Abre la página de rampa del dominio canónico en una sesión nueva; anota la hora. Toca el botón de cotización de la rampa sin enviar el mensaje. En Umami → Realtime, busca la nueva vista de esa página, el evento `whatsapp-ramp-quote` y el país de esa sesión. Las visitas antiguas no se recalculan. Si no aparece nada, comprueba en Network que tanto el GET a `/stats/script.js` como el POST a `/stats/api/send` responden con éxito. Si aparece otro país, repite por Wi-Fi sin VPN para distinguir la red del teléfono del proxy. En Preview y localhost no debe haber solicitudes a `/stats/`. Para apagar la integración, quita el Website ID y recompila Redza.
