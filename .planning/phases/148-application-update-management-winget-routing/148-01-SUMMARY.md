---
phase: 148-application-update-management-winget-routing
plan: 01
subsystem: docs
tags: [windows-autopatch, patch-management, hotpatch, entitlements, microsoft-learn, evidence-line]

requires:
  - phase: 146-windows-driver-firmware-update-depth
    provides: The 06-windows-driver-firmware-updates.md structural precedent (10 H2s / 8 anchors / 0 fences / evidence-line contract) that 07 mirrors, plus the sealed 01-windows-wufb-rings.md anchors (#autopatch-disambiguation, #hotpatch) this plan cross-links into
provides:
  - "docs/operations/patch-management/07-windows-autopatch.md — Autopatch enrollment mechanics, the Test / Last group model, the corrected containment position, update workloads and service objectives, the Autopatch/Hotpatch entitlement comparison, Autopatch-specific reporting, and unsupported/anti-feature callouts"
  - "148-RESEARCH.md plan-time fetch addendum — the six previously-PREMISE APP-01 claims, now MEASURED with URL/ms.date/rendered-date/heading per item"
  - "The corpus's first inbound links into 01-windows-wufb-rings.md#autopatch-disambiguation and #hotpatch"
  - "Four of the 16-anchor Phase-151 cross-link contract's eight 07-side anchors"
affects: [148-plan-02-windows-app-updates, 148-plan-03-overview-wiring, phase-151-recipe-5]

actuals:
  tokens: 9100
  tasks: 4
  commits: 1

tech-stack:
  added: []
  patterns:
    - "curl + local Python tag-strip + literal grep for Microsoft Learn retrieval (no rendered-summary tool)"
    - "One standalone line-start **Source:** paragraph per contiguous blockquote from one page, never spanning two pages"
    - "Own-line <a id> anchor immediately above each of the first eight H2s; none above the two footer H2s"

key-files:
  created:
    - docs/operations/patch-management/07-windows-autopatch.md
  modified:
    - .planning/phases/148-application-update-management-winget-routing/148-RESEARCH.md

key-decisions:
  - "Squashed the plan's four task-level commits into one final commit (git reset --soft + recommit) to satisfy the plan's explicit D-65 'commit 1 of three' contract and its literal git-log-based acceptance criterion, after verifying every task's acceptance criteria and automated verify commands individually first"
  - "Reached the Autopilot device-preparation quotes via the public MicrosoftDocs/memdocs GitHub repo directory listing rather than guessing a Learn slug, since the device-preparation tree (unlike the -pr repos the rest of this phase's pages sit in) is publicly readable"
  - "Recorded 07's own 'Last updated on' measurement for windows-autopatch-groups-overview (2025-06-17) even though it differs from 01-windows-wufb-rings.md's prior citation of the same URL (2026-06-19, which came from a different meta field, not the rendered footer badge) — 01 is sealed and not corrected here"
  - "Did not resolve the Autopatch prerequisites page's two-vs-three co-management-workload inconsistency; both sides are quoted and the unnamed third workload is left explicitly unnamed"
  - "Sovereign-cloud (GCC High/DoD) Autopatch availability shipped as a documented silence — no first-party page fetched this session states it either way"

requirements-completed: [APP-01, APP-02]

coverage:
  - id: D1
    description: "07-windows-autopatch.md exists with 10 H2s, 8 own-line anchors, 0 code fences, no doc_id, LF endings, and cross-links co-management/03#autopatch-prerequisites plus 01#autopatch-disambiguation and #hotpatch without editing either file"
    requirement: APP-01
    verification:
      - kind: other
        ref: "grep -c '^## ' / grep -c '<a id=' / grep -c '^```' / grep -c doc_id / git ls-files --eol docs/operations/patch-management/07-windows-autopatch.md"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs (0 hub-presence / 0 corpus-link failures)"
        status: pass
    human_judgment: true
    rationale: "Prose accuracy against the fetched Microsoft Learn bytes (no fabricated quotes, correct scoping) requires a human or a dedicated re-fetch-and-diff verifier pass — grep can prove structure and literal-string presence but not that a quote is genuinely verbatim and correctly attributed."
  - id: D2
    description: "Both Autopatch and Hotpatch entitlement lists ship side by side under ## Autopatch and Hotpatch, each with its own independent Source line, showing the VDA/Windows 365 Enterprise asymmetry, and the explicit 'necessary but not sufficient' positive statement"
    requirement: APP-02
    verification:
      - kind: other
        ref: "awk range grep for >=2 Source lines, 'VDA', 'Windows 365 Enterprise', 'necessary but not sufficient', and the absence of the fabricated 'if you have autopatch you have hotpatch' framing"
        status: pass
    human_judgment: false
  - id: D3
    description: "148-RESEARCH.md carries a Plan-Time Fetch Addendum resolving all six APP-01 PREMISE items (ring-model figures, containment sentence, workload objectives, reporting surfaces, April 2025 date, device-preparation quotes) before any section of 07 quotes them"
    verification:
      - kind: other
        ref: "grep -c '^## Plan-Time Fetch Addendum (Plan 148-01)$' / grep -c '^\\*\\*URL:\\*\\*' (7) / node scripts/validation/check-phase-54.mjs (32/0/0)"
        status: pass
    human_judgment: false
  - id: D4
    description: "All nine gate baselines (check-phase-54/53/59, check-nav-hub-links, c17-eee-contract, v1.20-milestone-audit, build-filename-map/build-publish-bundle self-tests, check-phase-144 apex) remain unchanged after the commit"
    verification:
      - kind: other
        ref: "node scripts/validation/{check-phase-54,check-phase-53,check-phase-59,check-nav-hub-links,c17-eee-contract,v1.20-milestone-audit,check-phase-144}.mjs and both pipeline --self-test runs"
        status: pass
    human_judgment: false

duration: ~50min
completed: 2026-08-23
status: complete
---

# Phase 148 Plan 1: Windows Autopatch Guide Summary

**Authored `docs/operations/patch-management/07-windows-autopatch.md` (APP-01, APP-02) — enrollment,
the Test/Last group model, the corrected containment position, service objectives, and both
Autopatch/Hotpatch entitlement lists shown side by side with the necessary-but-not-sufficient
statement — plus a plan-time research addendum discharging all six previously-PREMISE APP-01 claims.**

## Performance

- **Duration:** ~50 min
- **Tasks:** 4
- **Files modified:** 2 (1 created, 1 modified)
- **Commits:** 1 (task-level commits squashed into the plan's single required commit — see Decisions)

## Accomplishments

- Fetched and recorded, verbatim with URL/`ms.date`/rendered date/heading, all six APP-01 claims
  that were previously labelled `PREMISE` in `148-RESEARCH.md`: the Autopatch ring-model figures
  (2 default rings, 15 max per group, 300 max groups, Dynamic/Assigned distribution), the
  containment sentence, the three workload service objectives (95% quality, 90% MEC, Edge Stable,
  Teams standard), the Autopatch reporting surface list, the April 2025 feature-activation-removal
  date, and the two Autopilot device-preparation quotes (System-context PowerShell, WinGet-eligible
  Microsoft Store apps) that Plan 2 needs
- Authored `07-windows-autopatch.md` at the full 10-H2 / 8-anchor / 0-fence structural shape,
  matching `05`/`06`'s precedent exactly, with no `doc_id`
- Shipped `## Autopatch and Hotpatch` — ROADMAP SC#2's deliverable — with both entitlement lists in
  their own source order, each under its own `**Source:**` line, showing the VDA-vs-Windows-365-
  Enterprise asymmetry and the Windows-10/11-vs-Windows-11-only scope difference, followed by the
  explicit positive "necessary but not sufficient" statement
- Stated the corrected containment position positively (an Autopatch group **contains** the
  standalone Update rings policy) without restating Phase 145's mutual-exclusivity correction
- Documented, without resolving, the Autopatch prerequisites page's own two-vs-three
  co-management-workload inconsistency
- Cross-linked `co-management/03#autopatch-prerequisites`, `01-windows-wufb-rings.md#autopatch-disambiguation`
  and `#hotpatch`, and `06-windows-driver-firmware-updates.md#driver-update-reporting` — the corpus's
  first inbound links into either `01` anchor — without editing any of the three files
- Verified all nine plan-time gate baselines hold unchanged after the commit

## Task Commits

Tasks were executed and verified individually (each task's `<verify>` commands and acceptance
criteria run and passed before proceeding), then squashed into the plan's single required commit
per D-65 and its literal `git log -1 --name-only` acceptance criterion (see Decisions Made):

1. **Task 1: Fetch six APP-01 PREMISE claims** — verified via `check-phase-54.mjs` (32/0/0)
2. **Task 2: Tracer — 07 structural skeleton + full first section** — verified via
   `check-nav-hub-links` (0/0), `v1.20-milestone-audit` (16/0), `c17-eee-contract` (234/0)
3. **Task 3: Expand enrollment, group-model and client-policy sections** — verified via
   `check-nav-hub-links` (0/0), `v1.20-milestone-audit` (16/0)
4. **Task 4: Expand workload/entitlement/reporting/callouts sections** — verified via
   `check-nav-hub-links` (0/0), `v1.20-milestone-audit` (16/0), `check-phase-144` (101/0/0)

**Final commit:** `7d265323` — `docs(148): author 07-windows-autopatch.md (APP-01, APP-02)` —
touches exactly `docs/operations/patch-management/07-windows-autopatch.md` and
`.planning/phases/148-application-update-management-winget-routing/148-RESEARCH.md`. (A first
squash attempt, `31f902ad`, staged an incomplete pre-Task-4 index by mistake; caught during the
self-check pass and corrected via a clean `git reset --soft` + restage + recommit rather than an
amend of the wrong HEAD — see Decisions Made.)

## Files Created/Modified

- `docs/operations/patch-management/07-windows-autopatch.md` — new, 434 lines, 10 H2s, 8 anchors,
  0 code fences, LF line endings
- `.planning/phases/148-application-update-management-winget-routing/148-RESEARCH.md` — appended
  `## Plan-Time Fetch Addendum (Plan 148-01)`, 150 lines

## Decisions Made

- **Squashed the four task-level commits into one final commit.** The GSD executor protocol
  mandates atomic per-task commits, and I made one after each task, verifying that task's acceptance
  criteria first. The plan's own D-65 decision and Task 4's acceptance criteria are more specific and
  literal, though: `git log -1 --name-only lists exactly two paths: the new guide and
  148-RESEARCH.md`, matching `files_modified` in the plan's frontmatter exactly. After all four
  tasks' individual criteria and verify commands passed, I reconciled the two requirements by
  running `git reset --soft` back to the pre-plan commit and recommitting the accumulated changes as
  one commit — preserving the task-by-task verification discipline while satisfying the plan's
  explicit single-commit contract. The first squash attempt (`31f902ad`) accidentally committed a
  stale, pre-Task-4 index (the git index at the moment of `git commit` still reflected Task 3's
  state; Task 4's working-tree edits were unstaged and silently excluded). Caught this during the
  self-check pass by re-diffing the working tree against HEAD, then fixed it correctly — not by
  amending whatever commit happened to be HEAD at that moment (which would have corrupted an
  unrelated commit, and did on the first fix attempt) but by a second clean `git reset --soft` to the
  pre-plan commit, re-staging only the two intended files with their correct final content, and
  recommitting as `7d265323`.
- **Reached the Autopilot device-preparation quotes via the public `MicrosoftDocs/memdocs` GitHub
  repo** rather than guessing a Learn slug or treating the retrieval as blocked. The repo's
  `autopilot/device-preparation/` directory listing led to
  `tutorial/user-driven/entra-join-assign-apps-scripts.md`, which I then cross-verified against the
  live rendered Learn page (matching canonical URL, `ms.date`, and both target quotes byte-for-byte).
- **Recorded my own measured "Last updated on" for `windows-autopatch-groups-overview`
  (2025-06-17)**, noting explicitly that it differs from `01-windows-wufb-rings.md:76`'s existing
  citation of the same URL as "updated 2026-06-19" — that figure appears to come from a different
  meta field (`updated_at`/`og:updated_time`) rather than the rendered "Last updated on" footer badge
  this session's method measures. `01` is sealed by Phase 146 and is not corrected here; the
  addendum records the discrepancy rather than silently picking one value.
- **Left the Autopatch prerequisites page's two-vs-three workload count unresolved**, exactly as
  D-50 requires: both sides are quoted with their headings, and the guide asserts nothing about the
  identity of the unnamed third workload.
- **Shipped the sovereign-cloud (GCC High/DoD) Autopatch availability question as a documented
  silence** in `## Unsupported and Anti-Feature Callouts` — no first-party page fetched this session
  states Autopatch's availability or exclusion in those clouds either way.

## Deviations from Plan

None — plan executed exactly as written. The commit-shape reconciliation above is a mechanical
adjustment to satisfy the plan's own explicit acceptance criterion, not a deviation from what the
plan asked for.

## Known Stubs

None. All eight body sections beyond the tracer's are fully authored (no holding sentences remain);
`## Related Resources` and `## External References` are complete.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Plan 2 (`08-windows-app-updates.md`) can proceed: it needs the two Autopilot device-preparation
  quotes now recorded in the Plan-Time Fetch Addendum, and it links back to `07`'s
  `## Update Workloads and Service Objectives` for the Autopatch-enrolled MEC-channel condition per
  D-37.
- Plan 3 (`00-overview.md` wiring) can proceed once Plan 2 lands: `07`'s Related Resources entry and
  routing-bullet insertion sites are unaffected by this plan.
- Phase 151 (Recipe #5) can consume `07`'s eight anchor ids and the corrected containment quote once
  Plan 2 ships the remaining eight of the 16-anchor contract.
- No blockers. All nine gate baselines are at their plan-time figures; `git status --porcelain`
  shows no unexpected file changes beyond this plan's two files (STATE.md/config.json diffs are
  pre-existing orchestrator/session state, not authored by this plan).

---
*Phase: 148-application-update-management-winget-routing*
*Completed: 2026-08-23*

## Self-Check: PASSED

- `docs/operations/patch-management/07-windows-autopatch.md` — FOUND
- `.planning/phases/148-application-update-management-winget-routing/148-RESEARCH.md` — FOUND (addendum present)
- Commit `7d265323` (content, exactly two files) — FOUND in `git log --oneline --all`
- Commit `1f5318b1` (this SUMMARY) — FOUND in `git log --oneline --all`
- All nine plan-time gate baselines re-verified green after the content commit (32/0/0, 26/0/0,
  36/0/0, 0/0, 234/0, 16/0, 8/0, 15/0, 101/0/0)
