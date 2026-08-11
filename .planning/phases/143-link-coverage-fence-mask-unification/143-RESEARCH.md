# Phase 143: Link Coverage & Fence-Mask Unification - Research

**Researched:** 2026-08-11
**Domain:** Markdown link/anchor integrity checking (GitHub-flavored Markdown anchor semantics),
CommonMark fence masking, and this repo's own frozen-surface governance mechanics (CARVE/GOV-02).
**Confidence:** HIGH on all repo-internal claims (file:line read this session); MEDIUM on GitHub
rendering-engine internals (no first-party GitHub spec exists — corroborated via the
community-maintained reference implementation `html-pipeline` plus multiple independent
practitioner reports, not a live github.com test).

## Summary

143-CONTEXT.md already resolves nearly every design decision for this phase via
`/grill-me` + a scored `/adversarial-review` (63 findings, owner-ratified 2026-08-11). This
document does **not** re-litigate those decisions. It answers the eight questions the CONTEXT
left open because they require either (a) reading source this session with verbatim quotes, or
(b) external verification the interrogation could not perform in-repo.

The two most consequential findings of this research session:

1. **The GitHub anchor-slug algorithm is independently confirmed** against an authoritative
   open-source reference (`gjtorikian/html-pipeline`'s `toc_filter.rb`) and matches the repo's
   existing `githubSlug()` implementation almost exactly — lowercase, strip non-word/space/hyphen
   characters, replace spaces with hyphens, in that order, with no collapsing of adjacent hyphens.
   The one divergence (ASCII-only `[a-z0-9 _-]` vs. Ruby's Unicode-aware `\p{Word}`) has zero
   observable effect on this corpus, which is confirmed English-ASCII in every checked heading.
2. **The single highest-value question — does `<a id="x"></a>` inside a table cell survive
   GitHub's HTML sanitizer — resolves in D-04's favor.** The `id` attribute is in the
   sanitizer's global `all` attributes list (applies to every allowed element), `a` is an allowed
   element, and `table`/`tr`/`td`/`th` are all allowed elements. This is corroborated by
   independent, convergent community documentation describing the exact `<a id>`-in-table-cell
   pattern as the standard GitHub workaround for the "links don't work inside table cells"
   limitation. It is **not** a live github.com test and the specific gem fetched is explicitly
   no longer what github.com runs (its own README says so) — tag this `[CITED]`, not
   `[VERIFIED]`, but it is strong enough that the planner should proceed with D-04's remedy as
   designed rather than treating it as an open risk.

**Primary recommendation:** Implement LINK-01's `{#id}` handling as a **deletion**, not an
addition — the current Pandoc-model code (override-registration loop + auto-slug suppression)
must be removed so that a `{#id}` suffix flows through the *same* heading-to-slug pipeline as any
other heading text, exactly as GitHub does. Do not write a bespoke `{#id}`-recognition branch for
the GitHub model; the GitHub model is the *absence* of special-casing.

## User Constraints (from CONTEXT.md)

### Locked Decisions

143-CONTEXT.md's `<decisions>` section (D-01 through D-37, all owner-ratified or
adversarial-review-confirmed 2026-08-11) is authoritative and unabridged — read it directly
rather than through this summary. Highlights binding on planning:

- **D-01 (OWNER-RATIFIED):** Adopt the GitHub anchor model; fix all 65 checker-green/GitHub-broken
  links this exposes.
- **D-04 (OWNER-RATIFIED):** Remedy is per-class — Class C → target-side `<a id>`; Class B/A →
  source-side link rewrite; Class D → drop the fragment, link to the file. "Add the missing
  section" is barred (no new prose, per the CARVE Standing bar).
- **D-05:** Class B/C are not disjoint under an if/else split — the planner must define a disjoint
  rule or explicit precedence.
- **D-11:** Extend `check-nav-hub-links.mjs` in place. Do not create a new file, do not rename it.
- **D-12:** Corpus coverage requires deleting **both** `:259` (source-skip of the 4 hubs) and
  `:269` (target-filter to hub-only) in `checkInboundLinks()`. Whichever pass survives must scan
  every file as both source and target.
- **D-14:** Ordering is LINK-01 → `_templates` exclusion → inline-code masking → corpus flip.
- **D-16:** Copy verbatim `^ {0,3}` into all 15 fence-mask call sites. Do not create
  `_lib/fence-mask.mjs`.
- **D-23 (OWNER-RATIFIED):** Phase 143 authors + self-tests + runs the checker to green. Phase 144
  wires it into `check-phase-143.mjs`. This phase authors no `check-phase-143.mjs` and no C18
  harness fold.
- **D-31:** Commit sequence is three steps — (1) SC-amendment commit, (2) CARVE-amendment-only
  commit touching only `v1.20-CARVE.md`, (3) the edits. Never fused.
- **D-33:** GOV-02 ledger row required before editing any of the 9 frozen Pillar-C files.
- **D-34:** Standing bars — no new documentation content; never touch either glossary's
  `last_verified`/`review_by` (zero-margin hazard).

### Claude's Discretion

- Plan/atom decomposition, subject to D-31's commit sequence, D-14's ordering, D-33's
  ledger-row-before-edit rule.
- The disjoint class definition or explicit precedence rule required by D-05.
- Which table row carries the anchor for the two double-row error codes (D-10).
- Exact `<a id>` slug spelling per row — must equal the incoming fragment verbatim, including case.
- Self-test case selection for the GitHub `{#id}` model, `<a id>` recognition, and the inline-mask
  leg.
- Evidence-artifact format for the mask-delta table and the per-class remedy ledger.
- Whether D-15(a)'s `.planning/` link is in the checker's scope or excluded with a recorded
  reason.

### Deferred Ideas (OUT OF SCOPE)

- **`FENCE-AXIS-02`** (D-18) — fence-length divergence and mask-scope (whole-file vs
  post-frontmatter) divergence. LINK-05's subject is indentation only.
- **Detection-regex widening** (D-21) — `c17:209` and `retrofit-*:423` stay column-0.
- **The divergent fence sites outside the census** (D-20) — `check-phase-66.mjs:274`, the 12
  unanchored strip sites in `check-phase-54..59`, `carve-gate.mjs:65`.
- **`.gitattributes` `*.md` normalization** (D-35) — real hazard, not LINK-scoped.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LINK-01 | `computeAnchorSetFromContent` recognises HTML `<a id="…">` anchors | Q3 below — exact regex, confirmed single-shape across all 201 live instances |
| LINK-02 | Corpus-wide checker, excluding `docs/_templates/`, masking inline code spans | Q2 (inline masking is safe as a single-backtick-run regex — no multi-backtick spans exist), Q5 (report-format conventions to preserve) |
| LINK-03 | 13 genuine broken links fixed | Covered by CONTEXT D-06/D-09/D-10/D-34(c) — no new research needed |
| LINK-04 | Checker exits 0, no accepted-violation baseline | Q8 — sequencing analysis showing no committed red interval is required |
| LINK-05 | Fence-mask unified across 15 sites in 9 files | CONTEXT D-16..D-22 fully measured; this file adds no new claims |
| LINK-06 | c17 count-identical before/after | CONTEXT D-22 fully measured; this file adds no new claims |

</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Anchor-slug computation (GitHub model) | Validation script (`scripts/validation/`) | — | Pure function over file content; no I/O beyond reading the corpus |
| Corpus-wide link/anchor scan | Validation script (`scripts/validation/`) | — | `check-nav-hub-links.mjs` is already the corpus walker; this phase widens its scope, not its tier |
| Fence-mask regex | Validation + pipeline scripts (`scripts/validation/`, `scripts/pipeline/`) | — | Copy-verbatim-with-provenance across both tiers per D-16; no shared runtime dependency introduced |
| Corpus content repairs (link/anchor fixes) | Documentation corpus (`docs/`) | — | Content-only edits; governed by CARVE Category 8/10, never by the validation tier |
| CI enforcement wiring | Phase 144 (`check-phase-143.mjs`) | — | Explicitly out of this phase's tier per D-23; this phase authors the tool, not its CI harness membership |
| Frozen-surface governance (CARVE, GOV-02) | Governance artifacts (`.planning/milestones/`) | — | Documentation-tier gate; `carve-gate.mjs` reads it but does not live inside the validation tier it governs |

No browser/frontend/CDN tier exists in this repo's `scripts/validation/` and `scripts/pipeline/`
architecture — this is a Node CLI tooling project, and every capability above sits in a single
tier by construction.

## Research Findings by Open Question

### Q1 — GitHub's exact slug algorithm for the `{#id}` case

**The current code is Pandoc/kramdown, and the fix is deletion, not addition.**

`computeAnchorSetFromContent` (`scripts/validation/check-nav-hub-links.mjs:132-166`, read this
session) currently:
- Registers every `{#id}` occurrence verbatim as its own anchor (`:137-143`)
- Skips auto-slug generation entirely for any heading carrying a trailing `{#id}` (`:150-156`,
  `if (/\s*\{#[a-zA-Z0-9_-]+\}\s*$/.test(m[1])) continue;`)
- `stripHeadingText` (`:121-127`) strips the `{#id}` token *before* slugifying:
  `.replace(/\s*\{#[a-zA-Z0-9_-]+\}\s*$/, '')`

`[VERIFIED: scripts/validation/check-nav-hub-links.mjs:150-156]` — quoted verbatim:
```
    if (/\s*\{#[a-zA-Z0-9_-]+\}\s*$/.test(m[1])) continue;
```
This is exactly the override-suppression D-01 identifies as wrong for GitHub.

**GitHub does not support the `{#id}` kramdown/Jekyll syntax at all** `[CITED: WebSearch —
withastro/roadmap#329, mundimark.github.io/markdown-can-i-use/heading_attributes]` — GitHub
renders the `{#id}` text literally as part of the heading and does **not** set it as the anchor.
The documented GitHub-compatible workaround for custom anchors is the HTML `<a id="xxx">` pattern
(exactly what LINK-01 already teaches the checker, and exactly the corpus's own 201-instance
convention per D-07).

**GitHub's slug algorithm itself** `[CITED: gjtorikian/html-pipeline, lib/html_pipeline/toc_filter.rb,
fetched this session]` — quoted as returned by the fetch:
```ruby
id = ascii_downcase(text)
id.gsub!(PUNCTUATION_REGEXP, '') # remove punctuation
id.tr!(' ', '-') # replace spaces with dash
```
where `PUNCTUATION_REGEXP` is `/[^\p{Word}\- ]/u` (Ruby 1.9+; strips everything except word
characters, hyphens, and spaces). This is the same three-step shape (lowercase → strip → hyphenate)
as the repo's existing `githubSlug()` (`check-nav-hub-links.mjs:111-116`,
`[^a-z0-9 _-]` after lowercasing, then `/ /g` → `-`, never collapsing). The only divergence is
Ruby's `\p{Word}` being Unicode-aware vs. the repo's ASCII-only `[a-z0-9 _-]` — irrelevant here
because every heading checked this session is plain ASCII English.

**Caveat on this citation's authority:** `gjtorikian/html-pipeline`'s own README states "Although
this project was started at GitHub, they no longer use it. This gem must be considered standalone
and independent from GitHub" `[CITED: WebFetch of that README, this session]`. This is therefore
the best available *reference implementation*, not a first-party spec. It is the same
implementation the wider community treats as authoritative for reproducing GitHub's rendering
behavior (see the `github-slugger` npm package, `revin/github-slugger`, which makes the identical
claim and is the most widely used JS reimplementation), and it is fully consistent with the
`githubSlug()` code already living in this repo (which predates this research and was itself
validated against the corpus in Phase 123). Treat this as MEDIUM-confidence corroboration, not a
first-party GitHub spec.

**Worked-example re-derivation** — reproduced independently this session, not copied from
CONTEXT.md: `[VERIFIED: docs/l1-runbooks/30-linux-enrollment-failed.md:63]`, quoted verbatim:
```
## Cause A: Package Install Failure {#cause-a-package-install}
```
Applying the algorithm above: lowercase → `"cause a: package install failure {#cause-a-package-install}"`;
strip everything not `[a-z0-9 _-]` (removes `:`, `{`, `#`, `}`) →
`"cause a package install failure cause-a-package-install"`; replace each space with a hyphen →
`cause-a-package-install-failure-cause-a-package-install`. This is byte-identical to
CONTEXT.md's cited GitHub slug, confirming the algorithm and the worked example independently in
this session.

**The precise implementation change LINK-01 requires** (concrete, for the planner):
1. Delete the `{#id}` override-registration loop (`:137-143`) entirely — GitHub creates no
   anchor from this syntax, so registering one is a false-positive generator in the *other*
   direction (a link to the literal `{#id}` string would falsely resolve).
2. Delete the auto-slug-suppression branch (`:150-156`) — every heading must always get an
   auto-slug, including ones carrying a `{#id}` suffix.
3. Delete the `{#id}`-stripping line from `stripHeadingText` (`:123`) — the `{#id}` token is
   *not* removed before slugifying; it is regular heading text and flows into `githubSlug()`
   exactly like any other characters, where its `{`, `#`, `}` punctuation gets stripped by the
   existing `[^a-z0-9 _-]` filter.
4. The existing self-test assertion D (`:341-350`) asserting
   `overrideSet.has('custom-anchor') && !overrideSet.has('foo-bar')` encodes the *old* (wrong)
   model and must be rewritten to assert the GitHub model instead (e.g. a heading
   `### Foo Bar {#custom-anchor}` should produce slug `foo-bar-custom-anchor`, not `custom-anchor`).

**Edge cases to cover in the new self-test** (Claude's Discretion per CONTEXT, but these are the
cases this session's corpus grep surfaces as real, not hypothetical):
- `{#id}` mid-heading is untested territory — `[MEASURED: grep -rcE '\{#[a-zA-Z0-9_-]+\}' docs
  → 87 occurrences across 29 files, all on heading lines]` reproduces D-02's figure exactly this
  session, but does not itself confirm every occurrence is heading-*trailing* — worth a
  `grep -n '\{#[a-zA-Z0-9_-]+\}[^$]' docs -r` spot check at plan time if the planner wants
  certainty before writing the self-test's mid-heading case, since this research did not verify
  positional placement beyond D-02's "all on heading lines" claim.
- Multiple `{#id}`-shaped tokens in one heading (none observed in this corpus this session, but
  cheap to self-test given the regex is `matchAll`-based already for the old override loop and
  should not be for the new model).
- The double-hyphen mechanism (self-test case A, already passing, unaffected by this change) —
  confirms the repo's own comment at `check-nav-hub-links.mjs:107-110` about punctuation
  surrounded by spaces on both sides producing `--`. A `{#id}` token does **not** trigger this
  case on its own (verified by the worked-example derivation above, which produces a single
  hyphen boundary at "failure-cause"), but a `{#id}` token preceded by other stripped punctuation
  could in principle — no such corpus instance exists to test against.

### Q2 — Inline-code-span masking algorithm

**No multi-backtick inline spans exist in this corpus.** `[MEASURED, this session]`:
```
Grep pattern: ``[^`\n]*`[^`\n]*``   (a 2-backtick span containing a single backtick)
Path: docs/    Result: No matches found
```
CommonMark's real rule (a span opened by N backticks closes on the next run of exactly N) is
therefore **not load-bearing for this corpus today**. A simple per-line
`` /`[^`\n]*`/g `` (single-backtick-delimited run, non-fence lines only) masking pass is
sufficient and matches the complexity level of every other regex already in this file (no
CommonMark-conformant tokenizer exists anywhere in `scripts/validation/` or `scripts/pipeline/`
today — the fence masker itself is a simplified state machine, not a full parser, per the
codebase's own established convention).

`[MEASURED, this session]` a broader single-backtick presence sweep
(`` grep -c '`' `` initial candidate) was not needed once the double-backtick-span search above
returned zero — the absence of *any* multi-backtick opener/closer pair in `docs/` closes this
question without needing to enumerate every single-backtick span.

**Self-test case the planner should lock in** (Claude's Discretion): the D-14-cited failure mode
is itself the right test — `docs/recipes/03-windows-11-multi-app-kiosk.md:173`'s
`` `$x = [xml](Get-Content .\kiosk.xml -Raw)` `` PowerShell cast inside a single-backtick span,
misread as a markdown link before masking. `[VERIFIED: 143-CONTEXT.md D-14, itself citing this
file:line — re-confirm the exact line at plan time since this research did not re-open that file
this session]`.

**Recommendation:** implement the single-backtick masking as an *additional* pass layered on top
of the existing `buildFenceMask` (fence-interior lines are already fully masked; inline spans need
per-character masking *within* non-fenced lines before `extractLinks`'s `/\[([^\]]*)\]\(([^)]+)\)/g`
regex runs against them). Do not attempt a general CommonMark backtick-run tokenizer — it would be
solving a problem the corpus does not have, at the cost of new untested complexity in a file whose
existing regexes are all single-purpose and shallow by design.

### Q3 — The `<a id>` recognition surface

**Every live instance in the corpus is the exact same shape.** `[MEASURED, this session]`:
```
Pattern: <a\s+id\s*=\s*"[^"]*"\s*>\s*</a>
Path: docs/
Result: 200 matching lines, 201 total occurrences, across 32 files
```
This reconciles exactly with CONTEXT D-07's 201 figure — the one-line discrepancy (200 lines vs.
201 occurrences) is a single line carrying two adjacent tags:
`[VERIFIED: docs/admin-setup-android/05-dedicated-devices.md:242]`, quoted verbatim:
```
<a id="exit-kiosk-pin-synchronization"></a><a id="exit-kiosk-pin"></a>
```
This is a real, load-bearing edge case: the LINK-01 regex **must** use a `matchAll`/global loop
per line (exactly the pattern the existing `{#id}` loop at `:140` already uses), not a
single-match `.match()` — otherwise this line silently loses its second anchor.

**No variant diversity exists to defend against.** `[MEASURED, this session]`, four independent
greps, each returning either the full 201-occurrence set or zero:
- Single vs. double quotes: `<a id='` → 0 hits. All 201 use double quotes.
- Self-closing form: `<a id="..." />` → 0 hits (the `/>` grep matched only unrelated SVG/XML
  content in `docs/diagrams/*.svg` and PowerShell/XML code examples inside `.md` files — never
  an `<a id>` tag).
- Extra whitespace / attribute-order variants (`<a  id=`, `<a id ="`, `< a id=`) → 0 hits.
- Text wrapped inside the tag (`<a id="...">TEXT</a>`) → 0 hits. Every instance is the empty
  self-pairing `<a id="..."></a>` immediately followed by other content (bold text, plain text, or
  a table cell's remaining content), never wrapping text itself.
- `<a name=` anywhere in `docs/` → 0 hits, reconciling D-07's "0 `<a name=` anywhere" exactly.

**No `id=` on non-anchor HTML elements exists in any `.md` file.** `[MEASURED, this session]`:
```
Pattern: <(div|span|p|h[1-6]|td|li)[^>]* id=
Path: docs/
Result: No matches found
```
The only other `id=` occurrences anywhere under `docs/` are `<linearGradient id="bg-grad" ...>`
inside `docs/diagrams/*.svg` files — not `.md` content, out of this checker's scope by
construction (the walker only ever reads `.md` files, per `walkMd`'s `entry.endsWith('.md')`
filter at `check-nav-hub-links.mjs:64`). **The question of whether `id=` on a non-anchor element
should count as an anchor is moot for this corpus** — there is nothing to decide against, and the
planner should not add handling for a case with zero live instances.

**Recommended regex, directly implementable:**
```js
/<a\s+id\s*=\s*"([a-zA-Z0-9_-]+)"\s*>\s*<\/a>/g
```
matched per non-fenced line via the same `matchAll` pattern the `{#id}` loop already establishes
at `:140` (before its deletion per Q1) — reuse that loop's shape, just change the regex and the
capture-group target. Verified this session to match all 201 live instances with zero
over-matching against SVG/XML content (the walker's `.md`-only filter already excludes SVGs from
consideration, so no additional guard is needed in the regex itself).

### Q4 — GitHub's HTML sanitizer and the table-cell `<a id>` question

**This is the highest-value question and it resolves in D-04's favor: `<a id="x"></a>` inside a
table cell survives GitHub's sanitizer and produces a working anchor.**

`[CITED: gjtorikian/html-pipeline, lib/html_pipeline/sanitization_filter.rb, DEFAULT_CONFIG
constant, fetched this session]`:
- Allowed elements include `a`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `td`, `th` (quoted from
  the fetch's returned elements array).
- The attributes hash scopes `"a" => ["href"]` element-specifically, but also carries an `all`
  key containing 74 global attributes applied to *every* allowed element — `id` is one of them.
- `table`/`tr`/`td`/`th` carry no element-specific attribute restriction beyond the `all` set,
  meaning `id` (and by extension an `<a id="...">` nested inside a `<td>`) is not stripped.

**Important caveat, stated honestly per this project's anti-fabrication rule:** this specific gem
is **not** what github.com currently runs — its own README says "they no longer use it... must be
considered standalone and independent from GitHub" `[CITED, fetched this session]`. This is the
single largest gap in this answer's authority. No first-party GitHub sanitization spec (open
source or documented) was found via WebSearch this session.

**Corroborating evidence that raises confidence despite that gap:**
1. Independent community sources converge on the identical claim without reference to this gem.
   `[CITED: WebSearch — guidest.com/markdown/anchor, a GitHub Community Discussion #57810]`:
   "Markdown syntax for linking doesn't work inside table cells, which is why using raw HTML tags
   like `<a>` with the `id` attribute is the recommended solution for creating anchor links
   within tables" — describing the *exact* `<a id>`-in-table-cell pattern as GitHub's documented
   workaround, from a source independent of the html-pipeline fetch.
2. `[VERIFIED: docs/admin-setup-android/13-aosp-meta-quest.md:62-65]`, quoted verbatim (one row):
   ```
   | <a id="quest-2-regional"></a>Meta Quest 2 | v49 | AR/VR Headset | Available in select regions only `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
   ```
   This exact pattern — `<a id>` as the first token inside a table cell — is **already live in
   this corpus at scale** (D-07's 201-instance convention includes multiple table-embedded
   instances). This is not proof the anchors resolve on github.com (this research did not run a
   live github.com render), but it is strong indirect evidence: the convention would not have
   been adopted 201 times across Android/macOS/iOS/ESP docs by prior phases if it silently failed.

**Recommendation:** proceed with D-04's target-side `<a id>` remedy as designed. This is CITED,
not VERIFIED — if the planner or executor wants VERIFIED-tier certainty, the only path is an
actual github.com render check (push a test branch, view the rendered page, click the anchor
link) — which D-08's own framing already anticipates for the `.docx` deliverable side but not
explicitly for the GitHub-rendering side. Flag this as a candidate `checkpoint:human-verify` if
the plan wants zero residual risk on D-04's foundational assumption, though the convergence of two
independent sources plus 201 live corpus instances makes this a low-probability failure mode.

### Q5 — Report format and exit-code conventions

**The house style, read directly from the two files this phase extends:**

`padLabel` convention `[VERIFIED: scripts/validation/check-nav-hub-links.mjs:36-40]`, quoted
verbatim:
```js
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
```
Used in `check-nav-hub-links.mjs`'s own `--self-test` mode (`:295-298`) for `[ST] <label> PASS/FAIL`
lines — the checker already follows this convention for its own tests; extend it, don't invent a
new format.

**Machine-readable summary line, the pattern to preserve exactly:**
`[VERIFIED: scripts/validation/check-nav-hub-links.mjs:418-420]`, quoted verbatim:
```js
process.stdout.write(
  `\ncheck-nav-hub-links summary: ${outboundFailures.length} outbound failure(s), ` +
  `${inboundFailures.length} inbound failure(s), ${allFailures.length} total\n`
);
```
This is the c17 sibling's exact idiom — `[VERIFIED: scripts/validation/c17-eee-contract.mjs:579-582]`
quoted verbatim:
```js
'C17 assertion-violation-counts: ' +
Object.entries(counts).map(([k, v]) => '#' + k + '=' + v).join(' ') + '\n'
```
which `check-phase-115.mjs:88` pins via `String.includes('C17 assertion-violation-counts:')`
`[VERIFIED: scripts/validation/check-phase-115.mjs:83-90]`, quoted verbatim:
```js
    const needle = 'C17 assertion-violation-counts:';
    if (!c.includes(needle)) return { pass: false, detail: 'COUNTS-SUMMARY needle absent: ' + needle };
```
Two further pins on this same style, both confirmed this session:
- `check-phase-115.mjs:74-75` `[VERIFIED]`: `const needle = '--self-test';` — a bare substring
  check, meaning the checker's existing `--self-test` flag string must survive verbatim.
- `check-phase-115.mjs:101-104` `[VERIFIED]`: asserts `'CHAIN_PHASES'` is **required-ABSENT** from
  `c17-eee-contract.mjs` (`if (c.includes('CHAIN_PHASES')) return { pass: false, ... }`) — the
  same class of constraint D-23 already names as binding for whatever eventual `check-phase-143.mjs`
  spawns this checker: the checker itself must never self-register into `CHAIN_PHASES`.

**Recommendation for LINK-02's widened summary line:** keep `check-nav-hub-links summary: ...`
byte-identical in *shape* (this exact string is what `check-phase-123.mjs:83`'s `presence()`
check indirectly depends on existing, per D-11 — though `presence()` itself is a file-existence
check, not a content pin `[VERIFIED: scripts/validation/check-phase-123.mjs:40,83]`, so the
summary line text itself carries no known frozen pin today). Since Phase 144's
`check-phase-143.mjs` will pin *something* about this output, prefer widening the existing counts
(outbound/inbound failure counts) rather than inventing a new line format — this keeps the
future pin's surface area as small and predictable as the c17 precedent.

**Exit-code convention, confirmed from both files:** `exit 0` iff zero failures (normal mode) or
zero self-test failures (`--self-test` mode); `exit 1` otherwise. Both files use
`process.exit(N > 0 ? 1 : 0)` at the tail — `[VERIFIED: check-nav-hub-links.mjs:423]` and
`[VERIFIED: c17-eee-contract.mjs:589]`. No third exit code exists anywhere in either file.

### Q6 — GOV-02 ledger mechanics

**Row schema, confirmed:** `[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:19-22]`,
quoted verbatim:
```
| File | Grep command | Hit count | Regression gate run | Result | Plan |
|------|--------------|-----------|----------------------|--------|------|
```
**Discipline rules, quoted verbatim** `[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:10-17]`:
- "Append-only. New rows are appended at the end, in commit order. No existing row is ever edited
  or reordered by a later plan."
- "Row-per-edit, not row-per-path. Every frozen-surface path modified in this milestone gets at
  least one row. Two edits to the same path across two plans may produce two rows — Phase 144's
  row-per-path assertion is satisfied by path presence in the ledger, never by a bare row count."
- "Absence is correct, not missing evidence. A plan that modifies no frozen-surface path adds no
  row here."

**Row count for Phase 143.** The ledger currently ends at row 62 (`scripts/validation/check-phase-138.mjs`,
Plan 05, `[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:62]`, read this session). D-33's
"roughly 11+ rows" figure (9 Pillar-C files + corpus set + ROADMAP/REQUIREMENTS) is the right
planning estimate — each of the 9 Pillar-C files gets at least one row per D-12's target-scoped
grep procedure, plus at least one combined row for the `.planning/` document amendments (row 59
in the current ledger is the precedent for batching multiple `.planning/` document edits into one
row when they're a single SC-amendment commit — `[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:59]`).

**A prior row to copy the shape of, verbatim** (the most structurally similar precedent — a chain
validator edited with a target-scoped grep, a symbol-scoped grep, and a regression-gate run before
and after) `[VERIFIED: .planning/milestones/v1.20-GOV-02-LEDGER.md:55]`, File column and Grep
column reproduced verbatim:
```
File: `scripts/validation/check-phase-67.mjs` (`:261` chain-spawn timeout raised 300000 -> 1800000, D-17, Plan 141-04 Task 2 — the ONLY edit this milestone makes to this file)
Grep command: Path-literal grep: `check-phase-67.mjs` across `scripts/`, `.github/`, `.planning/` (target-scoped, D-12). Symbol grep: `timeout: 300000`, `chicken-and-egg` across `scripts/validation/check-phase-67.mjs`. Cross-reference check: opened `check-phase-73.mjs:266-299` (`V-73-CONVERT-67-05/06`) and `check-phase-74.mjs:59,84` (comment-only line-range mentions) to confirm neither pins a raw line number against this file.
```
Note the pattern: (1) path-literal grep across `scripts/`, `.github/`, AND `.planning/` — not
just `scripts/`; (2) a symbol-scoped grep for the specific text being changed; (3) an explicit
cross-reference check of any validator that might pin the *old* value; (4) the "Result" column
states a concrete before/after diff size (e.g. `git diff --numstat` = 2 added / 1 removed), never
a bare "PASS".

**GOV-02's authorizing text, for the planner to cite directly rather than re-deriving:**
`[VERIFIED: .planning/milestones/v1.20-CARVE.md:93-104]`, quoted verbatim:
```
Every GOV-02 grep before editing a frozen validator line must be **target-scoped**, not
symbol-scoped: it must search for the **file path string**, not only the symbol/identifier
name. A symbol-only grep misses call sites that pin a *path literal* rather than a function or
constant name.
```

### Q7 — CARVE amendment mechanics

**Amendment procedure (D-09), quoted verbatim** `[VERIFIED: .planning/milestones/v1.20-CARVE.md:64-77]`:
```
1. Touches only this file (.planning/milestones/v1.20-CARVE.md) — no other path, in-scope
   or out-of-scope, may be touched in the same commit.
2. Carries a one-line rationale for the addition, either in the commit message or as a new #
   comment line directly above the added glob(s) in the allowlist block.
3. Lands before the edit it authorizes — never in the same commit, never after.
```

**Gate failure disposition (D-10), quoted verbatim**
`[VERIFIED: .planning/milestones/v1.20-CARVE.md:79-91]`:
```
- Hard-block on a non-zero carve-gate.mjs exit inside a plan's verification step. There is
  no warn-and-continue path.
- ...
- The only resolution path for an off-list hit is a prior amendment commit per the procedure
  above. A gate failure is never resolved by degrading it to a warning.
```

**`globToRegExp` — `**` and `*` semantics, confirmed by reading the implementation this session**
`[VERIFIED: scripts/validation/carve-gate.mjs:39-50]`, quoted verbatim:
```js
export function globToRegExp(glob) {
  const PLACEHOLDER = ' DOUBLESTAR ';
  let re = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  re = re.split('**').join(PLACEHOLDER);
  re = re.split('*').join('[^/]*');
  re = re.split(PLACEHOLDER).join('.*');
  return new RegExp('^' + re + '$');
}
```
`**` maps to `.*` (crosses directory boundaries), a lone `*` maps to `[^/]*` (does not cross
`/`). Confirmed working this session by re-reading `carve-gate.mjs`'s own `--self-test` case
(i-b) `[VERIFIED: scripts/validation/carve-gate.mjs:372-378]`: a pattern
`docs/admin-setup-ios/**` matches `docs/admin-setup-ios/07-device-enrollment.md` (nested) but not
`docs/admin-setup-android/05-dedicated-devices.md` (sibling directory) — so `docs/error-codes/**`
would work exactly as expected: it matches any nested path under `docs/error-codes/` and nothing
outside it.

**Existing allowlist state, confirmed this session** `[VERIFIED: .planning/milestones/v1.20-CARVE.md:194-257]`
— Category 3 (the vessel + 8 other Pillar-C files, `:201-210`) and Category 8
(`docs/_glossary-macos.md`, `docs/admin-setup-ios/**`, `:249-251`) already exist. **No amendment
is needed to edit the 9 Pillar-C files or LINK-03's 13 known fixes** — they're pre-authorized.
**A new Category 10 amendment IS needed** for the broader corpus-repair set D-32 identifies (the
~46-47-file union beyond Category 8, for the 132-anchor remedy). Quoted verbatim, D-32's own
figure `[VERIFIED: 143-CONTEXT.md:438-451, already read this session — not re-derived, reproduced
here for the planner's convenience]`: "50-file union, of which 3 are already on Category 8, so
~46-47 need listing."

**A prior amendment bullet to copy the shape of, verbatim**
`[VERIFIED: .planning/milestones/v1.20-CARVE.md:151-154]`:
```
- **D-35, RED-04 extended.** RED-04 as worded is already satisfied vacuously by V-30-02, whose
  regular expression is built from a double-quoted string and has never inspected a Mermaid
  block; the amendment brings that defect into RED-04's scope so the fix is authorized scope,
  not drift.
```
Pattern: bold `**D-NN, short label.**` lead-in (one colon max, kept outside the bold span per
the project's own decision-bullet grammar convention), followed by prose naming the defect and
why the amendment is needed — never a bare glob addition with no rationale.

**Concrete Category 10 amendment shape, to draft at plan time:**
```
# Category 10 — LINK-01..06's broader anchor-remedy corpus set (D-32, Phase 143)
docs/l1-runbooks/**
docs/l2-runbooks/**
docs/error-codes/**
docs/**  # or an enumerated per-directory list per D-32's roster — re-derive at plan time after LINK-03
```
D-32 explicitly instructs: "Re-derive the exact roster at plan time after LINK-03 lands — an
off-list path is a hard exit 1 with no warn-and-continue path." This research does not attempt to
enumerate the 46-47 files itself — that is correctly deferred to plan time per D-32's own
instruction, and doing so here would risk exactly the kind of stale-number drift D-36/D-37 warn
against.

### Q8 — Sequencing risk (corpus repairs vs. checker widening)

**No unavoidable red interval is required for the *committed* state, but a working-tree red
interval during development is fine and has no gating consequence.** Reasoned from three
independently confirmed facts this session:

1. **The vessel file (`check-nav-hub-links.mjs`) is already CARVE Category 3** — every code change
   to it (LINK-01's model fix, the `_templates` exclusion, inline masking, and the final "corpus
   flip" removing `:259`/`:269`) is pre-authorized. None of D-14's four ordering steps needs a
   CARVE amendment to land. D-14's ordering is therefore purely a **diagnostic-quality**
   constraint (avoid a false 311-finding report), not a gating constraint.
2. **Content repairs to `docs/` files ARE gated**, and split into two allowlist states:
   - LINK-03's 13 known fixes (11 in `docs/_glossary-macos.md`, 2 in `docs/admin-setup-ios/`) are
     already on Category 8 — no amendment needed, can land at any point.
   - The broader anchor-remedy set (D-04's Class B/C repairs across ~46-47 files) needs the new
     Category 10 amendment to land **first**, per D-09's amendment procedure (rule 3: "lands
     before the edit it authorizes — never in the same commit, never after"). Attempting to edit
     any of those 46-47 files before the amendment commit lands is a hard `carve-gate.mjs` exit 1
     with no warn-and-continue path, per D-10.
3. **The checker is not wired into CI or any gate during this phase** (D-23 — that's Phase 144's
   `check-phase-143.mjs`). A `node scripts/validation/check-nav-hub-links.mjs` run that reports
   145 (or 311, pre-model-fix) failures mid-development has zero downstream consequence — nothing
   consumes its exit code until Phase 144. The only thing that must be true by the *end* of Phase
   143 is LINK-04's exit-0 state; nothing requires every intermediate commit to also exit 0.

**Recommended ordering, synthesizing all three facts (this is new synthesis, not restated from
CONTEXT — CONTEXT's D-14 covers only the code-ordering half):**

1. Land the SC-amendment commit (D-29's seven-statement amendment set) and the CARVE Category-10
   amendment commit as D-31's steps 1 and 2 — early, so no later plan is blocked mid-execution
   waiting on an amendment. These are `.planning/`-only edits, outside `IN_SCOPE_PREFIXES`
   `[VERIFIED: scripts/validation/carve-gate.mjs:36]` (`const IN_SCOPE_PREFIXES = ['scripts/', '.github/', 'docs/'];` —
   `.planning/` is absent), so they never trip `carve-gate.mjs` themselves regardless of when they
   land relative to code changes.
2. Land LINK-01 (the GitHub anchor model) first among the code changes, per D-14 — this alone
   drops the false-positive count from 271→70 on the *existing* (still hub-scoped) checker, giving
   every subsequent step a smaller, more diagnostic-value report.
3. Land the `_templates` exclusion and inline-code masking, per D-14 — each incrementally narrows
   the true-positive set before the corpus-wide scope is turned on.
4. Land the corpus repairs (LINK-03's 13 + the Category-10-gated 132-anchor remedy) — these can
   be developed and verified against the *already-known* 145-item list from CONTEXT's own
   prototype measurement (D-28's background scan), without needing the live checker to be
   corpus-wide yet. This means repairs are never blocked on the flip landing first.
5. Land the "corpus flip" (removing `:259`/`:269`) last, once repairs are already in place — the
   very first corpus-wide run then reports 0 failures, and LINK-04's "no baseline" requirement is
   trivially satisfied because there is never a moment where a corpus-wide red state exists in a
   landed commit.

This ordering never produces a committed red interval and never blocks a plan on an amendment
that hasn't landed yet — the two failure modes D-31 and D-14 each individually guard against.

## Standard Stack

This phase introduces **zero external packages**. `[VERIFIED: scripts/validation/check-nav-hub-links.mjs:17]`,
quoted verbatim: `"Node built-ins ONLY -- zero external npm packages (matches scripts/validation/
convention)"`. Every function this research recommends (slug computation, `<a id>` regex,
inline-code masking) is implementable with `node:fs`, `node:path`, `node:process`, and native
`RegExp` — exactly the imports already present at the top of the file
(`readFileSync, existsSync, readdirSync, lstatSync` / `join, dirname, resolve` / `process`).

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-rolled `githubSlug()` regex pipeline | `github-slugger` npm package | Rejected — adds a dependency to a zero-dependency file for a ~5-line function already implemented, tested, and corpus-verified in-repo; violates the repo's explicit "Node built-ins ONLY" convention |
| Per-line single-backtick regex masking | A real CommonMark tokenizer (e.g. `markdown-it`, `remark`) | Rejected — the corpus has zero multi-backtick spans (measured this session), so the simple regex is not a corner cut, it is the correctly-sized solution; a full parser would be solving a problem this corpus does not have |
| Shared `_lib/fence-mask.mjs` | Copy-verbatim `^ {0,3}` into all 15 sites | Already decided (D-16, locked) — not reopened here |

**Installation:** none required.

## Package Legitimacy Audit

**Not applicable.** This phase installs no external packages in any ecosystem — confirmed by
reading the target file's own header comment this session
(`scripts/validation/check-nav-hub-links.mjs:17`) and by the fact that every recommended
implementation change in this research uses only Node built-ins already imported by the file. No
`npm view`/`pip index`/`cargo search` verification is applicable.

## Architecture Patterns

### System Architecture Diagram

```
docs/**/*.md (274 files post-_templates-exclusion)
        |
        v
   walkMd('docs')  ---------->  [excludes docs/_templates/*, NEW this phase]
        |
        v
  readFile() [CRLF-normalized]
        |
        v
  content.split('\n')
        |
        v
  buildFenceMask(lines) -----> masks ``` / ~~~ fence interiors (^ {0,3} rule, LINK-05)
        |
        v
  [NEW] inline-code-span mask -> masks single-backtick spans on non-fenced lines (LINK-02)
        |
        +---------------------------------------------+
        v                                              v
  computeAnchorSetFromContent(content)          extractLinks(lines, fenceMask)
   (per target file, cached)                     [text](target) pairs, 1-based lines
        |  githubSlug() -- NO {#id} special-case      |
        |  (LINK-01: delete override loop +            |
        |   auto-slug suppression)                     |
        |  [NEW] <a id="..."></a> recognition           |
        |  (LINK-01, matchAll per line)                 |
        v                                              v
   resolvableAnchorSet(relPath)  <----  resolveLinkTarget(linkingAbsPath, target)
        |                                              |
        +---------------------- has(fragPart)? --------+
                         |
                         v
              checkOutboundLinks() [4 hubs, unchanged]
              checkInboundLinks()  [NEW: full corpus, both :259 and :269 deleted -- LINK-02/D-12]
                         |
                         v
              printFailures() -> stdout, file:line -- reason
                         |
                         v
              summary line + process.exit(0|1)  [LINK-04: 0 iff empty]
```

### Recommended Project Structure

No new files. `[VERIFIED: .planning/milestones/v1.20-CARVE.md:201-210]` — the allowlist already
enumerates exactly the 9 files this phase touches; no 10th vessel file is authorized or needed
(D-11, locked).

### Pattern 1: Copy-verbatim-with-provenance fence masking (D-16)

**What:** The identical `buildFenceMask` function body, with a one-line provenance comment citing
its source, is duplicated across all 15 call sites rather than imported from a shared module.
**When to use:** Already decided — this phase's LINK-05 work. Do not deviate.
**Example**, the pattern already established and to replicate with the `^ {0,3}` widening
`[VERIFIED: scripts/validation/check-nav-hub-links.mjs:82-103]`:
```js
// buildFenceMask: mask code-fence-interior lines (retrofit-mermaid-structural.mjs:262-280,
// verbatim) -- excludes fenced ```markdown/```text example headings and links from both
// the anchor-set builder and the link scanner.
function buildFenceMask(lines) {
  const mask = new Array(lines.length).fill(false);
  let fenced = false, fenceChar = '', fenceLen = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i];
    if (!fenced) {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m) { fenced = true; fenceChar = m[1][0]; fenceLen = m[1].length; }
    } else {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m && m[1][0] === fenceChar && m[1].length >= fenceLen) {
        fenced = false;
      } else {
        mask[i] = true;
      }
    }
  }
  return mask;
}
```
LINK-05's edit is: change `^(`{3,}|~{3,})` to `^ {0,3}(`{3,}|~{3,})` at every one of the 15 sites,
byte-identical elsewhere, per D-16.

### Pattern 2: `matchAll`-per-line for multi-occurrence anchor recognition

**What:** Any regex that can match more than once on a single line (both the existing `{#id}`
loop and the new `<a id>` recognition) must iterate with `matchAll`, never a single `.match()`.
**When to use:** LINK-01's `<a id>` regex — proven necessary this session by the
`exit-kiosk-pin-synchronization` / `exit-kiosk-pin` double-tag line (Q3 above).
**Example** (the existing precedent to replicate)
`[VERIFIED: scripts/validation/check-nav-hub-links.mjs:140]`:
```js
for (const m of lines[i].matchAll(/\{#([a-zA-Z0-9_-]+)\}/g)) {
  set.add(m[1]);
}
```

### Anti-Patterns to Avoid

- **Writing a general CommonMark backtick-run tokenizer for LINK-02:** the corpus has zero
  multi-backtick spans (Q2). A single-backtick-run regex is correctly sized; a tokenizer would be
  unused complexity.
- **Re-adding a `{#id}`-recognition branch instead of deleting the existing one:** LINK-01 is a
  net *deletion* from `computeAnchorSetFromContent` and `stripHeadingText`, not an addition. See
  Q1.
- **Widening detection regexes (`c17:209`, `retrofit-*:423`'s `/^```mermaid/`) to `^ {0,3}`:**
  explicitly deferred (D-21, D-18) — LINK-05's subject is the *mask*, not detection.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| GitHub anchor slugification | A from-scratch Unicode-aware slugger | The existing `githubSlug()` (already in-repo, corpus-verified) with its `{#id}`-special-casing removed | Q1 confirms the existing function's core algorithm already matches GitHub's reference implementation; the only defect is the `{#id}` special-casing layered on top of it, not the slugifier itself |
| Multi-backtick inline code detection | A CommonMark-conformant backtick-run parser | A single-backtick-run regex | Q2 confirms zero corpus instances need the general case |
| A new corpus-wide link-checker file | `checkInboundLinks()` | Widen it in place | D-11, locked — it already walks, fence-masks, and caches at corpus scale in <1s |

**Key insight:** every "don't hand-roll" item in this phase is really "don't hand-roll a bigger
version of a tool this repo already has, correctly sized" — the repeated pattern across Q1/Q2/Q11
is that the existing code is *closer* to correct than the draft's framing suggested, and the fix
is narrower (often a deletion) than a new-feature framing would imply.

## Common Pitfalls

### Pitfall 1: The `{#id}` fix is deletion-shaped, and a naive implementation adds code instead
**What goes wrong:** A plan or executor reads "recognise `<a id>`" and "adopt the GitHub model"
as two additive features, and leaves the existing override-registration/suppression code in place
alongside new code, producing a checker that behaves inconsistently (sometimes treating `{#id}` as
an override, sometimes not, depending on which code path runs first).
**Why it happens:** LINK-01's requirement text ("recognises HTML `<a id>` anchors") only describes
the addition half; the CONTEXT's D-01/D-02 describe the deletion half in prose, not as an explicit
diff.
**How to avoid:** Treat Q1's four-step change list above as the literal task list — three
deletions, one self-test rewrite.
**Warning signs:** if the diff to `check-nav-hub-links.mjs` for LINK-01 has more added lines than
removed lines in `computeAnchorSetFromContent`/`stripHeadingText`, re-check against Q1.

### Pitfall 2: Editing a Category-10 corpus file before the CARVE amendment lands
**What goes wrong:** `carve-gate.mjs` hard-blocks with exit 1, no warn-and-continue path (D-10).
**Why it happens:** the natural work order (fix the anchor, THEN remember governance) is the
wrong order for this repo's process.
**How to avoid:** land the Category-10 amendment (Q7) before touching any of the ~46-47 files
outside Category 8's existing roster. Re-derive the exact roster at plan time per D-32 (after
LINK-03 lands), not from this document's placeholder glob list.
**Warning signs:** `node scripts/validation/carve-gate.mjs` reporting `off-list=N > 0`.

### Pitfall 3: Treating the `gjtorikian/html-pipeline` sanitizer citation as first-party GitHub
documentation
**What goes wrong:** overclaiming Q4's answer as `[VERIFIED]` when github.com itself does not run
this exact code today.
**Why it happens:** the citation is unusually strong (an actual sanitizer allowlist with `id` in
the global attribute set) and easy to mistake for authoritative.
**How to avoid:** keep the `[CITED]` tag on any downstream claim built on Q4; if the plan wants
zero residual risk, add a `checkpoint:human-verify` step that renders a corpus file with a
table-embedded `<a id>` on github.com directly.

### Pitfall 4: Assuming the checker's summary-line text is unpinned and free to change format
**What goes wrong:** Phase 144's `check-phase-143.mjs` (not yet authored) will very likely pin
*something* about this checker's output, following the c17 precedent exactly (`'--self-test'`,
`'C17 assertion-violation-counts:'`, `'CHAIN_PHASES'` required-absent — three pins on one sibling
file). Inventing a wholly new summary-line format for LINK-02's widened scan increases the surface
area Phase 144 has to pin against with no upstream review.
**Why it happens:** the widened checker's new "N inbound failure(s)" text is misleading for a
274-file corpus scan (D-11 already flags this at `:406,410,414,419-420`), tempting a full rewrite.
**How to avoid:** keep the *shape* of the summary line (labelled counts + total + exit code
semantics) even while updating the wording so it no longer implies a 4-hub-only scan.

## Code Examples

### The existing `<a id>`-analog regex loop to model LINK-01's new recognition on
```js
// Source: scripts/validation/check-nav-hub-links.mjs:137-143 (this session, verbatim, the
// loop LINK-01 must repurpose for <a id> instead of {#id} — see Q1/Q3)
for (let i = 0; i < lines.length; i++) {
  if (fenceMask[i]) continue;
  for (const m of lines[i].matchAll(/\{#([a-zA-Z0-9_-]+)\}/g)) {
    set.add(m[1]);
  }
}
```

### GitHub's own reference slug algorithm, for cross-checking the repo's `githubSlug()`
```ruby
# Source: gjtorikian/html-pipeline, lib/html_pipeline/toc_filter.rb (fetched this session)
id = ascii_downcase(text)
id.gsub!(PUNCTUATION_REGEXP, '') # remove punctuation
id.tr!(' ', '-') # replace spaces with dash
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| `{#id}` treated as a Pandoc/kramdown override, suppressing auto-slug | `{#id}` treated as literal heading text, folded into the normal auto-slug pipeline (GitHub model) | This phase (LINK-01, D-01) | 65 checker-green/GitHub-broken links become visible and fixable; corrects a defect present since the checker's Phase 123 origin |
| Two-hub-scoped corpus scan (`:259`/`:269` filters) | Full corpus, every file both source and target | This phase (LINK-02, D-12) | Coverage rises from 4 files to 274; `checkInboundLinks()`'s existing walker/cache infrastructure is reused, not replaced |

**Deprecated/outdated:** the "pandoc is the authoritative renderer" framing for anchor resolution
— D-01(a)/(b)/(c) already establishes this is dead on three independent legs (no section anchors
in the `.docx` deliverable at all, `PROJECT.md`'s own "plain-GitHub anchor slugs preserved"
statement, and pandoc itself emitting no bookmark for a table-cell `<a id>`). Not re-litigated
here — CONTEXT already closes this question definitively.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `gjtorikian/html-pipeline`'s sanitizer allowlist accurately reflects github.com's *current* production sanitization behavior for `<a id>` inside `<td>` | Q4 | If wrong, D-04's Class-C remedy produces anchors that render as visible-but-inert HTML on GitHub (not a data-loss risk, but a functional gap in exactly the deliverable this phase exists to fix) — mitigate with a `checkpoint:human-verify` live-render check if zero residual risk is required |
| A2 | Every `{#id}` occurrence in the corpus is heading-trailing (not mid-heading or in prose) | Q1 | If a mid-heading or prose instance exists, the self-test's edge-case coverage would need an additional case; does not affect the core deletion-shaped fix, only its test completeness — D-02's own corpus grep already confirms "all on heading lines," so this is low-risk |
| A3 | The corpus contains zero non-ASCII heading text that would diverge under `\p{Word}` (Ruby, Unicode-aware) vs. `[a-z0-9 _-]` (repo's ASCII-only implementation) | Q1 | If a non-ASCII heading exists undetected, its slug would differ from GitHub's true rendering; this research did not run an exhaustive non-ASCII sweep across all 274 files, only checked the worked example and the corpus's general English-language character | Low — the corpus is explicitly Windows/Intune enterprise IT documentation, observed English throughout every file opened this session |

## Open Questions

1. **Does the corpus contain any `{#id}`-shaped token mid-heading or with unusual spacing (e.g.
   zero preceding spaces)?**
   - What we know: D-02's grep confirms all 87 occurrences are "on heading lines"; this research
     did not verify *positional* placement within those lines beyond the one worked example.
   - What's unclear: whether the self-test needs a mid-heading edge case or whether trailing-only
     coverage is sufficient.
   - Recommendation: run `grep -n '\{#[a-zA-Z0-9_-]+\}[^$]' docs -r` at plan time (a `{#id}` NOT
     immediately followed by end-of-line) before finalizing the self-test case list; this is a
     30-second check that removes the residual uncertainty in A2.

2. **Should the widened checker's report format change beyond the label wording, or stay
   byte-identical apart from wording, ahead of Phase 144's not-yet-authored pin?**
   - What we know: the c17 precedent shows Phase 144 will very likely pin something concrete
     about this file's output (three pins on the c17 sibling).
   - What's unclear: exactly what Phase 144 will choose to pin, since `check-phase-143.mjs` does
     not exist yet.
   - Recommendation: keep the summary line's *shape* stable (Pitfall 4) and let Phase 144 make its
     own pinning decision against whatever this phase ships — do not attempt to pre-guess Phase
     144's needle-spec, per D-23's explicit "hands off a needle-spec" framing (the needle-spec is
     Phase 144's artifact to write, not this phase's to anticipate).

## Environment Availability

Skipped — this phase has no external tool/service dependencies beyond Node.js, `git`, and
PowerShell (`convert.ps1`), all already in continuous use throughout this milestone with no new
requirement introduced by LINK-01..06.

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (default: enabled), but this phase
is a documentation-tooling change with no authentication, session, network, or user-input surface
— it is a static-analysis CLI over a local Markdown corpus.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A — no auth surface in this tool |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Marginal | The existing `resolveLinkTarget` already handles pathological `../../../../etc/passwd`-style targets without throwing (`[VERIFIED: check-nav-hub-links.mjs:206-215]`, self-test case G at `:376-390` already covers this) — no new input-validation surface is introduced by LINK-01..06, since all new inputs (heading text, `<a id>` attribute values) flow through the same `readFile`/regex pipeline already exercised by the existing self-test |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| ReDoS via a pathological Markdown file crafted to catastrophically backtrack a regex | Denial of Service | Every regex this research recommends (`<a id>` recognition, single-backtick masking) is linear-time (no nested quantifiers, no ambiguous alternation) — matches the existing file's own regex complexity level; not a new risk class |
| Path traversal via a malicious relative link target | Tampering | Already handled — `resolveLinkTarget` never throws and resolves to a `not found` result via `existsSync`, verified by the existing self-test case G |

## Sources

### Primary (HIGH confidence — file:line read this session)
- `scripts/validation/check-nav-hub-links.mjs` — full file read this session
- `scripts/validation/c17-eee-contract.mjs:140-409` — fence mask, assertions #1/#5/#11/#12
- `scripts/validation/carve-gate.mjs` — full file read this session
- `scripts/pipeline/convert.ps1:95-134` — fence loop, D-03(b) guard
- `scripts/validation/check-phase-115.mjs:60-115` — the three c17 pins
- `scripts/validation/check-phase-123.mjs:75-89` — the `LINKCHECKER` presence pin
- `.planning/milestones/v1.20-CARVE.md` — amendment procedure, gate disposition, GOV-02 grep
  procedure, standing bars, allowlist categories 1-9
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — schema, discipline rules, rows 23/55/56-63
- `docs/l1-runbooks/30-linux-enrollment-failed.md:53,63` — the D-01 worked example
- `docs/admin-setup-android/05-dedicated-devices.md:242` — the double-tag `<a id>` edge case
- `docs/admin-setup-android/13-aosp-meta-quest.md:62-65` — table-embedded `<a id>` in-corpus
  precedent
- Corpus greps executed this session (`{#id}` occurrence count, `<a id>` regex census,
  multi-backtick span search, non-anchor `id=` search) — all reproduced against live `docs/`
  content, not copied from CONTEXT.md

### Secondary (MEDIUM confidence)
- `gjtorikian/html-pipeline`, `lib/html_pipeline/toc_filter.rb` and
  `lib/html_pipeline/sanitization_filter.rb` (fetched this session) — GitHub's reference
  slug algorithm and sanitizer allowlist; explicitly *not* what github.com currently runs, per
  its own README, but the best available reference implementation
- WebSearch: withastro/roadmap discussion #329, mundimark.github.io/markdown-can-i-use — GitHub
  does not support `{#id}` heading-attribute syntax
- WebSearch: guidest.com/markdown/anchor, GitHub Community Discussion #57810 — `<a id>` in table
  cells as GitHub's documented workaround, independent corroboration of Q4

### Tertiary (LOW confidence)
- None — every claim in this document is either file:line-verified this session or carries an
  explicit `[CITED]` tag with its corroborating-but-non-first-party source named inline.

## Metadata

**Confidence breakdown:**
- Repo-internal claims (Q1's code location, Q3's regex census, Q5's pin text, Q6/Q7's ledger and
  CARVE mechanics): HIGH — every one read with the `Read` tool this session, quoted verbatim.
- GitHub rendering-engine internals (Q1's slug algorithm, Q4's sanitizer behavior): MEDIUM — no
  first-party GitHub spec exists; corroborated via a community reference implementation plus
  independent secondary sources plus in-corpus circumstantial evidence, not a live test.
- Sequencing analysis (Q8): HIGH — derived from directly-verified facts (CARVE scope, allowlist
  state, D-23's phase boundary), original synthesis not present verbatim in CONTEXT.md.

**Research date:** 2026-08-11
**Valid until:** Effectively permanent for the repo-internal claims (frozen files, static
allowlist state at time of writing — re-verify if any Pillar-C file changes before this phase's
plan lands). 90 days for the GitHub-rendering-engine claims (Q1's slug algorithm, Q4's sanitizer
behavior) — GitHub's rendering pipeline is not versioned or changelogged publicly, so treat this
as a "best known state" rather than a pinned spec.
