import assert from 'node:assert/strict';
import test from 'node:test';
import { umamiConfig } from '../src/umami.ts';
import { forwardEvent } from '../src/umami-collector.ts';

const env = { NODE_ENV: 'production', VERCEL_ENV: 'production', NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'test-id', SITE_URL: 'https://redza.example' };
const config = umamiConfig(env);
const event = { type: 'event', payload: { website: config.id, hostname: config.hostname, url: '/' } };
function request(headers = {}, body = event) {
  return new Request(env.SITE_URL + '/stats/api/send', { method: 'POST', body: JSON.stringify(body), headers: {
    host: config.hostname, origin: env.SITE_URL, 'content-type': 'application/json',
    'user-agent': 'Test Android', 'x-vercel-forwarded-for': '203.0.113.7', ...headers,
  } });
}

test('development, preview and missing ID never enable the tracker', () => {
  for (const overrides of [{ NODE_ENV: 'development' }, { VERCEL_ENV: 'development' },
    { VERCEL_ENV: 'preview' }, { VERCEL_ENV: undefined }, { NEXT_PUBLIC_UMAMI_WEBSITE_ID: '' }]) {
    assert.equal(umamiConfig({ ...env, ...overrides }), null);
  }
});

test('with DNT, forwards only the Vercel visitor IP and tracker metadata; preserves the response', async () => {
  for (const ip of ['203.0.113.7', '2001:db8::7']) {
    const req = request({ dnt: '1', cookie: 'private=true', authorization: 'private',
      'x-vercel-forwarded-for': ip, 'x-forwarded-for': '192.0.2.1', 'x-umami-cache': 'test-cache' });
    const response = await forwardEvent(req, config, async (url, init) => {
      assert.equal(url, 'https://gateway.umami.is/api/send');
      assert.equal(init.headers.get('x-forwarded-for'), ip);
      assert.equal(init.headers.get('user-agent'), 'Test Android');
      assert.equal(init.headers.get('x-umami-cache'), 'test-cache');
      assert.ok(!init.headers.has('cookie') && !init.headers.has('authorization'));
      assert.deepEqual(JSON.parse(init.body), event);
      return Response.json({ cache: 'next' });
    });
    assert.deepEqual(await response.json(), { cache: 'next' });
  }
});

test('rejects aliases, other origins, missing or ambiguous IPs and mismatched events before forwarding', async () => {
  for (const [headers, body, status] of [
    [{ host: 'localhost' }, event, 403], [{ origin: 'https://preview.example' }, event, 403],
    [{ 'x-vercel-forwarded-for': '', 'x-forwarded-for': '192.0.2.1' }, event, 400],
    [{ 'x-vercel-forwarded-for': '192.0.2.1, 192.0.2.2' }, event, 400],
    [{}, { ...event, payload: { ...event.payload, website: 'other' } }, 400],
    [{}, { ...event, payload: { ...event.payload, ip: '192.0.2.1' } }, 400],
    [{}, 'x'.repeat(17_000), 413],
  ]) {
    const response = await forwardEvent(request(headers, body), config, () => assert.fail('unexpected upstream request'));
    assert.equal(response.status, status);
  }
});
