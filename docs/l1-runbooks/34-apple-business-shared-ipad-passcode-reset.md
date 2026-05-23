---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: L1
platform: ios+macos+shared-ipad
---

> **Platform gate:** This guide covers Apple Business Shared iPad passcode reset (iOS + iPadOS + Shared iPad). For Windows Autopilot, see [Windows L1 Runbooks](00-index.md#apv1-runbooks). For macOS ADE, see [macOS ADE Runbooks](00-index.md#macos-ade-runbooks). For iOS/iPadOS, see [iOS L1 Runbooks](00-index.md#ios-l1-runbooks). For Android, see [Android L1 Runbooks](00-index.md#android-l1-runbooks).

# Apple Business Shared iPad Passcode Reset

L1 runbook for Shared iPad deployments where a user cannot access their Shared iPad partition passcode. This runbook covers the Apple Business portal path (Path A — L1-executable) and escalation pointers for the MDM paths (Paths B and C — L2 only).

Reach this runbook directly from the Apple Business Quick Reference in [quick-ref-l1.md](../quick-ref-l1.md#apple-business-quick-reference) or via L2 escalation from [26: Apple Business Permission Denied Investigation](../l2-runbooks/26-apple-business-permission-denied.md) when Path A is confirmed available.

> **L1 scope note:** L1 Triage Steps in this runbook are read-only checks. State-changing commands (MDM ClearPasscode, MDM EraseDevice) appear ONLY in the per-cause `### Admin Action Required` sections — they are not L1 actions.

## Which Admin Owns This Pool?

Before attempting Path A, confirm which sub-org admin owns the Shared iPad pool that contains the affected device. Shared iPad passcode reset permissions are OU-scoped in Apple Business — an admin with permissions in OU-A cannot reset a passcode for a device assigned to OU-B. Attempting a cross-OU reset returns a permission denied error, which is a routing issue, not a system failure.

**Lookup step:** See [05-sub-org-admin-onboarding.md#which-admin-owns-this-pool](../cross-platform/apple-business/05-sub-org-admin-onboarding.md#which-admin-owns-this-pool) to identify which sub-org admin holds "Reset Shared iPad passcode" for the device's OU.

If the correct pool owner is not known or unavailable, escalate to L2 via [26: Apple Business Permission Denied Investigation](../l2-runbooks/26-apple-business-permission-denied.md) before proceeding.

## Prerequisites

**Portal role required:**

- Apple Business sub-org admin with "Reset Shared iPad passcode" permission for the target OU (People subgroup — OU-scoped, conditionally-grant).
- The companion "View users" permission MUST also be granted; without it, the People tab shows an empty user list and the reset action cannot be targeted (OP-3 blank-UI symptom — see [01-role-permission-model.md](../cross-platform/apple-business/01-role-permission-model.md)).
- Do NOT use Account Holder credentials for routine passcode resets (OP-2 — see [01-role-permission-model.md](../cross-platform/apple-business/01-role-permission-model.md#top-level-roles-4)).

**Device identifiers required:**

- Shared iPad serial number (from device Settings > General > About > Serial Number, or from Intune admin center)
- User UPN (Managed Apple Account) for the locked partition

**When NOT to use Path A:**

Path A is the correct path for routine Shared iPad partition passcode resets. For the full 3-path decision matrix including anti-feature warnings, see the canonical admin-context runbook: [12-shared-ipad-passcode-reset.md](../cross-platform/apple-business/12-shared-ipad-passcode-reset.md).

## 3-Path Decision Matrix

| Path | Description | Who Executes | Gating |
|------|-------------|--------------|--------|
| Path A — Apple Business UI | Shared iPad passcode reset via Apple Business portal | L1 / sub-org admin (this runbook) | No approval required |
| Path B — MDM ClearPasscode | MDM ClearPasscode command via Intune | L2 only | L2-only; route to L2 #26 |
| Path C — MDM EraseDevice | Full device erase via Intune | L2 with L2 approval required | OP-11 hard gate; route to L2 #26 |

For full path descriptions, anti-feature warnings (Path B), and the Path C OP-11 hard gate procedure, see [12-shared-ipad-passcode-reset.md](../cross-platform/apple-business/12-shared-ipad-passcode-reset.md).

## Path A — Apple Business UI (L1-executable)

### L1 Triage Steps

These are read-only checks to confirm that Path A is viable before the sub-org admin executes the reset.

1. Confirm the Apple Business portal is reachable: navigate to `business.apple.com` and verify it loads without an outage banner.
2. Confirm the sub-org admin can sign in: verify their Managed Apple Account credentials are active and they can reach the Apple Business dashboard (not Account Holder credentials — OP-2).
3. Confirm the target Shared iPad is visible in the OU device list: in Apple Business, go to **Locations** > [target OU name] > **Devices** and search by serial number. If the device is absent, it may be assigned to a different OU — return to the **Which Admin Owns This Pool?** lookup step.
4. Confirm the "Reset Shared iPad passcode" permission is visible in the sub-org admin's role assignment for this OU: in Apple Business, go to **Settings** > **People** > [admin account] > **Role** and verify the People subgroup includes "Reset Shared iPad passcode" for the target OU.

If any of these checks fail, do not proceed to the reset action — escalate using the criteria in [Escalation Criteria](#escalation-criteria).

### Admin Action Required

**Path A reset procedure (Apple Business portal):**

> **Note:** Step labels marked `[CITED: training; needs live verification]` reflect AI training knowledge of Apple Business portal behavior; exact menu paths may differ in the 2026 UI. Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business (`business.apple.com`) with a Managed Apple Account holding "Reset Shared iPad passcode" for the target OU | L1 sub-org admin | OP-2: do not use Account Holder |
| 2 | Navigate to **Users** sidebar | Admin | `[CITED: training; needs live verification]` |
| 3 | Search for the user by name or Managed Apple Account | Admin | Requires "View users" companion permission (OP-3); if the user list is empty, the View permission is missing |
| 4 | Select the user > **More** menu (or equivalent) > **Lock** > **Reset Shared iPad Passcode** | Admin | `[CITED: training; needs live verification]` — exact menu path may differ in 2026 UI |
| 5 | Choose delivery format: **Download as 1-up PDF** or **Download as CSV** | Admin | Secure the file; it contains the new passcode in plaintext |
| 6 | Deliver the new passcode to the user through a secure channel | Admin | Do not transmit via unencrypted email |
| 7 | Confirm with the user that they can sign in to their Shared iPad partition with the new passcode | Admin | See Verification below |

**Verification after Path A:**

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| User can sign in to Shared iPad partition with new passcode | Successful sign-in | Re-run Path A; confirm correct user was selected |
| Entra/Azure AD password unchanged | User's Entra sign-in works as before | Apple Business reset does not affect the federated Entra password — this is expected |
| PDF/CSV passcode file deleted after delivery | File no longer exists on admin workstation | Securely delete the passcode delivery file |

For the canonical admin-context Path A procedure including the federated-auth caveat and full verification block, see [12-shared-ipad-passcode-reset.md](../cross-platform/apple-business/12-shared-ipad-passcode-reset.md).

---

## Path B — MDM ClearPasscode (L2-only, escalation pointer)

Path B uses MDM ClearPasscode issued from the Intune admin center, outside the Apple Business permission surface. It is NOT an L1 action (see the L1 scope note above). Path B also carries an important anti-feature warning: MDM ClearPasscode resets the device-level screen lock passcode, NOT the per-user Shared iPad partition passcode. In most Shared iPad partition passcode scenarios, Path B does not resolve the issue.

When Path A fails or is unreachable (Apple Business portal outage confirmed), escalate to L2 via [26: Apple Business Permission Denied Investigation](../l2-runbooks/26-apple-business-permission-denied.md) and reference the full anti-feature warning and decision gate at [12-shared-ipad-passcode-reset.md](../cross-platform/apple-business/12-shared-ipad-passcode-reset.md) Path B section.

Do not attempt Path B as an L1 action. Collect the escalation data below before handing off.

---

## Path C — MDM EraseDevice (L2-only with hard approval gate, escalation pointer)

Path C is DESTRUCTIVE (full device erase — all Shared iPad user partitions and cached data are destroyed; no recovery path). It requires hard L2-approval gating per OP-11 before any execution. It is the escalation path when Path A is unavailable AND the Shared iPad partition passcode must be reset.

NEVER attempt Path C as an L1 action. Escalate via [26: Apple Business Permission Denied Investigation](../l2-runbooks/26-apple-business-permission-denied.md) with the escalation data below. For the full OP-11 hard gate callout and Path C procedure, see [12-shared-ipad-passcode-reset.md](../cross-platform/apple-business/12-shared-ipad-passcode-reset.md) Path C section (`:129-156`).

---

## Escalation Criteria

Escalate to L2 if:

- Path A: portal unreachable, sub-org admin cannot log in, target device not visible in OU device list, or permission denied in the Apple Business portal
- Path A: reset executes but user still cannot sign in after receiving the new passcode
- Path B or Path C required (MDM commands — always L2-only per OP-11)
- Observation does not cleanly match Path A (cross-OU permission error, federation state issue, quota limit, Account Holder lockout — route to L2 #26 for 7-leaf triage)

**Before escalating, collect:**

- Device serial number
- Shared iPad platform version (iPadOS version)
- User UPN for the locked account
- Which admin pool owns the device (from the `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` lookup)
- Screenshot of the error (Apple Business portal or MDM error message)
- Path attempted (B: MDM ClearPasscode or C: MDM EraseDevice) if escalating from a failed Path A
- Timestamp of the failed attempt
- User actions attempted (if any) and the outcome

[Escalate to L2 — Apple Business Permission Denied Investigation (#26)](../l2-runbooks/26-apple-business-permission-denied.md)

---

## Cross-References

- [12-shared-ipad-passcode-reset.md](../cross-platform/apple-business/12-shared-ipad-passcode-reset.md) — canonical admin-context 3-path matrix (Path A full procedure; Path B anti-feature warning; Path C OP-11 hard gate)
- [01-role-permission-model.md](../cross-platform/apple-business/01-role-permission-model.md) — Apple Business permission catalog (People subgroup; OP-2 Account Holder DO-NOT-DELEGATE; OP-3 Edit-without-View table)
- [05-sub-org-admin-onboarding.md#which-admin-owns-this-pool](../cross-platform/apple-business/05-sub-org-admin-onboarding.md#which-admin-owns-this-pool) — admin-owner lookup for OU-scoped Shared iPad pools
- [26-apple-business-permission-denied.md](../l2-runbooks/26-apple-business-permission-denied.md) — L2 #26 7-leaf Mermaid decision tree for Apple Business permission denied investigation

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 65 plan 65-02: initial authoring — L1 Apple Business Shared iPad passcode reset; Path A executable (Apple Business UI); Paths B/C escalation-pointer only (OP-11); C16 edge l1_34↔admin_12 live | -- |
