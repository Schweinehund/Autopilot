---
gsd_state_version: 1.0
milestone: v1.4.1
milestone_name: Android Enterprise Completion & v1.4 Cleanup
status: executing
stopped_at: Completed 43-03-PLAN.md (AEAUDIT-02 closed; C2 PASS)
last_updated: "2026-04-24T20:46:07.570Z"
last_activity: 2026-04-24
progress:
  total_phases: 1
  completed_phases: 0
  total_plans: 10
  completed_plans: 3
  percent: 30
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-24)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, and Android devices through Intune without escalating to engineering
**Current focus:** Phase 43 — v1-4-cleanup-audit-harness-fix

## Current Position

Phase: 43 (v1-4-cleanup-audit-harness-fix) — EXECUTING
Plan: 4 of 10
Status: Ready to execute
Last activity: 2026-04-24

**Phase sequence:**

- Phase 43 (cleanup) MUST land first — sidecar path blocker + allow-list baseline + freshness normalization + AOSP stub content-migration prep
- Phases 44 (Knox) / 45 (AOSP per-OEM) / 46 (COPE) parallelize — disjoint file sets, append-only contract on shared files (capability matrix, Mermaid, glossary index) per v1.4 Phase 42 D-03 precedent
- Phase 47 (integration + terminal re-audit) MUST land last — owns atomic matrix / Mermaid / glossary rebuilds + status flip

## Performance Metrics

**Velocity across milestones:**

- v1.0: 10 phases, 24 plans — shipped 2026-04-10
- v1.1: 9 phases, 18 plans — shipped 2026-04-13
- v1.2: 6 phases, 20 plans — shipped 2026-04-15
- v1.3: 8 phases, 44 plans — shipped 2026-04-19
- v1.4: 9 phases, 40 plans — shipped 2026-04-24

**Totals (through v1.4):** 42 phases, 146 plans, 143+ documentation files across Windows APv1/APv2, macOS ADE, iOS/iPadOS, and Android Enterprise.

**v1.4.1 planned:** 5 phases (43-47), 28 requirements across 5 categories (AEAUDIT-02..05 / AEKNOX-01..07 / AEAOSPFULL-01..09 / AECOPE-01..04 / AEINTEG-01..04). Plan counts per-phase TBD via `/gsd-plan-phase` runs.

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. All v1.0-v1.4 decisions validated with outcomes.

**v1.4 decisions (carried forward):**

