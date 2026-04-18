# Phase 32: Navigation Integration & References - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 32 is the capstone navigation-integration phase for v1.3 iOS/iPadOS content. It delivers four injected additive artifacts across already-shipped shared navigation files plus one new reference file:

1. **iOS glossary additions** into existing `docs/_glossary-macos.md` — 6 new terms from SC #1 (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection) plus 1 updated entry (VPP) — placed within existing H2 sections except MAM-WE (new H2 per Phase 26 D-03 separation) (NAV-01, SC #1)
2. **`docs/common-issues.md` iOS routing section** — new `## iOS/iPadOS Failure Scenarios` H2 with 6 symptom-named categories (mirroring macOS section's symptom-naming style, not cause-naming) routing to L1 runbooks 16-21, plus single MAM-WE entry routing to `admin-setup-ios/09-mam-app-protection.md` with ADDTS-01 advisory, plus platform selector update, plus cross-reference banners in 3 shared Windows symptom sections (NAV-02, SC #2)
3. **`docs/index.md` iOS section** — new `## iOS/iPadOS Provisioning` H2 after `## macOS Provisioning` (after line 127) with L1/L2/Admin Setup subsections mirroring macOS section's structure, plus iOS Capability Matrix entry in Cross-Platform References (NAV-02, SC #2)
4. **`docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` iOS sections** — appended `## iOS/iPadOS Quick Reference` H2 blocks mirroring macOS section structure with iOS-appropriate content substitutions (no CLI; tiered diagnostic methods; per-device-type sysdiagnose triggers) (NAV-02, SC #2)
5. **NEW FILE `docs/reference/ios-capability-matrix.md`** — trilateral capability matrix (Windows | macOS | iOS, 3 columns) with 5 domains mirroring `macos-capability-matrix.md` domain structure (Enrollment, Configuration, App Deployment, Compliance, Software Updates), plus Apple-parity framing emphasis in opening narrative, plus Key Gaps Summary (NAV-03, SC #3)
6. **Reachability audit** verifying every Phase 26-31 iOS file is reachable within 2 clicks from `docs/index.md` (~25 iOS files including this phase's new matrix and updated glossary) (SC #4)
7. **Placeholder resolution** for the one known Phase 32 forward-reference in `docs/decision-trees/07-ios-triage.md:99` ("iOS glossary additions in Phase 32 NAV-01") plus any additional Phase 32 placeholders discovered at plan time via grep

Phase 32 establishes the **Apple-parity trilateral matrix pattern** for the new capability matrix and reuses all other shipped Phase 25 macOS navigation-integration patterns verbatim (hybrid common-issues approach, append-to-bottom quick-ref structure, section-level platform separation, bidirectional cross-ref banners). No new runbooks; no new lifecycle docs; no restructuring of existing shared files beyond additive injection.

**Decision method:** 4 Gray Areas × 3-4 candidate options each (14 candidates total) → adversarial review (Finder/Adversary/Referee pattern) executed 2026-04-17. Finder surfaced 68 flaws (7 Critical / 39 Medium / 22 Low = 287 total); Adversary attempted 2 disproves on F-A3-03 and F-C1-04; Referee confirmed both disproves as FALSE POSITIVE and ruled 66 flaws REAL. Full flaw trail in `32-DISCUSSION-LOG.md`. Full candidate analysis in `32-CANDIDATES.md`.

</domain>

<decisions>
## Implementation Decisions

### iOS Capability Matrix (NAV-03, SC #3)

- **D-01: New standalone file at `docs/reference/ios-capability-matrix.md`** satisfying SC #3 literal ("The iOS capability matrix (`reference/ios-capability-matrix.md`)"). Filename is LOCKED by ROADMAP.md Phase 32 SC #3 — cannot rename, cannot merge into existing macos-capability-matrix.md (referee disqualified A3 and A4 on SC #3/#4 violations).

- **D-02: Trilateral structure** — three columns `| Feature | Windows | macOS | iOS |` matching SC #3 literal "across iOS, macOS, and Windows". The referee's lowest-score ruling named A4 (bilateral iOS|macOS) as structural winner but required SC #3 mitigation ("add Windows column") which when applied produces A1 trilateral structure. Adopting A1 structural winner (lowest-flaw A2 was runner-up at 21 points; A1 is 27 points with most flaws being description-level not structural).

- **D-03: Five domains mirroring macOS matrix** — Enrollment, Configuration, App Deployment, Compliance, Software Updates. Reject 6th "Supervision & Enrollment Model" domain (A2) — referee F-A2-03 confirmed existing Enrollment domain's "Enrollment types" row (macos-capability-matrix.md:19) accommodates supervision state without requiring a new domain. Reject DDM-row-in-6th-domain proposal — DDM is already in Configuration domain (macos-capability-matrix.md:40).

- **D-04: Supervision axis treatment** — Within Enrollment domain, add dedicated rows for: "Supervision state" (Windows: N/A | macOS: Supervised via ADE | iOS: Supervised (ADE) / Unsupervised (Device Enrollment, User Enrollment)), "Supervised-only capability gates" (Windows: N/A | macOS: Limited | iOS: Extensive — silent install, home screen layout, restrictions, DDM). Configuration/Apps/Compliance domains use inline "🔒 supervised-only" parenthetical where capability depends on supervision state (e.g., "Silent app install: Windows Yes | macOS Yes | iOS Yes (🔒 supervised ADE only)").

- **D-05: iOS-specific row selections** — add rows the existing macOS matrix does not have:
  - Enrollment: Account-driven User Enrollment (Apple-only privacy-preserving BYOD); MAM-WE availability (app-layer, no device enrollment); ABM token shared with macOS
  - Configuration: DDM availability per platform; Home Screen Layout (iOS-only); Device Restrictions scope; Wi-Fi supervised-only for auto-join; iOS-only restrictions (AirDrop, Camera, etc.)
  - App Deployment: VPP device-licensed vs user-licensed; LOB/IPA apps; silent install (🔒 supervised ADE); managed app status scope
  - Compliance: Jailbreak detection (iOS-only); OS version gate; passcode policy; default compliance posture behavior
  - Software Updates: Managed Software Update via DDM (iOS 17+ enforced path); deferral via Restrictions (legacy)

- **D-06: Apple-parity framing as opening narrative** — capture the A4 winner's intuition (Apple-to-Apple parity is the most useful framing for iOS/macOS readers) as an opening preamble paragraph above the domain tables: "This matrix compares Intune management capabilities across three platforms. Apple-platform readers will find the iOS↔macOS comparison surfaces the most meaningful differences (e.g., DDM maturity, supervision model, VPP licensing). Windows readers should treat iOS and macOS as structurally distinct from Windows despite being managed via the same Intune tenant."

- **D-07: Key Gaps Summary section at bottom** — enumerates the most significant iOS capability gaps relative to Windows and macOS (7-10 numbered gaps similar to macos-capability-matrix.md:79-88). Example gaps: No CLI diagnostic access (vs Windows mdmdiagnosticstool.exe + macOS Terminal); Supervision gates significant capability subset; No hybrid domain join; No Conditional Access device-path equivalent to Autopilot registration; No registry/plist-equivalent admin inspection.

- **D-08: File navigation wiring** — inject into existing shared files (additive, preserving pre-existing links per SC #4 literal):
  - `docs/index.md` Cross-Platform References (line ~144) — add entry `| [iOS Capability Matrix](reference/ios-capability-matrix.md) | Intune feature parity comparison across Windows, macOS, and iOS (NAV-03) |`
  - `docs/reference/00-index.md` — add new "iOS References" H2 (mirroring "macOS References" H2 at line 19) with entry for the iOS capability matrix

- **D-09: Frontmatter** — `platform: all` (not `platform: iOS`) because the matrix's primary purpose is cross-platform comparison (not iOS-only content). `audience: admin`, `applies_to: both`, `last_verified: YYYY-MM-DD`, `review_by: last_verified + 90d`. Mirrors macos-capability-matrix.md frontmatter.

- **D-10: Length target** — ~100-130 lines, similar to macos-capability-matrix.md (101 lines). Tables only; no dense prose sections.

### Glossary Extension (NAV-01, SC #1)

- **D-11: Extend existing `docs/_glossary-macos.md` (no rename)** per Phase 26 CONTEXT canonical refs line 70 ("iOS terms will be added here per Phase 32 NAV-01"). Rename to `_glossary-apple.md` (B3) disqualified on SC #4 violation (breaks 76 references across 29 files) and Phase 26 locked-decision conflict.

- **D-12: Exact 6-term scope per SC #1 literal** — no scope creep beyond "supervision, MAM-WE, APNs, account-driven user enrollment, VPP, jailbreak detection". Referee F-B4-01 ruled extended-term B4 scope creep out-of-bounds (SC #1 lists exactly 6; 5 are net-new, 1 is VPP update).

- **D-13: Placement into existing H2 sections + one new H2 for MAM-WE**:
  - **Enrollment H2** (existing, line 20): add `### Supervision` (new) with anchor `#supervision`; add `### Account-Driven User Enrollment` (new) with anchor `#account-driven-user-enrollment`
  - **Device Management H2** (existing, line 42): add `### APNs` (new) with anchor `#apns`; add `### Jailbreak Detection` (new) with anchor `#jailbreak-detection`
  - **App Distribution H2** (existing, line 58): UPDATE existing VPP entry (line 60) with iOS-specific sub-content — device-licensed vs user-licensed distinction; supervised-only silent install callout; cross-link to `admin-setup-ios/05-app-deployment.md` and `admin-setup-macos/04-app-deployment.md`
  - **New H2 "App Protection (MAM)"** (NEW — inserted after App Distribution, before Version History): add `### MAM-WE (Managed App Without Enrollment)` with anchor `#mam-we`. Justification: Phase 26 D-03 explicitly separates MAM-WE from MDM enrollment paths ("app-layer model with no device enrollment, separate from MDM paths") — placing under Enrollment (B1 original proposal) directly contradicts locked Phase 26 decision (referee F-B1-04 confirmed).

- **D-14: Alphabetical Index update** — line 16's inline index expanded to include new terms: `[ABM](...) | [ABM Token](...) | [Account-Driven User Enrollment](#account-driven-user-enrollment) | [ADE](...) | [APNs](#apns) | [Await Configuration](...) | [Jailbreak Detection](#jailbreak-detection) | [MAM-WE](#mam-we) | [Setup Assistant](...) | [Supervision](#supervision) | [VPP](#vpp)`. Alphabetical order preserved. Index grows from 6 to 11 terms.

- **D-15: Per-term Windows/platform-equivalent callout** — Each new iOS term ends with a `> **Windows equivalent:** ...` blockquote matching existing glossary pattern (macos-capability-matrix.md:26, 32, 38, 48, 54, 64 all use this pattern). For iOS-specific terms with no Windows equivalent (e.g., MAM-WE), say so explicitly: `> **Windows equivalent:** Intune App Protection Policies on Windows MAM-enrolled devices — functionally analogous but iOS VPN-free (no "MAM-WE" branding on Windows).` For supervision: compare to macOS FileVault enforcement + Windows AutoPilot pre-provisioning as the closest parallels.

- **D-16: Cross-platform scope flag** — For each new term, the opening sentence states platform scope (e.g., "APNs — Apple's push notification service used by all Apple platforms (iOS, iPadOS, macOS, tvOS) for MDM command delivery..."). This addresses referee F-B1 (platform-origin not visually flagged) without requiring a new frontmatter field — it's just prose discipline.

- **D-17: Frontmatter** — keep `platform: all` (already set, line 6). Bump `last_verified` to Phase 32 ship date; `review_by` bumps to +90 days. Platform coverage blockquote (line 9) updated to reflect that iOS/iPadOS terminology is now included.

- **D-18: Existing terms not touched except VPP** — ADE (line 22) already mentions iOS parenthetically ("organization-owned macOS (and iOS/iPadOS) devices") and does NOT require modification. Await Configuration, Setup Assistant, ABM, ABM Token entries stay unchanged.

- **D-19: Do NOT add Managed Apple ID, DDM, ACME, DEP, Company Portal terms** — all excluded per referee F-B4 rulings (scope creep, duplication with matrix, cross-platform miscategorization, Apple-deprecated terminology). If a future phase needs these, add them separately.

### NAV-02 Routing (`common-issues.md` + `index.md`)

- **D-20: Adopt Phase 25 macOS section structure verbatim** for both `common-issues.md` and `index.md` iOS sections (C1 winner, 7 confirmed flaws — all non-critical). Referee: "reuse shipped Phase 25 D-01/D-02 hybrid macOS precedent without structural deviation." Path-segmented (C2) disqualified on Phase 25 D-14 section-level-separation violation.

- **D-21: `common-issues.md` iOS section structure** — add after line 201 (current end of macOS section):
  ```
  ## iOS/iPadOS Failure Scenarios

  > **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).
  > **macOS:** For macOS ADE troubleshooting, see [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios).

  **Platform:** iOS/iPadOS through Microsoft Intune

  Symptom-based index routing to the appropriate iOS L1 and L2 runbooks. Start with the [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) to identify the failure scenario.

  ### [Six symptom categories — see D-22 for exact naming]

  ### App Protection Policies Not Applying (MAM-WE)
  > **Advisory:** MAM-WE-specific L1/L2 runbooks are deferred to ADDTS-01 future milestone. For the configuration guide, see [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md).
  ```

- **D-22: Six iOS symptom categories** — use **symptom-descriptive names** (not cause-names) to match macOS section style (referee F-C1-01 confirmed macOS uses "Device Not Appearing in Intune", "Setup Assistant Stuck or Failed", etc. — NOT "APNs expired" cause-names):
  - **"Device Not Appearing in Intune"** → L1 runbook 16 (primary for APNs cross-platform) + L1 runbook 17 (ADE-not-starting) + L1 runbook 19 (license invalid); entry mentions "Could be caused by: APNs certificate expired, ADE enrollment not starting, license invalid, device cap reached"; links to 07-ios-triage.md for disambiguation
  - **"ADE Setup Assistant Not Completing"** → L1 runbook 17
  - **"Enrollment Blocked by Configuration"** → L1 runbook 18 + L1 runbook 20 (reciprocal disambiguation per Phase 30 D-30)
  - **"User License Not Present"** → L1 runbook 19
  - **"Device Enrollment Cap Reached"** → L1 runbook 20
  - **"Compliance / Access Blocked"** → L1 runbook 21; cross-link to macOS equivalent `#compliance-failure-or-access-blocked`
  - [7th entry is MAM-WE advisory block per D-21 — not a symptom routing entry; its target is an admin-setup guide (admin-setup-ios/09), addressing referee F-C1-03 concern about contract violation by placing it under a clearly-advisory heading rather than treating it as a runbook route]

- **D-23: Cross-reference banners in shared Windows sections** — add iOS banners alongside existing macOS banners at:
  - `common-issues.md:33` (Device Registration) — add `> **iOS:** For iOS enrollment failures, see [iOS: Device Not Appearing in Intune](#device-not-appearing-in-intune-1).` (note: duplicate anchor name with macOS section — disambiguate with `-1` suffix OR rename iOS symptom to `ios-device-not-appearing`)
  - `common-issues.md:49` (Profile Assignment) — add iOS banner (config profile not applying scenarios map to compliance runbook 21 or admin-setup-ios/04)
  - `common-issues.md:144` (Security and Enrollment) — add iOS banner for compliance/CA timing routing to runbook 21 + `admin-setup-ios/06-compliance-policy.md`
  - Banners are **one-line additions only** per Phase 25 D-06 pattern (bidirectional: macOS sections also get iOS banners; iOS section gets Windows+macOS banners)

- **D-24: Platform selector update** — `common-issues.md:14-17` "Choose Your Platform" list gets third entry:
  ```
  - [iOS/iPadOS Failure Scenarios](#iosipados-failure-scenarios) -- iOS/iPadOS enrollment and management failures via Intune
  ```

- **D-25: `common-issues.md` frontmatter + H1** — frontmatter `platform: all` already set; no change needed. H1 "Common Provisioning Issues" is already cross-platform-neutral — no rename. Platform coverage blockquote (line 9) updated to mention iOS/iPadOS alongside Windows + macOS ADE.

- **D-26: `index.md` iOS section structure** — add after line 127 (current end of macOS section):
  ```
  ---

  ## iOS/iPadOS Provisioning

  Troubleshooting, investigation, and setup guides for iOS/iPadOS enrollment and management through Microsoft Intune. For terminology, see the [Apple Provisioning Glossary](_glossary-macos.md). For enrollment paths, see the [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md).

  ### Service Desk (L1)
  [Table: iOS Enrollment Overview + iOS Triage Tree + iOS L1 Runbooks index + L1 Quick-Ref iOS section]

  ### Desktop Engineering (L2)
  [Table: iOS Log Collection Guide + iOS L2 Runbooks index + L2 Quick-Ref iOS section + Network Endpoints iOS sub-section reference]

  ### Admin Setup
  [Table: iOS Admin Setup Overview + APNs/ABM Token/ADE Profile + Config/Apps/Compliance + BYOD/MAM + iOS ADE Lifecycle + iOS Capability Matrix]
  ```
  - Mirror macOS section's 3-subsection role-based structure (L1/L2/Admin Setup). Reject path-segmented structure (C2) per D-20.
  - Start-here entry for iOS: iOS Enrollment Path Overview (`ios-lifecycle/00-enrollment-overview.md`) is the primary "what are the 4 paths" anchor before Triage Tree or Admin Setup.

- **D-27: Cross-Platform References update** in `index.md` (lines 131-144) — add 2 new entries alongside existing macOS entries:
  - `| [iOS Enrollment Path Overview](ios-lifecycle/00-enrollment-overview.md) | 4-path comparison with supervision axis (ADE, Device Enrollment, User Enrollment, MAM-WE) |`
  - `| [iOS Capability Matrix](reference/ios-capability-matrix.md) | Intune feature parity comparison across Windows, macOS, and iOS (NAV-03) |`

- **D-28: `index.md` platform coverage blockquote** (line 9) updated to mention iOS/iPadOS alongside Windows Autopilot and macOS ADE. H1 and top-of-page narrative minor edits for trilateral framing.

### NAV-02 Quick-Ref Content

- **D-29: Adopt mirror-macOS-structure approach for both L1 and L2 quick-refs** (D1 winner, 8 confirmed flaws — all non-critical). Reject D2 decision-matrix-lead (breaks macOS-precedent internal order), D3 per-path Top Checks (Phase 25 D-14 section-level-separation violation), D4 minimal (fails quick-ref purpose).

- **D-30: `quick-ref-l1.md` iOS section** — append after line 113 (end of macOS section):
  ```
  ---

  ## iOS/iPadOS Quick Reference

  **Platform:** iOS/iPadOS through Microsoft Intune

  ### Top Checks
  1. Device in ABM? (for ADE-path) OR User licensed for Intune? (for BYOD-path) — ABM [business.apple.com] > Devices | Entra admin center > Users > [user] > Licenses
  2. Device in Intune? — Intune admin center > Devices > iOS/iPadOS — search by serial
  3. Enrollment profile assigned? (ADE-path) — Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles
  4. Compliance state? — Intune admin center > Devices > [device] > Device compliance

  ### iOS Escalation Triggers
  [4-5 bullets matching macOS L1 escalation format]

  ### iOS Decision Tree
  - [iOS Triage](decision-trees/07-ios-triage.md) -- start here for iOS/iPadOS failures

  ### iOS Runbooks
  - [iOS APNs Certificate Expired](l1-runbooks/16-ios-apns-expired.md)
  - [iOS ADE Not Starting](l1-runbooks/17-ios-ade-not-starting.md)
  - [iOS Enrollment Restriction Blocking](l1-runbooks/18-ios-enrollment-restriction-blocking.md)
  - [iOS License Invalid](l1-runbooks/19-ios-license-invalid.md)
  - [iOS Device Cap Reached](l1-runbooks/20-ios-device-cap-reached.md)
  - [iOS Compliance Blocked](l1-runbooks/21-ios-compliance-blocked.md)
  ```
  - Top Checks count: 4 items to match macOS precedent exactly (referee F-D1-06 flagged "4-5" range as inconsistent with macOS's 4). Referee F-D3-04 ruled Top Checks must be a single block per Phase 25 D-14.

- **D-31: `quick-ref-l2.md` iOS section** — append after line 178 (end of macOS section):
  ```
  ---

  ## iOS/iPadOS Quick Reference

  **Platform:** iOS/iPadOS through Microsoft Intune

  > **Important:** iOS has NO CLI diagnostic tool. No equivalent to `mdmdiagnosticstool.exe` (Windows) or `profiles` / `log show` (macOS). Diagnostic data is fragmented across three tiered methods — see below.

  ### iOS Diagnostic Data Collection (3 methods)
  | Method | Who Triggers | L2 Access Path | When to Use |
  |--------|--------------|----------------|-------------|
  | MDM diagnostic report | L2 (admin center) | Intune > Devices > [device] > Download diagnostics | Tier 1 — always start here |
  | Company Portal log upload | User | Microsoft Support ticket (indirect) | Tier 2 — when Tier 1 insufficient & no Mac available |
  | Mac+cable sysdiagnose | L2 + user | Direct .tar.gz extraction via Console.app | Tier 3 — when profile-delivery verbosity required |

  *(Full method details: [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md). Verify portal paths per Phase 30 D-32 / Phase 31 D-31 at execution time.)*

  ### Key Intune Portal Paths (iOS L2)
  | Path | Purpose |
  |------|---------|
  | Devices > Enrollment > Apple > Enrollment program tokens | ABM token sync status, enrollment profile assignment |
  | Devices > Enrollment > Apple > MDM Push Certificate | APNs certificate status and expiry |
  | Devices > Enrollment > Enrollment restrictions | Platform/ownership/limit restrictions |
  | Apps > iOS/iPadOS apps | Managed app status, VPP licensing |

  *(Verify paths per Phase 30 D-32 research flag.)*

  ### Sysdiagnose Trigger Reference (iOS/iPadOS)
  | Device | Trigger Combination |
  |--------|--------------------|
  | iPhone 8 / SE / iPad (Touch ID) | Both volume buttons + Sleep/Wake |
  | iPhone X / later iPhones | Both volume buttons + Side button |
  | iPad with Face ID | Top button + either volume button |

  *(Full procedure: [iOS Log Collection §Section 3](l2-runbooks/14-ios-log-collection.md#section-3-mac-cable-sysdiagnose). Verify triggers per Phase 31 D-30 at execution time.)*

  ### iOS Investigation Runbooks
  - [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md) -- prerequisite for all iOS L2 investigations
  - [ADE Token & Profile Delivery Investigation](l2-runbooks/15-ios-ade-token-profile.md)
  - [App Install Failure Diagnosis](l2-runbooks/16-ios-app-install.md)
  - [Compliance & CA Timing Investigation](l2-runbooks/17-ios-compliance-ca-timing.md)
  ```

- **D-32: Research-flag mitigation for quick-ref content** — every portal path, sysdiagnose trigger, and Intune navigation string in `quick-ref-l2.md` carries an inline research-flag footnote referencing Phase 30 D-32 or Phase 31 D-30/D-31 (whichever applies). This addresses referee F-D1-02/03/04 MEDIUM flaws about freezing potentially stale content. Plan-phase agents MUST verify current paths against Microsoft Learn before final content lock-in.

- **D-33: Frontmatter** — `quick-ref-l1.md` and `quick-ref-l2.md` already have `platform: all` (Phase 25 D-09). Bump `last_verified` and `review_by`. Platform coverage blockquote at line 9 of each file updated to mention iOS/iPadOS alongside Windows + macOS ADE.

### Reachability Audit (SC #4)

- **D-34: Phase 25 D-11 file-by-file audit pattern extended** — audit every Phase 26-31 iOS file + Phase 32's new glossary additions + new capability matrix for ≤2-click reachability from `docs/index.md`. Estimated file count: ~25 iOS files:
  - `docs/ios-lifecycle/00-enrollment-overview.md` + `01-ade-lifecycle.md` (2 files)
  - `docs/admin-setup-ios/00-overview.md` through `09-mam-app-protection.md` (10 files)
  - `docs/l1-runbooks/16-ios-*.md` through `21-ios-*.md` (6 files)
  - `docs/l2-runbooks/14-ios-*.md` through `17-ios-*.md` (4 files)
  - `docs/decision-trees/07-ios-triage.md` (1 file)
  - `docs/_glossary-macos.md` (shared — verify iOS terms reachable via alphabetical index anchors)
  - `docs/reference/ios-capability-matrix.md` (new Phase 32 file — verify via Cross-Platform References)
- Audit output: per-file reachability path (e.g., "index.md > admin-setup-ios/00-overview.md > 01-apns-certificate.md = 2 clicks") in PLAN.md or dedicated audit checklist artifact.
- Exclude template files (`_templates/*.md`) and planning artifacts per Phase 25 D-12.
- Regression check: verify all pre-existing Phase 20-25 reachability paths still hold after Phase 32 additive edits (no existing links broken).

### Placeholder Retrofit

- **D-35: Known Phase 32 forward-reference retrofit** — `docs/decision-trees/07-ios-triage.md:99` contains "iOS glossary additions in Phase 32 NAV-01" note. Phase 32 resolves by rewriting the line to: `- [Apple Provisioning Glossary](../_glossary-macos.md) -- Shared Apple terminology covering iOS/iPadOS (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection) and macOS (ABM, ADE, VPP, Await Configuration, Setup Assistant).` Version History bump on the decision tree file.

- **D-36: Additional Phase 32 placeholder discovery required at plan time** — planner MUST run `grep -rn "Phase 32\|NAV-0[123]" docs/` before PLAN.md finalization. Every discovered occurrence is added to retrofit scope with per-line resolution table (matches Phase 30 D-17/D-26 + Phase 31 D-22/D-26 per-line enumeration precedent). At context-gather time only the single `07-ios-triage.md:99` line was found — planner confirms completeness.

- **D-37: Commit grouping** — placeholder retrofits grouped by target file (single file = single commit for 07-ios-triage.md; atomic per-file commits if more discovered), mirroring Phase 31 D-24 commit-grouping pattern.

### Cross-cutting Conventions

- **D-38: Additive-edits-only posture per SC #4 literal** — no file renames, no file deletions, no structural rewrites. Every Phase 32 edit is either (a) a new file or (b) an append/insert/in-place-update to an existing file. All pre-existing anchor links must remain valid post-edit.

- **D-39: No full file rewrites** — modifications to `common-issues.md`, `index.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, and `_glossary-macos.md` are surgical additions + minor frontmatter/preamble/blockquote updates. No H2-level reordering, no section deletion, no line-number-shifting bulk edits.

- **D-40: Frontmatter version-bump pattern** — every touched file receives `last_verified: [Phase 32 ship date]` and corresponding `review_by: +90d` bump, plus a 1-line Version History entry per Phase 30/31 D-25 precedent (`[date] | Phase 32: added iOS/iPadOS navigation integration | -- |`).

- **D-41: Platform coverage language consistency** — all shared-file preamble blockquotes updated to "Windows Autopilot (classic/APv1 and Device Preparation/APv2), macOS ADE, **and iOS/iPadOS**" (new "and iOS/iPadOS" suffix pattern). Single canonical phrasing across `index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `_glossary-macos.md`, `reference/macos-capability-matrix.md` frontmatter blockquotes.

- **D-42: Planner wave/parallelization strategy hint** — Phase 32's 5 primary edits are independent and parallelizable:
  - Wave 1: Glossary extension (D-11 to D-19), Capability matrix creation (D-01 to D-10), Placeholder retrofit (D-35)
  - Wave 2: common-issues.md edit (D-20 to D-25), index.md edit (D-26 to D-28)
  - Wave 3: quick-ref-l1.md edit (D-30), quick-ref-l2.md edit (D-31, D-32)
  - Wave 4: Reachability audit (D-34), final validation
  - Planner confirms wave structure in PLAN.md with dependency graph.

### Claude's Discretion

- Exact symptom-category names for `common-issues.md` iOS section (constrained by D-22 list and macOS symptom-naming style); final wording tuned at plan time for clarity
- Exact iOS Escalation Triggers bullet count and phrasing in quick-ref-l1.md (constrained by macOS L1 section 8-trigger precedent at quick-ref-l1.md:24-33)
- Exact Key Gaps Summary numbered gaps in capability matrix (constrained by 7-10 range matching macos-capability-matrix.md:79-88; content selection at research/plan time)
- Exact supervision-state row wording in capability matrix Enrollment domain (constrained by D-04)
- Exact VPP entry update prose in glossary (constrained by D-13 requirement for device-licensed vs user-licensed distinction + supervised-only callout)
- Exact platform-coverage blockquote wording (constrained by D-41 "and iOS/iPadOS" suffix pattern)
- Whether to include an opening narrative preamble in the iOS capability matrix (A4 framing preserved per D-06) or render it as a short intro paragraph above the tables
- Order of iOS terms within each H2 section of the glossary (alphabetical within section vs logical grouping — Claude's discretion; default alphabetical for Alphabetical Index symmetry)
- Disambiguation approach for same-named anchors in `common-issues.md` (macOS and iOS both have "Device Not Appearing" symptoms) — option A: rename iOS anchor to `ios-device-not-appearing`; option B: GitHub-style auto-disambiguation with `-1` suffix; Claude's discretion at plan time
- Exact Version History entry wording per touched file (constrained by D-40 template)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before taking action.**

### Structural Precedents (PRIMARY templates)
- `.planning/phases/25-navigation-integration-polish/25-CONTEXT.md` — **PRIMARY precedent**. Phase 25 established the hybrid-approach common-issues, append-to-bottom quick-ref, bidirectional banner, section-level platform separation, and reachability-audit patterns that Phase 32 reuses verbatim. D-01/D-02/D-06/D-07/D-08/D-09/D-10/D-11/D-12/D-14/D-15/D-16 are direct templates for Phase 32 D-20 through D-34.
- `docs/reference/macos-capability-matrix.md` — **PRIMARY structural template** for `reference/ios-capability-matrix.md`. 101 lines; 5 domains (Enrollment, Configuration, App Deployment, Compliance, Software Updates); Key Gaps Summary with 7 numbered gaps; See Also footer. iOS matrix adapts: 3 columns (W|mac|iOS) instead of 2; Apple-parity framing preamble; ~25 iOS-specific rows per D-05.
- `docs/index.md` lines 94-126 — macOS section structure (L1/L2/Admin Setup subsections). iOS section at D-26 mirrors this.
- `docs/common-issues.md` lines 152-201 — macOS ADE Failure Scenarios section structure. iOS section at D-21 mirrors this with 6 symptom-named categories per D-22 + MAM-WE advisory per D-21.
- `docs/quick-ref-l1.md` lines 83-113 — macOS ADE Quick Reference section. iOS section at D-30 mirrors (4 Top Checks, escalation triggers, decision tree link, runbook links).
- `docs/quick-ref-l2.md` lines 132-178 — macOS ADE Quick Reference section. iOS section at D-31 mirrors with iOS substitutions (no-CLI tiered data collection, portal paths, sysdiagnose trigger reference, investigation runbooks).
- `docs/_glossary-macos.md` — **Phase 32 extension target**. Existing structure: Alphabetical Index (line 16), Enrollment H2 (line 20), Device Management H2 (line 42), App Distribution H2 (line 58), Version History H2. Phase 32 adds 5 new term entries + VPP update + new "App Protection (MAM)" H2 per D-13.

### Phase 26-31 Foundations (LOCKED decisions)
- `.planning/phases/26-ios-ipados-foundation/26-CONTEXT.md` — D-17 (file organization), D-19 (`platform: iOS` frontmatter), D-03 (MAM-WE separation from MDM paths — **load-bearing for D-13 MAM-WE new H2 placement**), canonical_refs line 70 (glossary extension target locked as `_glossary-macos.md`). Also D-11 ACME iOS 16+ threshold (not iOS capability matrix scope but referenced by downstream admin-setup content).
- `.planning/phases/27-ios-admin-setup-corporate-ade-path/27-CONTEXT.md` — D-11 APNs cross-platform blast radius (glossary APNs entry context); ABM cross-reference pattern.
- `.planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-CONTEXT.md` — D-11/D-12 CA timing section (capability matrix Compliance domain cross-link); D-14 Default compliance posture (matrix Compliance row); supervised-only silent install callout (matrix Apps domain row per D-05).
- `.planning/phases/29-ios-admin-setup-byod-mam/29-CONTEXT.md` — D-05 PRIVACY-LIMIT CALLOUT PATTERN (context for account-driven UE glossary entry); D-08 shared Intune Enrollment Restrictions section (common-issues cross-link target); D-31 MAM deferral (**load-bearing for D-21 MAM-WE advisory placement in common-issues**).
- `.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md` — D-21 iOS L1 runbook filenames 16-21 (**load-bearing for D-22 common-issues symptom routing targets and D-30 quick-ref-l1 runbook links**); D-22 iOS triage tree filename `07-ios-triage.md` (all start-here links); D-31 MAM-WE L1 deferral (confirmed no L1 runbook exists, drives D-21 advisory pattern); D-32/D-34 UI research flags (inherited by D-31/D-32 quick-ref-l2 research-flag mitigation).
- `.planning/phases/31-ios-l2-investigation/31-CONTEXT.md` — D-01 tiered log collection flow (**load-bearing for D-31 quick-ref-l2 iOS Diagnostic Data Collection table**); D-03 three-method decision matrix (source for D-31 compressed 4-col table — NOT the full 6-col matrix, which is kept in the runbook, not in quick-ref); D-05 sysdiagnose procedure + per-device-type triggers (**load-bearing for D-31 quick-ref-l2 Sysdiagnose Trigger Reference table**); D-19 L2 runbook filenames 14-17 (quick-ref-l2 runbook links); D-20 `l2-runbooks/00-index.md` iOS section (already shipped — no Phase 32 edit); D-21 MAM advisory single-source placement (**load-bearing for D-21 common-issues single-source MAM advisory posture**); D-30/D-31/D-32/D-33/D-34 research flags (inherited by D-32 quick-ref-l2 mitigation).

### Files to Modify (Phase 32 scope)
- `docs/_glossary-macos.md` — add 5 new iOS term entries + VPP update + new "App Protection (MAM)" H2 per D-11 through D-19
- `docs/common-issues.md` — add `## iOS/iPadOS Failure Scenarios` H2 + platform selector entry + 3 cross-ref banners + frontmatter bump per D-20 through D-25
- `docs/index.md` — add `## iOS/iPadOS Provisioning` H2 with L1/L2/Admin Setup subsections + 2 Cross-Platform References entries + platform coverage blockquote update + frontmatter bump per D-26 through D-28
- `docs/quick-ref-l1.md` — append `## iOS/iPadOS Quick Reference` H2 + frontmatter bump per D-30
- `docs/quick-ref-l2.md` — append `## iOS/iPadOS Quick Reference` H2 + frontmatter bump per D-31 through D-33
- `docs/reference/00-index.md` — add "iOS References" H2 subsection with iOS capability matrix entry per D-08
- `docs/decision-trees/07-ios-triage.md` — placeholder retrofit line 99 per D-35

### Files to Create (Phase 32 scope)
- `docs/reference/ios-capability-matrix.md` — new trilateral capability matrix per D-01 through D-10

### Templates and Conventions
- `docs/_templates/admin-template-ios.md` — not modified (no scope for Phase 32)
- `docs/_templates/l1-template.md` — already extended with iOS platform enum per Phase 30 D-24; no Phase 32 change
- `docs/_templates/l2-template.md` — already extended with iOS platform enum per Phase 31 D-27; no Phase 32 change
- `docs/ARCHITECTURE.md` — Pattern 5 (Numbering Continuation) does not apply (Phase 32 creates one new file with semantic name, not numbered continuation)

### Requirements and Planning
- `.planning/ROADMAP.md` Phase 32 section (lines 177-186) — 4 success criteria (SC #1 6-term glossary additions, SC #2 navigation visibility per shared file, SC #3 trilateral capability matrix at `reference/ios-capability-matrix.md` literal path, SC #4 additive injection with pre-existing link preservation)
- `.planning/REQUIREMENTS.md` — NAV-01 (glossary), NAV-02 (platform selector + index + common-issues + quick-ref), NAV-03 (capability matrix); ADDTS-01 deferred MAM L1/L2 future milestone (informs D-21 MAM-WE advisory); ADDTS-02 Graph API deep-dive (not Phase 32 scope)
- `.planning/STATE.md` — no research flags carried into Phase 32 except inherited Phase 30 D-32/D-33/D-36 UI-shift flags and Phase 31 D-30/D-31/D-32/D-33/D-34/D-35 flags (addressed via D-32 quick-ref research-flag mitigation)
- `.planning/phases/32-navigation-integration-references/32-CANDIDATES.md` — full candidate analysis with 14 options across 4 gray areas (Phase 32 artifact)
- `.planning/phases/32-navigation-integration-references/32-DISCUSSION-LOG.md` — full adversarial review flaw trail (68 Finder flaws, 2 Adversary disproves, 66 Referee REAL ISSUE rulings, 2 Referee FALSE POSITIVE rulings, per-candidate score tallies, winner synthesis)

### External Research Targets (for gsd-phase-researcher)
- Microsoft Learn — current Intune admin center navigation paths for iOS device enrollment, Apple MDM push certificate, enrollment restrictions, Apple enrollment program tokens, iOS/iPadOS apps (D-32 research-flag mitigation requires verification)
- Microsoft Learn — current MDM diagnostic report per-device action path (Phase 31 D-31 flag inherited)
- Microsoft Learn — current iOS Company Portal log upload flow and Microsoft Support backend retrieval (Phase 31 D-32 flag inherited)
- Apple Developer Documentation — sysdiagnose trigger combinations per iOS device type and iOS version (Phase 31 D-30 flag inherited)
- Microsoft Learn + Apple documentation — VPP device-licensed vs user-licensed distinction current state (D-13 VPP update prose accuracy)
- Microsoft Learn — DDM capability parity across iOS/macOS current state (capability matrix Configuration domain accuracy per D-05)

### Prior Phase CONTEXT Files (LOCKED decisions summary)
- Phase 25: macOS navigation integration precedent — the whole file is the structural template for Phase 32
- Phase 26: iOS foundation — D-03 MAM-WE separation (load-bearing), D-17 file organization, D-19 frontmatter convention
- Phase 27-29: iOS admin setup decisions — cross-reference targets for capability matrix rows and glossary term cross-links
- Phase 30: iOS L1 scope — runbook 16-21 list locks D-22 symptom-to-runbook mapping; D-31 MAM defer locks D-21 advisory posture; D-32 UI flag inherited
- Phase 31: iOS L2 scope — runbook 14-17 list locks quick-ref-l2 runbook links (D-31); D-01/D-03/D-05 drive quick-ref-l2 iOS diagnostic data content structure; D-21 single-source MAM advisory locks common-issues MAM advisory posture; D-27 L2 template already extended

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Phase 25 macOS navigation integration pattern (verbatim reuse)** — hybrid common-issues approach, append-to-bottom quick-ref sections, bidirectional cross-ref banners, platform selector entries, section-level platform separation, reachability audit methodology. Phase 32 reuses ALL 16 Phase 25 decisions as templates; no structural innovation required.
- **macos-capability-matrix.md** (`docs/reference/macos-capability-matrix.md`, 101 lines) — structural template for the trilateral iOS matrix. 5-domain structure, Key Gaps Summary, See Also footer, frontmatter schema all reused.
- **Existing iOS content (Phases 26-31)** — 25 iOS files are ready for navigation integration: `ios-lifecycle/` (2), `admin-setup-ios/` (10), `l1-runbooks/16-21` (6), `l2-runbooks/14-17` (4), `decision-trees/07-ios-triage.md` (1), plus the existing `_glossary-macos.md` and `reference/` docs. No content creation required.
- **Phase 30/31 MAM advisory pattern** — single-source placement in runbook index files is established (Phase 30 30-08 summary shows MAM-WE note shipped in `l1-runbooks/00-index.md`; Phase 31 D-21 shipped same pattern in `l2-runbooks/00-index.md`). Phase 32 reuses this advisory language style for common-issues.md MAM-WE entry.
- **Frontmatter + Version History pattern** — every touched file gets `last_verified` bump + `review_by +90d` bump + 1-line Version History entry per Phase 25/30/31 D-19/D-25/D-40 precedent.
- **Alphabetical Index inline pattern** in glossary (line 16) — simple pipe-separated link list; extended from 6 to 11 terms via D-14.
- **Cross-reference anchor linking** (`../_glossary-macos.md#anchor`, `admin-setup-ios/XX.md`, `l1-runbooks/NN.md`) — convention already established across 116 files; Phase 32 uses same pattern for all new cross-links.

### Established Patterns
- "Choose Your Platform" anchor-link lists at top of shared files (index.md lines 17-20, common-issues.md lines 14-17) — iOS entry appended per D-24/D-26
- Cross-reference banner blockquotes (`> **macOS:** For macOS ADE troubleshooting, see [link].`) — bidirectional iOS/macOS/Windows pattern; one-line additions only
- Role-based section structure (L1 / L2 / Admin Setup) in index.md — iOS section mirrors at D-26
- Symptom-based routing in common-issues.md (symptom-descriptive names, not cause-names) per Phase 25 precedent; iOS follows at D-22
- Append-to-bottom platform section in quick-ref cards (APv2 and macOS sections both appended; iOS appended after macOS at D-30/D-31)
- Platform coverage blockquote preambles updated to list all supported platforms (D-41 single canonical suffix "and iOS/iPadOS")
- Frontmatter `platform: all` on shared files (Phase 25 D-09 locked)
- Version History table at bottom of every file with 1-line per-change entries

### Integration Points
- **7 files modified (additive):** `_glossary-macos.md`, `common-issues.md`, `index.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `reference/00-index.md`, `decision-trees/07-ios-triage.md`
- **1 file created (new):** `docs/reference/ios-capability-matrix.md`
- **Zero files renamed or deleted** per D-38 additive-only posture
- **Zero structural rewrites** of existing files per D-39 no-full-rewrites posture
- **Zero new templates** — all template extensions already shipped (Phase 30 D-24 for L1, Phase 31 D-27 for L2)
- **Zero decision-tree Mermaid modifications** — 07-ios-triage.md retrofit at D-35 is a single-line text change (line 99), not a Mermaid graph edit
- **Zero changes to Phase 26-31 shipped content** beyond the one line retrofit in 07-ios-triage.md:99 and placeholder-discovery grep at plan time
- **Reachability audit scope:** ~25 iOS files + regression check on ~116 pre-existing files (verify no Phase 20-25 link breaks)

</code_context>

<specifics>
## Specific Ideas

- **Adversarial-review decision method preserves Phase 30/31 precedent** — 4 Gray Areas × 3-4 candidate options (14 candidates) with Finder/Adversary/Referee scoring. Winners: A1 (structural) + A4 (framing) hybrid for Gray Area A, B1 for Gray Area B (decisive), C1 for Gray Area C (tie-break on MAM-WE explicit vs silent), D1 for Gray Area D (decisive). Full flaw trail in 32-DISCUSSION-LOG.md.
- **Gray Area A resolution note** — Referee's literal lowest-flaw winner A4 (20 pts) carries a critical SC #3 violation (drops Windows column). Referee's carry-forward mitigation "add Windows column" transforms A4 into A1 structurally. Since SC #3 is literal and cannot be waived ("across iOS, macOS, and Windows"), Phase 32 adopts **A1 structural trilateral matrix (5 domains) with A4's Apple-parity framing preserved in opening narrative** — honoring both the referee's framing-preference signal and SC #3 literal requirement. Net flaws: A1's 27 points are mostly description-text flaws (F-A1-01 about cons phrasing, F-A1-02 drift risk understated) and 1 substantive concern about iOS sparse Software Updates row (F-A1-04) — mitigated by D-05 iOS-specific row selections.
- **Phase 25 precedent is load-bearing** — Phase 32 has no novel structural decisions for 4 of 5 edits (glossary is Phase 26's locked target; common-issues/index.md/quick-refs are Phase 25 hybrid/mirror patterns; capability matrix is macos-capability-matrix.md structural clone). Only the iOS capability matrix is substantively new content work. This low-novelty posture reduces execution risk significantly vs Phases 26-31.
- **MAM-WE treatment is the most subtle decision** — Phase 26 D-03 separates MAM-WE from MDM enrollment paths; Phase 30 D-31 defers MAM-WE L1 runbook; Phase 31 D-21 places MAM-WE advisory single-source in l2-runbooks/00-index.md. Phase 32 must (a) extend this single-source pattern to common-issues.md (D-21 MAM-WE advisory block per C1 pattern), (b) place glossary MAM-WE entry in new "App Protection (MAM)" H2 not Enrollment (D-13), (c) route capability matrix MAM-WE row into Enrollment domain with explicit "app-layer — no device enrollment" note (D-05). Three consistent MAM-WE placement signals.
- **Same-name anchor collision** in common-issues.md (macOS has `#device-not-appearing-in-intune`, iOS will have similar) — Claude's discretion at D-22; likely resolution is explicit `-ios-` anchor prefixes (`ios-device-not-appearing`) for symmetry with L1 runbook filename convention (16-ios-*.md).
- **Research flag footnote pattern for quick-ref-l2 content** — portal paths, sysdiagnose triggers, and MDM diagnostic report paths carry inline research-flag callouts per D-32. Execution-phase agents MUST verify these against Microsoft Learn before writing final content. This prevents shipping stale UI navigation strings — a known rot vector in Intune docs.
- **Phase 32 placeholder scope is narrow** — only 1 known placeholder (`07-ios-triage.md:99`). Planner-time grep discovery required but low-risk (Phase 30 D-16 71-placeholder retrofit and Phase 31 D-22 13+-placeholder retrofit set the precedent; Phase 32's 1-placeholder retrofit is trivial in comparison).
- **Reachability audit deliverable format** — per-file reachability table in PLAN.md (not a separate artifact) following Phase 25 D-13 discretion. Regression check confirms no Phase 20-25 broken links — Phase 32 shipping should NOT regress any pre-existing navigation.
- **iOS capability matrix sparse-row mitigation** — referee F-A1-04 flagged Software Updates row as fragile for iOS. D-05 explicitly lists iOS-specific Software Updates rows: "Managed Software Update via DDM (iOS 17+ enforced path)" and "Deferral via Restrictions (legacy, pre-iOS 17)" — ensures the row has substantive content, not near-empty cells.
- **Apple-parity framing preamble language (D-06)** should be 2-4 sentences maximum. Longer narrative belongs in `windows-vs-macos.md` (existing cross-platform concept-comparison doc, already linked from index.md Cross-Platform References). Capability matrix is a scannable comparison, not a narrative.
- **Commit grouping strategy hint** — Phase 32's 8 edits (7 file modifications + 1 file creation) are independent and can be grouped per Phase 30 D-20 / Phase 31 D-24 commit-grouping pattern. Suggested grouping:
  1. `docs(32): add iOS capability matrix` — creates ios-capability-matrix.md + updates reference/00-index.md + updates index.md Cross-Platform References
  2. `docs(32): extend shared Apple glossary with iOS terms` — _glossary-macos.md only
  3. `docs(32): inject iOS sections into common-issues.md` — common-issues.md only (section + banners + selector + H1 narrative)
  4. `docs(32): inject iOS section into docs hub index` — index.md iOS Provisioning H2 (separate from matrix commit)
  5. `docs(32): append iOS quick-reference sections to L1+L2 cards` — quick-ref-l1.md + quick-ref-l2.md
  6. `docs(32): resolve Phase 32 glossary placeholder in iOS triage tree` — 07-ios-triage.md:99
  7. `docs(32): reachability audit + regression verification` — plan audit artifact (if separate file) or inline in PLAN.md
- **Length targets per file:**
  - New ios-capability-matrix.md: 100-130 lines (macOS matrix is 101)
  - Glossary addition: ~60-80 new lines (5 new term entries at ~10-15 lines each + VPP update ~10 lines)
  - common-issues.md iOS section: ~50-70 new lines (macOS section is ~50 lines)
  - index.md iOS section: ~30-40 new lines (macOS section is ~33 lines)
  - quick-ref-l1.md iOS section: ~30 new lines (macOS section is ~30 lines)
  - quick-ref-l2.md iOS section: ~45-55 new lines (macOS section is ~48 lines; iOS adds sysdiagnose trigger table)

</specifics>

<deferred>
## Deferred Ideas

- **Glossary rename to `_glossary-apple.md`** — B3 option explicitly disqualified per D-11. If future tvOS or visionOS support arrives (not in current REQUIREMENTS.md), a separate phase may rename (carefully, with link-migration plan). Phase 32 keeps `_glossary-macos.md` per Phase 26 lock.
- **6th "Supervision" domain in capability matrix** — A2 option explicitly rejected per D-03/D-04. Supervision state is handled as rows within Enrollment domain + inline 🔒 callouts per-row elsewhere. If future milestone requires deeper supervision capability drill-down, a separate reference doc can be created (e.g., `reference/ios-supervision-gates.md`).
- **Path-segmented navigation structure** in common-issues.md or index.md iOS sections — C2 option explicitly rejected per D-20/D-26. If future reader feedback shows path-first navigation is genuinely needed, a dedicated `ios-lifecycle/00-enrollment-overview.md`-based entry point can be promoted (it's already linked).
- **Apple-parity-only bilateral matrix** — A4 option explicitly rejected per D-02 (SC #3 literal violation). If future milestone adds a dedicated "iOS vs macOS for Apple admins" reference, it's separate scope — the main capability matrix stays trilateral.
- **Extended glossary terms beyond SC #1 six** — DDM, ACME, Managed Apple ID, DEP, Company Portal — all explicitly rejected per D-12/D-19. If future phase needs any of these, add separately with explicit requirement.
- **MAM-WE L1/L2 runbooks** — ADDTS-01 future milestone per Phase 29 D-31 + Phase 30 D-31 + Phase 31 D-21. Phase 32's MAM-WE treatment (D-21 advisory + D-13 glossary entry + D-05 matrix row) is sufficient for v1.3 scope; runbook creation deferred.
- **iOS Graph API ADE token deep-dive reference doc** — ADDTS-02 future milestone per Phase 31 D-09. Not referenced by Phase 32 navigation (matrix notes Graph API READ-ONLY scope per Phase 31; no Phase 32 navigation addition for Graph API tooling).
- **Shared iPad L2 specifics and L1 runbooks** — SIPAD-01 future milestone per REQUIREMENTS.md. Phase 32 capability matrix does NOT add Shared iPad-specific rows (Managed Apple ID, multi-user partitions) — deferred.
- **Android enrollment and MAM documentation** — PLAT-01 future milestone per REQUIREMENTS.md. Phase 32 navigation integration is iOS-only; Android scope is separate future work.
- **Apple School Manager (ASM) parallel coverage** — PLAT-02 future milestone per REQUIREMENTS.md. Capability matrix does not add ASM rows; deferred.
- **Automated link-check CI for navigation integrity** — project-level future tooling; noted for v1.4 or later.
- **Decision-tree rewiring for iOS** (adding iOS to 00-initial-triage.md Mermaid graph) — explicitly rejected as scope creep. Phase 30 30-08 shipped banner-only integration; Phase 32 does not touch 00-initial-triage.md.
- **Localization / language-variant glossary entries** — not in REQUIREMENTS.md; English-only portal string conventions inherited from Phase 30 and Phase 31.
- **iOS-specific Windows vs iOS concept comparison doc** — existing `windows-vs-macos.md` covers Apple-vs-Windows concepts generally. Phase 32 does NOT create a separate `windows-vs-ios.md`. If future need arises, Apple-parity framing in ios-capability-matrix.md (D-06) may be promoted to a full doc.
- **Expanded sysdiagnose per-iOS-version trigger matrix** — Phase 32 quick-ref-l2 sysdiagnose trigger table (D-31) covers 3 device classes; detailed per-iOS-version or per-iPadOS-generation nuances are deferred to v1.4 or a dedicated reference doc.
- **Intune portal UI path verification automation** — manual at-plan-time verification per D-32 research-flag mitigation. Automated scrape-and-verify tooling is out of scope.

### Reviewed Todos (not folded)
None — `gsd-tools todo match-phase 32` returned 0 matches at context-gather time (no pending backlog todos relevant to iOS navigation integration scope).

</deferred>

---

*Phase: 32-navigation-integration-references*
*Context gathered: 2026-04-17*
*Decision method: 4 Gray Areas × 3-4 candidate options each (14 candidates total) → adversarial review (Finder surfaced 68 flaws / Adversary attempted 2 disproves / Referee confirmed 66 REAL ISSUE + 2 FALSE POSITIVE) → winners A1-structural+A4-framing (Gray Area A, SC #3-mitigated), B1 (Gray Area B, decisive), C1 (Gray Area C, tiebreak on MAM-WE explicitness), D1 (Gray Area D, decisive). Full flaw trail in 32-DISCUSSION-LOG.md; full candidate analysis in 32-CANDIDATES.md.*
