# Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs) - Research

**Researched:** 2026-07-06
**Domain:** Markdown documentation retrofit (EEE SOP standard) + Node.js built-in mechanical tooling + a locked custom harness validator (C17) — third and final Phase-1 retrofit class
**Confidence:** HIGH (every claim below is either read directly from the checked-in source of truth — `c17-eee-contract.mjs`, `retrofit-guide.mjs`, `docs/_standards/EEE-SOP-standard.md`, `docs/_templates/reference-template.md`, `docs/_registry/RE-index.md` — or produced by executing Node scripts against the live `docs/reference/`, `docs/error-codes/`, `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md` corpus in this session. No external library/API research was required; this is a 100% in-repo, node-builtins-only domain, identical in kind to Phases 116/117.)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-118-1 — Table remediation policy: chunk-survival superset, per-table, before+after (1B).** Author a prose summary for **every capability-matrix and comparison TABLE** (per-table, not per-file), placed both before (one-line lead-in) and after (trailing summary within 5 lines) the table. **Grounding correction (MANDATORY):** C17 #11 (`dataRows > 25`, header-inclusive) forces **ZERO** new authoring — the only >25-row table (`error-codes/00-index.md`, 30 rows) is already compliant, and the largest capability matrix is 16 rows. 1B is justified by **chunk-survival intent (PIPE-02)**, not the gate. Rejected 1A (gate-minimal — delivers nothing) and 1C (structural splits — zero tables qualify).
- **D-118-2 — Index scope: enroll BOTH class-directory indexes (2C, OVERTURNED from discuss-candidate 2B).** `docs/reference/00-index.md` (RE-142) AND `docs/error-codes/00-index.md` (RE-168) are both enrolled. Locked Phase-116 D-06: nav-hub deferral is orphan-only, not class-directory-index. Final enrolled count = 34 (35 Reference-class rows − 1 mermaid carve-out).
- **D-118-3 — Doc-Type edge cases: carry the registry (3A).** All comparison docs (RE-177/178), all error-codes (RE-168–174), and the three "…Guide"-titled files (RE-153 `esp-timeout-tuning.md`, RE-154 `gpo-to-intune.md`, RE-155 `imaging-to-autopilot.md`) keep `doc_type: Reference` exactly as Phase-114-locked. Title ≠ doc_type; C17 #9 compares block↔frontmatter only, never the registry.
- **D-118-4 — Batching + helper reuse: carry D-02, fork `retrofit-guide.mjs` (4A) + MANDATORY riders.** ~4–6 size-balanced plans grouped by directory/topic (`docs/reference/` split on natural filename seams; `docs/error-codes/` one cohesive set; the two `-vs-` comparison docs folded with reference). Fork `scripts/pipeline/retrofit-guide.mjs` (Phase 117) into a reference variant.
  - **MANDATORY RIDER — keyless-platform injection:** **10 in-scope files carry NO mappable `platform:` key** and will hard-fail C17 #10 (absent key, not just unmapped value): the 7 error-codes files (`00-index` carries `applies_to: both`; `01-05` carry `APv1`; `06` carries `APv2`) + `docs/reference/powershell-ref.md` + `docs/reference/registry-paths.md` + `docs/apv1-vs-apv2.md`. All 10 are Windows-domain → inject `platform: Windows` (resolves cleanly in D1_MAP, confirmed this session — see Code Examples). `windows-vs-macos.md` and `reference/00-index.md` already carry `platform: all` — leave them.
  - **RIDER — #12 double blockquote split:** `docs/error-codes/00-index.md` has **TWO** over-200-char top-level blockquotes (L8 "Framework coverage" = 287c pre-H1; L65 "APv2 Note" = 284c post-H1) — both need word-preserving structural splits.
  - **RIDER — #12 corpus load:** Independently re-measured this session (see Code Examples) — **61 over-200-char blockquote groups across 27 of the 34 enrolled files** (the CONTEXT.md figure of "65 groups / ~28 files" additionally counted the carved-out mermaid file `ca-enrollment-timing.md`, which contributes 4 groups and is the 28th file — its measurement is preserved here for completeness but it is NOT enrolled and NOT part of this phase's authoring load).

### Claude's Discretion (resolve at plan time)

- Exact plan count and precise file-to-plan assignment within the D-02 size-balanced scheme (target ~4–6 plans over the 34 enrolled files; group by dir/topic; split `docs/reference/` on natural filename seams).
- Exact shape/name of the forked reference retrofit helper (fork `retrofit-guide.mjs`; guard defects; dry-run `--self-test` on one multi-table matrix + the error-codes index before batch application).
- The exact ≥30-word `## Summary` prose per reference doc and the exact per-table prose-summary wording (reformat-only: restate existing scope; add no new technical claims).
- Confirm `platform: Windows` resolves in D1_MAP for the 10 keyless files at plan time.

### Deferred Ideas (OUT OF SCOPE)

- **The 1 mermaid-bearing reference file → v1.16** (D-05): `docs/reference/ca-enrollment-timing.md` (RE-147). Its `RE-index.md` Status stays `Pending`.
- **End-user Guides (`RE-175/176`, `doc_type: Guide`) → v1.16** — not reference-class.
- **Phase 119** — frozen-surface re-baseline + 13th Path-A lineage bump + close.
- **v1.16** — orphan docs + structural classes + the parked Mermaid decision.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| RETRO-03 | All reference docs (capability matrices, 4-platform comparison, error-codes, cross-platform references) are retrofitted to EEE, including table remediation | This document verifies the exact C17 assertion mechanics against the live corpus, independently re-measures the #11/#12 workload (confirms CONTEXT.md's numbers to within an explained delta), discovers a **new mechanical defect class not present in Phases 116/117** — a Version-History table column-count mismatch (2-column vs. 3-column pre-existing tables) that the forked helper must detect and handle — and delivers the complete per-file inventory (platform status, table count, `## Version History` presence/shape, `#12` group count) that drives D-02 batch sizing. |

</phase_requirements>

## Summary

