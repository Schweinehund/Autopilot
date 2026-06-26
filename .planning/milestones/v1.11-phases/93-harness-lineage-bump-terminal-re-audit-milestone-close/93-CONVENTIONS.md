---
phase: 93-harness-lineage-bump-terminal-re-audit-milestone-close
plan: 93-01
wave: 1
type: conventions
created: 2026-06-25
tags: [harness-lineage, v1.11-constants, milestone-close, freshness-routing]
---

# Phase 93 Wave-1 Conventions: Freshness/SHA Matrix + Locked-String Constants

## Purpose

Downstream plans 93-02, 93-03, and 93-04 **read this document** for all locked constants
before authoring. Plan authors make **zero re-derivation decisions** on the constants listed
here. This document absorbs the gray-area resolutions from `93-CONTEXT.md` (D-01..D-04) and
`93-RESEARCH.md` (Planner Handoff) into a reviewed artifact BEFORE Wave-2+ authoring begins.
Do NOT re-litigate; every constant here is source-of-truth.

Path-A source for this document: `88-CONVENTIONS.md` (Phase 88 v1.10 close twin, same phase name).

> v1.11 is **tooling-ONLY** — there is NO corpus rename and NO `docs/*` corpus edits. The
> Phase-88 §7 cross-OS set had 8 rows (v1.10 validators); v1.11 has 7 rows (see §7 below).
> V110 pin rides Atom 2 (deliberate divergence from v1.9/v1.10 where the frozen entry rode
> Atom 1); Atom 1 is therefore exactly 3 files (not 4). See CONTEXT.md D-02/D-04.

---

## 1. Authoring Date

**Authoring date:** `2026-06-25`

This is the Phase 93 authoring date. `docs/*` corpus edits are tooling-ONLY in this phase;
all v1.11 content was shipped in Phases 89–92 (no `last_verified:` frontmatter bumps in Phase 93).

---

## 2. V110 Frozen-Close SHA (Atom 2 — `_lib/frozen-at-close.mjs`)

**V110 SHA (short):** `a3617e9`  ← CLOSE-GATE SHA — the v1.10 single-commit close
**V110 SHA (full):** `a3617e911c3c111cf1e2b873f6b9a4cc238ab8d8`
**Commit:** `docs(88-04): Phase 88 close-gate — v1.10 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.10 MILESTONE CLOSE`
**Date:** 2026-06-24 (Phase 88 Plan 88-04)

**Why exactly ONE V110 entry (not V110 + V110_CLOSEGATE):**
- v1.10 closed in a SINGLE commit → atom == close-gate → a second `V110_CLOSEGATE` export
  would be dead/misleading (mirrors V19 rationale from 88-CONVENTIONS.md §2).
- `a3617e9` is the true close-gate commit (following `3888555`/`6315581`/`9a0a9a9`/`ae1ee45`
  are archive/jira chores, NOT part of the atom).

**DIVERGENCE from v1.9/v1.10:** V110 rides **ATOM 2** (per ROADMAP SC#2 + HARN-02; locked
D-02/D-04). In v1.9/v1.10 the frozen entry rode Atom 1. Still ordering-safe: `a3617e9` is
a known-PAST SHA and check-phase-93 reads only PRIOR-milestone closes.

**Locked rules (D-04):**
- **SINGLE `V110` entry** in `MILESTONE_CLOSE_SHAS` — NOT `V110` + `V110_CLOSEGATE`.
- Add convenience export `readAtV110Close = (p) => readAtClose('V110', p);` mirroring V19 shape.
- `a3617e9` is a **known-PAST SHA** → NO Commit A, NO placeholder substitution.
- **NO Commit A:** grep proof — `grep -rn "V110\|readAtV110\|readAtV111" scripts/validation/`
  returned EMPTY; check-phase-93 reads only PRIOR-milestone closes via `_lib/frozen-at-close.mjs`.

---

## 3. Pre-Phase-93 Anchor SHA

