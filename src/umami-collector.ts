import { isIP } from 'node:net';

type Collector = { id: string; hostname: string; collectUrl: string };

export async function forwardEvent(request: Request, config: Collector, send = fetch) {
  const { headers } = request;
  if (headers.get('host') !== config.hostname ||
      headers.get('origin') !== 'https://' + config.hostname) return new Response(null, { status: 403 });
  if (headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return new Response(null, { status: 415 });
  }
  // Vercel sets this on ingress. Never fall back to client-supplied forwarding chains.
  const ip = headers.get('x-vercel-forwarded-for')?.trim();
  if (!ip || !isIP(ip)) return new Response(null, { status: 400 });

  const reader = request.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16_384) {
      await reader.cancel();
      return new Response(null, { status: 413 });
    }
    chunks.push(value);
  }
  const body = Buffer.concat(chunks).toString('utf8');
  try {
    const event = JSON.parse(body);
    if (event?.type !== 'event' || event.payload?.website !== config.id ||
        event.payload?.hostname !== config.hostname || 'ip' in event.payload) {
      return new Response(null, { status: 400 });
    }
  } catch {
    return new Response(null, { status: 400 });
  }
  const outgoing = new Headers({
    'content-type': 'application/json',
    'x-forwarded-for': ip,
    'user-agent': headers.get('user-agent') ?? '',
    'x-umami-website-id': config.id,
    'x-umami-hostname': config.hostname,
  });
  const cache = headers.get('x-umami-cache');
  if (cache) outgoing.set('x-umami-cache', cache);
  try {
    const result = await send(config.collectUrl, {
      method: 'POST', body, headers: outgoing, cache: 'no-store', redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });
    return new Response(result.body, { status: result.status, headers: {
      'cache-control': 'no-store', 'content-type': 'application/json',
    } });
  } catch {
    return new Response(null, { status: 502 });
  }
}