This phase is a pure mechanical+hand-authoring reformat of 34 Markdown files (35 registry rows minus 1 mermaid carve-out) against a fully-specified, already-built target: `docs/_standards/EEE-SOP-standard.md` defines the format, `docs/_templates/reference-template.md` defines the target shape (already includes an explicit "Tables exceeding 25 rows" prose-summary example — this template was authored in Phase 114 with Phase-118 foresight), `docs/_registry/RE-index.md` supplies `RE-142`…`RE-178` Doc IDs, and `scripts/validation/c17-eee-contract.mjs` (immutable, Phase-115-complete) is the single source of pass/fail truth. Nothing in this phase requires external research — every fact needed to plan it precisely was verified in this session by executing the actual validator logic against the actual corpus, exactly as Phases 116/117 did before it.

This phase is **materially lighter** than Phase 117 on raw mechanical load: 34 files (vs. 57) and only **61 over-200-char blockquote groups** (vs. 370) — but it introduces **two genuinely new wrinkles never seen in 116/117**. **First**, unlike Phase 117 (where 0/57 files had an existing `## Version History` section, so only the "create" code path was ever exercised), **13 of this phase's 34 enrolled files already have a `## Version History` section** — 6 in `docs/reference/` (the capability-matrix-class files + `00-index.md`) and all 7 `docs/error-codes/` files. This means the forked helper must correctly exercise **both** the "prepend to existing table" and "create new section" code paths this phase, not just one. **Second, and more important:** the 13 pre-existing Version History tables use **two incompatible column shapes** — `docs/reference/00-index.md` and all 7 `docs/error-codes/` files use a **2-column** `| Date | Change |` header, while the 5 capability-matrix files (`4-platform-capability-comparison.md`, `android-capability-matrix.md`, `aosp-oem-matrix.md`, `ios-capability-matrix.md`, `linux-capability-matrix.md`) use a **3-column** `| Date | Change | Author |` header. The Phase-117 helper's hardcoded new-row string (`'| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |'`, 3 columns) would silently misalign the table if prepended verbatim into any of the 8 files using the 2-column shape — Markdown renders a 3-cell row under a 2-column header as garbled/misaligned content, not a hard error, so this defect would not be caught by casual visual inspection. The forked helper must detect the existing header's column count and emit a matching-width row.

Two further scoping items were resolved by direct verification and are presented as recommendations (not locked in CONTEXT.md, which used illustrative rather than exhaustive language): **(a)** `docs/reference/aosp-oem-matrix.md` (4 tables, 6 rows each — per-OEM capability mapping) is structurally identical to the 5 capability-matrix files CONTEXT.md's D-118-1 explicitly names, and is recommended for inclusion in the per-table-prose scope even though CONTEXT's illustrative list ("macos 8, android 8, 4-platform 8, linux ~10, ios 7") did not name it; **(b)** `docs/apv1-vs-apv2.md` (1 table, 21 rows) and `docs/windows-vs-macos.md` (3 tables) are explicitly comparison docs by title and registry classification and are recommended for inclusion in the D-118-1 per-table-prose scope on the same "comparison TABLE" language basis, even though they sit outside the `docs/reference/` capability-matrix directory. Ordinary reference/lookup tables (error-code tables, `licensing-matrix.md`'s SKU table, `endpoints.md`'s endpoint list, etc.) are **not** capability-matrix or comparison tables and are recommended **out of scope** for D-118-1 prose (only the blanket >25-row C17 #11 gate would force those, and none qualify except the already-compliant `error-codes/00-index.md`).

**Primary recommendation:** Fork a new `scripts/pipeline/retrofit-reference.mjs` (from `retrofit-guide.mjs`, not `retrofit-runbook.mjs`) that (a) targets the `docs/reference/`, `docs/error-codes/`, `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md` path allowlist with `doc_type: Reference`, (b) hard-excludes the single mermaid carve-out (`docs/reference/ca-enrollment-timing.md`) by explicit path (fail-closed, mirroring the 117 D-05 pattern but for 1 file instead of 9), (c) injects `platform: Windows` for the 10 confirmed keyless files, (d) detects the existing `## Version History` table's column count (2 vs. 3) when prepending, and emits a matching-width new row — falling back to the established 3-column shape only for files needing the "create" path (recommended, for corpus-wide consistency with the already-shipped 116/117 corpus; see Open Questions), and (e) still implements whole-pre-H1-span relocation generally (per 117's hard-won lesson), even though this corpus's pre-H1 spans are simpler (at most one single blockquote run, confirmed by direct structural scan — see Common Pitfalls).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Doc ID assignment (`RE-NNN`) | Registry (`docs/_registry/RE-index.md`) | Pipeline Script | Registry is the sole authoritative join source by path; script only reads it |
| EEE frontmatter + block-line injection | Pipeline Script (`scripts/pipeline/retrofit-reference.mjs`, forked) | Documentation Corpus | Mechanical, deterministic per-file transform |
| Keyless-platform injection (10 files) | Pipeline Script | Documentation Corpus | Deterministic — all 10 resolve to `Windows`, confirmed against D1_MAP |
| `## Version History` column-shape detection + matching-width row insertion | Pipeline Script (NEW logic this phase) | Documentation Corpus | Deterministic once the existing header is parsed; genuinely new mechanical requirement not present in 116/117 |
| Per-table prose (D-118-1, before+after each capability-matrix/comparison table) | Documentation Corpus (hand-authored) | — | Judgment-bound; restates existing table scope only, no new claims |
| `## Summary` prose (≥30 words) | Documentation Corpus (hand-authored) | — | Judgment-bound; script emits `[FILL-IN]` placeholder only |
| `owner` value | Pipeline Script (uniform constant `Intune Admin Lead`) | Documentation Corpus | No per-file judgment, carries 117 D-04 |
| #12 blockquote-group compliance (61 groups, 27 files) | Documentation Corpus (hand-authored) | Validation Harness (measurement) | Requires per-instance judgment (Transform A vs. B); harness only measures |
| Structural pass/fail gate (13 assertions) | Validation Harness (`c17-eee-contract.mjs`) | — | Immutable per Phase-115 D-04 |
| Registry lifecycle (`Pending → Approved`) | Registry | — | Manual table edit per batch, after C17 exit 0 |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js | v24.17.0 `[VERIFIED: node --version, executed this session]` | Runtime for the mechanical retrofit helper and the C17 validator | Repo convention: `scripts/pipeline/` and `scripts/validation/` are node-builtins-only (`node:fs`, `node:path`, `node:process`) — zero npm dependencies |

**No external packages are installed or required by this phase.** Entirely Node built-in text transformation, matching `retrofit-runbook.mjs` / `retrofit-guide.mjs` / `c17-eee-contract.mjs` convention.

