# Pitfalls Research

**Domain:** IT Documentation — Windows Autopilot Troubleshooting Guides (L1/L2)
**Researched:** 2026-03-10
**Confidence:** HIGH (Microsoft Learn official docs + community validation, February 2026 updates confirmed)

---

## Critical Pitfalls

### Pitfall 1: Treating Autopilot as a Single Product When It Is Now Two

**What goes wrong:**
Documentation written as if "Windows Autopilot" is one thing. As of 2024-2025, Microsoft shipped "Windows Autopilot device preparation" (APv2/Device Preparation), which is architecturally different from classic Autopilot (APv1). Docs that conflate them produce L1 agents giving wrong instructions — APv2 has no hardware hash registration, no ESP, no hybrid join support, no pre-provisioning, and no self-deploying mode. An L1 agent following a classic Autopilot runbook on an APv2 deployment will chase phantom problems.

**Why it happens:**
The Microsoft branding keeps both under the "Windows Autopilot" umbrella. Most community content, blog posts, and even older Microsoft Learn pages refer to classic Autopilot. Writers assume continuity that does not exist.

**How to avoid:**
- Open every guide with an explicit version gate: "This guide applies to: [  ] Windows Autopilot (classic/v1) | [  ] Windows Autopilot Device Preparation (v2/APv2)"
- Create a single disambiguation page that explains the difference (no hardware hash in v2, no pre-provisioning in v2, Entra join only in v2) and links to the correct guide for each
- Never write shared error code tables without tagging which product each code applies to — some codes only surface in one version

**Warning signs:**
- A guide mentions "hardware hash upload" and "Enrollment Status Page" in the same section without a version qualifier
- A guide describes pre-provisioning but does not note that APv2 does not support it
- Error code 0x80180014 is described only as "delete the Intune device record" without noting its meaning differs between v1 self-deployment and v2 enrollment scenarios

**Phase to address:** Phase 1 (Lifecycle Documentation Foundation) — establish version taxonomy before any troubleshooting content is written

---

### Pitfall 2: Error Code Tables Without Context Columns

**What goes wrong:**
Error code tables list code + one-line fix. L1 agents attempt the fix, it fails because the same code has multiple root causes depending on deployment mode. Classic example: 0x80180014 means "delete Intune device record" in self-deploying/pre-provisioning reuse, but also means "MDM enrollment is blocked by a device restriction policy" — two completely different fixes. 0x80070774 means "Intune Connector domain mismatch" in hybrid join ESP but appears unrelated to connectors in other contexts.

**Why it happens:**
Error code tables are usually created by taking notes from incident tickets. Each incident captured one cause. The table writer assumes the code is unambiguous. Microsoft's own documentation does not always foreground the multi-cause nature of codes.

**How to avoid:**
- Every error code entry must include: Code | Deployment Mode(s) where seen | Symptom at screen | Root cause(s) (numbered if multiple) | Fix for each cause | Escalate if (condition)
- Group codes by the phase where they surface (hardware hash import, OOBE, ESP device phase, ESP user phase, post-enrollment) rather than numeric order — L1 agents know what phase is failing, not the hex code
- For codes with multiple causes, use an inline decision branch: "If you see 0x80180014 AND the device was previously enrolled: do X. If the device is brand new: check MDM restriction policy."
- Validate every code against the current Microsoft Learn known issues page (last updated February 2026) before publishing

**Warning signs:**
- Error table has a single "Fix" column with no conditions
- Error table is sorted numerically rather than by deployment phase
- Table was built from a single source (one blog post, one internal incident)

**Phase to address:** Phase 3 (Error Code Lookup Tables) — entire phase should be built around this constraint

---

### Pitfall 3: Pre-Provisioning (White Glove) Treated as an Edge Case

**What goes wrong:**
Pre-provisioning (technician flow + user flow) is documented as a footnote or a single-page addendum. In practice, organizations using pre-provisioning hit distinct failure modes that do not appear in user-driven or self-deploying docs: TPM attestation failures specific to the technician flow (0x81039023, 0x81039024, 0x81039001), LAPS policies not applying until user phase, password/logon GPO conflicts that break the autologon at the seam between technician and user phases, LOB/Win32 app mixing failures in ESP that only manifest in pre-provisioning timing, and region/keyboard autoconfiguration bugs (required KB5072033).

