---
phase: 88-harness-lineage-bump-terminal-re-audit-milestone-close
plan: 88-01
wave: 1
type: conventions
created: 2026-06-24
tags: [harness-lineage, v1.10-constants, milestone-close, freshness-routing]
---

# Phase 88 Wave-1 Conventions: Freshness/SHA Matrix + Locked-String Constants

## Purpose

Downstream plans 88-02, 88-03, and 88-04 **read this document** for all locked constants
before authoring. Plan authors make **zero re-derivation decisions** on the constants listed
here. This document absorbs the gray-area resolutions from `88-CONTEXT.md` (D-01..D-07, CX-1,
CX-2) into a reviewed artifact BEFORE Wave-2+ authoring begins. Do NOT re-litigate; every
constant here is source-of-truth.

Path-A source for this document: `82-CONVENTIONS.md` (Phase 82 v1.9 close twin, same phase name).

> v1.10 is **tooling + content** — there is NO corpus rename (no VPP-01 twin). The Phase-82 §7
> "8 SSO-E edge needles" and corpus-rename-proof assertions have no v1.10 analog and are omitted.

---

## 1. Authoring Date

**Authoring date:** `2026-06-24`

This is the Phase 88 authoring date. `docs/*` corpus edits in this phase are harness-tooling
only; all v1.10 content was shipped in Phases 83–87 (no `last_verified:` frontmatter bumps
in Phase 88).

---

## 2. V19 Frozen-Close SHA (Atom 1 — `_lib/frozen-at-close.mjs`)

**V19 SHA (short):** `b29dca5`  ← CLOSE-GATE SHA — DO NOT USE e760176 or e825fdb (Atom SHAs)
**V19 SHA (full):** `b29dca5255c72c2ca4fd3d3924e0631089e88261`
**Commit:** `docs(82-04): Phase 82 close-gate — v1.9 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + v1.9 MILESTONE CLOSE`
**Date:** 2026-06-22 (Phase 82 Plan 82-04)

**Why NOT the Atom SHAs:**
- `e760176` = Atom 1 SHA (`feat(82-01): v1.9 harness-core Path-A — SSOHARN-01 + V18 pin`)
- `e825fdb` = Atom 2 SHA (`feat(82-02): v1.9 validators + CI surface — SSOHARN-02/03`)
- `b29dca5` = The TRUE close-gate (7 files: PROJECT + REQUIREMENTS + ROADMAP + STATE + v1.9-MILESTONE-AUDIT.md NEW + v1.9-DEFERRED-CLEANUP.md NEW + 82-VERIFICATION.md NEW)

**RETRO-02 lesson:** V17/V17_CLOSEGATE exist because V17 was originally pinned to aa6de68 (Atom-1 SHA),
not the true close-gate 4df3a16. This required a RETRO-02 supplement. For V19, the close-gate is
unambiguous: b29dca5 is THE close-gate commit. Pinning the wrong SHA incurs the same RETRO cost.

**Locked rules (CX-1):**

- **SINGLE `V19` entry** in `MILESTONE_CLOSE_SHAS` — NOT `V19` + `V19_CLOSEGATE`. v1.9 closed in
  ONE commit (atom == close-gate) → a second `V19_CLOSEGATE` export would be dead/misleading.
- Add convenience export `readAtV19Close = (p) => readAtClose('V19', p);` mirroring the V18 shape.
- `b29dca5` is a **known-PAST SHA** → NO Commit A, NO placeholder substitution.
- V19 is pinned in Atom 1 (which commits BEFORE Atom 2 in Plan 88-02) → "V19 pinned before any
  validator is authored" (CX-1 ordering constraint) is satisfied **structurally**.
- Do NOT pin V110 in Phase 88 — V110 is the NEXT milestone's concern.

---

## 3. Pre-Phase-88 Anchor SHA

**Pre-Phase-88 anchor SHA:** `c8f4cf6`
*(Captured at Task 1 execution time — `git rev-parse --short HEAD`. This is the live-tree SHA
immediately before any Phase 88 commit. Use as `<pre-88-anchor-SHA>` in the 20-surface diff gate.)*

