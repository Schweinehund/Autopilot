---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos
---

> **Platform applicability:** This document covers Apple Business Managed Apple Account
> provisioning and lifecycle management — creating, syncing, and federating user identities
> within Apple Business for use with Apple-managed devices. Federation framing in this
> document describes the Apple Business-side provisioning configuration, not the identity
> provider's internal delegation model. This is distinct from Intune device enrollment and
<!-- ABAUDIT-15: next line distinguishes Apple-side Managed Apple Account provisioning from Intune MDM enrollment; C15 regex 4 false-positive exemption (disambiguation clause clarifying that Intune enrollment is a downstream consumer of Managed Apple Accounts, not the provisioning authority) -->
> user management, which are Intune-side operations outside the Apple Business permission
> surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side Managed Apple Account
> provisioning (manual, SCIM, and OIDC+JIT paths); Intune-side device enrollment, app
> assignment, and user-to-device mapping are outside the Apple Business permission surface
> and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** Managed Apple Account provisioning UI labels, SCIM endpoint
> behavior, and OIDC federation step sequences are authored from AI training knowledge of
> Apple Business portal behavior as of the pre-2026-04-14 rebrand, cross-referenced against
> research/FEATURES.md §6 + STACK.md §5 + PITFALLS.md OP-7 (60-day collision). Steps are
> marked `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# Managed Apple Account Provisioning Runbook (DELEG-06)

This runbook covers the day-to-day operational procedures for Managed Apple Account lifecycle
management across the three provisioning paths: manual portal entry, SCIM directory sync from
Microsoft Entra ID, and OIDC federated sign-in with just-in-time (JIT) account creation.

**Relationship to admin-setup doc:** This runbook is the operational counterpart to
[08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md), which
covers the provisioning method decision matrix and federation setup prerequisites. For
questions on which provisioning method to choose, or for the People subgroup permission
reference, refer to `08-managed-apple-account-provisioning.md` first. This runbook assumes
the provisioning method has been selected and federation prerequisites are in place.

**Scope:** iOS and macOS managed devices in Apple Business Organizational Units. Does not
cover tvOS (Apple TV accounts are managed through device lifecycle, not Managed Apple Accounts)
or iPadOS Consumer-facing configurations.

## Required Role & Permission

**Required permissions for Path A (manual account creation):**
- "Create Managed Apple Accounts" — People subgroup — OU-scoped — conditionally-grant
- "Edit Managed Apple Accounts" — People subgroup — OU-scoped — conditionally-grant
- "View users" — People subgroup — OU-scoped — always-grant (required companion View per OP-3)

**Required permissions for Path B (SCIM configuration) and Path C (OIDC configuration):**
- "Configure SCIM provisioning" — Organization Access subgroup — tenant-wide — **DENY-by-default**
- "Configure federated authentication" — Organization Access subgroup — tenant-wide — **DENY-by-default**

Path B and Path C tenant-wide configuration **requires a tenant IT administrator or Account
Holder**. Sub-org admins with OU-scoped permissions can create and edit accounts within their
OU (Path A); they cannot configure the tenant-wide SCIM endpoint or OIDC federation settings.

For the full permission catalog, see [01-role-permission-model.md](01-role-permission-model.md)
— People subgroup (lines 239-244) and Organization Access subgroup (lines 205-206).

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| View users | OU-scoped | Yes — always-grant (OP-3 companion View) |
| Create Managed Apple Accounts | OU-scoped | Yes — conditionally-grant (Path A) |
| Edit Managed Apple Accounts | OU-scoped | Yes — conditionally-grant (Path A) |
| Delete Managed Apple Accounts | OU-scoped | **DENY-by-default** — escalate to tenant IT administrator |
| Reset Managed Apple Account passwords | OU-scoped | Yes — conditionally-grant |
| Configure SCIM provisioning | tenant-wide | **DENY-by-default** — requires tenant IT administrator |
| Configure federated authentication | tenant-wide | **DENY-by-default** — requires tenant IT administrator |

> **OP-2:** Managed Apple Account provisioning and federation configuration MUST NOT be
> performed using Account Holder credentials for routine operations. Account Holder is not
> a delegatable role for day-to-day account management.

> **OP-1:** "Delete Managed Apple Accounts" and the tenant-wide federation configuration
> permissions are DENY-by-default. Granting federation configuration to a sub-org admin
> risks tenant-wide authentication disruption. Escalate tenant-level operations to a central
> IT administrator.

---

## Path A: Manual Account Creation

**When to use:** Small OU with fewer than 50 users; no existing directory sync infrastructure;
one-time bulk import; pilot deployment; identity provider does not support SCIM or OIDC;
break-glass or service accounts that must not be federated.

[CITED: FEATURES.md §6.1 — sourced from Apple Support axm402206497]

### Path A Procedure

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business with a Managed Apple Account holding "Create Managed Apple Accounts" for the target OU | Sub-org admin | OP-2: do not use Account Holder credentials |
| 2 | Navigate to **Users** sidebar | Admin | `[CITED: training; needs live verification]` |
| 3 | Select **Add (+) > Add Account** | Admin | `[CITED: training; needs live verification]` — exact UI label may differ in 2026 Apple Business portal |
| 4 | Enter: first name, middle name (optional), last name, Managed Apple Account (must be globally unique in Apple's namespace; typically `firstname.lastname@orgdomain.com`) | Admin | The Managed Apple Account must use a domain verified in Apple Business |
| 5 | Select the user's Location (OU) | Admin | The account is scoped to this OU; OU assignment determines which sub-org admin can manage it |
| 6 | Assign a role (e.g., Staff, Manager) | Admin | Roles within the OU determine portal-access level |
| 7 | Save the account | Admin | Apple generates a one-time password or sends a verification invitation to the user |
| 8 | Deliver credentials to user | Admin | Options: Download one-time password PDF, or have Apple send an email invitation. Delivery method depends on org security policy |
| 9 | Instruct user to sign in and change password | End user | User signs in at appleid.apple.com or on-device; password change required on first login |
| 10 | Verify the account appears in the Users list for the correct OU | Admin | Check Users sidebar; filter by OU if needed |

> **Note (manual path limitation):** Manual account creation does not automate attribute
> updates. If the user's name, email, or department changes in your HR system, a sub-org
> admin must manually edit the account in Apple Business. For organizations with frequent
> onboarding/offboarding, consider Path B (SCIM) to automate lifecycle management.

---

## Path B: SCIM Provisioning from Microsoft Entra ID

**When to use:** Organization has Microsoft Entra ID (Azure AD) with 50+ users or frequent
lifecycle changes; automated create/update/deactivate is required; Shared iPad deployments
requiring pre-staged accounts before first user login.

[CITED: STACK.md §5.3, FEATURES.md §6.2 — sourced from Apple Support axm526a05814]

**Prerequisite:** Tenant IT administrator must complete the federation setup documented in
[08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md) before
this operational procedure can be run.

### Path B: SCIM Endpoint Configuration (Tenant IT Administrator — one-time setup)

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | In Apple Business, navigate to **Account > Preferences > SCIM Provisioning** | Tenant IT administrator | `[CITED: training; needs live verification]` |
| 2 | Enable SCIM provisioning and copy the SCIM endpoint URL (`https://federation.apple.com/feeds/business/scim`) | IT administrator | Record this URL for Entra configuration |
| 3 | Generate a SCIM token in Apple Business | IT administrator | Token is valid for 1 year — see SCIM Token Renewal Cadence below |
| 4 | In Microsoft Entra ID admin center, navigate to **Enterprise Applications** and add the **Apple Business Manager** gallery app | IT administrator | `[CITED: training; needs live verification]` |
| 5 | Configure the SCIM endpoint URL and paste the Apple Business SCIM token into Entra | IT administrator | Map attributes: UPN → Managed Apple Account; display name; department; OU assignment |
| 6 | Define the Entra group scope for SCIM sync — only users in assigned groups will be provisioned | IT administrator | Limit scope to groups whose members need Managed Apple Accounts in Apple Business |
| 7 | Start provisioning | IT administrator | Entra begins the initial sync cycle; initial sync may take several hours for large user populations |
| 8 | Verify accounts appear in Apple Business Users sidebar scoped to the correct OU | IT administrator | Check OU assignment; attribute mapping errors appear in Entra provisioning logs |