L1 agents without a dedicated pre-provisioning guide escalate everything to L2, or worse, attempt user-driven remediation steps that damage the pre-provisioned state.

**Why it happens:**
Pre-provisioning is a smaller share of total deployments. Writers prioritize user-driven documentation first, then run out of time. Pre-provisioning appears to share the same infrastructure as self-deploying, so writers assume the same troubleshooting applies. It does not — the two-phase (technician + user) nature creates unique failure seams.

**How to avoid:**
- Pre-provisioning gets its own top-level section, not a subsection of self-deploying
- Document the two-phase flow explicitly: technician phase ends at green screen / resealing → user phase begins at first login. Every error must be tagged to which phase surfaced it
- Include the specific known issues: keyboard language autoconfiguration failure, LAPS policy timing, TPM attestation retry codes (0x81039001 specifically described as "intermittent retry exceeded"), security baseline password policy breaking autologon
- Include the GPO conflict table from Microsoft's troubleshooting FAQ — four specific GPO settings that silently break pre-provisioning are documented but rarely appear in third-party guides
- Note that APv2 does not support pre-provisioning at all — this must be stated explicitly so L1 does not attempt the pre-provisioning troubleshooting flow on an APv2 device

**Warning signs:**
- Pre-provisioning troubleshooting is a subsection of "self-deploying mode"
- No mention of the technician flow vs. user flow distinction
- No coverage of the autologon failure caused by password/security baseline policies
- TPM attestation codes listed without noting which apply exclusively to pre-provisioning and self-deploying (vs. user-driven)

**Phase to address:** Phase 2 (Deployment Mode Guides) — pre-provisioning must be a first-class deliverable, not deferred

---

### Pitfall 4: Documentation Written at One Cognitive Level for Both L1 and L2

**What goes wrong:**
A single guide is written and handed to both L1 Service Desk and L2 Desktop Engineering. L1 agents skip the registry inspection steps because they have no permissions or context; L2 engineers find the scripted decision trees patronizing and ignore the guide entirely, going off-script. Result: L1 escalates everything they should handle, L2 does not follow safe remediation sequences.

**Why it happens:**
It is faster to write one document. Writers default to their own technical level (usually L2), then add a note at the top saying "simplified version for helpdesk." The note does not make the content usable for L1.

**How to avoid:**
- Maintain physically separate files: `L1-user-driven-troubleshooting.md` and `L2-user-driven-deep-dive.md` — not headings within a shared file
- L1 format: decision tree with explicit binary branches (Yes/No), screenshot references, exact error message text to match, escalation trigger with what information to collect before escalating (event log export, serial number, deployment mode, error code from screen)
- L2 format: registry paths to inspect, PowerShell commands with expected output, ETW tracing setup, log file locations and what to look for, causal chain analysis
- Define an explicit escalation handoff checklist at the bottom of every L1 guide — what L1 must have captured before L2 accepts the ticket
- L1 guides must never require registry access, PowerShell execution, or Intune admin portal access — if a fix requires those, it is an L2 action and the L1 guide should say "escalate with [info]"

**Warning signs:**
- A guide for the same scenario exists in one file with both registry paths and "call the user" instructions
- L1 guide refers to "running Get-AutopilotDiagnostics" — that is an L2 tool
- L2 guide says "ask the user if they saw an error message" — that is an L1 step that should have happened before escalation
- Guides use the same template/format for both audiences

**Phase to address:** Phase 1 (Lifecycle Documentation Foundation) — establish the two-file convention and templates before any scenario content is written

---

### Pitfall 5: Network Prerequisite Checks Buried or Absent

**What goes wrong:**
Troubleshooting guides jump straight to Intune configuration checks and error code lookups. L1 agents spend 30-60 minutes in Intune before anyone verifies basic network reachability. In practice, a large share of Autopilot failures in corporate environments are network-related: proxy blocking `ztd.dds.microsoft.com` or `cs.dds.microsoft.com`, captive portals intercepting the profile download, TLS inspection stripping certificates, or VPN required for hybrid join but not connected during OOBE.

