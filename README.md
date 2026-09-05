# 🤯 WTFaaS — What The Fuck as a Service

[![CI](https://github.com/wfinken/wtfaas/actions/workflows/ci.yml/badge.svg)](https://github.com/wfinken/wtfaas/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflareworkers&logoColor=white)](https://workers.cloudflare.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Something broke, somebody needs an answer, the meeting is in four minutes, and lorem ipsum is not helping.**  
> **WTFaaS** is a stateless micro-API that hands back the small sentence you were about to write by hand — an error explained, an excuse, a decision, a status, a culprit, an ETA, or a screen's worth of fixture data.

---

## ⚡ TL;DR

Something returned a `502` and you would like to know whose fault that is.

```console
$ curl https://wtfaas.dev/wtf/http/502
```

```json
{
  "module": "wtf",
  "type": "http",
  "code": 502,
  "name": "Bad Gateway",
  "meaning": "The server acting as a gateway received an invalid response from an upstream server.",
  "wtf": "The gateway's helper supplied an invalid response.",
  "likely_causes": ["upstream service unavailable", "proxy or load balancer issue", "network failure"],
  "try": ["retry the request", "check upstream health", "inspect proxy logs"]
}
```

Or you are in the incident channel and someone has to say something.

```console
$ curl -H "Accept: text/plain" https://wtfaas.dev/blame/outage
```

```text
DNS remains a person of interest.
```

---

## 🧐 What is WTFaaS?

Most applications eventually need a sentence — a status line, an acknowledgment, a placeholder, a reason — and writing that sentence is somehow always your job. **WTFaaS (What The Fuck as a Service)** returns it over HTTP.

- 🧠 **No Model in the Loop**: Curated corpora and small deterministic algorithms. No inference cost, no latency tax, no invented facts.
- ⚡ **Edge-Native**: Runs on **Cloudflare Workers**. Most of a request is network latency.
- 🧰 **9 Modules, 113 Pools**: 2,260 curated replies, with at least 20 wordings behind every category the API accepts.
- 📚 **Facts Stay Fixed**: HTTP definitions and duration arithmetic never move. Only the phrasing varies.
- 🔄 **Content Negotiation**: Delivers `application/json`, `text/plain`, or `text/html`.
- 🎲 **Deterministic Seeding**: Pin any reply with `?seed=foo` for tests, screenshots, and fixtures. Seeded responses are edge-cached; unseeded ones are never cached.
- 🧭 **Self-Describing 404s**: A wrong category answers with every valid one in `error.suggestions`.
- 🧩 **Zero-Config Setup**: No external dependencies, plus optional KV rate-limiting and D1 tallying.

---

## 🚀 Quickstart & API Reference

Base URL: `https://wtfaas.dev` (or `http://localhost:8787` locally)

### 📍 Core Endpoints

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/:module/:category` | `GET` | The general shape — `/blame/outage`, `/ack/received`, `/status/deploying` |
| `/wtf/http/:code` | `GET` | Explain an HTTP status, with likely causes and things to try |
| `/wtf/error/:code` | `GET` | Explain an errno-style failure such as `ECONNRESET` or `ENOENT` |
| `/wtf/acronym/:term` | `GET` | Expand and explain jargon (`/wtf/cors` is shorthand) |
| `/decide` | `GET` | Commit to one of your options, or a coin, or yes/no |
| `/eta/:category` | `GET` | Translate a stated duration into what it tends to mean |
| `/placeholder/:category/:kind` | `GET` | Fictional fixture data shaped like the real thing |
| `/random` | `GET` | A reply from a random message module (`ack`, `status`, `blame`, `reason`, `excuse`) |
| `/modules` | `GET` | JSON catalogue of all 9 modules, categories, and aliases |
| `/openapi.json` | `GET` | Full OpenAPI 3.1 schema specification |
| `/health` | `GET` | Liveness probe & live counts (modules, corpus entries) |
| `/` | `GET` | Interactive module explorer & docs (or JSON index via `Accept: application/json`) |

---

### 🎛️ Query Parameters

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `seed` | `string` | Deterministic reply selector (edge-cached 24h) | `?seed=ticket-4091` |
| `format` | `string` | Output format: `json`, `text`, or `html` (overrides `Accept`) | `?format=text` |
| `tone` | `string` | Shifts the wording; echoed back by `excuse` and `reason` | `?tone=apologetic` |
| `context` | `string` | Shifts the wording without appearing in the response | `?context=third-outage` |
| `choices` | `string` | `decide` only. Two to twenty comma-separated options | `?choices=ship,wait,rollback` |
| `estimate` | `string` | `eta` only. One duration: `30s`, `15m`, `2h`, `1d`, `2w` | `?estimate=2d` |
| `count` | `integer` | `placeholder` only. 1–25 items | `?count=12` |

---

### 🎨 Content Negotiation & Formats

WTFaaS speaks whatever your application prefers. Use standard `Accept` headers or pass `?format=`:

#### 1. JSON (Default)
```console
$ curl "https://wtfaas.dev/decide?choices=ship,wait,rollback"
```
```json
{
  "module": "decide",
  "choices": ["ship", "wait", "rollback"],
  "choice": "wait",
  "index": 1,
  "decided": true,
  "message": "Choose wait. The alternatives have been considered by a small algorithm."
}
```

#### 2. Plain Text (`Accept: text/plain` or `?format=text`)
```console
$ curl -H "Accept: text/plain" "https://wtfaas.dev/excuse/deploy?tone=apologetic"
```
```text
The rollout is waiting for the service to become healthy.
```

#### 3. HTML (`Accept: text/html` or `?format=html`)
```console
$ curl -H "Accept: text/html" "https://wtfaas.dev/wtf/cors"
```
```html
<!doctype html><meta charset="utf-8"><pre>The browser is enforcing a boundary between website origins.</pre>
```

Every reply also carries a `meta` object echoing the seed and whether the response is reproducible.

---

## 🧰 Module Catalog

Nine modules, each with its own categories. Sample wording below; every category holds at least 20 alternatives, so your response will differ unless you pass a seed.

| Module | Categories | Example | Sample Reply |
| :--- | :---: | :--- | :--- |
| 🧯 **`wtf`** | 25 | `/wtf/http/502` | *"The gateway's helper supplied an invalid response."* |
| 🙈 **`excuse`** | 14 | `/excuse/deploy` | *"The rollout is waiting for the service to become healthy."* |
| 🎲 **`decide`** | 3 forms | `/decide?choices=ship,wait` | *"Choose wait. The alternatives have been considered by a small algorithm."* |
| 📟 **`status`** | 11 | `/status/investigating` | *"Narrowing the scope before choosing a fix."* |
| 📬 **`ack`** | 10 | `/ack/received` | *"Received and placed with the related work."* |
| 🕵️ **`blame`** | 11 | `/blame/outage` | *"DNS remains a person of interest."* |
| ⏳ **`eta`** | 9 | `/eta/software?estimate=2d` | *"2 days, before anyone says it also needs an export button."* |
| 📝 **`reason`** | 11 | `/reason/delay` | *"The schedule is being adjusted to account for unresolved work."* |
| 🧪 **`placeholder`** | 17 | `/placeholder/ecommerce/product` | `Signal Field Notebook` · `$89` · `4.6★` |

Some modules add structured fields alongside the sentence: `blame` names a `culprit` and a diagnostic `check`, `status` carries `state` and `severity`, `eta` returns `normalized_seconds` and an `interpreted_eta`, and `placeholder` returns an object at `count=1` and an array above it.

Fetch the live, complete catalog anytime:
```console
$ curl https://wtfaas.dev/modules
```

Or open [wtfaas.dev](https://wtfaas.dev) and use the module explorer, where every category is a link that runs the request in the page.

---

## 💻 Running Locally

### 📋 Prerequisites

- **Node.js**: v22+
- **npm**: v10+

### 🛠️ Setup & Dev Server

```bash
# 1. Clone the repository
git clone https://github.com/wfinken/wtfaas.git
cd wtfaas

# 2. Install dependencies (automatically compiles the reply corpus)
npm install

# 3. Start local development server on http://localhost:8787
npm run dev
```

Test it in your terminal:
```console
$ curl http://localhost:8787/wtf/error/ECONNRESET
```

---

## 🧪 Testing & Quality Checks

The suite covers corpus integrity, reply variety, input sanitization, content negotiation, routing, and the homepage — including a check that compiles the page's inline script, because HTML assertions pass happily on a script that never parsed.

```bash
# Run Vitest test suite
npm test

# Run TypeScript type check
npm run typecheck

# Run both in one step
npm run check

# Rebuild and validate the corpus independently
npm run corpus
```

---

## ✍️ Adding Categories & Replies

The whole corpus lives as plain text in [`categories/`](categories), one directory per module. Adding a category — or a better line to an existing one — requires **zero TypeScript changes**:

1. Create or edit `categories/<module>/<category>.txt`:
   ```text
   Received
   description: Acknowledgments that a message has arrived.
   aliases: receipt

   Received. It has entered the machinery.
   Received and placed with the related work.
   … 18 more, one per line
   ```
2. Run `npm run corpus` (validates duplicates and formatting, then compiles to `src/generated/corpus.ts` — never edit that file directly), then `npm test`, which enforces the 20-reply minimum.
3. Open a Pull Request! See the [corpus guide](categories/README.md) for the `blame` and `placeholder` pipe-field formats.

Modules have their own directories because category names such as `done` and `deploy` occur in several of them.

---

## 🛡️ Security & Input Sanitization

- **Character Sanitization**: Path segments and query parameters are stripped of control codes, zero-width spaces, and bidirectional overrides.
- **Length Caps**: Inputs are bounded — 128 characters for seeds, 256 for context, 32 for tone — to prevent blowout.
- **HTML Escaping**: All dynamic values in HTML responses escape `&`, `<`, `>`, `"`, and `'`, under a `default-src 'none'` policy.
- **HTTP Methods**: Only `GET`, `HEAD`, and `OPTIONS` are supported; everything else returns `405 Method Not Allowed`.
- **No Runtime Dependencies**: Nothing is fetched at request time, so there is no external service to compromise or wait for.

---

## ⚙️ Cloudflare Bindings (Optional)

WTFaaS works out of the box with zero configuration. For production scale, you can optionally enable KV and D1 bindings:

- **Rate Limiting (KV)**: Bound as `RATE_LIMIT_KV` in `wrangler.jsonc` to enforce hourly limits (100 req/hr/IP by default). API keys set via the `API_KEYS` secret bypass this.
  ```bash
  npx wrangler kv namespace create RATE_LIMIT_KV
  ```
- **Live Counter (D1)**: Bound as `DB` in `wrangler.jsonc` to tally total requests served.
  ```bash
  npx wrangler d1 create wtfaas
  npx wrangler d1 migrations apply DB --remote
  ```
  Adding the binding does not run the migration — apply `migrations/0001_counters.sql` before relying on the counter in production.

---

## 🚢 Deployment

Merges to `main` deploy automatically to [wtfaas.dev](https://wtfaas.dev) via Cloudflare's GitHub integration. To deploy your own copy:

```bash
npm run deploy
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
