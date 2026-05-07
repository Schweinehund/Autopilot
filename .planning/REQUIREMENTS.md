# Requirements: v1.5 Linux Platform, Operational Depth & Cross-Platform Cleanup

*Milestone v1.5 — Phases 48-61 (continues numbering from v1.4.1 close at Phase 47).*

*Scope locked 2026-04-26 via `/gsd-new-milestone` workflow. Adversarial review (`/adversarial-review`) ran on 4 differentiator-tier scope decisions before this file was written; verdicts applied: 1 TRIM (Linux Bash deep-dive deferred to v1.5.1), 6 FOLDs (Identity Broker warning + BYOD caveat + Win32 dependency graph + Installomator callout + Hotpatch + Cross-platform encryption drift — all embedded in parent phase artifacts rather than standalone), 5 KEEPs (iOS v1.3 retrofit + audit harness checks C10/C11/C12/C13), 2 REJECTs (dedicated retrofit phase + defer-to-v1.5.1).*

---

## v1.5 Requirements (Active)

### Pillar 1 — Cleanup & Cross-Platform Hardening

- [x] **CLEAN-01**: Admin can land on `docs/index.md` and navigate Android L1 / L2 / Admin Setup resources at the same depth as iOS, macOS, and Windows sections (closes DEFER-07 / AENAVUNIFY-04 hub-index gap) — completed 2026-04-30 in Phase 57 Plan 57-01 (commits `1dee562` + `867560c`)
- [x] **CLEAN-02**: L1 responder can find Android symptom routing for all 8 v1.4.1 scenario categories (enrollment blocked, work profile not created, device not enrolled, compliance blocked, MGP app not installed, ZTE failed, Knox enrollment failed, AOSP enrollment failed) in `docs/common-issues.md` — completed 2026-04-30 in Phase 57 Plan 57-02 (commits `48e5c6f` + `caf4524`)
- [x] **CLEAN-03**: L1 responder can use Android quick-reference card in `docs/quick-ref-l1.md` (top checks, escalation triggers, decision tree link, runbook list — mode-first per v1.4 triage tree) — completed 2026-04-30 in Phase 57 Plan 57-03 (commit `6d3fb1a`)
- [x] **CLEAN-04**: L2 engineer can use Android quick-reference card in `docs/quick-ref-l2.md` (3-method log collection, key Intune portal paths, Play Integrity verdict reference, investigation runbook list) — completed 2026-04-30 in Phase 57 Plan 57-04 (commit `d1ecbae`)
- [x] **CLEAN-05**: Admin managing a mixed Win+macOS+iOS+Android+Linux fleet can read a single 5-platform capability comparison reference doc with axes (enrollment, identity/Entra join, app delivery, compliance depth, conditional access scope, monitoring/reporting, patching/updates) — link-not-copy structural reference, no per-cell duplication of platform-specific matrices (closes DEFER-08 / AECOMPARE-01) — completed 2026-05-01 in Phase 58 Plan 58-03 (commits `0a55ecd` + `629d7fc`; `docs/reference/4-platform-capability-comparison.md` with 6 capability H2s × 5 platform columns × 48 feature rows = 240 link-bearing data cells at 100% D-01 cell-shape compliance)
- [x] **CLEAN-06**: Anchor sweep across all `docs/**/*.md` files identifies and resolves broken intra-doc and inter-doc anchor references (`[text](#anchor)` and `[text](relative-path#anchor)` patterns) introduced by phase-based authoring drift across v1.0–v1.4.1 — completed 2026-05-06 in Phase 48 (first pass; commits `bf14bf5`) + Phase 60 Plan 60-07 (second pass; commit `c2abdd4`)
- [x] **CLEAN-07**: Relative-path inter-doc link sweep across `docs/**/*.md` identifies and resolves stale `../*-{platform}/*.md` references introduced by file additions/renames in later milestones — completed 2026-05-06 in Phase 48 (first pass; commits `bf14bf5`) + Phase 60 Plan 60-07 (second pass; commit `c2abdd4`)
- [x] **CLEAN-08**: Glossary cross-reference normalization — Windows + macOS + iOS + Android + Linux glossaries each contain reciprocal `see-also` entries for cross-platform-equivalent terms (extends v1.4 macOS↔Android pattern across all 5 platforms)

