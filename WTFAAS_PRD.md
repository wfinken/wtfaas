# WTFaaS.dev — Product Requirements Document

**Working title:** WTFaaS  
**Domain:** `https://wtfaas.dev`  
**Tagline:** **What The Fuck as a Service**  
**Secondary description:** Tiny answers for life's and software's tiny WTF moments.  
**Status:** Initial implementation PRD  
**Target platform:** Cloudflare Workers  
**Reference implementation:** `wfinken/signaas`  
**Primary implementation language:** TypeScript  
**Audience for this document:** Codex / implementation agent / maintainers

---

## 1. Executive Summary

WTFaaS is a fast, stateless, humorous-but-useful HTTP API that provides compact human-friendly responses for common moments of ambiguity, failure, awkwardness, delay, indecision, and placeholder-content need.

It combines several narrowly useful "as a Service" concepts into one coherent product:

- **WTF** — explain an error, HTTP status, acronym, or confusing situation
- **Excuse** — provide an excuse appropriate to a scenario
- **Decide** — make a decision among choices or answer yes/no
- **Status** — generate a human-readable status message
- **Ack** — acknowledge receipt, understanding, or action
- **Blame** — identify a plausible culprit for a problem
- **ETA** — express or reinterpret an estimated time of arrival/completion
- **Reason** — provide a concise reason for an action, delay, cancellation, or refusal
- **Placeholder** — generate context-specific placeholder copy or structured fixture data

The product should feel like a developer utility first and a joke second.

The joke gets people to try it.  
The usefulness gets them to keep it in scripts, bots, demos, tests, sample apps, agents, status pages, documentation, and internal tooling.

The API should be:

- callable with a single `curl`
- usable without authentication for low-volume traffic
- deterministic when requested
- cache-friendly
- content-negotiated
- safe to embed
- documented by OpenAPI
- dependency-light
- easy to self-host
- cheap to operate globally on Cloudflare

WTFaaS should intentionally inherit the architectural philosophy of SignaaS without becoming coupled to its codebase.

---

# 2. Product Vision

## 2.1 Core idea

There are thousands of tiny moments in software and work where a program needs a sentence, explanation, status, excuse, decision, acknowledgment, ETA, reason, culprit, or realistic placeholder.

Developers routinely hardcode these strings.

WTFaaS turns those strings into a tiny reusable API.

Examples:

```bash
curl https://wtfaas.dev/wtf/http/502
curl https://wtfaas.dev/excuse/deploy
curl https://wtfaas.dev/decide/yes-no
curl https://wtfaas.dev/status/deploying
curl https://wtfaas.dev/ack/received
curl https://wtfaas.dev/blame/outage
curl https://wtfaas.dev/eta/software?estimate=2d
curl https://wtfaas.dev/reason/cancel
curl https://wtfaas.dev/placeholder/startup
```

WTFaaS should be useful enough that a developer can justify adding it to a demo or tool, while absurd enough that sending someone a WTFaaS URL is itself funny.

---

# 3. Product Principles

## 3.1 Useful before random

Randomness is allowed, but every endpoint must return something that is useful within its domain.

Bad:

```json
{
  "message": "Mercury is in retrograde."
}
```

Good:

```json
{
  "culprit": "DNS",
  "message": "It is probably DNS. It is always worth checking DNS.",
  "confidence": 0.74
}
```

The response may be funny, but it should still carry meaning.

## 3.2 One-request delight

Every meaningful feature should be discoverable and usable with one GET request.

No mandatory API key.  
No account creation.  
No SDK required.

## 3.3 Structured enough for software

Default JSON responses should expose semantic fields, not merely prose.

For example, `/decide` should return a `choice`; `/eta` should return normalized duration information when possible; `/wtf/http/502` should return the canonical HTTP status meaning as well as a humorous explanation.

## 3.4 Human-friendly enough for terminals

Every content endpoint must support plain text so this works naturally:

```bash
curl -H "Accept: text/plain" https://wtfaas.dev/blame/deploy
```

## 3.5 Deterministic on demand

Any endpoint with multiple possible responses must accept:

```text
?seed=<string>
```

The same logical request plus the same seed must produce the same response for a stable corpus version.

This is important for:

- tests
- screenshots
- documentation
- demos
- generated fixtures
- cacheability
- repeatable agent behavior

## 3.6 Stateless by default

Core request handling should require no database.

Optional infrastructure may provide:

- request counting
- rate limiting
- aggregate usage statistics

A missing KV or D1 binding must not make the product unusable.

## 3.7 Personality without dependency on AI

Version 1 must not require an LLM or external generation API.

Content should come from:

- curated corpora
- deterministic templates
- small algorithms
- built-in dictionaries / metadata

Benefits:

- fast
- cheap
- predictable
- privacy-preserving
- cacheable
- resilient

An LLM-powered optional endpoint can be considered later.

---

# 4. Target Users

## 4.1 Developers

Primary audience.

Use cases:

- CLI scripts
- bots
- demo applications
- test fixtures
- CI/CD messages
- hackathons
- internal tools
- documentation examples
- HTTP API tutorials
- webhook demos
- agent tools
- status dashboards

## 4.2 Designers and frontend developers

Especially for `/placeholder`.

Use cases:

- mockups
- Storybook
- design prototypes
- seeded demo data
- screenshot testing
- sample dashboards
- fake product copy

## 4.3 Automation and bot authors

Use cases:

- Slack/Discord bots
- GitHub Actions
- status notifications
- autoresponders
- workflow orchestration
- AI-agent tool calls

## 4.4 Humans with curl

A meaningful percentage of users should simply visit or curl WTFaaS for amusement.

That is a feature, not noise.

---

# 5. Naming and Brand

## 5.1 Name

