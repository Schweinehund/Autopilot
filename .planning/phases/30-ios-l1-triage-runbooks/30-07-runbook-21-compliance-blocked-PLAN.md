---
phase: 30-ios-l1-triage-runbooks
plan: 07
type: execute
wave: 2
depends_on: [30-01, 30-02]
files_modified:
  - docs/l1-runbooks/21-ios-compliance-blocked.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "An L1 agent reading runbook 21 can distinguish three causes of compliance-blocked access — CA Gap (first compliance evaluation pending), Actual Policy Mismatch, Default Posture 'Not compliant' Configuration — via a top-of-runbook How to Use This Runbook sub-navigator (macOS runbook 11 pattern)"
    - "Runbook 21 is the ONLY runbook with a User Action Required section (D-09 + D-13) — user-actionable remediation includes iOS update, passcode change, device restart"
    - "An L1 agent can deep-link from runbook 21 Cause A to `../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access` (Phase 28 D-11 anchor that exists)"
    - "Jailbreak detection triggers immediate Security-team escalation (NOT standard L2 queue) per research Q5"
    - "Each sub-cause contains its own nested sub-sections (per-cause Symptom / L1 Triage Steps / Admin Action Required / User Action Required / Escalation) maintaining D-10 actor-boundary clarity at the sub-cause level per D-28"
  artifacts:
    - path: "docs/l1-runbooks/21-ios-compliance-blocked.md"
      provides: "L1 multi-cause runbook: CA gap / policy mismatch / default posture; includes User Action Required section"
      min_lines: 180
      max_lines: 280
      contains_all:
        - "## How to Use This Runbook"
        - "## Cause A"
        - "## Cause B"
        - "## Cause C"
        - "## User Action Required"
        - "## Escalation Criteria"
        - "> **Platform gate:**"
        - "06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access"
        - "Not evaluated"
        - "jailbroken"
  key_links:
    - from: "docs/l1-runbooks/21-ios-compliance-blocked.md Cause A"
      to: "docs/admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access"
      via: "Phase 28 D-11/D-12 CA-timing deep-link (anchor verified present)"
      pattern: "06-compliance-policy\\.md#compliance-evaluation-timing-and-conditional-access"
    - from: "docs/l1-runbooks/21-ios-compliance-blocked.md Cause C"
      to: "docs/admin-setup-ios/06-compliance-policy.md"
      via: "Phase 28 D-14 default-posture reference"
      pattern: "06-compliance-policy\\.md"
---

<objective>
Create `docs/l1-runbooks/21-ios-compliance-blocked.md` — the ONLY multi-cause L1 runbook in Phase 30 and the ONLY runbook with a User Action Required section (D-09 + D-13). Uses the macOS runbook 11 multi-symptom H2 layout (per D-28) with sub-causes A/B/C, each carrying its own nested D-10 actor-boundary sub-structure.

Purpose: Enables an L1 agent to identify WHICH of three compliance-failure causes applies (fast routing via "How to Use This Runbook" sub-navigator), execute L1 checks per cause, and hand a cause-specific escalation packet to the admin. This runbook is also the only place where user-side device actions (iOS update, passcode change, device restart) are in scope (D-09).

Wave 2 — depends on Plan 30-01 (template) + Plan 30-02 (triage tree back-link target IOSR6). Parallel with Plans 30-03, 30-04, 30-05, 30-06.
Output: One new L1 runbook markdown file — the longest runbook in the phase (target 200-280 lines).
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
<!-- Structural template: docs/l1-runbooks/11-macos-setup-assistant-failed.md (multi-symptom H2 layout is the D-28 template) -->

Frontmatter (D-25 locked — applies_to: all):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
```

Platform gate banner (D-26 verbatim line 9).

H1: `# iOS Compliance Blocked / Access Denied`
Intro: "Use this runbook when an iOS/iPadOS user is enrolled in Intune but Conditional Access is blocking access to Microsoft 365 resources (Outlook, SharePoint, Teams, OneDrive, etc.), OR when the device is showing as 'Non-compliant' or 'Not evaluated' in Intune without a clear reason. This is the ONLY iOS L1 runbook that includes user-actionable remediation (device restart, iOS update, passcode change) — the other 5 runbooks are tenant-config failures that require admin action."