Use this anchor in:
- The `git diff <pre-88-anchor-SHA> HEAD -- <20 frozen surfaces>` predecessor byte-unchanged gate (§8)
- Cross-references in downstream plan verification steps

---

## 4. BASELINE_14 Anchor (Atom 1 — `regenerate-supervision-pins.mjs`)

**BASELINE_14 anchor SHA:** `c8f4cf6` (same as pre-Phase-88 anchor; HEAD before Atom 1 commit)

*(Note: HEAD may advance between Wave-1 commit and Atom 1 commit; capture `git rev-parse --short HEAD`
immediately before staging the Atom 1 commit — use that value in the BASELINE_14 comment block.)*

**Locked rules (HARN-01):**

- BASELINE_14 is a **comment-only** append AFTER the BASELINE_13 region (after line 438),
  immediately before `const BASELINE_9` (line 439). The array is **NOT touched** — Phase 88 ships
  no Android-glossary line shifts (macOS SSO/Kerberos/Graph docs are out of `androidDocPaths()` scope).
- Anchor to the **REAL known-PAST SHA** — do NOT leave a `{placeholder}` in the committed file.
- Relabels from BASELINE_13: `BASELINE_13`→`BASELINE_14`, `Phase 82 Plan 82-01`→`Phase 88 Plan 88-01`,
  `closes BASELINE_12 v1.8 carry-over`→`closes BASELINE_13 v1.9 carry-over`, `SSOHARN-01`→`HARN-01`,
  `Phase 82 SC#1`→`Phase 88 SC#1`, `v1.9 corpus`→`v1.10 corpus`. Resolution path:
  `BASELINE_15 will refresh at the next milestone close`.

---

## 5. Milestone-Audit 4-Line Load-Bearing Edit Set (Atom 1 — `v1.10-milestone-audit.mjs`)

**Path-A source:** `scripts/validation/v1.9-milestone-audit.mjs` (979 lines, C1-C16, self-test 9/9).
The v1.8→v1.9 hop changed **exactly 4 lines** (979→979 line count). The same 4 edits apply v1.9→v1.10:

| Line | v1.9 (change from) | v1.10 (change to) |
|------|---------------------|-------------------|
| **2** | `v1.9 … Path A copy of v1.8; lineage … → v1.8 → v1.9; C1-C16 inherited verbatim` | `v1.10 … Path A copy of v1.9; lineage … → v1.8 → v1.9 → v1.10; C1-C16 inherited verbatim` |
| **4** | `v1.9-audit-allowlist.json (v1.9 Path-A from v1.8 … per Phase 82 close-state)` | `v1.10-audit-allowlist.json (v1.10 Path-A from v1.9 … per Phase 88 close-state)` |
| **35** | `// Usage: node scripts/validation/v1.9-milestone-audit.mjs [--verbose] [--self-test]` | `…v1.10-milestone-audit.mjs…` |
| **79** | `const raw = readFile('scripts/validation/v1.9-audit-allowlist.json');` | `…v1.10-audit-allowlist.json` **(functional sidecar repoint — load-bearing)** |

**DO NOT bump lines 5 / 90 (Path-A fidelity):**

- Line 5: `Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66
  close` — **never bumped** in any prior lineage hop (v1.7→v1.8→v1.9→v1.10 all leave it).
- Line 90: `appleBusinessDocPaths: … Apple Business v1.6 docs` — likewise never bumped.

**DO NOT add a C17 / 16th check (D-01):** the `checks` array stays exactly 15 entries
(ids 1-7, 9-16; there is NO C8 in the lineage). Line count stays 979. Self-test block is
byte-identical → 9/9 preserved.

---

## 6. Allowlist Invariants (Atom 1 — `v1.10-audit-allowlist.json`)

**Path-A source:** `scripts/validation/v1.9-audit-allowlist.json`

