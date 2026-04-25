---
gsd_state_version: 1.0
milestone: v1.4.1
milestone_name: Android Enterprise Completion & v1.4 Cleanup
status: executing
stopped_at: Phase 47 context gathered (adversarial review winners GA1-C/GA2-B/GA3-A/GA4-W3xD1)
last_updated: "2026-04-25T19:42:34.771Z"
last_activity: 2026-04-25
progress:
  total_phases: 6
  completed_phases: 5
  total_plans: 31
  completed_plans: 31
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-24)

**Core value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, and Android devices through Intune without escalating to engineering
**Current focus:** Phase 46 — COPE Full Admin

## Current Position

Phase: 46
Plan: Not started
Status: Executing Phase 46
Last activity: 2026-04-25

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
- [Phase 43]: Plan 43-04: authored regenerate-supervision-pins.mjs helper (3 modes: --report / --emit-stubs / --self-test) + README; D-12 self-test dogfood gate PASSES reproducing Phase 43 hand-authored 9-new-pin set; classifier tightened with structural refinements (markdown anchor + enclosing H2 section) to honor D-11 Tier-2 never-auto-pin invariant; AEAUDIT-05 helper-tooling substantively closed
- [Phase 43-v1-4-cleanup-audit-harness-fix]: Plan 43-05: D-22 metadata-only shift on L2 runbooks 18-21 (review_by +60d; last_verified unchanged at 2026-04-23)
- [Phase 43-v1-4-cleanup-audit-harness-fix]: Plan 43-05: D-24 belt-and-suspenders template sentinel (1970-01-01 # TEMPLATE-SENTINEL) paired with Plan 02 scope-filter
- [Phase 43-v1-4-cleanup-audit-harness-fix]: Plan 43-05: D-25 Android-scope lock honored (iOS/macOS/Windows templates untouched; routed to v1.5 backlog)
- [Phase 43]: Plan 43-06 integration-test confirmed v1.4.1 harness 8/8 PASS (exit 0) on current tree; scope-filter probe OK across 4 path classes; v1.4 harness C5 FAIL is documented D-01/D-02 frozen-predecessor divergence (NOT a regression)
- [Phase 43]: Plan 43-07: AOSP stub body 1089→696 words (D-18 ~700 target exact); PITFALL-7 + 9-H2 + 8-OEM + deferred-table all preserved (D-17); RealWear deep content migrated losslessly to PHASE-45-AOSP-SOURCE.md (D-16/D-20); no forward-link from stub to prep shell (D-19); Phase 45 directory bootstrapped; harness C3 shows 696 + C6 shows 1/1 PITFALL-7 preservation; AEAUDIT-04 stub-trim delta closed
- [Phase 43]: Plan 43-08: Bootstrapped first CI surface (commit 54bbc34) — .github/workflows/audit-harness-integrity.yml 4-job (parse/path-match/harness-run/pin-helper-advisory) + scripts/hooks/pre-commit.sh native bash + node. Minimum-surface over Husky/lefthook; continue-on-error on advisory job (D-14/D-15); atomic CI commit honors D-07.3. AEAUDIT-05 closed.
- [Phase 43-v1-4-cleanup-audit-harness-fix]: Plan 43-09: DEFER-04 formally closed via inline-equivalent /gsd-validate-phase 39 re-gate (CONTEXT D-21 fallback path + auto-mode chain directive); Phase 39 directory rehydrated from commit ef7717b (11 artifacts) via Pattern K git-history-restore; 39-VALIDATION.md Validation Audit 2026-04-24 trailer + v1.4-MILESTONE-AUDIT.md re_audit_resolution block record classification change C3_aosp_wordcount: informational -> PASS; commit c782af6; AEAUDIT-04 fully resolved
- [Phase 43]: Plan 43-10 terminal sanity (D-27 step 10): v1.4.1 harness 8/8 PASS, v1.4 harness 4/5 PASS with documented architectural C5 divergence on sentinel template (frozen-predecessor per D-01/D-02), regenerate-supervision-pins.mjs --self-test PASS with identical-diff (9 hand-authored new pins reproduced), helper --report zero un-pinned, pre-commit hook PASS. 43-VERIFICATION.md composed with 10-plan wave record + 9 must-haves evidence + ROADMAP 5 success-criteria goal-backward check + AEAUDIT-02..05 Closed rows + DEFER-04 resolution evidence. Phase 43 complete; unblocks /gsd-verify-work + /gsd-plan-phase 44/45/46 parallel.
- [Phase 44]: D-01 implemented: 5-SKU disambiguation H2 with 5-row table; KPE Standard|Premium adjacent columns; cites 2024-03-21 Samsung free KPE Premium licensing
- [Phase 44]: D-02 implemented: Step 0 H2 verbatim title 'Step 0 — Samsung Knox Portal B2B account approval (1-2 business days)' with parallel-work guidance
- [Phase 44]: D-03 implemented: anti-paste blockquote wrapped by AEKNOX-03-shared-anti-paste-block HTML markers, immediately above FLAT EXTRA_ENROLLMENT_TOKEN JSON; ready for Plan 07 verbatim copy into ZT doc
- [Phase 44-knox-mobile-enrollment]: Plan 44-02: L1 runbook 28 (28-android-knox-enrollment-failed.md, 234 lines) authored with D-10 sectioned actor-boundary + D-12 three-part escalation packet; 4 Causes A-D + Cause E escalate-only; closes Phase 40 ANDR28 placeholder; cross-links to admin doc 07 (5 anchors verified) and forward-references L2 runbook 22 (Plan 03 sibling)
- [Phase 44]: Plan 44-03: L2 runbook 22 (22-android-knox-investigation.md, 305 lines) authored with Pattern A-E (D-09 sectioned actor-boundary + per-Pattern Microsoft Support escalation packet 3-bullets); Pattern B Strong-integrity verdict-failure attribution; Play Integrity 3-tier reference H2 (zero SafetyNet); 4-step Investigation Data Collection; closes L1 runbook 28 forward-reference loop (Plan 44-02 sibling); AEKNOX-03 predicate exit 0; audit 8/8 PASS
- [Phase 44]: Plan 44-04: AEKNOX-04 closed via 3 surgical edits to docs/reference/android-capability-matrix.md (frontmatter dates, line 86 cross-ref, lines 113-119 anchor+H3+body); audit harness 8/8 PASS; AEAUDIT-04 + AOSP deferred-row invariants preserved
- [Phase 44-knox-mobile-enrollment]: Plan 44-05: AEKNOX-05 closed — Mermaid 5->6 branch (Knox - KME Samsung-only); Setup Sequence item 3; KME-Path Prerequisites H3 between ZTE-Path and AOSP-Path; 4 surgical edits + 1 changelog row; audit 8/8 PASS
- [Phase 44]: Plan 44-06: AEKNOX-06 closed — 3 new glossary entries (Knox / KME / KPE) under Provisioning Methods H2 with C2-compliant Cross-platform notes; Knox->AMAPI cross-link added FROM Knox entry (no duplicate); WPCO single-instance preserved; #knox-mobile-enrollment anchor in 02-provisioning-methods.md populated with 4 cross-links (admin doc 07, L1 28, L2 22, capability matrix); audit 8/8 PASS; sidecar line-number re-pin (counts unchanged at 18 supervision + 4 SafetyNet)
- [Phase 44-knox-mobile-enrollment]: Plan 44-07: AEKNOX-07 closed — ZT line 16 KME/ZT mutex callout + COBO line 162 Samsung-admins callout reciprocal forward-link to admin doc 07; AEKNOX-03 anti-paste blockquote retrofitted into ZT line 93 byte-identical to admin doc 07 (D-03 diff empty); 2 additional Knox v1.4.1 deferral residues scrubbed in ZT lines 133+190 [Rule 1 auto-fix]; v1.4 forward-promises closed; audit 8/8 PASS; Phase 44 terminal end-state achieved
- [Phase 45]: Plan 45-01: RealWear AOSP admin guide shipped at docs/admin-setup-android/09-aosp-realwear.md (183 lines, 12 H2s = 11 baseline + 1 Wi-Fi QR Embedding Walkthrough add-on per D-01+D-02; PSK-only-NOT-EAP staging-Wi-Fi discipline overrides PHASE-45-AOSP-SOURCE.md placeholder per RESEARCH.md §1; PITFALL-7 framing 5 hits per D-04+D-23; 7 stable anchors for Wave 3 cross-link landing per D-05+D-21; audit harness 8/8 PASS; AEAOSPFULL-01 closed)
- [Phase 45-per-oem-aosp-expansion]: Plan 45-02 shipped Zebra WS50 AOSP admin guide with 12 H2s (incl. REQUIRED OEMConfig APK Push add-on), two-OEMConfig-app disambiguation table, Android-12-NOT-supported callout (4 hits), license-tier escalation pathway bullet (W-1 fix), 5 PITFALL-7 hits, 7 stable anchors; 197 lines; harness 8/8 PASS
- [Phase 45]: Plan 45-03: Pico AOSP admin guide shipped (PICO 4 Enterprise + PICO Neo3 Pro/Eye); OPTIONAL Pico Business Suite Coexistence add-on H2 with verbatim 'OPTIONAL' wording per AEAOSPFULL-03; Enterprise SKU disambiguation discipline (4 hits); 5 PITFALL-7 framing hits; 7 stable D-05 anchors; 6 MEDIUM source-confidence markers (Pico Business Suite price band community-derived); 181 lines; audit harness 8/8 PASS; AEAOSPFULL-03 closed
- [Phase 45]: Plan 45-04 HTC VIVE Focus AOSP admin guide shipped — pure 11-H2 baseline (NO add-on H2s per D-02; only Wave 1 plan with no add-ons; preserves AEAOSPFULL-04 simplest-of-AR/VR-OEMs framing); 3-model firmware floor matrix; verbatim in-device path Settings > Advanced > MDM setup > QR code reproduced 8 times across 3 primary surfaces; Vive Business Management System framed as alternative MDM not coexistence at 3 surfaces
- [Phase 45]: Plan 45-05 Meta Quest AOSP admin guide shipped (Quest 2 / 3 / 3s / Pro) — heaviest Wave 1 doc with 13 H2s = 11 baseline + 2 REQUIRED add-on H2s per D-02 LOCKED override of F-1B-CRIT-01 (Meta for Work Portal Setup + Meta Horizon Subscription Status); 4-portal pattern (Intune + Meta for Work; MGP/ZT N/A) preserved per D-08; Meta Horizon framed as ALIVE in transformed form per RESEARCH.md §2 D-06 RESOLVED HIGH-confidence + D-07 Branch 2 (HMS becomes FREE post-2026-02-20; maintenance mode through 2030-01-04); mandatory ⚠️ Feb 20 2026 callout in Scope and Status per ROADMAP SC#3 verbatim; per-model regional restrictions (Quest 2/3/Pro select regions; Quest 3s no restriction) with per-model H3 sub-anchors per D-08; Step 0 Meta for Work approval H3 inside Provisioning Steps per D-09; 30-day Meta Horizon re-verify trigger row in Renewal/Maintenance per D-10 special case; Intune-direct fallback as parallel-path option; 4 verbatim Meta-source quotes; 5 PITFALL-7 hits; 12 stable anchors; 242 lines; audit harness 8/8 PASS; AEAOSPFULL-05 closed; Wave 1 COMPLETE (5/5 per-OEM admin docs shipped)
- [Phase 45]: [Phase 45]: Plan 45-06: AOSP OEM matrix shipped at docs/reference/aosp-oem-matrix.md (85 lines) — 4 H2 sub-tables in fixed order per D-11 (Hardware Scope / Enrollment Method and Wi-Fi Embedding / Vendor Portals and Licensing / Intune AOSP Mode); single ## Scope H2 with PITFALL-7 framing once per D-13; Meta-row [^meta-volatility] reference-style footnote per D-14 (referenced from 3 cells); ## Source Attribution H2 per D-15 with 5 per-OEM HIGH pins + W-3 section-level mode-confidence pin replacing 10 per-cell MEDIUM markers; cell-value rules literal-strings only per D-16 (no + notation); ## Version History H2 per sibling convention. Audit harness 8/8 PASS. Anchor target ready for Wave 4 Plan 45-10 retrofit of android-capability-matrix.md:121-127 per AEAOSPFULL-09
- [Phase 45]: Plan 45-07 collapsed 06-aosp-stub.md Deferred Content H2 + 8-row table per AEAOSPFULL-09 partial; preserved Phase 39 D-11 9-position whitelist (8 H2s + 2 H3s) + PITFALL-7 framing + 8-OEM enumeration + Platform banners + HTML-comment subtractive deletions per D-24 LOCKED; flipped inline scope-and-status blockquote from 'planned for v1.4.1' to 'SHIPPED in v1.4.1 (Phase 45)'; injected 5 forward cross-links to Wave 1 admin docs 09-13. Audit harness 8/8 PASS.
- [Phase 45]: L1 runbook 29 ships 5 OEM-scoped Causes A-E + aggregate Escalation Criteria H2 + in-runbook OEM-identification step (D-17/D-20); sibling-departure rationale documented in Version History (D-22)
- [Phase 45]: Plan 09: L2 runbook 23 ships per-OEM Pattern A-E (1:1 routing from L1 Causes A-E) + per-Pattern Microsoft Support escalation packet 3-bullet shape + Play Integrity 3-tier verdict reference (ZERO SafetyNet) per D-18
- [Phase 45]: Plan 45-10: AEAOSPFULL-09 final atomic-retrofit set closed in single commit (3400bff) — 6 file edits + 1 file deletion (PHASE-45-AOSP-SOURCE.md per Phase 43 D-20 lifecycle); ANDR29 single-target Mermaid swap preserves Phase 40 D-05 LOCK + ROADMAP SC#4 verbatim 'single click target'; capability matrix anchor fill + provisioning methods AOSP token asymmetry H2 + L1 index Runbook 29 + glossary OEMConfig per D-25 append-only contract; allow-list line-shift maintenance (Rule 3 auto-fix) coordinated within atomic commit; audit harness 8/8 PASS; Phase 45 terminal end-state achieved 10/10 plans

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

Last session: 2026-04-25T19:42:34.760Z
Stopped at: Phase 47 context gathered (adversarial review winners GA1-C/GA2-B/GA3-A/GA4-W3xD1)
Next action: Execute Wave 2 — Plan 45-06 (aosp-oem-matrix.md, 4 capability H2 sub-tables, 5 OEM rows, Meta footnote per D-14) + Plan 45-07 (06-aosp-stub.md deferred-content table collapse, D-24 LOCKED preservation)