### SCIM Token Renewal Cadence

> **Note (SCIM token renewal — [ASSUMED]):** The SCIM token is valid for **1 year**
> [CITED: STACK.md §5.3 — HIGH confidence]. Apple sends a renewal notice approximately
> **60 days before expiry** [ASSUMED — renewal notice window is 60-vs-90-day uncertain;
> treat as approximately 60 days until live verification; see Apple Support axm526a05814
> as the authoritative source for the precise window]. Failure to renew the token before
> expiry causes SCIM sync to stop silently — new accounts provisioned in Entra do not
> appear in Apple Business, and deactivated accounts in Entra are not removed.
>
> **Token transfer window:** After generating a new SCIM token in Apple Business, the
> previous token remains valid for a **4-calendar-day handoff window** [CITED: STACK.md
> §5.3 — HIGH confidence]. Complete the Entra token update within 4 days of generating
> the new token; after 4 days, the old token is revoked and sync stops if not updated.
>
> **Renewal procedure:** (1) Generate new token in Apple Business > Preferences > SCIM
> Provisioning; (2) Paste new token in Entra Enterprise App > Provisioning > Admin
> Credentials > Secret Token; (3) Test connection and save; (4) Verify sync resumes.

> **Note (SCIM-manual conflict anti-pattern):** If a user account was originally created
> via manual Path A and then SCIM is later enabled with a mapping that enforces OU
> assignment, the manual OU assignment may be overwritten on the next SCIM sync cycle.
> Similarly, if a user exists via SCIM and an admin manually reassigns their OU in Apple
> Business, the manual change may revert on the next SCIM sync if the SCIM mapping
> includes OU. Do not mix manual OU reassignment with active SCIM provisioning for the
> same user population. [CITED: FEATURES.md §6.5]

