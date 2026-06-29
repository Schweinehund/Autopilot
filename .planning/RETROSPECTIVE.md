# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.2 — Cross-Platform Provisioning & Operational Gaps

**Shipped:** 2026-04-15
**Phases:** 6 | **Plans:** 20

### What Was Built
- Cross-platform foundation (taxonomy, glossary, templates, platform selector) enabling Windows + macOS parity
- Windows operational completeness: 14 reference docs covering device lifecycle, infrastructure, security, migration, monitoring
- macOS ADE documentation suite: lifecycle narrative, 8 admin setup guides, capability matrix
- macOS troubleshooting: triage decision tree, 6 L1 runbooks, 4 L2 investigation runbooks
- Cross-platform navigation integration with platform selectors, quick-reference cards, and 44-file reachability audit

### What Worked
- **Foundation-first approach** — Phase 20 (glossary, taxonomy, templates) before any platform content prevented terminology drift and enabled consistent patterns across 40+ new files
- **Parallel phase execution** — Phases 21 (Windows) and 22 (macOS) had zero cross-dependencies, enabling concurrent work
- **Template-driven consistency** — macOS admin template with dual-portal structure produced uniform guides across ABM, enrollment, config profiles, app deployment, and compliance
- **Proven L1/L2 patterns** — The tiered runbook pattern from v1.0/v1.1 transferred directly to macOS with minimal adaptation
- **Navigation-last strategy** — Writing content before navigation links (Phase 25 last) eliminated broken-link churn

### What Was Inefficient
- **Phase 21 verification gap** — Largest phase (18 requirements, 6 plans) was executed without formal VERIFICATION.md, requiring retroactive validation during milestone audit
- **Phase 24 verification gap** — Same issue; both phases missing verification caused `gaps_found` audit status that was actually just process debt
- **REQUIREMENTS.md traceability stale** — All 38 checkboxes remained unchecked throughout execution; traceability table was never updated during plan execution
- **SUMMARY.md frontmatter inconsistency** — Most SUMMARY files didn't populate `requirements_completed` field, weakening the 3-source cross-reference during audit
- **One unresolved TBD survived** — `ca-enrollment-timing.md` had a `TBD - Phase 23` link that wasn't caught until milestone audit; Phase 21 Plan 06 (navigation) should have flagged it

### Patterns Established
- **Platform frontmatter taxonomy** — `platform: Windows | macOS | all` field in all templates, defaulting to Windows for existing docs
- **Dual-portal admin guide structure** — macOS guides use `#### In Apple Business Manager` / `#### In Intune admin center` sub-sections
- **Cross-reference banners in shared categories** — When a symptom category applies to both platforms, add a `> **macOS:**` / `> **Windows:**` banner pointing to the other platform's section
- **Configuration-Caused Failures table** — Consolidated reverse-lookup for admin misconfigurations, proven in v1.1 Windows guides and now in v1.2 macOS guides

### Key Lessons
1. **Verification must happen during execution, not retroactively.** Phase 21 and 24 skipping verification created 22 "partial" requirements in the audit that were actually complete — pure process overhead to resolve.
2. **TBD forward references need a tracking mechanism.** A single stale TBD survived across 3 phases because there was no systematic scan. Add `grep -r "TBD"` to the post-execution checklist.
3. **Requirements traceability updates should be part of the commit workflow**, not deferred to milestone audit. The traceability table was stale from day one.
4. **Foundation phases pay for themselves.** The 3-plan Phase 20 investment (glossary, taxonomy, templates) prevented terminology drift across 40+ files and eliminated rework.

### Cost Observations
- Model mix: ~60% sonnet (execution agents), ~30% opus (planning, verification), ~10% haiku (quick checks)
- Notable: Phase 21 was the largest single phase (6 plans, 19 files) but executed cleanly due to well-decomposed plan structure

---

## Milestone: v1.3 — iOS/iPadOS Provisioning Documentation

**Shipped:** 2026-04-19
**Phases:** 8 (26-33) | **Plans:** 44

### What Was Built
- iOS/iPadOS enrollment framework: 4-path overview (ADE, Device Enrollment, User Enrollment, MAM-WE), supervision axis, 7-stage ADE lifecycle
- iOS admin setup suite: APNs / ABM-ADE token / ADE enrollment profile, configuration profiles, app deployment, compliance policy — all with per-setting 🔒 supervised-only callouts
- iOS BYOD & MAM: Device Enrollment (Company Portal + web-based), account-driven User Enrollment with 7 privacy-limit callouts, standalone MAM-WE app protection guide
- iOS L1 triage: Mermaid decision tree + 6 L1 scenario runbooks (APNs/ADE/restrictions/license/cap/compliance) with D-10 actor-boundary sections and D-12 escalation packets
- iOS L2 investigation: 4 L2 runbooks (log collection, ADE token, app install, compliance/CA timing) using iOS-native methods (Mac+cable sysdiagnose, AssistiveTouch sysdiagnose)
- Cross-platform navigation integration: iOS sections in hub index, common issues, quick-ref cards, capability matrix
- Phase 33 gap closure: I-1 anchor fix, I-2 71-placeholder retrofit across 9 admin-setup files, 30-VERIFICATION.md, milestone re-audit flip (gaps_found → passed)

### What Worked
- **Cross-phase execution with credit preservation** — Phase 33 executed pre-authored Phase 30 plans (30-09, 30-10) while keeping commit scope `docs(30):` per D-20; 30-VERIFICATION.md was produced in phase 30's directory so verification credit accrued correctly.
- **Pre-authored plans for predictable deferred execution** — 30-09 (71-row placeholder retrofit) was fully enumerated at plan time; phase 33's execution was pure delegation with zero re-derivation. Retrofit fidelity was 100% per manual spot-check.
- **Per-row judgment locked in plans, not agents** — D-17 decision fixed per-row target runbooks at plan time; executor was a pure mapper. Eliminated the "creative retrofit" failure mode.
- **Validator scripts as phase deliverables** — check-phase-30.mjs and check-phase-31.mjs shipped alongside content. Final validation gate ran in ~0.2 seconds.
- **3-source verification matrix pattern** — 30-VERIFICATION.md cross-references PLAN / SUMMARY / codebase evidence for each must_have truth. Made human sign-off a quick structural read rather than deep re-verification.
- **Milestone audit before complete** — Running `/gsd-audit-milestone v1.3` surfaced I-1 + I-2 + L1TS verification debt, enabling a focused 4-plan gap closure phase rather than a broad retroactive fix cycle.

### What Was Inefficient
- **Worktree shell drift on Windows** — Agent tool with `isolation="worktree"` traversed the orchestrator shell's pwd into the worktree; had to `cd /d/claude/Autopilot` before each main-side commit. Non-fatal but required vigilance.
- **gsd-tools audit-open CLI broken** — `ReferenceError: output is not defined` in gsd-tools.cjs. Had to do pre-close open-artifact audit manually.
- **MILESTONES.md auto-accomplishments garbage** — CLI-extracted one-liners pulled random fragments ("One-liner:", "File:") instead of curated summaries. Required manual rewrite.
- **ROADMAP.md Phase Details section not auto-pruned** — CLI archived the file but didn't reorganize; AI had to collapse v1.3 phases into `<details>` and delete the 144-line Phase Details block manually.
- **REVIEW status not auto-flipped on REVIEW-FIX completion** — Phase 28 had REVIEW-FIX from 2026-04-16 but 28-REVIEW.md status was still `issues_found` for 3 days. Lifecycle contract missing.
- **Stale milestone bullet warning** — 33-REVIEW flagged the `[ ]`/`(in progress)` milestone header line 3 days before close. It was expected to auto-resolve at milestone close but still required manual verification.

### Patterns Established
- **Gap-closure phases with 4-plan shape** — (1) inline fix, (2) execute pre-authored plan from earlier phase, (3) final validation gate + human checkpoint, (4) verification doc + re-audit. Clean shape for milestone-audit-driven closure work.
- **Cross-phase execution traceability** — When phase N executes phase M's pre-authored plan, keep commit scope `docs(M):` for historical continuity, but link via SUMMARY frontmatter and VERIFICATION re-audit entry.
- **Retrospective REVIEW status hygiene** — Flip REVIEW.md `status: issues_found` → `clean` / `accepted` at the end of each REVIEW-FIX cycle. Uncompleted lifecycle creates false audit debt.
- **Human-verify checkpoints via `AskUserQuestion`** — Single-question 3-option format (approved / remediation / scope-adjustment) produces a reliable resume-signal for the continuation agent.

