# Windows Autopilot & macOS Provisioning Documentation Suite

## What This Is

A comprehensive diagnostic toolkit and documentation suite for Windows Autopilot and macOS ADE deployments through Microsoft Intune. Combines PowerShell modules for local diagnostics, a Python FastAPI backend for orchestration, a React frontend for visualization, and tiered operational documentation that IT Service Desk (L1), Desktop Engineering (L2), and Intune Admin teams can use to troubleshoot and configure deployments across both platforms.

## Core Value

IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, and Android devices through Intune without escalating to engineering — covering APv1, APv2, macOS ADE, iOS/iPadOS, and Android Enterprise (COBO / BYOD Work Profile / Dedicated / Zero-Touch / AOSP) enrollment frameworks with role-appropriate documentation.

## Current State

**v1.4 shipped 2026-04-24; v1.4.1 started 2026-04-24.** Five milestones complete — 42 phases, 146 plans, 143+ documentation files shipped across Windows Autopilot, macOS ADE, iOS/iPadOS, and Android Enterprise. v1.4 delivered 25 Android Enterprise docs: 13-term disambiguation glossary, 5-mode enrollment framework (COBO / BYOD Work Profile / Dedicated / ZTE / AOSP stub), tri-portal admin setup suite (Intune admin center + Managed Google Play + Zero-Touch portal), 6 L1 runbooks + L1 triage tree, 3 L2 investigation runbooks + log-collection guide, Android capability matrix with Cross-Platform Equivalences section (iOS Supervision↔Android Fully Managed, Apple ADE↔Google Zero-Touch, iOS User Enrollment↔Android Work Profile), reciprocal glossary see-also, and v1.4-MILESTONE-AUDIT.md produced via committed 5-check Node audit harness. Audit exited `tech_debt` (accepted) with defer items routed to v1.4.1. **v1.4.1 scope:** close all 6 v1.4 Android deferred items — DEFER-01 allow-list expansion, DEFER-02 60-day freshness normalization, DEFER-03 Phase 39 AOSP stub re-validation, DEFER-04 Knox Mobile Enrollment, DEFER-05 full AOSP per-OEM expansion (RealWear + Zebra + Pico + HTC VIVE Focus + Meta Quest), DEFER-06 COPE full admin path — bringing Android to operational completeness parity with Windows/macOS/iOS. DEFER-07 cross-platform nav unification and DEFER-08 4-platform comparison doc deferred to v1.5.

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

## Current Milestone: v1.4.1 Android Enterprise Completion & v1.4 Cleanup

**Goal:** Close all v1.4 deferred items — complete Android Enterprise coverage (Knox Mobile Enrollment, full AOSP per-OEM, COPE full admin path) and harden v1.4 artifacts (audit allow-list expansion, 60-day freshness normalization, AOSP stub re-validation) — bringing Android to the operational completeness bar already held by Windows, macOS, and iOS/iPadOS.

**Target features (in scope):**

*Cleanup & hardening (v1.4 carry-forward):*
- Audit allow-list expansion — grow `v1.4-audit-allowlist.json` pins from ~10 to ~37 for legitimate iOS-attributed supervision bridge-prose refs in `_glossary-android.md` + `android-capability-matrix.md` Cross-Platform Equivalences (DEFER-01)
- `last_verified` 60-day freshness normalization — retroactively re-date L2 runbooks 18-21 from 90-day → 60-day cycle + normalize `admin-template-android.md` frontmatter (DEFER-02)
- Phase 39 AOSP stub re-validation — body is ~1089 words vs. self-certified 600-900 envelope; decide trim vs. update envelope (DEFER-03)

*New content (Android completeness):*
- Knox Mobile Enrollment — dedicated Samsung admin guide + provisioning-method matrix row + L1/L2 content; paid Knox license tier + Samsung-specific scope + reciprocal KME↔Zero-Touch mutual-exclusion callout (DEFER-04)
- Full AOSP per-OEM expansion — lift v1.4 hard-scoped stub into real coverage across RealWear + Zebra + Pico + HTC VIVE Focus + Meta Quest with OEM capability matrix and per-vendor provisioning caveats; PITFALL-7 "not supported under AOSP" framing preserved (DEFER-05)
- COPE full admin path — full admin guide beyond the COBO migration-note callout, OR a deprecation-rationale doc if Google's WPCO trajectory has hardened by research/discuss-phase time (DEFER-06)