### Pillar 2 — Linux via Intune (Ubuntu LTS only)

- [x] **LIN-01**: Admin can read a Linux taxonomy + distro framework overview that establishes Ubuntu 22.04 LTS + 24.04 LTS scope (Ubuntu 20.04 dropped from Intune 2508 in August 2025), enrollment constraints (user-initiated only), supported feature surface (web-app CA only, script-based app delivery only, 4-category compliance), and a `> ⚠️ Known caveat` block surfacing the Microsoft Learn BYOD-vs-corporate-owned framing inconsistency (1c FOLD) — completed 2026-04-26 in Phase 49 Plan 49-01 (commits `6ff8e1c` + `513d07d`)
- [x] **LIN-02**: Admin can read a Linux glossary (`_glossary-linux.md`) covering Linux-specific terms (dm-crypt, LUKS, HWE kernel, GNOME desktop, deb repository, systemd service, `intune-portal` package, `intune-agent.timer`, `journalctl`) with reciprocal see-also entries to Windows / macOS / iOS / Android glossaries — completed 2026-04-26 in Phase 49 Plan 49-02 (commits `6ff8e1c` + `513d07d`)
- [x] **LIN-03**: Admin can perform Linux Intune client enrollment configuration (verify Intune + Entra P1 licensing, create Linux compliance policy from settings catalog, optionally configure device-based CA policy scoped to Linux) following a Phase 50 admin setup guide — completed 2026-04-27 in Phase 50 Plan 50-02 (commits `9a62a1a` + `ef10983`)
- [x] **LIN-04**: Admin can configure a Linux compliance policy across all 4 supported settings-catalog categories (Allowed Distributions, Custom Compliance with Bash discovery scripts, Device Encryption / dm-crypt+LUKS, Password Policy) — capability-narrowness vs Windows/macOS/iOS/Android framed via PITFALL-7-style whitelist callout pattern — completed 2026-04-27 in Phase 50 Plan 50-03 (commits `9a62a1a` + `ef10983`)
- [x] **LIN-05**: Admin sees a `> ⚠️ Known admin pitfall` callout in the Linux agent install guide documenting the `intune-portal` 2.0.2+ Java→broker breaking change that triggers automatic re-enrollment with new device IDs and requires post-update review of device-based CA assignments / filters / Entra group memberships (1b FOLD) — completed 2026-04-27 in Phase 50 Plan 50-01 (commits `9a62a1a` + `ef10983`)
- [x] **LIN-06**: End user can complete Linux device enrollment end-to-end on Ubuntu 22.04 / 24.04 LTS following a step-by-step guide (install Microsoft Edge 102.x+, install `intune-portal` deb from packages.microsoft.com, sign into Intune app with org account, complete compliance remediation, sign into Edge for org-resource access) — completed 2026-04-27 in Phase 50 Plan 50-04 (commits `9a62a1a` + `ef10983`)
- [x] **LIN-07**: L1 responder can use a Linux triage decision tree (Mermaid) covering enrollment failed / device non-compliant / CA blocking Edge / agent service not running branches — completed 2026-04-27 in Phase 51 Plan 51-01 (commits `c8a644d` + `57c5f8d`)
- [x] **LIN-08**: L1 responder can resolve "Linux enrollment failed" symptoms (package install error / sign-in failure / enrollment timeout) following a scripted L1 runbook — completed 2026-04-27 in Phase 51 Plan 51-02 (commits `c8a644d` + `57c5f8d`)
- [x] **LIN-09**: L1 responder can resolve "Linux device non-compliant" symptoms (distro/version out of range / disk not encrypted / password policy not met / custom compliance failure) following a scripted L1 runbook — completed 2026-04-27 in Phase 51 Plan 51-03 (commits `c8a644d` + `57c5f8d`)
- [x] **LIN-10**: L1 responder can resolve "Linux conditional access blocking Edge" symptoms (device not enrolled / device not compliant / Edge not signed in) following a scripted L1 runbook — completed 2026-04-27 in Phase 51 Plan 51-04 (commits `c8a644d` + `57c5f8d`)
- [x] **LIN-11**: L1 responder can resolve "Linux Intune agent service not running" symptoms following a scripted L1 runbook — completed 2026-04-27 in Phase 51 Plan 51-05 (commits `c8a644d` + `57c5f8d`)
- [x] **LIN-12**: L2 engineer can investigate Linux failure patterns using log paths (`/var/log/`, `journalctl -u intune-agent`, `journalctl | grep intune-portal`, `/var/log/intune-update.log`, `/var/log/dpkg.log`) and service commands (`systemctl status intune-agent`, `systemctl enable --user --now intune-agent.timer`) per a Phase 52 L2 investigation guide
- [x] **LIN-13**: Admin can read a Linux capability matrix that quantifies the platform's narrowness vs Windows / macOS / iOS / Android (enrollment mechanism, identity, app delivery, compliance depth, CA scope, monitoring, patching) and includes a Cross-Platform Equivalences section (Linux web-app-CA ↔ iOS MAM-WE both as "compliance-lite" patterns) — completed 2026-04-27 in Phase 50 Plan 50-05 (commits `9a62a1a` + `ef10983`)

