---
phase: 30-ios-l1-triage-runbooks
plan: 04
type: execute
wave: 2
depends_on: [30-01, 30-02]
files_modified:
  - docs/l1-runbooks/17-ios-ade-not-starting.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "An L1 agent reading runbook 17 can distinguish the three ADE-not-starting failure signatures per Specifics line 251: (a) device never appears post-reset, (b) Setup Assistant stuck past welcome, (c) user reaches Apple sign-in but Microsoft sign-in never appears"
    - "An L1 agent can identify the likely failure mode (ABM token, enrollment profile, authentication method, user affinity) from portal observations alone"
    - "An L1 agent performs the single documented L1 write-action exception — manual ADE token sync (D-08) — when all other checks pass but the device still doesn't appear"
    - "All three Admin Action Required sub-packets are documented — token renewal, profile assignment, modern-auth change — mapped to which signature triggers which packet"
  artifacts:
    - path: "docs/l1-runbooks/17-ios-ade-not-starting.md"
      provides: "L1 runbook for ADE enrollment not starting — single-flow with three failure signatures; includes D-08 manual-sync L1 write exception"
      contains_all:
        - "## Symptom"
        - "## L1 Triage Steps"
        - "## Admin Action Required"
        - "## Escalation Criteria"
        - "> **Platform gate:**"
        - "Enrollment program tokens"
        - "manual sync"
        - "../admin-setup-ios/02-abm-token.md"
        - "../admin-setup-ios/03-ade-enrollment-profile.md"
      min_lines: 130
      max_lines: 200
  key_links:
    - from: "docs/l1-runbooks/17-ios-ade-not-starting.md L1 Triage Steps § manual-sync step"
      to: "Intune Devices > Device onboarding > Enrollment > Apple > Enrollment program tokens > [token] > Sync"
      via: "D-08 portal path P-03 verbatim"
      pattern: "Enrollment program tokens.*Sync"
    - from: "docs/l1-runbooks/17-ios-ade-not-starting.md Admin Action packet"
      to: "docs/admin-setup-ios/02-abm-token.md + docs/admin-setup-ios/03-ade-enrollment-profile.md"
      via: "markdown links to both admin setup guides"
      pattern: "admin-setup-ios/(02-abm-token|03-ade-enrollment-profile)"
---

<objective>
Create `docs/l1-runbooks/17-ios-ade-not-starting.md` — L1 runbook for "ADE not starting" (supervised corporate enrollment fails to reach Intune, or Setup Assistant stalls on the enrollment step). Uses D-10 sectioned actor-boundary format. This is the ONLY runbook containing the D-08 manual-sync L1 write-action exception (other write exceptions are prohibited).

Purpose: Enables an L1 agent to distinguish three common ADE failure signatures (Specifics line 251), document the correct escalation packet per signature, and perform the manual ADE token sync as a narrowly-scoped retry action before escalation.

Wave 2 — depends on Plan 30-01 (template) and Plan 30-02 (triage tree back-link target IOSR2). Parallel with Plans 30-03, 30-05, 30-06, 30-07.
Output: One new L1 runbook.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md
@.planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md
@.planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md

<interfaces>
<!-- Structural template: docs/l1-runbooks/10-macos-device-not-appearing.md; step 10 of that file is the D-08 manual-sync precedent -->

Frontmatter (D-25 locked for runbook 17):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: ADE
audience: L1
platform: iOS
---
```

Platform gate banner (D-26 verbatim — line 9):
```markdown
> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

H1 + intro: `# iOS ADE Enrollment Not Starting` + intro explaining scope (supervised ADE enrollment via ABM — not Company Portal, not web-based; if user is on personal/BYOD, different runbook).

Section sequence (D-10 — NO User Action Required per D-13):
```
## Symptom
## L1 Triage Steps
## Admin Action Required
## Escalation Criteria
```

<!-- Content source: 30-RESEARCH.md § 4 Runbook 17 (lines ~306-345) + CONTEXT.md Specifics lines 250-251 -->

Symptom section — 3 failure signatures + back-link:
- **Signature (a):** Device never appears in Intune after factory reset. Setup Assistant may start, but no MDM profile arrives. Typically ABM token expiry or missing enrollment profile.
- **Signature (b):** Device appears in Intune but Setup Assistant stays stuck past welcome / sign-in screens (does not advance to "Your iPhone is set up by [organization]"). Typically enrollment profile misconfiguration or Await-final-configuration stuck.
- **Signature (c):** User reaches the Apple sign-in screen successfully, but the expected Microsoft sign-in screen never appears. Typically authentication-method set to "Setup Assistant (legacy)" which blocks modern CA — **[CITED]** Microsoft Learn troubleshoot-ios-enrollment-errors § "ADE enrollment stuck at user login".

