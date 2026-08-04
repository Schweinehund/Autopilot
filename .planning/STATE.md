---
gsd_state_version: 1.0
milestone: v1.19
milestone_name: "Device Configuration Recipes #3 & #4 (Windows Multi-App Kiosk + Android Dedicated)"
current_phase: 138
current_phase_name: V118 Pin + 17th Path-A Lineage Bump + Terminal Close
status: executing
stopped_at: Phase 138 context gathered
last_updated: "2026-08-04T05:01:04.761Z"
last_activity: 2026-08-03
last_activity_desc: Phase 137 complete, transitioned to Phase 138
progress:
  total_phases: 4
  completed_phases: 3
  total_plans: 12
  completed_plans: 6
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-07-25 — v1.19 milestone scoped)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base. v1.19 extends the v1.18 Device Recipe doc class with two more reproducible recipes — a Windows multi-app kiosk and an MHS multi-app Android dedicated device — each scoped as a *delta* over the corpus that already exists.
**Current focus:** Phase 138 — V118 Pin + 17th Path-A Lineage Bump + Terminal Close

> **PIPE-02 PRECONDITION — DISCHARGED 2026-08-03.** The owner's push landed as a plain fast-forward (`237158c5..042d6559`, 257 commits) plus the `v1.18` annotated tag. `origin/master` and local `master` are now 0/0. **Both back-anchor SHAs are confirmed reachable on `origin/master`:** V118 `7af8a147` and V117 `b56bba5`. No rebase/squash/force was used, so neither SHA is dangling.
>
> **HARN-14 recovery method, verified at discharge time.** The dual-token `git log --all --grep` method has a live false-positive: `--grep="close-gate" --grep="v1.18" --all-match` returns 5 commits with `1deb8412` FIRST, so a naive `-1` returns the wrong commit (it matches on the body). Even subject-line filtering on `v1.18` + `close-gate` returns 2. **The unique discriminator is the subject-line pair `<version>` + `MILESTONE CLOSE`:**
> ```
> git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.18/ && $2 ~ /MILESTONE CLOSE/'
> ```
> This resolves to exactly `7af8a14766d346a348f7adf05d260676dbe4c1b2` (count=1), and the same method regression-checks clean against V117 → `b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428`.
>
> The push also fires the deferred Axis-2 Linux-GHA cross-OS confirmation + GA-4 cascade disposition per `.planning/milestones/v1.18-MILESTONE-AUDIT.md` — check those runs before authoring the close-gate.

## Current Position

Phase: 138 — V118 Pin + 17th Path-A Lineage Bump + Terminal Close
Plan: Not started
Status: Ready to execute
Last activity: 2026-08-03 — Phase 137 complete, transitioned to Phase 138

## v1.19 Phase Dependency Summary

