---
phase: 95-harness-lineage-bump-terminal-re-audit-milestone-close
plan: 95-01
wave: 1
type: conventions
created: 2026-06-26
tags: [harness-lineage, v1.12-constants, milestone-close, freshness-routing]
---

# Phase 95 Wave-1 Conventions: Freshness/SHA Matrix + Locked-String Constants

## Purpose

Downstream plans 95-02, 95-03, and 95-04 **read this document** for all locked constants
before authoring. Plan authors make **zero re-derivation decisions** on the constants listed
here. This document absorbs the gray-area resolutions from `95-CONTEXT.md` (D-01..D-04) and
`95-RESEARCH.md` (Planner Handoff) into a reviewed artifact BEFORE Wave-2+ authoring begins.
Do NOT re-litigate; every constant here is source-of-truth.

Path-A source for this document: `93-CONVENTIONS.md` (Phase 93 v1.11 close twin, same phase name).

> v1.12 is **tooling-ONLY** — there are NO `docs/*` corpus edits (v1.12 content shipped in
> Phase 94). The Phase-93 §7 cross-OS set had 7 rows (v1.11 validators); v1.12 has 4 rows
> (see §7 below — only 2 net-new validators vs Phase 93's 5). V111 pin rides Atom 2
> (deliberate divergence, same as v1.11); Atom 1 is therefore exactly 3 files (not 4).
> Apex CHAIN_PHASES=[48..94] (47 entries) per D-01 correction — see §3.

---

## 1. Authoring Date

**Authoring date:** `2026-06-26`

This is the Phase 95 authoring date. `docs/*` corpus edits are tooling-ONLY in this phase;
all v1.12 content was shipped in Phase 94 (no `last_verified:` frontmatter bumps in Phase 95).

---

## 2. V111 Frozen-Close SHA (Atom 2 — `_lib/frozen-at-close.mjs`)

**V111 SHA (short):** `919b23b`  ← CLOSE-GATE SHA — the v1.11 single-commit close
**Commit:** `docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE`

**Verification command:**
```bash
git log --grep="close-gate" --grep="v1.11" --all-match -1 --format="%h %s"
```
Returns: `919b23b docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE` [VERIFIED 2026-06-26]

**Post-close chores (NOT part of the atom):** `f7a7e6b` (93-01-SUMMARY.md) and `c0be124` (state+roadmap SDK updates) follow `919b23b` but are post-close maintenance — NOT part of the close-gate atom.

**Why exactly ONE V111 entry (not V111 + V111_CLOSEGATE):**
- v1.11 closed in a SINGLE commit → atom == close-gate → a second `V111_CLOSEGATE` export
  would be dead/misleading (mirrors V110 rationale from 93-CONVENTIONS.md §2).
- `919b23b` is the true close-gate commit.

**DIVERGENCE from v1.9/v1.10:** V111 rides **ATOM 2** (per ROADMAP SC#2 + HARN-02; locked
D-04/SD-1). In v1.9/v1.10 the frozen entry rode Atom 1. Still ordering-safe: `919b23b` is
a known-PAST SHA and check-phase-95 reads only PRIOR-milestone closes.

**Locked rules (D-04/SD-2):**
- **SINGLE `V111` entry** in `MILESTONE_CLOSE_SHAS` — NOT `V111` + `V111_CLOSEGATE`.
- Add convenience export `readAtV111Close = (p) => readAtClose('V111', p);` mirroring V110 shape.
- `919b23b` is a **known-PAST SHA** → NO Commit A, NO placeholder substitution.
- **NO Commit A:** grep proof — `grep -rn "V111\|readAtV111\|phase_9._close" scripts/validation/`
  returned EMPTY before this phase; check-phase-95 reads only PRIOR-milestone closes via
  `_lib/frozen-at-close.mjs`.

---

## 3. Pre-Phase-95 Anchor SHA

**Pre-Phase-95 anchor SHA:** `ddf1355` (`docs(phase-94): complete phase execution`)

Use this anchor in:
- The `git diff ddf1355 HEAD -- <26 frozen surfaces>` predecessor byte-unchanged gate (§12)
- Cross-references in downstream plan verification steps

---

## 4. BASELINE_16 Anchor (Atom 1 — `regenerate-supervision-pins.mjs`)

**BASELINE_16 anchor SHA:** *(Captured at Atom-1 task time — `git rev-parse --short HEAD`
immediately AFTER COMMIT 1 — the 95-CONVENTIONS.md commit. That SHA is known-PAST when
Atom 1 commits.)*

The BASELINE_16 comment anchors to the PLAN 95-01 Wave-1 (95-CONVENTIONS.md) commit,
mirroring BASELINE_15's anchor to `34653cb` (Phase 93 Wave-1 commit — 93-CONVENTIONS.md).

**Locked rules (HARN-01):**
- BASELINE_16 is a **comment-only** append AFTER the BASELINE_15 region (after line 452),
  immediately before `const BASELINE_9 = [` (line 453 in current file). The array is **NOT touched**.
- Anchor to the **REAL known-PAST SHA** (COMMIT 1 SHA) — do NOT leave a `{placeholder}`
  in the committed file and do NOT anchor to the future Phase-95 close SHA.
- Resolution path: `BASELINE_17 will refresh at the next milestone close`.

**Close-gate placeholder (Plan 95-04):**
```
close_commit: "{phase_95_close_SHA}"
```
Recovery command: `git log --all --grep="95-04" --grep="close-gate" --all-match -1 --format=%H`

---

## 5. Milestone-Audit 4-Line Load-Bearing Edit Set (Atom 1 — `v1.12-milestone-audit.mjs`)

**Path-A source:** `scripts/validation/v1.11-milestone-audit.mjs` (979 lines, C1-C16, self-test 9/9).
The v1.10→v1.11 hop changed **exactly 4 lines** (979→979 line count). The same 4 edits apply v1.11→v1.12:

| Line | v1.11 (change from) | v1.12 (change to) |
|------|---------------------|-------------------|
| **2** | `v1.11 … Path A copy of v1.10; lineage … → v1.10 → v1.11; C1-C16 inherited verbatim` | `v1.12 … Path A copy of v1.11; lineage … → v1.11 → v1.12; C1-C16 inherited verbatim` |
| **4** | `v1.11-audit-allowlist.json (v1.11 Path-A from v1.10 … per Phase 93 close-state)` | `v1.12-audit-allowlist.json (v1.12 Path-A from v1.11 … per Phase 95 close-state)` |
| **35** | `// Usage: node scripts/validation/v1.11-milestone-audit.mjs [--verbose] [--self-test]` | `…v1.12-milestone-audit.mjs…` |
| **79** | `const raw = readFile('scripts/validation/v1.11-audit-allowlist.json');` | `…v1.12-audit-allowlist.json` **(functional sidecar repoint — load-bearing; CI path-match greps this)** |

**DO NOT bump lines 5 / 90 (Path-A fidelity):**
- Line 5: `Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close`
  — **never bumped** in any prior lineage hop.
- Line 90: `appleBusinessDocPaths: … Apple Business v1.6 docs` — likewise never bumped.

**DO NOT add a C17 / 16th check (locked D-04/SD-1):** the `checks` array stays exactly 15 entries.
Line count stays 979. Self-test block is byte-identical → 9/9 preserved.

**Lineage label:** `phases 62→66→70→74→82→88→93→95, lineage v1.4→v1.12 — 10th entry`
Workflow `name:` → `Audit Harness v1.12 Integrity`; "8th coexistence" → "9th".

---

## 6. Allowlist Invariants (Atom 1 — `v1.12-audit-allowlist.json`)

**Path-A source:** `scripts/validation/v1.11-audit-allowlist.json`

| Field | v1.12 Value | Source / Rule |
|-------|------------|---------------|
| `schema_version` | `1.1` (carried) | v1.11 sidecar |
| `generated` | `2026-06-26T00:00:00Z` | authoring date |
| `phase` | `95-harness-lineage-bump-terminal-re-audit-milestone-close` | long-slug form |
| `c13_broken_link_allowlist` entry count | **EXACTLY 15** (carry from v1.11) | C13 hard-asserts this count |
| `c16_missing_endpoint_exemptions` | `[]` empty (carried) | do NOT add entries |
| `c13_rotting_external` | **carried forward verbatim** (`ci_1`, `ci_2_vpp_location_token`, `ci_3`, `quarterly_audit`) | "do NOT wipe content" doctrine |
| `quarterly_audit.next_review` | `2027-01-01` (carry) | no validator asserts this value |

**DO NOT change (breaks C-checks):**
- `c13_broken_link_allowlist` count: exactly 6 `transient_external` + 9 `template_placeholder`.
- `c16_missing_endpoint_exemptions: []` — carry empty.

---

## 7. The 4-Row Cross-OS-Applicable Validator Set (Plan 95-03 Axis — D-03 LOCKED)

**CORRECTED OS split (D-03 correction from v1.11):** BOTH chain validators cascade on cold
Windows (spawns CHECK_PHASE_NESTED=1 children over a [48..N] range → O(n²) subprocess
explosion). The v1.11 "continuity = fast non-apex" label was WRONG — `check-phase-93.mjs`
(chain [48..92]) AND `check-phase-95.mjs` (chain [48..94]) BOTH cascade → BOTH counts come
from Linux GHA sole-authoritatively. Only genuine LEAF validators run on Windows Axis-1.

| # | Validator | Role | Windows Axis-1 | Linux Axis-2 | Expected P/F/S | Authority |
|---|-----------|------|----------------|--------------|----------------|-----------|
| 1 | `scripts/validation/v1.12-milestone-audit.mjs` | leaf (C1-C16; `--self-test` folded) | **YES** | YES | `15/0/0` | cross-OS EXACT MATCH |
| 2 | `scripts/validation/check-phase-94.mjs` | leaf (PRESENCE+SELF+CONTENT) | **YES** | YES | `7/0/0` | cross-OS EXACT MATCH |
| 3 | `scripts/validation/check-phase-93.mjs` | chain [48..92] | **NO** (cascades) | YES | `~47/0/1` | **Linux sole-authoritative** |
| 4 | `scripts/validation/check-phase-95.mjs` | chain-apex [48..94] | **NO** (cascades) | YES | capture at audit | **Linux sole-authoritative** |

**Explicitly excluded (with reasons):**
- `pin-helper-advisory` — CI-only advisory job (`continue-on-error: true`)
- `rotting-external-quarterly` — cron-only; SKIPs on `workflow_dispatch` = negative control
- Harness `--self-test` — folded into row 1
- Inherited chain check-phase-48..92.mjs — covered transitively by apex 95

---

## 8. CHAIN Constants for check-phase-95.mjs (Plan 95-02 apex)

**Path-A source:** `scripts/validation/check-phase-93.mjs`

```javascript
// Phase 95 chain-apex extends the chain through Phase 94 (every integer 48..94).
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94];
// 47 phases (48..94 inclusive); v1.11 had 45 (48..92); adds 93 and 94
const CHAIN_SKIP   = new Set([]);  // EMPTY — permanent post-Phase-68 7b635ca invariant
```

**D-01 APEX CORRECTION (recorded here, patched at close-gate):**
The ROADMAP SC#2 and STATE.md dep-summary currently say `[48..93]` (46 entries). This is an
off-by-one. The correct value is **`[48..94]` (47 entries)** per the `[48..N-1]` invariant:
- v1.9 apex-82 = [48..81]; v1.10 apex-88 = [48..87]; v1.11 apex-93 = [48..92].
- Each milestone's apex includes that milestone's own content phase(s).
- `[48..93]` would make v1.12 the FIRST milestone to drop its content phase (94) from its apex.
- Decisive: check-phase-94 carries `V-94-CONTENT-*` MIGV needles — the only recurring CI net.
- STATE.md:173 already flags `[48..93]` as unconfirmed ("confirm chain-apex count").
- **Close-gate (Plan 95-04) patches:** ROADMAP SC#2, STATE.md dep-summary + pending-todo
  (line 173), REQUIREMENTS HARN-02 (apex range), REQUIREMENTS HARN-03 (depth reference).

- **V-95-SELF** asserts `!CHAIN_PHASES.includes(95)` AND `CHAIN_SKIP.size === 0` (dual-invariant guard).
- `HARNESS` const repoints to `v1.12-milestone-audit.mjs`.
- Expected apex check count: **~49 PASS** (47 CHAIN + AUDIT + AUDIT-HARNESS + SELF ± SKIP on VERIFICATION.md).

---

## 9. Coexistence Count (Plan 95-02 — `audit-harness-v1.12-integrity.yml`)

`audit-harness-v1.12-integrity.yml` is the **9th coexistence file**.

Existing 8 files (frozen, byte-unchanged predecessors):
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base — v1.4.1 shares this file)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`
7. `.github/workflows/audit-harness-v1.10-integrity.yml`
8. `.github/workflows/audit-harness-v1.11-integrity.yml`

**2 net-new per-validator jobs:** check-phase-94 and check-phase-95 (replacing the v1.11
check-phase-89..93 set of 5 jobs). The `linux-chain-ubuntu-latest` job runs the apex
`check-phase-95.mjs`. Workflow `name:` → `Audit Harness v1.12 Integrity`; header says
"9th coexistence workflow".

---

## 10. D-04 / SD-1 Plan/Commit Layout + HARD Ordering Gates

**5 commits across 4 plans:**

```
Plan 95-01 (this plan): 2 commits
  Wave 1: 95-CONVENTIONS.md (this file) — docs(95-01) — ALONE
          docs(95-01): 95-CONVENTIONS.md — Phase 95 constants lock
  Atom 1: HARN-01 — INDIVISIBLE (3 files) — feat(95-01)
          v1.12-milestone-audit.mjs (Path-A from v1.11, C1-C16 verbatim, self-test preserved)
          + v1.12-audit-allowlist.json (c13 reset for v1.12; quarterly_audit carried)
          + BASELINE_16 freshness comment in regenerate-supervision-pins.mjs
          feat(95-01): v1.12 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)