### Pillar 3 — Operational Depth (Windows + macOS + iOS + Android)

#### Co-Management (SCCM ↔ Intune)

- [x] **COMG-01**: Admin can read a co-management overview + workload model guide covering all 7 ConfigMgr-current-branch (CB 2503 GA April 2025) workloads (Compliance Policies, Windows Update Policies, Resource Access [deprecated since CB 2203], Endpoint Protection, Device Configuration, Office Click-to-Run Apps, Client Apps) with the Device Configuration → Resource Access + Endpoint Protection implicit-switching note
- [x] **COMG-02**: Admin can plan a workload-slider migration sequence from SCCM to Intune (low-risk first: Compliance → Resource Access → WU → Endpoint Protection → Device Configuration → Apps) with per-workload pilot-collection guidance and forward-link to v1.2 Windows migration content (APv1→APv2, imaging→Autopilot, GPO→Intune)
- [x] **COMG-03**: Admin can distinguish tenant attach (Intune-portal device sync + remote actions, no workload switching) from full co-management (workload sliders active) per a focused disambiguation doc
- [x] **COMG-04**: macOS / iOS / Android admins reading co-management content see explicit "no co-management equivalent for your platform — here is the analog migration path" callouts (macOS: Jamf→Intune via ABM MDM transfer; iOS/Android: MAM→MDM transition; Android legacy DA→Enterprise migration)
- [x] **COMG-05**: Admin can identify Windows Autopatch co-management prerequisites (Device Configuration AND Office Click-to-Run workloads moved to Intune) before enabling Autopatch

#### Patch & Update Management

- [ ] **PATCH-01**: Admin can configure Windows Update for Business rings (deferral periods, deadline enforcement, restart behavior, user experience) and identify when Windows Autopatch should manage rings instead, per a Phase 54 ring topology guide
- [ ] **PATCH-02**: Admin can read a dedicated Windows Hotpatch H2 inside the WUfB rings guide covering Windows 11 Enterprise 24H2+ default-from-May-2026 behavior, VBS prerequisites, opt-out toggle (April 2026 Intune admin center addition), and reboot-reduction impact on compliance reporting (2c FOLD)
- [ ] **PATCH-03**: Admin can configure driver and firmware updates via WUfB (separately from quality/feature updates) and recognize the dual-scan source conflict pitfall when SCCM co-management still controls the WU workload
- [ ] **PATCH-04**: Admin can configure macOS update enforcement using DDM ("Software Update Enforce Latest" in Intune Settings Catalog) and understand that legacy MDM commands (`forceDelayedSoftwareUpdates`, `com.apple.SoftwareUpdate` payload, `ScheduleOSUpdate`) are deprecated and removed with Apple OS 26 — DDM is the only forward-compatible enforcement path
- [ ] **PATCH-05**: Admin can configure iOS / iPadOS update enforcement using DDM and understand that as of August 2025 the basic DDM update keys (`TargetOSVersion`, `TargetBuildVersion`, `TargetLocalDateTime`, `OfferPrograms`) work on UNSUPERVISED devices running iOS 17+ — supervised-only constraint retracted
- [ ] **PATCH-06**: v1.3 iOS device-enrollment content (`docs/admin-setup-ios/07-device-enrollment.md`) v1.3 supervised-only-DDM cell at line 35 is surgically retrofitted in Phase 54 (same-commit atomicity per v1.4.1 lesson; no separate retrofit phase) (3-surgical KEEP) <!-- per Phase 54 CONTEXT D-06 off-ballot Referee resolution: file-system verification confirmed the v1.3 slot-05 path was off-by-one; actual residual claim site is `07-device-enrollment.md:35` -->
- [ ] **PATCH-07**: Admin can configure Android patch delivery via Google Play and understand the Play Integrity MEETS_STRONG_INTEGRITY change (May 2025 Google enforcement, Sept 30 2025 Intune enforcement, October 31 2026 fleet deadline) requiring Android 13+ devices to have a security patch ≤12 months old
- [ ] **PATCH-08**: Admin can configure Zebra LifeGuard OTA firmware management via Intune (GA January 2026) for Zebra fleets, separate from Play-delivery updates, and reference Samsung KSP (Knox Service Plugin) as the analogous Samsung-side mechanism

