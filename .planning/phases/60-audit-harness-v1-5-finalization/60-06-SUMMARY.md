---
phase: 60
plan: 06
subsystem: audit-harness-v1-5
tags: [audit, broken-links, anchor-fix, PITFALL-12, atomicity-contract]
requirements: [AUDIT-05]
dependency_graph:
  requires:
    - "Phase 48 baseline (48-VERIFICATION-broken-links.md rows 34-37)"
    - "Phase 48 D-14 atomicity-contract"
    - "Phase 59 commit a01ab1d precedent (sidecar pin-coord refresh in same commit as content edit)"
  provides:
    - "4 broken anchor/path refs resolved (Phase 48 baseline rows 34, 35, 36, 37)"
    - "PITFALL-12 atomic-commit precedent reinforced (3-file atomic bundle in 62f345b)"
    - "Sidecar v1.5-audit-allowlist.json pin coords refreshed for 6 entries (+2 line shift)"
    - "regenerate-supervision-pins.mjs BASELINE_9 entries 3-4 refreshed to 174/190"
  affects:
    - "Plan 09 atomic harness commit (no remaining pin-coord refresh dependencies)"
tech-stack:
  added: []
  patterns:
    - "D-08(b) HTML-shim mechanism: <a id=\"name\"></a> immediately above heading"
    - "Phase 48 D-14 atomic-commit (3-file bundle: content edit + sidecar refresh + BASELINE_9 refresh)"
    - "D-08(a) rewrite-ref mechanism (admin-template-ios.md + 10-aosp-zebra.md)"
key-files:
  created: []
  modified:
    - "docs/_glossary-android.md (2 HTML shims)"
    - "docs/_templates/admin-template-ios.md (rewrite-ref to ../admin-setup-ios/00-overview.md#portal-navigation-note)"
    - "docs/admin-setup-android/10-aosp-zebra.md (rewrite-ref [Scope and Status](#) -> (#scope-and-status))"
    - "scripts/validation/v1.5-audit-allowlist.json (6 pin-coord entries shifted +2)"
    - "scripts/validation/regenerate-supervision-pins.mjs (BASELINE_9 entries 3-4 shifted +2; refresh comment added)"
decisions:
  - "Adopted single-line shim pattern (no blank line between shim and H3) producing +2 shift instead of +4 — matches plan's 'CHOSEN approach' (interfaces block lines 84-97)"
  - "Chose rewrite-ref over add-shim for admin-template-ios.md:28 — target heading already exists at docs/admin-setup-ios/00-overview.md:74 with correct GFM slug; relative path needed parent-relative prefix"
  - "Chose rewrite-ref to #scope-and-status for 10-aosp-zebra.md bare # — H2 'Scope and Status' exists at line 20, and the link in What Breaks Summary table semantically intends to point at that section"
  - "10-aosp-zebra.md fix landed at line 175 (not baseline line 10) — file grew since Phase 48 baseline; the canonical broken target ('#') is matched regardless of line position"
  - "Auto-approved Task 3 checkpoint per AUTO_MODE active — no human intervention required since pin-shift diffs matched expected +2 mapping exactly"
metrics:
  duration: "~10 minutes"
  completed: "2026-05-06"
---

# Phase 60 Plan 06: Fix 4 Category-A Broken Anchor Refs (PITFALL-12 atomic) Summary

Fixed 4 of 51 Category A baseline broken-anchor findings (the only Category A entries
sitting in supervision/safetynet/c7-knox sidecar pinned territory) using D-08 HTML-shim
and rewrite-ref mechanisms; bundled the _glossary-android.md edit with sidecar pin-coord
refresh + BASELINE_9 refresh in a single atomic commit per Phase 48 D-14 atomicity-contract,
preserving Phase 49-59 V-NN-NN structural invariants and keeping the v1.5 milestone audit
harness GREEN throughout.

## Tasks Completed