```
Phase 135 (Recipe #3 — Windows 11 Multi-App Kiosk)
  |       KIOSK-01, KIOSK-02, KIOSK-03, KIOSK-04, KIOSK-05, HYG-05
  |       DELIVERS:
  |         - docs/recipes/03-*.md: Autopilot enrollment -> kiosk account -> apps
  |             pre-installed -> AssignedAccessConfiguration XML authored ->
  |             pushed via Intune Custom profile (OMA-URI) to
  |             ./Vendor/MSFT/AssignedAccess/Configuration -> verification;
  |             single-app case is a one-line cross-link to recipe 01 Step 5a,
  |             never re-authored
  |         - Bounded worked XML field set (AllAppsList/AllowedApps,
  |             Taskbar/ShowTaskbar, minimal v5:StartPins, Win11 22H2 floor
  |             stated); BreakoutSequence/managed folders/v5:TaskbarLayout
  |             excluded on correctness grounds; 3-row namespace table with
  |             no asserted mismatch failure mode
  |         - Kiosk account model decision block + anti-feature table
  |             (CA/MFA hard-break, wrong-GUI trap, group-Configs-requires-
  |             AllAppList, nested UserGroup, hardcoded AUMID, Configuration-
  |             supersedes-KioskModeApp silent No-Op, SharedPC layering,
  |             AssignedAccess/Status not-a-verification-mechanism)
  |         - ## Rollback/Recovery section (named template divergence) +
  |             admin-executable Verification incl. secondary app flow +
  |             clean AssignedAccess Operational event log
  |         - HYG-05: EEE-SOP-standard.md fenced-content rationale corrected
  |             (empirically false claim at :462/:496-497, self-contradicted
  |             at :415) — rationale only, D-03/D-04 rules untouched
  |       HARD CONSTRAINTS:
  |         - FIRST phase of v1.19; zero edits to
  |             docs/recipes/01-shared-windows-avd-client.md — check-phase-
  |             130.mjs:64,67 pins its Step 5a/5b headings as literal strings
  |             against live HEAD inside every apex chain; A-LOCK-1/v1.18
  |             ROADMAP SC2 bars trimming the bodies
  |         - Plan-1 mechanism gate at PROJECT.md:17 already DISCHARGED by
  |             STACK.md:13-16 (GATE 1 CONFIRMED) — this phase records the
  |             discharge and re-cites fresh at authoring time; does NOT
  |             re-litigate the gate and gets no dedicated gate plan
  |         - HYG-05 validators (check-phase-114/120/129.mjs) assert content
  |             strings, not line coordinates — confirm before editing
  |       DISCUSS-PHASE FLAGS (resolve via /adversarial-review, NOT at
  |       roadmap):
  |         RE-224 XML presentation format (DOMINANT) — column-0 code fence
  |         vs. field-decomposition table+prose; must be ruled before Steps-
  |         section drafting, since fenced content in decision/branch bodies
  |         is barred by STD-05/C17 and no research file resolves this;
  |         ## Rollback/Recovery template-divergence disposition; E2's
  |         verification mechanism (event log vs. observable-behavior-only);
  |         Windows enrollment-path fork (self-deploying vs. user-driven);
  |         per-branch Windows edition floors (recent unification of Pro/
  |         Enterprise/Education/IoT floors — stale sources trap);
  |         first-lander precedent — this phase sets the delta-vs-anchor and
  |         branch-presentation convention Phase 136 inherits (v1.19 has no
  |         foundation phase to carry it, so the edge is explicit here)
  |
  v
Phase 136 (Recipe #4 — Android Dedicated, MHS Multi-App)
  |       MHS-01, MHS-02, MHS-03, MHS-04, MHS-05, HYG-06
  |       DELIVERS:
  |         - docs/recipes/04-*.md: the missing ## Steps/Verification/Anti-
  |             Feature scaffold 05-dedicated-devices.md structurally lacks,
  |             plus an inlined recipe-scoped MHS app-deployment step
  |             (concrete click-path, mirrors RE-222 Step 4 precedent);
  |             enrollment-profile deltas, token types, all 4 provisioning
  |             methods, Knox/Zero-Touch mutual exclusion, exit-PIN sync,
  |             Android 15 FRP all cross-linked, never re-authored
  |         - Case-1 irreversible token-type decision block (Standard vs.
  |             Entra SDM, SDM as routing cross-link only); second fork =
  |             four-way provisioning method + CRITICAL Knox/ZT exclusion;
  |             exit-PIN sync ships [MEDIUM: MS Q&A community], date-only
  |             refresh, never promoted
  |         - Case-2 sign-in-mode block (FALSE worked default / TRUE+Other /
  |             TRUE+Entra-ID-documented-default), anti-feature row anchored
  |             on the real first-party account-type-scoped negative; any
  |             [ASSUMED] note as a split blockquote per 01:101/01:103 idiom
  |         - Exit-lock-task hardening physically separated from sign-in
  |             section, silent no-op dependency verbatim as a "What breaks"
  |             callout, no unit stated for retry-delay, debug-menu setting
  |             demoted Step->Verification line
  |         - Unsupported/anti-feature set leads the recipe, each WITH
  |             reason: Notification-windows=Disable phrased conditionally,
  |             folders trimmed to uncontradicted user-capability half, plus
  |             exposed nav bypass / per-identity personalization impossible
  |             on Standard token / Wi-Fi and first-time Enterprise-network
  |             unavailable from inside MHS
  |         - HYG-06: 05-dedicated-devices.md facts RE-225 cross-links
  |             (token-type semantics 05:116-131, MHS Required-assignment
  |             05:143-153, exit-PIN two-policy locations 05:249-255)
  |             spot-verified against current Microsoft Learn BEFORE
  |             authoring depends on them
  |       HARD CONSTRAINTS:
  |         - No technical cross-dependency on Phase 135 (different
  |             platform); sequenced AFTER 135 per use_worktrees:false
  |             sequential-on-main-tree execution and the first-lander
  |             precedent set there
  |         - Zero line-shifting edits to docs/_glossary-android.md and
  |             docs/reference/android-capability-matrix.md (365 and 139 pin
  |             coordinates across 16 frozen sidecars). If unavoidable, a
  |             scoped CARVE-1 option (a) coordinate re-pin is the named
  |             budgeted contingency — never option (b), never discovered
  |             mid-execution
  |         - Any HYG-06 drift found must get an explicit landing spot (a
  |             named correction or a DEFERRED-CLEANUP entry, v1.18 HYG-04
  |             pattern) — never an unlogged drive-by edit to an Approved doc
  |       DISCUSS-PHASE FLAGS:
  |         RE-225 fork taxonomy ("Case-1b" PROJECT.md footer vs. "Case-2"
  |         FEATURES.md:127 — pick one, Case-1b is not a defined STD-05 case
  |         type); C17 #11 row budget (do surviving anti-feature rows merge
  |         into one settings table and cross the >25-data-row threshold);
  |         shared conceptual anchor (kiosk/dedicated taxonomy — where it can
  |         live given the pin minefield; folding into 4-platform-
  |         capability-comparison.md ruled out regardless); first-lander
  |         precedent (inherited from Phase 135's landing)
  |
  v
Phase 137 (Integration & Navigation-Last Close)
  |       CLASS-05, CLASS-06
  |       DELIVERS:
  |         - Both recipes: RE-NNN registry rows (IDs read at plan time,
  |             starting after RE-223), Status: Approved flip, regenerated
  |             (never hand-edited) filename-map.md
  |         - build-filename-map.mjs --self-test row-count drift-canary
  |             bumped 223 -> 225 in the SAME commit as the regeneration
  |             (named deliverable, not a post-close audit finding)
  |         - docs/index.md recipes table AND the prose quick-nav bullet
  |             near line 38, same commit (closes the WR-01/Phase-132
  |             defect pattern via a new validator needle asserting both)
  |         - Explicit recorded ruling on the troubleshooting-hub
  |             disposition (V-132-HUBSNOTWIRED re-confirmed or revised,
  |             given kiosk-lockout/MHS exit-PIN-lockout are more
  |             L1-adjacent than AVD/iPad were) — not a silent carry-forward
  |         - Full-corpus C17 green; link-checker 0/0
  |       HARD CONSTRAINTS:
  |         - BLOCKED on Phase 135 AND Phase 136 — both recipes must be
  |             content-complete and C17-clean first (CLOSE-AFTER-CONTENT,
  |             navigation-last discipline)
  |         - Nav commits must post-date content commits (verified via git
  |             history at close)
  |       DISCUSS-PHASE FLAGS: none dominant — hubs-not-wired disposition is
  |         a named ruling task at this phase, not an open design question
  |
  v
Phase 138 (V118 Pin + 17th Path-A Lineage Bump + Terminal Close)
          HARN-14, HARN-15, HARN-16
          SOLE DELIVERABLE CLUSTER OF THIS PHASE — never batches with
            content (mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15
            Phase 119 / v1.16 Phase 125 / v1.17 Phase 128 / v1.18 Phase 134
            exactly)
          DELIVERS:

            - HARN-14: _lib/frozen-at-close.mjs V118 entry (v1.18 close-gate
              SHA 7af8a147, positively confirmed reachable post-push via
              dual-token grep, SUBJECT LINE verified per the v1.17
              false-positive caveat) + readAtV118Close export — only after
              the owner's plain push has landed

            - HARN-15: v1.19-milestone-audit.mjs (Path-A from v1.18, C1-C17
              inherited) + v1.19-audit-allowlist.json + BASELINE_23 +
              check-phase-135..138.mjs (apex extends [48..137],
              INDEPENDENTLY DERIVED, not copied from Phase 134) + 16th
              parallel CI coexistence workflow; predecessor frozen surfaces
              BYTE-UNCHANGED, CHAIN_SKIP empty; full predecessor chain run
              BEFORE authoring the close-gate per
              LATENT-NON-FROZEN-AWARE-CONTENT-ASSERTION-01

            - HARN-16: 3-axis terminal re-audit (fresh git clone
              --no-hardlinks + cross-OS Linux GHA authoritative for both
              chain validators + fresh zero-context reproduction; cross-OS
              PASS/FAIL/SKIP EXACT MATCH) + publish bundle regenerated
              --version=v1.19 under the Stop-hook gate (both new recipes
              pandoc-convertible, guard-docx.mjs-clean) + SINGLE close-gate
              commit flipping all 17 v1.19 requirements to Validated across
              PROJECT/ROADMAP/STATE/REQUIREMENTS + v1.19-MILESTONE-AUDIT.md

              + v1.19-DEFERRED-CLEANUP.md
          HARD CONSTRAINTS:

            - BLOCKED on Phase 137 — all content + integration work
              complete and green before the closing lineage bump + re-audit

            - BLOCKED on the owner's PIPE-02 push landing on origin/master —
              hard go/no-go precondition, not a soft assumption; the v1.18
              close-gate SHA has no valid target until then

            - Apex extends to [48..137], INDEPENDENTLY DERIVED — do NOT
              copy Phase 134's array forward unaudited

            - WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 deepens to [48..137]; Linux
              GHA BOTH chain validators remain authoritative (D-03 OS split
              unchanged)

            - V119 pin (freezing the v1.19 corpus) is explicitly OUT OF
              SCOPE — back-anchor circularity, the successor milestone's
              job (V119-PIN-DEFERRAL recorded at this close)
          DISCUSS-PHASE FLAG: none (closing cluster; consumes prior
            decisions)
```

