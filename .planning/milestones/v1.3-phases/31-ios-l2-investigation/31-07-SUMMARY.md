---
phase: 31-ios-l2-investigation
plan: 07
subsystem: docs
tags: [ios, l2, retrofit, placeholder, cross-reference, d22, d23]

# Dependency graph
requires:
  - phase: 31-ios-l2-investigation
    provides: "Plans 31-01/02/03/04 delivered 14-ios-log-collection.md + 15-ios-ade-token-profile.md + 16-ios-app-install.md + 17-ios-compliance-ca-timing.md (the 4 L2 runbooks targeted by the retrofit). Plan 31-06 delivered the 00-index.md#ios-l2-runbooks anchor target."
  - phase: 30-ios-l1-triage-runbooks
    provides: "Plans 30-05..30-10 planted the 'Phase 31' placeholder strings (13 line anchors across 9 files) that this plan resolves. placeholder-inventory.json captured Wave 0 locks these anchors."
provides:
  - "Phase 31 cross-phase forward-contract closed — zero 'Phase 31' placeholder strings remain in prose across 9 retrofit targets (6 L1 runbooks + triage tree + ADE lifecycle + compliance policy guide)."
  - "Every retrofitted escalation link points to a specific 14-17 L2 runbook (not a bare 00-index.md) — V-31-22 green for all 6 L1 runbooks."
  - "D-23 prose rewrite on line 182 of 06-compliance-policy.md — replaces vague 'Phase 31 L2 runbooks' mention with explicit two-step path through 14-ios-log-collection.md followed by 17-ios-compliance-ca-timing.md. Byte-for-byte match to expected-d23.txt fixture (V-31-23 green)."
  - "Version History row 'Resolved Phase 31 L2 cross-references' appended to all 9 files (V-31-24 green). Two files with 2026-04-16 last_verified bumped to 2026-04-17."
  - "Harness correctness fix: V-31-21 regex now excludes the mandated 'Resolved Phase 31 L2 cross-references' Version History phrase that V-31-24 requires verbatim. Both co-pass gates now hold."
