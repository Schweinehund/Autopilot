# Research Summary — v1.5 Linux Platform, Operational Depth and Cross-Platform Cleanup

**Project:** Windows Autopilot and Intune Documentation Suite
**Domain:** Microsoft Intune provisioning documentation — 5th platform (Linux Ubuntu LTS) + operational depth + cross-platform cleanup
**Researched:** 2026-04-26
**Confidence:** HIGH (Microsoft-official sources for all breaking changes; MEDIUM for community tooling patterns)

---

## Executive Summary

v1.5 is a three-pillar milestone that matures the documentation suite from per-platform enrollment coverage into operational completeness. The first pillar closes two v1.4 deferrals (DEFER-07 Android nav unification, DEFER-08 4-platform capability comparison) and runs a systematic broken-link sweep across all 179 existing files. The second pillar adds Linux Ubuntu LTS as the 5th platform — a deliberately narrow management surface (web-app CA only, deb-only agent, script-based app delivery, 4 compliance categories) that must be framed with an explicit Supported Management Surface whitelist before any guides are authored, to avoid the parity-bait failure mode seen with early AOSP content. The third pillar delivers enterprise operational depth across all four existing platforms, with two time-sensitive DDM migration items (macOS and iOS legacy MDM update commands deprecated for Apple OS 26 cycle) and one hard deadline (Android MEETS_STRONG_INTEGRITY enforcement on Android 13+ devices, Intune enforced September 30 2025, fleet compliance deadline October 31 2026).

The recommended approach is foundation-before-content, navigation-last — the same discipline enforced across v1.0–v1.4.1. For v1.5 this means: harness Path A copy first (so all subsequent phases run against a live validator), broken-link sweep immediately after (isolate pre-existing breakage from new v1.5 breakage), Linux foundation locked (whitelist + glossary + version matrix) before any Linux admin guides, DEFER-07 and DEFER-08 integration phases last (after all content they will link to exists). The 14-phase decomposition (48–61) encodes these constraints explicitly. Phases 51–52 (Linux L1/L2) can run in parallel with Phase 53 (co-management) because they touch disjoint file sets; Phases 54–56 (ops-domain content) can parallelize similarly. DEFER-07 and DEFER-08 must not run until all runbooks and ops-depth content exist — the navigation-files-last lesson is verified across six milestones.

The primary risks are: (1) Linux capability parity framing — authors inadvertently writing to a management surface that does not exist (CA device-level, app push, configuration profiles); prevention is the PITFALL-7 whitelist-first pattern, identical to Phase 34 Android AOSP framing. (2) DEFER-08 duplication — the 4-platform comparison doc must use link-not-copy architecture or it will be stale the day it ships. (3) Phase 48 scope overload — architecture proposes Phase 48 carry both harness copy and broken-link sweep; roadmapper should consider splitting into 48a (harness) + 48b (sweep) if either task warrants its own plan. (4) Shared write hotspot conflicts — docs/index.md, docs/common-issues.md, and the L1/L2 index files are touched by multiple phases; the roadmap must serialize all writes to these files with explicit single-phase ownership.

---
## Key Findings

### Stack Additions and Changes

v1.5 introduces no new software frameworks. All changes are documentation-surface decisions driven by platform capability changes verified against Microsoft Learn as of 2026-04.

**Linux Intune client:**
- intune-portal deb via APT from packages.microsoft.com — GA delivery path; no snap package exists or is planned
- Ubuntu 22.04 LTS and 24.04 LTS are the supported pair; Ubuntu 20.04 LTS dropped in Intune service release 2508 (August 2025) — document as end-of-support only
- Identity Broker v2.0.2+ causes automatic re-enrollment with new Intune and Entra device IDs on upgrade — admin pitfall unique to Linux with no parallel on other platforms
- Web-app CA only via Microsoft Edge 102.x+ — no device-level CA grant available on Linux
- 4 compliance categories total: Allowed Distributions, Custom Compliance (Bash scripts), Device Encryption (dm-crypt/LUKS), Password Policy