**Pre-Phase-93 anchor SHA:** `9ef5efb`
*(Recorded from research session — `docs(state): record phase 93 context session`. The
planning commits 93-CONTEXT/RESEARCH land as `4b25aeb`, `6aa734e`. Re-capture at close-gate
verification time for the byte-unchanged gate.)*

Use this anchor in:
- The `git diff <pre-93-anchor-SHA> HEAD -- <23 frozen surfaces>` predecessor byte-unchanged gate (§12)
- Cross-references in downstream plan verification steps

---

## 4. BASELINE_15 Anchor (Atom 1 — `regenerate-supervision-pins.mjs`)

**BASELINE_15 anchor SHA:** *(Captured at Atom-1 task time — `git rev-parse --short HEAD`
immediately AFTER COMMIT 1 — the 93-CONVENTIONS.md commit. That SHA is known-PAST when
Atom 1 commits.)*

The BASELINE_15 comment anchors to the PLAN 93-01 Wave-1 (93-CONVENTIONS.md) commit,
mirroring BASELINE_14's anchor to `2329791` (Phase 88 Wave-1 commit — 88-CONVENTIONS.md).

**Locked rules (HARN-01):**
- BASELINE_15 is a **comment-only** append AFTER the BASELINE_14 region (after line 445),
  immediately before `const BASELINE_9` (line 446). The array is **NOT touched**.
- Anchor to the **REAL known-PAST SHA** (COMMIT 1 SHA) — do NOT leave a `{placeholder}`
  in the committed file and do NOT anchor to the future Phase-93 close SHA.
- Resolution path: `BASELINE_16 will refresh at the next milestone close`.

---

## 5. Milestone-Audit 4-Line Load-Bearing Edit Set (Atom 1 — `v1.11-milestone-audit.mjs`)

**Path-A source:** `scripts/validation/v1.10-milestone-audit.mjs` (979 lines, C1-C16, self-test 9/9).
The v1.9→v1.10 hop changed **exactly 4 lines** (979→979 line count). The same 4 edits apply v1.10→v1.11:

| Line | v1.10 (change from) | v1.11 (change to) |
|------|---------------------|-------------------|
| **2** | `v1.10 … Path A copy of v1.9; lineage … → v1.9 → v1.10; C1-C16 inherited verbatim` | `v1.11 … Path A copy of v1.10; lineage … → v1.10 → v1.11; C1-C16 inherited verbatim` |
| **4** | `v1.10-audit-allowlist.json (v1.10 Path-A from v1.9 … per Phase 88 close-state)` | `v1.11-audit-allowlist.json (v1.11 Path-A from v1.10 … per Phase 93 close-state)` |
| **35** | `// Usage: node scripts/validation/v1.10-milestone-audit.mjs [--verbose] [--self-test]` | `…v1.11-milestone-audit.mjs…` |
| **79** | `const raw = readFile('scripts/validation/v1.10-audit-allowlist.json');` | `…v1.11-audit-allowlist.json` **(functional sidecar repoint — load-bearing; CI path-match greps this)** |

**DO NOT bump lines 5 / 90 (Path-A fidelity):**
- Line 5: `Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66 close`
  — **never bumped** in any prior lineage hop.
- Line 90: `appleBusinessDocPaths: … Apple Business v1.6 docs` — likewise never bumped.

**DO NOT add a C17 / 16th check (D-01 LOCKED):** the `checks` array stays exactly 15 entries.
Line count stays 979. Self-test block is byte-identical → 9/9 preserved.

---

## 6. Allowlist Invariants (Atom 1 — `v1.11-audit-allowlist.json`)

**Path-A source:** `scripts/validation/v1.10-audit-allowlist.json` (531 lines)