Plan 95-02: ATOM 2 (HARN-02) — INDIVISIBLE (4 files) — feat(95-02)
            check-phase-94.mjs (PRESENCE+SELF+5×V-94-CONTENT-* — D-02)
            + check-phase-95.mjs (chain-apex CHAIN_PHASES=[48..94]; V-95-SELF dual-invariant)
            + _lib/frozen-at-close.mjs V111 = 919b23b entry + readAtV111Close export
            + audit-harness-v1.12-integrity.yml (9th coexistence)
            feat(95-02): v1.12 validators + V111 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)
  *** MUST be committed AND pushed to origin/master before Plan 95-03 (D-03 ordering gate) ***

Plan 95-03: 3-axis re-audit (HARN-03) — artifact-only — docs(95-03)
            95-03-AUDIT-RESULTS.md (Axis 1 fresh-clone [leaf rows only] + Axis 2 Linux GHA
            [chain rows sole-authoritative] + Axis 3 same fresh sub-agent;
            cross-OS EXACT MATCH for leaf rows per D-03)
            docs(95-03): HARN-03 3-axis terminal re-audit results (artifact-only)

Plan 95-04: close-gate — SINGLE commit, NO Commit A — docs(95-04)
            v1.12-MILESTONE-AUDIT.md (NEW .planning/milestones/)
            + v1.12-DEFERRED-CLEANUP.md (NEW .planning/milestones/)
            + 95-VERIFICATION.md (NEW phase dir)
            + 4-doc traceability flip (PROJECT/ROADMAP/STATE/REQUIREMENTS — 6/6 Validated)
            + D-01 apex [48..93]→[48..94] correction patches in ROADMAP/STATE/REQUIREMENTS
            docs(95-04): Phase 95 close-gate — v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.12 MILESTONE CLOSE