**ConfigMgr:**
- Current branch: CB 2503 (GA April 23 2025) — 7 co-management workloads
- Resource Access workload deprecated since CB 2203; slider mandated to Intune in CB 2403

**macOS/iOS — breaking deprecations (HIGH confidence, verified from multiple sources):**
- forceDelayedSoftwareUpdates, com.apple.SoftwareUpdate MDM payload, and ScheduleOSUpdate MDM command deprecated and will be removed with Apple OS 26
- Current canonical enforcement path: DDM via Software Update Enforce Latest in Intune Settings Catalog
- iOS DDM update enforcement now works on unsupervised devices (iOS 17+, effective August 2025) — retracts the supervised-only constraint documented in v1.3; requires targeted retrofit callout in existing v1.3 iOS compliance content

**Android:**
- MEETS_STRONG_INTEGRITY verdict now requires hardware-backed attestation + security patch within 12 months on Android 13+; Google enforced May 2025; Intune enforced September 30 2025; fleet compliance deadline October 31 2026
- Zebra LifeGuard OTA integration with Intune: GA January 2026

**Windows:**
- Windows Hotpatch becomes the default for Windows 11 Enterprise 24H2+ in May 2026 — requires VBS, Enterprise SKU
- Win32 Content Prep Tool v1.8.7 (August 13 2024); max 10-node supersedence/dependency subgraph

**Broken-link tooling:**
- markdown-link-check (npm, tcort/markdown-link-check) — Node ESM compatible, integrates natively with existing .mjs audit harness; preferred over lychee (Rust binary) for the internal-anchor sweep

**Graph API drift detection:**
- POST /beta/deviceManagement/reports/exportJobs — key report names: DeviceNonCompliance, NonCompliantDevicesAndSettings, ConfigurationPolicyAggregate, SettingComplianceAggReport, FeatureUpdateDeviceState

**Tenant migration:**
- No Microsoft first-party migration tool; re-enrollment required; BitLocker re-key on Windows, ABM token re-issue on macOS/iOS, MGP re-binding on Android

### Expected Features

**Must have — Pillar 1 Cleanup:**
- DEFER-07: Full Android L1/L2/Admin subsection tables in docs/index.md, Android symptom routing in common-issues.md, Android sections in quick-ref-l1.md and quick-ref-l2.md (matching iOS/macOS/Windows structural depth)
- DEFER-08: 4-platform capability comparison doc (link-not-copy cells; 6 domain axes: Enrollment, Configuration, App Deployment, Compliance, Software Updates, Conditional Access)
- Cross-platform broken-link sweep: 179-file audit of intra-doc anchors and cross-file relative paths

**Must have — Pillar 2 Linux:**
- Linux platform taxonomy with Supported Management Surface whitelist H2 + Out of Scope callout block (locked before any admin guides authored)
- Linux glossary with cross-collision audit against all existing platform glossaries
- Linux version matrix (22.04/24.04 LTS supported; 20.04 EOS flagged; GA vs HWE kernel tracks)
- Linux admin setup 6-file guide (overview, agent, enrollment profile, compliance, app delivery, conditional access)
- Linux L1 triage decision tree + runbooks 30–33
- Linux L2 investigation runbooks 24–25
- Linux capability matrix (Linux-centric bilateral; explicit Not supported cells for CA device-level, app push, zero-touch, configuration profiles)