affects: [phase-31-verification, phase-32-navigation-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Placeholder retrofit pattern: replace 'Phase N' with specific runbook links preserving surrounding context; append Version History row same day; bump last_verified only when stale (preserve existing when already current)."
    - "Harness mutual-exclusion scrub pattern: when sibling checks enforce both 'zero occurrences of X' and 'literal containing X', the broader check strips the mandated phrase before testing (c.replace(mandatedPhrase, '') before /X/.test())."
    - "D-24 atomic commit grouping by directory boundary — each commit is independently revertable and auditable (4 commits: l1-runbooks / triage-tree / lifecycle / admin-setup-prose-rewrite)."

key-files:
  created: []
  modified:
    - docs/l1-runbooks/16-ios-apns-expired.md
    - docs/l1-runbooks/17-ios-ade-not-starting.md
    - docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md
    - docs/l1-runbooks/19-ios-license-invalid.md
    - docs/l1-runbooks/20-ios-device-cap-reached.md
    - docs/l1-runbooks/21-ios-compliance-blocked.md
    - docs/decision-trees/07-ios-triage.md
    - docs/ios-lifecycle/01-ade-lifecycle.md
    - docs/admin-setup-ios/06-compliance-policy.md
    - scripts/validation/check-phase-31.mjs

key-decisions:
  - "V-31-21 regex received an inline scrub for the mandated V-31-24 Version History phrase. The two sibling harness checks were mutually unsatisfiable as originally written ('/Phase 31/' in V-31-21 rejects 'Resolved Phase 31 L2 cross-references' which V-31-24 requires verbatim). Fix: c.replace(/Resolved Phase 31 L2 cross-references/g, '') before testing. Committed separately (fix commit 48fadbf) from the retrofit commits to preserve D-24 atomic grouping."
  - "Pre-flight drift check (Step 0 of each task) confirmed all 13 line anchors unchanged from placeholder-inventory.json — no drift, no re-enumeration needed. Wave 4 orchestrator state (6d810ce base) captured the expected file state."
  - "Mermaid IOSE2 node in triage tree line 44 received text-only edit per Phase 30 D-05 precedent — node ID preserved, escapes stayed intact, graph structure unchanged. Green classDef on IOSE2 line 57 matches IOSE2 still present."
  - "ADE lifecycle Version History uses 2-column format (Date | Change) not 3-column. Row insertion preserved the existing column count — the template 'Resolved Phase 31 L2 cross-references' still matches the V-31-24 regex regardless of Author column presence."
  - "Two files (01-ade-lifecycle.md, 06-compliance-policy.md) had last_verified: 2026-04-16 / review_by: 2026-07-15 from original authorship; bumped to 2026-04-17 / 2026-07-16 per D-25. Seven files were already at 2026-04-17 (Phase 30 alignment) and required no bump."

patterns-established:
  - "Pre-flight drift check gate: before each retrofit task, re-verify inventory line anchors by running the captured grep command; if drift >0 lines, update placeholder-inventory.json before editing."
  - "Harness sibling-check reconciliation: when two required checks encode literal contradictions (neither can be relaxed), scrub the mandated phrase in the broader check's input before testing — preserves both intent and literal compliance."

requirements-completed: [L2TS-01, L2TS-02]

# Metrics
duration: 20min
completed: 2026-04-17
---

# Phase 31 Plan 07: D-22/D-23/D-25 Retrofit Integration Summary

**Closed the Phase 31 cross-phase forward-contract by resolving 13 D-22 placeholder anchors across 9 files in 4 atomic commits, rewriting the D-23 compliance-policy prose to match expected-d23.txt byte-for-byte, and reconciling a harness mutual-exclusion bug that blocked V-31-21 from co-passing with V-31-24.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-04-17 (Wave 5 spawn)
- **Completed:** 2026-04-17
- **Tasks:** 3/3 executed as 4 D-24 atomic commits + 1 harness-correctness fix
- **Files modified:** 10 (9 retrofit targets + 1 harness)

## Accomplishments

- **D-22 placeholder retrofit complete across 9 files / 13 line anchors.** Every "Phase 31" placeholder replaced with a specific 14-17 L2 runbook link. Zero Phase-31 strings remain in prose of the 9 retrofit targets.
- **L1 runbook specificity (V-31-22 green):** 6 L1 runbooks (16-21) each point to a specific 14/15/17 target — no bare `00-index.md` links remain in L1 escalation footers.
- **Triage tree retrofit (5 line anchors in 07-ios-triage.md):** Mermaid IOSE2 node label text (line 44, text-only per D-05), Routing Verification row (72), How-to-Check row (82), Escalation Data row (89), and Related Resources footer (94). IOSE2 node ID preserved; classDef assignment line 57 intact; no graph structural modifications.
- **ADE lifecycle retrofit (1 line anchor, 01-ade-lifecycle.md line 364):** sysdiagnose reference now carries anchor link `../l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose` plus see-also to 15 for Pattern A-D token-sync context.
- **D-23 prose rewrite (06-compliance-policy.md line 182):** Vague "Phase 31 L2 runbooks" mention replaced with explicit two-step L2 investigation path (14 first, then 17). Byte-for-byte match to expected-d23.txt (after CRLF normalization in harness). V-31-23 green.
- **D-25 metadata bumps on all 9 files:** Version History row "Resolved Phase 31 L2 cross-references" appended. Two files (01-ade-lifecycle.md, 06-compliance-policy.md) had last_verified / review_by bumped from 2026-04-16 / 2026-07-15 to 2026-04-17 / 2026-07-16; other seven files already at 2026-04-17 required no frontmatter change.
- **Harness correctness fix:** V-31-21 regex now scrubs the mandated "Resolved Phase 31 L2 cross-references" phrase before the `/Phase 31/` test. Unblocks V-31-21 + V-31-24 simultaneous pass. Committed separately (commit 48fadbf) to preserve D-24 atomic grouping.
- **Full harness green:** 29 PASS / 0 FAIL / 0 SKIP on `node scripts/validation/check-phase-31.mjs --quick`. Full run: 29 PASS / 0 FAIL / 1 SKIP (V-31-30 markdown-link-check — external tool unavailable per design).

## Task Commits

Each task committed atomically per D-24 grouping. Orders preserved:

1. **Fix: Harness V-31-21 regex reconciliation** — `48fadbf` (fix). Pre-requisite for any L1 retrofit commit to pass V-31-21 simultaneous with V-31-24.
2. **Task 1: Retrofit iOS L1 runbooks 16-21 (6 files)** — `8bd2a73` (docs). Atomic commit 1 of 4.
3. **Task 2a: Retrofit triage tree 07-ios-triage.md (5 line anchors)** — `4757c31` (docs). Atomic commit 2 of 4.
4. **Task 2b: Retrofit ADE lifecycle 01-ade-lifecycle.md (1 line anchor)** — `9f7cbc9` (docs). Atomic commit 3 of 4.
5. **Task 3: D-23 prose rewrite of 06-compliance-policy.md line 182** — `2e6dc5c` (docs). Atomic commit 4 of 4. Phase gate closed.

## Files Created/Modified

### Modified (retrofit targets, 9 files)

- `docs/l1-runbooks/16-ios-apns-expired.md` — line 90 placeholder → 15-ios-ade-token-profile.md + 14-ios-log-collection.md; Version History row added.
- `docs/l1-runbooks/17-ios-ade-not-starting.md` — line 114 placeholder → 15-ios-ade-token-profile.md; Version History row added.
- `docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md` — line 88 placeholder → 14 + 15 combo with explanatory context; Version History row added.
- `docs/l1-runbooks/19-ios-license-invalid.md` — line 96 placeholder → 14 (MDM diagnostic report) + 15 (ADE-path); Version History row added.
- `docs/l1-runbooks/20-ios-device-cap-reached.md` — line 83 placeholder → 15-ios-ade-token-profile.md; Version History row added.
- `docs/l1-runbooks/21-ios-compliance-blocked.md` — line 179 placeholder → 17-ios-compliance-ca-timing.md with Cause A/B/C axis mapping; Version History row added.
- `docs/decision-trees/07-ios-triage.md` — 5 line anchors retrofitted (44, 72, 82, 89, 94); IOSE2 node ID preserved; Version History row added.
- `docs/ios-lifecycle/01-ade-lifecycle.md` — line 364 sysdiagnose reference now carries anchor link; last_verified 2026-04-16→2026-04-17; review_by 2026-07-15→2026-07-16; Version History row added (2-column table format).
- `docs/admin-setup-ios/06-compliance-policy.md` — line 182 D-23 prose rewrite (matches expected-d23.txt byte-for-byte); last_verified 2026-04-16→2026-04-17; review_by 2026-07-15→2026-07-16; Version History row added (tagged "D-23 prose rewrite").

### Modified (harness correctness fix, 1 file)

- `scripts/validation/check-phase-31.mjs` — V-31-21 regex scrubs mandated V-31-24 phrase before testing; 2-line change, no structural modifications.

## Decisions Made

- **V-31-21 ↔ V-31-24 harness reconciliation (Rule 1 auto-fix).** The two harness checks were mutually unsatisfiable as originally written. V-31-21 tested `/Phase 31/` against file contents; V-31-24 required the literal string "Resolved Phase 31 L2 cross-references" in each file's Version History. Since the V-31-24 string contains the substring "Phase 31", the two checks could never co-pass. Resolution: V-31-21 now strips the exact V-31-24-mandated phrase from file contents before testing. Documented as Rule 1 auto-fix in commit message (48fadbf).
- **Atomic commit discipline per D-24.** The harness fix was committed separately from the 4 retrofit commits rather than bundled into commit 1. Preserves the D-24 "4 atomic commits by directory boundary" requirement; harness fix is clearly a prerequisite correctness change not part of the retrofit scope.
- **Phase-30-style preservation for ADE lifecycle Version History (2-column table).** The 01-ade-lifecycle.md Version History table is 2-column (Date | Change) not 3-column. Row insertion preserved the column count — the V-31-24 regex `/Resolved Phase 31 L2 cross-references/` matches regardless of column layout.
- **No last_verified bump on already-current files.** Seven of nine retrofit files already had last_verified: 2026-04-17 from Phase 30 alignment; those frontmatters were NOT modified. Only 01-ade-lifecycle.md and 06-compliance-policy.md (both at 2026-04-16) received bumps. Minimizes unnecessary churn.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Harness Bug] V-31-21 + V-31-24 mutual exclusion fixed**
- **Found during:** Task 1 (mid-task, after L1 edits applied). Both checks are required to pass per `<success_criteria>` lines 345-348, but the `/Phase 31/` regex in V-31-21 rejects any file containing the V-31-24-mandated phrase "Resolved Phase 31 L2 cross-references".
- **Issue:** Harness V-31-21 (scripts/validation/check-phase-31.mjs line 113) `/Phase 31/.test(c)` would match the Version History row text that V-31-24 (line 122) requires verbatim. The two gates were literally unsatisfiable.
- **Fix:** Modified V-31-21's run function to strip the exact mandated phrase before the regex test. Single 2-line edit; no structural changes; backwards-compatible with unrelated uses of "Phase 31" (if any genuine placeholder remained, it would still be caught). Verified by running harness end-to-end — V-31-21 green with Version History rows present, V-31-24 green with same rows.
- **Files modified:** scripts/validation/check-phase-31.mjs (line 113 region).
- **Commit:** 48fadbf (separate commit per D-24 atomicity; does not break the 4-commit retrofit grouping).

