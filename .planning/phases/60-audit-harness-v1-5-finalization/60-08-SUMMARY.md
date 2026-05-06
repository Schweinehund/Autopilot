---
phase: 60-audit-harness-v1-5-finalization
plan: 08
subsystem: audit-harness
tags: [audit-harness, sidecar, atomic-commit, c9-promotion, c11-promotion, c12-expansion, c13-promotion, baseline-9, audit-07-close]
requires: [60-01, 60-02, 60-03, 60-04, 60-05, 60-06, 60-07]
provides: [12-of-12-blocking-harness, c9-exemption-mechanism, c11-window-negation, c12-h2-verification, c13-allowlist-shape, baseline-9-refresh]
affects: [Phase-61-fresh-clone-re-audit, Plan-60-09-validator, Plan-60-10-roadmap-wording]
tech-stack:
  added: []
  patterns:
    - C7-symmetric allowKey-set + per-line iteration (C9 mechanism)
    - C1-symmetric proximity-window negation (C11 mechanism)
    - check-phase-58 V-58-05 H2-literal regex (C12 H2 expansion)
    - sidecar shape + count assertion (C13 mechanism)
key-files:
  created:
    - .planning/phases/60-audit-harness-v1-5-finalization/deferred-items.md
  modified:
    - scripts/validation/v1.5-milestone-audit.mjs
    - scripts/validation/v1.5-audit-allowlist.json
    - scripts/validation/regenerate-supervision-pins.mjs
    - .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md
decisions:
  - C11 keyword regex extended per CALIBRATION live-corpus (5 keywords beyond D-01 starting set)
  - c9_exemptions[] populated with 4 entries (CALIBRATION 1 + 3 live-corpus PITFALL-13 refinements)
  - All 4 files committed atomically per Phase 43 D-07 + Phase 48 D-14
metrics:
  duration: ~25min
  completed: 2026-05-06T20:16Z
---

# Phase 60 Plan 08: Atomic Harness Commit Summary

**One-liner:** Single atomic commit promoting C9/C11/C13 from informational to blocking, expanding C12 to verify 6 named H2 anchors, seeding 3 sidecar arrays (c9_exemptions/c11_ops_exemptions/c13_broken_link_allowlist), refreshing BASELINE_9 to current sidecar coords, and populating 48-VERIFICATION-broken-links.md Triage Decision column for all 75 findings — closing AUDIT-03/04/05/07 and Phase 48 D-06 C9 promotion-target simultaneously.

## What Was Built

**Single atomic git commit `c2abdd4` touching exactly 4 files:**

### 1. `scripts/validation/v1.5-milestone-audit.mjs` (606 → 658 lines, +52)

**C9 promotion (D-17 + D-18):**
- Removed `informational: true` flag
- Replaced informational-only run() body with C7-symmetric allowKey-set + per-line iteration
- Compiled patterns with `gi`-flag (was `i`-only) for line enumeration
- Wired `ALLOWLIST.c9_exemptions || []` defensive default
- Two-arm response: pass when violations.length === 0, else fail with first 3 violations

**C11 promotion (D-01 + D-02):**
- Removed `informational: true` flag
- Replaced informational-only run() body with C1-symmetric proximity-window negation
- Compiled patterns with `gi`-flag
- Wired `ALLOWLIST.c11_ops_exemptions || []` defensive default
- Window keyword regex extended per CALIBRATION live-corpus refinement: base D-01 set + `mutually\s+exclusive` + `co-management` + `migration` + `transition` + `replacement`
- Two-arm response with detail showing first 3 violations + matched pattern

**C12 expansion (D-13 + D-16):**
- Inserted 6 H2-anchor sub-check (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access) before existing success return
- Reused check-phase-58.mjs V-58-05 verbatim H2-literal regex template
- Updated success-return detail to include "+ 6 named H2 anchors present"
- Existing platform-column + link-not-copy checks PRESERVED (D-15 rejection of column-count assertion honored)

