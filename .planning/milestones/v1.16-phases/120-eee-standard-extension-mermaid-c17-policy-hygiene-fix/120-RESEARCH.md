# Phase 120: EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix - Research

**Researched:** 2026-07-07
**Domain:** Documentation-standard authoring + validator-safety mechanics (Node.js regex-based harness, zero external packages)
**Confidence:** HIGH

## Summary

This phase is a mechanics problem, not a design problem — every substantive decision (Mermaid
policy = text-equivalent conversion, C17 #1 byte-unchanged, zero new Doc Types, the 4 new D-02
edge rulings, the non-MECE precedence rule, the HYG-01 comment fix) is already LOCKED in
120-CONTEXT.md. Research confirms the plan can execute these edits with **zero risk** to the
live harness gate, because every safety check that touches these two artifacts is a
**string-presence needle check**, not a byte-hash or diff-based pin.

`c17-eee-contract.mjs`'s own safety net (`check-phase-115.mjs`) asserts only that specific
substrings (`--self-test`, `C17 assertion-violation-counts:`, absence of `CHAIN_PHASES`) exist
in the file — confirmed by direct execution (7/7 PASS on current file). The live corpus gate
(`v1.15-milestone-audit.mjs` check id 17) spawns `c17-eee-contract.mjs` as a subprocess and
trusts only its **exit code** — confirmed by direct execution (174 files checked, 0
violations, exit 0). Neither mechanism inspects assertion #1's regex logic itself. A
comment-only edit near assertion #1 is therefore provably safe as long as the added text does
not contain the literal substring `CHAIN_PHASES` (this would falsely trip
`V-115-STANDALONE`) and does not remove/relocate the `--self-test` or
`C17 assertion-violation-counts:` strings.

`frozen-at-close.mjs` is not itself pinned by any validator — it is the *tool* that reads
frozen surfaces, not a surface any current chain validator reads for correctness. No
check-phase-NN.mjs greps its content. The stale-comment fix is a pure documentation correction
with zero blast radius under the CURRENT harness. The one open question — whether this file
becomes byte-pinned as a "predecessor v1.4–v1.15 frozen surface" at the *future* Phase 125
close-gate — is answered by precedent: v1.15's own byte-unchanged gate (119-04 Task 3) enumerated
a **fixed, explicit list** (`v1.N-milestone-audit.mjs`, `v1.N-audit-allowlist.json`,
`.github/workflows/audit-harness-v1.N-integrity.yml`, `check-phase-48..112`) that does NOT
include contract/helper files like `c17-eee-contract.mjs` or `_lib/frozen-at-close.mjs`. Phase
125's analogous gate is expected to follow the same enumerated-list pattern, not a
scripts/validation/-wide diff — flagged below as a residual item for Phase 125's own research,
not a Phase 120 blocker.

**Primary recommendation:** Edit the standard doc with new prose sections (no taxonomy-table
change), add an optional comment-only pointer near C17 assertion #1 that avoids the string
`CHAIN_PHASES`, fix the `frozen-at-close.mjs` comment, and verify via the exact command
sequence in `## Verification` below — all of which currently pass at baseline (0 violations,
174 files) and must still pass identically afterward.

## Architectural Responsibility Map

This phase has no browser/frontend/API/database tiers — it is a documentation-standard +
validation-script authoring phase in a static Markdown corpus + Node.js CLI harness. The
"tiers" here are conceptual layers of the EEE system itself:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Mermaid policy statement + rationale | Standard doc (prose/authoring layer) | — | Human-readable governance; not machine-enforced beyond #1's existing regex |
| C17 assertion #1 (regex enforcement) | Validator script (`c17-eee-contract.mjs`) | — | Machine gate; LOCKED byte-unchanged this phase |
| Doc Type taxonomy edge rulings | Standard doc (prose/authoring layer) | Registry (`RE-index.md`, consumed later) | Authoring-time human classification rule, not harness-enforced (no `VALID_DOC_TYPES`) |
| HYG-01 comment correctness | Validator helper (`_lib/frozen-at-close.mjs`) | — | Pure documentation/comment layer inside a code file; zero runtime behavior |
| Regression proof (`--self-test`, corpus run) | Validator script + harness (`v1.15-milestone-audit.mjs`) | check-phase-115.mjs (needle checks) | The only two live gates that could be affected by this phase's edits |

