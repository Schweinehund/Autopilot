---
phase: 28-ios-admin-setup-configuration-apps-compliance
fixed_at: 2026-04-16T00:00:00Z
review_path: .planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-REVIEW.md
iteration: 1
findings_in_scope: 1
fixed: 0
skipped: 1
status: none_fixed
---

# Phase 28: Code Review Fix Report

**Fixed at:** 2026-04-16
**Source review:** .planning/phases/28-ios-admin-setup-configuration-apps-compliance/28-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 1 (Critical: 0, Warning: 1)
- Fixed: 0
- Skipped: 1

The single in-scope finding (WR-01) was skipped after fact-checking the reviewer's premise against Microsoft Learn's authoritative iOS/iPadOS device-restriction reference. The current documentation's marking of "Managed Safari web domains" as NOT supervised-only appears to be correct per Microsoft Learn; the reviewer's claim that both domain settings require supervised mode does not match the current Microsoft documentation. Full manual verification by a human with access to a test Intune tenant is recommended before applying any change. See skip-reason details below.

## Fixed Issues

None -- all in-scope findings were skipped.

## Skipped Issues

### WR-01: "Allowed Safari web domains" and "Managed Safari web domains" marked as NOT supervised-only may be factually incorrect

**File:** `docs/admin-setup-ios/04-configuration-profiles.md:279-280`

**Reason:** `skipped: fact-check against Microsoft Learn contradicts the reviewer's premise; requires human verification in a live tenant before applying`

**Original issue:** The Safari Domains table lists "Allowed Safari web domains" and "Managed Safari web domains" with an em-dash (not supervised-only). The reviewer asserted that both settings historically require supervised mode per Apple's Device Management Restrictions payload reference and Microsoft Intune's own "iOS/iPadOS device restriction settings" documentation, and recommended marking both as 🔒 with an expanded callout.

**Fact-check performed:**

Fetched and examined the current Microsoft Learn reference at https://learn.microsoft.com/en-us/mem/intune/configuration/device-restrictions-ios (iOS/iPadOS device restriction settings in Microsoft Intune). Findings:

1. **"Managed Safari web domains"** -- listed under the heading *"Settings apply to: Device enrollment and Automated device enrollment (supervised)"*. "Device enrollment" in Microsoft's taxonomy is the unsupervised user-driven enrollment model (BYOD / personal device). The explicit inclusion of "Device enrollment" in the applicability line means the setting is NOT supervised-only in current Intune -- the existing document's `—` marking is consistent with Microsoft Learn.

2. **"Safari password domains"** -- listed under *"Settings apply to: Automated device enrollment (supervised)"* only. Supervised-only -- matches the current document's 🔒 marking.

3. **"Allowed Safari web domains"** -- NOT found as a named setting in the current Microsoft Learn iOS device-restrictions reference. The setting may exist under a different name in current Intune UI, may have been renamed, may not be exposed through the template path, or may be a historical-only setting removed from current Intune. Without access to a live Intune admin center tenant, the exact current status of this named setting cannot be confirmed.

**Why skipping is the correct decision:**

Applying the reviewer's suggested fix (marking both as 🔒) would:
- Contradict the current Microsoft Learn reference for "Managed Safari web domains" (introducing a NEW factual error to fix a suspected one)
- Make an unverified claim about "Allowed Safari web domains" that is not supported by the authoritative Microsoft documentation available at fact-check time

The reviewer's suggested fix text explicitly acknowledged uncertainty: *"Verify the supervised-only status of these two settings against the current Microsoft Learn iOS/iPadOS device restriction settings reference"* and *"If current Microsoft Learn documentation indicates one or both are available on unsupervised devices for specific iOS versions, cite the version boundary inline."* The verification pointed the opposite direction from the reviewer's prior belief, so the in-place text is retained.

**Recommended follow-up (for human reviewer):**

- Confirm in a live Intune admin center (Settings catalog > iOS/iPadOS > Restrictions) whether "Allowed Safari web domains" exists as a distinct setting, and if so, what its applicability scope (Device enrollment / ADE / ADE supervised) is.
- If "Allowed Safari web domains" is indeed supervised-only in current Intune, update only that row to 🔒 and narrow the callout text accordingly. Keep "Managed Safari web domains" as `—` per Microsoft Learn.
- This item is already scheduled for the 2026-07-15 review cycle (documented in the file frontmatter `review_by` field). Flag it as a priority fact-check at that cycle.

**Sources consulted during fact-check:**

- https://learn.microsoft.com/en-us/mem/intune/configuration/device-restrictions-ios (primary -- Microsoft Learn iOS/iPadOS device restriction settings)
- https://learn.microsoft.com/en-us/mem/intune/configuration/settings-catalog (Settings Catalog overview -- did not contain Safari domain settings details)
- https://support.apple.com/guide/deployment/restrictions-payload-settings-dep0f7dd3d8/web (Apple deployment-guide Restrictions payload -- confirmed Safari browsing management is handled via declarative configuration and restrictions, but did not resolve the specific naming conflict)

**Files NOT modified:** None. No Edit or Write tool invocation was made against `docs/admin-setup-ios/04-configuration-profiles.md`. No commits were created for this finding.

## Out-of-scope Findings (for reference)

The following Info-level findings (IN-01 through IN-07) were out of scope for this iteration (`fix_scope: critical_warning`) and were not addressed. They remain open in the source REVIEW.md for a future `fix_scope: all` iteration or manual follow-up:

- **IN-01:** Device Restrictions intro list is missing "Show or Hide Apps" among entirely-supervised categories (`04-configuration-profiles.md:124`).
- **IN-02:** Two Device Restrictions settings duplicated under both "General" and "Screen Time and Additional Restrictions" categories (`04-configuration-profiles.md:136-149` and `296-301`).
- **IN-03:** Password category table vs. callout wording inconsistency ("Require Touch ID or Face ID authentication for AutoFill" vs. "Require biometric for AutoFill") (`04-configuration-profiles.md:270-272`).
- **IN-04:** VPP App Type Comparison row "Available deployment intent for device groups" is easy to misread (`05-app-deployment.md:60`).
- **IN-05:** Silent install matrix scenario 4 "BYOD -- device licensed" may describe an uncommon/misconfigured scenario (`05-app-deployment.md:41`).
- **IN-06:** Compliance guide Prerequisites list expanded beyond plan spec -- process/traceability note only, no code fix (`06-compliance-policy.md:33-38`).
- **IN-07:** `00-overview.md` revision-history "Initial version" row carries pre-Phase-28 description -- standard revision-history hygiene, no fix needed (`00-overview.md:79`).

---

_Fixed: 2026-04-16_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