```

**Total commits:** 5. Atom 1 = exactly 3 files/1 SHA; Atom 2 = exactly 4 files/1 SHA — both
independently revertable. (Rejected Option B "compress to 3-plan": breaks re-audit/close-gate
revert-isolation and the D-03→D-04 push-ordering gate.)

**HARD ordering gate (Plan 95-02→95-03):** Plan 95-03 Axis-2 GHA dispatch runs ONLY AFTER Plan
95-02 (Atom 2) is committed **AND pushed to `origin/master`** — else the workflow's check-phase-94/95
jobs FAIL (`cannot find module`), not skip.

**ATOM 1 INDIVISIBILITY (ROADMAP SC#1):** never split the 3 Atom-1 files across commits.
`95-CONVENTIONS.md` is a SEPARATE earlier commit and is NOT part of Atom 1.

---

## 11. The 5 V-94-CONTENT Needles (Plan 95-02 — check-phase-94.mjs, D-02)

**File:** `docs/macos-lifecycle/02-mdm-migration-psso.md` (pre-existing v1.11 file patched by Phase 94)

All 5 needles VERIFIED PRESENT (grep-counts from 95-RESEARCH.md Verification Target 4 +
94-VERIFICATION.md cross-confirmation — case-sensitive verbatim):

| Needle ID | Needle String | grep-c count | Guards |
|-----------|---------------|--------------|--------|
| `V-94-CONTENT-URLS-IRU` | `support.iru.io` | **5** | MIGV-02 both-URLs lock |
| `V-94-CONTENT-URLS-KANDJI` | `support.kandji.io` | **6** | MIGV-02 anchor URL + searchability |
| `V-94-CONTENT-DOCS-IRU` | `docs.iru.com` | **6** | MIGV-02 confirmed delete-path source |
| `V-94-CONTENT-MIGV03` | `Supervision status (MEDIUM confidence)` | **1** | MIGV-03 never-flat-assertion lock |
| `V-94-CONTENT-MIGV01` | `learn.microsoft.com` | **1** | MIGV-01 full-confidence-requires-citation |

**CRITICAL — needle casing is case-sensitive:** Use `Supervision status (MEDIUM confidence)`
with capital S, lowercase "status". CRLF-normalizing read + forward-slash substring `includes()`.

**Needle design rules (LOCKED D-02):** Assert only rot-stable invariants (brand/URL/domain
presence, MEDIUM-confidence framing). EXCLUDE: exact dates, exact MS-Learn sentences/URL paths,
HTTP-200 strings, negative `!includes()` needles.

**Expected PASS count for check-phase-94:** **7 PASS / 0 FAIL / 0 SKIP** on both platforms
(V-94-PRESENCE + 5 × V-94-CONTENT-* + V-94-SELF).

---

## 12. D-01 Apex Correction: Close-Gate Patch Text (Plan 95-04)

The following text in ROADMAP SC#2 and STATE.md must be patched at close-gate (Plan 95-04).
Source text in 95-RESEARCH.md "ROADMAP/STATE/REQUIREMENTS D-01 Apex Correction" section.

**ROADMAP.md** (Phase 95 SC#2): `CHAIN_PHASES=[48..93]`, `chain-apex CHAIN_PHASES=[48..93]`
→ `CHAIN_PHASES=[48..94]` (47 entries)

**STATE.md** Phase 95 dep-summary: `chain-apex CHAIN_PHASES=[48..93], CHAIN_SKIP=new Set([])`
→ `CHAIN_PHASES=[48..94]`

**STATE.md** Pending Todos (line 173): `confirm chain-apex count CHAIN_PHASES=[48..93] (46 entries)`
→ Remove or mark resolved: `CHAIN_PHASES=[48..94] (47 entries) — CONFIRMED per D-01`

**REQUIREMENTS.md** HARN-02: `chain-apex CHAIN_PHASES=[48..93]`
→ `CHAIN_PHASES=[48..94]` (47 entries)

**REQUIREMENTS.md** HARN-03: `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 at depth [48..93]`
→ `at depth [48..94]`

---

## 13. 26 Predecessor Frozen Surfaces (Byte-Unchanged Invariant)

These 26 surfaces MUST remain byte-unchanged from `ddf1355` (pre-Phase-95 anchor) through all
Phase 95 commits. Phase 95 adds v1.11 surfaces (v1.11 workflow + v1.11 harness + v1.11 sidecar)
to the predecessor list vs Phase 93's 23-surface list.

**NOT in the invariant:** chain validators `check-phase-{48..94}.mjs` (CONTEXT.md canonical refs).

**8 Workflow YAMLs (v1.4–v1.11):**
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`
7. `.github/workflows/audit-harness-v1.10-integrity.yml`
8. `.github/workflows/audit-harness-v1.11-integrity.yml` ← NEW to frozen list this phase

