# Phase 32: Navigation Integration & References - Research

**Researched:** 2026-04-17
**Domain:** Documentation navigation integration (no code execution; pure Markdown authoring + link graph)
**Confidence:** HIGH (structural precedents well-documented; 1 MEDIUM area — inherited UI-path research flags)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (D-01 through D-42, 32-CONTEXT.md)

**iOS Capability Matrix (NAV-03, SC #3)**

- **D-01:** New standalone file at `docs/reference/ios-capability-matrix.md`. Filename LOCKED by ROADMAP.md SC #3 literal. Cannot rename, cannot merge into existing macos-capability-matrix.md.
- **D-02:** Trilateral structure: three columns `| Feature | Windows | macOS | iOS |` satisfying SC #3 literal.
- **D-03:** Five domains mirroring macOS matrix: Enrollment, Configuration, App Deployment, Compliance, Software Updates. NO 6th "Supervision" domain.
- **D-04:** Supervision axis as rows within Enrollment domain ("Supervision state", "Supervised-only capability gates") + inline `🔒 supervised-only` parenthetical in other domains.
- **D-05:** iOS-specific rows added: Enrollment (Account-driven UE, MAM-WE, ABM token shared with macOS), Configuration (DDM availability, Home Screen Layout iOS-only, Wi-Fi supervised-only, iOS restrictions), App Deployment (VPP device-vs-user licensed, LOB/IPA, silent install supervised gate), Compliance (Jailbreak detection iOS-only, OS version gate, passcode, default posture), Software Updates (Managed SW Update via DDM iOS 17+, Restrictions deferral legacy).
- **D-06:** Apple-parity framing preserved as 2-4 sentence opening narrative preamble above tables.
- **D-07:** Key Gaps Summary at bottom — 7-10 numbered gaps (Claude's discretion on content).
- **D-08:** Wire into `docs/index.md` Cross-Platform References + `docs/reference/00-index.md` new "iOS References" H2.
- **D-09:** Frontmatter `platform: all` (cross-platform comparison), `audience: admin`, `applies_to: both`.
- **D-10:** Target 100-130 lines.

**Glossary Extension (NAV-01, SC #1)**

- **D-11:** Extend existing `docs/_glossary-macos.md` (NO rename). Rename to `_glossary-apple.md` DISQUALIFIED on SC #4 violation (76 references across 29 files) and Phase 26 locked-decision conflict.
- **D-12:** Exact 6-term scope: supervision, MAM-WE, APNs, account-driven user enrollment, VPP (update), jailbreak detection. No scope creep.
- **D-13:** Placement — Enrollment H2: add Supervision + Account-Driven UE; Device Management H2: add APNs + Jailbreak Detection; App Distribution H2: UPDATE existing VPP entry; **NEW H2 "App Protection (MAM)"**: add MAM-WE. MAM-WE placement justified by Phase 26 D-03 "app-layer — no device enrollment" separation.
- **D-14:** Alphabetical Index expanded from 6 to 11 entries (alphabetical order preserved).
- **D-15:** Per-term `> **Windows equivalent:** ...` blockquote matching existing pattern. iOS-only terms (e.g., MAM-WE) explicitly state "no direct equivalent."
- **D-16:** Cross-platform scope flag in opening sentence (e.g., "APNs — Apple's push notification service used by all Apple platforms...").
- **D-17:** Frontmatter `platform: all` already set — bump `last_verified` + `review_by`.
- **D-18:** Existing terms NOT touched except VPP update.
- **D-19:** Do NOT add Managed Apple ID, DDM, ACME, DEP, Company Portal terms — scope creep rejected.

**NAV-02 Routing (`common-issues.md` + `index.md`)**

- **D-20:** Mirror Phase 25 macOS section structure verbatim for both files. Path-segmented C2 DISQUALIFIED on Phase 25 D-14 violation.
- **D-21:** `common-issues.md` iOS section structure: new `## iOS/iPadOS Failure Scenarios` H2 after line 201 with bidirectional banners + 6 symptom categories + MAM-WE advisory (ADDTS-01 note).
- **D-22:** Six iOS symptom categories use **symptom-descriptive names** (not cause-names): "Device Not Appearing in Intune" → runbook 16/17/19; "ADE Setup Assistant Not Completing" → 17; "Enrollment Blocked by Configuration" → 18+20; "User License Not Present" → 19; "Device Enrollment Cap Reached" → 20; "Compliance / Access Blocked" → 21. MAM-WE is 7th advisory block (not a symptom route).
- **D-23:** Cross-reference banners at common-issues.md:33 (Device Registration), :49 (Profile Assignment), :144 (Security and Enrollment). Bidirectional; one-line additions only.
- **D-24:** Platform selector third entry at common-issues.md:14-17.
- **D-25:** No H1 rename; no frontmatter structural change; update platform coverage blockquote.
- **D-26:** `index.md` iOS section: new `## iOS/iPadOS Provisioning` H2 after line 127 with L1/L2/Admin Setup subsections mirroring macOS section. Start-here entry is iOS Enrollment Path Overview.
- **D-27:** Two new Cross-Platform References entries: iOS Enrollment Path Overview + iOS Capability Matrix.
- **D-28:** `index.md` platform coverage blockquote + H1 narrative updated for trilateral framing.

**NAV-02 Quick-Ref Content**

- **D-29:** Mirror-macOS-structure approach for both L1 and L2 quick-refs. D2/D3/D4 all DISQUALIFIED.
- **D-30:** `quick-ref-l1.md` iOS section appended after line 113 — 4 Top Checks (match macOS count exactly), escalation triggers, decision tree link, runbook links 16-21.
- **D-31:** `quick-ref-l2.md` iOS section appended after line 178 — 3 new content blocks replacing macOS's Terminal Commands bash: iOS Diagnostic Data Collection table (3 methods), Key Intune Portal Paths (iOS L2) table, Sysdiagnose Trigger Reference table, plus Investigation Runbook links 14-17. Opens with "no CLI diagnostic tool" callout.
- **D-32:** Inline research-flag footnotes for every portal path + sysdiagnose trigger referencing parent flags (Phase 30 D-32 / Phase 31 D-30/D-31).
- **D-33:** Frontmatter already `platform: all` — bump verification dates + platform coverage blockquote.

**Reachability Audit (SC #4)**

- **D-34:** File-by-file audit of ~25 iOS files + glossary additions + new matrix for ≤2-click reachability from `docs/index.md`. Audit output: per-file reachability path table in PLAN.md. Regression check: verify no pre-existing Phase 20-25 link breaks.

**Placeholder Retrofit**

- **D-35:** Retrofit `docs/decision-trees/07-ios-triage.md:99` — rewrite to concrete link with 5 iOS terms + 5 macOS terms inline.
- **D-36:** Planner MUST grep `Phase 32|NAV-0[123]` across docs/ at plan time. At context-gather only `07-ios-triage.md:99` was found.
- **D-37:** Single-file single-commit grouping.

**Cross-cutting Conventions**

- **D-38:** Additive-edits-only per SC #4. No renames, no deletions, no structural rewrites.
- **D-39:** No full file rewrites — surgical insertions + minor frontmatter/preamble/blockquote updates only.
- **D-40:** Frontmatter version-bump pattern on every touched file: `last_verified: [Phase 32 ship date]` + `review_by: +90d` + 1-line Version History entry.
- **D-41:** Canonical platform-coverage suffix: "...**and iOS/iPadOS**" across all shared-file preamble blockquotes.
- **D-42:** Wave parallelization hint — Wave 1 (glossary + matrix + placeholder), Wave 2 (common-issues + index), Wave 3 (quick-refs), Wave 4 (audit + validation).

### Claude's Discretion

- Exact symptom-category wording (within D-22 list and macOS-naming style)
- Exact iOS Escalation Triggers count/phrasing in quick-ref-l1.md (3-5 range, matches macOS precedent)
- Exact Key Gaps Summary gaps (7-10 range matching macOS matrix)
- Exact supervision-state row wording (within D-04)
- Exact VPP update prose (within D-13)
- Exact platform-coverage blockquote wording (within D-41)
- Opening narrative preamble format — paragraph vs callout box (within D-06)
- Order of iOS terms within glossary H2 sections (default alphabetical)
- Anchor-collision disambiguation approach (option A: `ios-` prefix per symmetry with runbook filenames; option B: GitHub `-1` auto-suffix)
- Version History entry wording per file (within D-40 template)

### Deferred Ideas (OUT OF SCOPE)

- Glossary rename to `_glossary-apple.md` (B3)
- 6th Supervision domain in capability matrix (A2)
- Path-segmented navigation (C2)
- Bilateral iOS-vs-macOS matrix (A4 structural)
- Extended glossary terms: DDM, ACME, Managed Apple ID, DEP, Company Portal (B4)
- MAM-WE L1/L2 runbooks (ADDTS-01)
- iOS Graph API deep-dive reference (ADDTS-02)
- Shared iPad specifics (SIPAD-01)
- Android coverage (PLAT-01)
- Apple School Manager coverage (PLAT-02)
- Expanded per-iOS-version sysdiagnose matrix
- Automated link-check CI
- Localization / language-variant entries
- Separate `windows-vs-ios.md` concept comparison
- Intune portal UI path verification automation
- Decision-tree Mermaid rewiring for iOS
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | iOS glossary additions extend existing glossary with supervision, MAM, user enrollment, APNs, and iOS-specific terms | §Standard Stack → Glossary extension (D-11–D-19); §Code Examples → glossary entry template; §Source Hierarchy confirms Microsoft Learn definitions for MAM-WE, account-driven UE, supervision, APNs, VPP, jailbreak detection |
| NAV-02 | Platform selector, index.md, common-issues.md, and quick-ref cards updated with iOS/iPadOS sections | §Architecture Patterns → Section-level platform separation + bidirectional banners (Phase 25 D-01/D-14 precedent); §Code Examples → banner + section insertion templates; §Common Pitfalls → anchor-collision (confirmed via grep — macOS already holds `#device-not-appearing-in-intune`) |
| NAV-03 | iOS capability matrix documents feature parity gaps across iOS vs macOS vs Windows | §Standard Stack → Trilateral matrix structure; §Code Examples → macos-capability-matrix.md template (101 lines, 5 domains); §Open Questions → specific per-row capability values to verify against current Microsoft Learn (DDM availability, VPP silent install supervision boundary, managed software update enforcement) |
</phase_requirements>

## Summary

Phase 32 is a **low-novelty capstone navigation-integration phase** that reuses five well-established structural patterns from Phase 25 (macOS navigation integration) and one new pattern (trilateral capability matrix clone of `macos-capability-matrix.md`). No new runbooks, no new lifecycle docs, no new admin-setup content, no code. All 7 primary artifacts are additive edits to already-shipped shared files or one new reference file. Risk is concentrated in three areas: (1) anchor-collision with existing macOS section in `common-issues.md` (VERIFIED — macOS already holds `#device-not-appearing-in-intune`, `#configuration-profile-not-applied`, `#compliance-failure-or-access-blocked`), (2) portal-path freshness for Intune admin center UI strings carried into `quick-ref-l2.md` tables (inherited Phase 30 D-32 and Phase 31 D-31 research flags are relevant), (3) Phase 30 Wave 3 dependency (30-08-SUMMARY.md claims completion but git log shows NO commits touching `00-initial-triage.md` or `l1-runbooks/00-index.md` — Phase 32 baseline state may require verification at plan time).

Research confirms the adversarial-review winners and mitigations in `32-CONTEXT.md` are consistent with current Microsoft Learn documentation and Apple Developer Documentation (verified 2026-04-17): account-driven User Enrollment is the current recommended path per Microsoft Learn; APNs certificate page navigation is `Devices > Enrollment > Apple > MDM Push Certificate`; MDM diagnostic report action is available per-device via `Devices > All devices > [device] > Collect diagnostics`; sysdiagnose is now a single canonical trigger (both volume + Side/Top) across all modern iOS devices — the CONTEXT.md D-31 per-device-type trigger table (iPhone 8/SE/Touch-ID-iPad vs iPhone X+ vs Face-ID-iPad) describes older device generations and remains technically correct but simpler modern guidance exists; DDM-enforced managed software updates work on **both supervised and unsupervised** iOS 17+ devices per Microsoft Learn (the "supervised-only silent install" rule applies to app install specifically, not DDM software update enforcement — this distinction matters for D-05 capability-matrix row accuracy).

**Primary recommendation:** Follow the Phase 25 D-01 through D-16 patterns verbatim for all NAV-02 work. Build `ios-capability-matrix.md` by cloning `macos-capability-matrix.md` structurally, inserting a Windows column, injecting the D-05 iOS-specific rows, and adding the Apple-parity preamble per D-06. Resolve the anchor collision by prefixing iOS symptom anchors with `ios-` (matching the L1 runbook filename convention `16-ios-apns-expired.md`, etc.) to eliminate ambiguity. Flag Phase 30 30-08 completion gap to planner so Phase 32 can confirm baseline state before injecting into `00-initial-triage.md` / `l1-runbooks/00-index.md`.

## Architectural Responsibility Map

Phase 32 is documentation-only; there are no runtime tiers. Capabilities map to **documentation artifact tiers** instead of execution tiers.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Cross-platform feature comparison | `docs/reference/` (stable reference tier) | `docs/` hub (entry tier via Cross-Platform References) | Capability matrix is a stable comparison artifact — changes at Apple/Microsoft release cadence, not per-incident. Reference tier matches `macos-capability-matrix.md` placement precedent. |
| Terminology definitions | `docs/` shared glossary | L1/L2 runbook deep-links | Glossary is the single source of truth; runbooks deep-link via `_glossary-macos.md#anchor` pattern established across 116 files. |
| Symptom-to-runbook routing | `docs/common-issues.md` (symptom index) | `decision-trees/*` (flow-based routing) | `common-issues.md` is the flat symptom index; decision trees are the flow-based router. They are complementary not duplicative — a user who knows the symptom lands in common-issues.md; a user who needs to triage lands in 07-ios-triage.md. |
| Role-based entry (L1/L2/Admin) | `docs/index.md` (hub) | `quick-ref-l1.md`, `quick-ref-l2.md` | Hub has role subsections with tables; quick-refs are one-page cheat sheets. Both entry points link INTO the platform content in admin-setup-ios/, l1-runbooks/, l2-runbooks/. |
| Quick-recall cheat sheet content | `quick-ref-l1.md`, `quick-ref-l2.md` | Full runbooks/admin guides (depth) | Quick-refs compress content for scannability; full runbooks carry depth. D-31 trims the decision-matrix to 4 columns; the full 6-column matrix stays in `l2-runbooks/14-ios-log-collection.md`. |
| Platform disambiguation | Cross-ref banners (1-line) + platform selector | Section-level H2 headings | Phase 25 D-14 locked section-level separation as the contamination boundary; banners are routing-only, never content-bearing. |

**Why this matters:** Phase 32 must not confuse the tiers. Concrete examples: (a) do NOT put portal path strings in the glossary (belongs in quick-ref-l2); (b) do NOT put symptom routing in the capability matrix (belongs in common-issues.md); (c) do NOT embed iOS decision logic inside the Windows Mermaid graph in `00-initial-triage.md` (Phase 30 D-05 already ruled this out; banner-only integration is the canon).

## Standard Stack

This is a documentation phase — no libraries, no package installs. The "stack" is the repository's documentation conventions.

### Core (Documentation Conventions)

| Artifact | Version / Path | Purpose | Why Standard |
|----------|----------------|---------|--------------|
| Frontmatter schema | Established across 116 docs | `last_verified`, `review_by`, `applies_to`, `audience`, `platform` — metadata for every MD file | Phase 20 D-07/D-08/D-09 locked this schema; all downstream phases use it [VERIFIED: docs/_glossary-macos.md:1-7 matches docs/reference/macos-capability-matrix.md:1-7] |
| Shared Apple glossary | `docs/_glossary-macos.md` (72 lines currently) | Terminology for all Apple-platform docs (macOS + iOS) | Phase 26 canonical_refs line 70 LOCKS this file as the iOS glossary extension target [VERIFIED: 26-CONTEXT.md line 70] |
| Structural template (matrix) | `docs/reference/macos-capability-matrix.md` (101 lines) | 5-domain structure + Key Gaps Summary + See Also footer | Adversarial review winner A1 (trilateral) is a structural clone [VERIFIED: 32-CANDIDATES.md Gray Area A] |
| Structural template (navigation) | Phase 25 CONTEXT decisions D-01 through D-16 | Hybrid common-issues + append-quick-ref + bidirectional banners + platform selector | Phase 25 D-20/D-29 explicitly adopt this verbatim [VERIFIED: 25-CONTEXT.md, 32-CONTEXT.md D-20 D-29] |
| Cross-reference link pattern | `[term](../_glossary-macos.md#anchor)`, `[runbook](l1-runbooks/NN.md)` | Relative paths with fragment anchors | Convention established across 116 files [VERIFIED: 76 references across 29 files via grep] |
| Version History table | 1-line per change; date + description + author | Change log at bottom of every MD file | Phase 19-30 D-25/D-40 precedent; every touched file gets a Phase 32 entry [VERIFIED: docs/_glossary-macos.md:68-72] |
| Platform-coverage blockquote | Preamble at top of shared files (line 9-10) | Single canonical phrase for supported platforms | D-41 locks suffix pattern "...and iOS/iPadOS" [CITED: Phase 32 CONTEXT D-41] |

### Supporting (Project-Specific Patterns)

| Artifact | Path | Purpose | When to Use |
|----------|------|---------|-------------|
| Cross-ref banner one-liner | `> **Platform:** For Platform, see [link](file.md).` | Route to sibling-platform equivalent | In shared Windows/macOS sections that have iOS equivalent [VERIFIED: docs/common-issues.md:33, :49, :144] |
| Platform selector | Anchor-link list at top of shared files | Direct-to-section navigation | `index.md:17-20`, `common-issues.md:14-17` precedent [VERIFIED] |
| Research-flag footnote | `*(Verify paths per Phase 30 D-32 research flag.)*` inline callout | Mark UI-path / trigger-combo content as needing verification | Used in quick-ref-l2 D-31 and D-32 [CITED: Phase 32 CONTEXT D-32] |
| 🔒 Supervised-only callout | `🔒 supervised-only` parenthetical | Mark capability rows requiring supervision | Phase 27 D-04 established pattern [CITED: Phase 27 CONTEXT.md] |
| Advisory block for deferred scope | `> **MAM-WE investigation is out of Phase 31 scope — deferred to ADDTS-01...` | Signal deferral to future milestone with issue-ID | Phase 31 D-20/D-21 single-source placement [VERIFIED: docs/l2-runbooks/00-index.md:130] |

### Alternatives Considered

| Instead of | Could Use | Why Rejected |
|------------|-----------|--------------|
| Extend `_glossary-macos.md` | Rename to `_glossary-apple.md` | 76 references across 29 files would break; Phase 26 D-03 canonical_refs line 70 LOCKED filename [VERIFIED: grep count] |
| 5-domain matrix (mirror macOS) | 6-domain matrix adding "Supervision" | Existing Enrollment "Enrollment types" row accommodates supervision; DDM already in Configuration domain [VERIFIED: docs/reference/macos-capability-matrix.md:19, :40] |
| Trilateral W/mac/iOS matrix | Bilateral iOS vs macOS only | SC #3 LITERAL requires "across iOS, macOS, and Windows" |
| Mirror Phase 25 C1 structure | Path-segmented 4-path iOS routing | Phase 25 D-14 section-level-separation LOCKED; path-segmentation is new organizing axis |

**No npm / pip / gem installation** — documentation-only phase.

**Version verification:** N/A (no packages). Content-verification instead per §Open Questions.

## Architecture Patterns

### System Architecture Diagram

```
USER
  │
  ├──(arrives at)──> docs/index.md (hub) ──┬──> "Choose Your Platform" selector
  │                                         │        ├──> #windows-autopilot
  │                                         │        ├──> #macos-provisioning
  │                                         │        └──> #iosipados-provisioning  [NEW]
  │                                         │
  │                                         └──> Cross-Platform References table
  │                                                 ├──> [iOS Enrollment Path Overview]  [NEW]
  │                                                 └──> [iOS Capability Matrix]         [NEW]
  │
  ├──(arrives at)──> docs/common-issues.md (symptom router) ──┬──> platform selector [UPDATED]
  │                                                           ├──> Windows section (banners → iOS) [UPDATED]
  │                                                           ├──> macOS section (no change)
  │                                                           └──> iOS/iPadOS Failure Scenarios [NEW]
  │                                                                   ├──> symptom 1-6 → L1 runbooks 16-21
  │                                                                   └──> MAM-WE advisory → admin-setup-ios/09
  │
  ├──(arrives at)──> docs/quick-ref-l1.md ──┬──> APv1 Top Checks (unchanged)
  │                                          ├──> APv2 section (unchanged)
  │                                          ├──> macOS section (unchanged)
  │                                          └──> iOS/iPadOS Quick Reference [NEW]
  │                                                  └──> decision tree + runbooks 16-21
  │
  ├──(arrives at)──> docs/quick-ref-l2.md ──┬──> APv1/APv2/macOS sections (unchanged)
  │                                          └──> iOS/iPadOS Quick Reference [NEW]
  │                                                  ├──> "no CLI" callout
  │                                                  ├──> 3-method diagnostic table
  │                                                  ├──> Intune portal paths table
  │                                                  ├──> Sysdiagnose trigger table
  │                                                  └──> runbooks 14-17
  │
  ├──(arrives at)──> docs/reference/00-index.md ──┬──> Existing sections (unchanged)
  │                                                ├──> macOS References section (unchanged)
  │                                                └──> iOS References section [NEW]
  │                                                        └──> [ios-capability-matrix.md]
  │
  └──(arrives at)──> docs/_glossary-macos.md ──┬──> Alphabetical Index [EXPANDED 6→11]
                                                ├──> Enrollment H2 (ADE/Await/Setup Assistant) + Supervision [NEW] + Account-Driven UE [NEW]
                                                ├──> Device Management H2 (ABM/ABM Token) + APNs [NEW] + Jailbreak Detection [NEW]
                                                ├──> App Distribution H2 (VPP updated with iOS content) [UPDATED]
                                                ├──> App Protection (MAM) H2 [NEW H2]
                                                │       └──> MAM-WE [NEW term]
                                                └──> Version History entry [NEW]

NEW FILE: docs/reference/ios-capability-matrix.md
  ├──> Apple-parity framing preamble (2-4 sentences)
  ├──> 5-domain tables: Enrollment / Configuration / App Deployment / Compliance / Software Updates
  ├──> Key Gaps Summary (7-10 numbered gaps)
  └──> See Also footer

PLACEHOLDER RETROFIT: docs/decision-trees/07-ios-triage.md:99
  └──> rewrite "iOS glossary additions in Phase 32 NAV-01" → concrete link with term list
```

### Component Responsibilities

| File (Artifact) | Role | Phase 32 Edit Type | Lines Touched (Estimate) |
|-----------------|------|--------------------|--------------------------|
| `docs/_glossary-macos.md` | Shared Apple glossary | Additive: 5 new terms + 1 updated (VPP) + new H2 + index update + frontmatter bump | +60-80 lines |
| `docs/common-issues.md` | Symptom-based router | Additive: new H2 section + platform selector entry + 3 Windows banners + blockquote update + frontmatter bump | +50-70 lines |
| `docs/index.md` | Docs hub | Additive: new H2 + 2 Cross-Platform References rows + blockquote update + frontmatter bump | +30-40 lines |
| `docs/quick-ref-l1.md` | L1 cheat sheet | Additive: new H2 at bottom + blockquote update + frontmatter bump | +30 lines |
| `docs/quick-ref-l2.md` | L2 cheat sheet | Additive: new H2 at bottom (with 3 embedded tables) + blockquote update + frontmatter bump | +45-55 lines |
| `docs/reference/00-index.md` | Reference index | Additive: new "iOS References" H2 + frontmatter bump | +5-8 lines |
| `docs/decision-trees/07-ios-triage.md` | iOS L1 triage | Single-line placeholder retrofit at line 99 + frontmatter bump + Version History entry | +3 lines (rewrite 1) |
| `docs/reference/ios-capability-matrix.md` | NEW: trilateral capability matrix | Create from structural clone of macos-capability-matrix.md | 100-130 lines total |

### Pattern 1: Hybrid common-issues.md (Phase 25 D-01/D-02 verbatim)

**What:** New `## iOS/iPadOS Failure Scenarios` H2 at bottom with symptom categories + bidirectional cross-ref banners in shared Windows symptom sections.

**When to use:** When adding a third platform section to a symptom-based router that already has Windows + macOS.

**Example (structural template from existing macOS section at common-issues.md:152-200):**
```markdown
## iOS/iPadOS Failure Scenarios

> **Windows:** For Windows Autopilot issues, see [Windows Autopilot Issues](#windows-autopilot-issues).
> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Failure Scenarios](#macos-ade-failure-scenarios).

**Platform:** iOS/iPadOS through Microsoft Intune

Symptom-based index routing to the appropriate iOS L1 and L2 runbooks. Start with the [iOS Triage Decision Tree](decision-trees/07-ios-triage.md) to identify the failure scenario.

### iOS: Device Not Appearing in Intune        <!-- disambiguated anchor per §Common Pitfalls -->

iOS/iPadOS device not visible in Intune admin center after enrollment attempt. Could be caused by: APNs certificate expired, ADE enrollment not starting, license invalid, or device cap reached — see triage tree for disambiguation.

- **L1:** [APNs Expired](l1-runbooks/16-ios-apns-expired.md) | [ADE Not Starting](l1-runbooks/17-ios-ade-not-starting.md) | [License Invalid](l1-runbooks/19-ios-license-invalid.md)
- **L2:** [iOS Log Collection](l2-runbooks/14-ios-log-collection.md) + [ADE Token & Profile Investigation](l2-runbooks/15-ios-ade-token-profile.md)

<!-- ... 5 more symptom categories ... -->

### App Protection Policies Not Applying (MAM-WE)

> **Advisory:** MAM-WE-specific L1/L2 runbooks are deferred to **ADDTS-01** future milestone. For the configuration guide, see [MAM-WE App Protection Policies](admin-setup-ios/09-mam-app-protection.md).
```
Source: `docs/common-issues.md:152-201` (macOS section structural template); Phase 25 D-01/D-02; Phase 32 D-21/D-22.

### Pattern 2: Trilateral Capability Matrix (A1 winner + A4 framing, D-01 through D-10)

**What:** Structural clone of `macos-capability-matrix.md` with third column (iOS) added to each 2-column macOS table, plus iOS-specific rows per D-05, plus Apple-parity framing preamble per D-06.

**When to use:** When creating a cross-platform feature comparison document — the capability matrix pattern is the canonical project artifact for this purpose.

**Example (structural template from docs/reference/macos-capability-matrix.md:13-26):**
```markdown
# iOS/iPadOS: Intune Capability Matrix — Windows, macOS, iOS

This matrix compares Intune management capabilities across three platforms. Apple-platform readers will find the iOS↔macOS comparison surfaces the most meaningful differences (e.g., DDM maturity, supervision model, VPP licensing). Windows readers should treat iOS and macOS as structurally distinct from Windows despite being managed via the same Intune tenant. For the Windows↔macOS-only view, see the [macOS Capability Matrix](macos-capability-matrix.md). For concept-level terminology comparison, see [Windows vs macOS Concept Comparison](../windows-vs-macos.md).

## Enrollment

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with/without user affinity | ADE (user affinity / userless), Device Enrollment (Company Portal / web-based), Account-Driven User Enrollment (BYOD), MAM-WE (app-layer only) |
| Supervision state | N/A | Supervised via ADE | Supervised (ADE) / Unsupervised (Device Enrollment, User Enrollment) |
| Supervised-only capability gates | N/A | Limited | Extensive — silent app install, home screen layout, restrictions, DDM app install |
| Account-Driven User Enrollment | No | No | Yes (iOS 15+, privacy-preserving BYOD — see [Glossary: Account-Driven UE](../_glossary-macos.md#account-driven-user-enrollment)) |
| MAM-WE availability (app-layer) | Similar (App Protection Policies) | No | Yes (app-layer, no device enrollment) |
<!-- ... remaining D-05 rows ... -->

## Configuration

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Declarative Device Management (DDM) | No | Yes (macOS 14+) | Yes (iOS 17+, managed software update works on supervised AND unsupervised per Microsoft Learn) |
| Silent app install | N/A | Yes | Yes (🔒 supervised ADE only for App Store VPP; unsupervised prompts user) |
<!-- ... -->
```

Source: `docs/reference/macos-capability-matrix.md:13-26` (structural template); Phase 32 D-01/D-05/D-06; Microsoft Learn iOS DDM docs [CITED: https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-ios].

### Pattern 3: Append-to-bottom Platform Section (Phase 25 D-07/D-08)

**What:** iOS section APPENDED after macOS section at bottom of quick-ref files. No reordering; no structural rewrites.

**When to use:** Adding a new platform to a shared cheat-sheet file. Always append; never insert between existing sections.

**Example (structural template from docs/quick-ref-l1.md:83-113):**
```markdown
---

## iOS/iPadOS Quick Reference

**Platform:** iOS/iPadOS through Microsoft Intune

### Top Checks

1. **Device in ABM?** (ADE path) OR **User licensed for Intune?** (BYOD path) — ABM [business.apple.com] > Devices | Entra admin center > Users > [user] > Licenses
2. **Device in Intune?** — Intune admin center > Devices > iOS/iPadOS — search by serial
3. **Enrollment profile assigned?** (ADE path) — Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Profiles
4. **Compliance state?** — Intune admin center > Devices > [device] > Device compliance

### iOS Escalation Triggers
<!-- 3-5 bullets matching macOS L1 escalation format -->

### iOS Decision Tree
- [iOS Triage](decision-trees/07-ios-triage.md) -- start here for iOS/iPadOS failures

### iOS Runbooks
- [iOS APNs Certificate Expired](l1-runbooks/16-ios-apns-expired.md)
<!-- ... 5 more ... -->
```
Source: Phase 25 D-07/D-08; Phase 32 D-29/D-30.

### Pattern 4: Research-Flag Footnote (Phase 32 D-32)

**What:** Inline callout referencing parent research flag after any portal-path or sysdiagnose-trigger content.

**When to use:** In `quick-ref-l2.md` iOS section and anywhere else portal UI strings appear that may rot between releases.

**Example:**
```markdown
| Path | Purpose |
|------|---------|
| Devices > Enrollment > Apple > Enrollment program tokens | ABM token sync status, enrollment profile assignment |

*(Verify paths per Phase 30 D-32 research flag — Microsoft Learn 2026-04 confirms current; re-verify before content lock-in.)*
```

### Anti-Patterns to Avoid

- **Full file rewrites** — D-39 forbids. macOS sections stay byte-identical; iOS is injected additively.
- **Embedding iOS decision logic in Windows Mermaid graph** — Phase 30 D-05 forbade for `00-initial-triage.md`; same principle applies to any Windows-scoped content.
- **Anchor reuse** — GitHub auto-generates anchors from headings; two `### Device Not Appearing in Intune` H3s in the same file produce `#device-not-appearing-in-intune` and `#device-not-appearing-in-intune-1`. Relying on auto-suffix is fragile; prefer explicit `### iOS: Device Not Appearing in Intune` → `#ios-device-not-appearing-in-intune`. See §Common Pitfalls.
- **Placing MAM-WE under Enrollment H2 in glossary** — directly contradicts Phase 26 D-03 locked separation. D-13 mandates NEW "App Protection (MAM)" H2.
- **Adding DDM, ACME, Managed Apple ID, DEP, Company Portal terms to glossary** — D-12 locks the 6-term scope. Every additional term triggers B4 scope-creep rejection.
- **Renaming `_glossary-macos.md`** — D-11 locked. 76 references across 29 files would break.
- **Putting portal path strings in the glossary** — portal paths are quick-ref content; glossary is terminology. Mixing tiers inflates both files and creates update friction.
- **Writing an opening narrative longer than 2-4 sentences in the capability matrix** — D-06 + project convention (macOS matrix has a single sentence). Matrix is a scannable comparison, not a narrative.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| "Unique iOS navigation pattern" | Novel structural organization for common-issues / index / quick-refs | Phase 25 D-01/D-07/D-08/D-14 patterns verbatim | Adversarial review already ruled these the lowest-flaw winner in Phase 25. Phase 32 D-20/D-29 adopt them explicitly. Inventing a new structure re-runs the review from scratch. |
| Inventing capability matrix structure | Novel table columns / domain categories | Clone `macos-capability-matrix.md` structurally + add column + add iOS rows | Existing matrix is 101 lines, proven, reader-familiar. D-03/D-10 lock the structure. |
| New "iOS-specific" glossary file | `_glossary-ios.md` | Extend `_glossary-macos.md` | Phase 26 canonical_refs line 70 LOCKED. Also: split glossaries create lookup friction for shared terms (VPP, ABM). |
| New symptom-naming axis | Cause-based names ("APNs expired", "License invalid") | Symptom-descriptive names ("Device Not Appearing") | F-C1-01 CONFIRMED real issue — macOS section uses symptom-names; matching maintains cognitive consistency. D-22 mandates symptom names. |
| Novel MAM-WE handling | Treating MAM-WE as a symptom route with L1 runbook link | Advisory block linking to admin-setup-ios/09 + ADDTS-01 defer note | Phase 30 D-31 defers MAM-WE L1. No runbook exists. Routing to a nonexistent runbook creates dead-end links; advisory block surfaces the status. |
| Hand-maintained cross-platform facts | Separate per-platform prose paragraphs describing the same capability | Single row in capability matrix with 3 cells | Matrix format deduplicates. Prose duplication across 3 platforms triples maintenance burden. |
| Hand-coded anchor links | Typing `#device-not-appearing-in-intune-1` hoping GitHub auto-generates the `-1` suffix | Explicit `### iOS: Device Not Appearing in Intune` → `#ios-device-not-appearing-in-intune` | Auto-suffix behavior depends on H2/H3 context ordering and is brittle across Markdown renderers. Explicit prefix matches project's `16-ios-*` filename convention. |
| Ad-hoc placeholder grep | Eyeballing for `Phase 32` / `NAV-01` references | `grep -rn "Phase 32\|NAV-0[123]" docs/` per D-36 at plan time | Consistent with Phase 30 D-16 and Phase 31 D-22 retrofit enumeration precedent. Verified: 1 match found at context-gather time (`07-ios-triage.md:99`). |

**Key insight:** Phase 32 is a **pattern-reuse phase**, not a pattern-invention phase. Every structural decision was made in earlier phases (20-31). The research's job is to confirm those decisions remain correct and identify execution risks (anchor collisions, dependency gaps, stale UI strings) — not to propose alternatives.

## Runtime State Inventory

Not applicable — Phase 32 is pure documentation. No renames, no refactors, no data migrations. No stored runtime state changes. The placeholder retrofit in `07-ios-triage.md:99` is a single-line string rewrite; no data migration. No OS-registered state, no secrets, no build artifacts, no live service config are affected.

**Verified:** `grep -rn "Phase 32\|NAV-0[123]" docs/` at context-gather time returned exactly 1 match: `docs/decision-trees/07-ios-triage.md:99`. No other placeholders carry a Phase 32 dependency.

## Common Pitfalls

### Pitfall 1: Anchor Collision in common-issues.md

**What goes wrong:** Phase 32 D-22 proposes a symptom category "Device Not Appearing in Intune" for iOS. `common-issues.md:160` ALREADY contains `### Device Not Appearing in Intune` for macOS. Adding the iOS H3 under the same name produces two headings with identical text in one file. GitHub auto-generates the iOS anchor as `#device-not-appearing-in-intune-1` (numeric suffix) — but pre-existing banners at `common-issues.md:33` link to `#device-not-appearing-in-intune` (no suffix) pointing to the macOS section. If iOS is added FIRST in file order, the auto-suffix could flip.

**Why it happens:** GitHub's anchor auto-generation is order-dependent. Two identical H3 texts → first wins the base anchor, second gets `-1`. iOS section is appended at bottom per D-21 → iOS gets `-1`. But if Phase 32 ever re-ordered, anchors would silently break.

**How to avoid:** Use explicit iOS-prefixed H3 text per Claude's discretion note in D-22 ("Option A"): `### iOS: Device Not Appearing in Intune` producing anchor `#ios-device-not-appearing-in-intune`. This matches the L1 runbook filename convention (`16-ios-apns-expired.md`) for cognitive consistency AND eliminates order-dependency. Other potentially-colliding macOS anchors to check: `#configuration-profile-not-applied`, `#compliance-failure-or-access-blocked`, `#app-not-installed`, `#setup-assistant-stuck-or-failed`. [VERIFIED via grep: common-issues.md:160, :174, :188 contain these exact H3s]

**Warning signs:** Post-execution run a `grep -c "#device-not-appearing" docs/*.md` — if >1 match in common-issues.md, investigate. Visually: two H3s with identical text in the ToC.

### Pitfall 2: Phase 30 Wave 3 Dependency Gap

**What goes wrong:** Phase 30's `30-08-SUMMARY.md` claims completion of navigation integration into `00-initial-triage.md` (iOS banner) and `l1-runbooks/00-index.md` (iOS L1 section). Phase 32 D-34 reachability audit assumes these sections already exist. **Verified at research time (2026-04-17):** `git log -- docs/decision-trees/00-initial-triage.md docs/l1-runbooks/00-index.md` shows NO commit touching either file since Phase 24; `grep -n iOS docs/decision-trees/00-initial-triage.md` returns 0 matches; `grep -n "iOS L1" docs/l1-runbooks/00-index.md` returns 0 matches. The 30-08 claimed-completion commits (3d21436, 90ea48e per SUMMARY) may not actually be in the working tree.

**Why it happens:** Phase 30 is marked "7/10 plans executed" in ROADMAP.md line 145; 30-08, 30-09, 30-10 are listed as "[ ]" (not started). The SUMMARY file exists as a pre-commit artifact.

**How to avoid:** Planner MUST run at plan time:
```bash
grep -n "iOS" docs/decision-trees/00-initial-triage.md docs/l1-runbooks/00-index.md
```
If no iOS content exists, Phase 32 either (a) waits for Phase 30 Wave 3 completion, OR (b) inherits Phase 30 Wave 3 scope into Phase 32 (not recommended — scope expansion), OR (c) explicitly notes that the reachability audit measured against the POST-Phase-30-30-08 state.

**Warning signs:** Reachability audit for iOS L1 runbooks finds no path from `l1-runbooks/00-index.md` → `16-ios-apns-expired.md` because the iOS L1 section doesn't exist yet.

### Pitfall 3: Portal-path staleness in quick-ref-l2

**What goes wrong:** D-31 specifies Intune portal paths like "Devices > Enrollment > Apple > MDM Push Certificate" and "Devices > [device] > Download diagnostics". The Intune admin center UI has been reorganized multiple times in 2025-2026 and these exact strings may no longer match the current UI.

**Why it happens:** Microsoft rebrands / reorganizes Intune admin center navigation without deprecation notice. The text strings in docs become stale between Phase 32 ship and the next admin usage. Research flags Phase 30 D-32 and Phase 31 D-31 were already raised for this exact reason.

**How to avoid:** Every portal-path string in `quick-ref-l2.md` iOS section gets an inline research-flag footnote per D-32. Planner MUST verify against Microsoft Learn at plan-time before content lock-in. Research-time verification (2026-04-17) confirms current paths match D-31 spec [CITED: learn.microsoft.com/en-us/intune/device-enrollment/apple/create-mdm-push-certificate — "Devices > Enrollment, select the Apple tab, then select the Apple MDM Push Certificate"; also alternate path "Devices > iOS/iPadOS > Enrollment > Apple MDM Push Certificate"]; collect-diagnostics path confirmed [CITED: learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics — "Devices > All devices > select device > Collect diagnostics"].

**Warning signs:** Reader reports "I can't find this path in the portal." Watch for Intune UI reorganization announcements in Microsoft Community Hub posts.

### Pitfall 4: VPP / Silent Install Supervision Gate Misdescription

**What goes wrong:** D-05 "Silent app install: iOS Yes (🔒 supervised ADE only)" is only partially accurate. **Research-time finding (2026-04-17):** VPP device-licensed apps install silently on supervised devices. On unsupervised devices, user confirmation is required for each app. Additionally, DDM-enforced managed software updates on iOS 17+ do NOT require supervision — this is distinct from app install [CITED: learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-ios — "Support for Device Enrollment and Automated Device Enrollment; requires no supervision"]. The capability matrix must avoid collapsing "supervised-only silent install" (app deployment) with "DDM enforcement" (software updates) into a single supervision rule.

**Why it happens:** Apple changed DDM supervision requirements in iOS 17. Pre-iOS-17 guidance treated all supervised-only capability uniformly. Current state has DDM software updates as a non-supervised capability while app silent install remains supervised-only.

**How to avoid:** In the capability matrix (D-05):
- App Deployment domain row: "Silent app install (VPP device-licensed): iOS Yes (🔒 supervised ADE only)"
- Configuration domain row: "Managed Software Update via DDM: iOS Yes (iOS 17+, works on supervised AND unsupervised devices)"
- Do NOT conflate into a generic "supervised-only" capability row.

**Warning signs:** A capability matrix row says "silent install" without qualifying what's being installed (app vs OS update). Readers who apply the supervision rule to DDM software updates will misconfigure their tenant.

### Pitfall 5: Sysdiagnose Trigger Table Complexity

**What goes wrong:** D-31 quick-ref-l2 sysdiagnose trigger table lists 3 device classes (iPhone 8+/SE/iPad-Touch-ID vs iPhone X+ vs iPad-Face-ID) with distinct trigger combinations. **Research-time finding (2026-04-17):** Apple Developer documentation and current community guidance indicate a simpler canonical trigger — "both volume buttons + Side (or Top) button, press and release in 250ms" — works across all modern iOS devices running iOS 15+ [CITED: developer.apple.com/forums/thread/80811; support.addigy.com/hc/en-us/articles/15849050849427]. The per-device-type split is accurate for older devices (iPhone 8 era) but the modern unified combo simplifies L2 guidance.

**Why it happens:** The per-device-type table reflects older hardware-configuration differences (some devices had Home button + Sleep/Wake + Volume variants). Apple has standardized the trigger in iOS 15+.

**How to avoid:** Planner decides at plan time:
- Option A: Keep D-31 per-device-type table for completeness (caveats older devices) + add a "Modern iOS 15+ unified combo" top row.
- Option B: Replace per-device-type table with single unified combo row + caveat for pre-iOS-15 devices.

Do NOT silently ship the old per-device-type-only table as if it's the authoritative current guidance. Planner confirms which option aligns with the fleet age distribution (per STATE.md iOS 15+ baseline? Phase 31 research flag applies).

**Warning signs:** L2 engineer tries the "iPad Face ID" combo on an iPhone and it doesn't fire. User reports "held the buttons per the docs, nothing happened."

### Pitfall 6: Glossary MAM-WE Placement Under Enrollment

**What goes wrong:** B1 original proposal placed MAM-WE under Enrollment H2. F-B1-04 flagged this as contradicting Phase 26 D-03 ("MAM-WE is app-layer model with no device enrollment"). Placing the glossary entry under Enrollment misleads readers into thinking MAM-WE is an enrollment path.

**Why it happens:** "MAM" often clusters with enrollment concepts conversationally. But in this project's taxonomy, MAM-WE is explicitly separated from MDM paths.

**How to avoid:** Phase 32 D-13 creates a NEW `## App Protection (MAM)` H2 specifically for MAM-WE. Do NOT merge into Enrollment.

**Warning signs:** MAM-WE glossary entry immediately follows ADE or Setup Assistant entries in the Alphabetical Index's first section.

## Code Examples

### Example 1: Glossary Term Entry (template for 5 new + 1 updated entry)

```markdown
### Supervision

Apple's formal management designation for organization-owned iOS/iPadOS devices enrolled through [ADE](#ade) (Automated Device Enrollment) via Apple Business Manager. Supervision is set at enrollment time and cannot be added retroactively without a full device erase. Supervised devices unlock capabilities unavailable on unsupervised devices — silent app install (VPP device-licensed), home screen layout control, extensive restriction profiles, and DDM-enforced app management. Verification: Settings > General > About shows "This iPhone is supervised and managed by [organization]."

> **Windows equivalent:** No direct equivalent in Autopilot. The closest parallel is Autopilot pre-provisioning (device enters with administrative context), though Autopilot does not have a persistent "supervised state" that gates capability subsets post-enrollment. For macOS, supervision is also set via ADE but does not gate as many capabilities as iOS supervision.
```

Source: Combination of Phase 26 D-06 supervision definition; Apple Support "If you have a supervised iPhone, iPad, Mac, or Apple Vision Pro" [CITED: support.apple.com/en-us/102291]; Hexnode supervision comparison [CITED: hexnode.com/mobile-device-management/help/supervised-ios-device-differ-non-supervised-ios-device/]; D-15 Windows-equivalent blockquote pattern.

### Example 2: VPP Entry Update (D-13 update target at line 60)

```markdown
### VPP

Volume Purchase Program -- Apple's bulk app licensing mechanism, now branded as "Apps and Books" within Apple Business Manager. Licenses are purchased in ABM and synced to Intune via a location token. Applies to all Apple platforms (iOS, iPadOS, macOS, tvOS).

**Licensing models:**
- **Device-licensed:** License pinned to device serial. Enables silent install on supervised iOS/iPadOS devices (no Apple ID sign-in required). Preferred for corporate-owned supervised deployments.
- **User-licensed:** License pinned to Apple ID. Requires user sign-in on the device. Used in 1:1 education and personal-device scenarios.

Silent app install on iOS/iPadOS requires BOTH (a) VPP device-licensed assignment AND (b) device supervision (ADE). On unsupervised devices, each VPP app prompts the user for confirmation.

Cross-links: [iOS App Deployment Guide](admin-setup-ios/05-app-deployment.md) | [macOS App Deployment Guide](admin-setup-macos/04-app-deployment.md)

> **Windows equivalent:** Microsoft Store for Business (deprecated) and Intune app deployment. Windows uses Win32 app packaging (.intunewin), MSI, MSIX, and Microsoft Store apps. The VPP/Apps and Books licensing model has no direct Windows equivalent.
```

Source: Current entry at `docs/_glossary-macos.md:60-64` (baseline); D-13 iOS update requirements; VPP research verification [CITED: simplemdm.com/blog/apple-vpp-explained/ device-licensed vs user-licensed; simplemdm.com/blog/install-apps-silently/ supervised silent install]; D-15 Windows-equivalent blockquote preserved.

### Example 3: Capability Matrix Domain Table (D-05 iOS-specific rows)

```markdown
## Enrollment

| Feature | Windows | macOS | iOS |
|---------|---------|-------|-----|
| Zero-touch enrollment method | Autopilot (hardware hash to Intune) | ADE via ABM (serial number to ABM) | ADE via ABM (serial number to ABM) |
| Hardware identity | 4KB hardware hash | Serial number | Serial number |
| Enrollment types | User-driven, Pre-provisioning, Self-deploying, Hybrid Entra join | ADE with user affinity, ADE without user affinity | ADE (user affinity / userless), Device Enrollment (Company Portal / web-based, personal/corporate without ABM), [Account-Driven User Enrollment](../_glossary-macos.md#account-driven-user-enrollment) (BYOD, iOS 15+), [MAM-WE](../_glossary-macos.md#mam-we) (app-layer, no device enrollment) |
| Supervision state | N/A | Supervised via ADE | Supervised (ADE) / Unsupervised (Device Enrollment, User Enrollment) |
| Supervised-only capability gates | N/A | Limited (select configuration) | Extensive — silent app install (VPP device-licensed), home screen layout, restrictions, DDM app install |
| Pre-provisioning (White Glove) | Yes (APv1 only) | No | No |
| Hybrid domain join | Yes (APv1 + Intune Connector) | No | No |
| Await Configuration / ESP equivalent | ESP (device phase + user phase, itemized) | Await Configuration (single lock, generic progress) | Setup Assistant waits (no ESP-equivalent; DDM status channel provides post-enrollment progress on iOS 17+) |
| ABM token shared with macOS | N/A | Yes | Yes (same ABM token covers iOS, iPadOS, macOS, tvOS enrollment) |
| Dynamic enrollment groups | Yes (ZTDId attribute) | Yes (enrollmentProfileName attribute) | Yes (enrollmentProfileName attribute) |
```

Source: `docs/reference/macos-capability-matrix.md:13-26` baseline structure; D-05 iOS-specific row additions; Microsoft Learn account-driven UE [CITED: learn.microsoft.com/en-us/intune/intune-service/enrollment/apple-account-driven-user-enrollment]; Apple supervision docs [CITED: support.apple.com/en-us/102291].

### Example 4: Placeholder Retrofit (D-35 target)

**Current state** (`docs/decision-trees/07-ios-triage.md:99`):
```markdown
- [Apple Provisioning Glossary](../_glossary-macos.md) -- Shared Apple terminology (iOS glossary additions in Phase 32 NAV-01)
```

**Phase 32 rewrite:**
```markdown
- [Apple Provisioning Glossary](../_glossary-macos.md) -- Shared Apple terminology covering iOS/iPadOS ([supervision](../_glossary-macos.md#supervision), [MAM-WE](../_glossary-macos.md#mam-we), [APNs](../_glossary-macos.md#apns), [account-driven user enrollment](../_glossary-macos.md#account-driven-user-enrollment), [jailbreak detection](../_glossary-macos.md#jailbreak-detection)) and macOS ([ABM](../_glossary-macos.md#abm), [ADE](../_glossary-macos.md#ade), [VPP](../_glossary-macos.md#vpp), [Await Configuration](../_glossary-macos.md#await-configuration), [Setup Assistant](../_glossary-macos.md#setup-assistant))
```

Source: D-35 verbatim.

### Example 5: Version History Entry (D-40 pattern, applied to each touched file)

```markdown
| 2026-04-XX | Phase 32: added iOS/iPadOS navigation integration | -- |
```
Source: D-40 template; matches pattern at `docs/_glossary-macos.md:72` and `docs/common-issues.md:206`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact on Phase 32 |
|--------------|------------------|--------------|--------------------|
| Per-device-type sysdiagnose trigger tables | Unified iOS 15+ trigger (both volume + Side/Top, 250ms) | iOS 15 (2021) | D-31 sysdiagnose table may benefit from "modern unified" row + legacy-device caveat (§Pitfall 5) |
| DDM supervised-only | iOS 17+ DDM Managed Software Update works on unsupervised devices too | iOS 17 (2023) | D-05 capability matrix must distinguish "DDM software updates (unsupervised OK)" from "silent app install (supervised only)" (§Pitfall 4) |
| Profile-based User Enrollment | Account-driven User Enrollment (iOS 15+, required for new enrollments) | iOS 15 (profile variant deprecated in iOS 18) | D-13 glossary entry uses account-driven only; Phase 26 STATE.md confirms [CITED: Apple Support account-driven-enrollment-methods] |
| VPP as standalone portal | "Apps and Books" in ABM | Circa 2019-2020 | D-13 VPP entry must note "now branded as Apps and Books in ABM" |
| Microsoft Store for Business | Deprecated; use Intune app deployment + Win32 packaging | 2023 | Existing VPP entry already notes this correctly; no Phase 32 change needed |
| Legacy MDM software update commands (iOS) | DDM-based managed software update | Apple deprecated legacy; full removal in 2026 OS release per Microsoft Learn | D-05 Software Updates domain must reflect DDM-first posture for iOS 17+ |

**Deprecated/outdated (do not reference as current):**
- Profile-based User Enrollment (deprecated iOS 18) — glossary entry should mention for historical clarity but point to account-driven as current
- DEP (Device Enrollment Program) terminology — existing `_glossary-macos.md:24` ADE entry already notes "formerly known as DEP"; do NOT add as separate glossary term (D-19 rejects)
- "MDM Push Certificate" vs "APNs Certificate" — Microsoft/Apple both use both names; D-13 APNs entry should use "APNs Certificate (Microsoft also calls it 'MDM Push Certificate')" pattern for reader clarity

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 30 Wave 3 (30-08, 30-09, 30-10) is NOT yet shipped despite SUMMARY.md existence; Phase 32 baseline state must be verified at plan time | §Common Pitfalls Pitfall 2 | [ASSUMED] — based on `git log` showing no commits to affected files + ROADMAP.md 30-08 marked `[ ]`. Planner must re-verify at plan time with fresh `grep -n iOS` on both files. If 30-08 was shipped out-of-band after context-gather, some Phase 32 reachability-audit work is unnecessary. |
| A2 | Anchor auto-suffix disambiguation behavior (GitHub `-1` pattern) is order-dependent | §Common Pitfalls Pitfall 1 | [ASSUMED] based on general GitHub Markdown conventions. Explicit `ios-` prefix sidesteps this entirely; recommendation stands regardless of exact auto-suffix semantics. |
| A3 | Claude's Discretion — L1 Escalation Triggers count in quick-ref-l1 iOS section | §User Constraints | [ASSUMED] 3-5 range aligns with macOS L1 precedent (currently 5 triggers at quick-ref-l1.md:96-100); planner may increase for coverage or keep at 5 for scannability. |
| A4 | Modern unified sysdiagnose trigger "both volume + Side/Top" works on all iOS 15+ devices | §Pitfall 5 / §State of the Art | [CITED: developer.apple.com/forums/thread/80811; addigy support article] but cross-verified with CONTEXT.md D-31 per-device-type table which may describe older devices. Planner confirms at plan time which era of devices to guide for. |
| A5 | Intune admin center navigation paths in D-31 Key Intune Portal Paths table match current UI | §Pitfall 3 | [CITED: Microsoft Learn — paths verified 2026-04-17] but Microsoft reserves the right to reorganize. Research-flag footnote per D-32 is the mitigation; plan-time re-verification required. |
| A6 | The D-05 iOS-specific capability-matrix rows accurately describe current Apple + Microsoft behavior | §Pitfall 4 / §Code Examples | [MIXED: VERIFIED for DDM scope, VPP licensing, account-driven UE, supervision axis; ASSUMED for exhaustiveness — full row-by-row verification is a plan-phase activity]. Risk: a reader applies a row's rule and it doesn't match current tenant behavior. |
| A7 | 76 glossary file references across 29 files is the current count | §Standard Stack Alternatives | [VERIFIED via grep 2026-04-17]. If new files reference the glossary between research and execution, count may rise; no impact on D-11 decision (rename remains disqualified at any count >0 given SC #4). |
| A8 | The capability matrix See Also footer should link to `windows-vs-macos.md` | §Code Examples | [ASSUMED] based on macos-capability-matrix.md:92 precedent. Claude's discretion at plan time whether to add `windows-vs-macos.md` + the new Apple-parity opening in ios-capability-matrix.md is sufficient. |

## Open Questions

1. **Anchor-collision resolution approach — `-ios-` prefix vs GitHub auto-suffix?**
   - What we know: D-22 calls out both options as Claude's discretion. macOS section uses base anchors (no platform prefix).
   - What's unclear: Whether to uniformly apply `ios-` prefix to all potentially-colliding iOS anchors, or only where collision occurs.
   - Recommendation: Uniformly apply `ios-` prefix to ALL iOS symptom H3s in common-issues.md. Matches L1 runbook filename convention (`16-ios-*.md`). Future-proofs against future H3 additions that could collide. Cost: anchor text is 4 characters longer; cross-references from other docs must use the prefixed anchor. Acceptable.

2. **Capability matrix opening preamble format — paragraph vs callout box?**
   - What we know: D-06 allows 2-4 sentences of Apple-parity framing. macos-capability-matrix.md uses a single intro sentence.
   - What's unclear: Whether a callout blockquote (`> **Apple-platform readers:**...`) vs plain prose paragraph better signals the framing.
   - Recommendation: Plain prose paragraph (2-4 sentences) matching macOS matrix prose style. Blockquote adds visual weight that implies "warning" semantics; Apple-parity is guidance, not warning.

3. **iOS Software Updates domain row count — minimum viable content?**
   - What we know: F-A1-04 flagged Software Updates as potentially sparse for iOS. D-05 lists two rows ("Managed Software Update via DDM (iOS 17+)", "Deferral via Restrictions (legacy)").
   - What's unclear: Whether 2-3 rows is enough or if iOS has additional update-management distinctions (e.g., emergency updates, beta program enrollment, deferral scope).
   - Recommendation: Minimum 3 iOS-bearing rows. Suggested additions beyond D-05: "Update deferral length" (iOS: up to 90 days for major via DDM, per Microsoft Learn), "Update status reporting" (iOS 17+ DDM status channel vs polling on older). Verify at plan time.

4. **Sysdiagnose trigger table — modern unified vs per-device-type?**
   - What we know (verified 2026-04-17): Modern iOS 15+ unified combo is canonical. Per-device-type table describes older hardware. Phase 31 D-30 and Phase 32 CONTEXT D-31 both show per-device-type table.
   - What's unclear: Fleet age. If the tenant has iOS 15+ across the fleet (STATE.md confirms iOS 16+/17+ baseline for Phase 26+ content), modern unified suffices.
   - Recommendation: Planner adds a "Modern iOS 15+ unified combo" top row + keeps per-device-type rows below with "Legacy / pre-iOS 15" caveat. Maximum coverage with clear primary guidance.

5. **Phase 30 Wave 3 completion status — block Phase 32 or proceed?**
   - What we know: 30-08-SUMMARY exists claiming completion; git log shows no commits; files do not contain iOS sections.
   - What's unclear: Whether 30-08 was executed on a branch that wasn't merged, OR SUMMARY was written prematurely.
   - Recommendation: Planner MUST verify baseline state at plan time via `git log` + `grep`. If 30-08 incomplete, Phase 32 cannot inject into `00-initial-triage.md` or `l1-runbooks/00-index.md` without assuming content that doesn't exist. Either (a) escalate to user, (b) schedule 30-08 execution first, OR (c) explicitly scope Phase 32 to NOT touch those files and rely on Phase 30 for iOS visibility in those navigation entry points. Note: Phase 32 D-34 reachability audit includes these as expected reachability sources — if missing, audit fails.

6. **Key Gaps Summary enumeration — which 7-10 gaps?**
   - What we know: D-07 mandates 7-10 gaps mirroring macos-capability-matrix.md:79-88 which lists 7. 32-CONTEXT D-07 example list provides 5 candidate gaps.
   - What's unclear: Final selection and ordering.
   - Recommendation: At plan time, select 7-8 gaps emphasizing:
     1. No CLI diagnostic access (vs Windows mdmdiagnosticstool.exe + macOS Terminal)
     2. Supervision state gates significant capability subset (no retroactive supervision without wipe)
     3. No hybrid domain join (N/A for iOS)
     4. No registry/plist-equivalent admin inspection
     5. No pre-provisioning/White Glove equivalent
     6. Jailbreak detection is iOS-only (unique compliance surface)
     7. Single-channel MDM (no IME dual-channel as Windows has, no separate agent as macOS has)
     8. Account-driven User Enrollment — privacy limitations visible to IT

7. **Placeholder discovery scope — only `07-ios-triage.md:99` or more?**
   - What we know: Research-time grep found exactly 1 match.
   - What's unclear: Planner-time grep may catch additions made between research and planning (e.g., if 30-08 ships in the interim and adds Phase 32 placeholders).
   - Recommendation: Planner MUST re-run `grep -rn "Phase 32\|NAV-0[123]" docs/` at plan time per D-36. Expected match count: 1. If more, enumerate and retrofit each per D-35 pattern.

## Environment Availability

Phase 32 is documentation-only with no external dependencies beyond shell utilities available in the project's existing CI environment. All tools listed are standard and present on the development machine.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `git` | Version control, commit pipeline | ✓ | (repo-native) | — |
| `grep` | Placeholder discovery (D-36), anchor-collision detection (§Pitfall 1) | ✓ | (shell-native) | — |
| Markdown rendering | Local preview of edits | ✓ | (editor-provided) | — |
| `node` for `gsd-tools.cjs` commit pipeline | Commit formatting per project convention | ✓ | (project-installed) | — |
| Internet access (Microsoft Learn, Apple Developer) | Plan-time verification of portal paths + sysdiagnose triggers (D-32 research-flag mitigation) | ✓ | — | If offline: accept CONTEXT.md D-31 content as-is and flag for post-merge verification |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None blocking.

## Validation Architecture

Phase 32 is pure documentation with no code execution; the Nyquist validation dimension is served by **link-integrity validation and reachability auditing** rather than unit/integration tests.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Shell + grep (no formal test runner) |
| Config file | None |
| Quick run command | `grep -rnE "\[.*?\]\(([^)]+\.md)(#[^)]+)?\)" docs/ \| awk ...` (see per-test commands below) |
| Full suite command | Composite: markdown link check + anchor resolution + reachability audit + regression check (see §Sampling Rate) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | 6 new glossary entries exist at expected anchors | link-resolution | `grep -E "^### (Supervision\|Account-Driven User Enrollment\|APNs\|Jailbreak Detection\|MAM-WE)" docs/_glossary-macos.md` → expect 5 matches (VPP existing, 5 new) | ❌ Wave 0 (glossary not yet extended) |
| NAV-01 | Alphabetical Index expanded from 6 to 11 entries | content-check | `grep -cE "\[[^]]+\]\(#" docs/_glossary-macos.md \| head -1` → expect ≥11 | ❌ Wave 0 |
| NAV-02 | iOS/iPadOS section in common-issues.md links to L1 runbooks 16-21 | link-resolution | `grep -c "l1-runbooks/1[6-9]\|l1-runbooks/2[01]" docs/common-issues.md` → expect ≥6 | ❌ Wave 0 |
| NAV-02 | iOS section in index.md contains L1/L2/Admin Setup sub-tables | structure-check | `awk '/## iOS\/iPadOS Provisioning/,/^---/' docs/index.md \| grep -c "^### "` → expect 3 | ❌ Wave 0 |
| NAV-02 | iOS quick-ref sections exist at bottom of quick-ref-l1/l2 | anchor-existence | `grep -c "^## iOS/iPadOS Quick Reference" docs/quick-ref-l1.md docs/quick-ref-l2.md` → expect 2 | ❌ Wave 0 |
| NAV-03 | ios-capability-matrix.md exists with 5 domain H2s | file-structure | `grep -c "^## " docs/reference/ios-capability-matrix.md` → expect ≥6 (5 domains + Key Gaps Summary) | ❌ Wave 0 |
| NAV-03 | capability matrix has trilateral column structure | content-check | `awk '/^\| Feature/' docs/reference/ios-capability-matrix.md \| head -1` → expect `| Feature | Windows | macOS | iOS |` | ❌ Wave 0 |
| NAV-03 | Cross-Platform References in index.md links to ios-capability-matrix | link-resolution | `grep -c "reference/ios-capability-matrix.md" docs/index.md` → expect ≥1 | ❌ Wave 0 |
| SC #4 | All pre-existing links remain valid post-edit | regression-check | Markdown link checker (script) — see below | ❌ Wave 0 |
| SC #4 | All iOS files reachable within 2 clicks from index.md | reachability-audit | Manual enumeration per D-34; automatable via graph traversal | ❌ Wave 0 |

### Proposed Wave 0 Validation Harness

Create `.planning/phases/32-navigation-integration-references/validation/` with three check scripts (shell; no external dependencies beyond grep/awk/find):

**1. `link-check.sh`** — validates all `[text](path.md)` and `[text](path.md#anchor)` links in changed files resolve to existing files + existing anchors:
```bash
#!/usr/bin/env bash
# Extract all markdown links from docs/; for each, verify target file exists
# and (if fragment) verify anchor exists in target file.
# Emits broken-link report with line numbers; exit 1 if any broken.
```

**2. `anchor-collision.sh`** — detects duplicate heading texts within single files that would produce ambiguous anchors:
```bash
#!/usr/bin/env bash
# For each docs/*.md, extract H2/H3 headings, count duplicates.
# Specifically flags common-issues.md for the known macOS/iOS collision pattern.
```

**3. `reachability-audit.sh`** — breadth-first traversal from `docs/index.md` emitting per-file depth:
```bash
#!/usr/bin/env bash
# BFS from docs/index.md following markdown links.
# Emit "file | depth | path-taken" for every .md in docs/.
# Expected Phase 32 output: every iOS file has depth ≤2.
```

### Sampling Rate

- **Per task commit:** Single-file link-check (`./validation/link-check.sh <changed-files>`).
- **Per wave merge:** Full-suite triad — link-check (all docs/) + anchor-collision + reachability-audit.
- **Phase gate:** All three scripts pass (exit 0) before `/gsd-verify-work`. Plus manual spot-check: open `docs/index.md` in a rendered Markdown preview, click through to 3 random iOS files, confirm arrives within 2 clicks.

### Wave 0 Gaps

- [ ] `validation/link-check.sh` — markdown link + anchor validity script
- [ ] `validation/anchor-collision.sh` — duplicate heading detection
- [ ] `validation/reachability-audit.sh` — BFS depth-from-index reporter
- [ ] `validation/expected-reachability.txt` — expected per-file depth fixture (25 iOS files + glossary + matrix → all depth ≤2)
- [ ] Framework install: `grep`, `awk`, `find` — already present; no install needed

**Rationale for shell over a JS/Python test framework:** Project has no existing MD test harness. Phase 32 is one-off; introducing a new test framework (e.g., `markdown-link-check` npm package) would be scope creep beyond D-38's additive-only posture. Shell scripts written to `.planning/phases/32.../validation/` are phase-local artifacts, not project tooling.

## Security Domain

Phase 32 is documentation-only with no user input processing, no authentication flows, no data persistence, no cryptography, and no network request construction. Standard ASVS categories do not apply in the operational sense.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A (docs-only) |
| V3 Session Management | no | N/A (docs-only) |
| V4 Access Control | no | N/A (docs-only) |
| V5 Input Validation | no | N/A (docs-only) |
| V6 Cryptography | no | N/A (docs-only; no secrets handled) |
| V10 Malicious Code | no | N/A (docs-only; no code execution) |
| V14 Configuration | partial | Documentation guidance around admin portal paths must not expose tenant-specific identifiers, URLs with IDs, or screenshots containing PII |

### Known Threat Patterns for documentation-navigation phase

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| PII leakage in example portal paths | Information Disclosure | All example Intune paths use generic placeholders like `[token]`, `[device]`, `[user]` — do NOT paste real tenant URLs or serial numbers |
| Stale security guidance | Information Disclosure | Research-flag footnotes per D-32 mark time-sensitive content for re-verification |
| Incorrect supervised-only capability claim | Repudiation (for admins) | D-04 + §Pitfall 4 both require careful row-level verification — a reader who applies an incorrect supervision rule may inadvertently expose a BYOD device to an unsupported management command |
| Secret leakage via example ABM tokens / APNs private keys | Information Disclosure | Glossary entries should NOT include example token formats beyond "server token (.p7m file)"-style shape descriptions (already present at line 52) |

**Phase 32 specific posture:** No new security-sensitive surfaces. The capability matrix and glossary entries discuss security concepts (jailbreak detection, compliance policies, APNs certificate renewal) but do not expose tenant-specific attack surfaces. All portal paths use generic placeholders.

## Project Constraints (from CLAUDE.md)

Extracted directives from `CLAUDE.md` that affect Phase 32 execution:

1. **Three-tier architecture (PowerShell / FastAPI / React)** — Phase 32 is documentation-only. No tier is touched by Phase 32. CONSTRAINT: Phase 32 must not accidentally modify PowerShell modules, backend code, or frontend components.
2. **Microsoft Graph API READ-ONLY scope for DeviceManagementManagedDevices.Read.All** — Phase 32's capability matrix and glossary references to Graph API (e.g., in capability matrix's Apps domain for managed app status, or in glossary VPP cross-links) should note READ-ONLY scope per Phase 31 D-09 precedent. CONSTRAINT: Any Phase 32 guidance mentioning Graph API must not imply write operations.
3. **`.env` / credentials never committed** — Phase 32 has no .env interaction. No risk.
4. **Audit-log-all administrative actions** — Phase 32 does not produce admin actions; it documents them. Existing runbooks (Phase 30-31) already follow this; Phase 32 does not weaken the posture.
5. **Input validation in API endpoints** — Phase 32 is docs-only. Not applicable.
6. **HTTPS in production** — All Phase 32 cross-links are relative file paths; external links (e.g., `business.apple.com`) already use HTTPS. No change.
7. **Project Overview: "Windows Autopilot Troubleshooter"** — the CLAUDE.md Project Overview is Windows-focused from the original v1.0 scope. v1.3 (iOS/iPadOS) is a valid extension per ROADMAP.md and does not contradict CLAUDE.md directives.

**Planner action:** Confirm Phase 32 edits stay within `docs/` tree. No edits to `src/powershell/`, `src/backend/`, `src/frontend/`, `tests/`, `scripts/`, `config/`, `data/`, `logs/` are expected or permitted by the Phase 32 scope.

## Sources

### Primary (HIGH confidence)

**Repository structural precedents (VERIFIED via direct file read):**
- `docs/_glossary-macos.md` (72 lines) — glossary structure + alphabetical index pattern
- `docs/reference/macos-capability-matrix.md` (101 lines) — 5-domain capability-matrix structural template
- `docs/common-issues.md` (210 lines) — hybrid symptom router with existing macOS section at lines 152-201
- `docs/index.md` (156 lines) — hub structure with macOS section at lines 94-126 + Cross-Platform References at lines 131-144
- `docs/quick-ref-l1.md` (122 lines) — macOS section at lines 83-113 (structural template for D-30)
- `docs/quick-ref-l2.md` (186 lines) — macOS section at lines 132-178 (structural template for D-31)
- `docs/reference/00-index.md` (58 lines) — "macOS References" H2 at line 19 (template for new "iOS References" H2)
- `docs/decision-trees/07-ios-triage.md:99` — placeholder target for D-35
- `.planning/phases/25-navigation-integration-polish/25-CONTEXT.md` — Phase 25 D-01/D-02/D-07/D-08/D-11/D-14/D-16 load-bearing for Phase 32 D-20/D-21/D-29/D-30/D-31/D-34
- `.planning/phases/26-ios-ipados-foundation/26-CONTEXT.md` — D-03 (MAM-WE separation), canonical_refs line 70 (glossary extension target)
- `.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md` — D-21 L1 runbook filenames 16-21, D-32 inherited UI research flag
- `.planning/phases/31-ios-l2-investigation/31-CONTEXT.md` — D-01 tiered log flow, D-05 sysdiagnose triggers, D-19 L2 runbook filenames 14-17, D-21 MAM advisory, D-30/D-31 inherited UI research flags

**External authoritative docs (VERIFIED 2026-04-17):**
- Microsoft Learn: [Get an Apple MDM Push certificate for Intune](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/create-mdm-push-certificate) — APNs portal path
- Microsoft Learn: [Collect Diagnostics remote action](https://learn.microsoft.com/en-us/intune/device-management/actions/collect-diagnostics) — MDM diagnostic report path
- Microsoft Learn: [Configure Update Policies for Apple Devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/) — DDM Managed Software Update current state
- Microsoft Learn: [Use Microsoft Intune to manage software updates for supervised iOS/iPadOS devices](https://learn.microsoft.com/en-us/intune/device-updates/apple/software-updates-ios) — supervision boundary for updates
- Microsoft Learn: [Set up account driven Apple User Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/apple-account-driven-user-enrollment) — account-driven UE current recommendation
- Microsoft Learn: [Overview of Apple User Enrollment](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/ios-user-enrollment-supported-actions) — privacy limits
- Microsoft Learn: [Manage Apple Volume-Purchased Apps](https://learn.microsoft.com/en-us/intune/intune-service/apps/vpp-apps-ios) — VPP in Intune
- Microsoft Learn: [iOS/iPadOS device compliance settings](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-ios) — jailbreak detection + compliance posture
- Apple Support: [If you have a supervised iPhone, iPad, Mac, or Apple Vision Pro](https://support.apple.com/en-us/102291) — supervision definition
- Apple Support: [Account-driven enrollment methods with Apple devices](https://support.apple.com/guide/deployment/account-driven-enrollment-methods-dep4d9e9cd26/web) — Apple's current BYOD recommendation
- Apple Developer Forums: [How to trigger a sysdiagnose on iOS](https://developer.apple.com/forums/thread/80811) — sysdiagnose trigger canonical combo

### Secondary (MEDIUM confidence)

- Addigy Support: [Gathering a Sysdiagnose from an iPadOS or iOS device](https://support.addigy.com/hc/en-us/articles/15849050849427-Gathering-a-Sysdiagnose-from-an-iPadOS-or-iOS-device) — cross-verified sysdiagnose trigger detail
- SimpleMDM: [What is the Apple Volume Purchase Program (Apple VPP)?](https://simplemdm.com/blog/apple-vpp-explained/) — device-licensed vs user-licensed distinction
- SimpleMDM: [How to install iOS apps silently](https://simplemdm.com/blog/install-apps-silently/) — supervised silent install mechanics
- Hexnode: [iOS Device Supervision: Core Differences](https://www.hexnode.com/mobile-device-management/help/supervised-ios-device-differ-non-supervised-ios-device/) — supervision capability breakdown
- Microsoft Community Hub: [Intune iOS Jailbreak false positives (Resolved)](https://techcommunity.microsoft.com/discussions/microsoft-intune/intune-ios-jailbreak-false-positives-resolved/2334886) — historical false-positive context
- In Real Life: [macOS & iOS 26 for Enterprise: DDM, Deployment, and the Intel Mac Sunset](https://intuneirl.com/macos-ios-26-for-enterprise-ddm-deployment-and-the-intel-mac-sunset/) — 2026 DDM timeline context

### Tertiary (LOW confidence)

- None marked for validation — all claims in this research are either VERIFIED (direct file read or Microsoft Learn confirmation) or [ASSUMED] with §Assumptions Log entry documenting risk.

## Metadata

**Confidence breakdown:**

- Standard stack (patterns + templates): **HIGH** — all structural precedents exist in the repo and were read directly; Phase 25 precedents are explicit templates.
- Architecture (section placement + wire-up): **HIGH** — D-01 through D-42 map 1:1 to Phase 25 shipped patterns; no novel structural work.
- Common pitfalls: **HIGH** for Pitfall 1 (anchor collision — verified via grep), Pitfall 2 (Phase 30 Wave 3 gap — verified via git log + grep), Pitfall 4 (DDM/VPP supervision distinction — verified against Microsoft Learn). **MEDIUM** for Pitfall 3 (portal-path staleness — research-time verification passes, but Intune UI can change between research and execution) and Pitfall 5 (sysdiagnose triggers — modern unified combo verified against Apple Developer Forums).
- Assumptions (A1-A8): **MIXED** — A1 (Phase 30 Wave 3 status) is the load-bearing assumption; planner must re-verify. A4-A6 involve capability-matrix row accuracy at plan time.
- Open questions: **EXPECTED** for a capstone navigation phase — resolutions are within Claude's Discretion per CONTEXT.md and can be finalized at plan time without user input.
- Validation architecture: **HIGH** — shell-based link/anchor/reachability checks are standard for docs-only phases; no novel tooling required.

**Research date:** 2026-04-17

**Valid until:** 2026-05-17 (30 days — stable internal patterns; portal paths and sysdiagnose triggers are MEDIUM-volatility and may shift within days if Microsoft/Apple release UI changes).

---

## RESEARCH COMPLETE

**Phase:** 32 - navigation-integration-references
**Confidence:** HIGH

### Key Findings

1. **Phase 32 is a pure pattern-reuse phase.** Five of six primary artifacts reuse Phase 25 D-01/D-07/D-08/D-14 patterns verbatim; only the iOS capability matrix is substantive new content (and even that is a structural clone of `macos-capability-matrix.md` with a column + rows added).

2. **Anchor collision is a verified risk in `common-issues.md`.** macOS section already holds `#device-not-appearing-in-intune`, `#configuration-profile-not-applied`, and `#compliance-failure-or-access-blocked`. iOS symptom H3s will collide unless disambiguated with `ios-` prefix. Recommended: uniformly apply `iOS: ` heading prefix → `#ios-...` anchors, matching L1 runbook filename convention.

3. **Phase 30 Wave 3 (30-08, 30-09, 30-10) is NOT shipped despite SUMMARY.md claiming completion.** `git log` shows no commits to `00-initial-triage.md` or `l1-runbooks/00-index.md`; `grep` confirms no iOS content in either file. Phase 32 reachability-audit baseline assumes these files already have iOS sections — planner MUST verify baseline state at plan time and may need to escalate.

4. **DDM supervision rules changed in iOS 17** — DDM-enforced managed software updates work on supervised AND unsupervised devices; silent app install remains supervised-only. D-05 capability matrix rows must avoid conflating these into a generic supervision rule. Research-verified against Microsoft Learn 2026-04-17.

5. **Sysdiagnose trigger has a modern unified combo for iOS 15+** (both volume + Side/Top button, 250ms). CONTEXT.md D-31 per-device-type table describes older hardware and remains technically correct but more complex than modern guidance. Planner decides at plan time whether to prepend a "modern unified" row to the table.

6. **Placeholder scope is narrow.** Only 1 Phase 32 / NAV-0X placeholder exists at context-gather time (`07-ios-triage.md:99`). Per D-36, planner re-runs grep at plan time — expected match: 1.

7. **76 glossary references across 29 files confirm the D-11 rename rejection.** Renaming `_glossary-macos.md` → `_glossary-apple.md` would break 76 cross-references — B3 candidate's rejection is structurally sound; D-11 locks the filename.

### File Created

`.planning/phases/32-navigation-integration-references/32-RESEARCH.md` (this file)

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | Structural precedents exist in repo and were read directly. |
| Architecture Patterns | HIGH | Phase 25 D-01/D-07/D-08/D-14 map 1:1 to Phase 32 D-20/D-29/D-30/D-31. |
| Common Pitfalls | HIGH | Anchor collision and Phase 30 Wave 3 gap verified via grep + git log. Portal-path and sysdiagnose pitfalls verified against Microsoft Learn + Apple Developer Forums 2026-04-17. |
| Validation Architecture | HIGH | Shell-based link/anchor/reachability validation standard for docs phases; no novel tooling. |
| Assumptions (A1-A8) | MIXED | A1 (Phase 30 Wave 3 status) is load-bearing — re-verify at plan time. A4-A6 are plan-time verifiable. |

### Open Questions (summarized; details in §Open Questions)

1. Anchor-collision resolution approach — `ios-` prefix (recommended) vs GitHub auto-suffix (fragile).
2. Capability matrix opening preamble format — paragraph (recommended) vs callout box.
3. iOS Software Updates domain row count — minimum 3 rows recommended.
4. Sysdiagnose trigger table — modern unified + legacy caveat (recommended) vs per-device-type only.
5. **Phase 30 Wave 3 completion status — block Phase 32 or proceed?** (load-bearing; planner must resolve at plan time).
6. Key Gaps Summary enumeration — 7-8 gaps recommended with specific list.
7. Placeholder discovery scope — re-run grep at plan time (expected: 1 match).

### Ready for Planning

Research complete. Planner can now create PLAN.md files against:
- D-42 wave structure (Wave 1: glossary + matrix + placeholder / Wave 2: common-issues + index / Wave 3: quick-refs / Wave 4: audit + validation)
- Validation harness Wave 0 (3 shell scripts + expected-reachability.txt fixture)
- Phase 30 Wave 3 gap resolution (flag A1 assumption at plan time; escalate if baseline state does not match CONTEXT.md expectations)

*Phase: 32-navigation-integration-references*
*Research date: 2026-04-17*
