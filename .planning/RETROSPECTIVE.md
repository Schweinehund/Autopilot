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

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 10 | 24 | Established L1/L2/Admin tiered doc structure and navigation-last pattern |
| v1.1 | 9 | 18 | Added per-setting "what breaks" callouts and confidence-attributed citations |
| v1.2 | 6 | 20 | Cross-platform foundation-first, parallel phase execution, platform frontmatter taxonomy |
| v1.3 | 8 | 44 | Milestone-audit-driven gap-closure phase (33) with pre-authored plan execution; cross-phase credit preservation; REVIEW-FIX lifecycle hygiene |

### Top Lessons (Verified Across Milestones)

1. **Navigation files written last** — Verified in v1.0 (Phase 7 after 1-6), v1.1 (Phase 17 after 11-16), v1.2 (Phase 25 after 20-24), v1.3 (Phase 32 after 26-31). Always eliminates broken-link churn.
2. **Template-driven consistency scales** — v1.0 established admin/L1/L2 templates, v1.1 extended with "what breaks" pattern, v1.2 adapted for macOS dual-portal, v1.3 extended with platform enum to cover iOS. Templates compound in value.
3. **Verification during execution, not after** — v1.0/v1.1 had inline verification. v1.2 skipped verification on 2 phases and paid for it in audit overhead. v1.3 Phase 30 also skipped — same lesson, reinforced via an explicit gap-closure phase rather than retroactive fix.
4. **Milestone audits catch silent gaps** — First applied seriously at v1.3 close. Surfaced I-1, I-2, and L1TS verification debt that no single-phase verification would have caught. Now a mandatory pre-close step.
5. **Pre-authored plans are durable** — v1.3 Phase 30 plans 30-09/10 were pre-authored at plan time but not executed until Phase 33 (3 days later). Zero fidelity loss on per-row execution. Plans with explicit truth tables survive deferred execution.