**9 Milestone-Audit MJS (v1.4–v1.11):**
9. `scripts/validation/v1.4-milestone-audit.mjs`
10. `scripts/validation/v1.4.1-milestone-audit.mjs`
11. `scripts/validation/v1.5-milestone-audit.mjs`
12. `scripts/validation/v1.6-milestone-audit.mjs`
13. `scripts/validation/v1.7-milestone-audit.mjs`
14. `scripts/validation/v1.8-milestone-audit.mjs`
15. `scripts/validation/v1.9-milestone-audit.mjs`
16. `scripts/validation/v1.10-milestone-audit.mjs`
17. `scripts/validation/v1.11-milestone-audit.mjs` ← NEW to frozen list this phase

**9 Sidecar JSON (v1.4–v1.11):**
18. `scripts/validation/v1.4-audit-allowlist.json`
19. `scripts/validation/v1.4.1-audit-allowlist.json`
20. `scripts/validation/v1.5-audit-allowlist.json`
21. `scripts/validation/v1.6-audit-allowlist.json`
22. `scripts/validation/v1.7-audit-allowlist.json`
23. `scripts/validation/v1.8-audit-allowlist.json`
24. `scripts/validation/v1.9-audit-allowlist.json`
25. `scripts/validation/v1.10-audit-allowlist.json`
26. `scripts/validation/v1.11-audit-allowlist.json` ← NEW to frozen list this phase