The Microsoft troubleshooting FAQ lists network connectivity as the first check but this ordering is rarely preserved in derived documentation.

**Why it happens:**
Writers derive from internal incident tickets where network was already ruled out by infrastructure teams. The documentation therefore skips straight to the application-layer. L1 agents, who have no infrastructure context, inherit the same ordering.

**How to avoid:**
- Every L1 decision tree must open with a network reachability gate before any other branch — "Can the device reach login.microsoftonline.com? If no: stop here, this is a network issue, escalate to network team with [specific info]"
- Include the full required endpoint list in a single reference table: `ztd.dds.microsoft.com`, `cs.dds.microsoft.com`, `login.microsoftonline.com`, `graph.microsoft.com`, `enrollment.manage.microsoft.com`, `lgmsapeweu.blob.core.windows.net` (required for diagnostic upload), and the Intune core service endpoints
- Document the Shift+F10 → command prompt → `Test-NetConnection` sequence for L1 OOBE-stage verification
- Call out proxy and TLS inspection as common corporate network failure modes with a specific note: "If your organization uses a web proxy or TLS inspection, verify these endpoints are excluded before beginning Autopilot troubleshooting"
- Hybrid join adds an additional requirement: the device must reach a domain controller on the internal network — document this as a separate pre-check for hybrid join scenarios

**Warning signs:**
- Decision tree branches into "check Autopilot profile assignment" before any network check
- Required endpoint list is absent or only partially listed
- No mention of proxy/TLS inspection as a potential blocker
- Hybrid join guide does not mention domain controller reachability as step 1

**Phase to address:** Phase 2 (Deployment Mode Guides) — each mode guide must open with a network pre-check section

---

### Pitfall 6: Flowcharts Without Explicit Terminal States and Escalation Triggers

**What goes wrong:**
Decision trees are drawn with branches that loop back to earlier steps ("try again") or end with vague leaves ("contact Microsoft support"). L1 agents do not know when to stop and escalate. They re-run the same steps in a loop, wasting time and potentially making the device state worse (repeated failed enrollments can trigger the 0x80180014 "one time limit" block).

**Why it happens:**
Flowchart authors focus on the happy path and one or two common failure branches. Edge cases and terminal "we cannot fix this at L1" states are left as implicit knowledge.

**How to avoid:**
- Every flowchart must have explicit terminal states in three categories: (a) Resolved — device enrolled successfully, (b) Escalate to L2 — with a mandatory data collection checklist, (c) Escalate to infrastructure/network team — with specific evidence required
- Never draw a "retry" branch without a retry limit — "Retry once. If the same error persists, escalate."
- Include a "device state is now worse" recovery note for each destructive action (delete device record, reset TPM, wipe device) — L1 should not perform these without explicit L2 authorization
- The escalation trigger must specify exactly what information L1 hands off: serial number, hardware hash (if registered), deployment mode, error code seen, screenshot of the error screen, MDM diagnostic log export path if accessible

**Warning signs:**
- Flowchart has a "try again" node with no loop limit
- Terminal leaves say "contact support" without specifying which team or what to provide
- No "stop" terminal for scenarios that require L2 authorization before proceeding
- Destructive actions (device record deletion, TPM reset) appear in L1 flowcharts

**Phase to address:** Phase 4 (L1 Decision Trees) — this is the defining constraint of the entire L1 artifact

---

### Pitfall 7: Windows Version Differences Undocumented

**What goes wrong:**
Troubleshooting steps work on Windows 11 but not Windows 10 (or vice versa), and the guide does not say which. Key differences that bite teams: the Autopilot diagnostics page (CTRL+SHIFT+D / "View Diagnostics" button) is Windows 11 only — on Windows 10, agents must use MDM diagnostic tool instead. Specific KB prerequisites differ by version (KB5028244 for Windows 10 vs. KB5028245 for Windows 11 for increased Autopilot policy retry attempts; KB5023773 vs. KB5023778 for device rename during pre-provisioning). TPM attestation failure behavior differs between Windows 10 and Windows 11 for certain TPM vendors (AMD ASP firmware TPM).

