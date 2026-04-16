---
status: issues_found
phase: 27
files_reviewed: 5
findings:
  critical: 0
  warning: 1
  info: 1
  total: 2
depth: standard
---

> **Reviewed:** 2026-04-16
> **Files:** `docs/_templates/admin-template-ios.md`, `docs/admin-setup-ios/00-overview.md`, `docs/admin-setup-ios/01-apns-certificate.md`, `docs/admin-setup-ios/02-abm-token.md`, `docs/admin-setup-ios/03-ade-enrollment-profile.md`
> **Reviewer:** Claude Code (claude-sonnet-4-6)

# Phase 27 Documentation Review

## Summary

All five files are structurally sound, free of macOS content contamination, and consistent with the iOS admin guide template. Frontmatter is correct across all files. Cross-references resolve to existing files and anchor targets are valid. The supervised-only callout pattern appears exactly where required (supervised mode and locked enrollment in 03-ade-enrollment-profile.md only) and matches the template format. The APNs 365-day renewal period and renew-not-replace rule are correctly and prominently documented. The macOS cross-reference strategy in 02-abm-token.md correctly delegates to the macOS guide per step without duplicating click-paths. Two issues found: one internal factual inconsistency between iOS and macOS sibling guides, and one display-name inconsistency carried forward from Phase 26.

---

## Critical Issues

None.

---

## Warning Issues

### W1 — ADE token limit inconsistency: 02-abm-token.md states 2,000; macOS sibling states 3,000

- **File:** `docs/admin-setup-ios/02-abm-token.md`, line 82 (Token Limits table)
- **Cross-reference:** `docs/admin-setup-macos/01-abm-configuration.md`, line 108
- **Confidence:** 90%

The iOS guide Token Limits table states `Maximum ADE tokens per Intune tenant | 2,000`. The macOS sibling guide states `Up to 3,000 ADE tokens supported per Intune tenant`. Both guides cover the same platform-agnostic Intune limit. The values directly contradict each other.

**Fix:** Verify the current Microsoft Intune documented limit and update whichever guide has the incorrect value.

---

## Info Issues

### I1 — Glossary link display name mismatch (carried forward from Phase 26 I1)

- **Files:** All five reviewed files, "Apple Provisioning Glossary" link text
- **Cross-reference:** `docs/_glossary-macos.md`, H1: `# macOS Provisioning Glossary`
- **Confidence:** 82%

All iOS guides link to the shared glossary as "Apple Provisioning Glossary." The file's actual H1 heading is `# macOS Provisioning Glossary`. Paths resolve correctly; this is a display-name mismatch only. Resolution requires either renaming the glossary file's H1 or accepting the delta as intentional.

---

## Checks That Passed

| Check | Result |
|---|---|
| `platform: iOS` in frontmatter of all 5 files | Pass |
| `last_verified` and `review_by` present in all files | Pass |
| No `platform: macOS` in any iOS guide file | Pass |
| APNs 365-day validity and renew-not-replace rule documented | Pass |
| Supervised-only callout on supervised mode + locked enrollment only | Pass |
| Supervised-only callout links to `ios-lifecycle/00-enrollment-overview.md#supervision` | Pass |
| 02-abm-token.md cross-references macOS guide without duplicating click-paths | Pass |
| All relative cross-reference paths resolve to existing files | Pass |
| Template structure consistently applied across all guides | Pass |
| No Terminal/CLI steps in any iOS guide | Pass |
| 03-ade-enrollment-profile.md correctly omits Renewal/Maintenance section | Pass |
