---
phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close
plan: 01
subsystem: infra
tags: [audit-harness, git-forensics, frozen-at-close, validation, milestone-close]

# Dependency graph
requires:
  - phase: 127-automated-milestone-completion-trigger
    provides: HOOK-01 auto-trigger (publish-bundle-gate.cjs) shipped + verified
provides:
  - "Wave-0 pre-anchor SHA (f0e1f1632d708160cd7148f0ec91b0411fbee48d) — the predecessor-byte-unchanged HARD-gate base for 128-05"
  - "V116 positively confirmed = 3dd251249a812e31147cd653a7ad01e6878c091b (short 3dd2512) via dual-token recover-not-assume grep"
  - "D-128-C conversion set confirmed exhaustive: 8 files / 14 checks (check-phase-49/58/59/62/101/109/118/121)"
  - "HYG-02 diff-scope proven: single frontmatter-line deletion per file, all 5 files, no other drift"
  - "35-pin sidecar allowlist -1 line-shift worklist enumerated for Atom 1 (128-02)"
affects: [128-02, 128-03, 128-05]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "recover-not-assume: positively confirm candidate SHAs via dual-token git log --all --grep --all-match rather than trusting a CONTEXT.md candidate"
    - "plan-time full-chain scoping to eliminate two-round-remediation (v1.15 119-05 / v1.16 125-05 cautionary precedent)"

key-files:
  created:
    - .planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-01-SUMMARY.md
  modified: []

key-decisions:
  - "Did NOT mark HARN-08/09/10 complete in REQUIREMENTS.md — this Wave-0 plan is pure recon/scoping; the actual pin/lineage-bump/close-gate land in 128-02/128-03/.../close-gate plans"

patterns-established: []

requirements-completed: []  # Wave-0 recon plan — HARN-08/09/10 land in downstream Atom/close-gate plans, not here

# Metrics
duration: 12min
completed: 2026-07-11
---

# Phase 128 Plan 01: Wave-0 Anchor + V116 Recovery + D-128-C Full-Chain Scoping Summary

**Recon-only Wave-0 plan: captured the pre-anchor SHA, positively confirmed V116=3dd2512 via dual-token recover-not-assume grep, and exhaustively scoped the D-128-C 8-validator/14-check frozen-aware conversion set plus a previously-undiscovered 35-pin sidecar allowlist line-shift landmine — eliminating all remaining discovery for Atom 1 (128-02) and Atom 2 (128-03).**

## Performance

- **Duration:** 12 min
- **Started:** 2026-07-11T06:50:00Z
- **Completed:** 2026-07-11T07:02:00Z
- **Tasks:** 2 completed
- **Files modified:** 1 (this SUMMARY)

## Accomplishments