| Field | v1.11 Value | Source / Rule |
|-------|------------|---------------|
| `schema_version` | `1.1` (carried) | v1.10 sidecar |
| `generated` | `2026-06-25T00:00:00Z` | authoring date |
| `phase` | `93-harness-lineage-bump-terminal-re-audit-milestone-close` | long-slug form |
| `c13_broken_link_allowlist` entry count | **EXACTLY 15** (carry from v1.10) | C13 hard-asserts this count |
| `c16_missing_endpoint_exemptions` | `[]` empty (carried) | do NOT add entries |
| `c13_rotting_external` | **carried forward verbatim** (`ci_1`, `ci_2_vpp_location_token`, `ci_3`, `quarterly_audit`) | "do NOT wipe content" doctrine |
| `quarterly_audit.next_review` | `2027-01-01` (carry) | no validator asserts this value |

**DO NOT change (breaks C-checks):**
- `c13_broken_link_allowlist` count: exactly 6 `transient_external` + 9 `template_placeholder`.
- `c16_missing_endpoint_exemptions: []` — carry empty.

---

## 7. The 7-Validator Cross-OS-Applicable Set (Plan 93-03 Axis EXACT MATCH)

**EXACT set for Plan 93-03 HARN-03 Axis cross-OS PASS-count comparison (D-03 LOCKED = 7 rows):**

| # | Validator | Role | Expected PASS/FAIL/SKIP |
|---|-----------|------|-------------------------|
| 1 | `scripts/validation/v1.11-milestone-audit.mjs` | Harness (C1-C16; `--self-test` folded into this row) | `15/0/0` |
| 2 | `scripts/validation/check-phase-88.mjs` | Prior-apex continuity row | `42/0/1` (baseline) |
| 3 | `scripts/validation/check-phase-89.mjs` | Per-phase validator (net-new, non-apex) | `2/0/0` |
| 4 | `scripts/validation/check-phase-90.mjs` | Per-phase validator (net-new, non-apex) | `2/0/0` |
| 5 | `scripts/validation/check-phase-91.mjs` | Per-phase validator (net-new, non-apex) | `2/0/0` |
| 6 | `scripts/validation/check-phase-92.mjs` | Per-phase validator (8 CROSSLINK + 1 SELF) | `9/0/0` |
| 7 | `scripts/validation/check-phase-93.mjs` | Chain-apex; CHAIN_PHASES=[48..92] | Linux-GHA sole-authoritative ~`48/0/1` |

**D-03 MANDATORY mitigation (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 is WORSE at v1.11):**
- Apex [48..92] = 45 phases, +5 deeper than v1.10's [48..87] = 40 phases.
- Take authoritative apex PASS/FAIL/SKIP count from **Linux GHA ONLY** (sole-authoritative).
- Fresh clone (Axis 1) runs check-phase-88,89,90,91,92 standalone ONLY (fast, non-apex).
- Do NOT run check-phase-93.mjs from the fresh-clone on Windows.

**Explicitly excluded (with reasons):**
- `pin-helper-advisory` — CI-only advisory job (`continue-on-error: true`)
- `rotting-external-quarterly` — cron-only; SKIPs on `workflow_dispatch` = negative control
- Harness `--self-test` — folded into row 1
- Inherited chain check-phase-48..88.mjs — covered transitively by apex 93; listing 41+ = noise

---

## 8. CHAIN Constants for check-phase-93.mjs (Plan 93-02 apex)

**Path-A source:** `scripts/validation/check-phase-88.mjs`

```javascript
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92];
// 45 phases (48..92 inclusive); v1.10 had 40 (48..87); adds 88,89,90,91,92
const CHAIN_SKIP   = new Set([]);  // EMPTY — permanent post-Phase-68 7b635ca invariant
```

- **V-93-SELF** asserts `!CHAIN_PHASES.includes(93)` AND `CHAIN_SKIP.size === 0` (dual-invariant guard).
- `HARNESS` const repoints to `v1.11-milestone-audit.mjs`.
- Expected apex check count: **~48 PASS** (45 CHAIN + AUDIT + AUDIT-HARNESS + SELF ± SKIP on VERIFICATION.md).

---

## 9. Coexistence Count (Plan 93-02 — `audit-harness-v1.11-integrity.yml`)

