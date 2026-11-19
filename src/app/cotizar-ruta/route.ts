import { chileRegions, originName } from '../chileRegions';
import { quoteLink } from '../service-links';

// Native form submission also works before hydration and without JavaScript.
export function GET(request: Request) {
  const url = new URL(request.url);
  const from = originName(url.searchParams.get('origen'));
  const to = chileRegions.find(r => r.id === url.searchParams.get('destino'))?.name;
  const location = from && to
    ? quoteLink(`Hola Redza, necesito cotizar una entrega.\nOrigen: ${from}.\nRegión de destino: ${to}.\nComuna de retiro: \nComuna de entrega: \nTipo de carga: \nFecha: `)
    : '/#cobertura';
  return new Response(null, { status: 303, headers: { Location: location, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}