- Captured the Wave-0 pre-anchor SHA (base for the 128-05 predecessor-byte-unchanged HARD gate)
- Positively confirmed V116 = `3dd251249a812e31147cd653a7ad01e6878c091b` (short `3dd2512`) via the dual-token recovery command — did NOT trust the CONTEXT.md candidate without running it
- Confirmed `frozen-at-close.mjs` has NO `V116` entry yet (only the line-66 deferral comment) — the pin is this phase's HARN-08 deliverable, not yet landed
- Re-verified (independent of RESEARCH) the exhaustive D-128-C conversion set: exactly 8 validator files / 14 individual checks read one of the 5 HYG-02-touched files at live HEAD
- Confirmed via targeted grep that `check-phase-57.mjs` is correctly ruled OUT (string-literal cross-reference check only, never reads `android-capability-matrix.md`)
- Proved the HYG-02 diff-scope: `git diff 3dd2512..HEAD` over all 5 touched files shows exactly one frontmatter-line deletion per file, nothing else (Pitfall 3 insurance)
- Independently re-derived the 35-pin `v1.16-audit-allowlist.json` line enumeration via a JSON walk (not just re-reading RESEARCH's table) — exact match, including the duplicate `221` entry for `_glossary-android.md`
- Recorded the full `-1` line-shift worklist (old line → new line) per pin, ready for 128-02's `v1.17-audit-allowlist.json` authoring

## Task Commits

Each task was committed atomically:

1. **Task 1: Capture Wave-0 anchor + positively confirm V116=3dd2512** - (this commit, see below)
2. **Task 2: Full-chain D-128-C scoping + HYG-02 diff-scope + 35-pin worklist** - (this commit, see below)

**Plan metadata:** (final commit, docs: complete plan)

_Note: both tasks target the same single output file (128-01-SUMMARY.md — a recon plan has no code deliverable), so they land as two sequential docs commits building up this file's content._

## Files Created/Modified

- `.planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-01-SUMMARY.md` - this recorded-facts document

## Task 1 Findings: Wave-0 Anchor + V116 Positive Confirmation

### Wave-0 pre-anchor SHA

```
f0e1f1632d708160cd7148f0ec91b0411fbee48d
```

Captured via `git rev-parse HEAD` at the start of plan execution (before any harness/validator file in this phase is authored). This is the base the 128-05 predecessor-byte-unchanged HARD gate (`git diff <anchor>..HEAD` over frozen surfaces) will consume.

### V116 SHA — positively confirmed (recover-not-assume)

Command run exactly as CONTEXT.md/RESEARCH.md specify:

```bash
git log --all --grep="MILESTONE-AUDIT" --grep="MILESTONE CLOSE" --all-match -1 --format="%H %s"
```

Result:

```
3dd251249a812e31147cd653a7ad01e6878c091b docs(125-07): Phase 125 close-gate — v1.16 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + apex-range correction + v1.16 MILESTONE CLOSE
```

- **Full SHA:** `3dd251249a812e31147cd653a7ad01e6878c091b`
- **Short SHA (for the pin):** `3dd2512`
- **Subject:** `docs(125-07): Phase 125 close-gate — v1.16 MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability + apex-range correction + v1.16 MILESTONE CLOSE` — carries BOTH `MILESTONE-AUDIT` and `MILESTONE CLOSE`, matching the dual-token grep exactly.

This exactly matches CONTEXT.md's D-128-D candidate — POSITIVELY CONFIRMED via execution, not assumed.

### frozen-at-close.mjs current state (pre-Atom-2)

- `MILESTONE_CLOSE_SHAS` ends at `V115: '29a3599'` (line 62)
- `grep -c "V116" scripts/validation/_lib/frozen-at-close.mjs` returns `1` — but that single hit is the line-66 **deferral comment** ("...the V116 pin is deferred to v1.17 per..."), NOT an actual `V116:` entry. Confirmed via `grep -n "V116"`, single result at line 66.
- No `readAtV116Close` export exists yet.
- **Conclusion:** the V116 pin does not yet exist — it is this phase's Atom-2 (128-03) deliverable, as expected.

## Task 2 Findings: D-128-C Full-Chain Scoping + HYG-02 Diff-Scope + 35-Pin Worklist

### `phase_46_wave2_retrofit` key — confirmed asserted nowhere

```bash
grep -rl phase_46_wave2_retrofit scripts/validation/
```

Returns empty (exit 1 / no matches). No validator asserts the removed frontmatter key by name — grounding correction #3 independently re-confirmed.

### D-128-C conversion set — re-verified exhaustive (8 files / 14 checks)

Independently confirmed via `grep -rl` across the 5 HYG-02 filenames inside `scripts/validation/check-phase-*.mjs`, which returned **9** candidate files. `check-phase-57.mjs` was read and ruled OUT: it only asserts `docs/index.md`'s body text contains the literal string `"reference/android-capability-matrix.md"` — it never reads `android-capability-matrix.md`'s content. The remaining **8 files** all use a generic `read(abs) → fs.readFileSync(...)` helper (live-HEAD, not frozen) and none currently import `readAtV116Close` (confirmed — the helper doesn't exist yet):

| Validator | Check ID(s) | HYG-02 file read (live HEAD) |
|-----------|-------------|-------------------------------|
| `check-phase-49.mjs` | V-49-19, V-49-21 | `_glossary-android.md` |
| `check-phase-58.mjs` | V-58-13, 16, 17, 18, 19, 22 | `android-capability-matrix.md` |
| `check-phase-59.mjs` | V-59-05, V-59-36 | `_glossary-android.md` |
| `check-phase-62.mjs` | V-62-06..09 | `_glossary-android.md` |
| `check-phase-101.mjs` | V-101-BANNER | `_glossary-android.md` |
| `check-phase-109.mjs` | V-109-ROW-ANDROID | `android-capability-matrix.md` |
| `check-phase-118.mjs` | V-118-PRESENCE-MATRIX, ENROLL, REFORMAT, TABLE-REMEDIATION | `android-capability-matrix.md` |
| `check-phase-121.mjs` | V-121-VHROW | `_glossary-android.md` |

**Total: 8 validator files, 14 individual checks.** Spot-verified check-ID strings by grep against each file's own `name:`/comment text (V-49-19/21, V-121-VHROW, V-118-PRESENCE-MATRIX/ENROLL/REFORMAT/TABLE-REMEDIATION, V-109-ROW-ANDROID all confirmed present verbatim in their respective files).

**Files with ZERO check-phase-*.mjs readers** (confirmed, no conversion needed): `docs/admin-setup-android/03-fully-managed-cobo.md`, `docs/admin-setup-android/04-byod-work-profile.md`, `docs/android-lifecycle/03-android-version-matrix.md` — referenced only inside sidecar allowlist JSON files, never inside a `check-phase-*.mjs` `readFile()` call.

### HYG-02 diff-scope — proven single-line-per-file

```bash
git diff --stat 3dd2512..HEAD -- docs/_glossary-android.md docs/admin-setup-android/03-fully-managed-cobo.md docs/admin-setup-android/04-byod-work-profile.md docs/reference/android-capability-matrix.md docs/android-lifecycle/03-android-version-matrix.md
```

```
 docs/_glossary-android.md                           | 1 -
 docs/admin-setup-android/03-fully-managed-cobo.md   | 1 -
 docs/admin-setup-android/04-byod-work-profile.md    | 1 -
 docs/android-lifecycle/03-android-version-matrix.md | 1 -
 docs/reference/android-capability-matrix.md         | 1 -
 5 files changed, 5 deletions(-)
```

Full diff inspection (not just `--stat`) confirms the ONLY change in every file is the deletion of the single `phase_46_wave2_retrofit: 2026-04-25` frontmatter line (old line 11, immediately before the closing `---`) — no other drift since the V116 close-gate. Pitfall 3 insurance satisfied.

### 35-pin sidecar allowlist `-1` line-shift worklist (for 128-02 Atom 1)

Independently re-derived (JSON walk of `scripts/validation/v1.16-audit-allowlist.json`, not just re-reading RESEARCH's table) — **exact match** with RESEARCH's enumeration, including the duplicate `221` line entry for `_glossary-android.md`:

**`docs/_glossary-android.md` (21 pins):**

| Old line | New line (old-1) |
|----------|-------------------|
| 38 | 37 |
| 90 | 89 |
| 94 | 93 |
| 126 | 125 |
| 128 | 127 |
| 130 | 129 |
| 132 | 131 |
| 146 | 145 |
| 148 | 147 |
| 152 | 151 |
| 187 | 186 |
| 202 | 201 |
| 219 | 218 |
| 221 | 220 |
| 221 | 220 |
| 225 | 224 |
| 304 | 303 |
| 331 | 330 |
| 333 | 332 |
| 334 | 333 |
| 338 | 337 |

**`docs/reference/android-capability-matrix.md` (8 pins):**

| Old line | New line (old-1) |
|----------|-------------------|
| 75 | 74 |
| 123 | 122 |
| 125 | 124 |
| 126 | 125 |
| 128 | 127 |
| 130 | 129 |
| 134 | 133 |
| 135 | 134 |

**`docs/admin-setup-android/03-fully-managed-cobo.md` (3 pins):**

| Old line | New line (old-1) |
|----------|-------------------|
| 52 | 51 |
| 54 | 53 |
| 199 | 198 |

**`docs/android-lifecycle/03-android-version-matrix.md` (3 pins):**

| Old line | New line (old-1) |
|----------|-------------------|
| 58 | 57 |
| 102 | 101 |
| 104 | 103 |

**`docs/admin-setup-android/04-byod-work-profile.md` (0 pins):** no exact `{file,line}` pins in the sidecar for this file (its only sidecar reference is a `count`-based tracker, not line-pinned) — unaffected, copy verbatim.

**Total: 35 pins across 4 files**, each shifted `-1` from its pre-HYG-02 line. Each pin's `reason` field (safetynet_exemptions / supervision_exemptions / c7_knox_allowlist / c9_exemptions categories, per the JSON schema) is preserved unchanged in Atom 1 — only the `line` value shifts; content at the new line must be re-verified to still contain the expected banned-term occurrence per Pitfall 3 (128-02's job, not this plan's).

## Decisions Made

- **Did not mark HARN-08/09/10 requirements complete in REQUIREMENTS.md.** This is a Wave-0 recon-only plan — no pin, no harness file, no validator conversion actually lands here. All three requirements remain correctly `[ ]` Pending; they will flip at the appropriate downstream commits (V116 pin in 128-03 Atom 2, lineage bump across 128-02/128-03, close-gate flip in the final close-gate plan).
- Used direct `git`/JSON-walk verification throughout rather than trusting RESEARCH.md's tables blindly — every fact in this SUMMARY was independently re-derived this session (recover-not-assume applied consistently, not just to the V116 SHA).

## Deviations from Plan

None - plan executed exactly as written. Both tasks' acceptance criteria were met exactly as specified; no auto-fixes, no blocking issues, no architectural questions arose (this is a pure read-only recon plan).

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 128-02 (Atom 1: harness + allowlist + BASELINE_21) can author `v1.17-audit-allowlist.json` directly against the recorded 35-pin `-1`-shift worklist above with zero remaining discovery.
- 128-03 (Atom 2: V116 pin + validator conversions + CI workflow) can author the `V116: '3dd2512'` pin and convert exactly the 8 enumerated validators with zero remaining discovery.
- 128-05 (predecessor-byte-unchanged HARD gate) has its anchor SHA (`f0e1f1632d708160cd7148f0ec91b0411fbee48d`) recorded and ready to consume.
- No blockers or concerns for downstream plans.

---
*Phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-11*

## Self-Check: PASSED

- FOUND: `.planning/phases/128-v116-pin-15th-path-a-lineage-bump-terminal-close/128-01-SUMMARY.md`
- FOUND: commit `44b0ca6` in `git log --oneline --all`
- No unexpected file deletions in the commit