**Must have — Pillar 3 Ops-Depth:**
- macOS DDM update enforcement guide (URGENT — distinguishes deferral from enforcement; legacy MDM commands deprecated)
- iOS DDM guide + explicit retraction of supervised-only constraint for iOS 17+
- Retrofit callout to existing v1.3 iOS compliance guide for unsupervised DDM retraction (small but mandatory — must be explicitly assigned in Phase 54)
- Co-management overview + workload slider migration (all 7 workloads; all 3 slider states including Pilot Intune; Endpoint Protection HIGH-RISK callout)
- Windows WUfB rings guide (WUfB rings vs Autopatch rings disambiguation; driver/firmware separate from quality/feature rings)
- Android patch management (MEETS_STRONG_INTEGRITY compliance policy guidance; Zebra LifeGuard OTA)
- App lifecycle guides: Win32 supersedence behavior matrix, macOS PKG/DMG/Installomator, iOS VPP device vs user, Android MGP private-app publishing
- Drift detection + tenant migration runbooks (all 4 platforms)

**Must have — Pillar 4 Tooling:**
- v1.5-milestone-audit.mjs Path A copy + new checks C10–C13
- v1.5-audit-allowlist.json sidecar
- regenerate-supervision-pins.mjs BASELINE_9 refresh (stale carry-over from v1.4.1 close; self-test currently fails)
- Per-phase check-phase-NN.mjs validators continuing v1.3+ pattern

**Should have (differentiators):**
- Linux custom compliance Bash script deep-dive (unique mechanism not available on iOS/Android)
- Identity Broker v2.0.2 re-enrollment warning with admin action checklist
- Windows Autopatch co-management prerequisite documentation (Device Config + Office C2R workloads must move before Autopatch)
- Windows Hotpatch guidance (default from May 2026, opt-out toggle available)
- Intune Remediations script authoring canonical pattern (detect-fix-remediate) for L2

**Defer to v1.6+:**
- RHEL / Rocky / Alma / Debian / SUSE / Fedora Linux documentation
- Linux server / IoT scenarios
- ChromeOS management
### Architecture Decisions

v1.5 extends the existing per-platform tree by adding docs/admin-setup-linux/ parallel to the four existing admin-setup-{platform}/ directories, and a new top-level docs/operations/ directory using **Option C (hybrid)** — per-domain sub-directories with per-platform content files, cross-referenced from (not embedded in) per-platform admin guides. Co-management belongs in operations/, not in admin-setup-windows/, because it is a post-enrollment operational lifecycle topic that cuts across the platform axis.

**New structural additions:**
1. docs/linux-lifecycle/ — 2 files (enrollment overview + prerequisites)
2. docs/admin-setup-linux/ — 6 files (00-overview through 05-conditional-access)
3. docs/_glossary-linux.md — 5th platform glossary with reciprocal see-also to all 3 existing glossaries
4. docs/reference/linux-capability-matrix.md — Linux-centric bilateral matrix
5. docs/l1-runbooks/30..33-linux-*.md — 4 L1 runbooks (numeric continuation from 29)
6. docs/l2-runbooks/24..25-linux-*.md — 2 L2 runbooks (numeric continuation from 23)
7. docs/decision-trees/09-linux-triage.md
8. docs/operations/ — 4 domains x 4-5 files each (~18 files)
9. docs/reference/4-platform-capability-comparison.md — DEFER-08 deliverable
10. scripts/validation/v1.5-milestone-audit.mjs + v1.5-audit-allowlist.json

**Estimated file delta:** ~230 files total (179 existing + ~15 Linux + ~20 ops-depth + 2 new references)

**Audit harness lineage (Path A copy):**
v1.4-milestone-audit.mjs (frozen) --> v1.4.1-milestone-audit.mjs (frozen) --> v1.5-milestone-audit.mjs (active)
New checks: C10 (Linux frontmatter — blocking from start), C11 (ops-domain anti-patterns — informational-first), C12 (4-platform comparison structure — blocking once file exists), C13 (broken relative links — informational-first until manual triage complete)

**Shared write hotspots requiring serialized phase ownership:**
- docs/index.md — DEFER-07 (Phase 57) and Linux hub additions (Phase 59) must be sequential; no parallel writes
- docs/common-issues.md, docs/quick-ref-l1.md, docs/quick-ref-l2.md — Android sections (Phase 57) and Linux sections (Phase 59) must be serialized
- docs/l1-runbooks/00-index.md, docs/l2-runbooks/00-index.md — append-only contract; single-phase ownership per write event

