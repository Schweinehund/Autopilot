---
phase: 30-ios-l1-triage-runbooks
plan: 06
type: execute
wave: 2
depends_on: [30-01, 30-02]
files_modified:
  - docs/l1-runbooks/19-ios-license-invalid.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "An L1 agent reading runbook 19 sees the second-portal-access requirement (Microsoft 365 admin center OR Microsoft Entra admin center) flagged up front as a PREREQUISITE-EQUIVALENT step before performing L1 Triage — if they lack this access, they escalate with the user's UPN documented (per D-35 research finding)"
    - "An L1 agent can recognize both license-invalid manifestations: the Stage-1 user-visible 'User Name Not Recognized' error AND the Stage-2 silent enrollment failure (device not visible in Intune despite apparent sign-in success)"
    - "The Admin Action Required packet directs the admin to the Microsoft 365 admin center path: `Users > Active Users > [user] > Product licenses > Edit` to assign an Intune-eligible license (Intune Plan 1/2, EMS E3/E5, or M365 E3/E5)"
    - "The runbook flags A1 (Stage-2 silent failure) with guidance to treat sign-in-appeared-to-succeed-but-device-not-in-Intune as a license candidate AND escalate to L2 if license is confirmed assigned — covering both verified Stage-1 and inferred Stage-2 paths per research A1/A5 risk mitigation"
  artifacts:
    - path: "docs/l1-runbooks/19-ios-license-invalid.md"
      provides: "L1 runbook for license invalid — dual-manifestation (Stage-1 device-visible + Stage-2 silent); second-portal access flagged"
      min_lines: 110
      max_lines: 170
      contains_all:
        - "## Symptom"
        - "## L1 Triage Steps"
        - "## Admin Action Required"
        - "## Escalation Criteria"
        - "> **Platform gate:**"
        - "User Name Not Recognized"
        - "UserLicenseTypeInvalid"
        - "Microsoft 365 admin center"
        - "Product licenses"
        - "Intune Plan"
  key_links:
    - from: "docs/l1-runbooks/19-ios-license-invalid.md L1 Triage Steps § step that navigates to P-10"
      to: "Microsoft 365 admin center Users > Active Users > [user] > Product licenses"
      via: "P-10 second-portal navigation path verbatim (D-35)"
      pattern: "Microsoft 365 admin center.*Users.*Product licenses"
    - from: "docs/l1-runbooks/19-ios-license-invalid.md Admin Action Required"
      to: "Microsoft Learn Intune license assignment"
      via: "external URL to learn.microsoft.com/intune/fundamentals/licenses-assign"
      pattern: "licenses-assign"
---

<objective>
Create `docs/l1-runbooks/19-ios-license-invalid.md` — L1 runbook for Intune license not assigned to the enrolling user. This runbook is SUBTLE per Specifics line 253: user signs in, everything appears to succeed, but the MDM profile never downloads and Intune shows no device for the user. Dual-surface failure per D-35 (Stage-1 device-visible vs Stage-2 silent).

This runbook is DIFFERENT from runbooks 16-18/20 in that it REQUIRES second-portal access (Microsoft 365 admin center OR Microsoft Entra admin center) to complete L1 Triage. That access requirement is the permission-boundary difference and must be flagged up front. An L1 without that access escalates with documented UPN (per D-35 research).

Wave 2 — depends on Plan 30-01 (template) + Plan 30-02 (triage tree back-link). Parallel with 30-03, 30-04, 30-05, 30-07.
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
<!-- Structural template: docs/l1-runbooks/10-macos-device-not-appearing.md -->

