---
last_verified: 2026-04-27
review_by: 2026-06-26
applies_to: conditional-access
audience: admin
platform: Linux
---

> **Platform gate:** This guide covers Conditional Access (CA) configuration for Linux devices in Intune (Ubuntu 22.04/24.04 LTS). Linux supports web-app CA via Microsoft Edge for Linux 102.x+ ONLY — there is no device-level CA grant on Linux.
> For Linux provisioning terminology, see the [Linux Provisioning Glossary](../_glossary-linux.md).
> For the locked Linux management surface, see [Linux Enrollment Overview](../linux-lifecycle/00-enrollment-overview.md#supported-management-surface).

# Linux Conditional Access — Admin Configuration

> ⚠️ **Architecture: Web-app CA only.** Linux does NOT support device-level Conditional Access. The CA grant control `Require device to be marked as compliant` is not available on Linux. The only CA enforcement path on Linux is web-app CA via Microsoft Edge for Linux 102.x+ (the user signs into Edge with their org account; Edge surfaces the CA challenge; the org's CA policies enforce the grant or block based on user, session, and risk context). For cross-platform CA architectural reference, see [Linux Capability Matrix — Conditional Access](../reference/linux-capability-matrix.md#conditional-access).

## Prerequisites

- Intune license assigned to user
- Microsoft Entra ID P1 license (P2 required if risk-based Conditional Access is used)
- Microsoft Edge for Linux 102.x+ installed on the target device (see [01-intune-linux-agent.md](01-intune-linux-agent.md) for related package install patterns)
- Linux device enrolled in Intune (see [02-enrollment-profile.md](02-enrollment-profile.md))
- Understanding that Conditional Access on Linux is web-app-only (see architecture callout above)

## How Web-App CA Works on Linux

**The problem (architectural):** Linux's Intune integration does not surface device-state-attestation to Conditional Access in the way Windows, macOS, iOS, and Android do. The `Require device to be marked as compliant` grant control is not part of the Linux CA evaluation surface. This means a Linux device reporting `compliant` via an Intune compliance policy does NOT unlock CA grants.

**The supported pattern:** Web-app CA via Microsoft Edge for Linux 102.x+. Edge presents the CA challenge as part of org-app sign-in. CA policies evaluate based on user, session, and risk context — but NOT on Linux device compliance state.

**What this means in practice:**

- Compliance policy on Linux is **detect-only** — admins can monitor compliance verdicts; the verdict does not drive a CA block or grant
- Web-app access (Outlook web, Teams web, SharePoint Online, etc.) via Edge IS protected by CA policies that target user, session, and risk context
- Native Linux apps that connect to org resources are NOT protected by Linux device CA — orgs must ensure such apps use web-app CA flows or are otherwise scoped out of sensitive resource access
- Linux devices cannot use the `Require device to be marked as compliant` grant control, `Require Hybrid Azure AD joined device` grant, or any device-attestation-based grant control

**Comparison with other platforms:**

| CA Grant Control | Windows | macOS | iOS | Android | Linux |
|-----------------|---------|-------|-----|---------|-------|
| Require compliant device | Yes | Yes | Yes | Yes | **Not supported** |
| Require Hybrid Entra joined | Yes | No | No | No | **Not supported** |
| Web-app CA via compliant browser | Yes | Yes | Yes | Yes | **Yes — only CA path** |

## Steps

### Step 1: Verify Edge for Linux 102.x+ Deployed to Target Devices

#### On device

1. Run: `microsoft-edge --version` — confirm version 102.x or higher
2. If Edge is not installed or is below 102.x, deploy it via Intune Shell script (see [04-app-delivery.md](04-app-delivery.md) for the Bash script delivery pattern)

#### In Intune admin center

1. Navigate to **Devices > Linux** and confirm enrolled devices show healthy status
2. Confirm any Edge deployment scripts have a successful exit code on target devices

### Step 2: Configure a CA Policy Targeting Linux Web-App Sign-Ins

#### In Entra portal

1. Navigate to **Protection > Conditional Access > Policies > New policy**
2. Name the policy (e.g., `Linux-Web-App-CA`)
3. **Assignments — Users:** Target the user group that includes Linux device users
4. **Target resources:** Select the applicable cloud apps (e.g., Office 365, SharePoint, Teams)
5. **Conditions > Device platforms:** Include **Linux** in the device platform scope
6. **Grant:** Select grant controls compatible with browser-based access:
   - **Require multifactor authentication** — supported on Linux
   - **Require compliant browser** (e.g., Edge with org sign-in) — supported on Linux
   - **Avoid** `Require device to be marked as compliant` for any policy scoped to Linux — that grant is not available on Linux and will block all Linux users if applied
7. Review and enable the policy in report-only mode first; graduate to On after validating no unexpected blocks

### Step 3: Test the CA Policy

#### On Linux device

1. Open Microsoft Edge for Linux (102.x+) and sign in with the org account
2. Navigate to an org resource covered by the CA policy (e.g., SharePoint site, Outlook web)
3. Verify the CA challenge surfaces correctly (MFA prompt or compliant-browser check)
4. Confirm access is granted after satisfying the CA challenge
5. If access is unexpectedly blocked: check the Entra sign-in logs for the CA policy evaluation result and the specific grant that blocked access

## Verification

- [ ] Edge for Linux 102.x+ installed and version confirmed on test device (`microsoft-edge --version`)
- [ ] CA policy saved in Entra portal (report-only mode initially)
- [ ] Test sign-in from Linux device with Edge surfaces the CA challenge correctly
- [ ] Entra sign-in log shows CA policy applied as expected
- [ ] No CA policies scoped to Linux use `Require device to be marked as compliant` (would block all Linux users)
- [ ] Policy graduated from report-only to On after successful validation

## See Also

- [Linux Capability Matrix — Conditional Access](../reference/linux-capability-matrix.md#conditional-access) — anchor-stability contract for Phase 51 runbook 32 per CDI-Phase50-04
- [Compliance Policy](03-compliance-policy.md) — PITFALL-2 architectural callout (compliance is detect-only on Linux; does not drive CA grants)
- [Enrollment Profile](02-enrollment-profile.md)
- [Linux Glossary — web-app CA](../_glossary-linux.md#web-app-ca)
- (Phase 51 runbook) [32-linux-ca-blocking-web-access.md](../l1-runbooks/32-linux-ca-blocking-web-access.md)

---

| Date | Change | Author |
|------|--------|--------|
| 2026-04-27 | Initial version — Linux Conditional Access (web-app CA via Edge only) + PITFALL-2 inheritance (Phase 50) | -- |