### Critical Pitfalls

1. **Linux capability parity framing** — Authors write Linux guides as if Intune provides full MDM depth. Prevention: PITFALL-7 whitelist-first pattern. Linux foundation doc must open with a locked Supported Management Surface H2 and an equally prominent Out of Scope for Linux via Intune callout block. Every subsequent Linux doc carries a banner referencing this whitelist. No stub H2 sections for capabilities that do not exist.

2. **DEFER-08 link-not-copy violation** — Authors copy cell values from per-platform matrices into the comparison doc; stale on day one. Prevention: every non-empty cell must contain a hyperlink to the per-platform matrix section. C12 audit check enforces this mechanically.

3. **Phase 48 overload + shared write hotspot conflicts** — Architecture proposes Phase 48 carry both harness copy and broken-link sweep; roadmapper should split into 48a/48b if warranted. Separately: docs/index.md and hub files touched by multiple phases — roadmap must assign single-phase ownership to each shared write hotspot.

4. **Audit harness Path A copy — frozen markers and informational-first graduation** — v1.5 harness copy must: drop the v1.4.1 frozen-predecessor comment; update sidecar filename to v1.5-audit-allowlist.json; explicitly review which v1.4.1 informational-first checks (C6/C7/C9) should graduate to blocking. regenerate-supervision-pins.mjs --self-test currently fails with stale BASELINE_9 — must be refreshed in audit-tooling phase.

5. **macOS/iOS DDM migration urgency + v1.3 retraction** — v1.3 iOS content documents a supervised-only constraint now retracted (DDM works unsupervised on iOS 17+ from August 2025). Patch-management phase must distinguish deferral (MDM restriction still functional for delay) from enforcement (DDM only). The v1.3 retrofit is a small but mandatory task that must be explicitly assigned in Phase 54.