**Why it happens:**
Most documentation is written on Windows 11 test hardware. The author sees the diagnostics page and documents it. Windows 10 testers are rarer. The assumption is "same Autopilot, just older OS."

**How to avoid:**
- Every step that differs by OS version must be tagged with an inline OS version note: `[Windows 11 only]` or `[Windows 10: use MDM Diagnostic Tool instead]`
- Include a version-specific prerequisites table at the top of each guide covering: minimum KB required, diagnostic tools available, known version-specific bugs
- Test guides on both Windows 10 21H2+ and Windows 11 23H2+ before publishing — behavior differences surface in testing, not review
- Maintain a dedicated "Windows version differences" reference page that other guides can link to rather than repeating the same caveats inline

**Warning signs:**
- Guide instructs L1 to press CTRL+SHIFT+D without noting Windows 11 requirement
- No KB prerequisites mentioned for any steps
- No OS version tags on any steps
- Guide was written and tested only on Windows 11

**Phase to address:** Phase 3 (Error Code Lookup Tables) and Phase 5 (Scenario Runbooks) — version tags must be added during initial content creation, not retrofitted

---

### Pitfall 8: Documentation That Does Not Match Actual Autopilot Behavior Due to Post-Publication Microsoft Changes

**What goes wrong:**
Autopilot behavior changes without the documentation changing. Documented as breaking changes since 2024-2025:
- The Intune Connector for Active Directory moved its Event Viewer log path — guides pointing to the old path ("ODJ Connector Service" directly under Applications and Services Logs) send L2 engineers to an empty log
- The Intune Connector minimum version changed to 6.2501.2000.5; older connector versions silently stop processing enrollment requests — guides that do not mention version checking cause L2 engineers to spend hours in the wrong layer
- The `enrollmentProfileName` property behavior changed, breaking Entra dynamic groups using that field — guides documenting group-based profile assignment need to flag this
- Quality updates during OOBE were delayed and re-enabled in a changed form — guides about OOBE behavior written in mid-2025 may describe a temporary state
- The ODJ Connector now uses a low-privilege MSA account (changed June 2025) — guides documenting the old connector installation process are incorrect for new deployments

**Why it happens:**
Microsoft releases Intune service updates monthly and Autopilot behavior updates on an irregular cadence. There is no stable release model — the cloud service changes without a version number the documentation can pin to.

**How to avoid:**
- Every guide must include a "Last verified against:" field with the Intune service version or date, and a "Review by:" date no more than 6 months out
- Guides must link to the Microsoft Learn "What's new in Windows Autopilot" and "Known issues" pages as authoritative live sources rather than duplicating content that will drift
- Establish a review calendar: quarterly review of all guides against the Microsoft Learn changelog
- For connector-specific steps, always include: minimum version check before any connector troubleshooting steps, and the correct log path verified against current documentation
- Flag sections that are most likely to change: connector installation, profile assignment behavior, MDM enrollment restrictions

**Warning signs:**
- A guide describes the ODJ Connector log as being at "Applications and Services Logs > ODJ Connector Service" (old path — now at `Applications and Services Logs > Microsoft > Intune > ODJConnectorService`)
- A guide does not specify minimum Intune Connector version
- No "last reviewed" date on the guide
- Guide content duplicates Microsoft Learn rather than linking to it

**Phase to address:** Phase 1 (Lifecycle Documentation Foundation) — establish the review cadence and metadata standards before content is written; apply to all subsequent phases

---

### Pitfall 9: Hybrid Join Complexity Underestimated and Understated

**What goes wrong:**
Hybrid join documentation presents it as a straightforward configuration alongside Entra-only join. In practice, hybrid join is the most failure-prone Autopilot scenario with the most prerequisites. Failures stem from: Intune Connector not on the corporate network during provisioning, ODJ blob timeout when no domain join profile is targeted to the device, domain controller not reachable from the device during OOBE, Intune Connector installed in wrong domain (0x80070774), connector version below 6.2501.2000.5, TLS 1.0/1.1 still enabled on the connector server blocking PKCS cryptography.

