---
last_verified: 2026-05-22
review_by: 2026-07-21
applies_to: apple-business
audience: admin
platform: ios+macos+shared-ipad
---

> **Platform applicability:** This document covers Apple Business Shared iPad passcode reset
> operations — resetting the per-user Managed Apple Account passcode on a Shared iPad device
> partition. This is distinct from Intune device passcode management (Reset Passcode / Remove
> Passcode remote actions), which operate at the device level and do NOT reset per-user Shared
<!-- ABAUDIT-06: next line disambiguates Apple Business per-user partition passcode reset from Intune device-level passcode management; C15 regex 4 false-positive exemption (Apple-side vs Intune-side surface distinction, not conflating the two) -->
> iPad partition passcodes — those are an Intune-side operation outside the Apple Business
> permission surface. For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Scope boundary:** This runbook covers Apple Business-side Shared iPad passcode reset
> (Path A, the primary path); Paths B and C involve MDM commands (ClearPasscode / EraseDevice)
> which are issued from Intune but are included here for completeness as the escalation matrix —
> the Apple Business permission context and decision criteria are documented for all three paths.
> For a full Apple-Business-vs-Intune responsibility table, see
> [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md).

> **Training-data notice:** Shared iPad passcode reset UI labels and step sequences are authored
> from AI training knowledge of Apple Business portal behavior as of the pre-2026-04-14
> rebrand, cross-referenced against research/FEATURES.md §4 and PITFALLS.md OP-11. Steps are
> marked `[CITED: training; needs live verification]` pending a live portal scrape.
> Re-verification target: within 60 days of 2026-05-22 (by 2026-07-21).

# Shared iPad Passcode Reset (3-Path Decision Matrix)

This is the canonical admin-context runbook for Shared iPad passcode resets. It documents the
three available paths in escalation order: Path A (Apple Business UI, L1-delegatable and
preferred) → Path B (MDM ClearPasscode, L2-only, with anti-feature caveat) → Path C (MDM
EraseDevice, L2-with-approval, destructive last resort).

**Always attempt Path A first.** Paths B and C are escalation paths only.

## Required Role & Permission

**Path A — Apple Business UI reset (primary path):**

**Required permission:** "Reset Shared iPad passcode" (People subgroup) — OU-scoped.
See [01-role-permission-model.md](01-role-permission-model.md) People subgroup for the full
permission catalog. The OP-3 companion View dependency applies: "View users" MUST also be
granted; without it, the People tab shows an empty user list and the reset action cannot be
targeted.

This permission is L1-delegatable (conditionally-grant per OP-11 People subgroup note in
`01-role-permission-model.md`). Help-desk staff in Shared iPad deployments can legitimately
hold this permission for their assigned OU.

| Permission | Scope | Permitted for sub-org admin? |
|------------|-------|------------------------------|
| Reset Shared iPad passcode | OU-scoped | Yes — conditionally-grant; L1-delegatable |
| View users | OU-scoped | Yes — always-grant (required companion View, OP-3) |

> **OP-2:** Do not perform Shared iPad passcode resets using Account Holder credentials.
> Account Holder is not a delegatable role for routine operations.

**Paths B and C require L2 (Intune admin or higher) and are not delegatable to L1 help-desk.**

---

### Path A — Apple Business UI Reset (L1-delegated, preferred)

Path A resets the per-user Managed Apple Account passcode for a Shared iPad. This is the
correct and preferred path for all routine passcode resets.

**What Path A does:** Generates a new 8-character alphanumeric passcode (Apple-enforced minimum
length). The new passcode can be delivered as a 1-up PDF or CSV file for handoff to the user.

**Federated-auth caveat:** Resetting the Shared iPad passcode via Apple Business does **NOT**
change the user's federated Entra password. The Shared iPad passcode is a separate device-side
credential for Shared iPad partition access — it is distinct from the user's Entra/Azure AD
sign-in password.

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Sign in to Apple Business with a Managed Apple Account holding "Reset Shared iPad passcode" for the target OU | L1 admin / help-desk | OP-2: do not use Account Holder |
| 2 | Navigate to **Users** sidebar | Admin | `[CITED: training; needs live verification]` |
| 3 | Search for the user by name or Managed Apple Account | Admin | Requires "View users" companion permission (OP-3) |
| 4 | Select the user > **More** menu (or equivalent) > **Lock** > **Reset Shared iPad Passcode** | Admin | `[CITED: training; needs live verification]` — exact menu path may differ in 2026 UI |
| 5 | Choose delivery format: **Download as 1-up PDF** or **Download as CSV** | Admin | Secure the file; it contains the new passcode in plaintext |
| 6 | Deliver the new passcode to the user through a secure channel | Admin | Do not transmit via unencrypted email |
| 7 | Confirm with the user that they can sign in to their Shared iPad partition with the new passcode | Admin | See Verification section |

> **Note:** If the target user does not appear in the People tab, verify that "View users" is
> granted for the correct OU. A missing companion View permission is the most common cause of
> empty user lists (OP-3 blank-UI symptom — see
> [01-role-permission-model.md](01-role-permission-model.md) Edit-without-View table).

---

### Path B — MDM ClearPasscode (L2-only)

> **⚠️ Anti-feature warning — Read before using Path B.**

**Path B does NOT reset the per-user Shared iPad partition passcode.**

