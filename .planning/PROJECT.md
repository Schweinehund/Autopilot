# Windows Autopilot & macOS Provisioning Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot and macOS ADE deployments through Microsoft Intune. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and tiered operational documentation that IT Service Desk (L1), Desktop Engineering (L2), and Intune Admin teams can use to troubleshoot and configure deployments across both platforms.

## Core Value

IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, and Android devices through Intune without escalating to engineering — covering APv1, APv2, macOS ADE, iOS/iPadOS, and Android Enterprise (COBO / BYOD Work Profile / Dedicated / Zero-Touch / AOSP) enrollment frameworks with role-appropriate documentation.

## Current Milestone: v1.8 Tooling Debt Closure + Chain-Resilience Hardening

**Goal:** Close v1.7 tooling debt — fix the `.claude/commands/gsd-complete-milestone.md` archive-extraction logic emitting placeholder garbage into `MILESTONES.md` (RECURRENCE-CONFIRMED 2026-05-29), harden the validator chain's diagnostic surface (CHAIN-WRAPPER-01 stdout+stderr capture), forward-port HEAD-coupled chain validators across `check-phase-{48..66}.mjs` to the frozen-aware pattern (HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective), close Phase 67 SWEEP-02's 3-site VPP-location-token carry-over — bumping audit harness lineage v1.7 → v1.8 per Path-A convention.

**Target features (4 pillars):**

- **Pillar A — Archive-Automation Root-Cause Fix (ARCHIVE-01 + ARCHIVE-02)** — Investigate `.claude/commands/gsd-complete-milestone.md` (or underlying `gsd-sdk query milestone.complete` SDK handler) extraction-pattern logic emitting `"One-liner:"` / `"SUBSUMED BY PLAN..."` / `"Hash:"` placeholder labels into MILESTONES.md milestone-close entries (recurrence active 2026-05-29 per `v1.7-DEFERRED-CLEANUP.md` ARCHIVE-01 status update); ship regression-test fixture (synthetic milestone-close → diff-check assertion); sweep `MILESTONES.md` v1.0..v1.4.1 historical residue (v1.2 known 3-line `One-liner:` residue per ARCHIVE-02)
- **Pillar B — Chain-Wrapper Hardening (CHAIN-WRAPPER-01)** — Fix `check-phase-66.mjs:313` chain-apex wrapper to capture both `err.stdout` AND `err.stderr` (closes the 2-week-masking surface that hid SCOPE-GAP-61 on Windows local until GHA workflow_dispatch surfaced it); per-validator stdout-vs-stderr audit + chain-apex regression sweep
- **Pillar C — Retrospective Forward-Port (HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective)** — Scan `check-phase-{48..66}.mjs` (19 validators) for HEAD-coupled assertions whose docstrings cite milestone-close state; convert to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers parallel to `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` / `readCorpusFileAtV17Close()`; per-validator class signature (validator name OR docstring cites milestone-close state but implementation reads HEAD via `readFile()`); scope-discipline guardrail — if scan surfaces another SCOPE-GAP-class discovery, route to v1.9+ rather than ballooning v1.8
- **Pillar D — v1.8 Audit Harness Lineage Bump + Milestone Close** — Path-A copy v1.7 → v1.8: `v1.8-milestone-audit.mjs` + `v1.8-audit-allowlist.json`; inherit C1-C13 + C14/C15/C16 + sidecar shape; author `check-phase-71..NN.mjs` per validator-as-deliverable pattern; CI workflow `audit-harness-v1.8-integrity.yml` as fourth parallel coexistence file (v1.4 + v1.5 + v1.6 + v1.7 + v1.8); BASELINE_12 freshness comment in `regenerate-supervision-pins.mjs` (closes BASELINE_11 v1.7 carry-over); VPP-3-sites surgical rename in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (Phase 67 SWEEP-02 carry-over per `v1.7-DEFERRED-CLEANUP.md` lines 208-223); terminal re-audit at v1.8 close from fresh `git clone --no-hardlinks` into `$env:TEMP\v1.8-audit-<rand>` via fresh `gsd-executor` sub-agent + cross-OS Linux GHA — 3-axis stacking (D-03 + D-22 + CILINUX) inheriting v1.7 Plan 70-04 precedent; `v1.8-MILESTONE-AUDIT.md` + `v1.8-DEFERRED-CLEANUP.md` (carries CI-3 + Multi-tenant + ABDevice API + per-OU CRD + Account Holder + ASM forward to v1.9+)

**Key constraints:**

- **CI-3 DEFERRED to v1.9+** — Managed Apple ID → Managed Apple Account corpus rename (45 occurrences across 16 files) waits until Microsoft Intune portal adopts rebrand (trigger: post-2026-07-01 quarterly tutorial refresh per `v1.7-DEFERRED-CLEANUP.md:252`); sweeping now would create term-mismatch between docs and admin's actual portal experience
- **Other v1.7 deferrals carried forward** — Multi-tenant Apple Business / Apple Business Device API / per-OU CRD / Account Holder standalone runbook / ASM all remain in `v1.8-DEFERRED-CLEANUP.md` for v1.9+ consideration
- **Phase numbering** continues from v1.7 close at Phase 70 → v1.8 spans Phase 71+
- **Atomic harness commit pattern preserved** — Pillar D lineage bump follows v1.5 Plan 60-08 / v1.6 Phase 62-08 / v1.6 Phase 66-02 / v1.7 Plan 70-02 atomic-commit precedent
- **Sequential-on-main-tree execution** — per `.planning/config.json` `use_worktrees:false` user constraint (durable through v1.7)
- **Auditor-independence at terminal re-audit** — 3-axis stacking inherited from v1.7 Plan 70-04 first-operationalization (fresh-clone D-03 + fresh sub-agent D-22 + cross-OS Linux GHA)
- **HARNESS-FORWARD-01 scope discipline** — Pillar C is 2-4h scan-and-convert across 19 validator files; explicit guardrail prevents v1.8 ballooning if retrospective surfaces another SCOPE-GAP-class discovery
- **Anti-precedent risk preserved** — Path-A inheritance (5 milestones strong: v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7) extended to 6th milestone; predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7 byte-unchanged invariant maintained
- **Estimated scope** — ~5-7h work, 4 phases (71-74), ~10-15 plans

<details>
<summary>Previous Milestone: v1.7 Deferred Backlog Closure + Validator Chain Hardening</summary>

**Shipped:** 2026-05-29 | **Phases:** 67-70 | **Plans:** 15

Closed the v1.6 deferred cleanup backlog and validator-chain technical debt across four pillars over 4 phases. **Pillar A — Corpus surgical sweeps** (Phase 67): CI-1 ABM URL refs verified live state on 2026-05-26 via cron-pinned `markdown-link-check@3.14.2` + corroborating curl HEAD (Branch A taken — 4 entries annotated `last_revalidated:"2026-05-26"`, sidecar shape preserved); CI-2 VPP-location-token surgical rename to "content token" form per PITFALLS:657 first-mention-per-H2 convention (6 occurrences / 2 files, atomic 5-file commit per CONTEXT D-04 Option E). **Pillar B — CHAIN_SKIP root-cause resolution** (Phase 68): CRLF regex centralization via D-01 Option B (`.replace(/\r\n/g, '\n')` appended to readFile() in `check-phase-{51,58}.mjs`, verbatim byte-copy of canonical `check-phase-48.mjs:25` idiom); NEW `scripts/validation/_lib/archive-path.mjs` exports `resolveArchivedPhasePath()` (5 call-site replacements + STRETCH-closed check-phase-31 silent-swallow data-integrity bug via `_missing` discriminator); ATOMIC commit `7b635ca` substitutes `CHAIN_SKIP = new Set([])` across check-phase-{62..66}.mjs (5 files in ONE SHA per Phase 66-02 atomic-commit precedent); v1.5-frozen-aware pattern introduced via `readRequirementsAtV15Close()` helper (precondition `d7d7d5f`); subprocess timeout 60s→300s auto-applied per Rule 3; full chain check-phase-{48..66}.mjs exits 0 across all 19 phases with 0 SKIPPED — first time since v1.5 close. **Pillar C — CI-Linux hardening** (Phase 69): NEW `ubuntu-latest` runner job in `audit-harness-v1.7-integrity.yml` (PR-blocking per D-A9; coexists with v1.4/v1.5/v1.6 workflows zero modifications); chain-apex 28 PASS / 0 FAIL / 0 SKIPPED on BOTH Windows local AND Linux GHA (EXACT MATCH); Linux runtime ~56s (54% of Windows ~102s reference); 3 cross-OS architectural discoveries surfaced + CLOSED in-Phase: FETCH-DEPTH-01 (Fix-1 `85521bb` adds `with: { fetch-depth: 0 }`), SCOPE-GAP-61 (Fix-2 `2d61981` adds `readRoadmapAtV15Close()` parallel helper — V-61-05..08 made v1.5-frozen-aware), D-04-OVERSPEC-01 ACKNOWLEDGED (B.2-GREEN reframed as positive cross-OS resilience proof); 1 latent meta-bug CHAIN-WRAPPER-01 deferred to v1.8+. **Pillar D — v1.7 audit harness lineage bump + milestone close** (Phase 70): Atom 1 atomic commit `26a1ae9` (`v1.7-milestone-audit.mjs` Path-A from v1.6 + `v1.7-audit-allowlist.json` + BASELINE_11 — 3 files indivisible per Phase 66-02 precedent); Atom 2 atomic commit `aa6de68` (`check-phase-67..70.mjs` per-phase validators + `audit-harness-v1.7-integrity.yml` 9-edit EXTEND preserving FETCH-DEPTH-01 inheritance — 5 files indivisible); HARNESS-05 3-axis terminal re-audit (Axis 1 local fresh-clone `tohma3w0` + Axis 2 cross-OS Linux GHA run `26604414109` ubuntu-latest + Axis 3 fresh sub-agent — **first close-gate in project history to stack all three independence axes simultaneously** per STATE.md:111 declaration; Cross-OS PASS-Count EXACT MATCH verified across 6 cross-OS-applicable validators); HARNESS-06 two-commit chicken-and-egg close-gate per D-04 Option (b) — Commit A `14683de` SHA placeholder fill + Commit B `4df3a16` v1.7-MILESTONE-AUDIT.md NEW + v1.7-DEFERRED-CLEANUP.md FINALIZE + 4-doc traceability closure across PROJECT/ROADMAP/STATE/REQUIREMENTS. **Methodology highlights:** Per-assertion-class freshness routing (D-01 LOCKED Option C — 60-row matrix in 70-CONVENTIONS.md); two-atomic split for Pillar D lineage bump (D-02 LOCKED); wave-based 5-plan execution with `wave: N` frontmatter; adversarial-review for gray-area picks (per user memory); sequential-on-main-tree per `use_worktrees:false`. v1.7-DEFERRED-CLEANUP.md routes ARCHIVE-01 (recurrence-confirmed) + ARCHIVE-02 + CHAIN-WRAPPER-01 + HARNESS-FORWARD-01 retrospective + SCOPE-GAP-61 retrospective + CI-3 + VPP-additional-sites + Multi-tenant + ABDevice API + per-OU CRD + Account Holder + ASM forward to v1.8+.

</details>

<details>
<summary>Previous Milestone: v1.6 Apple Business Delegated Governance & Multi-Org Operations</summary>

**Shipped:** 2026-05-25 | **Phases:** 62-66 | **Plans:** 30

