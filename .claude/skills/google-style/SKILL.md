---
name: google-style
description: Use when writing, editing, reformatting, or reviewing developer or technical documentation — READMEs, setup guides, tutorials, runbooks, API docs, release notes, .md files — or when asked to apply Google's developer documentation style guide, make docs read consistently, or fix voice, tone, headings, terminology, capitalization, link text, or word choice in prose.
---

# Google developer documentation style

Rewrite documents to comply with Google's developer documentation style guide
(https://developers.google.com/style). The full guide is mirrored in `references/` —
68 pages, including the complete word list. Read the reference page before applying a
rule you are not certain of; do not apply style rules from memory.

**Core principle:** conversational, friendly, and respectful without being frivolous.
Second person, active voice, present tense, sentence case, short sentences.

## Workflow

1. **Read the whole document first.** Note its type (tutorial, how-to, concept,
   reference, troubleshooting) — that decides the target structure.
2. **Run the checker** for mechanical violations:
   ```
   python <skill-dir>/check.py path/to/doc.md
   python <skill-dir>/check.py --no-headings path/to/doc.md   # heading casing is fixed
   ```
   It flags word-list terms, title-case headings, spaced em dashes, passive voice,
   first person, directional language, vague link text, Latin abbreviations, and
   missing alt text. Every hit is a candidate, not a verdict — confirm against the
   named reference page.
3. **Rewrite in place.** Fix prose, headings, lists, tables, and structure.
4. **Report** a short changelog: what changed, grouped by rule, with counts.

## The rewrite contract

The edited document is the deliverable. It consists of:

- The same technical facts, commands, paths, flags, version numbers, code, and output
  as the original — byte-identical inside code fences.
- Prose rewritten to the rules in `references/`.
- Headings in sentence case, task-based (`Install the CLI`, not `Installation` or
  `Installing The CLI`).
- Structure matching the document's type (see below).
- Front matter, doc IDs, and metadata blocks preserved.

Then, separately, a changelog of what you changed and why.

## Never

- Change a command, path, flag, value, or code sample to satisfy a style rule.
- Invent a fact, a step, or a caveat to fill a structural slot.
- Apply a rule you have not read in `references/` this session.
- Delete content because it doesn't fit the target shape — move it.

## Structure

**This guide governs writing, not information architecture.** It prescribes no document
shapes, no required section names, and no ordering. If a project already has a document
standard, that standard wins on structure; apply this guide inside it.

The only genuinely structural rules it does state:

| Rule | Reference |
|---|---|
| Document one way to do a task. If you must show several, split them across separate pages, headings, or tabs | `procedures.md` |
| A document states one clear, specific purpose; headings serve that purpose | `prescriptive-documentation.md` |
| One unique H1 per page; don't repeat the page title in a heading | `headings.md` |
| Introduce a procedure with a sentence that adds context the heading doesn't | `procedures.md` |
| Provide help in context rather than linking away; don't duplicate links to one destination on a page | `cross-references.md` |

Do not rename or reorder a project's existing sections to match conventions from
elsewhere in Google's documentation. Those conventions are not in this guide.

**Heading casing is often load-bearing.** Before applying sentence case anywhere, check
whether the project's tests, validators, or link anchors pin heading strings verbatim.
If they do, leave casing alone and run the checker with `--no-headings` — the remaining
rules carry nearly all the readability benefit at none of the migration cost. Sentence
case is also not mechanical: it needs a proper-noun judgment per heading, and a naive
lowercase mangles product names and acronyms (*Managed Google Play*, *Service Desk (L1)*).

## Highest-yield rules

| Rule | Reference |
|---|---|
| Address the reader as *you*; never *we*, *our*, *us* | `person.md` |
| Active voice; make clear who performs the action | `voice.md` |
| Present tense; `will` only for genuinely future events | `tense.md` |
| Sentence case for every heading and title — **skip if the project pins heading strings; run `--no-headings`** | `headings.md`, `capitalization.md` |
| Task-based headings start with a bare infinitive verb | `headings.md` |
| Each numbered step is one action, imperative mood | `procedures.md` |
| Descriptive link text — never *here*, *this page*, *learn more* | `cross-references.md` |
| No directional language (*above*, *below*, *right-hand*) | `accessibility.md` |
| Spell out *for example*, *that is*, *and so on* | `word-list.md` |
| Em dash takes no surrounding spaces | `dashes.md` |
| Don't attribute human qualities to software | `anthropomorphism.md` |
| Inclusive terms — no *whitelist*, *master*, *sanity check* | `inclusive-documentation.md` |
| Code font for code, UI strings in bold, new terms in italic | `code-in-text.md`, `ui-elements.md`, `italics-terms.md` |
| No timeless-breaking words (*currently*, *new*, *soon*) | `timeless-documentation.md` |
| Every image has alt text | `images.md` |

## Reference index

Read the file, don't guess the rule.

- **Voice and tone:** `voice.md` `tone.md` `person.md` `pronouns.md` `tense.md`
  `future.md` `timeless-documentation.md` `contractions.md` `anthropomorphism.md`
  `jargon.md` `excessive-claims.md` `prescriptive-documentation.md` `philosophy.md`
  `translation.md` `inclusive-documentation.md` `accessibility.md`
- **Structure and formatting:** `headings.md` `headings-targets.md`
  `paragraph-structure.md` `sentence-structure.md` `lists.md` `procedures.md`
  `tables.md` `notices.md` `highlights.md` `examples.md` `format-examples.md`
  `cross-references.md` `footnotes.md` `images.md` `markdown.md` `html-formatting.md`
  `semantic-tagging.md` `text-formatting.md`
- **Grammar and punctuation:** `abbreviations.md` `articles.md` `capitalization.md`
  `colons.md` `commas.md` `dashes.md` `ellipses.md` `hyphens.md` `numbers.md`
  `parentheses.md` `periods.md` `pluralization.md` `possessives.md` `prepositions.md`
  `quotation-marks.md` `semicolons.md` `slashes.md` `italics-terms.md`
  `dates-times.md` `phone-numbers.md` `units-of-measure.md` `mathematical-notation.md`
- **Code and API:** `code-in-text.md` `code-samples.md` `code-syntax.md`
  `api-reference-comments.md` `reference-verbs.md` `placeholders.md` `filenames.md`
  `ui-elements.md` `product-names.md` `trademarks.md`
- **Terminology:** `word-list.md` (the full list; `AVOID:` and `DON'T USE:` mark
  flagged terms), `other-sources.md`

## Common mistakes

- Rewriting a heading into sentence case but leaving it noun-based (`Installation`)
  instead of task-based (`Install the CLI`).
- "Fixing" passive voice inside a quoted error message or log line.
- Lowercasing a product name because the checker flagged the heading.
- Applying the word list mechanically: `AVOID` means use with caution, `DON'T USE`
  means don't. Read the entry — many have documented exceptions.
- Restructuring into the target shape and silently dropping the content that didn't fit.

---
_`references/` mirrors https://developers.google.com/style as fetched 2026-08-22.
The guide changes; check the source URL in each file's header if a rule looks stale._