### Key Lessons
1. **Milestone audits catch what verification misses.** Phase 30 completed all plans except 09/10 (pre-authored but never executed under phase 30). Only the milestone-level audit surfaced this as L1TS-01/02 verification debt. Without the audit, v1.3 would have shipped with silent requirements gaps.
2. **Worktree parallelism has Windows quirks.** `.git/config.lock` contention on simultaneous worktree creation forced sequential dispatch (even with `run_in_background: true`). Agent completion returned shell pwd into the worktree itself. Factor both into orchestrator flow.
3. **Pre-authored plans survive gap-closure cycles.** Phase 30-09 enumeration locked per-row targets; phase 33 executed it 3 days later with zero fidelity loss. Counter to the "stale plans rot" instinct — plans with explicit truth tables are durable.
4. **Documentation gap-closure can exceed initial feature work in commit volume.** v1.3 Phase 33 (gap closure) produced ~25 commits (more than some entire phases). Budget for close-out explicitly, not as a rounding-error.

### Cost Observations
- Model mix: ~55% sonnet (execution agents, REVIEW-FIX sweep), ~35% opus (planning, verification, orchestrator), ~10% haiku (N/A — not used this milestone)
- Sessions: ~12 major sessions across 4 days
- Notable: The pre-close REVIEW-FIX sweep (5 phases in ~30 min via parallel worktrees) was unexpectedly productive. Most findings were either obsolete (resolved by later phases) or accepted-as-tech-debt with clear rationale.

---

## Milestone: v1.4 — Android Enterprise Enrollment Documentation

**Shipped:** 2026-04-24
**Phases:** 9 (34-42) | **Plans:** 40

> Note: This entry was added retroactively during the v1.4.1 milestone close. The v1.4 close itself was incomplete — phases were deleted from the working tree but never moved into `milestones/v1.4-phases/`, and archive files (ROADMAP/REQUIREMENTS) sat untracked for a day. Reconstructed during v1.4.1 pre-close cleanup. Detail below is recovered from `.planning/MILESTONES.md` v1.4 entry and `milestones/v1.4-MILESTONE-AUDIT.md`.

### What Was Built
- Android foundation: 13-term disambiguation glossary, 5-mode enrollment overview, NFC/QR/afw#setup/Zero-Touch provisioning matrix, Android 11/12/15 version-breakpoint matrix, tri-portal admin template
- Android prerequisites: admin setup overview (5-branch Mermaid), Managed Google Play binding (Entra-preferred since Aug 2024), Zero-Touch portal admin guide with reseller Step 0 + KME/ZT mutex
- Mode-specific admin guides: COBO Fully Managed (with COPE→WPCO migration note), BYOD Work Profile (admin + end-user dual-guide + AMAPI migration), Dedicated/COSU (with MHS exit-PIN sync), ZTE corporate-scale extension, hard-scoped AOSP stub (RealWear GA)
- Android L1/L2 troubleshooting: mode-first L1 triage tree + 6 scenario runbooks; 3-method log collection + 3 L2 investigation runbooks (Play Integrity not deprecated SafetyNet)
- Integration & milestone audit: capability matrix with 3 Cross-Platform Equivalences pairs, committed Node 5-check audit harness + sidecar JSON, v1.4-MILESTONE-AUDIT.md (closed `tech_debt` accepted; 3 defer items routed to v1.4.1)

### What Worked
- **Tri-portal admin template as canonical Android surface** — Intune + Managed Google Play + Zero-Touch portal pattern scaled cleanly to KME (4th-portal overlay) and Meta Quest (4-portal pattern) in v1.4.1
- **5-check Node audit harness with sidecar JSON** — first mechanical milestone-audit gate in the project; pattern survived v1.4.1 extension informational-first

### What Was Inefficient
- **Closed with `tech_debt` accepted** — 3 defer items (allow-list expansion, 60-day freshness, AOSP stub re-validation) routed forward rather than blocking close. Three more items added during v1.4.1 planning (Knox, full AOSP, COPE) totaling DEFER-01..06 closed in v1.4.1.
- **Milestone close itself was incomplete** — phase dirs deleted but never moved to archive; archive files untracked. Required reconstructive commits during v1.4.1 pre-close.

### Key Lessons
1. **Don't accept `tech_debt` close without a follow-up milestone scheduled.** v1.4.1 was the right answer (decimal milestone for defer closure); always pair `tech_debt` close with the closure milestone.
2. **Adversarial review surfaces invisible contradictions.** Phase 42's 12-agent adversarial pattern found 3 critical pre-existing issues that pure planning missed.

---

## Milestone: v1.4.1 — Android Enterprise Completion & v1.4 Cleanup

**Shipped:** 2026-04-25
**Phases:** 5 (43-47) | **Plans:** 33 | **Tasks:** 40

### What Was Built

- **v1.4 cleanup & audit harness fix** (Phase 43, AEAUDIT-02..05) — restored allow-list sidecar to persistent `scripts/validation/`, expanded ~10→18 supervision pins (C2 FAIL→PASS), normalized 60-day freshness across L2 runbooks 18-21, trimmed `06-aosp-stub.md` 1089→696 words preserving Phase 39 D-17 locks, shipped `regenerate-supervision-pins.mjs` helper with self-test gate, bootstrapped first CI surface (4-job GitHub Action + native pre-commit hook).
- **Knox Mobile Enrollment** (Phase 44, AEKNOX-01..07) — Samsung KME admin guide as 4th-portal overlay with 5-SKU disambiguation H2; L1 runbook 28 + L2 runbook 22 (Play Integrity 3-tier, zero SafetyNet); capability matrix anchor renamed and populated; Mermaid extended 5→6 branches.
- **Per-OEM AOSP coverage** (Phase 45, AEAOSPFULL-01..09) — 5 per-OEM admin guides (RealWear, Zebra WS50, Pico, HTC VIVE Focus, Meta Quest) + `aosp-oem-matrix.md` reference + L1 runbook 29 + L2 runbook 23; ANDR29 single-target swap closing ANDE1 escalation stub; PITFALL-7 framing preserved across all 5 OEM docs.
- **COPE Full Admin** (Phase 46, AECOPE-01..04) — `08-cope-full-admin.md` parallel to COBO with Path A LOCKED full-admin scope; Android 15 Private space ⚠️ unmanaged callout (NEW); atomic same-commit Wave 2 retrofit landing capability matrix COPE column + Private Space row + COBO migration-note trim + glossary Private Space H3.
- **Integration & terminal re-audit** (Phase 47, AEINTEG-01..04) — atomic glossary alphabetical re-canonicalization; harness extended (C4 24-token, C6 6 files, C7 11 SKU forms, C9 8 banned phrases) informational-first; **terminal re-audit flipped v1.4-MILESTONE-AUDIT.md `tech_debt → passed`** with `re_audit_resolution` block recording DEFER-01..06 closing SHAs; PROJECT.md AEAUDIT-02..05 + AEKNOX-01..07 + AEAOSPFULL-01..09 + AECOPE-01..04 + AEINTEG-01..04 → Validated.

### What Worked

- **Wave-based parallel execution.** Phases 44/45/46 ran in parallel against disjoint file sets with an append-only contract on shared files (capability matrix, Mermaid, glossary line 15). Phase 47 owned the atomic single-author rebuilds. Mirrors v1.4 Phase 42 D-03 precedent — no parallel-merge conflicts.
- **Informational-first harness rollout.** New checks (C6 PITFALL-7 preservation, C7 Knox attribution, C9 COPE banned-phrase) shipped as informational-only with planned promotion to blocking in v1.5. Avoided flipping pre-existing PASS state during a milestone where content was actively churning.
- **Atomic same-commit retrofit pattern.** Forward-promise closures (Phase 35:16 ZT mutex, Phase 36:64 COPE migration note, Phase 36:162 Samsung-admins) shipped in same commits as new content per D-22 / D-23 / D-34.
- **Two-tier classifier discipline for hand-authored pins.** Phase 43's `regenerate-supervision-pins.mjs` was authored with Tier 2 never-auto-pin invariant (D-11) and a self-test dogfood gate (D-12) reproducing the 9 hand-authored pins exactly.
- **Audit-doc canonical numbering for re_audit_resolution.** Phase 47 used the audit-doc's own DEFER-01/02/08/09/10 numbering (not the v1.4.1 ROADMAP's renumbered DEFER-01..06) to keep cross-references stable.

### What Was Inefficient