Microsoft's own documentation now recommends against new hybrid join deployments: "deploying new devices as Microsoft Entra hybrid join devices isn't recommended." This carries documentation implications — guides should flag hybrid join as the legacy path and note Entra-only join as the current recommendation.

**Why it happens:**
Hybrid join is extremely common in existing environments (many organizations have not completed cloud-native migration). Documentation writers feel obligated to fully support it. The complexity is not visible until a deployment fails.

**How to avoid:**
- Open every hybrid join guide with a prerequisites checklist that must be completed before any device is deployed: connector version, connector server network access, OU permissions, domain controller reachability from deployment network, ODJ profile targeting verified
- The connector version check must be explicit: "Verify connector version is 6.2501.2000.5 or later. Connectors below this version will not process enrollment requests and will fail silently."
- Include the PKCS/TLS fix in the connector troubleshooting section (the registry key deletion for `HKLM\System\CurrentControlSet\Control\SecurityProviders\SCHANNEL\KeyExchangeAlgorithms\PKCS`) — this is a documented cause of connector navigation failures
- Add a note that hybrid join requires the device to be on the corporate LAN during OOBE — VPN during OOBE is the only off-premises option, and this must be configured before the device ships to the user
- Include Microsoft's current guidance that new deployments should prefer Entra-only join

**Warning signs:**
- Hybrid join guide omits a prerequisites checklist
- Connector version is not mentioned
- Guide does not distinguish between on-premises and off-premises deployment scenarios
- No mention of the domain controller reachability requirement
- 0x80070774 is not in the hybrid join error section

**Phase to address:** Phase 5 (Scenario Runbooks) — hybrid join is a full standalone runbook, not a variation of the user-driven guide

---

### Pitfall 10: ESP Troubleshooting Conflates Device Phase and User Phase

**What goes wrong:**
The Enrollment Status Page has two distinct phases: device setup (apps and policies applied before the user signs in) and user setup (apps and policies applied after the user signs in). Troubleshooting steps for failures in each phase are different. Mixing them causes L1 agents to apply the wrong fix: a device-phase app failure requires checking the Intune device assignment and Win32 app detection rules; a user-phase failure requires checking user-targeted policies and license assignments.

An additional documented trap: mixing LOB (line-of-business) and Win32 apps in the device phase causes random failures because both use TrustedInstaller which does not allow concurrent installs. This is a known issue with a documented error message ("Another installation is in progress, please try again later") but it is widely omitted from L1 troubleshooting guides.

**Why it happens:**
The ESP looks like one screen. Writers document it as one phase. The distinction between device and user setup is an implementation detail that is not visible in the UI.

**How to avoid:**
- ESP troubleshooting must always distinguish phase: "Is the failure occurring before the user is prompted to sign in (device phase) or after (user phase)?"
- Device phase failures: check device-targeted app assignments, check Win32 app detection rules, check for LOB+Win32 mixing (use the specific error message as a matching criterion)
- User phase failures: check user-targeted app assignments, verify user license, check for policy conflicts
- Include the Teams Machine-Wide Installer MSI conflict scenario explicitly — it is a specific, documented cause of random device-phase failures that L1 teams frequently encounter and cannot diagnose without this knowledge
- For APv2 (Device Preparation): note that it does not use ESP, so ESP troubleshooting guides do not apply

**Warning signs:**
- ESP troubleshooting guide has no distinction between device phase and user phase steps
- LOB + Win32 app mixing is not mentioned
- Teams installation conflict is not documented
- ESP troubleshooting guide does not note it does not apply to APv2

