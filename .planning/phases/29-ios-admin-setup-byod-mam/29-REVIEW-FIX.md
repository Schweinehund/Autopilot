---
phase: 29-ios-admin-setup-byod-mam
fixed_at: 2026-04-18T00:00:00Z
review_path: .planning/phases/29-ios-admin-setup-byod-mam/29-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 6
skipped: 2
status: partial
---

# Phase 29: Code Review Fix Report

**Fixed at:** 2026-04-18
**Source review:** `.planning/phases/29-ios-admin-setup-byod-mam/29-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (3 warnings + 5 info)
- Fixed: 6
- Skipped: 2 (reviewer-directed deferrals — not regressions)

## Fixed Issues

### WR-01: Account-driven User Enrollment does not run in Setup Assistant

**Files modified:** `docs/admin-setup-ios/08-user-enrollment.md`
**Commit:** a5a32c2
**Applied fix:** Replaced all 6 occurrences of "Setup Assistant" in the account-driven User Enrollment flow with terminology consistent with the Settings-app-initiated flow:
- Line 69: "Apple's Setup Assistant fetches this resource" → "The iOS enrollment client fetches this resource"
- Line 71 callout: "Setup Assistant error" → "iOS shows the sign-in error inline in the Settings enrollment flow"
- Line 164 table: "Setup Assistant rejects the discovery response" → "the iOS enrollment flow rejects the discovery response"
- Line 166 table: "Setup Assistant rejects sign-in" → "iOS rejects the sign-in with 'this Apple ID cannot be used here'"
- Line 168 table: "Setup Assistant rejects credentials" → "iOS rejects the Managed Apple ID sign-in"
- Line 169 table: "Setup Assistant has no path option" → "the Sign In to Work or School Account flow is unavailable on this iOS version"

### WR-02: Verification step references an iOS Settings path that does not exist on iOS 15+

**Files modified:** `docs/admin-setup-ios/08-user-enrollment.md`
**Commit:** a5a32c2
**Applied fix:** Replaced the broken `Settings > Accounts & Passwords` verification path (removed in iOS 13) with the correct iOS 15+ location: `Settings > General > VPN & Device Management` as a managed User Enrollment profile entry.

### WR-03: Web-based enrollment URL is likely a discovery endpoint, not the user-facing enrollment URL

**Files modified:** `docs/admin-setup-ios/07-device-enrollment.md`
**Commit:** bd8e629
**Applied fix:** Replaced the literal `https://enrollment.manage.microsoft.com/enrollmentserver/discovery.svc` MDM discovery endpoint with guidance pointing to `https://portal.manage.microsoft.com` (Company Portal web) as the canonical starting point, plus explicit instruction to verify the current URL against Microsoft Learn before distributing — matching the reviewer's suggested replacement text exactly.

### IN-01: "Block App Store" example in What-Breaks callout is self-inconsistent with the capabilities table

**Files modified:** `docs/admin-setup-ios/07-device-enrollment.md`
**Commit:** bd8e629
**Applied fix:** Replaced vague "Block App Store restrictions (inherited from any other policy)" with the realistic unsupervised-device source: "App Store access blocked by Screen Time or parental-control settings". Removes the self-inconsistency with the capabilities table (which correctly states Block App Store is supervised-only).

### IN-02: Privacy-limit callout linking language says "Phase 26 User Enrollment concept page"

**Files modified:** `docs/admin-setup-ios/08-user-enrollment.md`
**Commit:** a5a32c2
**Applied fix:** Replaced the internal planning reference "Phase 26 User Enrollment concept page" with user-facing prose: "the User Enrollment section of the [iOS/iPadOS Enrollment Path Overview](../ios-lifecycle/00-enrollment-overview.md#user-enrollment)". The actual link target was already correct; only the surrounding text was updated.

### IN-05: Mermaid branch labels differ slightly from the narrative path labels

**Files modified:** `docs/admin-setup-ios/00-overview.md`
**Commit:** 030b7a2
**Applied fix:** Added parenthetical diagram-label cross-references to the intro sentence so readers scanning for "Device Enrollment" can correlate with the "BYOD w/o ABM" branch label (and similarly for User Enrollment / "Privacy-preserving BYOD" and MAM-WE / "App-layer only"). Applied the prose-parenthetical option recommended by the reviewer rather than modifying the Mermaid diagram node text.

## Skipped Issues

### IN-03: "See Also" references "Apple Provisioning Glossary" via `_glossary-macos.md` — correct filename but confusing label

**File:** `docs/admin-setup-ios/07-device-enrollment.md:271`, `docs/admin-setup-ios/08-user-enrollment.md:178`, `docs/admin-setup-ios/09-mam-app-protection.md:342`, `docs/admin-setup-ios/00-overview.md:115`
**Reason:** Reviewer-directed deferral. The REVIEW.md Fix section explicitly states "Do not rewrite in Phase 29 scope" and flags this for a codebase-wide rename in a future phase (roadmap item). Fixing in Phase 29 alone would create inconsistency with sibling Phase 26 guides that use the same pattern. Accepted as tech debt.
**Original issue:** Link label "Apple Provisioning Glossary" pointing to `_glossary-macos.md` may mislead readers into thinking it is macOS-specific.

### IN-04: Template Platform gate blockquote drops the fourth bullet in 00-overview.md vs template

**File:** `docs/admin-setup-ios/00-overview.md:8-11`, `docs/_templates/admin-template-ios.md:25-28`
**Reason:** Reviewer-directed no-op. The REVIEW.md Fix section explicitly states "No change needed" — the overview correctly omits the self-referential portal-navigation bullet because the overview itself hosts that section. Flagged only for documentation hygiene awareness.
**Original issue:** Overview Platform gate has 3 lines vs template's 4 lines; a template-conformance linter would flag it as missing the fourth bullet.

---

_Fixed: 2026-04-18_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