No other deviations. Pre-flight drift check confirmed all 13 line anchors exactly match placeholder-inventory.json — no re-enumeration needed. All 4 atomic retrofit commits proceeded as specified.

## Verification Results

### Phase Gate (per plan success_criteria line 56 + line 379)

```bash
$ grep -rn "Phase 31" docs/l1-runbooks docs/decision-trees/07-ios-triage.md \
    docs/ios-lifecycle/01-ade-lifecycle.md docs/admin-setup-ios/06-compliance-policy.md \
    | grep -v "Resolved Phase 31 L2 cross-references"
(empty — prose is clean of Phase 31 placeholders)
```

### Harness

```
$ node scripts/validation/check-phase-31.mjs --full
Summary: 29 passed, 0 failed, 1 skipped
```

V-31-30 SKIP is by design (external markdown-link-check unavailable) and not a correctness gate.

### D-22/D-23/D-24/D-25 Gates Individually Verified

| Gate | Status | Detail |
|------|--------|--------|
| V-31-21 (zero Phase 31 placeholders) | GREEN | Offenders list: empty |
| V-31-22 (L1 target specificity) | GREEN | No bare 00-index.md links in L1 runbooks 16-21 |
| V-31-23 (D-23 line 182 diff match) | GREEN | Byte-for-byte match after CRLF normalization |
| V-31-24 (Version History on 9 files) | GREEN | All 9 files contain "Resolved Phase 31 L2 cross-references" |
| D-24 (4 atomic commits by directory) | GREEN | 8bd2a73 (l1) / 4757c31 (triage) / 9f7cbc9 (lifecycle) / 2e6dc5c (admin-setup) |
| D-25 (last_verified bumps + VH rows) | GREEN | 2 files bumped (01-ade-lifecycle, 06-compliance-policy); 7 already current |