**Gate command** (run before the close-gate commit):
```bash
git diff ddf1355 HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  '.github/workflows/audit-harness-v1.6-integrity.yml' \
  '.github/workflows/audit-harness-v1.7-integrity.yml' \
  '.github/workflows/audit-harness-v1.8-integrity.yml' \
  '.github/workflows/audit-harness-v1.9-integrity.yml' \
  '.github/workflows/audit-harness-v1.10-integrity.yml' \
  '.github/workflows/audit-harness-v1.11-integrity.yml' \
  'scripts/validation/v1.4-milestone-audit.mjs' \
  'scripts/validation/v1.4.1-milestone-audit.mjs' \
  'scripts/validation/v1.5-milestone-audit.mjs' \
  'scripts/validation/v1.6-milestone-audit.mjs' \
  'scripts/validation/v1.7-milestone-audit.mjs' \
  'scripts/validation/v1.8-milestone-audit.mjs' \
  'scripts/validation/v1.9-milestone-audit.mjs' \
  'scripts/validation/v1.10-milestone-audit.mjs' \
  'scripts/validation/v1.11-milestone-audit.mjs' \
  'scripts/validation/v1.4-audit-allowlist.json' \
  'scripts/validation/v1.4.1-audit-allowlist.json' \
  'scripts/validation/v1.5-audit-allowlist.json' \
  'scripts/validation/v1.6-audit-allowlist.json' \
  'scripts/validation/v1.7-audit-allowlist.json' \
  'scripts/validation/v1.8-audit-allowlist.json' \
  'scripts/validation/v1.9-audit-allowlist.json' \
  'scripts/validation/v1.10-audit-allowlist.json' \
  'scripts/validation/v1.11-audit-allowlist.json'
```
→ Expected output: **EMPTY**. Non-empty output = STOP immediately.

