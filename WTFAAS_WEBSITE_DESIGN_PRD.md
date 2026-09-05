# WTFaaS.dev — Website Design PRD

**Product:** WTFaaS  
**Domain:** `https://wtfaas.dev`  
**Document type:** Website Design Product Requirements Document  
**Audience:** Product designer, frontend engineer, Codex, implementation agent  
**Primary goal:** Make WTFaaS instantly understandable, memorable, fun, and trustworthy without looking AI-generated or overdesigned.

---

# 1. Design Intent

WTFaaS should feel like a small, beloved developer tool made by a real person with taste.

The website must be:

- fun
- friendly
- fast
- compact
- slightly irreverent
- genuinely useful
- easy to scan
- easy to copy from
- unmistakably developer-oriented

It must **not** feel like:

- an AI startup landing page
- a generic SaaS template
- a crypto project
- a VC-backed productivity app
- a fake terminal novelty site
- a dribbble exercise
- a marketing site with too much empty space and not enough substance

The site should communicate:

> “Someone built this because they thought it was funny, then cared enough to make it excellent.”

---

# 2. Core Visual Personality

## 2.1 Personality keywords

The visual system should feel:

- warm
- playful
- precise
- handmade
- technical
- dryly funny
- compact
- slightly retro
- modern enough to feel fast

Avoid polished sterility.

Small imperfections and idiosyncrasies are welcome if intentional.

## 2.2 Reference mood

Think:

- classic developer utilities
- old-school web directories
- command-line tools
- excellent documentation sites
- indie software
- zines
- small utility sites with a cult following
- tasteful 90s/early-2000s internet references used sparingly

Do **not** imitate any specific brand wholesale.

---

# 3. Anti-AI Design Rules

This section is mandatory.

The website must actively avoid design patterns that signal “AI-generated website.”

## 3.1 Avoid default AI landing-page tropes

Do not use:

- giant vague headline over a gradient
- glowing purple/blue blobs
- glassmorphism cards
- floating translucent orbs
- decorative 3D abstract shapes
- “Built for teams who…” boilerplate
- endless rounded cards with shadows
- fake dashboard screenshots
- oversized centered hero with 80vh empty space
- six-column feature grids with identical icon cards
- generic smiling stock humans
- gratuitous neon gradients
- animated particle backgrounds
- rainbow text
- faux AI chat UI unless directly relevant
- fake metrics like “10x faster”
- fake testimonials
- fake customer logos
- meaningless badges such as “AI-powered”
- excessive pill-shaped UI
- too many emojis in headings
- canned startup phrases like:
  - “supercharge your workflow”
  - “unlock productivity”
  - “revolutionize”
  - “seamlessly”
  - “effortlessly”
  - “next-generation”
  - “transform the way you”

## 3.2 Avoid suspiciously perfect symmetry

Real small tools often have more character.

Prefer:

- varied section heights
- uneven content density
- useful side notes
- terminal examples
- labels that feel authored
- a few unexpected details
- one or two asymmetrical compositions

Do not make every section:
- heading
- paragraph
- three identical cards

## 3.3 Avoid over-rounded UI

Use rounded corners sparingly.

Preferred:
- 4px to 8px corner radius
- square or nearly square code blocks
- buttons with modest rounding
- cards that feel like panels, not bubbles

Avoid:
- 24px card radii everywhere
- pill buttons unless semantically appropriate
- bubble-like UI

---

# 4. Brand Expression

## 4.1 Wordmark

Primary wordmark:

```text
WTFaaS
```

Secondary lockup:

```text
What The Fuck as a Service
```

A PG fallback may use:

```text
WTF as a Service
```

The wordmark should feel typographic, not mascot-first.

Potential styling:

- bold grotesk or slab-serif wordmark
- small monospaced “.dev” companion
- optional hand-drawn underline or registration-mark-like detail
- optional asterisk after WTF with small footnote

Example:

```text
WTFaaS*
* What The Fuck as a Service
```

## 4.2 Mascot

A mascot is optional.

If used, keep it tiny and strange.

Possible directions:

- confused terminal cursor
- tiny error triangle with eyes
- a raccoon holding a cable
- a bug with a clipboard
- a stressed network node
- a tiny shrugging server rack

Do not make the mascot glossy, 3D, or app-store-cute.