## Standard Stack

No new libraries. This phase touches three existing repo artifacts only:

### Core
| Artifact | Role | Notes |
|----------|------|-------|
| `docs/_standards/EEE-SOP-standard.md` | Canonical standard doc (enrolled, `doc_id: STD-001`) | Markdown + YAML frontmatter; itself subject to C17 (confirmed enrolled, currently 0 violations) |
| `scripts/validation/c17-eee-contract.mjs` | 13-assertion validator, Node built-ins only | `--self-test` and normal-mode both confirmed exit 0 at baseline |
| `scripts/validation/_lib/frozen-at-close.mjs` | Centralized frozen-SHA reader helper | Not itself validated by any chain check; comment-only edit |

**No packages are installed in this phase.** `c17-eee-contract.mjs` explicitly declares
"Node built-ins ONLY -- zero external npm packages" (line 15 of the file) and this phase adds
no new scripts.

### Alternatives Considered
Not applicable — no library/tooling choice exists in this phase; the only "alternative"
(A2 carve-out for Mermaid, or minting new Doc Types) was already rejected via
`/adversarial-review` and is out of scope to re-litigate per the phase objective.

**Installation:** None required.

**Version verification:** Not applicable (no packages).

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages in any ecosystem. No
`npm install`, `pip install`, or `cargo add` occurs. The Package Legitimacy Gate is skipped
per its own scope condition ("whenever this phase installs external packages").

## Architecture Patterns

### System Architecture Diagram

```
docs/_standards/EEE-SOP-standard.md (STD-001, enrolled)
   |
   |  (1) new prose: Mermaid-in-enrolled-classes policy
   |      -- placed as new top-level section, after "D1 Platform
   |         Normalization Map" and before "C17 Enforcement Reference"
   |  (2) extend "### D-02 Edge-case rulings" bullets (existing section,
   |         inside "## Doc Type Taxonomy") with 4 new class rulings
   |         + non-MECE precedence rule (as a new "####" subsection,
   |         NOT a new table -- avoids assertion #11 risk)
   |  (3) cross-reference note in "## C17 Enforcement Reference" row #1
   |         "Source in this standard" column -> points at new section (1)
   |  (4) new row in "## Version History" table
   v
[Standard doc committed] ---read-only reference, never executed---
   |
   |  (independently) comment-only pointer, optional
   v
scripts/validation/c17-eee-contract.mjs
   |  assertion #1 regex logic: UNCHANGED (byte-for-byte behavior)
   |  self-test harness: UNCHANGED behavior, still exits 0
   v
[node c17-eee-contract.mjs --self-test]  -> 4/4 PASS (baseline == after)
[node c17-eee-contract.mjs]              -> 174 files, 0 violations (baseline == after)
[node scripts/validation/check-phase-115.mjs] -> 7/7 PASS (string-needle checks only)
[node scripts/validation/v1.15-milestone-audit.mjs] -> 16/16 PASS incl. check id 17 (exit-code trust)

scripts/validation/_lib/frozen-at-close.mjs
   |  lines 5-9 header comment: corrected (HYG-01)
   |  MILESTONE_CLOSE_SHAS map + readAtClose() + convenience exports: UNCHANGED
   v
[no validator greps this file's content -- zero blast radius under current harness]
```

### Recommended Section Placement in EEE-SOP-standard.md

