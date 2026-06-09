---
phase: 74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d
plan: 74-01
wave: 1
type: conventions
created: 2026-06-08
tags: [freshness-routing, vpp-01, harness-lineage, v1.8-constants]
---

# Phase 74 Wave-1 Conventions: Freshness/SHA Matrix + Locked-String Constants

## Purpose

Downstream plans 74-02, 74-03, 74-04, and 74-05 **read this document** for all locked constants
before authoring. Plan authors make **zero re-derivation decisions** on the constants listed here.
This document absorbs the gray-area resolutions from `74-CONTEXT.md` §D-01/D-02/D-03/D-04 into a
reviewed artifact BEFORE Wave-2+ plan authoring begins. Do NOT re-litigate; every constant here
is source-of-truth.

Path-A source for this document: `70-CONVENTIONS.md` (Phase 70 v1.7 Pillar D twin).

---

## 1. Authoring Date + Resolved-Key Date Prefix

**Authoring date:** `2026-06-08`

**PHASE_74_RESOLVED_PREFIX (sidecar resolved-key format):**

```
resolved_2026_06_08
```

- **Form:** underscore separators (`resolved_YYYY_MM_DD`) — matching the v1.7 sidecar convention
  `resolved_2026_05_26` (see `scripts/validation/v1.7-audit-allowlist.json` lines 87-92).
- **NOT** hyphens (`resolved_2026-06-08`); the existing sidecar uses underscores throughout.
- **Applied in:**
  - 74-02 Atom 1: the 4 new `ci_2_vpp_location_token` entries in `v1.8-audit-allowlist.json`
    each carry `"resolved_2026_06_08": true`
  - 74-03 Atom 2: `check-phase-74.mjs` V-74-VPP-01b sidecar assertion greps for
    `resolved_2026_06_08` (exact underscore form)

**DECISION RECORD (74-01 LOCKED):** The v1.7 sidecar uses underscore form `resolved_2026_05_26`.
Plan 74-02 MUST write the v1.8 sidecar entries using `resolved_2026_06_08` (underscore form)
for consistent predecessor-convention alignment. This file locks that decision; no re-derivation
at plan-authoring time.

---

## 2. VPP-01 Site Registry

**Target file:** `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md`

**Sites renamed by Plan 74-01 Task 1 (commit `be48583`):**

| # | Approx. line | H2 section | Current text (post-rename) | Pre-rename text |
|---|-------------|------------|---------------------------|-----------------|
| 1 | 115 | `## VPP (Microsoft 365 Native + Volume Purchased)` | `the content token, allowing assignment` | `the VPP location token, allowing assignment` |
| 2 | 149 | `## Mac App Store (via ABM)` | `Sync the ABM / content token to Intune` | `Sync the ABM / VPP location token to Intune` |
| 3 | 155 | `## Mac App Store (via ABM)` | `The ABM / content token has a 1-year` | `The ABM / VPP location token has a 1-year` |
| 4 | 160 | `## Mac App Store (via ABM)` | `A single content token cannot be shared` | `A single VPP location token cannot be shared` |

**Scoped leak-check result (post-commit):**
`grep -rc "VPP location token" docs/operations/app-lifecycle/` → all 0 (CLEAN)
`grep -c "content token" 02-macos-pkg-dmg-pipeline.md` → 4 (PASS)
`last_verified: 2026-06-08` present (PASS)

**Out-of-scope bare forms (DO NOT RENAME):**
- Line ~142: `via a VPP token` — different term (bare VPP token, not "VPP location token")
- Line ~150: `Apple VPP tokens` — different term
- Line ~161: `VPP tokens` — different term

These 3 bare forms are NOT the Apple-Business rebrand target per 74-CONTEXT.md D-02 + user pick
"Rename all 4 [VPP location token sites], not + flag bare forms".

**Deviation note (baked into commit `be48583` body):**
REQUIREMENTS.md:45 + ROADMAP SC#2 headline say "3 sites (lines 115, 149, 155)".
`v1.7-DEFERRED-CLEANUP.md:213` (source-of-truth) records L160 as "the 4th occurrence; total 4".
User approved 4-site rename 2026-06-08 per 74-CONTEXT.md D-02. All 4 renamed; zero legacy leak.

---

