---
phase: 30-ios-l1-triage-runbooks
plan: 03
type: execute
wave: 2
depends_on: [30-01, 30-02]
files_modified:
  - docs/l1-runbooks/16-ios-apns-expired.md
autonomous: true
requirements: [L1TS-02]
must_haves:
  truths:
    - "An L1 agent reading runbook 16 can identify an expired APNs certificate as the root cause of fleetwide iOS/iPadOS/macOS MDM failure within the Symptom section alone (D-27 cross-platform blast-radius lead)"
    - "An L1 agent knows exactly what portal pane to check (Apple MDM Push Certificate, path P-01) and what fields to record (Status, Days until expiration, Apple ID, Expiration date)"
    - "An L1 agent does NOT attempt to renew the certificate themselves — the Admin Action Required packet is the escalation output; L1 only documents (D-07 detect-and-escalate; D-10 sectioned actor boundary)"
    - "The runbook omits a User Action Required section entirely (runbook 16 is tenant-config; D-13 — no N/A filler section)"
  artifacts:
    - path: "docs/l1-runbooks/16-ios-apns-expired.md"
      provides: "L1 runbook for APNs certificate expired — tenant-config single-flow with cross-platform blast-radius note"
      contains_all:
        - "## Symptom"
        - "## L1 Triage Steps"
        - "## Admin Action Required"
        - "## Escalation Criteria"
        - "> **Platform gate:**"
        - "APNSCertificateNotValid"
        - "NoEnrollmentPolicy"
        - "AccountNotOnboarded"
        - "../admin-setup-ios/01-apns-certificate.md"
      min_lines: 100
      max_lines: 180
  key_links:
    - from: "docs/l1-runbooks/16-ios-apns-expired.md Admin Action Required packet"
      to: "docs/admin-setup-ios/01-apns-certificate.md § Renewal"
      via: "markdown link to #renewal anchor"
      pattern: "admin-setup-ios/01-apns-certificate\\.md#renewal"
    - from: "docs/l1-runbooks/16-ios-apns-expired.md Symptom section"
      to: "docs/decision-trees/07-ios-triage.md"
      via: "D-11 back-link to Mermaid anchor (IOSR1 / IOS2 fleetwide branch)"
      pattern: "decision-trees/07-ios-triage\\.md"
---

<objective>
Create `docs/l1-runbooks/16-ios-apns-expired.md` — L1 runbook for "APNs certificate expired" (highest-impact iOS failure: breaks ALL iOS + iPadOS + macOS MDM simultaneously per D-27). Single-flow runbook using the D-10 sectioned H2 actor-boundary format.

Purpose: Enables an L1 agent to recognize fleetwide APNs failure from user-reported symptoms and portal observations, and to produce the correct escalation packet handing the renewal to the Intune admin (L1 never performs the renewal — it requires access to the Apple Push Certificates Portal with the original Apple ID, admin-scope).

This plan is Wave 2 — depends on Plan 30-01 (template platform enum) and Plan 30-02 (triage tree for D-11 back-link target). Parallel with other Wave 2 runbook plans (30-04, 30-05, 30-06, 30-07); zero file-overlap with any of them.
Output: One new L1 runbook markdown file.
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

Frontmatter (D-25 locked values for runbook 16):
```yaml
---
last_verified: 2026-04-17
review_by: 2026-07-16
applies_to: all
audience: L1
platform: iOS
---
```

Platform gate banner (D-26 verbatim — appears as first body line after frontmatter close):
```markdown
> **Platform gate:** This guide covers iOS/iPadOS troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

Section sequence (D-10 — NO User Action Required per D-13 for runbook 16):
```
# iOS APNs Certificate Expired
[intro paragraph]

## Symptom
## L1 Triage Steps
## Admin Action Required
## Escalation Criteria