**C13 promotion (D-06 + D-10):**
- Removed `informational: true` flag
- Replaced informational-only run() body with c13_broken_link_allowlist[] shape + count assertion (15 total = 6 transient_external + 9 template_placeholder)
- Full markdown-link-check sweep deferred to CI per integration-points contract

### 2. `scripts/validation/v1.5-audit-allowlist.json` (55 → 78 lines, +23)

**Top-level field updates:**
- `phase`: `48-audit-harness-bootstrap-broken-link-sweep-first-pass` → `60-audit-harness-v1-5-finalization`
- `generated`: `2026-04-26T00:00:00Z` → `2026-05-06T00:00:00Z`

**Three new arrays appended after `c7_knox_allowlist[]`:**
- `c9_exemptions[]`: 4 entries (1 from CALIBRATION + 3 from live-corpus PITFALL-13 refinement per CONTEXT D-05 mandate; see Deviations section)
- `c11_ops_exemptions[]`: reserved-empty (`[]`) per D-02
- `c13_broken_link_allowlist[]`: 15 entries (6 transient_external + 9 template_placeholder per D-10)

**Existing arrays UNTOUCHED:** safetynet_exemptions[], supervision_exemptions[], cope_banned_phrases[], c7_knox_allowlist[].

### 3. `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_9 refresh)

**BASELINE_9 array refreshed (D-19):**
- Old: `_glossary-android.md` at lines 76, 78, 174, 190
- New: `_glossary-android.md` at lines 79, 81, 181, 198 (aligns with current sidecar supervision_exemptions[] AT v1.5 close)
- Other 5 entries unchanged (`enrollment-overview.md` 51/53/83, `03-fully-managed-cobo.md` 36, `20-android-app-install-investigation.md` 21)
- Comment block extended with Plan 08 entry citing CONTEXT D-19 AUDIT-07 closure

### 4. `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` (Triage Decision column)

**75 cells populated (D-11):**
- 51 Category A anchor-fix rows → `FIXED-PHASE-60`
- 9 Category B file-path rows → `FIXED-PHASE-60` (5 admin-setup/00-overview rewrites + reference/conditional-access-enrollment + 02-device-registration + 05-policy-conflict + l2-runbooks/01-network-connectivity)
- 6 Category B transient external URL rows → `ALLOWLISTED-c13_broken_link_allowlist` (Google support, Knox×2, RealWear, ztd.dds, Apple HT101555)
- 9 Category B template-placeholder rows → `ALLOWLISTED-c13_broken_link_allowlist` (link×3, [filename].md, [runbook-filename].md×3, 26-mgp-app-not-installed.md, ../runbooks-l1/relevant-runbook.md)

**Tally: 60 FIXED-PHASE-60 + 15 ALLOWLISTED-c13_broken_link_allowlist = 75 (matches frontmatter total_findings:75)**

**Byte-identity preserved:** frontmatter `total_findings: 75` and Summary table `| **Total** | **75** | **0** | **75** |` UNCHANGED pre/post.

## How It Was Verified

**Pre-commit gate (6 checks; all PASS before commit):**

1. JSON parse: `node -e "JSON.parse(...)" → OK`
2. Harness fully-blocking: `node v1.5-milestone-audit.mjs --verbose → Summary: 12 passed, 0 failed, 0 skipped; exit 0`
3. --self-test: `node regenerate-supervision-pins.mjs --self-test → Self-test: PASS; exit 0`
4. Phase 49-59 chain validators: 8/11 PASS (48, 49, 52, 54, 55, 56, 57, 59); 3 pre-existing FAILs (51, 53, 58) verified out-of-scope via stash baseline (see Deferred Issues)
5. Sidecar shape: `phase=60-audit-harness-v1-5-finalization c9=4 c11=0 c13=15`
6. Triage population: 75 populated cells (60 FIXED + 15 ALLOWLISTED)

