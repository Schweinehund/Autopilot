# Phase 129: Device Recipe Doc-Class Foundation - Research

**Researched:** 2026-07-17
**Domain:** Documentation-standard authoring + C17 harness mechanics (Markdown corpus, no code/runtime surface)
**Confidence:** HIGH — every claim below is grounded in direct reads of the live local files and live tool runs (`node scripts/validation/c17-eee-contract.mjs --self-test` / `--verbose`), not training data. All 8 CONTEXT.md gray areas are LOCKED and not re-litigated here; this document answers "where exactly do the edits go and what exactly must the template contain to stay C17-green."

## Summary

Phase 129 is a pure content-plane, two-file change: (1) `docs/_standards/EEE-SOP-standard.md` gains one new D-02 bullet ruling and one new top-level `STD-05` section, and (2) `docs/_templates/recipe-template.md` is created as a C17-green, TEMPLATE-SENTINEL'd scaffold. No script under `scripts/validation/` is edited (D-10 is explicit and independently confirmed safe below), no registry row is added (Phase 132's job), and no external package is installed.

Live verification today: `node scripts/validation/c17-eee-contract.mjs --self-test` passes 4/4, and a full corpus run (`--verbose`) reports **229 files checked, 0 violations** (not the 225 the CONTEXT-stage discussion assumed — the corpus has grown since; treat 229/0 as the pre-phase baseline to diff against, not 225). `check-phase-120.mjs` — the only chain validator that reads `EEE-SOP-standard.md` — asserts on **substring presence** (`.includes(needle)`) of two specific headers (`## Mermaid-in-Enrolled-Classes Policy (STD-04)` and `#### Non-MECE precedence rule (D-08)`), not byte-exact content or line numbers. Because this phase only *adds* a new section after STD-04 and does not edit or remove existing STD-04/D-08 text, `check-phase-120.mjs` stays green with zero reconciliation work. No `-audit-allowlist.json` sidecar pins any line inside `EEE-SOP-standard.md`.

**Primary recommendation:** Insert the D-02 ruling bullet at the end of the existing bullet list (after the "Lifecycle documents" bullet, before the "five structural classes" summary-table lead-in), and insert the new `## <Title> (STD-05)` section as a new top-level section directly between the existing STD-04 section's closing `---` divider and the `## C17 Enforcement Reference` header — the exact insertion point the v1.16 STD-04 addition itself used relative to the section that preceded it. Build `recipe-template.md` from `admin-template.md`'s skeleton verbatim (frontmatter block, comment header, EEE header block, `## Summary`) with the CONTEXT.md D-06 recipe-specific additions placed strictly after `## Summary`.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Doc-class taxonomy ruling (D-02 row) | Content/Standards (docs/_standards/) | — | Pure documentation governance; no code tier involved |
| Admin decision-point block spec (STD-05) | Content/Standards (docs/_standards/) | — | Prose policy spec; explicitly NO new C17 assertion (D-10) |
| Recipe authoring scaffold | Content/Templates (docs/_templates/) | — | Structural scaffold checked by the existing C17 gate, not a new validator |
| C17 structural enforcement | Gate/Validation (scripts/validation/c17-eee-contract.mjs) | — | Pre-existing, unedited this phase (D-10) — the template must conform to it, not the reverse |
| ARCHITECTURE.md:61 factual correction | Planning docs (.planning/research/) | — | One-line out-of-corpus correction, not part of the docs/ corpus or C17 scope |

There is no Browser/Frontend/API/Database tier in this phase — it is 100% Markdown-authoring plus a read-only Node.js validation script, already built and frozen from edits by D-10.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CLASS-01 | `EEE-SOP-standard.md` gains a D-02 edge-case ruling row (`docs/recipes/*` → `doc_type: Guide`) plus a written spec for the admin decision-point block format (STD-05) | Exact insertion line numbers for both the D-02 bullet and the STD-05 section identified below (Section: Exact Edit Locations); STD-04's v1.16 precedent (structure, Version-History row format, "---" divider convention) fully read and quoted |
| CLASS-02 | A canonical `docs/_templates/recipe-template.md` exists, C17-green, TEMPLATE-SENTINEL'd, with a worked decision-point block example | `admin-template.md` read in full (base skeleton per D-06); C17's 13 assertions read in full from source, confirming which fire on templates; self-test and full-corpus baseline captured live |
</phase_requirements>