## v1.19 Requirement Coverage (17/17 mapped — Pending, roadmap created 2026-07-28)

| Phase | Requirements | Count |
|-------|-------------|-------|
| 135 | KIOSK-01, KIOSK-02, KIOSK-03, KIOSK-04, KIOSK-05, HYG-05 | 6 |
| 136 | MHS-01, MHS-02, MHS-03, MHS-04, MHS-05, HYG-06 | 6 |
| 137 | CLASS-05, CLASS-06 | 2 |
| 138 | HARN-14, HARN-15, HARN-16 | 3 |
| **Total** | **17/17 mapped (0 orphaned)** | **17** |

**Sequential-on-main-tree execution** per `.planning/config.json` `use_worktrees:false` (durable per memory `project_execphase_sequential.md`). Phase numbering continues from v1.18 (closed at Phase 134) → v1.19 starts at Phase 135.

**Named decisions (LOCKED at roadmap 2026-07-28):**

- PHASE-COUNT: 4 phases (135-138), pre-determined by adversarial review recorded in REQUIREMENTS.md's Traceability table — not re-derived here. Derived from natural delivery boundaries: two content-parallel-but-sequential recipes (135, 136) → integration/nav close (137) → mandatory harness close (138). Between v1.17 (3 phases) and v1.18 (6 phases) in scope.
- CONTENT-FIRST-NO-FOUNDATION: unlike v1.18 (which needed a doc-class foundation phase before either recipe), v1.19 has NO foundation phase — the Device Recipe doc class + template already exist from v1.18 Phase 129. Both recipes inherit that template directly; the first-lander precedent gray area (Phase 135 sets the delta-vs-anchor/branch-presentation convention Phase 136 inherits) exists precisely because there is no foundation phase to carry it explicitly.
- RECIPE-ORDER: Windows kiosk (135) sequenced before Android MHS (136) — no cross-dependency exists (different platforms, architecture research confirms zero mutual dependency), order follows requirements-doc listing order and the roadmap-brief-mandated sequencing; parallelizable in principle, sequential in practice per `use_worktrees:false`.
- HYG-05-FOLD / HYG-06-FOLD: HYG-05 (EEE-SOP-standard.md fenced-content rationale fix) lands WITH the Windows kiosk recipe in Phase 135 because RE-224's own XML-presentation-format gray area is what surfaces the rationale defect; HYG-06 (anchor spot-verification) lands WITH the Android recipe in Phase 136 as Plan 1, since RE-225's decision points directly depend on the facts being verified — mirrors the v1.18 HYG-04-FOLD precedent (fold a hygiene fix into the content phase that actually depends on it, scoping the reconciliation exactly once).
- CLOSE-AFTER-CONTENT: Phase 137 (integration/nav) is BLOCKED on BOTH 135 and 136 — registry-status-flip and nav wiring are terminal, content-gated steps by convention (navigation-last discipline), never interleaved mid-authoring.
- NO-TOOLING-PILLAR: unlike v1.18, v1.19 carries no dedicated tooling-debt phase — CARVE-1/FROZEN-AWARE-ADOPTION-SWEEP-01 is explicitly OUT (barred verbatim by its own routing, requires its own dedicated tooling milestone) and no other tooling debt is in scope this milestone.
- HARNESS-PHASE: Phase 138 is the sole deliverable of the closing cluster — the harness lineage bump NEVER batches with content work (mirrors v1.13 Phase 100 / v1.14 Phase 112 / v1.15 Phase 119 / v1.16 Phase 125 / v1.17 Phase 128 / v1.18 Phase 134).
- V118-PIN-MANDATORY-AND-GATED: Phase 138 adds the `V118` frozen-at-close pin (v1.18 close-gate SHA `7af8a147`) — the mandatory back-anchor invariant — but this is explicitly BLOCKED on the owner's PIPE-02 push landing first, since the SHA is currently unreachable on any remote. This is a hard go/no-go gate recorded in the phase, not a soft assumption.
- HARNESS-LINEAGE: 17th Path-A milestone (v1.4→v1.19); BASELINE_23; V118 pin; 16th CI workflow; CHAIN_PHASES=[48..137] (continuing the [48..N-1] invariant, independently derived — not copied from Phase 134's array — exact entry count confirmed at close-gate).
- DISCUSS-PHASE-FLAGS: the 9 gray-area flags from REQUIREMENTS.md are NOT resolved at roadmap — deferred to `/gsd-discuss-phase` + `/adversarial-review` per project convention. Dominant: RE-224 XML presentation format at Phase 135. Also at Phase 135: `## Rollback/Recovery` template divergence, E2 verification mechanism, Windows enrollment-path fork, per-branch edition floors. At Phase 136: RE-225 fork taxonomy, C17 #11 row budget. Cross-cutting both content phases: shared conceptual anchor, first-lander precedent.

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24
- v1.4.1: 5 phases, 33 plans — shipped 2026-04-25
- v1.5: 14 phases, 101 plans — shipped 2026-05-07
- v1.6: 5 phases (62-66), 30 plans — shipped 2026-05-25
- v1.7: 4 phases (67-70), 15 plans — shipped 2026-05-29
- v1.8: 4 phases (71-74), 13 plans — shipped 2026-06-08
- v1.9: 8 phases (75-82), 19 plans — shipped 2026-06-22
- v1.10: 6 phases (83-88), 16 plans — shipped 2026-06-24
- v1.11: 5 phases (89-93), 13 plans — shipped 2026-06-26
- v1.12: 2 phases (94-95), 5 plans — shipped 2026-06-26
- v1.13: 5 phases (96-100), 14 plans — shipped 2026-06-29
- v1.14: 12 phases (101-112), 38 plans — shipped 2026-07-02
- v1.15: 7 phases (113-119), 40 plans — shipped 2026-07-06
- v1.16: 6 phases (120-125), 38 plans — shipped 2026-07-10
- v1.17: 3 phases (126-128), 11 plans — shipped 2026-07-11
- v1.18: 6 phases (129-134), 17 plans — shipped 2026-07-20
- v1.19: 4 phases (135-138) — in progress

**Per-Plan Metrics:**

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 135 P01 | 12min | 3 tasks | 6 files |
| Phase 135 P02 | 38min | 4 tasks | 1 files |
| Phase 136 P01 | 45min | 3 tasks | 2 files |
| Phase 136 P02 | 55min | 4 tasks | 1 files |
| Phase 137 P01 | 4min | 4 tasks | 9 files |
| Phase 137 P02 | 4min | 3 tasks | 2 files |

## Accumulated Context

### Decisions

**v1.19 roadmap decisions (LOCKED 2026-07-28):** see "Named decisions" above.

**Carried-forward durable architectural decisions (from v1.14–v1.18):**

- Sequential-on-main-tree per `use_worktrees:false`; atomic harness commits (Atom 1 + Atom 2); frozen-aware via `_lib/frozen-at-close.mjs`; non-current-milestone predecessor frozen surfaces BYTE-UNCHANGED except explicitly-scoped exceptions (D-00a doctrine)
- WINDOWS-CLONE-DEEPNEST-TIMEOUT-01: Linux GHA BOTH chain validators authoritative (D-03 corrected OS split, held v1.12–v1.18); depth deepens each milestone, now heading to `[48..137]`
- Adversarial-review invoked at discuss-phase for gray-area scoping decisions (per user memory `feedback_adversarial_review_preference.md`)
- V117 pin recovery precedent (carries to V118): recover the close-gate SHA via the dual-token positive-confirmation `git log --all --grep` method, with the returned commit's SUBJECT LINE verified to carry both tokens (not `-1` trusted blindly) per the v1.17 false-positive caveat, re-confirmed at v1.18's own close
- Registry -> filename-map -> publish-bundle pipeline (v1.15-v1.18) is unchanged and generic — Phase 137's only pipeline edits are the two registry-row-count drift canaries (`build-filename-map.mjs` 223 -> 225 and `build-publish-bundle.mjs` 221 -> 225), which are named CLASS-05 deliverables
- A later check-phase-N validator can pin an earlier check-phase's EXACT call-site string verbatim — grep before editing any frozen validator line (memory `reference_frozen_callsite_pinning.md`, surfaced at v1.18 Phase 133)
- Archival-drift close blocker: `complete-milestone` archiving `.planning/phases/NNN/` can break predecessor check-phase validators reading hardcoded `phases/` paths — scan nested-fail children pre-push at Phase 138's close-gate (recurs every close per memory `reference_archival_drift_close_blocker.md`)
- A deferral from phase A to phase B needs an explicit landing spot IN phase B's scope, or it evaporates — the milestone's own #1 recurring lesson, directly governing HYG-06's Plan-1 gating and CLASS-05's canary-bump-same-commit requirement
- complete-milestone on THIS repo must NOT `git rm REQUIREMENTS.md` — check-phase-54 live-reads it; deferred owner push means deletion breaks Axis-2 GHA apex (memory `reference_complete_milestone_keep_requirements.md`)

*(Full v1.0–v1.18 execution-decision logs are archived in `.planning/milestones/vX.Y-MILESTONE-AUDIT.md` and `.planning/MILESTONES.md`.)*

- [Phase 135]: HYG-05 corrected at all three sites (including additive D-07 site); RE-224 slug/H1 ruled in Plan 135-01 for Plan 135-02/Phase 137 to inherit
- [Phase 135]: D8.2: Operational-channel enable-before-first-sign-in precondition landed as appends to 4 research sites (augment, not substitute); FEATURES.md/REQUIREMENTS.md GPO-name and namespace-alias defects corrected
- [Phase 135]: Phase 135 D3.1 ratified augment-not-substitute: RE-224 Verification retains ROADMAP SC5's clean AssignedAccess > Operational line verbatim and ADDS the enable-before-first-kiosk-sign-in precondition plus Admin-channel Event 31000
- [Phase 135]: RE-224 ships the worked payload on BOTH surfaces (one column-0 xml fence + a 22-row decomposition table) — the corpus payload-artifact convention Phase 136 inherits, minus the CDATA-JSON tension which is native to RE-224
- [Phase 136]: Phase 136 Plan 1: HYG-06 NO DRIFT (all clusters); Ruling A takes 05:253 branch (exit_lock_task_mode_code ships in Plan 2's fence with placeholder); Ruling B CLOSED (sibling key max_number_of_attempts_for_session_PIN sourced); STACK.md:55 corrected in-flight; RE-225 shell C17-clean at 234 files
- [Phase 136]: Phase 136 Plan 2: RE-225 body authored — closure-table counts hold exactly (8 H2/6 Step/5 Ask/6 Breaks/9 anti-feature rows/10 decomposition rows/7 Verification/1 json fence); D2.9a window closed via callout-plus-failures-row; M-A OEMConfig disposition landed as a Step-5 lead-in sentence, not a row; offline-allow-list Rollback bullet dropped (uncited); D0.1 satisfied by exactly one MEDIUM host sentence in Step 6; full-corpus C17 green at 234 files
- [Phase ?]: D-24 pre-flight ran BEFORE the flip and passed clean on both recipes on the first attempt (RE-225's JSON fence included) - no remediation round needed
- [Phase ?]: Commit B bundled registry rows + regen + BOTH canary bumps as one atom (D-15) per the FILENAME-MAP-SELFTEST-DRIFT lesson
- [Phase ?]: build-publish-bundle.mjs's canary was already RED at HEAD (14 passed/1 failed, rows.length=223 vs expected 221) - known pre-existing drift this plan closed, not a regression
- [Phase ?]: Both index.md surfaces (table rows + line-38 bullet) landed in one commit (Commit C, b694254f) to close the WR-01 defect class that recurred at Phase 132
- [Phase ?]: Hubs stay NOT-wired; the v1.18 hub-enforcement regex's false-coverage claim (REQUIREMENTS.md:31) is corrected on the record (D-02), not silently carried forward
- [Phase ?]: check-phase-137.mjs is NOT authored this phase; the needle-spec is handed to Phase 138 (D-18), appended to STATE.md's existing Plan-Time Research Flags block rather than a parallel entry

### Plan-Time Research Flags (not blockers — resolve at each phase's plan time)

- Phase 136 (MHS-02): actively re-search the MHS exit-PIN dual-policy synchronization requirement during authoring in case a first-party source surfaces that this research pass missed; if not found, ship `[MEDIUM]` as-is, never silently promoted
- Phase 136 (HYG-06/MHS-01): spot-verify specific `05-dedicated-devices.md` facts RE-225's decision points depend on against current Learn before Plan 2 authoring begins, given the anchor doc is past its own `review_by` date (33+ days)
- Phase 138 (HARN-14): recover the V118 SHA via the dual-token positive-confirmation `git log --all --grep` method; explicitly verify the SUBJECT LINE (not just `-1` output) carries both tokens per the v1.17 false-positive caveat; do not attempt before the owner's push has landed
- Phase 138 (HARN-15): run the FULL predecessor chain BEFORE authoring the close-gate (not just the immediate apexes); independently derive the exact CHAIN_PHASES entry count for `[48..137]` rather than copying Phase 134's array forward. Run the apex with **no competing load** — a concurrent local sweep flaked `CHAIN-99` once. Do NOT inherit v1.18's "non-nested chain 0-FAIL" phrasing; it is not reproducible at that tag.
- Phase 138 (HARN-16) — **AXIS-2 AND THE GA-4 CASCADE DISPOSITION ARE ALREADY DISCHARGED, 2026-08-04, with evidence.** After the PIPE-02 push, all 15 `audit-harness-*` workflows were re-dispatched against current `master` via `workflow_dispatch` (they trigger on `pull_request` + weekly schedule only — a push to master does NOT fire them).
  - **Axis-2 (Linux GHA, sole cross-OS-authoritative axis per D-03): GREEN.** `audit-harness-v1.18-integrity.yml` run `30872644813` = **12/12 jobs pass**, including `chain-apex check-phase-134.mjs (recursively spawns 48..133)`. This matches the local Windows apex result (89 PASS / 0 FAIL), so the cross-OS PASS/FAIL/SKIP exact-match requirement holds.
  - **Cascade baseline: 7 PASS / 10 FAIL.** GREEN = v1.14, v1.15, v1.16, v1.17, v1.18. RED = base harness + v1.5–v1.13.
  - **GA-4 disposition = `ACCEPTED-STANDALONE-CI-RED`, all three conditions verified by job-level inspection:** every one of the 10 red runs has **exactly one** failed job, that job is a *harness replay / milestone audit harness* job, and **CHAIN failures are ZERO across all 10**. The current-milestone run (v1.18) is green. Record this as confirmed, not assumed.
  - ⚠ The 11:17Z scheduled runs that day showed v1.16 failing on *chain* jobs (`check-phase-125` apex, `check-phase-124`, `Validator chain on Linux LF`) — that was an artifact of the remote being 257 commits stale. Re-dispatched against current master, v1.16 is 12/12 green. Do not cite the pre-push scheduled runs as evidence of anything.
- Phase 138 (HARN-15/check-phase-137.mjs needle-spec handoff, per 137-CONTEXT D-18/D-19/D-20/D-21): the leaf validator carries a per-recipe, LINE-SCOPED co-presence invariant — extract the single `docs/index.md` table row line and the single `^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)` bullet line and test each in isolation, NEVER a whole-file `c.includes()` (a whole-file `includes('Dedicated')` would false-match `index.md:36` two lines above the bullet, plus other sites). Literals, as shipped by 137-02: table targets `recipes/03-windows-11-multi-app-kiosk.md` and `recipes/04-android-dedicated-mhs-multi-app.md`; bullet fragments `Windows 11 multi-app kiosk` and `Android Dedicated multi-app kiosk`. Also requires a hubs-not-wired assertion using the CORRECTED literals `recipes/03-` and `recipes/04-` — `check-phase-132.mjs:97`'s own pattern does not cover them and must not be edited (v1.18 frozen surface). The needle is buildable only because the bullet-side literals were fixed at CONTEXT ruling time (D-07), never composed at execution time. Full measured actuals recorded in `137-02-SUMMARY.md`'s "Needle-spec handoff" section.

### Pending Todos

- At Phase 136 plan time: run Plan 1 (anchor spot-verification + landing-spot decisions for every cut element) before Plan 2 authoring; resolve the RE-225 fork-taxonomy naming and the C17 #11 row-budget question via `/adversarial-review`
- At Phase 136 plan time: consume Phase 135's D6.1 first-lander handoff table (`135-02-SUMMARY.md`) — items (a)(b)(c)(e) INHERIT, (d) inherits the fence convention but NOT the CDATA-JSON tension, (f)(g) are named non-inheritances Phase 136 rules for itself. Do not re-litigate D4.2's three grounds for a Case-1 block with a routing-cross-link arm
- At Phase 136: gray area #8 (shared conceptual anchor / kiosk-dedicated taxonomy) is still chartered here — Phase 135 ruled the taxonomy sentence for RE-224's own Scope banner only and deliberately did not duplicate it into RE-225
- At Phase 137 plan time: confirm the hubs-not-wired disposition is recorded as an explicit ruling (not silently carried forward), reassessing given kiosk-lockout/MHS-lockout's higher L1-adjacency than AVD/iPad
- At Phase 138 plan time: verify the owner's PIPE-02 push has landed on `origin/master` BEFORE beginning any V118-pin work; confirm V118 SHA via positive-confirmation grep (subject-line verified); run the FULL predecessor chain before authoring the close-gate

### Blockers/Concerns

At roadmap stage. Execution-time watch items (not blockers unless noted — address within specified phases):

- **HARD BLOCKER, Phase 138 only:** the owner's PIPE-02 push of the v1.18 close-gate + tag must land on `origin/master` before any V118-pin work begins — Phases 135-137 are NOT blocked by this and can proceed independently
- Phases 136-138: the recipe-01 zero-edit guard still applies corpus-wide — `check-phase-130.mjs:64,67` pins `docs/recipes/01-shared-windows-avd-client.md`'s Step 5a/5b headings as literal strings inside every apex chain; any corpus-wide text operation must verify it doesn't touch this file indirectly (held clean through Phase 135)
- Phase 136: zero line-shifting edits to `docs/_glossary-android.md` / `docs/reference/android-capability-matrix.md` — 365 and 139 pin coordinates across 16 frozen sidecars; CARVE-1 option (a) coordinate re-pin is the only licensed remedy if unavoidable
- Phase 136: `05-dedicated-devices.md` is 33+ days past its `review_by` date — any drift found must get a named landing spot (requirement or DEFERRED-CLEANUP entry), never an unlogged drive-by edit to an Approved doc
- Phase 137: the `build-filename-map.mjs --self-test` canary bump (223→225) must land in the SAME commit as the filename-map regeneration, and the `index.md` table + line-38 quick-nav bullet must land in the SAME commit — both are named deliverables per the WR-01 recurrence risk, not implicit side effects
- Phase 138: apex extends to `[48..137]`, independently derived — do NOT copy Phase 134's `['v1.18-phases']`-style array forward unaudited; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 deepens again; V119 pin is explicitly out of scope (successor milestone's job)

## Session Continuity

Last session: 2026-08-04T04:16:25.074Z
Stopped at: Phase 138 context gathered
Resume file: .planning/phases/138-v118-pin-17th-path-a-lineage-bump-terminal-close/138-CONTEXT.md
Next action: Run verification/UAT on Phase 136 (both plans complete, RE-225 body C17-green at 234 files); then transition to Phase 137 (Integration & Navigation-Last Close).

## Operator Next Steps

- Verify Phase 136 (RE-225 recipe body complete, closure-table counts hold exactly per `136-02-SUMMARY.md`); then advance to Phase 137
- Push the v1.18 close-gate commit + `v1.18` tag (owner PIPE-02) at some point before Phase 138 begins — not blocking Phases 136-137

## Performance Metrics

| Phase | Plan | Duration | Notes |
|-------|------|----------|-------|
| Phase 135 P01 | 12min | 3 tasks | 6 files (HYG-05 + D8.2 appends + RE-224 identity) |
| Phase 135 P02 | 38min | 3 tasks + 1 checkpoint | 1 file (RE-224 body, 20→328 lines) |
| Phase 129 P01 | 25min | 2 tasks | 2 files |
| Phase 129 P02 | 20min | 1 tasks | 1 files |
| Phase 130 P01 | 15min | 2 tasks | 1 files |
| Phase 130 P02 | 45min | 3 tasks | 1 files |
| Phase 131 P01 | 35min | 2 tasks | 1 files |
| Phase 131 P02 | 25min | 2 tasks | 2 files |
| Phase 132 P01 | 3min | 2 tasks | 4 files |
| Phase 132 P02 | 6min | 2 tasks | 1 files |
| Phase 133 P01 | 15min | 2 tasks | 1 files |
| Phase 133 P03 | 12min | 2 tasks | 1 files |
| Phase 133 P04 | 8min | 2 tasks | 3 files |
| Phase 133 P02 | 45min | 2 tasks | 14 files |
| Phase 134 P01 | 3min | 2 tasks | 1 files |
| Phase 134 P02 | 8min | 2 tasks | 3 files |
| Phase 134 P03 | 25min | 2 tasks | 7 files |
| Phase 134 P04 | 12min | 2 tasks | 1 files |
| Phase 134 P05 | ~20min | 2 tasks | 7 files |