| Field | v1.10 Value | Source / Rule |
|-------|------------|---------------|
| `schema_version` | `1.1` (carried) | v1.9 sidecar |
| `generated` | `2026-06-24T00:00:00Z` | authoring date |
| `phase` | `88-harness-lineage-bump-terminal-re-audit-milestone-close` | long-slug form |
| `c13_broken_link_allowlist` entry count | **EXACTLY 15** (carry from v1.9) | C13 hard-asserts this count |
| `c16_missing_endpoint_exemptions` | `[]` empty (carried) | do NOT add entries |
| `c13_rotting_external` | **carried forward verbatim** (`ci_1`, `ci_2_vpp_location_token`, `ci_3`, `quarterly_audit`) | "do NOT wipe content" doctrine |
| `safetynet_exemptions` | 4 entries (carry) | carry unless new files trigger C1 |
| `supervision_exemptions` | 20 entries (carry) | carry unless new files trigger C2 |
| `quarterly_audit.next_review` | `2027-01-01` (optional cosmetic bump) | no validator asserts this value |

**v1.10 content-file additions that were pre-flight checked** (v1.9 harness already passes 15/15
at HEAD including these files — allowlist is expected to be a no-op copy):
- `docs/admin-setup-macos/10-kerberos-sso-extension.md` (Phase 83)
- `docs/admin-setup-macos/11-graph-api-platform-credential.md` (Phase 84)
- `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` (Phase 85)
- `docs/l2-runbooks/29-macos-graph-credential-investigation.md` (Phase 85)
- `docs/reference/macos-capability-matrix.md` (Kerberos rows — Phase 85)

---

## 7. The 8-Validator Cross-OS-Applicable Set (Plan 88-03 Axis EXACT MATCH)

**EXACT set for Plan 88-03 HARN-03 Axis cross-OS PASS-count comparison (D-03 LOCKED = 8 rows):**

| # | Validator | Role |
|---|-----------|------|
| 1 | `scripts/validation/v1.10-milestone-audit.mjs` | Harness (C1-C16; `--self-test` folded into this row) |
| 2 | `scripts/validation/check-phase-82.mjs` | Prior-apex continuity row (mirrors Phase 82 carrying check-phase-74) |
| 3 | `scripts/validation/check-phase-83.mjs` | Per-phase validator (net-new, non-apex) |
| 4 | `scripts/validation/check-phase-84.mjs` | Per-phase validator (net-new, non-apex) |
| 5 | `scripts/validation/check-phase-85.mjs` | Per-phase validator (net-new, non-apex) |
| 6 | `scripts/validation/check-phase-86.mjs` | Per-phase validator (net-new, non-apex) |
| 7 | `scripts/validation/check-phase-87.mjs` | Per-phase validator (net-new, non-apex) |
| 8 | `scripts/validation/check-phase-88.mjs` | Chain-apex; CHAIN_PHASES=[48..87]; WARM-TREE + Linux GHA (D-04) |

**D-04 MANDATORY mitigation (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 is WORSE at v1.10):**
- Apex [48..87] = 40 phases, +6 deeper than v1.9's [48..81] = 34 phases.
- Take authoritative apex PASS/FAIL/SKIP count from **WARM main tree + Linux GHA only**.
- Fresh clone (Axis 1) runs check-phase-83..87 standalone ONLY (fast, non-apex).
- Do NOT run check-phase-88.mjs from the fresh-clone on Windows.

**Explicitly excluded (with reasons):**
- `pin-helper-advisory` — CI-only advisory job (`continue-on-error: true`)
- `rotting-external-quarterly` — cron-only; SKIPs on `workflow_dispatch` = negative control
- Harness `--self-test` — folded into row 1
- Inherited chain check-phase-48..82.mjs — covered transitively by apex; listing 35+ = noise

---

## 8. CHAIN Constants for check-phase-88.mjs (Plan 88-02 apex)

**Path-A source:** `scripts/validation/check-phase-82.mjs`

```javascript
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87];
// 40 phases (48..87 inclusive); v1.9 had 34 (48..81); adds 82,83,84,85,86,87
const CHAIN_SKIP   = new Set([]);  // EMPTY — permanent post-Phase-68 7b635ca invariant
```

- **V-88-SELF** asserts `!CHAIN_PHASES.includes(88)` AND `CHAIN_SKIP.size === 0` (dual-invariant guard).
- **DIVERGENCE:** check-phase-82's `V-82-VPP-01a/b` corpus-rename assertions have NO v1.10 analog
  (no corpus rename) → **DROP them**. Apex = AUDIT + CHAIN(48..87) + AUDIT-HARNESS + SELF only.
