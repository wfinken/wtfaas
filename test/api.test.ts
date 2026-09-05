import { describe, expect, it } from 'vitest';
import worker from '../src/index';

const env = {} as any;
const ctx = { waitUntil: () => {}, passThroughOnException: () => {}, props: {} } as unknown as ExecutionContext;
async function get(path:string, headers?:HeadersInit) { return worker.fetch(new Request(`https://wtfaas.dev${path}`, { headers }), env, ctx); }

describe('WTFaaS API', () => {
  it('serves the homepage as a document, not escaped source', async () => { const r=await get('/',{Accept:'text/html'}); const body=await r.text(); expect(r.headers.get('content-type')).toContain('text/html'); expect(body).toContain('<main>'); expect(body).not.toContain('&lt;html'); });
  it('explains HTTP errors', async () => { const r=await get('/wtf/http/502'); expect(r.status).toBe(200); expect(((await r.json()) as {name:string}).name).toBe('Bad Gateway'); });
  it('negotiates text and supports HEAD', async () => { const r=await get('/ack/received',{Accept:'text/plain'}); expect(await r.text()).toContain('Received'); const head=await worker.fetch(new Request('https://wtfaas.dev/ack/received',{method:'HEAD'}),env,ctx); expect(await head.text()).toBe(''); });
  it('is deterministic with a seed', async () => { const [a,b]=await Promise.all([get('/excuse/deploy?seed=repeat'),get('/excuse/deploy?seed=repeat')]); expect(await a.text()).toBe(await b.text()); });
  it('validates unknown and malformed values', async () => { expect((await get('/blame/printer')).status).toBe(404); expect((await get('/eta/software?estimate=tomorrow')).status).toBe(400); expect((await get('/decide?choices=one')).status).toBe(400); });
  it('escapes supplied input in HTML', async () => { const r=await get('/decide?choices=%3Cscript%3Ealert(1)%3C%2Fscript%3E,okay&format=html'); expect(await r.text()).not.toContain('<script>alert'); });
  it('has discovery endpoints and method policy', async () => { expect((await get('/modules')).status).toBe(200); expect((await get('/openapi.json')).status).toBe(200); expect((await get('/health')).status).toBe(200); const r=await worker.fetch(new Request('https://wtfaas.dev/health',{method:'POST'}),env,ctx); expect(r.status).toBe(405); });
});