`audit-harness-v1.11-integrity.yml` is the **8th coexistence file**.

Existing 7 files (frozen, byte-unchanged predecessors):
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base — v1.4.1 shares this file)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`
7. `.github/workflows/audit-harness-v1.10-integrity.yml`

**5 net-new per-validator jobs:** check-phase-89 through check-phase-93 (replacing the v1.10
83-88 set of 6 jobs). The `linux-chain-ubuntu-latest` job runs the apex `check-phase-93.mjs`.
Workflow `name:` → `Audit Harness v1.11 Integrity`; header says "8th coexistence workflow".

---

## 10. D-02 Plan/Commit Layout + HARD Ordering Gates

**5 commits across 4 plans:**

```
Plan 93-01 (this plan): 2 commits
  Wave 1: 93-CONVENTIONS.md (this file) — docs(93-01) — ALONE
          docs(93-01): 93-CONVENTIONS.md — Phase 93 constants lock
  Atom 1: HARN-01 — INDIVISIBLE (3 files) — feat(93-01)
          v1.11-milestone-audit.mjs (Path-A from v1.10, C1-C16 verbatim, self-test preserved)
          + v1.11-audit-allowlist.json (c13 reset for v1.11; quarterly_audit carried)
          + BASELINE_15 freshness comment in regenerate-supervision-pins.mjs
          feat(93-01): v1.11 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)

Plan 93-02: ATOM 2 (HARN-02) — INDIVISIBLE (7 files) — feat(93-02)
            check-phase-89..93.mjs (5 NET-NEW)
            + _lib/frozen-at-close.mjs V110 = a3617e9 entry + readAtV110Close export
            + audit-harness-v1.11-integrity.yml (8th coexistence)
            feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)
  *** MUST be committed AND pushed to origin/master before Plan 93-03 (D-03 ordering gate) ***

Plan 93-03: 3-axis re-audit (HARN-03) — artifact-only — docs(93-03)
            93-03-AUDIT-RESULTS.md (Axis 1 fresh-clone + Axis 2 Linux GHA + Axis 3 fresh sub-agent;
            cross-OS EXACT MATCH across the 7-validator set per D-03)
            docs(93-03): HARN-03 3-axis terminal re-audit results (artifact-only)

Plan 93-04: close-gate — SINGLE commit, NO Commit A — docs(93-04)
            v1.11-MILESTONE-AUDIT.md (NEW .planning/milestones/)
            + v1.11-DEFERRED-CLEANUP.md (NEW .planning/milestones/)
            + 93-VERIFICATION.md (NEW phase dir)
            + 4-doc traceability flip (PROJECT/ROADMAP/STATE/REQUIREMENTS — 15/15 Validated)
            docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE
```

**Total commits:** 5. Atom 1 = exactly 3 files/1 SHA; Atom 2 = exactly 7 files/1 SHA.

**HARD ordering gate (Plan 93-02→93-03):** Plan 93-03 Axis-2 GHA dispatch runs ONLY AFTER Plan
93-02 (Atom 2) is committed **AND pushed to `origin/master`** — else the workflow's check-phase-89..93
jobs FAIL (`cannot find module`), not skip.

**ATOM 1 INDIVISIBILITY (ROADMAP SC#1):** never split the 3 Atom-1 files across commits.
`93-CONVENTIONS.md` is a SEPARATE earlier commit and is NOT part of Atom 1.

---

## 11. Per-Phase Validator Deliverable Map (Plan 93-02 PRESENCE assertions)

| Phase | Primary deliverable file (PRESENCE target) |
|-------|---------------------------------------------|
| 89 | `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` |
| 90 | `docs/l2-runbooks/30-macos-mdm-migration-failure.md` |
| 91 | `docs/_glossary-macos.md` |
| 92 | V-92-CROSSLINK-E1..E8 (8 nav-edge needles) + V-92-SELF |
| 93 | V-93-AUDIT + V-93-AUDIT-HARNESS + CHAIN(48..92) + V-93-SELF |

**Transposed-digit guard (MANDATORY):** Each `check-phase-NN.mjs` SELF check must embed the
CORRECT phase number. Verify after writing each file:
```
node -e "const c=require('fs').readFileSync('scripts/validation/check-phase-NN.mjs','utf8'); console.log(c.match(/includes\((\d+)\)/)?.[1])"
```
Must print `NN` (not `88` or any other number).

**D-01 HARD CONSTRAINT:** check-phase-89/90/91 are LIGHTWEIGHT (PRESENCE + SELF only — 2 checks each).
check-phase-92 has 9 checks (8 CROSSLINK + 1 SELF). check-phase-93 is the chain-apex.

---

## 12. The 8 V-92-CROSSLINK Needles (confirmed against 92-VERIFICATION.md:52-63)

The harness is currently BLIND to all 8 Phase-92 nav-hub edges. check-phase-92 hard-asserts
these needles (CRLF-normalized file read, forward-slash substring `includes()`, NO allowlist/sidecar).
Source: `92-VERIFICATION.md:52-63` (all 8 grep-confirmed present in the committed nav-hub files).

| ID | file | needle (forward-slash substring) |
|----|------|----------------------------------|
| E1 | `docs/index.md` | `macos-lifecycle/01-psso-provisioning-walkthrough.md` |
| E2 | `docs/index.md` | `macos-lifecycle/02-mdm-migration-psso.md` |
| E3 | `docs/index.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E4 | `docs/common-issues.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E5 | `docs/common-issues.md` | `l2-runbooks/27-macos-sso-investigation.md` |
| E6 | `docs/quick-ref-l2.md` | `l2-runbooks/30-macos-mdm-migration-failure.md` |
| E7 | `docs/quick-ref-l2.md` | `#platform-sso-attestation-command` |
| E8 | `docs/decision-trees/06-macos-triage.md` | `../l2-runbooks/30-macos-mdm-migration-failure.md` |

**FORM:** `{id, file, needle}` array (mirrors check-phase-81.mjs `SSO_EDGES` form).
CRLF-normalized read + forward-slash substring `includes()` + NO allowlist = Windows-safe.

---

## 13. 23 Predecessor Frozen Surfaces (Byte-Unchanged Invariant)

These 23 surfaces MUST remain byte-unchanged from `9ef5efb` (pre-Phase-93 anchor) through all
Phase 93 commits. Phase 93 adds v1.10 surfaces (v1.10 workflow + v1.10 harness + v1.10 sidecar)
to the predecessor list vs Phase 88's 20-surface list.

**NOT in the invariant:** chain validators `check-phase-{48..92}.mjs` (CONTEXT.md:23,179).