- `HARNESS` const repoints to `v1.10-milestone-audit.mjs`.
- Expected apex check count: **43 PASS** (40 CHAIN + AUDIT + AUDIT-HARNESS + SELF).

---

## 9. Coexistence Count (Plan 88-02 — `audit-harness-v1.10-integrity.yml`)

`audit-harness-v1.10-integrity.yml` is the **7th coexistence file**.

Existing 6 files (frozen, byte-unchanged predecessors):
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base — v1.4.1 shares this file)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`

**6 net-new per-validator jobs:** check-phase-83 through check-phase-88 (replacing the v1.9 75-82 set
of 8 jobs). There is NO `negative-control` job — `rotting-external-quarterly`'s cron-gated SKIP is
the negative control. Do not author a new job.

---

## 10. D-02 Plan/Commit Layout + HARD Ordering Gate

**5 commits across 4 plans:**

```
Plan 88-01 (this plan): 2 commits
  Wave 1: 88-CONVENTIONS.md (this file) — docs(88-01) — ALONE
  Atom 1: HARN-01 — INDIVISIBLE — feat(88-01): v1.10 harness-core Path-A — HARN-01 + V19 pin (atomic SC#1 Atom 1)
          [v1.10-milestone-audit.mjs + v1.10-audit-allowlist.json
           + frozen-at-close.mjs V19 entry + BASELINE_14 comment] (4 files, ONE commit)
Plan 88-02: ATOM 2 (HARN-02) — INDIVISIBLE — feat(88-02): v1.10 validators + CI surface — HARN-02/03 (atomic SC#1 Atom 2)
            [check-phase-83..88.mjs + audit-harness-v1.10-integrity.yml] (7 files, ONE commit)
Plan 88-03: 3-axis re-audit (HARN-03) — artifact-only — docs(88-03)
Plan 88-04: close-gate — SINGLE commit, NO Commit A — docs(88-04)
```

**HARD ordering gate (CX-1):** V19 pin in frozen-at-close.mjs (Atom 1, Plan 88-01) MUST commit
BEFORE any check-phase-83.mjs is authored (Plan 88-02). This is the structural prerequisite.

**HARD ordering gate (Plan 88-02→88-03):** Plan 88-03 Axis-2 GHA dispatch runs ONLY AFTER Plan
88-02 (Atom 2) is committed **AND pushed to `origin/master`** — else the workflow's check-phase-83..88
jobs FAIL (`cannot find module`), not skip.

**ATOM 1 INDIVISIBILITY (ROADMAP SC#1):** never split the 4 Atom-1 files across commits.
`88-CONVENTIONS.md` is a SEPARATE earlier commit and is NOT part of Atom 1.

---

## 11. Per-Phase Validator Deliverable Map (Plan 88-02 PRESENCE assertions)

| Phase | Primary deliverable file | Banner description |
|-------|--------------------------|-------------------|
| 83 | `docs/admin-setup-macos/10-kerberos-sso-extension.md` | Phase 83 deliverables (Kerberos SSO Extension guide) |
| 84 | `docs/admin-setup-macos/11-graph-api-platform-credential.md` | Phase 84 deliverables (Graph API Platform Credential guide) |
| 85 | `docs/l2-runbooks/28-macos-kerberos-sso-investigation.md` | Phase 85 deliverables (L2 Kerberos SSO Investigation runbook) |
| 86 | confirm via 86-SUMMARY.md at task time | Phase 86 deliverables (chain-health pass) |
| 87 | `docs/index.md` (confirm via 87-SUMMARY.md) | Phase 87 deliverables (navigation hub) |

**Transposed-digit guard (MANDATORY):** Each `check-phase-NN.mjs` SELF check must embed the
CORRECT phase number. Verify after writing each file:
```
node -e "const c=require('fs').readFileSync('scripts/validation/check-phase-NN.mjs','utf8'); console.log(c.match(/includes\((\d+)\)/)?.[1])"
```
Must print `NN` (not `75` or any other number).

**D-01 HARD CONSTRAINT:** Validators are STRUCTURAL ONLY — NO content-coupling to v1.10 docs.
PRESENCE checks confirm file exists and is non-empty — nothing more.

---

## 12. 20 Predecessor Frozen Surfaces (Byte-Unchanged Invariant)

These 20 surfaces MUST remain byte-unchanged from `c8f4cf6` (pre-Phase-88 anchor) through all
Phase 88 commits. Phase 88 adds v1.9 surfaces (v1.9 workflow + v1.9 harness pair) to the
predecessor list vs Phase 82's 17-surface list.

**6 Workflow YAMLs:**
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`
6. `.github/workflows/audit-harness-v1.9-integrity.yml`

**7 Milestone-Audit MJS:**
7. `scripts/validation/v1.4-milestone-audit.mjs`
8. `scripts/validation/v1.4.1-milestone-audit.mjs`
9. `scripts/validation/v1.5-milestone-audit.mjs`
10. `scripts/validation/v1.6-milestone-audit.mjs`
11. `scripts/validation/v1.7-milestone-audit.mjs`
12. `scripts/validation/v1.8-milestone-audit.mjs`
13. `scripts/validation/v1.9-milestone-audit.mjs`

**7 Sidecar JSON:**
14. `scripts/validation/v1.4-audit-allowlist.json`
15. `scripts/validation/v1.4.1-audit-allowlist.json`
16. `scripts/validation/v1.5-audit-allowlist.json`
17. `scripts/validation/v1.6-audit-allowlist.json`
18. `scripts/validation/v1.7-audit-allowlist.json`
19. `scripts/validation/v1.8-audit-allowlist.json`
20. `scripts/validation/v1.9-audit-allowlist.json`

**Gate command** (run before the close-gate commit):
```bash
git diff c8f4cf6 HEAD -- \
  '.github/workflows/audit-harness-integrity.yml' \
  '.github/workflows/audit-harness-v1.5-integrity.yml' \
  '.github/workflows/audit-harness-v1.6-integrity.yml' \
  '.github/workflows/audit-harness-v1.7-integrity.yml' \
  '.github/workflows/audit-harness-v1.8-integrity.yml' \
  '.github/workflows/audit-harness-v1.9-integrity.yml' \
  'scripts/validation/v1.4-milestone-audit.mjs' \
  'scripts/validation/v1.4.1-milestone-audit.mjs' \
  'scripts/validation/v1.5-milestone-audit.mjs' \
  'scripts/validation/v1.6-milestone-audit.mjs' \
  'scripts/validation/v1.7-milestone-audit.mjs' \
  'scripts/validation/v1.8-milestone-audit.mjs' \
  'scripts/validation/v1.9-milestone-audit.mjs' \
  'scripts/validation/v1.4-audit-allowlist.json' \
  'scripts/validation/v1.4.1-audit-allowlist.json' \
  'scripts/validation/v1.5-audit-allowlist.json' \
  'scripts/validation/v1.6-audit-allowlist.json' \
  'scripts/validation/v1.7-audit-allowlist.json' \
  'scripts/validation/v1.8-audit-allowlist.json' \
  'scripts/validation/v1.9-audit-allowlist.json'
```
→ Expected output: **EMPTY**. Non-empty output = STOP immediately.

---

## References

- `88-CONTEXT.md` §D-01 — validator strategy (structural/self-referential ONLY)
- `88-CONTEXT.md` §D-02 — validator wording guardrail
- `88-CONTEXT.md` §D-03/D-04 — 3-axis re-audit + warm-tree mitigation
- `88-CONTEXT.md` §D-05 — close boundary (archival separate)
- `88-CONTEXT.md` §D-06/D-07 — deferred-cleanup scope
- `88-CONTEXT.md` §CX-1 — V19 = b29dca5 (LOCKED, VERIFIED)
- `88-RESEARCH.md` — verified Path-A edit sets + Atom mechanics + predecessor surface list
- `88-PATTERNS.md` — analog excerpts + drop-in pseudocode for all 13 files
- `82-CONVENTIONS.md` — Path-A source for this document (Phase 82 v1.9 close twin)