Documented the Apple Business rebrand and its new delegated permission surface — Organizational Units (formerly Locations) + custom roles + granular permissions — enabling internal organizations to manage their own device pools (VPP catalogs, shared iPad passcode resets, device releases, MDM server assignments, account provisioning, device transfers, audit access, shared iPad / Apple TV lifecycle) without escalating to a central tenant admin, across both iOS/iPadOS and macOS through Intune. Five-pillar delivery: **(1) Foundation & rebrand** — Apple Business glossary, role/privilege model overview, OUs concept, content-token consolidation, Managed Apple Account formalization; rebrand callout at 3 canonical sites; 4 reciprocal glossary banners; audit harness scaffold with C14/C15/C16 blocking-from-start (Phase 62). **(2) Multi-OU architecture & admin setup** — OUs-vs-custom-roles decision matrix, custom role authoring, sub-org admin onboarding, MDM server assignment, VPP content token consolidation, Managed Apple Account provisioning, Shared iPad / Apple TV lifecycle, +3 ios-capability-matrix rows (Phase 63). **(3) Delegation runbooks** — VPP catalog, shared iPad passcode reset (canonical admin-context doc that L1 #34 cross-links to), device release, device transfer (with 4-cell impact matrix), MDM server reassign (single runbook with OS-version eligibility matrix), Managed Apple Account provisioning, audit log scoping, cross-org-boundary cheat sheet (Phase 64). **(4) L1/L2 + Hub navigation integration** — L1 #34 shared iPad passcode reset (compound `platform: ios+macos+shared-ipad` frontmatter), L2 #26 Apple Business permission-denied (7-leaf Mermaid decision tree), 5 hub-file append-only edits (common-issues + quick-ref-l1/l2 + operations/00-index + docs/index), C16 4-edge cross-link integrity triangle live with 0 exemptions (Phase 65). **(5) Validation tooling closure & milestone audit** — C11 keyword extension (6 LOCKED Apple Business-side tokens) + C15 narrow staleness audit (13 ABAUDIT orphans removed) + regex-7 production/synthetic back-port + BASELINE_10 refresh + c13_rotting_external population (4 ABM URLs / 6 VPP-token lines / 45 Managed-Apple-ID refs) — all in ONE atomic harness commit `3a9a671` (D-01 atomic-commit indivisibility); CI workflow `audit-harness-v1.6-integrity.yml` (15-entry path-filter + 2 crons + `rotting-external-quarterly` job at cron `0 8 1 1,4,7,10 *`); terminal re-audit from fresh `git clone --no-hardlinks` into `$env:TEMP\v1.6-audit-<rand>` via fresh `gsd-executor` sub-agent (D-22 INTENT via D-03 mechanism — STRICTER physical isolation than v1.5 worktree precedent); `v1.6-MILESTONE-AUDIT.md` + NEW standalone `v1.6-DEFERRED-CLEANUP.md` artifact (no v1.5 equivalent); 39/39 requirements Active→Validated with closing commit SHAs (Phase 66). Methodology highlight: Phase 66 gray-area decisions resolved via 4-agent parallel `/adversarial-review` (Finder/Adversary/Referee scoring); Phase 66 D-02 advisor predicted "likely zero" ABAUDIT orphans, actual measurement was 13 — removed cleanly in separate corpus-only commit `79aa2b4` BEFORE the AUDIT-14 atomic commit, preserving indivisibility per CONTEXT D-02 step 3. v1.6-DEFERRED-CLEANUP.md routes CI-1 / CI-2 / CI-3 / CHAIN_SKIP-CRLF + 5 other deferrals to v1.7+.

</details>

## Current State

**v1.5 shipped 2026-05-07.** Seven milestones complete — 61 phases, ~280 plans, ~230 documentation files across Windows Autopilot, macOS ADE, iOS/iPadOS, Android Enterprise, and Linux (Ubuntu 22.04/24.04 LTS). v1.5 delivered four pillars over 14 phases: (1) cleanup & cross-platform hardening — DEFER-07 Android nav unification (Phase 57: docs/index.md + common-issues.md + quick-ref-l1/l2), DEFER-08 5-platform capability comparison (Phase 58: 240 link-bearing data cells), 75-finding broken-link inventory closure across two passes (60 FIXED + 15 ALLOWLISTED), glossary cross-reference normalization across all 5 platform glossaries; (2) Linux as 5th platform — Ubuntu LTS taxonomy + glossary, admin setup with Identity Broker re-enrollment pitfall, capability matrix, end-user enrollment guide, 4 L1 runbooks + Mermaid triage tree, 2 L2 investigation runbooks; (3) operational depth across all 4 existing platforms — co-management workload sliders + Autopatch prereqs (Phase 53), WUfB rings + Hotpatch + macOS DDM + iOS DDM-supervision retraction + Play Integrity MEETS_STRONG_INTEGRITY + Zebra LifeGuard (Phase 54), Win32 supersedence/dependency graphs + macOS Installomator + iOS VPP + Android MGP/OEMConfig (Phase 55), Windows Intune Remediations + cross-platform drift detection + tenant-to-tenant migration runbooks (Phase 56); (4) validation tooling — `v1.5-milestone-audit.mjs` Path-A copy from v1.4.1 with C10-C13 informational-then-blocking promotion ladder, 13-validator chain (check-phase-48..61.mjs), BASELINE_9 refresh closing v1.4.1 carry-over, terminal re-audit at Phase 61 confirming 12/12 PASS in fully-blocking mode + 57/57 requirements closed. **Next:** v1.6 milestone planning (`/gsd-new-milestone`).

### What's been built
- 143+ markdown documentation files in `docs/` spanning Windows APv1/APv2, macOS ADE, iOS/iPadOS, and Android Enterprise
- Android foundation (v1.4): 13-term disambiguation glossary, 5-mode enrollment overview, NFC/QR/afw#setup/Zero-Touch provisioning-method matrix, Android 11/12/15 version breakpoint matrix, tri-portal admin template
- Android prerequisites (v1.4): admin setup overview (5-branch mermaid), Managed Google Play binding guide (Entra-preferred since Aug 2024), Zero-Touch portal admin guide with reseller Step 0 and KME/ZT Samsung mutual-exclusion
- Android mode-specific admin guides (v1.4): COBO Fully Managed (with COPE→WPCO migration note + Android 15 FRP), BYOD Work Profile (admin + end-user tier-inverted dual-guide + AMAPI migration callout), Dedicated/COSU (with MHS exit-PIN sync requirement), ZTE corporate-scale extension, hard-scoped AOSP stub (RealWear GA)
- Android L1/L2 troubleshooting (v1.4): mode-first L1 triage tree + 6 scenario runbooks (enrollment blocked, work profile not created, device not enrolled, compliance blocked, MGP app not installed, ZTE failed), 3-method log collection + 3 L2 investigation runbooks using Play Integrity (not deprecated SafetyNet)
- Android integration & audit (v1.4): Android capability matrix with 3 Cross-Platform Equivalences pairs, minimal `docs/index.md` Android stub, reciprocal `_glossary-macos.md` see-also, committed Node 5-check milestone audit harness + allow-list sidecar, v1.4-MILESTONE-AUDIT.md
- Complete APv1 lifecycle documentation with integrated troubleshooting (v1.0)
- APv2 lifecycle, failure catalog, L1/L2 decision trees and runbooks (v1.1)
- APv1 and APv2 admin setup guides with per-setting "what breaks" callouts (v1.1)
- Cross-platform foundation: platform taxonomy, Windows-vs-macOS comparison, macOS glossary, macOS admin template (v1.2)
- Windows operational completeness: device lifecycle, infrastructure prerequisites, ESP/app deployment, security/compliance, migration scenarios, monitoring/operations (v1.2)
- macOS ADE lifecycle (7-stage), Terminal commands reference, log paths reference, network endpoints (v1.2)
- macOS admin setup suite: ABM, enrollment profiles, configuration profiles, app deployment, compliance, capability matrix (v1.2)
- macOS L1/L2 troubleshooting: triage decision tree, 6 L1 runbooks, 4 L2 runbooks (v1.2)
- Cross-platform navigation: platform selectors, quick-reference cards with macOS sections, 44-file reachability verified (v1.2)
- Navigation hub with role-based entry points, glossary, bidirectional cross-references (v1.0 + v1.1 + v1.2)
- iOS/iPadOS enrollment path overview (4-path comparison, supervision axis) and ADE lifecycle (7-stage) (v1.3)
- iOS/iPadOS admin setup: APNs certificate, ABM/ADE token (macOS cross-references), ADE enrollment profile with supervised-only callout pattern (v1.3)
- iOS/iPadOS admin setup — configuration profiles (Wi-Fi, VPN, email, device restrictions, certificates, home screen), app deployment (VPP device/user, LOB, silent-install), compliance policy (OS version, jailbreak, passcode, CA timing) with 🔒 supervised-only callouts per setting (v1.3)
- iOS/iPadOS admin setup BYOD/MAM — overview rewrite for all paths (ADE + Device Enrollment + User Enrollment + MAM-WE), Device Enrollment guide (Company Portal + web-based, capabilities-without-supervision table), account-driven User Enrollment guide with 7 privacy-limit callouts and profile-UE deprecation section, standalone MAM-WE app protection guide (three-level data protection, dual-targeting, selective wipe) (v1.3)
- iOS/iPadOS L1 triage runbooks — 6 L1 scenario runbooks (APNs expired, ADE not starting, enrollment restriction blocking, license invalid, device cap reached, compliance blocked) + iOS triage decision tree (v1.3)
- iOS/iPadOS L2 investigation runbooks — 4 L2 runbooks (log collection, ADE token & profile delivery, app install failure, compliance & CA timing) + 00-index.md iOS L2 section + D-22 placeholder retrofit across 9 files closing cross-phase links from Phase 30 (v1.3)
- Code scaffolding across all three tiers (PowerShell, Python, React) — not yet integrated
- ✓ v1.5 Pillar 1 — Cleanup (DEFER-07 Android nav unification + DEFER-08 4-platform comparison + broken-link sweep) — Phases 57 / 58 / 48 / 60; CLEAN-01..08 closed (commits `1dee562` + `0a55ecd` + `bf14bf5` + `c2abdd4` + `adca9d8`)
- ✓ v1.5 Pillar 2 — Linux (Ubuntu 22.04/24.04 LTS) foundation + admin setup + L1 + L2 — Phases 49 / 50 / 51 / 52; LIN-01..13 closed (commits `6ff8e1c` + `9a62a1a` + `c8a644d` + `38e25e9`)
- ✓ v1.5 Pillar 3 — Operational depth (co-management + patch & update + app lifecycle + drift/migration) — Phases 53 / 54 / 55 / 56; COMG-01..05 + PATCH-01..08 + APP-01..08 + DRIFT-01..07 closed (commits `8d37ab2` + `be7f59d` + `aecf014` + `d0654d2` + `6b26488`)
- ✓ v1.5 Pillar 4 — Validation tooling (audit harness Path-A copy + C10/C11/C12/C13 informational-then-blocking promotion ladder + 75-finding broken-link inventory closure: 60 FIXED + 15 ALLOWLISTED) — Phases 48 / 60; AUDIT-01..07 closed; AUDIT-08 closes at Phase 61 close (commits `47c4289` + `bf14bf5` + `c2abdd4` + `6626253`)
- ✓ v1.5 hub navigation integration (docs/index.md ## Linux Provisioning + ## Operations H2s; quick-ref-l1/l2 Linux sections; glossary cross-references across all 5 platform glossaries) — Phase 59; CLEAN-08 closed (commits `adca9d8` + `59f595b` + `18cee15`)
- ✓ v1.5 audit harness finalization (C9/C11/C13 promotion to blocking + C12 H2 expansion + BASELINE_9 refresh closing AUDIT-07 + 75-finding broken-link inventory full closure) — Phase 60 atomic harness commit `c2abdd4`; AUDIT-03..07 closed
- ✓ v1.5 milestone close (terminal re-audit + REQUIREMENTS Active→Validated migration + v1.5-MILESTONE-AUDIT.md authoring) — Phase 61 (this milestone close)

<details>
<summary>Previous Milestone: v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup</summary>

**Shipped:** 2026-05-07 | **Phases:** 48-61 | **Plans:** 101

Four-pillar milestone maturing the suite from per-platform enrollment coverage into operational completeness across 5 platforms (Windows + macOS + iOS + Android + Linux). **Pillar 1 — Cleanup & cross-platform hardening:** DEFER-07 Android nav unification (Phase 57: docs/index.md + common-issues.md + quick-ref-l1/l2 retrofits), DEFER-08 5-platform capability comparison reference doc (Phase 58: 6 H2 domains × 5 platform columns × 48 feature rows = 240 link-bearing data cells, link-not-copy architecture), 75-finding broken-link inventory closed across 2 passes (60 FIXED + 15 ALLOWLISTED), glossary cross-reference normalization across all 5 platform glossaries (CLEAN-01..08). **Pillar 2 — Linux (Ubuntu 22.04/24.04 LTS) as 5th platform:** taxonomy + 9-term Linux glossary with reciprocal see-also entries to all 4 existing glossaries, admin setup guide with Identity Broker v2.0.2+ re-enrollment pitfall + 4-category compliance + linux-capability-matrix.md + end-user enrollment walkthrough, Linux L1 (4 runbooks + Mermaid triage tree), Linux L2 (24-log-collection + 25-agent-investigation with journalctl patterns) — LIN-01..13. **Pillar 3 — Operational depth across Windows + macOS + iOS + Android:** co-management workload sliders + tenant attach disambiguation + Autopatch prereqs (Phase 53, COMG-01..05), WUfB rings + Hotpatch (Win11 24H2+ default May 2026) + macOS DDM (legacy MDM deprecated Apple OS 26) + iOS DDM (supervised-only retracted iOS 17+) + Play Integrity MEETS_STRONG_INTEGRITY (Sept 30 2025 enforcement) + Zebra LifeGuard (Phase 54, PATCH-01..08), Win32 supersedence/dependency graphs + macOS .pkg/.dmg pipelines + Installomator MEDIUM-confidence callout + iOS VPP licensing + Android MGP + Zebra OEMConfig APK side-load (Phase 55, APP-01..08), Windows Intune Remediations + cross-platform drift detection + tenant-to-tenant migration runbooks (BitLocker re-key + ABM token re-issue + MGP re-binding) (Phase 56, DRIFT-01..07). **Pillar 4 — Validation tooling:** `v1.5-milestone-audit.mjs` Path-A copy from v1.4.1 (Phase 48), C10 Linux frontmatter blocking from start, C11/C12/C13 informational-first scaffolds promoted to blocking at Phase 60 atomic harness commit (`c2abdd4`), BASELINE_9 refresh closing v1.4.1 self-test carry-over, 13-validator chain check-phase-48..61.mjs all PASS, CI workflow `audit-harness-v1.5-integrity.yml` (AUDIT-01..08). Terminal re-audit at Phase 61 from independent worktree confirmed 12/12 v1.5-milestone-audit.mjs PASS in fully-blocking mode, 14/14 phases, 4/4 integration pillars, 57/57 requirements closed. v1.4.1 deferrals DEFER-07 + DEFER-08 closed inline. Methodology: wave-based parallel execution (Wave A: 51+53; Wave B: 54+55+56), progressive-landing per-plan commits, auditor-independence via fresh worktree spawn for terminal re-audit.

</details>

<details>
<summary>Previous Milestone: v1.4.1 Android Enterprise Completion & v1.4 Cleanup</summary>

**Shipped:** 2026-04-25 | **Phases:** 43-47 | **Plans:** 33

Closed all six v1.4 deferred items (DEFER-01..06) and brought Android to operational completeness parity with Windows / macOS / iOS. Delivered: Knox Mobile Enrollment full Samsung admin path (`07-knox-mobile-enrollment.md` + L1 #28 + L2 #22 + capability matrix Knox row + Mermaid 5→6 branches + Knox/KME/KPE glossary entries + reciprocal ZT/COBO mutual-exclusion callouts); full per-OEM AOSP expansion across RealWear (HMT-1/HMT-1Z1/Navigator 500) + Zebra (WS50 OEMConfig-via-Intune-APK) + PICO (4 Enterprise / Neo3) + HTC VIVE Focus (3 / XR Elite / Focus Vision) + Meta Quest (2/3/3s/Pro with Feb 2026 wind-down risk flag) plus `aosp-oem-matrix.md` reference + L1 #29 + L2 #23; COPE Full Admin Path A LOCKED (`08-cope-full-admin.md` 11-H2 mirror of COBO + capability matrix COPE column at index-1 + Private Space glossary H3 + COBO migration-note γ3 sentence-scoped trim); audit harness `v1.4.1-milestone-audit.mjs` 8/8 PASS (5 blocking C1-C5 + 3 informational C6/C7/C9, sidecar expanded ~10→18 pins, C4 token list 8→24, C6 targets 1→6 AOSP files, C7 Knox-suffix 5→11 forms, C9 cope_banned_phrases 3→8 patterns, `regenerate-supervision-pins.mjs` helper + CI workflow 4-job + pre-commit hook); 60-day freshness normalization across L2 runbooks 18-21 + `admin-template-android.md`; AOSP stub envelope resolution (`06-aosp-stub.md` 1089→696 words via content-migration to per-OEM Phase 45 files). Phase 47 atomic surgical re-canonicalization at 3 SC#1 hotspots; v1.4-MILESTONE-AUDIT.md status flipped `tech_debt` → `passed` from fresh auditor worktree per Phase 42 D-02.

</details>

<details>
<summary>Previous Milestone: v1.4 Android Enterprise Enrollment Documentation</summary>

**Shipped:** 2026-04-24 | **Phases:** 34-42 | **Plans:** 40

Delivered Android Enterprise enrollment framework (5 modes: COBO / BYOD Work Profile / Dedicated / ZTE / AOSP stub), tri-portal admin setup suite (Intune admin center + Managed Google Play + Zero-Touch portal), L1 triage tree + 6 scenario runbooks, L2 investigation suite (log collection + 3 runbooks) using Play Integrity (deprecated SafetyNet explicitly rephrased), Android capability matrix with Cross-Platform Equivalences section (3 paired comparisons: iOS Supervision↔Android Fully Managed, Apple ADE↔Google Zero-Touch, iOS User Enrollment↔Android Work Profile), reciprocal `_glossary-macos.md` see-also, and v1.4-MILESTONE-AUDIT.md produced via committed 5-check Node audit harness. Methodology highlight: Phase 42 gray-area decisions resolved via 12-agent adversarial-review (4 finder + 4 adversary + 4 referee, 3 parallel waves). Audit exited `tech_debt` (accepted); 3 defer items routed to v1.4.1.

</details>

<details>
<summary>Previous Milestone: v1.3 iOS/iPadOS Provisioning Documentation</summary>

**Shipped:** 2026-04-19 | **Phases:** 26-33 | **Plans:** 44

Delivered iOS/iPadOS enrollment framework (4-path overview, ADE lifecycle), admin setup suite with supervised-only callouts, BYOD & MAM paths (Device Enrollment, account-driven User Enrollment, standalone MAM-WE), L1 triage + 6 scenario runbooks, L2 investigation runbooks using iOS-native methods (Mac+cable sysdiagnose, AssistiveTouch sysdiagnose), cross-platform navigation integration with iOS sections, and Phase 33 milestone audit gap closure (re-audit passed 18/18).

</details>

<details>
<summary>Previous Milestone: v1.2 Cross-Platform Provisioning & Operational Gaps</summary>

**Shipped:** 2026-04-15 | **Phases:** 20-25 | **Plans:** 20

Delivered cross-platform foundation (taxonomy, glossary, templates), Windows operational completeness (device lifecycle, infrastructure, security, migration, monitoring), macOS ADE lifecycle documentation, macOS admin setup guides, macOS L1/L2 troubleshooting, and cross-platform navigation integration.

</details>

<details>
<summary>Previous Milestone: v1.1 APv2 Documentation & Admin Setup Guides</summary>

**Shipped:** 2026-04-13 | **Phases:** 11-19 | **Plans:** 18

Delivered APv2 lifecycle documentation, scenario-based failure catalog, L1/L2 decision trees and runbooks, complete APv2 and APv1 admin setup guides, navigation hub updates with APv2 terminology, and cross-reference cleanup.

</details>

<details>
<summary>Previous Milestone: v1.0 Autopilot Documentation & Troubleshooting Guides</summary>

**Shipped:** 2026-04-10 | **Phases:** 1-10 | **Plans:** 24

Delivered end-to-end APv1 lifecycle documentation, error code lookup tables, L1 decision trees and runbooks, L2 technical guides, and navigation indexes.

</details>

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ PowerShell diagnostic module (AutopilotDiagnostics.psm1) — scaffolded
- ✓ PowerShell remediation module (AutopilotRemediation.psm1) — scaffolded
- ✓ FastAPI backend skeleton — scaffolded
- ✓ React frontend scaffold — scaffolded
- ✓ End-to-end Autopilot lifecycle documentation — v1.0
- ✓ Pre-provisioning flow troubleshooting guides — v1.0
- ✓ User-driven flow troubleshooting guides — v1.0
- ✓ Error code lookup tables — v1.0
- ✓ Scenario runbooks (TPM, ESP, network, hybrid join, profile assignment) — v1.0
- ✓ L1 Service Desk decision trees — v1.0
- ✓ L1 scenario runbooks (top 5 failures) — v1.0
- ✓ L2 Desktop team technical guides — v1.0
- ✓ Navigation indexes and quick-reference cards — v1.0
- ✓ APv2 lifecycle and prerequisites documentation — v1.1
- ✓ APv2 failure catalog (scenario-based, symptom-searchable) — v1.1
- ✓ APv2 L1 triage decision tree and portal-only runbooks — v1.1
- ✓ APv2 L2 log collection and deployment report interpretation — v1.1
- ✓ APv2 admin setup guides (ETG, Device Preparation, RBAC, corporate identifiers) — v1.1
- ✓ APv1 admin setup guides (hardware hash, profiles, ESP, groups, deployment modes) — v1.1
- ✓ Bidirectional APv1/APv2 cross-referencing and glossary — v1.1
- ✓ Cross-platform foundation (taxonomy, glossary, templates, platform selector) — v1.2
- ✓ Windows device lifecycle operations (reset, retire/wipe, re-provisioning, tenant migration) — v1.2
- ✓ Infrastructure prerequisites (network, Entra ID, licensing, Win32 apps, ESP timeout) — v1.2
- ✓ Security & compliance during enrollment (CA timing, baselines, compliance) — v1.2
- ✓ Migration scenarios (APv1→APv2, imaging→Autopilot, GPO→Intune) — v1.2
- ✓ Monitoring & operations (deployment reporting, drift detection, new-batch workflow) — v1.2
- ✓ macOS ADE lifecycle documentation (7-stage pipeline) — v1.2
- ✓ macOS admin setup guides (ABM, enrollment, config profiles, apps, compliance) — v1.2
- ✓ macOS capability matrix (feature parity gaps across 5 domains) — v1.2
- ✓ macOS L1/L2 troubleshooting (decision tree, 10 runbooks) — v1.2
- ✓ Cross-platform navigation integration (common-issues routing, quick-ref cards) — v1.2
- ✓ iOS/iPadOS configuration profiles guide (Wi-Fi, VPN, email, device restrictions with category-level supervised-only callouts, certificates, home screen layout) — Phase 28 / v1.3
- ✓ iOS/iPadOS app deployment guide (VPP device/user licensing, LOB, Store apps; silent install supervised-only callouts; managed app status verification) — Phase 28 / v1.3
- ✓ iOS/iPadOS compliance policy guide (OS version, jailbreak, passcode, CA timing, default compliance posture) — Phase 28 / v1.3
- ✓ Android disambiguation glossary (13 colliding terms + 6 Android-native) with cross-platform callouts — Phase 34 / v1.4 (AEBASE-01)
- ✓ Android enrollment path overview with two-axes framework (ownership × management scope) and iOS supervision analog bridge — Phase 34 / v1.4 (AEBASE-02)
- ✓ Android provisioning-method × enrollment-mode matrix (NFC/QR/afw#setup/Zero-Touch across BYOD/Fully Managed/COPE/Dedicated/AOSP) — Phase 34 / v1.4 (AEBASE-03)
- ✓ Android version fragmentation matrix with Android 11/12/15 breakpoint details — Phase 34 / v1.4 (AEBASE-04)
- ✓ Tri-portal Android admin-guide template (Intune + Managed Google Play + Zero-Touch portal) — Phase 34 / v1.4 (AEBASE-05)
- ✓ Android prerequisites concept-only orientation doc (tri-portal surface, GMS-vs-AOSP split, Android 12+ corporate-identifier behavior) — Phase 35 / v1.4 (AEPREQ-01)
- ✓ Android admin setup overview with 5-branch mermaid flowchart (COBO/BYOD/Dedicated/ZTE/AOSP) and per-path prerequisites checklists — Phase 35 / v1.4 (AEPREQ-02)
- ✓ Managed Google Play binding admin guide with Entra-preferred dual-placement (Aug 2024), hybrid what-breaks table, and disconnect-consequences section — Phase 35 / v1.4 (AEPREQ-03)
- ✓ Zero-Touch portal admin guide with Step 0 reseller gate, DPC extras JSON, ZT↔Intune linking (Methods A/B), and KME/ZT Samsung mutual-exclusion callout — Phase 35 / v1.4 (AEPREQ-04)
- ✓ Zero-Touch Enrollment corporate-scale extension (reseller-upload handoff, device-claim workflow, profile assignment at scale, dual-SIM IMEI 1 registration, KME/ZT at device-claim, configuration-must-be-assigned) appended to Phase 35 ZT portal doc per append-only split contract — Phase 39 / v1.4 (AEZTE-01)
- ✓ AOSP hard-scoped stub with 9-H2 whitelist, RealWear-spotlight GA + 8-OEM enumeration (DigiLens, HTC, Lenovo, Meta, PICO, RealWear, Vuzix, Zebra), PITFALL-7 "not supported under AOSP" framing, QR-only + one-device-at-a-time + Wi-Fi credential embedding constraints, and deferred-content table pointing to v1.4.1 — Phase 39 / v1.4 (AEAOSP-01)
- ✓ Android L1 mode-first triage decision tree (6-way mode gate: Fully managed / Work profile / Dedicated / ZTE / AOSP / Unknown; 20-row Routing Verification table; AND prefix Mermaid; ≤ 2 decision steps per path) — Phase 40 / v1.4 (AEL1-01)
- ✓ Android L1 scenario runbooks 22-27 (enrollment blocked, work profile not created, device not enrolled, compliance blocked, Managed Google Play app not installed, ZTE enrollment failed); Phase 30 D-10 sectioned actor-boundary + D-12 three-part escalation packet; runbooks 25 & 27 multi-cause with 4 sub-H2s each; Play Integrity only (zero SafetyNet); 60-day review cycle — Phase 40 / v1.4 (AEL1-02 through AEL1-07)
- ✓ L1 index append-only Android section + 00-initial-triage.md Android banner (Mermaid graph unchanged) + atomic 3-file retrofit of Android admin guides resolving 6 forward-promise text instances — Phase 40 / v1.4 (AEL1-08)
- ✓ COPE Full Admin guide (`docs/admin-setup-android/08-cope-full-admin.md`) — 11-H2 mirror of COBO with Path A LOCKED full-admin scope (NOT deprecation-rationale); Android 15 Private Space `> ⚠️` callout in Key Concepts via Pitfall 8 Option A scope-tightened wording; 5 provisioning method H3s (QR / NFC / afw#setup / token-entry / Zero-Touch) with NFC + afw#setup + token-entry all carrying Android 11+ removal callouts; COPE-specific FRP behavior table (different from COBO); 5×3 COPE-vs-COBO decision matrix as sub-H3; Samsung-admins KME-or-ZT callout with WPCO-equivalence clarification; inverse-direction COPE Migration Note back-link — Phase 46 / v1.4.1 (AECOPE-01)
- ✓ Capability matrix COPE column at index 1 (between COBO and BYOD per ownership×scope axes); Cross-Platform Equivalences section structure preserved (zero new paired rows — WPCO has no iOS/macOS/Windows analog); Android 15 Private Space row across all 6 Android cols as N/A with shared footnote — Phase 46 / v1.4.1 (AECOPE-02)
- ✓ COBO migration-note γ3 sentence-scoped trim at line 64 (replaces "deferred to v1.4.1" with forward-link to `08-cope-full-admin.md`); preserves WPCO-direction paragraph + verification HTML comment with `last_verified: 2026-04-21` byte-identical; closes v1.4 forward promise atomically — Phase 46 / v1.4.1 (AECOPE-03)
- ✓ Glossary `### Private Space` H3 added under Ownership & Management Scope (alphabetical between Play Integrity and Supervision); COPE/WPCO entries back-link to new admin doc; BYOD line 167 sentence retrofit forward-links to glossary + version-matrix anchors (eliminates Pitfall 1 drift surface); version-matrix Android 15 Private Space breakpoint H3 added — Phase 46 / v1.4.1 (AECOPE-04 + D-10 + D-11)
- ✓ Audit allow-list sidecar expanded from ~10 to 18 pins covering iOS-attributed supervision bridge-prose in `_glossary-android.md` + `android-capability-matrix.md` Cross-Platform Equivalences; harness C2 PASS — Phase 43 / v1.4.1 (AEAUDIT-02)
- ✓ 60-day freshness normalization — L2 runbooks 18-21 `review_by` re-dated to 60-day cycle; `admin-template-android.md` sentinel-paired with `_*`-prefix scope filter — Phase 43 / v1.4.1 (AEAUDIT-03)
- ✓ AOSP stub envelope resolution — `06-aosp-stub.md` body trimmed 1089→696 words via content-migration to Phase 45 per-OEM files; PITFALL-7 framing + 9-H2 whitelist + 8-OEM enumeration preserved; harness C3 PASS — Phase 43 / v1.4.1 (AEAUDIT-04)
- ✓ Audit harness versioned to `v1.4.1-milestone-audit.mjs`; sidecar migrated to `scripts/validation/`; `regenerate-supervision-pins.mjs` helper (3 modes: --report/--emit-stubs/--self-test) + CI workflow 4-job + pre-commit hook — Phase 43 / v1.4.1 (AEAUDIT-05)
- ✓ Samsung KME admin guide (`docs/admin-setup-android/07-knox-mobile-enrollment.md`) — 4th-portal overlay; B2B account onboarding gate; reseller bulk upload + Knox Deployment App; 5-SKU disambiguation table; reciprocal ZT mutual-exclusion callout — Phase 44 / v1.4.1 (AEKNOX-01)
- ✓ Android L1 runbook 28 (`docs/l1-runbooks/28-android-knox-enrollment-failed.md`) — KME-specific enrollment failures; D-10 sectioned actor-boundary + D-12 three-part escalation packet; Play Integrity only — Phase 44 / v1.4.1 (AEKNOX-02)
- ✓ Android L2 runbook 22 (`docs/l2-runbooks/22-android-knox-investigation.md`) — Knox portal→Intune handoff audit; Play Integrity 3-tier verdicts; zero SafetyNet tokens — Phase 44 / v1.4.1 (AEKNOX-03)
- ✓ Capability matrix Knox row filled at `android-capability-matrix.md:113-119`; anchor renamed from `#deferred-knox-mobile-enrollment-row` → `#knox-mobile-enrollment-row` — Phase 44 / v1.4.1 (AEKNOX-04)
- ✓ `00-overview.md` Mermaid extended 5→6 branches (Knox - KME Samsung-only branch added); Setup Sequence updated with Knox step — Phase 44 / v1.4.1 (AEKNOX-05)
- ✓ Knox / KME / KPE glossary entries added to `_glossary-android.md`; `02-provisioning-methods.md` Knox anchor populated with cross-links — Phase 44 / v1.4.1 (AEKNOX-06)
- ✓ ZT portal doc KME/ZT mutual-exclusion callout + COBO Samsung-admins callout retrofitted with reciprocal forward-links to Knox guide; AEKNOX-03 anti-paste blockquote byte-identical in both docs — Phase 44 / v1.4.1 (AEKNOX-07)
- ✓ RealWear AOSP admin guide (`docs/admin-setup-android/09-aosp-realwear.md`) — HMT-1/HMT-1Z1/Navigator 500; Wi-Fi-embedded-QR REQUIRED; PITFALL-7 framing; Intune-direct OR hybrid with RealWear Cloud — Phase 45 / v1.4.1 (AEAOSPFULL-01)
- ✓ Zebra AOSP admin guide (`docs/admin-setup-android/10-aosp-zebra.md`) — WS50 wearable scanner; OEMConfig-via-Intune-APK (NOT Managed Google Play); StageNow optional; Android 12 not supported callout — Phase 45 / v1.4.1 (AEAOSPFULL-02)
- ✓ PICO AOSP admin guide (`docs/admin-setup-android/11-aosp-pico.md`) — PICO 4 Enterprise + Neo3 Pro/Eye; Enterprise SKU required; Pico Business Suite optional coexistence add-on — Phase 45 / v1.4.1 (AEAOSPFULL-03)
- ✓ HTC VIVE Focus AOSP admin guide (`docs/admin-setup-android/12-aosp-htc-vive-focus.md`) — Vive Focus 3 / XR Elite / Focus Vision; direct-QR Intune flow; 3-model firmware minimum matrix — Phase 45 / v1.4.1 (AEAOSPFULL-04)
- ✓ Meta Quest AOSP admin guide (`docs/admin-setup-android/13-aosp-meta-quest.md`) — Quest 2/3/3s/Pro; 4-portal pattern (Intune + Meta for Work); Meta Horizon Managed Services REQUIRED; Feb 20 2026 wind-down risk flag + Intune-direct fallback — Phase 45 / v1.4.1 (AEAOSPFULL-05)
- ✓ AOSP OEM matrix reference (`docs/reference/aosp-oem-matrix.md`) — 4 H2 sub-tables (enrollment methods / vendor portals / license tiers / Intune AOSP mode per-vendor); 5-OEM rows; PITFALL-7 framing; Meta volatility footnote — Phase 45 / v1.4.1 (AEAOSPFULL-06)
- ✓ Android L1 runbook 29 (`docs/l1-runbooks/29-android-aosp-enrollment-failed.md`) — 5 OEM-scoped Causes A-E; ANDR29 Mermaid resolved-node swap replacing ANDE1 escalation stub — Phase 45 / v1.4.1 (AEAOSPFULL-07)
- ✓ Android L2 runbook 23 (`docs/l2-runbooks/23-android-aosp-investigation.md`) — per-OEM Pattern A-E; Play Integrity only; cross-links to per-OEM admin guides 09-13 — Phase 45 / v1.4.1 (AEAOSPFULL-08)
- ✓ `06-aosp-stub.md` deferred-content table collapsed; `android-capability-matrix.md:121-127` anchor filled with `aosp-oem-matrix.md` link; `02-provisioning-methods.md` AOSP token ceiling + per-OEM firmware rows added — Phase 45 / v1.4.1 (AEAOSPFULL-09)
- ✓ Atomic surgical re-canonicalization at 3 SC#1 hotspots — glossary Provisioning Methods H3 alphabetical reorder (Corporate Identifiers/DPC before Knox/KME/KPE); capability matrix COPE column index-1 coherence verified; 00-overview.md 6-branch Mermaid AOSP leaf + KME branch verified; v1.4.1-audit-allowlist.json supervision_exemptions[] coordinates confirmed stable — Phase 47 / v1.4.1 (AEINTEG-01)
- ✓ Audit harness v1.4.1 extensions — C4 regex 8→24 tokens (Knox/KME/KPE/per-OEM/COPE); C6 targets 1→6 AOSP-scoped files (06 + 09-13 per-OEM); C7 suffix list 5→11 Knox-SKU forms; C9 sidecar cope_banned_phrases[] 3→8 Phase-46-D-31 patterns; informational-first preserved for C6/C7/C9 — Phase 47 / v1.4.1 (AEINTEG-02)
- ✓ Terminal re-audit via v1.4.1-milestone-audit.mjs exits 0 (8/8 PASS — 5 blocking C1-C5 + 3 informational C6/C7/C9); v1.4-MILESTONE-AUDIT.md status flipped tech_debt→passed; re_audit_resolution sibling keys appended for DEFER-01/02/08/09/10 (audit-doc canonical numbering) from fresh auditor worktree per Phase 42 D-02 — Phase 47 / v1.4.1 (AEINTEG-03)
- ✓ PROJECT.md traceability closure — 24 v1.4.1 reqs flipped Active→Validated (AEAUDIT-02..05 + AEKNOX-01..07 + AEAOSPFULL-01..09 + AECOPE-01..04); Closed Deferred Items (v1.4→v1.4.1) subsection enumerating DEFER-01..06 with closing commit SHAs; footer refreshed to v1.4.1 milestone closure record — Phase 47 / v1.4.1 (AEINTEG-04)

- ✓ CLEAN-01 — docs/index.md Android L1 / L2 / Admin Setup H2 expansion (closes DEFER-07 / AENAVUNIFY-04) — Phase 57 Plan 57-01 (commits `1dee562` + `867560c`)
- ✓ CLEAN-02 — docs/common-issues.md Android symptom routing for all 8 v1.4.1 scenario categories — Phase 57 Plan 57-02 (commits `48e5c6f` + `caf4524`)
- ✓ CLEAN-03 — docs/quick-ref-l1.md Android quick-reference card (mode-first per v1.4 triage tree) — Phase 57 Plan 57-03 (commit `6d3fb1a`)
- ✓ CLEAN-04 — docs/quick-ref-l2.md Android quick-reference card (3-method log collection, Play Integrity reference) — Phase 57 Plan 57-04 (commit `d1ecbae`)
- ✓ CLEAN-05 — docs/reference/4-platform-capability-comparison.md 5-platform capability reference (closes DEFER-08 / AECOMPARE-01) — Phase 58 Plan 58-03 (commits `0a55ecd` + `629d7fc`)
- ✓ CLEAN-06 — Anchor sweep across docs/**/*.md identifies and resolves broken intra-doc and inter-doc anchor references — Phase 48 (first pass; commit `bf14bf5`) + Phase 60 Plan 60-07 (second pass; commit `c2abdd4`)
- ✓ CLEAN-07 — Relative-path inter-doc link sweep across docs/**/*.md resolves stale ../*-{platform}/*.md references — Phase 48 (first pass; commit `bf14bf5`) + Phase 60 Plan 60-07 (second pass; commit `c2abdd4`)
- ✓ CLEAN-08 — Glossary cross-reference normalization across all 5 platform glossaries (reciprocal see-also entries) — Phase 59 Plan 59-05 (commits `adca9d8` + `18cee15` + `70248e2` + `6a473c5` + `0150528`)
- ✓ LIN-01 — Linux taxonomy + distro framework overview (Ubuntu 22.04/24.04 LTS scope; BYOD caveat callout) — Phase 49 Plan 49-01 (commits `6ff8e1c` + `513d07d`)
- ✓ LIN-02 — docs/_glossary-linux.md with reciprocal see-also entries to all 4 existing platform glossaries — Phase 49 Plan 49-02 (commits `6ff8e1c` + `513d07d`)
- ✓ LIN-03 — Linux Intune client enrollment configuration admin setup guide — Phase 50 Plan 50-02 (commits `9a62a1a` + `ef10983`)
- ✓ LIN-04 — Linux compliance policy guide covering all 4 supported settings-catalog categories — Phase 50 Plan 50-03 (commits `9a62a1a` + `ef10983`)
- ✓ LIN-05 — Linux agent install guide with intune-portal 2.0.2+ Java→broker breaking-change callout — Phase 50 Plan 50-01 (commits `9a62a1a` + `ef10983`)
- ✓ LIN-06 — End-user Linux device enrollment guide (Ubuntu 22.04 / 24.04 LTS step-by-step) — Phase 50 Plan 50-04 (commits `9a62a1a` + `ef10983`)
- ✓ LIN-07 — Linux triage decision tree (Mermaid; enrollment / non-compliant / CA blocking / agent service branches) — Phase 51 Plan 51-01 (commits `c8a644d` + `57c5f8d`)
- ✓ LIN-08 — L1 runbook 30: Linux enrollment failed — Phase 51 Plan 51-02 (commits `c8a644d` + `57c5f8d`)
- ✓ LIN-09 — L1 runbook 31: Linux device non-compliant — Phase 51 Plan 51-03 (commits `c8a644d` + `57c5f8d`)
- ✓ LIN-10 — L1 runbook 32: Linux conditional access blocking Edge — Phase 51 Plan 51-04 (commits `c8a644d` + `57c5f8d`)
- ✓ LIN-11 — L1 runbook 33: Linux Intune agent service not running — Phase 51 Plan 51-05 (commits `c8a644d` + `57c5f8d`)
- ✓ LIN-12 — L2 runbooks 24-25: Linux log collection + agent investigation — Phase 52 Plan 52-01 (commit `38e25e9`)
- ✓ LIN-13 — Linux capability matrix with Cross-Platform Equivalences (Linux web-app-CA ↔ iOS MAM-WE) — Phase 50 Plan 50-05 (commits `9a62a1a` + `ef10983`)
- ✓ COMG-01 — Co-management overview + workload model guide (7 CB 2503 workloads) — Phase 53 Plan 53-01 (commit `8d37ab2`)
- ✓ COMG-02 — Workload-slider migration sequence (low-risk-first; Endpoint Protection HIGH-RISK callout) — Phase 53 Plan 53-02 (commit `8d37ab2`)
- ✓ COMG-03 — Tenant attach vs full co-management disambiguation doc — Phase 53 Plan 53-03 (commit `8d37ab2`)
- ✓ COMG-04 — Cross-platform co-management analog callouts (macOS/iOS/Android non-equivalent migration paths) — Phase 53 (commit `8d37ab2`)
- ✓ COMG-05 — Windows Autopatch co-management prerequisites doc (Device Config + Office C2R workloads) — Phase 53 Plan 53-05 (commit `8d37ab2`)
- ✓ PATCH-01 — Windows Update for Business ring topology guide (Autopatch disambiguation; PITFALL-9) — Phase 54 Plan 54-01 (commit `be7f59d`)
- ✓ PATCH-02 — Windows Hotpatch H2 inside WUfB rings guide (default May 2026; VBS; opt-out toggle) — Phase 54 Plan 54-01 (commit `be7f59d`)
- ✓ PATCH-03 — Driver/firmware update policy H2 inside WUfB rings guide — Phase 54 Plan 54-01 (commit `be7f59d`)
- ✓ PATCH-04 — macOS update enforcement guide (DDM only; legacy MDM commands deprecated Apple OS 26) — Phase 54 Plan 54-02 (commit `be7f59d`)
- ✓ PATCH-05 — iOS update enforcement guide (supervised-only DDM constraint retracted iOS 17+) — Phase 54 Plan 54-03 (commit `be7f59d`)
- ✓ PATCH-06 — docs/admin-setup-ios/07-device-enrollment.md surgical retrofit (DDM supervised-only cell at line 35) — Phase 54 Plan 54-03 (commit `be7f59d`)
- ✓ PATCH-07 — Android patch delivery guide (Play Integrity MEETS_STRONG_INTEGRITY enforcement timeline) — Phase 54 Plan 54-04 (commit `be7f59d`)
- ✓ PATCH-08 — Zebra LifeGuard OTA firmware management via Intune (GA Jan 2026; Samsung KSP analog) — Phase 54 Plan 54-04 (commit `be7f59d`)
- ✓ APP-01 — Win32 app supersedence chains guide (max 10; Replace vs Update; Required assignment) — Phase 55 Plan 55-01 (commit `aecf014`)
- ✓ APP-02 — Win32 app dependency graphs H2 (max 100; recursive; circular-dependency detection) — Phase 55 Plan 55-01 (commit `aecf014`)
- ✓ APP-03 — Win32ContentPrepTool packaging guide (.intunewin format; detection rule types) — Phase 55 Plan 55-01 (commit `aecf014`)
- ✓ APP-04 — macOS app pipeline guide (all supported types: LOB PKG + unmanaged PKG + DMG + M365 VPP + Mac App Store) — Phase 55 Plan 55-02 (commit `aecf014`)
- ✓ APP-05 — Installomator/Intuneomator community callout (MEDIUM confidence; non-Microsoft-supported) — Phase 55 Plan 55-02 (commit `aecf014`)
- ✓ APP-06 — iOS VPP licensing guide (device-licensing vs user-licensing flows; license reclamation) — Phase 55 Plan 55-03 (commit `aecf014`)
- ✓ APP-07 — Android Managed Google Play private-app publishing guide (AMAPI API change 2024) — Phase 55 Plan 55-04 (commit `aecf014`)
- ✓ APP-08 — Android OEMConfig app deployment guide (Zebra APK side-load per v1.4.1 Phase 45 precedent) — Phase 55 Plan 55-04 (commit `aecf014`)
- ✓ DRIFT-01 — Windows Intune Remediations detect+remediate guide (portal path; per-device status reports) — Phase 56 Plan 56-01 (commits `d0654d2` + `6b26488`)
- ✓ DRIFT-02 — Canonical Intune Remediations script-authoring pattern (exit codes; Log Analytics) — Phase 56 Plan 56-01 (commits `d0654d2` + `6b26488`)
- ✓ DRIFT-03 — Cross-platform compliance drift detection guide (Windows / macOS / iOS / Android signals) — Phase 56 Plan 56-02 (commits `119632e` + `6b26488`)
- ✓ DRIFT-04 — Windows tenant-to-tenant migration runbook (BitLocker re-key; Autopilot deregistration) — Phase 56 Plan 56-04 (commits `4dd7122` + `6b26488`)
- ✓ DRIFT-05 — macOS / iOS tenant-to-tenant migration runbook (ABM token re-issue; ADE Await-Configuration) — Phase 56 Plan 56-04 (commits `4dd7122` + `6b26488`)
- ✓ DRIFT-06 — Android tenant-to-tenant migration runbook (MGP re-binding; per-ownership-mode re-provisioning) — Phase 56 Plan 56-04 (commits `4dd7122` + `6b26488`)
- ✓ DRIFT-07 — Cross-platform encryption-drift section inside tenant-migration runbook (BitLocker/FileVault/iOS/Android) — Phase 56 Plan 56-04 (commits `4dd7122` + `6b26488`)
- ✓ AUDIT-01 — v1.5-milestone-audit.mjs ships as Path A copy of v1.4.1 harness (C1-C9 preserved; sidecar renamed) — Phase 48 Plan 48-01 (commits `47c4289` + `bf14bf5`)
- ✓ AUDIT-02 — C10 Linux frontmatter check added (platform: Linux; 60-day cycle; 22.04+24.04 scope) — Phase 48 Plan 48-01 (commits `47c4289` + `bf14bf5`)
- ✓ AUDIT-03 — C11 ops-domain anti-pattern regex (SCCM disambiguation; WUfB-vs-Autopatch; SafetyNet cross-domain) promoted to blocking — Phase 48 scaffold + Phase 60 Plan 60-08 promotion (commit `c2abdd4`)
- ✓ AUDIT-04 — C12 4-platform comparison structural validation (5 platform columns; link-not-copy cells) promoted to blocking — Phase 48 scaffold + Phase 60 Plan 60-08 promotion (commit `c2abdd4`)
- ✓ AUDIT-05 — C13 broken-link automation via markdown-link-check (internal anchors + relative paths; sidecar allowlist 15 entries) promoted to blocking — Phase 48 scaffold + Phase 60 Plan 60-08 promotion (commit `c2abdd4`)
- ✓ AUDIT-06 — Per-phase check-phase-NN.mjs validators + CI workflow audit-harness-v1.5-integrity.yml (Phases 48-60) — Phases 48-60 (commit `6626253` for check-phase-60.mjs)
- ✓ AUDIT-07 — regenerate-supervision-pins.mjs --self-test BASELINE_9 refresh closes v1.4.1 carry-over — Phase 60 Plan 60-08 (commit `c2abdd4`)
- ✓ AUDIT-08 — Phase 48 broken-link sweep first-pass baseline + Phase 60-61 second-pass milestone close audit report (v1.5-MILESTONE-AUDIT.md; 57/57 reqs; 12/12 harness PASS) — Phase 48 (first pass) + Phase 60 Plan 60-08 (second-pass; commit `c2abdd4`) + Phase 61 Plan 61-04 (audit doc; commit `690624d`)

- ✓ AB-01 — `docs/_glossary-apple-business.md` with rebrand-mapping table + 4 H2 categories + bidirectional reciprocity to legacy terms — Phase 62 Plan 62-02 (commit `9b486bb`)
- ✓ AB-02 — `01-role-permission-model.md` with 4 top-level roles + 5 preset custom roles + Account Holder hard-bordered callout (OP-2) — Phase 62 Plan 62-04 (commit `b4aaafd`)
- ✓ AB-03 — Per-permission catalog across 7 in-scope subgroups + Edit-without-View dependency table (OP-3) — Phase 62 Plan 62-04 (commit `b4aaafd`)
- ✓ AB-04 — `02-ous-architecture.md` with hierarchy rules + per-OU scoping table — Phase 62 Plan 62-05 (commit `022beb5`)
- ✓ AB-05 — Apple Business rebrand statement at exactly 3 canonical sites (00-overview.md + admin-setup-macos/01-abm-configuration.md intro + admin-setup-ios/02-abm-token.md intro) per Q5(b) no-corpus-sweep contract — Phase 62 Plans 62-03 (site #1; commit `9f7a837`) + 62-07 (sites #2+#3; commit `8331ea3`)
- ✓ AB-06 — 4 existing platform glossaries each gain one reciprocal banner line pointing to `_glossary-apple-business.md` + `_glossary-macos.md` inline see-also at ABM entry — Phase 62 Plan 62-07 (commit `8331ea3`)
- ✓ AB-07 — L1 admin-directory lookup convention `_admin-directory.md` with `<TENANT_FILL_IN>` placeholders + 4 backend types — Phase 62 Plan 62-06 (commit `6b2a8ef`)
- ✓ OU-01 — `03-ous-vs-custom-roles.md` delegation topology decision matrix with "most-permissive wins" callout (OP-4) — Phase 63 Plan 63-01 (commit `2094cc7`)
- ✓ OU-02 — `04-custom-role-authoring.md` canonical Sub-Org Admin permission bundle (4-6 permissions, DENY-by-default on Manage MDM Servers per whitelist-first OP-1) — Phase 63 Plan 63-01 (commit `4863196`)
- ✓ OU-03 — `05-sub-org-admin-onboarding.md` with Managed Apple Account creation + role assignment + OU scoping + paired offboarding (OP-8); `#which-admin-owns-this-pool` C16 anchor — Phase 63 Plan 63-02 (commit `5b6c57d`)
- ✓ OU-04 — `06-mdm-server-assignment.md` with DENY-by-default Manage MDM Servers privilege (OP-1) — Phase 63 Plan 63-03 (commit `8fd98b1`)
- ✓ OU-05 — `07-vpp-content-token-consolidation.md` with untouched-OU OP-9 hard-bordered callout — Phase 63 Plan 63-03 (commit `c38dc72`)
- ✓ OU-06 — `08-managed-apple-account-provisioning.md` with manual + SCIM + OIDC+JIT decision matrix — Phase 63 Plan 63-03 (commit `3434bd1`)
- ✓ OU-07 — `09-shared-ipad-lifecycle.md` with sessions + user provisioning + Find My disable (OP-12) — Phase 63 Plan 63-04 (commit `2339e54`)
- ✓ OU-08 — `10-apple-tv-lifecycle.md` with Configurator-only retail-purchase path + OU assignment + content-token-based app deployment + Conference Room Display heuristic (OP-15) — Phase 63 Plan 63-04 (commit `b3adba9`)
- ✓ OU-09 — 3 new rows in `ios-capability-matrix.md` under existing Enrollment H2 + pre-edit anchor inventory artifact (PITFALL-6 / DA-4) — Phase 63 Plan 63-05 (commit `65f8a55`)
- ✓ OU-10 — `macos-capability-matrix.md` + `4-platform-capability-comparison.md` byte-unchanged (C12 240-cell math + D-13/D-18 sibling-anchor-pin contract preserved per D-A3) — Phase 63 Plan 63-05 (commit `65f8a55`)
- ✓ DELEG-01 — `11-vpp-catalog-runbook.md` with untouched-OU OP-9 callout + post-migration license-count verification — Phase 64 Plan 64-02 (commit `35b24ce`)
- ✓ DELEG-02 — `12-shared-ipad-passcode-reset.md` (canonical C16 admin-context doc) with 3-path decision matrix + Path C OP-11 L2-approval gate — Phase 64 Plan 64-02 (commit `6364203`)
- ✓ DELEG-03 — `13-device-release-runbook.md` with "release ≠ removal" semantics + 30-day provisional-period callout (OP-6) — Phase 64 Plan 64-02 (commit `cbba3aa`)
- ✓ DELEG-04 — `14-device-transfer-runbook.md` with 4-cell impact matrix + pre-transfer dependency checklist (OP-5) — Phase 64 Plan 64-03 (commit `3802665`)
- ✓ DELEG-05 — `15-mdm-server-reassign-runbook.md` SINGLE runbook with OS-version eligibility matrix + 2 sub-H2s (CI-5 anti-proliferation) — Phase 64 Plan 64-03 (commit `cae78df`)
- ✓ DELEG-06 — `16-managed-apple-account-runbook.md` covering manual + SCIM + OIDC+JIT + 60-day federation collision resolution (OP-7) + SCIM token renewal cadence — Phase 64 Plan 64-04 (commit `36000ca`)
- ✓ DELEG-07 — `17-audit-log-scoping-runbook.md` with author-scope vs target-scope (OP-14) + SIEM export (OP-13) + "no public REST API" anti-feature — Phase 64 Plan 64-04 (commit `9639574`)
- ✓ DELEG-08 — `18-cross-org-boundary-cheat-sheet.md` with Apple-Business-vs-Intune-vs-integration disambiguation + C15 ABAUDIT exemption HTML-comment host — Phase 64 Plan 64-05 (commit `ba71025`)
- ✓ ABNAV-01 — `l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md` with pool-owner lookup + 3-path matrix + OP-11 destructive-path gating + compound frontmatter `platform: ios+macos+shared-ipad` + L1 #00-index append — Phase 65 Plan 65-02 (commit `c9409c1`)
- ✓ ABNAV-02 — `l2-runbooks/26-apple-business-permission-denied.md` with 7-leaf Mermaid decision tree (DA-9 LOCKED) + L2 #00-index append — Phase 65 Plan 65-02 (commit `699029a`)
- ✓ ABNAV-03 — `common-issues.md` `## Apple Business Governance Failure Scenarios` H2 (append-only) — Phase 65 Plan 65-03 (commit `87e88f5`)
- ✓ ABNAV-04 — `quick-ref-l1.md` `## Apple Business Quick Reference` H2 (append-only) — Phase 65 Plan 65-03 (commit `87e88f5`)
- ✓ ABNAV-05 — `quick-ref-l2.md` `## Apple Business Quick Reference` H2 (append-only) — Phase 65 Plan 65-03 (commit `87e88f5`)
- ✓ ABNAV-06 — `operations/00-index.md` Apple Business as 5th sub-section (append-only) — Phase 65 Plan 65-03 (commit `87e88f5`)
- ✓ ABNAV-07 — `docs/index.md` Apple Business sub-H3 under `## Operations` H2 + Cross-Platform References entries + platform-coverage banner appendix at line 9 (surgical edits) — Phase 65 Plan 65-03 (commit `87e88f5`)
- ✓ AUDIT-09 — `scripts/validation/v1.6-milestone-audit.mjs` Path-A copy from `v1.5-milestone-audit.mjs` with C1-C13 preserved — Phase 62 Plan 62-08 atomic harness commit (`e8ae896`)
- ✓ AUDIT-10 — C14 rebrand-statement presence at 3 canonical sites lands blocking from Phase 62 — Phase 62 Plan 62-08 atomic harness commit (`e8ae896`)
- ✓ AUDIT-11 — C15 Intune-delegation anti-pattern guard lands blocking from Phase 62 + allowlist exemptions in `18-cross-org-boundary-cheat-sheet.md` HTML comments — Phase 62 Plan 62-08 atomic harness commit (`e8ae896`)
- ✓ AUDIT-12 — C16 L1 #34 cross-link integrity triangle lands blocking from Phase 62; 4-edge triangle live with zero exemptions via Phase 65 Wave 4 atomic-trio commit `8721a63` — Phase 62 Plan 62-08 atomic harness commit (`e8ae896`)
- ✓ AUDIT-13 — Per-phase validators `check-phase-62.mjs..check-phase-66.mjs` ship as deliverables + CI workflow `audit-harness-v1.6-integrity.yml` Path-A from v1.5 — Phases 62-66 (check-phase-62: commit `e8ae896` / check-phase-63: `ee4f6c7` / check-phase-64: `3d16120` / check-phase-65: `c25fa10` / check-phase-66: `0ae8975` / CI workflow: `fb4e759`)
- ✓ AUDIT-14 — BASELINE_10 refresh in atomic harness commit (closes BASELINE_9 v1.5 carry-over) + `c13_rotting_external` sidecar category populated with quarterly_audit metadata + `v1.6-audit-allowlist.json` co-located with harness — Phase 66 Plan 66-02 atomic harness commit (`3a9a671`)
- ✓ AUDIT-15 — Terminal re-audit at Phase 66 from fresh `gsd-executor` sub-agent + fresh `git clone --no-hardlinks` per D-03 LOCKED (STRICTER physical isolation than v1.5 worktree precedent); `v1.6-MILESTONE-AUDIT.md` authored confirming 39/39 reqs + 5/5 phases + 15/15 harness PASS; `v1.6-DEFERRED-CLEANUP.md` finalized with CI-1/CI-2/CI-3 — Phase 66 Plan 66-04 (audit results commit `489edca`) + Plan 66-05 (milestone close commit `153d59d`)

- ✓ SWEEP-01 — 4 business.apple.com URL refs verified against live Apple URL state on 2026-05-26 using markdown-link-check@3.14.2 (cron-pinned per audit-harness-v1.6-integrity.yml:167) + corroborating curl HEAD; sidecar c13_rotting_external.ci_1_abm_urls 4 entries annotated with "last_revalidated":"2026-05-26"; Branch A taken (URLs confirmed-current; no corpus edits required); quarterly rotting-external cron continues monitoring at `0 8 1 1,4,7,10 *` (next first-fire 2026-07-01) — Phase 67 Plan 67-01 (`3fb8ca5`)
- ✓ SWEEP-02 — 6 VPP location token occurrences across 2 files (admin-setup-ios/05-app-deployment.md:71,201 + admin-setup-macos/04-app-deployment.md:45,46,113,148) surgically renamed to "content token" form per PITFALLS.md:657 first-mention-per-H2 convention; 2 OP-10-style callout blocks inserted above each `## Renewal / Maintenance` table; 2 tail-table Version History rows + 1 `_glossary-macos.md` coordinating row; 3 frontmatter `last_verified` bumps; sidecar c13_rotting_external.ci_2_vpp_location_token 6 entries annotated with `"resolved_2026_05_26":true`; PITFALL-6 anchor invariant satisfied at `_glossary-macos.md` `## Version History` H2 line 121; harness C11/C14/C15/C16 inert (15/15 PASS); chain CHAIN_SKIP unchanged {48,51,58,60,61} — Phase 67 Plan 67-02 atomic-within-plan (`55260b3`)

- ✓ CHAIN-01 — CRLF regex mismatch resolved via D-01 Option B (readFile() CRLF centralization) — 2-line append-suffix edit appending `.replace(/\r\n/g, '\n')` to `check-phase-51.mjs:17` + `check-phase-58.mjs:21` readFile() bodies (verbatim byte-copy of canonical idiom from check-phase-48.mjs:25 per Phase 31 ca40eb9 lineage); INTENT-equivalence satisfies ROADMAP SC#1 literal-letter "regex updated to `\r?\n`" via read-time normalization; 25/25 + 26/26 PASS preserved; sister-validator regression sweep byte-identical pre/post-edit; adversarial-wedge protection preserved zero regex-body changes (D-01 Option A inventory would have injected ~9 semantic-bug edits to `[^\n]*` negated character classes) — Phase 68 Plan 68-01 (`36a753d`)
- ✓ CHAIN-02 — Archive-path detection + self-test lineage repoint + v1.5 sidecar broad rebase via D-02 Option B helper + D-03 Option A-prime + D-04 §2.3 broad-rebase — NEW `scripts/validation/_lib/archive-path.mjs` (first _lib/ inhabitant) exports `resolveArchivedPhasePath(phaseSuffix, milestoneRoots=['v1.5-phases'])`; 5 call-site replacements (check-phase-31/48/60/62/63.mjs) + regenerate-supervision-pins.mjs BASELINE_9 +1 banner shift (Phase 62-07 attribution) + `parseAllowlist()` repointed v1.5 → v1.6 sidecar (line 422) + v1.5-audit-allowlist.json broad rebase across 4 array keys (17 _glossary-android.md entries +1 shifted: supervision_exemptions[]/c7_knox_allowlist[]/safetynet_exemptions[]/c9_exemptions[]); STRETCH-closed check-phase-31 silent-swallow data-integrity bug via `_missing` discriminator marker extending existing `_parseError` pattern; v1.5-milestone-audit.mjs FAIL→PASS (9/12→12/12 in fully-blocking mode); regenerate-supervision-pins.mjs --self-test FAIL→PASS; check-phase-48 5/7→7/7; check-phase-60 19/25→25/25; v1.6-harness 15/15 unchanged — Phase 68 Plan 68-02 (`79c65c6`)
- ✓ CHAIN-03 — ATOMIC 5-file CHAIN_SKIP empty-Set substitution across check-phase-{62,63,64,65,66}.mjs in single SHA per Phase 66-02 atomic-harness-commit precedent commit `3a9a671` + ROADMAP SC#4 contract — `const CHAIN_SKIP = new Set([48, 51, 58, 60, 61])` → `const CHAIN_SKIP = new Set([])`; uniform Phase-68-closure narrative replaces per-file canonical comment blocks; subprocess timeout 60s→300s auto-applied per Rule 3 to accommodate empty-CHAIN_SKIP recursive chain traversal (check-phase-65 standalone ~102s); preceded by Option A pivot precondition `d7d7d5f` v1.5-frozen-aware V-61-01..04 reads REQUIREMENTS.md @ v1.5-close SHA ba2cbc0 via execFileSync('git', ['show', ...]) — Plan 68-03 Task 1; full chain check-phase-{48..66}.mjs exits 0 across all 19 phases with 0 SKIPPED — first time since v1.5 close; v1.5-harness 12/12 + v1.6-harness 15/15 + self-test PASS unchanged; V-NN-SELF + V-66-07 compatibility preserved — Phase 68 Plan 68-03 Task 2 atomic (`7b635ca`) + Task 1 precondition (`d7d7d5f`)

- ✓ CILINUX-01 — New `ubuntu-latest` runner job live in `.github/workflows/audit-harness-v1.7-integrity.yml` (Path-A copy from `audit-harness-v1.6-integrity.yml` with v1.7-scoped path-filter + 2 crons preserved + new `linux-chain-ubuntu-latest` job); job runs full validator chain `check-phase-{48..66}.mjs` on Linux LF line endings; PR-blocking per D-A9 inheritance (`continue-on-error: false`); coexists with v1.4/v1.5/v1.6 workflows zero modifications; chain-apex 28 PASS / 0 FAIL / 0 SKIPPED on BOTH Windows local AND Linux GHA ubuntu-latest (EXACT MATCH at chain-apex level); Linux runtime ~56s (well within TIMEOUT-01 1500s escalation threshold; 54% of Windows ~102s reference); 3 cross-OS architectural discoveries surfaced during SC#5 validation (FETCH-DEPTH-01 — shallow-clone broke v1.5-frozen-aware validators; SCOPE-GAP-61 — V-61-05..08 HEAD-coupled per Plan 68-03 Task 1 scope gap; D-04-OVERSPEC-01 — SC#5 design over-spec; CHAIN-01 fix made check-phase-51 CRLF-tolerant); 1 latent meta-bug deferred to v1.8+ (CHAIN-WRAPPER-01); SC#5 satisfied via reframe-aware B.1+B.2+B.4 trio (workflow_dispatch baseline + synthetic CRLF PR closed-no-merge + Windows-vs-Linux chain-apex diff EXACT MATCH); zero-master-tree-churn invariant preserved (PR #1 closed-without-merge + branch deleted local+remote); cross-OS verification axis now stacks with fresh-clone + fresh sub-agent as the 3rd independence axis at Phase 70 terminal re-audit — Phase 69 Plans 69-01 (`dd1ff08`) + 69-02 Fix-1 (`85521bb` fetch-depth:0) + 69-02 Fix-2 (`2d61981` V-61-05..08 v1.5-frozen-aware) + Plan 69-02 close-gate

- ✓ HARNESS-01 — `scripts/validation/v1.7-milestone-audit.mjs` ships as Path-A copy from `v1.6-milestone-audit.mjs` with C1-C13 + C14/C15/C16 preserved verbatim (lineage extends v1.4 → v1.4.1 → v1.5 → v1.6 → v1.7); harness exits 0 with 15/15 checks PASS in fully-blocking mode on BOTH Windows local AND Linux GHA ubuntu-latest (EXACT MATCH); self-test 9/9 PASS preserved — Phase 70 Plan 70-02 Atom 1 atomic harness-core commit (`26a1ae9`)
- ✓ HARNESS-02 — `scripts/validation/v1.7-audit-allowlist.json` ships as Path-A copy from `v1.6-audit-allowlist.json` with `c13_rotting_external` reset for v1.7 (CI-1/CI-2 entries reflect post-SWEEP-01/SWEEP-02 state); `c16_missing_endpoint_exemptions: []`; sidecar shape preserved; `quarterly_audit` metadata carried forward (cadence `0 8 1 1,4,7,10 *`); BASELINE_11 freshness comment added to `regenerate-supervision-pins.mjs` (closes BASELINE_10 v1.6 carry-over per per-milestone AUDIT-14-equivalent contract); harness path-match repointed from v1.6 → v1.7 sidecar — Phase 70 Plan 70-02 Atom 1 atomic harness-core commit (`26a1ae9`)
- ✓ HARNESS-03 — Per-phase validators `check-phase-67.mjs..check-phase-70.mjs` ship as deliverables (validator-as-deliverable pattern from v1.3+); each is Path-A from `check-phase-66.mjs` with phase-specific V-NN-NN assertions for that phase's deliverables; CHAIN_PHASES does NOT include the validator's own phase (V-NN-SELF guard per `check-phase-65.mjs:151` precedent); per-assertion-class freshness routing per D-01 LOCKED Option C (per-V-NN-NN matrix in 70-CONVENTIONS.md); V-NN-SELF + V-NN-CHAIN + V-NN-AUDIT guards per validator — Phase 70 Plan 70-03 Atom 2 atomic validator+CI surface commit (`aa6de68`)
- ✓ HARNESS-04 — `.github/workflows/audit-harness-v1.7-integrity.yml` EXTENDED (NOT Path-A-recreate; 9 itemized edits a..i applied per HARNESS-04 spec) from existing v1.7 workflow originally authored at Phase 69 Plan 69-01 (`dd1ff08`); path-filter swapped to v1.7-scoped files; 2 crons preserved; v1.7 validator jobs check-phase-67..70 added; PR-blocking per D-A9 (only `pin-helper-advisory` retains `continue-on-error: true`); coexists with v1.4/v1.5/v1.6 workflows; FETCH-DEPTH-01 inheritance preserved on linux-chain-ubuntu-latest checkout step (`fetch-depth: 0`); `09-linux-triage.md` REMOVED from path-filter (Phase-69-evidence-only entry, no v1.7-deliverable status); predecessor v1.4/v1.4.1/v1.5/v1.6 workflow YAMLs BYTE-UNCHANGED verified post-`aa6de68` — Phase 70 Plan 70-03 Atom 2 atomic validator+CI surface commit (`aa6de68`)
- ✓ HARNESS-05 — Terminal re-audit at Phase 70 close ran `v1.7-milestone-audit.mjs` + full chain `check-phase-{48..70}.mjs` from fresh `git clone --no-hardlinks` into `$env:TEMP\v1.7-audit-tohma3w0` via fresh `gsd-executor` sub-agent (D-22 INTENT via D-03 mechanism — STRICTER physical isolation than worktree; reconciles with `.planning/config.json:7` `use_worktrees:false`); 3-axis stacking operationalized at the literal close-gate moment (first close-gate in project history per STATE.md:111 declaration): Axis 1 local fresh-clone `tohma3w0` (main_head_sha = clone_head_sha = `84e9f4e...`) all 7 validators exit 0 + clone removed + zero orphan temp dirs OR files (over-fulfillment beyond strict contract via results-JSON sweep) + Axis 2 cross-OS Linux GHA run `26604414109` (https://github.com/Schweinehund/Autopilot/actions/runs/26604414109) 9 active jobs `conclusion: success` + chain-67..70 ACTIVELY ran (NOT skip-if-missing) + CHAIN_TIMING_LINUX = 74s + Axis 3 fresh sub-agent zero context-carryover from Plans 70-01..03; Cross-OS PASS-Count EXACT MATCH verified across 6 cross-OS-applicable validators including chicken-and-egg SKIPPED counts (19 total: 7 + 2 + 10 across check-phase-67/68/70 — v1.7-frozen-aware reads of `{phase_70_close_SHA}` placeholder per D-01 routing); ARCHIVE-01 boundary preserved (OUT OF SCOPE; deferred to `/gsd-complete-milestone` skill per D-03 LOCKED) — Phase 70 Plan 70-04 artifact-only commit (`8175f82`)
- ✓ HARNESS-06 — `.planning/milestones/v1.7-MILESTONE-AUDIT.md` authored Path-A from v1.6 with 3-axis Auditor-Independence Verification + NEW Discoveries Surfaced During Execution section (6 entries: FETCH-DEPTH-01 CLOSED + SCOPE-GAP-61 CLOSED + D-04-OVERSPEC-01 ACKNOWLEDGED + CHAIN-WRAPPER-01 DEFERRED + ARCHIVE-01 root-cause DEFERRED + Plan 70-05 Commit A V-67-05/06 transient state) + 12-row Requirements Traceability + Wave 5 Post-Audit Confirmation V-70-18..23 residual state documentation per M4 fix + Sign-off /gsd-complete-milestone hand-off; `.planning/milestones/v1.7-DEFERRED-CLEANUP.md` FINALIZED with 6 v1.6 carry-over sections promoted from stub (CI-3 + Multi-tenant + Apple Business Device API + per-OU CRD + Account Holder + ASM) + Phase 67 VPP-additional discoveries + Phase 69 final dispositions; 4-doc traceability closure across PROJECT.md (this section) + ROADMAP.md (Phase 70 row 5/5 Complete) + STATE.md (milestone=v1.7 status=complete) + REQUIREMENTS.md (12 v1.7 rows Complete); 70-VERIFICATION.md NEW close-gate report (Sections A-G); two-commit chicken-and-egg per D-04 Option (b): Commit A `14683de` (SHA placeholder fill {phase_70_close_SHA}→aa6de68 + {phase_70_atom_1_SHA}→26a1ae9 across 4 validators + regenerate-supervision-pins.mjs BASELINE_11 comment; 77 total substitutions; check-phase-69.mjs unmodified per plan conditional) + Commit B `{phase_70_close_SHA}` (7 files close-gate); ARCHIVE-01 recurrence-check OUT OF SCOPE per D-03 LOCKED — deferred to `/gsd-complete-milestone` skill invocation post-Phase-70-close — Phase 70 Plan 70-05 (Commit A `14683de` + Commit B `{phase_70_close_SHA}` — literal placeholder per chicken-and-egg Option (b); recoverable via `git log --all --grep="70-05" --grep="Commit B" --all-match -1 --format=%H`)

#### v1.8 Milestone (Tooling Debt Closure + Chain-Resilience Hardening — IN PROGRESS)

- ✓ ARCHIVE-01 — Root-cause fix for `.claude/commands/gsd-complete-milestone.md` / `gsd-sdk query milestone.complete` SDK handler extraction-pattern logic. Vendored corrected extractor at `scripts/archive/extract-summary-oneliners.mjs` (11,689 bytes) with corrected regex `/^#[^\n]*\r?\n+\*\*One-liner:\*\*\s+([^\r\n]+)/m` (anchors on literal `**One-liner:**` label, captures VALUE — replaces upstream buggy regex that captured LABEL); companion 3-case test fixture at `scripts/archive/test-extract-oneliner.mjs` (label-not-captured / pre-write idempotency / CRLF tolerance — 3/3 PASS); chain-apex validator at `scripts/validation/check-phase-71.mjs` (V-71-FIX-01/02 + V-71-MILESTONES-01 + V-71-ARCHIVE02-01 + V-71-CHAIN-{48..70} + V-71-AUDIT + V-71-SELF; 11-token PLACEHOLDER_TOKENS regex including `Edit \\d+ --` NEW DISCOVERY from D-03 advisor pre-sweep grep). All 3 files landed atomically in ONE SHA per ROADMAP SC#4 byte-exact contract + Phase 67 Plan 67-02 `55260b3` 5-file atomic-within-plan precedent. Caller's frontmatter-first preference at upstream `phase-lifecycle.ts:1693` routes around the still-broken upstream fallback per D-01 LOCKED Option B vendor-strategy. Upstream PR follow-up tracked as ARCHIVE-UPSTREAM-01 in `v1.8-DEFERRED-CLEANUP.md` (DEFERRED to v1.9+; vendored fallback canonical until upstream `get-shit-done-cc` releases corrected version) — Phase 71 Plan 71-01 atomic SHA `e4887b2`
- ✓ ARCHIVE-02 — Historical residue sweep across `.planning/MILESTONES.md` v1.0..v1.4.1 entries. Re-authored v1.1 H2 (lines 159-173 post-sweep) + v1.2 H2 (lines 138-153 post-sweep) from canonical `.planning/milestones/v1.1-MILESTONE-AUDIT.md` (165 lines) + `.planning/milestones/v1.2-MILESTONE-AUDIT.md` (345 lines) source-of-truth per D-03 LOCKED Option D (REPLACEMENT FROM CANONICAL SOURCE, not deletion); 5 debris bullets replaced with 5 canonical bullets per H2 (v1.2 cluster lines 145-148 4-debris-line cluster: 3× `- One-liner:` + 1× `- Commit:` + v1.1 line 164 NEW DISCOVERY `- Edit 1 -- docs/error-codes/00-index.md:`). Symmetric with v1.6+v1.7 retroactive-authoring at v1.7 close 2026-05-29 ("DO NOT mask via deletion — investigate the script" doctrine honored via REPLACEMENT FROM CANONICAL SOURCE). Chicken-and-egg V-71-MILESTONES-01 + V-71-ARCHIVE02-01 flipped FAIL @ Plan 71-01 SHA `e4887b2` → PASS @ Plan 71-02 SHA `ff4514b` per Phase 68 Plan 68-04 `d142c7a` MILESTONES.md-separation precedent + Plan 70-05 Commit A `14683de` documented-transient-RED precedent — Phase 71 Plan 71-02 SHA `ff4514b`

### Active

<!-- Requirements for milestone v1.8 (Tooling Debt Closure + Chain-Resilience Hardening). Finalized in REQUIREMENTS.md. -->

**Pillar A — Archive-Automation Root-Cause (ARCHIVE-01 + ARCHIVE-02):** ✓ CLOSED 2026-06-04 (Phase 71 Plan 71-01 atomic SHA `e4887b2` + Plan 71-02 SHA `ff4514b` + Plan 71-03 close-gate `{phase_71_close_SHA}`; see Validated section above)

**Pillar B — Chain-Wrapper Hardening (CHAIN-WRAPPER-01):**
- [ ] **CHAIN-WRAPPER-01**: Fix `check-phase-66.mjs:313` chain-apex wrapper to capture both `err.stdout` AND `err.stderr`; chain-apex regression sweep to confirm no false positives

**Pillar C — Retrospective Forward-Port (HARNESS-FORWARD-01 + SCOPE-GAP-61 retrospective):**
- [ ] **HARNESS-FORWARD-01**: Class-wide scan of `check-phase-{48..66}.mjs` (19 validators) for HEAD-coupled assertions citing milestone-close state; per-validator class signature analysis
- [ ] **SCOPE-GAP-RETRO-01**: Per-validator conversion to v1.5/v1.6/v1.7-frozen-aware via SHA-pinned helpers parallel to `readRequirementsAtV15Close()` / `readRoadmapAtV15Close()` / `readCorpusFileAtV17Close()`

**Pillar D — v1.8 Audit Harness Lineage Bump (HARNESS-A..F equivalents):**
- [ ] **HARNESS-A**: `scripts/validation/v1.8-milestone-audit.mjs` Path-A copy from v1.7 (C1-C16 inherited)
- [ ] **HARNESS-B**: `scripts/validation/v1.8-audit-allowlist.json` Path-A + BASELINE_12 freshness comment
- [ ] **HARNESS-C**: Per-phase validators `check-phase-71..NN.mjs` (validator-as-deliverable pattern)
- [ ] **HARNESS-D**: CI workflow `audit-harness-v1.8-integrity.yml` (fourth parallel coexistence file)
- [ ] **HARNESS-E**: 3-axis terminal re-audit at v1.8 close (fresh-clone + fresh sub-agent + cross-OS Linux GHA)
- [ ] **HARNESS-F**: `v1.8-MILESTONE-AUDIT.md` + `v1.8-DEFERRED-CLEANUP.md` + 4-doc traceability closure
- [ ] **VPP-3-SITES**: 3 VPP-location-token sites in `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 115/149/155 — Phase 67 SWEEP-02 carry-over)

*Final REQ-IDs and counts set in REQUIREMENTS.md after roadmap creation.*

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Environment-specific configurations — docs are generic, teams customize locally
- Frontend UI implementation — code scaffolding remains dormant in v1.5
- Backend API integration with Graph — code scaffolding remains dormant in v1.5
- Automated remediation workflows — code scaffolding remains dormant in v1.5
- Linux non-Ubuntu distros (RHEL / Rocky / Alma / Debian / SUSE / Fedora) — Ubuntu LTS only in v1.5 per scope decision; could be revisited in v1.6+
- Linux server / IoT scenarios — Linux desktop client only in v1.5
- ChromeOS management — different management platform (Google Admin); excluded from v1.0–v1.5
- BYOPC / Cloud PC / Windows 365 / Azure Virtual Desktop — defer to v1.6 candidate scope
- Web/SaaS Entra app gallery + SCIM provisioning — orthogonal identity-led surface, not device-led
- Android TV / Android Auto / Wear OS — specialized device classes, not Intune enrollment scope (v1.4 exclusion preserved)
- Android Device Administrator (DA) legacy mode — deprecated since Android 10 for new enrollments (v1.4 exclusion preserved)
- Samsung E-FOTA firmware management — orthogonal to Intune enrollment (v1.4 exclusion preserved)
- Localization / non-English content — consistent with v1.0-v1.4.1 English-only policy
- **CI-3 Managed Apple ID → Managed Apple Account corpus rename** (45 occurrences / 16 files) — DEFERRED to v1.9+ pending Microsoft Intune portal rebrand adoption (trigger: post-2026-07-01 quarterly tutorial refresh per `v1.7-DEFERRED-CLEANUP.md:252`)
- **Multi-tenant Apple Business surfaces** — DEFERRED indefinitely; requires net-new architectural decisions (cross-tenant identity, audit log scoping, VPP license accounting)
- **Apple Business Device API documentation** — DEFERRED pending Apple publishing `developer.apple.com/documentation/applebusiness/`
- **Per-OU Conference Room Display deep-dive** — TRACKER ONLY; trigger is customer demand
- **Account Holder lockout dedicated runbook** — CONDITIONAL; currently 7-leaf branch in L2 #26; promote if 5+ escalations per quarter
- **Apple School Manager (ASM) education-specific surfaces** — DEFERRED; outside enterprise scope through v1.0..v1.7
- **New content phases / new platforms** — v1.8 is tooling-only milestone; no new corpus content, no new platforms
- **HARNESS-FORWARD-01 retrospective ballooning** — explicit guardrail: if Pillar C scan surfaces another SCOPE-GAP-class discovery during retrospective, route to v1.9+ rather than expanding v1.8 scope

## Context

- 179 markdown files in `docs/` covering APv1, APv2, macOS ADE, iOS/iPadOS, and Android Enterprise enrollment frameworks (v1.5 Linux coverage adds to this; ops-depth content distributed across all 4 existing platforms)
- Three audiences served: L1 Service Desk (scripted), L2 Desktop Engineering (technical), Intune Admins (configuration)
- Four platforms shipped through v1.4.1: Windows Autopilot, macOS ADE, iOS/iPadOS, Android Enterprise. Linux (Ubuntu LTS) adds a fifth in v1.5.
- Code scaffolding exists across all three tiers (PowerShell, Python, React) but is not yet integrated; remains dormant in v1.5
- Docs structured for easy export to SharePoint/Confluence
- v1.4 introduced tri-portal admin template pattern (Intune + Managed Google Play + Zero-Touch portal) — first deviation from dual-portal pattern established in v1.2 macOS; v1.4.1 added 4th-portal Knox overlay for Samsung
- v1.5 introduces ops-domain documentation pattern (per-domain × per-platform matrix) layered on top of per-platform enrollment coverage — first time content axis is operational rather than enrollment-driven

## Closed Deferred Items (v1.4 → v1.4.1)

- **DEFER-01** (Audit allow-list expansion — C2 supervision pins) — closed Phase 43 commit `4f41431` (AEAUDIT-02 + Plans 43-03/43-04)
- **DEFER-02** (60-day freshness normalization) — closed Phase 43 commit `2574c79` (AEAUDIT-03 + Plan 43-05)
- **DEFER-03** (AOSP stub re-validation / Phase 41 VERIFICATION) — closed Phase 43 commit `c782af6` (AEAUDIT-04 + Plans 43-07/43-09)
- **DEFER-04** (Knox Mobile Enrollment) — closed Phase 44 commit `51c2e72` (AEKNOX-01..07 + Plans 44-01..44-07)
- **DEFER-05** (Per-OEM AOSP Expansion) — closed Phase 45 commit `eb88750` (AEAOSPFULL-01..09 + Plans 45-01..45-10)
- **DEFER-06** (COPE Full Admin) — closed Phase 46 commit `bcb0986` (AECOPE-01..04 + Plans 46-01..46-02)

## Closed Deferred Items (v1.4.1 → v1.5)

- **DEFER-07** (Cross-Platform Navigation Unification — AENAVUNIFY-04 Android backport into docs/index.md + common-issues.md + quick-ref-l1.md + quick-ref-l2.md) — closed Phase 57 (CLEAN-01..04 + AENAVUNIFY-04 retrofit; commits `1dee562` + `867560c` + `48e5c6f` + `caf4524` + `6d3fb1a` + `d1ecbae`)
- **DEFER-08** (4-Platform Capability Comparison — AECOMPARE-01 / `docs/reference/4-platform-capability-comparison.md` 5-platform × 6-domain × 48-row link-not-copy reference) — closed Phase 58 Plan 58-03 (commits `0a55ecd` + `629d7fc`)

## Constraints

- **Format**: Markdown files suitable for git versioning and wiki export
- **Audience**: Must be usable by L1 (scripted, decision-tree), L2 (technical, investigative), and Admins (step-by-step) separately
- **Coverage**: Generic Microsoft Intune provisioning guidance (Windows + macOS) — not tied to a specific tenant or environment
- **Accuracy**: Must reflect current Windows Autopilot (Windows 10/11) and macOS ADE behavior through Intune

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Documentation-first milestone | IT teams need troubleshooting guides before tooling is complete | ✓ Good — v1.0 complete |
| Tiered doc structure (L1/L2/Admin) | Different skill levels need different formats | ✓ Good — role-based navigation via docs/index.md |
| Generic over environment-specific | Broader applicability, teams add local details | ✓ Good — no tenant-specific content |
| Markdown in docs/ | Version-controlled, exportable to any wiki platform | ✓ Good — 116 markdown files in docs/ |
| Scenario-based APv2 failure catalog | APv2 has no hex error codes; symptom-based lookup is more useful | ✓ Good — 10 scenarios in v1.1 |
| Per-setting "what breaks" callouts | Admins need to understand misconfiguration consequences at config time | ✓ Good — embedded in all admin setup guides (Windows + macOS) |
| Confidence-attributed citations | Community sources (oofhours, Call4Cloud) used where Microsoft docs lack coverage | ✓ Good — MEDIUM confidence clearly labeled |
| Cross-platform foundation before content | Shared glossary, templates, taxonomy must exist before platform-specific docs | ✓ Good — Phase 20 prerequisite enforced |
| Platform frontmatter defaults to Windows | Avoids retroactive edits to 70+ existing docs | ✓ Good — zero v1.0/v1.1 files modified |
| macOS dual-portal template | ABM + Intune admin center steps in every macOS admin guide | ✓ Good — consistent pattern across 5 guides |
| APv1→APv2 as coexistence, not cutover | Reflects real-world mixed environments | ✓ Good — readiness checklist with blockers |
| Phases 21/22 parallelizable | Windows gaps and macOS lifecycle have zero cross-dependencies | ✓ Good — saved time in execution |
| v1.4 scope trimmed via adversarial review | Referee pattern identified Knox ME, COPE full path, AOSP user-modes full path, and cross-platform nav integration as over-scope for one milestone | Trimmed scope deferred with explicit tracking — pending |
| Knox Mobile Enrollment deferred to v1.4.1 | Paid Knox license tier gating + Samsung-specific + velocity compression on top of 3x surface vs iOS | Stub planned in overview; full coverage v1.4.1 — pending |
| Tri-portal admin template for Android | Intune + Managed Google Play + Zero-Touch portal is canonical flow; dual-portal template from v1.2/v1.3 insufficient | Template design as Phase 1 prereq before runbook phases — pending |
| v1.4 cross-platform nav deferred post-milestone | Backport regression risk against v1.0-v1.3 archived/live docs; separate unification task safer | ✓ Good — DEFER-07 closed via Phase 57 (v1.5) without regression on v1.0-v1.4.1 docs |
| Linux as 5th platform via dedicated phases (49-52) | Ubuntu LTS Intune client is structurally different (deb agent, web-app-only CA, no native CA, script-only app delivery) — needs distinct taxonomy + glossary + capability matrix | ✓ Good — Linux taxonomy + admin setup + L1 + L2 + capability matrix shipped without contaminating Windows/macOS/iOS/Android content |
| 4-pillar v1.5 milestone (cleanup / Linux / ops-depth / harness) | Reorganizing scope by axis (per-domain × per-platform) instead of per-platform enables wave-based parallel execution and closes pre-existing v1.4 deferrals | ✓ Good — Wave A (Phases 51+53) and Wave B (Phases 54+55+56) both completed cleanly with append-only contracts on shared files |
| Audit harness Path-A copy (v1.4.1 → v1.5) with informational-then-blocking promotion ladder | Adding C10-C13 as blocking from start would have broken pre-existing PASS state on 179-file baseline; informational-first lets harness ship without false negatives | ✓ Good — C10 shipped blocking (Linux frontmatter is structural); C11/C12/C13 promoted to blocking at Phase 60 atomic harness commit after content phases stabilized |
| 5-platform capability comparison as link-not-copy reference | DEFER-08 / AECOMPARE-01: copying 240 cells creates drift-on-update risk; linking to per-platform matrices keeps single source of truth per cell | ✓ Good — comparison doc cells link to platform-matrix anchors; C12 structural validator enforces architecture |
| Auditor-independence via fresh worktree spawn at terminal re-audit | Phase 47 v1.4.1 precedent — terminal audit must not share worktree with content phases to avoid sycophantic confirmation | ✓ Good — Phase 61 Plan 61-04 spawned worktree distinct from Plans 61-01/02/03; flipped AUDIT-08 from independent vantage point |
| v1.6 Apple Business as docs/cross-platform/apple-business/ tree (NOT 6th platform) | D-A1: hybrid Option d — modeled on v1.5 docs/operations/; Apple Business is a delegated-governance surface, not a new device platform. iOS + macOS share one merged tree | ✓ Good — 13 governance docs landed under cross-platform/apple-business/; preserved 4-platform-capability-comparison.md byte-unchanged (C12 240-cell math + D-13/D-18 sibling-anchor-pin contract honored) |
| v1.6 split glossary architecture (NEW _glossary-apple-business.md + reciprocal banners to 4 existing glossaries) | D-A2: Option c — split prevents glossary fragmentation across iOS/macOS while keeping Apple Business terminology in a single canonical file. Count corrected from "5" to "4" during Phase 62 (D-05) since _glossary-macos.md covers macOS + iOS/iPadOS | ✓ Good — 6th glossary node shipped; bidirectional reciprocity validated by C14/C16 |
| v1.6 audit harness C14/C15/C16 blocking-from-start (no informational grace period) | D-A9 opt-out from v1.5 informational-then-blocking ladder — Apple Business is a delegated-governance surface where bad content (Intune-side delegation leak / missing rebrand callout / broken cross-link triangle) must be rejected from Day 1, not after grace period | ✓ Good — zero post-hoc remediation needed; harness rejected bad content from Phase 1. All 3 checks PASS in fully-blocking mode at v1.6 close |
| v1.6 single MDM Reassign runbook with OS-version sub-H2s (CI-5 anti-proliferation) | DELEG-05: FEATURES Workflow 5.3 split into 2 paths (iOS/iPadOS/macOS/tvOS 26+ in-place migration / legacy factory erase) consolidated under ONE runbook to prevent runbook-count drift across OS versions | ✓ Good — `15-mdm-server-reassign-runbook.md` ships with 2 sub-H2s; check-phase-64.mjs V-64-ANTIPROLIFERATION asserts no 15b- or 15-mdm-server-reassign-2 sibling exists |
| v1.6 terminal re-audit via fresh git clone --no-hardlinks (NOT git worktree) | D-03 LOCKED: user constraint `use_worktrees:false` (.planning/config.json:7) prohibits worktree mechanism; fresh `git clone --no-hardlinks` provides STRICTER physical isolation (separate .git/ vs shared) satisfying D-22 INTENT more rigorously than literal mechanism | ✓ Good — Phase 66 Plan 66-04 ran fresh-clone audit at $env:TEMP\v1.6-audit-y3p1bv4i; all 7 validators captured; clone removed post-audit with zero orphan temp dirs |
| v1.6 deferred items lifted out-of-band to standalone v1.6-DEFERRED-CLEANUP.md | CONTEXT D-04 divergence from v1.5 inline deferred_items pattern — v1.6 has surveilled CI-1 rotting-external surface (quarterly cron job) + multiple cross-phase deferrals (CHAIN_SKIP CRLF / multi-tenant ABM / Account Holder runbook) warranting a standalone artifact for clearer v1.7+ entry-phase planning | ✓ Good — `.planning/milestones/v1.6-DEFERRED-CLEANUP.md` ships with CI-1 (4 entries — POSITIVE SURPRISE vs ~30 historical estimate), CI-2 (6 entries), CI-3, CHAIN_SKIP-CRLF, Other Deferrals. MILESTONE-AUDIT.md cross-links via single deferred_items entry |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-04 — **v1.8 PHASE 71 (Pillar A — Archive-Automation Root-Cause Fix) CLOSED 2026-06-04** via Plan 71-03 close-gate. ARCHIVE-01 + ARCHIVE-02 Active → Validated. Closing SHA chain: Plan 71-01 atomic `e4887b2` (vendored extractor + 3-case fixture + chain-apex validator; 3 files in ONE SHA per SC#4 byte-exact + Phase 67 Plan 67-02 `55260b3` atomic-within-plan precedent) + Plan 71-02 `ff4514b` (v1.1+v1.2 H2 re-authored from MILESTONE-AUDIT canonical source per D-03 LOCKED Option D REPLACEMENT-not-deletion + Phase 68 Plan 68-04 `d142c7a` MILESTONES.md-separation precedent; chicken-and-egg V-71-MILESTONES-01 + V-71-ARCHIVE02-01 flip FAIL → PASS) + Plan 71-03 `{phase_71_close_SHA}` (close-gate; 71-VERIFICATION.md NEW + v1.8-DEFERRED-CLEANUP.md NEW stub with ARCHIVE-UPSTREAM-01 + CHAIN-DEGRADED-AT-HEAD-01 + 4-doc traceability flips; literal placeholder per Phase 68 Plan 68-05 / Phase 70 Plan 70-05 Commit B chicken-and-egg precedent; recoverable via `git log --all --grep="71-03" --grep="close-gate" --all-match -1 --format=%H`). 1/4 v1.8 phases Complete + 3/12 plans Complete + 25% v1.8 progress. Phase 72 (Pillar B — CHAIN-WRAPPER-01) entry-state ready per 71-VERIFICATION.md §F readiness signal. v1.1 line 164 `Edit N --` token-class NEW DISCOVERY by D-03 advisor pre-sweep grep — PLACEHOLDER_TOKENS expanded to 11 entries at `scripts/validation/check-phase-71.mjs` via regex-fragment escape-branch mechanism. ARCHIVE-UPSTREAM-01 upstream PR follow-up DEFERRED to v1.9+ per D-01 LOCKED Option B vendor-strategy. CHAIN-DEGRADED-AT-HEAD-01 (8 pre-existing chain FAILs V-71-CHAIN-{61..67, 70}) routed to Phase 73 Pillar C SCOPE-GAP-RETRO-01 scope per REQUIREMENTS.md:25-27. Predecessor v1.4/v1.4.1/v1.5/v1.6/v1.7 workflows + harness MJS + sidecar JSONs all BYTE-UNCHANGED across Phase 71 window. Original v1.8-milestone-start footer below.*

*Original v1.8-milestone-start footer: 2026-06-03 — **v1.8 MILESTONE STARTED 2026-06-03** (Tooling Debt Closure + Chain-Resilience Hardening — Phases 71-74; 4 pillars: ARCHIVE-01/02 + CHAIN-WRAPPER-01 + HARNESS-FORWARD-01/SCOPE-GAP-61 retrospective + v1.8 audit harness lineage bump with VPP-3-sites carry-over; ~5-7h work / ~10-15 plans estimated; CI-3 + multi-tenant + ABDevice API + per-OU CRD + Account Holder + ASM all deferred to v1.9+ per `v1.7-DEFERRED-CLEANUP.md`). Previous: **v1.7 MILESTONE SHIPPED 2026-05-28** via Phase 70 Plan 70-05 Commit B (HARNESS-06 close-gate + 4-doc traceability closure). 4/4 v1.7 phases Complete (67/68/69/70). 12/12 v1.7 requirements Validated (SWEEP-01 + SWEEP-02 + CHAIN-01 + CHAIN-02 + CHAIN-03 + CILINUX-01 + HARNESS-01 + HARNESS-02 + HARNESS-03 + HARNESS-04 + HARNESS-05 + HARNESS-06). 15 v1.7 plans Complete. Closing SHAs: Phase 67 `3fb8ca5` + `55260b3` (SWEEP-01 + SWEEP-02 Pillar A) + Phase 68 `36a753d` + `79c65c6` + `7b635ca` + precondition `d7d7d5f` + cdcce23-deletion `d142c7a` + `3814bee` Commit A + Plan 68-05 close-gate (CHAIN-01/02/03 Pillar B) + Phase 69 `dd1ff08` + Fix-1 `85521bb` + Fix-2 `2d61981` + Plan 69-02 close-gate (CILINUX-01 Pillar C) + Phase 70 Atom 1 `26a1ae9` (HARNESS-01/02) + Atom 2 `aa6de68` (HARNESS-03/04) + `8175f82` (HARNESS-05 audit-results) + Commit A `14683de` (SHA placeholder fill) + Commit B `{phase_70_close_SHA}` (HARNESS-06 close-gate; literal placeholder per chicken-and-egg Option (b)). 3-axis auditor independence operationalized at Wave 4 terminal re-audit (D-03 fresh-clone + D-22 fresh sub-agent + CILINUX-01 cross-OS Linux GHA) — **first close-gate in project history to stack all three axes simultaneously per STATE.md:111 declaration**; Cross-OS PASS-Count EXACT MATCH verified across 6 cross-OS-applicable validators. Predecessor v1.4/v1.4.1/v1.5/v1.6 workflows + harnesses + sidecars BYTE-UNCHANGED through Commit B per anti-regression invariant. CHAIN_SKIP EMPTY across full chain post-Phase 68 `7b635ca` (no CRLF suppression entries; no archive-path drift entries). Validator chain green on Windows AND Linux for first time. v1.7-DEFERRED-CLEANUP.md finalized with CI-3 + Multi-tenant Apple Business + Apple Business Device API + per-OU CRD + Account Holder runbook + ASM forward to v1.8+ + CHAIN-WRAPPER-01 + ARCHIVE-01 root-cause + HARNESS-FORWARD-01 retrospective. **ARCHIVE-01 recurrence-check OUT OF SCOPE per D-03 LOCKED — deferred to `/gsd-complete-milestone` skill invocation post-Phase-70-close**; v1.7-MILESTONE-AUDIT.md Sign-off + 70-VERIFICATION.md Section F + v1.7-DEFERRED-CLEANUP.md §ARCHIVE-01 all document the hand-off. **Totals through Phase 70:** 66 v1.6 phases + 4 v1.7 phases = 70 phases, ~325 plans, ~248 documentation files. Next: user invokes `/gsd-complete-milestone v1.7` to archive Phase 67-70 directories to `.planning/milestones/v1.7-phases/` and run post-archival recurrence-check.*
