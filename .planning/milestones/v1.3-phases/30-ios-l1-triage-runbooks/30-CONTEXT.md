# Phase 30: iOS L1 Triage & Runbooks - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 30 delivers L1 Service Desk troubleshooting content for iOS/iPadOS:

1. An iOS triage decision tree at `docs/decision-trees/07-ios-triage.md` routing an L1 agent to the correct runbook or L2 escalation within 5 decision nodes (L1TS-01, SC #1)
2. Six L1 runbooks in `docs/l1-runbooks/` numbered 16-21 with `ios-` prefix (Phase 26 D-17): APNs expired, ADE not starting, enrollment restriction blocking, license invalid, device cap reached, compliance blocked (L1TS-02, SC #3)
3. A banner-only cross-reference injected into `docs/decision-trees/00-initial-triage.md` (SC #2 — "single branch" satisfied via top-of-file banner matching the shipped macOS pattern)
4. An "iOS L1 Runbooks" section added to `docs/l1-runbooks/00-index.md` mirroring the macOS section (lines 36-47 of existing index)
5. Resolution of all 71 "iOS L1 runbooks (Phase 30)" placeholder strings across `docs/admin-setup-ios/01-09.md` Configuration-Caused Failures tables — fulfilling the Phase 28 D-22 / Phase 29 D-13 cross-phase forward-promise

Phase 30 establishes the **sectioned-by-actor** L1 runbook pattern for tenant-config failures where admin action is the primary fix. No L2 content (Phase 31), no glossary additions (Phase 32 NAV-01), no navigation hub updates beyond the 00-index and 00-initial-triage touches (Phase 32 NAV-02), no L2 log collection (Phase 31 L2TS-01).

</domain>

<decisions>
## Implementation Decisions

All five primary decisions were selected via adversarial review (Finder/Adversary/Referee) on 2026-04-17. Finder surfaced 367 points of flaws (11 critical / 44 medium / 37 low); Adversary attempted 6 disproves; Referee ruled all 6 FALSE POSITIVE. Detailed flaw-by-flaw record in `30-DISCUSSION-LOG.md`.

### Triage Tree Root Structure (07-ios-triage.md)

- **D-01:** **Hybrid 2-axis root — visibility gate + symptom fork** mirroring macOS MAC1→MAC2/MAC3 pattern. Axis 1: "Is the device visible in Intune admin center > Devices > iOS/iPadOS?" (yes/no). Axis 2: symptom-disambiguation applied differently per branch.
  - **Not-visible branch** routes to the 5 tenant-config scenarios (APNs expired / ADE not starting / enrollment restriction blocking / license invalid / device cap reached) via a second question (Claude's discretion: typically "What was attempted?" — ADE Setup Assistant vs Company Portal vs web-based vs token-sync)
  - **Visible branch** routes to compliance-blocked + any device-side manifestations (app not available, config not applied) via symptom category
  - **Rationale:** L1 is already assumed to have Intune admin center read access (macOS runbook 10 line 17 is the established precedent). Visibility is the single most information-dense observation an L1 can make. 2-axis design mirrors macOS structure exactly, keeps node budget under SC #1's 5-node cap, and cleanly separates tenant-config failures from device-side failures at the root.
- **D-02:** Triage tree file follows macOS triage pattern structurally (`06-macos-triage.md` is the structural template): Mermaid graph → Routing Verification table → How to Check table → Escalation Data table → Related Resources. Mermaid node ID prefix: `IOS` (e.g., IOS1, IOS2, IOSR1, IOSE1) to avoid collision with Windows TRD/TRE and macOS MAC prefixes.
- **D-03:** Triage tree includes a "No network reachability gate at root" note matching macOS's rationale (06-macos-triage.md lines 17-17) — Setup Assistant completion implies basic network for ADE; for BYOD/User Enrollment paths, Company Portal launching implies network. Root-level network gating is redundant with path-specific runbook steps.

### Initial Triage Integration (00-initial-triage.md)

- **D-04:** **Banner-only integration** matching the existing macOS banner at line 9. Add a new line 10 banner:
  ```
  > **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).
  ```
  Plus add `- [iOS Triage](07-ios-triage.md) — iOS/iPadOS failure routing` to the "Scenario Trees" list (lines 31-35) and an entry in the "See Also" footer.
  - **Rationale:** Project already shipped macOS integration as banner-only (00-initial-triage.md line 9) with zero Mermaid routing — that is the project's lived interpretation of SC #2's "single branch." Consistency with the sibling Apple platform is the dominant factor. Any structural integration (TRD0 Apple-vs-Windows gate, TRD5 iOS symptom entry) would EMBED iOS decision logic in the Windows triage flow, explicitly forbidden by SC #2.
- **D-05:** Do NOT modify the Mermaid graph in 00-initial-triage.md. Do NOT add an iOS decision node. Do NOT renumber TRD1-TRD6 IDs. The 00-initial-triage.md applies_to stays `APv1`; cross-platform routing is via banners only.
- **D-06:** Update the "## See Also" and "## Scenario Trees" sections of 00-initial-triage.md to reference the new iOS triage file. Bump `last_verified` date in the frontmatter to reflect the banner addition.

### L1 Scope on Admin-Config Failures

- **D-07:** **Detect-and-escalate scope** for all 6 runbooks. L1 observes portal state (Intune admin center, ABM for visibility checks), documents evidence (screenshots, timestamps, observed values), and escalates to the correct next-tier actor. **No L1 write actions** to tenant-wide configuration (APNs, ADE tokens, enrollment restrictions, compliance policies, license groups).
  - **Rationale:** 5 of 6 scenarios are tenant-config failures requiring admin or global-admin permissions. SC #4's "no ambiguity about who does what" is best served by a clean L1/Admin boundary — L1 never crosses into config changes. Matches macOS L1 precedent (runbook 10 has L1 check Intune/ABM + escalate; step 10 manual token sync is the only L1 write action and is narrowly scoped to re-triggering an existing config, not creating/modifying one).
- **D-08:** **Single documented L1 write-action exception:** Manual token sync (Intune admin center > Devices > Enrollment > Apple > Enrollment program tokens > [token] > Sync) — matching macOS runbook 10 step 10 precedent. No other L1 writes. This exception appears only in runbooks 17 (ADE not starting) and potentially 20 (device cap reached) where sync re-trial is the documented safe retry.
- **D-09:** **User-side actions are in scope for the compliance-blocked runbook (21)** — device restart, iOS version update, passcode reset, etc. These are user actions on the device, not admin-scope toggles, and satisfy the SC #4 "user action on device" boundary explicitly. Runbook 21 is the only one of 6 with meaningful user-action content.

### Actor-Boundary Format (SC #4 Literal)

- **D-10:** **Sectioned H2 actor-boundary format** for all 6 runbooks:
  ```
  ## Symptom
  ## L1 Triage Steps
  ## Admin Action Required  (escalation packet — L1 documents this for admin; L1 does not execute)
  ## User Action Required   (if applicable — only runbook 21)
  ## Escalation Criteria
  ```
  L1 executes only the "L1 Triage Steps" section. The "Admin Action Required" section is the **escalation packet template** — what the L1 documents and hands off to the Intune admin. This resolves the 3C-F1 critical flaw ("L1 can't execute admin section") by framing admin content as documentation output, not execution steps.
  - **Rationale:** SC #4 demands "no ambiguity about who does what." H2 section headings provide the strongest visual binary — every step lives under exactly one actor heading. macOS precedent (3D prose) was shipped before SC #4 existed and does not enforce the actor boundary.
- **D-11:** "Symptom" section opens with 1-3 concrete indicators (portal state, user-visible messages, screenshots-worth-of details) and links back to the triage tree entry node (Mermaid anchor) that routes here. Satisfies SC #3 "symptom description" literal requirement.
- **D-12:** "Admin Action Required" section is structured as a **three-part escalation packet**:
  1. **Ask the admin to** — imperative-voice list of the exact Intune admin center / Entra / ABM actions the admin must perform
  2. **Verify** — what L1 should see change in the portal after the admin acts (confirms the fix before closing the ticket)
  3. **If the admin confirms none of the above applies** — cross-section handoff to Escalation Criteria (L2)
- **D-13:** "User Action Required" section appears only where genuine user device-side action contributes. For 5 of 6 runbooks, this section is **omitted entirely** (not left empty with "N/A" filler). Only runbook 21 (compliance-blocked) has substantive user-action content.
- **D-14:** "Say to the user" callouts are used **sparingly** and only in runbooks where user-facing communication is meaningful. For tenant-config runbooks 16-20 where the fix is admin-only, "Say to the user" callouts should communicate status ("We're checking your device registration — your admin is being notified") not pseudo-remediation scripts. Inherits macOS precedent format (`> **Say to the user:** "..."`) but restrains application.
- **D-15:** "Escalation Criteria" section mirrors macOS precedent format verbatim: "Escalate to [L2 | Intune Admin | Infrastructure/Network] if:" followed by bullet conditions, then a "Before escalating, collect:" data checklist.

### Placeholder-Link Retrofit (71 Instances)

- **D-16:** **Resolve all 71 "iOS L1 runbooks (Phase 30)" placeholder strings inline as part of Phase 30.** Spans 9 files in `docs/admin-setup-ios/`:
  - `01-apns-certificate.md` (5 instances, lines ~101-105) → runbook 16
  - `02-abm-token.md` (5 instances, lines ~96-100) → runbook 17 (ADE not starting) + runbook 20 (device cap)
  - `03-ade-enrollment-profile.md` (6 instances, lines ~161-166) → runbook 17
  - `04-configuration-profiles.md` (9 instances) → runbook 21 (compliance-blocked) mostly + cross-refs
  - `05-app-deployment.md` (10 instances) → varies; Claude's discretion at research time based on failure-mode mapping
  - `06-compliance-policy.md` (10 instances, lines ~216-225) → runbook 21
  - `07-device-enrollment.md` (12 instances lines 243-259 + 1 prose line 243) → runbook 18 (enrollment restriction) + runbook 19 (license)
  - `08-user-enrollment.md` (~10 instances lines 163-165+) → runbook 18 + runbook 21
  - `09-mam-app-protection.md` (~4 instances) → Claude's discretion per failure-mode mapping (may route to a MAM-specific future runbook noted as ADDTS-01 deferred)
  - **Rationale:** Phase 28 D-22 is an explicit forward-contract: placeholders persist "until Phase 30 delivers actual runbook files." Phase 29 D-13 reiterates the same contract. Phase 30 IS the resolution milestone by contract. Leaving placeholders after Phase 30 delivers the runbooks breaks the forward-promise and leaves downstream link-rot for Phase 31/32.
- **D-17:** **Placeholder-to-runbook mapping requires per-row judgment** (not mechanical substitution). Several failure descriptions have ambiguous targets. Planner MUST enumerate each of the 71 placeholder rows with its target runbook in PLAN.md before execution — no bulk sed/find-replace. Where a failure mode has no obvious single runbook target (e.g., "Wi-Fi SSID case mismatch" in 04-configuration-profiles.md line 376 is not clearly any of the 6 scenarios), the resolution is: link to the nearest runbook + a contextual note, OR mark as "No L1 runbook — escalate to L2" with link to Phase 31 L2 index (once Phase 31 ships; Phase 30 may use a Phase 31 placeholder here, acceptable because the retrofit contract is specifically for Phase 30 runbooks).
- **D-18:** **Prose retrofit:** `docs/admin-setup-ios/07-device-enrollment.md` line 243 contains a prose sentence ("Full triage trees for each symptom will live in the iOS L1 runbooks (Phase 30).") — Phase 30 rewrites this to past/present tense with concrete links. Include in the retrofit scope alongside table cells.
- **D-19:** **Modification metadata:** Retrofitted admin-setup-ios files receive `last_verified` bump to Phase 30 ship date. Verb-tense and "Phase 30" framing removed. Version History table in each file gets a 1-line entry ("[date] | Resolved iOS L1 runbook cross-references | --") matching the existing pattern at the bottom of each file.
- **D-20:** **Commit grouping:** 9-file retrofit grouped as ONE atomic commit (`docs(30): resolve iOS L1 runbook placeholders in admin-setup-ios`) to keep the cross-phase-contract fulfillment traceable. Do NOT fold into individual runbook commits.

### File Organization & Numbering

- **D-21:** **Runbook filenames** (continuing 00-15 sequence from existing L1 runbooks index):
  ```
  16-ios-apns-expired.md
  17-ios-ade-not-starting.md
  18-ios-enrollment-restriction-blocking.md
  19-ios-license-invalid.md
  20-ios-device-cap-reached.md
  21-ios-compliance-blocked.md
  ```
  Matches Phase 26 D-17 locked convention: `l1-runbooks/` directory, sequential numbering starting at 16, `ios-` prefix.
- **D-22:** **Decision tree filename:** `docs/decision-trees/07-ios-triage.md` — continues 00/01/02/03/04/05/06 sequence (06 was macOS).
- **D-23:** **00-index.md update:** Add "## iOS L1 Runbooks" H2 section after existing "## macOS ADE Runbooks" section. Table columns: `# | Runbook | When to Use`. Add to "Related Resources" footer: `[iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) — iOS/iPadOS failure routing`. Update Version History.

### Frontmatter & Template Conventions

- **D-24:** **L1 template extension:** `docs/_templates/l1-template.md` currently has `platform: Windows | macOS | all`. Phase 30 extends this to `platform: Windows | macOS | iOS | all`. Minor template edit — not a new template.
- **D-25:** **Frontmatter per runbook:**
  - `platform: iOS` (Phase 26 D-19 convention)
  - `audience: L1`
  - `applies_to: all` for runbooks 16 (APNs — breaks all paths), 21 (compliance — all paths); `applies_to: ADE` for runbook 17 (ADE-not-starting is ADE-specific); other 3 runbooks — Claude's discretion at research time based on which enrollment paths the failure mode affects
  - `last_verified: YYYY-MM-DD`, `review_by: last_verified + 90 days`
- **D-26:** **Platform gate banner per runbook:** Each iOS L1 runbook opens with:
  ```
  > **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
  ```
  Mirrors macOS runbook banner at line 9 of 10-macos-device-not-appearing.md.

### Content Scope Specifics

- **D-27:** **Runbook 16 (APNs expired) cross-platform scope:** APNs certificate expiry affects iOS + iPadOS + macOS simultaneously. Runbook 16 must explicitly note this cross-platform blast radius in the Symptom section (matching Phase 27 D-11 context). Cross-link to the macOS L1 equivalent (if one exists post-Phase 30 — as of Phase 30 execution, macOS has no APNs-expired L1 runbook; note this as deferred-for-macOS-v1.4 in a Related Resources footer callout).
- **D-28:** **Runbook 21 (compliance-blocked) coverage scope:** Covers (a) CA-gap timing (waiting for first compliance evaluation post-enrollment — deep-link to Phase 28 D-11 `06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access` section), (b) actual policy mismatch (OS version, jailbreak detection, passcode), (c) Default compliance posture "Not compliant" configuration (Phase 28 D-14). Planner may structure runbook 21 with sub-H3 sections per cause similar to macOS runbook 11 (which uses sub-H2 sections per symptom). Claude's discretion on exact internal structure.
- **D-29:** **Runbook 18 (enrollment restriction blocking) scope:** Covers per-user device limits, personal/corporate ownership flag gating, and platform-level blocking. Cross-links to Phase 29 D-08 (`docs/admin-setup-ios/00-overview.md#intune-enrollment-restrictions` section — the shared enrollment-restrictions anchor).
- **D-30:** **Runbook 20 (device cap reached) scope:** Focuses on the per-user device limit (Intune enrollment restrictions) rather than per-tenant limits. Distinct from runbook 18 in that 18 is config-level blocking; 20 is quota exhaustion. Cross-links to Phase 29 D-08 for the configuration anchor and to Phase 27 D-11 ABM device assignment context where device cap intersects with ADE.
- **D-31:** **No L1 runbook for MAM-WE-specific failures** (PIN loop, app protection not applying, selective wipe failures) — explicitly deferred to ADDTS-01 future milestone per Phase 29 D-31 deferred-ideas list. The 9th admin-setup-ios file (`09-mam-app-protection.md`) MAM-specific placeholders may resolve to "No L1 runbook — escalate to L2" / Phase 31 L2 MAM investigation rather than any of 16-21.

### Research Flags (for gsd-phase-researcher)

- **D-32:** Verify current Intune admin center navigation for iOS device enrollment restrictions view (Devices > Enrollment > Enrollment restrictions — confirm path at research time; UI reorganization noted in STATE.md Phase 27 flag).
- **D-33:** Verify current Intune per-user device limit configuration path and naming (may have been renamed 2025-2026).
- **D-34:** Verify current APNs certificate status indicators in Intune (Devices > Enrollment > Apple > MDM Push Certificate) — field names and expiry indicators.
- **D-35:** Verify current iOS license-invalid failure manifestation — does the device fail at enrollment with a visible error, or does it silently fail to appear in Intune? Determines Symptom-section phrasing for runbook 19.
- **D-36:** Verify current Intune "Not evaluated" default compliance posture behavior against Microsoft Learn (Phase 28 D-11 compliance-timing reference doc is the cross-link but verify the reference doc itself is current).

### Claude's Discretion

- Exact branching beyond the root gate in 07-ios-triage.md (second-level questions per branch — constrained by SC #1 5-node cap and SC #3 6-runbook coverage)
- Mermaid styling and node-count within the 5-node cap
- Exact L1 Triage Steps content per runbook (constrained by D-07 detect-and-escalate scope + D-10 sectioned format)
- Exact Admin Action Required packet wording per runbook
- Per-runbook symptom count (D-11 says 1-3 concrete indicators)
- Per-runbook file length (macOS runbooks range 75-130 lines; iOS may run slightly longer due to D-10 sectioned format with Admin Action Required section)
- Whether to include "How to Use This Runbook" sub-navigation section (macOS runbook 11 uses this for multi-symptom layout; iOS runbook 21 may need equivalent for compliance sub-causes per D-28)
- Exact 71 placeholder-to-runbook mappings within D-17 enumeration rules (per-row judgment)
- Specific phrasing of the iOS banner in 00-initial-triage.md (D-04 gives a concrete template; minor wording adjustments permitted)
- Whether to extend 00-index.md "TPM Attestation Note" section with an iOS-equivalent "No L1 runbook for MAM-WE Failures" note matching the same advisory format

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before taking action.**

### Structural Precedents (PRIMARY templates)
- `docs/decision-trees/06-macos-triage.md` — macOS triage decision tree. PRIMARY structural template for `07-ios-triage.md`: Mermaid graph (2-axis MAC1→MAC2/MAC3) + Routing Verification table + How to Check table + Escalation Data table + Related Resources.
- `docs/decision-trees/00-initial-triage.md` — integration target. D-04/D-05/D-06 modify only the banner strip, Scenario Trees list, and See Also footer — NOT the Mermaid graph. See line 9 for the macOS banner precedent.
- `docs/decision-trees/04-apv2-triage.md` — APv2 triage precedent for a platform-specific sub-tree (alternate reference).
- `docs/l1-runbooks/10-macos-device-not-appearing.md` — PRIMARY structural template for tenant-side L1 runbook (visibility check pattern; step 10 manual sync exception). Line 17 establishes the L1-has-Intune-admin-center-read-access precedent.
- `docs/l1-runbooks/11-macos-setup-assistant-failed.md` — PRIMARY structural template for multi-symptom L1 runbook (use H2 sections per symptom — informs runbook 21 compliance-blocked sub-section approach per D-28).
- `docs/l1-runbooks/12-macos-profile-not-applied.md` — pattern reference for profile/config-not-applied style runbook.
- `docs/l1-runbooks/00-index.md` — index pattern (sectioned by platform with macOS section at lines 36-47). D-23 extends it with iOS section.

### Phase 26-29 Foundations (LOCKED decisions)
- `.planning/phases/26-ios-ipados-foundation/26-CONTEXT.md` — D-17 (l1-runbooks directory + ios- prefix + numbering start 16), D-19 (`platform: iOS` frontmatter convention), D-14 (Supervision State in enrollment overview — Phase 30 runbooks can deep-link)
- `.planning/phases/27-ios-admin-setup-corporate-ade-path/27-CONTEXT.md` — D-11 APNs cross-platform blast radius (runbook 16 context), ABM cross-reference pattern (runbook 17 cross-links to ABM token guide)
- `.planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-CONTEXT.md` — D-11/D-12 CA timing section (runbook 21 deep-link target at `../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access`), D-14 Default compliance posture (runbook 21 scope), D-22 placeholder forward-promise (the D-16 retrofit contract)
- `.planning/phases/29-ios-admin-setup-byod-mam/29-CONTEXT.md` — D-08 shared Intune Enrollment Restrictions section (runbooks 18 & 20 deep-link target at `../admin-setup-ios/00-overview.md#intune-enrollment-restrictions`), D-13 placeholder pattern reiterated, D-27 NO-Android scope (runbook 21 must not include Android cross-refs), D-31 deferred MAM-specific L1 as ADDTS-01 (informs D-31 of this phase)

### iOS Content Cross-Reference Targets (for runbook deep-links)
- `docs/ios-lifecycle/00-enrollment-overview.md` — enrollment path concept anchors. Sections `#supervision`, `#user-enrollment` used as deep-link targets where runbooks contextualize failures by enrollment path.
- `docs/ios-lifecycle/01-ade-lifecycle.md` — 7-stage ADE pipeline. Runbook 17 (ADE not starting) references Stage 1-2 for enrollment-token context.
- `docs/admin-setup-ios/01-apns-certificate.md` — runbook 16 cross-reference
- `docs/admin-setup-ios/02-abm-token.md` — runbook 17 cross-reference (ADE token scope)
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` — runbook 17 cross-reference (enrollment profile)
- `docs/admin-setup-ios/06-compliance-policy.md` — runbook 21 cross-reference (CA timing, default posture, OS version gates, jailbreak detection, passcode)
- `docs/admin-setup-ios/00-overview.md` §`#intune-enrollment-restrictions` (Phase 29 D-08) — runbook 18 & 20 cross-reference
- `docs/admin-setup-ios/07-device-enrollment.md` — runbook 19 (license invalid, Company Portal flows) cross-reference; also the D-18 prose retrofit target
- `docs/admin-setup-ios/08-user-enrollment.md` — runbook 18/19 cross-reference (user-enrollment variants)

### Templates and Conventions
- `docs/_templates/l1-template.md` — L1 template. D-24 extends `platform:` enum to include iOS.
- `docs/_glossary-macos.md` — shared Apple glossary. iOS terminology (supervision, MAM, APNs, etc.) will be added in Phase 32 NAV-01; Phase 30 may use these terms with plain-text first occurrences and internal backticks for now.

### Placeholder Retrofit Targets (D-16/D-17 enumeration — 71 instances)
- `docs/admin-setup-ios/01-apns-certificate.md` (5 — lines ~101-105)
- `docs/admin-setup-ios/02-abm-token.md` (5 — lines ~96-100)
- `docs/admin-setup-ios/03-ade-enrollment-profile.md` (6 — lines ~161-166)
- `docs/admin-setup-ios/04-configuration-profiles.md` (9 — lines ~376-384)
- `docs/admin-setup-ios/05-app-deployment.md` (10 — lines ~186-195)
- `docs/admin-setup-ios/06-compliance-policy.md` (10 — lines ~216-225)
- `docs/admin-setup-ios/07-device-enrollment.md` (12 — lines ~243-259; includes 1 prose line at 243)
- `docs/admin-setup-ios/08-user-enrollment.md` (~10)
- `docs/admin-setup-ios/09-mam-app-protection.md` (~4 — MAM-specific; may resolve to L2 or deferred per D-31)

### Requirements and Planning
- `.planning/ROADMAP.md` — Phase 30 section (lines ~136-146); 4 success criteria (SC #1 5-node budget, SC #2 single-branch integration, SC #3 per-runbook structure, SC #4 no-ambiguity actor boundary)
- `.planning/REQUIREMENTS.md` — L1TS-01 (iOS triage decision tree), L1TS-02 (6 runbooks: APNs / ADE / enrollment restriction / license / device cap / compliance); NAV-02 scope limit (runbook-placeholder retrofit is NOT in NAV-02 — reinforces D-16 fulfillment-in-Phase-30)
- `.planning/STATE.md` — research flags from prior phases; none carry into Phase 30 directly, but D-32 through D-36 document new research flags for this phase

### External Research Targets (for gsd-phase-researcher)
- Microsoft Learn — Intune iOS device management portal navigation (current UI as of 2026-04)
- Microsoft Learn — Apple MDM Push Certificate management in Intune
- Microsoft Learn — Intune enrollment restrictions configuration
- Microsoft Learn — Compliance policy evaluation timing and default posture behavior
- Microsoft Learn — Apple Business Manager token management and sync
- Community sources (oofhours, Call4Cloud) — L1 troubleshooting patterns if Microsoft coverage is insufficient; confidence-label any community-derived content MEDIUM per project convention

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **L1 template** (`docs/_templates/l1-template.md`) — minor extension needed (D-24: add `iOS` to platform enum). Template frontmatter schema, section structure (Prerequisites / Steps / Escalation Criteria), and "Say to the user" callout pattern reused.
- **macOS triage Mermaid pattern** (06-macos-triage.md lines 29-55) — 2-axis branching (state → visibility OR symptom) with green=resolved / red=escalateL2 classDef styling; green/red classes + `click` directives on resolved nodes linking to runbooks. Directly applicable to 07-ios-triage.md.
- **macOS L1 runbook sectioning patterns** — runbook 10 (single-flow with step 10 manual sync exception) is the template for runbooks 17 + 20. Runbook 11 (multi-symptom H2 layout) is the template for runbook 21's multi-cause structure.
- **"Say to the user" callout pattern** — reused sparingly (D-14) where user communication is meaningful; restrained in tenant-config runbooks 16-20.
- **Platform gate banner pattern** (runbook 10 line 9) — reused verbatim in all 6 iOS runbooks (D-26).
- **Escalation Criteria block format** — reused verbatim (D-15).
- **Configuration-Caused Failures retrofit targets** — 71 placeholder rows already wired across 9 admin-setup-ios files; D-16/D-17 fulfills the forward-promise.
- **00-index.md platform-section pattern** (APv1 / APv2 / macOS sections) — extend with iOS section per D-23.

### Established Patterns
- Decision-tree Mermaid: root decision node → branching diamonds → terminal rounded-rectangle resolved/escalate nodes → `click` directives for runbook deep-links → classDef styling for visual severity
- L1 runbook sections: Frontmatter → Platform gate banner → Title H1 → intro paragraph → Prerequisites H2 → Steps H2 (imperative voice, numbered) → Escalation Criteria H2 → Back-link → Version History H2
- iOS is already portal-only by necessity (no CLI/shell access) — L1's "no PowerShell/registry/logs" template rule aligns naturally
- Frontmatter: `last_verified: YYYY-MM-DD`, `review_by: last_verified + 90d`, `audience: L1`, `platform: iOS`, `applies_to: all|ADE|BYOD`
- Cross-references use relative paths with section anchors (`../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access`)
- Cross-phase placeholder pattern (Phase 28 D-22): `iOS L1 runbooks (Phase 30)` temporary text, Phase 30 resolves

### Integration Points
- 7 new files: 07-ios-triage.md + 16-21 runbooks
- 1 template edit: `docs/_templates/l1-template.md` (D-24)
- 2 index-file edits: 00-initial-triage.md banner + 00-index.md iOS section
- 9 admin-setup-ios file retrofits (71 placeholder rows + 1 prose sentence + 9 last_verified bumps + 9 Version History entries)
- NO Mermaid graph modifications to 00-initial-triage.md (D-05)
- NO new glossary entries (Phase 32 NAV-01)
- NO navigation hub edits to index.md, common-issues.md, quick-ref-l1.md (Phase 32 NAV-02)
- NO capability matrix entries (Phase 32 NAV-03)

</code_context>

<specifics>
## Specific Ideas

- **Runbook length target:** 100-180 lines per runbook. macOS runbooks range 75-130 lines; iOS adds an "Admin Action Required" H2 section (D-10) which adds ~20-40 lines each. Runbook 21 (compliance-blocked, multi-cause) may reach 180+.
- **Runbook 16 (APNs expired) is the cross-platform blast-radius runbook** — lead with "This affects ALL enrolled iOS, iPadOS, AND macOS devices simultaneously" in the Symptom section. Distinguish between "certificate already expired" (reactive triage) and "certificate expiring in <30 days" (proactive escalation). The admin-action packet is identical in both cases (renew via Apple Push Certificates Portal, per 01-apns-certificate.md).
- **Runbook 17 (ADE not starting) distinguishes three failure signatures:** (a) device never appears in Intune after factory reset (ABM token / enrollment profile issue), (b) device appears but Setup Assistant never advances past welcome screens (profile assignment or network), (c) user reaches Apple sign-in but Microsoft sign-in never appears (authentication-method or user-affinity issue). Visibility gate in 07-ios-triage.md routes to this runbook; sub-symptom disambiguation is inside the runbook via the D-28 multi-section pattern.
- **Runbook 18 (enrollment restriction blocking) vs Runbook 20 (device cap reached):** These are easily confused. 18 is **configuration blocks** (platform / ownership / enrollment-type-blocking in the enrollment restrictions blade); 20 is **quota exhaustion** (per-user device limit hit). Both route via "device not visible after user attempted enrollment" → 07-ios-triage.md must disambiguate via a sub-question ("Did the user see a 'device limit reached' error at enrollment?" — yes = 20, no = 18). Call this out explicitly in the Related Resources footer of both runbooks.
- **Runbook 19 (license invalid) is subtle:** User signs in during enrollment, everything appears to succeed, but the MDM profile never downloads and Intune shows no device for the user. The visible failure is "nothing happened" — L1 must verify license assignment in Entra admin center (may require second-portal access per 2B-F2 confirmed flaw). Runbook 19 Prerequisites section flags this permission requirement explicitly.
- **Runbook 21 (compliance-blocked) sub-structure:** Use macOS runbook 11 multi-section layout with H2 sub-sections per cause: `## Cause A: CA Gap (First Compliance Evaluation Pending)`, `## Cause B: Actual Policy Mismatch`, `## Cause C: Default Posture — Not Compliant`. Each sub-section has its own L1 Triage Steps / Admin Action Required / (optional User Action Required) sub-structure. Routing to correct sub-cause happens via a top-of-runbook "How to Use This Runbook" sub-navigation list (macOS runbook 11 line 22-27 is the template).
- **Banner text for 00-initial-triage.md line 10 (D-04):** Recommended wording: `> **iOS/iPadOS:** For iOS/iPadOS troubleshooting, see [iOS Triage](07-ios-triage.md).` Matches macOS banner line 9 wording pattern exactly. Avoid variations like "For iOS issues" or "iOS devices" — consistency with shipped macOS banner is the point.
- **Mermaid node ID prefix for 07-ios-triage.md (D-02):** Use `IOS1`, `IOS2`, `IOSR1` (resolved), `IOSE1` (escalate L2) to avoid collision with Windows TRD* and macOS MAC* IDs. Consistent 4-char prefix convention.
- **Adversarial-review trail preservation:** 30-DISCUSSION-LOG.md records the 19 candidate options + 63 flaw IDs + Adversary's 6 disproves + Referee's final verdicts. Do not summarize away — the full trail is the auditable record of how decisions were derived.
- **Placeholder retrofit error-rate mitigation (D-17):** Plan-phase MUST produce a complete 71-row enumeration (line-number + source-description → target-runbook + target-link). Execute-phase is a pure substitution from that enumeration. If any row's target is ambiguous at plan time, escalate to the user before execution — do not guess at execution time.
- **Runbook 16 noting the macOS APNs gap:** As of Phase 30 execution, macOS has no equivalent L1 APNs runbook (the macOS L1 set covers device/enrollment/config/compliance but not cross-platform APNs). Runbook 16's Related Resources footer notes this explicitly and defers creation of the macOS equivalent to v1.4 or later — avoiding scope creep.

</specifics>

<deferred>
## Deferred Ideas

- **iOS MAM-specific L1 runbooks** (selective wipe failures, PIN loop, app protection not applying, MAM policy not enforcing) — ADDTS-01 future milestone per Phase 29 D-31. Runbook 21 is NOT expanded to cover MAM-WE compliance; MAM-WE has different enforcement model.
- **iOS L2 investigation runbooks** — Phase 31 L2TS-02 scope. Escalation Criteria sections in runbooks 16-21 link to Phase 31 L2 index (placeholder "iOS L2 runbooks (Phase 31)" until Phase 31 delivers — this IS a new placeholder category established by Phase 30, following Phase 28 D-22 pattern).
- **iOS log collection runbook** (Company Portal upload, MDM diagnostic report, Mac+cable sysdiagnose) — Phase 31 L2TS-01 scope. Out of L1 scope entirely.
- **macOS L1 APNs-expired runbook** — not currently in v1.2 macOS L1 set; cross-platform APNs scenarios currently implicit. Deferred to v1.4 per D-16-mitigation-note above.
- **iOS Windows L1 Service Desk quick-reference card** — Phase 32 NAV-02 scope (extension of `docs/quick-ref-l1.md`).
- **Glossary additions** for iOS L1 triage terms (enrollment profile, enrollment restriction, device cap, per-user device limit) — Phase 32 NAV-01. Phase 30 uses these terms with plain-text first occurrences or inline backticks.
- **Capability matrix entry** for iOS L1 troubleshooting depth — Phase 32 NAV-03.
- **Automated link-check CI** for placeholder-free admin-setup-ios post-Phase 30 — not in current tooling; noted for future milestone.
- **Apple Configurator 2 manual enrollment L1 runbook** — explicitly out of scope per REQUIREMENTS Out-of-Scope table.
- **Shared iPad L1 specifics** — SIPAD-01 future milestone; not covered by the 6 standard iOS scenarios.

### Reviewed Todos (not folded)
None — `gsd-tools todo match-phase 30` returned 0 matches at context-gather time (no pending backlog todos relevant to iOS L1 scope).

</deferred>

---

*Phase: 30-ios-l1-triage-runbooks*
*Context gathered: 2026-04-17*
*Decision method: 5 primary decisions + sub-decisions derived via adversarial review (Finder 367 pts / Adversary 6 disproves / Referee all 6 ruled FALSE POSITIVE). Full flaw trail in 30-DISCUSSION-LOG.md.*
