---
phase: 60-audit-harness-v1-5-finalization
plan: 07
subsystem: docs

tags: [audit-harness, broken-link-sweep, D-09, D-25, category-b]

requires:
  - phase: 48-audit-harness-bootstrap-broken-link-sweep-first-pass
    provides: 48-VERIFICATION-broken-links.md baseline (24 Category B findings)
  - phase: 60-audit-harness-v1-5-finalization (Plan 06)
    provides: Per-OEM bare-anchor fixes already landed; 10-aosp-zebra.md line 10 already corrected pre-merge
provides:
  - "9 of 24 Category B baseline broken-link findings resolved (file-path entries only)"
  - "5 AOSP platform-gate prose lines now reference only existing macOS + iOS admin overviews"
  - "L2 runbook navigation footer in 03-tpm-attestation.md no longer points at non-existent 02-device-registration.md"
  - "L2 runbook 04-hybrid-join.md typo fixed (05-policy-conflict.md -> 05-policy-conflicts.md)"
  - "docs/reference/network-infrastructure.md no longer references the never-built 01-network-connectivity.md runbook (5 occurrences fixed)"
  - "docs/device-operations/03-re-provisioning.md no longer references the never-built reference/conditional-access-enrollment.md"
affects:
  - "60-09 (atomic harness commit promotes C13 to blocking; 9 fewer findings to allowlist)"
  - "60-08, 60-10 (other Category B handlers)"

tech-stack:
  added: []
  patterns:
    - "D-09 per-finding triage: rewrite-ref for typos with existing target; delete-ref for genuinely non-existent targets"
    - "D-25 progressive-landing: 9 atomic commits, harness regression-guard between each"

key-files:
  created: []
  modified:
    - "docs/admin-setup-android/09-aosp-realwear.md (line 9 platform-gate prose)"
    - "docs/admin-setup-android/10-aosp-zebra.md (line 9 platform-gate prose)"
    - "docs/admin-setup-android/11-aosp-pico.md (line 9 platform-gate prose)"
    - "docs/admin-setup-android/12-aosp-htc-vive-focus.md (line 9 platform-gate prose)"
    - "docs/admin-setup-android/13-aosp-meta-quest.md (line 9 platform-gate prose)"
    - "docs/device-operations/03-re-provisioning.md (line 105 conditional-access-enrollment ref)"
    - "docs/l2-runbooks/03-tpm-attestation.md (line 174 nav footer)"
    - "docs/l2-runbooks/04-hybrid-join.md (line 161 nav footer)"
    - "docs/reference/network-infrastructure.md (5 table rows referencing non-existent 01-network-connectivity.md)"

key-decisions:
  - "All 5 AOSP files: D-09 delete-ref — removed only the broken Windows Admin sentence; preserved macOS + iOS cross-references which still resolve"
  - "03-re-provisioning.md:105: D-09 delete-ref — replaced [Conditional Access Enrollment Timing](../reference/conditional-access-enrollment.md) with plain prose; preserved (WSEC-01) tag"
  - "03-tpm-attestation.md:174: D-09 delete-ref on Prev nav link — left link text 'Prev: 02-device-registration.md' as plain prose; Next link unchanged"
  - "04-hybrid-join.md:161: D-09 rewrite-ref — typo fix (05-policy-conflict.md -> 05-policy-conflicts.md); applied to both link text and target for visual consistency"
  - "network-infrastructure.md: D-09 delete-ref applied to ALL 5 table-row occurrences (not just line 153). Reasoning: the never-built 01-network-connectivity.md runbook has no logical substitute (01-log-collection.md is generic logging, not network); preserving the prose 'Network Troubleshooting' keeps reader intent visible without misdirecting to wrong runbook. The plan's verification command (`grep -c '01-network-connectivity.md' == 0`) requires zero occurrences anywhere, confirming this scope."

patterns-established:
  - "Pattern: When same broken target appears multiple times in one file, apply the chosen D-09 mechanism uniformly to all occurrences (network-infrastructure.md, 5 rows)."
  - "Pattern: Preserve frontmatter, link-text-as-prose, and surrounding sentence semantics during delete-ref. Reader still sees the intended cross-reference label even after the link wrapper is stripped."

requirements-completed: [AUDIT-05]

duration: 4min
completed: 2026-05-06
---

# Phase 60 Plan 07: Category-B File-Path Broken-Link Repair Summary

