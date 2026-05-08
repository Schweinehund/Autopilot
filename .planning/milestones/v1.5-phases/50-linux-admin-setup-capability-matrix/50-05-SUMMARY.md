---
phase: 50
plan: "05"
subsystem: validation
tags: [validator, static-analysis, check-phase-50, linux, AUDIT-06]
dependency_graph:
  requires: [50-01, 50-02, 50-03, 50-04]
  provides: [check-phase-50.mjs, AUDIT-06]
  affects: [CI-audit-harness-v1.5, phase-51-runbooks]
tech_stack:
  added: []
  patterns: [file-reads-only, no-shared-module, ESM-validator]
key_files:
  created:
    - scripts/validation/check-phase-50.mjs
  modified: []
decisions:
  - "Mirror check-phase-49.mjs structure verbatim (file-reads-only, ESM imports only, argv flags, padLabel, checks array with {id,name,run()} objects)"
  - "V-50-16 extends V-49-07 column-aware regex from cells[1] (2-col table) to cells[2] (3-col | Feature | Windows | Linux |)"
  - "V-50-17 Equivalences check uses heuristic phrase detection for D-13/D-14/D-15 paired rows"
  - "CDI-02 contract: hardcoded H2 strings are intentional brittleness — Phase 51+ H2 renames require same-commit validator update"
metrics:
  duration: "12 minutes"
  completed: "2026-04-27"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 50 Plan 05: check-phase-50.mjs Validator Summary

**One-liner:** Node ESM static validator with 26 V-50-NN checks covering file existence, H2 pinning, cross-links, 3-status closed-set Linux column, CA cell literal, PITFALL callouts, and C10 frontmatter for all 8 Phase 50 content files.

---

## Task Completed

### Task 1: Author scripts/validation/check-phase-50.mjs (~26 V-50-NN checks)

**Commit:** `6075030`
**File:** `scripts/validation/check-phase-50.mjs` (422 lines)

---

## 26 V-50-NN Check IDs and Names