- v1.4 shipped with audit status `tech_debt` (accepted). v1.4.1 Phase 47 re-runs `scripts/validation/v1.4.1-milestone-audit.mjs` (file-versioned copy) after all content lands and flips status to `passed`.
- Tri-portal admin template (Intune + Managed Google Play + Zero-Touch portal) is the canonical Android admin surface — KME (Phase 44) extends this pattern for Samsung as a 4th-portal overlay; Meta Quest (Phase 45) extends as a 4-portal pattern with Meta for Work.
- KME↔ZT Samsung mutual-exclusion callout in Phase 35 ZT portal doc (line 16) is the reciprocal pin for Phase 44 Knox guide — Phase 44 must add forward link + verbatim-quote Google's canonical "KME wins when both configured" precedence rule.
- Phase 39 AOSP stub PITFALL-7 "not supported under AOSP" framing is LOCKED; Phase 45 per-OEM expansion must preserve the framing and pair per-OEM "supported" assertions with the AOSP baseline caveat.
- COPE trajectory: Google has signaled WPCO as the forward path. Phase 46 scope is research-gated — research gate must verify no formal deprecation before authoring; if deprecation declared, re-scope to rationale doc at 40% scope.
- `last_verified` 60-day rule was set in Phase 34 D-14; Phase 43 retrofit normalizes 4 L2 runbooks (18-21) from 90-day authoring-time cycle to 60-day.
- Audit allow-list is CONTEXT-enumerated; ~27 additional pins needed for legitimate iOS-attributed supervision bridge-prose references in `_glossary-android.md` + `android-capability-matrix.md` Cross-Platform Equivalences section (10→~37 total).
- Audit harness file-versioning: copy `v1.4-milestone-audit.mjs` to `v1.4.1-milestone-audit.mjs` (preserves v1.4 commit-SHA `3c3a140` reproducibility anchor; Path A preferred over in-place extension).
- Sidecar migration: `.planning/phases/42-*/v1.4-audit-allowlist.json` → `scripts/validation/v1.4-audit-allowlist.json` (atomic same-commit with harness line 57 update; CI test that allow-list parses AND has >0 entries).
- COPE ships as FULL admin guide (Path A confirmed 2026-04-24 against MS Learn `setup-corporate-work-profile` updated 2026-04-16; Intune UI label "Corporate-owned devices with work profile"; two GA token types; not deprecated; Google WPCO = terminology evolution, not product deprecation).
- [Phase 43]: Plan 43-01 rescue commit a868882: FROZEN marker placed on line 2 (after shebang) rather than line 1 — Node ESM requires shebang on line 1; fix preserves D-02 intent (marker in lines 1-10) while keeping harness executable. Plan 43-02 cp-then-additive editing must drop FROZEN fragment from v1.4.1 copy (kept for v1.4 frozen-predecessor only).
- [Phase 43]: Plan 43-02 scaffold commit be1087b: v1.4.1 harness = v1.4 copy + 6 additive edits (C6/C7/C9 informational-first, _*-prefix scope-filter, TEMPLATE-SENTINEL C5 parse). Sidecar skeleton 4+9+3. Phase 42 D-25 no-shared-module contract honored.
- [Phase 43]: Plan 43-03 hand-authored 9 new iOS-attributed bridge-prose supervision pins into both v1.4 and v1.4.1 allow-list sidecars (9 to 18 total); harness C2 flipped FAIL (27 un-exempted findings) to PASS; AEAUDIT-02 substantively closed. RESEARCH '23/14-new' narrative resolved to authoritative 18 pins per canonical JSON block.

### Pending Todos

- Plan Phase 43 via `/gsd-plan-phase 43` (MUST execute before 44/45/46)
- After Phase 43 ships: plan 44, 45, 46 in parallel (disjoint file sets)
- Plan Phase 47 LAST (terminal re-audit sees final state; owns atomic matrix/Mermaid/glossary rebuilds)

### Research flags to verify at plan time (v1.4.1)

- **Phase 43 (cleanup):** Sidecar location decision (`scripts/validation/` vs `.planning/validation/`) — recommend former for co-location with harness; harness file-versioning decision (Path A copy — preferred); 60-day rule still Phase 34 D-14 policy; Phase 41 VERIFICATION.md validator placement (must run BEFORE downstream phases write new content, producing `passed` or `human_needed` — no new deferrals)
- **Phase 44 (Knox):** Current Samsung Knox portal UI/URL (portal has redesign history); current KME license-tier gate (verified free baseline; Knox Suite gates Advanced); Entra-ID / Google-ID prerequisites; Knox L1 routing decision — KME is a provisioning method onto COBO mode, so runbook 28 extends COBO flow (NOT new triage-tree branch); DPC extras JSON schema current state
- **Phase 45 (AOSP):** Current OEM GA status for RealWear + Zebra + Pico + HTC VIVE Focus + Meta Quest on Android 11/12/15; **CRITICAL — Meta Horizon wind-down date re-verification at plan time (community-sourced Feb 20, 2026; MEDIUM confidence)**; per-OEM Wi-Fi embedding variance (RealWear REQUIRED vs others OPTIONAL); Pico business license terms (mid-2025 changes reported); Intune Suite / Plan 2 licensing gate for AR/VR specialty devices; Zebra WS50 OEMConfig APK push delivery confirmed (NOT MGP)
- **Phase 46 (COPE):** **MANDATORY RESEARCH GATE BEFORE AUTHORING** — Google AE Help + Android Developers release notes + Bayton FAQ for "COPE deprecated" signal; Intune admin center UI-label verification ("Corporate-owned devices with work profile"); Android 15 Private space Intune support status; Android 11+ `afw#setup`/NFC removal still accurate; **banned phrases** ("deprecated" / "end of life" / "removed") discipline via C9 sidecar JSON
- **Phase 47 (integration + re-audit):** Re-audit acceptance criteria; classification of any new C2 findings (informational-first for C6-C10 per D-29 grace-period pattern); capability matrix unified-rebuild wave structure (3 row sets — Knox + AOSP + COPE); glossary single-author merge sequencing (line 15 alphabetical index hotspot); MILESTONE-AUDIT `re_audit_resolution:` format (commit SHA + timestamp)

