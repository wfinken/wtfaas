import { corpus, categoryMetadata } from './generated/corpus';
const metadata: Record<string, Record<string, { slug: string; name: string; description: string; aliases: readonly string[] }>> = categoryMetadata;
import { website } from './website';

export interface Env { RATE_LIMIT?: string; PUBLIC_ORIGIN?: string; API_KEYS?: string; RATE_LIMIT_KV?: KVNamespace; DB?: D1Database }
type Format = 'json' | 'text' | 'html';
import { modules, descriptions, etaCategories, placeholderCategories, placeholderDefaultKinds } from './catalog';
const catalog = corpus as unknown as Record<string, Record<string, unknown[]>>;
import { HTTP, TERMS, ERRORS } from './wtf-data';

function bad(code:string, message:string, status=400, suggestions?:string[]) { return { error: { code, message, status, ...(suggestions?.length ? {suggestions} : {}) } }; }
function clean(value:string | null, max=256) { if (!value) return ''; if (value.length > max || /[\0-\x08\x0b\x0c\x0e-\x1f\u200b-\u200f\u202a-\u202e]/.test(value)) throw new Error('INVALID_INPUT'); return value.trim(); }
function hash(s:string) {
  let h=2166136261;
  for (let i=0;i<s.length;i++) h=Math.imul(h^s.charCodeAt(i),16777619);
  // Mix the low bits too: otherwise binary choices and 20-entry reply pools correlate.
  h=Math.imul(h^(h>>>16),0x85ebca6b);
  h=Math.imul(h^(h>>>13),0xc2b2ae35);
  return (h^(h>>>16))>>>0;
}
function pick<T>(items:T[], seed:string, namespace:string):T { const i = seed ? hash(`${seed}:${namespace}`) % items.length : crypto.getRandomValues(new Uint32Array(1))[0] % items.length; return items[i]; }
function formatFor(request:Request):Format | null { const v=new URL(request.url).searchParams.get('format'); if (v) return v==='json'||v==='text'||v==='html' ? v : null; const accept=request.headers.get('accept') || ''; return accept.includes('text/html')?'html':accept.includes('text/plain')?'text':'json'; }
function escapeHtml(s:string) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!)); }
function toText(data:unknown):string { if (typeof data==='string') return data; if (data && typeof data==='object') { const d=data as Record<string,unknown>; for(const k of ['message','excuse','wtf','meaning','choice','answer']) if(typeof d[k]==='string') return d[k] as string; return JSON.stringify(data, null, 2); } return String(data); }
function response(request:Request, data:unknown, status=200, module?:string):Response { const format=formatFor(request); if(!format) return response(request,bad('INVALID_FORMAT','format must be json, text, or html'),406); const seeded=Boolean(new URL(request.url).searchParams.get('seed')); const headers=new Headers({'Access-Control-Allow-Origin':'*','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control': seeded?'public, max-age=86400':'no-store'}); let body:string; if(format==='json'){headers.set('Content-Type','application/json; charset=utf-8');body=JSON.stringify(data);} else if(format==='text'){headers.set('Content-Type','text/plain; charset=utf-8');body=toText(data);} else {headers.set('Content-Type','text/html; charset=utf-8');headers.set('Content-Security-Policy',"default-src 'none'; style-src 'unsafe-inline'");body=`<!doctype html><meta charset="utf-8"><pre>${escapeHtml(toText(data))}</pre>`;} if(module) headers.set('X-WTFAAS-Module',module); return new Response(request.method==='HEAD'?null:body,{status,headers}); }
function homepageResponse(request:Request):Response { return new Response(request.method==='HEAD'?null:website(),{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'self'"}}); }
function generated(module:string, category:string, entry:unknown, seed:string, extras:Record<string,unknown>={}) { const value=typeof entry==='string'?{message:entry}:entry as Record<string,unknown>; return {module,category,...value,...extras,meta:{seed:seed||null,deterministic:Boolean(seed)}}; }
function categories(name:string){return Object.keys(catalog[name] || {});}

async function rateLimit(request:Request, env:Env):Promise<Response|undefined> { if(!env.RATE_LIMIT_KV || !env.RATE_LIMIT) return; const auth=request.headers.get('authorization')?.replace(/^Bearer\s+/i,'') || request.headers.get('x-api-key'); if(auth && env.API_KEYS?.split(',').map(x=>x.trim()).includes(auth)) return; const ip=request.headers.get('cf-connecting-ip') || 'unknown'; const hour=Math.floor(Date.now()/3600000); const key=`rl:${ip}:${hour}`, limit=Number(env.RATE_LIMIT)||100, current=Number(await env.RATE_LIMIT_KV.get(key)||0); const headers={'RateLimit-Limit':String(limit),'RateLimit-Remaining':String(Math.max(0,limit-current-1)),'RateLimit-Reset':String((hour+1)*3600)}; if(current>=limit) return new Response(JSON.stringify(bad('RATE_LIMITED','Too many requests. Please retry later.',429)),{status:429,headers:{...headers,'Content-Type':'application/json'}}); await env.RATE_LIMIT_KV.put(key,String(current+1),{expirationTtl:3700}); }

function route(request:Request):unknown { const url=new URL(request.url); let parts:string[]; try { parts=url.pathname.split('/').filter(Boolean).map(decodeURIComponent); } catch { throw new Error('INVALID_INPUT'); } const seed=clean(url.searchParams.get('seed'),128); const tone=clean(url.searchParams.get('tone'),32); const context=clean(url.searchParams.get('context'),256); const top=parts[0];
  if(!top) return website(); if(top==='health') return {ok:true,service:'wtfaas',version:'1.0.0',modules:9,entries:Object.values(catalog).reduce((n,c)=>n+Object.values(c).reduce((m,x)=>m+x.length,0),0),uptime:'edge'};
  if(top==='modules') return {modules:modules.map(id=>({id,description:descriptions[id],...(metadata[id] ? { category_details: Object.values(metadata[id]) } : {}),categories:id==='wtf'?['http','error','acronym']:id==='decide'?['yes-no','coin','choices']:id==='placeholder'?placeholderCategories:categories(id)}))};
  if(top==='openapi.json') return openapi();
  if(top==='random'){ const m=pick(['ack','status','blame','reason','excuse'],seed,'random'); const c=pick(categories(m),seed,`random:${m}`); return simple(m,c,seed,tone); }
  if(top==='wtf') return wtf(parts.slice(1),seed);
  if(top==='decide') return decide(parts.slice(1),url,seed);
  if(top==='eta') return eta(parts.slice(1),url,seed);
  if(top==='placeholder') return placeholder(parts.slice(1),url,seed);
  if(['ack','status','reason','excuse','blame'].includes(top)){const category=parts[1] || (top==='blame'?'general':''); if(!category) return bad('UNKNOWN_CATEGORY',`Choose a ${top} category.`,404,categories(top)); return simple(top,category,seed,tone,context);}
  return bad('UNKNOWN_MODULE',`Unknown module: ${top}`,404,[...modules]);
}
function simple(module:string, category:string, seed:string, tone:string, context=''){ category=Object.values(metadata[module] || {}).find(item=>item.slug===category || item.aliases.includes(category))?.slug || category; const entries=catalog[module]?.[category]; if(!entries) return bad('UNKNOWN_CATEGORY',`Unknown ${module} category: ${category}`,404,categories(module)); const entry=pick(entries,seed,`${module}:${category}:${tone}:${context}`); const extras:Record<string,unknown>={}; if(module==='ack')extras.acknowledged=category!=='rejected'; if(module==='status'){extras.state=({broken:'down',done:'complete'} as Record<string,string>)[category]||category;extras.emoji=({deploying:'🚀',investigating:'🔎',degraded:'⚠️',done:'✓'} as Record<string,string>)[category]||'•';extras.severity=category==='broken'?5:2;} if(module==='excuse'){extras.excuse=typeof entry==='string'?entry:(entry as any).message;extras.plausibility=.78;extras.follow_up_risk=.25;extras.tone=tone||'professional';delete extras.message;} if(module==='reason')extras.tone=tone||'professional'; if(module==='blame')extras.confidence=.74; return generated(module,category,entry,seed,extras); }
function reply(collection:string, category:string, seed:string, namespace:string):string {
  const entries = catalog[collection]?.[category];
  if (!entries?.length || !entries.every(entry => typeof entry === 'string')) throw new Error('Missing reply corpus');
  return pick(entries as string[], seed, namespace);
}
function wtf(parts:string[], seed:string) {
  const [kind, raw] = parts;
  if (!kind) return bad('UNKNOWN_CATEGORY','Choose http, error, acronym, or a topic.',404,['http','error','acronym']);
  const meta = { seed: seed || null, deterministic: Boolean(seed) };
  if (kind === 'http') {
    const record = HTTP[raw];
    if (!record) return bad('UNKNOWN_CODE',`Unknown HTTP status: ${raw}`,404,Object.keys(HTTP));
    return { module:'wtf', type:'http', code:Number(raw), name:record.name, meaning:record.meaning,
      wtf:reply('wtf-http',raw,seed,`wtf:http:${raw}`), likely_causes:record.causes, try:record.try, meta };
  }
  const term = (raw || kind).toUpperCase();
  const dictionary = kind === 'error' ? ERRORS : TERMS;
  const key = Object.keys(dictionary).find(key => key.toUpperCase() === term);
  if (!key) return bad('UNKNOWN_TERM',`Unknown technical term: ${term}`,404,[...Object.keys(TERMS),...Object.keys(ERRORS)]);
  const category = key.toLowerCase();
  const collection = kind === 'error' && catalog['wtf-error'][category] ? 'wtf-error' : 'wtf-acronym';
  return { module:'wtf', type:kind === 'error' ? 'error' : 'acronym', term, ...dictionary[key],
    wtf:reply(collection,category,seed,`${collection}:${category}`), meta };
}
function decide(parts:string[],url:URL,seed:string) {
  let choices:string[];
  if(parts[0]==='yes-no') choices=['yes','no'];
  else if(parts[0]==='coin') choices=['heads','tails'];
  else choices=(url.searchParams.get('choices')||parts.join(',')).split(',').map(x=>x.trim()).filter(Boolean);
  if(choices.length<2||choices.length>20||choices.some(x=>x.length>128)) return bad('INVALID_CHOICES','Provide between 2 and 20 non-empty choices.');
  const namespace = `decide:${JSON.stringify(choices)}`;
  const choice=pick(choices,seed,namespace),index=choices.indexOf(choice);
  const category=parts[0]==='yes-no'||parts[0]==='coin'?choice:'choices';
  const message=reply('decide',category,seed,namespace+':wording').replaceAll('{choice}',()=>choice);
  const meta={seed:seed||null,deterministic:Boolean(seed)};
  return parts[0]==='yes-no'
    ? {module:'decide',answer:choice,confidence:.73,message,meta}
    : {module:'decide',choices,choice,index,decided:true,message,meta};
}
function eta(parts:string[],url:URL,seed:string){const category=parts[0]||'software', allowed=etaCategories;if(!allowed.includes(category))return bad('UNKNOWN_CATEGORY',`Unknown ETA category: ${category}`,404,allowed); const input=url.searchParams.get('estimate')||'2d',m=/^(\d{1,4})(s|m|h|d|w)$/.exec(input);if(!m)return bad('INVALID_DURATION','Use one duration such as 30s, 15m, 2h, 1d, or 2w.');const amount=Number(m[1]),unit=m[2],seconds=amount*({s:1,m:60,h:3600,d:86400,w:604800} as Record<string,number>)[unit],label=`${amount} ${({s:'second',m:'minute',h:'hour',d:'day',w:'week'} as Record<string,string>)[unit]}${amount===1?'':'s'}`;const factor=category==='honest'?1:pick([1,1.5,2],seed,`eta:${category}:${input}`);return {module:'eta',category,input,normalized_seconds:seconds,stated_eta:label,interpreted_eta:factor===1?label:`${label}–${Math.ceil(amount*factor)} ${({s:'seconds',m:'minutes',h:'hours',d:'days',w:'weeks'} as Record<string,string>)[unit]}`,message:reply('eta',category,seed,`eta:${category}:${input}:wording`).replaceAll('{estimate}',label),meta:{seed:seed||null,deterministic:Boolean(seed),note:'interpreted_eta is a humorous heuristic, not a prediction.'}};}
function placeholder(parts:string[],url:URL,seed:string){const category=parts[0];if(!category||!placeholderCategories.includes(category))return bad('UNKNOWN_CATEGORY',`Unknown placeholder category: ${category||''}`,404,placeholderCategories);const kind=parts[1]||placeholderDefaultKinds[category]||'card',count=Number(url.searchParams.get('count')||1);if(!Number.isInteger(count)||count<1||count>25)return bad('INVALID_COUNT','count must be an integer from 1 to 25.'); const one=(i:number)=>placeholderOne(category,kind,seed?`${seed}:${i}`:'');const data=count===1?one(0):Array.from({length:count},(_,i)=>one(i));return {module:'placeholder',category,kind,data,meta:{seed:seed||null,deterministic:Boolean(seed)}};}
function placeholderOne(category:string,kind:string,seed:string) {
  const fixtures = corpus.placeholder[category as keyof typeof corpus.placeholder];
  const fixture = pick([...fixtures],seed,`placeholder:${category}:${kind}`);
  const name=fixture.title, description=fixture.description;
  if(category==='saas') return {eyebrow:'A place for the next step',headline:name,description,cta:'Explore the workspace'};
  if(category==='github'||kind==='issue') return {title:name,body:description,labels:['sample','needs-triage']};
  if(category==='ecommerce'||category==='products'||kind==='product') return {name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),price:89,currency:'USD',rating:4.6,review_count:218,description};
  if(kind==='profile'||category==='users') return {name,email:`fixture-${hash(name)}@example.com`,role:'Demo member',bio:description};
  if(kind==='review'||category==='reviews') return {title:name,body:description,rating:4,synthetic:true};
  if(kind==='article') return {title:name,summary:description,body:description};
  if(kind==='commit') return {subject:name,body:description};
  if(kind==='status') return {title:name,message:description,state:'example'};
  if(kind==='company') return {name,description,website:'https://example.com'};
  return {title:name,description,cta:'Learn more'};
}
function openapi(){return {openapi:'3.1.0',info:{title:'WTFaaS',version:'1.0.0',description:'Tiny answers for software and life’s tiny WTF moments.'},servers:[{url:'https://wtfaas.dev'}],paths:Object.fromEntries(['/{module}/{category}','/wtf/http/{code}','/decide','/eta/{category}','/placeholder/{category}/{kind}','/modules','/health'].map(p=>[p,{get:{summary:'WTFaaS endpoint',responses:{'200':{description:'Successful response'},'400':{description:'Invalid input'},'404':{description:'Unknown resource'},'429':{description:'Rate limited'}}}}])),components:{schemas:{Error:{type:'object',properties:{error:{type:'object',properties:{code:{type:'string'},message:{type:'string'},status:{type:'integer'}}}}}}}};}
function home(){return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WTFaaS — What The Fuck as a Service</title><meta name="description" content="A tiny developer API for WTF explanations, excuses, decisions, status updates, acknowledgments, blame, ETAs, reasons, and realistic placeholder data."><style>body{margin:0;background:#101114;color:#e9e9e6;font:16px system-ui,sans-serif}main{max-width:900px;margin:auto;padding:8vh 24px}h1{font-size:clamp(3rem,12vw,7rem);margin:0;color:#d7ff55}code,pre,input,select,button{font-family:ui-monospace,SFMono-Regular,monospace}pre{background:#191b20;padding:18px;border-radius:10px;overflow:auto}button,input,select{padding:10px;border-radius:6px;border:1px solid #555;background:#191b20;color:inherit}button{background:#d7ff55;color:#121300;font-weight:bold;cursor:pointer}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.card{border:1px solid #333;padding:14px;border-radius:8px}a{color:#d7ff55}</style><main><h1>WTFaaS</h1><h2>What The Fuck as a Service</h2><p>Tiny answers for errors, excuses, decisions, status updates, blame, ETAs, reasons, acknowledgments, and placeholder data.</p><pre>curl https://wtfaas.dev/wtf/http/502</pre><section><h2>Try it</h2><select id="m"><option>/wtf/http/502</option><option>/blame/outage</option><option>/ack/received</option><option>/placeholder/saas</option></select> <input id="seed" placeholder="optional seed"> <button id="go">Run</button><pre id="out">Pick an endpoint, then run it.</pre></section><h2>Modules</h2><div class="grid">${modules.map(m=>`<div class="card"><strong>${m}</strong><br>${descriptions[m]}<br><code>/${m}</code></div>`).join('')}</div><p><a href="/modules">/modules</a> · <a href="/openapi.json">/openapi.json</a> · <a href="/health">/health</a></p></main><script>document.querySelector('#go').onclick=async()=>{let p=document.querySelector('#m').value,s=document.querySelector('#seed').value;let r=await fetch(p+(s?'?seed='+encodeURIComponent(s):''));document.querySelector('#out').textContent=await r.text()}</script></html>`;}
export default { async fetch(request:Request, env:Env, ctx:ExecutionContext):Promise<Response>{ if(!['GET','HEAD','OPTIONS'].includes(request.method))return response(request,bad('METHOD_NOT_ALLOWED','Only GET, HEAD, and OPTIONS are supported.',405),405);if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, HEAD, OPTIONS','Access-Control-Allow-Headers':'Accept, Authorization, X-API-Key'}});try{const limited=await rateLimit(request,env);if(limited)return limited;const requestUrl=new URL(request.url);if(requestUrl.pathname==='/' && formatFor(request)==='html')return homepageResponse(request);const data=route(request);const path=requestUrl.pathname.split('/')[1];if(env.DB)ctx.waitUntil(env.DB.prepare('INSERT INTO counters(key,value) VALUES(?1,1) ON CONFLICT(key) DO UPDATE SET value=value+1').bind('requests:total').run().catch(()=>undefined));return response(request,data,((data as any)?.error?.status)||200,path);}catch(e){const data=(e as Error).message==='INVALID_INPUT'?bad('INVALID_INPUT','Input contains prohibited characters or exceeds its limit.'):bad('INTERNAL_ERROR','The machinery encountered an unexpected condition.',500);return response(request,data,(data as any).error.status);}} };
