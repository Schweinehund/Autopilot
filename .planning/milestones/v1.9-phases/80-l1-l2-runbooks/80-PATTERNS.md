# Phase 80: L1/L2 Runbooks - Pattern Map

**Mapped:** 2026-06-21
**Files analyzed:** 5 (3 create, 2 modify)
**Analogs found:** 5 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` | runbook (L1) | request-response (triage → escalation) | `docs/l1-runbooks/15-macos-company-portal-sign-in.md` | exact |
| `docs/l1-runbooks/36-macos-secure-enclave-key.md` | runbook (L1) | request-response (triage → escalation) | `docs/l1-runbooks/15-macos-company-portal-sign-in.md` | exact |
| `docs/l2-runbooks/27-macos-sso-investigation.md` | runbook (L2) | event-driven (two-track linear investigation) | `docs/l2-runbooks/19-android-enrollment-investigation.md` | role-match (same track structure, different platform) |
| `docs/l1-runbooks/00-index.md` | index | CRUD (append row to macOS ADE table) | `docs/l1-runbooks/00-index.md` (itself — existing sections) | exact |
| `docs/l2-runbooks/00-index.md` | index | CRUD (append row + escalation-mapping table row) | `docs/l2-runbooks/00-index.md` (itself — existing sections) | exact |

---

## Pattern Assignments

### `docs/l1-runbooks/35-macos-sso-sign-in-failure.md` (L1 runbook, request-response)

**Analog:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md`
**Secondary reference (Terminal-step legitimacy):** `docs/l1-runbooks/14-macos-compliance-access-blocked.md` (also macOS ADE L1, shows sub-section navigation pattern for multi-cause runbooks)

**Frontmatter block** (lines 1–7 of analog):
```yaml
---
last_verified: 2026-04-14
review_by: 2026-07-13
applies_to: ADE
audience: L1
platform: macOS
---
```
For #35 use:
```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: L1
platform: macOS
---
```

**Platform-gate blockquote** (line 9 of analog):
```markdown
> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
```
Replicate verbatim for #35/#36 — same gate text applies.

**Opening paragraph pattern** (lines 11–13 of analog):
```markdown
# macOS Company Portal Sign-In Failure

Use this runbook when a user cannot sign into the Company Portal app on their Mac, when Company Portal is not installed on the device, or when Company Portal is installed but the user's device does not appear as registered in Entra ID.
```
For #35, replace with:
```markdown
# macOS Platform SSO Sign-In Failure

Use this runbook when a user's Mac does not display the "Registration Required" notification despite Intune reporting a "Succeeded" status for the Platform SSO policy, or when the user cannot sign in via Platform SSO after a registration attempt.
```

**Prerequisites section** (lines 15–21 of analog):
```markdown
## Prerequisites

- Access to Intune admin center (https://intune.microsoft.com)
- Access to Microsoft Entra admin center (https://entra.microsoft.com) — read-only is sufficient
- Device serial number
- User's UPN (email address)
```
Replicate this block exactly for both #35 and #36.

**"Say to the user" step pattern** (lines 24–25 of analog):
```markdown
1. > **Say to the user:** "The Company Portal app is required to complete your device setup and access company resources like email and Teams. Let's check if it's installed correctly."
```
This is the exact quoted-blockquote style for all user-facing dialogue. Copy this syntax precisely:
```markdown
N. > **Say to the user:** "[Exact script here]"
```

**Cause-gated Terminal step pattern** — legitimized by `00-index.md` line 81 affordance:
```markdown
# From 00-index.md line 81 (Linux section intro — the affordance):
# "All runbooks include L1-executable steps (portal-first or terminal walkthrough as
# appropriate per cause) and explicit escalation triggers to L2."
```
The Terminal step for `app-sso platform -s` follows this pattern — it is a cause-gated diagnostic, introduced after the portal check and framed as "have the user open Terminal and run the following command." The command must appear as a fenced code block:
```bash
app-sso platform -s
```

**Escalation Criteria section** (lines 47–67 of analog):
```markdown
## Escalation Criteria

Escalate to L2 if:

- [bullet list of trigger conditions]

**Before escalating, collect:**

- [structured checklist of data items]

See [L2 runbook link text](../l2-runbooks/NN-filename.md) for [description].
```
For #35 the "See" line MUST point to `27-macos-sso-investigation.md`:
```markdown
See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md) for PSSO registration and Password-sync failure investigation.
```