## Threat Flags

No new security-relevant surface introduced. All edits are text/link retrofits in documentation files; no network endpoints, auth paths, file access patterns, or schema changes.

The harness modification (scripts/validation/check-phase-31.mjs) is a 2-line regex scrub that does not introduce new code paths, I/O, or external calls — it's a pure string manipulation on already-loaded file contents.

## Known Stubs

None. The retrofit replaces stubs (Phase 31 placeholders) with concrete cross-references; every modified link points to a file that exists and contains the referenced anchor or section.

## Self-Check: PASSED

- [x] docs/l1-runbooks/16-ios-apns-expired.md exists and contains "15-ios-ade-token-profile.md"
- [x] docs/l1-runbooks/17-ios-ade-not-starting.md exists and contains "15-ios-ade-token-profile.md"
- [x] docs/l1-runbooks/18-ios-enrollment-restriction-blocking.md exists and contains "14-ios-log-collection.md" and "15-ios-ade-token-profile.md"
- [x] docs/l1-runbooks/19-ios-license-invalid.md exists and contains "14-ios-log-collection.md" and "15-ios-ade-token-profile.md"
- [x] docs/l1-runbooks/20-ios-device-cap-reached.md exists and contains "15-ios-ade-token-profile.md"
- [x] docs/l1-runbooks/21-ios-compliance-blocked.md exists and contains "17-ios-compliance-ca-timing.md"
- [x] docs/decision-trees/07-ios-triage.md exists; IOSE2 preserved; 5 anchors retrofitted
- [x] docs/ios-lifecycle/01-ade-lifecycle.md exists; line 364 contains "section-3-mac-cable-sysdiagnose"
- [x] docs/admin-setup-ios/06-compliance-policy.md line 182 matches expected-d23.txt
- [x] All 9 files contain "Resolved Phase 31 L2 cross-references" in Version History
- [x] Commit 48fadbf (harness fix) exists in git log
- [x] Commit 8bd2a73 (Task 1: L1 retrofit) exists in git log
- [x] Commit 4757c31 (Task 2a: triage) exists in git log
- [x] Commit 9f7cbc9 (Task 2b: lifecycle) exists in git log
- [x] Commit 2e6dc5c (Task 3: D-23 prose rewrite) exists in git log

## Phase 31 Status

Plan 31-07 is the final plan in Phase 31. With this plan complete:
- All 30 V-31-XX validation checks pass (29 green, 1 expected skip)
- Cross-phase forward-contract from Phase 30 is closed (zero Phase 31 placeholders in prose)
- Ready for `/gsd-verify-work` review
