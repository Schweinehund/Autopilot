---
gsd_state_version: 1.0
milestone: v1.4.1
milestone_name: Android Enterprise Completion & v1.4 Cleanup
status: defining_requirements
stopped_at: Milestone v1.4.1 started — defining requirements
last_updated: "2026-04-24T16:11:48.587Z"
last_activity: 2026-04-24
progress:
  total_phases: 0
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-24)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, and Android devices through Intune without escalating to engineering
**Current focus:** v1.4.1 requirements definition — close all v1.4 Android deferred items (DEFER-01..06)

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-04-24 — Milestone v1.4.1 started

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24

**Totals (through v1.4):** 42 phases, 146 plans, 143+ documentation files across Windows APv1/APv2, macOS ADE, iOS/iPadOS, and Android Enterprise.

**v1.4.1 projected:** TBD — roadmapper output from /gsd-new-milestone will size this. Early shape estimate: 3-5 phases covering (a) cleanup + hardening (DEFER-01..03), (b) Knox Mobile Enrollment (DEFER-04), (c) full AOSP per-OEM expansion (DEFER-05), (d) COPE full admin path or deprecation-rationale (DEFER-06), (e) milestone integration + re-audit closing `tech_debt → passed`.

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. All v1.0-v1.4 decisions validated with outcomes.

**v1.4 decisions (carried forward):**

- v1.4 shipped with audit status `tech_debt` (accepted). v1.4.1 must re-run `scripts/validation/v1.4-milestone-audit.mjs` after DEFER-01/02 complete and flip status to `passed`.
- Tri-portal admin template (Intune + Managed Google Play + Zero-Touch portal) is the canonical Android admin surface — Knox Mobile Enrollment guide (DEFER-04) extends this pattern for Samsung; treat KME as a 4th portal overlay, not a replacement.
- KME↔ZT Samsung mutual-exclusion callout in Phase 35 ZT portal doc is the reciprocal pin for DEFER-04 Knox guide — DEFER-04 must add the forward link.
- Phase 39 AOSP stub enforced the "not supported under AOSP" PITFALL-7 framing; DEFER-05 expansion must preserve this framing for v1.4-captured OEM gaps while adding per-OEM supported-feature matrices for RealWear / Zebra / Pico / HTC VIVE Focus / Meta Quest.
- COPE trajectory: Google has signaled WPCO as the forward path. DEFER-06 scope is research-gated — researcher/discuss-phase must verify whether v1.4.1 ships a COPE full admin guide OR a formal deprecation-rationale doc.
- `last_verified` 60-day rule was set in Phase 34 D-14; DEFER-02 retrofit normalizes 4 L2 runbooks (18-21) from their 90-day authoring-time cycle to match.
- Audit allow-list is CONTEXT-enumerated; ~27 additional pins needed for legitimate iOS-attributed supervision bridge-prose references in `_glossary-android.md` + `android-capability-matrix.md` Cross-Platform Equivalences section.

### Pending Todos

- Define v1.4.1 requirements (REQUIREMENTS.md) with REQ-IDs continuing from v1.4 (AEAUDIT-02+, AEKNOX-01+, AEAOSP-02+, AECOPE-01+)
- Spawn gsd-roadmapper for v1.4.1 starting at Phase 43 (continue numbering from v1.4 per convention)
- Plan Phase 43 after roadmap approval

### Research flags to verify at plan time (v1.4.1)

- **DEFER-04 Knox ME:** Current Samsung Knox portal UI and URL (portal has redesign history); current KME license-tier gate; Entra-ID / Google-ID prerequisites; reciprocal mutual-exclusion wording with Zero-Touch Samsung enrollment
- **DEFER-05 AOSP per-OEM:** Current OEM GA status for RealWear + Zebra + Pico + HTC VIVE Focus + Meta Quest on Android 11/12/15; supported-features matrix (enrollment methods, managed config, remote actions); whether Wi-Fi credential embedding / one-device-at-a-time / QR-only constraints from Phase 39 still apply uniformly
- **DEFER-06 COPE:** Current Google wording on COPE vs. WPCO ("recommended" vs. "deprecated" vs. "legacy"); whether Intune still surfaces COPE as a first-class enrollment mode or only via admin-initiated profile swap; decision: full admin guide or deprecation-rationale doc
- **DEFER-01 allow-list:** Exact line enumeration of legitimate iOS-attributed supervision refs in `docs/_glossary-android.md` + `docs/android-capability-matrix.md` before sidecar update; audit-strict regex compliance from v1.4 audit harness
- **DEFER-02 freshness:** Confirm 60-day rule is still the policy (per Phase 34 D-14); apply to `docs/admin-setup-android/admin-template-android.md` frontmatter
- **DEFER-03 AOSP stub:** Phase 39 envelope (600-900 words) vs. actual body (~1089) — decide trim vs. envelope update at `/gsd-validate-phase 39` time

### Deferred Items (tracked for v1.5)

- Cross-platform nav integration for Android (AENAVUNIFY-04, DEFER-07) — backport into `docs/index.md` + `common-issues.md` + `quick-ref-l1.md` + `quick-ref-l2.md`
- 4-platform capability comparison document (AECOMPARE-01, DEFER-08) — Windows + macOS + iOS + Android

### Blockers/Concerns

- **COPE scope is live-research-gated.** DEFER-06 may produce a deprecation-rationale doc rather than a full admin guide depending on Google's current positioning. Researcher and discuss-phase must resolve before planning Phase 4x for COPE.
- **AOSP per-OEM GA drift.** DEFER-05 depends on current OEM supported-device pages; some vendors may still be speculative. Plan-time verification required per phase.
- **Audit re-run must flip `tech_debt → passed`** after DEFER-01 and DEFER-02 complete. Integration phase must include an audit re-run plan.

## Session Continuity

Last session: 2026-04-24T16:11:48.587Z
Stopped at: Milestone v1.4.1 started — defining requirements
Next action: Define requirements (REQUIREMENTS.md) and spawn gsd-roadmapper
