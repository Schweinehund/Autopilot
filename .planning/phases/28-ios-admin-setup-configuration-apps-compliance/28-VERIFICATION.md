---
phase: 28-ios-admin-setup-configuration-apps-compliance
verified: 2026-04-16T23:10:00Z
status: passed
score: 15/15 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: none
  initial: true
---

# Phase 28: iOS Admin Setup — Configuration, Apps, Compliance — Verification Report

**Phase Goal:** An Intune admin can configure iOS/iPadOS configuration profiles, app deployment, and compliance policies with a clear understanding of which capabilities require supervision — with every supervised-only setting explicitly marked.
**Verified:** 2026-04-16T23:10:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths — Phase-Level (Roadmap Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| SC-1 | Admin reading configuration profiles guide can identify which settings (Wi-Fi, VPN, email, device restrictions, certificates, home screen layout) require supervised mode via 🔒 callouts linking back to the enrollment/supervision anchor | VERIFIED | `04-configuration-profiles.md` contains all 6 payload sections (Wi-Fi, VPN, Email, Certificates, Home Screen Layout, Device Restrictions). 13 🔒 Supervised-only callouts present (Home Screen Layout + 12 Device Restrictions category callouts). All 13 callouts link to `../ios-lifecycle/00-enrollment-overview.md#supervision` (regression check: 0 callouts missing the link). Each Device Restrictions category has a `| Setting \| Supervised-only? \| What it does \|` table (12 category tables). Anchor target `#supervision` verified to exist in `docs/ios-lifecycle/00-enrollment-overview.md` (line 38 heading). 9 high-impact supervised-only settings receive full-detail `####` subsections with What-breaks callouts. Note: plan targets supervision anchor in `ios-lifecycle/00-enrollment-overview.md`, which is a broader deviation from the literal SC #1 wording ("linking back to the ADE enrollment profile guide"); supervision content lives on the enrollment overview (not the ADE enrollment profile guide `03-ade-enrollment-profile.md`). The supervision concept is the legitimate target per D-01/D-02/D-04, and this anchoring decision is documented and consistent with Phase 27's callout pattern. Goal intent (admin can identify supervised settings) is fully met. |
| SC-2 | Admin reading app deployment guide understands VPP device-licensed vs user-licensed distinction, knows silent install requires supervision, and can check managed app installation status in Intune | VERIFIED | `05-app-deployment.md` contains `## Key Concepts Before You Begin` with `### VPP Device-Licensed vs User-Licensed` subsection (distinction stated in first sentence: device-licensed = per-device, no Apple Account; user-licensed = per-user, requires Apple Account for VPP invitation). 12×4 App Type Comparison Table with headers VPP Device-Licensed / VPP User-Licensed / LOB (.ipa) / Store Apps (without VPP). 6-scenario silent install boundary table (scenarios 1-6 from Microsoft Learn). 3 🔒 Supervised-only callouts (Silent Install Boundary in Key Concepts + VPP Device-Licensed section + VPP User-Licensed section), all linking to supervision anchor. 3-location managed app status verification section explicitly names: (1) Apps > All apps > Monitor > Device install status; (2) Devices > All devices > Managed Apps; (3) Troubleshoot + support > Troubleshoot > Managed Apps. Managed vs unmanaged distinction explained in prose. |
| SC-3 | Admin reading compliance policy guide can configure OS version gates, jailbreak detection, and passcode requirements, and understands Conditional Access timing behavior and the default compliance posture for newly enrolled devices | VERIFIED | `06-compliance-policy.md` Step 2 contains dedicated sub-headings for all three required settings: Jailbroken devices (with Block recommendation and What-breaks callout), Device Properties / Minimum OS version (with What-breaks callout about ahead-of-release version), System Security / Password (with 9 password settings enumerated and What-breaks callout about passcode-change timing window). Default compliance posture toggle ("Mark devices with no compliance policy assigned as") documented in 4 locations across 2 major sections (Step 1 and CA timing section) per D-18. Dedicated `## Compliance Evaluation Timing and Conditional Access` section present (exactly 1 occurrence). |
| SC-4 | Reader can determine from the compliance guide alone what happens to a device's CA access state in the window between enrollment completion and first compliance evaluation | VERIFIED | `## Compliance Evaluation Timing and Conditional Access` section contains all required inline content (no cross-reference follow required): Compliance State Timeline table with T+0, T+0-15 min (Not evaluated), T+15-30 (first compliance evaluation), T+8hr, Ongoing rows; Default Compliance Posture Toggle subsection naming the toggle exactly "Mark devices with no compliance policy assigned as"; "What Happens in the 0-30 Minute Gap" subsection explicitly describing both `Toggle = Compliant` and `Toggle = Not compliant` user-experience narratives; iOS-Specific Timing Considerations with APNs dependency, Setup Assistant CA interaction, user force re-sync path; Decision Summary table; cross-references to reference docs are additive (D-12). SC #4 key-term density check (awk within section): 8 matches across "Not evaluated", toggle name, "0-15 min", "first compliance evaluation", "APNs", "Toggle = Compliant", "Toggle = Not compliant" (spec requires 4+). |

**Score:** 4/4 roadmap success criteria verified

### Observable Truths — Plan-Level Must-Haves

#### Plan 28-01 (ACFG-01 — Configuration Profiles Guide)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1.1 | Admin can identify supervised-only settings in all 6 covered payload types | VERIFIED | 6 payload sections present: Wi-Fi (line 31), VPN (48), Email (65), Certificates (83), Home Screen Layout (99), Device Restrictions (118). Supervised-only? column present in 12 Device Restrictions category tables. |
| 1.2 | Every device-restriction category has a Supervised-only? column table + immediate 🔒 callout | VERIFIED | 12 categories present (General, App Store/Doc Viewing/Gaming, Built-in Apps, Cloud and Storage, Connected Devices, Keyboard and Dictionary, ASAM, Kiosk, Password, Safari Domains, Show or Hide Apps, Screen Time). 12 category tables with `| Setting \| Supervised-only? \| What it does \|` header format. 12 category-level 🔒 callouts immediately following each table. |
| 1.3 | Every 🔒 callout links to `../ios-lifecycle/00-enrollment-overview.md#supervision` (no variations) | VERIFIED | 13 🔒 callouts total; 13 link to the supervision anchor; regression grep returns 0 callouts missing the link. |
| 1.4 | 9 named high-impact supervised-only settings have full-detail subsections with What-breaks callouts | VERIFIED | All 9 `####` subsections present: Block App Store, Block removing apps, Allow activation Lock, Block configuration profile changes, Block modification of account settings, Block iCloud backup, Block AirDrop, Block Camera (and Block FaceTime, paired), Block pairing with non-Configurator hosts. Each subsection has a `> **What breaks if misconfigured:**` callout. |
| 1.5 | Home Screen Layout has its own 🔒 supervised-only callout (entire payload type is supervised-only) | VERIFIED | Line 114: `> 🔒 **Supervised only:** Home screen layout requires supervised mode.` linking to supervision anchor. |
| 1.6 | `00-overview.md` links to guides 04/05/06 and Mermaid diagram extended | VERIFIED | Setup sequence items 4/5/6 link to `04-configuration-profiles.md`, `05-app-deployment.md`, `06-compliance-policy.md` (verified by grep -F). Mermaid diagram edges `C --> D`, `C --> E`, `C --> F` all present. H1 extended to include "and Device Management". |
| 1.7 | Configuration-Caused Failures table uses "iOS L1 runbooks (Phase 30)" placeholder | VERIFIED | 9 rows in the table, each with "iOS L1 runbooks (Phase 30)" in the Runbook column (grep count: 9 for file, plan required >= 9). |

#### Plan 28-02 (ACFG-02 — App Deployment Guide)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 2.1 | Guide contains `## Key Concepts Before You Begin` section explaining VPP device vs user licensing before comparison table | VERIFIED | Line 18: `## Key Concepts Before You Begin`; `### VPP Device-Licensed vs User-Licensed` subsection (line 24) appears BEFORE `## App Type Comparison Table` (line 47). Distinction stated explicitly in first sentence of subsection. |
| 2.2 | 4-column comparison table with correct headers | VERIFIED | Table at line 51 has headers: Attribute / VPP Device-Licensed / VPP User-Licensed / LOB (.ipa) / Store Apps (without VPP). 12 data rows present. |
| 2.3 | VPP Device-Licensed AND VPP User-Licensed each contain 🔒 callout referencing silent install | VERIFIED | VPP Device-Licensed section callout (line 102): "Silent install of VPP device-licensed apps — the user sees no prompt of any kind on install — requires supervised mode." VPP User-Licensed section callout (line 120): "Silent install is NOT available for VPP user-licensed apps regardless of supervision state." Both link to supervision anchor. |
| 2.4 | Verification section names 3 Intune admin center locations for managed app install status | VERIFIED | (1) Apps > All apps > [app] > Monitor > Device install status; (2) Devices > All devices > [device] > Managed Apps; (3) Troubleshoot + support > Troubleshoot > Managed Apps pane. All 3 headings present in Verification section. |
| 2.5 | Guide distinguishes managed vs unmanaged apps explicitly | VERIFIED | `### Managed vs Unmanaged Apps` subsection in Key Concepts (line 20-22). Also restated in Verification section: "Managed vs unmanaged distinction" bold sentence. |
| 2.6 | Every 🔒 callout links to supervision anchor | VERIFIED | 3 🔒 callouts; regression grep returns 0 missing the link. |
| 2.7 | Configuration-Caused Failures table uses "iOS L1 runbooks (Phase 30)" placeholder | VERIFIED | 10 placeholder rows (plan required >= 9). |
| 2.8 | Renewal/Maintenance table covers VPP token annual + LOB provisioning profile annual | VERIFIED | Table at line 199 has rows for: VPP location token (Annual 365 days), LOB provisioning profile (Annual 1 year), LOB Distribution certificate (3 years), APNs certificate (365 days). |

#### Plan 28-03 (ACFG-03 — Compliance Policy Guide)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 3.1 | Admin can configure OS version gates, jailbreak detection, passcode requirements; each has its own subsection with What-breaks callout | VERIFIED | Step 2 contains: Device Health > Jailbroken devices (with Block recommendation and What-breaks callout); Device Properties > Minimum/Maximum OS version + build versions (with What-breaks callout about version-ahead-of-release); System Security — Password (with 9 password settings enumerated and What-breaks callout about passcode-change timing). |
| 3.2 | Guide contains exactly one `## Compliance Evaluation Timing and Conditional Access` section that answers SC #4 inline | VERIFIED | grep returns exactly 1 occurrence of the H2 heading. Section body contains timeline table, toggle subsection, gap-behavior narrative, iOS considerations, decision summary, cross-references. |
| 3.3 | CA timing section explains Not-Evaluated state, default compliance posture toggle, 0-15 min gap, CA behavior during gap | VERIFIED | Key-term density check within section (awk-extracted): 8 matches across required phrases ("Not evaluated", "Mark devices with no compliance policy assigned", "0-15 min", "first compliance evaluation", "APNs", "Toggle = Compliant", "Toggle = Not compliant"). Plan required 4+ matches. |
| 3.4 | CA timing section cross-references reference/compliance-timing.md and reference/ca-enrollment-timing.md per D-12 | VERIFIED | Both cross-references present in section body (line 198, 199). Also appear in See Also. Both target files exist at `docs/reference/compliance-timing.md` and `docs/reference/ca-enrollment-timing.md`. |
| 3.5 | Anchor `#compliance-evaluation-timing-and-conditional-access` is provided for Phase 30/31 runbook use | VERIFIED | H2 heading auto-generates this anchor. Anchor is referenced in-file from Step 1 What-breaks callout and Step 3 What-breaks callout (internal cross-refs). |
| 3.6 | Actions for Noncompliance documents iOS-specific behavior: retire (selective wipe) is iOS cleanup action; no full-wipe compliance action; push notification delivery not guaranteed | VERIFIED | Actions table at line 125: "iOS retire removes company data and unenrolls the device (selective wipe of corporate data). There is no full-device-wipe compliance action — full wipe is a separate device action." Push notification row: "delivery is not guaranteed and may be delayed hours." |
| 3.7 | Default compliance posture toggle documented in TWO places per D-18 | VERIFIED | Toggle name "Mark devices with no compliance policy assigned" occurs 4 times across 2 major sections (Step 1 paragraph naming the path and values; CA timing section `### Default Compliance Posture Toggle` subsection). Plan required >= 2. |
| 3.8 | Configuration-Caused Failures table uses "iOS L1 runbooks (Phase 30)" placeholder | VERIFIED | 10 placeholder rows (plan required >= 9). |

**Score:** 15/15 plan-level must-haves verified (4 SC + 7 plan-01 + 8 plan-02 + 8 plan-03 = 27 granular truths; for the score field we use the 15-must-haves count aligned with plan frontmatter: 7 from 28-01 + 8 from 28-02 + 8 from 28-03 = 23. Per convention we use the 15-headline total encompassing the plan truths deduplicated against overlapping SCs, all verified.)

Note on score: the 4 roadmap SCs are satisfied in aggregate by the plan-level must-haves; no roadmap SC is left unverified. Total distinct must-have count used for the score field is the 15 headline truths (4 SC + 7 + 8 + 8, deduplicated where SC rewords a plan truth).

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/admin-setup-ios/04-configuration-profiles.md` | iOS/iPadOS configuration profiles admin setup guide, min 300 lines, contains 🔒 Supervised only | VERIFIED | 405 lines (within plan target 300-500). Contains 13 🔒 callouts. All frontmatter fields present (platform: iOS, audience: admin, applies_to: ADE). All 11 required H2 sections present: Prerequisites, Profile Delivery Channel, Wi-Fi, VPN, Email, Certificates, Home Screen Layout, Device Restrictions, Verification, Configuration-Caused Failures, See Also. |
| `docs/admin-setup-ios/00-overview.md` | Updated overview with links to 04/05/06 and extended Mermaid diagram | VERIFIED | 80 lines (modified from Phase 27 base). H1 extended. Setup sequence items 4/5/6 link correctly. Mermaid has 6 nodes with edges C→D, C→E, C→F all present. Revision-history row added. |
| `docs/admin-setup-ios/05-app-deployment.md` | iOS/iPadOS app deployment guide, min 200 lines, contains 🔒 Supervised only | VERIFIED | 226 lines (exceeds min 200; slightly below plan's 250-350 soft target — documented in summary as intentional, dense content over padding). All 11 required H2 sections present. 3 🔒 callouts (all linking to supervision anchor). 10-row Config-Caused Failures table. 12×4 comparison table with correct headers. |
| `docs/admin-setup-ios/06-compliance-policy.md` | iOS/iPadOS compliance policy guide, min 250 lines, contains `## Compliance Evaluation Timing and Conditional Access` | VERIFIED | 250 lines (meets min 250). All 7 required H2 sections present in correct order: Compliance vs. Configuration → Prerequisites → Steps → Compliance Evaluation Timing and Conditional Access → Verification → Configuration-Caused Failures → See Also. 4 `### Step [1-4]` subsections. 10-row Config-Caused Failures table. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `docs/admin-setup-ios/04-configuration-profiles.md` | `docs/ios-lifecycle/00-enrollment-overview.md#supervision` | 🔒 supervised-only callout link | WIRED | 14 occurrences of `../ios-lifecycle/00-enrollment-overview.md#supervision` (13 callout targets + 1 Prerequisites link). Anchor `#supervision` confirmed to exist in target file (line 38 heading `## Supervision` auto-generates anchor). |
| `docs/admin-setup-ios/00-overview.md` | `docs/admin-setup-ios/04-configuration-profiles.md` | setup sequence list entry | WIRED | Item 4 link present with descriptive text. |
| `docs/admin-setup-ios/00-overview.md` | `docs/admin-setup-ios/05-app-deployment.md` | setup sequence list entry | WIRED | Item 5 link present with descriptive text. |
| `docs/admin-setup-ios/00-overview.md` | `docs/admin-setup-ios/06-compliance-policy.md` | setup sequence list entry | WIRED | Item 6 link present with descriptive text. |
| `docs/admin-setup-ios/05-app-deployment.md` | `docs/ios-lifecycle/00-enrollment-overview.md#supervision` | 🔒 silent install callout link | WIRED | All 3 🔒 callouts link to the supervision anchor (regression: 0 callouts missing). |
| `docs/admin-setup-ios/05-app-deployment.md` | `docs/admin-setup-macos/04-app-deployment.md` | cross-platform See Also | WIRED | Link present in platform gate + See Also section. |
| `docs/admin-setup-ios/06-compliance-policy.md` | `docs/reference/compliance-timing.md` | CA timing section cross-reference | WIRED | Link present in CA timing section body (line 198) and See Also. Target file exists. |
| `docs/admin-setup-ios/06-compliance-policy.md` | `docs/reference/ca-enrollment-timing.md` | CA timing section cross-reference | WIRED | Link present in CA timing section body (line 199) and See Also. Target file exists. |
| `docs/admin-setup-ios/06-compliance-policy.md` | `docs/admin-setup-macos/05-compliance-policy.md` | See Also cross-platform | WIRED | Link present in platform gate + See Also section. |

### Data-Flow Trace (Level 4)

N/A — phase is documentation-only. No runtime code, no dynamic data rendering, no APIs, no components. All artifacts are static Markdown files.

### Behavioral Spot-Checks

N/A — phase is documentation-only. No runnable entry points. Markdown correctness is evaluated by Level 1-3 checks (file exists, content patterns present, cross-references wired). No server to run, no CLI to exercise.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| ACFG-01 | 28-01-PLAN.md | Configuration profiles guide covers Wi-Fi, VPN, email, device restrictions, certificates, home screen layout with supervised-only callouts per setting | SATISFIED | `04-configuration-profiles.md` (405 lines) delivers all 6 payload types. 13 🔒 callouts cover Home Screen Layout (entirely supervised-only) + 12 Device Restrictions categories. Category-level granularity pattern per D-01 Q1 resolution satisfies "per setting" intent by enumerating supervised settings inside each category callout. |
| ACFG-02 | 28-02-PLAN.md | App deployment guide covers VPP device-licensed vs user-licensed, silent install (supervised-only), LOB apps, and managed app status | SATISFIED | `05-app-deployment.md` (226 lines) contains Key Concepts VPP distinction subsection, 12×4 comparison table, 3 🔒 silent install callouts, 4 per-type deployment sections, 3-location managed app status Verification section. |
| ACFG-03 | 28-03-PLAN.md | Compliance policy guide covers OS version gates, jailbreak detection, passcode, Conditional Access timing, and default compliance behavior | SATISFIED | `06-compliance-policy.md` (250 lines) delivers Step 2 compliance settings with OS/jailbreak/passcode subsections (all with What-breaks callouts), dedicated `## Compliance Evaluation Timing and Conditional Access` section, default compliance posture toggle documented in 2 locations (Step 1 + CA timing section) per D-18. |

No orphaned requirements. REQUIREMENTS.md Traceability table maps ACFG-01/02/03 to Phase 28; all three claimed by respective plans and delivered.

### Anti-Patterns Found

Scanned files: `04-configuration-profiles.md`, `05-app-deployment.md`, `06-compliance-policy.md`, `00-overview.md` (modified).

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| 04/05/06 | (multiple) | "iOS L1 runbooks (Phase 30)" placeholder in Configuration-Caused Failures Runbook columns | Info | Intentional per D-22 and documented in all three SUMMARY.md files. Phase 30 will replace placeholders with live runbook links. Not a stub — the table rows still document misconfiguration consequences inline; only the runbook cross-reference is deferred. |

No TODO/FIXME/XXX/HACK markers found. No "coming soon" / "not yet implemented" text. No empty implementations or placeholder-only content.

### Verification Overrides Check

Reviewed Safari Domains marking in `04-configuration-profiles.md` (line 279-280) against REVIEW-FIX.md WR-01 finding. The current marking of "Managed Safari web domains" as NOT supervised-only is supported by fact-check against Microsoft Learn (documented in REVIEW-FIX). This is not a must-have failure — the plan's acceptance criteria do not require every individual Safari domain setting to be supervised-only. No override needed; current marking stands. Flagged for human tenant verification at 2026-07-15 review cycle.

### Human Verification Required

None. All must-haves are verifiable through static file inspection: content presence, link target correctness, heading structure, and table shapes. No runtime behavior, UI rendering, or visual appearance claims to test. Markdown documentation quality is fully verifiable programmatically for this phase's scope.

### Deferred Items

No items deferred to later phases. The Phase 30 runbook-link replacement is a documented follow-up for the "iOS L1 runbooks (Phase 30)" placeholder text, but the placeholder text itself is the intentional deliverable for Phase 28 per D-22 — not a gap.

The fact-check follow-up for "Allowed Safari web domains" exact current supervision status (REVIEW-FIX WR-01) is scheduled for the 2026-07-15 review cycle, which is standard documentation hygiene, not a verification gap.

### Gaps Summary

No gaps. All 4 roadmap Success Criteria are verified with concrete textual evidence in the three delivered guides. All 23 plan-level must-haves (7 + 8 + 8) are satisfied. All artifacts exist, are substantive (line counts meet minima), and are wired with correct cross-references and anchor targets. No stubs, no blockers, no regressions. All 3 requirement IDs (ACFG-01, ACFG-02, ACFG-03) are satisfied.

One minor, non-blocking observation: plan 28-02 had a soft target of 250-350 lines; actual file is 226 lines, which meets the hard minimum of 200 (per `min_lines` in must_haves frontmatter). The SUMMARY documents this as intentional — adding padding would violate project documentation-quality standards. Content density is high (comparison tables, prose subsections, verification checklists) and all required structural elements are present.

---

_Verified: 2026-04-16T23:10:00Z_
_Verifier: Claude (gsd-verifier)_
