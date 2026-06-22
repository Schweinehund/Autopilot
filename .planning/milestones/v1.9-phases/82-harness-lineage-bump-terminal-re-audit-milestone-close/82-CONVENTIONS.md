---
phase: 82-harness-lineage-bump-terminal-re-audit-milestone-close
plan: 82-01
wave: 1
type: conventions
created: 2026-06-22
tags: [freshness-routing, harness-lineage, v1.9-constants, sso-crosslink, milestone-close]
---

# Phase 82 Wave-1 Conventions: Freshness/SHA Matrix + Locked-String Constants

## Purpose

Downstream plans 82-02, 82-03, and 82-04 **read this document** for all locked constants
before authoring. Plan authors make **zero re-derivation decisions** on the constants listed
here. This document absorbs the gray-area resolutions from `82-CONTEXT.md` §D-01/D-02/D-03/D-04
(adversarial-review resolved) into a reviewed artifact BEFORE Wave-2+ authoring begins. Do NOT
re-litigate; every constant here is source-of-truth.

Path-A source for this document: `74-CONVENTIONS.md` (Phase 74 v1.8 Pillar D twin).

> v1.9 is **tooling-only** — there is NO corpus rename (no VPP-01 twin). The Phase-74 §2 "VPP-01
> Site Registry" and §7 "CI-2 VPP sidecar entries" sections have no v1.9 analog and are omitted.

---

## 1. Authoring Date

**Authoring date:** `2026-06-22`

This is the Phase 82 discussion/authoring date. No `docs/*` corpus edits in this phase → no
frontmatter `last_verified:` bumps anywhere (tooling-only milestone close).

---

## 2. V18 Frozen-Close SHA (Atom 1 — `_lib/frozen-at-close.mjs`)

**V18 SHA (short):** `2bd79d8`
**V18 SHA (full):** `2bd79d89440c6bd7b1f749dafcb29ed309e58295`
**Commit:** `docs(74-05): Phase 74 close-gate — v1.8 MILESTONE-AUDIT + DEFERRED-CLEANUP finalize + 4-doc traceability + v1.8 MILESTONE CLOSE`

**Locked rules (D-04):**

- **SINGLE `V18` entry** in `MILESTONE_CLOSE_SHAS` — NOT `V18` + `V18_CLOSEGATE`. The
  V17/V17_CLOSEGATE split existed ONLY because v1.7 closed in TWO commits. **v1.8 closed in ONE
  commit** (atom == close-gate) → a second `V18_CLOSEGATE` export would be dead/misleading.
- Add convenience export `readAtV18Close = (p) => readAtClose('V18', p);` mirroring the
  `readAtV17Close` / `readAtV17CloseGate` shape (lines 50-54 of `_lib/frozen-at-close.mjs`).
- `2bd79d8` is a **known-PAST SHA** → NO Commit A, NO placeholder substitution. The 7-char
  short SHA matches the V15/V16/V17 abbreviation style.
- V18 is pinned in Atom 1 (which commits BEFORE Atom 2 in Plan 82-02) → "V18 pinned before any
  validator is authored" (AP-5 prevention) is satisfied **structurally**.

---

## 3. BASELINE_13 Anchor (Atom 1 — `regenerate-supervision-pins.mjs`)

**BASELINE_13 anchor SHA:** `3007960` (pre-Phase-82 HEAD / Phase-81 close baseline)

**Locked rules (DIVERGENCE-4):**

- BASELINE_13 is a **comment-only** append AFTER the BASELINE_12 region (after line 431),
  mirroring the BASELINE_12 prose with relabels. The `const BASELINE_9` array (line 432+) is
  **NOT touched** — v1.9 ships no Android-glossary line shifts (macOS SSO docs are out of
  `androidDocPaths()` scope).
- Anchor to the **REAL known-PAST SHA `3007960`** — strictly better than repeating the literal
  `{atom_1_sha}` placeholder that BASELINE_12 left unfilled.
- Relabels: `BASELINE_12`→`BASELINE_13`, `Phase 74 Plan 74-02`→`Phase 82 Plan 82-01`,
  `closes BASELINE_11 v1.7`→`closes BASELINE_12 v1.8`, `HARNESS-09`→`SSOHARN-01`,
  `Phase 74 SC#1`→`Phase 82 SC#1`. Resolution path: `BASELINE_14 will refresh at the next
  milestone close`.

---

## 4. Milestone-Audit 4-Line Load-Bearing Edit Set (Atom 1 — `v1.9-milestone-audit.mjs`)