Frontmatter (D-25 Claude's discretion — using `all` because license affects all iOS enrollment paths per A3):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
```

Rationale for `applies_to: all` (record in PLAN.md only or via HTML comment in file — see Plan 30-05 pattern): Intune license assignment is a user-level prerequisite that applies to ANY iOS enrollment path (ADE, Company Portal, User Enrollment). Research Section 4 Runbook 19 recommends `all`.

Platform gate banner D-26 verbatim line 9.

H1: `# iOS License Invalid`
Intro: "Use this runbook when an iOS/iPadOS user sees 'User Name Not Recognized' during enrollment, OR when enrollment appears to complete successfully for the user but the device never appears in Intune admin center and no MDM profile installs on the device. Both are symptoms of missing or inappropriate Intune licensing on the user's account."

<!-- IMPORTANT PRE-SECTION PREREQUISITE CALLOUT (per D-35 + specifics line 253 + research A5): -->

Immediately after the intro paragraph, BEFORE the Symptom H2:
```markdown
> **L1 prerequisite access:** This runbook requires either Microsoft 365 admin center OR Microsoft Entra admin center access with permission to view user license assignments. If you do not have this access, jump directly to [Escalation Criteria](#escalation-criteria) with the user's UPN documented — the Intune-only L1 agent cannot complete license verification alone.
```

<!-- Content source: 30-RESEARCH.md § 4 Runbook 19 (lines ~385-423) + CONTEXT.md Specifics line 253 -->

Symptom section (D-11):
- **Stage-1 device-visible error:** `"User Name Not Recognized. This user account isn't authorized to use Microsoft Intune. Contact your system administrator if you think you have received this message in error."` — verbatim from Microsoft Learn.
- **Stage-1 alternate surface:** `"Your IT admin hasn't given you access to use this app. Get help from your IT admin or try again later."` — verbatim from Microsoft Learn.
- **Error code (if screenshotted):** `UserLicenseTypeInvalid`.
- **Stage-2 silent manifestation (A1 — in-repo-documented; Microsoft Learn does not independently redundantly describe):** User reports the enrollment sign-in flow appeared to succeed — they completed the password / MFA steps — but the device is NOT visible in Intune admin center and NO MDM profile was installed on the device. This manifests as "nothing happened" and is easily confused with a network issue. The D-22 silent-failure context at `07-device-enrollment.md` line 252 documents this pattern.

Back-link (D-11): `Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR4 "'User Name Not Recognized' or 'License not assigned'" branch.`

L1 Triage Steps (D-07; numbered):
1. Say-to-user status opener.
2. Collect the user's UPN (`user@domain.com` format).
3. Navigate to P-04: `Devices > All devices > iOS/iPadOS`. Search by the user's UPN OR by device serial if the user has it. Record: device present Y/N, enrollment type, ownership, last check-in.
4. If device IS present but last check-in is stale / MDM profile state unhealthy — treat as Stage-2 silent candidate.
5. Navigate to **P-10 — second portal** (requires the prerequisite access above): `Microsoft 365 admin center (https://admin.microsoft.com) > Users > Active Users > [user]`. Verify the user has an Intune-eligible license in **Product licenses**. Look for any of:
   - Intune Plan 1
   - Intune Plan 2
   - EMS E3 / E5 (contains Intune Plan 1 or 2)
   - Microsoft 365 E3 / E5 (contains Intune)
   Record: assigned license SKUs.
6. If NO Intune-eligible license is assigned → proceed to Admin Action Required.
7. If an Intune-eligible license IS assigned but enrollment still fails → the failure is not license assignment; escalate to L2 (A5 scope beyond L1).
8. If the user's UPN is NOT found in Active Users → user does not exist in the tenant or there is a sync issue; escalate to L2 with Entra sync diagnosis.

Portal-navigation-may-vary callout between steps 3 and 5 if helpful.

Admin Action Required (D-12):
```markdown
L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to:**
- In Microsoft 365 admin center, navigate to `Users > Active Users > [affected user] > Product licenses > Edit`.
- Assign an Intune-eligible license:
  - Intune Plan 1 (standard)
  - Intune Plan 2 (advanced mgmt features)
  - EMS E3 / E5 (includes Intune Plan 1/2)
  - Microsoft 365 E3 / E5 (includes Intune)
- Reference documentation: [Microsoft Learn — Intune license assignment](https://learn.microsoft.com/intune/fundamentals/licenses-assign).

**Verify:**
- License appears assigned on the user's Product licenses pane.
- User restarts the Company Portal app (or power-cycles the device) and retries enrollment within 15-30 minutes.
- Device appears in P-04 (`Devices > All devices > iOS/iPadOS`) and shows a fresh "Last check-in" timestamp.

**If the admin confirms the user already has a license:**
- The failure is not license assignment. Proceed to [Escalation Criteria](#escalation-criteria). Common other causes: MDM authority mis-set, Entra sync delay, Conditional Access pre-enrollment block.
```

NO User Action Required (D-13 — user cannot self-assign license; their retry is not a "meaningful user action" in the D-09 sense).

Escalation Criteria:
- L1 does not have Microsoft 365 / Entra admin center access (cannot verify license status — the D-35 prerequisite gap)
- Intune-eligible license IS assigned and error persists after 30 minutes
- User UPN not found in Active Users (Entra sync / account issue)
- Admin assigns license, user retries, error persists after 60 minutes

**Before escalating, collect:**
- User UPN
- Device serial number (if available)
- Screenshot of Stage-1 error message if user captured it
- Error code from screenshot if present (e.g., `UserLicenseTypeInvalid`)
- Output of Product licenses pane (either "license assigned" with SKUs listed, or "no Intune license" with current SKUs listed, or "access denied — L1 could not verify")
- Whether this is Stage-1 (device-visible error) or Stage-2 (silent, nothing happened) manifestation per L1's observation
- Intune P-04 screenshot showing device absent OR device present but unhealthy state

Closing block:
```markdown
See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced license / Entra sync investigation.
For admin configuration references:
- [iOS Device Enrollment Guide](../admin-setup-ios/07-device-enrollment.md) — Stage-2 silent-failure pattern documented in Configuration-Caused Failures table
- [Microsoft Learn — Intune license assignment](https://learn.microsoft.com/intune/fundamentals/licenses-assign) (external)

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
  <name>Task 1: Create 19-ios-license-invalid.md with dual-manifestation Symptom and second-portal prerequisite flag</name>
  <read_first>
    - docs/l1-runbooks/10-macos-device-not-appearing.md (structural template)
    - docs/admin-setup-ios/07-device-enrollment.md (verify line 252 documents the Stage-2 silent-failure pattern that runbook 19 references)
    - docs/decision-trees/07-ios-triage.md (Wave 1 output — confirm IOSR4 click target)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 2 D-35 (dual-manifestation finding) and § 4 "Runbook 19" (lines ~385-423)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 8 Assumptions Log A1 (Stage-2 silent) + A5 (second-portal prerequisite)
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-25, Specifics line 253 (the "subtle" note), D-07
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/19-ios-license-invalid.md"
  </read_first>
  <behavior>
    - File created; frontmatter `applies_to: all`
    - Platform gate banner line 9
    - 4 D-10 H2 sections; no User Action Required (D-13)
    - A prerequisite-equivalent `> **L1 prerequisite access:**` callout appears BEFORE the Symptom H2 (between intro and Symptom) flagging second-portal access requirement
    - Symptom cites both manifestations:
      - Stage-1 verbatim: `"User Name Not Recognized. This user account isn't authorized to use Microsoft Intune."`
      - Stage-2 silent: "User reports enrollment appeared to succeed but device is not in Intune"
    - Error code `UserLicenseTypeInvalid` present
    - L1 Triage Steps uses P-10 (second portal) with the verbatim path `Microsoft 365 admin center > Users > Active Users > [user] > Product licenses`
    - Admin Action Required lists 4 Intune-eligible license SKU families (Intune Plan 1, Intune Plan 2, EMS E3/E5, M365 E3/E5)
    - Microsoft Learn external URL present for license-assign documentation
    - D-11 back-link to 07-ios-triage.md in Symptom section
    - File length 110-170 lines
  </behavior>
  <action>
    Follow the Runbook 19 block in `<interfaces>` section verbatim.

    **Critical special element — the prerequisite callout:** Unlike runbooks 16/17/18/20 which do not carry a prerequisite callout, runbook 19 MUST include a `> **L1 prerequisite access:**` blockquote BEFORE the Symptom H2. This is because the D-35 research finding confirms the L1 triage cannot complete without second-portal access. This callout is NOT a hidden `## Prerequisites` H2 (D-10 eliminates the Prerequisites section); it is a blockquote callout that effectively scopes L1 applicability. Exact placement: after the intro paragraph's closing line, before the `## Symptom` heading.

    **Stage-2 silent-failure framing (A1 mitigation):** Use the exact wording from the interfaces block. Do NOT strengthen Microsoft Learn's documented claim — Stage-2 is in-repo-documented (07-device-enrollment.md line 252) but not independently Microsoft Learn-verified. Frame as "If the user reports enrollment seemed to succeed but device is not visible in Intune, treat as license-invalid candidate AND escalate to L2 if license is confirmed assigned" — covers both verified and inferred paths.

    **Admin Action Required — list all 4 license SKU families:** Intune Plan 1, Intune Plan 2, EMS E3/E5, M365 E3/E5. This list is from Microsoft Learn's Intune licensing documentation and is load-bearing for admin action.

    **External URL:** Use the exact URL `https://learn.microsoft.com/intune/fundamentals/licenses-assign` — this is a stable Microsoft Learn fundamentals URL.

    DO NOT:
    - Add a `## Prerequisites` H2 (D-10 eliminates this section — use the blockquote callout instead)
    - Add User Action Required (D-13)
    - Use real tenant domain / real UPN in examples (use `user@domain.com` placeholder)
    - Include PowerShell / CLI commands
    - Strengthen the Stage-2 assertion beyond A1 mitigation wording
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - File exists; Checks 7/11/12 flip PASS for this file; Check 3 contributes +1 of 6
    - `grep -c "User Name Not Recognized" docs/l1-runbooks/19-ios-license-invalid.md` ≥ 1
    - `grep -c "UserLicenseTypeInvalid" docs/l1-runbooks/19-ios-license-invalid.md` ≥ 1
    - `grep -c "Microsoft 365 admin center" docs/l1-runbooks/19-ios-license-invalid.md` ≥ 1
    - `grep -c "Intune Plan" docs/l1-runbooks/19-ios-license-invalid.md` ≥ 2 (at least "Intune Plan 1" and "Intune Plan 2")
    - `grep -c "> \*\*L1 prerequisite access:\*\*" docs/l1-runbooks/19-ios-license-invalid.md` = 1 (the second-portal callout)
    - `grep -c "User Action Required" docs/l1-runbooks/19-ios-license-invalid.md` = 0
    - `grep -c "## Prerequisites" docs/l1-runbooks/19-ios-license-invalid.md` = 0 (D-10 no Prerequisites H2)
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| L1 agent → runbook | Requires second-portal access; L1-without-access escalates with UPN; risk boundary is permission scoping |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-06-01 | Elevation of Privilege | Second-portal access requirement | mitigate | Runbook explicitly flags the access requirement up front; L1 without access is routed to Escalation — they are NOT directed to acquire the access themselves; permission scope is preserved |
| T-30-06-02 | Information Disclosure | Example UPN / license info | mitigate | Use placeholders for UPNs; license SKU names are public product names, not sensitive |
| T-30-06-03 | Routing correctness | Stage-2 silent failure attribution (A1) | mitigate | Runbook acknowledges the A1 inference with explicit escalate-to-L2 fallback if license is already assigned; does not over-commit to license as sole cause |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 3, 7, 11, 12 gain a PASS contribution for this file
2. Manual: confirm the prerequisite callout appears BETWEEN intro and Symptom (not inside Symptom, not under a Prerequisites H2)
3. Manual: confirm both Stage-1 error strings are cited verbatim in quotation marks
4. Manual: confirm the Admin Action Required lists all 4 Intune-eligible SKU families
5. Manual: `grep -c "licenses-assign" docs/l1-runbooks/19-ios-license-invalid.md` ≥ 1 (Microsoft Learn URL)
</verification>

<success_criteria>
- [x] File created with D-21 filename
- [x] Frontmatter `applies_to: all` (D-25 Claude's discretion)
- [x] Platform gate banner line 9 (D-26)
- [x] 4 D-10 H2 sections; no User Action Required; no Prerequisites H2
- [x] Second-portal prerequisite callout present between intro and Symptom
- [x] Both manifestations (Stage-1 device-visible + Stage-2 silent) cited in Symptom
- [x] `UserLicenseTypeInvalid` error code present
- [x] P-10 second-portal path verbatim in L1 Triage Steps
- [x] All 4 Intune-eligible SKU families listed in Admin Action Required
- [x] Microsoft Learn license-assign URL present
- [x] D-11 back-link present
- [x] Validator Checks 3, 7, 11, 12 gain one PASS contribution each
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-06-SUMMARY.md` with file length, confirmation of the prerequisite-access callout placement, and any deviations.
</output>
