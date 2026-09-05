import { describe, expect, it } from 'vitest';
import worker from '../src/index';
import { website } from '../src/website';

const env = {} as any;
const ctx = { waitUntil: () => {}, passThroughOnException: () => {}, props: {} } as unknown as ExecutionContext;
async function get(path:string, headers?:HeadersInit) { return worker.fetch(new Request(`https://wtfaas.dev${path}`, { headers }), env, ctx); }

describe('WTFaaS API', () => {
  it('resolves corpus aliases to the same seeded category', async () => {
    const canonical = await get('/ack/received?seed=contribution');
    const alias = await get('/ack/receipt?seed=contribution');
    expect(await canonical.text()).toBe(await alias.text());
  });
  it('samples a live, random endpoint into the homepage hero', async () => {
    const bodies = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const r = await get('/', { Accept: 'text/html' });
      const body = await r.text();
      const path = /curl https:\/\/wtfaas\.dev(\/[^<]*)<br>/.exec(body)?.[1];
      expect(path).toBeTruthy();
      // Confirm the hero didn't just template the path — it ran the request for real.
      const live = await get(path! + (path!.includes('?') ? '&' : '?') + 'format=json');
      const expected = JSON.stringify(await live.json(), null, 2).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, '<br>');
      expect(body).toContain(expected.slice(0, 40));
      bodies.add(path!);
    }
    // Different endpoint across enough reloads, not one path templated in forever.
    expect(bodies.size).toBeGreaterThan(1);
  });
  it('serves the homepage as a document, not escaped source', async () => { const r=await get('/',{Accept:'text/html'}); const body=await r.text(); expect(r.headers.get('content-type')).toContain('text/html'); expect(body).toContain('<main>'); expect(body).not.toContain('&lt;html'); });
  it('explains HTTP errors', async () => { const r=await get('/wtf/http/502'); expect(r.status).toBe(200); expect(((await r.json()) as {name:string}).name).toBe('Bad Gateway'); });
  it('negotiates text and supports HEAD', async () => {
    const path='/ack/received?seed=negotiation';
    const json=await (await get(path)).json() as { message: string };
    const text=await get(path,{Accept:'text/plain'});
    expect(text.headers.get('content-type')).toContain('text/plain');
    expect(await text.text()).toBe(json.message);
    const head=await worker.fetch(new Request('https://wtfaas.dev'+path,{method:'HEAD'}),env,ctx);
    expect(await head.text()).toBe('');
  });
  it('is deterministic with a seed', async () => { const [a,b]=await Promise.all([get('/excuse/deploy?seed=repeat'),get('/excuse/deploy?seed=repeat')]); expect(await a.text()).toBe(await b.text()); });
  it('validates unknown and malformed values', async () => { expect((await get('/blame/printer')).status).toBe(404); expect((await get('/eta/software?estimate=tomorrow')).status).toBe(400); expect((await get('/decide?choices=one')).status).toBe(400); });
  it('escapes supplied input in HTML', async () => { const r=await get('/decide?choices=%3Cscript%3Ealert(1)%3C%2Fscript%3E,okay&format=html'); expect(await r.text()).not.toContain('<script>alert'); });
  it('documents only wtf lookups that actually resolve', async () => {
    const links = [...website({ path: '/wtf/http/502', body: '{}' }).matchAll(/class="chip" href="([^"]+)"/g)].map(m => m[1]);
    expect(links.length).toBeGreaterThan(20);
    for (const link of links) expect([link, (await get(link)).status]).toEqual([link, 200]);
  });
  it('wires every explorer tab to a panel and a working example', async () => {
    const page = website({ path: '/wtf/http/502', body: '{}' });
    const tabs = [...page.matchAll(/id="t-([a-z]+)" data-run="([^"]+)"/g)];
    expect(tabs).toHaveLength(9);
    for (const [, id, run] of tabs) {
      expect(page).toContain(`id="p-${id}"`);
      expect(page).toContain(`#t-${id}:checked~.panes #p-${id}`);
      expect([run, (await get(run)).status]).toEqual([run, 200]);
    }
  });
  it('ships a homepage script that parses', () => {
    const page = website({ path: '/wtf/http/502', body: '{}' });
    const script = page.slice(page.indexOf('<script>') + 8, page.indexOf('</script>'));
    // A template literal drops unknown escapes, so a regex written into one can arrive broken.
    expect(() => new Function(script)).not.toThrow();
    expect(script).toContain('preventDefault');
  });
  it('has discovery endpoints and method policy', async () => { expect((await get('/modules')).status).toBe(200); expect((await get('/openapi.json')).status).toBe(200); expect((await get('/health')).status).toBe(200); const r=await worker.fetch(new Request('https://wtfaas.dev/health',{method:'POST'}),env,ctx); expect(r.status).toBe(405); });
});