**WTFaaS**

Expansion:

> **What The Fuck as a Service**

Where a less explicit rendering is preferable:

> **WTF as a Service**

The homepage may use the expanded phrase prominently, but metadata and documentation should allow a PG-ish presentation.

## 5.2 Domain

Canonical origin:

```text
https://wtfaas.dev
```

Optional redirect:

```text
https://www.wtfaas.dev → https://wtfaas.dev
```

## 5.3 Voice

The product voice should be:

- dry
- concise
- technically literate
- slightly exasperated
- playful
- never mean to the caller
- never excessively edgy
- not meme-spam
- useful even with the joke removed

Examples:

Good:

> The upstream server has stopped cooperating.

Good:

> DNS remains a person of interest.

Good:

> Estimated completion: Thursday, assuming Thursday behaves.

Avoid:

> LOL ur code sucks bro 😂😂😂

Avoid excessive profanity in generated content. The brand contains WTF; responses do not need to swear constantly.

---

# 6. Information Architecture

The API is organized around **modules**.

Version 1 modules:

```text
/wtf
/excuse
/decide
/status
/ack
/blame
/eta
/reason
/placeholder
```

System endpoints:

```text
/
/modules
/openapi.json
/health
```

Optional compatibility endpoint:

```text
/random
```

`/random` may select a safe random module and response for discovery, but should not be central to the API.

---

# 7. Global API Behavior

## 7.1 HTTP methods

Supported:

- `GET`
- `HEAD`
- `OPTIONS`

Unsupported methods return:

```http
405 Method Not Allowed
Allow: GET, HEAD, OPTIONS
```

No mutation endpoint is required in v1.

## 7.2 Content negotiation

All primary content endpoints should support:

### JSON

Default.

```http
Accept: application/json
```

### Plain text

```http
Accept: text/plain
```

### HTML fragment or minimal HTML

```http
Accept: text/html
```

Query override:

```text
?format=json
?format=text
?format=html
```

`format` takes precedence over `Accept`.

## 7.3 Global query parameters

Where relevant:

| Parameter | Type | Purpose |
|---|---|---|
| `seed` | string | deterministic selection |
| `format` | enum | `json`, `text`, `html` |
| `tone` | string | optional tone modifier |
| `severity` | integer 1-5 | intensity / directness |
| `context` | string | short caller-provided context |
| `count` | integer | number of generated items where supported |

Input lengths must be bounded.

Recommended limits:

- path segment: 64 chars
- `seed`: 128 chars
- `context`: 256 chars
- choice item: 128 chars
- total URL: rely on Cloudflare limits but validate application inputs

## 7.4 Standard metadata

JSON responses SHOULD use a common envelope shape when it does not make the module awkward:

```json
{
  "module": "blame",
  "category": "deploy",
  "result": {
    "culprit": "DNS",
    "message": "DNS remains a person of interest."
  },
  "meta": {
    "seed": null,
    "deterministic": false
  }
}
```

However, do not force every endpoint into an overly generic schema.

Module-specific fields are preferred over a useless universal `message` field.

## 7.5 Error shape

All API errors return:

```json
{
  "error": {
    "code": "UNKNOWN_CATEGORY",
    "message": "Unknown blame category: printer",
    "status": 404
  }
}
```

Optional:

```json
{
  "error": {
    "code": "UNKNOWN_CATEGORY",
    "message": "Unknown blame category: printer",
    "status": 404,
    "suggestions": ["deploy", "outage", "network"]
  }
}
```

Errors must also negotiate to text/plain.

---

# 8. Module: WTF

## 8.1 Purpose

Explain confusing technical things in two layers:

1. factual / canonical explanation
2. concise WTFaaS interpretation

Initial namespaces:

```text
/wtf/http/:code
/wtf/error/:code
/wtf/acronym/:term
/wtf/:topic
```

## 8.2 HTTP status codes

Examples:

```bash
curl https://wtfaas.dev/wtf/http/418
curl https://wtfaas.dev/wtf/http/404
curl https://wtfaas.dev/wtf/http/502
```

Response:

```json
{
  "module": "wtf",
  "type": "http",
  "code": 502,
  "name": "Bad Gateway",
  "meaning": "The server acting as a gateway received an invalid response from an upstream server.",
  "wtf": "The server asked another server for help. That server answered incorrectly.",
  "likely_causes": [
    "upstream service unavailable",
    "proxy or load balancer issue",
    "network failure",
    "timeout or malformed upstream response"
  ],
  "try": [
    "retry the request",
    "check upstream health",
    "inspect proxy and gateway logs"
  ]
}
```

Humor may appear in `wtf`, but `meaning`, `likely_causes`, and `try` should remain technically defensible.

## 8.3 Common error codes

Initial set may include:

```text
ECONNRESET
ECONNREFUSED
ETIMEDOUT
ENOTFOUND
EADDRINUSE
EACCES
ENOENT
SIGTERM
SIGKILL
OOM
CORS
CSRF
TLS
DNS
```

Example:

```bash
curl https://wtfaas.dev/wtf/error/ECONNRESET
```

## 8.4 Acronyms

Initial developer-focused acronyms:

```text
CORS
CSRF
JWT
DNS
TLS
TCP
UDP
HTTP
REST
RPC
ORM
CI
CD
SLA
SLO
RTO
RPO
SSO
OIDC
OAuth
```

Example response:

```json
{
  "term": "CORS",
  "expansion": "Cross-Origin Resource Sharing",
  "meaning": "A browser security mechanism controlling whether one origin can access resources from another.",
  "wtf": "The browser is asking whether this website is allowed to talk to that website.",
  "common_mistake": "Trying to fix a server-to-server request by changing browser CORS headers."
}
```