<!-- SUB-NAVIGATOR (D-28 — macOS runbook 11 pattern verbatim) -->

Immediately after intro, BEFORE any sub-cause H2:

```markdown
## How to Use This Runbook

Go directly to the section matching the observation:

- [Cause A: CA Gap (First Compliance Evaluation Pending)](#cause-a-ca-gap) — User just enrolled within the last 30 minutes; Intune shows compliance state "Not evaluated" or "In grace period"
- [Cause B: Actual Policy Mismatch](#cause-b-policy-mismatch) — Intune shows "Non-compliant" with a specific failing setting (OS version, passcode, jailbreak detection, restricted-apps list)
- [Cause C: Default Posture "Not Compliant" Configuration](#cause-c-default-posture) — Device is enrolled but has no compliance policy assigned, AND the tenant default-posture toggle is set to "Not compliant", AND CA requires compliant device

If none of the above matches the observation, proceed directly to the [overall Escalation Criteria](#escalation-criteria) at the bottom.
```

<!-- SECTION HEADINGS — use PANDOC-style {#id} attributes so that internal #cause-a-ca-gap links resolve (macOS runbook 11 uses this verbatim; GitHub's markdown rendering supports these) -->

<!-- Each sub-cause uses H2 AT THE SUB-CAUSE LEVEL (macOS runbook 11 pattern), and H3 for the nested actor-boundary sub-sections inside. This keeps the D-10 clarity principle at sub-cause level. -->

```markdown
## Cause A: CA Gap (First Compliance Evaluation Pending) {#cause-a-ca-gap}

**Entry condition:** User completed enrollment within the last 30 minutes AND is being denied access to Microsoft 365 resources. Intune P-09 shows compliance state "Not evaluated" or "In grace period".

### Symptom
- User enrolled recently (within 30 min) and cannot reach Outlook / SharePoint / Teams.
- Intune admin center P-09 (`Devices > All devices > [device] > Device compliance`) shows state: "Not evaluated"

### L1 Triage Steps
1. Say-to-user status callout: `> **Say to the user:** "Your device just enrolled and Intune is still evaluating compliance. This usually takes 15-30 minutes after enrollment completes. During this window, access to corporate resources may be blocked. Please wait ~30 minutes from enrollment, then retry."`
2. Navigate to P-09. Confirm state = "Not evaluated" AND enrollment completion timestamp within last 30 minutes.
3. Deep-link for admin/user reference: the CA timing behavior is documented at [iOS Compliance Policy Guide § Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access).

### User Action Required
- Wait 30 minutes from enrollment completion.
- Retry accessing the blocked resource (sign out / sign in to Outlook / Teams / Company Portal may help).
- Power-cycle the device IF 30 minutes have elapsed and state is still Not evaluated (forces fresh Intune check-in).

### Admin Action Required
- None if the 30-minute window has not elapsed. This is expected CA gap behavior.
- If > 30 minutes elapsed and state is STILL "Not evaluated": see [Cause C](#cause-c-default-posture) (default-posture toggle may be the cause) OR escalate (APNs / check-in problem).

### Escalation (within Cause A)
- State remains "Not evaluated" > 30 minutes after enrollment — escalate (likely runbook 16 APNs or check-in problem overlap).

---

## Cause B: Actual Policy Mismatch {#cause-b-policy-mismatch}

**Entry condition:** Intune P-09 shows compliance state "Non-compliant" with at least one specific failing setting listed.

### Symptom
- User can reach Company Portal but is blocked from Outlook / SharePoint / Teams.
- P-09 shows: compliance state "Non-compliant" + one or more failing settings (OS version, passcode, jailbreak, restricted-apps list).
- Failing setting is clickable in Intune portal — provides remediation guidance per Microsoft Learn **[CITED: learn.microsoft.com/intune/intune-service/protect/compliance-policy-monitor]**.

### L1 Triage Steps
1. Say-to-user status callout.
2. Navigate to P-09 > device compliance tab. Click the "Non-compliant" state to view failing settings.
3. Record which settings are failing and what Intune's remediation guidance says.
4. Common failing settings:
   - **OS version below minimum** → user action (update iOS)
   - **Passcode complexity mismatch** → user action (change passcode)
   - **Jailbreak detected** → IMMEDIATE Security team escalation (NOT L2; see Escalation Criteria)
   - **Restricted app installed** → user action (remove app) OR admin adjusts list

### User Action Required (per failing setting)
- **OS version below minimum:** `> **Say to the user:** "Please update to iOS [version X] or later. Open Settings > General > Software Update. This may take 20-30 minutes. After the update, please wait 15 minutes for Intune to re-evaluate compliance."`
- **Passcode complexity mismatch:** `> **Say to the user:** "Please change your passcode to meet the policy: [N+ characters, complexity rules]. Go to Settings > Face ID & Passcode > Change Passcode."`
- **Restricted app installed:** `> **Say to the user:** "Please uninstall [App name] to meet compliance. Touch-and-hold the app icon, tap Remove App."`
- **Device restart (any persistent issue):** `> **Say to the user:** "Please restart your device by holding the side button and volume up until the power-off slider appears, then power back on. Wait 15 minutes before retesting."`

> **Optional per D-08 extension (research open question Q4):** After the user completes a required action, L1 MAY trigger a per-device Intune sync via `Devices > All devices > [device] > Sync` to accelerate re-evaluation. This is a per-device sync (not tenant-scope) matching macOS runbook 12 step 6 precedent. If strict D-08 literal (ADE token sync only) is preferred, defer the sync to the admin.

### Admin Action Required
- **Only if** the compliance policy setting itself is too strict for the user's device (e.g., minimum OS version set ahead of Apple's current release per `../admin-setup-ios/06-compliance-policy.md` failure-pattern line 216):
  - **Ask the admin to:** review compliance policy minimum-OS vs Apple's current release; adjust policy if set too aggressively.
  - **Verify:** P-09 compliance state returns to Compliant after user action AND policy review.

### Escalation (within Cause B)
- User performs required action (OS update, passcode change) but compliance remains Non-compliant after 60 minutes
- Jailbreak detection — **escalate to Security team immediately** (NOT L2 alone; this is a security-incident track per 30-RESEARCH.md § 9 Q5)

---

## Cause C: Default Posture "Not Compliant" Configuration {#cause-c-default-posture}

**Entry condition:** User has NO compliance policy assigned AND tenant-wide default-posture setting is "Not compliant" AND CA "Require compliant device" is active → user is blocked without any failing-setting signal.

### Symptom
- User is blocked from Microsoft 365 resources.
- P-09 shows: compliance state "Non-compliant" (NOT "Not evaluated") but lists NO failing settings because NO compliance policy is assigned.
- At P-08 (`Endpoint security > Device compliance > Compliance policy settings`), the "Mark devices with no compliance policy assigned as" toggle is set to "Not compliant".

### L1 Triage Steps
1. Say-to-user status callout.
2. Navigate to P-09. Confirm compliance state = "Non-compliant" AND "No compliance policy assigned".
3. Navigate to P-08: `Endpoint security > Device compliance > Compliance policy settings`. Document the current "Mark devices with no compliance policy assigned as" toggle value ("Compliant" / "Not compliant").
4. Also document whether the user exists in any Entra group that SHOULD have a compliance policy assigned (via Intune > Compliance policies > [policy] > Assignments).

### Admin Action Required
- **Ask the admin to (choose one):**
  1. Assign an appropriate iOS compliance policy to the user's Entra group (preferred — aligned to Microsoft Learn recommendation at `compliance-policy-monitor § Important concepts`).
  2. If the user is genuinely exempt (executive override, special-case BYOD), add the user to an exempt group OR adjust the CA policy's scope.
- **Verify:** P-09 compliance state transitions from "Non-compliant" to "Compliant" once policy is assigned and evaluated.

### Escalation (within Cause C)
- Admin assigns policy but P-09 compliance state does not update after 30 minutes — likely check-in problem; escalate.

---

## Escalation Criteria

(Overall — applies across all three causes.)

Escalate to L2 if:
- Cause A: state remains "Not evaluated" > 30 minutes after enrollment (overlap with runbook 16 — APNs check-in issue)
- Cause B: user performs required action (OS update, passcode change) but compliance remains non-compliant after 60 minutes
- Cause C: admin assigns policy but compliance state does not update (check-in issue)

**Escalate to Security team IMMEDIATELY (not L2) if:**
- Cause B jailbreak-detection triggered on a device user is actively using — this is a security-incident track per the device's `06-compliance-policy.md` line 217 ("Known jailbroken devices treated as compliant; data exfiltration risk open") escalation posture

**Before escalating, collect:**

- Device serial number + iOS version
- User UPN
- Screenshot of P-09 compliance state view with failing settings (if any) visible
- Timestamp of enrollment completion (for Cause A)
- P-08 default-posture toggle value (for Cause C)
- User-actions attempted (if any) and outcome
- Which Cause (A/B/C) closest matches observation
```

Closing block:
```markdown
---

[Back to iOS Triage](../decision-trees/07-ios-triage.md)

See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced compliance / CA investigation (Phase 31 placeholder).
For admin configuration references:
- [iOS Compliance Policy Guide](../admin-setup-ios/06-compliance-policy.md)
- [iOS Compliance Policy § Compliance Evaluation Timing and Conditional Access](../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access) — Cause A deep-link
- [iOS Enrollment Overview](../ios-lifecycle/00-enrollment-overview.md)
- [Runbook 16: APNs Expired](16-ios-apns-expired.md) — If Cause A state remains "Not evaluated" > 30 minutes, APNs check-in issue may overlap

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-17 | Initial version | -- |
```
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Create 21-ios-compliance-blocked.md with multi-cause sub-structure and User Action Required section</name>
  <read_first>
    - docs/l1-runbooks/11-macos-setup-assistant-failed.md (FULL FILE — PRIMARY multi-symptom H2 template per D-28; note the "How to Use This Runbook" sub-navigator at lines 22-28, the `{#slug}` Pandoc anchor syntax at lines 31/53/73, the `---` horizontal rule separator between sub-sections)
    - docs/l1-runbooks/12-macos-profile-not-applied.md (look at macOS runbook 12 step 6 for the per-device sync pattern that informs D-08 extension in Cause B)
    - docs/l1-runbooks/14-macos-compliance-access-blocked.md (cross-platform structural reference per research Q6 — ensure iOS runbook 21 does not introduce contradictions with macOS runbook 14's escalation-path pattern)
    - docs/admin-setup-ios/06-compliance-policy.md — CRITICAL: verify the anchor `#compliance-evaluation-timing-and-conditional-access` exists (Phase 28 D-11 content); verify line 217 jailbreak language
    - docs/decision-trees/07-ios-triage.md (Wave 1 output — confirm IOSR6 click target)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 4 "Runbook 21" (lines ~467-533) — full sub-cause content
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 9 Q4 (per-device sync D-08 extension) + Q5 (jailbreak → Security team NOT L2)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-09, D-10, D-13, D-14, D-28, Specifics line 254
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/21-ios-compliance-blocked.md"
  </read_first>
  <behavior>
    - File created; frontmatter `applies_to: all` (D-25 locked)
    - Platform gate banner line 9 (D-26)
    - "How to Use This Runbook" sub-navigator immediately follows intro, listing 3 anchored links to Cause A/B/C
    - Three H2 sub-cause sections (`## Cause A: ...`, `## Cause B: ...`, `## Cause C: ...`) each with Pandoc `{#id}` anchor syntax
    - Each sub-cause contains nested H3 sub-sections: Symptom, L1 Triage Steps, User Action Required (where applicable), Admin Action Required, Escalation (within cause)
    - Cause A contains deep-link `../admin-setup-ios/06-compliance-policy.md#compliance-evaluation-timing-and-conditional-access`
    - Cause B User Action Required covers iOS update, passcode change, restricted-app removal, device restart — all as "Say to the user" callouts
    - Cause B includes the optional D-08 extension per-device-sync note with cross-link to macOS runbook 12 precedent
    - Cause B Escalation lists jailbreak → Security team (NOT L2)
    - Cause C documents the default-posture toggle pathway
    - Runbook ends with a SINGLE overall `## Escalation Criteria` (not three separate) that consolidates conditions per cause + the Security-team callout
    - File length 180-280 lines (longest runbook in phase per CONTEXT.md Specifics line 249)
    - Validator Check 4 flips to PASS: this is the ONLY runbook file with `## User Action Required` heading
  </behavior>
  <action>
    Follow the runbook 21 `<interfaces>` block verbatim. Structural requirements:

    **"How to Use This Runbook" sub-navigator — CRITICAL placement:** Appears between intro and the first `## Cause A:` section. Uses Pandoc-style anchored links (`#cause-a-ca-gap`, `#cause-b-policy-mismatch`, `#cause-c-default-posture`). This is the macOS runbook 11 pattern verbatim.

    **Sub-cause H2 headings with Pandoc anchors:** Use the exact syntax:
    ```
    ## Cause A: CA Gap (First Compliance Evaluation Pending) {#cause-a-ca-gap}
    ## Cause B: Actual Policy Mismatch {#cause-b-policy-mismatch}
    ## Cause C: Default Posture "Not Compliant" Configuration {#cause-c-default-posture}
    ```

    These anchors match the sub-navigator links above. GitHub's markdown rendering supports these Pandoc attributes.

    **Per-sub-cause structure (H3 nested per D-28 + D-10 principle):** Each cause has:
    - `**Entry condition:**` opening line (NOT an H3; inline bold per macOS 11 line 33 precedent)
    - `### Symptom` (H3)
    - `### L1 Triage Steps` (H3 — numbered imperative)
    - `### User Action Required` (H3 — ONLY where applicable: Cause A yes, Cause B yes, Cause C no)
    - `### Admin Action Required` (H3)
    - `### Escalation (within Cause X)` (H3 — local escalation conditions)

    **NOTE:** The per-sub-cause H3 "User Action Required" is DIFFERENT from the file-level `## User Action Required` that Check 4 looks for. Check 4 is defined as `grep -l "^## User Action Required"` — it matches only H2 headings. Runbook 21 does NOT need a top-level H2 with that exact text to satisfy Check 4 IF AND ONLY IF Check 4's expected value is 1 AND no other runbook has an H2 with that text.

    **Revised plan to guarantee Check 4 PASS:** Add ONE top-level file-scope `## User Action Required` H2 section AFTER the three Causes but BEFORE the overall `## Escalation Criteria` H2. That section consolidates the cross-cause user-action summary (restart, update iOS, passcode change) — essentially a cross-reference index to the per-cause actions. This satisfies:
    - D-09: user-actions are in scope for runbook 21
    - D-13: this section is PRESENT on runbook 21 and ABSENT on runbooks 16-20
    - Check 4: exactly 1 runbook file has H2 `## User Action Required` → PASS
    - D-10 actor-boundary: reinforces the user-action visibility at file scope

    The `## User Action Required` H2 placement:
    ```markdown
    ## User Action Required

    User-actionable remediation is documented per sub-cause above. Cross-reference summary:

    - **Cause A** (CA gap): Wait 30 minutes from enrollment; retry. Power-cycle device if > 30 minutes.
    - **Cause B** (policy mismatch): Update iOS if OS-version failure; change passcode if passcode complexity failure; uninstall restricted app if applicable; restart device.
    - **Cause C** (default posture): NOT user-fixable — admin action required.

    See the per-cause sections above for the exact "Say to the user" scripts and remediation guidance.
    ```

    **Sub-cause ordering:** A → B → C with `---` horizontal rule separating each.

    **Cause B jailbreak Escalation:** MUST explicitly state "Escalate to Security team immediately (NOT L2 alone)" per research Q5. Include the Phase 28 D-14 cross-reference to `06-compliance-policy.md` line 217 jailbreak-posture-gap text.

    **Cause B D-08 extension per-device sync:** Frame as OPTIONAL with cross-link to macOS runbook 12 precedent. Quote the interfaces block verbatim. Do NOT promote this to a required step.

    **Overall Escalation Criteria H2:** Single section at bottom, consolidates per-cause escalation + Security-team escalation + "Before escalating, collect:" data items.

    **Closing block:** Back to iOS Triage + L2 Phase 31 placeholder + admin-setup cross-refs (including specifically the Cause A deep-link) + cross-ref to runbook 16 for Cause A APNs overlap + Version History 2026-04-17.

    **CRITICAL — DO NOT:**
    - Extend to MAM-WE scenarios (D-31 — explicitly deferred to ADDTS-01 future milestone; runbook 21 is MDM-compliance only)
    - Add Android content (Phase 29 D-27 / project out-of-scope)
    - Use real compliance policy names / real tenant group names in examples
    - Include PowerShell / CLI commands
    - Include iOS screenshots of actual devices (Out-of-Scope per REQUIREMENTS screenshot-heavy-walkthrough exclusion)
    - Let Cause C User Action Required section APPEAR — Cause C is NOT user-fixable; the `### User Action Required` H3 is OMITTED inside Cause C (matches macOS runbook 11 pattern of omitting inapplicable sub-sections rather than filling with N/A)
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - File exists; Checks 7/11/12 flip PASS; Check 3 contributes +1 of 6 (final tally 6/6); Check 4 flips to PASS (exactly 1 runbook has `## User Action Required` H2)
    - `grep -c "^## Cause [ABC]:" docs/l1-runbooks/21-ios-compliance-blocked.md` = 3
    - `grep -c "^## User Action Required" docs/l1-runbooks/21-ios-compliance-blocked.md` = 1
    - `grep -c "^## How to Use This Runbook" docs/l1-runbooks/21-ios-compliance-blocked.md` = 1
    - `grep -c "compliance-evaluation-timing-and-conditional-access" docs/l1-runbooks/21-ios-compliance-blocked.md` ≥ 1 (Cause A deep-link)
    - `grep -ci "jailbroken\|jailbreak" docs/l1-runbooks/21-ios-compliance-blocked.md` ≥ 2 (Cause B failing-setting + Security team escalation)
    - `grep -c "Security team" docs/l1-runbooks/21-ios-compliance-blocked.md` ≥ 1 (Q5 immediate escalation path)
    - `grep -c "16-ios-apns-expired.md" docs/l1-runbooks/21-ios-compliance-blocked.md` ≥ 1 (Cause A overlap cross-ref)
    - `wc -l docs/l1-runbooks/21-ios-compliance-blocked.md` returns a number between 180 and 280
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| L1 agent → runbook | User-action remediation in scope (device-side only); per-device sync optional; no tenant-config writes |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-07-01 | Elevation of Privilege | D-09 user-action scope (iOS update, passcode change) | accept | Device-side actions are user-authority; L1 instructs user to perform them; no tenant scope crossing |
| T-30-07-02 | Security incident handling | Jailbreak detection | mitigate | Explicit Security-team escalation branch (NOT L2) per research Q5; reinforces security-incident track and matches Phase 28 D-14 posture-gap language |
| T-30-07-03 | Content leakage | Example UPN / device name | mitigate | Use placeholders; reviewer spot-check |
| T-30-07-04 | Routing correctness | Multi-cause sub-navigator correctness | mitigate | Pandoc `{#id}` anchors match sub-navigator href targets exactly; validator Check 4 catches missing file-scope H2 |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 3, 4, 7, 11, 12 ALL flip to PASS after this plan lands (runbook 21 is the last runbook file to complete the 6-file set, and the ONLY file providing the Check 4 `## User Action Required` match)
2. Manual: verify the How to Use This Runbook anchors match the Pandoc `{#id}` attributes on the Cause headings exactly
3. Manual: confirm Cause C contains NO User Action Required H3 (Cause C is admin-action-only)
4. Manual: confirm Security-team escalation branch is present for jailbreak (Q5)
5. Manual: confirm no Android / MAM-WE / Shared iPad content
</verification>

<success_criteria>
- [x] File created with D-21 filename
- [x] Frontmatter `applies_to: all` (D-25 locked)
- [x] Platform gate banner line 9 (D-26)
- [x] "How to Use This Runbook" sub-navigator before first cause
- [x] Three Cause A/B/C H2 sections with Pandoc anchors
- [x] Each cause has nested H3 sub-sections (Symptom / L1 Triage Steps / Admin Action Required / Escalation; User Action Required where applicable)
- [x] Cause A deep-links to Phase 28 D-11 CA-timing anchor
- [x] Cause B includes Security-team escalation for jailbreak
- [x] Cause B includes optional D-08 per-device-sync extension note
- [x] Cause C documents default-posture toggle pathway
- [x] File-scope `## User Action Required` H2 section present (summary/cross-reference) — satisfies Check 4
- [x] Overall `## Escalation Criteria` H2 consolidates cross-cause conditions
- [x] File length 180-280 lines
- [x] Validator Checks 3, 4 (critical — only runbook 21 has User Action H2), 7, 11, 12 all PASS
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-07-SUMMARY.md` with file length, confirmation of all three Cause sub-sections with Pandoc anchors, confirmation of the file-scope User Action Required H2, and any deviations from the interfaces content.
</output>