### Supporting

None — Node built-ins only.

### Alternatives Considered

Not applicable — no library-selection decision exists in this phase.

**Installation:** None required (Node.js already present and verified at v24.17.0).

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages. All tooling is Node.js built-in modules, mirroring every existing script in `scripts/pipeline/` and `scripts/validation/`. The Package Legitimacy Gate protocol is a no-op here; no `slopcheck` run was needed.

## Architecture Patterns

### System Architecture Diagram

```
docs/_registry/RE-index.md (RE-142..RE-178 minus RE-175/176 Guide-class, Path→DocID join)
          │
          ▼
scripts/pipeline/retrofit-reference.mjs  (forked from retrofit-guide.mjs — NEW for Phase 118)
  ├─ reads docs/reference/*.md (25 enrolled; RE-147 ca-enrollment-timing.md hard-excluded)
  │         + docs/error-codes/*.md (7 enrolled)
  │         + docs/apv1-vs-apv2.md + docs/windows-vs-macos.md (2 enrolled)
  ├─ injects: doc_id (registry join) · status: Approved · owner: Intune Admin Lead ·
  │           doc_type: Reference · platform: Windows (injected for the 10 keyless files)
  ├─ emits EEE block line: **Platform:** X · **Doc Type:** Reference · **Doc ID:** RE-NNN · **Status:** Approved
  ├─ relocates the pre-H1 span (single gate blockquote, confirmed — see Common Pitfalls) to
  │   immediately after "## Summary" placeholder
  ├─ Version History: DETECTS existing section + its column count (2-col vs 3-col) —
  │   PREPENDS a matching-width row for the 13 files that already have one (8×2-col, 5×3-col);
  │   CREATES a new 3-column section for the 21 files that don't
  └─ writes [FILL-IN: >=30 words, Reference-template Summary lead] placeholder
          │
          ▼
Hand-authoring pass (per file, per batch plan)
  ├─ Replace [FILL-IN] Summary with real ≥30-word prose (reference-template lead)
  ├─ Author per-table prose (before+after) for the ~45 capability-matrix/comparison tables
  │   in the 8 D-118-1-in-scope files (chunk-survival intent, NOT gate-forced — see Summary)
  ├─ Fix every C17 #12 over-limit blockquote group (61 groups across 27 files — Transform A/B)
  └─ Fill Version-History row date at commit time
          │
          ▼
node scripts/validation/c17-eee-contract.mjs   (immutable gate, Phase-115 HARN-01)
  ├─ Enrollment = opt-in by doc_id-key presence — batches independently mergeable;
  │   RE-147 (ca-enrollment-timing.md) stays un-enrolled by staying keyless
  └─ Exit 0 required before batch merge / phase close (SC4)
          │
          ▼
docs/_registry/RE-index.md  Status column: Pending → Approved  (34 files; RE-147 stays Pending)
```

### Recommended Project Structure

```
scripts/pipeline/
└── retrofit-reference.mjs      # NEW — forked from retrofit-guide.mjs (Claude's Discretion)

docs/reference/
└── *.md                         # 25 enrolled files modified in place; ca-enrollment-timing.md untouched

docs/error-codes/
└── *.md                         # 7 enrolled files modified in place

docs/apv1-vs-apv2.md              # enrolled, modified in place
docs/windows-vs-macos.md          # enrolled, modified in place

docs/_registry/
└── RE-index.md                  # Status column: Pending → Approved for the 34
```

### Pattern 1: Pre-H1 span is simple in this corpus (no whole-span-relocation defect actually triggers)

**What:** A direct structural scan of all 34 enrolled files' pre-H1 spans (executed this session — see Code Examples) found **at most ONE blockquote group and zero HTML comments** in every file's pre-H1 span. 8 files (`00-index.md`, `4-platform-capability-comparison.md`, `android/ios/linux/macos-capability-matrix.md`, `aosp-oem-matrix.md`) have **zero** pre-H1 content at all (H1 is the first body content). The remaining 26 files have exactly one gate blockquote (1–4 lines) and nothing else.

**When to use:** Implement the whole-pre-H1-span capture generally anyway (never conditionally) — this is the corrected lesson from Phase 117's confirmed silent-content-loss defect, and costs nothing to implement even though this specific corpus doesn't exercise the multi-element case. Do not regress to `retrofit-runbook.mjs`'s narrower "first blockquote run only" capture.

**Confirmation (this session):**
```
docs/reference/00-index.md:                 firstH1Idx=1 spanLines=0 bqGroups=0 htmlComments=0
docs/reference/apv1-apv2-migration.md:      firstH1Idx=3 spanLines=1 bqGroups=1 htmlComments=0
docs/error-codes/06-apv2-device-preparation.md: firstH1Idx=6 spanLines=4 bqGroups=1 htmlComments=0
docs/apv1-vs-apv2.md:                       firstH1Idx=3 spanLines=1 bqGroups=1 htmlComments=0
# ...all 34 enrolled files confirmed: bqGroups <= 1, htmlComments = 0
```
`[VERIFIED: Node script executed this session against all 34 enrolled files + the carved-out RE-147]`

### Pattern 2: Version-History column-shape detection and matching-width row insertion (NEW this phase — the load-bearing mechanical fix)

**What:** Before inserting the new `v1.15 EEE reformat` row, the forked helper must (1) check whether `## Version History` already exists, and if so (2) inspect the existing table's header row to count columns, then (3) emit a new row with the **same** column count. Blindly reusing the Phase-117 helper's hardcoded 3-column row (`'| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed | — |'`) against a 2-column existing table produces a malformed table (a data row with 3 cells under a 2-column header) — Markdown renderers do not error on this, they silently misrender it, so it would not be caught by a quick glance and must be prevented structurally.

**When to use:** All 13 files with a pre-existing `## Version History` section (the "prepend" branch). The other 21 files (the "create" branch) get a fresh section — see Open Questions for the 2-col-vs-3-col choice on the *new* section's own header.

**Confirmed column shapes (this session, `awk` scan of every existing `## Version History` table header):**