**Phase to address:** Phase 5 (Scenario Runbooks) — ESP failure is a standalone runbook requiring the device/user phase distinction as its primary organizing principle

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term documentation problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single shared doc for L1 and L2 | Faster to write one document | L1 skips technical steps, L2 ignores scripted flows, neither audience uses it effectively | Never — audience mismatch is fatal to usability |
| Copy error codes from blog posts without verifying against Microsoft Learn | Fast table population | Incorrect or outdated resolution steps, multi-cause codes documented with single fix | Never — always verify against current Microsoft Learn known issues |
| Write pre-provisioning as a subsection of self-deploying | Reduces page count | Pre-provisioning failures are mis-diagnosed using self-deploying steps; unique failure modes go undocumented | Never — treat as a separate deployment mode |
| Omit "last reviewed" dates | Saves time during authoring | Team does not know which guides are stale; guides accumulate incorrect information silently | Never for any Autopilot content — Microsoft changes Intune monthly |
| Write hybrid join guide assuming corporate LAN | Covers the majority case | Off-premises deployments fail with no guidance; VPN-during-OOBE scenario is undocumented | Acceptable only if the org has explicitly confirmed 100% LAN deployment |
| Single error code table for all deployment modes | One place to look | Codes that have different causes in different modes mislead L1 into wrong fixes | Acceptable only if every code row is tagged with applicable deployment mode |

---

## Integration Gotchas

Common mistakes when integrating documentation with external systems and tools.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Microsoft Graph / Intune Admin Portal | Documenting portal navigation paths that change with UI updates | Document the logical action ("navigate to Devices > Enrollment > Windows > Autopilot Devices") alongside the URL path, so updates are easier to apply |
| MDM Diagnostic Tool | Documenting the old portal export path without noting it moved | Always reference `mdmdiagnosticstool.exe -out <path>` command rather than portal navigation, which is more stable |
| Intune Connector Event Log | Documenting the old log path "ODJ Connector Service" at the root level | Always specify the current path: `Applications and Services Logs > Microsoft > Intune > ODJConnectorService` |
| Get-AutopilotDiagnostics script | Treating it as an L1 tool | This is an L2 tool requiring PowerShell access and often Intune admin rights; L1 guides must not reference it |
| SharePoint/Confluence export | Markdown tables and flowcharts not rendering correctly after export | Test export format before publishing; use simple table syntax; consider Mermaid diagrams only if target wiki supports them |
| Microsoft Learn cross-links | Linking to Microsoft Learn pages at a specific article URL that later changes | Link to the stable section anchor (e.g., `/autopilot/troubleshooting-faq`) rather than deep sub-anchors; note last verified date on external links |

---

## Performance Traps

In the documentation domain, "performance" means usability at scale — how docs hold up as the team grows, device fleet grows, and time passes.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| No version control or review cadence | L1 agents report guide steps not working; no one knows which version is current | Git-tracked markdown with explicit review dates in frontmatter | Within 6 months of first Microsoft Intune monthly update post-publication |
| Error tables sorted numerically | L1 agent has a hex code, must scan entire table to find it; frequently gives up | Tag codes by deployment phase and surface them via a phase-first lookup structure | Any table over 20 entries |
| Decision trees as embedded images | Cannot be updated without re-exporting from diagramming tool; links to step numbers go stale | Mermaid or text-based flowcharts in markdown; or if image, store source file alongside image in repo | Every time Autopilot behavior changes |
| Scenario runbooks with no "applies to" header | L1 spends 10 minutes reading wrong runbook before realizing it does not apply | Every runbook opens with: Deployment Mode | OS Version | Applies to APv1/APv2 | Prerequisites | First 30 seconds of use |
| Duplicate content across L1 and L2 guides | When Microsoft changes behavior, only one copy gets updated | Single source of truth for factual content (endpoint lists, error codes, registry paths); L1 and L2 guides reference it, they do not duplicate it | First quarterly review cycle |

---

## Security Mistakes

