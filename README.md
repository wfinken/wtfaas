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

The corpus includes 2,260 entries across 113 pools, with 20 replies per supported option, including each WTF status/error/acronym, ETA category, decision outcome, and placeholder category. Technical definitions and duration arithmetic stay consistent while the wording varies. Unseeded requests can repeat by chance; use different seeds for reproducible variation. This corpus update changes the mapping of existing seeds to replies.

## Deployment

Set the production domain in Cloudflare, then run `npm run deploy`. `wrangler.jsonc` supplies the public origin and a default rate limit. The `DB` binding targets D1 database `93ca2c7c-8578-449a-84f6-d5a907ce0d64` (configuration name `wtfaas`). D1 enables non-blocking aggregate counters using `migrations/0001_counters.sql`; apply the migration with `npx wrangler d1 migrations apply DB --remote` before using the counter in production. Adding the binding does not itself run the migration. An optional `RATE_LIMIT_KV` binding enables anonymous per-hour rate limiting. Either binding may be omitted when self-hosting.

The API accepts only GET, HEAD, and OPTIONS. It bounds and rejects dangerous input, escapes HTML output, sends restrictive headers, and does not require an external runtime service.

MIT License.