| Column shape | Files (8 in 2-col group, 5 in 3-col group) |
|---|---|
| **2-column** (`\| Date \| Change \|`) | `docs/reference/00-index.md`, `docs/error-codes/00-index.md`, `docs/error-codes/01-mdm-enrollment.md`, `docs/error-codes/02-tpm-attestation.md`, `docs/error-codes/03-esp-enrollment.md`, `docs/error-codes/04-pre-provisioning.md`, `docs/error-codes/05-hybrid-join.md`, `docs/error-codes/06-apv2-device-preparation.md` |
| **3-column** (`\| Date \| Change \| Author \|`) | `docs/reference/4-platform-capability-comparison.md`, `docs/reference/android-capability-matrix.md`, `docs/reference/aosp-oem-matrix.md`, `docs/reference/ios-capability-matrix.md`, `docs/reference/linux-capability-matrix.md` |

`[VERIFIED: awk scan of all 13 pre-existing Version History tables, executed this session]`

### Pattern 3: Per-Table Prose Placement (D-118-1, chunk-survival — no gate forces this)

**What:** For each capability-matrix/comparison table in the D-118-1-in-scope files, add a one-line lead-in immediately before the table and a trailing summary blockquote (`> **Table summary:** ...`) within 5 lines after — restating the table's existing scope, no new claims. `docs/_templates/reference-template.md` already documents this exact pattern (lines 44-55) with a worked example, authored in Phase 114 in anticipation of this phase.

**In-scope files and table counts (independently re-measured this session, content tables only — excludes any pre-existing trailing `## Version History` table, which the naive full-body scan would otherwise double-count):**

| File | Content tables | Row counts |
|---|---|---|
| `docs/reference/4-platform-capability-comparison.md` | 7 | 12,10,10,10,8,6,2 |
| `docs/reference/android-capability-matrix.md` | 7 | 11,10,8,7,5,6,7 |
| `docs/reference/aosp-oem-matrix.md` (recommended inclusion — see Open Questions) | 4 | 6,6,6,6 |
| `docs/reference/ios-capability-matrix.md` | 6 | 16,11,9,9,6,6 |
| `docs/reference/linux-capability-matrix.md` | 9 | 5,6,5,5,4,5,3,3,3 |
| `docs/reference/macos-capability-matrix.md` | 8 | 12,11,10,8,6,6,10,6 |
| `docs/apv1-vs-apv2.md` (recommended inclusion — see Open Questions) | 1 | 21 |
| `docs/windows-vs-macos.md` (recommended inclusion — see Open Questions) | 3 | 15,5,3 |
| **Total** | **45 tables → ~90 prose insertions (before+after)** | |

`docs/reference/00-index.md` has **zero** content tables (pure nav-hub TOC) and needs **no** D-118-1 prose — consistent with its "pure TOC" character noted in the CONTEXT.md D-118-2 adjudication. All other reference-class files (`licensing-matrix.md`, `endpoints.md`, error-code lookup tables, etc.) contain ordinary reference/lookup tables, not capability-matrix or comparison tables — recommended **out of scope** for D-118-1 (see Open Questions).

`[VERIFIED: Node script executed this session, content-tables-only scan (cuts at `## Version History`) against all 34 enrolled files]`

### Anti-Patterns to Avoid

- **Reusing `retrofit-guide.mjs`'s Version-History insertion logic unmodified against this corpus:** it hardcodes a 3-column row; 8 of this phase's 13 pre-existing-VH files use a 2-column table. See Pattern 2.
- **Applying D-118-1 per-table prose to every table in every reference doc:** CONTEXT.md's language is "capability-matrix and comparison TABLE" — not "every table." Applying it broadly would force ~20+ additional ordinary lookup tables (SKU lists, endpoint tables, error-code tables) into scope, multiplying the hand-authoring load for zero chunk-survival benefit beyond what the 8 D-118-1-scoped files already deliver (see Summary and Open Questions).
- **Matching gate relocation on the literal string "Version gate":** match by structural position only (117 lesson, still applies even though this corpus never uses a second label).
- **Copy-pasting `last_verified: 1970-01-01` (TEMPLATE-SENTINEL) into a retrofitted file:** disables C17 #9/#12 for that file. None of the 34 enrolled files currently carry the sentinel (verified this session).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Doc ID lookup | Hand-transcribing `RE-NNN` per file | `buildDocIdMap()` join-on-path against `RE-index.md` (verbatim reusable from `retrofit-guide.mjs`) | C17 #9 is an unforgiving exact-match |
| Platform-label normalization | A second, divergent D1 map | Copy `D1_MAP` verbatim from `c17-eee-contract.mjs:26-47` | Any divergence causes C17 #9/#10 to fail unpredictably |
| #12 over-limit detection | A new ad-hoc blockquote scanner | The exact logic at `c17-eee-contract.mjs:387-405` (copy verbatim as pre/post measurement tool) | Any deviation produces a measurement that doesn't match the actual gate |
| #11 table-row-count detection | A new ad-hoc table scanner | The exact logic at `c17-eee-contract.mjs:344-380` (header-inclusive count, excludes separator rows only) | Confirms `error-codes/00-index.md`'s 30-row table is already compliant; a divergent scanner could mis-flag it as needing new authoring |
| Frontmatter parsing | A YAML library | The existing multiline-regex `/^---\n([\s\S]*?)\n---/m` | All templates begin with an HTML comment before frontmatter |
| Version-History column-shape detection | Assuming all existing tables are 3-column (117 precedent) | Parse the actual header row and count `\|`-delimited cells before choosing the new row's shape | 8 of 13 pre-existing tables in this corpus are 2-column — a hardcoded assumption silently misaligns them (Pattern 2) |

**Key insight:** every mechanical piece of this phase was already built correctly once in Phase 115/116/117 and is directly copy-pasteable, EXCEPT the Version-History column-shape detection, which is genuinely new — Phase 117's corpus had zero pre-existing sections so this class of bug never had a chance to manifest there.

## Common Pitfalls

### Pitfall 1: Version-History column-count mismatch silently misaligns 8 of 13 pre-existing tables (NEW — not present in 116/117)

**What goes wrong:** A helper forked from `retrofit-guide.mjs` without modification inserts a hardcoded 3-column row (`| YYYY-MM-DD | ... | — |`) into any pre-existing `## Version History` table. 8 of this phase's 13 pre-existing tables (`reference/00-index.md` + all 7 `error-codes/*.md`) use a 2-column header (`| Date | Change |`). The result is a data row with more cells than the header — Markdown renders this without erroring, producing a subtly misaligned table (the 3rd cell either gets silently absorbed into the 2nd column's rendering or spills past the table, renderer-dependent) that is easy to miss in a quick diff review.

