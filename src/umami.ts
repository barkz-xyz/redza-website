// Server/build configuration only. Unconfigured, development and preview builds fail closed.
export function umamiConfig(env: NodeJS.ProcessEnv) {
  const id = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  if (env.NODE_ENV !== 'production' || env.VERCEL_ENV !== 'production' || !id) return null;
  // Optional override only for a separate self-hosted lab. Cloud uses two origins.
  const selfHosted = env.UMAMI_ORIGIN?.trim();
  const upstream = new URL(selfHosted || 'https://cloud.umami.is');
  const site = new URL(env.SITE_URL || 'https://redzaweb-codex.vercel.app');
  if (upstream.protocol !== 'https:' || upstream.origin === site.origin ||
      upstream.username || upstream.password || upstream.pathname !== '/' || upstream.search || upstream.hash) {
    throw new Error('UMAMI_ORIGIN must be a separate HTTPS origin, without credentials, path or query.');
  }
  if (site.protocol !== 'https:' || site.hostname === 'localhost' || !site.hostname.includes('.') || /^[\d.]+$/.test(site.hostname)) {
    throw new Error('SITE_URL must identify the public HTTPS production domain.');
  }
  return {
    id,
    scriptUrl: upstream.origin + '/script.js',
    collectUrl: (upstream.origin === 'https://cloud.umami.is' ? 'https://gateway.umami.is' : upstream.origin) + '/api/send',
    hostname: site.hostname,
  };
}