## 8.5 Topic aliases

Convenience forms:

```text
/wtf/cors
/wtf/dns
/wtf/oauth
```

These may internally map to the acronym/error records.

## 8.6 Source integrity

Do not invent standards facts.

Canonical HTTP reason phrases and technical definitions should be stored separately from humorous templates.

---

# 9. Module: Excuse

## 9.1 Purpose

Generate a concise excuse appropriate to a scenario.

Routes:

```text
/excuse/:category
/excuse/random
```

Initial categories:

```text
late
meeting
deadline
deploy
outage
email
reply
work
school
cancel
leave-early
camera-off
missed-call
code-review
```

Example:

```bash
curl "https://wtfaas.dev/excuse/deploy?severity=2&seed=demo"
```

Response:

```json
{
  "module": "excuse",
  "category": "deploy",
  "excuse": "The deployment exposed an environment-specific issue that did not reproduce locally.",
  "plausibility": 0.88,
  "follow_up_risk": 0.31,
  "tone": "professional"
}
```

The scores are product flavor, not scientific claims.

They should be deterministic attributes attached to curated entries, not randomly fabricated decimals on each request.

## 9.2 Tone options

Suggested:

```text
professional
casual
technical
vague
honest
absurd
corporate
```

`honest` should produce truthful formulations, e.g.:

> I underestimated how long this would take.

The API should not optimize for deception. Avoid fabricated emergencies, illnesses, deaths, or accusations involving real people.

---

# 10. Module: Decide

## 10.1 Purpose

Provide lightweight decisions for programs and humans.

Routes:

```text
/decide/yes-no
/decide/:choiceA/:choiceB
/decide?choices=a,b,c
/decide/coin
```

Preferred multi-choice interface:

```text
GET /decide?choices=typescript,rust,go
```

Because arbitrary choice counts do not map elegantly into path segments.

Response:

```json
{
  "module": "decide",
  "choices": ["typescript", "rust", "go"],
  "choice": "rust",
  "index": 1,
  "decided": true
}
```

With a seed:

```text
/decide?choices=typescript,rust,go&seed=project-42
```

must always select the same item for the same normalized choices and seed.

## 10.2 Yes/no

```bash
curl https://wtfaas.dev/decide/yes-no
```

Response:

```json
{
  "answer": "yes",
  "confidence": 0.73,
  "message": "Yes. Future you can file the appeal."
}
```

`confidence` is entertainment metadata and should be clearly documented as non-scientific.

## 10.3 Weighted choices

Post-MVP or optional v1:

```text
/decide?choices=a,b,c&weights=1,3,1
```

Validate:

- count matches
- weights > 0
- max choices <= 20

---

# 11. Module: Status

## 11.1 Purpose

Generate compact status messages suitable for:

- Slack
- status pages
- CI output
- dashboards
- bots
- human updates

Routes:

```text
/status/:category
```

Initial categories:

```text
working
deploying
degraded
broken
investigating
waiting
blocked
done
offline
maintenance
friday
```

Example:

```json
{
  "module": "status",
  "category": "investigating",
  "state": "investigating",
  "message": "Investigating. We have several theories and one suspicious log line.",
  "emoji": "🔎",
  "severity": 2
}
```

The `state` field should use stable machine-readable values.

Suggested canonical states:

```text
operational
working
deploying
degraded
investigating
blocked
down
maintenance
complete
waiting
```

---

# 12. Module: Ack

## 12.1 Purpose

Provide acknowledgment messages for automation and conversational systems.

Routes:

```text
/ack/:category
```

Initial categories:

```text
received
understood
will-do
done
thanks
noted
approved
rejected
seen
begrudging
```

Example:

```json
{
  "module": "ack",
  "category": "received",
  "acknowledged": true,
  "message": "Received. It has entered the machinery."
}
```

Plain text response:

```text
Received. It has entered the machinery.
```

This is intentionally one of the simplest modules and may become one of the most practically useful.

---

# 13. Module: Blame

## 13.1 Purpose

Return a plausible culprit for a scenario.

Routes:

```text
/blame/:category
/blame
```

Initial categories:

```text
deploy
outage
network
frontend
backend
database
ci
performance
meeting
deadline
general
```

Suggested culprit pool:

```text
DNS
cache
time zones
configuration drift
stale credentials
the last deploy
an upstream dependency
a race condition
eventual consistency
the network
the database
the load balancer
a feature flag
an expired certificate
a missing environment variable
copy-pasted YAML
```

Response:

```json
{
  "module": "blame",
  "category": "outage",
  "culprit": "DNS",
  "message": "DNS remains a person of interest.",
  "confidence": 0.79,
  "check": "Verify resolution from multiple networks and inspect recent DNS changes."
}
```

`check` turns the joke into an actionable diagnostic hint.

## 13.2 Guardrail

Do not blame:

- named real individuals
- protected groups
- customers by identity
- specific companies unless the caller explicitly supplies them as neutral context and the output is framed safely

Default culprits should be systems, conditions, processes, or abstract entities.

---

# 14. Module: ETA

## 14.1 Purpose

Turn an estimate into:

- a normalized representation
- a human-friendly ETA
- optionally a humorous "realistic" interpretation

Routes:

```text
/eta/:category
/eta/:category?estimate=:duration
```

Initial categories:

```text
software
deploy
contractor
meeting
download
migration
support
manager
honest
```

Example:

```bash
curl "https://wtfaas.dev/eta/software?estimate=2d&seed=release"
```

Response:

```json
{
  "module": "eta",
  "category": "software",
  "input": "2d",
  "normalized_seconds": 172800,
  "stated_eta": "2 days",
  "interpreted_eta": "2–4 days",
  "message": "Two days, assuming nothing unexpectedly becomes interesting."
}
```