**Path-A source:** `scripts/validation/v1.8-milestone-audit.mjs` (979 lines, C1-C16, self-test 9/9).
The v1.7→v1.8 hop changed **exactly 4 lines** (979→979 line count). The same 4 edits apply v1.8→v1.9:

| Line | v1.8 (change from) | v1.9 (change to) |
|------|---------------------|-------------------|
| **2** | `v1.8 … Path A copy of v1.7; lineage … → v1.7 → v1.8; C1-C16 inherited verbatim` | `v1.9 … Path A copy of v1.8; lineage … → v1.8 → v1.9; C1-C16 inherited verbatim` |
| **4** | sidecar `v1.8-audit-allowlist.json (v1.8 Path-A from v1.7 … per Phase 74 VPP-01 close-state)` | `v1.9-audit-allowlist.json (v1.9 Path-A from v1.8 with c13_rotting_external reset for v1.9 per Phase 82 close-state)` |
| **35** | `// Usage: node scripts/validation/v1.8-milestone-audit.mjs [--verbose] [--self-test]` | `…v1.9-milestone-audit.mjs…` |
| **79** | `const raw = readFile('scripts/validation/v1.8-audit-allowlist.json');` | `…v1.9-audit-allowlist.json` **(functional sidecar repoint — load-bearing)** |

**DO NOT bump lines 5 / 90 (DIVERGENCE-1):**

- Line 5: `Frozen-predecessor reproducibility anchor: v1.6-milestone-audit.mjs pinned at Phase 66
  close` — **never bumped** in any prior lineage hop. Path-A fidelity = leave it.
- Line 90: `appleBusinessDocPaths: … Apple Business v1.6 docs` — likewise never bumped. Leave it.

**DO NOT add a C17 / 16th check (D-01 / Pitfall 2):** the `checks` array stays exactly 15 entries
(ids 1-7, 9-16; there is NO C8 in the lineage). The 8 SSO-E edges live in `check-phase-81.mjs`, NOT
a new global C-category. The self-test block (lines 813-940) is byte-identical → 9/9 preserved.

---

## 5. Allowlist Invariants (Atom 1 — `v1.9-audit-allowlist.json`)

**Path-A source:** `scripts/validation/v1.8-audit-allowlist.json` (531 lines).

| Field | v1.9 Value | Source / Rule |
|-------|------------|---------------|
| `schema_version` | `1.1` (carried) | v1.8 sidecar |
| `generated` | `2026-06-22T00:00:00Z` | authoring date |
| `phase` | `82-harness-lineage-bump-terminal-re-audit-milestone-close` | long-slug form |
| `c13_broken_link_allowlist` entry count | **EXACTLY 15** (6 transient_external + 9 template_placeholder) | C13 hard-asserts this count — do NOT add/remove |
| `c16_missing_endpoint_exemptions` | `[]` empty (carried) | also the D-01 model for "hard-assert, no sidecar" |
| `c13_rotting_external` | **carried forward verbatim** (ci_1: 4 entries; ci_2_vpp_location_token: 10 entries; ci_3; quarterly_audit) | DIVERGENCE-3: "c13 reset for v1.9" = label/timestamp refresh + carry-forward, NOT a content wipe |
| `quarterly_audit.next_review` | `2026-10-01` (optional cosmetic bump from `2026-07-01`) | no validator asserts this value |

---

## 6. The 10-Validator Cross-OS-Applicable Set (Plan 82-03 Axis-2 EXACT MATCH)

**EXACT set for Plan 82-03 SSOHARN-04 Axis-2 cross-OS PASS-count comparison (D-03 LOCKED = 10):**

| # | Validator | Role |
|---|-----------|------|
| 1 | `scripts/validation/v1.9-milestone-audit.mjs` | Harness (C1-C16; `--self-test` folded into this row) |
| 2 | `scripts/validation/check-phase-74.mjs` | Prior-apex continuity row (mirrors Phase 74 carrying check-phase-70) |
| 3 | `scripts/validation/check-phase-75.mjs` | Per-phase validator (net-new) |
| 4 | `scripts/validation/check-phase-76.mjs` | Per-phase validator (net-new) |
| 5 | `scripts/validation/check-phase-77.mjs` | Per-phase validator (net-new) |
| 6 | `scripts/validation/check-phase-78.mjs` | Per-phase validator (net-new) |
| 7 | `scripts/validation/check-phase-79.mjs` | Per-phase validator (net-new) |
| 8 | `scripts/validation/check-phase-80.mjs` | Per-phase validator (net-new) |
| 9 | `scripts/validation/check-phase-81.mjs` | Per-phase validator (net-new; carries V-81-CROSSLINK) |
| 10 | `scripts/validation/check-phase-82.mjs` | Per-phase validator (chain-apex; CHAIN_PHASES=[48..81]) |