Back-link (D-11): `Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR2 "ADE Setup Assistant stuck or no MDM profile" branch.`

L1 Triage Steps (D-07 detect-and-escalate + D-08 manual sync exception; numbered imperative):
1. Say-to-user status opener (D-14 restrained): `> **Say to the user:** "We're checking your device enrollment. Please keep the device powered on and connected to Wi-Fi. I'll update you in a few minutes."`
2. Navigate to P-04: `Devices > All devices > iOS/iPadOS`. Search by device serial number. Record: device present Y/N; if present, its enrollment type and last check-in.
3. Navigate to P-02: `Devices > Device onboarding > Enrollment > Apple (tab) > Enrollment program tokens`. For the active iOS token, record: **Status** (Active / Expired / Expiring soon), **token Apple ID**, **Profiles** (list of profiles assigned).
4. If token Status is "Expired" or "Expiring soon": proceed directly to Admin Action Required — token renewal required.
5. On the token, confirm an enrollment profile is assigned as Default (or to this device's group). Record profile name.
6. If no profile is assigned: proceed to Admin Action Required — profile assignment required.
7. If token Active + profile assigned but device does not appear in Intune (Signature a): perform the **manual ADE token sync** — the single L1 write-action exception documented for this runbook (D-08). Navigate to P-03: `Devices > Device onboarding > Enrollment > Apple (tab) > Enrollment program tokens > [token] > Sync`. Wait 5 minutes. Re-search by serial in P-04.
   > **Note:** This sync is a READ retry — it re-triggers an existing configuration rather than creating or modifying one. This scope is matched to macOS runbook 10 step 10 precedent.
8. If sync does not surface the device: navigate to Apple Business Manager (`business.apple.com` → Devices). Search by serial. If not found: device is not in ABM (procurement issue) — proceed to Escalation Criteria.
9. If found in ABM: verify the MDM Server field in ABM. If blank or assigned to a different MDM server: proceed to Escalation Criteria with inter-org-release data documented.
10. For Signature (b) or (c): the portal checks in steps 3-6 typically reveal a misconfiguration. Proceed to Admin Action Required with the specific signature identified.

Portal-navigation-may-vary callout (admin-setup-ios project pattern) after step 2 or 3: `> Portal navigation may vary by Intune admin center version. See [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md#portal-navigation-note) for details.`

Admin Action Required (D-12 three-part packet — multi-path mapped to signature):
```markdown
L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to (select based on L1 triage finding):**

*Signature (a) — ABM token expired:*
- Renew the ABM/ADE token per [ABM/ADE Token Guide § Renewal](../admin-setup-ios/02-abm-token.md#renewal). Token renewal requires the Managed Apple ID associated with the token.

*Signature (a) — no profile assigned:*
- Create or assign an enrollment profile to the token per [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md). Assign as Default or to the device's group.

*Signature (b) — Await-final-configuration stuck or pending config errors:*
- Review Await-final-configuration setting and any pending configuration-profile delivery errors per [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md).

*Signature (c) — legacy authentication blocking modern CA:*
- Change the enrollment profile's Authentication method to **Setup Assistant with modern authentication** (not legacy) per [ADE Enrollment Profile Guide § Authentication method](../admin-setup-ios/03-ade-enrollment-profile.md#authentication-method). Legacy method blocks MFA-required Conditional Access policies — Microsoft Learn documents this as a common ADE-stuck-at-sign-in cause.

**Verify:**
- Signature (a) token renewal: token Status returns to Active in P-02 and newly-reset devices appear in P-04 within 15 minutes of sync.
- Signature (a) profile assignment: profile appears under the token; device arrives in Intune within 15 minutes.
- Signature (b): device advances past the Remote Management / Setup Assistant stuck screen.
- Signature (c): user retries enrollment; Microsoft sign-in screen appears after the Apple sign-in screen.

**If the admin confirms none of the above applies:**
- Proceed to [Escalation Criteria](#escalation-criteria).
```

NO User Action Required section (D-13 — user's action is to retry after admin fixes tenant state; that is not a meaningful user-side action).

Escalation Criteria (D-15):
```markdown
Escalate to L2 (or to the Intune admin directly if not already notified) if:

- ABM/ADE token expired AND admin does not have access to the Managed Apple ID used for token creation
- Device appears in ABM but is assigned to a different MDM server (inter-organization device release required)
- All portal checks pass and manual sync performed but device still does not appear after 30 minutes
- Admin already performed renewal and sync but device does not appear
- Signature (c) persists after authentication method is confirmed modern (deeper CA or MFA investigation needed)

**Before escalating, collect:**

- Device serial number
- Device make and model (iPhone/iPad variant)
- ABM device record screenshot (or note "not found in ABM")
- Enrollment token Status screenshot from P-02
- Enrollment profile name + key settings screenshot (User affinity, Authentication method, Await final configuration)
- Manual sync attempt timestamp and outcome
- Which signature (a/b/c) most closely matches the observed failure
```

Closing block:
```markdown
See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced ADE investigation (Phase 31 placeholder).
For admin configuration references:
- [ABM/ADE Token Guide](../admin-setup-ios/02-abm-token.md)
- [ADE Enrollment Profile Guide](../admin-setup-ios/03-ade-enrollment-profile.md)
- [iOS ADE Lifecycle](../ios-lifecycle/01-ade-lifecycle.md) — 7-stage enrollment pipeline

---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version | -- |
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create 17-ios-ade-not-starting.md with three failure signatures and D-08 manual-sync step</name>
  <read_first>
    - docs/l1-runbooks/10-macos-device-not-appearing.md (full file — specifically step 10 at line 43, the macOS precedent for manual ADE token sync; the D-08 L1 write exception in iOS mirrors this verbatim pattern)
    - docs/l1-runbooks/11-macos-setup-assistant-failed.md (single-symptom comparison; iOS runbook 17 is single-flow with three SUB-signatures inside Symptom, NOT multi-H2 — multi-H2 is reserved for runbook 21)
    - docs/admin-setup-ios/02-abm-token.md (verify `#renewal` anchor for admin packet deep-link)
    - docs/admin-setup-ios/03-ade-enrollment-profile.md (verify `#authentication-method` anchor for Signature c packet deep-link)
    - docs/decision-trees/07-ios-triage.md (Wave 1 output — confirm IOSR2 click target is `17-ios-ade-not-starting.md`)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 4 "Runbook 17 — iOS ADE Not Starting" (lines ~306-345) — verbatim content source
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-07, D-08, D-10-15, D-25, Specifics lines 250-251
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/17-ios-ade-not-starting.md"
  </read_first>
  <behavior>
    - File created at `docs/l1-runbooks/17-ios-ade-not-starting.md`
    - Frontmatter has `applies_to: ADE` (D-25 locked — NOT `all`; ADE-specific)
    - Platform gate banner per D-26 on line 9
    - 4 H2 sections present: Symptom, L1 Triage Steps, Admin Action Required, Escalation Criteria (D-10)
    - NO User Action Required section (D-13)
    - Symptom section describes all three failure signatures (a), (b), (c) per Specifics line 251
    - L1 Triage Steps section contains the D-08 manual-sync step with the EXACT portal path `Devices > Device onboarding > Enrollment > Apple (tab) > Enrollment program tokens > [token] > Sync`
    - Admin Action Required section has multi-signature sub-packets (a/b/c) within the single D-12 three-part structure
    - Deep-links to both `../admin-setup-ios/02-abm-token.md` and `../admin-setup-ios/03-ade-enrollment-profile.md` present
    - D-11 back-link to `../decision-trees/07-ios-triage.md` in Symptom section
    - File length 130-200 lines
  </behavior>
  <action>
    Create `docs/l1-runbooks/17-ios-ade-not-starting.md` from the `<interfaces>` block.

    **Step 1 — Frontmatter:** Use the YAML block exactly. Critical: `applies_to: ADE` (NOT `all` — this is an ADE-specific scenario).

    **Step 2 — Platform gate banner:** Line 9 verbatim from interfaces.

    **Step 3 — H1 + intro:** `# iOS ADE Enrollment Not Starting` + intro paragraph: "Use this runbook when a supervised ADE corporate-owned iOS/iPadOS device (from an Apple Business Manager enrollment) does not reach Intune after factory reset, stalls in Setup Assistant before completing enrollment, or the user never sees the Microsoft sign-in screen during Setup Assistant. For Company Portal or web-based (BYOD) enrollment failures, see [runbook 18](18-ios-enrollment-restriction-blocking.md) or [runbook 19](19-ios-license-invalid.md)."

    **Step 4 — Symptom section:** Three-signature block, each labeled (a)/(b)/(c) with a 1-2 sentence description per Specifics line 251 (text in interfaces). Follow with the D-11 back-link sentence referencing IOSR2.

    **Step 5 — L1 Triage Steps:** Numbered imperative 1-10 following the interfaces block. Critical requirements:
    - Step 1 uses the `> **Say to the user:**` D-14 status callout
    - Step 2 references P-04 path verbatim
    - Step 3 references P-02 path verbatim
    - Step 7 is the D-08 manual-sync exception with the P-03 path verbatim AND the nested `> **Note:**` callout explaining why this is scoped as a read-retry
    - Include the portal-navigation-may-vary callout referencing `../admin-setup-ios/00-overview.md#portal-navigation-note`

    **Step 6 — Admin Action Required section:** Open with "L1 documents and hands this packet to the Intune admin. L1 does not execute." Then use the multi-signature sub-packet format from interfaces:
    - Italic sub-headers `*Signature (a) — ABM token expired:*` etc. (italic so it's a visual break within the single "Ask the admin to" bullet structure, not a proper H3 — keeps D-12 three-part integrity)
    - Each signature maps to one admin directive with a deep-link to the admin-setup-ios reference
    - Single "Verify:" section with bullet per signature
    - Single "If the admin confirms none of the above applies:" closer pointing to Escalation Criteria

    **Step 7 — Omit User Action Required** per D-13.

    **Step 8 — Escalation Criteria:** Use the bullet list and "Before escalating, collect:" checklist from interfaces.

    **Step 9 — Closing block:** L2 placeholder link + 3 admin-setup cross-refs + iOS ADE Lifecycle link + horizontal rule + Back to iOS Triage + Version History row 2026-04-17.

    **Critical — DO NOT:**
    - Treat the three signatures as separate H2 sections (that pattern is reserved for runbook 21 per D-28; runbook 17 uses ONE Symptom H2 with sub-bulleted signatures inside)
    - Include PowerShell / shell commands / registry references
    - Include Prerequisites H2 (absorbed into L1 Triage Steps per D-10)
    - Use real ABM Apple IDs / tenant IDs / UPNs
    - Go past 200 lines
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - File exists; Checks 7/11/12 flip PASS for this file
    - Check 3 (Symptom H2) contributes 1 of 6 runbooks
    - Check 4 (User Action Required) unchanged (this file must contribute 0 — correct)
    - `grep -c "Enrollment program tokens" docs/l1-runbooks/17-ios-ade-not-starting.md` ≥ 2 (P-02 check + P-03 sync)
    - `grep -c "manual" docs/l1-runbooks/17-ios-ade-not-starting.md` ≥ 1 (D-08 manual sync)
    - `grep -c "admin-setup-ios/02-abm-token" docs/l1-runbooks/17-ios-ade-not-starting.md` ≥ 1
    - `grep -c "admin-setup-ios/03-ade-enrollment-profile" docs/l1-runbooks/17-ios-ade-not-starting.md` ≥ 1
    - `grep -c "User Action Required" docs/l1-runbooks/17-ios-ade-not-starting.md` = 0
    - `grep -c "applies_to: ADE" docs/l1-runbooks/17-ios-ade-not-starting.md` = 1
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| L1 agent → runbook | Runbook instructs portal observations and one narrowly-scoped write action (manual sync) |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-04-01 | Elevation of Privilege | D-08 manual-sync L1 write exception | mitigate | D-08 scope is explicitly bounded to a read-retry of an existing configuration; runbook Note callout reinforces the boundary; L1 is still blocked from CREATE/MODIFY token/profile actions |
| T-30-04-02 | Information Disclosure | Example UPNs / Apple IDs | mitigate | Use placeholders exclusively; PR reviewer spot-check |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 7, 11, 12 PASS for this file; Check 3 contributes +1 of 6; Check 4 unchanged
2. `grep -c "^## " docs/l1-runbooks/17-ios-ade-not-starting.md` — expect 5 (4 D-10 + Version History)
3. Manual: open file; confirm the three signatures (a)/(b)/(c) are sub-bullets/paragraphs inside a SINGLE Symptom H2 — not three separate H2 sections (reserved for runbook 21)
4. Manual: confirm the D-08 manual-sync step includes the P-03 path verbatim AND the Note explaining read-retry scoping
</verification>

<success_criteria>
- [x] File created with D-21 filename
- [x] Frontmatter has `applies_to: ADE` (D-25)
- [x] Platform gate banner on line 9 (D-26)
- [x] 4 D-10 H2 sections present
- [x] NO User Action Required H2 (D-13)
- [x] Three failure signatures in Symptom section per Specifics line 251
- [x] D-08 manual-sync step in L1 Triage Steps with P-03 verbatim
- [x] D-11 back-link present
- [x] D-12 Admin Action Required packet covers all three signatures
- [x] Deep-links to 02-abm-token.md AND 03-ade-enrollment-profile.md
- [x] Validator Checks 3, 7, 11, 12 flip toward PASS; Check 4 unchanged
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-04-SUMMARY.md` with file length, H2 section count, manual-sync step presence confirmation, and any deviations.
</output>