**Back-to-triage footer** (line 71 of analog):
```markdown
---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)
```
Replicate verbatim. Per decision B1: this footer MUST be kept even though the SSO leaf does not exist in the tree until Phase 81. It points to the existing tree file.

**Version History table** (lines 73–77 of analog):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-14 | Initial version | -- |
```
For #35/#36, use `2026-06-21` as the date with "Initial version" and `--` as author.

---

### `docs/l1-runbooks/36-macos-secure-enclave-key.md` (L1 runbook, request-response)

**Analog:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md` (identical template as #35)

All structural patterns are identical to #35 above. Key differences in content only:

**Opening paragraph for #36:**
```markdown
# macOS Platform SSO — Secure Enclave Key Loss

Use this runbook when a user's Platform SSO stops working after a password reset, after using a FileVault recovery key to unlock the device, or when `app-sso platform -s` shows User Registration not in REGISTERED state despite the device previously being enrolled.
```

**Escalation Criteria "See" line for #36** (mandatory in-phase edge per decision B1 / D-02a):
```markdown
See [macOS Platform SSO Investigation (L2 #27)](../l2-runbooks/27-macos-sso-investigation.md) for PSSO registration failure investigation when re-registration does not resolve the issue.
```

**No cross-link to #35** — Decision D2 prohibits any `#35↔#36` cross-reference. The two runbooks are strictly independent.

---

### `docs/l2-runbooks/27-macos-sso-investigation.md` (L2 runbook, two-track linear investigation)

**Primary analog:** `docs/l2-runbooks/19-android-enrollment-investigation.md`
**Secondary analog (opening pattern):** `docs/l2-runbooks/10-macos-log-collection.md`
**Anti-pattern (do NOT follow):** `docs/l2-runbooks/26-apple-business-permission-denied.md` (Mermaid-router model — rejected as A2)

**Frontmatter block** (lines 1–7 of analog #19):
```yaml
---
last_verified: 2026-04-23
review_by: 2026-06-22
applies_to: all
audience: L2
platform: Android
---
```
For #27 use:
```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: L2
platform: macOS
---
```

**Platform-gate blockquote** (line 9 of analog #19):
```markdown
> **Platform gate:** This guide covers Android Enterprise L2 investigation via Intune. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L2 Runbooks](00-index.md#ios-l2-runbooks).
```
For #27 adapt to:
```markdown
> **Platform gate:** This guide covers macOS Platform SSO L2 investigation via Intune and Entra. For Windows Autopilot, see [Windows L2 Runbooks](00-index.md). For other macOS ADE investigation runbooks, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks).
```

**Context section with log-collection prerequisite handoff** (lines 13–17 of analog #19 — D-01b mandatory):
```markdown
## Context

This runbook covers Android Enterprise enrollment-failure investigation across all GMS-based modes ...

Before starting: collect a diagnostic package per the [Android Log Collection Guide](18-android-log-collection.md) using the method appropriate for the enrollment mode ...
```
For #27 adapt to:
```markdown
## Context

This runbook covers macOS Platform SSO failure investigation across two failure classes: registration failures (device or user not reaching REGISTERED state) and Password-sync failures (sign-in loop, per-user MFA blocker, AD-bound account limitation).

Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md). For PSSO investigations, also enable AppSSO debug logging before reproducing the issue — see Track A Step 3 for the debug-enable procedure.
```

**"From L1 escalation?" routing block** (lines 19–25 of analog #19 — D-01a mandatory):
```markdown
**From L1 escalation?** L1 runbook 22 (enrollment blocked) / 23 (work profile not created) / 24 (device not enrolled) / 27 (ZTE enrollment failed) has escalated. L1 collected: serial number, user UPN, mode ..., and device-side symptoms. Skip to the Pattern section matching L1's observation:
- L1 22 → Pattern E (Enrollment Restriction)
- L1 23 → Pattern A (Work Profile Not Created)
- L1 24 → start at Data Collection Step 1-4 to narrow mode; then Pattern B / D as identified
- L1 27 → Pattern C (ZTE Device Claim Failure)
- No L1 escalation: begin at Data Collection Step 1
```
For #27 adapt to:
```markdown
**From L1 escalation?** L1 runbook 35 (SSO sign-in failure / registration not appearing) or L1 runbook 36 (Secure Enclave key loss after password reset) has escalated. L1 collected: device serial number, macOS version, user UPN, `app-sso platform -s` output, and Intune device configuration status screenshot. Route to the matching track:
- L1 35 → Track A: Registration Failure Investigation
- L1 36 → Track A: Registration Failure Investigation (SE key re-registration path)
- Password-sync failures (no REGISTERED state + per-user MFA suspected or AD-bound account) → Track B: Password-Sync Failure Investigation
- No L1 escalation: begin at Track A Step 1 to confirm registration state, then proceed to Track B if registration state shows REGISTERED but sign-in still fails
```

**Investigation track heading pattern** (from L2 #19 section headings at lines 29, 114, 147, 176, 209, 239):
```markdown
## Investigation — Data Collection (mode-agnostic)

### Step 1: Device registration state (Intune admin center > Devices > All devices)
```
For #27 use the two-track structure:
```markdown
## Track A: Registration Failure Investigation

### Step 1: Confirm registration state via `app-sso platform -s`

### Step 2: Intune portal — device configuration status

### Step 3: AppSSO debug logging + sysdiagnose capture

### Step 4: TLS-inspection exclusion verification

### Step 5: macOS 15.0–15.2 re-registration loop check

## Track B: Password-Sync Failure Investigation

### Step 1: Per-user MFA check (Entra admin center)

### Step 2: AD-bound (mobile) account check
```

**Version-gated callout pattern** (from L2 #19 line 228, timing callout):
```markdown
5. ⏱️ Timing: after a successful QR scan and CloudDPC enrollment, allow 15-30 minutes ...
```
For the macOS 15.0–15.2 loop bug, use a blockquote callout:
```markdown
> **Version gate — macOS 15.0–15.2:** If the device is running macOS 15.0, 15.1, or 15.2, repeated "Registration Required" prompts are caused by a known Apple OS bug (concurrent AppSSOAgent and AppSSODaemon writes corrupting the device config plist). The error signature in sysdiagnose is: `Error Domain=com.apple.PlatformSSO Code=-1001 "Error deserializing device config."` Fixed in macOS 15.3. **Action:** Upgrade the device to macOS 15.3 or later. If the re-registration loop persists on macOS 15.3+, file an Apple Care case — this is no longer a Microsoft-resolvable issue.
```

**Microsoft Support escalation packet pattern** (lines 138–143, 168–172 of analog #19):
```markdown
**Microsoft Support escalation packet (D-09):**

- **Token sync status:** [what to capture]
- **Profile assignment state:** [what to capture]
- **Enrollment profile GUID:** [what to capture]
```
For #27 adapt the packet labels to PSSO context:
```markdown
**Microsoft Support escalation packet:**

- **`app-sso platform -s` full JSON output** — collected at time of failure
- **sysdiagnose archive** — with AppSSO debug logging enabled before capture
- **Company Portal log incident ID** — from Company Portal > Help > Send diagnostic report
- **Intune device configuration status screenshot** — Devices > [device] > Configuration showing Platform SSO policy status
- **macOS version** and **Company Portal version**
- **Entra sign-in log screenshot** — filtered to the affected user, showing any MFA or CA failures
```

**Related Resources section** (lines 288–297 of analog #19):
```markdown
## Related Resources

- [Android Log Collection Guide (runbook 18)](18-android-log-collection.md) — prerequisite for this runbook
- [Android App Install Investigation (runbook 20)](20-android-app-install-investigation.md)
- [Android Compliance Investigation (runbook 21)](21-android-compliance-investigation.md)
- [L2 Runbook Index](00-index.md#android-l2-runbooks)
- [L1 Runbook 22: Android Enrollment Blocked](../l1-runbooks/22-android-enrollment-blocked.md)
```
For #27 the Related Resources section MUST include mandatory back-references to #35 and #36 (D-02a):
```markdown
## Related Resources

- [macOS Log Collection Guide (runbook 10)](10-macos-log-collection.md) — prerequisite for this runbook
- [L1 Runbook 35: macOS Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) — escalation source (registration not appearing)
- [L1 Runbook 36: macOS Platform SSO — Secure Enclave Key Loss](../l1-runbooks/36-macos-secure-enclave-key.md) — escalation source (key loss after password reset)
- [macOS Platform SSO Setup Guide](../admin-setup-macos/07-platform-sso-setup.md) — Configuration-Caused Failures table, `app-sso platform -s` healthy output reference (link-not-copy)
- [macOS Auth Methods Deep-Dive](../admin-setup-macos/08-auth-methods-deep-dive.md) — SE key behavior, DF-3 per-user MFA, DF-7 AD-bound account (link-not-copy)
- [Enterprise SSO Plugin Migration Guide](../admin-setup-macos/09-enterprise-sso-plugin-migration.md) — Error 10002 / legacy conflict context (link-not-copy)
- [macOS ADE L2 Runbook Index](00-index.md#macos-ade-runbooks)
```

**Version History table** (lines 299–303 of analog #19):
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-04-23 | Initial version — Android L2 enrollment investigation runbook ... | -- |
```
For #27 use:
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Initial version — macOS Platform SSO L2 investigation (SSORUN-03): Registration Failure track + Password-Sync Failure track; macOS 15.0–15.2 version-gate callout | -- |
```

---

### `docs/l1-runbooks/00-index.md` (index modification — append rows to macOS ADE table)

**Analog:** Self-referential — the existing macOS ADE Runbooks table at lines 36–48.

**Section header to locate** (lines 36–38):
```markdown
## macOS ADE Runbooks

Scripted procedures for macOS ADE enrollment failure scenarios. Each runbook provides portal-only instructions using ABM and Intune admin center actions. Start with the [macOS ADE Triage Decision Tree](../decision-trees/06-macos-triage.md) to identify which runbook applies.
```
Note: the intro says "portal-only instructions" — #35 and #36 introduce a Terminal step. This is legitimized by the `00-index.md:81` affordance ("portal-first or terminal walkthrough as appropriate per cause") visible in the Linux section intro. The macOS ADE section intro does NOT need to be changed; the index-level affordance at line 81 covers it.

**Existing table rows** (lines 40–47 — copy exact column layout):
```markdown
| # | Runbook | When to Use |
|---|---------|-------------|
| 10 | [Device Not Appearing in Intune](10-macos-device-not-appearing.md) | macOS device serial number not found in Intune after ADE enrollment |
| 11 | [Setup Assistant Stuck or Failed](11-macos-setup-assistant-failed.md) | Setup Assistant authentication failure, Await Configuration stuck, or network connectivity issue |
| 12 | [Configuration Profile Not Applied](12-macos-profile-not-applied.md) | Expected configuration (Wi-Fi, VPN, FileVault, restrictions) missing after enrollment |
| 13 | [App Not Installed](13-macos-app-not-installed.md) | DMG, PKG, or VPP app not installed or showing failed status |
| 14 | [Compliance Failure / Access Blocked](14-macos-compliance-access-blocked.md) | Device non-compliant or user cannot access Microsoft 365 resources |
| 15 | [Company Portal Sign-In Failure](15-macos-company-portal-sign-in.md) | Company Portal not available, sign-in failing, or Entra registration incomplete |
```

**New rows to append** (after row 15, before the next section `## iOS L1 Runbooks`):
```markdown
| 35 | [Platform SSO Sign-In Failure](35-macos-sso-sign-in-failure.md) | "Registration Required" notification not appearing despite Intune Succeeded, or Platform SSO sign-in not working after registration attempt |
| 36 | [Platform SSO — Secure Enclave Key Loss](36-macos-secure-enclave-key.md) | Platform SSO stopped working after a password reset or FileVault recovery key use |
```

**Version History row to prepend** (lines 119–132 — append new row at top):
```markdown
| 2026-06-21 | Phase 80 SSORUN-01/02: added macOS Platform SSO runbooks #35 and #36 to macOS ADE Runbooks table | -- |
```

---

### `docs/l2-runbooks/00-index.md` (index modification — append row + escalation-mapping table rows)

**Analog:** Self-referential — the existing macOS ADE Runbooks section at lines 71–98.

**Section header and version gate to locate** (lines 71–76):
```markdown
## macOS ADE Runbooks

> **Version gate:** The runbooks below cover macOS Automated Device Enrollment (ADE) via Intune.
> For Windows Autopilot runbooks, see the tables above.

The [macOS Log Collection Guide](10-macos-log-collection.md) is a **prerequisite for all macOS L2 investigation runbooks** -- collect IntuneMacODC diagnostic package and targeted Terminal artifacts before beginning any investigation.
```
Do NOT modify this block. New row appends to the When-to-Use table below it.

**Existing When-to-Use table** (lines 80–85):
```markdown
### When to Use

| Runbook | When to Use | Prerequisite |
|---------|-------------|--------------|
| [macOS Log Collection Guide](10-macos-log-collection.md) | Before starting any macOS L2 investigation -- collect IntuneMacODC zip and Terminal diagnostic outputs | None |
| [Profile Delivery Investigation](11-macos-profile-delivery.md) | Configuration profile not delivered, showing error/conflict, or not taking effect on device | [macOS Log Collection](10-macos-log-collection.md) |
| [App Install Failure Diagnosis](12-macos-app-install.md) | DMG, PKG, or VPP app not installing, showing failed status, or continuous reinstall loop | [macOS Log Collection](10-macos-log-collection.md) |
| [Compliance Evaluation Investigation](13-macos-compliance.md) | Device non-compliant, compliance not evaluating, or Conditional Access blocking despite compliance | [macOS Log Collection](10-macos-log-collection.md) |
```

**New row to append** after the Compliance Evaluation row:
```markdown
| [Platform SSO Investigation](27-macos-sso-investigation.md) | PSSO registration not completing, "Registration Required" loop, or Password-sync sign-in failure | [macOS Log Collection](10-macos-log-collection.md) |
```

**Existing macOS L1 Escalation Mapping table** (lines 87–96 — two-column format):
```markdown
### macOS L1 Escalation Mapping

| L1 Runbook Source | L2 Runbook |
|-------------------|------------|
| Setup Assistant / Enrollment issues | [Profile Delivery Investigation](11-macos-profile-delivery.md) for profile-related escalation; general enrollment issues reviewed case-by-case |
| Configuration profile not applied | [Profile Delivery Investigation](11-macos-profile-delivery.md) |
| App not installed | [App Install Failure Diagnosis](12-macos-app-install.md) |
| Compliance / access blocked | [Compliance Evaluation Investigation](13-macos-compliance.md) |
| Company Portal sign-in failure | [Compliance Evaluation Investigation](13-macos-compliance.md) for Entra registration issues |
```

**New rows to append** to this table (after the Company Portal sign-in failure row):
```markdown
| [L1 35: Platform SSO Sign-In Failure](../l1-runbooks/35-macos-sso-sign-in-failure.md) | [Platform SSO Investigation](27-macos-sso-investigation.md) — Registration Failure track |
| [L1 36: Platform SSO — Secure Enclave Key Loss](../l1-runbooks/36-macos-secure-enclave-key.md) | [Platform SSO Investigation](27-macos-sso-investigation.md) — Registration Failure track (SE key re-registration path) |
```

Note: the existing table uses bare text for L1 source; the new rows use linked text matching the iOS and Android escalation-mapping tables at lines 115–124 and 149–157, which use the linked format `[L1 NN: Title](../l1-runbooks/NN-file.md)`. Either format is acceptable — follow the linked format as it is more recent.

**Version History row to prepend** (lines 210–220):
```markdown
| 2026-06-21 | Phase 80 SSORUN-03/SC4: added macOS Platform SSO Investigation #27 to When-to-Use table; added L1 #35 and L1 #36 escalation mapping rows to macOS L1 Escalation Mapping table | -- |
```

---

## Shared Patterns

### Frontmatter Convention
**Source:** All existing L1 macOS runbooks (#10–#15, lines 1–7); all existing L2 macOS runbooks (#10, #11, #12, #13, lines 1–7)
**Apply to:** All three new runbooks
```yaml
---
last_verified: 2026-06-21
review_by: 2026-09-21
applies_to: ADE
audience: [L1 or L2]
platform: macOS
---
```
The `review_by` must be exactly 90 days from `last_verified`. For `2026-06-21` that is `2026-09-21`.

### Platform-Gate Blockquote
**Source:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md` line 9; `docs/l2-runbooks/10-macos-log-collection.md` line 9
**Apply to:** All three new runbooks (L1 #35, L1 #36, L2 #27)
```markdown
> **Platform gate:** This guide covers macOS ADE troubleshooting via Intune. For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks).
```
(L2 #27 uses the adapted version shown in its section above.)

### "Say to the user" Dialogue Pattern
**Source:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md` lines 24, 45
**Apply to:** L1 #35 and L1 #36 (not L2 — L2 runbooks do not have end-user-facing scripts)
```markdown
N. > **Say to the user:** "[Script text here]"
```
This must be a blockquote (`> `) immediately following the step number and period. Never use bold, headers, or separate paragraphs for user-facing dialogue.

### Escalation Criteria + "Before Escalating, Collect:" Pattern
**Source:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md` lines 47–67; `docs/l1-runbooks/14-macos-compliance-access-blocked.md` lines 86–108
**Apply to:** L1 #35 and L1 #36
```markdown
## Escalation Criteria

Escalate to L2 if:

- [trigger condition 1]
- [trigger condition 2]
- [trigger condition N]

**Before escalating, collect:**

- [data item 1]
- [data item 2]
- [data item N]

See [L2 runbook name](../l2-runbooks/27-macos-sso-investigation.md) for [scope description].
```
The "See" line is the mandatory in-phase escalation edge (D-02a). Must link to `27-macos-sso-investigation.md`.

### Back-to-Triage Footer
**Source:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md` lines 69–71; `docs/l1-runbooks/14-macos-compliance-access-blocked.md` lines 111–112
**Apply to:** L1 #35 and L1 #36 only (L2 runbooks do not carry this footer)
```markdown
---

[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)
```
Replicate verbatim. Per decision B1: link target exists; SSO leaf is not in the tree yet but the tree file itself is valid. Do NOT modify this link target.

### Version History Table
**Source:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md` lines 73–77; `docs/l2-runbooks/19-android-enrollment-investigation.md` lines 299–303
**Apply to:** All three new runbooks
```markdown
## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-21 | Initial version | -- |
```
L2 #27 should use a slightly more descriptive change summary (see pattern in analog #19 line 303).

### Link-Not-Copy (Guides 07/08/09)
**Source:** Established pattern from Phases 76–79, referenced in CONTEXT.md §Established Patterns
**Apply to:** All three new runbooks, particularly L2 #27
Never reproduce tables or step lists from `07-platform-sso-setup.md`, `08-auth-methods-deep-dive.md`, or `09-enterprise-sso-plugin-migration.md`. Summarize the relevant fact in one sentence, then link:
```markdown
For the Configuration-Caused Failures table (Error 10002, mistyped registration token, minimum CP version), see [Platform SSO Setup Guide §Configuration-Caused Failures](../admin-setup-macos/07-platform-sso-setup.md).
```

### macOS L2 Log-Collection Prerequisite Opener
**Source:** `docs/l2-runbooks/19-android-enrollment-investigation.md` line 17; `docs/l2-runbooks/10-macos-log-collection.md` line 19
**Apply to:** L2 #27 Context section (D-01b mandatory)
```markdown
Before starting: collect a diagnostic package per the [macOS Log Collection Guide](10-macos-log-collection.md).
```
This exact phrasing ("Before starting: collect a diagnostic package per the [X]") is used by every L2 runbook that has a platform log-collection prerequisite. The sentence appears in the Context section body, not as a heading.

---

## Anti-Patterns (Do NOT Replicate)

| Pattern | Source | Why Forbidden |
|---------|--------|---------------|
| Mermaid decision tree as primary structure | `docs/l2-runbooks/26-apple-business-permission-denied.md` lines 29–52 | Rejected as A2 for L2 #27 — router leaves would target Phase-81-owned `06-macos-triage.md` SSO leaf; PSSO investigation requires inline depth, not routing |
| `security find-certificate` command | Any occurrence | SC3 absolute: SE keys invisible to keychain API since August 2025; command gives false negatives on all correctly enrolled PSSO devices |
| `app-sso diagnose` subcommand | (none in corpus — never existed) | UNVERIFIED / presumed non-existent per RESEARCH.md §2 — must not appear in any runbook |
| Cross-links between #35 and #36 | Would be new | Decision D2 prohibits; disambiguation owned by Phase 81 SSO leaf |
| Forward links to `06-macos-triage.md` SSO leaf | Would be new | Phase 81 / SSOREF-04 owns the SSO leaf; it does not exist at Phase-80 commit time (decision B1) |
| Forward links to `docs/index.md`, `common-issues.md`, `quick-ref-l1/l2.md` | Would be new | Phase 81 owns all nav-hub wiring |
| Fabricated `app-sso platform -s` failure-state field names | Would be new | JSON schema for failure states not published in any authoritative source (Assumption A1 in RESEARCH.md); runbooks must use conservative prose ("any output other than REGISTERED") |

---

## No Analog Found

All five files have analogs. No entries in this table.

---

## Metadata

**Analog search scope:** `docs/l1-runbooks/`, `docs/l2-runbooks/`
**Files read:** 7 (L1 #14, L1 #15, L2 #10, L2 #19, L2 #26, L1 index, L2 index)
**Pattern extraction date:** 2026-06-21
