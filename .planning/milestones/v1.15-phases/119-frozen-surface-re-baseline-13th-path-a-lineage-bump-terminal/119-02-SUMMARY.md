---
phase: 119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal
plan: 02
subsystem: milestone-close-harness
tags: [atom-1, path-a-lineage-bump, c17-fold, sidecar-repoint, baseline-19, jit-anchor, indivisible-commit]
requires:
  - "119-01 Wave-0 sidecar-repoint worklist (C2/C7/C9 shifted pins) + confirmed V114=7d922a7"
provides:
  - "v1.15-milestone-audit.mjs (13th Path-A harness, C1-C16 inherited + C17 folded via subprocess-spawn)"
  - "v1.15-audit-allowlist.json (sidecar repointed to Phase 119, C2/C7/C9 pins re-verified against live corpus)"
  - "BASELINE_19 freshness comment (JIT-anchored to a323332) in regenerate-supervision-pins.mjs"
  - "Atom-1 commit b530243 (SC1 indivisible; the corpus-wide lint surface for 119-04 re-audit)"
affects:
  - "119-03 (Atom 2 apex check-phase-119.mjs sets HARNESS = v1.15-milestone-audit.mjs)"
  - "119-04 (predecessor-byte-unchanged HARD gate: this Atom-1 commit is part of the surface it diffs)"
  - "119-05 (remediation slot: inherits the two DEFERRED items — C15 collision + supervision-pin --self-test RED)"
tech-stack:
  added: []
  patterns: [subprocess-spawn-c17-fold, back-anchor-invariant, jit-pre-atom-1-capture, sidecar-line-pin-reverify, indivisible-atom-commit]
key-files:
  created:
    - scripts/validation/v1.15-milestone-audit.mjs
    - scripts/validation/v1.15-audit-allowlist.json
    - .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/119-02-SUMMARY.md
    - .planning/phases/119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal/deferred-items.md
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs
decisions:
  - "Atom 1 = ONE indivisible commit b530243 of EXACTLY 3 files (git show --stat verified; no Atom-2 file leaked; no deletions) — SC1"
  - "C17 folded as check id 17 via execFileSync argument-array subprocess-spawn of c17-eee-contract.mjs; NOT an inline copy of the 13 assertions (avoids D1_MAP divergence)"
  - "BASELINE_19 back-anchored to JIT pre-Atom-1 HEAD a323332 (NOT Wave-0 c6ea8d2 — an intervening Jira-sync commit landed; Pitfall 4)"
  - "Sidecar C2/C7/C9 line-pins repointed against the LIVE corpus (not copied verbatim); non-Phase-1 glossary pins byte-unchanged; next_review advanced 2027-01-01 -> 2026-10-01"
  - "Two genuine EEE-retrofit-vs-live collisions (C15 abm-token.md:19; regenerate-supervision-pins --self-test) DEFERRED to the 119-05 remediation slot — both out of Atom-1's locked 3-file scope"
metrics:
  duration: ~40min
  completed: 2026-07-06
  tasks: 3
  files: 3
---

# Phase 119 Plan 02: Atom 1 — v1.15 Milestone Audit Harness (C1-C17) + Sidecar + BASELINE_19 Summary

Shipped Atom 1 of the 13th Path-A lineage bump as **one indivisible commit `b530243`** of exactly three files: the `v1.15-milestone-audit.mjs` harness (C1-C16 inherited verbatim from v1.14, C17 EEE-contract **folded in as check id 17 via `execFileSync` subprocess-spawn**), the repointed `v1.15-audit-allowlist.json` sidecar (C2/C7/C9 line-pins re-verified against the live post-Phase-118 corpus, not copied verbatim), and the additive `BASELINE_19` freshness comment (back-anchored to the **JIT pre-Atom-1 HEAD `a323332`**, not the Wave-0 anchor). Harness `--self-test` exits 0; `--verbose` improved from the v1.14 baseline's 11 PASS / 4 FAIL to **15 PASS / 1 FAIL** (the residual C15 is a deferred out-of-scope collision).

## Task 1 — v1.15-milestone-audit.mjs (Path-A copy + C17 fold)