#### App Lifecycle Automation

- [ ] **APP-01**: Admin can manage Win32 app supersedence chains in Intune (max 10 superseding apps per app; Replace vs Update option semantics; targeting required on superseding app) per a Phase 55 supersedence guide
- [ ] **APP-02**: Admin can manage Win32 app dependency graphs (max 100 dependencies per app; recursive application; circular-dependency detection) — documented as a discrete H2 section inside the Phase 55 Win32 supersedence guide alongside supersedence content (combined supersedence+dependency 10-node subgraph) (2a FOLD)
- [ ] **APP-03**: Admin can package Win32 applications using Win32ContentPrepTool (current GA version) into `.intunewin` format and configure detection rules (MSI product code / file / registry / custom PowerShell script)
- [ ] **APP-04**: Admin can deploy macOS apps via Intune across all supported types (LOB PKG with Apple Developer ID Installer cert + signed; unmanaged PKG via Intune agent; DMG via Intune agent / mounts → /Applications; Microsoft 365 native VPP/managed; Mac App Store via ABM) per a Phase 55 macOS pipeline guide
- [ ] **APP-05**: Admin reading the macOS app pipeline guide sees a confidence-attributed adjacency callout (`> 📋 Community pattern — MEDIUM confidence`) acknowledging Installomator (community OSS) and Intuneomator (Swift wrapper) as community-standard automation patterns adjacent to Intune, with explicit non-Microsoft-supported labeling (2b FOLD)
- [ ] **APP-06**: Admin can manage iOS VPP licensing using both device-licensing (no Apple ID required, silent install on supervised) and user-licensing (requires Apple ID, user must accept) flows, with explicit guidance on when each model applies and license reclamation behavior (retire/wipe returns device license; remove app returns user license)
- [ ] **APP-07**: Admin can publish Android private apps via Managed Google Play (direct APK upload to MGP private track + MGP web app publishing for web clip shortcuts) and understands the AMAPI custom-apps-via-Google-Play API change applicable since 2024
- [ ] **APP-08**: Admin can deploy Android OEMConfig apps via Intune (Zebra OEMConfig via APK side-load — explicitly NOT via Managed Google Play — per v1.4.1 Phase 45 Zebra precedent) and operate the OEMConfig app lifecycle (update, revoke, troubleshoot)

#### Drift Detection + Tenant Migration