---

## 14. Structural Constants Summary

| Constant | Value |
|----------|-------|
| self-test count | **9/9** (preserve verbatim; do NOT add tests) |
| milestone-audit default | **15 PASS / 0 FAIL / 0 SKIP** |
| C13 allowlist count | **15** (6 transient_external + 9 template_placeholder) |
| c16_missing_endpoint_exemptions | `[]` (empty) |
| apex CHAIN_PHASES | **[48..94]** (47 entries) — D-01 CORRECTED (NOT [48..93]) |
| apex CHAIN_SKIP | `new Set([])` |
| Atom 1 file count | **3 files** (milestone-audit + allowlist + BASELINE_16 comment) |
| Atom 2 file count | **4 files** (check-phase-94 + check-phase-95 + frozen-at-close + CI workflow) |
| close-gate file count | **7 files** |
| total commits (Phase 95) | **5** |
| coverage target | **6/6 Validated** (HARN-01/02/03 + MIGV-01/02/03) |
| phases close target | **4/4** |
| lineage label | `phases 62→66→70→74→82→88→93→95, lineage v1.4→v1.12 — 10th entry` |

---

## 15. Locked Commit-Message Strings (all 5 — DO NOT DEVIATE)

1. `docs(95-01): 95-CONVENTIONS.md — Phase 95 constants lock`
2. `feat(95-01): v1.12 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)`
3. `feat(95-02): v1.12 validators + V111 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)`
4. `docs(95-03): HARN-03 3-axis terminal re-audit results (artifact-only)`
5. `docs(95-04): Phase 95 close-gate — v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.12 MILESTONE CLOSE`