Documentation-specific security issues for this domain.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Including tenant-specific IDs, client secrets, or app registration details in example commands | If guides are exported to public SharePoint or shared externally, credentials are exposed | Use placeholder values (`<YOUR-TENANT-ID>`, `<CLIENT-ID>`) with a callout box explaining where to find the real value |
| Documenting remediation steps that require Global Admin without noting the privilege level required | L1 agents attempt steps they cannot complete, or worse, elevate their own access | Every step must be tagged with the minimum Intune role required: Intune Administrator, Help Desk Operator, or Global Admin |
| L1 guides that include device record deletion steps | Deleting the Intune device record is a destructive action; wrong device deletion causes re-enrollment cycles | Device record deletion must be gated behind L2 authorization; L1 guides must say "do not delete — escalate" |
| Guides that omit the ShouldProcess note for PowerShell remediation commands | L2 engineers run remediation scripts without `-WhatIf` testing first | Every PowerShell remediation command must include a `-WhatIf` example and a note that all remediation functions support `-ShouldProcess` |
| Publishing full audit logs or MDM diagnostic exports as examples | Diagnostic exports can contain device identifiers, user UPNs, and tenant information | Use sanitized/anonymized examples; add a warning that diagnostic exports must be handled per data retention policy |

---

## UX Pitfalls

User experience of the documentation itself.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Decision trees embedded as large images with no alt text | L1 agents cannot zoom into step detail; screen reader users cannot use the guide; printing degrades quality | Text-based flowcharts (Mermaid in supported wikis) or high-resolution SVG with accompanying text description of each branch |
| Error codes in guides without the exact text shown on the device screen | L1 agent sees "Something went wrong" and a hex code; guide shows only the hex code; no match found | Always pair the hex code with the exact error message string as it appears on screen, in the same row |
| Runbooks that begin with background context before the diagnostic steps | L1 agent in a live deployment failure must scroll past two paragraphs of Autopilot history to reach the first action | L1 guides: first visible content must be "Start here: check X first" — background context goes in a collapsible section or at the end |
| Prerequisite lists at the end of guides | L1 agent attempts steps, fails, then discovers the prerequisite they missed | Prerequisites checklist is always the first section after the "Applies to" header |
| No "what to tell the user" script for L1 | L1 agent goes silent during troubleshooting; user experience degrades | Include a one-line user communication script at each major step: "Tell the user: 'I am checking the device enrollment status, please hold'" |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Error Code Table:** Often missing the deployment mode column — verify every row has an applicable deployment mode tag (user-driven / self-deploying / pre-provisioning / APv2)
- [ ] **Pre-Provisioning Guide:** Often missing the GPO conflict table — verify the four specific GPO settings that break pre-provisioning are documented (interactive logon message, smart card required, UAC prompt on secure desktop)
- [ ] **L1 Decision Tree:** Often missing the escalation data collection checklist — verify L1 knows exactly what to capture before escalating (serial, error code, deployment mode, event log, screenshot)
- [ ] **Hybrid Join Guide:** Often missing the connector version check — verify "minimum connector version 6.2501.2000.5" appears in the prerequisites
- [ ] **Network Prerequisites Section:** Often missing `lgmsapeweu.blob.core.windows.net` (required for Autopilot diagnostic upload) — verify the full endpoint list, not just the commonly cited five
- [ ] **ESP Troubleshooting:** Often missing the LOB+Win32 app mixing failure mode — verify the "Another installation is in progress" error and the Teams Machine-Wide Installer conflict are documented
- [ ] **Version Gates:** Often missing OS version tags on Windows 11-only steps — verify every reference to the diagnostics page (CTRL+SHIFT+D) is tagged `[Windows 11 only]`
- [ ] **APv2 vs. APv1 Disambiguation:** Often missing the "this guide does not apply to APv2" note — verify every classic Autopilot guide states its scope explicitly
- [ ] **Last Reviewed Date:** Often absent — verify every guide has a "Last verified:" date and a "Review by:" date in the frontmatter

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Version conflation (APv1/APv2 mixed) discovered after publishing | HIGH | Audit all guides, add version gates; create disambiguation landing page; notify L1 team of change; re-test all flowcharts against each version |
| Error code table has single-cause entries for multi-cause codes | MEDIUM | Add "Root cause" and "Deployment Mode" columns; re-research each code against current Microsoft Learn FAQ; publish corrected table with change note |
| Pre-provisioning not documented as first-class mode | HIGH | Create dedicated pre-provisioning section from scratch; do not retrofit existing self-deploying guide; requires dedicated testing on pre-provisioning hardware |
| L1/L2 audience conflation in guides | MEDIUM | Split guides by audience; establish the two-file naming convention; communicate to both teams which file they should use; archive the merged guide |
| Stale guide with outdated connector log path or behavior | LOW | Point fix: update affected steps, update "Last verified" date, add a change note at top of guide explaining what changed and when |
| Missing network pre-check in flowchart | LOW | Insert network gate at the top of each affected decision tree; this is an additive change that does not invalidate existing branches |
| Hybrid join guide missing connector version prerequisite | LOW | Add prerequisites checklist at top of guide; single-line addition but requires communicating to L1/L2 that guides were updated |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| APv1 vs. APv2 conflation | Phase 1: Lifecycle Documentation Foundation | Every guide reviewed for version scope statement before phase closes |
| Error code tables without context columns | Phase 3: Error Code Lookup Tables | Each code row has: mode tag, multi-cause handling, phase-of-failure grouping |
| Pre-provisioning treated as edge case | Phase 2: Deployment Mode Guides | Pre-provisioning is a top-level section with technician/user phase distinction |
| Single-audience docs for L1 and L2 | Phase 1: Lifecycle Documentation Foundation | Two-file convention enforced from first deliverable; templates finalized before writing begins |
| Missing network pre-checks | Phase 2: Deployment Mode Guides | Every mode guide opens with network gate; full endpoint list included |
| Flowcharts without terminal states | Phase 4: L1 Decision Trees | Every flowchart reviewed for terminal states (resolved / escalate L2 / escalate network) before phase closes |
| Windows version differences undocumented | Phase 3 and Phase 5 | Version tag audit run on all content; spot-check on Windows 10 21H2 |
| Stale documentation / no review cadence | Phase 1: Lifecycle Documentation Foundation | Review cadence and "Last verified" metadata standard established in first template |
| Hybrid join complexity underestimated | Phase 5: Scenario Runbooks | Hybrid join is a standalone runbook with prerequisites checklist; connector version check is step 1 |
| ESP device/user phase conflation | Phase 5: Scenario Runbooks | ESP runbook reviewed for explicit device/user phase branching; LOB+Win32 conflict documented |