## 14.2 Duration parser

Support a deliberately small syntax:

```text
30s
15m
2h
1d
2w
```

Potential combinations can be deferred.

Invalid values return 400.

## 14.3 Important semantic rule

WTFaaS should not pretend it can predict the future.

`interpreted_eta` is a humorous heuristic.

Document it explicitly.

---

# 15. Module: Reason

## 15.1 Purpose

Provide concise language explaining why something is happening.

This is the more respectable sibling of `/excuse`.

Routes:

```text
/reason/:category
```

Initial categories:

```text
cancel
decline
delay
reschedule
leave-early
skip-meeting
reject
pause
rollback
maintenance
rate-limit
```

Example:

```json
{
  "module": "reason",
  "category": "delay",
  "message": "Additional validation is needed before we can proceed safely.",
  "tone": "professional"
}
```

Tone support:

```text
professional
concise
friendly
technical
direct
corporate
```

Difference from excuse:

- `/reason` should be suitable for legitimate communication
- `/excuse` may be playful or face-saving
- `/reason` should avoid misleading claims by default

---

# 16. Module: Placeholder

## 16.1 Purpose

Generate domain-specific placeholder copy and structured fixture data.

This module has the highest non-novelty utility ceiling and should be treated as a major feature, not filler.

Routes:

```text
/placeholder/:category
/placeholder/:category/:kind
```

Initial categories:

```text
startup
saas
ecommerce
github
status-page
blog
news
legal
medical
finance
restaurant
portfolio
dashboard
social
reviews
users
products
```

Initial kinds:

```text
text
card
profile
product
review
issue
commit
status
article
company
```

Not every category needs every kind.

## 16.2 Example: SaaS landing page

```bash
curl https://wtfaas.dev/placeholder/saas
```

```json
{
  "module": "placeholder",
  "category": "saas",
  "data": {
    "eyebrow": "Built for teams that ship",
    "headline": "Turn scattered work into visible progress",
    "description": "Keep projects, decisions, and delivery status in one place without adding another weekly meeting.",
    "cta": "Start building"
  }
}
```

## 16.3 Example: product fixture

```bash
curl "https://wtfaas.dev/placeholder/ecommerce/product?seed=shoe-1"
```

```json
{
  "module": "placeholder",
  "category": "ecommerce",
  "kind": "product",
  "data": {
    "name": "Northline Daypack",
    "slug": "northline-daypack",
    "price": 89,
    "currency": "USD",
    "rating": 4.6,
    "review_count": 218,
    "description": "A compact everyday pack with a padded laptop sleeve and weather-resistant shell."
  }
}
```

## 16.4 Count

Structured placeholder kinds should support:

```text
?count=5
```

Recommended max:

```text
25
```

Response:

```json
{
  "data": [
    {},
    {},
    {}
  ]
}
```

With `seed`, each item should derive a deterministic sub-seed:

```text
seed + ":0"
seed + ":1"
seed + ":2"
```

## 16.5 Placeholder safety

Synthetic records must avoid accidental representation of real people.

Use clearly fictional:

- names
- companies
- email domains such as `example.com`
- phone-number safe ranges where applicable

Do not generate realistic sensitive records.

---

# 17. Random / Discovery Endpoint

Optional:

```text
/random
```

Example:

```json
{
  "module": "blame",
  "category": "general",
  "result": {
    "culprit": "cache",
    "message": "There is an excellent chance somebody cached yesterday."
  }
}
```

Allow:

```text
/random?seed=foo
```

Do not choose placeholder responses requiring large payloads unless explicitly requested.

---

# 18. Module Discovery

## 18.1 `/modules`

Return machine-readable module catalog.

```json
{
  "modules": [
    {
      "id": "wtf",
      "description": "Explain confusing technical things.",
      "categories": ["http", "error", "acronym"]
    },
    {
      "id": "excuse",
      "description": "Generate an excuse for a situation.",
      "categories": ["late", "meeting", "deadline", "deploy"]
    }
  ]
}
```

Aliases may be included.

## 18.2 Module-specific discovery

Recommended:

```text
/:module
```

When requested with `Accept: application/json`, return that module's index and examples rather than generating content.

Example:

```text
GET /blame
```

could either generate `general` blame or return discovery metadata.

Pick one behavior and remain consistent.

**Recommended decision:** `/blame` means `general` blame for convenience.

Discovery remains centralized at `/modules`.

---

# 19. Homepage

`GET /` in a browser should serve an interactive developer-first homepage.

Goals:

1. explain WTFaaS in under 10 seconds
2. let a visitor try modules immediately
3. make copying a curl command effortless
4. expose API docs without a separate docs stack
5. feel technically polished and slightly ridiculous

## 19.1 Hero

Suggested copy:

> # WTFaaS
> **What The Fuck as a Service**
>
> Tiny answers for errors, excuses, decisions, status updates, blame, ETAs, reasons, acknowledgments, and placeholder data.

Primary terminal demo:

```bash
curl https://wtfaas.dev/wtf/http/502
```

## 19.2 Interactive console

Controls:

- module dropdown
- category dropdown
- optional seed
- format
- run button

Display:

- request URL
- curl command
- rendered response
- response time if easy to expose client-side

## 19.3 Module cards

Nine cards:

- WTF
- Excuse
- Decide
- Status
- Ack
- Blame
- ETA
- Reason
- Placeholder

Each contains:

- one-line purpose
- example URL
- sample output

## 19.4 Design direction

Developer-tool aesthetic.

Recommended characteristics:

- dark-first or system-aware
- monospaced details
- strong typography
- small restrained motion
- no JS framework required unless it meaningfully simplifies the code
- excellent mobile layout
- page usable with JavaScript disabled except interactive console enhancements