---

## Path C: OIDC + JIT (Federated Sign-In with Just-In-Time Provisioning)

**When to use:** Organization prioritizes single sign-on (SSO) user experience; users
authenticate to Apple devices with existing Entra credentials; account pre-staging is not
required (account exists after first sign-in). Best for macOS/iOS supervised single-user
fleets and ad-hoc user additions.

[CITED: FEATURES.md §6.3 — sourced from Apple Support axm8c1cac980]

**Prerequisite:** Tenant IT administrator must complete the OIDC federation setup documented in
[08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md) before
users can sign in via federated credentials.

### Path C: OIDC Configuration (Tenant IT Administrator — one-time setup)

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | In Apple Business, navigate to **Account > Preferences > Federated Authentication > Microsoft Entra ID > OIDC** | Tenant IT administrator | `[CITED: training; needs live verification]` |
| 2 | Enable OIDC federated authentication | IT administrator | Requires "Configure federated authentication" permission (tenant-wide, DENY-by-default) |
| 3 | In Microsoft Entra ID, register the Apple Business OIDC application and grant the required scopes (`ssf.manage` and `ssf.read` per FEATURES.md §6.3) | IT administrator | `[ASSUMED — scope names per FEATURES.md §6.3; non-standard and NOT confirmed against a current Apple/Microsoft OIDC reference. Verify the exact scope strings in the live Entra app registration before relying on them.]` |
| 4 | Complete the OIDC configuration in Apple Business with the Entra application credentials | IT administrator | `[CITED: training; needs live verification]` |
| 5 | Test with a pilot user: sign in on an Apple device using Entra credentials | IT administrator + pilot user | On first sign-in, Apple Business auto-creates a Managed Apple Account if none exists (JIT provisioning) |
| 6 | Verify the JIT-created account appears in Apple Business Users sidebar with the correct OU assignment | IT administrator | OU assignment is determined by claim mapping from the Entra identity payload |

### OIDC+JIT Operational Notes

> **Note (JIT provisioning lag):** OIDC+JIT accounts are NOT pre-provisioned. The Managed
> Apple Account exists only after the user's first federated sign-in on an Apple device.
> For workflows that require pre-existing accounts (e.g., Shared iPad pre-staging, pre-loaded
> app license assignments), Path B (SCIM) is required. See the SCIM-vs-OIDC decision table
> below.