**Why it happens:** Phase 116 (75 runbooks, 74/75 lacked any VH section) and Phase 117 (57 guides, 0/57 lacked one) never exercised the "prepend into a pre-existing table" code path enough to discover this class-of-file split; this phase is the first to have a majority-prepend workload (13/34) AND a mixed column-shape population within that workload.

**How to avoid:** Parse the existing header row (`bodyLines[vhIdx+2]` typically, the first row after the separator) and count pipe-delimited cells before constructing the new row string; branch on 2 vs. 3 columns.

**Warning signs:** Run a quick `grep -A2 "## Version History"` across the batch's target files before authoring and confirm the header shape per file — do not assume uniformity across the corpus.

### Pitfall 2: D-118-1's "capability-matrix and comparison TABLE" scope is narrower than "every table in every reference doc"

**What goes wrong:** A naive reading of D-118-1 ("author a prose summary for every ... TABLE") could be over-applied to all ~50+ tables across the 34-file corpus (SKU tables, endpoint lists, error-code lookup tables, checklists), multiplying the hand-authoring workload several-fold beyond what CONTEXT.md's own illustrative examples ("macos 8, android 8, 4-platform 8, linux ~10, ios 7") describe.

**Why it happens:** The decision text's noun phrase "capability-matrix and comparison TABLE" is adjectival, not a blanket "every table" rule, but this is easy to misread in isolation from the illustrative examples that immediately follow it in CONTEXT.md.

**How to avoid:** Scope D-118-1 prose authoring to tables that are genuinely capability matrices or explicit platform/framework comparisons: the 5 named capability-matrix files + `4-platform-capability-comparison.md` (all named in CONTEXT.md) + (recommended) `aosp-oem-matrix.md` (same structural class, just not named in the illustrative list) + (recommended) `apv1-vs-apv2.md` and `windows-vs-macos.md` (explicit comparison docs by title/registry classification). See Open Questions for confirming this scope at plan time.

**Warning signs:** If the per-table-prose hand-authoring estimate for a batch plan exceeds ~90 total prose lines across the whole phase, the scope has likely been over-applied.

### Pitfall 3: Blockquoted code fences are invisible to C17's code-fence mask (carried forward from 117, still applies)

**What goes wrong:** A fenced code block written as `> \`\`\`powershell` inside a callout is not recognized as a code fence by `c17-eee-contract.mjs`'s `inCodeFence` detector (only matches a fence marker at line-start; `>` never matches). Every character counts toward #12.

**Why it happens:** Genuine, immutable validator behavior (C17 is immutable per Phase-115 D-04).

**How to avoid:** For the (if any) reference-doc callouts with embedded code samples pushing a group over 200 chars, de-blockquote the entire callout (Transform B) rather than trying to keep the code fenced inside a shortened blockquote. A spot-check of this corpus's 61 over-limit groups did not surface an embedded-code-fence case as prominent as Phase 117's `8021x/03-windows.md` (1,868 chars) or `macos/07-platform-sso-setup.md` (1,892 chars) — the largest single group in this corpus is `error-codes/01-mdm-enrollment.md` at 689 chars — but this must still be checked per-group at authoring time, not assumed absent.

**Warning signs:** A group in the 600–900+ char range that, on inspection, contains a `` ``` `` fence.

### Pitfall 4: Bare `>` lines inside a blockquote look like paragraph breaks but do NOT split the #12 group (carried forward from 117)

**What goes wrong / How to avoid:** Identical mechanism to Phase 117 Pitfall 2 — only a truly empty line (zero characters) breaks a blockquote group for #12 purposes; a bare `>` does not. Applies identically here.

## Code Examples

### Exact C17 assertion mechanics verified against the live validator this session

```javascript
// Source: scripts/validation/c17-eee-contract.mjs (read verbatim this session)

// #10 -- platform resolves in D1_MAP, hard failure, no fallback (lines 331-339)
const platformRaw = platformMatch?.[1];
if (platformRaw === undefined) {
  violations.push({ assertion: 10, detail: 'platform key is absent from frontmatter...' });
} else if (!platformRaw || !(platformRaw in D1_MAP)) {
  violations.push({ assertion: 10, detail: `platform: "${platformRaw}" is not in the D1 map...` });
}

// #11 -- tables >25 rows (header-inclusive count) need prose within 5 lines (lines 344-380)
// error-codes/00-index.md's Quick Lookup table: 1 header row + 29 data rows = 30 total,
// counted header-inclusive per this exact logic -- ALREADY compliant (post-table prose at
// "Select a category above or use Ctrl+F..." within the 5-line scan window). No new
// authoring is gate-forced anywhere in the enrolled corpus.