- Copied `v1.14-milestone-audit.mjs` verbatim; C1-C16 bodies + the runner loop left byte-unchanged (no C5/C10 60d/90d freshness-threshold change this milestone — that would be a regression).
- Header repointed: lineage line now ends `→ v1.14 → v1.15`; Source-of-truth → 119-CONTEXT.md; Sidecar line → `v1.15-audit-allowlist.json`; C17 documented as FOLDED IN per Phase 119 D-119.
- **Honest-accounting:** the false "File reads only … no shell invocations" header claim was corrected to state that C17 spawns a subprocess.
- Added `import { execFileSync } from 'node:child_process'` + `import { execFailDetail } from './_lib/exec-fail-detail.mjs'`.
- Repointed the single `parseAllowlist()` sidecar-path literal (line 79) v1.14 → v1.15 (zero `v1.14-audit-allowlist.json` occurrences remain).
- Appended **check id 17** (`C17: EEE document contract`) — `execFileSync('node', [CONTRACT], { stdio:'pipe', timeout:300000, cwd:process.cwd() })` inside try/catch, pass on exit 0, `execFailDetail(...)` on non-zero. Argument-array form (the project's one process-level security control); **NOT** an inline copy of the 13 assertions / D1_MAP (explicitly rejected per RESEARCH Don't-Hand-Roll). Mirrors `check-phase-112.mjs`'s AUDIT-HARNESS spawn precedent.
- **Verify:** `--self-test` exits 0; `grep "id: 17"`, `grep "node:child_process"`, `execFileSync('node', [CONTRACT]` all match.

## Task 2 — v1.15-audit-allowlist.json (repoint + live-corpus pin re-verify)

- `phase` → `119-frozen-surface-re-baseline-13th-path-a-lineage-bump-terminal`; `generated` → 2026-07-06; zero `112-pillar-e` occurrences.
- **C2 supervision_exemptions** repointed (all verified against the live file; docs byte-unchanged c6ea8d2..HEAD):
  - `android-capability-matrix.md` 89/91/92/94/98/99 → **123/125/126/128/130/134/135** (6→7 pins; line **130** is a NEW pin for the Phase-118 RETRO-03 table-remediation prose-summary line).
  - `03-fully-managed-cobo.md` 36 → **52 + 54** (1→2); `20-android-app-install-investigation.md` 21 → **33**.
- **C7 c7_knox_allowlist** repointed: `07-knox-mobile-enrollment.md` 11/143/143/145 → **21/167/167/173**; `02-zero-touch-portal.md` 131 → **147**. (Glossary Knox pins untouched — non-Phase-1.)
- **C9 c9_exemptions** repointed: `03-fully-managed-cobo.md` 153 → **199**; `android-capability-matrix.md` 55 → **75**. (android-version-matrix + glossary COPE pins untouched — non-Phase-1.)
- **next_review** advanced `2027-01-01` → **2026-10-01** (per the 119-01 cadence flag: the old value skipped the 2026-07-01 and 2026-10-01 quarters; 2026-10-01 is the next unrun quarter after 2026-07-06).
- `c13_broken_link_allowlist` 15-entry count preserved (C13 count-asserts it). Valid JSON.
- **Result:** the three sidecar-pin FAILs (C2/C7/C9) all flipped to PASS; C17 folds in and PASSES (exits 0 on the full enrolled corpus). `--verbose` = 15 PASS / 1 FAIL.

## Task 3 — BASELINE_19 comment + Atom-1 indivisible commit