| ID | Check Name |
|----|-----------|
| V-50-01 | 00-overview.md exists |
| V-50-02 | 01-intune-linux-agent.md exists |
| V-50-03 | 02-enrollment-profile.md exists |
| V-50-04 | 03-compliance-policy.md exists |
| V-50-05 | 04-app-delivery.md exists |
| V-50-06 | 05-conditional-access.md exists |
| V-50-07 | linux-intune-portal-enrollment.md exists |
| V-50-08 | linux-capability-matrix.md exists |
| V-50-09 | 02-enrollment-profile.md has 5 PINNED H2s (D-08) |
| V-50-10 | 02-enrollment-profile.md has NO forbidden H2s (regression guard) |
| V-50-11 | end-user file has 5 PINNED H2s (D-09) |
| V-50-12 | 02-enrollment-profile.md → end-user file cross-link (D-10 forward) |
| V-50-13 | end-user file → 02-enrollment-profile.md cross-link (D-10 reverse) |
| V-50-14 | linux-capability-matrix.md has 10 PINNED H2s (D-06) |
| V-50-15 | matrix CA row literal 'Not supported — web-app CA only' (PITFALL-2; V-49-08 inheritance) |
| V-50-16 | matrix Linux column 3-status closed set (D-04; column-aware extending V-49-07) |
| V-50-17 | Cross-Platform Equivalences H2 has ≥3 paired rows (corrected SC#4 floor; D-12) |
| V-50-18 | 01-intune-linux-agent.md has LIN-05 'Known admin pitfall' blockquote (DPO-01) |
| V-50-19 | 01-intune-linux-agent.md contains DPO-01 anchor back-link |
| V-50-20 | 04-app-delivery.md PITFALL-1 scope callout literal |
| V-50-21 | 03-compliance-policy.md PITFALL-2 architectural callout |
| V-50-22 | 01-intune-linux-agent.md PITFALL-3 deb-vs-Snap callout |
| V-50-23 | 00-overview.md DPO-03 back-link present + bridge H2 NOT duplicated |
| V-50-24 | 05-conditional-access.md has NO Device-Level CA H2 (PITFALL-2 inheritance) |
| V-50-25 | all 7 admin files have platform: Linux + audience: admin + 60-day cycle |
| V-50-26 | end-user file has platform: Linux + audience: end-user + 60-day cycle |

---

## Validator Output Snapshot

`node scripts/validation/check-phase-50.mjs --verbose` against Phase 50 deliverables (plans 01-04):

```
[1/26] V-50-01: 00-overview.md exists ...........................  PASS -- 3534 bytes
[2/26] V-50-02: 01-intune-linux-agent.md exists .................  PASS -- 5508 bytes
[3/26] V-50-03: 02-enrollment-profile.md exists .................  PASS -- 6837 bytes
[4/26] V-50-04: 03-compliance-policy.md exists ..................  PASS -- 10853 bytes
[5/26] V-50-05: 04-app-delivery.md exists .......................  PASS -- 5407 bytes
[6/26] V-50-06: 05-conditional-access.md exists .................  PASS -- 6927 bytes
[7/26] V-50-07: linux-intune-portal-enrollment.md exists ........  PASS -- 8012 bytes
[8/26] V-50-08: linux-capability-matrix.md exists ...............  PASS -- 11448 bytes
[9/26] V-50-09: 02-enrollment-profile.md has 5 PINNED H2s (D-08)  PASS
[10/26] V-50-10: 02-enrollment-profile.md has NO forbidden H2s    PASS
[11/26] V-50-11: end-user file has 5 PINNED H2s (D-09) ..........  PASS
[12/26] V-50-12: 02-enrollment-profile.md → end-user cross-link   PASS
[13/26] V-50-13: end-user file → 02-enrollment-profile cross-link  PASS
[14/26] V-50-14: linux-capability-matrix.md has 10 PINNED H2s     PASS -- all 10 H2s present
[15/26] V-50-15: matrix CA row literal 'Not supported — web-app    PASS
[16/26] V-50-16: matrix Linux column 3-status closed set           PASS -- all Linux column cells canonical
[17/26] V-50-17: Cross-Platform Equivalences H2 has ≥3 paired rows PASS -- 3 D-13/D-14/D-15 paired rows found
[18/26] V-50-18: 01-intune-linux-agent.md LIN-05 blockquote        PASS
[19/26] V-50-19: 01-intune-linux-agent.md DPO-01 anchor back-link  PASS
[20/26] V-50-20: 04-app-delivery.md PITFALL-1 scope callout        PASS
[21/26] V-50-21: 03-compliance-policy.md PITFALL-2 callout         PASS
[22/26] V-50-22: 01-intune-linux-agent.md PITFALL-3 deb-vs-Snap    PASS
[23/26] V-50-23: 00-overview.md DPO-03 back-link + no bridge H2    PASS
[24/26] V-50-24: 05-conditional-access.md no Device-Level CA H2    PASS
[25/26] V-50-25: all 7 admin files C10 frontmatter                 PASS -- 7 admin files valid
[26/26] V-50-26: end-user file C10 frontmatter                     PASS

Summary: 26 passed, 0 failed, 0 skipped
```

Exit code: 0

---

## Lazy-Skip CI Registration Verification

The CI workflow `.github/workflows/audit-harness-v1.5-integrity.yml` pre-registers a `check-phase-50` job using the Phase 48 D-18 lazy-skip pattern. File presence at `scripts/validation/check-phase-50.mjs` satisfies the lazy-skip file-presence half of the contract. The validator delivered by this plan completes that contract.

---

## D-25 Same-Commit-Rename Contract (for Phase 51+ plan authors)

Per CDI-02 (H2-string contract), the hardcoded H2 strings in `check-phase-50.mjs` are an **intentional brittleness** trade-off. The validator pins Phase 50 structural contracts for downstream phases.

**Rule for Phase 51+ plan authors:** Any rename of a Phase 50 H2 heading in a Phase 51+ plan MUST update `scripts/validation/check-phase-50.mjs` in the **same atomic commit** as the H2 rename. Failure to do so will cause the validator to fail CI.

**Affected H2 contracts (CDI-02 pinned):**
- `02-enrollment-profile.md`: Prerequisites / Steps / Verification / Configuration-Caused Failures / See Also
- `linux-intune-portal-enrollment.md`: What is Linux Intune Enrollment? / Before you start / Enroll your device / Verify enrollment / Get help
- `linux-capability-matrix.md`: Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access / Cross-Platform Equivalences / Key Gaps Summary / See Also / Version History

---

## Decisions Made

1. **V-50-16 column index extension:** V-49-07 operated on `cells[1]` in a 2-column `| Feature | Status |` table; V-50-16 extends to `cells[2]` in the 3-column `| Feature | Windows | Linux |` bilateral matrix. After `split('|').map(s => s.trim()).filter(Boolean)`, cell 0 = Feature, 1 = Windows, 2 = Linux.

2. **V-50-17 equivalences heuristic:** Rather than counting table rows (which would be fragile to whitespace/format variation), the check probes for the distinct D-13/D-14/D-15 phrase signatures: `intune-portal` + `microsoft-identity-broker` + `IntuneMDMDaemon LaunchAgent` (pair 1); `intune-agent.timer` + `APNs` (pair 2); `web-app CA` + `MAM-WE` (pair 3).

3. **File-reads-only pattern enforced:** All 26 checks use only `node:fs`, `node:path`, `node:process`. No shell execution, no external dependencies, no shared modules.

---

## Deviations from Plan

None — plan executed exactly as written. Validator code specified verbatim in plan `<action>` block was written with exact structural fidelity to check-phase-49.mjs.

---

## Known Stubs

None — validator is code, not documentation content. No stubs apply.

---

## Threat Flags

None — validator is file-reads-only with no network, filesystem-mutation, or auth surface.

---

## Self-Check: PASSED

- `scripts/validation/check-phase-50.mjs` FOUND
- commit `6075030` FOUND
- `node scripts/validation/check-phase-50.mjs` exits 0: 26 passed, 0 failed, 0 skipped