Prefer:
- one-color line art
- pixel-ish icon
- rough vector
- sticker-like mark

---

# 5. Color System

The palette should be friendly but not sugary.

## 5.1 Base

Preferred base:

- warm off-white background
- dark charcoal text
- slightly muted borders

Example direction:

```text
Background: #F7F4EC
Text: #1D1D1B
Muted text: #66645F
Border: #D8D3C8
Panel: #FFFDF8
```

## 5.2 Accent

Use one primary accent, not a rainbow.

Good options:

- tomato red
- safety orange
- mustard yellow
- utility green
- deep cobalt

Recommended direction:

```text
Accent: warm red-orange
```

Example:

```text
#E94F37
```

The accent should feel more “warning label” than “AI neon.”

## 5.3 Dark mode

Optional but recommended.

Dark mode should be:

- charcoal, not pure black
- low-glow
- readable
- non-neon

Example:

```text
Background: #171715
Panel: #1F1F1C
Text: #F5F1E8
Muted: #A7A39A
Border: #383731
Accent: same family as light mode, slightly adjusted
```

Do not turn dark mode into cyberpunk.

---

# 6. Typography

Typography is a major part of the personality.

## 6.1 Primary typeface

Use a humanist grotesk, neo-grotesk, or editorial sans.

Preferred characteristics:

- legible
- slightly unusual
- not overused in AI templates
- strong lowercase
- good punctuation
- friendly without being childish

Avoid default “AI startup” pairings.

Do not automatically choose:
- Inter
- Poppins
- Plus Jakarta Sans
- Space Grotesk
- Sora

These may be technically fine, but the project should avoid feeling template-generated.

Good alternatives include:
- system UI stack used deliberately
- IBM Plex Sans
- Public Sans
- Work Sans
- Source Sans 3
- Atkinson Hyperlegible
- Geist only if styled with restraint

## 6.2 Monospace

Use monospace heavily for API examples.

Good options:
- IBM Plex Mono
- Berkeley Mono if licensed
- JetBrains Mono
- Source Code Pro
- ui-monospace stack

## 6.3 Hierarchy

Hero:
- large but not absurd
- 48–72px desktop
- 38–48px mobile

Section headings:
- 28–36px

Body:
- 16–18px

Code:
- 14–16px

Do not use 96px+ hero text unless it genuinely works in the composition.

---

# 7. Layout Philosophy

## 7.1 Width

Main content max-width:

```text
1100px–1200px
```

Readable text width:

```text
600px–760px
```

## 7.2 Density

Favor a useful, compact page.

The homepage should feel rich within the first two viewport heights.

Do not bury the API behind excessive storytelling.

## 7.3 Grid

Use a 12-column or flexible CSS grid.

But let sections vary:
- some full-width
- some split 60/40
- some dense lists
- some terminal-heavy

Avoid repeating the same card layout across the entire site.

---

# 8. Homepage Information Architecture

Recommended order:

1. Header
2. Hero
3. Live API demo
4. Module directory
5. “Try these” examples
6. Why it exists
7. How it works
8. Developer details
9. Footer

This is not a corporate sales funnel.

The user should be able to interact with the product almost immediately.

---

# 9. Header

## 9.1 Structure

Left:
- WTFaaS wordmark

Right:
- Docs
- GitHub
- OpenAPI
- Theme toggle

Optional:
- small “curl it” button

## 9.2 Behavior

Sticky header is optional.

If sticky:
- small height
- no huge shadow
- subtle background on scroll

## 9.3 Mobile

Use a very simple compact menu.

Avoid full-screen animated drawer unless necessary.

---

# 10. Hero

## 10.1 Goal

Explain WTFaaS in under 5 seconds.

## 10.2 Suggested hero copy

Headline:

```text
WTFaaS
```

Subhead:

```text
What The Fuck as a Service.
Tiny answers for errors, excuses, decisions, status updates, blame, ETAs, reasons, acknowledgments, and placeholder data.
```

Alternative shorter version:

```text
Tiny answers for life's and software's tiny WTF moments.
```

## 10.3 Hero CTA

Primary:
```text
Try the API
```

Secondary:
```text
View on GitHub
```

But avoid oversized button theater.

Small practical controls are better.

## 10.4 Hero terminal

The hero should include a real, copyable request.

Example:

```bash
curl https://wtfaas.dev/blame/outage
```

Response:

```json
{
  "culprit": "DNS",
  "message": "DNS remains a person of interest."
}
```

This should be visibly real and compact.

No fake animated typing effect by default.

Typing animations are overused and make tools feel fake.

---

# 11. Interactive API Playground

This is the centerpiece.

## 11.1 Purpose

Let visitors understand the API by using it.

## 11.2 Layout

Desktop:
- left: controls
- right: response panel

Mobile:
- stacked

## 11.3 Controls

Inputs:
- Module
- Category
- Seed
- Format

Optional contextual inputs:
- estimate
- choices
- count

Use actual labels.

Avoid ambiguous icon-only controls.

## 11.4 Response panel

Should show:

- generated URL
- curl command
- response body
- status code
- copy button

Optional:
- tiny latency indicator

## 11.5 Feel

The console should feel like a tool, not a toy.

Use:
- subtle border
- compact spacing
- monospace
- strong visual hierarchy
- one accent color for active state

Avoid:
- fake macOS traffic-light dots unless truly useful
- animated terminal cursor
- hacker-green-on-black cliché

---

# 12. Module Directory

Show all nine modules.

But do not use nine identical giant cards.

Better structure:

A compact, table-like directory or staggered grid.

Example:

```text
WTF          Explain an error or acronym
Excuse       Get a plausible excuse
Decide       Pick something so you don't have to
Status       Say what's happening
Ack          Confirm receipt without writing “noted”
Blame        Name a likely culprit
ETA          Translate an estimate into reality-ish
Reason       Explain why
Placeholder  Generate useful fake content
```

Each row/item includes:
- module name
- one-line description
- example endpoint
- tiny sample result

Rows should be clickable.

Hover may reveal:
- “Try it”
- “Copy curl”

---

# 13. Example Strip

Include a playful section of curated real calls.

Potential heading:

```text
Things you can ask it
```

Examples:

```bash
curl https://wtfaas.dev/wtf/http/502
curl https://wtfaas.dev/excuse/deploy
curl https://wtfaas.dev/ack/received
curl https://wtfaas.dev/blame/outage
curl "https://wtfaas.dev/eta/software?estimate=2d"
curl "https://wtfaas.dev/decide?choices=ship,wait,rollback"
```

Each should be copyable.

Use a horizontally scrollable code strip on mobile if needed.

---

# 14. “Why This Exists” Section

Keep it short.

Suggested direction:

```text
Most apps eventually need a sentence.

A status message.
An acknowledgment.
A placeholder.
A reason.
A tiny explanation.

WTFaaS is a pile of those tiny things, wrapped in a clean HTTP API.
```

This section should feel authored, not like startup copy.

---

# 15. “How It Works” Section

Three concise points:

## 15.1 No AI required

Curated corpora and deterministic logic.

## 15.2 Edge-hosted

Cloudflare Workers.

## 15.3 Deterministic when needed

Use `?seed=`.

Possible visual treatment:
- small numbered annotations
- inline code examples
- no generic icon cards

---

# 16. Developer Details Section

This should satisfy technical users immediately.

Show:

```text
GET /wtf/http/:code
GET /excuse/:category
GET /decide?choices=a,b,c
GET /status/:category
GET /ack/:category
GET /blame/:category
GET /eta/:category?estimate=2d
GET /reason/:category
GET /placeholder/:category
```

Then:

```text
Accept: application/json
Accept: text/plain
Accept: text/html
```

And:

```text
?seed=demo
```

Link:
- OpenAPI
- GitHub
- health endpoint

---

# 17. Footer

Keep it human.

Example:

```text
Built because hardcoding “Received, thanks” one more time felt unreasonable.
```

Links:
- GitHub
- API docs
- OpenAPI
- Health
- License

Optional:
- version
- total requests served

Do not add:
- newsletter
- pricing
- enterprise CTA
- fake contact sales

---

# 18. Component Design

## 18.1 Buttons

Buttons should be compact.

Primary:
- solid accent
- dark readable text or white depending contrast

Secondary:
- outlined
- text-first

Corner radius:
```text
6px
```

Avoid giant pill buttons.

## 18.2 Cards / panels

Use cards only when they help group information.

Card style:
- thin border
- subtle background contrast
- little or no shadow

Corner radius:
```text
6px–8px
```

## 18.3 Code blocks

Code blocks are core visual elements.