[Back-link + Version History closing block per PATTERNS.md Shared Patterns]
```

<!-- Content source: 30-RESEARCH.md § 4 Runbook 16 (lines ~265-303) -->

Symptom section — 3 indicators (D-27 blast radius + D-11 back-link + error strings):
1. **Cross-platform blast-radius (D-27 mandatory opening sentence):** "This failure affects ALL enrolled iOS, iPadOS, AND macOS devices in the tenant simultaneously. APNs is shared infrastructure — one expired certificate stops MDM communication to every Apple device."
2. **User-visible errors during any iOS enrollment attempt:** cite verbatim — `APNSCertificateNotValid` ("There's a problem with the certificate that lets the mobile device communicate with your company's network."), `NoEnrollmentPolicy` ("No enrollment policy found."), or `AccountNotOnboarded` (same body as APNSCertificateNotValid). All three point to APNs per Microsoft Learn. L1 may see any of the three; they are not predictable per-device.
3. **Intune portal-visible:** previously-enrolled iOS/iPadOS devices at `Devices > All devices > iOS/iPadOS` show "Last check-in" drift into hours/days; new enrollment attempts fail.

Back-link (D-11): Immediately after the 3 indicators: `Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR1 "Fleetwide outage (all Apple devices affected)" branch.`

L1 Triage Steps (D-07 detect-and-escalate, numbered imperative):
1. Say-to-user status opener (D-14 sparingly — status, not pseudo-remediation):
   `> **Say to the user:** "We're investigating a fleet-wide issue that may be affecting all company iPhones, iPads, and Macs. Your admin is being notified. We'll update you as soon as we have a fix timeline."`
2. Navigate to **P-01**: `Devices > Device onboarding > Enrollment > Apple (tab) > Apple MDM Push Certificate`. (Navigation-may-vary callout referencing `../admin-setup-ios/00-overview.md#portal-navigation-note` per project pattern.)
3. Record on that pane: **Status**, **Days until expiration** (integer; negative means expired), **Apple ID** (the Apple ID the certificate was created under — critical for admin renewal), **Expiration date** (absolute date). Screenshot the pane.
4. Verify cross-platform scope: navigate to `Devices > All devices > macOS`. Note Last-check-in drift on macOS devices to document the blast radius for the admin.
5. Proceed to Admin Action Required — no further L1 checks required. Renewal is admin-scope.

Admin Action Required (D-12 three-part packet — L1 documents, admin executes):
```markdown
L1 documents and hands this packet to the Intune admin. L1 does not execute.

**Ask the admin to:**
- Renew the APNs certificate via the Apple Push Certificates Portal following the RENEWAL (not CREATE-NEW) flow documented at [APNs Certificate Guide § Renewal](../admin-setup-ios/01-apns-certificate.md#renewal).
- Use the ORIGINAL Apple ID shown on the Apple MDM Push Certificate pane — renewing with a different Apple ID fails and is a common mistake.
- The renewal window is 30 days post-expiration; after that, full re-enrollment of all Apple devices is required.

**Verify:**
- On the Apple MDM Push Certificate pane (P-01): Status returns to "Active" (or equivalent "certificate configured" state).
- Days until expiration returns to approximately 365.
- Within 30 minutes of renewal, Last-check-in timestamps in Devices > All devices begin to refresh for enrolled iOS/iPadOS and macOS devices.

**If the admin confirms none of the above applies:**
- Proceed to [Escalation Criteria](#escalation-criteria).
```

NO `## User Action Required` section (D-13 — runbook 16 is tenant-config only).

Escalation Criteria (D-15 mirrors macOS verbatim style):
```markdown
Escalate to L2 (or to the Intune admin directly if not already done) if:

- Admin does not have access to the Apple ID used to create the original certificate (e.g., employee departure — this is why D-27 recommends "company email" Apple IDs in the APNs guide)
- Admin performs renewal but devices do not resume check-in after 30 minutes
- Certificate grace period (30 days post-expiration) has passed — full Apple-device re-enrollment required
- Certificate status shows an unexpected value other than "Active" / "Not set up" / "expired X days ago"

**Before escalating, collect:**

- Screenshot of the Apple MDM Push Certificate pane with Status and Days until expiration visible
- Apple ID used on the certificate (from the pane — critical for renewal access)
- Approximate Expiration date from the pane
- Count of affected iOS/iPadOS devices (from Devices > iOS/iPadOS view)
- Count of affected macOS devices (from Devices > macOS view)
- Whether any device has successfully checked in in the last 24 hours
- User-visible error string the user reported (APNSCertificateNotValid / NoEnrollmentPolicy / AccountNotOnboarded / other)
```