## 3. 6-Validator Cross-OS-Applicable Set (Plan 74-04 Axis 2 cross-OS EXACT MATCH)

**EXACT set for Plan 74-04 HARNESS-11 Axis 2 cross-OS comparison:**

| # | Validator | Role |
|---|-----------|------|
| 1 | `scripts/validation/v1.8-milestone-audit.mjs` | Harness (C1-C16) |
| 2 | `scripts/validation/check-phase-70.mjs` | Per-phase validator |
| 3 | `scripts/validation/check-phase-71.mjs` | Per-phase validator |
| 4 | `scripts/validation/check-phase-72.mjs` | Per-phase validator |
| 5 | `scripts/validation/check-phase-73.mjs` | Per-phase validator |
| 6 | `scripts/validation/check-phase-74.mjs` | Per-phase validator (chain-apex) |

**Explicitly excluded** (with reasons):
- `pin-helper-advisory` — CI-only advisory job, not run locally; has `continue-on-error: true`
- `rotting-external-quarterly` — cron-only, skips on `workflow_dispatch` (negative control)
- Harness `--self-test` — local supporting evidence, not a cross-OS row

**Cross-OS PASS-Count EXACT MATCH** required across all 6 validators per HARNESS-11 (74-CONTEXT.md
D-03). Plan 74-04 records Windows-local vs Linux-GHA per-validator PASS/FAIL/SKIP counts side
by side; any mismatch is a blocking gate.

---

## 4. BASELINE_12 Anchor

**File:** `scripts/validation/regenerate-supervision-pins.mjs`
**Location:** Inserted after the BASELINE_11 block (near the `const BASELINE_9 = [` region)
**Anchors to:** The **Atom 1 SHA** from Plan 74-02 (a KNOWN-PAST SHA at BASELINE_12 authoring time)
**NOT:** the future Phase 74 close SHA (different from BASELINE_11 which anchored to `26a1ae9`,
Phase 69 close — a known-past SHA at the time BASELINE_11 was authored)

**Format** (mirror of BASELINE_11 comment block, substituting v1.8 labels):

```javascript
// BASELINE_12: v1.8 milestone-audit harness lineage bump (Phase 74 Plan 74-02 Atom 1)
// Refreshed at: {74_02_atom_1_SHA}  ← Plan 74-02 fills this at Atom 1 commit time
// v1.8-milestone-audit.mjs + v1.8-audit-allowlist.json + BASELINE_12 (3-file indivisible per SC#1)
```

The `{74_02_atom_1_SHA}` literal is Plan 74-02's responsibility to fill with the actual Atom 1
commit SHA (the same SHA that is `v1.8-audit-allowlist.json` Atom 1 commit). Since D-04 proved
NO Commit A is needed in Phase 74, this is a **known-past-SHA** (not a future close SHA), so
Plan 74-02 can fill it inline at authoring time by capturing `git rev-parse --short HEAD` at
the end of the Atom 1 task.

**BASELINE_11 precedent SHA:** `26a1ae9` (Phase 69 Plan 69-02 close, the known-past SHA at v1.7
Atom 1 authoring time). BASELINE_12 anchors to the equivalent Phase 74-02 Atom 1 SHA.

---

## 5. CHAIN Constants for check-phase-74.mjs

**Path-A source:** `scripts/validation/check-phase-73.mjs`

```javascript
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73];
// 26 phases (48..73 inclusive)
const CHAIN_SKIP   = new Set([]);  // EMPTY — permanent post-Phase-68 7b635ca invariant
```

**CHAIN_PHASES count:** 26 elements (phases 48 through 73 inclusive).
**CHAIN_SKIP:** `new Set([])` — permanently empty since Phase 68 commit `7b635ca`. Do NOT add any
entries. V-74-SELF guard must assert that 74 is NOT in CHAIN_PHASES.

**V-74-SELF guard shape** (inherited from check-phase-73.mjs V-73-SELF):
```javascript
// === V-74-SELF: CHAIN_PHASES does NOT include 74 (no self-reference; D-22 auditor-independence) ===
checks.push({
  id: 'SELF', name: 'V-74-SELF: CHAIN_PHASES array does NOT include 74 (no self-recursive call)',
  run() {
    if (CHAIN_PHASES.includes(74)) return { pass: false, detail: 'CHAIN_PHASES includes 74 -- self-reference regression' };
    const skipList = [...CHAIN_SKIP].sort((a, b) => a - b).join(',');
    return { pass: true, detail: 'CHAIN_PHASES = [' + CHAIN_PHASES.join(',') + '] -- 74 absent (correct); CHAIN_SKIP = [' + skipList + ']' };
  }
});
```