**Post-commit verification (same 6 gates re-run):** All PASS identically. Commit `c2abdd4` touches exactly 4 files (`git show HEAD --name-only` confirms).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1+3 - Bug + Blocking] c9_exemptions[] live-corpus refinement: 1 entry → 4 entries**

- **Found during:** Task 4 pre-commit gate Step 2 (harness exit-1 with 3 unexpected C9 hits)
- **Issue:** CALIBRATION (60-CALIBRATION.md Section A) predicted 1 c9_exemptions[] entry at `03-android-version-matrix.md:41`. Live-corpus harness run with the new C9 promotion logic + CALIBRATION's 1-entry seed surfaced 3 ADDITIONAL legitimate-disambiguation hits not predicted by CALIBRATION:
  - `_glossary-android.md:202` — Phase 34 Foundation Version History row literally containing PITFALL-13 disambiguation prose ("Google has NOT formally deprecated COPE; community shorthand incorrectly conflates...")
  - `admin-setup-android/03-fully-managed-cobo.md:153` — Phase 36 AECOBO-02 afw#setup section: "the COPE path was removed on Android 11+" cross-reference to canonical PITFALL-13 entry
  - `reference/android-capability-matrix.md:54` — Phase 34 Foundation AMAPI migration footnote row: "COPE/WPCO unaffected" + "OMA-URI removed" cross-cell match
- **Fix:** Added 3 additional `c9_exemptions[]` entries with full lineage citations + PITFALL-13 disambiguation references. Total c9_exemptions[] = 4 entries.
- **Files modified:** `scripts/validation/v1.5-audit-allowlist.json` (in same atomic commit)
- **Justification:** Honors CONTEXT D-05 explicit mandate ("If any of the lines fall outside the window after refinement, add to ... in the same atomic commit") + D-18(c) ("For each legitimate hit ... pin in c9_exemptions[]"). All 3 are PITFALL-13 legitimate-disambiguation cases — exactly what c9_exemptions[] is designed to handle.
- **Commit:** `c2abdd4` (atomic with all 4 file changes)

**2. [Rule 1 - Refinement] C11 keyword regex extended beyond D-01 starting set**

- **Found during:** Plan reading of 60-CALIBRATION.md Section B (Plan 01 already validated)
- **Issue:** D-01 starting keyword set produced 5 `requires-pinning` hits in CALIBRATION live scan. CALIBRATION recommended extending the keyword regex to add `mutually\s+exclusive`, `co-management`, `migration`, `transition`, `replacement` (Section B lines 109-115).
- **Fix:** Plan 60-08 line 110 explicitly authorized: "ADD any keyword discovered as needed in 60-CALIBRATION.md". Used the extended 13-keyword regex per CALIBRATION's recommendation. Result: all 12 C11 corpus hits pass via window negation; c11_ops_exemptions[] stays reserved-empty per D-02.
- **Files modified:** `scripts/validation/v1.5-milestone-audit.mjs` (in same atomic commit)
- **Commit:** `c2abdd4`

### Deferred Issues (Out-of-Scope per SCOPE BOUNDARY)

**Pre-existing chain-validator failures at worktree base `f088f77`:**

3 chain validators FAIL identically with and without Plan 60-08 edits (verified via `git stash` baseline). These are pre-existing and NOT regressed by Plan 60-08:

- **check-phase-51:** V-51-06/07/09 — `09-linux-triage.md` Mermaid block missing
- **check-phase-53:** V-53-06 (`platform: Windows` missing in `00-index.md`), V-53-22 (forbidden `## App Lifecycle` H2 in `00-index.md`)
- **check-phase-58:** V-58-09 (Windows-source-acknowledgment literal missing), V-58-10 (frontmatter not parseable)

Logged to `.planning/phases/60-audit-harness-v1-5-finalization/deferred-items.md` for parent orchestrator awareness. These are likely owned by parallel-wave Plans 09/10 or pre-Phase-60 carry-overs not yet landed in this worktree base. Plan 60-08 atomic commit safety: zero new regressions in pre-PASS validators (Phase 48, 49, 52, 54, 55, 56, 57, 59 still PASS).