- **Milestone close left in mid-state across multiple sessions.** Approaching this v1.4.1 close, the working tree contained 106 unstaged deletions of v1.4 phase dirs, untracked v1.4 archive files in `milestones/`, untracked Phase 44 PLAN files, and a stale "executing" STATE.md. Cost ~3 reconstructive commits before v1.4.1 close could even start.
- **`gsd-tools audit-open` is broken.** `ReferenceError: output is not defined` at `gsd-tools.cjs:786`. Pre-close artifact-audit step couldn't run automatically; had to hand-scan instead.
- **`gsd-tools milestone complete` accomplishments extraction is naive.** It grabbed every bullet under "key accomplishments" headings across all SUMMARY files, including stray `One-liner:` placeholders and `1. [Rule 3 - Blocking] Resolved...` deviation-handling bullets. CLI-generated MILESTONES.md entry was unusable as-is — had to rewrite to 5 curated phase-scoped bullets.
- **Stale checkboxes in REQUIREMENTS.md at close time.** AECOPE-01..04 + AEINTEG-03 still `[ ]` even though all work shipped. Traceability table Status column still showed all 28 as "Active". Sync had to happen pre-close as a one-off.
- **Edit tool fragile on multi-line CRLF blocks.** Several Edit calls failed with "string not found" on perfectly-readable Read output. Fell back to `Write` for ROADMAP.md collapse.

### Patterns Established

- **Pre-close artifact-state sync.** Before invoking `/gsd-complete-milestone`, manually scan: deleted-but-not-staged files, untracked archive files in `milestones/`, untracked plan files, REQUIREMENTS checkbox staleness vs PROJECT.md Validated. Reconstruct prior milestone close artifacts *before* the workflow runs.
- **Curate `gsd-tools milestone complete` output, don't trust it.** Treat the CLI-generated MILESTONES.md entry as a draft to be rewritten with phase-scoped curated bullets.
- **Audit-doc canonical numbering survives ROADMAP renumbering.** When a re-audit closes deferred items from a previous milestone, use the audit-doc's *original* numbering scheme in `re_audit_resolution`, not the new milestone's renumbered DEFER list.
- **`<details>` collapse pattern in ROADMAP.md.** Each shipped milestone collapses to a `<details>` block with summary + per-phase bullets + audit status + `Full details:` link. Pattern is consistent v1.0-v1.4.1.

### Key Lessons

1. **Don't run `/gsd-complete-milestone` against a dirty working tree.** Workflow assumes clean state and compounds drift into the archive commit. Always reconstruct prior milestone close artifacts and sync REQUIREMENTS.md to ship-state *before* invoking close.
2. **Audit harness extensions ship informational-first.** Adding new mechanical checks during a milestone where content is churning risks false negatives masking real regressions. D-29 grace pattern validated across v1.4 → v1.4.1.
3. **Atomic same-commit forward-promise closure beats deferred retrofits.** When milestone N forward-promises a feature for milestone N+1, the N+1 closure should land in the same commit that adds the new feature. Validated 6× in v1.4.1.
4. **Hand-authored allowlists beat regenerated allowlists during high-churn phases.** Helper is best for terminal cleanup, not interleaved use.
5. **Meta Horizon ALIVE-in-transformed-form framing required HIGH-confidence research gate.** Plan-time re-verification escalated MEDIUM → HIGH and unlocked Branch 2 of D-07. Without that gate, doc would have framed Meta Horizon as deprecated and been wrong.

### Cost Observations
- Model mix: planner=opus, executor=sonnet (per `.planning/config.json`)
- Wave-based parallel execution (Phases 44/45/46) materially reduced wall time vs. sequential
- Phase 47 worktree-from-fresh approach (auditor independence per Phase 42 D-02) added small cost premium but prevented confirmation bias on terminal re-audit
- Notable: `gsd-tools audit-open` CLI bug + naive accomplishments extraction added ~5 reconstructive tool calls; both should be filed as upstream gsd-tools bugs

---

## Milestone: v1.5 — Linux Platform, Operational Depth & Cross-Platform Cleanup

**Shipped:** 2026-05-07
**Phases:** 14 (48-61) | **Plans:** 101 | **Tasks:** ~150

### What Was Built

- **Pillar 1 — Cleanup & cross-platform hardening** (Phases 48 + 57 + 58 + 59 + 60, CLEAN-01..08) — Android nav unification (DEFER-07 closure: docs/index.md + common-issues.md + quick-ref-l1/l2 retrofits, Phase 57); 5-platform capability comparison (DEFER-08 closure: docs/reference/4-platform-capability-comparison.md, 6 H2 domains × 5 platform columns × 48 feature rows = 240 link-bearing data cells, link-not-copy architecture, Phase 58); broken-link sweep (75-finding inventory closed across 2 passes — Phase 48 first-pass + Phase 60 second-pass: 60 FIXED + 15 ALLOWLISTED); glossary cross-reference normalization across all 5 platform glossaries (Phase 59 Plan 59-05).
- **Pillar 2 — Linux (Ubuntu 22.04/24.04 LTS) as 5th platform** (Phases 49-52, LIN-01..13) — Ubuntu LTS taxonomy + 9-term Linux glossary with reciprocal see-also entries to all 4 existing glossaries (Phase 49); admin setup with Identity Broker v2.0.2+ re-enrollment pitfall + 4-category compliance + linux-capability-matrix.md (bilateral cross-links to 4-platform-comparison) + end-user enrollment walkthrough (Phase 50); 4 L1 runbooks + Mermaid triage tree (Phase 51); 2 L2 investigation runbooks with journalctl patterns + intune-portal log paths (Phase 52).
- **Pillar 3 — Operational depth (Windows + macOS + iOS + Android)** (Phases 53-56, COMG-01..05 + PATCH-01..08 + APP-01..08 + DRIFT-01..07) — Co-management workload sliders + tenant attach disambiguation + Autopatch prereqs (Phase 53); WUfB rings + Hotpatch (Win11 24H2+ default May 2026) + macOS DDM (legacy MDM commands deprecated Apple OS 26) + iOS DDM (supervised-only constraint retracted iOS 17+) + Play Integrity MEETS_STRONG_INTEGRITY enforcement (Sept 30 2025) + Zebra LifeGuard (Phase 54); Win32 supersedence/dependency graphs + macOS .pkg/.dmg pipelines + Installomator MEDIUM-confidence callout + iOS VPP licensing + Android MGP + Zebra OEMConfig APK side-load (Phase 55); Windows Intune Remediations + cross-platform drift detection + tenant-to-tenant migration runbooks (BitLocker re-key + ABM token re-issue + MGP re-binding) + cross-platform encryption-drift section (Phase 56).
- **Pillar 4 — Validation tooling** (Phases 48 + 60 + 61, AUDIT-01..08) — Path-A copy `v1.4.1-milestone-audit.mjs` → `v1.5-milestone-audit.mjs` (Phase 48); C10 Linux frontmatter blocking from start; C11/C12/C13 informational-first scaffolds promoted to blocking at Phase 60 atomic harness commit `c2abdd4`; BASELINE_9 refresh closing v1.4.1 self-test carry-over; 13-validator chain check-phase-48..61.mjs all PASS at close; CI workflow `audit-harness-v1.5-integrity.yml`; terminal re-audit at Phase 61 Plan 61-04 from independent worktree confirmed 12/12 v1.5-milestone-audit.mjs PASS in fully-blocking mode.

### What Worked

