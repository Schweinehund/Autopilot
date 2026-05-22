---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+ipados+macos+tvos
---

> **Platform applicability:** This document covers Apple Business VPP catalog operations —
> content-token management, app purchasing, license transfer, and payment scoping per
> Organizational Unit (OU). This is distinct from Intune VPP token management (uploading the
> downloaded content token to Intune at Tenant administration > Connectors and tokens > Apple VPP tokens),
<!-- ABAUDIT-05: next line distinguishes Apple-side content-token operations from Intune-side token upload; C15 regex 4 false-positive exemption (disambiguation clause clarifying distinct surfaces, not conflating Apple and Intune delegation) -->
> which is an Intune-side operation outside the Apple Business permission surface and is not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side VPP catalog operations (content
> token claim, app purchase, license transfer, payment scoping); Intune-side token upload and
> app assignment are outside the Apple Business permission surface and are not covered here.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** VPP catalog UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/PITFALLS.md OP-9. Steps are marked
> `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# VPP Catalog Runbook (Per-OU Content Token Operations)

This runbook covers the day-to-day operational procedures for managing an Organizational Unit's
VPP (Volume Purchase Program) catalog in Apple Business. It covers four areas: claiming a
content token, transferring licenses between OUs, purchasing apps, and scoping payment methods.

**Label disambiguation:** Apple calls this artifact a **content token**; Microsoft Intune labels
the same artifact an **Apple VPP token**. They are the same object — a cryptographic credential
that ties purchased app licenses to an OU. This disambiguation matters when following both
Apple Business and Intune documentation simultaneously. All steps in this runbook use Apple's
terminology ("content token").

## Required Role & Permission

**Required permission:** "Download content tokens" (Apps & Books subgroup) — OU-scoped.
See [01-role-permission-model.md](01-role-permission-model.md) Apps & Books subgroup for the
full permission catalog. The OP-3 companion View dependency applies: "View content tokens"
MUST also be granted; without it, the Apps & Books tab shows an empty list and the download
action cannot be targeted.

**For purchasing and license assignment:** "Purchase apps and books" and "Assign content
(device-licensed)" / "Assign content (user-licensed)" are each separately grantable — all
require "View content tokens" as companion View.

> **OP-2:** Do not perform VPP catalog operations using Account Holder credentials.
> Account Holder is not a delegatable role for routine operations and must not be used for
> day-to-day content token management.

**Tenant-wide gated permission — DENY-by-default:**

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| Download content tokens | OU-scoped | Yes — conditionally-grant, OU-scoped |
| Purchase apps and books | OU-scoped | Yes — conditionally-grant, OU-scoped |
| Assign content (device-licensed) | OU-scoped | Yes — conditionally-grant, OU-scoped |
| Manage content token location | tenant-wide | **DENY-by-default (OP-1)** — requires tenant IT administrator |

> **Note:** "Manage content token location" is a tenant-wide superprivilege. It controls which
> OU a content token is associated with. Sub-org admins must not hold this permission —
> inadvertently moving a token between OUs breaks existing app license assignments for the
> source OU. Escalate all cross-OU token-location operations to the tenant IT administrator
> (OP-1 constraint).

## Claim a Content Token

The content token authorizes Intune (or another MDM) to distribute purchased apps from this
OU's catalog to managed devices.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business with a Managed Apple Account that holds "Download content tokens" for the target OU | Sub-org admin | OP-2: do not use Account Holder credentials |
| 2 | Navigate to **Settings** > **Apps and Books** | Sub-org admin | `[CITED: training; needs live verification]` — exact nav path may differ in 2026 UI |
| 3 | Select the target OU from the location selector | Sub-org admin | Only OUs within your permission scope appear |
| 4 | Locate the content token for the OU and select **Download** | Sub-org admin | Token is a `.vpptoken` file; valid for 365 days |
<!-- ABAUDIT-09: next line references Intune admin as the actor for the token-upload step; C15 regex 8 false-positive exemption (factual workflow step clarifying that this Intune-side upload action is performed by an Intune admin, not an Apple Business action — outside Apple Business permission surface per scope boundary) -->
| 5 | Upload the downloaded token to Intune: **Tenant administration** > **Connectors and tokens** > **Apple VPP tokens** > **Create** | Intune admin | This Intune upload step is outside Apple Business scope — see scope boundary above |
| 6 | Confirm the token is active in Intune and that the license count matches the OU's Apple Business purchase history | Admin | See Verification section for the 0.1% tolerance check |

> **Note:** Content tokens expire annually (365-day validity). Apple sends a renewal notice
> approximately 60 days before expiry. Failure to renew before expiry causes Intune to stop
> distributing app licenses from this token's catalog. Calendar a renewal task 90 days after
> token issuance.

## Transfer Licenses Between OUs

License transfers move purchased app licenses from one OU's catalog to another. Only
**unassigned** licenses can be transferred; assigned licenses must be explicitly revoked
(with a 30-day grace period observed for managed devices) before transfer.

The maximum single-transfer quantity is 24,999 licenses per app.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Confirm all licenses to be transferred are unassigned (revoke if needed, observe 30-day grace) | Admin | `[CITED: training; needs live verification]` |
| 2 | Navigate to **Apps and Books** > select the app | Admin | `[CITED: training; needs live verification]` — exact nav path |
| 3 | Select **Transfer** (or equivalent action in 2026 UI) | Admin | `[CITED: training; needs live verification]` |
| 4 | Enter the transfer quantity and select the destination OU | Admin | Max 24,999 per transfer |
| 5 | Confirm the transfer | Admin | Transfer is immediate; source OU license count decreases instantly |
| 6 | Complete the OP-9 pre-migration gate checklist BEFORE transferring during a content-token migration (see critical callout below) | Admin | See the OP-9 callout — failure to do so locks in-use licenses to the legacy token permanently |

---

> **⛔ Untouched-OU — DO NOT ACT until migration completes (OP-9)**
>
> Apple transfers ALL licenses (including in-use) only while the destination OU is
> **untouched**. As soon as any action is performed in the new OU (purchase, assign,
> edit metadata), Apple's migration tool switches to transferring ONLY unassigned licenses.
> In-use licenses remain locked to the source OU's legacy token permanently.
>
> **Forbidden actions during migration:** purchase any app; assign any license; edit
> metadata; grant any role in the new OU.
>
> **Pre-migration gate (all must be TRUE):**
> - [ ] New OU has zero licenses, zero people, zero devices
> - [ ] All Content Managers have selected the new OU
> - [ ] All VPP purchasers invited and accepted
>
> Source: PITFALLS.md OP-9 — Apple official "Migrate content tokens" guide

---

## Purchase Apps for a Sub-Org

Content Managers or admins with "Purchase apps and books" permission can buy apps directly
for an OU's catalog.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Navigate to **Apps and Books** > **Search** | Content Manager / admin | `[CITED: training; needs live verification]` |
| 2 | Search for the app by name or App Store ID | Admin | |
| 3 | Select the app > **Buy** | Admin | `[CITED: training; needs live verification]` |
| 4 | Select licensing type: **Device** (device-licensed) or **User** (user-licensed) | Admin | Device licensing: binds to device regardless of user. User licensing: follows the Managed Apple Account. |
| 5 | Select the target OU from the location dropdown | Admin | Only OUs within your permission scope appear |
| 6 | Enter the quantity and confirm | Admin | Payment charges against the OU's payment method (see Payment Scoping below) |

## Payment Scoping (Per-OU Budget Isolation)

Apple Business supports per-OU payment methods. Each OU can have its own credit card or
purchase-order method, providing budget isolation across organizational units.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Navigate to **Settings** > **Apps and Books** > **Payment Methods** | Admin | `[CITED: training; needs live verification]` — exact nav path may differ in 2026 UI |
| 2 | Select the target OU | Admin | Each OU manages its own payment method independently |
| 3 | Add or update the payment method for the OU | Admin | Changes apply to all future purchases in that OU |

> **Note:** Tenant-wide payment configuration requires a higher-privilege role. Sub-org admins
> can only manage payment methods for their assigned OU(s). Tenant-level billing disputes or
> central procurement routing require IT Administrator or Account Holder involvement.

## Verification

After any VPP catalog operation (token claim, license transfer, app purchase), verify the
outcome matches expectations.

### Post-Token-Claim Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Token appears in Intune as active | Status: Active, expiry date matches Apple | Re-download token; re-upload to Intune |
| License count in Intune matches Apple Business | Count difference ≤ 0.1% | See license-count reconciliation below |
| Token OU matches intended OU | OU label matches target | Escalate to tenant admin if mismatch (Manage content token location required) |

### Post-Migration License-Count Reconciliation

After a content-token migration (legacy OU → new OU), compare license counts:

1. In Apple Business, navigate to the new OU's **Apps and Books** > record total licenses per app.
2. In the legacy OU, confirm the matching apps show the expected reduction (transferred licenses removed).
3. Compute: `|new_OU_count - expected_transferred_count| / total_purchased ≤ 0.001` (0.1% tolerance).

If the count discrepancy exceeds **0.1%**, STOP. Do not proceed with device re-enrollment.
Contact Apple Enterprise Support — in-use licenses may have been stranded on the legacy token
(OP-9 trap). Provide the legacy token ID and the new OU name.

### Post-Purchase Verification

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| App appears in OU catalog | Available for assignment | Wait up to 5 minutes; refresh |
| License quantity matches purchase | Exact count | Check purchase history in Apps and Books |
| Payment method charged | Expected OU's payment method | Verify OU payment method configuration |

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — Apps & Books
  subgroup; "Download content tokens" (line 313); "Manage content token location"
  DENY-by-default (line 319); OP-3 Edit-without-View table
- OU architecture: [02-ous-architecture.md](02-ous-architecture.md) — OU scope coverage table;
  content tokens row; Untouched-OU Trap framing
- Content token consolidation: [07-vpp-content-token-consolidation.md](07-vpp-content-token-consolidation.md) —
  admin-setup counterpart covering per-OU content-token consolidation concepts and topology decisions
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) —
  full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-02: initial authoring — VPP catalog runbook; OP-9 untouched-OU hard-bordered callout; content token claim/transfer/buy/payment procedures; post-migration 0.1% license-count verification (DELEG-01) | -- |
