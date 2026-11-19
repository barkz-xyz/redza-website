import { umamiConfig } from '@/umami';
import { forwardEvent } from '@/umami-collector';

export async function POST(request: Request) {
  const config = umamiConfig(process.env);
  if (!config || process.env.VERCEL !== '1') return new Response(null, { status: 404 });
  return forwardEvent(request, config);
}