---

## 16. Close-Gate Placeholder + Recovery

**`close_commit: "{phase_95_close_SHA}"`** (literal placeholder in v1.12-MILESTONE-AUDIT.md
frontmatter — NO Commit A needed; recovery command):
```bash
git log --all --grep="95-04" --grep="close-gate" --all-match -1 --format=%H
```

---

## 17. DEFERRED-CLEANUP Ledger (SD-3 — Plan 95-04)

**DROP** (resolved by Phase 94 — recorded Closed in MILESTONE-AUDIT, not silently deleted):
- `INTUNE-PROFILE-ENROLLMENT-01` → MIGV-01 (Microsoft-Learn-cited full-confidence)
- `IRU-CONSOLE-DELETE-01` → MIGV-02 (both-URL + verified delete path)
- `SUPERVISION-STATUS-POST-MIGRATION-01` → MIGV-03 (MEDIUM-confidence callout + pilot)

**CARRY** verbatim (depth update where noted):
- `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` — depth **[48..92]→[48..94]** (D-01 correction)
- MTPSSO-01/02/03; KRBFUT-01/02; MIGFUT-01/02
- All v1.8 Part C: ARCHIVE-UPSTREAM-01, HELPER-SPAWN-STDERR-01, FROZEN-AWARE-ADOPTION-SWEEP-01,
  EXEC-FAIL-DETAIL-EXTRACTION-01, **CI-3 Managed-Apple-ID→Account rename** (byte-unchanged hazard),
  Multi-tenant Apple Business, Apple Business Device API, Per-OU CRD, Account-Holder-lockout, ASM

**ADD** (new from Phase-94 code-review CR-01):
- `GLOSSARY-IRU-URL-FRESHNESS-01` — `docs/_glossary-macos.md:~114` still asserts "support portal
  URL is unchanged: support.kandji.io," contradicting the 3-URL reality MIGV-02 established.
  A **corpus** follow-up for v1.12+, NOT a Phase-95 tooling-close edit.

---

## References

- `95-CONTEXT.md` §D-01 — check-phase-95 apex [48..94] (D-01 off-by-one correction)
- `95-CONTEXT.md` §D-02 — check-phase-94 shape (PRESENCE+SELF+5×V-94-CONTENT)
- `95-CONTEXT.md` §D-03 — 3-axis re-audit (4-row set; corrected OS split; both chains Linux-GHA)
- `95-CONTEXT.md` §D-04 — plan/commit layout + close-gate + DEFERRED-CLEANUP routing
- `95-RESEARCH.md` — verified Path-A edit sets + constants + 5 content needles + 26 frozen surfaces
- `95-PATTERNS.md` — analog excerpts + per-file transformation map
- `93-CONVENTIONS.md` — Path-A source for this document (Phase 93 v1.11 close twin)