**7 Workflow YAMLs:**
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`
7. `.github/workflows/audit-harness-v1.10-integrity.yml` ← NEW to frozen list this phase

**8 Milestone-Audit MJS:**
8. `scripts/validation/v1.4-milestone-audit.mjs`
9. `scripts/validation/v1.4.1-milestone-audit.mjs`
10. `scripts/validation/v1.5-milestone-audit.mjs`
11. `scripts/validation/v1.6-milestone-audit.mjs`
12. `scripts/validation/v1.7-milestone-audit.mjs`
13. `scripts/validation/v1.8-milestone-audit.mjs`
14. `scripts/validation/v1.9-milestone-audit.mjs`
15. `scripts/validation/v1.10-milestone-audit.mjs` ← NEW to frozen list this phase

**8 Sidecar JSON:**
16. `scripts/validation/v1.4-audit-allowlist.json`
17. `scripts/validation/v1.4.1-audit-allowlist.json`
18. `scripts/validation/v1.5-audit-allowlist.json`
19. `scripts/validation/v1.6-audit-allowlist.json`
20. `scripts/validation/v1.7-audit-allowlist.json`
21. `scripts/validation/v1.8-audit-allowlist.json`
22. `scripts/validation/v1.9-audit-allowlist.json`
23. `scripts/validation/v1.10-audit-allowlist.json` ← NEW to frozen list this phase

**Gate command** (run before the close-gate commit):
```bash
git diff 9ef5efb HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  '.github/workflows/audit-harness-v1.6-integrity.yml' \
  '.github/workflows/audit-harness-v1.7-integrity.yml' \
  '.github/workflows/audit-harness-v1.8-integrity.yml' \
  '.github/workflows/audit-harness-v1.9-integrity.yml' \
  '.github/workflows/audit-harness-v1.10-integrity.yml' \
  'scripts/validation/v1.4-milestone-audit.mjs' \
  'scripts/validation/v1.4.1-milestone-audit.mjs' \
  'scripts/validation/v1.5-milestone-audit.mjs' \
  'scripts/validation/v1.6-milestone-audit.mjs' \
  'scripts/validation/v1.7-milestone-audit.mjs' \
  'scripts/validation/v1.8-milestone-audit.mjs' \
  'scripts/validation/v1.9-milestone-audit.mjs' \
  'scripts/validation/v1.10-milestone-audit.mjs' \
  'scripts/validation/v1.4-audit-allowlist.json' \
  'scripts/validation/v1.4.1-audit-allowlist.json' \
  'scripts/validation/v1.5-audit-allowlist.json' \
  'scripts/validation/v1.6-audit-allowlist.json' \
  'scripts/validation/v1.7-audit-allowlist.json' \
  'scripts/validation/v1.8-audit-allowlist.json' \
  'scripts/validation/v1.9-audit-allowlist.json' \
  'scripts/validation/v1.10-audit-allowlist.json'
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
| apex CHAIN_PHASES | **[48..92]** (45 entries) |
| apex CHAIN_SKIP | `new Set([])` |
| Atom 1 file count | **3 files** (milestone-audit + allowlist + BASELINE_15 comment) |
| Atom 2 file count | **7 files** (check-phase-89..93 + frozen-at-close + CI workflow) |
| close-gate file count | **7 files** |
| total commits (Phase 93) | **5** |
| coverage target | **15/15 Validated** |
| phases close target | **5/5** |
| lineage label | `phases 62→66→70→74→82→88→93, lineage v1.4→v1.11 — 9th entry` |

---

## 15. Locked Commit-Message Strings (all 5 — DO NOT DEVIATE)

1. `docs(93-01): 93-CONVENTIONS.md — Phase 93 constants lock`
2. `feat(93-01): v1.11 harness-core Path-A — HARN-01 (atomic SC#1 Atom 1)`
3. `feat(93-02): v1.11 validators + V110 pin + CI surface — HARN-02 (atomic SC#1 Atom 2)`
4. `docs(93-03): HARN-03 3-axis terminal re-audit results (artifact-only)`
5. `docs(93-04): Phase 93 close-gate — v1.11 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.11 MILESTONE CLOSE`

---

## 16. Close-Gate Placeholder + Recovery

**`close_commit: "{phase_93_close_SHA}"`** (literal placeholder in v1.11-MILESTONE-AUDIT.md
frontmatter — NO Commit A needed; recovery command):
```bash
git log --all --grep="93-04" --grep="close-gate" --all-match -1 --format=%H
```

---

## References

- `93-CONTEXT.md` §D-01 — validator strategy (lightweight/apex/crosslink; NO C17)
- `93-CONTEXT.md` §D-02 — plan/commit layout (4-plan/5-commit; V110 in Atom 2)
- `93-CONTEXT.md` §D-03 — 3-axis re-audit (7-validator set; Linux-GHA-sole-authoritative apex)
- `93-CONTEXT.md` §D-04 — close-gate (single commit; NO Commit A; DEFERRED-CLEANUP routing)
- `93-RESEARCH.md` — verified Path-A edit sets + constants + 8 cross-link needles
- `93-PATTERNS.md` — analog excerpts + per-file transformation map
- `88-CONVENTIONS.md` — Path-A source for this document (Phase 88 v1.10 close twin)