// #12 -- every top-level blockquote GROUP <=200 chars, joined with a single space (lines 387-405)
const bqText = bqLines.join(' ');
if (bqText.length > 200) { violations.push({ assertion: 12, detail: `Blockquote exceeds 200 chars (${bqText.length} chars)` }); }
```
`[VERIFIED: scripts/validation/c17-eee-contract.mjs, read + executed via --self-test this session (4/4 sub-tests pass)]`

### D1_MAP coverage — clean for the entire reference-class corpus (verified by grep, not assumed)

```
# Raw platform: values found across all 34 enrolled + 1 carved-out reference-class files:
all, Windows, macOS, Android, Linux           (proper-case, all already in D1_MAP)
# absent entirely (10 files, confirmed by grep -rL "^platform:"):
docs/reference/powershell-ref.md
docs/reference/registry-paths.md
docs/error-codes/00-index.md ... 06-apv2-device-preparation.md (all 7)
docs/apv1-vs-apv2.md
```
All raw values (`Windows`, `windows` if lowercase ever appears, `all`, `macOS`, `Android`, `Linux`) are already in `D1_MAP` (`c17-eee-contract.mjs:26-47`) — **no new D1_MAP entries are needed this phase** (unlike Phase 114's original ~19-20-variant normalization effort). `[VERIFIED: grep -n "^platform:" and grep -rL "^platform:" docs/reference/*.md docs/error-codes/*.md docs/apv1-vs-apv2.md docs/windows-vs-macos.md, executed this session]`

### #12 violation reproduction — independent re-measurement this session

Running the exact `c17-eee-contract.mjs:387-405` logic (Node script, this session) against all 34 enrolled files produced **61 total over-limit blockquote groups across 27 files** (a 6th of Phase 117's 370-group workload). Selected confirmations:

| File | Over-limit groups | Max group length |
|------|--------------------|-------------------|
| `docs/reference/win32-app-packaging.md` | **9** | 430 |
| `docs/reference/network-infrastructure.md` | 7 | 283 |
| `docs/reference/imaging-to-autopilot.md` | 5 | 351 |
| `docs/reference/apv1-apv2-migration.md` | 4 | 344 |
| `docs/reference/esp-timeout-tuning.md` | 4 | 368 |
| `docs/error-codes/01-mdm-enrollment.md` | 1 | **689 (corpus worst)** |
| `docs/error-codes/00-index.md` | 2 | 287, 284 (the D-118-4 mandated double-split) |
| `docs/reference/00-index.md`, `android/ios/linux/macos-capability-matrix.md`, `apv1-vs-apv2.md` | 0 each | — (already compliant) |

Including the carved-out `docs/reference/ca-enrollment-timing.md` (4 groups, max 308 chars — not enrolled, measured for completeness only) brings the total to **65 groups across 28 files**, which is the exact figure CONTEXT.md cites — confirming CONTEXT.md's number included the soon-to-be-excluded mermaid file. **The enrolled-scope authoring load is 61 groups / 27 files, not 65/28.**

`[VERIFIED: Node script reproducing c17-eee-contract.mjs:387-405, executed against all 34 enrolled files + the 1 carved-out file this session]`

### Full per-file inventory (all 34 enrolled files + 1 carve-out)

```
=== docs/reference/ (25 enrolled + 1 carve-out) ===
00-index.md                          RE-142  platform=all      VH=PREPEND(2-col)  tables=0 (no D-118-1)          #12=0
4-platform-capability-comparison.md  RE-143  platform=all      VH=PREPEND(3-col)  tables=7 (D-118-1 IN SCOPE)    #12=0
android-capability-matrix.md         RE-144  platform=Android  VH=PREPEND(3-col)  tables=7 (D-118-1 IN SCOPE)    #12=0
aosp-oem-matrix.md                   RE-145  platform=Android  VH=PREPEND(3-col)  tables=4 (D-118-1 recommended) #12=1 (max 286)
apv1-apv2-migration.md                RE-146  platform=Windows  VH=CREATE          tables=3 (no D-118-1)          #12=4 (max 344)
ca-enrollment-timing.md              RE-147  platform=Windows [MERMAID CARVE-OUT -- NOT ENROLLED, v1.16]
compliance-timing.md                 RE-148  platform=Windows  VH=CREATE          tables=3 (no D-118-1)          #12=3 (max 371)
deployment-reporting.md              RE-149  platform=Windows  VH=CREATE          tables=4 (no D-118-1)          #12=1 (max 295)
drift-detection.md                   RE-150  platform=Windows  VH=CREATE          tables=3 (no D-118-1)          #12=1 (max 368)
endpoints.md                         RE-151  platform=all      VH=CREATE          tables=4 (no D-118-1)          #12=2 (max 272)
entra-prerequisites.md               RE-152  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=1 (max 264)
esp-timeout-tuning.md                RE-153  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=4 (max 368)  ["Guide"-titled, stays Reference per D-118-3]
gpo-to-intune.md                     RE-154  platform=Windows  VH=CREATE          tables=4 (no D-118-1)          #12=3 (max 439)  ["Guide"-titled, stays Reference]
imaging-to-autopilot.md              RE-155  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=5 (max 351)  ["Guide"-titled, stays Reference]
ios-capability-matrix.md             RE-156  platform=all      VH=PREPEND(3-col)  tables=6 (D-118-1 IN SCOPE)    #12=0
licensing-matrix.md                  RE-157  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=2 (max 298)
linux-capability-matrix.md           RE-158  platform=Linux    VH=PREPEND(3-col)  tables=9 (D-118-1 IN SCOPE)    #12=0
macos-capability-matrix.md           RE-159  platform=all      VH=CREATE          tables=8 (D-118-1 IN SCOPE)    #12=0
macos-commands.md                    RE-160  platform=macOS    VH=CREATE          tables=6 (no D-118-1)          #12=1 (max 260)
macos-log-paths.md                   RE-161  platform=macOS    VH=CREATE          tables=2 (no D-118-1)          #12=1 (max 295)
network-infrastructure.md            RE-162  platform=Windows  VH=CREATE          tables=1 (no D-118-1)          #12=7 (max 283)
new-batch-workflow.md                RE-163  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=1 (max 298)
powershell-ref.md                    RE-164  platform=ABSENT->inject Windows  VH=CREATE  tables=13 (no D-118-1)  #12=2 (max 255)
registry-paths.md                    RE-165  platform=ABSENT->inject Windows  VH=CREATE  tables=1 (no D-118-1)   #12=1 (max 209)
security-baseline-conflicts.md       RE-166  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=2 (max 414)
win32-app-packaging.md               RE-167  platform=Windows  VH=CREATE          tables=2 (no D-118-1)          #12=9 (max 430, corpus-worst group count)

=== docs/error-codes/ (7 enrolled, all keyless) ===
00-index.md                     RE-168  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=1 (30 rows, >25, ALREADY #11-compliant)  #12=2 (287,284 -- MANDATORY double-split)
01-mdm-enrollment.md            RE-169  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=2  #12=1 (max 689, corpus-worst single group)
02-tpm-attestation.md           RE-170  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=2  #12=1 (max 361)
03-esp-enrollment.md            RE-171  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=3  #12=1 (max 274)
04-pre-provisioning.md          RE-172  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=2  #12=1 (max 270)
05-hybrid-join.md               RE-173  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=3  #12=1 (max 248)
06-apv2-device-preparation.md   RE-174  platform=ABSENT->inject Windows  VH=PREPEND(2-col)  tables=1  #12=2 (328,210)

=== Comparison docs (2 enrolled) ===
apv1-vs-apv2.md      RE-177  platform=ABSENT->inject Windows  VH=CREATE  tables=1 (21 rows, D-118-1 recommended)  #12=0 (1 group, compliant)
windows-vs-macos.md  RE-178  platform=all                     VH=CREATE  tables=3 (D-118-1 recommended)          #12=1 (max 230)
```
`[VERIFIED: grep + Node scripts executed this session against all 34 enrolled files + RE-147]`

### Recommended plan structure (Claude's Discretion input — not locked)

| # | Plan | Files | #12 groups | VH branches exercised | Relative effort |
|---|------|-------|------------|------------------------|------------------|
| 0 | Author/fork `retrofit-reference.mjs` + self-test | — | — | — | Prerequisite (mirrors 116-01/117-01) |
| 1 | Capability matrices + comparisons (`00-index`, `4-platform-capability-comparison`, `android/aosp-oem/ios/linux/macos-capability-matrix`, `apv1-vs-apv2`, `windows-vs-macos`) | 9 | 2 | PREPEND×7 (2×2-col, 5×3-col), CREATE×2 | Light #12, HEAVY table-prose (~90 prose lines) — the D-118-1 showcase batch; exercises the widest variety of VH branches in one plan for early defect surfacing |
| 2 | Migration/monitoring/infra-prereq (`apv1-apv2-migration`, `imaging-to-autopilot`, `gpo-to-intune`, `esp-timeout-tuning`, `deployment-reporting`, `drift-detection`, `new-batch-workflow`, `entra-prerequisites`) | 8 | 20 | CREATE×8 | Medium |
| 3 | Security/infra-detail/macOS-CLI/PowerShell (`compliance-timing`, `security-baseline-conflicts`, `licensing-matrix`, `network-infrastructure`, `win32-app-packaging`, `endpoints`, `registry-paths`, `powershell-ref`, `macos-commands`, `macos-log-paths`) | 10 | 30 | CREATE×10 (incl. 2 keyless: `powershell-ref`, `registry-paths`) | Heaviest #12 load (win32=9, network=7) |
| 4 | `docs/error-codes/` (cohesive per D-02 mandate) | 7 | 9 | PREPEND×7 (all 2-col) | All 7 keyless-injected; the mandatory double-split at `00-index.md`; the already-#11-compliant 30-row table |

5 total plans (1 helper + 4 batches) — within the CONTEXT.md D-02 "~4–6" target. Plan 3 (30 groups) is the heaviest; the planner may split it into two if desired (e.g., separate the 2 keyless PowerShell/registry files into their own light batch) — this table is a starting recommendation, not a locked decision.

## State of the Art

Not applicable in the conventional sense (no external framework/library evolution to track) — entirely internal to this repository's v1.15 milestone:

| Old Approach (Phase 116/117) | Current Approach (this phase) | When Changed | Impact |
|---|---|---|---|
| Version-History insertion always exercises only ONE code path per phase (116: mostly-prepend; 117: 100% create) | This phase exercises BOTH branches roughly evenly (13 prepend / 21 create) | This phase | The forked helper's self-test must cover both branches, not just the historically-dominant one |
| Version-History existing tables assumed uniform 3-column shape (true for 116/117's few pre-existing sections) | 8 of 13 pre-existing tables in this corpus are 2-column | This phase (grounding correction from this research) | New branch logic required — see Pattern 2 / Pitfall 1 |
| Table remediation (D-118-1 equivalent) never applicable in 116/117 (no capability-matrix-class docs in those retrofit classes) | First phase where per-table prose summaries are authored at scale (~45 tables) | This phase | The `docs/_templates/reference-template.md` template already anticipates this (authored Phase 114) — no new template work needed |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The exact ≥30-word Summary prose wording and per-table prose wording are not prescribed beyond the template's bracketed instructions — hand-authored at plan/execution time | Architecture Patterns | Low — explicitly Claude's Discretion per CONTEXT.md |
| A2 | `docs/reference/aosp-oem-matrix.md` is recommended for D-118-1 per-table-prose inclusion even though CONTEXT.md's illustrative list did not name it | Architecture Patterns Pattern 3 / Common Pitfalls 2 | Low-medium — if the planner disagrees and excludes it, 4 tables (16 prose lines) drop out of scope; either choice is reformat-envelope-safe |
| A3 | `docs/apv1-vs-apv2.md` and `docs/windows-vs-macos.md` are recommended for D-118-1 inclusion (their tables are literal platform/framework comparisons) even though they live outside `docs/reference/` | Architecture Patterns Pattern 3 / Common Pitfalls 2 | Low-medium — same as A2; 4 tables (16 prose lines) at stake |
| A4 | New `## Version History` sections created for the 21 files lacking one should use the established 3-column shape (matching 116/117 corpus-wide precedent) rather than the EEE-SOP-standard.md's literally-documented 2-column example row | Open Questions | Low — cosmetic column-count choice; either is reformat-safe, but inconsistency across the corpus (3-col in 116/117 + half of 118, 2-col in the rest) is a minor but real documentation-hygiene concern the planner should lock explicitly |

**No `[ASSUMED]`-tagged factual claims about C17 mechanics, the D1 map, the #11/#12 measurements, or the corpus structure exist in this research** — all were read directly from checked-in source or produced by executing verification scripts against the live repository this session. The four items above are scoping/style recommendations flagged for an explicit plan-time lock, not unverified facts.

## Open Questions (RESOLVED)

1. **New `## Version History` sections (21 files, the "create" branch): 2-column (per `docs/_standards/EEE-SOP-standard.md`'s literal example, lines 164-166) or 3-column with an `Author` column (per the Phase 116/117 corpus-wide precedent, `| Date | Change | Author |`)?** `RESOLVED: 3-column for newly-created VH sections (matches shipped 116/117 precedent); existing VH tables keep their detected column count. Locked in 118-01 (detectVhColumnCount) + 118-PATTERNS.md "Open Question 1 lock".`
   - What we know: `EEE-SOP-standard.md` itself documents the row as `| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed |` (2 columns, no Author field). Both Phase 116 (75 files) and Phase 117 (57 files) actually shipped 3-column tables with an `Author: —` field, deviating from the standard's literal text. 5 of this phase's own pre-existing tables (the capability-matrix files) already use 3-column; 8 (00-index + all error-codes) use 2-column.
   - What's unclear: whether to follow the literal (but already twice-deviated-from) standard text, or continue the established 3-column shipped precedent for the 21 files that need a brand-new section.
   - Recommendation: use 3-column (matching 116/117 and 5 of this phase's own pre-existing tables) for corpus-wide consistency across all ~166 retrofitted files by the time Phase 118 closes — the 2-column shape becomes the minority pattern, confined to the 8 files where it must be preserved because prepending into an existing table (never restructure existing rows/columns — reformat-envelope-safe). Lock this explicitly in the plan rather than leaving it implicit.

2. **Does D-118-1's per-table-prose scope include `aosp-oem-matrix.md`, `apv1-vs-apv2.md`, and `windows-vs-macos.md`, which CONTEXT.md's illustrative examples did not name?** `RESOLVED: include aosp-oem-matrix.md, apv1-vs-apv2.md, windows-vs-macos.md — D-118-1/1B covers "every capability-matrix and comparison table". Locked in 118-02 Task 2.`
   - What we know: CONTEXT.md's D-118-1 text names 5 files explicitly ("macos 8, android 8, 4-platform 8, linux ~10, ios 7") as illustrative of "multi-table matrix files," not as an exhaustive allowlist. `aosp-oem-matrix.md` is structurally identical (per-OEM capability tables); `apv1-vs-apv2.md`/`windows-vs-macos.md` are explicit comparison docs by title and registry classification, matching the "comparison TABLE" half of D-118-1's own language.
   - What's unclear: whether CONTEXT.md's adversarial review considered and deliberately excluded these 3 files, or simply didn't enumerate them because the illustrative list was table-count-focused (matrices with many tables) rather to exhaustively bound scope.
   - Recommendation: include all 3 (adds 8 tables / 16 prose lines to the ~90-line D-118-1 workload) — the "chunk-survival intent" rationale (PIPE-02) that drives D-118-1 applies with equal force to these 3 files' tables, and the reformat-envelope cost of including them is proportionally small. Lock this explicitly in the plan.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Mechanical retrofit script + C17 validator | ✓ | v24.17.0 | — |
| `scripts/validation/c17-eee-contract.mjs` | Per-file/per-batch gate | ✓ (self-test 4/4 pass, confirmed this session) | Phase-115 HARN-01, immutable | — |
| `scripts/pipeline/retrofit-guide.mjs` | Fork base for the new reference helper | ✓ (read in full this session) | Phase-117 D-03 deliverable | — |
| `docs/_registry/RE-index.md` | Doc ID join | ✓ | RE-142..RE-178 rows present, all reference-class rows `Status: Pending` | — |
| `docs/_templates/reference-template.md` | Reference Summary lead + per-table-prose worked example | ✓ (read in full this session) | Phase-114 output; already anticipates D-118-1 | — |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None.

## Validation Architecture

Skipped — `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly.

## Security Domain

`.planning/config.json` does not set `security_enforcement` (absent = enabled per protocol), so this section is included for completeness. This phase has effectively no security surface: it is a pure Markdown-to-Markdown text reformat with no authentication, session handling, network calls, or user input processing. The one relevant control is defensive coding in the mechanical retrofit script itself.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-------------------|
| V2 Authentication | No | No auth surface in this phase |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Yes (narrow) | The retrofit script's own guards — path allowlist (`docs/reference/`, `docs/error-codes/`, the 2 named comparison-doc paths only), mermaid-carve-out hard-exclusion (fail closed on `ca-enrollment-timing.md`), TEMPLATE-SENTINEL refusal, doc_id-must-resolve-in-registry, platform-must-resolve-in-D1_MAP — carried verbatim from `retrofit-guide.mjs`'s existing 5 guards |
| V6 Cryptography | No | N/A |

### Known Threat Patterns for this stack

Not applicable — no injection, auth, or crypto surface exists in a Markdown-reformat-only phase operating on a trusted, git-tracked corpus with no external/untrusted input.

## Sources

### Primary (HIGH confidence — read verbatim or executed this session)

- `scripts/validation/c17-eee-contract.mjs` — read in full (587 lines); `--self-test` executed (4/4 pass)
- `scripts/pipeline/retrofit-guide.mjs` — read in full (665 lines) — the direct fork base for this phase
- `docs/_standards/EEE-SOP-standard.md` — read relevant sections (D1 map, Doc Type taxonomy, Version-History rule, Status vocabulary, C17 needle-spec cross-reference table)
- `docs/_templates/reference-template.md` — read in full — already documents the D-118-1 per-table-prose pattern with a worked example (authored Phase 114)
- `docs/_registry/RE-index.md` — `RE-140`..`RE-178` rows read (grep)
- `.planning/phases/118-reference-doc-retrofit-table-remediation-26-docs/118-CONTEXT.md` — full adversarial-review-produced context, read in full
- `.planning/phases/117-admin-setup-guide-retrofit-all-platforms/117-CONTEXT.md`, `117-RESEARCH.md`, `117-PATTERNS.md` — direct precedent, read in full
- `.planning/phases/116-l1-l2-runbook-retrofit-75-docs/116-CONTEXT.md` — D-06 (class-directory-index enrollment precedent)
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/config.json` — read in full
- Direct corpus verification executed this session: `grep -n "^platform:"` / `grep -rL "^platform:"` across all 34+1 files; `grep -n "^## Version History"` + `awk` header-shape scan across all 34+1 files; `grep -n "^doc_id:\|^status:\|^owner:\|^doc_type:"` (confirmed zero pre-existing EEE keys anywhere); `grep -n 'mermaid'` (confirmed the single carve-out); two custom Node scripts reproducing `c17-eee-contract.mjs`'s exact #11 (table row-count) and #12 (blockquote group length) logic against all 34 enrolled files plus the 1 carved-out file; a third Node script scanning every file's pre-H1 span structure (confirmed at-most-one-blockquote, zero-HTML-comment simplicity vs. Phase 117's corpus)

### Secondary (MEDIUM confidence)

None — no external sources were needed for this phase.

### Tertiary (LOW confidence)

None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Node.js built-ins only, version verified by direct execution, zero external packages
- Architecture: HIGH — every pattern is either the already-shipped Phase 116/117 precedent or a fix directly derived from executing the actual validator/corpus this session
- Pitfalls: HIGH — the Version-History column-mismatch pitfall was discovered by direct file inspection this session (not inferred); the D-118-1 scope pitfall is a documented interpretive judgment call, flagged accordingly in Open Questions rather than asserted as fact

**Research date:** 2026-07-06
**Valid until:** Effectively indefinite for the C17/EEE-standard mechanics (immutable per Phase-115 D-04) — but re-verify the per-file #11/#12/VH-shape inventory if any reference-class file is edited between this research and plan execution (30-day nominal validity for the corpus-state-dependent tables).