> **Note (attribute mapping):** JIT account attributes (display name, email, OU assignment)
> derive from the identity claim payload from Entra. Incorrect claim mapping produces accounts
> in the wrong OU or with wrong display names. Verify claim mapping during pilot before
> broad rollout. `[CITED: FEATURES.md §6.3]`

---

## SCIM vs OIDC Decision Criteria

Use this table to choose between Path B (SCIM) and Path C (OIDC+JIT) when both options are
available to your organization.

| Criterion | Path B: SCIM | Path C: OIDC + JIT |
|-----------|--------------|---------------------|
| Shared iPad pre-staging required | **SCIM required** — Shared iPad passcode reset (Path A of 12-) requires pre-existing Managed Apple Accounts | Insufficient — account doesn't exist until user signs in |
| Token renewal burden | Annual — 1-year SCIM token; 60-day renewal notice [ASSUMED] | None — OIDC tokens managed by Entra |
| Account pre-provisioning | Yes — accounts synced before first device use | No — account created on first sign-in (JIT) |
| Best deployment type | Shared iPad fleets; account-driven User Enrollment with pre-known users | macOS/iOS supervised single-user fleets; ad-hoc user provisioning |
| User experience | Transparent — account exists before user interaction | SSO sign-in on first use — single credential for Entra and Apple |
| Lifecycle automation | Full (create/update/deactivate synced from Entra) | Partial — account created on first sign-in; deactivation must be managed separately |

[CITED: FEATURES.md §6.3]

---

## 60-Day Federation Collision Resolution

When an organization federates Microsoft Entra ID to Apple Business, Apple detects users who
hold a personal Apple ID at the organization's email domain. These users are flagged as
"conflicting Apple IDs" — their personal Apple ID email address matches the corporate domain
being federated. [CITED: PITFALLS.md OP-7 — HIGH confidence]

### Pre-Federation Preflight

Before enabling federation, run the preflight check in Apple Business:

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | In Apple Business federation settings, review the **conflicting Apple IDs count** shown in the federation banner before confirming federation | Tenant IT administrator | Apple displays the count of personal Apple IDs at the corporate domain that will be affected |
| 2 | If the count is above zero, pause and identify affected users before proceeding | IT administrator | Export or note affected user emails; these users must act within the 60-day window |
| 3 | Send user-comms notice to affected users (see template below) before activating federation | IT administrator | `[CITED: training; needs live verification]` |

### 60-Day Window and User-Comms Template

Apple notifies affected users via email to their personal Apple ID address. The notification
advises them to rename their personal Apple ID within **60 days** to avoid forced federation.
The notification often lands in a personal mailbox and is missed. Proactive IT communication
is essential.

**User-comms notice template (adapt to your organization):**

> Subject: Action Required — Your Apple ID conflicts with upcoming Apple Business federation
>
> Your personal Apple ID (`[user's personal Apple ID]`) uses an email address at `[org domain]`.
> Our organization is enabling federated authentication with Apple Business on `[federation date]`.
>
> **Required action:** Before `[deadline — 60 days from federation date]`, please rename your
> personal Apple ID to a non-corporate email address:
> 1. Sign in at https://appleid.apple.com with your personal Apple ID.
> 2. Navigate to **Personal Information** and change your Apple ID email to a non-corporate address.
> 3. Confirm the email change using the verification link Apple sends.
>
> If you do not rename your personal Apple ID before the deadline, Apple may block your personal
> account from using the `[org domain]` email address. Your corporate Managed Apple Account will
> still function.
>
> Questions: contact `[IT helpdesk]`.

### Resolution Paths

| Scenario | Resolution |
|----------|------------|
| User renames personal Apple ID before deadline | Personal Apple ID migrated to new email; corporate Managed Apple Account created at corp email; no data loss | 
| Admin force-federates (skip user action) | Personal Apple ID forcibly converted to Managed Apple Account at corp email; personal purchases and data may be inaccessible | `[CITED: training; needs live verification]` |
| 60-day window missed (user did not rename) | Apple acts: see recovery path below | `[CITED: training; needs live verification]` |

### Recovery If 60-Day Window Missed