---

## Sources

- [Windows Autopilot troubleshooting FAQ — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/troubleshooting-faq) (last updated February 2026)
- [Windows Autopilot known issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/known-issues) (active February 2026 entries)
- [Windows Autopilot device preparation known issues — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/known-issues)
- [Compare Windows Autopilot device preparation and Windows Autopilot — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/device-preparation/compare)
- [Troubleshoot the Enrollment Status Page — Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/understand-troubleshoot-esp)
- [Windows Autopilot for pre-provisioned deployment — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/pre-provision)
- [What's new in Windows Autopilot — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/whats-new)
- [Enrollment for Microsoft Entra hybrid joined devices — Microsoft Learn](https://learn.microsoft.com/en-us/autopilot/windows-autopilot-hybrid)
- [Tiered Support Structures: Designing L1, L2, and L3 Handoffs — Supportbench](https://www.supportbench.com/tiered-support-structures-designing-l1-l2-l3-handoffs/)
- [Autopilot Hybrid Azure AD Join Breakpoints — MDM Tech Space](https://joymalya.com/autopilot-hybrid-azure-ad-join-breakpoints/)
- [APv2 and pre-provisioning: We can do that too — Out of Office Hours](https://oofhours.com/2025/05/30/apv2-and-pre-provisioning-we-can-do-that-too/)
- [A Tale of Two Autopilots — FlowDevs](https://www.flowdevs.io/post/a-tale-of-two-autopilots)
- Community-validated issue: White Glove pre-provisioning failing with region/keyboard preset — [GitHub MicrosoftDocs/memdocs issue #1285](https://github.com/MicrosoftDocs/memdocs/issues/1285)

---
*Pitfalls research for: Windows Autopilot IT Documentation — L1/L2 Troubleshooting Guides*
*Researched: 2026-03-10*