| Task | Name                                                                                                          | Status     | Commit  |
|------|---------------------------------------------------------------------------------------------------------------|------------|---------|
| 1    | Run pre-edit pin-report; capture baseline pin coords                                                          | Complete   | (none — transient artifact) |
| 2    | Atomic commit: _glossary-android.md (#kme + #kpe shims) + sidecar pin refresh + BASELINE_9 refresh           | Complete   | 62f345b |
| 3    | PITFALL-12 atomic-commit verification gate (auto-approved per AUTO_MODE)                                      | Complete   | (checkpoint — no commit) |
| 4a   | Fix admin-template-ios.md:28 broken anchor (chose: rewrite to ../admin-setup-ios/00-overview.md#portal-navigation-note) | Complete | 17e3aab |
| 4b   | Fix 10-aosp-zebra.md bare-# fragment (chose: rewrite to #scope-and-status)                                    | Complete   | b080729 |
| 4c   | Cleanup pin-baseline artifact                                                                                 | Complete   | 5576b0d |

## Key Outcomes

### 4 Broken Anchor/Path Refs Resolved

1. **`docs/_glossary-android.md:16` -> `#kme`** — added `<a id="kme"></a>` shim above
   `### KME (Knox Mobile Enrollment)` heading (commit 62f345b).
2. **`docs/_glossary-android.md:16` -> `#kpe`** — added `<a id="kpe"></a>` shim above
   `### KPE (Knox Platform for Enterprise)` heading (commit 62f345b).
3. **`docs/_templates/admin-template-ios.md:28` -> `00-overview.md#portal-navigation-note`** —
   rewrote to `../admin-setup-ios/00-overview.md#portal-navigation-note` since the H2
   "## Portal Navigation Note" exists at that target file's line 74 (commit 17e3aab).
4. **`docs/admin-setup-android/10-aosp-zebra.md` -> `#`** — rewrote bare `#` to
   `#scope-and-status` since the H2 `## Scope and Status` exists at line 20 (commit b080729).
   Note: the bare `#` was at the file's current line 175 (not baseline line 10) — the file
   grew since Phase 48 baseline, but the canonical broken target literal `#` is unambiguous.

### PITFALL-12 Atomic-Commit Pattern Honored

Commit `62f345b` bundles 3 files atomically per Phase 48 D-14 (Phase 59 commit a01ab1d
precedent):

- `docs/_glossary-android.md` — 2 HTML shims inserted at lines 127 and 134 (net +2 shift after line 126)
- `scripts/validation/v1.5-audit-allowlist.json` — 6 pin-coord entries shifted +2 in
  `safetynet_exemptions[]`, `supervision_exemptions[]`, and `c7_knox_allowlist[]`:
  - 183 -> 185 (safetynet, Play Integrity SafetyNet predecessor reference)
  - 198 -> 200 (safetynet, Version History 2025-01 SafetyNet sunset)
  - 179 -> 181 (supervision, MHS supervised MDM profile blockquote)
  - 196 -> 198 (supervision, Phase 34 Foundation Version History row)
  - 193 -> 195 (supervision, Phase 59 CLEAN-08 Version History row)
  - 195 -> 197 (c7_knox, 'Knox entry' changelog reference)
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_9 entries 3-4 shifted:
  - `_glossary-android.md:172` -> `174` (MHS cross-platform note)
  - `_glossary-android.md:188` -> `190` (Version History row)
  - New comment block dated 2026-05-06 documenting refresh rationale (Phase 60 Plan 06)

Pre-line-127 entries (lines 16, 49, 69, 79, 81, 82, 121, 123, 125 in _glossary-android.md
+ all entries in other files) correctly NOT shifted — they sit BEFORE the shim insertion
points and are unaffected by the +2 line growth.

### Harness + Self-Test State Post-Plan-Close

- `node scripts/validation/v1.5-milestone-audit.mjs`: **PASS** (12/12; 0 failed; 0 skipped)
- `node scripts/validation/regenerate-supervision-pins.mjs --self-test`: **FAIL exit 1**
  (expected — AUDIT-07 close happens in Plan 09 per CONTEXT D-19; Plan 06 only refreshes
  BASELINE_9 line coords, not the BASELINE_9 vs sidecar Tier-1 mismatch that --self-test detects)
- `node scripts/validation/regenerate-supervision-pins.mjs --report`: exit 0 (advisory diff)

### Phase 49-59 V-NN-NN Structural Invariants Preserved

The harness GREEN result confirms no V-NN-NN structural assertions were broken by this
plan's edits. (See "Out-of-scope pre-existing failures" below for the chain-validator
state — those are pre-existing and not caused by this plan.)

## Checkpoint Auto-Resolutions

Per AUTO_MODE active in parent invocation:

- **Task 3 (checkpoint:human-verify) — Auto-approved**: PITFALL-12 atomic-commit
  verification gate. Inspected commit 62f345b: 3 files changed (correct), 6 paired
  +/- sidecar diffs all showing +2 shift (correct), 2 paired +/- BASELINE_9 diffs
  showing 172->174 and 188->190 (correct), harness GREEN, self-test still FAIL as
  expected. All how-to-verify steps produced expected output; auto-approved.

## Deviations from Plan

### Auto-fixed Issues

None. The plan executed exactly as written. All 4 anchor fixes used the mechanism
documented in `<action>` blocks (HTML shim for #kme/#kpe; rewrite-ref for the other 2).

### Minor Deviations from Stated Acceptance Criteria

1. **`<verify>` automated check for harness GREEN failed under bash subshell semantics
   on the first attempt** — the chain `node ... && echo PASS || echo FAIL` evaluated
   incorrectly when run inline in the plan's verify block. Worked around by splitting
   into separate commands. Outcome unchanged (harness PASS confirmed in /tmp/final.txt).

2. **10-aosp-zebra.md `(#)` was at line 175, not baseline line 10** — file grew since
   Phase 48 broken-link sweep was authored (additional content added in Phase 49-59).
   The canonical broken target literal `#` was unambiguous regardless of line number;
   the rewrite to `#scope-and-status` resolved the only `(#)` occurrence in the file.
   Acceptance criteria `grep -E '\\]\\(#\\)' returns 0 matches` is satisfied.

3. **Cleanup commit (5576b0d) is technically empty** — 60-06-PIN-PRE-EDIT.txt was
   never staged/committed (Task 1 explicitly said "DO NOT commit"). The cleanup
   commit serves as audit-trail closure marker per the plan's Task 4 instruction
   pattern (`git rm` + commit) even though no `git rm` was needed; created with
   `--allow-empty` for traceability.

## Out-of-Scope Pre-Existing Failures (Logged, Not Fixed)

Chain validators check-phase-{48, 51, 53, 58}.mjs all exit 1 BEFORE this plan's changes
land (verified by stashing changes and re-running). These are pre-existing failures
unrelated to Plan 06's edits — out-of-scope per executor protocol's SCOPE BOUNDARY rule.

- `node scripts/validation/check-phase-48.mjs`: exit 1 (pre-existing)
- `node scripts/validation/check-phase-51.mjs`: exit 1 (pre-existing)
- `node scripts/validation/check-phase-53.mjs`: exit 1 (pre-existing)
- `node scripts/validation/check-phase-58.mjs`: exit 1 (pre-existing)

These failures should be triaged at the orchestrator level or in subsequent Phase 60
plans (likely Plan 09 atomic harness commit or a dedicated chain-validator-refresh plan).

## Files Modified

- `docs/_glossary-android.md` — added 2 HTML anchor shims (`<a id="kme"></a>` line 127,
  `<a id="kpe"></a>` line 134); net +2 lines after line 126
- `docs/_templates/admin-template-ios.md` — rewrote relative link from `00-overview.md`
  to `../admin-setup-ios/00-overview.md` for the portal-navigation-note anchor
- `docs/admin-setup-android/10-aosp-zebra.md` — rewrote bare `#` link to `#scope-and-status`
  in the What Breaks Summary table row
- `scripts/validation/v1.5-audit-allowlist.json` — refreshed 6 pin-coord entries (+2 each)
  in safetynet_exemptions, supervision_exemptions, c7_knox_allowlist for _glossary-android.md
- `scripts/validation/regenerate-supervision-pins.mjs` — refreshed BASELINE_9 entries 3-4
  (172->174, 188->190); added 2026-05-06 refresh comment

## Commits

- `62f345b` — fix(60-06): add #kme + #kpe HTML shims to _glossary-android.md + refresh sidecar+BASELINE_9 pin coords (PITFALL-12 atomic per Phase 48 D-14)
- `17e3aab` — fix(60-06): repair admin-template-ios.md:28 broken anchor (chose: rewrite)
- `b080729` — fix(60-06): repair 10-aosp-zebra.md bare-fragment anchor (chose: rewrite)
- `5576b0d` — chore(60-06): cleanup pin-baseline artifact post-Plan-06 close

## Threat Flags

None. All 3 modified `docs/` files + 2 modified `scripts/validation/` files fall within
the plan's `<threat_model>` register (T-60-06-01..04 mitigations all applied: atomic
3-file commit per D-14; BASELINE_9 refresh in same commit; PIN-PRE-EDIT.txt cleaned up;
JSON parse validated before commit).

## Self-Check: PASSED

**Files claimed modified — all exist with expected content:**

- `docs/_glossary-android.md`: FOUND, contains both `<a id="kme"></a>` and `<a id="kpe"></a>` (verified `grep -c` = 1 each)
- `docs/_templates/admin-template-ios.md`: FOUND, contains `../admin-setup-ios/00-overview.md#portal-navigation-note` (verified)
- `docs/admin-setup-android/10-aosp-zebra.md`: FOUND, no bare `(#)` remaining (verified `grep -E '\\(#\\)'` = 0 matches)
- `scripts/validation/v1.5-audit-allowlist.json`: FOUND, parses as valid JSON, contains 6 shifted pin coords (185, 200, 181, 198, 195, 197)
- `scripts/validation/regenerate-supervision-pins.mjs`: FOUND, BASELINE_9 entries 3-4 contain 174 and 190; refresh comment dated 2026-05-06 present

**Commits claimed — all exist in git log:**

- 62f345b: FOUND in `git log`
- 17e3aab: FOUND in `git log`
- b080729: FOUND in `git log`
- 5576b0d: FOUND in `git log`

**Pin-baseline artifact cleanup:**

- `.planning/phases/60-audit-harness-v1-5-finalization/60-06-PIN-PRE-EDIT.txt`: NOT PRESENT (correctly removed)