```
## Purpose and Scope                              (existing, ~L23)
## Required Frontmatter Schema                     (existing, ~L45)
## Visible Header Block Format                      (existing, ~L67)
## Doc Type Taxonomy                                (existing, ~L123)
   ### D-02 Edge-case rulings                       (existing, ~L134 -- APPEND 4 new bullets here)
   #### Non-MECE precedence rule (D-08)              <- NEW subsection, right after D-02 bullets
   ### RCA forward-compat note                       (existing, ~L145)
## D2 Last Reviewed Semantics                        (existing, ~L151)
## Status Values                                     (existing, ~L177)
## Grounding Notes                                   (existing, ~L203)
## Phase-1 Scope                                     (existing, ~L261)
## D1 Platform Normalization Map                     (existing, ~L290)
## Mermaid-in-Enrolled-Classes Policy (STD-04)        <- NEW top-level section HERE (~L351,
                                                          before C17 Enforcement Reference)
## C17 Enforcement Reference (Needle-Spec...)         (existing, ~L353 -- edit ONLY the
                                                          "Source in this standard" column
                                                          for assertion #1's row, cross-ref
                                                          to the new section above; the
                                                          assertion TEXT/behavior is unchanged)
## Version History                                    (existing, ~L411 -- ADD one new row)
```

**Why this placement:** The Doc Type taxonomy section already has a "D-02 Edge-case rulings"
subsection that is the established home for per-class rulings (comparison docs, error-code
docs, end-user guides are already there) — the 4 new rulings and the precedence rule extend
this existing pattern rather than creating a parallel structure. The Mermaid policy is a
distinct topic (diagram handling, not doc-type classification) and reads naturally as its own
section immediately before "C17 Enforcement Reference" — that section already documents
assertion #1 in its reference table, so placing the policy immediately above it keeps the
narrative flow (policy stated, then the table that shows which assertion enforces it).

**The Doc Type Taxonomy 4-value table itself (`Runbook | Guide | RCA | Reference`, ~L125-132)
does NOT change** — this is a hard LOCKED decision (D-05); only prose/bullets are added around
it.

### Pattern 1: Comment-only C17 cross-reference (optional, Claude's Discretion)

**What:** A single-line comment near assertion #1's code (L201-210) or in the "Assertions"
doc-comment list (L101-114) pointing to the new standard subsection name.
**When to use:** Only if it improves traceability; explicitly optional per CONTEXT.md.
**Constraint:** Must NOT contain the literal string `CHAIN_PHASES` (breaks
`V-115-STANDALONE` in `check-phase-115.mjs`, which asserts this string is ABSENT from the
file). Must NOT alter, move, or remove the strings `--self-test` or
`C17 assertion-violation-counts:` (these are the exact needles `check-phase-115.mjs` greps
for).