**Explicitly excluded (with reasons):**

- `pin-helper-advisory` — CI-only advisory job (`continue-on-error: true`); not run locally.
- `rotting-external-quarterly` — cron-only; SKIPs on `workflow_dispatch` = the **negative control**.
- Harness `--self-test` — folded into row 1, not a standalone cross-OS row.
- Inherited chain `check-phase-48..73.mjs` — covered transitively by the apex; listing 26+ = noise.

**Cross-OS PASS-Count EXACT MATCH** required across all 10 validators (D-03). Windows-local vs
Linux-GHA per-validator PASS/FAIL/SKIP counts recorded side by side; any mismatch is a blocking gate.
FAIL=0 across the board. **WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 carries forward (WORSE at Phase 82**,
chain now [48..81], +8 deeper): take apex counts from warm-tree × Linux-GHA, NOT a cold-clone re-run.

---

## 7. The 8 SSO-E Edge Needles for V-81-CROSSLINK (Plan 82-02 — `check-phase-81.mjs`, D-01)

Copied verbatim from `82-RESEARCH.md` §Q3, confirmed against `81-CROSSLINK-CLOSURE.md`. Hard-assert
the **presence** (not count) of each forward-slash needle in its source file. CRLF-normalized read
(existing `readFile` `.replace(/\r\n/g,'\n')`), forward-slash substring → cross-OS-safe. **No
allowlist / sidecar entries** (mirrors C16's empty `c16_missing_endpoint_exemptions: []`).

| Edge | Source file (read this) | Needle substring to assert present |
|------|--------------------------|-------------------------------------|
| E1 | `docs/admin-setup-macos/07-platform-sso-setup.md` | `../_glossary-macos.md#platform-sso` |
| E2 | `docs/_glossary-macos.md` | `admin-setup-macos/07-platform-sso-setup.md` |
| E3 | `docs/admin-setup-macos/07-platform-sso-setup.md` | `../reference/macos-capability-matrix.md#authentication` |
| E4 | `docs/reference/macos-capability-matrix.md` | `../admin-setup-macos/07-platform-sso-setup.md` |
| E5 | `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` | `../l2-runbooks/27-macos-sso-investigation.md` |
| E6 | `docs/l2-runbooks/27-macos-sso-investigation.md` | `../l1-runbooks/35-macos-sso-sign-in-failure.md` |
| E7 | `docs/admin-setup-macos/03-configuration-profiles.md` | `07-platform-sso-setup.md` |
| E8 | `docs/macos-lifecycle/00-ade-lifecycle.md` | `../admin-setup-macos/07-platform-sso-setup.md` |

> E4 and E8 share the identical needle `../admin-setup-macos/07-platform-sso-setup.md` but live in
> different source files — per-file scoping keeps them unambiguous. E7's needle is a substring of
> the E1/E3 filename but its source file (`03-configuration-profiles.md`) is distinct.

---

## 8. CHAIN Constants for check-phase-82.mjs (Plan 82-02 apex)

**Path-A source:** `scripts/validation/check-phase-74.mjs`

```javascript
const CHAIN_PHASES = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81];
// 34 phases (48..81 inclusive)
const CHAIN_SKIP   = new Set([]);  // EMPTY — permanent post-Phase-68 7b635ca invariant
```

- **V-82-SELF** asserts `!CHAIN_PHASES.includes(82)` AND `CHAIN_SKIP.size === 0` (richer dual-invariant
  guard form from check-phase-71, preferred over check-phase-74's single `.includes()` check).
- **DIVERGENCE-2:** check-phase-74's `V-74-VPP-01a/b` corpus-rename assertions have NO v1.9 analog
  (no corpus rename) → **DROP them**. Apex = AUDIT + CHAIN(48..81) + AUDIT-HARNESS + SELF only.
- `HARNESS` const repoints to `v1.9-milestone-audit.mjs` (label "predecessor-byte-unchanged" → the
  v1.9 harness is NEW; adjust wording).

---

## 9. Coexistence Count (Plan 82-02 — `audit-harness-v1.9-integrity.yml`)

`audit-harness-v1.9-integrity.yml` is the **6th coexistence file**.

Existing 5 files (frozen, byte-unchanged):
1. `.github/workflows/audit-harness-integrity.yml` (v1.4 base — v1.4.1 shares this file)
2. `.github/workflows/audit-harness-v1.5-integrity.yml`
3. `.github/workflows/audit-harness-v1.6-integrity.yml`
4. `.github/workflows/audit-harness-v1.7-integrity.yml`
5. `.github/workflows/audit-harness-v1.8-integrity.yml`

**8 net-new per-validator jobs:** check-phase-75 through check-phase-82 (replacing the v1.8 71-74
set). **DIVERGENCE-5:** there is NO job literally named "negative-control" — it IS
`rotting-external-quarterly`'s cron-gated SKIP on `workflow_dispatch`. Do not author a new job.

---

## 10. D-02 Plan/Commit Layout + HARD Ordering Gate

**5 commits across 4 plans:**

```
Plan 82-01 (this plan): 2 commits
  Wave 1: 82-CONVENTIONS.md (this file) — docs(82-01) — ALONE
  Wave 2: ATOM 1 (SSOHARN-01) — INDIVISIBLE — feat(82-01): … atomic SC#1 Atom 1
          [v1.9-milestone-audit.mjs + v1.9-audit-allowlist.json
           + BASELINE_13 comment + V18 entry] (4 files, ONE commit)
Plan 82-02: ATOM 2 (SSOHARN-02 + 03) — INDIVISIBLE — feat(82-02): … atomic SC#1 Atom 2
Plan 82-03: 3-axis re-audit (SSOHARN-04) — artifact-only — docs(82-03)
Plan 82-04: close-gate (SSOHARN-04) — SINGLE commit, NO Commit A — docs(82-04)
```

**HARD ordering gate (D-03):** Plan 82-03 Axis-2 dispatch runs ONLY AFTER Plan 82-02 (Atom 2) is
committed **AND pushed to `origin/master`** — else the workflow's check-phase-75..82 jobs FAIL
(`cannot find module`), not skip.

**ATOM 1 INDIVISIBILITY (ROADMAP SC#1):** never split the 4 Atom-1 files across commits.
`82-CONVENTIONS.md` is a SEPARATE earlier commit and is NOT part of Atom 1.

---

## 11. Pre-Phase-82 Frozen Surfaces (Predecessor Byte-Unchanged Invariant)

**Pre-Phase-82 anchor SHA:** `3007960` (HEAD before any Phase 82 commit — `docs(state): record
phase 82 context session`). Use as `<pre-82-SHA>` in the close-gate byte-unchanged diff.

The following predecessor surfaces MUST remain byte-unchanged from `3007960` through all Phase 82
commits (chain validators `check-phase-{48..81}.mjs` are NOT in the invariant):

```
scripts/validation/v1.4-milestone-audit.mjs
scripts/validation/v1.4.1-milestone-audit.mjs
scripts/validation/v1.5-milestone-audit.mjs
scripts/validation/v1.6-milestone-audit.mjs
scripts/validation/v1.7-milestone-audit.mjs
scripts/validation/v1.8-milestone-audit.mjs
scripts/validation/v1.4-audit-allowlist.json
scripts/validation/v1.4.1-audit-allowlist.json
scripts/validation/v1.5-audit-allowlist.json
scripts/validation/v1.6-audit-allowlist.json
scripts/validation/v1.7-audit-allowlist.json
scripts/validation/v1.8-audit-allowlist.json
.github/workflows/audit-harness-integrity.yml
.github/workflows/audit-harness-v1.5-integrity.yml
.github/workflows/audit-harness-v1.6-integrity.yml
.github/workflows/audit-harness-v1.7-integrity.yml
.github/workflows/audit-harness-v1.8-integrity.yml
```

**Gate command** (run before the close-gate commit): `git diff 3007960 HEAD -- <surfaces above>`
→ Expected output: **EMPTY**.

**Close-gate literal-placeholder recovery (D-04):** the `{phase_82_close_SHA}` self-reference is
recoverable via `git log --all --grep="82-04" --grep="close-gate" --all-match -1 --format=%H`.

---

## References

- `82-CONTEXT.md` §D-01 — C17 decision (Option D; phase-scoped V-81 assertion, NO global C17)
- `82-CONTEXT.md` §D-02 — plan layout (Option B; 4-plan, 5-commit)
- `82-CONTEXT.md` §D-03 — 3-axis terminal re-audit (Option A; 10-validator cross-OS set)
- `82-CONTEXT.md` §D-04 — close-gate (Option A; single V18 entry, NO Commit A)
- `82-RESEARCH.md` §Q1-Q10 — verified Path-A edit sets + 6 divergences
- `82-PATTERNS.md` — analog excerpts + drop-in pseudocode
- `74-CONVENTIONS.md` — Path-A source for this document
- `81-CROSSLINK-CLOSURE.md` — the 8 SSO-E edge needles (E1-E8)