- Captured the JIT pre-Atom-1 anchor via `git rev-parse HEAD` immediately before authoring the commit: **`a323332`** — which **differs** from the Wave-0 anchor `c6ea8d2` because an automated Jira-milestone Stop-hook commit landed between Wave-0 and Atom 1 (exactly Pitfall 4; mirrors v1.14's `0a7699f`→`1a0ee15`).
- Appended a purely additive **BASELINE_19** paragraph (9 comment lines) after the BASELINE_18 block, before `const BASELINE_9 = [`, following the exact prose template of the 9 prior refreshes (references HARN-03, verified-against-HEAD a323332, BASELINE_20-refreshes-next-close resolution path).
- **Did NOT touch:** the `BASELINE_9` array (byte-unchanged) or the four `v1.7-audit-allowlist.json` self-test references (Pitfall 5 anti-pattern) — confirmed the diff is purely the 9 added comment lines.
- **Committed `b530243`** with explicit `git add` of exactly the 3 files (never `-A`/`.`): `git show --stat HEAD` = 3 files (regenerate-supervision-pins.mjs +9, v1.15-audit-allowlist.json +541, v1.15-milestone-audit.mjs +1010); **no** check-phase/frozen-at-close/`.yml` file present (D3 fold rejected); no file deletions.

## Deviations from Plan

### [Rule 3 — Blocking-issue recovery] Temp-extraction working-tree contamination (self-inflicted, fully recovered)

- **Found during:** Task 3 evidence-gathering. To prove the `regenerate-supervision-pins.mjs --self-test` failure pre-existed Phase 119, I extracted the corpus+script at SHA `7d922a7` into a temp dir via `git --work-tree=$TMP checkout 7d922a7 -- docs scripts`. Despite the `--work-tree` redirect, this reverted many tracked `docs/`+`scripts/` files in the real working tree to their v1.14-close versions (with LF/CRLF churn).
- **Fix:** `git checkout HEAD -- docs scripts` (targeted restore of tracked files to HEAD; main tree, `use_worktrees:false`). Verified 0 modified tracked files afterward; my 2 untracked v1.15 files and the (then-unedited) regenerate-supervision-pins.mjs were unaffected; harness re-verified green. The staged index was empty throughout, so the Atom-1 commit was never at risk of including reverted files.
- **Lesson:** the proof it was after was still valid (v1.14-close self-test EXIT=1). Prefer read-only proofs (`git show <sha>:<path>`) over work-tree checkouts on the main tree.

### [Deferred — out of Atom-1 scope] Two genuine EEE-retrofit-vs-live collisions → 119-05 remediation slot

Both logged to `deferred-items.md`. Neither is fixable inside Atom-1's SC1-locked 3-file commit without a forbidden action or a 4th file:

1. **C15 residual FAIL** — `docs/admin-setup-ios/02-abm-token.md:19` (Phase-117 EEE `## Summary` prose trips C15 regex #8, Intune-admin↔Apple-Business proximity). C15 has no sidecar mechanism; its only fixes (inline `<!-- ABAUDIT-## -->` or reword) edit a Phase-1 docs surface = a 4th file. `--self-test` (the Atom-1 gate) is unaffected — synthetic C15 tests pass. Same latent pattern at `04-configuration-profiles.md:19` / `06-compliance-policy.md:19`.
2. **`regenerate-supervision-pins.mjs --self-test` exits 1** — a frozen-fixture (`v1.7-audit-allowlist.json`) vs live-corpus classifier divergence. **Proven pre-existing:** extracting corpus+script at the v1.14-close SHA `7d922a7` and running `--self-test` there **also exits 1**; the divergence even includes non-Phase-1 glossary lines that shifted at Phase 62. The CI job is `pin-helper-advisory` (advisory). Editing `BASELINE_9` cannot make it green (it is subtracted from both diff sides — only swaps false-positive↔false-negative); editing the v1.7 fixture / relaxing the classifier are forbidden (Pitfall 5). The legitimate fix (make the classifier frozen-aware via `readAtClose`) is a predecessor-helper edit belonging to the D-119-3 slot.

## Requirements Note

Frontmatter tags HARN-03, but per D-119-4 / SC5 / the 119-01 precedent, requirements are **NOT** flipped to Validated here. All 16 v1.15 requirements flip in the **single close-gate commit** (Plan 119-08). Atom 1 only *contributes* the harness core.

## Self-Check: PASSED

- `scripts/validation/v1.15-milestone-audit.mjs` — FOUND (contains `id: 17`, `node:child_process`, `execFileSync('node', [CONTRACT]`; zero `v1.14-audit-allowlist.json`).
- `scripts/validation/v1.15-audit-allowlist.json` — FOUND (valid JSON; `119-frozen-surface-re-baseline` present; zero `112-pillar-e`; c13 = 15 entries).
- `scripts/validation/regenerate-supervision-pins.mjs` — MODIFIED (BASELINE_19 + HARN-03 + a323332 present; BASELINE_9 + v1.7 refs byte-unchanged; `node --check` OK).
- Commit `b530243` — FOUND on `master`; `git show --stat` = exactly 3 files; no Atom-2 leak; no deletions.
- Harness `--self-test` exits 0 (verified post-commit).
