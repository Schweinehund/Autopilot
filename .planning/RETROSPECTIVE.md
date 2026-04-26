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

### Top Lessons (Verified Across Milestones)

1. **Navigation files written last** — Verified in v1.0 (Phase 7 after 1-6), v1.1 (Phase 17 after 11-16), v1.2 (Phase 25 after 20-24), v1.3 (Phase 32 after 26-31), v1.4 (Phase 42). Always eliminates broken-link churn.
2. **Template-driven consistency scales** — v1.0 established admin/L1/L2 templates, v1.1 extended with "what breaks" pattern, v1.2 adapted for macOS dual-portal, v1.3 extended with platform enum, v1.4 adapted for tri-portal Android, v1.4.1 extended to 4-portal (Knox) and 4-portal-pattern (Meta Quest). Templates compound in value.
3. **Verification during execution, not after** — v1.0/v1.1 had inline verification. v1.2 skipped on 2 phases and paid for it. v1.3 Phase 30 skipped — fixed via gap-closure phase. v1.4 closed with `tech_debt` (mitigated by v1.4.1 terminal re-audit). Discipline holds.
4. **Milestone audits catch silent gaps** — First applied seriously at v1.3 close. Surfaced verification debt no single-phase check caught. v1.4 audit produced the 3 defer items that scoped v1.4.1. Now a mandatory pre-close step.
5. **Pre-authored plans are durable** — v1.3 Phase 30 plans 30-09/10 pre-authored at plan time but not executed until Phase 33. v1.4.1 Phase 47 plans similarly pre-authored. Plans with explicit truth tables survive deferred execution with zero fidelity loss.
6. **Atomic same-commit retrofits eliminate "promised but not delivered" states.** Validated v1.0 (Phase 8 anchor closure) → v1.3 (Phase 33 gap closure) → v1.4 (Phase 42 forward-promise scrub) → v1.4.1 (6× retrofits across Phases 44/45/46/47). Default rather than exception.
7. **Adversarial review surfaces invisible contradictions.** v1.4 Phase 42 (12-agent pattern) → v1.4.1 Phase 45 Plan 5 D-07 branch resolution gate. Worth the cost for terminal-integration phases.
8. **Audit allow-list as sidecar JSON beats inline harness arrays.** v1.4 introduced; v1.4.1 validated atomic-update discipline. Promote sidecar pattern across all new harness checks in v1.5.
