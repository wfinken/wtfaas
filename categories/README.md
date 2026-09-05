# Corpus guide

Like SignaaS, each category is a plain-text file: a display name, header settings, a blank line, and one response per line. Utilities have their own directories because category names such as `done` and `deploy` occur in several APIs.

`categories/ack/received.txt` supplies `/ack/received`. New files in the five utility directories are discovered automatically.

```text
Received
description: Acknowledgments that a message has arrived.
aliases: receipt

Received. It has entered the machinery.
Got it. This is now an official thing.
```

`description:` is required. `aliases:` is optional, comma-separated, and scoped to the utility. File names and aliases use lowercase letters, digits, and dashes. Lines beginning with `#` are comments. Blank lines below the header are ignored. UTF-8, optional BOM, and Windows line endings are supported.

For `ack`, `status`, `reason`, and `excuse`, write plain response lines. For `blame`, pipe fields retain the structured API data:

```text
Outage
description: Systems to investigate during a service interruption.

DNS remains a person of interest. | DNS | Verify resolution from multiple networks and inspect recent DNS changes.
```

The fields are **message | culprit | diagnostic check**. SignaaS's email-specific `signer:` setting does not apply to WTFaaS. Do not include literal pipes in fields.

Keep responses short, specific to the category, and unique across files. Blame systems and processes, never real people. Avoid invented emergencies. Suggested reasons should only be used when they match the actual situation.

Run `npm run corpus` to validate and regenerate `src/generated/corpus.ts`. Errors identify the file and, for parsing failures, the line. Commit the text files and regenerated output together. Run `npm run check` before submitting.

This directory contains the five existing curated response utilities. WTF dictionaries, ETA calculations, decisions, and placeholder generators currently live in `src/index.ts`; they are not plain response corpora.

Seeded output is stable for a fixed corpus version. Adding responses can change the selection for existing seeds.