Requirements:
- high contrast
- copy button
- no unnecessary syntax rainbow
- line wrapping sensible on mobile
- plain text fallback

## 18.4 Tags

Use tags sparingly.

Good uses:
- `GET`
- `JSON`
- `text/plain`
- `seeded`

Do not decorate every label with a pill.

---

# 19. Iconography

Use a small coherent icon set or none.

Preferred:
- simple stroke icons
- tiny pixel-style glyphs
- custom one-color micro-icons

Avoid:
- multicolor SaaS icon packs
- 3D illustrations
- gradient-filled icons
- “AI sparkle” icons

The sparkle icon should not appear anywhere unless making fun of it.

---

# 20. Motion

Motion should be subtle and useful.

Allowed:
- 100–180ms hover transitions
- response panel fade
- small dropdown transitions
- copy confirmation
- slight module highlight

Avoid:
- scroll-triggered parallax
- floating decorative shapes
- auto-typing text
- bouncing arrows
- excessive entrance animations
- looping decorative motion

Respect `prefers-reduced-motion`.

---

# 21. Copy Style

Copy is a design element.

## 21.1 Voice

Use:
- short sentences
- dry humor
- specific nouns
- concrete explanations
- occasional weirdness

Avoid:
- marketing abstraction
- exclamation point overload
- fake enthusiasm
- overexplaining jokes

## 21.2 Good examples

```text
Pick something so you don't have to.
```

```text
DNS remains a person of interest.
```

```text
Received. It has entered the machinery.
```

```text
Two days, assuming nothing unexpectedly becomes interesting.
```

## 21.3 Bad examples

```text
Empower your workflows with next-generation decision intelligence.
```

```text
Unlock seamless acknowledgment experiences.
```

```text
Supercharge your development journey.
```

---

# 22. Responsive Behavior

## 22.1 Mobile first principles

The site should remain useful on a phone.

Requirements:
- code samples scroll horizontally where needed
- playground controls stack
- no tiny tap targets
- module directory remains readable
- header stays compact
- no forced desktop-width terminal

## 22.2 Breakpoints

Use practical breakpoints, not excessive custom logic.

Suggested:
- ~640px
- ~900px
- ~1200px

---

# 23. Accessibility

Must include:

- WCAG AA contrast target
- semantic heading structure
- keyboard navigation
- visible focus states
- form labels
- accessible copy buttons
- no motion dependency
- no hover-only critical content
- descriptive link text
- `aria-live` for playground response update if appropriate

---

# 24. Performance

The site should feel instant.

Targets:

- minimal JavaScript
- no large frontend framework unless justified
- no heavy animation library
- no webfont bloat
- lazy-load nonessential assets
- compress SVGs
- avoid third-party trackers by default

Aim for:
- excellent Lighthouse performance
- fast first contentful paint
- low CLS
- tiny JS payload

The site should remain understandable if JavaScript fails.

---

# 25. Technical Implementation Direction

Recommended:

- server-rendered HTML from the Worker
- progressive enhancement with small vanilla JS
- CSS in a single maintainable stylesheet or small modular files
- no build-time frontend framework needed unless Codex finds a compelling reason

Preferred:
- semantic HTML
- CSS variables
- modern layout primitives
- tiny client-side playground script

Example token structure:

```css
:root {
  --bg: #F7F4EC;
  --surface: #FFFDF8;
  --text: #1D1D1B;
  --muted: #66645F;
  --border: #D8D3C8;
  --accent: #E94F37;
  --radius: 6px;
  --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

Do not overengineer a design system package for one page.

---

# 26. Homepage Wireframe

Approximate structure:

```text
┌────────────────────────────────────────────────────────────┐
│ WTFaaS                         Docs  GitHub  OpenAPI   ◐   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ WTFaaS                                                     │
│ What The Fuck as a Service.                                │
│ Tiny answers for life's and software's tiny WTF moments.   │
│                                                            │
│ curl https://wtfaas.dev/blame/outage                       │
│ { "culprit": "DNS", ... }                                  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ TRY IT                                                     │
│                                                            │
│ [module] [category] [seed]              response           │
│                                          status: 200        │
│                                          {...}              │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ MODULES                                                    │
│ WTF          Explain an error or acronym        /wtf/...    │
│ Excuse       Get a plausible excuse             /excuse/... │
│ Decide       Pick something                     /decide     │
│ Status       Say what's happening               /status/... │
│ Ack          Acknowledge                        /ack/...    │
│ Blame        Name a likely culprit              /blame/... │
│ ETA          Translate an estimate              /eta/...   │
│ Reason       Explain why                        /reason/... │
│ Placeholder  Generate useful fake content       /...       │
├────────────────────────────────────────────────────────────┤
│ THINGS YOU CAN ASK IT                                      │
│ curl ...                                                   │
│ curl ...                                                   │
│ curl ...                                                   │
├────────────────────────────────────────────────────────────┤
│ WHY THIS EXISTS               HOW IT WORKS                  │
│ short authored copy            no AI / edge / seeded       │
├────────────────────────────────────────────────────────────┤
│ API cheat sheet / content negotiation / links              │
├────────────────────────────────────────────────────────────┤
│ Built because hardcoding “Received, thanks” again...       │
└────────────────────────────────────────────────────────────┘
```

---

# 27. Visual Details That Make It Feel Human

Add 3–6 small authored touches.

Examples:

- a tiny footer note:
  ```text
  uptime permitting
  ```
- module hover labels with dry copy
- a copy button that changes to:
  ```text
  stolen
  ```
  for 800ms
- `404` page copy:
  ```text
  We looked. It isn't here.
  ```
- health page:
  ```text
  Still breathing.
  ```
- seed tooltip:
  ```text
  Same seed, same answer. Useful for demos and arguments.
  ```
- comments in source visible to curious developers
- a tiny random fact about the API in footer rotation

These should be subtle.

Do not make every element a joke.

---

# 28. Error Pages

## 28.1 404

Headline:

```text
404
```

Copy:

```text
We looked. It isn't here.
```

Useful next actions:
- home
- modules
- docs

## 28.2 500

Copy:

```text
Something has gone properly wrong.
```

Optional smaller note:

```text
The irony is not lost on us.
```

## 28.3 Rate limit

Copy:

```text
Too much WTF for one hour.
```

Still include technically correct retry information.

---

# 29. Empty / Loading States

Avoid skeleton shimmer.

For the playground:

Loading:
```text
asking the machinery…
```

Error:
```text
That request went sideways.
```

Empty:
```text
Pick a module and press Run.
```

Keep these brief.

---

# 30. SEO and Social Preview

Social card should be typography-first.

Suggested composition:

```text
WTFaaS
What The Fuck as a Service

curl https://wtfaas.dev/blame/outage
→ DNS remains a person of interest.
```

Use:
- flat background
- strong type
- one accent color
- no fake app screenshot
- no 3D device mockup

---

# 31. Favicon

Prefer a tiny high-contrast symbol.

Possible directions:
- `W?`
- warning triangle + `?`
- terminal prompt + `?`
- `?!`
- pixelated WTF monogram

Must read at 16px.

---

# 32. Design QA Checklist

Before launch, verify:

- [ ] does not use generic purple/blue AI gradient
- [ ] no glassmorphism
- [ ] no giant decorative blobs
- [ ] no fake testimonials
- [ ] no fake logos
- [ ] no AI sparkle icon
- [ ] no meaningless marketing metrics
- [ ] hero explains product immediately
- [ ] working API example visible above the fold
- [ ] playground works on mobile
- [ ] all code is copyable
- [ ] typography feels authored
- [ ] color palette is restrained
- [ ] corners are modest
- [ ] no excessive animation
- [ ] dark mode is optional, not theatrical
- [ ] content remains useful without JS
- [ ] GitHub and OpenAPI are easy to find
- [ ] page feels like a real developer utility
- [ ] copy sounds like a person wrote it

---

# 33. Definition of Done

The site design is complete when a first-time visitor can answer these within 10 seconds:

1. What is WTFaaS?
2. What can I call?
3. What does a response look like?
4. How do I try it?
5. Where is the API documentation?
6. Is this a joke or a real tool?

The ideal answer to #6 is:

> Both.

---

# 34. Final Design Statement

The website should feel like **a real utility with a sense of humor**, not a joke pretending to be software and not software pretending to have a personality.

If a design choice feels fashionable but generic, remove it.

If a design choice feels slightly weird but useful and intentional, keep it.

The goal is not to look impressive.

The goal is to look **memorable, trustworthy, fast, and clearly made by someone who cared.**
