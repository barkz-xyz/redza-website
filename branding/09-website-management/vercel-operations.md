# Operaciones de Vercel

Este proyecto está enlazado localmente con Vercel mediante `.vercel/project.json`. Vercel guarda allí el vínculo entre esta carpeta y el proyecto remoto; `.vercel` ya está excluido de Git.

## Primera comprobación

Desde `F:\redzaweb-codex`:

```powershell
vercel --version
vercel whoami
vercel ls redzaweb-codex --scope bobo-labs-8827
```

La cuenta esperada es `bobo-labs-8827` y el proyecto esperado es `redzaweb-codex`.

## Desarrollo local

```powershell
npm.cmd install
npm.cmd run dev
```

Abre `http://localhost:3000`. Para detener el servidor, usa `Ctrl+C`.

## Quality gate

```powershell
npm.cmd run lint
npm.cmd run build
```

No publiques si alguno de los dos comandos falla. El build actual es estático: `/`, `/robots.txt` y `/sitemap.xml` se prerenderizan durante `next build`.

## Preview y producción

Preview, para revisar antes de hacer público:

```powershell
vercel deploy --scope bobo-labs-8827
```

Producción, solo después de pasar el checklist:

```powershell
vercel deploy --prod --scope bobo-labs-8827
```

También se puede usar `vercel --prod`. El alias estable se asigna automáticamente al nuevo deployment cuando termina correctamente.

Inspección y logs:

```powershell
vercel inspect <deployment-url> --scope bobo-labs-8827
vercel logs <deployment-url> --scope bobo-labs-8827
```

Para verificar una URL protegida por Deployment Protection, usa `vercel curl`; no copies ni publiques el token de bypass que el CLI pueda generar.

## Rollback de emergencia

Si una publicación rompe la experiencia:

```powershell
vercel rollback <deployment-url-or-id> --scope bobo-labs-8827
```

Para volver a promover un deployment conocido:

```powershell
vercel promote <deployment-url-or-id> --scope bobo-labs-8827
```

Después de un rollback, confirma que la asignación de producción y los futuros deploys vuelvan a estar activos. El rollback recupera un deployment previo; no recompila variables de entorno nuevas.

## Dominio `www.redza.cl`

Cuando se decida migrar el dominio desde Railway a Vercel:

1. Añade el dominio desde Project → Settings → Domains.
2. Revisa los registros DNS que Vercel indique para `redza.cl` y `www.redza.cl`.
3. Verifica:

```powershell
vercel domains inspect www.redza.cl --scope bobo-labs-8827
```

4. Comprueba HTTPS, redirección entre apex y `www`, enlaces de WhatsApp, canonical y sitemap.
5. Solo después considera `https://www.redza.cl` como URL pública principal.

El sitio usa `https://redzaweb-codex.vercel.app` como dirección pública por defecto. Cuando el dominio propio ya sirva la web por HTTPS, configura `SITE_URL=https://www.redza.cl` en el entorno de producción y vuelve a desplegar. El canonical, los enlaces de vista previa y el sitemap comparten esa dirección.

## Variables de entorno

El sitio no necesita variables de entorno hoy. Si se agrega analítica, un CMS o una integración:

```powershell
vercel env ls --scope bobo-labs-8827
vercel env add NOMBRE production --scope bobo-labs-8827
vercel env pull .env.local --scope bobo-labs-8827
```

Nunca commits `.env`, `.env.local`, tokens, claves privadas ni URLs con secretos. Después de cambiar una variable de producción, vuelve a desplegar para que el build la reciba.

## GitHub y auto-deploy

La conexión automática a `bobo-labs/redza-website` no quedó habilitada porque la integración de Vercel no pudo acceder al repositorio. Para activarla, la cuenta de GitHub debe autorizar a Vercel para ese repositorio y luego se puede conectar desde Project → Settings → Git. Cuando esté conectado, cada push a la rama de producción podrá crear un deployment según la configuración del proyecto.

Mientras tanto, el flujo oficial es el deploy manual desde esta carpeta.

## Referencias oficiales

- [Vercel deploy desde CLI](https://vercel.com/docs/cli/deploy)
- [Deploy de un proyecto desde CLI](https://vercel.com/docs/projects/deploy-from-cli)
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings)
- [Variables de entorno](https://vercel.com/docs/environment-variables)
- [Promoting Deployments](https://vercel.com/docs/deployments/promoting-a-deployment)
- [Rollback CLI](https://vercel.com/docs/cli/rollback)