**Deferrals (tracked for v1.5):**
- Cross-platform nav integration — Android backport into `docs/index.md` + `common-issues.md` + `quick-ref-l1.md` + `quick-ref-l2.md` (DEFER-07, AENAVUNIFY-04) → v1.5
- 4-platform capability comparison document (Windows + macOS + iOS + Android) → v1.5 (DEFER-08, AECOMPARE-01)

### Active

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Environment-specific configurations — docs are generic, teams customize locally
- Frontend UI implementation — deferred to future milestone
- Backend API integration with Graph — deferred to future milestone
- Automated remediation workflows — deferred to future milestone
- Linux device enrollment — Intune Linux support is limited
- ChromeOS management — different management platform (Google Admin)
- Android TV / Android Auto / Wear OS — specialized device classes, not Intune enrollment scope (v1.4 exclusion)
- Android Device Administrator (DA) legacy mode — deprecated since Android 10 for new enrollments (v1.4 exclusion)
- Samsung E-FOTA firmware management — orthogonal to Intune enrollment (v1.4 exclusion)
- Localization / non-English content — consistent with v1.0-v1.3 English-only policy

## Context

- 118 markdown files in `docs/` covering APv1, APv2, macOS ADE, and iOS/iPadOS enrollment frameworks (v1.4 Android coverage adds to this)
- Three audiences served: L1 Service Desk (scripted), L2 Desktop Engineering (technical), Intune Admins (configuration)
- Three platforms shipped through v1.3: Windows Autopilot, macOS ADE, iOS/iPadOS. Android Enterprise adds a fourth in v1.4.
- Code scaffolding exists across all three tiers (PowerShell, Python, React) but is not yet integrated
- Docs structured for easy export to SharePoint/Confluence
- v1.4 introduces tri-portal admin template pattern (Intune + Managed Google Play + Zero-Touch portal) — first deviation from dual-portal pattern established in v1.2 macOS

## Closed Deferred Items (v1.4 → v1.4.1)

- **DEFER-01** (Audit allow-list expansion — C2 supervision pins) — closed Phase 43 commit `4f41431` (AEAUDIT-02 + Plans 43-03/43-04)
- **DEFER-02** (60-day freshness normalization) — closed Phase 43 commit `2574c79` (AEAUDIT-03 + Plan 43-05)
- **DEFER-03** (AOSP stub re-validation / Phase 41 VERIFICATION) — closed Phase 43 commit `c782af6` (AEAUDIT-04 + Plans 43-07/43-09)
- **DEFER-04** (Knox Mobile Enrollment) — closed Phase 44 commit `51c2e72` (AEKNOX-01..07 + Plans 44-01..44-07)
- **DEFER-05** (Per-OEM AOSP Expansion) — closed Phase 45 commit `eb88750` (AEAOSPFULL-01..09 + Plans 45-01..45-10)
- **DEFER-06** (COPE Full Admin) — closed Phase 46 commit `bcb0986` (AECOPE-01..04 + Plans 46-01..46-02)

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
| v1.4 cross-platform nav deferred post-milestone | Backport regression risk against v1.0-v1.3 archived/live docs; separate unification task safer | Post-v1.4 nav-unification task — pending |

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
*Last updated: 2026-04-25 — v1.4.1 shipped. v1.4 audit re-run with status: passed; all 28 reqs validated; DEFER-01..06 closed in Closed Deferred Items subsection. v1.4.1 ships Knox Mobile Enrollment + per-OEM AOSP expansion (RealWear/Zebra/Pico/HTC VIVE Focus/Meta Quest) + COPE Full Admin + audit harness 8/8 PASS via v1.4.1-milestone-audit.mjs.*