---

## 6. Coexistence Count (audit-harness-v1.8-integrity.yml)

`audit-harness-v1.8-integrity.yml` is the **5th coexistence file**.

Existing 4 files (frozen, byte-unchanged):
1. `.github/workflows/audit-harness-integrity.yml` (v1.4)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`

**STALE headline in REQUIREMENTS.md HARNESS-10:** "Fourth" — empirically incorrect (4 files exist,
v1.8 is the 5th). ROADMAP SC#1 authoritative: "fifth parallel coexistence file". Use "fifth" in
all plan and commit artifacts. This was flagged as a v1.9+ requirement-authoring hygiene item in
74-CONTEXT.md §Deferred Ideas.

---

## 7. Allowlist Invariants (Plan 74-02 HARNESS-08)

| Field | Value | Source |
|-------|-------|--------|
| `c13_broken_link_allowlist` entry count | 15 entries | Carry-forward from v1.7 (verified in HARNESS-08 plan) |
| `quarterly_audit` key | YES — carry forward from v1.7 sidecar; cadence `0 8 1 1,4,7,10 *` | v1.7-audit-allowlist.json §quarterly_audit |
| `quarterly_audit` sub-key `quarterly_audit.quarterly_audit` | NOT present — do NOT add one | 74-CONTEXT.md D-01 note: "v1.7 sidecar has NO `quarterly_audit` key" (RESEARCH §HARNESS-08 assumed one — there is none) |
| `phase` field value (sidecar frontmatter/metadata) | `74-v1-8-audit-harness-lineage-bump-milestone-close-pillar-d` | Long-slug form; v1.7 = `70-v1-7-audit-harness-lineage-bump-milestone-close-pillar-d-clo` |
| `schema_version` | `1.1` (carried forward) | v1.7-audit-allowlist.json |
| `generated` | `2026-06-08T00:00:00Z` | Authoring date |

**CI-2 VPP sidecar entries for v1.8 (4 new entries, post-VPP-rename):**

```json
{ "file": "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md", "line": 115, "term": "VPP location token", "context": "VPP H2 first mention", "reason": "Phase 74 VPP-01 4-site rename; renamed to content token at 74-01 commit be48583", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_06_08": true },
{ "file": "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md", "line": 149, "term": "VPP location token", "context": "Mac App Store H2 first mention", "reason": "Phase 74 VPP-01 4-site rename; renamed to content token at 74-01 commit be48583", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_06_08": true },
{ "file": "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md", "line": 155, "term": "VPP location token", "context": "Mac App Store H2 ABM token expiry callout", "reason": "Phase 74 VPP-01 4-site rename; renamed to content token at 74-01 commit be48583", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_06_08": true },
{ "file": "docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md", "line": 160, "term": "VPP location token", "context": "Mac App Store H2 Token-sharing constraint", "reason": "Phase 74 VPP-01 4-site rename (4th occurrence, D-02 approved); renamed to content token at 74-01 commit be48583", "category": "legacy_term_surgical_rename_candidate", "resolved_2026_06_08": true }
```

---

## 8. Close-Gate Constants (Plan 74-05 HARNESS-12)

**Close-gate structure:** ONE commit per D-04 (no Commit A required). ~7 files:
1. `.planning/milestones/v1.8-MILESTONE-AUDIT.md` (NEW)
2. `.planning/milestones/v1.8-DEFERRED-CLEANUP.md` (FINALIZE)
3. `.planning/REQUIREMENTS.md` (12 reqs Active→Validated)
4. `.planning/PROJECT.md` (traceability flip)
5. `.planning/ROADMAP.md` (traceability flip)
6. `.planning/STATE.md` (traceability flip)
7. `.planning/phases/74-.../74-VERIFICATION.md` (NEW)

**Placeholder:** The `v1.8-MILESTONE-AUDIT.md` frontmatter `close_commit:` uses literal
`{phase_74_close_SHA}` — recoverable via:
```bash
git log --all --grep="74-05" --grep="close-gate" --all-match -1 --format=%H
```
This follows the 71-03/72-02/73-03 precedent (6× in project history).

**Pre-Phase-74 baseline SHA for byte-unchanged gate:** `ae9e3f4`
(HEAD before any Phase 74 commit; use as `<pre-74-SHA>` in all `git diff ae9e3f4 HEAD`
predecessor-byte-unchanged diffs).

**Requirements flipped at close-gate (12 total):**
VPP-01, HARNESS-07, HARNESS-08, HARNESS-09, HARNESS-10, HARNESS-11, HARNESS-12
(7 Phase 74 requirements) + the 5 already-complete Phase 71-73 requirements
(ARCHIVE-01, ARCHIVE-02, WRAPPER-01, RETRO-01, RETRO-02) = 12 cumulative v1.8 requirements.
At Plan 74-05 close-gate, the REQUIREMENTS.md Traceability table gets 7 new "Complete" rows.

---

## 9. Pre-Phase-74 Frozen Surfaces (Predecessor Byte-Unchanged Invariant)

**Baseline SHA:** `ae9e3f4` (HEAD before any Phase 74 commit — from 74-01-PLAN.md
acceptance criteria §PREDECESSOR-BYTE-UNCHANGED gate definition).

The following surfaces MUST remain byte-unchanged from `ae9e3f4` through all Phase 74 commits:

```
scripts/validation/v1.4-milestone-audit.mjs
scripts/validation/v1.4.1-milestone-audit.mjs
scripts/validation/v1.5-milestone-audit.mjs
scripts/validation/v1.6-milestone-audit.mjs
scripts/validation/v1.7-milestone-audit.mjs
scripts/validation/v1.4-audit-allowlist.json
scripts/validation/v1.4.1-audit-allowlist.json
scripts/validation/v1.5-audit-allowlist.json
scripts/validation/v1.6-audit-allowlist.json
scripts/validation/v1.7-audit-allowlist.json
.github/workflows/audit-harness-integrity.yml
.github/workflows/audit-harness-v1.5-integrity.yml
.github/workflows/audit-harness-v1.6-integrity.yml
.github/workflows/audit-harness-v1.7-integrity.yml
```

**Chain validators** `check-phase-{48..73}.mjs` are NOT in the byte-unchanged invariant
(per Phase 68/72/73 precedent — chain validators may be edited for RETRO-02 conversions etc.).

**Gate command** (run before every close-gate commit):
```bash
git diff ae9e3f4 HEAD -- scripts/validation/v1.4-milestone-audit.mjs \
  scripts/validation/v1.4.1-milestone-audit.mjs \
  scripts/validation/v1.5-milestone-audit.mjs \
  scripts/validation/v1.6-milestone-audit.mjs \
  scripts/validation/v1.7-milestone-audit.mjs \
  scripts/validation/v1.4-audit-allowlist.json \
  scripts/validation/v1.4.1-audit-allowlist.json \
  scripts/validation/v1.5-audit-allowlist.json \
  scripts/validation/v1.6-audit-allowlist.json \
  scripts/validation/v1.7-audit-allowlist.json \
  .github/workflows/audit-harness-integrity.yml \
  .github/workflows/audit-harness-v1.5-integrity.yml \
  .github/workflows/audit-harness-v1.6-integrity.yml \
  .github/workflows/audit-harness-v1.7-integrity.yml
```
Expected output: EMPTY.

---

## References

- `74-CONTEXT.md` §D-01 — plan layout + VPP placement (Option D)
- `74-CONTEXT.md` §D-02 — VPP corpus-edit handling (Option C; items 1-6)
- `74-CONTEXT.md` §D-03 — 3-axis terminal re-audit (Option A; 6-validator cross-OS set)
- `74-CONTEXT.md` §D-04 — close-gate structure (Option A; NO Commit A)
- `70-CONVENTIONS.md` — Path-A source for this document
- `scripts/validation/v1.7-audit-allowlist.json` lines 87-92 — v1.7 sidecar key format
  (`resolved_2026_05_26` underscore convention)
- `v1.7-DEFERRED-CLEANUP.md` lines 208-223 — VPP-01 source-of-truth (4 sites, L160 = 4th)
- Plan 74-01 commit `be48583` — VPP-01 atomic rename commit