Do not clone the exact visual design of SignaaS.

WTFaaS should feel related philosophically, not visually identical.

---

# 20. OpenAPI

Expose:

```text
/openapi.json
```

OpenAPI version:

```text
3.1.x
```

Requirements:

- canonical server: `https://wtfaas.dev`
- tags per module
- example requests
- example responses
- shared error schema
- content negotiation documented
- seed semantics documented
- rate-limit responses documented

Because many category sets are data-driven, the OpenAPI implementation may generate schemas from the compiled corpus.

---

# 21. Health Endpoint

```text
GET /health
```

Example:

```json
{
  "ok": true,
  "service": "wtfaas",
  "version": "1.0.0",
  "modules": 9,
  "entries": 642,
  "uptime": "edge",
  "requests_served": 1234567
}
```

`requests_served` is optional and only included if D1 is configured.

Health must not fail because optional storage is absent.

Possible cache policy:

```http
Cache-Control: no-store
```

---

# 22. Corpus Architecture

WTFaaS should retain SignaaS's strong data-driven philosophy.

Do not hardcode hundreds of response strings inside route handlers.

Suggested directory:

```text
corpus/
  wtf/
    http.json
    errors.json
    acronyms.json
  excuse/
    deploy.txt
    meeting.txt
    late.txt
    ...
  status/
    deploying.txt
    investigating.txt
    ...
  ack/
    received.txt
    understood.txt
    ...
  blame/
    deploy.json
    outage.json
    ...
  eta/
    software.json
    contractor.json
    ...
  reason/
    delay.txt
    decline.txt
    ...
  placeholder/
    saas.json
    ecommerce-product.json
    github-issue.json
    ...
```

Codex may choose YAML, JSON, or enhanced text format depending on ergonomics.

Preference:

- plain text for simple line corpora
- JSON for records with metadata
- generated TypeScript for runtime use

## 22.1 Build step

Implement:

```bash
npm run corpus
```

Responsibilities:

- read source corpus
- validate syntax
- validate required fields
- reject duplicate aliases
- reject duplicate content where appropriate
- validate rating ranges
- compile into `src/generated/`
- output summary counts

Generated files should contain a header:

```ts
// AUTO-GENERATED. DO NOT EDIT.
// Run `npm run corpus`.
```

## 22.2 Runtime

Production Worker should not read filesystem corpus files.

All runtime content is compiled into the bundle.

---

# 23. Suggested Repository Structure

```text
wtfaas/
├── corpus/
│   ├── ack/
│   ├── blame/
│   ├── excuse/
│   ├── placeholder/
│   ├── reason/
│   ├── status/
│   ├── eta/
│   └── wtf/
├── migrations/
│   └── 0001_counters.sql
├── scripts/
│   └── build-corpus.mjs
├── src/
│   ├── generated/
│   │   └── corpus.ts
│   ├── modules/
│   │   ├── ack.ts
│   │   ├── blame.ts
│   │   ├── decide.ts
│   │   ├── eta.ts
│   │   ├── excuse.ts
│   │   ├── placeholder.ts
│   │   ├── reason.ts
│   │   ├── status.ts
│   │   └── wtf.ts
│   ├── config.ts
│   ├── counter.ts
│   ├── env.ts
│   ├── errors.ts
│   ├── home.ts
│   ├── index.ts
│   ├── negotiate.ts
│   ├── openapi.ts
│   ├── random.ts
│   ├── ratelimit.ts
│   ├── response.ts
│   └── sanitize.ts
├── test/
│   ├── api.test.ts
│   ├── corpus.test.ts
│   ├── deterministic.test.ts
│   ├── negotiate.test.ts
│   ├── security.test.ts
│   └── modules/
├── .github/
│   └── workflows/
│       └── ci.yml
├── LICENSE
├── README.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── wrangler.jsonc
```

This is a recommendation, not a rigid requirement.

Prefer maintainability over artificial symmetry.

---

# 24. Routing Architecture

A lightweight hand-written router is acceptable.

Do not add a framework solely to route a few endpoints.

Suggested top-level flow:

```text
request
  ↓
method validation
  ↓
URL parsing
  ↓
input sanitization
  ↓
rate limit check
  ↓
system route OR module route
  ↓
module-specific validation
  ↓
deterministic selection / computation
  ↓
content negotiation
  ↓
response headers
  ↓
optional async counter increment
```

Use `ctx.waitUntil()` for optional non-critical counting.

---

# 25. Deterministic Selection

Implement a stable hash-based selector.

Pseudo-interface:

```ts
function deterministicIndex(seed: string, namespace: string, length: number): number
```

Inputs should include enough request identity to avoid surprising collisions:

```text
namespace = module + ":" + category + ":" + normalized_parameters
```

The implementation must:

- be deterministic across Worker isolates
- not use `Math.random()` when seed is present
- have tests with fixed vectors
- be fast
- not require crypto-grade security

Unseeded requests may use `crypto.getRandomValues`.

---

# 26. Caching

Responses with a seed are ideal for edge caching.

Suggested:

### Seeded content

```http
Cache-Control: public, max-age=86400
```

or stronger if desired.

### Unseeded content

Use shorter caching or `no-store` depending on how random behavior is expected to feel.

Recommended initial behavior:

```http
Cache-Control: no-store
```

for unseeded generated responses.

### Static system assets / OpenAPI

Longer cache acceptable.

ETag support is optional in v1.

---

# 27. Security

## 27.1 Input sanitization

Normalize or reject:

- control characters
- null bytes
- zero-width control characters where dangerous
- bidi override characters
- invalid percent encoding
- excessive lengths

HTML output must escape all caller-controlled content.

## 27.2 Injection