Closing block (PATTERNS.md Shared Pattern — Back-link + Version History):
```markdown
See [iOS L2 Runbooks (Phase 31)](../l2-runbooks/00-index.md) for advanced investigation (Phase 31 placeholder; resolved when Phase 31 ships). For APNs config reference, see [APNs Certificate Guide](../admin-setup-ios/01-apns-certificate.md).

**Related Resources (cross-platform note per D-27 / Specifics line 259):** As of Phase 30 execution, macOS has no equivalent L1 APNs-expired runbook. Cross-platform APNs failures identified from the macOS side should escalate to L2 via the standard [macOS ADE Triage](../decision-trees/06-macos-triage.md). A macOS L1 APNs runbook is planned for v1.4.

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
  <name>Task 1: Create 16-ios-apns-expired.md with D-10 sectioned actor-boundary format</name>
  <read_first>
    - docs/l1-runbooks/10-macos-device-not-appearing.md (full file — PRIMARY structural template; note the 3-section "Prerequisites / Steps / Escalation Criteria" prose layout is the STRUCTURAL DEPARTURE that D-10 upgrades — DO NOT copy that layout into iOS; copy only frontmatter, platform gate banner, H1, intro, Say-to-user pattern, back-link, Version History)
    - docs/l1-runbooks/11-macos-setup-assistant-failed.md (Say-to-user + How to Use sub-navigation patterns — reference only; runbook 16 is single-flow, not multi-symptom)
    - docs/admin-setup-ios/01-apns-certificate.md (verify `#renewal` anchor exists and what section it names — the Admin Action Required packet deep-links to this anchor)
    - docs/decision-trees/07-ios-triage.md (Wave 1 output — verify IOSR1 click target is `16-ios-apns-expired.md` and that the Mermaid anchor this runbook back-links to is accurately named)
    - .planning/phases/30-ios-l1-triage-runbooks/30-RESEARCH.md § 4 "Runbook 16 — iOS APNs Expired" (lines ~265-303) — verbatim content source: error strings, portal paths P-01/P-04, L1 triage step sequence, admin packet contents, escalation criteria
    - .planning/phases/30-ios-l1-triage-runbooks/30-PATTERNS.md § "docs/l1-runbooks/16-ios-apns-expired.md" — section-by-section pattern mapping with D-10 departure callouts
    - .planning/phases/30-ios-l1-triage-runbooks/30-CONTEXT.md § D-07, D-10, D-11, D-12, D-13, D-14, D-15, D-25, D-26, D-27, Specifics lines 249-259
  </read_first>
  <behavior>
    - File created at `docs/l1-runbooks/16-ios-apns-expired.md`
    - Frontmatter: exactly `last_verified: 2026-04-17`, `review_by: 2026-07-16`, `applies_to: all`, `audience: L1`, `platform: iOS` (5 fields; D-25 values locked for runbook 16)
    - Platform gate banner appears on the first body line after frontmatter (line 9), matching the D-26 verbatim text
    - H2 sections present, in this order, exactly: `## Symptom`, `## L1 Triage Steps`, `## Admin Action Required`, `## Escalation Criteria`
    - `## User Action Required` H2 is ABSENT (D-13 — runbook 16 is tenant-config; NO N/A filler section)
    - Symptom section opens with the D-27 cross-platform blast-radius sentence verbatim
    - Symptom section cites all three Microsoft Learn error strings verbatim: `APNSCertificateNotValid`, `NoEnrollmentPolicy`, `AccountNotOnboarded`
    - Symptom section contains a back-link to `../decision-trees/07-ios-triage.md` (D-11)
    - L1 Triage Steps section uses numbered imperative voice; contains a `> **Say to the user:**` status callout (D-14 restrained — status, not remediation)
    - L1 Triage Steps references portal path P-01 verbatim: `Devices > Device onboarding > Enrollment > Apple (tab) > Apple MDM Push Certificate`
    - Admin Action Required section has the three-part D-12 structure: "Ask the admin to:", "Verify:", "If the admin confirms none of the above applies:"
    - Admin Action Required deep-links to `../admin-setup-ios/01-apns-certificate.md#renewal`
    - Escalation Criteria section contains an "Escalate to L2" preamble and a "Before escalating, collect:" checklist per D-15
    - Closing block contains: cross-platform macOS deferral note per D-27/Specifics line 259, L2 placeholder link with "(Phase 31)" marker, `[Back to iOS Triage]` link to `../decision-trees/07-ios-triage.md`, and a Version History table with a 2026-04-17 row
    - File length between 100 and 180 lines
  </behavior>
  <action>
    Create `docs/l1-runbooks/16-ios-apns-expired.md` using the `<interfaces>` block above as the authoritative content source. Every chunk of the interfaces block is verbatim or near-verbatim text to ship in the file.

    **Step 1 — Frontmatter:** Use the 5-field YAML exactly as shown in `<interfaces>` above. Do NOT add an `applies_to: ADE` or platform: macOS relic from the macOS template.

    **Step 2 — Platform gate banner:** Place on line 9 (first body line after frontmatter close) verbatim from `<interfaces>` above. This matches D-26.

    **Step 3 — H1 + intro paragraph:** H1 is `# iOS APNs Certificate Expired`. Intro paragraph explains when to use this runbook: "Use this runbook when multiple iOS/iPadOS devices — or any Apple device including Macs — stop checking in to Intune, or when new iOS enrollments fail with errors pointing at certificate or enrollment-policy validity."

    **Step 4 — Symptom section (H2):** Write the 3 indicators exactly as laid out in `<interfaces>`. Start with the D-27 blast-radius sentence. Cite the three error strings verbatim with their body text. End with the D-11 back-link to the triage tree (use the exact wording `Routed here from the [iOS Triage Decision Tree](../decision-trees/07-ios-triage.md) IOSR1 "Fleetwide outage (all Apple devices affected)" branch.`).

    **Step 5 — L1 Triage Steps section (H2):** Numbered imperative-voice steps 1-5 as in `<interfaces>`. Include the `> **Say to the user:**` nested-blockquote callout at step 1 (D-14 — status language per Specifics line 255 rule for tenant-config runbooks). Include the portal-navigation-may-vary callout per the project pattern (matches admin-setup-ios file pattern line 12): `> Portal navigation may vary by Intune admin center version. See [iOS Admin Setup Overview](../admin-setup-ios/00-overview.md#portal-navigation-note) for details.`

    **Step 6 — Admin Action Required section (H2):** Open with the escalation-framing sentence: `L1 documents and hands this packet to the Intune admin. L1 does not execute.` Then the three-part D-12 structure with bold subheaders `**Ask the admin to:**`, `**Verify:**`, `**If the admin confirms none of the above applies:**`. Use the exact bullet content from `<interfaces>`.

    **Step 7 — Omit User Action Required section:** Do not add it. Do not add an "N/A" placeholder. The section is not present per D-13.

    **Step 8 — Escalation Criteria section (H2):** Use the exact bullet list and "Before escalating, collect:" checklist from `<interfaces>`. Use the PATTERNS.md shared Escalation Criteria format (D-15).

    **Step 9 — Closing block:** Include in order:
    - The L2 + APNs config reference sentence (see `<interfaces>`)
    - The D-27 / Specifics line 259 cross-platform macOS-gap note about v1.4 deferral
    - A horizontal rule `---`
    - The `[Back to iOS Triage](../decision-trees/07-ios-triage.md)` back-link
    - A `## Version History` H2 with a single-row table: `| 2026-04-17 | Initial version | -- |`

    **CRITICAL — DO NOT:**
    - Include a `Prerequisites` H2 section (D-10 replaces macOS's Prerequisites/Steps/Escalation 3-section layout with the new sectioned actor-boundary layout; Prereqs are inlined into L1 Triage Steps via "Access to Intune admin center" language in step 1 or integrated into the Say-to-user / step flow)
    - Include `@file` or template-copy relics like `[bracketed placeholders]`
    - Include PowerShell / registry / log references (L1 runbooks are portal-only per l1-template.md header rule)
    - Include real tenant IDs, real Apple IDs, real user UPNs in examples (use `[Company Name]` / `user@domain.com` / `it-apple-id@company.com` placeholders per security rules)
    - Include Microsoft Learn URLs in the body (links live in Related Resources or in admin-setup-ios reference; keep runbook body clean)

    **File length expectation:** 110-150 lines. Runbook 10 macOS is 76 lines; iOS adds the D-10 Admin Action Required section (~25 lines) and the D-27 cross-platform note (~5 lines), consistent with CONTEXT.md Specifics line 249's 100-180 projection.
  </action>
  <verify>
    <automated>node scripts/validation/check-phase-30.mjs --quick</automated>
  </verify>
  <done>
    - File exists; validator Check 7 (file exists for 16-ios-apns-expired.md) and Check 11 (frontmatter) flip to PASS for this file
    - Validator Check 3 (Symptom H2) partially passes (this file contributes 1 of 6)
    - Validator Check 4 (User Action Required count): this file contributes 0 to the count (correct — runbook 16 must NOT have this H2)
    - Validator Check 12 (Platform gate banner line ≤ 12): banner on line 9 — PASS for this file
    - `grep -n "^## " docs/l1-runbooks/16-ios-apns-expired.md` returns exactly 4 lines for H2 headings: Symptom, L1 Triage Steps, Admin Action Required, Escalation Criteria (plus Version History = 5 total)
    - `grep -c "APNSCertificateNotValid" docs/l1-runbooks/16-ios-apns-expired.md` ≥ 1; same for `NoEnrollmentPolicy` and `AccountNotOnboarded`
    - `grep -c "decision-trees/07-ios-triage.md" docs/l1-runbooks/16-ios-apns-expired.md` ≥ 2 (one in Symptom back-link, one in Back-link footer)
    - `grep -c "User Action Required" docs/l1-runbooks/16-ios-apns-expired.md` = 0 (D-13 omission)
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| L1 agent → runbook | Runbook contains example instructions an L1 follows; no PII or tenant secrets |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-30-03-01 | Information Disclosure | Example content (Apple ID, UPN, tenant identifiers) | mitigate | Use placeholder strings exclusively: `user@domain.com`, `it-apple-id@company.com`, `[Company Name]`. Reviewer spot-check on PR per 30-VALIDATION.md Manual-Only row |
| T-30-03-02 | Integrity | Portal path verbatim strings | mitigate | Use P-01 path from RESEARCH.md Section 3 navigation table (verified 2025-05-12 Microsoft Learn source). Callout `../admin-setup-ios/00-overview.md#portal-navigation-note` handles tenant-rollout drift |
</threat_model>

<verification>
1. `node scripts/validation/check-phase-30.mjs --quick` — Checks 7/11/12 contribute PASS for this file; Check 3 contributes 1 of 6; Check 4 unchanged (still needs exactly 1 — runbook 21)
2. Manual: grep for macOS / Prerequisites / `[Back to macOS` — all must return zero matches
3. Manual: open file, confirm the Symptom section leads with the D-27 blast-radius sentence and not the error strings
4. Manual: confirm no `## User Action Required` heading is present (D-13)
5. Manual: `wc -l docs/l1-runbooks/16-ios-apns-expired.md` → expect 110-150 lines
</verification>

<success_criteria>
- [x] File created at correct path with correct filename per D-21
- [x] Frontmatter D-25-compliant for runbook 16 (applies_to: all)
- [x] Platform gate banner per D-26 on line 9
- [x] 4 actor-boundary H2 sections present (Symptom, L1 Triage Steps, Admin Action Required, Escalation Criteria)
- [x] NO User Action Required H2 (D-13 omission — critical for SC #4 literal)
- [x] D-27 blast-radius sentence leads Symptom section
- [x] All 3 Microsoft Learn error strings cited (APNSCertificateNotValid, NoEnrollmentPolicy, AccountNotOnboarded)
- [x] D-11 back-link to 07-ios-triage.md present in Symptom section
- [x] D-12 three-part Admin Action Required packet present
- [x] D-27 macOS cross-platform deferral note present in closing block
- [x] Version History contains 2026-04-17 initial version row
- [x] Validator Checks 3 (partial), 7, 11, 12 flip toward PASS
</success_criteria>

<output>
After completion, create `.planning/phases/30-ios-l1-triage-runbooks/30-03-SUMMARY.md` with:
- File length
- Confirmation of all 4 H2 sections (D-10 compliance)
- Confirmation of no User Action Required section (D-13 compliance)
- Any deviation from the `<interfaces>` content (none expected — flag if any)
</output>