> **Note (recovery path — [ASSUMED — Apple Enterprise Support; needs live verification]):**
> If the 60-day window expires without the user renaming their personal Apple ID, Apple may
> forcibly rename the personal Apple ID or block its use at the corporate domain. The recovery
> path for users locked out of personal Apple ID content (iCloud, personal App Store purchases)
> after forced federation is not self-service — it requires an **Apple Enterprise Support
> ticket** with identity verification. Organizations should treat missed-deadline cases as
> requiring Apple Enterprise Support escalation. `[ASSUMED — Apple Enterprise Support ticket;
> needs live verification]`

---

## Account Deactivation and Deletion

| Action | Who can perform | Notes |
|--------|----------------|-------|
| Deactivate a Managed Apple Account (SCIM sync) | Tenant IT administrator (SCIM config) | Deactivate user in Entra; SCIM sync propagates deactivation to Apple Business on next sync cycle |
| Delete a Managed Apple Account | Tenant IT administrator only | **DENY-by-default** for sub-org admins — escalate. Deletion removes the account from the OU and from Apple's namespace |
| Reset password (manual path) | Sub-org admin (conditionally-grant) | Use for locked-out users on manual-provisioned accounts |

> **Note:** Deleting a Managed Apple Account permanently removes the user's device-assignment
> history, app license assignments, and Shared iPad session data. For off-boarding, prefer
> deactivation (SCIM) over deletion. Deletion should be reserved for accounts that were
> created in error or for compliance-mandated removal.

---

## Verification

### Post-Provisioning Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Account appears in Apple Business Users sidebar | Account visible in correct OU with expected name and Managed Apple Account email | Verify OU assignment and name fields; check SCIM provisioning logs in Entra if Path B |
| Account can sign in on an Apple device | User successfully authenticates using Managed Apple Account credentials (Path A/B) or Entra credentials (Path C) | Check credential delivery (Path A); check SCIM sync status (Path B); check OIDC claim mapping (Path C) |
| SCIM sync active (Path B) | Entra provisioning log shows successful sync cycles; no errors | Re-check SCIM token validity and expiry; verify SCIM endpoint URL in Entra matches Apple Business |
| JIT account created (Path C) | After first federated sign-in, Managed Apple Account visible in Apple Business Users sidebar | Check OIDC application registration in Entra; verify the granted scopes match the live OIDC reference (`ssf.manage` / `ssf.read` per FEATURES.md §6.3 are `[ASSUMED]` and need live verification — see step 3); check claim mapping |
| No conflicting Apple IDs outstanding | Federation banner shows zero conflicting Apple IDs | Resend user-comms to affected users; escalate missed-deadline cases to Apple Enterprise Support |

### Post-SCIM-Token-Renewal Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Entra provisioning test connection succeeds | Green "Test connection" result in Entra Enterprise App provisioning settings | Verify new SCIM token was saved correctly; check for token copy/paste errors |
| SCIM sync resumes without errors | Entra provisioning log shows successful sync after token renewal | Re-generate SCIM token in Apple Business; ensure 4-day transfer window has not elapsed |
| New Entra accounts appear in Apple Business | Accounts provisioned in Entra after token renewal appear in Apple Business Users sidebar | If absent, trigger a manual sync cycle in Entra provisioning settings |

---

## Cross-References

- Provisioning method decision matrix: [08-managed-apple-account-provisioning.md](08-managed-apple-account-provisioning.md) — which method to choose; federation setup prerequisites
- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — People subgroup (lines 239-244); Organization Access subgroup (lines 205-206)
- Shared iPad passcode reset: [12-shared-ipad-passcode-reset.md](12-shared-ipad-passcode-reset.md) — requires pre-existing Managed Apple Accounts (SCIM Path B for Shared iPad fleets)
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — Managed Apple Accounts OU-scope coverage table; depth ≤ 2 sub-OU cap (D-06)
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) — full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-04: initial authoring — Managed Apple Account operational runbook (DELEG-06); Path A (manual), Path B (SCIM from Entra, token renewal cadence [ASSUMED]), Path C (OIDC+JIT); 60-Day Federation Collision sub-section (OP-7); SCIM-vs-OIDC decision table; SCIM-manual conflict anti-pattern; 08- back-reference | -- |
