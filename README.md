# WTFaaS — What The Fuck as a Service

Something broke, somebody needs an answer, the meeting is in four minutes, and lorem ipsum is not helping.

```sh
curl https://wtfaas.dev/wtf/http/502
```

WTFaaS is a dependency-light Cloudflare Worker that returns small, useful answers for technical explanations, excuses, decisions, statuses, acknowledgements, blame, ETAs, reasons, and fictional placeholder fixtures.

| Module | Example |
| --- | --- |
| WTF | `/wtf/http/502`, `/wtf/cors` |
| Excuse | `/excuse/deploy` |
| Decide | `/decide?choices=ship,wait,rollback` |
| Status / Ack | `/status/investigating`, `/ack/received` |
| Blame / ETA | `/blame/outage`, `/eta/software?estimate=2d` |
| Reason / Placeholder | `/reason/delay`, `/placeholder/ecommerce/product` |

JSON is the default. Send `Accept: text/plain`, `Accept: text/html`, or add `?format=text` / `?format=html`. Seed any generated route for reproducible results: `?seed=demo`. Seeded responses are cacheable; unseeded ones are not.

## Local development

```sh
npm install
npm run dev
npm run check
```

`npm run corpus` validates `categories/*/*.txt` and compiles them to `src/generated/corpus.ts`; never edit the generated file directly. Each utility has a directory and each category has a text file following SignaaS's header and one-response-per-line format. See the [corpus contribution guide](categories/README.md) for examples and structured blame fields.

## Deployment

Set the production domain in Cloudflare, then run `npm run deploy`. `wrangler.jsonc` supplies the public origin and a default rate limit. Add optional `RATE_LIMIT_KV` and `DB` bindings in your deployment configuration: KV enables anonymous per-hour rate limiting; D1 enables non-blocking aggregate counters using `migrations/0001_counters.sql`. Neither binding is required for the API to work.

The API accepts only GET, HEAD, and OPTIONS. It bounds and rejects dangerous input, escapes HTML output, sends restrictive headers, and does not require an external runtime service.

MIT License.