- [ ] **DRIFT-01**: Admin can configure Windows Intune Remediations (Proactive Remediations) detect+remediate Bash/PowerShell script pairs that run on schedule (portal path: Devices > Manage devices > Scripts and remediations > Remediation scripts) and interpret per-device status reports (No issues detected / Issues fixed / Error)
- [ ] **DRIFT-02**: L2 engineer can author canonical Intune Remediations script pairs (detection returns exit 1 / remediation returns exit 0; portal report interpretation; Log Analytics surface for full output) per a reusable script-authoring pattern doc
- [ ] **DRIFT-03**: Admin can interpret cross-platform deployment-report-driven compliance drift across all 4 platforms (Windows: policy conflict / app install regression; macOS: profile revocation; iOS: jailbreak detection / OS downgrade; Android: Play Integrity verdict change) per a Phase 56 drift detection guide
- [ ] **DRIFT-04**: Admin can execute a Windows tenant-to-tenant migration runbook covering BitLocker re-key (source-tenant escrow → target Entra via PowerShell scheduled-task pattern; OR decrypt → re-encrypt with data-risk window; OR third-party tool e.g. Quest On Demand Migration), Autopilot deregistration in source / re-registration in target, and BitLocker recovery key escrow validation post-migration
- [ ] **DRIFT-05**: Admin can execute a macOS / iOS tenant-to-tenant migration runbook covering ABM token re-issue (cannot transfer MDM server assignment Tenant A → Tenant B; release from ABM in Tenant A then re-assign in Tenant B; in-use devices require wipe + re-enrollment) and Await-Configuration behavior on ADE-enrolled devices
- [ ] **DRIFT-06**: Admin can execute an Android tenant-to-tenant migration runbook covering Managed Google Play re-binding (disconnect from source MGP → bind new MGP account to target Intune tenant → re-approve all apps → re-provision devices: factory reset + re-enrollment for corporate-owned, work profile re-creation for BYOD, ZT portal re-upload with target credentials)
- [ ] **DRIFT-07**: Admin reading the tenant-migration runbook sees a cross-platform encryption-drift section covering BitLocker (Windows; key escrow targeting risk), FileVault (macOS; escrow not updated post-re-enrollment), iOS device-level encryption (no MDM management beyond compliance check), Android (LUKS not available; AOSP dm-crypt variance) — folded into the runbook, not a separate artifact (2d FOLD)

### Pillar 4 — Validation Tooling

- [ ] **AUDIT-01**: `scripts/validation/v1.5-milestone-audit.mjs` ships as Path A copy of `v1.4.1-milestone-audit.mjs` (FROZEN markers dropped from copy; existing C1-C9 checks preserved verbatim; sidecar JSON renamed `scripts/validation/v1.5-audit-allowlist.json`) and exits 0 with all blocking checks PASS at terminal re-audit time
- [ ] **AUDIT-02**: `v1.5-milestone-audit.mjs` includes C10 — Linux frontmatter check (`platform: Linux`, `last_verified` 60-day cycle, distro scope 22.04+24.04 only) — blocking from Phase 48 onward; matches v1.4 C5 Android frontmatter precedent (4-C10 KEEP)
- [x] **AUDIT-03**: `v1.5-milestone-audit.mjs` includes C11 — ops-domain anti-pattern regex covering SCCM/ConfigMgr disambiguation (PITFALL-9), WUfB-vs-Autopatch ring-naming first-occurrence expansion, SafetyNet cross-domain detection — informational-first in Phase 48 with sidecar allowlist seeded for known-legitimate occurrences (DDM deprecated-MDM-command prose, Ubuntu 20.04 EOL callout, Android AMAPI migration callout); promotes to blocking at Phase 60 once ops-domain content stabilizes (4-C11 KEEP)
- [x] **AUDIT-04**: `v1.5-milestone-audit.mjs` includes C12 — 4-platform comparison structural validation (DEFER-08 doc must contain all 5 platform columns [Windows + macOS + iOS + Android + Linux] with non-empty cells AND each non-empty cell must contain a hyperlink to the source per-platform matrix, NOT raw copied content) — informational-first when scaffolded in Phase 48; promotes to blocking once `4-platform-capability-comparison.md` exists in Phase 58 (4-C12 KEEP)
- [x] **AUDIT-05**: `v1.5-milestone-audit.mjs` includes C13 — broken-link automation via `markdown-link-check` integration with `.mlc-config.json` configured for redirect-following + internal-vs-external split + sidecar allowlist for transient external URLs (Microsoft Learn redirect chains; PITFALL-14 mitigation) and GFM anchor-case-sensitivity handling (PITFALL-15 mitigation) — informational-first in Phase 48 first-pass; promotes to blocking after Phase 60 second-pass triage (4-C13 KEEP)
- [x] **AUDIT-06**: Each new v1.5 phase ships a `check-phase-NN.mjs` validator alongside content (continues v1.3+ validator-as-deliverable discipline); CI workflow `.github/workflows/audit-harness-v1.5-integrity.yml` registers each new validator
- [x] **AUDIT-07**: `regenerate-supervision-pins.mjs --self-test` BASELINE_9 is refreshed from stale Phase 44+ file coordinates (carries over from v1.4.1 close per STATE.md out-of-band note) and `--self-test` exits 0 in v1.5 audit-tooling phase
- [ ] **AUDIT-08**: Phase 48 broken-link sweep first-pass produces a baseline anchor/link inventory that distinguishes pre-existing v1.0–v1.4.1 breakage from new-content breakage; Phase 60-61 second-pass validates v1.5 cross-references are intact and produces the milestone close audit report

