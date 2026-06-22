# Phase 80: L1/L2 Runbooks — Research

**Researched:** 2026-06-21
**Domain:** macOS Platform SSO (PSSO) troubleshooting runbook authoring — documentation phase
**Confidence:** HIGH (primary facts verified via Microsoft Learn + corpus canonical sources) / LOW (app-sso output field names — see Assumptions Log)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**A — L2 #27 document structure (WINNER: A1, two linear investigation tracks)**
- D-01: Structure L2 #27 as two sequential linear investigation tracks — Registration-failure track and Password-sync-failure track — modeled on `docs/l2-runbooks/19-android-enrollment-investigation.md`
- D-01a: Import L2 #19's "From L1 escalation?" routing block near the top
- D-01b: Open with the macOS log-collection prerequisite handoff to `docs/l2-runbooks/10-macos-log-collection.md`

**B — Forward-link / navigation-last boundary (WINNER: B1, existing-artifact links only)**
- D-02: Runbooks link ONLY to artifacts that exist at Phase-80 commit time
- D-02a: `35-…` and `36-…` MUST each contain a `→ 27-macos-sso-investigation.md` escalation link; L2 #27 MUST carry reciprocal back-references. The standard `[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)` footer is kept on L1 runbooks.

**C — L1 Terminal-command interaction model (WINNER: C1, guided Terminal walkthrough)**
- D-03: Walk the user through `app-sso platform -s` in Terminal using the "Say to the user" guided-conversation pattern, then have them report the output back to L1
- D-03a: Scope Terminal step to `app-sso platform -s` only; reproduce the command verbatim; pair with structured "Before escalating, collect:" checklist

**D — L1 #35 ↔ #36 cross-coverage boundary (WINNER: D2, strictly independent)**
- D-04: Keep `35-…` and `36-…` strictly independent — no `#35↔#36` cross-links; disambiguation deferred to Phase 81 SSO leaf

### Claude's Discretion
- Exact prose wording of all triage steps, "Say to the user" scripts, escalation-trigger bullets, and the L2 investigation narrative — within locked SC1–SC4 facts
- Internal heading/anchor text within each runbook (subject to corpus frontmatter + house-style conventions)
- Exact phrasing of the L2 #27 "From L1 escalation?" routing block and the two track headings
- The L2-index escalation-mapping table's exact column layout (follow existing `00-index.md` table conventions)