## Exact Edit Locations (docs/_standards/EEE-SOP-standard.md, 516 lines total)

### 1. D-02 edge-case ruling row

- The `### D-02 Edge-case rulings` bullet list runs **lines 134–156** (bullets: Comparison documents, Error-code documents, End-user guides, Glossary documents, Decision-tree documents, Navigation/index hubs, Lifecycle documents — the last bullet, "Lifecycle documents," ends at line 156).
- Line 157 is blank; line 158 begins the transitional sentence "The five structural classes newly mapped in v1.16 (D-05) are summarized here for reference..." which leads into the illustrative summary table (lines 161–167).
- **Insertion point:** add the new bullet as an 8th list item, immediately after line 156 and before line 157/158 — i.e., it becomes the new last bullet in the `### D-02 Edge-case rulings` list, matching the exact Markdown bullet format of its siblings (bold lead phrase + `→` + `doc_type` + one-sentence rationale). Per CONTEXT.md D-09, this bullet is **slim** (one line, directory-precedence framing, referencing STD-05 by name) — the multi-paragraph spec itself belongs in STD-05, not here.
- The bullet list's own established format (verbatim, e.g. line 154–156):
  ```markdown
  - **Lifecycle documents** (`*-lifecycle/*`) → `Guide` (v1.16 D-07). Lifecycle docs walk a reader
    through an end-to-end procedural setup or migration journey; classifying them `Reference` would
    be definitionally wrong for content whose entire structure is a procedure.
  ```
  The new bullet should follow this exact shape: `**Device Recipe documents** (\`docs/recipes/*\`) → \`Guide\` ([citation]). [one-sentence directory-precedence rationale, pointing to STD-05 for the full decision-point spec].`

### 2. STD-05 section placement

- The existing `## Mermaid-in-Enrolled-Classes Policy (STD-04)` section spans **lines 398–448** (header at 398; final content line 448 "...it is not something the harness can catch after the fact."). Line 449 is blank, **line 450 is a `---` horizontal-rule divider**, line 451 is blank, and **line 452 is the next header**, `## C17 Enforcement Reference (Needle-Spec for Phase 115)`.
- **Insertion point:** insert the new `## <Title> (STD-05)` section's content starting at line 451 (immediately after the existing `---` divider at line 450, before the blank-then-header at 452), followed by its own closing `---` divider before `## C17 Enforcement Reference` resumes. This exactly mirrors how STD-04 itself was inserted in v1.16 — as a new top-level section sandwiched between the prior last content section (previously the D1 Platform Normalization Map, now STD-04) and the `## C17 Enforcement Reference` section, each section separated by a `---` divider.
- Per CONTEXT.md D-11, STD-05 must contain: the full 3-case block spec (D-01), the mandatory-blank-line rule (D-02), the case-boundary rule (D-03), the 3-rule branch floor + RECOMMENDED idiom (D-04/D-05), and **one compact FENCED worked branching mini-example** (a fenced spec sample is exempt from C17 #11/#12 via the `inCodeFence` mask — see Mechanics section below). Do NOT number this new section `STD-05` in the visible header text unless matching STD-04's own visible-header convention — STD-04's actual H2 text is `## Mermaid-in-Enrolled-Classes Policy (STD-04)`, i.e., the `(STD-04)` tag is parenthetical after a descriptive title, not a standalone numeral heading. Mirror this: `## <Descriptive Title> (STD-05)`.

### 3. Version History table

- Table lives at **lines 510–515**: header row `| Date | Change |` at line 512, separator at 513, two data rows (2026-07-04 initial, 2026-07-07 STD-04) at 514–515. This is the **last content in the file** (file ends at line 516).
- **Insertion point:** append one new row after line 515, following the exact format of the existing STD-04 row (line 515):
  ```markdown
  | 2026-07-07 | v1.16 STD-04 — added Mermaid-in-Enrolled-Classes Policy (D-01..D-04: text-equivalent conversion, C17 #1 unchanged, conversion shapes, honesty caveat); added 4 new D-02 Edge-case rulings (glossary, decision-tree, nav-hub, lifecycle) and the D-08 Non-MECE precedence rule; Doc Type Taxonomy 4-value table unchanged |
  ```
  Per CONTEXT.md D-12, this new row names **both** STD-05 and the D-02 ruling row, and per D-12 explicitly does **NOT** bump the file's `last_verified` frontmatter (line 7, currently `2026-07-04`) — leave that value untouched.

### 4. Frontmatter (unchanged, for reference)

`EEE-SOP-standard.md` frontmatter (lines 1–9): `doc_id: STD-001`, `status: Approved`, `owner: Schweinehund`, `doc_type: Reference`, `platform: all`, `last_verified: 2026-07-04`, `review_by: 2026-10-02`. None of these keys change in this phase (D-12 confirms `last_verified` stays put).

## C17 Mechanics (verified against live `scripts/validation/c17-eee-contract.mjs`, 590 lines, full read)

### Which of the 13 assertions fire on a TEMPLATE-SENTINEL'd file

TEMPLATE-SENTINEL is detected by `last_verified: 1970-01-01` (any file with that exact date). It skips **exactly two** assertions:
- **#9** (block-field-vs-frontmatter value equality) — `if (!isTemplate) { ... }` gate, source line 301.
- **#12** (blockquote ≤200 chars) — `if (!isTemplate) { ... }` gate, source line 390.

**All 11 other assertions fire on templates, including:**
- **#4** — `## Summary` must be the first H2, no H2/H3 between the header block and Summary (this is why D-06's ordering — frontmatter → EEE block → H1 → `## Summary` → everything else — is load-bearing, not stylistic).
- **#5** — `## Summary` prose body must be ≥30 words (word-count excludes fenced-code lines and headings). This is why the D-13 Summary-opener sentence must keep the section at ≥30 words total.
- **#2/#3** — exactly one H1, and it must not be a bare `RE-\d+` pattern.
- **#6/#7** — header block must be a single inline paragraph (not a table) with `Platform` then `Doc Type` as the first two `·`-separated fields.
- **#8** — `doc_id`, `status`, `owner`, `doc_type`, `last_verified` frontmatter keys must all be present with non-empty values (placeholder values like `RE-[FILL-IN]` count as present/non-empty — only #9's equality check is skipped, not #8's presence check).
- **#10** — `platform:` value must resolve in the 20-entry D1 map — **HARD FAILURE, no template exemption.** This is why the template must carry a real D1-mapped value, not a pipe-list placeholder (confirmed below: `platform: all` is D1-mapped).
- **#1** — no `` ```mermaid `` fence (irrelevant to a recipe template, but still checked).
- **#11** — any Markdown table >25 data rows needs a prose summary within 5 lines (unlikely to fire on a template-sized decision table, but worth checking numerically if the worked decision-point tables grow large).
- **#13** — `status` must be `Draft`/`Approved`/`Superseded` (templates use `Draft`, which is valid).

### `platform: all` IS D1-mapped — verified two ways

1. `EEE-SOP-standard.md` D1 map, line 353: `| \`all\` | All Platforms |`.
2. `c17-eee-contract.mjs` `D1_MAP` object, line 37: `'all': 'All Platforms',` — the live code mirror the harness actually executes against.

`admin-template.md` (the D-06 base) already uses `platform: all` (line 28) — **not** a pipe-list placeholder. The "Template pipe-list placeholders (NOT in this map)" note in the standard (lines 388–394) refers to a *historical* state (three templates used to carry `Windows | macOS | all`-style pipe lists) that a prior phase (Plan 03 / D-07, referenced in the standard) already fixed by replacing pipe-lists with `platform: all` + an HTML comment. `recipe-template.md` should follow the current, already-fixed `admin-template.md` convention exactly: `platform: all` in frontmatter + an HTML-comment authoring instruction (mirroring `admin-template.md` lines 12–13) telling the recipe author to replace `all` with the correct D1-mapped value for their specific recipe (`Windows` for Recipe #1, `ios+shared-ipad` for Recipe #2 — both already present in the D1 map, zero map changes needed, confirming ARCHITECTURE.md's finding).

### `applies_to` / `audience` keys

These are **not** C17-checked at all — grep-confirmed against the full 590-line script (no reference to `applies_to` or `audience` anywhere). They are free-form authoring-convenience frontmatter carried by every existing template (`admin-template.md` lines 31–32: `applies_to: APv1 | APv2 | both`, `audience: admin`) but outside the 7-key Required Frontmatter Schema (`EEE-SOP-standard.md` lines 45–58) and outside C17's 13 assertions. CONTEXT.md D-06 directs `recipe-template.md` to use a generic `applies_to: [FILL-IN]` rather than the APv1/APv2-specific pipe-list — this is safe precisely because C17 never inspects the key's value.

### Verbatim `admin-template.md` header/frontmatter block (the literal base per D-06)

```markdown
<!-- ADMIN SETUP GUIDE TEMPLATE
     Usage: Copy this file as your starting point for any admin configuration guide.
     ...
-->
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Guide
platform: all
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
applies_to: APv1 | APv2 | both
audience: admin
---

**Platform:** All Platforms · **Doc Type:** Guide · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Admin Task Title]

## Summary

[2–3 sentences ... Minimum 30 words. ...]
```

`recipe-template.md` inherits this shape exactly, with `doc_type: Guide` (already correct — no change needed for the D-02 ruling to hold), `applies_to: [FILL-IN]` (generic, per D-06, replacing the APv1/APv2 pipe-list), and the `> **Version gate:**` blockquote replaced by the D-06-specified `> **Scope:**` blockquote (≤200 chars — note the template is sentinel-exempt from #12 so this is a style/precedent choice, not a hard gate, but keeping it ≤200 chars means the eventual real recipes that copy this pattern inherit a compliant blockquote by default).

### Verification commands and expected output (live-run confirmed 2026-07-17)

```bash
node scripts/validation/c17-eee-contract.mjs --self-test
# → 4 sub-tests, all PASS: fixture-passing (0 violations), fixture-failing (assertions #5,#13
#   fire), D1-hard-failure synthetic (assertion #10 fires on "UnknownOS"), TEMPLATE-SENTINEL
#   synthetic (assertion #9 correctly skipped). Exit 0.

node scripts/validation/c17-eee-contract.mjs --verbose
# → CURRENT BASELINE (2026-07-17, pre-Phase-129): 229 files checked, 0 with violations,
#   0 total violations. All 13 per-assertion counters read #1=0 ... #13=0. Exit 0.
```

**Discrepancy flag:** CONTEXT.md's research-focus prompt assumed "225 enrolled / 0 fail" as the pre-phase baseline. The live run today shows **229** enrolled files, still 0 violations. This is not a regression — the corpus has grown by 4 files since the CONTEXT-gathering session (plausibly v1.17-close artifacts or other concurrent corpus additions). Use **229/0** as the baseline the planner's verification step should diff against, not 225. After adding `recipe-template.md`, expect **230 files, 0 violations** (the new template is enrolled the moment it carries a `doc_id` key under `docs/`, per the opt-in-by-key enrollment rule — no allowlist step needed). Note `EEE-SOP-standard.md` itself is **not** enrolled by C17 (its `doc_id` is `STD-001`, which does have the `doc_id` key and lives under `docs/_standards/` which is under `docs/` — so it IS technically enrollment-eligible and already counted in the 229; editing it must keep it C17-green too, and it already is, per the current 0-violation baseline).

## Package Legitimacy Audit

**N/A — this phase installs zero external packages.** All work is Markdown authoring plus running the pre-existing, unedited `scripts/validation/c17-eee-contract.mjs` (Node built-ins only, per its own header comment: "zero external npm packages"). No `npm install`, `pip install`, or `cargo` step exists in this phase's scope. The Package Legitimacy Gate protocol is skipped entirely per its own applicability condition.

## Frozen-Surface / Validator-Collision Check (Research Focus item 5)

**Finding: this phase is purely content-plane. No validator-reconciliation task is needed.**

Investigated three angles:

1. **Does any chain validator assert on `EEE-SOP-standard.md` byte-content?** Only `check-phase-120.mjs` references the file (grep-confirmed across all 34 files in `scripts/validation/` matching `EEE-SOP-standard|_templates`). Its three relevant checks (`V-120-PRESENCE-STANDARD`, `V-120-MERMAID-POLICY`, `V-120-NONMECE`) all use `.includes(needle)` substring matching against specific header/subsection strings (`'## Mermaid-in-Enrolled-Classes Policy (STD-04)'` and `'#### Non-MECE precedence rule (D-08)'`) — **not** line-number pins, not byte-exact diffs, not full-file hashes. Live-ran this validator as part of the broader `v1.17-milestone-audit.mjs` chain (see below) — passed. As long as Phase 129 only *adds* content (new D-02 bullet, new STD-05 section) and never edits or deletes the existing STD-04 header text or the D-08 subsection text, `check-phase-120.mjs` remains green with zero changes required.
2. **Does any `-audit-allowlist.json` sidecar pin a `{file, line}` inside `EEE-SOP-standard.md`?** Grepped `"file": "docs/_standards/EEE-SOP-standard.md"` across all sidecar JSONs — **zero matches**. The only `docs/_templates/*` pins found (in `v1.16-` and `v1.17-audit-allowlist.json`) are broken-link allowlist entries against `admin-template.md`, `admin-template-android.md`, `admin-template-ios.md`, `admin-template-macos.md` — none reference a `recipe-template.md` (which doesn't exist yet) and none are line-content pins on the standard.
3. **Live full-chain sanity check:** ran `node scripts/validation/v1.17-milestone-audit.mjs` (the most recent closed-milestone audit, which subprocess-spawns C17 as one of its 17 checks) — **16 passed, 0 failed, 0 skipped**, including `[17/16] C17: EEE document contract ... PASS`. This confirms the current corpus + standard state is fully green before Phase 129 touches anything, giving a clean baseline to diff against post-edit.

**Conclusion:** editing `EEE-SOP-standard.md` to add the D-02 bullet + STD-05 section + Version-History row is safe under every predecessor-surface constraint discovered. D-10's ban on editing `c17-eee-contract.mjs` is the only hard boundary, and this phase's plan should not touch that file at all — the plan's verification step is simply "run `--self-test` and `--verbose` before and after, diff the counts."

## ARCHITECTURE.md:61 Correction Mechanics (D-15)

Exact location, verified by direct read: `.planning/research/ARCHITECTURE.md`, inside the "Recommended Project Structure" fenced code block (starts line 56), specifically:

```
59	│   ├── 00-overview.md                    # NEW — index page (mirrors l1-runbooks/00-index.md,
60	│   │                                      #   admin-setup-apv1/00-overview.md, device-operations/00-overview.md
61	│   │                                      #   convention: every doc-class directory has an 00-* index)
```

Line 61's trailing clause — `convention: every doc-class directory has an 00-* index` — is the false claim per CONTEXT.md D-15 (counterexample: `end-user-guides/` has no `00-*` index at all). Because lines 59–61 together form one wrapped code-comment sentence (all inside the same fenced block, all part of one `#`-continuation comment describing the same `00-overview.md` structure-tree line), the minimal fix is to **either** delete lines 59–61's `00-overview.md` structure-tree entry entirely (since D-14 also independently rules "NO `docs/recipes/00-overview.md` index doc" for Phase 129 — the whole tree-line is now stale, not just its trailing clause) **or**, if the planner wants to preserve the comment as forward-looking guidance for Phase 132+, rewrite line 61's clause to something factually accurate, e.g. `# some doc-class directories carry an unregistered 00-* index (not universal — see end-user-guides/ for a counterexample)`. Given D-14 already states recipes get NO index doc in this milestone, **the cleanest fix is deletion of the `00-overview.md` line from the structure tree** (lines 59–61 collapse to nothing, tree renumbers to show only the two recipe files), which simultaneously satisfies D-15 (removes the false claim) and keeps the research doc consistent with D-14 (no index doc exists in the recommended structure). This is a one-line-family edit inside a single fenced code block — no other file references this claim (not grep-matched elsewhere in `.planning/` or `docs/`).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| New C17 assertion for decision-block shape | A 14th assertion in `c17-eee-contract.mjs` mechanically validating the 3-case composite | Prose/template-only enforcement (D-10) | Any edit to the shared, subprocess-spawned C17 script retroactively mutates every predecessor milestone's audit re-run; D-10 explicitly forbids this, and this phase's own frozen-surface check (above) confirms no existing chain validator needs or expects a new assertion |
| Recipe-specific frontmatter schema | A new required-keys list just for `docs/recipes/*` | The existing 7-key Required Frontmatter Schema (unchanged) + optional `applies_to`/`audience` (uninspected by C17) | The schema is intentionally class-agnostic; recipes are `doc_type: Guide` and inherit the same schema every other Guide-class doc uses |
| A 5th `doc_type` taxonomy value | `doc_type: Recipe` | `doc_type: Guide` + D-02 ruling row | Locked 4-value enum (REQUIREMENTS.md "Out of Scope" table); C17 only checks presence/equality, never the enum, so this mistake is silent if not caught at authoring time — exactly why the D-02 ruling row exists |
| A registered `docs/recipes/00-overview.md` index at N=2 | A new RE-NNN row for a landing page | Nothing, this phase (D-14) | Scope creep + navigation-last violation; `end-user-guides/` (2 registered Guides, no index) is the verified same-N precedent |

**Key insight:** every temptation in this phase's domain (new assertion, new taxonomy value, new index doc, new frontmatter schema) has already been explicitly foreclosed by a LOCKED CONTEXT.md decision. The research task here was purely mechanical: find exact line numbers and confirm no hidden validator trips — not evaluate alternatives.

## Common Pitfalls

### Pitfall 1: Forgetting the `---` divider convention between top-level standard sections
**What goes wrong:** STD-05 gets inserted without the leading/trailing `---` horizontal rule, visually merging into STD-04 or into "C17 Enforcement Reference."
**Why it happens:** The divider isn't enforced by any C17 assertion — it's a pure visual/structural convention every existing top-level section already follows (visible at lines 396–398 before STD-04, and 449–452 after it).
**How to avoid:** Copy the exact `\n---\n\n## Title\n\n` pattern already surrounding STD-04.
**Warning signs:** Rendered Markdown shows STD-05's content running directly into the previous section's last sentence with no visual break.

### Pitfall 2: Letting the TEMPLATE-SENTINEL skip lull authors into non-compliant blockquotes
**What goes wrong:** Because #12 (200-char blockquote cap) is skipped on the template itself, an author writes a >200-char `> **Ask the admin:**` example inside the template's worked-example region, then a real recipe author copy-pastes it verbatim into a live (non-sentinel) recipe file, which immediately fails C17 #12.
**Why it happens:** The sentinel exemption is file-scoped, not content-scoped — the template not failing gives false confidence about what happens when that exact text lands in a real file.
**How to avoid:** CONTEXT.md D-08 already mandates every worked-example lead-in stay ≤200 chars "so copied examples survive #12 in real recipes" — treat this as a hard authoring constraint even though nothing in the template file itself would catch a violation.
**Warning signs:** Any lead-in blockquote sentence that reads long/compound when drafted — count characters before finalizing.

### Pitfall 3: Placing recipe-specific structure before `## Summary`
**What goes wrong:** Any content — even a single blockquote or heading — placed between the EEE header block and `## Summary` trips assertion #4, which fires on templates (not sentinel-skipped).
**Why it happens:** D-06's "placement-locked AFTER `## Summary`" instruction is easy to misread as "after the H1" rather than "after the Summary section specifically."
**How to avoid:** Verify the file's second H2 (after `## Summary` itself) is the first place any recipe-specific content (worked-example region, `> **Scope:**` blockquote, `## Prerequisites`, etc.) appears.
**Warning signs:** `node scripts/validation/c17-eee-contract.mjs --verbose` reporting `[#4] ## Summary is not the first H2` or an H3-before-Summary violation on the new template file.

### Pitfall 4: HTML-comment-wrapped worked-example region using `## ` internally
**What goes wrong:** CONTEXT.md D-08 explicitly warns the worked-example region "use `###`/bold labels only, NEVER `## `" inside the HTML comment, because HTML comments are **not** `inCodeFence`-masked by C17's fence detector (the mask only tracks `` ``` `` / `~~~` fences, not `<!-- -->`), so a stray `## ` line inside the comment would be picked up by assertion #4's first-H2 scan and break the Summary-first invariant.
**Why it happens:** Authors reflexively reach for `##` when writing a nested "section-like" example inside the comment block.
**How to avoid:** Use `###` or bold pseudo-headings only inside the delete-marked example region, exactly as D-08 specifies.
**Warning signs:** C17 #4 violation pointing at a line that's visually inside an HTML comment in the rendered file — a strong signal the fence-mask assumption was wrong for this construct.

## Code Examples

### The live D-05-style visible header block (verbatim, `EEE-SOP-standard.md` lines 82–84)
```
**Platform:** [normalized-label] · **Doc Type:** [Runbook|Guide|RCA|Reference] · **Doc ID:** [RE-NNN] · **Status:** [Draft|Approved|Superseded]
```
Separator is `·` (U+00B7 middle-dot) — not a pipe, not a hyphen. Field order is Platform, Doc Type, Doc ID, Status (C17 assertion #7 checks the first two only).

### Live composite-adjacent precedent: blockquote-lead-in immediately before a table, blank-line-separated (`docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`, lines 65–70 region)
The PSSO doc's "Pipeline" section shows the corpus's existing (non-decision-point but structurally analogous) pattern: a bold "LOCKED — N (nodes + labeled edges)" lead sentence, then a Markdown table, then several **blank-line-separated single-sentence blockquote paragraphs** describing the branch — this is the live proof that blank-line-chunked blockquotes (D-02's mandatory blank line rule) is an established, C17-#12-compliant idiom already in production, not a novel technique invented for this phase.

### Live single-sentence `> **What breaks if misconfigured:**` callout (`docs/admin-setup-apv1/04-dynamic-groups.md`, lines 50 and 64)
```markdown
> **What breaks if misconfigured:** Using the wrong attribute name or syntax results in an empty group. Admin sees 0 members.

> End user sees standard Windows OOBE instead of Autopilot. See: [Profile Not Assigned](../l1-runbooks/03-profile-not-assigned.md)
```
Note the blank line splitting what is conceptually one callout into two independently-measured `>`-runs — this is exactly the blank-line-chunking technique D-02 requires for decision-point blocks, already proven safe in a live, Approved, enrolled corpus document.

### `admin-template.md`'s `## Configuration-Caused Failures` table shape (D-06 inherits verbatim)
```markdown
## Configuration-Caused Failures

| Misconfiguration | Symptom | Runbook |
|------------------|---------|---------|
| [Setting X set to wrong value] | [What admin or user sees] | [Link to runbook] |
| [Setting Y missing] | [What happens] | [Link to runbook] |
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|---------------|--------|
| Mermaid diagrams for branch/decision logic | Text-equivalent decision tables/lists (STD-04 D-01..D-04) | v1.16 (2026-07-07) | Directly informs this phase: STD-05's decision-point spec explicitly bans code fences for decision content, generalizing STD-04's D-01 rationale (fenced content is retrieval-invisible) from Mermaid specifically to any code fence carrying decision logic |
| Ad-hoc per-document decision-point phrasing | Codified 3-case composite spec (D-01..D-05) with a dedicated STD-05 policy home | This phase (v1.18, Phase 129) | First time the corpus gets a *named, spec'd* decision-point convention rather than emergent per-author style (Pattern 2/3 usage was consistent but undocumented before this phase) |

**Deprecated/outdated:** None — this is a pure addition to a currently-stable, currently-green standard. Nothing in the existing standard is being superseded or removed.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The cleanest fix for ARCHITECTURE.md:61 is deleting the `00-overview.md` structure-tree line entirely (rather than rewording it) | ARCHITECTURE.md:61 Correction Mechanics | Low — D-14 already establishes no index doc exists in this phase's recommended structure, so deletion is consistent with the locked decision either way; a planner could equally choose the reword option without contradicting any decision |

**All other claims in this research are VERIFIED** — confirmed via direct file reads (`EEE-SOP-standard.md`, `c17-eee-contract.mjs`, `admin-template.md`, `ARCHITECTURE.md`, live corpus exemplars) and live tool execution (`--self-test`, `--verbose`, `v1.17-milestone-audit.mjs`). No package-provenance claims exist in this phase (no packages installed), so the package-name `[ASSUMED]` provenance rule does not apply.

## Open Questions

None blocking. One minor style choice is left to the planner/executor:

1. **STD-05's exact section title wording** (e.g., "Admin Decision-Point Block Format (STD-05)" vs. some other descriptive phrase)
   - What we know: CONTEXT.md D-09 fixes the *placement* (new top-level STD-05 section, mirroring STD-04) and the *content* (D-01..D-05 spec + D-11's fenced example), but not the literal title string.
   - What's unclear: Whether the title should echo STD-04's naming pattern (`## <Descriptive Phrase> (STD-05)`) exactly, or diverge stylistically.
   - Recommendation: Use `## Admin Decision-Point Block Format (STD-05)` — directly descriptive, matches STD-04's "descriptive-phrase-then-parenthetical-tag" pattern, and is the phrase already used throughout CONTEXT.md/REQUIREMENTS.md/ROADMAP references to this concept, minimizing cross-document naming drift.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Running `c17-eee-contract.mjs` (`--self-test`, `--verbose`) | Yes | v24.17.0 | — |
| git | Version-history / commit conventions (no code changes needing git tooling beyond normal commit) | Assumed present (repo is git-tracked) | — | — |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None — everything this phase needs is already present and verified live.

## Security Domain

**`security_enforcement` is absent from `.planning/config.json` → treat as enabled per protocol, but this phase has no application security surface.** This phase authors two Markdown files and runs a pre-existing, read-only, no-network, no-user-input Node.js script (`c17-eee-contract.mjs`) against local files. There is no authentication, session, access-control, input-validation-from-untrusted-source, or cryptography surface introduced or touched.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | N/A — no auth surface |
| V3 Session Management | No | N/A — no session surface |
| V4 Access Control | No | N/A — no access-control surface |
| V5 Input Validation | No (informational only) | The C17 script parses local Markdown files it doesn't "trust" in a security sense — it's a linter, not a service boundary; no untrusted external input crosses a trust boundary in this phase |
| V6 Cryptography | No | N/A — no crypto surface |

### Known Threat Patterns for {stack}
None applicable — no code execution path, network surface, or credential handling exists in this phase's scope. (For contrast: Phase 133's TOOL-04/TOOL-05 work, which touches CI/harness sidecar files, is the more security-relevant future phase in this milestone; not this one.)

## Sources

### Primary (HIGH confidence — direct local file reads and live tool execution, 2026-07-17)
- `docs/_standards/EEE-SOP-standard.md` (full read, 516 lines) — exact line numbers for D-02 rulings, STD-04 boundaries, Version History table, frontmatter schema, C17 assertion table
- `scripts/validation/c17-eee-contract.mjs` (full read, 590 lines) — live 13-assertion implementation; confirmed TEMPLATE-SENTINEL skip scope (#9, #12 only); confirmed D1_MAP mirrors the standard; confirmed enrollment is opt-in by `doc_id` presence
- `node scripts/validation/c17-eee-contract.mjs --self-test` (live run) — 4/4 PASS
- `node scripts/validation/c17-eee-contract.mjs --verbose` (live run) — 229 files checked, 0 violations (current baseline)
- `node scripts/validation/v1.17-milestone-audit.mjs` (live run) — 16/16 PASS including embedded C17 check, confirms pre-phase corpus-wide green state
- `scripts/validation/check-phase-120.mjs` (full read, 159 lines) — confirmed substring-presence (not byte-pin) assertion style against `EEE-SOP-standard.md`
- `docs/_templates/admin-template.md` (full read, 90 lines) — the literal D-06 base skeleton
- `.planning/research/ARCHITECTURE.md` (full read, 219 lines) — line 61 exact text and context for D-15
- `.planning/phases/129-device-recipe-doc-class-foundation/129-CONTEXT.md`, `.planning/REQUIREMENTS.md`, `.planning/STATE.md` (full reads) — locked decisions, requirement text, project history
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` (lines 1–100), `docs/admin-setup-apv1/04-dynamic-groups.md` (lines 1–100) — live corpus exemplars for blockquote-chunking and callout idioms
- Grep sweep of all 34 `scripts/validation/*.mjs`/`*-audit-allowlist.json` files for `EEE-SOP-standard|_templates` references — confirmed no line-pins exist against the standard file

### Secondary / Tertiary
None — no WebSearch or external documentation was needed; this phase's domain is entirely internal to the repository.

## Metadata

**Confidence breakdown:**
- Standard-edit mechanics (line numbers, insertion points): HIGH — every claim backed by a direct `Read` with visible line numbers
- C17/template mechanics: HIGH — backed by full source read of the validator plus two live tool executions
- Frozen-surface/validator-collision safety: HIGH — backed by full read of the one relevant validator (`check-phase-120.mjs`) plus a grep sweep of all sidecar allowlists plus a live full-chain audit run
- ARCHITECTURE.md:61 fix: HIGH (location/text) / MEDIUM (which of the two remediation options the planner should pick — flagged as A1 in Assumptions Log, low risk either way)

**Research date:** 2026-07-17
**Valid until:** Stable — 30 days, or until the next edit to `EEE-SOP-standard.md`/`c17-eee-contract.mjs` (whichever comes first; both are otherwise-frozen surfaces this milestone per D-10 and the frozen-surface doctrine, so no near-term drift is expected within v1.18).

---
*Research for: Phase 129 - Device Recipe Doc-Class Foundation*
*Researched: 2026-07-17*