**9 broken file-path references in 9 docs resolved via D-09 per-finding triage (5 AOSP delete-ref + 1 conditional-access delete-ref + 1 device-registration delete-ref + 1 policy-conflicts typo rewrite + 1 network-connectivity 5-occurrence delete-ref); harness GREEN after every commit.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-05-06T20:00:40Z
- **Completed:** 2026-05-06T20:04:05Z
- **Tasks:** 2 (9 atomic commits per D-25 progressive-landing)
- **Files modified:** 9

## Accomplishments

- Closed 9 of the 24 Category B baseline findings before Plan 09's atomic harness commit promotes C13 to blocking
- Verified C13 broken-link harness (markdown-link-check) PASSed after every per-file commit (9/9 green)
- Preserved macOS + iOS cross-references in all 5 AOSP files (only the broken Windows Admin sentence was removed)
- No PITFALL-12 surface — none of the 9 modified files appear in supervision_exemptions / safetynet_exemptions / c7_knox_allowlist sidecar pin lists
- No Phase 49-59 V-NN-NN structural invariant breaks; full v1.5 harness (12/12 categories) GREEN throughout

## Task Commits

Each fix was committed atomically per D-25 progressive-landing:

1. **Task 1.1: 09-aosp-realwear.md line 9** — `48af00c` (fix)
2. **Task 1.2: 10-aosp-zebra.md line 9** — `320504f` (fix)
3. **Task 1.3: 11-aosp-pico.md line 9** — `5b1c1c5` (fix)
4. **Task 1.4: 12-aosp-htc-vive-focus.md line 9** — `d528236` (fix)
5. **Task 1.5: 13-aosp-meta-quest.md line 9** — `76c42b8` (fix)
6. **Task 2.1: 03-re-provisioning.md line 105** — `f95bb90` (fix)
7. **Task 2.2: 03-tpm-attestation.md line 174** — `693be62` (fix)
8. **Task 2.3: 04-hybrid-join.md line 161 (typo rewrite)** — `d0b8029` (fix)
9. **Task 2.4: network-infrastructure.md line 153 (5 occurrences)** — `8908f68` (fix)

## Files Created/Modified

- `docs/admin-setup-android/09-aosp-realwear.md` — Removed broken Windows Admin link from platform-gate blockquote
- `docs/admin-setup-android/10-aosp-zebra.md` — Same delete-ref pattern
- `docs/admin-setup-android/11-aosp-pico.md` — Same delete-ref pattern
- `docs/admin-setup-android/12-aosp-htc-vive-focus.md` — Same delete-ref pattern
- `docs/admin-setup-android/13-aosp-meta-quest.md` — Same delete-ref pattern
- `docs/device-operations/03-re-provisioning.md` — Replaced markdown link with plain prose (target file does not exist)
- `docs/l2-runbooks/03-tpm-attestation.md` — Stripped link wrapper from "Prev: 02-device-registration.md" nav footer
- `docs/l2-runbooks/04-hybrid-join.md` — Single-character typo fix (`policy-conflict` -> `policy-conflicts`)
- `docs/reference/network-infrastructure.md` — Stripped link wrapper from 5 table-row "Network Troubleshooting" entries

## Decisions Made

- **AOSP delete-ref over rewrite-ref:** No `docs/admin-setup/` or `docs/admin-setup-windows/` directory exists; no Windows-admin overview file is planned. Removing the sentence is cleaner than retargeting to an unrelated existing path.
- **network-infrastructure.md scope expansion (line 153 -> 5 occurrences):** The plan listed only line 153 from the 48-VERIFICATION baseline, but the verification command `grep -c '01-network-connectivity.md' == 0` requires zero occurrences in the file. Lines 154/155/156/158 all reference the same non-existent target. Applied the same D-09 delete-ref uniformly to keep table semantics consistent. (Rule 2 — missing critical functionality / verification requirement.)
- **04-hybrid-join.md scope expansion (typo applied to both link text and target):** Plan specified rewriting `](05-policy-conflict.md)` to `](05-policy-conflicts.md)`. The link text in the source ("[05-policy-conflict.md]") had the same typo; fixed both for visual consistency. Verification only required the URL fix; text fix is cosmetic but preserves reader expectations.
- **Preserve, don't rewrite, when no obvious target exists:** For the conditional-access-enrollment, device-registration, and network-connectivity refs, no logically equivalent existing doc exists. Delete-ref preserves prose label so the reader still sees intent without being misdirected.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Verification Completeness] network-infrastructure.md scope expansion**