### Deferred Ideas (OUT OF SCOPE)
- Decision-tree SSO leaf + #35/#36 disambiguation — Phase 81 (SSOREF-04)
- All nav-hub rows (`docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) — Phase 81
- v1.9 harness lineage bump + any `check-phase-80` validator — Phase 82
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SSORUN-01 | L1 runbook `35-macos-sso-sign-in-failure.md` — "Registration required" not appearing despite Intune "Succeeded"; 4 root causes; `app-sso platform -s` first triage step | Sections: Standard Stack, Architecture Patterns, Code Examples, Common Pitfalls |
| SSORUN-02 | L1 runbook `36-macos-secure-enclave-key.md` — Secure Enclave key verification and loss-after-password-reset recovery | Sections: Standard Stack, Code Examples §SE Key Loss |
| SSORUN-03 | L2 runbook `27-macos-sso-investigation.md` — PSSO registration + Password-sync investigation; sign-in logs; sysdiagnose; TLS exclusion; per-user-MFA/AD-bound causes; macOS 15.0-15.2 loop version-gated "fixed in 15.3" | Sections: Standard Stack, Architecture Patterns, Code Examples, Common Pitfalls, State of the Art |
</phase_requirements>

---

## Summary

This is a documentation-only phase producing three Markdown runbooks and four index rows. No code is written. Research focuses on validating the technical facts the runbook authors will transcribe into triage steps: command syntax, command output structure, log predicates, version-gated bug status, and root-cause distinguishability.

The `app-sso platform -s` command is confirmed as the canonical first-step diagnostic for both L1 runbooks and as the replacement for `security find-certificate` (which returns false negatives for Secure Enclave–stored WPJ keys from August 2025 onward). The command path is `/usr/bin/app-sso platform -s` and it returns JSON output. Microsoft Learn documents the two primary success indicators: device-side output showing SSO tokens are retrieved, with device registration and user registration both in the REGISTERED state. The exact JSON field names are not published in any authoritative source found during this research session — treat them as ASSUMED and note that the canonical guides 07 and 08 (already in the corpus) contain the verified prose descriptions the runbooks must link to.

The `app-sso diagnose` subcommand does NOT appear in any authoritative source — Microsoft Learn, Apple developer docs, or the community references checked. The ROADMAP research flag for this subcommand must be resolved as UNVERIFIED/not-confirmed and the runbook author must use the verified sysdiagnose procedure (enable debug → `sudo sysdiagnose` → reset logging) as the L2 deep-dive tool instead.

The macOS 15.0–15.2 re-registration loop bug is VERIFIED via Microsoft Learn (updated 2026-06-15): Apple confirmed the fix is in macOS 15.3. The exact cause — concurrent updates from AppSSOAgent and AppSSODaemon corrupting the device config plist — is also documented. The version-gate callout in L2 #27 must reference macOS 15.0–15.2 as the affected range and state "fixed in macOS 15.3."

**Primary recommendation:** Author runbooks against the verified canonical sources in the corpus (guides 07/08/09) using the house-style templates (L1 #15, L2 #19). All LOW-confidence items below should appear as UNVERIFIED callouts in runbook prose rather than as asserted facts.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| PSSO device-side state query | macOS OS binary (`app-sso`) | None | `/usr/bin/app-sso` is an Apple-supplied OS binary; runs on the device in user Terminal |
| Log capture for SSO events | macOS unified log (`log stream` / `log show`) | IntuneMacODC zip | Unified log is the authoritative source for AppSSO events; IntuneMacODC captures a log excerpt |
| PSSO policy delivery | Microsoft Intune (Settings Catalog) | None | `com.apple.extensiblesso` payload delivered by MDM |
| Device + user registration state | Intune admin center portal + device-side `app-sso` | Entra admin center | Intune shows "Succeeded" at policy level; `app-sso` shows actual registration state |
| TLS-inspection exclusion verification | Network team + proxy configuration | Intune troubleshoot page | Excluded endpoints must be verified at the proxy/firewall level, not from the device |
| Per-user MFA blocker verification | Entra admin center (Authentication methods) | None | The per-user MFA setting lives in the legacy Azure AD per-user MFA blade, not Conditional Access |
| AD-bound account detection | Device-side (local user account type inspection) | Intune device record | AD-bound (mobile) accounts are visible via `dscl` or user account properties |

---

## Standard Stack

This is a documentation phase — no packages are installed. The "stack" is the set of verified tools and commands the runbook author must document.

### Core Diagnostic Tools

| Tool | Type | Purpose | Authoritative Source |
|------|------|---------|----------------------|
| `app-sso platform -s` | Apple OS binary (`/usr/bin/app-sso`) | Query PSSO registration state (device + user); returns JSON output | [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension] |
| `sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"` | macOS unified log | Enable persistent debug logging for PSSO subsystem before reproducing issues | [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension] |
| `sudo sysdiagnose` | Apple OS binary | Capture full system diagnostic archive including PSSO-relevant log entries | [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension] |
| `sudo log config --reset --subsystem "com.apple.AppSSO"` | macOS unified log | Reset debug logging to defaults after capture | [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension] |
| IntuneMacODC | Microsoft-provided bash script | Comprehensive Intune log collection including system log excerpt | [CITED: docs/l2-runbooks/10-macos-log-collection.md — corpus canonical] |

### Supporting Log Subsystems

| Subsystem Identifier | What It Covers | Confidence |
|----------------------|----------------|------------|
| `com.apple.AppSSO` | Platform SSO extension events: registration, token acquisition, sign-in flows | [VERIFIED: learn.microsoft.com PSSO troubleshoot page + psso-utility GitHub README] |
| `com.apple.AuthenticationServices` | Authentication service events including SSO broker interaction | [CITED: github.com/jamf-concepts/psso-utility] |
| `com.apple.ManagedClient` | MDM command processing and profile delivery (existing corpus entry) | [CITED: docs/reference/macos-commands.md — corpus canonical] |

### No-Install Affirmation

No npm, pip, or cargo packages are installed in this phase. Package Legitimacy Audit section is not applicable.

---

## Architecture Patterns

### System Architecture Diagram — PSSO Triage Flow

```
User symptom reported
        |
        v
[L1 Triage — Runbook #35 or #36]
        |
        | app-sso platform -s output collected from device
        |
  ┌─────┴──────────────────────────────────┐
  | NOT REGISTERED (device or user)        |  ← Root-cause pattern match
  | REGISTERED but sign-in still fails     |  ← Escalate to L2 #27
  └─────┬──────────────────────────────────┘
        |
        | (escalation trigger met)
        v
[L2 Investigation — Runbook #27]
        |
  ┌─────┴──────────────────────┐
  | Track A: Registration Failure │ ← sign-in logs, Intune portal, TLS exclusion, 15.x bug
  | Track B: Password-Sync Failure │ ← DF-3 per-user MFA, DF-7 AD-bound account, complexity
  └────────────────────────────┘
        |
        v
[External: Microsoft Support sysdiagnose packet]
```

### Recommended File Structure

```
docs/
├── l1-runbooks/
│   ├── 35-macos-sso-sign-in-failure.md     ← CREATE (SSORUN-01)
│   └── 36-macos-secure-enclave-key.md      ← CREATE (SSORUN-02)
├── l2-runbooks/
│   └── 27-macos-sso-investigation.md       ← CREATE (SSORUN-03)
├── l1-runbooks/00-index.md                 ← EDIT (add rows for #35, #36)
└── l2-runbooks/00-index.md                 ← EDIT (add row for #27 + escalation mapping)
```

### Pattern 1: L1 Runbook Structure (house-style from #15)

```markdown
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: ADE
audience: L1
platform: macOS
---

> **Platform gate:** ...

# [Title]

[Opening paragraph: when to use this runbook]

## Prerequisites
[Admin center access, device serial, user UPN]

## Steps
1. > **Say to the user:** "..."
2. [Portal-only or cause-gated Terminal step]
...

## Escalation Criteria
Escalate to L2 if:
- [trigger list]

**Before escalating, collect:**
- [checklist]

See [L2 runbook link].

---
[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)

## Version History
| Date | Change | Author |
```

**Key house-style rules (from #15 and L1 index):**
- `audience: L1` and `platform: macOS` in frontmatter
- Platform-gate blockquote immediately after frontmatter
- `> **Say to the user:**` for user-facing conversation steps
- Terminal steps are scoped to cause-specific diagnostics (permitted by `00-index.md:81` affordance for "terminal walkthrough as appropriate per cause")
- Escalation Criteria section + structured "Before escalating, collect:" checklist
- Back-to-triage footer `[Back to macOS ADE Triage](../decision-trees/06-macos-triage.md)`
- Version History table at end

### Pattern 2: L2 Investigation Structure (house-style from #19)

The L2 runbook follows a three-part structure per D-01:

```markdown
# macOS Platform SSO Investigation

## Context
[scope: registration failures + password-sync failures]

Before starting: collect a diagnostic package per [macOS Log Collection Guide](10-macos-log-collection.md).

**From L1 escalation?** L1 runbook 35 (sign-in failure) / 36 (Secure Enclave key) has escalated.
[routing table to track A or B]

## Track A: Registration Failure Investigation
### Step 1: [Intune portal state check]
...

## Track B: Password-Sync Failure Investigation
### Step 1: [per-user MFA check]
...

## Related Resources
- [back-links to #35 and #36]
- [link to 10-macos-log-collection.md]
- [links to guides 07/08]
```

**Key structural rules (from D-01a, D-01b, and #19 pattern):**
- Open with log-collection prerequisite handoff (D-01b mandatory)
- "From L1 escalation?" routing block near top (D-01a mandatory)
- Two sequential linear tracks; Registration track first (per CONTEXT.md ordering)
- Each track: Intune portal checks first, then device-side commands, then cause-match analysis
- Reciprocal back-references to #35 and #36 (D-02a mandatory)
- Link-not-copy: summarize + link to guides 07/08, never duplicate their tables

### Anti-Patterns to Avoid

- **Mermaid router model:** Do NOT use L2 #26's Mermaid-first structure — rejected (A2) because it would pre-empt Phase-81-owned `06-macos-triage.md` SSO leaf
- **`security find-certificate`:** Must NEVER appear — use `app-sso platform -s` everywhere (SC3 absolute requirement)
- **Forward links to Phase-81 artifacts:** Do NOT add links to `06-macos-triage.md` SSO leaf or nav-hub rows — they don't exist at Phase-80 commit time (B1 binding)
- **Cross-links between #35 and #36:** Strictly forbidden (D2 decision); disambiguation belongs to Phase-81 SSO leaf

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| PSSO state query | Custom WMI/keychain script | `app-sso platform -s` (Apple OS binary) | SE-stored keys are invisible to keychain APIs; only `app-sso` surfaces them |
| PSSO log capture | Manual log grepping | `sudo sysdiagnose` with debug enable/reset | Sysdiagnose packages the right artifacts; manual grep misses concurrent-corruption signatures |
| Company Portal log upload | Manual file extraction | Company Portal > Help > Send diagnostic report | Portal generates an incident ID Microsoft Support can retrieve; manual extraction is incomplete |
| TLS exclusion verification | Device-side test only | Network team proxy/firewall audit | Device-side tests cannot detect TLS interception that passes silently; needs proxy config inspection |

**Key insight:** PSSO failures are often silent (no error displayed, no actionable message). The diagnostic toolchain — `app-sso platform -s` + sysdiagnose + Intune portal device status — is the minimum set to localize any failure.

---

## Research Findings: PRIMARY FOCUS ITEMS

### 1. `app-sso platform -s` — Command Verification

**Verified facts:**
- Full path: `/usr/bin/app-sso platform -s` [VERIFIED: github.com/jamf-concepts/psso-utility README — "The app runs `/usr/bin/app-sso platform -s` and parses the JSON output"]
- The command returns **JSON output** [VERIFIED: psso-utility GitHub README; multiple community sources]
- Microsoft Learn documents the command verbatim and states: "You should see in the bottom of the output that SSO tokens are retrieved" [CITED: learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on]
- Microsoft Learn troubleshoot page documents this as the canonical status check tool [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension]
- Corpus guide 07 (`07-platform-sso-setup.md`) documents the expected success output: `Device Registration: REGISTERED` and `User Registration: REGISTERED` [CITED: docs/admin-setup-macos/07-platform-sso-setup.md — corpus canonical, Phase 76 deliverable]

**What the output shows (from corpus guide 07 + Microsoft Learn):**
- `Device Registration` field: `REGISTERED` (success) — absence or other value indicates failure
- `User Registration` field: `REGISTERED` (success) — absent or other value indicates failure
- SSO tokens present in the output (bottom section) when healthy
- Corpus guide 09 shows the successful grep pattern: `app-sso platform -s | grep "Device Registration"` returning `Device Registration: REGISTERED`

**What is NOT verified (ASSUMED):**
- The exact JSON field names as they appear in raw output (e.g., whether the key is `"Device Registration"` as a JSON string key or a human-readable label)
- The specific value strings for failure states (e.g., whether a not-registered device shows `NOT_REGISTERED`, `NOT REGISTERED`, or absence of the field)
- Whether `Security Enclave Key` presence is shown as a separate field

**Authoring guidance:** The L1 runbooks must instruct the user to run `app-sso platform -s` verbatim and report the entire output. The "Before escalating, collect:" checklist should request the full output, not just one field. The runbook prose should describe the expected healthy state ("Device Registration: REGISTERED and User Registration: REGISTERED") as documented in guide 07, and say that any other output requires escalation. Do NOT fabricate specific failure state strings.

**`security find-certificate` obsolescence:** Confirmed VERIFIED. From August 2025, WPJ keys are stored in the Secure Enclave, not the Login Keychain. `security find-certificate` returns false negatives on correctly enrolled PSSO devices [CITED: docs/admin-setup-macos/08-auth-methods-deep-dive.md fact #4; docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md "Before You Migrate" callout — both corpus canonical].

---

### 2. `app-sso diagnose` — UNVERIFIED / Does Not Appear to Exist

**Research finding:** No authoritative source — Microsoft Learn, Apple developer documentation, Apple support documentation, or any verified community reference — documents an `app-sso diagnose` subcommand.

**Sources checked:**
- Microsoft Learn PSSO troubleshoot page (updated 2026-06-15): Documents only `app-sso platform -s`. No `diagnose` subcommand mentioned.
- Apple Support Platform SSO deployment guide: No `app-sso diagnose` documented.
- Jamf PSSO utility GitHub README: References only `app-sso platform -s`. No `diagnose`.
- IntuneIRL deep-dive article: References `app-sso platform -s`. No `diagnose`.
- Community forum searches: No confirmed `app-sso diagnose` usage found.

**Verdict:** `app-sso diagnose` is **UNVERIFIED** and should be treated as potentially non-existent. The ROADMAP research flag for this command cannot be resolved affirmatively.

**Authoring impact for L2 #27:** The deep-dive diagnostic procedure documented in Microsoft Learn uses the sysdiagnose procedure, not `app-sso diagnose`. Use the verified procedure:
1. `sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"`
2. Reproduce the issue
3. `sudo sysdiagnose`
4. `sudo log config --reset --subsystem "com.apple.AppSSO"`

This is the Microsoft-documented approach and is VERIFIED from the authoritative troubleshoot page.

---

### 3. `log stream --predicate` — Verified Subsystem Values

**Verified predicates for PSSO events:**

```bash
# Live stream PSSO extension events (registration, token acquisition, sign-in)
log stream --predicate 'subsystem == "com.apple.AppSSO"' --info

# Historical query of PSSO events
log show --predicate 'subsystem == "com.apple.AppSSO"' --info --last 1h

# Enable debug-level PSSO logging FIRST (before streaming for richer output)
sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"
```

**Source confidence:** [CITED: learn.microsoft.com troubleshoot page — `com.apple.AppSSO` subsystem documented for debug enable/reset commands] + [CITED: github.com/jamf-concepts/psso-utility — "displays the last 2 hours of system log entries from the com.apple.AppSSO and com.apple.AuthenticationServices subsystems"] + [CITED: intuneirl.com deep-dive — "log stream --predicate 'subsystem == "com.apple.AppSSO"'"]

**Broader SSO investigation predicate (from community sources):**
```bash
log stream --debug --predicate '(subsystem == "com.apple.AppSSO") OR (subsystem == "com.apple.AppSSOAgent")'
```
[ASSUMED from community sources — `com.apple.AppSSOAgent` subsystem name not verified in official docs but consistent across multiple independent community references]

**Authoring guidance for L2 #27:** Use the `com.apple.AppSSO` subsystem predicate as the primary PSSO log filter. The debug-enable + sysdiagnose procedure is the Microsoft-recommended investigation path for cases sent to Microsoft Support. Document the live-stream command as an L2 real-time investigation option, but note that sysdiagnose is required for any Microsoft Support escalation.

**Existing corpus log commands (for cross-reference):**
The corpus already documents `log show --predicate 'subsystem == "com.apple.ManagedClient"'` for general MDM events in `docs/reference/macos-commands.md`. The L2 #27 runbook should add the `com.apple.AppSSO` filter as a PSSO-specific complement, not a replacement.

---

### 4. Sysdiagnose Procedure for PSSO Investigations

**Verified procedure from Microsoft Learn** [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension]:

```bash
# Step 1: Enable debug logging persistence
sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"

# Step 2: Reproduce the issue (sign-in failure, registration failure, etc.)
# Note relevant timestamps for log analysis

# Step 3: Capture the sysdiagnose
sudo sysdiagnose

# Step 4: Reset debug logging
sudo log config --reset --subsystem "com.apple.AppSSO"
```

**Microsoft Learn also documents:** Company Portal > Help > Send diagnostic report as the companion CP-side log capture. The incident ID from this report is what Microsoft Support uses to retrieve logs.

**Sysdiagnose during Setup Assistant** (documented for L2 reference): `Control + Option + Command + Shift + Period (.)` triggers sysdiagnose capture during Setup Assistant. Logs land at `/private/var/tmp/` (sometimes `/var/tmp/`) as `sysdiagnose_YYYY.MM.DD_*.tar.gz`.

**PSSO sign-in log locations (from sysdiagnose):** The sysdiagnose archive contains AppSSO subsystem log entries. The macOS 15.0–15.2 re-registration loop error signature is documented:
```
Error Domain=com.apple.PlatformSSO Code=-1001 "Error deserializing device config."
UserInfo={..., NSDebugDescription=Garbage at end around line 27, column 1.}
```
[CITED: learn.microsoft.com troubleshoot page — exact error string documented]

---

### 5. macOS 15.0–15.2 Re-Registration Loop Bug

**Status: VERIFIED — Fixed in macOS 15.3**

**Source:** Microsoft Learn PSSO troubleshoot page, updated 2026-06-15 [CITED: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension]:

> "Note: Latest update on the PSSO re-registration issue on macOS 15.x described below: Apple confirmed the fix is deployed in macOS 15.3. If users still experience the re-registration issue on macOS 15.3+, please engage with Apple and share the logs via Apple support."

**Root cause (documented):** Concurrency issue — simultaneous updates from AppSSOAgent and AppSSODaemon processes corrupt the device configuration plist. The corrupted config triggers OS re-registration remediation, causing unexpected registration prompts.

**Error signature in sysdiagnose:**
```
Error Domain=com.apple.PlatformSSO Code=-1001 "Error deserializing device config."
NSDebugDescription=Garbage at end around line 27, column 1.
```

**Version gate for L2 #27 callout:**
- Affected: macOS 15.0, 15.1, 15.2 (Sequoia)
- Fixed: macOS 15.3 (Apple confirmed)
- Action: Upgrade devices to macOS 15.3+ before deployment; if re-registration loop occurs on 15.3+, escalate to Apple Support (not just Microsoft)

**Authoring guidance:** Present as a blockquote callout in L2 #27, version-gated. Pattern: "If the device is running macOS 15.0–15.2: this is a known Apple bug (fixed in 15.3). Upgrade to 15.3 or later. If 15.3+ and loop persists, file Apple Care issue."

---

### 6. L1 #35 Root Causes — Distinguishability via `app-sso platform -s`

The four root causes of "Registration required notification not appearing despite Intune Succeeded" are documented in the corpus. Here is what each looks like and how L1 distinguishes them:

#### Root Cause 1: Old Company Portal Version

**Verified facts:**
- Minimum CP version for standard post-enrollment PSSO: **5.2404.0** [CITED: docs/admin-setup-macos/07-platform-sso-setup.md; learn.microsoft.com configure-platform-sso-macos]
- If CP is older than 5.2404.0, PSSO registration cannot succeed; the Enterprise SSO plug-in bundled in CP is absent or insufficient
- `app-sso platform -s` on such a device will show device/user registration NOT in REGISTERED state

**L1 triage step:** Check Company Portal version via Intune admin center > Apps > macOS > Company Portal > Device install status, OR ask user to check About in Company Portal app. If version < 5.2404.0, this is the root cause.

#### Root Cause 2: Error 10002 — Legacy SSO Extension Conflict

**Verified facts:**
- Error 10002 occurs when both the legacy Device Features SSO app extension profile AND the Platform SSO Settings Catalog policy are assigned to the **same device simultaneously** [CITED: docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md — corpus canonical Phase 78 deliverable]
- Error 10002 text: "multiple SSOe payloads configured" — visible in Intune admin center device configuration status [CITED: docs/admin-setup-macos/07-platform-sso-setup.md Configuration-Caused Failures table]
- PSSO registration is blocked; neither profile works
- `app-sso platform -s` will show NOT REGISTERED state

**L1 triage step:** Navigate to Intune admin center > Devices > [device] > Configuration. If both a Device Features SSO profile AND a Settings Catalog Platform SSO profile both show as applied, Error 10002 is the cause. Resolution requires unassigning the legacy profile. This is an admin action — L1 escalation trigger.

#### Root Cause 3: Mistyped Registration Token

**Verified facts:**
- The registration token `{{DEVICEREGISTRATION}}` must be copied exactly including both sets of braces; any deviation causes the profile to deploy successfully (Intune shows "Succeeded") but the "Registration Required" notification never appears and registration never starts [CITED: docs/admin-setup-macos/07-platform-sso-setup.md Configuration-Caused Failures table]
- `app-sso platform -s` will show NOT REGISTERED state
- Intune device configuration status shows "Succeeded" — this is the key differentiator from Error 10002 (which shows an error code)

**L1 triage step:** Navigate to Intune admin center > Devices > [device] > Configuration > [Platform SSO policy] > View report. If status shows "Succeeded" but user never received a notification, check the Registration Token field in the policy. If token is wrong, this is an admin-level fix.

#### Root Cause 4: Dismissed "Registration Required" Notification

**Verified facts:**
- The PSSO "Registration Required" notification appears in Notification Center; if the user dismisses it without registering, no re-prompt occurs automatically [CITED: docs/admin-setup-macos/07-platform-sso-setup.md Step 5 description; learn.microsoft.com configure-platform-sso-macos Step 5]
- Intune shows "Succeeded" (profile deployed), but user never completed registration
- `app-sso platform -s` shows device-level policy received but User Registration NOT REGISTERED (device registration may or may not be complete depending on timing)
- macOS 14 repair path: Settings > Users & Groups > Network Account Server > Edit > Repair

**L1 triage step:** Confirm that Intune shows policy "Succeeded" for the device. Ask user if they received and dismissed a notification. If yes, guide user through macOS 14 repair path (Settings > Users & Groups > Network Account Server > Edit > Repair). If macOS 13, user must re-do registration via Company Portal.

---

### 7. Secure Enclave Key Loss After Password Reset (L1 #36)

**Verified facts from corpus guide 08** [CITED: docs/admin-setup-macos/08-auth-methods-deep-dive.md SE Key Destruction Warning]:
- MDM-driven password reset (Intune remote action) destroys the SE key
- FileVault recovery key use (entering recovery key at cold boot) destroys the SE key
- This is expected behavior, not a bug
- The Secure Enclave key binding is tied to the interactive password-change flow; external resets sever this binding

**Recovery / re-registration path** [CITED: learn.microsoft.com troubleshoot page; docs/admin-setup-macos/08-auth-methods-deep-dive.md]:
- macOS 14: Settings > Users & Groups > Network Account Server > Edit > Repair
- macOS 13: Company Portal > Deregister, then re-register
- After repair/re-registration, user completes MFA and new SE key is provisioned

**`app-sso platform -s` state after key loss:**
- User Registration will show NOT in REGISTERED state (or SE key absent)
- Device Registration may still show REGISTERED (device-level registration survives a password reset; only user-level SE key is destroyed)

**Authoring guidance for L1 #36:** The runbook opens with the use case "user's Platform SSO stopped working after a password reset." The `app-sso platform -s` step confirms the loss (User Registration not REGISTERED). Recovery step: macOS 14 Repair path via System Settings, or Company Portal Deregister/re-register for macOS 13. The runbook must note that FileVault still works (uses local password); only the PSSO Entra SSO function is broken after key loss.

---

### 8. TLS-Inspection Exclusion Verification (L2 #27)

**Verified TLS exclusion requirements for PSSO** [CITED: learn.microsoft.com troubleshoot-macos-platform-single-sign-on-extension — TLS Inspection URLs section]:

For registration flows:
- See Microsoft's network requirements for device registration page (Microsoft Learn linked from the troubleshoot page)

For token acquisition and refresh:
- `app-site-association.cdn-apple.com`
- `app-site-association.networking.apple`
- `login.microsoftonline.com`
- `login.microsoft.com`
- `sts.windows.net`
- Sovereign cloud additions if applicable

Apple app-site-association domains are critical for SSO extension functioning.

**Corpus coverage:** The guide 07 (`07-platform-sso-setup.md`) Known Silent Blockers section (DF-10) documents these same endpoints. L2 #27 should reference guide 07's DF-10 callout via link-not-copy.

**L2 investigation step:** For TLS inspection investigation, L2 cannot verify exclusions from the device side — this requires the network team to confirm proxy bypass rules. L2 should instruct: "Confirm with the network team that the following endpoints are excluded from TLS break-and-inspect inspection on the corporate proxy."

---

### 9. Per-User MFA Blocker (L2 #27 — Password-Sync Track)

**Verified facts from corpus guide 08 and Microsoft Learn** [CITED: docs/admin-setup-macos/08-auth-methods-deep-dive.md DF-3 entry; docs/admin-setup-macos/07-platform-sso-setup.md Known Silent Blockers DF-3; learn.microsoft.com troubleshoot page "Per-user MFA causes password sync failure"]:
- Legacy per-user MFA (Azure AD per-user MFA settings — NOT Conditional Access) silently blocks Password sync PSSO registration
- No error is displayed; the webview authentication challenge cannot be completed
- Resolution: Disable per-user MFA for PSSO target users; use Conditional Access MFA policy instead

**L2 verification step:** Navigate to Entra admin center > Users > [user] > Per-user MFA. If per-user MFA is enabled, this is the blocker for Password-sync PSSO failures.

---

### 10. AD-Bound (Mobile) Account Limitation (L2 #27 — Password-Sync Track)

**Verified facts from corpus guide 08** [CITED: docs/admin-setup-macos/08-auth-methods-deep-dive.md DF-7 entry]:
- Devices where the macOS user account was created by Active Directory binding (AD mobile accounts) silently fail Password sync registration
- The PSSO password synchronization API expects a standard macOS local account
- Recommendation: Use Secure Enclave key method for organizations transitioning away from AD binding, or unbind + create new local accounts

**L2 investigation step:** Check whether the macOS user account is an AD mobile account (visible via `dscl . -read /Users/<username> OriginalNodeName` or via System Settings > Users & Groups account type). If AD mobile, this is the root cause for Password-sync failures.

---

## Common Pitfalls

### Pitfall 1: `security find-certificate` False Negatives on PSSO Devices

**What goes wrong:** IT staff or compliance scripts run `security find-certificate -a | grep Microsoft` to check WPJ certificate presence. The command returns nothing, leading to incorrect conclusion that PSSO enrollment failed.
**Why it happens:** From August 2025, new Entra device registrations store the WPJ key in the Secure Enclave, not the Login Keychain. The Keychain API (`security`) cannot access Secure Enclave–stored keys.
**How to avoid:** Use `app-sso platform -s | grep "Device Registration"` exclusively. Never use `security find-certificate` for PSSO state verification.
**Warning signs:** Compliance scripts report "not compliant" while `app-sso platform -s` shows REGISTERED.

### Pitfall 2: Intune "Succeeded" Does Not Mean Registration Completed

**What goes wrong:** L1 agent sees Intune device configuration status "Succeeded" for the Platform SSO policy and concludes PSSO is working. User still cannot sign in.
**Why it happens:** "Succeeded" means the Settings Catalog payload was delivered and installed. It does NOT mean the user completed the registration step. The user must respond to the "Registration Required" notification and complete MFA.
**How to avoid:** Always check `app-sso platform -s` device-side state in addition to Intune portal status.
**Warning signs:** Intune shows Succeeded, user never saw a notification, `app-sso platform -s` shows NOT REGISTERED.

### Pitfall 3: PSSO Failures Are Typically Silent

**What goes wrong:** User reports "sign-in not working" but there is no error code, no notification, no clear symptom.
**Why it happens:** All three documented "silent blockers" (per-user MFA / CA circular dependency / TLS inspection) produce no error display. The registration flow simply stalls or completes without the expected prompt.
**How to avoid:** Train L1 to run `app-sso platform -s` as the first step for ANY PSSO complaint. Device/user NOT REGISTERED is the universal triage signal.
**Warning signs:** User says "it just doesn't work" with no error code.

### Pitfall 4: macOS 15.0–15.2 Re-Registration Loop

**What goes wrong:** Users on macOS 15.0–15.2 receive repeated "Registration Required" prompts even after completing registration. This looks like a misconfiguration.
**Why it happens:** Apple OS bug — concurrent AppSSOAgent and AppSSODaemon writes corrupt the device config plist. Fixed in macOS 15.3.
**How to avoid:** Version-gate deployment: verify device is on macOS 15.3+ before deploying PSSO to Sequoia fleet.
**Warning signs:** Sysdiagnose contains `Error Domain=com.apple.PlatformSSO Code=-1001 "Error deserializing device config."`

### Pitfall 5: L1 Authoring — Do Not Invent `app-sso` Output Field Names

**What goes wrong (authoring risk):** Runbook author specifies exact JSON field names or values for NOT REGISTERED state (e.g., `"deviceRegistration": "not_registered"`) without verification, then those strings don't match actual output.
**Why it happens:** The full JSON schema of `app-sso platform -s` is not published in any authoritative source.
**How to avoid:** The runbooks should describe the healthy state ("Device Registration: REGISTERED and User Registration: REGISTERED" as documented in guide 07) and instruct L1 to collect and forward the FULL output for any state other than the expected healthy values. Do not fabricate failure-state field values.

---

## Code Examples

### Canonical First-Step Triage Command (All Runbooks)

```bash
# Source: docs/admin-setup-macos/07-platform-sso-setup.md Verification section (corpus)
# Expected healthy output includes: Device Registration: REGISTERED / User Registration: REGISTERED
app-sso platform -s
```

### Healthy State Verification (from guide 07)

```bash
# Confirmed healthy PSSO device shows both of these when grepping the JSON output:
app-sso platform -s | grep "Device Registration"
# Expected: Device Registration: REGISTERED

app-sso platform -s | grep "User Registration"
# Expected: User Registration: REGISTERED
```

[CITED: docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md "Before You Migrate" callout — exact grep shown]

### PSSO Debug Logging Procedure (L2 #27)

```bash
# Source: learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension

# Step 1: Enable persistent debug logging
sudo log config --mode "level:debug,persist:debug" --subsystem "com.apple.AppSSO"

# Step 2: Reproduce the issue (sign-in attempt / registration attempt)

# Step 3: Capture sysdiagnose
sudo sysdiagnose

# Step 4: Reset logging to defaults
sudo log config --reset --subsystem "com.apple.AppSSO"
```

### Live Log Stream for PSSO Events (L2 #27)

```bash
# Source: learn.microsoft.com troubleshoot page (subsystem identifier) + psso-utility README
log stream --predicate 'subsystem == "com.apple.AppSSO"' --info
```

### macOS 14 Re-Registration Repair Path

```
# Source: learn.microsoft.com PSSO troubleshoot page (UI path — not a shell command)
Settings > Users & Groups > Network Account Server > Edit > Repair
```

### Company Portal Log Submission (Microsoft Support packet)

```
# Source: learn.microsoft.com troubleshoot page
Company Portal app > Help > Send diagnostic report > Email logs
# Note the incident ID before closing — provide to Microsoft Support
```

### macOS 15 Loop Error Signature (Sysdiagnose Pattern)

```
# Source: learn.microsoft.com troubleshoot page
Error Domain=com.apple.PlatformSSO Code=-1001 "Error deserializing device config."
UserInfo={NSLocalizedDescription=Error deserializing device config.,
  NSUnderlyingError=... {Error Domain=NSCocoaErrorDomain Code=3840
  "Garbage at end around line 27, column 1."}}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `security find-certificate` to verify WPJ key | `app-sso platform -s` | ~August 2025 (WPJ key moved to Secure Enclave) | `security find-certificate` gives false negatives on all correctly enrolled PSSO devices; must not appear in new runbooks |
| Manual sysdiagnose capture only | Debug-enable + sysdiagnose + CP log submission | Ongoing — documented by Microsoft | Richer AppSSO logs in sysdiagnose when debug enabled first |
| No version-specific PSSO guidance | macOS 15.3+ required for Sequoia PSSO deployments | macOS 15.3 (January 2025 approximate) | Deployments on 15.0–15.2 experience re-registration loops |

**Deprecated/outdated:**
- `security find-certificate -a | grep Microsoft`: Returns false negatives for all PSSO-enrolled devices from August 2025. Do not use or document.
- `app-sso diagnose`: UNVERIFIED subcommand. Do not document or reference as an existing tool.

---

## House-Style Checklist (for planner and author)

The following conventions must be honored by all three runbooks. This list consolidates the constraints extracted from the existing corpus:

### Frontmatter
- `last_verified: 2026-06-21` (or the date of authoring)
- `review_by: 2026-09-21` (90 days)
- `applies_to: ADE`
- L1 runbooks: `audience: L1`; L2 runbook: `audience: L2`
- `platform: macOS`

### Index Rows (L1 `00-index.md`)
- Add under the **macOS ADE Runbooks** section (table at ~lines 40–47)
- Row format: `| 35 | [Title](35-file.md) | When to Use |`
- The intro sentence at line 13 says "no PowerShell execution, no log file analysis required" — the new rows must be consistent with the `00-index.md:81` affordance ("terminal walkthrough as appropriate per cause") that legitimizes the `app-sso platform -s` step

### Index Rows (L2 `00-index.md`)
- Add under **macOS ADE Runbooks** section's When-to-Use table
- Add/extend the **macOS L1 Escalation Mapping** table with rows for L1 #35 → L2 #27 and L1 #36 → L2 #27

### Mandatory In-Phase Edges
- `35-macos-sso-sign-in-failure.md` Escalation Criteria: link to `27-macos-sso-investigation.md`
- `36-macos-secure-enclave-key.md` Escalation Criteria: link to `27-macos-sso-investigation.md`
- `27-macos-sso-investigation.md` Related Resources: back-links to both `35-…` and `36-…`

### Files Must NOT Touch
- `docs/decision-trees/06-macos-triage.md` — no SSO leaf until Phase 81
- `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md` — Phase 81
- Guides 07, 08, 09 — Phase 76/77/78 deliverables, link-not-copy only

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The exact JSON field names output by `app-sso platform -s` for failure states (e.g., `NOT_REGISTERED` or absent field) — not confirmed in any authoritative source | §Research Findings #1 | Runbook instructions may not match actual output; L1 staff may not recognize the failure state |
| A2 | `com.apple.AppSSOAgent` is a valid log subsystem identifier for unified log predicates — referenced in community sources but not in Microsoft Learn or Apple developer docs | §Research Findings #3 | Log filter may produce no output or filter the wrong events |
| A3 | The ~4-hour password sync window for Password-sync method — noted as MEDIUM confidence in guide 08 (`review_by: 2026-09-21`) | Common knowledge from corpus | Helpdesk guidance around sync timing may be inaccurate |

**If this table is short:** All critical claims (command syntax, bug status, root causes, house-style rules) were verified against Microsoft Learn or corpus canonical sources.

---

## Open Questions

1. **`app-sso platform -s` exact output schema**
   - What we know: Command returns JSON; healthy output includes `Device Registration: REGISTERED` and `User Registration: REGISTERED` and shows SSO tokens; command path is `/usr/bin/app-sso platform -s`
   - What's unclear: Exact JSON field names for failure states; whether SE key presence is a visible field; what "NOT REGISTERED" looks like vs. missing field
   - Recommendation: L2 runbook author should document the output structure as "report the full output to L1 / collect the full JSON for escalation" rather than specifying exact failure-state field names. Link to guide 07 §Verification for the confirmed healthy state.

2. **`app-sso diagnose` existence**
   - What we know: Not found in any authoritative source after comprehensive search
   - What's unclear: Whether this subcommand exists in newer macOS versions not covered by current docs
   - Recommendation: Do NOT include `app-sso diagnose` in any runbook. Use the verified sysdiagnose procedure. If a future macOS version adds this subcommand, the runbook's 90-day review cycle will surface it.

3. **macOS 15.3 fix — does the error still occur on 15.3+?**
   - What we know: Apple confirmed fix in 15.3; Microsoft says "if users still experience on 15.3+, engage with Apple"
   - What's unclear: Whether any residual trigger exists on 15.3+
   - Recommendation: The L2 #27 version-gate callout should say "Fixed in 15.3. If still occurring on 15.3+, file Apple Care issue."

---

## Environment Availability

Step 2.6 SKIPPED — this is a documentation-only phase. No external tools, services, or runtimes are installed. The tools referenced in the runbooks (`app-sso`, `log`, `sysdiagnose`) are Apple OS-shipped binaries present on all supported macOS versions.

---

## Sources

### Primary (HIGH confidence — cited in research claims)

- [Microsoft Learn: macOS Platform SSO Known Issues and Troubleshooting](https://learn.microsoft.com/en-us/entra/identity/devices/troubleshoot-macos-platform-single-sign-on-extension) — updated 2026-06-15. Primary source for: `sudo sysdiagnose` procedure, `com.apple.AppSSO` subsystem for debug enable/reset, macOS 15.0–15.2 loop bug + 15.3 fix confirmation, TLS exclusion URLs, per-user MFA issue, Company Portal log procedure, `app-sso platform -s` as canonical status tool.
- [Microsoft Learn: Configure Platform SSO for macOS — Microsoft Intune](https://learn.microsoft.com/en-us/intune/device-configuration/settings-catalog/configure-platform-sso-macos) — updated 2026-05-18. Error 10002 definition, authentication method table, policy settings reference.
- [Microsoft Learn: Join a Mac with Microsoft Entra ID (OOBE with PSSO)](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-macos-platform-single-sign-on) — updated 2026-06-15. `app-sso platform -s` documented with note "you should see in the bottom of the output that SSO tokens are retrieved." macOS 14 repair path (System Settings > Users & Groups > Network Account Server > Edit > Repair).
- `docs/admin-setup-macos/07-platform-sso-setup.md` — corpus canonical (Phase 76 deliverable). `app-sso platform -s` healthy output (`Device Registration: REGISTERED`, `User Registration: REGISTERED`), Configuration-Caused Failures table (Error 10002, mistyped token, old CP version), registration token literal `{{DEVICEREGISTRATION}}`.
- `docs/admin-setup-macos/08-auth-methods-deep-dive.md` — corpus canonical (Phase 77 deliverable). SE Key Destruction Warning (MDM reset / FileVault recovery destroys key), DF-3 per-user MFA blocker, DF-7 AD-bound account limitation, `security find-certificate` false-negative explanation.
- `docs/admin-setup-macos/09-enterprise-sso-plugin-migration.md` — corpus canonical (Phase 78 deliverable). Error 10002 staged-migration context, `security find-certificate` obsolescence + correct replacement.

### Secondary (MEDIUM confidence)

- [Jamf PSSO Utility GitHub Repository](https://github.com/jamf-concepts/psso-utility) — Confirms `app-sso platform -s` returns JSON output and path `/usr/bin/app-sso platform -s`; confirms `com.apple.AppSSO` and `com.apple.AuthenticationServices` subsystems.
- [IntuneIRL: Platform SSO Deep-Dive](https://intuneirl.com/implementing-platform-sso-for-macos-a-deep-dive-into-configuration-troubleshooting/) — Confirms `log stream --predicate 'subsystem == "com.apple.AppSSO"'` as the SSO log filter.

### Tertiary (LOW confidence / used for corroboration only)

- Community references (After Six Computers, WinAdmins Wiki) — cross-corroborated `com.apple.AppSSO` subsystem usage; no unique facts sourced from these alone.

---

## Metadata

**Confidence breakdown:**
- Command syntax (`app-sso platform -s`, sysdiagnose procedure, log predicates): HIGH — verified via Microsoft Learn
- `app-sso platform -s` output schema (exact JSON field names for failure states): LOW — not published in any authoritative source; authoring must use conservative prose
- `app-sso diagnose` subcommand: UNVERIFIED — presumed non-existent; do not include in runbooks
- macOS 15.3 bug fix status: HIGH — Microsoft Learn updated 2026-06-15 citing Apple confirmation
- Root causes for L1 #35 (all four): HIGH — documented in corpus canonical guides 07/08/09
- SE key loss and recovery path: HIGH — documented in corpus guide 08 + Microsoft Learn
- TLS exclusion endpoints: HIGH — Microsoft Learn + corpus guide 07 DF-10
- Per-user MFA blocker: HIGH — Microsoft Learn + corpus guide 08 DF-3
- AD-bound account failure: HIGH — corpus guide 08 DF-7
- House-style rules: HIGH — extracted directly from existing corpus runbooks

**Research date:** 2026-06-21
**Valid until:** 2026-09-21 (90-day review cycle aligned with guide 08 `review_by` dates; earlier if Apple releases new macOS versions affecting PSSO behavior)