---

## Future Requirements (deferred to v1.5.1 or v1.6+)

- **LIN-DEFER-01** (was scope option 1a) — Linux custom compliance Bash deep-dive guide; defer to v1.5.1 once Linux foundation has 60-day field signal. Phase 50 compliance policy guide carries a brief reference; the standalone deep-dive ships separately. Trim rationale: P3 priority per FEATURES.md prioritization matrix; standalone Bash tutorial signals depth that contradicts PITFALL-1 whitelist-first framing.
- **RHEL-01** — RHEL 9 / 10 Intune Linux client docs; defer to v1.6+ candidate. Microsoft Intune Linux client supports RHEL 9 / 10 but PROJECT.md explicitly scopes v1.5 to Ubuntu LTS only.
- **BYOPC-01** — BYOPC / Cloud PC / Windows 365 / Azure Virtual Desktop docs; defer to v1.6 candidate.
- **WEB-01** — Web/SaaS Entra app gallery + SCIM provisioning; defer to v1.6+ as orthogonal identity-led surface.
- **CHROMEOS-01** — ChromeOS via Google Admin Workspace integration with Intune; defer (v1.0–v1.5 exclusion preserved).
- **CODE-01** — PowerShell + FastAPI + React code scaffolding integration; remains dormant in v1.5.

---

## Out of Scope (explicit exclusions with reasoning)

- Linux non-Ubuntu distros (RHEL / Rocky / Alma / Debian / SUSE / Fedora) — Ubuntu LTS only per PROJECT.md scope decision; RHEL 9/10 deferred to v1.6+
- Linux server / IoT / headless device enrollment — Microsoft Intune Linux client requires GNOME graphical desktop + interactive sign-in; unsupported by Intune for headless workloads
- Linux app deployment via deb packages — Intune does NOT deliver `.deb` packages; app delivery is Bash-script-based only (no Win32/MSI/MSIX/.pkg analog for Linux); script-based pattern is the supported mechanism
- Linux configuration profiles beyond compliance — Linux has no MDM configuration profile concept in Intune; compliance policies + custom settings via Bash scripts are the only configuration mechanisms
- Snap-based Intune agent delivery — Microsoft Intune Linux agent is delivered as `intune-portal` deb from packages.microsoft.com; no snap distribution
- External Microsoft Learn URL link validation in C13 — markdown-link-check integration scopes to internal anchors + relative paths; external MS Learn redirect-chain validation is high-noise / low-signal and excluded (manual `last_verified` discipline covers external URL drift)
- Retroactive 60-day freshness normalization across all 179 v1.0–v1.4.1 files — only files surfaced by C13 sweep + files modified in v1.5 are normalized; Android-scope lock from v1.4.1 Phase 43 D-25 carries forward (iOS / macOS / Windows admin templates not retroactively normalized)
- Samsung E-FOTA firmware management — orthogonal to Intune enrollment (v1.4 exclusion preserved)
- iOS App Store private app distribution non-VPP (TestFlight / ad-hoc / enterprise in-house) — bypasses Intune MDM delivery; Apple's distribution alternatives outside Intune scope
- Cross-tenant device-license migration mechanics — Intune per-device license re-assignment is a procurement/licensing operation, not Intune provisioning; out of documentation scope
- Localization / non-English content — consistent with v1.0–v1.4.1 English-only policy
- Code scaffolding (PowerShell modules + FastAPI backend + React frontend) integration — remains dormant in v1.5

---

## Traceability — Requirement → Phase Mapping

*Finalized by gsd-roadmapper 2026-04-26. Phases continue numbering from v1.4.1 close (Phase 47) → v1.5 spans Phases 48-61.*