## Checkpoint Auto-Resolutions

**Task 4 `checkpoint:human-verify` → AUTO-APPROVED** (AUTO_MODE active per parent orchestrator `--auto` flag):
- All 6 pre-commit gate checks PASS
- All 6 post-commit verification checks PASS identically
- Commit `c2abdd4` landed cleanly with exactly 4 files
- Logged auto-approval per AUTO_MODE protocol; continued to commit

## Threat Surface (per <threat_model>)

| Threat ID | Disposition | Verified Mitigation |
|-----------|-------------|---------------------|
| T-60-08-01 (sidecar JSON shape tampering) | mitigated | Pre-commit JSON parse gate PASSED; valid shape post-commit verified |
| T-60-08-02 (harness JS regex flag tampering) | mitigated | `node --check` PASSED; harness exit-0 PASSED post-commit |
| T-60-08-03 (DoS via C11 4-pattern proximity-window scan) | mitigated | Pattern set fixed at 4 entries; bounded iteration count |
| T-60-08-04 (DoS via C9 8-pattern scan) | mitigated | Greedy `[^.]*` regex bounded by `.` terminator; live corpus produced exactly 3 hits before exemption (manageable) |
| T-60-08-05 (BASELINE_9 array tampering) | mitigated | Pre-commit --self-test gate PASSED; refresh values cross-checked vs sidecar supervision_exemptions[] |
| T-60-08-06 (Triage Decision column disclosure) | accepted | Intentional close-out signal per D-11; baseline marker (total_findings:75 + Summary table) byte-identical preserved |
| T-60-08-07 (privilege boundaries) | accepted | All edits are file-content / config; no privilege boundaries crossed |

**No new threat surface discovered.** No `## Threat Flags` section needed.

## Success Criteria (from PLAN.md)

- [x] AUDIT-03 closed (C11 promoted blocking; sidecar reserved-empty c11_ops_exemptions[])
- [x] AUDIT-04 closed (C12 expanded to 6 H2 anchors)
- [x] AUDIT-05 closed (C13 promoted blocking; 15-entry allowlist; 48-VERIFICATION 75-finding inventory closed via Triage Decision column)
- [x] AUDIT-07 closed (regenerate-supervision-pins.mjs --self-test exits 0; BASELINE_9 refreshed)
- [x] Phase 48 D-06 C9 promotion-target honored (C9 promoted blocking)
- [x] Atomic-commit contract honored per Phase 43 D-07 / Phase 48 D-14 / Phase 59 a01ab1d precedent (1 commit, 4 files exactly)
- [x] Phase 49-59 V-NN-NN structural assertions: 8/11 chain validators PASS post-commit (Phase 48, 49, 52, 54, 55, 56, 57, 59); 3 pre-existing FAILs (51, 53, 58) preserved at pre-Plan-08 state — zero regressions caused by Plan 60-08
- [x] Plan 09 (check-phase-60.mjs validator) unblocked: c9_exemptions[]/c11_ops_exemptions[]/c13_broken_link_allowlist[] sidecar arrays + BASELINE_9 refresh + 48-VERIFICATION close-out all in place

## Self-Check: PASSED

**Files claimed created:**
- `.planning/phases/60-audit-harness-v1-5-finalization/deferred-items.md` — FOUND

**Files claimed modified (in commit c2abdd4):**
- `scripts/validation/v1.5-milestone-audit.mjs` — FOUND
- `scripts/validation/v1.5-audit-allowlist.json` — FOUND
- `scripts/validation/regenerate-supervision-pins.mjs` — FOUND
- `.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md` — FOUND

**Commit hash:** `c2abdd4` — FOUND in `git log`

**No leaks to main tree:** all edits scoped to worktree CWD; no absolute paths used.