```javascript
// Source: scripts/validation/c17-eee-contract.mjs L201-210 (existing code, DO NOT alter logic)
// ── Assertion #1: No Mermaid fences ────────────────────────────────────────────────────────
// Use bodyLines + inCodeFence mask (not raw content) so a ```mermaid *example* shown inside
// a ```markdown or ```text fence does not trigger a false positive.  The opening fence line
// itself is NOT marked inCodeFence (by design), so a real ```mermaid fence that opens
// outside any enclosing fence is still correctly detected.
// [OPTIONAL Phase-120 addition, comment-only]: policy + rationale documented in
// docs/_standards/EEE-SOP-standard.md § "Mermaid-in-Enrolled-Classes Policy" (STD-04).
const hasMermaid = bodyLines.some((l, i) => !inCodeFence[i] && /^```mermaid/.test(l));
```

### Pattern 2: HYG-01 comment replacement (exact current text + verified factual replacement)

**What:** Correct the stale "REMAIN INLINE" claim at `frozen-at-close.mjs:5-9`.
**Current text (verbatim, confirmed by direct read):**
```javascript
// scripts/validation/_lib/frozen-at-close.mjs
//
// Centralized frozen-aware readers for chain validators (Phase 73 onward).
//
// HYBRID STATUS:
//   - NEW helpers (Phase 73 onward) consume readers from this module.
//   - EXISTING inline helpers in check-phase-{61, 67, 68, 70}.mjs REMAIN INLINE.
//     Refactor deferred to v1.9+ as FROZEN-AWARE-ADOPTION-SWEEP-01 per
//     `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (Phase 74 HARNESS-12 finalizes).
//
// Lineage: parallel to inline readRequirementsAtV15Close() introduced
// Plan 68-03 Task 1 commit d7d7d5f + readCorpusFileAtV17Close() introduced
// Plan 70-02 Atom 1 commit 26a1ae9; centralized per D-02 LOCKED Option C.
```
**Why it's stale (VERIFIED by direct grep):** `scripts/validation/check-phase-61.mjs`,
`check-phase-67.mjs`, `check-phase-68.mjs`, and `check-phase-70.mjs` all still reference
`frozen-at-close.mjs` (confirmed present in a grep across `scripts/validation`), but the
memory record + REQUIREMENTS.md (`HYG-01` definition) states v1.14 Phase 111 ("Pillar D —
Chain Validator Tooling Refactors") centralized the previously-inline helpers. `check-phase-111.mjs`
also references `frozen-at-close.mjs` and is the Phase-111 deliverable that performed this
centralization (confirmed present in the same grep). The header's "REMAIN INLINE" claim
describing check-phase-{61,67,68,70} as still hybrid/inline is what HYG-01 flags as false.

**Draft factually-correct replacement (Claude's Discretion on exact wording; substance only):**
```javascript
// scripts/validation/_lib/frozen-at-close.mjs
//
// Centralized frozen-aware readers for chain validators (Phase 73 onward).
//
// STATUS (corrected v1.16 Phase 120 HYG-01 — see .planning/REQUIREMENTS.md HYG-01):
//   - ALL chain validators, including check-phase-{61, 67, 68, 70}.mjs, now consume readers
//     from this centralized module. The prior inline-helper duplication in those four files
//     was refactored away and centralized here by v1.14 Phase 111
//     ("Pillar D — Chain Validator Tooling Refactors").
//   - FROZEN-AWARE-ADOPTION-SWEEP-01 (the broader sweep beyond these four files) remains a
//     separate, still-deferred item — see `.planning/milestones/v1.8-DEFERRED-CLEANUP.md`
//     and the v1.16 Future Requirements section (durable tooling debt).
//
// Lineage: parallel to inline readRequirementsAtV15Close() introduced
// Plan 68-03 Task 1 commit d7d7d5f + readCorpusFileAtV17Close() introduced
// Plan 70-02 Atom 1 commit 26a1ae9; centralized per D-02 LOCKED Option C; consolidated into
// check-phase-{61,67,68,70}.mjs by v1.14 Phase 111.
```
**Verify claim before writing:** the planner/executor should re-run
`grep -n "frozen-at-close" scripts/validation/check-phase-{61,67,68,70,111}.mjs` at execution
time to confirm the current import shape (whether they `import` the centralized readers or
still define local duplicates) before finalizing the exact wording — this research confirms
the files exist and reference the module, but does not re-derive Phase 111's diff line-by-line.

### Anti-Patterns to Avoid
- **Editing assertion #1's regex or `inCodeFence` logic:** LOCKED as byte-unchanged (D-02). Do
  not touch lines 201-210's executable code, only comments.
- **Adding a `VALID_DOC_TYPES` enum to C17:** explicitly deferred (see Deferred Ideas in
  CONTEXT.md) — not this phase's job, and would silently change assertion #8/#9 behavior.
- **Turning the 4 new D-02 edge rulings into a Markdown table:** the existing D-02 section is
  bullet-list prose; converting to a table risks nothing today (well under 25 rows) but breaks
  stylistic consistency with the existing 3 bullets and adds unnecessary assertion-#11 surface
  area for no benefit — keep as bullets, matching the existing pattern exactly.
- **Adding the taxonomy's 5-class mapping table (already drafted in CONTEXT.md D-05) as a
  *new* Doc Type Taxonomy table row:** the 4-value table stays unchanged; the 5-class mapping
  table is a *separate* illustrative table (already shown in CONTEXT.md) that belongs in the
  new Mermaid-adjacent or D-02 prose, not as a modification to the frozen 4-row taxonomy table.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Proving the standard doc itself is C17-compliant after edits | A new bespoke lint script | `node scripts/validation/c17-eee-contract.mjs --verbose` (existing) | STD-001 is already enrolled and already passes; re-running the existing validator is sufficient and is the project's established verification idiom |
| Proving C17's self-test still passes | A new self-test harness | `node scripts/validation/c17-eee-contract.mjs --self-test` (existing, 4 sub-tests) | Already exists, already covers the exact "still exits 0" requirement from CONTEXT D-02 |
| Checking whether frozen-at-close.mjs is safe to comment-edit | A new frozen-surface scanner | `grep -rn "frozen-at-close" scripts/validation` (already run in this research — 15 files reference it, none by content-hash) | The project's existing convention is explicit enumerated allowlists (`v1.N-audit-allowlist.json`), not generic scanning — mirror that pattern if a future check is ever needed, don't invent a new mechanism now |

**Key insight:** Every verification this phase needs is already a green, runnable command in
the repo today. The plan's job is to make targeted edits and re-run these exact commands to
prove zero regression — not to author new tooling.

## Common Pitfalls

### Pitfall 1: Accidentally tripping `V-115-STANDALONE` via a stray "CHAIN_PHASES" string
**What goes wrong:** `check-phase-115.mjs`'s `V-115-STANDALONE` check FAILs if the literal
substring `CHAIN_PHASES` ever appears anywhere in `c17-eee-contract.mjs` — including inside a
comment.
**Why it happens:** The check is a naive `content.includes('CHAIN_PHASES')`, not a
code-aware AST check — any prose mention of the term (e.g., explaining how the harness later
folds this file into a chain) would trip it.
**How to avoid:** If a comment must reference chain registration, phrase it without the exact
token (e.g., "harness registration" or "audit-harness fold" instead of "CHAIN_PHASES").
**Warning signs:** Run `node scripts/validation/check-phase-115.mjs` immediately after any
edit to `c17-eee-contract.mjs`, before running the full corpus check — it is the fastest,
cheapest way to catch this class of regression.

### Pitfall 2: Turning a new prose subsection into an unintended >25-row table
**What goes wrong:** Assertion #11 fires if any Markdown table in `EEE-SOP-standard.md`
(which IS enrolled and C17-checked) exceeds 25 data rows without a prose summary within 5
lines.
**Why it happens:** The existing D1 Platform Normalization Map table already has exactly 20
rows (confirmed) — comfortably under the 25-row threshold, but a large table combining, e.g.,
the 5-class doc-type mapping with additional columns (rationale, examples, precedent files)
could inadvertently approach the limit if over-expanded.
**How to avoid:** Keep the 5-class mapping table exactly as shown in CONTEXT.md (5 rows, 3
columns) — do not merge additional reference material into the same table. If any new table
does approach 25 rows, add a one-sentence prose summary within 5 lines after it (matching the
existing `## D1 Platform Normalization Map` "Total: 20 entries..." sentence pattern at line
319).
**Warning signs:** `node scripts/validation/c17-eee-contract.mjs --verbose` after the edit —
assertion #11 violations name the exact table and row count.