- **Wave-based parallel execution scaled to a 14-phase milestone.** Wave A (Phase 51 Linux L1 + Phase 53 Co-management — disjoint file sets) ran in parallel; Wave B (Phases 54+55+56 — three concurrent operational-depth executors against operations/ subdirectories) followed. Phase 53 Plan 53-05 took ownership of `operations/00-index.md` per ROADMAP hotspot table; Phase 59 Plan 59-04 expanded it to 4-domain cross-platform routing per DPO-Phase56-01 hand-off discharge. No parallel-merge conflicts.
- **Informational-first harness rollout extended cleanly.** v1.4.1's C6/C7/C9 informational-first pattern repeated for v1.5's C11 ops-domain anti-patterns / C12 4-platform-comparison structural / C13 broken-link automation. All three landed informational at Phase 48, content phases stabilized through Phases 49-59, then atomic promotion to blocking at Phase 60 Plan 60-08 single-commit harness change (`c2abdd4`). Avoided false negatives during high-churn content phases.
- **Link-not-copy architecture for 5-platform comparison doc.** DEFER-08's `4-platform-capability-comparison.md` (filename retained despite 5-platform scope per D-11 / DEFER-08 / AECOMPARE-01 traceability) cells link to per-platform matrix anchors instead of copying values. C12 structural validator enforces architecture; D-08 decision routes Windows column to `linux-capability-matrix.md#<h2-slug>` as canonical Windows source pending dedicated `windows-capability-matrix.md` in v1.6+.
- **Auditor-independence via fresh worktree spawn.** Phase 61 Plan 61-04 spawned worktree `agent-a5336372f28300cea` distinct from Plans 61-01/02/03 author-agents per CONTEXT D-22 — direct mirror of Phase 47 v1.4.1 precedent. Flipped AUDIT-08 from independent vantage point.
- **Pre-edit anchor inventory artifacts (PITFALL-6).** Phase 57 (`57-ANCHOR-INVENTORY.md`) and Phase 58 (`58-ANCHOR-INVENTORY.md`) captured anchor literals + inbound references at HEAD before edits; Phase 58 Plan 58-01 locked baseline `22161b9b5f13436bc2d68bb52822037720c7096d` for cross-check at close. Made retrofit damage to existing anchors structurally impossible.
- **Validator-as-deliverable discipline maintained.** Each content phase shipped a `check-phase-NN.mjs` validator alongside the docs (continuing v1.3+ pattern). 13 per-phase validators registered in CI workflow; chain-validator regression-guard at Phase 60/61 close.
- **Append-only contract on shared files (Phase 42 D-03 carry-forward).** `docs/index.md`, capability matrices, glossaries — all multi-phase write hotspots tracked in ROADMAP Shared Write Hotspot Ownership table, append-only enforced via per-phase NEGATIVE regression-guards (e.g., V-57-25 iOS H2 anchor stability, V-58-22 Phase 45 AEAOSPFULL-09 anchor preservation, V-59-32 pre-Phase-59 H2 byte-identity).

### What Was Inefficient

- **Stale chain-validators surfaced at terminal re-audit.** Phase 53's `check-phase-53.mjs` V-53-06 + V-53-22 went FAIL when Phase 59 D-10 evolved `operations/00-index.md` from co-management-only stub to 4-domain cross-platform index. Phase 59's V-59-NN should have propagated but didn't. Phase 60 inherited 3 pre-existing chain regressions (V-60-14/16/21 from Phase 51/53/58 chain) marked out-of-scope per orchestrator boundary; Phase 61 Plan 61-01 fixed the V-53 set explicitly. Lesson: chain-validators need a "downstream-supersession" propagation step at every phase that legitimately evolves a structural decision in an earlier phase's scope.
- **Stale ROADMAP §Progress rows accumulated.** 4 phases (48/49/50/56) had unchecked status in ROADMAP §Progress at Phase 61 entry despite all summaries existing. Plan 61-02 reconciled atomically with REQUIREMENTS.md flip. Lesson: per-phase close should auto-update ROADMAP §Progress, not defer to milestone close audit.
- **Stale REQUIREMENTS.md checkboxes at close time (repeat from v1.4.1).** 43/44 active reqs still `[ ]` at Phase 61 entry despite work shipped. Plan 61-02 verify-and-flip with inline traceability comments. v1.4.1 retro lesson #1 ("traceability in commit workflow") is still being learned — needs harness-level enforcement.
- **`gsd-sdk milestone.complete` accomplishments extraction still naive (repeat from v1.4.1).** CLI extracted "One-liner:" placeholder strings, "SUBSUMED BY PLAN 48-01.", "NO COMMIT MADE.", and stray validation rule numbers as accomplishments. Treated CLI output as draft; MILESTONES.md entry was authored manually at Phase 61 Plan 61-05 commit `965f509` instead. Same upstream gsd-sdk bug as v1.4.1.
- **Scope expansion mid-milestone via DPO hand-offs.** DPO-Phase56-01 hand-off chain (Phase 56 → Phase 59) added `operations/00-index.md` 4-domain expansion outside Phase 56's original SC envelope. Discharged cleanly at Phase 59 Plan 59-04, but the hand-off mechanism creates implicit deferred work that escapes per-phase verification.

### Patterns Established

- **Atomic harness commit at terminal-finalization phase.** Phase 60 Plan 60-08 single commit `c2abdd4` bundled 4 informational→blocking promotions + 4 sidecar arrays + BASELINE_9 refresh + 48-VERIFICATION close-out. Pattern from v1.4.1 Phase 43 D-07 contract; v1.5 reproduced and extended.
- **Pre-edit anchor inventory artifact (`<phase>-ANCHOR-INVENTORY.md`)** before any retrofit touching shared anchors. Locks pre-edit HEAD SHA for byte-identity cross-check at phase close. Phase 57 → Phase 58 inheritance.
- **`<phase>-LEARNINGS.md` per-phase artifact.** Phase 61 generated structured Decisions/Lessons/Patterns/Surprises buckets. New artifact type for milestones; feeds retrospective at close.
- **C2 supervision_exemptions[] coordinate refresh** at phase close when content edits shift line numbers in pinned files. Phase 58 Plan 58-07 carry-over: pre-58-02 lines 78/80/81/83/87/88 → post 88/90/91/93/97/98. Pattern explicit in PROJECT.md key-decisions.
- **Audit harness scope-restricted assertions** (e.g., V-53-22 SCOPE_RESTRICTED to CO_MGMT_FILES, mirrors V-53-10 precedent at line 149-165). Per-file exemption preferred over permissive regex when content evolves legitimately.

### Key Lessons

1. **Chain-validators need downstream-supersession propagation.** When a later phase legitimately evolves a structural decision from an earlier phase, the earlier phase's `check-phase-NN.mjs` must be refreshed in the same commit — not at terminal re-audit. Phase 59 D-10 → Phase 53 chain regression cost a Phase 61 plan to repair.
2. **Wave-based parallelism scales beyond 3 phases.** v1.4.1 validated 3 (44/45/46); v1.5 validated 5 (51+53 Wave A; 54+55+56 Wave B). Limit appears to be shared-write-hotspot count, not phase count. Hotspot ownership table in ROADMAP is the load-bearing artifact.
3. **Informational-first → blocking promotion at terminal-finalization phase.** v1.4.1 (C6/C7/C9) → v1.5 (C11/C12/C13) — 6 mechanical checks promoted across two milestones with zero regression introductions. Pattern is durable; promote at the dedicated harness-finalization phase, not earlier.
4. **Link-not-copy beats copy-with-sync for cross-reference docs.** DEFER-08 5-platform comparison would have been ~240 sync points if cells were copied. Link-not-copy collapses to 4 sibling-matrix anchor target files + 1 author file + 1 structural validator. v1.6+ should default to this for any new cross-reference deliverable.
5. **Auditor-independence via fresh worktree is mandatory at terminal re-audit.** Phase 47 v1.4.1 → Phase 61 v1.5. Two milestones validated; treat as a hard pre-condition, not an option.
6. **`/gsd-complete-milestone` still expects clean working tree at start.** v1.4.1 retro lesson #1 still applies — pre-flight artifact-state sync is mandatory. v1.5 had 1 stale todo + 4 stale ROADMAP §Progress rows + 43 stale REQUIREMENTS checkboxes despite work shipped; reconstructive Phase 61 plans absorbed the cost, but harness-level enforcement is still missing.
7. **MILESTONES.md author the entry manually.** `gsd-sdk milestone.complete` accomplishments extraction is broken (extracts placeholder strings); same upstream bug across v1.4.1 + v1.5. The CLI's idempotent ROADMAP/REQUIREMENTS/audit archival is fine; the accomplishments field is unusable.

### Cost Observations

- Model mix: planner=opus, executor=sonnet (per `.planning/config.json`); auditor agents at Phase 61 used fresh-worktree spawn for independence
- 14 phases / 101 plans / ~150 tasks shipped over 12 days (2026-04-26 → 2026-05-07); 320 commits; 422 files changed (+116,381 / -652 lines)
- Wave-based parallelism (51+53 Wave A; 54+55+56 Wave B) materially compressed wall time — 3 days vs. estimated 6 days sequential for those 5 phases
- Pre-edit anchor inventory artifacts (Phase 57 + 58) added small upfront cost but prevented zero-day rework when retrofits touched 4 capability matrices
- Notable: `gsd-sdk milestone.complete` accomplishments extraction bug repeated from v1.4.1; should be filed as upstream gsd-sdk issue (priority: 2nd milestone now affected)

---

## Milestone: v1.8 — Tooling Debt Closure + Chain-Resilience Hardening

**Shipped:** 2026-06-09
**Phases:** 4 (71-74) | **Plans:** 13 | **Requirements:** 12/12 Validated