### Deferred Items (tracked for v1.5)

- **DEFER-07 / AENAVUNIFY-04** — Cross-platform nav integration for Android; backport into `docs/index.md` banner/H1 + `common-issues.md` + `quick-ref-l1.md` + `quick-ref-l2.md`
- **DEFER-08 / AECOMPARE-01** — 4-platform capability comparison document (Windows + macOS + iOS + Android)

### Blockers/Concerns

- **Sidecar path blocker (Phase 43 must fix first):** `scripts/validation/v1.4-milestone-audit.mjs:57` hardcodes path to archived `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`. Without atomic migration + harness update, audit silently degrades (parse-error → empty exemptions arrays at harness line 59-62), invisibly losing allow-list. HIGH severity; atomic same-commit discipline required.
- **COPE scope re-scope trigger (Phase 46):** Mandatory research gate BEFORE authoring. If Google AE Help / Android Developers / Bayton FAQ declares formal deprecation, re-scope Phase 46 to deprecation-rationale doc at 40% scope (preserves what-was-written as historical appendix). Current signal (2026-04-24) is HIGH confidence COPE active; gate is belt-and-braces.
- **Meta Horizon wind-down volatility (Phase 45):** Community-sourced Feb 20, 2026 wind-down report (MEDIUM confidence). Phase 45 plan-time must re-verify and carry Intune-direct fallback guidance ("use Intune AOSP profile; do NOT rely on Meta Horizon for net-new").
- **Parallel merge conflicts (Phases 44/45/46 → 47):** Capability matrix + Mermaid + glossary line 15 are shared write hotspots. Mitigation: append-only H2-block additions per content phase (D-03 precedent); integration Phase 47 owns atomic single-author rebuilds in Wave 1/2 pattern (mirrors v1.4 Phase 42).
- **PITFALL-7 erosion (Phase 45):** v1.4 Phase 39 "not supported under AOSP" framing must survive per-OEM "supported" assertions. Explicit carry-forward rule in Phase 45 CONTEXT; proposed harness C6 regex-detect (informational-first grace per D-29).
- **5-SKU Knox ambiguity (Phase 44):** KME / KPE Standard / KPE Premium / Knox Manage / Knox Suite / Knox Configure confusion risks "KME requires paid license" inaccuracy OR admins paying for Knox Manage. Mitigation: 5-SKU disambiguation table as H2 (not footnote); "Intune supplies KPE Premium transparently" anti-pattern callout; proposed harness C7 bare-`Knox` regex (informational-first).
- **Audit re-run must flip `tech_debt → passed`** after all content lands. Integration Phase 47 terminal plan runs audit LAST (not interleaved); every new v1.4.1 doc must use Phase 34 template so C5 freshness passes on first run.

## Session Continuity

Last session: 2026-04-24T20:46:07.561Z
Stopped at: Completed 43-03-PLAN.md (AEAUDIT-02 closed; C2 PASS)
Next action: `/gsd-plan-phase 43` (cleanup + audit harness fix — sidecar path + allow-list + freshness + AOSP stub prep)