No response renderer may interpolate unsanitized user input into HTML.

## 27.3 Headers

Recommended:

```http
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Content-Security-Policy: ...
```

Homepage CSP should be compatible with its actual assets.

API endpoints should avoid permissive HTML execution.

## 27.4 CORS

Because this is a public utility API, v1 may return:

```http
Access-Control-Allow-Origin: *
```

for GET/HEAD endpoints.

OPTIONS should support simple public browser usage.

Do not support credentialed cross-origin requests.

---

# 28. Rate Limiting

Follow SignaaS's optional KV philosophy.

Environment:

```text
RATE_LIMIT=100
```

Optional binding:

```text
RATE_LIMIT_KV
```

Without KV:

- all requests work
- no enforcement occurs

With KV:

- free anonymous traffic is limited per IP per rolling/fixed hour
- return `429` when exceeded
- expose standard-ish rate limit headers where reasonable

Example:

```http
RateLimit-Limit: 100
RateLimit-Remaining: 43
RateLimit-Reset: 1725500000
```

Optional secret:

```text
API_KEYS
```

Comma-separated API keys bypass or increase limits.

Header:

```http
Authorization: Bearer <key>
```

or:

```http
X-API-Key: <key>
```

Pick one primary convention. Supporting both is acceptable.

Do not build account management or billing in v1.

---

# 29. D1 Request Counter

Optional D1 binding:

```text
DB
```

Purpose:

- aggregate total request count
- optionally module-level counts
- homepage social proof
- health telemetry

No IP addresses or request bodies should be stored.

Suggested schema:

```sql
CREATE TABLE IF NOT EXISTS counters (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0
);
```

Keys:

```text
requests:total
module:wtf
module:excuse
module:decide
...
```

Do not synchronously block API responses on D1 writes.

---

# 30. Environment Contract

Suggested Worker environment:

```ts
export interface Env {
  RATE_LIMIT?: string;
  PUBLIC_ORIGIN?: string;
  API_KEYS?: string;
  RATE_LIMIT_KV?: KVNamespace;
  DB?: D1Database;
}
```

Canonical production config:

```text
PUBLIC_ORIGIN=https://wtfaas.dev
RATE_LIMIT=100
```

---

# 31. Cloudflare Configuration

Use `wrangler.jsonc`.

