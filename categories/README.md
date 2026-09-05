# Corpus guide

Like SignaaS, each category is a plain-text file: a display name, header settings, a blank line, and one response per line. Utilities have their own directories because category names such as `done` and `deploy` occur in several APIs.

`categories/ack/received.txt` supplies `/ack/received`. New files in the message utility directories are discovered automatically. Every shipped reply pool has at least 20 entries; the tests enforce this minimum.

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

The fields are **message | culprit | diagnostic check**. Placeholder files use **title | description**; the API uses the selected pair to fill the requested fixture shape. SignaaS's email-specific `signer:` setting does not apply to WTFaaS. Do not include literal pipes in fields.

Keep responses short, specific to the category, and unique across files. Blame systems and processes, never real people. Avoid invented emergencies. Suggested reasons should only be used when they match the actual situation.

Run `npm run corpus` to validate and regenerate `src/generated/corpus.ts`. Errors identify the file and, for parsing failures, the line. Commit the text files and regenerated output together. Run `npm run check` before submitting.

All nine content modules now use this directory for reply variation:

| Directory | Response field / purpose |
| --- | --- |
| `ack`, `status`, `excuse`, `reason` | One message per category entry |
| `blame` | Message, culprit, and diagnostic check |
| `wtf-http` | Twenty `wtf` interpretations for each supported status code |
| `wtf-error` | Twenty interpretations for each supported system error |
| `wtf-acronym` | Twenty interpretations for each acronym, also used by topic aliases and overlapping error records |
| `eta` | Wording with a required `{estimate}` token, filled using the normalized duration |
| `decide` | Separate pools for `yes`, `no`, `heads`, `tails`, and custom `choices`; custom wording uses `{choice}` |
| `placeholder` | Twenty synthetic title/description pairs per category |

Canonical technical definitions remain separate from humorous wording in `src/wtf-data.ts`. Adding a new technical code requires a factual record as well as its reply file. Decisions still choose only among the supplied options, and ETA calculations still normalize the supplied duration. Reply variety does not change those semantics. Placeholder kinds map each selected entry into their structured response fields.

Seeded output is stable for a fixed corpus version. Adding responses can change the selection for existing seeds. Unseeded calls sample independently and can repeat; this stateless API does not cycle through replies or remember previous requests.
