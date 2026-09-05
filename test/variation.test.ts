import { describe, expect, it } from 'vitest';
import worker from '../src/index';
import { corpus } from '../src/generated/corpus';

const ctx = { waitUntil() {} } as unknown as ExecutionContext;
async function get(path:string, seed:string) {
  const url=new URL(path,'https://wtfaas.dev');
  url.searchParams.set('seed',seed);
  const response=await worker.fetch(new Request(url),{},ctx);
  expect(response.status, url.pathname).toBe(200);
  return await response.json() as Record<string, any>;
}
const routes = Object.entries(corpus).flatMap(([collection,categories]) => {
  if (collection === 'decide') return [];
  return Object.keys(categories).map(category => ({
    path: collection.startsWith('wtf-') ? `/wtf/${collection.slice(4)}/${category}` : `/${collection}/${category}`,
    field: collection.startsWith('wtf-') ? 'wtf' : collection === 'placeholder' ? 'data' : 'message',
  }));
});

describe('every supported content option has real reply variation', () => {
  it.each(routes)('$path returns at least 20 different replies and is repeatable', async ({path,field}) => {
    const replies=new Set<string>();
    for (let i=0;i<512;i++) {
      const data=await get(path,`variation-${i}`);
      replies.add(JSON.stringify(data[field]));
    }
    expect(replies.size,path).toBeGreaterThanOrEqual(20);
    expect(await get(path,'repeat-me')).toEqual(await get(path,'repeat-me'));
  });
  it('keeps the canonical HTTP definition fixed while varying the interpretation', async () => {
    const a=await get('/wtf/http/404','a');
    const b=await get('/wtf/http/404','b');
    for (const field of ['code','name','meaning','likely_causes','try']) expect(a[field]).toEqual(b[field]);
    expect(a.code).toBe(404);
    expect(a.name).toBe('Not Found');
  });
  it('has 20 reachable replies for each binary decision outcome', async () => {
    for (const route of ['yes-no','coin']) {
      const replies:Record<string,Set<string>>={};
      for(let i=0;i<1024;i++) {
        const data=await get(`/decide/${route}`,`outcome-${i}`);
        const outcome=data.answer||data.choice;
        (replies[outcome] ||= new Set()).add(data.message);
      }
      expect(Object.keys(replies)).toHaveLength(2);
      for(const values of Object.values(replies)) expect(values.size).toBe(20);
    }
  });
  it('varies custom choice wording without inventing choices', async () => {
    const replies=new Set<string>();
    for(let i=0;i<256;i++) {
      const data=await get('/decide?choices=ship,wait,rollback',`choice-${i}`);
      expect(data.choices[data.index]).toBe(data.choice);
      replies.add(data.message);
    }
    expect(replies.size).toBeGreaterThanOrEqual(20);
  });
  it('reuses technical replies for aliases and error/acronym overlaps', async () => {
    for(const term of ['cors','dns','tls','oauth']) {
      expect((await get(`/wtf/${term}`,'alias')).wtf).toBe((await get(`/wtf/acronym/${term}`,'alias')).wtf);
    }
    for(const term of ['CORS','DNS','TLS']) expect((await get(`/wtf/error/${term}`,'alias')).wtf).toBe((await get(`/wtf/acronym/${term}`,'alias')).wtf);
  });
  it('keeps ETA arithmetic and seeded batches stable', async () => {
    for(const category of Object.keys(corpus.eta)) {
      const data=await get(`/eta/${category}?estimate=2d`,'duration');
      expect(data.normalized_seconds).toBe(172800);
      expect(data.message).toContain('2 days');
      expect(data.message).not.toContain('{estimate}');
    }
    const path='/placeholder/ecommerce/product?count=5';
    const batch=await get(path,'batch');
    expect(batch.data).toHaveLength(5);
    expect(batch).toEqual(await get(path,'batch'));
  });
  it('supports variation for explicit placeholder kinds', async () => {
    for(const kind of ['text','card','profile','product','review','issue','commit','status','article','company']) {
      const replies=new Set<string>();
      for(let i=0;i<256;i++) replies.add(JSON.stringify((await get(`/placeholder/startup/${kind}`,`kind-${i}`)).data));
      expect(replies.size,kind).toBe(20);
    }
  });
});