### What Was Built
A pure tooling/infrastructure milestone (zero new corpus content beyond one 4-site rename) closing v1.7's accumulated validator-chain debt across four pillars: **(A)** root-caused and fixed the `gsd-sdk milestone.complete` placeholder-label-garbage defect via a vendored corrected extractor + frontmatter pre-write CLI + regression fixture; **(B)** hardened 6 chain-apex wrappers to capture stdout+stderr, un-masking a diagnostic that had been hidden on Windows for 2 weeks; **(C)** forward-ported 19 HEAD-coupled chain validators to a centralized frozen-aware helper (`_lib/frozen-at-close.mjs`), closing CHAIN-DEGRADED-AT-HEAD-01; **(D)** Path-A bumped the audit harness lineage v1.7→v1.8 (6th milestone), renamed the VPP-01 carry-over, and ran a 3-axis cross-OS terminal re-audit.

### What Worked
- **The ARCHIVE-01 fix paid off at this very close.** The defect flagged in the v1.5 retrospective (line 232) and recurrence-confirmed at v1.7 close was finally root-caused in Pillar A — and the `--pre-write-frontmatter` step prevented garbage emission when *this* milestone archived. The bug closed the loop on itself.
- **Adversarial-review for all 4 gray-area picks** (per user preference) empirically surfaced two upstream documentation drifts that would otherwise have shipped silently: VPP-01 was a **4-site** rename not 3 (the spawning source recorded a 4th occurrence the REQUIREMENTS headline dropped), and the v1.8 CI workflow was the **fifth** coexistence file not "fourth."
- **The 3-axis terminal re-audit did its job twice over** — it both *confirmed* cross-OS PASS-Count EXACT MATCH (30/0/1 Windows main == Linux GHA) and *surfaced* a genuine new fragility (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01).
- **Atomic-commit indivisibility (SC#1)** held cleanly: 3-file Atom 1 and 2-file Atom 2 each landed in exactly one SHA.

### What Was Inefficient
- **The deepest validator (check-phase-66 re-chaining 48..65 inside check-phase-74) is O(n²) on cold clones.** The Axis-1 fresh-clone re-audit stalled at this guard on a cold Windows filesystem, costing significant investigation time to distinguish a perf artifact from a correctness defect. The harness's recursive re-chaining is expensive to re-verify in isolation.
- **SUMMARY.md schema drift** — one executor-authored SUMMARY used a `dependency_graph` frontmatter without a `one-liner:` field, so the milestone-archive extractor fell back to a body heading and produced one label fragment that had to be hand-corrected (per the REPLACEMENT-not-deletion doctrine).

### Patterns Established
- **No-Commit-A close-gates when frozen reads are centralized.** Phase 70 needed a chicken-and-egg Commit A only because it authored inline frozen-aware helpers during the bump; once Phase 73 centralized those into `_lib/frozen-at-close.mjs` (no `V18`/`readAtV18Close`), the v1.8 close-gate needed no SHA-placeholder-fill commit — a single close-gate commit sufficed.
- **Honest discovery-logging over papering-over.** The Windows cold-clone timeout was documented as a v1.9+ deferred item rather than retried until green or hidden.

### Key Lessons
1. **When carrying a DEFERRED-CLEANUP discovery into REQUIREMENTS, copy the full site list including parenthetical "Nth occurrence" notes** — the VPP "3 sites" headline silently dropped L160.
2. **Centralizing frozen-aware reads removes an entire class of close-gate complexity** (the chicken-and-egg Commit A).
3. **A recursive re-chaining validator is cheap to run warm but punishing to re-verify cold** — terminal-re-audit recipes on Windows should cache-warm the clone or raise the subprocess timeout.

### Cost Observations
- Model mix: orchestration on Opus; researcher/planner-checker/executors on Sonnet.
- Notable: the single longest investigation of the milestone was not implementation but *distinguishing a Windows clone-perf artifact from a real cross-OS parity break* — resolved by triangulating warm-main-tree vs cold-clone vs Linux-CI.

---

## Milestone: v1.9 — macOS Platform SSO & Secure Enclave Authentication Documentation

**Shipped:** 2026-06-22
**Phases:** 8 (75-82) | **Plans:** 19 | **Requirements:** 27/27 Validated

### What Was Built
Complete macOS Platform SSO (macOS 14+) + Secure Enclave authentication documentation: admin setup guide (`07-platform-sso-setup.md`), three-method auth deep-dive (`08`, Secure Enclave / Password sync / Smart card + Touch ID / Passkey / NUAL / ADE-during-Setup), legacy Enterprise SSO plug-in + migration guide (`09`) with rollback, L1/L2 runbooks (#35/#36/#27), capability-matrix + 5-platform comparison + lifecycle integration with 8 SSO-E cross-link edges, and the v1.9 audit-harness lineage bump (7th Path-A milestone) closed by a 3-axis terminal re-audit.

### What Worked
- **Adversarial-review-driven discuss-phase** — Phase 82's four gray areas (C17 / plan-layout / re-audit-set / close-gate) were each resolved by parallel Finder/Adversary/Referee advisors, which independently surfaced load-bearing facts (e.g. C13 doesn't crawl internal links → the V-81-CROSSLINK gap was real, not theoretical).
- **Path-A harness discipline** — the 4-line relabel + predecessor-byte-unchanged invariant kept the 7th lineage bump near-mechanical and bisect-clean.
- **Honest legacy-FAIL accounting** — distinguishing green Phase-82 deliverables from pre-existing chain FAILs (and routing the latter to deferred-cleanup) preserved audit credibility instead of masking.
- **Post-execution code review caught a real harness bug** — WR-01 (E7 non-load-bearing cross-link needle) was a genuine specificity gap in a gating validator; fixed count-neutrally before milestone archive.

### What Was Inefficient
- **8 net-new validators in one indivisible Atom 2** — because Phases 75-81 didn't ship per-phase validators during their own execution (unlike v1.8's 71/72/73), all eight `check-phase-75..82.mjs` landed in Phase 82, enlarging the close phase. Shipping validators-as-deliverable per content phase would have spread the load.
- **MILESTONES.md auto-extraction produced empty `One-liner:` rows** — several content-phase SUMMARY.md files lacked a clean `one_liner` field, requiring manual curation of the milestone entry.

### Patterns Established
- **Phase-scoped cross-link assertions over global C-categories** (D-01) — milestone-specific edge sets belong in the per-phase validator (chain-replayed = permanent + blocking), not a new global C-check every future milestone inherits forever.
- **Post-terminal-audit count-neutral hardening** — an advisory fix that provably doesn't change PASS/FAIL/SKIP counts can be applied after the terminal re-audit without invalidating it, when documented in the milestone audit.

### Key Lessons
- The "terminal" re-audit is only as strong as the validators' specificity — a green chain with a non-load-bearing assertion is a false sense of security; code-review-after-execution is a worthwhile backstop even for tooling-only phases.
- Markdown-link-anchored needles (`](path)`) beat bare-filename needles for cross-link assertions, because filenames recur in changelog/version-history prose.

### Cost Observations
- Model mix: orchestration on Opus; researcher/planner-checker/verifier/code-reviewer on Sonnet; executors on Opus (delicate atomic harness/close-gate work).
- Notable: the whole milestone ran as a single `/gsd-discuss-phase 82 --chain` auto-pipeline (discuss → plan → execute → review → verify → close → Jira sync) for the final phase.

---

## Milestone: v1.10 — macOS Platform SSO Follow-ons (Kerberos, Graph API & NUAL)

**Shipped:** 2026-06-24
**Phases:** 6 (83-88) | **Plans:** 16 | **Requirements:** 17/17 Validated