### Pitfall 3: Introducing a new blockquote (`>` prefix) over 200 characters
**What goes wrong:** Assertion #12 fires on any blockquote (or consecutive blockquote-line
group) exceeding 200 characters, on an enrolled non-template file.
**Why it happens:** The standard doc already contains exactly one blockquote (the "unmapped
platform value is a HARD FAILURE" callout, ~75 chars, confirmed via grep) — safely under the
limit. A new "honesty caveat" callout (D-04's "green-C17 ≠ faithful conversion" warning) is a
plausible candidate for blockquote styling and could exceed 200 chars if written as a single
dense sentence.
**How to avoid:** Either keep any new callout under 200 chars, or write it as plain prose
(no `>` prefix) rather than a blockquote — plain paragraphs have no length ceiling under C17.
**Warning signs:** Same `--verbose` re-run; assertion #12 violations report exact character
counts.

### Pitfall 4: Assuming `check-phase-120.mjs` must be authored this phase
**What goes wrong:** Wasting effort building a chain-validator file for Phase 120 when the
project's own established convention defers this to the harness-lineage-bump phase.
**Why it happens:** ROADMAP.md's HARN-06 (Phase 125) explicitly lists
`check-phase-120..NN.mjs per-phase validators` as a **Phase 125** deliverable, not a Phase 120
one — mirroring the confirmed v1.15 precedent: `check-phase-115.mjs` (the leaf validator for
the C17-authoring phase) was authored in **Phase 119**, not Phase 115 itself (confirmed via
its own header comment: "115-VERIFICATION.md explicitly assigns... to Phase 119"), deriving
its needle checks directly from `115-VERIFICATION.md`'s "Required Artifacts / Observable
Truths."
**How to avoid:** Phase 120's job is to author `120-VERIFICATION.md` with clear, needle-check-
friendly "Required Artifacts / Observable Truths" (e.g., exact strings that will exist in the
standard doc and the two edited scripts) so that Phase 125 can mechanically derive
`check-phase-120.mjs` from it later — exactly as `check-phase-115.mjs` was derived from
`115-VERIFICATION.md`.
**Warning signs:** If the plan's task list includes "author check-phase-120.mjs," that is a
scope violation of the validator-atom deferral convention (also flagged in project memory:
`project_v113_validator_atom_deferral.md`).

## Code Examples

### Verifying current baseline (run BEFORE making any edit)

```bash
# Confirm --self-test currently passes (4/4)
node scripts/validation/c17-eee-contract.mjs --self-test
# Expected: "Self-test: 4 passed, 0 failed" / exit 0

# Confirm normal-mode corpus run currently passes (174 files, 0 violations)
node scripts/validation/c17-eee-contract.mjs --verbose
# Expected: "C17 summary: 174 files checked, 0 with violations, 0 total violations" / exit 0

# Confirm check-phase-115's needle checks currently pass (7/7)
node scripts/validation/check-phase-115.mjs
# Expected: "Result: 7 PASS, 0 FAIL, 0 SKIPPED" / exit 0

# Confirm the full v1.15 harness currently passes (16/16 incl. C17 as check 17)
node scripts/validation/v1.15-milestone-audit.mjs
# Expected: "Summary: 16 passed, 0 failed, 0 skipped" / exit 0
```

### Verifying after edits (run AFTER each file change; MUST match baseline exactly)

```bash
node scripts/validation/c17-eee-contract.mjs --self-test      # still 4/4
node scripts/validation/c17-eee-contract.mjs --verbose        # still 174 files, 0 violations
node scripts/validation/check-phase-115.mjs                   # still 7/7
node scripts/validation/v1.15-milestone-audit.mjs              # still 16/16
```

### Confirming which files currently reference frozen-at-close.mjs (context for HYG-01 wording)

```bash
# Source: this research session, ripgrep across scripts/validation
# Files confirmed to import/reference frozen-at-close.mjs:
#   check-phase-49, 50, 52, 57, 58, 59, 61, 63, 65, 67, 68, 70, 73, 111
#   (plus the module itself, _lib/frozen-at-close.mjs)
grep -rl "frozen-at-close" scripts/validation
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Inline frozen-SHA-reader helpers duplicated across check-phase-{61,67,68,70}.mjs | Centralized `readAtClose()` in `_lib/frozen-at-close.mjs` | v1.14 Phase 111 ("Pillar D") | The header comment this phase corrects (HYG-01) is the one artifact that never caught up with this change |
| C17 as a standalone script only | C17 folded into `v1.15-milestone-audit.mjs` as check id 17 (subprocess-spawn) | v1.15 Phase 119 (Atom 1) | Confirms the live gate trusts exit code only — the mechanism this research leans on for "comment-only is safe" |

**Deprecated/outdated:** None relevant to this phase's edits — no library or API version is
in play.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 125's future byte-unchanged gate for v1.16 close will enumerate a fixed file list (mirroring 119-04 Task 3's v1.15 precedent) that excludes `c17-eee-contract.mjs` and `_lib/frozen-at-close.mjs` | Summary; C17 self-test / byte-unchanged discussion | LOW-MEDIUM: if Phase 125's gate instead diffs the ENTIRE `scripts/validation/` tree against a pre-v1.16 anchor, Phase 120's legitimate edits would need an explicit allowlist entry at that time. This does not block Phase 120 (the edits are still correct and CONTEXT-authorized) but Phase 125's plan/research should re-confirm the gate's exact scope before authoring it. Not actionable now — flagged forward. |
| A2 | The exact diff Phase 111 made to check-phase-{61,67,68,70}.mjs (to confirm they now import rather than duplicate helpers) was not independently re-derived line-by-line in this session — inferred from file-existence + grep-reference presence, not from reading Phase 111's own PLAN/SUMMARY | Code Examples / HYG-01 pattern | LOW: if the four files somehow still contain vestigial inline duplicate code alongside the import, the corrected comment wording (fully centralized) would be slightly overstated. Executor should `grep -n "readAt.*Close\|frozen-at-close" scripts/validation/check-phase-{61,67,68,70}.mjs` at execution time to confirm exact centralization state before finalizing wording. |

**If this table is empty:** N/A — 2 items logged above; both are low-risk wording-precision
items resolvable by a cheap grep at execution time, not open design questions.

## Open Questions

1. **Exact prose wording for the Mermaid policy, D-02 rulings, and precedence rule**
   - What we know: Substance is fully LOCKED (D-01 through D-08); CONTEXT.md even supplies
     near-final bullet text for the 4 new D-02 rulings and the 3-step precedence rule.
   - What's unclear: Nothing structurally — this is pure prose authoring, explicitly
     "Claude's Discretion" per CONTEXT.md.
   - Recommendation: Planner can write the prose directly from CONTEXT.md's D-01..D-08 bullets
     with minimal paraphrasing; no further research needed.

2. **Whether the optional comment-only C17 pointer is worth adding**
   - What we know: Explicitly optional (CONTEXT.md, Claude's Discretion); safe to add per
     Pitfall 1's constraint (avoid the literal string `CHAIN_PHASES`).
   - What's unclear: No functional benefit either way — purely a traceability/readability
     call.
   - Recommendation: Add it (low cost, aids future readers cross-referencing the standard),
     but treat as optional per the plan's own discretion — not a blocking task.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Running `c17-eee-contract.mjs`, `check-phase-115.mjs`, `v1.15-milestone-audit.mjs` | Confirmed (all three commands ran successfully in this research session) | Not pinned by this phase (existing repo dependency) | — |
| Git | HYG-01 grep verification, general repo operations | Confirmed (repo is a git working tree; `git log` succeeded in this research session) | — | — |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None — both dependencies confirmed present.

## Validation Architecture

Skipped: `.planning/config.json` has `workflow.nyquist_validation: false` (explicitly
disabled).

## Security Domain

`security_enforcement` is absent from `.planning/config.json`'s `workflow` block, so it is
treated as enabled by default per protocol. This phase's ASVS surface is minimal — it edits a
Markdown standard doc and two Node.js validator/helper scripts; there is no user input, no
authentication, no session state, no network call, and no cryptography introduced.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A — no auth surface in a static-corpus validator |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A — file edits are local, git-tracked, human-reviewed |
| V5 Input Validation | Marginal | `c17-eee-contract.mjs` already validates untrusted Markdown/YAML frontmatter via regex, not a parser — this phase does not change that surface (assertion #1's regex is LOCKED unchanged) |
| V6 Cryptography | No | N/A — no secrets, no crypto operations touched |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Regex-based Markdown parsing false negatives (e.g., a cleverly-fenced Mermaid block evading assertion #1) | Tampering (of enforcement, not data) | Already mitigated by the existing `inCodeFence` mask design (LOCKED, unchanged this phase); D-04 explicitly documents this as a known, accepted limitation (no diagram parser) rather than a security gap — human review is the compensating control |
| Comment injection changing validator behavior via string matching (`check-phase-115.mjs`'s naive `includes()` checks) | Tampering | Mitigation is procedural, not code: this research documents the exact forbidden substring (`CHAIN_PHASES`) so the plan avoids it; no code change to the needle-check mechanism is warranted for a 2-file, comment-only edit phase |

## Sources

### Primary (HIGH confidence — direct repo inspection + command execution in this session)
- `docs/_standards/EEE-SOP-standard.md` — full read, structure confirmed (Doc Type Taxonomy
  ~L123-149, D1 map ~L290-320 confirmed 20 rows via grep + doc text, C17 Enforcement Reference
  ~L353-407, Version History ~L411-415, single existing blockquote at L324 confirmed via grep)
- `scripts/validation/c17-eee-contract.mjs` — full read (587 lines); assertion #1 at L201-210;
  self-test harness L418+; `--self-test` executed directly (4/4 PASS); normal-mode executed
  directly (174 files, 0 violations)
- `scripts/validation/check-phase-115.mjs` — full read; executed directly (7/7 PASS);
  confirmed `V-115-STANDALONE` checks for LITERAL ABSENCE of `CHAIN_PHASES` string, and
  `V-115-SELFTEST-MODE`/`V-115-COUNTS-SUMMARY` check for literal PRESENCE of two other strings
- `scripts/validation/v1.15-milestone-audit.mjs` — grepped for `c17-eee-contract` references
  (check id 17, subprocess-spawn, exit-code-only trust confirmed at L826-837); executed
  directly (16/16 PASS)
- `scripts/validation/_lib/frozen-at-close.mjs` — full read; current stale comment quoted
  verbatim (L1-13); confirmed via grep that check-phase-{49,50,52,57,58,59,61,63,65,67,68,
  70,73,111}.mjs all reference this module
- `.planning/phases/120-.../120-CONTEXT.md` and `120-DISCUSSION-LOG.md` — full read (LOCKED
  decisions D-01..D-10, residual risks)
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` — full read
  (STD-04/HYG-01 definitions, Phase 120 success criteria, v1.16 dependency chain, Phase-111
  centralization reference, Phase-125 byte-unchanged/HARN-06 language)
- `.planning/milestones/v1.15-phases/119-.../119-04-PLAN.md` — full read; the v1.15
  byte-unchanged gate's exact enumerated scope (Task 3), used as the precedent basis for
  Assumption A1
- `docs/_registry/RE-index.md` — grepped for `STD-001` (no match, confirming STD-001 is
  correctly excluded from the registry, consistent with the standard's own "Excluded
  directories" rule)
- `scripts/pipeline/retrofit-reference.mjs` — grepped; confirmed hard-coded literal
  `'doc_type: Reference\n'` string, substantiating D-06's cost-model claim about hard-coded
  pipeline forks
- `.planning/config.json` — full read; `nyquist_validation: false` confirmed, no
  `security_enforcement` key present

### Secondary (MEDIUM confidence)
- None used — all claims in this research were directly verified against the live repo in
  this session (no external/web sources were needed; this is a self-contained internal-repo
  mechanics question).

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no external stack; both artifacts fully read and their exact
  current-state contents quoted
- Architecture (placement + safety mechanics): HIGH — every safety-check assertion path was
  read in full and independently executed to confirm current green baseline
- Pitfalls: HIGH — all four pitfalls derived from actually reading the exact needle-check
  code (`check-phase-115.mjs`) and C17's own assertion logic, not inferred

**Research date:** 2026-07-07
**Valid until:** Effectively indefinite for the mechanics findings (they describe the current,
committed state of static files in this repo) — but re-verify the baseline commands
immediately before planning/execution if any other phase or hotfix lands on `main` in the
interim, since this is a fast-moving, actively-developed validation harness.