6. **Nav backport regression** — DEFER-07 edits to docs/index.md must begin with pre-edit anchor inventory (grep -rn index.md# docs/) before any edits land. Append-only H2-block contract enforced.

7. **Sidecar pin coordinate drift** — Ops-depth content appended to existing Android/iOS docs shifts absolute line-number pins in the allowlist. Run regenerate-supervision-pins.mjs --report before any phase that appends to a pinned file; update shifted coordinates before committing.

---
## Implications for Roadmap

### Phase Decomposition: 14 Phases (48-61)

**Sequencing tension resolved:** Architecture says broken-link sweep FIRST AND LAST and harness early; Pitfalls says harness first and DEFER-07/08 not parallel. Recommended resolution: Phase 48 = harness Path A copy + BASELINE_9 refresh + broken-link sweep first pass (consider splitting 48a harness + 48b sweep). DEFER-07 and DEFER-08 are integration phases 57-58 after all content exists. Second broken-link pass in Phases 60/61.
---

### Phase 48 - Audit Harness Bootstrap + Broken-Link Sweep First Pass
**Rationale:** Tooling before content. All subsequent phases run against a live validator. Broken-link sweep first pass against 179-file baseline isolates pre-existing breakage from new v1.5 breakage.
**Delivers:** v1.5-milestone-audit.mjs (Path A copy + C10-C13 scaffolded informational-first); v1.5-audit-allowlist.json; regenerate-supervision-pins.mjs BASELINE_9 refreshed; broken-link findings inventory
**Pitfalls avoided:** Harness frozen-marker drift; stale BASELINE_9; broken-link false positives via tool configuration before sweep runs
**Split note:** If harness + BASELINE_9 refresh + sweep is too large, split into 48a (harness) + 48b (sweep)
**Research flags:** Standard patterns; no additional research needed

### Phase 49 - Linux Foundation: Taxonomy, Glossary, Version Matrix
**Rationale:** Foundation-before-content gate (PITFALL-7). Whitelist and glossary must be locked before any Linux admin guides or runbooks are authored. Mirrors Phase 34 Android foundation.
**Delivers:** linux-lifecycle/00-enrollment-overview.md (whitelist H2 + Out of Scope callout); linux-lifecycle/01-linux-prerequisites.md (22.04/24.04 supported; 20.04 EOS; GA vs HWE kernel matrix); _glossary-linux.md (cross-collision audit first); reciprocal see-also in _glossary.md, _glossary-macos.md, _glossary-android.md
**Pitfalls avoided:** Linux capability parity framing (P1); Linux CA bait (P2); Snap vs deb confusion (P3); Distro version creep (P4); Glossary collision (P5)
**Research flags:** Standard. Surface BYOD/corporate-owned enrollment inconsistency as known caveat.

### Phase 50 - Linux Admin Setup Guides + Capability Matrix
**Rationale:** Admin setup depends on Phase 49 glossary and lifecycle overview. Capability matrix anchors the Linux surface for all subsequent Linux docs and feeds DEFER-08.
**Delivers:** admin-setup-linux/00-overview.md through 05-conditional-access.md (6 files); reference/linux-capability-matrix.md (Linux-centric bilateral; explicit Not supported cells for CA device-level, app push, zero-touch, config profiles)
**Pitfalls avoided:** Linux CA bait (P2) — compliance doc opens with CA constraint callout; Snap vs deb (P3) — agent guide specifies deb-only; Identity Broker v2.0.2+ re-enrollment warning documented
**Research flags:** Verify intune-portal deb package version via apt info intune-portal at plan time. Linux log path is LOW-MEDIUM confidence — needs live-environment verification.

### Phase 51 - Linux L1 Triage + Runbooks 30-33
**Rationale:** L1 runbooks depend on admin setup guides.
**Delivers:** decision-trees/09-linux-triage.md; L1 runbooks 30-33 (enrollment failed, compliance non-compliant, CA blocking web-app, agent service failure); l1-runbooks/00-index.md Linux section appended; initial-triage.md Linux branch appended
**Pitfalls avoided:** Linux CA bait routing — runbook 32 routes to web-app CA workflow, not device-compliance CA path
**Parallelism:** Can run in parallel with Phase 53 (co-management) — disjoint file sets

### Phase 52 - Linux L2 Investigation Runbooks 24-25
**Rationale:** L2 depends on L1 runbooks (escalation cross-references).
**Delivers:** l2-runbooks/24-linux-log-collection.md; l2-runbooks/25-linux-agent-investigation.md; l2-runbooks/00-index.md Linux section appended
**Research flags:** Log path confidence LOW-MEDIUM. L2 runbook 24 must use journalctl as confirmed primary surface.

### Phase 53 - Co-Management Operational Docs
**Rationale:** Windows-led; no dependency on Linux phases. CB 2503 is current. Resource Access deprecation and Autopatch prerequisites must be documented.
**Delivers:** operations/00-index.md; operations/co-management/00-overview.md through 03-cocmgmt-migration-paths.md (4 files); workload table with 3 slider states; Endpoint Protection HIGH-RISK callout; macOS/iOS/Android contextual notes inline
**Pitfalls avoided:** Workload slider ambiguity (P8)
**Parallelism:** Can run in parallel with Phases 51-52
### Phase 54 - Patch and Update Management (All Platforms)
**Rationale:** macOS and iOS DDM migration is urgent (legacy MDM update commands removed with Apple OS 26). Android MEETS_STRONG_INTEGRITY has October 2026 hard deadline. WUfB vs Autopatch ring disambiguation critical. Hotpatch default May 2026.
**Delivers:** operations/patch-management/00-overview.md through 04-android-patch-delivery.md (5 files); macOS guide distinguishes deferral (MDM restriction for delay) from enforcement (DDM); iOS guide retracts supervised-only constraint for iOS 17+; Android guide documents MEETS_STRONG_INTEGRITY + OEM delays; Windows guide disambiguates WUfB rings vs Autopatch rings + hotpatch
**Critical signal:** iOS unsupervised DDM retraction requires targeted retrofit callout to existing v1.3 iOS compliance guide — roadmapper must assign this as an explicit task in Phase 54.
**Pitfalls avoided:** WUfB vs Autopatch ring collision (P9)
**Research flags:** Verify Intune Settings Catalog path for Software Update Enforce Latest and Zebra LifeGuard OTA admin center path at plan time.
**Parallelism:** Can run in parallel with Phases 55-56

### Phase 55 - App Lifecycle Automation (All Platforms)
**Rationale:** Independent of patch management and drift detection. Win32 supersedence Required-assignment exception must be a dedicated callout.
**Delivers:** operations/app-lifecycle/00-overview.md through 04-android-mgp-lifecycle.md (5 files); Win32 supersedence behavior matrix (assignment type x supersedence action; Required exception as dedicated callout); macOS Installomator adjacency callout (MEDIUM confidence); iOS VPP device vs user flows; Android MGP private-app publishing
**Pitfalls avoided:** Win32 supersedence Required-assignment exception (P10)
**Parallelism:** Can run in parallel with Phases 54 and 56

### Phase 56 - Drift Detection and Tenant Migration (All Platforms)
**Rationale:** Depends on Graph API drift report names and per-platform migration constraints. All prerequisite content already shipped.
**Delivers:** operations/drift-migration/00-overview.md through 04-tenant-migration-runbook.md (5 files); Graph exportJobs pattern + key report names; BitLocker re-key before unenrollment; ABM token re-issue; MGP re-binding sequence
**Confidence note:** Tenant migration is MEDIUM confidence — no single authoritative Microsoft Learn guide; surface in runbook frontmatter.
**Parallelism:** Can run in parallel with Phases 54 and 55

### Phase 57 - DEFER-07: Android Nav Unification
**Rationale:** Navigation-files-last. All Android runbooks (complete since v1.4.1) and all Linux runbooks (Phases 51-52) must exist before hub sections are authored.
**Delivers:** Full Android subsection in docs/index.md (L1 table, L2 table, Admin Setup table — matching iOS/macOS/Windows depth); Android symptom routing block in common-issues.md; Android sections in quick-ref-l1.md and quick-ref-l2.md
**Pitfalls avoided:** Nav backport regression (P6) — pre-edit anchor inventory executed first; append-only H2-block contract enforced
**Dependencies:** Phases 51, 52, 53 complete; Phase 48 gap inventory available
**Shared write hotspots:** docs/index.md, common-issues.md, quick-refs — single-phase ownership; serialized with Phase 59

### Phase 58 - DEFER-08: 4-Platform Capability Comparison
**Rationale:** Integration phase last. Comparison doc accurate only after Linux capability matrix (Phase 50) and all ops-depth content (Phases 53-56) exist.
**Delivers:** docs/reference/4-platform-capability-comparison.md (6 domain axes; link-not-copy cells; 45-day last_verified cycle); retrofits to macOS/iOS/Android capability matrices; Linux capability matrix cross-reference added
**Pitfalls avoided:** DEFER-08 duplication (P7) — C12 validates link-not-copy structural integrity
**Dependencies:** Phases 49-56 all complete

### Phase 59 - Hub Navigation Integration (Linux + Operations Sections)
**Rationale:** Second navigation-last integration phase. Linux H2 and Operations H2 in docs/index.md authored after all content they link to exists. Serialized after Phase 57.
**Delivers:** docs/index.md Linux H2 section; docs/index.md Operations H2 section linking to docs/operations/; ops-doc cross-references back to admin-setup-*/; Linux sections in quick-refs
**Pitfalls avoided:** Nav backport regression — append-only contract; serialized after Phase 57
**Dependencies:** Phases 50-58 complete; must follow Phase 57

### Phase 60 - Audit Harness v1.5 Finalization
**Rationale:** Harness finalization after all content phases. Promotes informational-first checks. Runs broken-link sweep second pass.
**Delivers:** v1.5-milestone-audit.mjs finalized (C12 promoted to blocking; C13 promoted after triage cleared); v1.5-audit-allowlist.json seeded with known-legitimate occurrences (DDM deprecated-command prose, Ubuntu 20.04 EOL callout, Android AMAPI migration callout); broken-link sweep second pass
**Pitfalls avoided:** Informational-first graduation (C6/C7/C9); ops-domain false positives (P13)

### Phase 61 - Gap Closure + Terminal Re-Audit
**Rationale:** Terminal re-audit pattern applied at every milestone close.
**Delivers:** Broken-link fixes; v1.5-MILESTONE-AUDIT.md; v1.5-milestone-audit.mjs exits 8/8+ PASS; REQUIREMENTS.md synced; PROJECT.md traceability closure
**Dependencies:** Phase 60 harness run complete
---

### Phase Ordering Rationale

- Tooling before content (Phase 48 first) prevents gap-closure tax at milestone close
- Foundation before content (Phase 49 before 50-52) mirrors Phase 34 Android foundation discipline
- Content before navigation (Phases 50-56 before 57-59) hub files only link to existing files
- Integration phases last (57, 58, 59) DEFER-07 and DEFER-08 require all content they reference
- Broken-link sweep bookends the milestone Phase 48 first pass + Phase 60/61 second pass
- DEFER-07 (Phase 57) must precede Phase 59 both touch docs/index.md serialized to prevent conflict
### Research Flags

**Phases needing deeper research or verification at plan time:**
- **Phase 54 (macOS/iOS DDM):** Verify exact Intune Settings Catalog path for Software Update Enforce Latest at plan time; confirm which MDM deferral restrictions remain functional
- **Phase 54 (Android Zebra LifeGuard):** Confirm Intune admin center path Device updates Android FOTA at plan time
- **Phase 56 (Tenant Migration):** MEDIUM confidence throughout; verify per-platform migration steps given absence of single authoritative Microsoft Learn guide
- **Phase 50 (Linux log paths):** LOW-MEDIUM confidence verify Linux intune-portal log path against live Ubuntu + Intune enrollment; journal is confirmed primary surface

**Phases with standard patterns (reduce or skip research-phase):**
- **Phase 48:** Procedure fully documented in v1.4.1 retrospective; no new research needed
- **Phase 49:** Pattern identical to Phase 34 Android foundation; PITFALL-7 framing established
- **Phases 51-52:** Runbook structure established; Linux content documented in STACK.md
- **Phase 53:** CB 2503 and all 7 workloads documented at HIGH confidence
- **Phase 57:** All Android content exists; structural integration with clear pattern precedent
---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Linux Intune client (deb package, distros, CA scope, compliance categories) | HIGH | Microsoft Learn updated 2026-04-08 and 2026-04-16; two independent source pages confirm each constraint |
| macOS/iOS DDM migration (deprecations, current enforcement path) | HIGH | Microsoft Learn + multiple community sources; aligns with Apple WWDC 2025 announcement |
| iOS unsupervised DDM retraction (supervised-only constraint removed iOS 17+) | HIGH | Microsoft Learn deprecated-mdm-policies-ios + software-updates-guide-ios-ipados; August 2025 |
| Android MEETS_STRONG_INTEGRITY enforcement timeline | HIGH | Official Microsoft TechCommunity support blog July 2025; enforcement dates confirmed |
| ConfigMgr CB 2503 co-management workloads | HIGH | Microsoft Learn co-management workloads page updated 2026-04-15 |
| Identity Broker v2.0.2+ re-enrollment behavior | HIGH | Microsoft Learn Linux deployment guide 2026-03-31 |
| Architecture decisions (file placement, Option C, Path A copy) | HIGH | Direct codebase inspection; no inference required |
| Pitfall prevention patterns | HIGH | Grounded in v1.0-v1.4.1 retrospectives and committed audit artifacts |
| Tenant-to-tenant migration specifics | MEDIUM | No single authoritative Microsoft Learn guide; community sources + Q&A |
| Linux log paths (intune-portal on Ubuntu) | LOW-MEDIUM | Microsoft Learn does not document a dedicated log path; journal is confirmed; file path needs live-environment verification |
| markdown-link-check npm | MEDIUM | npm registry health confirmed; no Context7 ID; no version pinned |
| macOS Installomator/Intuneomator adjacency | MEDIUM | Community practice; not Microsoft-documented; appropriate for a callout only |

**Overall confidence:** HIGH for breaking changes and architecture; MEDIUM for tenant migration; LOW-MEDIUM for Linux log paths

### Gaps to Address

- **Linux intune-portal log path:** Microsoft Learn does not document a dedicated log path for intune-portal on Ubuntu. L2 runbook 24 must use journalctl as the confirmed primary surface and include a freshness caveat on any file-based path claims. STACK.md explicitly flags this gap.
- **Linux deb package version pinning:** Microsoft Learn does not pin a specific intune-portal version. Executor should run apt info intune-portal on a current Ubuntu 22.04/24.04 install at plan time.
- **iOS DDM v1.3 retrofit scope:** The unsupervised DDM retraction requires a targeted callout update in the existing v1.3 iOS compliance guide. Roadmapper must assign this as an explicit task in Phase 54.
- **Linux BYOD/corporate-owned enrollment inconsistency:** Microsoft Learn enrollment guide says corporate-owned only; platform guide also mentions BYOD/personal. Linux taxonomy overview (Phase 49) should surface this as a known documentation inconsistency.
---

## Sources

### Primary (HIGH confidence)
- https://learn.microsoft.com/en-us/intune/intune-service/user-help/microsoft-intune-app-linux (updated 2026-04-08)
- https://learn.microsoft.com/en-us/intune/fundamentals/platform-guide-linux (updated 2026-04-16)
- https://learn.microsoft.com/en-us/intune/user-help/enrollment/enroll-linux (updated 2026-04-08)
- https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-linux-settings (updated 2026-04-16)
- https://learn.microsoft.com/en-us/intune/configmgr/comanage/workloads (updated 2026-04-15)
- https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-macos
- https://learn.microsoft.com/en-us/intune/device-updates/apple/deprecated-mdm-policies-ios
- https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-guide-ios-ipados
- https://techcommunity.microsoft.com/blog/intunecustomersuccess/support-tip-changes-to-google-play-strong-integrity-for-android-13-or-above/4435130
- https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports
- https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool/releases
- Direct codebase inspection: PROJECT.md, STATE.md, RETROSPECTIVE.md, v1.4.1-milestone-audit.mjs, docs/ directory enumeration

### Secondary (MEDIUM confidence)
- https://macadifference.net/2025/04/08/intune-macos-enforcing-software-updates.html
- https://intuneirl.com/macos-ios-26-for-enterprise-ddm-deployment-and-the-intel-mac-sunset/
- https://learn.microsoft.com/en-us/answers/questions/2149662/tenant-to-tenant-migration-with-intune-devices
- https://github.com/tcort/markdown-link-check
- 4sysops.com Intune March 2026 release notes (hotpatch default May 2026)

### Tertiary (LOW-MEDIUM confidence)
- Community diagnostic commands for Linux intune-portal journalctl and systemctl service unit names not documented in Microsoft Learn
- /var/log/microsoft/intune/ file-based log path for Linux proposed based on RHEL+MDE pattern; requires live-environment verification

---
*Research completed: 2026-04-26*
*Ready for roadmap: yes*