| REQ-ID | Phase | Notes |
|--------|-------|-------|
| AUDIT-01 | 48 | Harness Path A copy: v1.4.1 → v1.5; FROZEN markers updated; sidecar renamed v1.5-audit-allowlist.json |
| AUDIT-02 | 48 | C10 Linux frontmatter check — ships blocking from Phase 48 onward |
| AUDIT-03 | 48 (scaffold) → 60 (promote to blocking) | C11 ops-domain anti-patterns — informational-first Phase 48; blocking Phase 60 |
| AUDIT-04 | 48 (scaffold) → 60 (promote to blocking) | C12 4-platform comparison structural validation — informational-first; blocking when file exists (Phase 58+) |
| AUDIT-05 | 48 (scaffold) → 60 (promote to blocking) | C13 broken-link automation — informational-first Phase 48; blocking after Phase 60 second-pass triage |
| AUDIT-06 | 48–60 (each phase ships check-phase-NN.mjs) | Validator-as-deliverable; CI workflow registers each validator |
| AUDIT-07 | 48 | regenerate-supervision-pins.mjs BASELINE_9 refresh — closes STATE.md out-of-band carry-over |
| AUDIT-08 | 48 (first pass) → 60 (second pass) | Broken-link sweep first pass in Phase 48; second pass + milestone close report in Phase 60–61 |
| CLEAN-01 | 57 | DEFER-07: docs/index.md Android H2 expansion (L1 / L2 / Admin sub-tables) |
| CLEAN-02 | 57 | DEFER-07: docs/common-issues.md Android symptom routing (all 8 v1.4.1 scenario categories) |
| CLEAN-03 | 57 | DEFER-07: docs/quick-ref-l1.md Android quick-reference section |
| CLEAN-04 | 57 | DEFER-07: docs/quick-ref-l2.md Android quick-reference section |
| CLEAN-05 | 58 | DEFER-08: docs/reference/4-platform-capability-comparison.md (5 platforms, 6 domains, link-not-copy) |
| CLEAN-06 | 48 | Broken-link first-pass anchor sweep — C13 informational; findings inventory produced |
| CLEAN-07 | 48 | Broken-link first-pass relative-path sweep — C13 informational; findings inventory produced |
| CLEAN-08 | 59 | Hub integration: glossary cross-reference normalization across all 5 platform glossaries |
| LIN-01 | 49 | linux-lifecycle/00-enrollment-overview.md — whitelist H2 + Out of Scope callout + BYOD caveat (1c FOLD) |
| LIN-02 | 49 | docs/_glossary-linux.md — cross-collision audit first; reciprocal see-also in all 3 existing platform glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`; iOS terminology lives inside `_glossary-macos.md`) |
| LIN-03 | 50 | admin-setup-linux/00-overview.md + 02-enrollment-profile.md (enrollment config) |
| LIN-04 | 50 | admin-setup-linux/03-compliance-policy.md (4 settings-catalog categories; PITFALL-2 CA callout) |
| LIN-05 | 50 | admin-setup-linux/01-intune-linux-agent.md — Identity Broker v2.0.2+ re-enrollment pitfall callout (1b FOLD) |
| LIN-06 | 50 | docs/end-user-guides/linux-intune-portal-enrollment.md — authored during Phase 50 admin setup; cross-linked from admin-setup-linux/02-enrollment-profile.md |
| LIN-07 | 51 | docs/decision-trees/09-linux-triage.md — Mermaid 4-branch triage tree |
| LIN-08 | 51 | docs/l1-runbooks/30-linux-enrollment-failed.md |
| LIN-09 | 51 | docs/l1-runbooks/31-linux-compliance-non-compliant.md |
| LIN-10 | 51 | docs/l1-runbooks/32-linux-ca-blocking-web-access.md |
| LIN-11 | 51 | docs/l1-runbooks/33-linux-agent-service-failure.md |
| LIN-12 | 52 | docs/l2-runbooks/24-linux-log-collection.md + 25-linux-agent-investigation.md |
| LIN-13 | 50 | docs/reference/linux-capability-matrix.md — bilateral; Cross-Platform Equivalences section; explicit Not supported cells |
| COMG-01 | 53 | operations/co-management/00-overview.md — all 7 workloads; 3 slider states; CB 2503 current |
| COMG-02 | 53 | operations/co-management/02-windows-workload-sliders.md — low-risk-first migration sequence; Endpoint Protection HIGH-RISK callout |
| COMG-03 | 53 | operations/co-management/01-windows-tenant-attach.md — tenant attach vs full co-management disambiguation |
| COMG-04 | 53 | Inline callout blocks in co-management docs — macOS/iOS/Android non-equivalent analog migration paths |
| COMG-05 | 53 | operations/co-management/03-cocmgmt-migration-paths.md — Autopatch prerequisites (Device Config + Office C2R workloads) |
| PATCH-01 | 54 | operations/patch-management/01-windows-wufb-rings.md — WUfB ring topology; Autopatch disambiguation; PITFALL-9 |
| PATCH-02 | 54 | Hotpatch H2 inside 01-windows-wufb-rings.md — default May 2026; VBS; opt-out toggle (2c FOLD) |
| PATCH-03 | 54 | Driver/firmware update policy H2 inside 01-windows-wufb-rings.md — separate from quality/feature rings |
| PATCH-04 | 54 | operations/patch-management/02-macos-update-enforcement.md — DDM only; legacy MDM commands deprecated + removed Apple OS 26 |
| PATCH-05 | 54 | operations/patch-management/03-ios-update-lifecycle.md — supervised-only DDM constraint retracted iOS 17+ |
| PATCH-06 | 54 | docs/admin-setup-ios/07-device-enrollment.md surgical retrofit (cell at line 35) — same-commit-atomic with Phase 54 iOS guide |
| PATCH-07 | 54 | operations/patch-management/04-android-patch-delivery.md — MEETS_STRONG_INTEGRITY enforcement timeline; Android 13+ |
| PATCH-08 | 54 | Zebra LifeGuard OTA section inside 04-android-patch-delivery.md — GA January 2026; Samsung KSP analog |
| APP-01 | 55 | operations/app-lifecycle/01-windows-win32-msix-scale.md — supersedence behavior matrix; Required assignment callout; PITFALL-10 |
| APP-02 | 55 | Dependency graph H2 inside 01-windows-win32-msix-scale.md — combined supersedence+dependency subgraph (2a FOLD) |
| APP-03 | 55 | Win32ContentPrepTool packaging section inside 01-windows-win32-msix-scale.md — .intunewin format; detection rule types |
| APP-04 | 55 | operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md — all supported macOS app types |
| APP-05 | 55 | Installomator/Intuneomator community callout inside 02-macos-pkg-dmg-pipeline.md — MEDIUM confidence; non-Microsoft-supported (2b FOLD) |
| APP-06 | 55 | operations/app-lifecycle/03-ios-vpp-licensing.md — device vs user licensing; reclamation behavior |
| APP-07 | 55 | operations/app-lifecycle/04-android-mgp-lifecycle.md — MGP private-app publishing; AMAPI API change 2024 |
| APP-08 | 55 | Zebra OEMConfig APK side-load section inside 04-android-mgp-lifecycle.md — NOT via MGP per v1.4.1 Phase 45 precedent |
| DRIFT-01 | 56 | operations/drift-migration/01-windows-drift-detection.md — Intune Remediations detect+remediate; portal path |
| DRIFT-02 | 56 | Canonical script-authoring pattern section inside 01-windows-drift-detection.md — exit codes; Log Analytics |
| DRIFT-03 | 56 | operations/drift-migration/00-overview.md — cross-platform compliance drift signals (Windows/macOS/iOS/Android) |
| DRIFT-04 | 56 | operations/drift-migration/04-tenant-migration-runbook.md — Windows BitLocker re-key options; Autopilot deregistration |
| DRIFT-05 | 56 | macOS/iOS section inside 04-tenant-migration-runbook.md — ABM token re-issue; ADE Await-Configuration |
| DRIFT-06 | 56 | Android section inside 04-tenant-migration-runbook.md — MGP re-binding sequence; per-ownership-mode re-provisioning |
| DRIFT-07 | 56 | Cross-platform encryption-drift section inside 04-tenant-migration-runbook.md — BitLocker/FileVault/iOS/Android (2d FOLD) |

**Coverage: 57/57 active requirements mapped — 100%, no orphans, no duplicates.**

---

*Last updated: 2026-04-26 — Traceability finalized by gsd-roadmapper. 57 active requirements across 4 pillars (8 CLEAN + 13 LIN + 5 COMG + 8 PATCH + 8 APP + 7 DRIFT + 8 AUDIT = 57 unique). 6 deferred to v1.5.1/v1.6+. Phase mapping finalized: 14 phases (48–61), 100% coverage. Ready for /gsd-plan-phase 48.*