- **Found during:** Task 2.4 inspection of lines 145-158
- **Issue:** Plan listed only line 153 from the 48-VERIFICATION baseline, but lines 153, 154, 155, 156, and 158 all contain the same broken target `../l2-runbooks/01-network-connectivity.md`. The plan's verify command (`grep -c '01-network-connectivity.md' == 0`) requires zero occurrences in the file — fixing only line 153 would leave the file failing its own acceptance check.
- **Fix:** Applied D-09 delete-ref uniformly to all 5 occurrences (replaced markdown link wrapper with plain prose "Network Troubleshooting").
- **Files modified:** `docs/reference/network-infrastructure.md`
- **Verification:** `grep -c '01-network-connectivity.md' docs/reference/network-infrastructure.md` returns 0; harness `node scripts/validation/v1.5-milestone-audit.mjs` exits 0.
- **Committed in:** `8908f68` (commit message documents the 5-occurrence scope expansion explicitly)

**2. [Rule 1 - Cosmetic Consistency] hybrid-join.md typo fixed in BOTH link text and URL target**

- **Found during:** Task 2.3
- **Issue:** Plan specified rewriting `](05-policy-conflict.md)` -> `](05-policy-conflicts.md)`. Source line was `Next: [05-policy-conflict.md](05-policy-conflict.md)` — the link text also had the typo. Fixing only the URL would leave the visible label `[05-policy-conflict.md]` showing the wrong filename, which contradicts reader expectations.
- **Fix:** Replaced the entire substring `[05-policy-conflict.md](05-policy-conflict.md)` with `[05-policy-conflicts.md](05-policy-conflicts.md)`.
- **Files modified:** `docs/l2-runbooks/04-hybrid-join.md`
- **Verification:** `grep -c '](05-policy-conflict.md)' == 0`; `grep -c '](05-policy-conflicts.md)' >= 1`.
- **Committed in:** `d0b8029`

---

**Total deviations:** 2 auto-fixed (1 verification-completeness scope expansion, 1 cosmetic-consistency expansion)

**Impact on plan:** Both deviations expand scope by zero net impact on the 48-VERIFICATION baseline (still resolves the same 9 findings); they ensure each per-file fix passes the plan's own verification command, and that the visible link text in the navigation footer matches the corrected target. No scope creep beyond the listed `files_modified`.

## Issues Encountered

- **Worktree base mismatch on agent startup:** Agent's HEAD was at `9f23014` (a divergent feature-branch tip without `.planning/phases/60-*`), while the parallel-execution prompt specified base `3d9ff237b7a5b486f2620465e8f533d1e560767e`. Resolved per `<worktree_branch_check>` instructions by hard-resetting to the specified base. After reset, `.planning/phases/60-audit-harness-v1-5-finalization/60-07-PLAN.md` was readable as expected. No work lost (no commits on this branch yet).

## User Setup Required

None — this is a documentation-only fix.

## Next Phase Readiness

- 9 of 24 Category B findings now closed; remaining 15 (6 transient external URLs + 9 template placeholders) remain for Plan 09's `c13_broken_link_allowlist[]` sidecar per CONTEXT D-10.
- Plans 60-08 and 60-10 (parallel siblings) handle their own broken-link baselines and don't intersect with these 9 files.
- Plan 60-06 already merged into base touched `10-aosp-zebra.md` line 10 (bare-anchor fix); this plan touched line 9 of the same file with no overlap.

## Self-Check: PASSED

Files modified verified to exist:
- `docs/admin-setup-android/09-aosp-realwear.md` FOUND
- `docs/admin-setup-android/10-aosp-zebra.md` FOUND
- `docs/admin-setup-android/11-aosp-pico.md` FOUND
- `docs/admin-setup-android/12-aosp-htc-vive-focus.md` FOUND
- `docs/admin-setup-android/13-aosp-meta-quest.md` FOUND
- `docs/device-operations/03-re-provisioning.md` FOUND
- `docs/l2-runbooks/03-tpm-attestation.md` FOUND
- `docs/l2-runbooks/04-hybrid-join.md` FOUND
- `docs/reference/network-infrastructure.md` FOUND

Commit hashes verified in git log:
- `48af00c` FOUND
- `320504f` FOUND
- `5b1c1c5` FOUND
- `d528236` FOUND
- `76c42b8` FOUND
- `f95bb90` FOUND
- `693be62` FOUND
- `d0b8029` FOUND
- `8908f68` FOUND

---
*Phase: 60-audit-harness-v1-5-finalization*
*Plan: 07*
*Completed: 2026-05-06*
