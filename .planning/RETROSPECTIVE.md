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

## Cross-Milestone Trends

### Process Evolution

| Milestone | Phases | Plans | Key Change |
|-----------|--------|-------|------------|
| v1.0 | 10 | 24 | Established L1/L2/Admin tiered doc structure and navigation-last pattern |
| v1.1 | 9 | 18 | Added per-setting "what breaks" callouts and confidence-attributed citations |
| v1.2 | 6 | 20 | Cross-platform foundation-first, parallel phase execution, platform frontmatter taxonomy |

### Top Lessons (Verified Across Milestones)

1. **Navigation files written last** — Verified in v1.0 (Phase 7 after 1-6), v1.1 (Phase 17 after 11-16), v1.2 (Phase 25 after 20-24). Always eliminates broken-link churn.
2. **Template-driven consistency scales** — v1.0 established admin/L1/L2 templates, v1.1 extended with "what breaks" pattern, v1.2 adapted for macOS dual-portal. Templates compound in value.
3. **Verification during execution, not after** — v1.0/v1.1 had inline verification. v1.2 skipped verification on 2 phases and paid for it in audit overhead.