### What Was Built
Closed the v1.9-deferred macOS Platform SSO follow-on backlog: a new Kerberos SSO extension guide (`10`, `com.apple.AppSSOKerberos.KerberosExtension` Type Credential via Intune Custom Template, macOS 14.6 floor, `app-sso platform -s`/`klist` diagnostics), a new Graph API Platform Credential operations doc (`11`, GA `platformCredentialAuthenticationMethod` List/Get/Delete with HTTP + PowerShell SDK, mandatory Delete `[!WARNING]`, dry-run leaver pattern), verified NUAL MDM key literals in guide `08` (PSSO-FUT-01 closed), two L2 runbooks (#28 Kerberos, #29 Graph credential), capability-matrix + glossary + 4-platform-comparison integration, a dedicated chain-health pass (10 legacy FAILs → frozen-aware, no CHAIN_SKIP masking), navigation-last hub integration across 5 hubs, and the 8th Path-A audit-harness lineage bump closed via a 3-axis terminal re-audit.

### What Worked
- **Dedicated chain-health phase before the harness bump** (Phase 86) — resolving the 10 pre-existing legacy FAILs frozen-aware *first* (with `CHAIN_SKIP = Set([])`, no masking) meant the v1.10 harness landed on a green chain instead of inheriting RED-at-HEAD. Separating it from the harness Atom (Anti-Pattern 5) kept both phases bisect-clean.
- **Cross-OS authority decision (D-04) made the apex deterministic** — pre-committing to "Linux GHA apex is authoritative, never cold Windows clone" correctly predicted the Windows warm-tree deep-nest truncation (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01); the Linux GHA run was the binding signal at close.
- **Path-A harness discipline held for the 8th consecutive milestone** — predecessor v1.4-v1.9 byte-unchanged invariant + the two-atomic-commit split (Atom 1 harness-core / Atom 2 validators+CI) kept the lineage bump near-mechanical.
- **Adversarial-review-driven scope** — winners 1A/2A/4A plus the explicit deferral of multi-tenant PSSO (PSSO-FUT-03) to its own architectural milestone preserved the single-feature-content-milestone convention across a 10th milestone.

### What Was Inefficient
- **`/gsd-complete-milestone` SDK auto-extraction emitted `One-liner:` placeholder rows again** — the ARCHIVE-01-class recurrence (documented at v1.7/v1.8) still surfaces for content-phase SUMMARY.md files whose `one_liner` frontmatter is unpopulated; the milestone entry required manual curation. Root cause is the unpopulated `requirements_completed`/`one_liner` SUMMARY frontmatter, authoritatively mirrored only in each VERIFICATION.md.
- **The audit-file move clobbered the canonical close-gate audit** — `milestone.complete` moved the post-close re-audit copy on top of the richer committed close-gate `MILESTONE-AUDIT.md` (full C1-C16 mechanical_checks block); had to be restored from HEAD during archival.

### Patterns Established
- **Frozen-aware conversion over CHAIN_SKIP masking** — legacy HEAD-coupled assertions are converted to read milestone-close SHAs via `_lib/frozen-at-close.mjs` helpers rather than suppressed; `CHAIN_SKIP` stays empty. This is now the standing chain-health remedy.
- **Pre-commit the cross-OS authority rule when an OS-specific flake is known** — when a platform exhibits nondeterminism (warm-tree deep-nest apex), name the authoritative axis in a LOCKED decision before the terminal re-audit so the close signal is unambiguous.

### Key Lessons
- A "milestone close" that already ran a close-gate (Phase 88) leaves `/gsd-complete-milestone` doing the *archival* half only — but the SDK's audit-file move can still overwrite a hand-authored canonical audit; verify `git status` on `milestones/*-MILESTONE-AUDIT.md` after `milestone.complete` and restore from HEAD if the richer version was clobbered.
- The `One-liner:` extraction bug is best prevented upstream by populating SUMMARY.md `one_liner` frontmatter at phase close, not patched downstream at milestone archive.

### Cost Observations
- Model mix: orchestration on Opus; the whole milestone ran largely as `/gsd-discuss-phase --chain` auto-pipelines (discuss → plan → execute → verify → close) sequential-on-main-tree per `use_worktrees:false`.
- Notable: 8th Path-A harness in the lineage; cross-OS EXACT MATCH 8/8 with Linux GHA authoritative.

---

## Milestone: v1.11 — macOS PSSO End-to-End Provisioning & MDM Migration

**Shipped:** 2026-06-26
**Phases:** 5 (89-93) | **Plans:** 13 | **Requirements:** 15/15 Validated

### What Was Built
Two consolidated, operator-followable macOS scenario guides stitched together from existing surfaces: an end-to-end PSSO provisioning walkthrough (`01-psso-provisioning-walkthrough.md`, A1 standard post-enrollment + A2 ADE-during-Setup-Assistant macOS 26+ with selector-first opening, shared 8-stage spine, `app-sso platform -s` gates, link-not-copy to guides 00/02/07) and a Kandji/Iru→Intune MDM migration walkthrough (`02-mdm-migration-psso.md`, B1 wipe-free in-place macOS 26+ ABM "Assign Device Management" + Deadline + B2 ≤macOS 25 wipe fallback + mandatory post-migration PSSO re-registration), a new three-track L2 #30 migration-failure runbook, 9 glossary entries + an atomic capability-matrix migration row (V-63-08/09 blob-hash), navigation-last hub integration across 4 hubs, and the 9th Path-A audit-harness lineage bump closed by a 3-axis terminal re-audit.

### What Worked
- **Content/foundation phases (89-92) shipped their per-phase validators during their own execution** — so Phase 93's Atom 2 carried only `check-phase-89..93.mjs` cleanly, avoiding the v1.9 "8 validators in one Atom" pileup. Shipping validators-as-deliverable per phase spread the load as intended.
- **Path-A harness discipline held for the 9th consecutive milestone** — the 4-line relabel (lines 2/4/35/79) + predecessor v1.4-v1.10 byte-unchanged invariant + two-atomic split kept the lineage bump near-mechanical and self-test 9/9 preserved.
- **Pre-committed cross-OS authority (D-03) again made the apex deterministic** — the carried WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 cascade (now worse at depth [48..92]) was a *known* artifact; the Linux GHA apex (47/0/1) was the binding signal, not the Windows cold clone that hung 3+ min.
- **SINGLE close-gate commit (NO Commit A)** — no v1.11 artifact forward-references the close SHA, so the chicken-and-egg Commit A was avoided entirely (`{phase_93_close_SHA}` placeholder recoverable via git log grep).
- **Pre-emptive stray-audit deletion at complete-milestone** — deleting the lean pre-close `.planning/v1.11-MILESTONE-AUDIT.md` *before* running `milestone.complete` prevented the SDK audit-move from clobbering the rich canonical `milestones/` copy (the v1.10 failure mode, now avoided proactively).

### What Was Inefficient
- **`/gsd-complete-milestone` SDK auto-extraction emitted `One-liner:` placeholder rows for the 4th milestone running** (v1.7/v1.8/v1.10/v1.11) — content-phase SUMMARY.md `one_liner` frontmatter is still authored as a `**One-liner:**` prose bullet the extractor can't parse, so the MILESTONES.md entry was hand-curated again. Root cause remains upstream: populate machine-readable `one_liner` frontmatter at phase close.
- **A pre-close gate audit + a separate canonical close-gate audit co-existed** — the `/gsd-audit-milestone` pre-close run (12/15 gaps_found, the gaps being Phase 93 itself) and the Phase-93 canonical audit (15/15 passed) both lived on disk until complete-milestone deleted the stray; mildly confusing to reconcile which is authoritative.

### Patterns Established
- **Delete the stray pre-close audit before `milestone.complete`, not after** — when a Phase-N close-gate already authored the canonical `milestones/vX.Y-MILESTONE-AUDIT.md`, `git rm` the loose `.planning/vX.Y-MILESTONE-AUDIT.md` *first* so the SDK's audit-move has nothing to clobber it with. Supersedes the v1.10 "restore from HEAD afterward" remedy.
- **Validators-as-deliverable per content phase** — confirmed: when phases 89-92 each ship their own `check-phase-NN.mjs`, the harness-close phase stays small.

### Key Lessons
- The milestone-close planning docs may be *mostly pre-updated by the Phase-N close-gate* (4-doc traceability flip), leaving `/gsd-complete-milestone` to do the archival + the ROADMAP/PROJECT collapse + MILESTONES curation + tag — but the stale spots hide in plain sight (PROJECT.md "Current State" still said "Next: Phase 90"). Re-read every section, don't assume the close-gate touched it.
- The `One-liner:` extraction bug is now a 4-milestone recurrence; downstream hand-curation is reliable but the only durable fix is machine-readable SUMMARY frontmatter.

### Cost Observations
- Model mix: orchestration on Opus; the milestone ran as `/gsd-discuss-phase --chain` auto-pipelines sequential-on-main-tree per `use_worktrees:false`.
- Notable: 9th Path-A harness in the lineage; cross-OS EXACT MATCH with Linux GHA apex 47/0/1 authoritative; the carried Windows deep-nest cascade is now depth [48..92] (+5 vs v1.10).

---

## Milestone: v1.12 — macOS MDM-Migration Verification Closure

**Shipped:** 2026-06-26
**Phases:** 2 (94-95) | **Plans:** 5 | **Requirements:** 6/6 Validated

### What Was Built
A tightly-scoped verification-closure milestone that resolved the three Phase-90 post-migration research gaps routed forward at the v1.11 close-gate, all in the single existing file `docs/macos-lifecycle/02-mdm-migration-psso.md` (no new files, no navigation-last phase — guide 02 was already nav-wired in v1.11). MIGV-01: Microsoft-Learn-verified full-confidence answer that ADE token assignment alone suffices for OS-26-migrated profile-based enrollment. MIGV-02: Iru/Kandji console delete-path confirmed against live vendor docs (both portal URLs + both brand names retained). MIGV-03: supervision-status shipped as a MEDIUM-confidence callout + pilot recommendation (not a flat assertion). Plus the 10th Path-A audit-harness lineage bump (Atom 1 + Atom 2), V111 frozen pin, 9th CI coexistence workflow, and a 3-axis terminal re-audit closing the milestone.

### What Worked
- **`/adversarial-review` locked the hardest scope call before any planning** — the supervision question (assert vs. callout vs. author-unrunnable pilot) resolved to a coherent 1-A / 2-A / 3-iii triple, so MIGV-03 shipped as a MEDIUM-confidence callout without re-litigation mid-execution. The same review pre-emptively ruled CI-3 and tooling refactors out (byte-unchanged hazard + scope-padding).
- **The 10th consecutive Path-A harness held** — near-mechanical relabel + predecessor v1.4–v1.11 byte-unchanged invariant + two-atomic split (`8efa283` / `1de2bbb`); self-test 9/9; C1-C16 inherited verbatim.
- **Corrected D-03 OS split made the apex deterministic again** — both chain validators were declared Linux-GHA sole-authoritative up front (run `28270308253`), so the carried WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (now depth [48..94]) was a known artifact, not a close-gate blocker. Cross-OS PASS/FAIL/SKIP EXACT MATCH.
- **D-01 apex off-by-one caught at the close-gate** — roadmap-locked `CHAIN_PHASES=[48..93]` corrected to `[48..94]` (47 entries) per the triple-confirmed [48..N-1] invariant, rather than shipping the locked-but-wrong value.
- **SINGLE close-gate commit (NO Commit A)** — no v1.12 artifact forward-references the close SHA, so the chicken-and-egg Commit A was avoided for the 4th milestone running.

### What Was Inefficient
- **`/gsd-complete-milestone` SDK auto-extraction emitted `One-liner:` placeholder rows yet again** (5th milestone: v1.7/v1.8/v1.10/v1.11/v1.12) — MILESTONES.md accomplishments were hand-curated. Root cause is still unmached `**One-liner:**` prose-bullet SUMMARY frontmatter; only a machine-readable `one_liner:` field at phase close will fix it durably.
- **The SDK `milestone.complete` stamped the entry `Shipped: 2026-06-27`** (UTC rollover) while every other doc says 2026-06-26 — corrected by hand. Date should be taken from the milestone's git range, not the wall clock at archive time.

### Patterns Established
- **Verification-closure as a first-class milestone shape** — when a prior close-gate routes forward genuine research gaps (not tech debt), a tiny 2-phase milestone (content closure + harness/close) cleanly retires them without padding. The content phase touches only the already-wired file; no new nav surface needed.
- **Pre-lock the confidence framing of unverifiable claims** — for questions the authors cannot empirically settle (supervision survival), decide "MEDIUM-confidence callout + pilot recommendation" at scope time via adversarial-review, so execution never drifts toward either a false assertion or an author-unrunnable procedure.

### Key Lessons
- The Phase-N close-gate again pre-updated most of the 4-doc traceability, leaving `/gsd-complete-milestone` to do archival + ROADMAP/PROJECT collapse + MILESTONES curation + tag. Re-read every section — the stale spots (PROJECT.md "Run `/gsd-complete-milestone`" prompts) hide in plain sight.
- The `One-liner:` extraction bug is now a 5-milestone recurrence and the UTC date stamp is a recurring annoyance; both are reliably hand-fixed but the durable fixes are upstream (machine-readable frontmatter; git-range-derived date).

### Cost Observations
- Model mix: orchestration on Opus; sequential-on-main-tree per `use_worktrees:false`.
- Notable: smallest milestone since v1.7 (2 phases / 5 plans); 10th Path-A harness; cross-OS EXACT MATCH with both chain validators Linux-GHA authoritative; carried Windows deep-nest cascade now depth [48..94] (+2 vs v1.11).

---

## Milestone: v1.13 — macOS Platform SSO Admin-Setup Documentation Accuracy & Depth

**Shipped:** 2026-06-29
**Phases:** 5 (96-100) | **Plans:** 14 | **Requirements:** 14/14 Validated

### What Was Built
A documentation-accuracy + depth + harness-lineage milestone driven by `SEED-001` — the corrections and depth additions worked through in a live 2026-06-27/28 macOS PSSO build/troubleshooting session, brought back under the GSD flow with requirements + harness coverage. Phase 96: four surgical conflict fixes across guides 00/15 + the macOS glossary (VPP-on-Company-Portal errors, device→user-group assignment, 3-URL Iru/Kandji reality). Phase 97: formalized guide 02 Account Settings + guide 03 FileVault/FDE depth under DEP-01/02 with freshness stamps. Phase 98: a single-phase comprehensive pass over guide 07 (ACC-03 + TS-01/02/03 + DEP-03) — VPP fix, Extension-Identifier-typo failure, A2 Company Portal delivery requirements, Setup-Assistant diagnostic tree, and the full PSSO admin-setup depth. Phase 99: new L1 runbook #37 (local-macOS-password-reset for Secure-Enclave PSSO devices) + navigation-last wiring. Phase 100: the 11th Path-A audit-harness lineage bump (Atom 1 + Atom 2), V112 frozen pin, 10th CI coexistence workflow, and a 3-axis terminal re-audit close.

### What Worked
- **Single-phase grouping by shared file** — all five guide-07 requirements (ACC-03 + TS-01/02/03 + DEP-03) landed in Phase 98 across 3 waves, avoiding multiple round-trips over `07-platform-sso-setup.md`. The natural unit of work was the file, not the requirement.
- **Formalize-don't-re-research** — Phases 97/98 brought session-written depth under REQ-IDs + harness with bounded spot-verify checks rather than net-new research; needle-spec hand-offs (97/98/99-NEEDLE-SPEC.md) let Phase 100 author content-asserting validators that stay green on the real corpus bytes.
- **11th consecutive Path-A harness held** — 4-line relabel, C1-C16 inherited verbatim, self-test 9/9, predecessor v1.4–v1.12 byte-unchanged; check-phase-96..99 carry content/presence needles (not bare PRESENCE) since the phases patched existing files.
- **Corrected D-03 OS split carried forward cleanly** — both chain validators declared Linux-GHA sole-authoritative up front (run `28401420634`); the carried WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (now depth [48..99]) was a known artifact, not a blocker. Cross-OS EXACT MATCH across the 5-leaf set.
- **D-03 apex off-by-one caught at the close-gate** — roadmap-locked `[48..100]` (milestone-range shorthand) corrected to `[48..99]` (52 entries) per the [48..N-1] invariant, the same class of correction as v1.12's D-01.
- **GLOS-01 bundled at zero fragmentation cost** — the v1.12-deferred single-line Iru URL fix rode Phase 96's surgical accuracy edits instead of getting its own phase.

### What Was Inefficient
- **`/gsd-complete-milestone` SDK auto-extraction emitted `One-liner:` placeholder rows yet again** (6th milestone: v1.7/v1.8/v1.10/v1.11/v1.12/v1.13) — the v1.13 MILESTONES.md entry was hand-authored by REPLACEMENT from the canonical MILESTONE-AUDIT. Root cause unchanged: SUMMARYs whose schema the extractor can't parse. Only a machine-readable `one_liner:` field at phase close fixes it durably.
- **Out-of-flow session edits required a formalization milestone** — the 2026-06-27/28 live session wrote depth and fixes directly into the corpus outside GSD, so v1.13 spent two phases (97/98) retroactively bringing that under requirements + harness. Capturing depth via the flow the first time would have avoided the double-handling.
- **STATE.md/ROADMAP carried the apex shorthand `[48..100]`** until the close-gate caught it — the locked value should have been the [48..N-1] form from roadmap authoring.

### Patterns Established
- **Accuracy/depth milestone as a first-class shape** — when a build session produces verified corrections + depth outside the flow, a content-accuracy milestone (surgical fixes → depth formalization → comprehensive single-file pass → new runbook → harness close) retires it cleanly under requirements + harness without padding.
- **Needle-spec hand-off from content phases to the harness phase** — content phases record presence-only token specs (NN-NEEDLE-SPEC.md) so the terminal harness phase authors per-phase validators that assert the real corpus edits rather than bare file presence.

### Key Lessons
- The Phase-100 close-gate again pre-updated most of the 4-doc traceability, leaving `/gsd-complete-milestone` to do archival + ROADMAP/PROJECT collapse + MILESTONES curation + tag. The stale spots hid in plain sight again: PROJECT.md's Active section still listed v1.12 as ACTIVE, and the v1.13 status line still said "Run `/gsd-complete-milestone`". Re-read every section.
- The `One-liner:` extraction bug is now a 6-milestone recurrence — reliably hand-fixed but the durable fix is upstream (machine-readable `one_liner:` frontmatter at phase close).
- Apex array off-by-one is now a 2-milestone close-gate catch (v1.12 D-01, v1.13 D-03) — the [48..N-1] invariant should be applied at roadmap authoring, not deferred to the close-gate.

### Cost Observations
- Model mix: orchestration on Opus; sequential-on-main-tree per `use_worktrees:false`.
- Notable: 5 phases / 14 plans over ~2 days; 11th Path-A harness; cross-OS EXACT MATCH with both chain validators Linux-GHA authoritative; carried Windows deep-nest cascade now depth [48..99] (+5 vs v1.12); largest Atom 2 yet (7 files: 5 net-new validators + frozen-at-close + CI workflow).

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 10 | 24 | Established L1/L2/Admin tiered doc structure and navigation-last pattern |
| v1.1 | 9 | 18 | Added per-setting "what breaks" callouts and confidence-attributed citations |
| v1.2 | 6 | 20 | Cross-platform foundation-first, parallel phase execution, platform frontmatter taxonomy |
| v1.3 | 8 | 44 | Milestone-audit-driven gap-closure phase (33) with pre-authored plan execution; cross-phase credit preservation; REVIEW-FIX lifecycle hygiene |
| v1.4 | 9 | 40 | First mechanical 5-check audit harness (Node + sidecar JSON); 12-agent adversarial review for terminal phase; closed `tech_debt` (accepted) with 3 defer items routed to decimal milestone |
| v1.4.1 | 5 | 33 | Decimal milestone for prior-milestone defer closure; harness extensions informational-first; auditor-independence via fresh worktree; wave-based parallel execution with append-only contract on shared files |
| v1.5 | 14 | 101 | First 5-platform milestone (Linux added); 4-pillar reorganization (cleanup / Linux / ops-depth / harness); wave-based parallelism scaled to 5 concurrent phases; informational-first→blocking promotion ladder validated 2nd time (C11/C12/C13); link-not-copy 5-platform comparison reference doc; pre-edit anchor inventory artifacts (PITFALL-6); per-phase LEARNINGS.md artifact; 13-validator chain (check-phase-48..61.mjs) all PASS at terminal re-audit |
| v1.6 | 5 | 30 | Apple Business delegated-governance milestone; C14/C15/C16 audit checks blocking from start; 4-agent adversarial-review for terminal gray areas; fresh-clone (not worktree) terminal re-audit |
| v1.7 | 4 | 15 | Deferred-backlog + validator-chain hardening; CHAIN_SKIP root-cause resolution (empty Set); v1.5-frozen-aware helper introduced; first 3-axis terminal re-audit (fresh-clone + fresh sub-agent + cross-OS Linux GHA) |
| v1.8 | 4 | 13 | Tooling-debt closure; ARCHIVE-01 vendored extractor fix; `_lib/frozen-at-close.mjs` centralized module; WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 surfaced + deferred |
| v1.9 | 8 | 19 | macOS Platform SSO + Secure Enclave content milestone; phase-scoped cross-link assertions (D-01); post-terminal-audit count-neutral hardening; SINGLE close-gate commit (no Commit A) |
| v1.10 | 6 | 16 | macOS Platform SSO follow-ons (Kerberos / Graph API / NUAL); dedicated chain-health phase before harness bump (frozen-aware, no CHAIN_SKIP masking); cross-OS authority rule pre-committed (D-04, Linux GHA authoritative); 8th Path-A harness lineage |
| v1.11 | 5 | 13 | macOS end-to-end PSSO provisioning + Kandji/Iru→Intune MDM migration scenario guides; validators-as-deliverable per content phase (small harness-close); SINGLE close-gate (no Commit A); stray pre-close audit deleted *before* `milestone.complete` to prevent SDK clobber; 9th Path-A harness lineage |
| v1.12 | 2 | 5 | Verification-closure milestone (smallest since v1.7); retired 3 prior-close research gaps in one already-wired file; `/adversarial-review` pre-locked MEDIUM-confidence framing for unverifiable supervision claim; D-01 apex off-by-one corrected at close-gate ([48..93]→[48..94]); both chain validators Linux-GHA authoritative (corrected D-03); 10th Path-A harness lineage |
| v1.13 | 5 | 14 | Documentation-accuracy + depth milestone formalizing out-of-flow build-session work under requirements + harness; single-phase grouping by shared file (guide 07 = 5 reqs); needle-spec hand-off from content phases to harness phase; D-03 apex off-by-one corrected at close-gate ([48..100]→[48..99]); carried Windows deep-nest now [48..99]; 11th Path-A harness lineage |

### Top Lessons (Verified Across Milestones)

1. **Navigation files written last** — Verified in v1.0 (Phase 7 after 1-6), v1.1 (Phase 17 after 11-16), v1.2 (Phase 25 after 20-24), v1.3 (Phase 32 after 26-31), v1.4 (Phase 42). Always eliminates broken-link churn.
2. **Template-driven consistency scales** — v1.0 established admin/L1/L2 templates, v1.1 extended with "what breaks" pattern, v1.2 adapted for macOS dual-portal, v1.3 extended with platform enum, v1.4 adapted for tri-portal Android, v1.4.1 extended to 4-portal (Knox) and 4-portal-pattern (Meta Quest). Templates compound in value.
3. **Verification during execution, not after** — v1.0/v1.1 had inline verification. v1.2 skipped on 2 phases and paid for it. v1.3 Phase 30 skipped — fixed via gap-closure phase. v1.4 closed with `tech_debt` (mitigated by v1.4.1 terminal re-audit). Discipline holds.
4. **Milestone audits catch silent gaps** — First applied seriously at v1.3 close. Surfaced verification debt no single-phase check caught. v1.4 audit produced the 3 defer items that scoped v1.4.1. Now a mandatory pre-close step.
5. **Pre-authored plans are durable** — v1.3 Phase 30 plans 30-09/10 pre-authored at plan time but not executed until Phase 33. v1.4.1 Phase 47 plans similarly pre-authored. Plans with explicit truth tables survive deferred execution with zero fidelity loss.
6. **Atomic same-commit retrofits eliminate "promised but not delivered" states.** Validated v1.0 (Phase 8 anchor closure) → v1.3 (Phase 33 gap closure) → v1.4 (Phase 42 forward-promise scrub) → v1.4.1 (6× retrofits across Phases 44/45/46/47). Default rather than exception.
7. **Adversarial review surfaces invisible contradictions.** v1.4 Phase 42 (12-agent pattern) → v1.4.1 Phase 45 Plan 5 D-07 branch resolution gate. Worth the cost for terminal-integration phases.
8. **Audit allow-list as sidecar JSON beats inline harness arrays.** v1.4 introduced; v1.4.1 validated atomic-update discipline; v1.5 promoted sidecar pattern across all new harness checks (C11/C12/C13 all sidecar-backed). Confirmed default for v1.6+.
9. **Wave-based parallel execution with hotspot-ownership table.** v1.4.1 validated 3 concurrent (44/45/46); v1.5 validated 5 concurrent across 2 waves (51+53 Wave A; 54+55+56 Wave B). Limit is shared-write-hotspot count, not phase count. Append-only contract + ROADMAP hotspot ownership table is load-bearing.
10. **Informational-first→blocking promotion at terminal-finalization phase.** v1.4.1 (C6/C7/C9) → v1.5 (C11/C12/C13). 6 mechanical checks promoted across 2 milestones with zero regression introductions. Promote at dedicated harness-finalization phase (not earlier and not at content-phase close).
11. **Link-not-copy for cross-reference deliverables.** v1.5 DEFER-08 5-platform comparison: 240 cells link to per-platform matrix anchors instead of copying values. Collapses N×M sync points to N+M+1. Default for v1.6+ cross-reference docs.
12. **Auditor-independence via fresh-worktree spawn at terminal re-audit.** v1.4.1 Phase 47 → v1.5 Phase 61. Hard pre-condition for terminal re-audit phases — not optional.