This is the highest-stakes anti-feature in the v1.6 corpus. MDM ClearPasscode (and its Intune
equivalent "Reset Passcode" / "Remove Passcode") resets the **device-level screen lock**
passcode, NOT the per-user Shared iPad partition passcode.

On a managed Shared iPad, the device-level screen lock is typically not set (or is managed via
MDM policy). The per-user Shared iPad partition passcode — the credential a user enters to
access their personal session on the shared device — can ONLY be reset via:
- **Path A** (Apple Business UI — resets the Managed Apple Account passcode), or
- **Path C** (EraseDevice — destroys all partitions, data-loss path).

**Path B correct use case:** MDM ClearPasscode is valid for clearing the device-level screen
lock on a NON-Shared-iPad supervised device (standard single-user supervised iPhone or iPad).
It is NOT applicable to the Shared iPad per-user partition passcode problem.

<!-- ABAUDIT-07: next line describes Path B's correct use as an MDM action requiring Intune RBAC for non-Shared-iPad devices; C15 regex 1 false-positive exemption (factual disambiguation of which surface this action belongs to) -->
Executing MDM ClearPasscode on a Shared iPad requires Intune RBAC permission (not an Apple Business permission); the action is issued from Intune, but it will NOT resolve a Shared iPad partition passcode problem — it targets the wrong credential layer.

**Decision gate for Path B:**

| Condition | Action |
|-----------|--------|
| User cannot access their Shared iPad partition (forgot passcode) | Use Path A, not Path B |
| Device-level screen lock is set and blocking MDM enrollment on a non-Shared-iPad device | Path B may be appropriate |
| Path A is unavailable (Apple Business portal outage confirmed) | Escalate to L2; consider Path B for device-level lock only; use Path C if partition passcode reset is required |

---

### Path C — MDM EraseDevice (L2-with-approval, last resort)

Path C is the escalation path when Path A is unavailable AND the Shared iPad partition
passcode must be reset. It is destructive and irreversible.

---

> **⛔ MDM EraseDevice — DESTRUCTIVE / L2 approval required (OP-11)**
>
> `EraseDevice` wipes the device and destroys ALL Shared iPad user partitions and
> their cached data. There is no recovery path for user session data once this command
> executes. This path is irreversible.
>
> **⚠️ L2 approval required before proceeding.**
>
> Only use Path C when:
> - Path A (Apple Business UI) is unavailable AND
> - Path B (MDM ClearPasscode) has been attempted and failed AND
> - Data loss on all Shared iPad user partitions has been explicitly accepted by the
>   device owner and an L2 admin has approved the action.
>
> Source: PITFALLS.md OP-11 — Apple MDM Protocol reference; ROADMAP.md SC#1

---

**Path C procedure (after L2 approval obtained):**

| Step | Action | Who | Notes |
|------|--------|-----|-------|
| 1 | Obtain explicit L2 admin approval (written, ticket, or recorded channel) | L2 admin | Document approval reference before proceeding |
| 2 | Notify all active Shared iPad users on this device that their session data will be lost | Admin | No recovery after erase |
| 3 | In Intune: **Devices** > select device > **Wipe** (or EraseDevice equivalent) | L2 admin | `[CITED: training; needs live verification]` — Intune UI label may differ |
| 4 | Wait for device to complete wipe and return to Setup Assistant | Admin | Device will re-enroll via ADE if an enrollment profile is set |
| 5 | Confirm device re-enrollment and Shared iPad re-provisioning | Admin | See Verification section |

## Verification

### After Path A (Apple Business UI Reset)

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| User can sign in to Shared iPad partition with new passcode | Successful sign-in | Re-run Path A; confirm correct user was selected |
| Entra password unchanged | User's Entra/Azure AD sign-in works as before | Federated-auth caveat — Apple Business reset does not touch Entra password |
| PDF/CSV passcode file deleted after delivery | File no longer exists on admin workstation | Securely delete the passcode delivery file |

### After Path C (EraseDevice)

| Check | Expected | Action if Fails |
|-------|----------|-----------------|
| Device re-enrolled in MDM | Device visible in Intune with correct OU assignment | Check ADE enrollment profile assignment in Apple Business |
| Shared iPad re-provisioned (supervised, ADE) | Shared iPad mode active, enrollment profile applied | Verify MDM server assignment in Apple Business for the device's OU |
| All prior user partitions absent | No user sessions present | Expected — EraseDevice destroys all partitions |
| L2 approval document filed | Approval reference on record | File in incident management system |

## Cross-References

- Permission catalog: [01-role-permission-model.md](01-role-permission-model.md) — People subgroup;
  "Reset Shared iPad passcode" (conditionally-grant, OP-11 note); OP-3 Edit-without-View table
- Shared iPad lifecycle: [09-shared-ipad-lifecycle.md](09-shared-ipad-lifecycle.md) — enrollment
  prerequisites; Find My pre-check (OP-12); lifecycle stages
- Cross-org boundary: [18-cross-org-boundary-cheat-sheet.md](18-cross-org-boundary-cheat-sheet.md) —
  full Apple-Business-vs-Intune responsibility table (D-02 SOT)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-22 | Phase 64 plan 64-02: initial authoring — canonical 3-path Shared iPad passcode reset runbook; Path A (Apple Business UI, L1-delegatable); Path B anti-feature (ClearPasscode ≠ partition passcode, ABAUDIT-07 exemption); Path C (EraseDevice, OP-11 hard callout + L2-approval gate); C16 Phase 65 back-link deferred (DELEG-02) | -- |