Expected shape:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "wtfaas",
  "main": "src/index.ts",
  "compatibility_date": "<current appropriate date>",
  "observability": {
    "enabled": true
  },
  "routes": [
    { "pattern": "wtfaas.dev", "custom_domain": true },
    { "pattern": "www.wtfaas.dev", "custom_domain": true }
  ],
  "vars": {
    "RATE_LIMIT": "100",
    "PUBLIC_ORIGIN": "https://wtfaas.dev"
  }
}
```

D1 and KV should remain optional and documented.

---

# 32. Package Scripts

Target package scripts:

```json
{
  "scripts": {
    "corpus": "node scripts/build-corpus.mjs",
    "prepare": "npm run corpus",
    "predev": "npm run corpus",
    "dev": "wrangler dev",
    "predeploy": "npm run corpus",
    "deploy": "wrangler deploy",
    "pretest": "npm run corpus",
    "test": "vitest run",
    "test:watch": "vitest",
    "pretypecheck": "npm run corpus",
    "typecheck": "tsc --noEmit",
    "check": "npm run typecheck && npm run test"
  }
}
```

Keep external dependencies minimal.

Preferred dev dependencies:

- TypeScript
- Wrangler
- Cloudflare Workers types
- Vitest

Do not add a runtime dependency unless it clearly earns its weight.

---

# 33. Testing Requirements

Tests are part of the MVP.

## 33.1 Corpus tests

Validate:

- all modules compile
- all required fields exist
- aliases are unique
- no empty output
- no duplicate exact lines within category
- scores stay in allowed ranges
- placeholder schemas match expected shapes

## 33.2 Route tests

Each module must have:

- happy path
- unknown category
- invalid input
- JSON negotiation
- text negotiation
- HEAD
- OPTIONS
- unsupported method

## 33.3 Determinism tests

For seeded endpoints:

```text
same request + same seed = same response
```

Different seeds should produce variation across a reasonable corpus.

Do not write a flaky statistical test.

Use fixed expected outputs where stable.

## 33.4 Security tests

Include:

- HTML escaping
- control character stripping/rejection
- bidi controls
- long values
- malformed choices
- script tags in `context`
- invalid `format`
- invalid `count`
- invalid ETA duration

## 33.5 OpenAPI test

Verify:

- valid JSON
- declared production server
- all primary modules present
- `/health` documented
- representative examples exist

## 33.6 CI

GitHub Actions should run:

```bash
npm ci
npm run check
```

on pushes and pull requests.

---

# 34. Initial Corpus Size

The launch should feel substantial.

Recommended minimum:

| Module | Minimum launch content |
|---|---:|
| WTF HTTP | all standard common HTTP statuses, ideally full registered practical set |
| WTF errors | 20+ |
| WTF acronyms | 30+ |
| Excuse | 12 categories × 15 entries |
| Status | 10 categories × 15 entries |
| Ack | 10 categories × 15 entries |
| Blame | 10 categories × 15 entries |
| ETA | 8 categories × 10 templates/rules |
| Reason | 10 categories × 15 entries |
| Placeholder | 10+ useful structured templates / generators |
| Decide | algorithmic |

Target roughly **700+ curated/generated content primitives** for 1.0.

Quality is more important than hitting the number exactly.

---

# 35. Response Quality Rules

Every corpus entry should pass this question:

> Could somebody conceivably paste this into a terminal, bot, mockup, status message, or test fixture and be happy with the result?

Avoid filler.

## 35.1 Keep outputs short

Most one-line modules:

- ideal: 5–25 words
- maximum default: approximately 200 characters

WTF explanations and placeholder structured data may be longer.

## 35.2 Avoid dated memes

A few cultural references are fine, but the core corpus should age well.

## 35.3 Avoid punching down

Do not generate insults targeting identity, disability, nationality, gender, etc.

## 35.4 Avoid false authority

Do not present humorous confidence scores as measured probabilities.

Document them as flavor metadata.

---

# 36. README Requirements

README should include:

1. name and tagline
2. CI/version/license/Cloudflare/TypeScript badges
3. one killer curl example
4. "What is WTFaaS?"
5. module table
6. quickstart
7. content negotiation
8. seed behavior
9. representative examples for each module
10. local development
11. corpus contribution instructions
12. security
13. optional KV/D1
14. deployment
15. license

Suggested opening:

> Something broke, somebody needs an answer, the meeting is in four minutes, and lorem ipsum is not helping.

Then:

```bash
curl https://wtfaas.dev/wtf/http/502
```

---

# 37. Example API Session

```bash
$ curl https://wtfaas.dev/blame/deploy
```

```json
{
  "module": "blame",
  "category": "deploy",
  "culprit": "configuration drift",
  "message": "Production and local appear to have been living separate lives.",
  "check": "Compare runtime environment variables and deployed configuration."
}
```

```bash
$ curl -H "Accept: text/plain" https://wtfaas.dev/ack/received
Received. It has entered the machinery.
```

```bash
$ curl "https://wtfaas.dev/decide?choices=ship,wait,rollback&seed=incident-123"
```

```json
{
  "module": "decide",
  "choices": ["ship", "wait", "rollback"],
  "choice": "wait",
  "index": 1
}
```

```bash
$ curl "https://wtfaas.dev/placeholder/github/issue?seed=docs"
```

```json
{
  "module": "placeholder",
  "category": "github",
  "kind": "issue",
  "data": {
    "title": "Intermittent timeout when refreshing project list",
    "body": "Refreshing the project list occasionally returns a timeout after 10 seconds. Retrying succeeds.",
    "labels": ["bug", "needs-triage"]
  }
}
```

---

# 38. SEO / Shareability

The homepage should have:

```html
<title>WTFaaS — What The Fuck as a Service</title>
```

Description:

> A tiny developer API for WTF explanations, excuses, decisions, status updates, acknowledgments, blame, ETAs, reasons, and realistic placeholder data.

Add:

- canonical URL
- Open Graph metadata
- Twitter/X card metadata
- favicon
- simple social preview graphic

Do not make SEO compromise API performance or page simplicity.

---

# 39. Observability

Enable Cloudflare Workers observability.

Application logs should be sparse.

Log:

- unexpected exceptions
- corpus initialization failure
- storage integration failures when useful

Do not log:

- API keys
- authorization headers
- full caller context unnecessarily
- sensitive request contents

Optional D1 failures should degrade gracefully.

---

# 40. Performance Targets

Informal targets:

- no external network calls for normal content
- globally edge-hosted
- cold path as small as practical
- API bundle reasonable for Workers
- p50 Worker execution should be trivial for corpus lookups
- homepage should load quickly without framework-sized JS

Performance goal:

> Most requests should be dominated by network latency, not application computation.

---

# 41. Accessibility

Homepage requirements:

- keyboard navigable
- semantic HTML
- adequate contrast
- visible focus states
- reduced-motion friendly
- no important information encoded by color alone
- copy buttons have accessible labels
- interactive console usable on mobile

---

# 42. Non-Goals for v1

Do **not** build:

- user accounts
- billing
- dashboards for customers
- persistent per-user history
- LLM-generated arbitrary text
- POST-based chat interface
- webhooks
- SDKs for every language
- OAuth
- teams
- admin CMS
- user-submitted public corpus
- analytics platform
- complex database models

These can wait until usage proves a need.

---

# 43. Post-v1 Possibilities

Potential future modules:

```text
/apology
/compliment
/roast
/name
/title
/commit
/changelog
/ticket
/meeting
/standup
/review
/risk
/priority
```

Potential features:

- MCP server
- official npm package
- shell utility
- GitHub Action
- Slack app
- Discord bot
- Raycast extension
- VS Code extension
- custom corpus packs
- language localization
- optional AI rewrite endpoint
- request signing / commercial higher limits
- module-specific subdomains for jokes/redirects

Do not implement these in the initial pass.

---

# 44. MCP / Agent Readiness

WTFaaS has natural agent-tool potential.

The REST API should be designed so a future MCP wrapper can map cleanly to tools such as:

```text
explain_error
make_decision
generate_status
acknowledge
assign_blame
estimate_eta
generate_reason
generate_placeholder
```

This means:

- stable structured schemas
- deterministic option
- explicit inputs
- no requirement to scrape human text
- reliable error codes

Do not build MCP in v1 unless it is trivial after the REST implementation is complete.

---

# 45. HTTP Status Codes Used by WTFaaS

Recommended:

| Situation | Code |
|---|---:|
| success | 200 |
| invalid parameter | 400 |
| unauthorized paid-key feature if ever applicable | 401 |
| unknown module/category/resource | 404 |
| unsupported method | 405 |
| unacceptable response format | 406 |
| rate limited | 429 |
| unexpected server error | 500 |

Avoid returning humorous nonstandard HTTP codes for API failures.

The payload can be funny. The protocol should remain boring and correct.

---

# 46. Definition of MVP

MVP is complete when:

- [ ] Cloudflare Worker runs locally
- [ ] `wtf`, `excuse`, `decide`, `status`, `ack`, `blame`, `eta`, `reason`, and `placeholder` all work
- [ ] JSON and text responses work for every module
- [ ] HTML works where specified
- [ ] `?seed=` is deterministic
- [ ] `/modules` exists
- [ ] `/openapi.json` exists
- [ ] `/health` exists
- [ ] interactive homepage exists
- [ ] corpus build and validation exist
- [ ] all inputs are sanitized/bounded
- [ ] CI passes
- [ ] Wrangler production config targets `wtfaas.dev`
- [ ] optional KV rate limiting is supported
- [ ] optional D1 counting is supported
- [ ] README documents deployment
- [ ] no required external runtime service exists
- [ ] no secrets are committed
- [ ] representative launch corpus is populated

---

# 47. Definition of Done for 1.0

Version 1.0 is ready to deploy when:

```bash
npm ci
npm run check
npm run deploy
```

can complete from a correctly configured environment and:

```bash
curl https://wtfaas.dev/health
```

returns healthy output.

Manual smoke test:

```bash
curl https://wtfaas.dev/wtf/http/502
curl https://wtfaas.dev/excuse/deploy
curl https://wtfaas.dev/decide/yes-no
curl https://wtfaas.dev/status/deploying
curl https://wtfaas.dev/ack/received
curl https://wtfaas.dev/blame/outage
curl "https://wtfaas.dev/eta/software?estimate=2d"
curl https://wtfaas.dev/reason/delay
curl https://wtfaas.dev/placeholder/saas
curl https://wtfaas.dev/modules
curl https://wtfaas.dev/openapi.json
curl https://wtfaas.dev/health
```

All must respond correctly.

---

# 48. Implementation Order for Codex

Implement in this order to reduce rework.

## Phase 1 — Skeleton

1. initialize TypeScript / Wrangler project
2. package scripts
3. Worker entry point
4. standard response utilities
5. content negotiation
6. sanitization
7. error model
8. test harness
9. CI

## Phase 2 — Corpus system

1. corpus file format(s)
2. build script
3. validation
4. generated TypeScript
5. deterministic selector
6. corpus tests

## Phase 3 — Simple modules

Implement first:

1. ack
2. status
3. reason
4. excuse
5. blame

These validate the corpus abstraction.

## Phase 4 — Algorithmic modules

1. decide
2. eta

## Phase 5 — Structured modules

1. wtf
2. placeholder

These have richer schemas.

## Phase 6 — Platform endpoints

1. `/modules`
2. `/openapi.json`
3. `/health`
4. optional rate limiting
5. optional D1 counter

## Phase 7 — Homepage

Build the interactive homepage after API contracts stabilize.

## Phase 8 — Polish

1. README
2. security headers
3. full smoke tests
4. error suggestions
5. metadata / favicon / Open Graph
6. deploy documentation

---

# 49. Instructions to Codex

Treat this PRD as the product contract, but make sound engineering decisions where implementation details are intentionally left open.

Important implementation guidance:

1. **Inspect `wfinken/signaas` as the reference project before implementation.**
2. Reuse its architectural ideas where appropriate, but do not blindly copy code.
3. Keep WTFaaS independently understandable and maintainable.
4. Prefer platform APIs and tiny utilities over dependencies.
5. Do not introduce a framework unless it materially improves the implementation.
6. Keep module logic isolated behind clear interfaces.
7. Keep curated content outside route handlers.
8. Write tests while implementing each layer.
9. Run `npm run check` repeatedly.
10. Do not leave placeholder TODOs for required MVP behavior.
11. Do not silently omit a module because its schema is harder.
12. If a requirement is ambiguous, choose the simplest behavior consistent with:
    - curlability
    - predictability
    - structured usefulness
    - Cloudflare edge execution
13. Preserve a fast path that requires neither KV nor D1.
14. Avoid unnecessary abstraction before at least three modules need it.
15. The final implementation should feel intentionally small.

---

# 50. Product Litmus Test

Before shipping any feature, ask:

> Is this useful enough to put in a script and funny enough to send to a coworker?

If only funny, improve the utility.

If only useful, improve the personality.

If neither, delete it.

---

# 51. Launch Examples

These should work, look good in screenshots, and be suitable for the homepage.

### WTF

```bash
curl https://wtfaas.dev/wtf/http/502
```

> The server asked another server for help. That server answered incorrectly.

### Excuse

```bash
curl https://wtfaas.dev/excuse/deploy
```

> The deployment exposed an environment-specific issue that did not reproduce locally.

### Decide

```bash
curl "https://wtfaas.dev/decide?choices=ship,wait,rollback"
```

> wait

### Status

```bash
curl https://wtfaas.dev/status/investigating
```

> Investigating. We have several theories and one suspicious log line.

### Ack

```bash
curl https://wtfaas.dev/ack/received
```

> Received. It has entered the machinery.

### Blame

```bash
curl https://wtfaas.dev/blame/outage
```

> DNS remains a person of interest.

### ETA

```bash
curl "https://wtfaas.dev/eta/software?estimate=2d"
```

> Two days, assuming nothing unexpectedly becomes interesting.

### Reason

```bash
curl https://wtfaas.dev/reason/delay
```

> Additional validation is needed before we can proceed safely.

### Placeholder

```bash
curl https://wtfaas.dev/placeholder/saas
```

> Structured SaaS landing-page copy suitable for a real mockup, not lorem ipsum.

---

# 52. Final Product Statement

**WTFaaS is a tiny, globally distributed API for the moments when software or humans need an answer but nobody wants to write one from scratch.**

It explains.

It excuses.

It decides.

It reports status.

It acknowledges.

It assigns blame.

It estimates.

It gives reasons.

It fills the blank space.

And it does all of that over HTTP with the seriousness of production infrastructure applied to problems that absolutely did not ask for production infrastructure.
